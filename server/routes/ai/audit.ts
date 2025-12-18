import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { getRecentAudits, getEntityAudits, getActorAudits, getRecentAgentRuns, getAgentRunLogs } from '../../services/audit';

const router = Router();

// GET /api/ai/audit - Get recent audit entries
router.get('/audit', requireAdmin, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 50;
        const entries = await getRecentAudits(limit);

        res.json({
            ok: true,
            entries,
            count: entries.length
        });
    } catch (error) {
        console.error('Get audits error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch audit entries' });
    }
});

// GET /api/ai/audit/entity/:type/:id - Get audit history for entity
router.get('/audit/entity/:type/:id', requireAdmin, async (req, res) => {
    try {
        const { type, id } = req.params;
        const entries = await getEntityAudits(type, id);

        res.json({
            ok: true,
            entries,
            count: entries.length
        });
    } catch (error) {
        console.error('Get entity audits error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch entity audit history' });
    }
});

// GET /api/ai/audit/actor/:type/:id - Get all actions by actor
router.get('/audit/actor/:type/:id', requireAdmin, async (req, res) => {
    try {
        const { type, id } = req.params;
        const entries = await getActorAudits(type, id);

        res.json({
            ok: true,
            entries,
            count: entries.length
        });
    } catch (error) {
        console.error('Get actor audits error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch actor audit history' });
    }
});

// GET /api/ai/audit/memory
// Fetch AI learned memory objects (lessons)
router.get('/memory', requireAdmin, async (req, res) => {
    try {
        const { type, search } = req.query;
        const { db } = await import('../../db');

        let query = `
            SELECT * FROM rag_memory_objects 
            ORDER BY last_triggered DESC, confidence DESC 
            LIMIT 50
        `;

        // Basic filtering (can be expanded)
        const result = await db.query(query);

        res.json({
            ok: true,
            memories: result.rows,
            count: result.rows.length
        });
    } catch (error: any) {
        console.error('Get memory error:', error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

// DELETE /api/ai/audit/memory/:id
// Forget a specific lesson
router.delete('/memory/:id', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { db } = await import('../../db');

        await db.query('DELETE FROM rag_memory_objects WHERE lesson_id = $1', [id]);

        res.json({ ok: true, message: 'Memory deleted' });
    } catch (error: any) {
        console.error('Delete memory error:', error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

// GET /api/ai/audit/agent-logs - Get recent agent runs
router.get('/agent-logs', requireAdmin, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 20;
        const runs = await getRecentAgentRuns(limit);
        res.json({ ok: true, runs });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

// GET /api/ai/audit/agent-logs/:runId - Get detailed logs for a run
router.get('/agent-logs/:runId', requireAdmin, async (req, res) => {
    try {
        const { runId } = req.params;
        const logs = await getAgentRunLogs(runId);
        res.json({ ok: true, logs });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

export default router;
