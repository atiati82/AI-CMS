/**
 * Workflow Templates
 * 
 * Pre-defined workflow definitions for common multi-step tasks.
 */

import { WorkflowDefinition } from './workflow-engine';

// ============================================================================
// PAGE GENERATION WORKFLOW
// ============================================================================

/**
 * Complete page generation workflow:
 * 1. Research topic → 2. Generate SEO → 3. Create content → 4. Design layout
 */
export const pageGenerationWorkflow: WorkflowDefinition = {
    name: 'page-generation',
    description: 'Generate a complete CMS page with research, SEO, content, and design',
    requiredParams: ['topic'],
    steps: [
        {
            name: 'research',
            agent: 'research',
            taskType: 'search_knowledge',
            input: (ctx) => ({ query: ctx.topic }),
            maxRetries: 2
        },
        {
            name: 'seo-analysis',
            agent: 'seo',
            taskType: 'suggest_keywords',
            input: (ctx) => ({
                topic: ctx.topic,
                context: ctx.research_output
            }),
            maxRetries: 2
        },
        {
            name: 'content-generation',
            agent: 'content',
            taskType: 'generate_content',
            input: (ctx) => ({
                topic: ctx.topic,
                keywords: ctx['seo-analysis_output']?.keywords || [],
                tone: ctx.tone || 'professional',
                length: ctx.length || 'medium',
                researchContext: ctx.research_output
            }),
            maxRetries: 2
        },
        {
            name: 'design-suggestion',
            agent: 'design',
            taskType: 'suggest_visual_style',
            input: (ctx) => ({
                topic: ctx.topic,
                cluster: ctx.cluster,
                content: ctx['content-generation_output']?.content
            }),
            maxRetries: 1
        }
    ],
    initialContext: {}
};

// ============================================================================
// SEO AUDIT WORKFLOW
// ============================================================================

/**
 * SEO audit workflow:
 * 1. Analyze page → 2. Suggest keywords → 3. Check health metrics
 */
export const seoAuditWorkflow: WorkflowDefinition = {
    name: 'seo-audit',
    description: 'Perform comprehensive SEO audit on a page or topic',
    requiredParams: ['topic'],
    steps: [
        {
            name: 'content-analysis',
            agent: 'content',
            taskType: 'analyze_content',
            input: (ctx) => ({
                pageId: ctx.pageId,
                path: ctx.path,
                content: ctx.content || ctx.topic // Fallback if no specific content provided
            }),
            maxRetries: 1
        },
        {
            name: 'keyword-suggestions',
            agent: 'seo',
            taskType: 'suggest_keywords',
            input: (ctx) => ({
                topic: ctx.topic || ctx['content-analysis_output']?.summary,
                existingKeywords: ctx.existingKeywords || []
            }),
            maxRetries: 2
        },
        {
            name: 'health-check',
            agent: 'devops',
            taskType: 'check_health',
            input: () => ({ checkType: 'performance' }),
            condition: (ctx) => ctx.includeHealthCheck === true,
            maxRetries: 1
        }
    ]
};

// ============================================================================
// RESEARCH & REPORT WORKFLOW
// ============================================================================

/**
 * Deep research workflow:
 * 1. Initial research → 2. Cross-reference → 3. Generate report
 */
export const researchReportWorkflow: WorkflowDefinition = {
    name: 'research-report',
    description: 'Conduct in-depth research and generate a comprehensive report',
    requiredParams: ['topic'],
    steps: [
        {
            name: 'initial-research',
            agent: 'research',
            taskType: 'search_knowledge',
            input: (ctx) => ({ query: ctx.topic }),
            maxRetries: 2
        },
        {
            name: 'cross-reference',
            agent: 'research',
            taskType: 'compare_mineral_sources',
            input: (ctx) => ({
                sources: ctx.sources || ['andara', 'ocean', 'volcanic'],
                context: ctx['initial-research_output']
            }),
            condition: (ctx) => ctx.compareSourcesEnabled !== false,
            maxRetries: 1
        },
        {
            name: 'generate-report',
            agent: 'content',
            taskType: 'generate_content',
            input: (ctx) => ({
                topic: `Research Report: ${ctx.topic}`,
                tone: 'scientific',
                length: 'long',
                researchData: ctx['initial-research_output'],
                comparisonData: ctx['cross-reference_output']
            }),
            maxRetries: 2
        }
    ]
};

