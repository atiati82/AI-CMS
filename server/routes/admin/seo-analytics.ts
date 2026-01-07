import { Router } from "express";
import { requireAdmin } from "../middleware/auth";
import { searchConsoleService } from "../../services/searchConsoleService";

const router = Router();

// GET /api/admin/seo/status
router.get("/status", requireAdmin, async (req, res) => {
    try {
        res.json({
            configured: searchConsoleService.isConfigured(),
            message: searchConsoleService.isConfigured()
                ? "Google Search Console is configured"
                : "GSC credentials not configured. Add GSC_CLIENT_EMAIL and GSC_PRIVATE_KEY secrets."
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/admin/seo/sites
router.get("/sites", requireAdmin, async (req, res) => {
    try {
        const sites = await searchConsoleService.listSites();
        res.json(sites);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/admin/seo/summary
router.get("/summary", requireAdmin, async (req, res) => {
    try {
        const days = parseInt(req.query.days as string) || 28;
        const summary = await searchConsoleService.getSummaryStats(days);
        res.json(summary);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/admin/seo/queries
router.get("/queries", requireAdmin, async (req, res) => {
    try {
        const days = parseInt(req.query.days as string) || 28;
        const limit = parseInt(req.query.limit as string) || 50;
        const queries = await searchConsoleService.getTopQueries(days, limit);
        res.json(queries);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/admin/seo/pages
router.get("/pages", requireAdmin, async (req, res) => {
    try {
        const days = parseInt(req.query.days as string) || 28;
        const limit = parseInt(req.query.limit as string) || 50;
        const pages = await searchConsoleService.getTopPages(days, limit);
        res.json(pages);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/admin/seo/performance
router.get("/performance", requireAdmin, async (req, res) => {
    try {
        const days = parseInt(req.query.days as string) || 28;
        const performance = await searchConsoleService.getPerformanceByDate(days);
        res.json(performance);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/admin/seo/inspect
router.post("/inspect", requireAdmin, async (req, res) => {
    try {
        const { url, siteUrl } = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }
        const result = await searchConsoleService.inspectUrl(url, siteUrl);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
