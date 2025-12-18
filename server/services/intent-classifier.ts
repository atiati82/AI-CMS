/**
 * Intent Classifier Service
 * 
 * LLM-powered semantic intent classification for agent routing.
 * Replaces keyword-based matching with intelligent intent understanding.
 */

import { getAiClient } from './andara-chat';

// Agent intent definitions with semantic descriptions
export const AGENT_INTENTS = {
    seo: {
        agent: 'seo',
        description: 'Search engine optimization, keywords, meta descriptions, ranking improvements',
        taskType: 'suggest_keywords',
        examples: [
            'How can I improve SEO for this page?',
            'Suggest keywords for water science content',
            'Optimize the meta description',
            'What are good search terms?',
            'Help with ranking'
        ]
    },
    content: {
        agent: 'content',
        description: 'Writing, generating text, copywriting, drafts (without creating database pages)',
        taskType: 'generate_content',
        examples: [
            'Write an article snippet',
            'Draft content for the about page',
            'Generate product descriptions',
            'Write copy for the hero section',
            'Help me write this paragraph'
        ]
    },
    create_page: {
        agent: 'content',
        description: 'Creating new actual pages in the CMS database, publishing content, making new pages',
        taskType: 'create_page_workflow',
        examples: [
            'Create a page about structured water',
            'Make a new page for specific product',
            'Publish an article about salt',
            'Add a new page to the CMS',
            'Create a page'
        ]
    },
    research: {
        agent: 'research',
        description: 'Scientific research, ionic minerals, water science, EZ water, sulfate, flocculation, volcanic minerals, trace elements, electrolytes, health compliance',
        taskType: 'search_knowledge',
        examples: [
            'What is EZ water?',
            'Explain sulfate activation range',
            'Research on ionic minerals',
            'How does flocculation work?',
            'What are the benefits of trace minerals?'
        ]
    },
    design: {
        agent: 'design',
        description: 'Visual design, page layouts, colors, themes, styling, UI/UX, motion, animations',
        taskType: 'suggest_visual_style',
        examples: [
            'Suggest colors for the water science section',
            'What layout works for product pages?',
            'Design the hero section',
            'Recommend animations',
            'What theme should I use?'
        ]
    },
    devops: {
        agent: 'devops',
        description: 'System health, performance monitoring, backups, server status, metrics, alerts',
        taskType: 'check_health',
        examples: [
            'Check system health',
            'Monitor performance',
            'Run a backup',
            'Show server metrics',
            'Any system alerts?'
        ]
    },
    visual_interpreter: {
        agent: 'visual-interpreter',
        description: 'Analyzing visual elements, interpreting images, describing UI components, visual audit',
        taskType: 'interpret_visual',
        examples: [
            'Analyze this page design',
            'Describe what this image shows',
            'Interpret the visual hierarchy',
            'Audit the UI elements'
        ]
    },
    general: {
        agent: null,
        description: 'General questions, greetings, unclear intent, help requests',
        taskType: null,
        examples: [
            'Hello',
            'What can you do?',
            'Help',
            'I have a question'
        ]
    }
} as const;

export type IntentKey = keyof typeof AGENT_INTENTS;

export interface ClassifiedIntent {
    intent: IntentKey;
    agent: string | null;
    taskType: string | null;
    confidence: number;
    reasoning: string;
}

/**
 * Classify user intent using LLM-powered semantic understanding.
 * Falls back to keyword matching if LLM fails.
 */
export async function classifyIntent(message: string): Promise<ClassifiedIntent> {
    try {
        const { client, model } = await getAiClient();

        // Build intent descriptions for the prompt
        const intentDescriptions = Object.entries(AGENT_INTENTS)
            .map(([key, def]) => `- ${key}: ${def.description}`)
            .join('\n');

        const classificationPrompt = `You are an intent classifier. Analyze the user's message and determine which agent should handle it.

Available intents:
${intentDescriptions}

User message: "${message}"

Respond with ONLY a JSON object (no markdown, no explanation):
{
  "intent": "<intent_key>",
  "confidence": <0.0-1.0>,
  "reasoning": "<brief explanation>"
}

Choose "general" if the intent is unclear or doesn't match any specific agent.`;

        const result = await client.models.generateContent({
            model,
            contents: classificationPrompt,
            config: {
                temperature: 0.1, // Low temperature for consistent classification
                maxOutputTokens: 200
            }
        });

        // Parse the response
        const responseText = result.text?.trim() || '';

        // Try to extract JSON from the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            const intentKey = parsed.intent as IntentKey;

            if (intentKey && AGENT_INTENTS[intentKey]) {
                const intentDef = AGENT_INTENTS[intentKey];
                return {
                    intent: intentKey,
                    agent: intentDef.agent,
                    taskType: intentDef.taskType,
                    confidence: parsed.confidence || 0.8,
                    reasoning: parsed.reasoning || 'LLM classification'
                };
            }
        }

        // Fallback if parsing fails
        console.warn('[IntentClassifier] Failed to parse LLM response, using fallback');
        return fallbackClassify(message);

    } catch (error) {
        console.error('[IntentClassifier] LLM classification failed:', error);
        return fallbackClassify(message);
    }
}

/**
 * Fallback keyword-based classification (original logic as safety net)
 */
function fallbackClassify(message: string): ClassifiedIntent {
    const lower = message.toLowerCase();

    // Research keywords (highest priority for domain-specific content)
    const researchKeywords = ['mineral', 'ionic', 'sulfate', 'water science', 'ez water',
        'structured water', 'flocculation', 'volcanic', 'black mica', 'activation range',
        'andara', 'microbiome', 'trace element', 'electrolyte', 'turbidity', 'coagulation'];

    if (researchKeywords.some(kw => lower.includes(kw))) {
        return {
            intent: 'research',
            agent: 'research',
            taskType: 'search_knowledge',
            confidence: 0.7,
            reasoning: 'Keyword match (fallback): research topic detected'
        };
    }

    if (lower.includes('seo') || lower.includes('optimize') || lower.includes('keyword') || lower.includes('ranking')) {
        return {
            intent: 'seo',
            agent: 'seo',
            taskType: 'suggest_keywords',
            confidence: 0.7,
            reasoning: 'Keyword match (fallback): SEO topic detected'
        };
    }

    if (lower.includes('content') || lower.includes('write') || lower.includes('article') || lower.includes('copy')) {
        return {
            intent: 'content',
            agent: 'content',
            taskType: 'generate_content',
            confidence: 0.7,
            reasoning: 'Keyword match (fallback): content creation detected'
        };
    }

    if (lower.includes('design') || lower.includes('color') || lower.includes('layout') || lower.includes('visual') || lower.includes('style')) {
        return {
            intent: 'design',
            agent: 'design',
            taskType: 'suggest_visual_style',
            confidence: 0.7,
            reasoning: 'Keyword match (fallback): design topic detected'
        };
    }

    if (lower.includes('health') || lower.includes('status') || lower.includes('backup') || lower.includes('performance') || lower.includes('monitor')) {
        return {
            intent: 'devops',
            agent: 'devops',
            taskType: 'check_health',
            confidence: 0.6,
            reasoning: 'Keyword match (fallback): devops topic detected'
        };
    }

    return {
        intent: 'general',
        agent: null,
        taskType: null,
        confidence: 0.5,
        reasoning: 'No specific intent detected'
    };
}

/**
 * Get all available agent capabilities for help messages
 */
export function getAgentCapabilities(): string {
    return Object.entries(AGENT_INTENTS)
        .filter(([key]) => key !== 'general')
        .map(([key, def]) => `• **${key}**: ${def.description}`)
        .join('\n');
}
