import { Agent, AgentTask, AgentResult, createSuccessResult, createErrorResult, agentRegistry } from './base';

// Orchestrator Agent - Coordinates other agents
export const orchestratorAgent: Agent = {
    name: 'orchestrator',
    description: 'Orchestrates and coordinates other agents',
    capabilities: ['chat', 'complex_task', 'delegate'],

    async execute(task: AgentTask): Promise<AgentResult> {
        try {
            switch (task.type) {
                case 'chat':
                    return await handleChat(task.input);

                case 'complex_task':
                    return await handleComplexTask(task.input);

                case 'delegate':
                    return await delegateTask(task.input);

                default:
                    return createErrorResult(`Unknown task type: ${task.type}`);
            }
        } catch (error: any) {
            return createErrorResult(error.message || 'Orchestrator failed');
        }
    }
};

async function handleChat(input: any): Promise<AgentResult> {
    const { message } = input;

    // Simple intent detection
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('seo') || lowerMessage.includes('optimize')) {
        const seoAgent = agentRegistry.get('seo');
        if (seoAgent) {
            return await seoAgent.execute({
                id: 'delegated-' + Date.now(),
                type: 'suggest_keywords',
                input: { topic: message }
            });
        }
    }

    if (lowerMessage.includes('content') || lowerMessage.includes('write')) {
        const contentAgent = agentRegistry.get('content');
        if (contentAgent) {
            return await contentAgent.execute({
                id: 'delegated-' + Date.now(),
                type: 'generate_content',
                input: { topic: message, tone: 'professional', length: 'medium' }
            });
        }
    }

    // Default response
    return createSuccessResult({
        response: `I can help you with SEO, content generation, design, and system operations. What would you like to do?`
    });
}

async function handleComplexTask(input: any): Promise<AgentResult> {
    const { steps } = input;
    const results: any[] = [];

    for (const step of steps) {
        const agent = agentRegistry.get(step.agent);
        if (agent) {
            const result = await agent.execute({
                id: 'step-' + Date.now(),
                type: step.type,
                input: step.input
            });
            results.push(result);
        }
    }

    return createSuccessResult({ results });
}

async function delegateTask(input: any): Promise<AgentResult> {
    const { agentName, taskType, taskInput } = input;

    const agent = agentRegistry.get(agentName);
    if (!agent) {
        return createErrorResult(`Agent ${agentName} not found`);
    }

    return await agent.execute({
        id: 'delegated-' + Date.now(),
        type: taskType,
        input: taskInput
    });
}

// Initialize all agents
export function initializeAgents(): void {
    const { contentAgent } = require('./content');
    const { seoAgent } = require('./seo');
    const { designAgent, devopsAgent } = require('./design');

    agentRegistry.register(contentAgent);
    agentRegistry.register(seoAgent);
    agentRegistry.register(designAgent);
    agentRegistry.register(devopsAgent);
    agentRegistry.register(orchestratorAgent);

    console.log('✅ AI Agents initialized:', agentRegistry.getAll().map(a => a.name).join(', '));
}
