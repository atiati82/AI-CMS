import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';

const router = Router();

const AVAILABLE_MODELS = [
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'gemini' },
    { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash (Experimental)', provider: 'gemini' },
    { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', provider: 'openai' },
    { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'openai' },
];

/**
 * Clean AI response by removing HTML artifacts and ensuring clean markdown
 */
function cleanAiResponse(text: string): string {
    let cleaned = text;

    // Remove HTML tags that shouldn't be in markdown output
    cleaned = cleaned.replace(/<details[^>]*>[\s\S]*?<\/details>/gi, (match) => {
        // Extract content from details/summary/code blocks
        const summaryMatch = match.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i);
        const codeMatch = match.match(/<code[^>]*>([\s\S]*?)<\/code>/i);
        const preMatch = match.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);

        let content = '';
        if (codeMatch) {
            content = codeMatch[1];
        } else if (preMatch) {
            content = preMatch[1];
        }

        // Clean up the content
        content = content.replace(/<[^>]+>/g, '').trim();

        if (content) {
            return '\n```\n' + content + '\n```\n';
        }
        return '';
    });

    // Remove remaining HTML tags
    cleaned = cleaned.replace(/<[^>]+>/g, '');

    // Decode HTML entities
    cleaned = cleaned.replace(/&amp;/g, '&');
    cleaned = cleaned.replace(/&lt;/g, '<');
    cleaned = cleaned.replace(/&gt;/g, '>');
    cleaned = cleaned.replace(/&quot;/g, '"');
    cleaned = cleaned.replace(/&#39;/g, "'");
    cleaned = cleaned.replace(/&nbsp;/g, ' ');

    // Clean up excessive whitespace
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

    return cleaned.trim();
}

/**
 * Get available AI models
 */
router.get('/admin-chat/models', requireAdmin, (req, res) => {
    res.json({ models: AVAILABLE_MODELS });
});

/**
 * Admin chat endpoint for AI Page Builder with model selection
 */
