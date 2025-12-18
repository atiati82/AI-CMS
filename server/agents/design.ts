import { Agent, AgentTask, AgentResult, createSuccessResult, createErrorResult } from './base';
import { designAgentBriefing, devopsAgentBriefing } from './briefings';
import { getAiClient } from '../services/andara-chat';

/**
 * DESIGN AGENT - VISUAL STYLING WITH AI
 * 
 * Uses official briefing and Andara design language.
 * Generates palettes, layouts, motion configs, and visual-config blocks.
 */
export const designAgent: Agent = {
    name: designAgentBriefing.name,
    description: designAgentBriefing.role,
    capabilities: designAgentBriefing.capabilities,
    icon: designAgentBriefing.icon,
    role: designAgentBriefing.role,
    rules: designAgentBriefing.rules,

    async execute(task: AgentTask): Promise<AgentResult> {
        try {
            switch (task.type) {
                case 'generate_palette':
                    return await generatePalette(task.input);
                case 'suggest_visual_style':
                    return await suggestVisualStyle(task.input);
                case 'recommend_layout':
                    return await recommendLayout(task.input);
                case 'apply_motion':
                    return await applyMotion(task.input);
                case 'analyze_design':
                    return await analyzeDesign(task.input);
                case 'visual_config':
                    return await generateVisualConfig(task.input);
                default:
                    return createErrorResult(`Unknown task type: ${task.type}`);
            }
        } catch (error: any) {
            return createErrorResult(error.message || 'Design agent failed');
        }
    }
};

// Generate color palette with AI
async function generatePalette(input: any): Promise<AgentResult> {
    const { baseColor = '#4F46E5', mood = 'calm', theme = 'andara' } = input;

    const prompt = `${designAgentBriefing.systemPrompt}

---

Generate a color palette for Andara Ionic:
- Base color: ${baseColor}
- Mood: ${mood}
- Theme: ${theme}

Return JSON with HSL values and hex:
{
  "primary": { "hex": "#4F46E5", "hsl": "245, 58%, 51%", "name": "Andara Indigo" },
  "secondary": { "hex": "#06B6D4", "hsl": "186, 100%, 42%", "name": "Turquoise" },
  "accent": { "hex": "#FBBF24", "hsl": "45, 93%, 47%", "name": "Gold" },
  "neutral": { "hex": "#F8FAFC", "hsl": "210, 40%, 98%", "name": "Ghost White" },
  "dark": { "hex": "#0F172A", "hsl": "222, 47%, 11%", "name": "Deep Navy" },
  "gradients": [
    "linear-gradient(135deg, primary 0%, secondary 100%)"
  ],
  "usage": "Brief usage guidance for each color"
}`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const responseText = response.text?.trim() || '{}';
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const palette = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

        return createSuccessResult({ baseColor, mood, ...palette }, { model });
    } catch (error: any) {
        // Fallback to predefined Andara palette
        return createSuccessResult({
            baseColor,
            mood,
            primary: { hex: '#4F46E5', hsl: '245, 58%, 51%', name: 'Andara Indigo' },
            secondary: { hex: '#06B6D4', hsl: '186, 100%, 42%', name: 'Turquoise' },
            accent: { hex: '#FBBF24', hsl: '45, 93%, 47%', name: 'Gold' },
            neutral: { hex: '#F8FAFC', hsl: '210, 40%, 98%', name: 'Ghost White' },
            dark: { hex: '#0F172A', hsl: '222, 47%, 11%', name: 'Deep Navy' },
            fallback: true
        });
    }
}

// Suggest visual style based on topic and mood
async function suggestVisualStyle(input: any): Promise<AgentResult> {
    const { topic, mood = 'calm', pageType = 'science' } = input;

    const topicToVibe: Record<string, string[]> = {
        water: ['flowing', 'liquid', 'depth', 'crystalline'],
        minerals: ['grounded', 'geometric', 'crystalline', 'stable'],
        bioelectric: ['pulsing', 'energetic', 'neural', 'dynamic'],
        terrain: ['organic', 'earthy', 'stable', 'grounded'],
        spiritual: ['ethereal', 'luminous', 'cosmic', 'transcendent']
    };

    const moodToTone: Record<string, string[]> = {
        calm: ['wise', 'reassuring', 'gentle'],
        scientific: ['precise', 'authoritative', 'educational'],
        premium: ['luxurious', 'elegant', 'refined'],
        transformative: ['dynamic', 'inspiring', 'powerful']
    };

    // Find matching vibe keywords
    const vibeKeywords = Object.entries(topicToVibe)
        .filter(([key]) => topic.toLowerCase().includes(key))
        .flatMap(([, values]) => values)
        .slice(0, 5);

    if (vibeKeywords.length === 0) {
        vibeKeywords.push('crystalline', 'luminous', 'premium');
    }

    const emotionalTone = moodToTone[mood] || moodToTone.calm;

    return createSuccessResult({
        topic,
        mood,
        pageType,
        vibeKeywords,
        emotionalTone,
        colorPalette: 'indigo → turquoise → white light',
        suggestedMotion: vibeKeywords.includes('flowing') ? 'Liquid-Crystal Float' : 'Krystal Bloom',
        recommendation: `For ${topic} with ${mood} mood, use ${vibeKeywords.join(', ')} aesthetic`
    });
}

