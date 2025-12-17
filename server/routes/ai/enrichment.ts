import { Router } from 'express';
import { storage } from '../../storage';
import { requireAdmin } from '../middleware/auth';
import { aiLimiter } from '../../middleware/rateLimiter';

const router = Router();

// Apply AI rate limiting only in production
if (process.env.NODE_ENV === 'production') {
    router.use(aiLimiter);
}

// POST /api/admin/pages/:id/enrich
router.post('/pages/:id/enrich', requireAdmin, async (req, res) => {
    try {
        const { enrichPageHtml } = await import('../../services/ai-enricher');

        const page = await storage.getPage(req.params.id);
        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }

        const html = page.aiStartupHtml;
        if (!html || html.trim().length === 0) {
            return res.status(400).json({ error: 'No AI Startup HTML content to enrich' });
        }

        // Get selected enrichment steps from request body
        const steps = req.body?.steps || null;

        const enrichment = await enrichPageHtml(html, steps);

        // Get existing aiEnrichment to preserve data for disabled steps
        const existingEnrichment = page.aiEnrichment || {};

        // Helper to check if a step was enabled
        const isStepEnabled = (stepName: string): boolean => {
            if (!steps) return true; // All steps enabled if none specified
            return (steps as any)[stepName] !== false;
        };

        // Merge enrichment, keeping existing data for disabled steps
        const mergedEnrichment: any = {
            extractedAt: enrichment.extractedAt,
            imagePrompts: isStepEnabled('imagePrompts') ? enrichment.imagePrompts : (existingEnrichment as any).imagePrompts || [],
            videoPrompts: isStepEnabled('videoPrompts') ? enrichment.videoPrompts : (existingEnrichment as any).videoPrompts || [],
            layoutSpecs: isStepEnabled('layoutSpecs') ? enrichment.layoutSpecs : (existingEnrichment as any).layoutSpecs || [],
            animationSpecs: isStepEnabled('animationSpecs') ? enrichment.animationSpecs : (existingEnrichment as any).animationSpecs || [],
            motionSpecs: isStepEnabled('motionSpecs') ? enrichment.motionSpecs : (existingEnrichment as any).motionSpecs || [],
            suggestedSeo: isStepEnabled('suggestedSeo') ? enrichment.suggestedSeo : (existingEnrichment as any).suggestedSeo || {},
            suggestedLinks: isStepEnabled('suggestedLinks') ? enrichment.suggestedLinks : (existingEnrichment as any).suggestedLinks || [],
            components: isStepEnabled('components') ? enrichment.components : (existingEnrichment as any).components || [],
            visualConfig: isStepEnabled('visualConfig') ? enrichment.visualConfig : (existingEnrichment as any).visualConfig,
        };

        // Build update object with merged enrichment
        const updateData: any = { aiEnrichment: mergedEnrichment };

        // If AI generated visual config and visualConfig step was enabled, merge it with existing or create new
        if (isStepEnabled('visualConfig') && enrichment.visualConfig) {
            const existingConfig = page.visualConfig || {} as any;
            updateData.visualConfig = {
                pageId: page.key,
                cluster: page.clusterKey || existingConfig.cluster || "",
                priority: enrichment.visualConfig.priority || existingConfig.priority || "P2",
                vibeKeywords: enrichment.visualConfig.vibeKeywords || existingConfig.vibeKeywords || [],
                emotionalTone: enrichment.visualConfig.emotionalTone || existingConfig.emotionalTone || [],
                animationIdeas: enrichment.visualConfig.animationIdeas || existingConfig.animationIdeas || [],
                aiImagePrompt: enrichment.visualConfig.aiImagePrompt || existingConfig.aiImagePrompt || "",
                aiVideoPrompt: enrichment.visualConfig.aiVideoPrompt || existingConfig.aiVideoPrompt || "",
                designerNotes: enrichment.visualConfig.designerNotes || existingConfig.designerNotes || "",
            };
        }

        const updatedPage = await storage.updatePage(req.params.id, updateData);

        res.json({
            success: true,
            enrichment,
            page: updatedPage
        });
    } catch (error) {
        console.error('AI enrichment error:', error);
        res.status(500).json({ error: 'Failed to enrich page with AI' });
    }
});

export default router;
