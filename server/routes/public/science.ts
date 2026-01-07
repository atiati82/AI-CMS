import { Router } from "express";
import { storage } from "../../storage";

const router = Router();

// GET /api/science-articles
router.get("/", async (req, res) => {
    try {
        const { clusterId, tags, relatedProductIds, limit } = req.query;

        if (clusterId || tags || relatedProductIds) {
            const articles = await storage.getRelevantArticles({
                clusterId: clusterId as string,
                tags: tags ? (tags as string).split(',') : undefined,
                relatedProductIds: relatedProductIds ? (relatedProductIds as string).split(',') : undefined,
                limit: limit ? parseInt(limit as string) : undefined
            });
            return res.json(articles);
        }

        const articles = await storage.getAllScienceArticles();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch articles" });
    }
});

// GET /api/science-articles/:slug
router.get("/:slug", async (req, res) => {
    try {
        const article = await storage.getScienceArticleBySlug(req.params.slug);
        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch article" });
    }
});

export default router;
