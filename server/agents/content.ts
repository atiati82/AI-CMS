import { Agent, AgentTask, AgentResult, createSuccessResult, createErrorResult } from './base';

// Content Agent - Handles content generation, rewriting, summarization
export const contentAgent: Agent = {
    name: 'content',
    description: 'Content generation and editing agent',
    capabilities: ['generate_content', 'rewrite_content', 'summarize', 'extract_keywords'],

    async execute(task: AgentTask): Promise<AgentResult> {
        try {
            switch (task.type) {
                case 'generate_content':
                    return await generateContent(task.input);

                case 'rewrite_content':
                    return await rewriteContent(task.input);

                case 'summarize':
                    return await summarize(task.input);

                case 'extract_keywords':
                    return await extractKeywords(task.input);

                default:
                    return createErrorResult(`Unknown task type: ${task.type}`);
            }
        } catch (error: any) {
            return createErrorResult(error.message || 'Content agent failed');
        }
    }
};

// Task handlers
async function generateContent(input: any): Promise<AgentResult> {
    const { topic, tone, length } = input;

    // Placeholder - would use AI service here
    const content = `Generated content about ${topic} with ${tone} tone (${length} length)`;

    return createSuccessResult({ content });
}

async function rewriteContent(input: any): Promise<AgentResult> {
    const { content, style } = input;

    // Placeholder - would use AI service here
    const rewritten = `Rewritten content in ${style} style: ${content}`;

    return createSuccessResult({ rewritten });
}

async function summarize(input: any): Promise<AgentResult> {
    const { text, length } = input;

    // Simple summarization - take first N characters
    const summary = text.substring(0, length || 200) + '...';

    return createSuccessResult({ summary });
}

async function extractKeywords(input: any): Promise<AgentResult> {
    const { text } = input;

    // Simple keyword extraction - find most common words
    const words = text.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const frequency: Record<string, number> = {};

    words.forEach((word: string) => {
        frequency[word] = (frequency[word] || 0) + 1;
    });

    const keywords = Object.entries(frequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([word]) => word);

    return createSuccessResult({ keywords });
}
