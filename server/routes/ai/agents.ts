import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { agentRegistry, generateTaskId } from '../../agents/base';
import { initializeAgents } from '../../agents/orchestrator';
import { agentMetricsService } from '../../services/agentMetrics';
import { agentBriefings, getAgentBriefing } from '../../agents/briefings';
import { db } from '../../db';

// Initialize agents on module load
initializeAgents();

const router = Router();

// GET /api/ai/agents
router.get('/agents', requireAdmin, async (req, res) => {
    try {
        const agents = agentRegistry.getAll().map(agent => {
            const briefing = getAgentBriefing(agent.name);
            return {
                name: agent.name,
                displayName: briefing?.displayName || agent.name,
                description: agent.description,
                capabilities: agent.capabilities,
                icon: agent.icon || briefing?.icon || '🤖',
                role: agent.role || briefing?.role || agent.description,
                rules: agent.rules || briefing?.rules || []
            };
        });

        res.json({
            ok: true,
            agents,
            count: agents.length
        });
    } catch (error) {
        console.error('Get agents error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch agents' });
    }
});

// GET /api/ai/agents/:name
router.get('/agents/:name', requireAdmin, async (req, res) => {
    try {
        const agent = agentRegistry.get(req.params.name);

        if (!agent) {
            return res.status(404).json({ ok: false, error: 'Agent not found' });
        }

        const briefing = getAgentBriefing(agent.name);

        res.json({
            ok: true,
            agent: {
                name: agent.name,
                displayName: briefing?.displayName || agent.name,
                description: agent.description,
                capabilities: agent.capabilities,
                icon: agent.icon || briefing?.icon || '🤖',
                role: agent.role || briefing?.role || agent.description,
                rules: agent.rules || briefing?.rules || [],
                systemPrompt: briefing?.systemPrompt || null,
                examples: briefing?.examples || []
            }
        });
    } catch (error) {
        console.error('Get agent error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch agent' });
    }
});

// POST /api/ai/agents/execute
router.post('/agents/execute', requireAdmin, async (req, res) => {
    const startTime = Date.now();
    let status: 'success' | 'error' | 'timeout' = 'error';
    let errorMessage: string | undefined;

    try {
        const { agentName, task } = req.body;

        if (!agentName || !task) {
            return res.status(400).json({ ok: false, error: 'agentName and task are required' });
        }

        const agent = agentRegistry.get(agentName);
        if (!agent) {
            return res.status(404).json({ ok: false, error: 'Agent not found' });
        }

        // Generate task ID if not provided
        if (!task.id) {
            task.id = generateTaskId();
        }

        const result = await agent.execute(task);
        status = result.success ? 'success' : 'error';
        if (!result.success) {
            errorMessage = result.error;
        }

        // Record metrics (async, don't wait)
        const latencyMs = Date.now() - startTime;
        agentMetricsService.recordExecution({
            agentName,
            taskType: task.type,
            status,
            inputTokens: result.metadata?.inputTokens || 0,
            outputTokens: result.metadata?.outputTokens || 0,
            costUsd: result.metadata?.costUsd || 0,
            latencyMs,
            errorMessage,
            userId: req.session?.adminUserId
        }).catch(err => console.error('Failed to record metrics:', err));

        res.json({
            ok: true,
            result
        });
    } catch (error) {
        console.error('Execute agent error:', error);
        errorMessage = error instanceof Error ? error.message : 'Unknown error';

        // Record error metrics
        const latencyMs = Date.now() - startTime;
        agentMetricsService.recordExecution({
            agentName: req.body.agentName,
            taskType: req.body.task?.type || 'unknown',
            status: 'error',
            latencyMs,
            errorMessage,
            userId: req.session?.adminUserId
        }).catch(err => console.error('Failed to record error metrics:', err));

        res.status(500).json({ ok: false, error: 'Failed to execute agent task' });
    }
});

// PATCH /api/ai/agents/:name/config
router.patch('/agents/:name/config', requireAdmin, async (req, res) => {
    try {
        const { name } = req.params;
        const { systemPrompt, ...metadataUpdates } = req.body;

        // 1. Get existing config to merge
        const existingResult = await db.query(
            'SELECT metadata FROM agent_configurations WHERE agent_name = $1',
            [name]
        );

        let metadata = existingResult.rows[0]?.metadata || {};

        // 2. Update metadata
        metadata = { ...metadata, ...metadataUpdates };

        // 3. Update DB
        await db.query(`
            INSERT INTO agent_configurations (agent_name, system_prompt, metadata, updated_at)
            VALUES ($1, $2, $3, NOW())
            ON CONFLICT (agent_name) DO UPDATE SET
                system_prompt = COALESCE($2, agent_configurations.system_prompt),
                metadata = $3,
                updated_at = NOW()
        `, [name, systemPrompt, JSON.stringify(metadata)]);

        // 4. Trigger refresh to update live agents
        await agentRegistry.refresh();

        res.json({ ok: true, message: 'Agent configuration updated' });
    } catch (error) {
        console.error('Update agent config error:', error);
        res.status(500).json({ ok: false, error: 'Failed to update agent configuration' });
    }
});

export default router;
