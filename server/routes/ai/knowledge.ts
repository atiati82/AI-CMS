import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import {
    ingestDocument,
    searchKnowledge,
    ingestAllPages,
    getAllKnowledge,
    deleteKnowledge
} from '../../services/knowledge-base';

const router = Router();

// GET /api/ai/knowledge
router.get('/knowledge', requireAdmin, async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
        const items = await getAllKnowledge(limit);

        res.json({
            ok: true,
            items,
            count: items.length
        });
    } catch (error) {
        console.error('Get knowledge error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch knowledge' });
    }
});

// POST /api/ai/knowledge/search
router.post('/knowledge/search', requireAdmin, async (req, res) => {
    try {
        const { query, limit } = req.body;

        if (!query) {
            return res.status(400).json({ ok: false, error: 'Query is required' });
        }

        const results = await searchKnowledge(query, limit || 5);

        res.json({
            ok: true,
            results,
            count: results.length
        });
    } catch (error) {
        console.error('Search knowledge error:', error);
        res.status(500).json({ ok: false, error: 'Failed to search knowledge' });
    }
});

// POST /api/ai/knowledge/ingest
router.post('/knowledge/ingest', requireAdmin, async (req, res) => {
    try {
        const { title, content, source, type, metadata } = req.body;

        if (!title || !content || !source) {
            return res.status(400).json({
                ok: false,
                error: 'title, content, and source are required'
            });
        }

        const documentId = await ingestDocument({
            title,
            content,
            source,
            type,
            metadata
        });

        res.json({
            ok: true,
            id: documentId,
            message: 'Document ingested successfully'
        });
    } catch (error) {
        console.error('Ingest document error:', error);
        res.status(500).json({ ok: false, error: 'Failed to ingest document' });
    }
});

// POST /api/ai/knowledge/ingest-pages
router.post('/knowledge/ingest-pages', requireAdmin, async (req, res) => {
    try {
        const count = await ingestAllPages();

        res.json({
            ok: true,
            ingested: count,
            message: `Ingested ${count} pages into knowledge base`
        });
    } catch (error) {
        console.error('Ingest pages error:', error);
        res.status(500).json({ ok: false, error: 'Failed to ingest pages' });
    }
});

// DELETE /api/ai/knowledge/:id
router.delete('/knowledge/:id', requireAdmin, async (req, res) => {
    try {
        const deleted = await deleteKnowledge(req.params.id);

        if (!deleted) {
            return res.status(404).json({ ok: false, error: 'Knowledge item not found' });
        }

        res.json({
            ok: true,
            deleted: true
        });
    } catch (error) {
        console.error('Delete knowledge error:', error);
        res.status(500).json({ ok: false, error: 'Failed to delete knowledge' });
    }
});

export default router;
