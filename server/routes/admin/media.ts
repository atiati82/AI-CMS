import { Router } from "express";
import { storage } from "../../storage";
import { assetIntelligenceService } from "../../services/asset-intelligence";

const router = Router();

// Auto-Tag a specific asset
router.post("/:id/auto-tag", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAsset = await assetIntelligenceService.autoTagAsset(id);
        res.json(updatedAsset);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get all assets for a page (convenience, though storage has it)
router.get("/page/:pageKey", async (req, res) => {
    try {
        const { pageKey } = req.params;
        const assets = await storage.getPageMediaAssets(pageKey);
        res.json(assets);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
