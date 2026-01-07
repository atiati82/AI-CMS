import { Router } from 'express';
import { storage } from '../../storage';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/admin/stats
router.get('/', requireAdmin, async (req, res) => {
    try {
        const stats = await storage.getContentStats();
        res.json(stats);
    } catch (error) {
        console.error('Get admin stats error:', error);
        res.status(500).json({ error: 'Failed to fetch admin stats' });
    }
});

export default router;
