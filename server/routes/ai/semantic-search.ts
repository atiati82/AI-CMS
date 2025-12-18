/**
 * Semantic Search API Routes
 * 
 * Provides endpoints for vector-based semantic search in the knowledge base.
 */

import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { semanticSearch, hybridSearch, generateMissingEmbeddings } from '../../services/semantic-search';
import { isEmbeddingServiceAvailable } from '../../services/embedding';

const router = Router();

/**
 * POST /api/ai/search/semantic
 * Perform semantic similarity search
 */
router.post('/search/semantic', async (req, res) => {
    try {
        const { query, limit = 5, threshold = 0.5, zone } = req.body;

        if (!query || typeof query !== 'string') {
            return res.status(400).json({ ok: false, error: 'Query is required' });
        }

        const results = await semanticSearch(query, { limit, threshold, zone });

        res.json({
            ok: true,
            results,
            count: results.length,
            searchType: results[0]?.searchType || 'semantic'
        });
    } catch (error: any) {
        console.error('Semantic search error:', error);
        res.status(500).json({ ok: false, error: 'Search failed' });
    }
});

/**
 * POST /api/ai/search/hybrid
 * Perform hybrid search (semantic + keyword)
 */
router.post('/search/hybrid', async (req, res) => {
    try {
        const { query, limit = 5, semanticWeight = 0.7, zone } = req.body;

        if (!query || typeof query !== 'string') {
            return res.status(400).json({ ok: false, error: 'Query is required' });
        }

        const results = await hybridSearch(query, { limit, semanticWeight, zone });

        res.json({
            ok: true,
            results,
            count: results.length,
            searchType: 'hybrid'
        });
    } catch (error: any) {
        console.error('Hybrid search error:', error);
        res.status(500).json({ ok: false, error: 'Search failed' });
    }
});

/**
 * GET /api/ai/search/status
 * Check semantic search availability
 */
router.get('/search/status', async (req, res) => {
    try {
        const embeddingAvailable = isEmbeddingServiceAvailable();

        res.json({
            ok: true,
            embeddingService: embeddingAvailable,
            status: embeddingAvailable ? 'operational' : 'fallback'
        });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

/**
 * POST /api/ai/search/generate-embeddings (Admin only)
 * Generate embeddings for documents without them
 */
router.post('/search/generate-embeddings', requireAdmin, async (req, res) => {
    try {
        const { batchSize = 50 } = req.body;

        const generated = await generateMissingEmbeddings(batchSize);

        res.json({
            ok: true,
            generated,
            message: `Generated embeddings for ${generated} documents`
        });
    } catch (error: any) {
        console.error('Generate embeddings error:', error);
        res.status(500).json({ ok: false, error: 'Failed to generate embeddings' });
    }
});

export default router;
