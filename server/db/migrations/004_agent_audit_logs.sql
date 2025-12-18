
CREATE TABLE IF NOT EXISTS agent_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL, -- Correlates all steps in a single agent run
  agent_name VARCHAR(50) NOT NULL,
  action_type VARCHAR(50) NOT NULL, -- 'thinking', 'tool_use', 'function_call', 'response', 'error'
  content TEXT, -- Human readable summary or the thought process
  tool_name VARCHAR(100), -- If acton_type is tool_use
  tool_args JSONB, -- Arguments passed to the tool
  metadata JSONB, -- Token usage, latency, model used, cost
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_agent_audit_run_id ON agent_audit_logs(run_id);
CREATE INDEX idx_agent_audit_agent_name ON agent_audit_logs(agent_name);
CREATE INDEX idx_agent_audit_created_at ON agent_audit_logs(created_at DESC);
