import { Router } from 'express';
import { storage } from '../../storage';

const router = Router();

// GET /api/clusters
router.get('/', async (req, res) => {
    try {
        const clusters = await storage.getAllClusters();
        res.json(clusters);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch clusters' });
    }
});

// GET /api/clusters/:slug
router.get('/:slug', async (req, res) => {
    try {
        const cluster = await storage.getClusterBySlug(req.params.slug);
        if (!cluster) {
            return res.status(404).json({ error: 'Cluster not found' });
        }
        res.json(cluster);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cluster' });
    }
});

export default router;