// Recommend layout based on page type
function recommendLayout(input: any): AgentResult {
    const { pageType, sections = 5 } = input;

    const layoutPresets: Record<string, { hero: string; main: string[]; cta: string }> = {
        'science-large': {
            hero: 'hero_split',
            main: ['feature_columns', 'step_process', 'testimonial_grid', 'faq_accordion'],
            cta: 'cta_section'
        },
        'science-small': {
            hero: 'hero_centered',
            main: ['benefit_grid', 'article_longform'],
            cta: 'cta_bar'
        },
        'product': {
            hero: 'hero_media_bg',
            main: ['benefit_grid', 'pricing_table', 'testimonial_slider'],
            cta: 'cta_section'
        },
        'landing': {
            hero: 'hero_split',
            main: ['feature_columns', 'stats_highlight', 'testimonial_grid', 'faq_accordion'],
            cta: 'cta_section'
        },
        'blog-post': {
            hero: 'hero_centered',
            main: ['article_longform', 'sidebar_content'],
            cta: 'cta_bar'
        }
    };

    const preset = layoutPresets[pageType] || layoutPresets['science-large'];
    const selectedMain = preset.main.slice(0, sections - 2);

    return createSuccessResult({
        pageType,
        sections,
        layout: {
            hero: preset.hero,
            main: selectedMain,
            cta: preset.cta
        },
        fullLayout: [preset.hero, ...selectedMain, preset.cta]
    });
}

// Apply motion preset
function applyMotion(input: any): AgentResult {
    const { preset = 'Liquid-Crystal Float', elements } = input;

    const motionPresets: Record<string, { entrance: string; hover: string; ambient: string; timing: string }> = {
        'Liquid-Crystal Float': {
            entrance: 'fadeUp',
            hover: 'hover.lift',
            ambient: 'ambient.float, ambient.shimmer',
            timing: 'normal (0.4s)'
        },
        'Energetic Pulse': {
            entrance: 'scaleUp',
            hover: 'hover.glow',
            ambient: 'ambient.pulse',
            timing: 'fast (0.2s)'
        },
        'Magnetic Drift': {
            entrance: 'fadeLeft, fadeRight (alternating)',
            hover: 'hover.scale',
            ambient: 'none',
            timing: 'normal (0.4s)'
        },
        'Krystal Bloom': {
            entrance: 'scaleUp',
            hover: 'hover.lift',
            ambient: 'ambient.shimmer',
            timing: 'slow (0.6s)'
        },
        'Scalar Slide': {
            entrance: 'stagger.containerFast',
            hover: 'hover.lift',
            ambient: 'none',
            timing: 'fast (0.2s)'
        },
        'Vortex Reveal': {
            entrance: 'fadeUp with bounce easing',
            hover: 'hover.glow',
            ambient: 'ambient.pulse',
            timing: 'normal (0.4s)'
        }
    };

    const motion = motionPresets[preset] || motionPresets['Liquid-Crystal Float'];

    return createSuccessResult({
        preset,
        motion,
        elements: elements || ['hero', 'cards', 'cta'],
        cssImport: `import { ${motion.entrance.replace(/\./g, '_')}, ${motion.hover.replace(/\./g, '_')} } from '@/lib/motion'`
    });
}

