import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { aiLimiter } from '../../middleware/rateLimiter';

const router = Router();

// Apply AI rate limiting only in production
if (process.env.NODE_ENV === 'production') {
    router.use(aiLimiter);
}

// POST /api/admin/generate-image
router.post('/generate-image', requireAdmin, async (req, res) => {
    try {
        const { generateImage } = await import('../../services/image-generator');

        const { prompt } = req.body;

        if (!prompt || prompt.trim().length === 0) {
            return res.status(400).json({ error: 'Image prompt is required' });
        }

        const result = await generateImage(prompt);

        if (!result.success) {
            return res.status(500).json({ error: result.error || 'Failed to generate image' });
        }

        res.json({
            success: true,
            publicUrl: result.publicUrl,
            filePath: result.filePath,
        });
    } catch (error) {
        console.error('Image generation error:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

// POST /api/admin/regenerate-image
router.post('/regenerate-image', requireAdmin, async (req, res) => {
    try {
        const { regenerateImage } = await import('../../services/image-generator');

        const { prompt, oldFilePath } = req.body;

        if (!prompt || prompt.trim().length === 0) {
            return res.status(400).json({ error: 'Image prompt is required' });
        }

        const result = await regenerateImage(prompt, oldFilePath);

        if (!result.success) {
            return res.status(500).json({ error: result.error || 'Failed to regenerate image' });
        }

        res.json({
            success: true,
            publicUrl: result.publicUrl,
            filePath: result.filePath,
        });
    } catch (error) {
        console.error('Image regeneration error:', error);
        res.status(500).json({ error: 'Failed to regenerate image' });
    }
});

export default router;
