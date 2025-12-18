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
    metadata?: {
        inputTokens?: number;
        outputTokens?: number;
        costUsd?: number;
        model?: string;
        [key: string]: any;
    };
}

export interface Agent {
    name: string;
    description: string;
    capabilities: string[];
    icon?: string;
    role?: string;
    rules?: string[];
    execute(task: AgentTask): Promise<AgentResult>;
}

// ============================================================================
// AGENT REGISTRY
// ============================================================================

import { db } from '../db';
import { applyAgentConfig } from './briefings';

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

    getAgentDetails(): Array<{
        name: string;
        description: string;
        capabilities: string[];
        icon?: string;
        role?: string;
        rules?: string[];
    }> {
        return this.getAll().map(agent => ({
            name: agent.name,
            description: agent.description,
            capabilities: agent.capabilities,
            icon: agent.icon,
            role: agent.role,
            rules: agent.rules
        }));
    }

    /**
     * Refresh agent configurations from the database
     * This enables "hot reloading" of system prompts and metadata
     */
    async refresh(): Promise<void> {
        try {
            const result = await db.query(`
                SELECT agent_name, display_name, system_prompt, metadata 
                FROM agent_configurations 
                WHERE enabled = true
            `);

            for (const row of result.rows) {
                const name = row.agent_name;
                const metadata = row.metadata || {};

                // Update the Agent object in registry if it exists
                const agent = this.agents.get(name);
                if (agent) {
                    if (row.display_name) agent.description = row.display_name; // Using description as display name carrier
                    if (metadata.icon) agent.icon = metadata.icon;
                    if (metadata.role) agent.role = metadata.role;
                    if (metadata.rules) agent.rules = metadata.rules;
                    if (metadata.capabilities) agent.capabilities = metadata.capabilities;
                }

                // Update the Briefing object (for system prompts)
                applyAgentConfig(name, {
                    displayName: row.display_name,
                    systemPrompt: row.system_prompt,
                    icon: metadata.icon,
                    role: metadata.role,
                    rules: metadata.rules,
                    capabilities: metadata.capabilities,
                    examples: metadata.examples
                });
            }
            console.log(`[AgentRegistry] Refreshed ${result.rows.length} agent configurations from DB`);
        } catch (error) {
            console.error('[AgentRegistry] Failed to refresh agent configs:', error);
        }
    }
}

// Global registry instance
export const agentRegistry = new AgentRegistry();

// Auto-refresh on startup (if DB is consistent)
setTimeout(() => {
    agentRegistry.refresh().catch(err => console.error('Initial agent refresh failed:', err));
}, 5000);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function generateTaskId(): string {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function createSuccessResult(output: any, metadata?: AgentResult['metadata']): AgentResult {
    return { success: true, output, metadata };
}

export function createErrorResult(error: string): AgentResult {
    return { success: false, output: null, error };
}

