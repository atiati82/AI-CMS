-- Agent Metrics Table
-- Tracks performance metrics for every agent execution
CREATE TABLE IF NOT EXISTS agent_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name VARCHAR(100) NOT NULL,
  task_type VARCHAR(100),
  status VARCHAR(50) NOT NULL, -- 'success', 'error', 'timeout'
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  cost_usd DECIMAL(10, 6) DEFAULT 0,
  latency_ms INTEGER,
  error_message TEXT,
  user_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

CREATE INDEX IF NOT EXISTS idx_agent_metrics_agent ON agent_metrics(agent_name);
CREATE INDEX IF NOT EXISTS idx_agent_metrics_created ON agent_metrics(created_at);
CREATE INDEX IF NOT EXISTS idx_agent_metrics_status ON agent_metrics(status);
CREATE INDEX IF NOT EXISTS idx_agent_metrics_user ON agent_metrics(user_id);

-- Agent Configurations Table
-- Stores configuration for each agent
CREATE TABLE IF NOT EXISTS agent_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name VARCHAR(100) UNIQUE NOT NULL,
  system_prompt TEXT,
  job_protocol TEXT,
  enabled BOOLEAN DEFAULT true,
  
  -- Performance settings
  max_tokens INTEGER DEFAULT 2000,
  temperature DECIMAL(3, 2) DEFAULT 0.7,
  top_p DECIMAL(3, 2) DEFAULT 1.0,
  timeout_ms INTEGER DEFAULT 30000,
  
  -- Cost controls
  daily_cost_limit_usd DECIMAL(10, 2),
  monthly_cost_limit_usd DECIMAL(10, 2),
  
  -- Retry strategy
  retry_strategy VARCHAR(50) DEFAULT 'exponential',
  max_retries INTEGER DEFAULT 3,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- Agent Audit Log Table
-- Complete audit trail of all agent operations
CREATE TABLE IF NOT EXISTS agent_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name VARCHAR(100) NOT NULL,
  action VARCHAR(100) NOT NULL, -- 'execute', 'config_update', 'enable', 'disable'
  user_id UUID,
  user_email VARCHAR(255),
  details JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_agent ON agent_audit_log(agent_name);
CREATE INDEX IF NOT EXISTS idx_audit_created ON agent_audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_user ON agent_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON agent_audit_log(action);

-- Insert default configurations for existing agents
INSERT INTO agent_configurations (agent_name, system_prompt, job_protocol, enabled)
VALUES 
  ('content', 'You are a content generation specialist. Create high-quality, engaging content that aligns with the Andara Ionic brand voice - mystical yet scientific, elegant and educational.', '1. Analyze request context\n2. Generate content matching tone and style\n3. Validate output quality\n4. Return structured result', true),
  ('seo', 'You are an SEO optimization specialist. Analyze content for search engine optimization, suggest improvements, and calculate SEO scores based on best practices.', '1. Extract page metadata\n2. Calculate SEO score\n3. Identify issues\n4. Suggest improvements', true),
  ('design', 'You are a visual design specialist. Create color palettes, suggest layouts, and provide motion design recommendations that align with modern, premium aesthetics.', '1. Analyze design requirements\n2. Generate color palette\n3. Suggest layout structure\n4. Provide motion specs', true),
  ('devops', 'You are a DevOps specialist. Monitor system health, check performance metrics, generate alerts, and perform auto-healing operations when issues are detected.', '1. Check system health\n2. Monitor performance metrics\n3. Generate alerts if needed\n4. Auto-heal if possible', true),
  ('orchestrator', 'You are the orchestrator. Analyze complex requests, break them down into subtasks, and delegate to the appropriate specialized agents (content, SEO, design, devops).', '1. Parse user request\n2. Identify required agents\n3. Delegate subtasks\n4. Aggregate results', true)
ON CONFLICT (agent_name) DO NOTHING;
