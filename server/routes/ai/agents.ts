import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { agentRegistry, generateTaskId } from '../../agents/base';
import { initializeAgents } from '../../agents/orchestrator';

// Initialize agents on module load
initializeAgents();

const router = Router();

// GET /api/ai/agents
router.get('/agents', requireAdmin, async (req, res) => {
    try {
        const agents = agentRegistry.getAll().map(agent => ({
            name: agent.name,
            description: agent.description,
            capabilities: agent.capabilities
        }));

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

        res.json({
            ok: true,
            agent: {
                name: agent.name,
                description: agent.description,
                capabilities: agent.capabilities
            }
        });
    } catch (error) {
        console.error('Get agent error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch agent' });
    }
});

// POST /api/ai/agents/execute
router.post('/agents/execute', requireAdmin, async (req, res) => {
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

        res.json({
            ok: true,
            result
        });
    } catch (error) {
        console.error('Execute agent error:', error);
        res.status(500).json({ ok: false, error: 'Failed to execute agent task' });
    }
});

export default router;
