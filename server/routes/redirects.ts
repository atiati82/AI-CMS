
import { Router } from "express";
import { db } from "../db";
import { redirects } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

const router = Router();

// GET all redirects
router.get("/", async (req, res) => {
    try {
        const list = await db.select().from(redirects).orderBy(desc(redirects.createdAt));
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch redirects" });
    }
});

// POST create redirect
router.post("/", async (req, res) => {
    try {
        const { sourcePath, targetPath, type, description } = req.body;

        // Normalize paths (ensure leading slash)
        const normalizedSource = sourcePath.startsWith('/') ? sourcePath : `/${sourcePath}`;
        const normalizedTarget = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;

        const [redirect] = await db.insert(redirects).values({
            sourcePath: normalizedSource,
            targetPath: normalizedTarget,
            type: type || '301',
            description
        }).returning();

        res.json(redirect);
    } catch (error: any) {
        if (error.code === '23505') {
            return res.status(400).json({ error: "A redirect for this source path already exists" });
        }
        res.status(500).json({ error: "Failed to create redirect" });
    }
});

// PUT update redirect
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { sourcePath, targetPath, type, isActive, description } = req.body;

        const [updated] = await db.update(redirects)
            .set({
                sourcePath,
                targetPath,
                type,
                isActive,
                description,
                updatedAt: new Date()
            })
            .where(eq(redirects.id, id))
            .returning();

        if (!updated) return res.status(404).json({ error: "Redirect not found" });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Failed to update redirect" });
    }
});

// DELETE redirect
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await db.delete(redirects).where(eq(redirects.id, id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete redirect" });
    }
});

export default router;
