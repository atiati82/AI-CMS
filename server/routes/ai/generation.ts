import { Router } from 'express';
import { storage } from '../../storage';
import { requireAdmin } from '../middleware/auth';
import { aiLimiter } from '../../middleware/rateLimiter';

const router = Router();

// Apply AI rate limiting
router.use(aiLimiter);

// POST /api/admin/pages/:id/integrate
router.post('/pages/:id/integrate', requireAdmin, async (req, res) => {
    try {
        const { integrateTsxPage } = await import('../../services/page-integrator');

        const page = await storage.getPage(req.params.id);
        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }

        const tsxCode = (page as any).aiStartupHtml;
        if (!tsxCode || tsxCode.trim().length === 0) {
            return res.status(400).json({ error: 'No AI Startup HTML/TSX content to integrate' });
        }

        const result = await integrateTsxPage(tsxCode);

        if (!result.success) {
            return res.status(400).json({
                error: result.error || 'Integration failed',
                details: result
            });
        }

        res.json({
            success: true,
            message: `Page integrated successfully! View at ${result.routePath}`,
            pageId: result.pageId,
            fileName: result.fileName,
            routePath: result.routePath,
            componentName: result.componentName
        });
    } catch (error) {
        console.error('Page integration error:', error);
        res.status(500).json({ error: 'Failed to integrate page' });
    }
});

// POST /api/admin/ai-startup
router.post('/startup', requireAdmin, async (req, res) => {
    try {
        const { generatePageFromBrief } = await import('../../services/ai-startup');

        const { brief, pageSlug } = req.body;

        if (!brief || brief.trim().length === 0) {
            return res.status(400).json({ error: 'Brief is required' });
        }

        const result = await generatePageFromBrief(brief, pageSlug);

        res.json({
            success: true,
            layoutsDetected: result.layoutsDetected,
            seo: result.seo,
            tsx: result.tsx,
            html: result.html,
        });
    } catch (error) {
        console.error('AI Startup error:', error);
        res.status(500).json({ error: 'Failed to generate page from brief' });
    }
});

export default router;
