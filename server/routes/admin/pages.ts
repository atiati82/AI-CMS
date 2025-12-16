import { Router } from 'express';
import { storage } from '../../storage';
import { requireAdmin } from '../middleware/auth';
import { authLimiter } from '../../middleware/rateLimiter';
import { insertPageSchema } from '@shared/schema';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { createCrudHandler, createDeleteHandler } from '../../route-helpers';

const router = Router();

// Apply stricter rate limiting to admin routes
router.use(authLimiter);

// GET /api/admin/stats
router.get('/stats', requireAdmin, async (req, res) => {
    try {
        const stats = await storage.getContentStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
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
        const page = await storage.updatePage(req.params.id, req.body);
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
