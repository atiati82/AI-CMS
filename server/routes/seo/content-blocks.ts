/**
 * Content Blocks API Routes
 * CRUD endpoints for AI-generated SEO content blocks
 */

import { Router } from 'express';
import { storage } from '../../storage';
import { seoBrainService } from '../../services/seo-brain';

const router = Router();

// ============================================================================
// GET BLOCKS
// ============================================================================

/**
 * GET /api/seo/content-blocks/:pageId
 * Get all content blocks for a page
 */
router.get('/:pageId', async (req, res) => {
    try {
        const { pageId } = req.params;
        const { hook, status } = req.query;

        let blocks;
        if (hook) {
            blocks = await storage.getAiContentBlocksByHook(pageId, hook as string);
        } else {
            blocks = await storage.getAiContentBlocks(pageId);
        }

        // Filter by status if provided
        if (status) {
            blocks = blocks.filter(b => b.status === status);
        }

        res.json({ blocks });
    } catch (error: any) {
        console.error('[Content Blocks] Failed to get blocks:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/seo/content-blocks/:pageId/live
 * Get only live (published) blocks for a page - used for frontend rendering
 */
router.get('/:pageId/live', async (req, res) => {
    try {
        const { pageId } = req.params;
        const { hook } = req.query;

        let blocks = await storage.getLiveAiContentBlocks(pageId);

        // Filter by hook if provided
        if (hook) {
            const hookPrefix = hook as string;
            blocks = blocks.filter(b => b.hook === hookPrefix || b.hook.startsWith(`${hookPrefix}:`));
        }

        res.json({ blocks });
    } catch (error: any) {
        console.error('[Content Blocks] Failed to get live blocks:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/seo/content-blocks/all/drafts
 * Get all draft blocks across all pages (for admin dashboard)
 */
router.get('/all/drafts', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string || '50');

        // Get all pages and their draft blocks
        const allPages = await storage.getAllPages();
        const drafts: any[] = [];

        for (const page of allPages.slice(0, 100)) {
            const blocks = await storage.getAiContentBlocks(page.id);
            const pageDrafts = blocks.filter(b => b.status === 'draft');

            for (const block of pageDrafts) {
                drafts.push({
                    ...block,
                    page: { id: page.id, title: page.title, path: page.path }
                });
            }

            if (drafts.length >= limit) break;
        }

        res.json({ drafts: drafts.slice(0, limit) });
    } catch (error: any) {
        console.error('[Content Blocks] Failed to get drafts:', error);
        res.status(500).json({ error: error.message });
    }
});

// ============================================================================
// CREATE / UPDATE / DELETE
// ============================================================================

/**
 * POST /api/seo/content-blocks
 * Create a new content block
 */
router.post('/', async (req, res) => {
    try {
        const { pageId, hook, blockType, htmlContent, focusKeyword, secondaryKeywords, priority } = req.body;

        if (!pageId || !hook || !blockType || !htmlContent) {
            return res.status(400).json({ error: 'Missing required fields: pageId, hook, blockType, htmlContent' });
        }

        const block = await storage.createAiContentBlock({
            pageId,
            hook,
            blockType,
            htmlContent,
            focusKeyword: focusKeyword || null,
            secondaryKeywords: secondaryKeywords || [],
            priority: priority || 5,
            status: 'draft',
            generatedAt: new Date()
        });

        res.json({ success: true, block });
    } catch (error: any) {
        console.error('[Content Blocks] Failed to create block:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * PATCH /api/seo/content-blocks/:id
 * Update a content block
 */
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { htmlContent, focusKeyword, secondaryKeywords, priority, hook, blockType } = req.body;

        const updates: any = {};
        if (htmlContent !== undefined) updates.htmlContent = htmlContent;
        if (focusKeyword !== undefined) updates.focusKeyword = focusKeyword;
        if (secondaryKeywords !== undefined) updates.secondaryKeywords = secondaryKeywords;
        if (priority !== undefined) updates.priority = priority;
        if (hook !== undefined) updates.hook = hook;
        if (blockType !== undefined) updates.blockType = blockType;

        const block = await storage.updateAiContentBlock(id, updates);
        res.json({ success: true, block });
    } catch (error: any) {
        console.error('[Content Blocks] Failed to update block:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * DELETE /api/seo/content-blocks/:id
 * Delete a content block
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await storage.deleteAiContentBlock(id);
        res.json({ success: true });
    } catch (error: any) {
        console.error('[Content Blocks] Failed to delete block:', error);
        res.status(500).json({ error: error.message });
    }
});

// ============================================================================
// STATUS TRANSITIONS
// ============================================================================

/**
 * POST /api/seo/content-blocks/:id/publish
 * Publish a draft block (set status to 'live')
 */
router.post('/:id/publish', async (req, res) => {
    try {
        const { id } = req.params;
        const reviewerId = req.body.reviewerId;

        const block = await storage.publishAiContentBlock(id, reviewerId);
        res.json({ success: true, block });
    } catch (error: any) {
        console.error('[Content Blocks] Failed to publish block:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/seo/content-blocks/:id/archive
 * Archive a block (set status to 'archived')
 */
router.post('/:id/archive', async (req, res) => {
    try {
        const { id } = req.params;
        const block = await storage.archiveAiContentBlock(id);
        res.json({ success: true, block });
    } catch (error: any) {
        console.error('[Content Blocks] Failed to archive block:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/seo/content-blocks/:id/unpublish
 * Unpublish a live block (set status back to 'draft')
 */
router.post('/:id/unpublish', async (req, res) => {
    try {
        const { id } = req.params;
        const block = await storage.updateAiContentBlock(id, { status: 'draft' });
        res.json({ success: true, block });
    } catch (error: any) {
        console.error('[Content Blocks] Failed to unpublish block:', error);
        res.status(500).json({ error: error.message });
    }
});

// ============================================================================
// AI GENERATION
// ============================================================================

/**
 * POST /api/seo/content-blocks/generate
 * Generate a new content block using AI
 */
router.post('/generate', async (req, res) => {
    try {
        const { pageId, blockType, hook, context } = req.body;

        if (!pageId || !blockType || !hook) {
            return res.status(400).json({ error: 'Missing required fields: pageId, blockType, hook' });
        }

        // Generate content using SeoBrainService
        const htmlContent = await seoBrainService.generateContentBlock(pageId, blockType, hook, context);

        if (!htmlContent) {
            return res.status(500).json({ error: 'Failed to generate content block' });
        }

        // Get page SEO data for focus keyword
        const pageSeo = await storage.getPageSeo(pageId);

        // Save as draft
        const block = await storage.createAiContentBlock({
            pageId,
            hook,
            blockType,
            htmlContent,
            focusKeyword: pageSeo?.focusKeyword || null,
            secondaryKeywords: pageSeo?.secondaryKeywords || [],
            priority: 5,
            status: 'draft',
            generatedAt: new Date()
        });

        res.json({ success: true, block });
    } catch (error: any) {
        console.error('[Content Blocks] Failed to generate block:', error);
        res.status(500).json({ error: error.message });
    }
});

// ============================================================================
// ANALYTICS
// ============================================================================

/**
 * POST /api/seo/content-blocks/:id/impression
 * Track an impression (block was viewed)
 */
router.post('/:id/impression', async (req, res) => {
    try {
        const { id } = req.params;
        await storage.incrementBlockImpressions(id);
        res.json({ success: true });
    } catch (error: any) {
        console.error('[Content Blocks] Failed to track impression:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/seo/content-blocks/:id/click
 * Track a click-through (link in block was clicked)
 */
router.post('/:id/click', async (req, res) => {
    try {
        const { id } = req.params;
        await storage.incrementBlockClickThroughs(id);
        res.json({ success: true });
    } catch (error: any) {
        console.error('[Content Blocks] Failed to track click:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
