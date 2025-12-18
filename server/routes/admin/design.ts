import { Router } from "express";
import { visualInterpreterAgent } from "../../agents/visual-interpreter";
import { aiLimiter, designGenLimiter } from "../../middleware/rateLimiter";

const router = Router();

// POST /api/admin/design/interpret
// Interprets text content into an Andara visual design specification
router.post("/interpret", aiLimiter, async (req, res) => {
    try {
        const { content, context } = req.body;

        if (!content) {
            return res.status(400).json({ error: "Content is required" });
        }

        const result = await visualInterpreterAgent.execute({
            id: `task-${Date.now()}`,
            type: "interpret_page",
            input: { content, context },
        });

        if (!result.success) {
            return res.status(500).json({ error: result.error || "Failed to interpret design" });
        }

        res.json(result);
    } catch (error: any) {
        console.error("Design interpretation error:", error);
        res.status(500).json({ error: error.message });
    }
});

// POST /api/admin/design/color-world
// Gets the color world for a specific tree/theme
router.post("/color-world", aiLimiter, async (req, res) => {
    try {
        const { tree, description } = req.body;

        const result = await visualInterpreterAgent.execute({
            id: `task-${Date.now()}`,
            type: "map_color_world",
            input: { theme: tree || description, topic: description || tree },
        });

        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/admin/design/magic-pages
// Generated a draft page from a visual interpretation and learns user preferences
router.post("/magic-pages", designGenLimiter, async (req, res) => {
    try {
        const { title, sourceType, sourceContent, designContext } = req.body;
        const { generatePageFromBrief } = await import("../../services/ai-startup");
        const { recordDesignPreference } = await import("../../services/conversation-learning");

        if (!sourceContent) {
            return res.status(400).json({ error: "Source content is required" });
        }

        // 1. Generate the page using the interpreted brief
        const result = await generatePageFromBrief(sourceContent, title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));

        // 2. Learn from this action (Design Memory)
        if (designContext) {
            await recordDesignPreference("magic_page_creation", {
                theme: designContext.theme,
                colorWorld: designContext.colorWorld,
                visualVibe: designContext.visualVibe
            });
        }

        res.json({ success: true, ...result });

    } catch (error: any) {
        console.error("Magic page generation error:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
