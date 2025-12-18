/**
 * Export Current AntiGravity Conversation to RAG
 * 
 * This script exports the current conversation from AntiGravity's conversation history
 * and ingests it into the RAG knowledge base for AI learning.
 * 
 * Usage:
 *   npx tsx scripts/export-current-conversation.ts
 */

import { pool } from '../server/db';
import { ingestDocument } from '../server/services/knowledge-base';
import { getAiClient } from '../server/services/andara-chat';
import * as fs from 'fs';
import * as path from 'path';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
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
// CONVERSATION EXPORT FROM ANTIGRAVITY
// ============================================================================

/**
 * This is a placeholder for the actual conversation export.
 * In a real implementation, this would:
 * 1. Read from AntiGravity's conversation storage
 * 2. Or use the conversation summaries API
 * 3. Or read from the conversation history files
 * 
 * For now, we'll create a manual export format.
 */
async function exportCurrentConversation(): Promise<Message[]> {
    // TODO: Integrate with AntiGravity's conversation API
    // For now, return empty array - user will need to provide the conversation

    console.log('⚠️  Note: This script needs to be integrated with AntiGravity conversation API');
    console.log('📝 For now, please export your conversation manually:\n');
    console.log('1. Copy the conversation from AntiGravity');
    console.log('2. Save it as a JSON file with this format:');
    console.log(`
[
  {
    "role": "user",
    "content": "your message",
    "timestamp": "2025-12-17T10:00:00Z"
  },
  {
    "role": "assistant",
    "content": "my response",
    "timestamp": "2025-12-17T10:00:05Z"
  }
]
    `);
    console.log('3. Then run: npx tsx scripts/ingest-chat-export.ts your-conversation.json\n');

    return [];
}

// ============================================================================
// AI-POWERED TEACHING EXTRACTION
// ============================================================================

async function extractTeachingMoments(messages: Message[]): Promise<TeachingMoment[]> {
    if (messages.length === 0) return [];

    console.log('🤖 Analyzing conversation with AI...\n');

    const conversationText = messages.map((msg, idx) =>
        `[${idx + 1}] ${msg.role.toUpperCase()}: ${msg.content}`
    ).join('\n\n');

    const systemPrompt = `You are an AI learning specialist. Analyze this conversation and extract teaching moments.

Extract:
1. Success Patterns - Actions that worked (no complaints = success)
2. Error/Fix Pairs - Mistakes and solutions
3. User Preferences - Communication style, workflow preferences
4. Communication Patterns - How the user interacts

Return JSON array of teaching moments with: type, title, description, context, examples, severity, tags`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [
                { role: 'user', parts: [{ text: `${systemPrompt}\n\nConversation:\n${conversationText}` }] }
            ],
            config: { temperature: 0.3, maxOutputTokens: 8000 }
        });

        const text = response.text || '';
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]) as TeachingMoment[];
        }
    } catch (error) {
        console.error('AI extraction failed:', error);
    }

    return [];
}

// ============================================================================
// STORAGE
// ============================================================================

async function storeTeachingMoments(conversationId: string, moments: TeachingMoment[]): Promise<void> {
    console.log('💾 Storing teaching moments...\n');

    for (const moment of moments) {
        const lessonId = `lesson-antigravity-${conversationId}-${moment.type}-${Date.now()}`;

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
            [...moment.tags, 'antigravity', 'chat-learning', moment.type],
            moment.severity,
            JSON.stringify({ conversationId, source: 'antigravity', type: moment.type }),
            JSON.stringify({ right: moment.examples, wrong: [] })
        ]);

        console.log(`  ✅ ${moment.title}`);
    }
}

async function storeFullConversation(conversationId: string, messages: Message[]): Promise<void> {
    console.log('\n📚 Storing full conversation...\n');

    const conversationText = messages.map(msg =>
        `[${msg.role.toUpperCase()}]: ${msg.content}`
    ).join('\n\n');

    await ingestDocument({
        title: `AntiGravity Conversation ${conversationId}`,
        content: conversationText,
        source: `antigravity:${conversationId}`,
        type: 'conversation',
        metadata: {
            conversationId,
            messageCount: messages.length,
            platform: 'antigravity'
        }
    });

    console.log(`✅ Stored ${messages.length} messages\n`);
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
    console.log('🚀 AntiGravity Conversation Export\n');

    const messages = await exportCurrentConversation();

    if (messages.length === 0) {
        console.log('❌ No messages to process');
        console.log('\n💡 Alternative: Use the manual export method above');
        await pool.end();
        return;
    }

    const conversationId = `antigravity-${Date.now()}`;
    const moments = await extractTeachingMoments(messages);

    await storeTeachingMoments(conversationId, moments);
    await storeFullConversation(conversationId, messages);

    console.log('\n✨ Export Complete!\n');
    console.log(`📊 Summary:`);
    console.log(`   Messages: ${messages.length}`);
    console.log(`   Teaching Moments: ${moments.length}`);
    console.log(`   Conversation ID: ${conversationId}\n`);

    await pool.end();
}

main().catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
});