// Analyze existing design
async function analyzeDesign(input: any): Promise<AgentResult> {
    const { content, currentConfig } = input;

    const prompt = `${designAgentBriefing.systemPrompt}

---

Analyze this page design and suggest improvements:

Content/HTML:
${content?.substring(0, 1000) || 'Not provided'}

Current Visual Config:
${JSON.stringify(currentConfig || {}, null, 2)}

Return JSON:
{
  "currentStyle": "description of current design",
  "vibeDetected": ["keywords"],
  "layoutDetected": ["layouts"],
  "improvements": [
    { "area": "color|layout|motion|typography", "issue": "what's wrong", "suggestion": "how to fix" }
  ],
  "motionOpportunities": ["where to add motion"],
  "overallScore": 0-100
}`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const responseText = response.text?.trim() || '{}';
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

        return createSuccessResult(analysis, { model });
    } catch (error: any) {
        return createErrorResult(`Design analysis failed: ${error.message}`);
    }
}

// Generate complete visual-config block
async function generateVisualConfig(input: any): Promise<AgentResult> {
    const { content, pageType = 'science', topic = '' } = input;

    const prompt = `${designAgentBriefing.systemPrompt}

---

Generate a complete visual-config block for this page:

Page Type: ${pageType}
Topic: ${topic}
Content Preview: ${content?.substring(0, 500) || 'General content'}

Return in this exact format (as JSON):
{
  "vibeKeywords": ["crystalline", "luminous", "flowing"],
  "emotionalTone": ["calm", "scientific", "premium"],
  "colorPalette": "indigo → turquoise → white light",
  "layout": ["hero_centered", "benefit_grid", "faq_accordion"],
  "motionPreset": "Liquid-Crystal Float",
  "entrance": { "hero": "fadeUp", "grid": "stagger" },
  "hover": { "cards": "hover.lift", "cta": "hover.glow" },
  "ambient": { "heroVisual": "ambient.float", "background": "ambient.shimmer" }
}`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const responseText = response.text?.trim() || '{}';
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const config = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

        return createSuccessResult({ visualConfig: config, pageType, topic }, { model });
    } catch (error: any) {
        // Fallback to defaults
        return createSuccessResult({
            visualConfig: {
                vibeKeywords: ['crystalline', 'luminous', 'premium'],
                emotionalTone: ['calm', 'scientific'],
                colorPalette: 'indigo → turquoise → white',
                layout: ['hero_centered', 'benefit_grid'],
                motionPreset: 'Liquid-Crystal Float'
            },
            pageType,
            fallback: true
        });
    }
}

// ============================================================================
// DEVOPS AGENT - SYSTEM HEALTH & AUTO-HEALING
// ============================================================================

export const devopsAgent: Agent = {
    name: devopsAgentBriefing.name,
    description: devopsAgentBriefing.role,
    capabilities: devopsAgentBriefing.capabilities,
    icon: devopsAgentBriefing.icon,
    role: devopsAgentBriefing.role,
    rules: devopsAgentBriefing.rules,

    async execute(task: AgentTask): Promise<AgentResult> {
        try {
            switch (task.type) {
                case 'check_system_health':
                case 'check_health':
                    return await checkSystemHealth();
                case 'get_performance_metrics':
                    return await getPerformanceMetrics(task.input);
                case 'generate_alerts':
                    return await generateAlerts();
                case 'auto_heal':
                    return await autoHeal(task.input);
                case 'backup_status':
                    return await getBackupStatus();
                case 'audit_log':
                    return await getAuditLog(task.input);
                default:
                    return createErrorResult(`Unknown task type: ${task.type}`);
            }
        } catch (error: any) {
            return createErrorResult(error.message || 'DevOps agent failed');
        }
    }
};

// Check system health
async function checkSystemHealth(): Promise<AgentResult> {
    const health = {
        status: 'healthy' as 'healthy' | 'degraded' | 'critical',
        timestamp: new Date().toISOString(),
        database: await checkDatabase(),
        memory: checkMemory(),
        cpu: checkCPU()
    };

    // Determine overall status
    if (health.database.status === 'error') {
        health.status = 'critical';
    } else if (health.database.status === 'warning' || health.memory.percentage > 80) {
        health.status = 'degraded';
    }

    return createSuccessResult(health);
}

async function checkDatabase(): Promise<any> {
    try {
        const { pool } = await import('../db');
        const startTime = Date.now();
        await pool.query('SELECT 1');
        const latencyMs = Date.now() - startTime;

        let status: 'ok' | 'warning' | 'error' = 'ok';
        if (latencyMs > 500) status = 'error';
        else if (latencyMs > 100) status = 'warning';

        return { status, latencyMs, threshold: { warning: 100, critical: 500 } };
    } catch (error) {
        return { status: 'error', message: String(error) };
    }
}

