import express from 'express';
import { requireAdmin } from '../middleware/auth';
import { db } from '../../db';

const router = express.Router();

/**
 * GET /api/ai/agent-config/:agentName
 * Get configuration for a specific agent
 */
router.get('/agent-config/:agentName', requireAdmin, async (req, res) => {
    try {
        const { agentName } = req.params;

        const result = await db.query(
            `SELECT * FROM agent_configurations WHERE agent_name = $1`,
            [agentName]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, error: 'Agent configuration not found' });
        }

        const config = result.rows[0];

        res.json({
            ok: true,
            config: {
                agentName: config.agent_name,
                systemPrompt: config.system_prompt,
                jobProtocol: config.job_protocol,
                enabled: config.enabled,
                maxTokens: config.max_tokens,
                temperature: parseFloat(config.temperature),
                topP: parseFloat(config.top_p),
                timeoutMs: config.timeout_ms,
                dailyCostLimitUsd: config.daily_cost_limit_usd ? parseFloat(config.daily_cost_limit_usd) : null,
                monthlyCostLimitUsd: config.monthly_cost_limit_usd ? parseFloat(config.monthly_cost_limit_usd) : null,
                retryStrategy: config.retry_strategy,
                maxRetries: config.max_retries,
                updatedAt: config.updated_at
            }
        });
    } catch (error) {
        console.error('Get agent config error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch agent configuration' });
    }
});

/**
 * GET /api/ai/agent-config
 * Get all agent configurations
 */
router.get('/agent-config', requireAdmin, async (req, res) => {
    try {
        const result = await db.query(
            `SELECT * FROM agent_configurations ORDER BY agent_name`
        );

        const configs = result.rows.map(config => ({
            agentName: config.agent_name,
            systemPrompt: config.system_prompt,
            jobProtocol: config.job_protocol,
            enabled: config.enabled,
            maxTokens: config.max_tokens,
            temperature: parseFloat(config.temperature),
            topP: parseFloat(config.top_p),
            timeoutMs: config.timeout_ms,
            dailyCostLimitUsd: config.daily_cost_limit_usd ? parseFloat(config.daily_cost_limit_usd) : null,
            monthlyCostLimitUsd: config.monthly_cost_limit_usd ? parseFloat(config.monthly_cost_limit_usd) : null,
            retryStrategy: config.retry_strategy,
            maxRetries: config.max_retries,
            updatedAt: config.updated_at
        }));

        res.json({
            ok: true,
            configs,
            count: configs.length
        });
    } catch (error) {
        console.error('Get all agent configs error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch agent configurations' });
    }
});

/**
 * PUT /api/ai/agent-config/:agentName
 * Update agent configuration
 */
router.put('/agent-config/:agentName', requireAdmin, async (req, res) => {
    try {
        const { agentName } = req.params;
        const {
            systemPrompt,
            jobProtocol,
            enabled,
            maxTokens,
            temperature,
            topP,
            timeoutMs,
            dailyCostLimitUsd,
            monthlyCostLimitUsd,
            retryStrategy,
            maxRetries
        } = req.body;

        // Validate inputs
        if (temperature !== undefined && (temperature < 0 || temperature > 2)) {
            return res.status(400).json({ ok: false, error: 'Temperature must be between 0 and 2' });
        }

        if (topP !== undefined && (topP < 0 || topP > 1)) {
            return res.status(400).json({ ok: false, error: 'Top P must be between 0 and 1' });
        }

        if (maxTokens !== undefined && maxTokens < 1) {
            return res.status(400).json({ ok: false, error: 'Max tokens must be at least 1' });
        }

        // Build update query dynamically
        const updates: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        if (systemPrompt !== undefined) {
            updates.push(`system_prompt = $${paramCount++}`);
            values.push(systemPrompt);
        }

        if (jobProtocol !== undefined) {
            updates.push(`job_protocol = $${paramCount++}`);
            values.push(jobProtocol);
        }

        if (enabled !== undefined) {
            updates.push(`enabled = $${paramCount++}`);
            values.push(enabled);
        }

        if (maxTokens !== undefined) {
            updates.push(`max_tokens = $${paramCount++}`);
            values.push(maxTokens);
        }

        if (temperature !== undefined) {
            updates.push(`temperature = $${paramCount++}`);
            values.push(temperature);
        }

        if (topP !== undefined) {
            updates.push(`top_p = $${paramCount++}`);
            values.push(topP);
        }

        if (timeoutMs !== undefined) {
            updates.push(`timeout_ms = $${paramCount++}`);
            values.push(timeoutMs);
        }

        if (dailyCostLimitUsd !== undefined) {
            updates.push(`daily_cost_limit_usd = $${paramCount++}`);
            values.push(dailyCostLimitUsd);
        }

        if (monthlyCostLimitUsd !== undefined) {
            updates.push(`monthly_cost_limit_usd = $${paramCount++}`);
            values.push(monthlyCostLimitUsd);
        }

        if (retryStrategy !== undefined) {
            updates.push(`retry_strategy = $${paramCount++}`);
            values.push(retryStrategy);
        }

        if (maxRetries !== undefined) {
            updates.push(`max_retries = $${paramCount++}`);
            values.push(maxRetries);
        }

        updates.push(`updated_at = NOW()`);
        updates.push(`updated_by = $${paramCount++}`);
        values.push(req.session?.adminUserId || null);

        values.push(agentName);

        const result = await db.query(
            `UPDATE agent_configurations 
       SET ${updates.join(', ')}
       WHERE agent_name = $${paramCount}
       RETURNING *`,
            values
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, error: 'Agent configuration not found' });
        }

        const config = result.rows[0];

        res.json({
            ok: true,
            config: {
                agentName: config.agent_name,
                systemPrompt: config.system_prompt,
                jobProtocol: config.job_protocol,
                enabled: config.enabled,
                maxTokens: config.max_tokens,
                temperature: parseFloat(config.temperature),
                topP: parseFloat(config.top_p),
                timeoutMs: config.timeout_ms,
                dailyCostLimitUsd: config.daily_cost_limit_usd ? parseFloat(config.daily_cost_limit_usd) : null,
                monthlyCostLimitUsd: config.monthly_cost_limit_usd ? parseFloat(config.monthly_cost_limit_usd) : null,
                retryStrategy: config.retry_strategy,
                maxRetries: config.max_retries,
                updatedAt: config.updated_at
            }
        });
    } catch (error) {
        console.error('Update agent config error:', error);
        res.status(500).json({ ok: false, error: 'Failed to update agent configuration' });
    }
});

export default router;