// ============================================================================
// VISUAL ENHANCEMENT WORKFLOW
// ============================================================================

/**
 * Enhance page visuals:
 * 1. Interpret current design → 2. Generate improvements → 3. Apply motion
 */
export const visualEnhancementWorkflow: WorkflowDefinition = {
    name: 'visual-enhancement',
    description: 'Analyze and enhance page visual design',
    requiredParams: ['content'],
    steps: [
        {
            name: 'visual-analysis',
            agent: 'visual-interpreter',
            taskType: 'interpret_visual',
            input: (ctx) => ({
                pageId: ctx.pageId,
                content: ctx.content
            }),
            maxRetries: 1
        },
        {
            name: 'palette-generation',
            agent: 'design',
            taskType: 'generate_palette',
            input: (ctx) => ({
                topic: ctx.topic,
                zone: ctx.zone,
                currentAnalysis: ctx['visual-analysis_output']
            }),
            maxRetries: 1
        },
        {
            name: 'motion-recommendation',
            agent: 'design',
            taskType: 'apply_motion',
            input: (ctx) => ({
                contentType: ctx.contentType || 'page',
                palette: ctx['palette-generation_output']
            }),
            maxRetries: 1
        }
    ]
};

// ============================================================================
// SYSTEM MAINTENANCE WORKFLOWS
// ============================================================================

export const systemHealthCheckWorkflow: WorkflowDefinition = {
    name: 'system-health-check',
    description: 'Run diagnostics on DB, API, and Agent subsystems',
    requiredParams: [],
    steps: [
        {
            name: 'check-db',
            agent: 'devops',
            taskType: 'check_health',
            input: () => ({ checkType: 'database' }),
            maxRetries: 1
        },
        {
            name: 'check-api',
            agent: 'devops',
            taskType: 'check_health',
            input: () => ({ checkType: 'api' }),
            maxRetries: 1
        },
        {
            name: 'compile-report',
            agent: 'content',
            taskType: 'generate_content',
            input: (ctx) => ({
                topic: 'System Health Report',
                tone: 'technical',
                length: 'short',
                data: {
                    db: ctx['check-db_output'],
                    api: ctx['check-api_output']
                }
            }),
            maxRetries: 0
        }
    ]
};

export const contentCleanupWorkflow: WorkflowDefinition = {
    name: 'content-cleanup',
    description: 'Identify orphan pages and fix broken links',
    requiredParams: [],
    steps: [
        {
            name: 'find-orphans',
            agent: 'seo',
            taskType: 'find_orphans',
            input: () => ({}),
            maxRetries: 1
        },
        {
            name: 'analyze-links',
            agent: 'seo',
            taskType: 'analyze_links',
            input: () => ({ checkExternal: true }),
            maxRetries: 1
        },
        {
            name: 'generate-fixes',
            agent: 'content',
            taskType: 'suggest_fixes',
            input: (ctx) => ({
                orphans: ctx['find-orphans_output'],
                brokenLinks: ctx['analyze-links_output']
            }),
            maxRetries: 1
        }
    ]
};

// ============================================================================
// WORKFLOW REGISTRY
// ============================================================================

export const workflowTemplates = {
    'page-generation': pageGenerationWorkflow,
    'seo-audit': seoAuditWorkflow,
    'research-report': researchReportWorkflow,
    'visual-enhancement': visualEnhancementWorkflow,
    'system-health-check': systemHealthCheckWorkflow,
    'content-cleanup': contentCleanupWorkflow
} as const;

export type WorkflowTemplateName = keyof typeof workflowTemplates;

/**
 * Get a workflow template by name
 */
export function getWorkflowTemplate(name: WorkflowTemplateName): WorkflowDefinition {
    return workflowTemplates[name];
}

/**
 * List all available workflow templates
 */
export function listWorkflowTemplates() {
    return Object.entries(workflowTemplates).map(([key, def]) => ({
        id: key,
        name: def.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: def.description,
        requiredParams: def.requiredParams || [],
        steps: def.steps.map(s => ({
            id: s.name, // using name as ID for UI
            name: s.name,
            description: `Agent: ${s.agent}, Task: ${s.taskType}`,
            agent: s.agent
        }))
    }));
}