router.post('/admin-chat', requireAdmin, async (req, res) => {
    try {
        const { messages, pageContext, model } = req.body;

        if (!messages || messages.length === 0) {
            return res.status(400).json({ error: 'Messages are required' });
        }

        // Convert to ChatMessage format
        const chatMessages = messages.map((msg: any) => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
        }));

        // Get the user's latest message
        const userMessage = chatMessages[chatMessages.length - 1];

        if (!userMessage || userMessage.role !== 'user') {
            return res.status(400).json({ error: 'Last message must be from user' });
        }

        // Try AI-powered response first, fall back to knowledge base
        const selectedModel = model || 'gemini-2.0-flash';
        console.log(`[Admin Chat] Using model: ${selectedModel}`);

        try {
            // Import AI client
            const { getAiClient, MODEL_PROVIDERS, DEFAULT_MODEL } = await import('../../services/andara-chat');

            // Get AI client for selected model
            const { client, model: resolvedModel } = await getAiClient(selectedModel);

            // Build system context
            let systemContext = `You are BigMind, an intelligent AI assistant for the Andara CMS. 
You help users create, edit, and optimize content for the Andara Ionic mineral water brand.

Guidelines:
- Provide helpful, accurate information
- Format responses in clean Markdown
- For content generation, use proper headers and structure
- Be concise but comprehensive
- When suggesting content for specific fields, use this format so users can apply:
  [APPLY:fieldName]suggested value[/APPLY]
  Example: [APPLY:seoTitle]Discover the Science of DNA[/APPLY]
  Valid fieldNames: title, seoTitle, seoDescription, seoFocus, summary, content, featuredImage, motionPreset`;

            if (pageContext) {
                // Build detailed page field status
                const fieldStatus = [
                    { name: 'title', label: 'Title', value: pageContext.title },
                    { name: 'seoTitle', label: 'SEO Title', value: pageContext.seoTitle },
                    { name: 'seoDescription', label: 'SEO Description', value: pageContext.seoDescription },
                    { name: 'seoFocus', label: 'Focus Keyword', value: pageContext.seoFocus },
                    { name: 'summary', label: 'Summary', value: pageContext.summary },
                    { name: 'content', label: 'Content', value: pageContext.content ? `${pageContext.content.length} chars` : null },
                    { name: 'featuredImage', label: 'Featured Image', value: pageContext.featuredImage },
                    { name: 'clusterKey', label: 'Cluster', value: pageContext.cluster },
                    { name: 'status', label: 'Status', value: pageContext.status },
                ];

                const filledFields = fieldStatus.filter(f => f.value).map(f => `✓ ${f.label}: ${String(f.value).substring(0, 50)}${String(f.value).length > 50 ? '...' : ''}`);
                const emptyFields = fieldStatus.filter(f => !f.value).map(f => `✗ ${f.label} (empty)`);

                systemContext += `\n\n## Current Page Context
**Title:** ${pageContext.title || 'Not set'}
**Path:** ${pageContext.path || 'Not set'}
**Cluster:** ${pageContext.cluster || 'Not set'}

### Field Status (${filledFields.length} filled, ${emptyFields.length} empty):
${filledFields.join('\n')}
${emptyFields.length > 0 ? '\nMissing fields that need content:\n' + emptyFields.join('\n') : ''}

When suggesting improvements for empty fields, wrap your suggestion in [APPLY:fieldName]...[/APPLY] tags so users can click to apply.`;
            }

            // Build message contents for Gemini/OpenAI
            const contents = [
                {
                    role: 'user',
                    parts: [{ text: `SYSTEM: ${systemContext}\n\nNow respond to the conversation.` }]
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood. I am BigMind, ready to help you with your Andara content.' }]
                },
                ...chatMessages.map((msg: any) => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }]
                }))
            ];

            // Generate response
            const response = await client.models.generateContent({
                model: resolvedModel,
                contents,
            });

            const rawText = response.text?.trim() || 'No response generated';
            const responseText = cleanAiResponse(rawText);

            res.json({
                response: responseText,
                model: resolvedModel,
                success: true,
            });

        } catch (aiError) {
            console.error('[Admin Chat] AI error, falling back to knowledge base:', aiError);

            // Fall back to knowledge base search
            try {
                const { searchKnowledge } = await import('../../services/knowledge-base');
                const { ResponseFormatter } = await import('../../services/response-formatter');

                const results = await searchKnowledge(userMessage.content, 5);

                if (results && results.length > 0) {
                    const formatter = new ResponseFormatter();
                    const formatted = formatter.formatResponse(userMessage.content, results);

                    res.json({
                        response: formatted.response,
                        model: 'knowledge-base',
                        success: true,
                        fallback: true,
                    });
                } else {
                    res.json({
                        response: `I couldn't connect to the AI service and didn't find relevant information in the knowledge base for "${userMessage.content}". Please try again or ask about water science, minerals, or the Andara system.`,
                        model: 'none',
                        success: true,
                        fallback: true,
                    });
                }
            } catch (kbError) {
                console.error('[Admin Chat] Knowledge base fallback also failed:', kbError);
                res.json({
                    response: `I'm having trouble connecting to AI services. Error: ${aiError instanceof Error ? aiError.message : 'Unknown error'}`,
                    model: 'error',
                    success: false,
                });
            }
        }
    } catch (error) {
        console.error('[Admin Chat] Fatal error:', error);
        res.status(500).json({
            error: 'Chat failed: ' + (error instanceof Error ? error.message : 'Unknown error'),
            success: false,
        });
    }
});

/**
 * Get chat history for a specific page
 */
router.get('/admin-chat/history/:pageId', requireAdmin, async (req, res) => {
    try {
        const { pageId } = req.params;
        const { storage } = await import('../../storage');

        const page = await storage.getPage(pageId);
        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }

        res.json({
            pageId,
            chatHistory: page.aiChatHistory || { messages: [] },
            success: true,
        });
    } catch (error) {
        console.error('[Admin Chat] Error fetching chat history:', error);
        res.status(500).json({ error: 'Failed to fetch chat history' });
    }
});

/**
 * Save chat history for a specific page
 */
router.post('/admin-chat/history/:pageId', requireAdmin, async (req, res) => {
    try {
        const { pageId } = req.params;
        const { messages, model } = req.body;
        const { storage } = await import('../../storage');

        const page = await storage.getPage(pageId);
        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }

        // Extract enhancements from chat history
        const extractedEnhancements = extractEnhancementsFromChat(messages);

        // Build chat history object
        const aiChatHistory = {
            messages: messages.map((msg: any) => ({
                role: msg.role,
                content: msg.content,
                timestamp: msg.timestamp || new Date().toISOString(),
                model: msg.model,
            })),
            lastModel: model,
            extractedEnhancements,
        };

        // Update page with chat history
        await storage.updatePage(pageId, { aiChatHistory } as any);

        res.json({
            pageId,
            chatHistory: aiChatHistory,
            success: true,
        });
    } catch (error) {
        console.error('[Admin Chat] Error saving chat history:', error);
        res.status(500).json({ error: 'Failed to save chat history' });
    }
});

