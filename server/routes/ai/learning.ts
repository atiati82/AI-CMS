import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import {
    ingestConversation,
    getAgentRecommendations,
    autoIngestCurrentSession
} from '../../services/conversation-learning';
import { pool } from '../../db';
import { searchKnowledge } from '../../services/knowledge-base';
import multer from 'multer';
import { getAiClient } from '../../services/andara-chat';

const router = Router();

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST /api/ai/learning/ingest/:conversationId
router.post('/learning/ingest/:conversationId', requireAdmin, async (req, res) => {
    try {
        await ingestConversation(req.params.conversationId);

        res.json({
            ok: true,
            message: 'Conversation ingested into knowledge base for AI learning'
        });
    } catch (error: any) {
        console.error('Ingest conversation error:', error);
        res.status(500).json({ ok: false, error: error.message || 'Failed to ingest conversation' });
    }
});

// POST /api/ai/learning/ingest-current
router.post('/learning/ingest-current', requireAdmin, async (req, res) => {
    try {
        await autoIngestCurrentSession();

        res.json({
            ok: true,
            message: 'Current session ingested into knowledge base'
        });
    } catch (error) {
        console.error('Auto-ingest error:', error);
        res.status(500).json({ ok: false, error: 'Failed to ingest current session' });
    }
});

// GET /api/ai/learning/recommendations
router.get('/learning/recommendations', requireAdmin, async (req, res) => {
    try {
        const conversationId = req.query.conversationId as string;
        const recommendations = await getAgentRecommendations(conversationId);

        res.json({
            ok: true,
            recommendations,
            count: recommendations.length
        });
    } catch (error) {
        console.error('Get recommendations error:', error);
        res.status(500).json({ ok: false, error: 'Failed to get recommendations' });
    }
});

// POST /api/ai/learning/upload-chat - Upload and process chat file
router.post('/learning/upload-chat', requireAdmin, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ ok: false, error: 'No file uploaded' });
        }

        const content = req.file.buffer.toString('utf-8');
        const format = req.body.format || 'json';
        const fileName = req.file.originalname;

        // Parse messages based on format
        let messages: Array<{ role: string; content: string; timestamp?: string }> = [];

        if (format === 'json') {
            const data = JSON.parse(content);
            messages = Array.isArray(data) ? data : [];
        } else if (format === 'text') {
            const lines = content.split('\n');
            for (const line of lines) {
                const match = line.match(/^\[?(USER|ASSISTANT|SYSTEM)\]?:\s*(.+)$/i);
                if (match) {
                    messages.push({
                        role: match[1].toLowerCase(),
                        content: match[2].trim()
                    });
                }
            }
        } else if (format === 'markdown') {
            // Simple markdown parsing
            const lines = content.split('\n');
            let currentRole: string | null = null;
            let currentContent: string[] = [];

            for (const line of lines) {
                const roleMatch = line.match(/^\*\*?(USER|ASSISTANT|SYSTEM)\*\*?:?\s*(.*)$/i);
                if (roleMatch) {
                    if (currentRole && currentContent.length > 0) {
                        messages.push({
                            role: currentRole,
                            content: currentContent.join('\n').trim()
                        });
                    }
                    currentRole = roleMatch[1].toLowerCase();
                    currentContent = roleMatch[2] ? [roleMatch[2]] : [];
                } else if (currentRole && line.trim() && !line.startsWith('#')) {
                    currentContent.push(line.trim());
                }
            }
            if (currentRole && currentContent.length > 0) {
                messages.push({
                    role: currentRole,
                    content: currentContent.join('\n').trim()
                });
            }
        }

        if (messages.length === 0) {
            return res.status(400).json({ ok: false, error: 'No messages found in file' });
        }

        // Generate conversation ID
        const conversationId = `chat-${Date.now()}-${fileName.replace(/\.[^.]+$/, '')}`;

        // Store in database (simplified - you can enhance this)
        const conversationText = messages.map(m => `[${m.role.toUpperCase()}]: ${m.content}`).join('\n\n');

        // Store basic info
        await pool.query(`
            INSERT INTO knowledge_base (id, data_type, content, source)
            VALUES ($1, $2, $3, $4)
        `, [
            conversationId,
            'conversation',
            JSON.stringify({
                title: `Chat: ${fileName}`,
                messages,
                messageCount: messages.length
            }),
            `chat-upload:${fileName}`
        ]);

        res.json({
            ok: true,
            conversationId,
            messageCount: messages.length,
            message: 'Chat uploaded and processed successfully'
        });

    } catch (error: any) {
        console.error('Upload chat error:', error);
        res.status(500).json({ ok: false, error: error.message || 'Failed to upload chat' });
    }
});

