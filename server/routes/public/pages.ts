import { Router } from 'express';
import { storage } from '../../storage';

const router = Router();

// GET /api/pages
router.get('/', async (req, res) => {
    try {
        const { clusterKey, parentKey, tree } = req.query;

        if (tree === 'true') {
            const pageTree = await storage.getPageTree();
            return res.json(pageTree);
        }

        if (clusterKey) {
            const pages = await storage.getPagesByCluster(clusterKey as string);
            return res.json(pages);
        }

        if (parentKey) {
            const pages = await storage.getChildPages(parentKey as string);
            return res.json(pages);
        }

        // Default: return page tree
        const pages = await storage.getPageTree();
        res.json(pages);
    } catch (error) {
        console.error('Get pages error:', error);
        res.status(500).json({ error: 'Failed to fetch pages' });
    }
});

// GET /api/pages/by-path/*
router.get('/by-path/*', async (req, res) => {
    try {
        const pathParam = (req.params as Record<string, string>)[0] || '';
        const path = '/' + pathParam;
        const page = await storage.getPageByPath(path);

        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }

        // Apply Dynamic Box Rules if present
        if (page.metadata && (page.metadata as any).dynamicBoxRules) {
            try {
                const { processPageWithRules } = await import('../../services/dynamic-box-rules');
                const result = await processPageWithRules(page.id.toString());

                // Return enriched page with enhanced HTML
                return res.json({
                    ...page,
                    aiStartupHtml: result.enhancedHtml,
                    content: result.enhancedHtml,
                    metadata: {
                        ...page.metadata as object,
                        appliedRules: result.appliedRules
                    }
                });
            } catch (ruleError) {
                console.warn('Failed to apply dynamic rules:', ruleError);
                // Fallback to original page
                return res.json(page);
            }
        }

        res.json(page);
    } catch (error) {
        console.error('Fetch page error:', error);
        res.status(500).json({ error: 'Failed to fetch page' });
    }
});

// GET /api/pages/by-key/:key
router.get('/by-key/:key', async (req, res) => {
    try {
        const page = await storage.getPageByKey(req.params.key);
        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }
        res.json(page);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch page' });
    }
});

// GET /api/pages/:key/breadcrumbs
router.get('/:key/breadcrumbs', async (req, res) => {
    try {
        const breadcrumbs = await storage.getBreadcrumbs(req.params.key);
        res.json(breadcrumbs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch breadcrumbs' });
    }
});

// GET /api/pages/:key/children
router.get('/:key/children', async (req, res) => {
    try {
        const children = await storage.getChildPages(req.params.key);
        res.json(children);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch children' });
    }
});

export default router;
