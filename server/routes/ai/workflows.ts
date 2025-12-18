import { Router } from 'express';
import { storage } from '../../storage';
import { WorkflowStatus, WorkflowStepStatus } from '@shared/schema';

const router = Router();

// --- Default Templates Configuration (Source of Truth) ---
const DEFAULT_TEMPLATES = [
    {
        name: 'Generate Full Page',
        description: 'Research topic, outline content, generate draft, and create visuals.',
        steps: [
            { id: '1', name: 'Research Topic', action: 'research_topic', description: 'Analyze user intent and gather keywords', type: 'ai' },
            { id: '2', name: 'Create Outline', action: 'create_outline', description: 'Structure the page with H2/H3s', type: 'ai' },
            { id: '3', name: 'Generate Content', action: 'generate_content', description: 'Write full SEO-optimized copy', type: 'ai' },
            { id: '4', name: 'Design Visuals', action: 'generate_visuals', description: 'Create AI images and layout config', type: 'ai' },
            { id: '5', name: 'Final Review', action: 'audit_quality', description: 'Check against content guidelines', type: 'ai' }
        ]
    },
    {
        name: 'Deep SEO Audit',
        description: 'Analyze complete site structure and identify content gaps.',
        steps: [
            { id: '1', name: 'Crawl Sitemap', action: 'crawl_site', description: 'Index all current pages', type: 'system' },
            { id: '2', name: 'Analyze Keywords', action: 'analyze_keywords', description: 'Check ranking potential', type: 'ai' },
            { id: '3', name: 'Identify Gaps', action: 'find_gaps', description: 'Find missing topic clusters', type: 'ai' },
            { id: '4', name: 'Generate Report', action: 'create_report', description: 'Compile actionable insights', type: 'ai' }
        ]
    },
    {
        name: 'Content Refresh',
        description: 'Update an existing page with fresh data and improved formatting.',
        steps: [
            { id: '1', name: 'Fetch Page', action: 'fetch_content', description: 'Load current page content', type: 'system' },
            { id: '2', name: 'Analyze Performance', action: 'analyze_stats', description: 'Check bounce rate and time on page', type: 'ai' },
            { id: '3', name: 'Rewrite Sections', action: 'rewrite_content', description: 'Improve engagement and clarity', type: 'ai' },
            { id: '4', name: 'Update Metadata', action: 'update_meta', description: 'Refresh title and description', type: 'ai' }
        ]
    }
] as const;

// Ensure templates exist in DB
async function ensureDefaultTemplates() {
    const existing = await storage.getAllWorkflowTemplates();
    if (existing.length === 0) {
        console.log('[Workflows] Seeding default templates...');
        for (const tpl of DEFAULT_TEMPLATES) {
            await storage.createWorkflowTemplate({
                name: tpl.name,
                description: tpl.description,
                steps: tpl.steps as any
            });
        }
    }
}

// Call immediately (in background)
ensureDefaultTemplates().catch(console.error);


// --- Execution Logic ---

async function runWorkflowStep(executionId: string) {
    const execution = await storage.getWorkflowExecution(executionId);
    if (!execution || execution.status !== 'running') return;

    const steps = await storage.getWorkflowSteps(executionId);
    const step = steps.find(s => s.stepIndex === execution.currentStepIndex);

    if (!step) {
        // No more steps or invalid index -> Complete
        await storage.updateWorkflowExecution(executionId, {
            status: 'completed',
            completedAt: new Date()
        });
        return;
    }

    // Start Step
    await storage.updateWorkflowStep(step.id, {
        status: 'running',
        startedAt: new Date(),
        logs: [`Starting action: ${step.stepName}`]
    });

    // Simulate work matching the previous random duration
    const duration = Math.floor(Math.random() * 3000) + 2000;

    setTimeout(async () => {
        // Re-check status before completing
        const currentExec = await storage.getWorkflowExecution(executionId);
        if (!currentExec || currentExec.status === 'paused') return;

        // Complete Step
        await storage.updateWorkflowStep(step.id, {
            status: 'completed',
            completedAt: new Date(),
            logs: [...(step.logs || []), `Action completed successfully.`],
            output: { success: true, message: `Finished ${step.stepName}` }
        });

        // Advance Index
        const nextIndex = currentExec.currentStepIndex + 1;
        await storage.updateWorkflowExecution(executionId, {
            currentStepIndex: nextIndex
        });

        // Loop
        if (nextIndex < steps.length) {
            runWorkflowStep(executionId);
        } else {
            await storage.updateWorkflowExecution(executionId, {
                status: 'completed',
                completedAt: new Date()
            });
        }
    }, duration);
}