// GET /api/ai/learning/lessons - Get all learned lessons
router.get('/learning/lessons', requireAdmin, async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
        const severity = req.query.severity as string;
        const tag = req.query.tag as string;

        let query = `
            SELECT 
                lesson_id,
                title,
                root_cause,
                do_not_repeat_policy,
                tags,
                severity,
                trigger_count,
                last_triggered,
                created_at
            FROM rag_memory_objects
            WHERE 1=1
        `;
        const params: any[] = [];
        let paramCount = 1;

        if (severity) {
            query += ` AND severity = $${paramCount}`;
            params.push(severity);
            paramCount++;
        }

        if (tag) {
            query += ` AND tags @> ARRAY[$${paramCount}]::text[]`;
            params.push(tag);
            paramCount++;
        }

        query += ` ORDER BY trigger_count DESC, created_at DESC LIMIT $${paramCount}`;
        params.push(limit);

        const result = await pool.query(query, params);

        res.json({
            ok: true,
            lessons: result.rows,
            count: result.rows.length
        });

    } catch (error) {
        console.error('Get lessons error:', error);
        res.status(500).json({ ok: false, error: 'Failed to get lessons' });
    }
});

// GET /api/ai/learning/stats - Get learning statistics
router.get('/learning/stats', requireAdmin, async (req, res) => {
    try {
        // Get total lessons
        const totalResult = await pool.query('SELECT COUNT(*) as total FROM rag_memory_objects');
        const total = parseInt(totalResult.rows[0].total);

        // Get lessons by category (using tags)
        const categoryResult = await pool.query(`
            SELECT 
                UNNEST(tags) as category,
                COUNT(*) as count
            FROM rag_memory_objects
            GROUP BY category
            ORDER BY count DESC
            LIMIT 10
        `);

        // Get lessons by severity
        const severityResult = await pool.query(`
            SELECT severity, COUNT(*) as count
            FROM rag_memory_objects
            GROUP BY severity
        `);

        // Get most triggered lessons
        const topTriggeredResult = await pool.query(`
            SELECT title, trigger_count, severity
            FROM rag_memory_objects
            ORDER BY trigger_count DESC
            LIMIT 10
        `);

        // Get recent lessons
        const recentResult = await pool.query(`
            SELECT title, created_at, severity
            FROM rag_memory_objects
            ORDER BY created_at DESC
            LIMIT 10
        `);

        res.json({
            ok: true,
            stats: {
                total,
                byCategory: categoryResult.rows,
                bySeverity: severityResult.rows,
                topTriggered: topTriggeredResult.rows,
                recent: recentResult.rows
            }
        });

    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ ok: false, error: 'Failed to get statistics' });
    }
});

// POST /api/ai/learning/query - Wayback query endpoint
router.post('/learning/query', requireAdmin, async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ ok: false, error: 'Question is required' });
        }

        // Search knowledge base
        const knowledgeResults = await searchKnowledge(question, 5);

        // Search lessons
        const keywords = question.toLowerCase().split(' ').filter((w: string) => w.length > 3).slice(0, 5);
        const lessonsResult = await pool.query(`
            SELECT 
                title,
                do_not_repeat_policy,
                severity,
                trigger_count,
                tags
            FROM rag_memory_objects
            WHERE 
                tags && $1::text[]
                OR title ILIKE ANY($2::text[])
            ORDER BY trigger_count DESC
            LIMIT 5
        `, [
            keywords,
            keywords.map((k: string) => `%${k}%`)
        ]);

        // Generate AI answer
        const knowledgeContext = knowledgeResults.map((r, i) => `[${i + 1}] ${r.content}`).join('\n\n');
        const lessonsContext = lessonsResult.rows.map((l, i) => `[${i + 1}] ${l.title}: ${l.do_not_repeat_policy}`).join('\n\n');

        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [{
                role: 'user',
                parts: [{
                    text: `Based on this knowledge:\n\n${knowledgeContext}\n\nAnd these lessons:\n\n${lessonsContext}\n\nAnswer: ${question}`
                }]
            }],
            config: { temperature: 0.4, maxOutputTokens: 2000 }
        });

        res.json({
            ok: true,
            answer: response.text || 'No answer generated',
            sources: knowledgeResults.map(r => ({
                title: r.title,
                content: r.content.substring(0, 200),
                source: r.source
            })),
            relatedLessons: lessonsResult.rows
        });

    } catch (error: any) {
        console.error('Query error:', error);
        res.status(500).json({ ok: false, error: error.message || 'Failed to query' });
    }
});

export default router;

