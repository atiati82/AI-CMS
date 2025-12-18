import { Agent, AgentTask, AgentResult, createSuccessResult, createErrorResult, agentRegistry } from './base';
import { classifyIntent, getAgentCapabilities, ClassifiedIntent } from '../services/intent-classifier';
import { workflowEngine } from '../services/workflow-engine';
import { getWorkflowTemplate, WorkflowTemplateName, workflowTemplates } from '../services/workflow-templates';
import { orchestratorAgentBriefing } from './briefings';

// Orchestrator Agent - Coordinates other agents using semantic intent classification
export const orchestratorAgent: Agent = {
    name: orchestratorAgentBriefing.name,
    description: orchestratorAgentBriefing.role,
    capabilities: orchestratorAgentBriefing.capabilities,
    icon: orchestratorAgentBriefing.icon,
    role: orchestratorAgentBriefing.role,
    rules: orchestratorAgentBriefing.rules,

    async execute(task: AgentTask): Promise<AgentResult> {
        try {
            switch (task.type) {
                case 'chat':
                    return await handleChat(task.input);

                case 'complex_task':
                    return await handleComplexTask(task.input);

                case 'delegate':
                    return await delegateTask(task.input);

                case 'workflow':
                    return await handleWorkflow(task.input);

                default:
                    return createErrorResult(`Unknown task type: ${task.type}`);
            }
        } catch (error: any) {
            return createErrorResult(error.message || 'Orchestrator failed');
        }
    }
};

/**
 * Handle chat messages using semantic intent classification.
 * Routes to appropriate agent based on LLM understanding of user intent.
 */
async function handleChat(input: any): Promise<AgentResult> {
    const { message } = input;

    // Classify intent using LLM-powered semantic understanding
    const classification: ClassifiedIntent = await classifyIntent(message);

    console.log(`[Orchestrator] Intent: ${classification.intent} (${(classification.confidence * 100).toFixed(0)}%) - ${classification.reasoning}`);

    // Route to appropriate agent if one is identified
    if (classification.agent && classification.taskType) {
        const agent = agentRegistry.get(classification.agent);

        if (agent) {
            // Build appropriate input based on task type
            const taskInput = buildTaskInput(classification, message);

            const result = await agent.execute({
                id: 'delegated-' + Date.now(),
                type: classification.taskType,
                input: taskInput
            });

            // Enhance result with classification metadata
            if (result.success && result.metadata) {
                result.metadata.classification = classification;
            }

            return result;
        }
    }

    // Default response for general/unclear intents
    const capabilities = getAgentCapabilities();
    return createSuccessResult({
        response: `I can help you with the following:\n\n${capabilities}\n\nWhat would you like to do?`,
        classification
    });
}

/**
 * Build task input based on the classified intent and original message
 */
function buildTaskInput(classification: ClassifiedIntent, message: string): any {
    switch (classification.intent) {
        case 'seo':
            return { topic: message };
        case 'content':
            return { topic: message, tone: 'professional', length: 'medium' };
        case 'create_page':
            return { topic: message, context: 'User requested page creation.' };
        case 'research':
            return { query: message };
        case 'design':
            return { topic: message };
        case 'devops':
            return { checkType: 'full' };
        case 'visual_interpreter':
            return { content: message };
        default:
            return { message };
    }
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

/**
 * Handle workflow execution using the state machine engine
 */
async function handleWorkflow(input: any): Promise<AgentResult> {
    const { template, context } = input;

    if (!template) {
        return createErrorResult('Workflow template name required');
    }

    if (!workflowTemplates[template as WorkflowTemplateName]) {
        return createErrorResult(
            `Unknown workflow template: ${template}. Available: ${Object.keys(workflowTemplates).join(', ')}`
        );
    }

    try {
        const definition = getWorkflowTemplate(template as WorkflowTemplateName);
        const state = await workflowEngine.create(definition, context || {});
        const result = await workflowEngine.run(state.workflowId);

        return createSuccessResult({
            workflowId: result.workflowId,
            status: result.status,
            steps: result.steps.map(s => ({
                name: s.name,
                status: s.status,
                output: s.output
            })),
            finalOutput: result.context.lastOutput,
            error: result.error
        });
    } catch (error: any) {
        return createErrorResult(`Workflow failed: ${error.message}`);
    }
}

// Initialize all agents
import { contentAgent } from './content';
import { seoAgent } from './seo';
import { designAgent, devopsAgent } from './design';
import { visualInterpreterAgent } from './visual-interpreter';
import { researchAgent } from './research';
import { SandboxAgent } from './sandbox';

export function initializeAgents(): void {
    agentRegistry.register(contentAgent);
    agentRegistry.register(seoAgent);
    agentRegistry.register(designAgent);
    agentRegistry.register(devopsAgent);
    agentRegistry.register(visualInterpreterAgent);
    agentRegistry.register(researchAgent);
    agentRegistry.register(new SandboxAgent());
    agentRegistry.register(orchestratorAgent);

    console.log('✅ AI Agents initialized:', agentRegistry.getAll().map(a => a.name).join(', '));
}

