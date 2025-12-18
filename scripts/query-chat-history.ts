/**
 * Wayback Query Script - Ask Questions About All Past Conversations
 * 
 * This script lets you query the entire RAG knowledge base of all ingested conversations
 * and get AI-powered answers based on the full context.
 * 
 * Usage:
 *   npx tsx scripts/query-chat-history.ts "How did we fix the login error?"
 *   npx tsx scripts/query-chat-history.ts "What are the user's preferences for UI design?"
 *   npx tsx scripts/query-chat-history.ts "Show me all error patterns we've learned"
 */

import { pool } from '../server/db';
import { searchKnowledge } from '../server/services/knowledge-base';
import { getAiClient } from '../server/services/andara-chat';

interface QueryResult {
    question: string;
    answer: string;
    sources: Array<{
        title: string;
        content: string;
        source: string;
        relevance: number;
    }>;
    relatedLessons: Array<{
        title: string;
        policy: string;
        severity: string;
        triggerCount: number;
    }>;
}

// ============================================================================
// KNOWLEDGE RETRIEVAL
// ============================================================================

async function searchAllConversations(query: string): Promise<any[]> {
    console.log(`🔍 Searching knowledge base for: "${query}"\n`);

    // Search in knowledge_base table
    const results = await searchKnowledge(query, 10);

    console.log(`✅ Found ${results.length} relevant knowledge chunks\n`);
    return results;
}

async function searchRelatedLessons(query: string): Promise<any[]> {
    console.log(`📚 Searching for related lessons...\n`);

    // Extract keywords from query
    const keywords = query.toLowerCase()
        .split(' ')
        .filter(w => w.length > 3)
        .slice(0, 5);

    // Search rag_memory_objects for relevant lessons
    const result = await pool.query(`
        SELECT 
            lesson_id,
            title,
            do_not_repeat_policy,
            severity,
            tags,
            trigger_count,
            context,
            examples
        FROM rag_memory_objects
        WHERE 
            tags && $1::text[]
            OR title ILIKE ANY($2::text[])
            OR do_not_repeat_policy ILIKE ANY($2::text[])
        ORDER BY trigger_count DESC, created_at DESC
        LIMIT 10
    `, [
        ['chat-learning', ...keywords],
        keywords.map(k => `%${k}%`)
    ]);

    console.log(`✅ Found ${result.rows.length} related lessons\n`);
    return result.rows;
}

// ============================================================================
// AI-POWERED ANSWER GENERATION
// ============================================================================

async function generateAnswer(
    question: string,
    knowledgeChunks: any[],
    lessons: any[]
): Promise<string> {
    console.log(`🤖 Generating AI-powered answer...\n`);

    // Build context from knowledge chunks
    const knowledgeContext = knowledgeChunks.map((chunk, idx) =>
        `[Source ${idx + 1}]: ${chunk.content}`
    ).join('\n\n');

    // Build context from lessons
    const lessonsContext = lessons.map((lesson, idx) =>
        `[Lesson ${idx + 1}]: ${lesson.title}\n${lesson.do_not_repeat_policy}`
    ).join('\n\n');

    const systemPrompt = `You are an AI assistant with access to a complete knowledge base of past conversations and learned lessons.

Your task is to answer questions based on this knowledge. Be specific and cite sources when possible.

If the knowledge base doesn't contain relevant information, say so clearly.

KNOWLEDGE BASE:
${knowledgeContext}

LEARNED LESSONS:
${lessonsContext}`;

    const userPrompt = `Question: ${question}

Please provide a comprehensive answer based on the knowledge base and learned lessons above. Include specific examples and cite sources.`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [
                { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
            ],
            config: {
                temperature: 0.4,
                maxOutputTokens: 4000
            }
        });

        const answer = response.text || 'Unable to generate answer';
        console.log(`✅ Answer generated\n`);
        return answer;

    } catch (error) {
        console.error('❌ AI generation failed:', error);
        return `Error generating answer: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
}

// ============================================================================
// MAIN QUERY FUNCTION
// ============================================================================

async function queryHistory(question: string): Promise<QueryResult> {
    console.log('🔮 Wayback Query System\n');
    console.log('='.repeat(60));
    console.log(`Question: ${question}`);
    console.log('='.repeat(60) + '\n');

    // Search knowledge base and lessons in parallel
    const [knowledgeChunks, lessons] = await Promise.all([
        searchAllConversations(question),
        searchRelatedLessons(question)
    ]);

    // Generate AI answer
    const answer = await generateAnswer(question, knowledgeChunks, lessons);

    // Format result
    const result: QueryResult = {
        question,
        answer,
        sources: knowledgeChunks.map(chunk => ({
            title: chunk.title || 'Untitled',
            content: chunk.content.substring(0, 200) + '...',
            source: chunk.source || 'Unknown',
            relevance: chunk.score || 0
        })),
        relatedLessons: lessons.map(lesson => ({
            title: lesson.title,
            policy: lesson.do_not_repeat_policy,
            severity: lesson.severity,
            triggerCount: lesson.trigger_count || 0
        }))
    };

    return result;
}

// ============================================================================
// DISPLAY RESULTS
// ============================================================================

function displayResults(result: QueryResult): void {
    console.log('\n' + '='.repeat(60));
    console.log('📝 ANSWER');
    console.log('='.repeat(60) + '\n');
    console.log(result.answer);
    console.log('\n');

    if (result.sources.length > 0) {
        console.log('='.repeat(60));
        console.log('📚 SOURCES');
        console.log('='.repeat(60) + '\n');
        result.sources.forEach((source, idx) => {
            console.log(`${idx + 1}. ${source.title}`);
            console.log(`   Source: ${source.source}`);
            console.log(`   Relevance: ${source.relevance.toFixed(2)}`);
            console.log(`   Preview: ${source.content}`);
            console.log('');
        });
    }

    if (result.relatedLessons.length > 0) {
        console.log('='.repeat(60));
        console.log('🎓 RELATED LESSONS');
        console.log('='.repeat(60) + '\n');
        result.relatedLessons.forEach((lesson, idx) => {
            console.log(`${idx + 1}. ${lesson.title} [${lesson.severity.toUpperCase()}]`);
            console.log(`   Policy: ${lesson.policy}`);
            console.log(`   Triggered: ${lesson.triggerCount} times`);
            console.log('');
        });
    }

    console.log('='.repeat(60) + '\n');
}

// ============================================================================
// INTERACTIVE MODE
// ============================================================================

async function interactiveMode(): Promise<void> {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('\n🔮 Wayback Query System - Interactive Mode\n');
    console.log('Ask questions about all past conversations.');
    console.log('Type "exit" to quit.\n');

    const askQuestion = () => {
        rl.question('❓ Your question: ', async (question: string) => {
            if (question.toLowerCase() === 'exit') {
                console.log('\n👋 Goodbye!\n');
                rl.close();
                await pool.end();
                return;
            }

            if (!question.trim()) {
                askQuestion();
                return;
            }

            try {
                const result = await queryHistory(question);
                displayResults(result);
            } catch (error) {
                console.error('❌ Error:', error);
            }

            askQuestion();
        });
    };

    askQuestion();
}

// ============================================================================
// CLI
// ============================================================================

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--interactive' || args[0] === '-i') {
    // Interactive mode
    interactiveMode().catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
} else {
    // Single question mode
    const question = args.join(' ');

    queryHistory(question)
        .then(result => {
            displayResults(result);
            return pool.end();
        })
        .catch(err => {
            console.error('❌ Error:', err);
            process.exit(1);
        });
}
