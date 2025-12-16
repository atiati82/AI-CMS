import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import {
    ingestConversation,
    getAgentRecommendations,
    autoIngestCurrentSession
} from '../../services/conversation-learning';

const router = Router();

// POST /api/ai/learning/ingest/:conversationId
router.post('/learning/ingest/:conversationId', requireAdmin, async (req, res) => {
    try {
        await ingestConversation(req.params.conversationId);

        res.json({
            ok: true,
            message: 'Conversation ingested into knowledge base for AI learning'
        });
    } catch (error: any) {
        console.error('Ingest conversation error:', error);
        res.status(500).json({ ok: false, error: error.message || 'Failed to ingest conversation' });
    }
});

// POST /api/ai/learning/ingest-current
router.post('/learning/ingest-current', requireAdmin, async (req, res) => {
    try {
        await autoIngestCurrentSession();

        res.json({
            ok: true,
            message: 'Current session ingested into knowledge base'
        });
    } catch (error) {
        console.error('Auto-ingest error:', error);
        res.status(500).json({ ok: false, error: 'Failed to ingest current session' });
    }
});

// GET /api/ai/learning/recommendations
router.get('/learning/recommendations', requireAdmin, async (req, res) => {
    try {
        const conversationId = req.query.conversationId as string;
        const recommendations = await getAgentRecommendations(conversationId);

        res.json({
            ok: true,
            recommendations,
            count: recommendations.length
        });
    } catch (error) {
        console.error('Get recommendations error:', error);
        res.status(500).json({ ok: false, error: 'Failed to get recommendations' });
    }
});

export default router;
