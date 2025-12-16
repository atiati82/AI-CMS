import { Router } from 'express';
import { storage } from '../../storage';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/admin/settings
router.get('/settings', requireAdmin, async (req, res) => {
    try {
        const { category } = req.query;

        if (category) {
            const settings = await storage.getCmsSettingsByCategory(category as string);
            return res.json(settings);
        }

        const settings = await storage.getAllCmsSettings();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

// GET /api/admin/settings/:key
router.get('/settings/:key', requireAdmin, async (req, res) => {
    try {
        const setting = await storage.getCmsSetting(req.params.key);
        if (!setting) {
            return res.status(404).json({ error: 'Setting not found' });
        }
        res.json(setting);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch setting' });
    }
});

// PUT /api/admin/settings/:key
router.put('/settings/:key', requireAdmin, async (req, res) => {
    try {
        const { value, description, category } = req.body;
        if (value === undefined) {
            return res.status(400).json({ error: 'value is required' });
        }
        const setting = await storage.setCmsSetting(req.params.key, value, description, category);
        res.json(setting);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update setting' });
    }
});

// DELETE /api/admin/settings/:key
router.delete('/settings/:key', requireAdmin, async (req, res) => {
    try {
        await storage.deleteCmsSetting(req.params.key);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete setting' });
    }
});

export default router;
