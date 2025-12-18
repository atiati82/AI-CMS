import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { db } from '../../db';
import { bigmindSessions, bigmindMessages } from '@shared/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { chatWithFunctions } from '../../services/bigmind-cms';

const router = Router();

// GET /api/admin/bigmind/sessions - List all sessions
router.get('/sessions', requireAdmin, async (req, res) => {
    try {
        const sessions = await db
            .select()
            .from(bigmindSessions)
            .orderBy(desc(bigmindSessions.updatedAt))
            .limit(50);

        res.json(sessions);
    } catch (error) {
        console.error('Get sessions error:', error);
        res.status(500).json({ error: 'Failed to fetch sessions' });
    }
});

// POST /api/admin/bigmind/sessions - Create new session
router.post('/sessions', requireAdmin, async (req, res) => {
    try {
        const { title = 'New Chat', mode = 'cms' } = req.body;

        const [session] = await db
            .insert(bigmindSessions)
            .values({
                title,
                mode,
                messageCount: 0,
            })
            .returning();

        res.json(session);
    } catch (error) {
        console.error('Create session error:', error);
        res.status(500).json({ error: 'Failed to create session' });
    }
});

// GET /api/admin/bigmind/sessions/:id/messages - Get messages for a session
router.get('/sessions/:id/messages', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const messages = await db
            .select()
            .from(bigmindMessages)
            .where(eq(bigmindMessages.sessionId, id))
            .orderBy(bigmindMessages.createdAt);

        res.json(messages);
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// POST /api/admin/bigmind/sessions/:id/messages - Add message to session
router.post('/sessions/:id/messages', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { role, content, functionCalls } = req.body;

        const [message] = await db
            .insert(bigmindMessages)
            .values({
                sessionId: id,
                role,
                content,
                functionCalls,
            })
            .returning();

        // Update session message count and last message time
        const messageCount = await db
            .select({ count: sql<number>`count(*)::int` })
            .from(bigmindMessages)
            .where(eq(bigmindMessages.sessionId, id));

        await db
            .update(bigmindSessions)
            .set({
                messageCount: messageCount[0]?.count || 0,
                lastMessageAt: new Date(),
                updatedAt: new Date(),
            })
            .where(eq(bigmindSessions.id, id));

        res.json(message);
    } catch (error) {
        console.error('Add message error:', error);
        res.status(500).json({ error: 'Failed to add message' });
    }
});

// POST /api/admin/bigmind/chat - Main chat endpoint
router.post('/chat', requireAdmin, async (req, res) => {
    try {
        const { messages, model = 'gemini-2.0-flash', sessionId, context } = req.body;

        if (!messages || messages.length === 0) {
            return res.status(400).json({ error: 'Messages are required' });
        }

        // Convert to BigMind format
        const bigmindMessages = messages.map((msg: any) => ({
            role: msg.role,
            parts: [{ text: msg.content }],
        }));

        // Add context if provided
        let contextString = '';
        if (context) {
            contextString = `\n\nCONTEXT:\n`;
            if (context.currentPageTitle) contextString += `Page: ${context.currentPageTitle}\n`;
            if (context.currentPagePath) contextString += `Path: ${context.currentPagePath}\n`;
            if (context.currentPageSeoFocus) contextString += `SEO Focus: ${context.currentPageSeoFocus}\n`;
            if (context.objective) contextString += `Objective: ${context.objective}\n`;
        }

        // Call BigMind CMS with functions
        const result = await chatWithFunctions(bigmindMessages, contextString || undefined, model);

        // chatWithFunctions returns { response: string, functionCalls: [...] }
        const response = result?.response || '';
        const functionCalls = result?.functionCalls || [];

        res.json({
            response: response || 'No response generated',
            functionCalls,
            model,
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Chat failed: ' + (error instanceof Error ? error.message : 'Unknown error') });
    }
});

// DELETE /api/admin/bigmind/sessions/:id - Delete session
router.delete('/sessions/:id', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        // Messages will be cascade deleted
        await db
            .delete(bigmindSessions)
            .where(eq(bigmindSessions.id, id));

        res.json({ success: true });
    } catch (error) {
        console.error('Delete session error:', error);
        res.status(500).json({ error: 'Failed to delete session' });
    }
});

export default router;
