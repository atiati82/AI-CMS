// ============================================================================
// BASE AGENT INTERFACES
// ============================================================================

export interface AgentTask {
    id: string;
    type: string;
    input: Record<string, any>;
}

export interface AgentResult {
    success: boolean;
    output: any;
    error?: string;
}

export interface Agent {
    name: string;
    description: string;
    capabilities: string[];
    execute(task: AgentTask): Promise<AgentResult>;
}

// ============================================================================
// AGENT REGISTRY
// ============================================================================

export class AgentRegistry {
    private agents: Map<string, Agent> = new Map();

    register(agent: Agent): void {
        this.agents.set(agent.name, agent);
    }

    get(name: string): Agent | undefined {
        return this.agents.get(name);
    }

    getAll(): Agent[] {
        return Array.from(this.agents.values());
    }

    findCapable(capability: string): Agent[] {
        return this.getAll().filter(agent =>
            agent.capabilities.includes(capability)
        );
    }
}

// Global registry instance
export const agentRegistry = new AgentRegistry();

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function generateTaskId(): string {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function createSuccessResult(output: any): AgentResult {
    return { success: true, output };
}

export function createErrorResult(error: string): AgentResult {
    return { success: false, output: null, error };
}
