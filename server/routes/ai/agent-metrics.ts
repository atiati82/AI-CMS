import express from 'express';
import { requireAdmin } from '../middleware/auth';
import { agentMetricsService } from '../../services/agentMetrics';

const router = express.Router();

/**
 * GET /api/ai/agent-metrics/dashboard
 * Get dashboard metrics for all agents
 */
router.get('/agent-metrics/dashboard', requireAdmin, async (req, res) => {
    try {
        const hours = parseInt(req.query.hours as string) || 24;
        const metrics = await agentMetricsService.getDashboardMetrics(hours);

        res.json({
            ok: true,
            metrics,
            timeRange: `${hours}h`
        });
    } catch (error) {
        console.error('Get dashboard metrics error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch dashboard metrics' });
    }
});

/**
 * GET /api/ai/agent-metrics/costs
 * Get cost breakdown by date and agent
 */
router.get('/agent-metrics/costs', requireAdmin, async (req, res) => {
    try {
        const days = parseInt(req.query.days as string) || 30;
        const endDate = new Date();
        const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

        const breakdown = await agentMetricsService.getCostBreakdown(startDate, endDate);

        res.json({
            ok: true,
            breakdown,
            startDate,
            endDate
        });
    } catch (error) {
        console.error('Get cost breakdown error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch cost breakdown' });
    }
});

/**
 * GET /api/ai/agent-metrics/:agentName
 * Get metrics for a specific agent
 */
router.get('/agent-metrics/:agentName', requireAdmin, async (req, res) => {
    try {
        const { agentName } = req.params;
        const hours = parseInt(req.query.hours as string) || 24;

        const metrics = await agentMetricsService.getAgentMetrics(agentName, hours);

        res.json({
            ok: true,
            agentName,
            metrics,
            timeRange: `${hours}h`
        });
    } catch (error) {
        console.error('Get agent metrics error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch agent metrics' });
    }
});

/**
 * GET /api/ai/agent-metrics/:agentName/limits
 * Check cost limits for an agent
 */
router.get('/agent-metrics/:agentName/limits', requireAdmin, async (req, res) => {
    try {
        const { agentName } = req.params;
        const limits = await agentMetricsService.checkCostLimits(agentName);

        res.json({
            ok: true,
            agentName,
            limits
        });
    } catch (error) {
        console.error('Check cost limits error:', error);
        res.status(500).json({ ok: false, error: 'Failed to check cost limits' });
    }
});

export default router;
