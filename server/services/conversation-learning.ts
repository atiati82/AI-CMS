import { db } from '../db';
import { ingestDocument } from './knowledge-base';

/**
 * Conversation Learning System
 * Ingests chat conversations into RAG for the AI agent to learn from
 */

interface ConversationMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    userFeedback?: 'positive' | 'negative' | 'neutral';
}

interface LearningPattern {
    pattern: string;
    meaning: string;
    confidence: number;
    examples: string[];
}

/**
 * Ingest entire conversation into knowledge base for AI learning
 */
export async function ingestConversation(conversationId: string): Promise<void> {
    // Get conversation from database
    const result = await db.query('SELECT * FROM conversations WHERE id = $1', [conversationId]);

    if (result.rows.length === 0) {
        throw new Error('Conversation not found');
    }

    const conversation = result.rows[0];
    const messages: ConversationMessage[] = conversation.messages || [];

    // Build full conversation text
    const conversationText = messages.map((msg, idx) => {
        return `[${msg.role.toUpperCase()}]: ${msg.content}`;
    }).join('\n\n');

    // Analyze for learning patterns
    const patterns = analyzeConversationPatterns(messages);

    // Create context metadata
    const metadata = {
        conversationId,
        messageCount: messages.length,
        patterns: patterns,
        timestamp: new Date().toISOString()
    };

    // Ingest into knowledge base
    await ingestDocument({
        title: `Conversation ${conversationId} - Learning Data`,
        content: conversationText,
        source: 'conversation-history',
        type: 'conversation',
        metadata
    });

    // Store learning patterns
    await storeLearningPatterns(conversationId, patterns);
}

/**
 * Analyze conversation for learning patterns
 * Key insight: No complaints = Success!
 */
function analyzeConversationPatterns(messages: ConversationMessage[]): LearningPattern[] {
    const patterns: LearningPattern[] = [];

    // Pattern 1: No complaints after action = Success
    let consecutiveNoComplaints = 0;
    let successfulActions: string[] = [];

    for (let i = 0; i < messages.length - 1; i++) {
        const current = messages[i];
        const next = messages[i + 1];

        // If assistant did something and user didn't complain
        if (current.role === 'assistant' && next.role === 'user') {
            if (!hasComplaint(next.content)) {
                consecutiveNoComplaints++;
                successfulActions.push(current.content.substring(0, 100));
            } else {
                consecutiveNoComplaints = 0;
            }
        }
    }

    if (consecutiveNoComplaints > 0) {
        patterns.push({
            pattern: 'no_complaint_after_action',
            meaning: 'User is satisfied with the action taken. Continue with similar approach.',
            confidence: Math.min(consecutiveNoComplaints / messages.length, 1.0),
            examples: successfulActions.slice(0, 5)
        });
    }

    // Pattern 2: User approval signals
    const approvalSignals = findApprovalSignals(messages);
    if (approvalSignals.length > 0) {
        patterns.push({
            pattern: 'explicit_approval',
            meaning: 'User explicitly approved an action or decision',
            confidence: approvalSignals.length / messages.length,
            examples: approvalSignals.slice(0, 5)
        });
    }

    // Pattern 3: User requests patterns
    const requestPatterns = analyzeRequestPatterns(messages);
    patterns.push(...requestPatterns);

    return patterns;
}

/**
 * Detect complaints in user message
 */
function hasComplaint(content: string): boolean {
    const complaintKeywords = [
        'wrong', 'error', 'mistake', 'fix', 'broken', 'not working',
        'issue', 'problem', 'failed', 'incorrect', 'bad', 'no'
    ];

    const lowerContent = content.toLowerCase();
    return complaintKeywords.some(keyword => lowerContent.includes(keyword));
}

/**
 * Find approval signals in messages
 */
function findApprovalSignals(messages: ConversationMessage[]): string[] {
    const approvalKeywords = [
        'lgtm', 'looks good', 'perfect', 'great', 'excellent', 'approved',
        'yes', 'correct', 'right', 'good', 'nice', 'thanks', 'go for all'
    ];

    const signals: string[] = [];

    for (const msg of messages) {
        if (msg.role === 'user') {
            const lowerContent = msg.content.toLowerCase();
            for (const keyword of approvalKeywords) {
                if (lowerContent.includes(keyword)) {
                    signals.push(msg.content.substring(0, 100));
                    break;
                }
            }
        }
    }

    return signals;
}

/**
 * Analyze user request patterns
 */
