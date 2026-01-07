// @ts-nocheck
import { Router } from 'express';
import { db } from '../../db';
import { glossaryTerms } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';
import { z } from 'zod';

const router = Router();

// Get all terms
router.get('/glossary', async (req, res) => {
    try {
        const terms = await db.select().from(glossaryTerms).orderBy(desc(glossaryTerms.createdAt));
        res.json(terms);
    } catch (error) {
        console.error('Error fetching glossary terms:', error);
        res.status(500).json({ error: 'Failed to fetch terms' });
    }
});

// Create new term
router.post('/glossary', async (req, res) => {
    try {
        const schema = z.object({
            term: z.string().min(1),
            definition: z.string().min(1),
            variations: z.array(z.string()).optional(),
            tags: z.array(z.string()).optional(),
            referenceUrl: z.string().optional(),
        });

        const data = schema.parse(req.body);

        const [term] = await db.insert(glossaryTerms).values({
            term: data.term,
            definition: data.definition,
            variations: data.variations || [],
            tags: data.tags || [],
            referenceUrl: data.referenceUrl,
        }).returning();

        res.json(term);
    } catch (error) {
        console.error('Error creating glossary term:', error);
        res.status(500).json({ error: 'Failed to create term' });
    }
});

// Delete term
router.delete('/glossary/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.delete(glossaryTerms).where(eq(glossaryTerms.id, id));
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting glossary term:', error);
        res.status(500).json({ error: 'Failed to delete term' });
    }
});

export default router;
// @ts-nocheck
