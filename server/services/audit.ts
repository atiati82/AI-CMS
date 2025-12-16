import { db } from '../db';

/**
 * Audit System for AI CMS
 * Provides complete security trail for all critical actions
 */

export interface AuditEntry {
    id: string;
    timestamp: Date;
    actorType: 'user' | 'ai_agent' | 'system';
    actorId?: string;
    actorName?: string;
    entityType: string;
    entityId: string;
    action: string;
    changes?: Record<string, any>;
    source: 'admin_ui' | 'api' | 'ai_chat' | 'automation' | 'migration';
    traceId: string;
    conversationId?: string;
    ipAddress?: string;
    userAgent?: string;
}

export interface AuditContext {
    actorType: 'user' | 'ai_agent' | 'system';
    actorId?: string;
    actorName?: string;
    source: 'admin_ui' | 'api' | 'ai_chat' | 'automation' | 'migration';
    traceId: string;
    conversationId?: string;
    ipAddress?: string;
    userAgent?: string;
}

/**
 * Log an audit entry
 */
export async function logAudit(
    entityType: string,
    entityId: string,
    action: string,
    context: AuditContext,
    changes?: Record<string, any>
): Promise<void> {
    const entry: AuditEntry = {
        id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        entityType,
        entityId,
        action,
        changes,
        ...context
    };

    try {
        await db.query(`
      INSERT INTO audit_log (
        id, timestamp, actor_type, actor_id, actor_name,
        entity_type, entity_id, action, changes,
        source, trace_id, conversation_id, ip_address, user_agent
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `, [
            entry.id,
            entry.timestamp,
            entry.actorType,
            entry.actorId || null,
            entry.actorName || null,
            entry.entityType,
            entry.entityId,
            entry.action,
            entry.changes ? JSON.stringify(entry.changes) : null,
            entry.source,
            entry.traceId,
            entry.conversationId || null,
            entry.ipAddress || null,
            entry.userAgent || null
        ]);
    } catch (error) {
        console.error('Failed to log audit entry:', error);
        // Don't throw - audit logging should not break the application
    }
}

/**
 * Get recent audit entries
 */
export async function getRecentAudits(limit: number = 50): Promise<AuditEntry[]> {
    try {
        const result = await db.query(`
      SELECT * FROM audit_log
      ORDER BY timestamp DESC
      LIMIT $1
    `, [limit]);

        return result.rows.map(row => ({
            id: row.id,
            timestamp: row.timestamp,
            actorType: row.actor_type,
            actorId: row.actor_id,
            actorName: row.actor_name,
            entityType: row.entity_type,
            entityId: row.entity_id,
            action: row.action,
            changes: row.changes ? JSON.parse(row.changes) : undefined,
            source: row.source,
            traceId: row.trace_id,
            conversationId: row.conversation_id,
            ipAddress: row.ip_address,
            userAgent: row.user_agent
        })) as AuditEntry[];
    } catch (error) {
        console.error('Failed to get audit entries:', error);
        return [];
    }
}

/**
 * Get audit history for a specific entity
 */
export async function getEntityAudits(entityType: string, entityId: string): Promise<AuditEntry[]> {
    try {
        const result = await db.query(`
      SELECT * FROM audit_log
      WHERE entity_type = $1 AND entity_id = $2
      ORDER BY timestamp DESC
    `, [entityType, entityId]);

        return result.rows.map(row => ({
            id: row.id,
            timestamp: row.timestamp,
            actorType: row.actor_type,
            actorId: row.actor_id,
            actorName: row.actor_name,
            entityType: row.entity_type,
            entityId: row.entity_id,
            action: row.action,
            changes: row.changes ? JSON.parse(row.changes) : undefined,
            source: row.source,
            traceId: row.trace_id,
            conversationId: row.conversation_id,
            ipAddress: row.ip_address,
            userAgent: row.user_agent
        })) as AuditEntry[];
    } catch (error) {
        console.error('Failed to get entity audits:', error);
        return [];
    }
}

/**
 * Get all actions performed by an actor
 */
export async function getActorAudits(actorType: string, actorId: string): Promise<AuditEntry[]> {
    try {
        const result = await db.query(`
      SELECT * FROM audit_log
      WHERE actor_type = $1 AND actor_id = $2
      ORDER BY timestamp DESC
    `, [actorType, actorId]);

        return result.rows.map(row => ({
            id: row.id,
            timestamp: row.timestamp,
            actorType: row.actor_type,
            actorId: row.actor_id,
            actorName: row.actor_name,
            entityType: row.entity_type,
            entityId: row.entity_id,
            action: row.action,
            changes: row.changes ? JSON.parse(row.changes) : undefined,
            source: row.source,
            traceId: row.trace_id,
            conversationId: row.conversation_id,
            ipAddress: row.ip_address,
            userAgent: row.user_agent
        })) as AuditEntry[];
    } catch (error) {
        console.error('Failed to get actor audits:', error);
        return [];
    }
}