function analyzeRequestPatterns(messages: ConversationMessage[]): LearningPattern[] {
    const patterns: LearningPattern[] = [];
    const userMessages = messages.filter(m => m.role === 'user');

    // Common request types
    const requestTypes: Record<string, string[]> = {
        'wants_all': [],
        'wants_fast': [],
        'wants_complete': [],
        'wants_backup': []
    };

    for (const msg of userMessages) {
        const lower = msg.content.toLowerCase();

        if (lower.includes('go for all') || lower.includes('do all') || lower.includes('everything')) {
            requestTypes.wants_all.push(msg.content.substring(0, 100));
        }

        if (lower.includes('quick') || lower.includes('fast') || lower.includes('asap')) {
            requestTypes.wants_fast.push(msg.content.substring(0, 100));
        }

        if (lower.includes('complete') || lower.includes('full') || lower.includes('comprehensive')) {
            requestTypes.wants_complete.push(msg.content.substring(0, 100));
        }

        if (lower.includes('backup') || lower.includes('save')) {
            requestTypes.wants_backup.push(msg.content.substring(0, 100));
        }
    }

    for (const [type, examples] of Object.entries(requestTypes)) {
        if (examples.length > 0) {
            patterns.push({
                pattern: type,
                meaning: `User prefers ${type.replace('wants_', '')} approach`,
                confidence: examples.length / userMessages.length,
                examples: examples.slice(0, 3)
            });
        }
    }

    return patterns;
}

/**
 * Store learning patterns in RAG memory
 */
async function storeLearningPatterns(
    conversationId: string,
    patterns: LearningPattern[]
): Promise<void> {
    for (const pattern of patterns) {
        const lessonId = `lesson-${conversationId}-${pattern.pattern}`;

        // Check if lesson already exists
        const existing = await db.query(
            'SELECT * FROM rag_memory_objects WHERE lesson_id = $1',
            [lessonId]
        );

        if (existing.rows.length > 0) {
            // Update trigger count
            await db.query(
                'UPDATE rag_memory_objects SET trigger_count = trigger_count + 1, last_triggered = CURRENT_TIMESTAMP WHERE lesson_id = $1',
                [lessonId]
            );
        } else {
            // Create new lesson
            await db.query(`
        INSERT INTO rag_memory_objects (
          lesson_id, title, root_cause, fix_steps, prevention_rule,
          do_not_repeat_policy, tags, severity, context, examples
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
                lessonId,
                `User Pattern: ${pattern.pattern}`,
                JSON.stringify({ pattern: pattern.pattern, meaning: pattern.meaning }),
                JSON.stringify([{ step: 1, action: 'Recognize pattern', description: pattern.meaning }]),
                JSON.stringify({ rule: `When user shows ${pattern.pattern}, respond accordingly` }),
                `Always recognize and adapt to user communication pattern: ${pattern.pattern}`,
                ['user-pattern', 'communication', 'learning'],
                'info',
                JSON.stringify({ confidence: pattern.confidence, conversationId }),
                JSON.stringify({ right: pattern.examples, wrong: [] })
            ]);
        }
    }
}

/**
 * Get AI agent recommendations based on learned patterns
 */
export async function getAgentRecommendations(conversationId: string): Promise<string[]> {
    const result = await db.query(`
    SELECT * FROM rag_memory_objects
    WHERE tags @> ARRAY['user-pattern']
    ORDER BY trigger_count DESC, confidence DESC
    LIMIT 10
  `);

    const recommendations: string[] = [];

    for (const lesson of result.rows) {
        const context = lesson.context;
        recommendations.push(
            `Pattern "${lesson.title}": ${lesson.do_not_repeat_policy} (confidence: ${context.confidence || 'N/A'})`
        );
    }

    return recommendations;
}

/**
 * Auto-ingest current session conversation
 */
export async function autoIngestCurrentSession(): Promise<void> {
    // Get most recent conversation
    const result = await db.query(`
    SELECT id FROM conversations
    ORDER BY updated_at DESC
    LIMIT 1
  `);

    if (result.rows.length > 0) {
        await ingestConversation(result.rows[0].id);
        console.log('✅ Current session ingested into RAG knowledge base');
    }
}

/**
 * Record a user's design preference for learning
 */
export async function recordDesignPreference(
    source: string,
    designData: {
        theme: string;
        colorWorld: string;
        visualVibe: string;
    }
): Promise<void> {
    const lessonId = `design-pref-${Date.now()}`;
    const title = `User Preference: ${designData.theme} Theme`;

    // Store as a lesson object
    await db.query(`
        INSERT INTO rag_memory_objects (
            lesson_id, title, root_cause, fix_steps, prevention_rule,
            do_not_repeat_policy, tags, severity, context, examples
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
        lessonId,
        title,
        JSON.stringify({ type: 'design_preference', source }),
        JSON.stringify([{ action: 'Use theme', value: designData.theme }]),
        JSON.stringify({ rule: `When content matches vibe "${designData.visualVibe}", prefer theme "${designData.theme}"` }),
        `Learned from user selection in Visual Interpreter`,
        ['design-preference', 'user-learning', 'visual-style'],
        'info',
        JSON.stringify({ ...designData, timestamp: new Date().toISOString() }),
        JSON.stringify({ right: [designData.visualVibe], wrong: [] })
    ]);

    console.log(`🧠 Learned design preference: ${designData.theme} for ${designData.visualVibe}`);
}
