import type { Request, Response } from 'express';
import { streamText } from 'ai';
import { chatWithFunctions, type ChatMessage } from './bigmind-cms';
import { getAiClient } from './andara-chat';

/**
 * Streaming chat endpoint for modern UI
 * Uses Vercel AI SDK streaming format
 */
export async function handleStreamingChat(req: Request, res: Response) {
    try {
        const { messages, model, sessionId } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'Messages array is required' });
        }

        // Convert Vercel AI SDK format to BigMind format
        const bigmindMessages: ChatMessage[] = messages.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content,
        }));

        // Set headers for streaming
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // Get AI response (this uses our existing BigMind with RAG)
        const result = await chatWithFunctions(bigmindMessages, undefined, model);

        // Stream the response word by word
        const words = result.response.split(' ');
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const chunk = i === words.length - 1 ? word : word + ' ';

            // Send in Vercel AI SDK format
            res.write(`0:${JSON.stringify(chunk)}\n`);

            // Small delay for smooth streaming effect
            await new Promise(resolve => setTimeout(resolve, 20));
        }

        // Send finish marker
        res.write(`d:{"finishReason":"stop"}\n`);
        res.end();

    } catch (error: any) {
        console.error('[BigMind Stream] Error:', error);

        // Try fallback RAG
        try {
            const { generateFallbackResponse } = await import('./fallback-ai');
            const lastUserMessage = req.body.messages?.filter((m: any) => m.role === 'user').pop();

            if (lastUserMessage) {
                const fallback = await generateFallbackResponse(lastUserMessage.content);
                res.write(`0:${JSON.stringify(fallback.response)}\n`);
                res.write(`d:{"finishReason":"stop"}\n`);
                res.end();
                return;
            }
        } catch (fallbackError) {
            console.error('[BigMind Stream] Fallback also failed:', fallbackError);
        }

        res.status(500).json({ error: 'Failed to process chat request' });
    }
}
