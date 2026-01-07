import { Router } from "express";
import { requireAdmin } from "../middleware/auth";
import { storage } from "../../storage";

const router = Router();

// GET /api/admin/system/health
router.get("/system/health", requireAdmin, async (req, res) => {
    try {
        const { systemHealthService } = await import("../../services/system-health");
        const health = await systemHealthService.checkHealth();
        res.json(health);
    } catch (error) {
        console.error("Health check failed:", error);
        res.status(500).json({ error: "Failed to perform health check" });
    }
});

// GET /api/admin/system/connectivity
router.get("/system/connectivity", requireAdmin, async (req, res) => {
    try {
        const { connectivityService } = await import("../../services/connectivity");
        const stats = await connectivityService.analyzeConnectivity();
        res.json(stats);
    } catch (error) {
        console.error("Connectivity check failed:", error);
        res.status(500).json({ error: "Failed to perform connectivity check" });
    }
});

// GET /api/admin/health/runs
router.get("/health/runs", requireAdmin, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const runs = await storage.getHealthRuns(limit);
        res.json(runs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch health runs" });
    }
});

// GET /api/admin/health/runs/:id
router.get("/health/runs/:id", requireAdmin, async (req, res) => {
    try {
        const run = await storage.getHealthRun(req.params.id);
        if (!run) return res.status(404).json({ error: "Run not found" });
        const issues = await storage.getHealthIssues(run.id);
        res.json({ ...run, issues });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch health run" });
    }
});

// POST /api/admin/health/run
router.post("/health/run", requireAdmin, async (req, res) => {
    try {
        const { healthGateService } = await import("../../services/health/gate");
        const result = await healthGateService.runChecks('admin_api');
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Health Gate failed" });
    }
});

export default router;
