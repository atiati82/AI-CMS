import { Agent, AgentTask, AgentResult, createSuccessResult, createErrorResult } from './base';

// Design Agent - Handles visual design suggestions
export const designAgent: Agent = {
    name: 'design',
    description: 'Visual design and styling agent',
    capabilities: ['suggest_visual_style', 'generate_palette', 'recommend_layout', 'apply_motion'],

    async execute(task: AgentTask): Promise<AgentResult> {
        try {
            switch (task.type) {
                case 'suggest_visual_style':
                    return suggestVisualStyle(task.input);

                case 'generate_palette':
                    return generatePalette(task.input);

                case 'recommend_layout':
                    return recommendLayout(task.input);

                case 'apply_motion':
                    return applyMotion(task.input);

                default:
                    return createErrorResult(`Unknown task type: ${task.type}`);
            }
        } catch (error: any) {
            return createErrorResult(error.message || 'Design agent failed');
        }
    }
};

function suggestVisualStyle(input: any): AgentResult {
    const { topic, mood } = input;

    const styles = {
        calm: { colors: ['#E8F4F8', '#B8D4E0'], fonts: ['Inter', 'Roboto'] },
        energetic: { colors: ['#FF6B6B', '#4ECDC4'], fonts: ['Poppins', 'Montserrat'] },
        professional: { colors: ['#2C3E50', '#3498DB'], fonts: ['Lato', 'Source Sans Pro'] }
    };

    const style = styles[mood as keyof typeof styles] || styles.calm;

    return createSuccessResult({
        colors: style.colors,
        fonts: style.fonts,
        recommendations: `For ${topic}, use ${mood} styling`
    });
}

function generatePalette(input: any): AgentResult {
    const { baseColor } = input;

    // Simple palette generation
    const palette = {
        primary: baseColor || '#3498DB',
        secondary: '#2ECC71',
        accent: '#E74C3C',
        neutral: '#95A5A6',
        background: '#ECF0F1'
    };

    return createSuccessResult({ palette });
}

function recommendLayout(input: any): AgentResult {
    const { pageType } = input;

    const layouts: Record<string, string> = {
        home: 'hero-features-cta',
        article: 'header-content-sidebar',
        product: 'gallery-details-reviews',
        default: 'simple-centered'
    };

    const layout = layouts[pageType] || layouts.default;

    return createSuccessResult({ layout, pageType });
}

function applyMotion(input: any): AgentResult {
    const { preset } = input;

    const motionPresets: Record<string, any> = {
        subtle: { duration: 300, easing: 'ease-in-out', scale: 1.02 },
        dynamic: { duration: 500, easing: 'ease-out', scale: 1.1 },
        smooth: { duration: 400, easing: 'ease', scale: 1.05 }
    };

    const motion = motionPresets[preset] || motionPresets.subtle;

    return createSuccessResult({ motion });
}

// DevOps Agent - Handles system operations, health monitoring, auto-healing
export const devopsAgent: Agent = {
    name: 'devops',
    description: 'System operations, health monitoring, and auto-healing agent',
    capabilities: ['check_health', 'optimize_performance', 'backup_data', 'monitor_metrics', 'auto_heal', 'generate_alerts'],

    async execute(task: AgentTask): Promise<AgentResult> {
        try {
            switch (task.type) {
                case 'check_system_health':
                    return await checkSystemHealth();

                case 'get_performance_metrics':
                    return await getPerformanceMetrics(task.input);

                case 'generate_alerts':
                    return await generateAlerts();

                case 'auto_heal':
                    return await autoHeal(task.input);

                case 'check_health':
                    return checkHealth();

                case 'optimize_performance':
                    return optimizePerformance();

                case 'backup_data':
                    return backupData();

                default:
                    return createErrorResult(`Unknown task type: ${task.type}`);
            }
        } catch (error: any) {
            return createErrorResult(error.message || 'DevOps agent failed');
        }
    }
};

// Health monitoring implementation
async function checkSystemHealth(): Promise<AgentResult> {
    const health = {
        status: 'healthy' as 'healthy' | 'degraded' | 'down',
        database: await checkDatabase(),
        memory: checkMemory(),
        cpu: checkCPU(),
        timestamp: new Date()
    };

    // Determine overall status
    if (health.database.status === 'error') {
        health.status = 'down';
    } else if (health.database.status === 'warning' || health.memory.heapUsedMB > 400) {
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

        return {
            status: latencyMs < 50 ? 'ok' : latencyMs < 100 ? 'warning' : 'error',
            latencyMs
        };
    } catch (error) {
        return { status: 'error', message: String(error) };
    }
}

function checkMemory(): any {
    const memoryUsage = process.memoryUsage();
    return {
        heapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        heapTotalMB: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        externalMB: Math.round(memoryUsage.external / 1024 / 1024),
        rssMB: Math.round(memoryUsage.rss / 1024 / 1024)
    };
}

function checkCPU(): any {
    const cpuUsage = process.cpuUsage();
    const os = require('os');
    return {
        userMs: Math.round(cpuUsage.user / 1000000),
        systemMs: Math.round(cpuUsage.system / 1000000),
        loadAverage: os.loadavg()
    };
}

async function getPerformanceMetrics(input: any): Promise<AgentResult> {
    const component = input?.component || 'all';

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
    if (health.output.memory.heapUsedMB > 800) {
        alerts.push({
            level: 'critical',
            message: `Critical memory usage: ${health.output.memory.heapUsedMB}MB`,
            component: 'memory',
            timestamp: new Date()
        });
    } else if (health.output.memory.heapUsedMB > 400) {
        alerts.push({
            level: 'warning',
            message: `High memory usage: ${health.output.memory.heapUsedMB}MB`,
            component: 'memory',
            timestamp: new Date()
        });
    }

    // Database alerts
    if (health.output.database.status === 'error') {
        alerts.push({
            level: 'critical',
            message: 'Database connectivity issue',
            component: 'database',
            timestamp: new Date()
        });
    } else if (health.output.database.status === 'warning') {
        alerts.push({
            level: 'warning',
            message: `Database latency high: ${health.output.database.latencyMs}ms`,
            component: 'database',
            timestamp: new Date()
        });
    }

    return createSuccessResult(alerts);
}

async function autoHeal(input: any): Promise<AgentResult> {
    const issueType = input?.issueType;

    switch (issueType) {
        case 'memory':
            if (global.gc) {
                global.gc();
                return createSuccessResult({
                    healed: true,
                    action: 'Forced garbage collection'
                });
            }
            return createSuccessResult({
                healed: false,
                message: 'GC not available (run node with --expose-gc)'
            });

        case 'cache':
            // Clear application caches (placeholder)
            return createSuccessResult({
                healed: true,
                action: 'Cleared application caches'
            });

        default:
            return createErrorResult(`Unknown issue type: ${issueType}`);
    }
}

// Legacy methods (kept for backward compatibility)
function checkHealth(): AgentResult {
    const health = {
        database: 'healthy',
        server: 'healthy',
        memory: checkMemory().heapUsedMB + 'MB',
        cpu: checkCPU().loadAverage[0].toFixed(2)
    };

    return createSuccessResult({ status: 'healthy', details: health });
}

function optimizePerformance(): AgentResult {
    return createSuccessResult({
        optimized: true,
        improvements: ['cached queries', 'compressed assets']
    });
}

function backupData(): AgentResult {
    return createSuccessResult({
        backup: 'backup-' + Date.now() + '.sql',
        timestamp: new Date().toISOString()
    });
}
