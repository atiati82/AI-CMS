/**
 * Chat Export Ingestion Script with AI-Powered Teaching Extraction
 * 
 * Supports multiple formats: JSON, Text, Markdown
 * Extracts: successful patterns, error/fix pairs, user preferences, communication patterns
 * 
 * Usage:
 *   npx tsx scripts/ingest-chat-export.ts path/to/chat.json
 *   npx tsx scripts/ingest-chat-export.ts path/to/chat.txt --format text
 *   npx tsx scripts/ingest-chat-export.ts path/to/chat.md --format markdown
 */

import { pool } from '../server/db';
import { ingestDocument } from '../server/services/knowledge-base';
import * as fs from 'fs';
import * as path from 'path';
import { getAiClient } from '../server/services/andara-chat';

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: string;
}

interface TeachingMoment {
    type: 'success_pattern' | 'error_fix' | 'user_preference' | 'communication_pattern';
    title: string;
    description: string;
    context: string;
    examples: string[];
    severity: 'info' | 'warning' | 'error' | 'critical';
    tags: string[];
}

// ============================================================================
// FORMAT PARSERS
// ============================================================================

function parseJsonFormat(content: string): ChatMessage[] {
    try {
        const data = JSON.parse(content);
        if (Array.isArray(data)) {
            return data.map(msg => ({
                role: msg.role || 'user',
                content: msg.content || msg.message || '',
                timestamp: msg.timestamp || msg.time || new Date().toISOString()
            }));
        }
        throw new Error('JSON must be an array of messages');
    } catch (error) {
        throw new Error(`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

function parseTextFormat(content: string): ChatMessage[] {
    const messages: ChatMessage[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Match patterns: [USER]: content, [ASSISTANT]: content, USER: content, etc.
        const match = trimmed.match(/^\[?(USER|ASSISTANT|SYSTEM)\]?:\s*(.+)$/i);
        if (match) {
            messages.push({
                role: match[1].toLowerCase() as 'user' | 'assistant' | 'system',
                content: match[2].trim(),
                timestamp: new Date().toISOString()
            });
        }
    }

    return messages;
}

function parseMarkdownFormat(content: string): ChatMessage[] {
    const messages: ChatMessage[] = [];
    const lines = content.split('\n');

    let currentRole: 'user' | 'assistant' | 'system' | null = null;
    let currentContent: string[] = [];

    for (const line of lines) {
        const trimmed = line.trim();

        // Match **User**: or **Assistant**: or similar
        const roleMatch = trimmed.match(/^\*\*?(USER|ASSISTANT|SYSTEM)\*\*?:?\s*(.*)$/i);
        if (roleMatch) {
            // Save previous message
            if (currentRole && currentContent.length > 0) {
                messages.push({
                    role: currentRole,
                    content: currentContent.join('\n').trim(),
                    timestamp: new Date().toISOString()
                });
            }

            currentRole = roleMatch[1].toLowerCase() as 'user' | 'assistant' | 'system';
            currentContent = roleMatch[2] ? [roleMatch[2]] : [];
        } else if (currentRole && trimmed && !trimmed.startsWith('#')) {
            // Continue current message
            currentContent.push(trimmed);
        }
    }

    // Save last message
    if (currentRole && currentContent.length > 0) {
        messages.push({
            role: currentRole,
            content: currentContent.join('\n').trim(),
            timestamp: new Date().toISOString()
        });
    }

    return messages;
}

// ============================================================================
// AI-POWERED TEACHING EXTRACTION
// ============================================================================

async function extractTeachingMoments(messages: ChatMessage[]): Promise<TeachingMoment[]> {
    console.log('🤖 Analyzing conversation with AI to extract teaching moments...\n');

    // Build conversation text
    const conversationText = messages.map((msg, idx) =>
        `[${idx + 1}] ${msg.role.toUpperCase()}: ${msg.content}`
    ).join('\n\n');

    const systemPrompt = `You are an AI learning specialist. Analyze this conversation and extract teaching moments for an AI agent to learn from.

Extract the following types of teaching moments:

1. **Success Patterns**: Actions that led to no complaints from the user (silence = success)
2. **Error/Fix Pairs**: Mistakes made and how they were corrected
3. **User Preferences**: Communication styles, workflow preferences, decision patterns
4. **Communication Patterns**: How the user likes to interact, give feedback, or request changes

For each teaching moment, provide:
- type: success_pattern | error_fix | user_preference | communication_pattern
- title: Brief descriptive title
- description: What was learned
- context: The situation where this applies
- examples: Specific quotes or actions from the conversation
- severity: info | warning | error | critical
- tags: Relevant tags for categorization

Return a JSON array of teaching moments. Be thorough - extract as many lessons as possible.`;

    const userPrompt = `Analyze this conversation and extract ALL teaching moments:\n\n${conversationText}`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [
                { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
            ],
            config: {
                temperature: 0.3,
                maxOutputTokens: 8000
            }
        });

        const text = response.text || '';

        // Extract JSON from response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const moments = JSON.parse(jsonMatch[0]) as TeachingMoment[];
            console.log(`✅ Extracted ${moments.length} teaching moments\n`);
            return moments;
        }

        console.warn('⚠️  AI did not return valid JSON, using fallback analysis\n');
        return fallbackExtraction(messages);

    } catch (error) {
        console.error('❌ AI extraction failed, using fallback:', error);
        return fallbackExtraction(messages);
    }
}

function fallbackExtraction(messages: ChatMessage[]): TeachingMoment[] {
    const moments: TeachingMoment[] = [];

    // Simple pattern detection
    for (let i = 0; i < messages.length - 1; i++) {
        const current = messages[i];
        const next = messages[i + 1];

        if (current.role === 'assistant' && next.role === 'user') {
            const hasComplaint = /wrong|error|mistake|fix|broken|not working|issue|problem|failed/i.test(next.content);

            if (!hasComplaint && next.content.length > 10) {
                moments.push({
                    type: 'success_pattern',
                    title: 'Successful Action',
                    description: 'User did not complain after this action',
                    context: current.content.substring(0, 200),
                    examples: [current.content.substring(0, 100)],
                    severity: 'info',
                    tags: ['success', 'no-complaint']
                });
            } else if (hasComplaint) {
                moments.push({
                    type: 'error_fix',
                    title: 'Error Detected',
                    description: 'User reported an issue',
                    context: next.content.substring(0, 200),
                    examples: [next.content.substring(0, 100)],
                    severity: 'warning',
                    tags: ['error', 'needs-fix']
                });
            }
        }
    }

    return moments;
}

// ============================================================================
// STORAGE
// ============================================================================

async function storeTeachingMoments(
    conversationId: string,
    moments: TeachingMoment[]
): Promise<void> {
    console.log('💾 Storing teaching moments in RAG memory...\n');

    for (const moment of moments) {
        const lessonId = `lesson-chat-${conversationId}-${moment.type}-${Date.now()}`;

        await pool.query(`
            INSERT INTO rag_memory_objects (
                lesson_id, title, root_cause, fix_steps, prevention_rule,
                do_not_repeat_policy, tags, severity, context, examples
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (lesson_id) DO UPDATE SET
                last_triggered = CURRENT_TIMESTAMP,
                trigger_count = rag_memory_objects.trigger_count + 1
        `, [
            lessonId,
            moment.title,
            JSON.stringify({ type: moment.type, description: moment.description }),
            JSON.stringify([{ step: 1, action: 'Apply learned pattern', description: moment.description }]),
            JSON.stringify({ rule: moment.context }),
            moment.description,
            [...moment.tags, 'chat-learning', moment.type],
            moment.severity,
            JSON.stringify({ conversationId, type: moment.type }),
            JSON.stringify({ right: moment.examples, wrong: [] })
        ]);

        console.log(`  ✅ Stored: ${moment.title} (${moment.type})`);
    }
}

async function storeFullConversation(
    conversationId: string,
    messages: ChatMessage[],
    metadata: Record<string, any>
): Promise<void> {
    console.log('\n📚 Storing full conversation in knowledge base...\n');

    const conversationText = messages.map((msg, idx) =>
        `[${msg.role.toUpperCase()}]: ${msg.content}`
    ).join('\n\n');

    await ingestDocument({
        title: `Chat Conversation ${conversationId}`,
        content: conversationText,
        source: `chat-export:${conversationId}`,
        type: 'conversation',
        metadata: {
            conversationId,
            messageCount: messages.length,
            ...metadata
        }
    });

    console.log(`✅ Stored ${messages.length} messages in knowledge base\n`);
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function ingestChatExport(filePath: string, format?: 'json' | 'text' | 'markdown'): Promise<void> {
    console.log('📥 Chat Export Ingestion Started\n');
    console.log(`File: ${filePath}\n`);

    // Read file
    const content = fs.readFileSync(filePath, 'utf-8');

    // Auto-detect format if not specified
    if (!format) {
        const ext = path.extname(filePath).toLowerCase();
        if (ext === '.json') format = 'json';
        else if (ext === '.md') format = 'markdown';
        else format = 'text';
    }

    console.log(`Format: ${format}\n`);

    // Parse messages
    let messages: ChatMessage[];
    switch (format) {
        case 'json':
            messages = parseJsonFormat(content);
            break;
        case 'markdown':
            messages = parseMarkdownFormat(content);
            break;
        case 'text':
        default:
            messages = parseTextFormat(content);
            break;
    }

    console.log(`✅ Parsed ${messages.length} messages\n`);

    if (messages.length === 0) {
        console.error('❌ No messages found in file');
        process.exit(1);
    }

    // Generate conversation ID
    const conversationId = `chat-${Date.now()}-${path.basename(filePath, path.extname(filePath))}`;

    // Extract teaching moments with AI
    const moments = await extractTeachingMoments(messages);

    // Store everything
    await storeTeachingMoments(conversationId, moments);
    await storeFullConversation(conversationId, messages, {
        fileName: path.basename(filePath),
        format,
        teachingMomentsCount: moments.length
    });

    console.log('\n✨ Ingestion Complete!\n');
    console.log(`📊 Summary:`);
    console.log(`   Messages: ${messages.length}`);
    console.log(`   Teaching Moments: ${moments.length}`);
    console.log(`   Conversation ID: ${conversationId}\n`);

    await pool.end();
}

// ============================================================================
// CLI
// ============================================================================

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Usage: npx tsx scripts/ingest-chat-export.ts <file-path> [--format json|text|markdown]');
    process.exit(1);
}

const filePath = args[0];
const formatIndex = args.indexOf('--format');
const format = formatIndex >= 0 ? args[formatIndex + 1] as 'json' | 'text' | 'markdown' : undefined;

if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

ingestChatExport(filePath, format).catch(err => {
    console.error('❌ Ingestion failed:', err);
    process.exit(1);
});