// --- Routes ---

// GET /api/ai/workflows
router.get('/', async (req, res) => {
    try {
        const workflows = await storage.getAllWorkflowExecutions();
        res.json({ ok: true, workflows });
    } catch (err: any) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

// GET /api/ai/workflows/templates
router.get('/templates', async (req, res) => {
    try {
        const templates = await storage.getAllWorkflowTemplates();
        res.json({ ok: true, templates });
    } catch (err: any) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

// POST /api/ai/workflows/create
router.post('/create', async (req, res) => {
    try {
        const { templateId, context } = req.body;

        // Find DB template (or fuzzy match for legacy frontend calls using string IDs)
        // For now assume templateId is the UUID. If frontend sends 'page-generation', we might need to map it.
        // Let's grab all templates and find match by ID or Name for robustness
        const allTemplates = await storage.getAllWorkflowTemplates();
        const templateDef = allTemplates.find(t => t.id === templateId)
            || allTemplates.find(t => t.name.toLowerCase().includes(templateId?.toLowerCase().replace(/-/g, ' ')));

        if (!templateDef) {
            return res.status(400).json({ ok: false, error: `Invalid template: ${templateId}` });
        }

        // Create Execution
        const execution = await storage.createWorkflowExecution({
            templateId: templateDef.id,
            name: `${templateDef.name} - ${new Date().toLocaleTimeString()}`,
            currentStepIndex: 0,
            status: 'idle',
            context: context || {}
        });

        // Create Steps
        const stepsData = templateDef.steps as any[];
        for (let i = 0; i < stepsData.length; i++) {
            const s = stepsData[i];
            await storage.createWorkflowStep({
                executionId: execution.id,
                stepIndex: i,
                stepName: s.name,
                stepType: s.type || 'ai',
                status: 'pending',
                logs: []
            });
        }

        // Return full object with steps for frontend
        const steps = await storage.getWorkflowSteps(execution.id);
        res.json({ ok: true, workflowId: execution.id, workflow: { ...execution, steps } });

    } catch (err: any) {
        console.error('Workflow create error:', err);
        res.status(500).json({ ok: false, error: err.message });
    }
});

// POST /api/ai/workflows/:id/run
router.post('/:id/run', async (req, res) => {
    try {
        const { id } = req.params;
        const workflow = await storage.getWorkflowExecution(id);

        if (!workflow) {
            return res.status(404).json({ ok: false, error: 'Workflow not found' });
        }

        if (workflow.status === 'running') {
            return res.json({ ok: true, message: 'Already running' });
        }

        if (workflow.status === 'completed') {
            return res.status(400).json({ ok: false, error: 'Workflow already completed' });
        }

        await storage.updateWorkflowExecution(id, { status: 'running' });

        // Resume execution
        runWorkflowStep(id);

        res.json({ ok: true, status: 'running' });
    } catch (err: any) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

// POST /api/ai/workflows/:id/pause
router.post('/:id/pause', async (req, res) => {
    try {
        const { id } = req.params;
        const workflow = await storage.getWorkflowExecution(id);

        if (!workflow) {
            return res.status(404).json({ ok: false, error: 'Workflow not found' });
        }

        if (workflow.status === 'running') {
            await storage.updateWorkflowExecution(id, { status: 'paused' });
        }

        res.json({ ok: true, status: 'paused' });
    } catch (err: any) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

// GET /api/ai/workflows/:id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workflow = await storage.getWorkflowExecution(id);
        if (!workflow) return res.status(404).json({ ok: false });

        const steps = await storage.getWorkflowSteps(id);
        res.json({ ok: true, workflow: { ...workflow, steps } });
    } catch (err: any) {
        res.status(500).json({ ok: false, error: err.message });
    }
});


export default router;
