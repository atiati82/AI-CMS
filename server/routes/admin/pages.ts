import { Router } from 'express';
import { storage } from '../../storage';
import { requireAdmin } from '../middleware/auth';
import { apiLimiter } from '../../middleware/rateLimiter';
import { insertPageSchema } from '@shared/schema';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { createCrudHandler, createDeleteHandler } from '../../route-helpers';

const router = Router();

// Apply general rate limiting only in production (matches index.ts pattern)
if (process.env.NODE_ENV === 'production') {
    router.use(apiLimiter);
}

// GET /api/admin/stats
router.get('/stats', requireAdmin, async (req, res) => {
    try {
        const stats = await storage.getContentStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// GET /api/admin/pages
router.get('/pages', requireAdmin, async (req, res) => {
    try {
        const pages = await storage.getPageTree();
        res.json({ ok: true, pages });
    } catch (error) {
        console.error('Get pages error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch pages' });
    }
});

// POST /api/admin/pages
router.post('/pages', requireAdmin, createCrudHandler(
    insertPageSchema, storage.createPage.bind(storage), 'Failed to create page'
));

// POST /api/admin/pages/bulk
router.post('/pages/bulk', requireAdmin, async (req, res) => {
    try {
        const pagesData = req.body.pages;
        if (!Array.isArray(pagesData)) {
            return res.status(400).json({ error: 'pages must be an array' });
        }
        const validatedPages = pagesData.map((p: any) => insertPageSchema.parse(p));
        const createdPages = await storage.bulkCreatePages(validatedPages);
        res.json(createdPages);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: fromZodError(error).toString() });
        }
        res.status(500).json({ error: 'Failed to bulk create pages' });
    }
});

// PUT /api/admin/pages/:id
router.put('/pages/:id', requireAdmin, async (req, res) => {
    try {
        const existingPage = await storage.getPage(req.params.id);
        const page = await storage.updatePage(req.params.id, req.body);

        // Auto-enrich on publish if visualConfig is missing
        if (
            existingPage &&
            existingPage.status !== 'published' &&
            req.body.status === 'published' &&
            (!page.visualConfig || Object.keys(page.visualConfig).length === 0)
        ) {
            // Trigger enrichment in background (non-blocking)
            setImmediate(async () => {
                try {
                    const { enrichPageHtml } = await import('../../services/ai-enricher');
                    const contentToAnalyze = page.aiStartupHtml || page.content || '';
                    if (contentToAnalyze) {
                        console.log(`[Auto-Enrich] Publishing triggers enrichment for: ${page.title}`);
                        const enrichment = await enrichPageHtml(contentToAnalyze);
                        if (enrichment.visualConfig) {
                            await storage.updatePage(page.id, {
                                visualConfig: {
                                    ...(page.visualConfig || {}),
                                    ...enrichment.visualConfig,
                                    autoEnrichedOnPublish: true,
                                    updatedAt: new Date().toISOString(),
                                } as any,
                            });
                            console.log(`[Auto-Enrich] Completed for: ${page.title}`);
                        }
                    }
                } catch (err: any) {
                    console.error(`[Auto-Enrich] Failed for ${page.title}:`, err?.message);
                }
            });
        }

        res.json(page);
    } catch (error: any) {
        console.error('[PAGE UPDATE ERROR]', error?.message || error);
        console.error('[PAGE UPDATE ERROR DETAILS]', JSON.stringify({
            pageId: req.params.id,
            bodyKeys: Object.keys(req.body || {}),
            errorMessage: error?.message,
            errorCode: error?.code,
            stack: error?.stack?.split('\n').slice(0, 5).join('\n')
        }, null, 2));
        res.status(500).json({ error: 'Failed to update page', details: error?.message });
    }
});

// DELETE /api/admin/pages/:id
router.delete('/pages/:id', requireAdmin, createDeleteHandler(
    storage.deletePage.bind(storage), 'Page not found', 'Failed to delete page'
));

export default router;