/**
 * Extract enhancements from AI chat messages
 */
function extractEnhancementsFromChat(messages: Array<{ role: string; content: string }>) {
    const enhancements: any = {};

    // Look through assistant messages for enhancement patterns
    const assistantMessages = messages.filter(m => m.role === 'assistant');

    for (const msg of assistantMessages) {
        const content = msg.content;

        // Extract page title from markdown H1 (# Title)
        const h1Match = content.match(/^#\s+(.+)$/m);
        if (h1Match && !enhancements.title) {
            enhancements.title = h1Match[1].trim();
        }

        // Extract SEO Title (look for patterns like "SEO Title: ..." or "seoTitle: ...")
        const seoTitleMatch = content.match(/(?:SEO\s*Title|seoTitle|SEO_TITLE)[:\s]+["']?([^"\n]+)["']?/i);
        if (seoTitleMatch && !enhancements.seoTitle) {
            enhancements.seoTitle = seoTitleMatch[1].trim();
        }

        // Extract SEO Description
        const seoDescMatch = content.match(/(?:SEO\s*Description|seoDescription|SEO_DESCRIPTION|meta\s*description)[:\s]+["']?([^"\n]{50,160})["']?/i);
        if (seoDescMatch && !enhancements.seoDescription) {
            enhancements.seoDescription = seoDescMatch[1].trim();
        }

        // Extract summary from first meaningful paragraph (after any headers)
        const paragraphMatch = content.match(/^(?:(?!#|```|\*|-).{50,300})/m);
        if (paragraphMatch && !enhancements.summary) {
            const summary = paragraphMatch[0].trim();
            if (summary.length >= 50 && summary.length <= 300) {
                enhancements.summary = summary;
            }
        }

        // Extract Visual Config block
        const visualConfigMatch = content.match(/```visual-config\n([\s\S]*?)```/);
        if (visualConfigMatch && !enhancements.visualConfig) {
            enhancements.visualConfig = parseVisualConfigBlock(visualConfigMatch[1]);
        }

        // Extract Image Prompts
        const imagePromptsMatch = content.match(/```image-prompts?\n([\s\S]*?)```/);
        if (imagePromptsMatch && !enhancements.imagePrompts) {
            enhancements.imagePrompts = imagePromptsMatch[1]
                .split('\n')
                .filter((line: string) => line.trim())
                .map((line: string) => line.replace(/^[-*]\s*/, '').trim());
        }

        // Extract Motion Specs
        const motionMatch = content.match(/(?:MOTION\s*PRESET|motionPreset)[:\s]+["']?([^"\n]+)["']?/i);
        if (motionMatch && !enhancements.motionSpecs) {
            enhancements.motionSpecs = { preset: motionMatch[1].trim() };
        }

        // Extract HTML content from markdown code block
        const markdownBlock = content.match(/```(?:markdown|html)?\n([\s\S]*?)```/);
        if (markdownBlock && !enhancements.htmlContent) {
            enhancements.htmlContent = markdownBlock[1].trim();
        }

        // Extract key points from bullet lists (H2 sections followed by bullets)
        const bulletMatch = content.match(/(?:^|\n)\*\s+\*\*([^*]+)\*\*[:\s]([^\n]+)/gm);
        if (bulletMatch && bulletMatch.length > 0 && !enhancements.keyPoints) {
            enhancements.keyPoints = bulletMatch.slice(0, 5).map((m: string) => {
                const match = m.match(/\*\s+\*\*([^*]+)\*\*[:\s](.+)/);
                return match ? `${match[1]}: ${match[2]}` : m.trim();
            });
        }
    }

    return Object.keys(enhancements).length > 0 ? enhancements : undefined;
}

/**
 * Parse visual config block into structured object
 */
function parseVisualConfigBlock(block: string): any {
    const config: any = {};
    const lines = block.split('\n');

    for (const line of lines) {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim();
            const normalizedKey = key.trim().toLowerCase().replace(/\s+/g, '_');

            // Parse array-like values
            if (value.startsWith('[') && value.endsWith(']')) {
                config[normalizedKey] = value
                    .slice(1, -1)
                    .split(',')
                    .map((v: string) => v.trim());
            } else {
                config[normalizedKey] = value;
            }
        }
    }

    return config;
}

export default router;
