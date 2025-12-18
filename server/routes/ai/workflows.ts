/**
 * Workflow API Routes
 * 
 * REST API for managing multi-step workflow executions.
 */

import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import {
    workflowEngine,
    WorkflowState
} from '../../services/workflow-engine';
import {
    workflowTemplates,
    getWorkflowTemplate,
    listWorkflowTemplates,
    WorkflowTemplateName
} from '../../services/workflow-templates';

const router = Router();

/**
 * GET /api/ai/workflows/templates
 * List available workflow templates
 */
router.get('/workflows/templates', async (req, res) => {
    try {
        const templates = listWorkflowTemplates();
        res.json({
            ok: true,
            templates,
            count: templates.length
        });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

/**
 * GET /api/ai/workflows
 * List recent workflow executions
 */
router.get('/workflows', requireAdmin, async (req, res) => {
    try {
        const workflows = await workflowEngine.listWorkflows(50);
        res.json({
            ok: true,
            workflows: workflows.map(w => ({
                id: w.workflowId,
                name: w.name,
                status: w.status,
                currentStep: w.currentStep,
                totalSteps: w.steps.length,
                agent: w.steps[w.currentStep]?.agent || 'System',
                startedAt: w.startedAt,
                completedAt: w.completedAt,
                error: w.error
            }))
        });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

/**
 * POST /api/ai/workflows/create
 * Create a new workflow from a template
 */
router.post('/workflows/create', requireAdmin, async (req, res) => {
    try {
        const { template, context } = req.body;

        if (!template || !workflowTemplates[template as WorkflowTemplateName]) {
            return res.status(400).json({
                ok: false,
                error: `Invalid template. Available: ${Object.keys(workflowTemplates).join(', ')}`
            });
        }

        const definition = getWorkflowTemplate(template as WorkflowTemplateName);
        const state = await workflowEngine.create(definition, context || {});

        res.json({
            ok: true,
            workflowId: state.workflowId,
            name: state.name,
            status: state.status,
            steps: state.steps.map(s => ({ name: s.name, status: s.status }))
        });
    } catch (error: any) {
        console.error('Workflow create error:', error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

/**
 * POST /api/ai/workflows/:id/run
 * Start or resume workflow execution
 */
router.post('/workflows/:id/run', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        // Run async - don't block for long workflows
        const runPromise = workflowEngine.run(id);

        // Wait briefly to get initial status
        const state = await Promise.race([
            runPromise,
            new Promise<WorkflowState | null>(resolve =>
                setTimeout(async () => resolve(await workflowEngine.getStatus(id)), 1000)
            )
        ]);

        if (!state) {
            return res.status(404).json({ ok: false, error: 'Workflow not found' });
        }

        res.json({
            ok: true,
            workflowId: state.workflowId,
            status: state.status,
            currentStep: state.currentStep,
            steps: state.steps.map(s => ({
                name: s.name,
                status: s.status,
                output: s.output
            })),
            context: state.context
        });
    } catch (error: any) {
        console.error('Workflow run error:', error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

/**
 * POST /api/ai/workflows/:id/pause
 * Pause a running workflow
 */
router.post('/workflows/:id/pause', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const state = await workflowEngine.pause(id);

        res.json({
            ok: true,
            workflowId: state.workflowId,
            status: state.status
        });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

/**
 * POST /api/ai/workflows/:id/rollback
 * Rollback to a previous checkpoint
 */
router.post('/workflows/:id/rollback', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { checkpointIndex } = req.body;

        if (typeof checkpointIndex !== 'number') {
            return res.status(400).json({ ok: false, error: 'checkpointIndex required' });
        }

        const state = await workflowEngine.rollback(id, checkpointIndex);

        res.json({
            ok: true,
            workflowId: state.workflowId,
            status: state.status,
            currentStep: state.currentStep,
            checkpoints: state.checkpoints.length
        });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

/**
 * GET /api/ai/workflows/:id
 * Get workflow status and details
 */
router.get('/workflows/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const state = await workflowEngine.getStatus(id);

        if (!state) {
            return res.status(404).json({ ok: false, error: 'Workflow not found' });
        }

        res.json({
            ok: true,
            workflow: {
                workflowId: state.workflowId,
                name: state.name,
                status: state.status,
                currentStep: state.currentStep,
                totalSteps: state.steps.length,
                steps: state.steps.map(s => ({
                    name: s.name,
                    agent: s.agent,
                    status: s.status,
                    output: s.output,
                    error: s.error
                })),
                context: state.context,
                checkpoints: state.checkpoints.length,
                startedAt: state.startedAt,
                completedAt: state.completedAt,
                error: state.error
            }
        });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

/**
 * POST /api/ai/workflows/run-template
 * One-shot: create and run a workflow from template
 */
router.post('/workflows/run-template', requireAdmin, async (req, res) => {
    try {
        const { template, context } = req.body;

        if (!template || !workflowTemplates[template as WorkflowTemplateName]) {
            return res.status(400).json({
                ok: false,
                error: `Invalid template. Available: ${Object.keys(workflowTemplates).join(', ')}`
            });
        }

        const definition = getWorkflowTemplate(template as WorkflowTemplateName);
        const state = await workflowEngine.create(definition, context || {});
        const result = await workflowEngine.run(state.workflowId);

        res.json({
            ok: true,
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
        console.error('Workflow run-template error:', error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

export default router;
