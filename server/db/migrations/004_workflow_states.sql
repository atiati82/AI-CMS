-- Workflow State Machine Tables
-- Run this migration to enable workflow persistence

-- Workflow state storage table
CREATE TABLE IF NOT EXISTS workflow_states (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    state_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Index for querying by status
CREATE INDEX IF NOT EXISTS idx_workflow_status ON workflow_states(status);
CREATE INDEX IF NOT EXISTS idx_workflow_created ON workflow_states(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_workflow_name ON workflow_states(name);

-- Workflow execution history (for analytics)
CREATE TABLE IF NOT EXISTS workflow_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID REFERENCES workflow_states(id),
    step_name VARCHAR(255) NOT NULL,
    step_index INTEGER NOT NULL,
    agent_name VARCHAR(100) NOT NULL,
    task_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    input JSONB,
    output JSONB,
    error TEXT,
    latency_ms INTEGER,
    started_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP
);

-- Index for workflow execution analysis
CREATE INDEX IF NOT EXISTS idx_execution_workflow ON workflow_executions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_execution_agent ON workflow_executions(agent_name);
CREATE INDEX IF NOT EXISTS idx_execution_status ON workflow_executions(status);

-- View for workflow analytics
CREATE OR REPLACE VIEW workflow_analytics AS
SELECT 
    ws.name as workflow_name,
    ws.status as workflow_status,
    COUNT(DISTINCT ws.id) as total_runs,
    COUNT(CASE WHEN ws.status = 'completed' THEN 1 END) as completed_count,
    COUNT(CASE WHEN ws.status = 'failed' THEN 1 END) as failed_count,
    AVG(EXTRACT(EPOCH FROM (ws.completed_at - ws.created_at)) * 1000)::integer as avg_duration_ms
FROM workflow_states ws
GROUP BY ws.name, ws.status;

-- Comment on tables
COMMENT ON TABLE workflow_states IS 'Stores workflow state machine data for persistence and resume';
COMMENT ON TABLE workflow_executions IS 'Detailed execution history for each workflow step';
