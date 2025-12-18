import { db } from '../db';

export interface AgentMetric {
    id?: string;
    agentName: string;
    taskType: string;
    status: 'success' | 'error' | 'timeout';
    inputTokens?: number;
    outputTokens?: number;
    costUsd?: number;
    latencyMs: number;
    errorMessage?: string;
    userId?: string;
    metadata?: Record<string, any>;
}

export interface DashboardMetrics {
    totalExecutions: number;
    successRate: number;
    avgLatencyMs: number;
    totalCostUsd: number;
    byAgent: {
        agentName: string;
        executions: number;
        successRate: number;
        avgLatencyMs: number;
        totalCostUsd: number;
    }[];
    recentErrors: {
        agentName: string;
        taskType: string;
        errorMessage: string;
        createdAt: Date;
    }[];
}

export interface CostBreakdown {
    date: string;
    agentName: string;
    totalCostUsd: number;
    executions: number;
}

export class AgentMetricsService {
    /**
     * Record a new agent execution metric
     */
    async recordExecution(metric: AgentMetric): Promise<void> {
        try {
            await db.query(
                `INSERT INTO agent_metrics (
          agent_name, task_type, status, input_tokens, output_tokens,
          cost_usd, latency_ms, error_message, user_id, metadata
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                [
                    metric.agentName,
                    metric.taskType,
                    metric.status,
                    metric.inputTokens || 0,
                    metric.outputTokens || 0,
                    metric.costUsd || 0,
                    metric.latencyMs,
                    metric.errorMessage || null,
                    metric.userId || null,
                    metric.metadata ? JSON.stringify(metric.metadata) : null
                ]
            );
        } catch (error) {
            console.error('Failed to record agent metric:', error);
            // Don't throw - metrics recording should not break agent execution
        }
    }

    /**
     * Get dashboard metrics for a time range
     */
    async getDashboardMetrics(hours: number = 24): Promise<DashboardMetrics> {
        const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);

        // Total stats
        const totalStats = await db.query(
            `SELECT 
        COUNT(*) as total_executions,
        AVG(CASE WHEN status = 'success' THEN 1.0 ELSE 0.0 END) as success_rate,
        AVG(latency_ms) as avg_latency_ms,
        SUM(cost_usd) as total_cost_usd
      FROM agent_metrics
      WHERE created_at >= $1`,
            [cutoffTime]
        );

        // By agent stats
        const byAgentStats = await db.query(
            `SELECT 
        agent_name,
        COUNT(*) as executions,
        AVG(CASE WHEN status = 'success' THEN 1.0 ELSE 0.0 END) as success_rate,
        AVG(latency_ms) as avg_latency_ms,
        SUM(cost_usd) as total_cost_usd
      FROM agent_metrics
      WHERE created_at >= $1
      GROUP BY agent_name
      ORDER BY executions DESC`,
            [cutoffTime]
        );

        // Recent errors
        const recentErrors = await db.query(
            `SELECT agent_name, task_type, error_message, created_at
      FROM agent_metrics
      WHERE status = 'error' AND created_at >= $1
      ORDER BY created_at DESC
      LIMIT 10`,
            [cutoffTime]
        );

        return {
            totalExecutions: parseInt(totalStats.rows[0]?.total_executions || '0'),
            successRate: parseFloat(totalStats.rows[0]?.success_rate || '0'),
            avgLatencyMs: parseFloat(totalStats.rows[0]?.avg_latency_ms || '0'),
            totalCostUsd: parseFloat(totalStats.rows[0]?.total_cost_usd || '0'),
            byAgent: byAgentStats.rows.map(row => ({
                agentName: row.agent_name,
                executions: parseInt(row.executions),
                successRate: parseFloat(row.success_rate),
                avgLatencyMs: parseFloat(row.avg_latency_ms),
                totalCostUsd: parseFloat(row.total_cost_usd)
            })),
            recentErrors: recentErrors.rows.map(row => ({
                agentName: row.agent_name,
                taskType: row.task_type,
                errorMessage: row.error_message,
                createdAt: row.created_at
            }))
        };
    }

    /**
     * Get cost breakdown by date and agent
     */
    async getCostBreakdown(startDate: Date, endDate: Date): Promise<CostBreakdown[]> {
        const result = await db.query(
            `SELECT 
        DATE(created_at) as date,
        agent_name,
        SUM(cost_usd) as total_cost_usd,
        COUNT(*) as executions
      FROM agent_metrics
      WHERE created_at >= $1 AND created_at < $2
      GROUP BY DATE(created_at), agent_name
      ORDER BY date DESC, agent_name`,
            [startDate, endDate]
        );

        return result.rows.map(row => ({
            date: row.date,
            agentName: row.agent_name,
            totalCostUsd: parseFloat(row.total_cost_usd),
            executions: parseInt(row.executions)
        }));
    }

    /**
     * Check if agent is within cost limits
     */
    async checkCostLimits(agentName: string): Promise<{
        withinLimits: boolean;
        dailyUsed: number;
        monthlyUsed: number;
        dailyLimit: number | null;
        monthlyLimit: number | null;
    }> {
        // Get agent config
        const config = await db.query(
            `SELECT daily_cost_limit_usd, monthly_cost_limit_usd
      FROM agent_configurations
      WHERE agent_name = $1`,
            [agentName]
        );

        if (config.rows.length === 0) {
            return {
                withinLimits: true,
                dailyUsed: 0,
                monthlyUsed: 0,
                dailyLimit: null,
                monthlyLimit: null
            };
        }

        const dailyLimit = config.rows[0].daily_cost_limit_usd;
        const monthlyLimit = config.rows[0].monthly_cost_limit_usd;

        // Get daily usage
        const dailyUsage = await db.query(
            `SELECT SUM(cost_usd) as total
      FROM agent_metrics
      WHERE agent_name = $1 AND created_at >= NOW() - INTERVAL '1 day'`,
            [agentName]
        );

        // Get monthly usage
        const monthlyUsage = await db.query(
            `SELECT SUM(cost_usd) as total
      FROM agent_metrics
      WHERE agent_name = $1 AND created_at >= NOW() - INTERVAL '30 days'`,
            [agentName]
        );

        const dailyUsed = parseFloat(dailyUsage.rows[0]?.total || '0');
        const monthlyUsed = parseFloat(monthlyUsage.rows[0]?.total || '0');

        const withinLimits =
            (!dailyLimit || dailyUsed < dailyLimit) &&
            (!monthlyLimit || monthlyUsed < monthlyLimit);

        return {
            withinLimits,
            dailyUsed,
            monthlyUsed,
            dailyLimit,
            monthlyLimit
        };
    }

    /**
     * Get metrics for a specific agent
     */
    async getAgentMetrics(agentName: string, hours: number = 24): Promise<{
        executions: number;
        successRate: number;
        avgLatencyMs: number;
        totalCostUsd: number;
        recentExecutions: AgentMetric[];
    }> {
        const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);

        const stats = await db.query(
            `SELECT 
        COUNT(*) as executions,
        AVG(CASE WHEN status = 'success' THEN 1.0 ELSE 0.0 END) as success_rate,
        AVG(latency_ms) as avg_latency_ms,
        SUM(cost_usd) as total_cost_usd
      FROM agent_metrics
      WHERE agent_name = $1 AND created_at >= $2`,
            [agentName, cutoffTime]
        );

        const recent = await db.query(
            `SELECT *
      FROM agent_metrics
      WHERE agent_name = $1
      ORDER BY created_at DESC
      LIMIT 20`,
            [agentName]
        );

        return {
            executions: parseInt(stats.rows[0]?.executions || '0'),
            successRate: parseFloat(stats.rows[0]?.success_rate || '0'),
            avgLatencyMs: parseFloat(stats.rows[0]?.avg_latency_ms || '0'),
            totalCostUsd: parseFloat(stats.rows[0]?.total_cost_usd || '0'),
            recentExecutions: recent.rows.map(row => ({
                id: row.id,
                agentName: row.agent_name,
                taskType: row.task_type,
                status: row.status,
                inputTokens: row.input_tokens,
                outputTokens: row.output_tokens,
                costUsd: parseFloat(row.cost_usd),
                latencyMs: row.latency_ms,
                errorMessage: row.error_message,
                userId: row.user_id,
                metadata: row.metadata
            }))
        };
    }
}

export const agentMetricsService = new AgentMetricsService();
