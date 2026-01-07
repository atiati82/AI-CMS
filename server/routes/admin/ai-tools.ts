import { Router } from "express";
import { requireAdmin } from "../middleware/auth";

const router = Router();

// POST /api/admin/interpret (Get Visual Intelligence)
router.post("/interpret", requireAdmin, async (req, res) => {
    try {
        const { agentRegistry } = await import("../../agents/base");
        // Ensure registry is loaded - might need initialization if not done yet
        // Accessing the singleton instance
        const visualInterpreter = agentRegistry.get('visual-interpreter');

        // Fallback or explicit import if registry feels empty (though server startup should init it)
        // If undefined, try importing directly
        let agent = visualInterpreter;
        if (!agent) {
            const { visualInterpreterAgent } = await import("../../agents/visual-interpreter");
            agent = visualInterpreterAgent;
        }

        const { brief, pageSlug } = req.body;
        if (!brief) return res.status(400).json({ error: "Brief is required" });

        const result = await agent.execute({
            id: 'interpret-req-' + Date.now(),
            type: 'interpret_page',
            input: { context: brief, topic: pageSlug || 'page' }
        });

        res.json(result);
    } catch (error) {
        console.error("Interpretation error:", error);
        res.status(500).json({ error: "Failed to interpret visual context" });
    }
});

// POST /api/admin/ai-startup (Generate page from brief)
router.post("/ai-startup", requireAdmin, async (req, res) => {
    try {
        const { generatePageFromBrief } = await import("../../services/ai-startup");
        const { brief, pageSlug } = req.body;

        if (!brief || brief.trim().length === 0) {
            return res.status(400).json({ error: "Brief is required" });
        }

        const result = await generatePageFromBrief(brief, pageSlug);

        res.json({
            success: true,
            layoutsDetected: result.layoutsDetected,
            seo: result.seo,
            tsx: result.tsx,
            html: result.html,
        });
    } catch (error) {
        console.error("AI Startup error:", error);
        res.status(500).json({ error: "Failed to generate page from brief" });
    }
});

// POST /api/admin/generate-image
router.post("/generate-image", requireAdmin, async (req, res) => {
    try {
        const { generateImage } = await import("../../services/image-generator");
        const { prompt } = req.body;

        if (!prompt || prompt.trim().length === 0) {
            return res.status(400).json({ error: "Image prompt is required" });
        }

        const result = await generateImage(prompt);

        if (!result.success) {
            return res.status(500).json({ error: result.error || "Failed to generate image" });
        }

        res.json({
            success: true,
            publicUrl: result.publicUrl,
            filePath: result.filePath,
        });
    } catch (error) {
        console.error("Image generation error:", error);
        res.status(500).json({ error: "Failed to generate image" });
    }
});

// POST /api/admin/regenerate-image
router.post("/regenerate-image", requireAdmin, async (req, res) => {
    try {
        const { regenerateImage } = await import("../../services/image-generator");
        const { prompt, oldFilePath } = req.body;

        if (!prompt || prompt.trim().length === 0) {
            return res.status(400).json({ error: "Image prompt is required" });
        }

        const result = await regenerateImage(prompt, oldFilePath);

        if (!result.success) {
            return res.status(500).json({ error: result.error || "Failed to regenerate image" });
        }

        res.json({
            success: true,
            publicUrl: result.publicUrl,
            filePath: result.filePath,
        });
    } catch (error) {
        console.error("Image regeneration error:", error);
        res.status(500).json({ error: "Failed to regenerate image" });
    }
});

// POST /api/demo/water-science/generate (Demo Agent)
// Note: This was in admin group but route is /api/demo/... 
// We will register this router under /api in the main routes file logic, OR keep it here but route path might be weird if we mount at /api/admin/ai-tools. 
// Let's assume we mount this router at /api/admin and handle the demo route separately or make it admin only.
// actually, let's keep it here for now but exposed as /demo in the mount point if possible, or just specific route.
router.post("/demo/water-science/generate", async (req, res) => {
    try {
        const { WaterScienceAgent } = await import("../../agents/water-science-agent-demo");
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const result = await WaterScienceAgent.generate(prompt);
        res.json(result);
    } catch (error) {
        console.error("Demo generation error:", error);
        res.status(500).json({ error: "Failed to generate demo content" });
    }
});

export default router;