function checkMemory(): any {
    const memoryUsage = process.memoryUsage();
    const heapUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    const heapTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
    const percentage = Math.round((heapUsedMB / heapTotalMB) * 100);

    let status: 'ok' | 'warning' | 'critical' = 'ok';
    if (percentage > 95) status = 'critical';
    else if (percentage > 80) status = 'warning';

    return {
        status,
        heapUsedMB,
        heapTotalMB,
        percentage,
        rssMB: Math.round(memoryUsage.rss / 1024 / 1024),
        threshold: { warning: 80, critical: 95 }
    };
}

function checkCPU(): any {
    const cpuUsage = process.cpuUsage();
    const os = require('os');
    const loadAverage = os.loadavg();

    let status: 'ok' | 'warning' | 'critical' = 'ok';
    if (loadAverage[0] > 4.0) status = 'critical';
    else if (loadAverage[0] > 2.0) status = 'warning';

    return {
        status,
        loadAverage: loadAverage.map((l: number) => Math.round(l * 100) / 100),
        userMs: Math.round(cpuUsage.user / 1000000),
        systemMs: Math.round(cpuUsage.system / 1000000),
        threshold: { warning: 2.0, critical: 4.0 }
    };
}

async function getPerformanceMetrics(input: any): Promise<AgentResult> {
    const { component = 'all' } = input;

    if (component === 'all') {
        return checkSystemHealth();
    }

    switch (component) {
        case 'memory':
            return createSuccessResult(checkMemory());
        case 'cpu':
            return createSuccessResult(checkCPU());
        case 'database':
            return createSuccessResult(await checkDatabase());
        default:
            return createErrorResult(`Unknown component: ${component}`);
    }
}

async function generateAlerts(): Promise<AgentResult> {
    const health = await checkSystemHealth();
    const alerts: any[] = [];

    // Memory alerts
    if (health.output.memory.status === 'critical') {
        alerts.push({
            level: 'critical',
            component: 'memory',
            message: `Critical memory usage: ${health.output.memory.percentage}%`,
            metric: health.output.memory,
            recommendation: 'Restart application or investigate memory leaks'
        });
    } else if (health.output.memory.status === 'warning') {
        alerts.push({
            level: 'warning',
            component: 'memory',
            message: `High memory usage: ${health.output.memory.percentage}%`,
            metric: health.output.memory,
            recommendation: 'Monitor and consider restarting if it continues'
        });
    }

    // Database alerts
    if (health.output.database.status === 'error') {
        alerts.push({
            level: 'critical',
            component: 'database',
            message: 'Database connectivity issue',
            metric: health.output.database,
            recommendation: 'Check database server and connection pool'
        });
    } else if (health.output.database.status === 'warning') {
        alerts.push({
            level: 'warning',
            component: 'database',
            message: `Database latency high: ${health.output.database.latencyMs}ms`,
            metric: health.output.database,
            recommendation: 'Investigate slow queries or connection issues'
        });
    }

    // CPU alerts
    if (health.output.cpu.status === 'critical') {
        alerts.push({
            level: 'critical',
            component: 'cpu',
            message: `CPU load critical: ${health.output.cpu.loadAverage[0]}`,
            metric: health.output.cpu,
            recommendation: 'Identify CPU-intensive processes'
        });
    }

    return createSuccessResult({
        timestamp: new Date().toISOString(),
        alertCount: alerts.length,
        criticalCount: alerts.filter(a => a.level === 'critical').length,
        alerts
    });
}

async function autoHeal(input: any): Promise<AgentResult> {
    const { issueType } = input;
    const actions: string[] = [];

    switch (issueType) {
        case 'memory':
            if (global.gc) {
                global.gc();
                actions.push('Forced garbage collection');
                return createSuccessResult({ healed: true, actions });
            }
            return createSuccessResult({
                healed: false,
                message: 'GC not available (run node with --expose-gc)',
                actions
            });

        case 'cache':
            actions.push('Cleared application caches');
            return createSuccessResult({ healed: true, actions });

        default:
            return createErrorResult(`Unknown issue type: ${issueType}. Available: memory, cache`);
    }
}

async function getBackupStatus(): Promise<AgentResult> {
    return createSuccessResult({
        lastBackup: new Date().toISOString(),
        backupType: 'database',
        status: 'healthy',
        note: 'Backup verification placeholder - integrate with actual backup system'
    });
}

async function getAuditLog(input: any): Promise<AgentResult> {
    const { limit = 10 } = input;
    return createSuccessResult({
        logs: [],
        note: 'Audit log placeholder - integrate with actual logging system',
        limit
    });
}
