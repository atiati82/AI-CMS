-- Add metadata column for storing icon, role, rules, capability info
ALTER TABLE agent_configurations 
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS display_name VARCHAR(255);

-- Create index for metadata queries
CREATE INDEX IF NOT EXISTS idx_agent_config_metadata ON agent_configurations USING gin (metadata);

-- Add comment
COMMENT ON COLUMN agent_configurations.metadata IS 'Stores flexible agent configuration including icon, role, rules, and examples';
