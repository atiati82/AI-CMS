/**
 * Workflow Engine
 * 
 * LangGraph-inspired state machine for multi-step agent orchestration.
 * Supports: state transitions, checkpoints, resume, parallel execution.
 */

import { v4 as uuidv4 } from 'uuid';
import { pool as db } from '../db';
import { agentRegistry } from '../agents/base';

// ============================================================================
// WORKFLOW STATE TYPES
// ============================================================================

export type WorkflowStatus =
    | 'pending'
    | 'running'
    | 'paused'
    | 'waiting_input'
    | 'completed'
    | 'failed';

export interface WorkflowState {
    workflowId: string;
    name: string;
    status: WorkflowStatus;
    currentStep: number;
    steps: WorkflowStep[];
    context: Record<string, any>;
    checkpoints: WorkflowCheckpoint[];
    startedAt: Date;
    updatedAt: Date;
    completedAt?: Date;
    error?: string;
}

export interface WorkflowStep {
    id: string;
    name: string;
    agent: string;
    taskType: string;
    input: Record<string, any> | ((ctx: Record<string, any>) => Record<string, any>);
    output?: any;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    condition?: (ctx: Record<string, any>) => boolean;
    onSuccess?: string; // Next step ID
    onFailure?: string; // Fallback step ID
    retries?: number;
    maxRetries?: number;
    startedAt?: Date;
    completedAt?: Date;
    error?: string;
}

export interface WorkflowCheckpoint {
    stepIndex: number;
    context: Record<string, any>;
    timestamp: Date;
}

export interface WorkflowDefinition {
    name: string;
    description: string;
    steps: Omit<WorkflowStep, 'id' | 'status' | 'output'>[];
    initialContext?: Record<string, any>;
    requiredParams?: string[];
}

// ============================================================================
// WORKFLOW ENGINE
// ============================================================================

export class WorkflowEngine {
    private runningWorkflows = new Map<string, WorkflowState>();

    /**
     * Create a new workflow from a definition
     */
    async create(definition: WorkflowDefinition, context: Record<string, any> = {}): Promise<WorkflowState> {
        const workflowId = uuidv4();
        const now = new Date();

        const steps: WorkflowStep[] = definition.steps.map((step, index) => ({
            ...step,
            id: `step-${index}`,
            status: 'pending' as const,
        }));

        const state: WorkflowState = {
            workflowId,
            name: definition.name,
            status: 'pending',
            currentStep: 0,
            steps,
            context: { ...definition.initialContext, ...context },
            checkpoints: [],
            startedAt: now,
            updatedAt: now,
        };

        // Store in memory and database
        this.runningWorkflows.set(workflowId, state);
        await this.persistState(state);

        console.log(`[Workflow] Created: ${definition.name} (${workflowId})`);
        return state;
    }

    /**
     * Execute the workflow to completion or until paused
     */
    async run(workflowId: string): Promise<WorkflowState> {
        const state = this.runningWorkflows.get(workflowId) || await this.loadState(workflowId);

        if (!state) {
            throw new Error(`Workflow ${workflowId} not found`);
        }

        if (state.status === 'completed' || state.status === 'failed') {
            return state;
        }

        state.status = 'running';
        state.updatedAt = new Date();

        console.log(`[Workflow] Running: ${state.name} from step ${state.currentStep}`);

        try {
            while (state.currentStep < state.steps.length) {
                const step = state.steps[state.currentStep];

                // Check condition
                if (step.condition && !step.condition(state.context)) {
                    console.log(`[Workflow] Skipping step ${step.name}: condition not met`);
                    step.status = 'skipped';
                    state.currentStep++;
                    continue;
                }

                // Execute step
                const result = await this.executeStep(step, state.context);

                if (result.success) {
                    step.status = 'completed';
                    step.output = result.output;
                    step.completedAt = new Date();

                    // Update context with output
                    state.context[`${step.name}_output`] = result.output;
                    state.context.lastOutput = result.output;

                    // Create checkpoint after each successful step
                    this.createCheckpoint(state);

                    // Determine next step
                    if (step.onSuccess) {
                        const nextIndex = state.steps.findIndex(s => s.id === step.onSuccess);
                        if (nextIndex !== -1) {
                            state.currentStep = nextIndex;
                            continue;
                        }
                    }
                    state.currentStep++;
                } else {
                    // Handle failure
                    step.retries = (step.retries || 0) + 1;

                    if (step.retries < (step.maxRetries || 3)) {
                        console.log(`[Workflow] Retrying step ${step.name} (${step.retries}/${step.maxRetries || 3})`);
                        await this.delay(1000 * step.retries);
                        continue;
                    }

                    step.status = 'failed';
                    step.error = result.error;

                    // Check for fallback
                    if (step.onFailure) {
                        const fallbackIndex = state.steps.findIndex(s => s.id === step.onFailure);
                        if (fallbackIndex !== -1) {
                            console.log(`[Workflow] Falling back to ${step.onFailure}`);
                            state.currentStep = fallbackIndex;
                            continue;
                        }
                    }

                    throw new Error(`Step ${step.name} failed: ${result.error}`);
                }

                state.updatedAt = new Date();
                await this.persistState(state);
            }

            // Workflow completed
            state.status = 'completed';
            state.completedAt = new Date();
            state.updatedAt = new Date();

            console.log(`[Workflow] Completed: ${state.name}`);

        } catch (error: any) {
            state.status = 'failed';
            state.error = error.message;
            state.updatedAt = new Date();
            console.error(`[Workflow] Failed: ${state.name} - ${error.message}`);
        }

        await this.persistState(state);
        return state;
    }

