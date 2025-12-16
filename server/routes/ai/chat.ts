import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { db } from '../../db';
import { agentRegistry } from '../../agents/base';

const router = Router();

// GET /api/ai/chat/conversations
router.get('/chat/conversations', requireAdmin, async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, conversation_type, created_at, updated_at FROM conversations ORDER BY updated_at DESC LIMIT 50'
        );

        res.json({
            ok: true,
            conversations: result.rows
        });
    } catch (error) {
        console.error('Get conversations error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch conversations' });
    }
});

// GET /api/ai/chat/conversations/:id
router.get('/chat/conversations/:id', requireAdmin, async (req, res) => {
    try {
        const result = await db.query(' SELECT * FROM conversations WHERE id = $1', [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, error: 'Conversation not found' });
        }

        res.json({
            ok: true,
            conversation: result.rows[0]
        });
    } catch (error) {
        console.error('Get conversation error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch conversation' });
    }
});

// POST /api/ai/chat
router.post('/chat', requireAdmin, async (req, res) => {
    try {
        const { message, conversationId } = req.body;

        if (!message) {
            return res.status(400).json({ ok: false, error: 'Message is required' });
        }

        let conversation: any;

        if (conversationId) {
            // Get existing conversation
            const result = await db.query('SELECT * FROM conversations WHERE id = $1', [conversationId]);
            if (result.rows.length > 0) {
                conversation = result.rows[0];
            }
        }

        if (!conversation) {
            // Create new conversation
            const result = await db.query(`
        INSERT INTO conversations (conversation_type, messages, context)
        VALUES ($1, $2, $3)
        RETURNING *
      `, ['general', JSON.stringify([]), JSON.stringify({})]);
            conversation = result.rows[0];
        }

        // Add user message
        const messages = conversation.messages || [];
        messages.push({
            role: 'user',
            content: message,
            timestamp: new Date().toISOString()
        });

        // Get orchestrator agent
        const orchestrator = agentRegistry.get('orchestrator');
        let response = 'I can help you manage your CMS. What would you like to do?';

        if (orchestrator) {
            const result = await orchestrator.execute({
                id: 'chat-' + Date.now(),
                type: 'chat',
                input: { message }
            });

            if (result.success && result.output) {
                response = result.output.response || result.output.content || JSON.stringify(result.output);
            }
        }

        // Add assistant response
        messages.push({
            role: 'assistant',
            content: response,
            timestamp: new Date().toISOString()
        });

        // Update conversation
        await db.query(`
      UPDATE conversations  
      SET messages = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `, [JSON.stringify(messages), conversation.id]);

        res.json({
            ok: true,
            conversationId: conversation.id,
            response
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ ok: false, error: 'Chat failed' });
    }
});

// DELETE /api/ai/chat/conversations/:id
router.delete('/chat/conversations/:id', requireAdmin, async (req, res) => {
    try {
        await db.query('DELETE FROM conversations WHERE id = $1', [req.params.id]);

        res.json({
            ok: true,
            deleted: true
        });
    } catch (error) {
        console.error('Delete conversation error:', error);
        res.status(500).json({ ok: false, error: 'Failed to delete conversation' });
    }
});

export default router;
