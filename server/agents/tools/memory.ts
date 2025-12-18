
import { Tool } from './types';
import { searchKnowledge } from '../../services/knowledge-base';

/**
 * Tool Definition for Searching the Knowledge Base
 * Allows agents to recall facts, policies, and content from the CMS.
 */
export const searchKnowledgeBaseTool: Tool = {
    name: 'search_knowledge_base',
    description: 'Search the Andara Knowledge Base for facts, scientific data, company policies, and past content. Use this to verify claims or find specific information.',
    parameters: {
        type: 'OBJECT',
        properties: {
            query: {
                type: 'STRING',
                description: 'The search query string. Be specific with keywords.'
            },
            limit: {
                type: 'INTEGER',
                description: 'Number of results to return (default 5)'
            }
        },
        required: ['query']
    },
    execute: async (args: { query: string; limit?: number }) => {
        try {
            const results = await searchKnowledge(args.query, args.limit || 5);

            if (results.length === 0) {
                return "No relevant information found in the Knowledge Base.";
            }

            return results.map(r =>
                `[Source: ${r.source}] (Score: ${r.score})\nZone: ${r.zone || 'General'}\nTitle: ${r.title}\nContent: ${r.content}`
            ).join('\n\n---\n\n');

        } catch (error) {
            console.error('Knowledge Base search failed:', error);
            return `Error searching knowledge base: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    }
};

export const memoryTools = [searchKnowledgeBaseTool];
