import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { getRecentAudits, getEntityAudits, getActorAudits } from '../../services/audit';

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

export default router;