    /**
     * Execute a single workflow step
     */
    private async executeStep(
        step: WorkflowStep,
        context: Record<string, any>
    ): Promise<{ success: boolean; output?: any; error?: string }> {
        const agent = agentRegistry.get(step.agent);

        if (!agent) {
            return { success: false, error: `Agent ${step.agent} not found` };
        }

        step.status = 'running';
        step.startedAt = new Date();

        // Resolve input (can be static or function)
        const input = typeof step.input === 'function'
            ? step.input(context)
            : step.input;

        console.log(`[Workflow] Executing: ${step.name} (${step.agent}:${step.taskType})`);

        try {
            const result = await agent.execute({
                id: `workflow-${step.id}-${Date.now()}`,
                type: step.taskType,
                input
            });

            return {
                success: result.success,
                output: result.output,
                error: result.error
            };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Pause workflow execution
     */
    async pause(workflowId: string): Promise<WorkflowState> {
        const state = this.runningWorkflows.get(workflowId);
        if (state && state.status === 'running') {
            state.status = 'paused';
            state.updatedAt = new Date();
            await this.persistState(state);
        }
        return state!;
    }

    /**
     * Resume a paused or persisted workflow
     */
    async resume(workflowId: string): Promise<WorkflowState> {
        const state = await this.loadState(workflowId);
        if (!state) {
            throw new Error(`Workflow ${workflowId} not found`);
        }

        this.runningWorkflows.set(workflowId, state);
        return this.run(workflowId);
    }

    /**
     * Rollback to a specific checkpoint
     */
    async rollback(workflowId: string, checkpointIndex: number): Promise<WorkflowState> {
        const state = this.runningWorkflows.get(workflowId) || await this.loadState(workflowId);

        if (!state) {
            throw new Error(`Workflow ${workflowId} not found`);
        }

        const checkpoint = state.checkpoints[checkpointIndex];
        if (!checkpoint) {
            throw new Error(`Checkpoint ${checkpointIndex} not found`);
        }

        // Restore state from checkpoint
        state.currentStep = checkpoint.stepIndex;
        state.context = { ...checkpoint.context };
        state.status = 'paused';

        // Reset steps after checkpoint
        for (let i = checkpoint.stepIndex; i < state.steps.length; i++) {
            state.steps[i].status = 'pending';
            state.steps[i].output = undefined;
            state.steps[i].error = undefined;
        }

        state.updatedAt = new Date();
        await this.persistState(state);

        return state;
    }

    /**
     * Get workflow status
     */
    async getStatus(workflowId: string): Promise<WorkflowState | null> {
        return this.runningWorkflows.get(workflowId) || await this.loadState(workflowId);
    }

    // ========================================================================
    // PERSISTENCE
    // ========================================================================

    private createCheckpoint(state: WorkflowState): void {
        state.checkpoints.push({
            stepIndex: state.currentStep,
            context: { ...state.context },
            timestamp: new Date()
        });

        // Keep only last 10 checkpoints
        if (state.checkpoints.length > 10) {
            state.checkpoints = state.checkpoints.slice(-10);
        }
    }

    private async persistState(state: WorkflowState): Promise<void> {
        try {
            await db.query(`
                INSERT INTO workflow_states (id, name, status, state_data, updated_at)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (id) DO UPDATE SET
                    status = EXCLUDED.status,
                    state_data = EXCLUDED.state_data,
                    updated_at = EXCLUDED.updated_at
            `, [
                state.workflowId,
                state.name,
                state.status,
                JSON.stringify(state),
                state.updatedAt
            ]);
        } catch (error) {
            // Table might not exist - log but don't fail
            console.warn('[Workflow] Persistence failed (table may not exist)');
        }
    }

    private async loadState(workflowId: string): Promise<WorkflowState | null> {
        try {
            const result = await db.query(
                'SELECT state_data FROM workflow_states WHERE id = $1',
                [workflowId]
            );

            if (result.rows.length > 0) {
                return result.rows[0].state_data as WorkflowState;
            }
        } catch {
            // Table might not exist
        }
        return null;
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * List all workflow executions (most recent first)
     */
    async listWorkflows(limit = 50): Promise<WorkflowState[]> {
        try {
            const result = await db.query(
                `SELECT state_data FROM workflow_states ORDER BY updated_at DESC LIMIT $1`,
                [limit]
            );

            return result.rows.map(row => row.state_data as WorkflowState);
        } catch (error) {
            console.warn('[Workflow] Failed to list workflows:', error);
            return [];
        }
    }
}

// Global workflow engine instance
export const workflowEngine = new WorkflowEngine();
