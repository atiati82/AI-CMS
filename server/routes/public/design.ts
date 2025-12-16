import { Router } from 'express';
import { storage } from '../../storage';

const router = Router();

// GET /api/design-settings
router.get('/', async (req, res) => {
    try {
        const settings = await storage.getCmsSettingsByCategory('design');
        const settingsMap: Record<string, any> = {};
        for (const setting of settings) {
            settingsMap[setting.key] = setting.value;
        }
        res.json(settingsMap);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch design settings' });
    }
});

export default router;
