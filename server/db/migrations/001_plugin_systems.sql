-- AI CMS Plugin System Database Schema
-- Created: 2025-12-17
-- Version: 1.0

-- ============================================================================
-- E-COMMERCE MODULE
-- ============================================================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  compare_price DECIMAL(10, 2),
  category VARCHAR(255),
  inventory INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  featured_image TEXT,
  images TEXT[], -- Array of image URLs
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(255) UNIQUE NOT NULL,
  customer_email VARCHAR(500) NOT NULL,
  customer_name VARCHAR(500),
  items JSONB NOT NULL, -- Array of {productId, quantity, price}
  shipping_address JSONB,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  shipping DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  paid_at TIMESTAMP,
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- Shopping carts table
CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(500) UNIQUE NOT NULL,
  items JSONB NOT NULL DEFAULT '[]', -- Array of {productId, quantity}
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_carts_session ON carts(session_id);
CREATE INDEX idx_carts_expires ON carts(expires_at);

-- ============================================================================
-- KNOWLEDGE BASE & RAG SYSTEM
-- ============================================================================

-- Knowledge base table (replaces bigmind_learning)
CREATE TABLE IF NOT EXISTS knowledge_base (
  id VARCHAR(500) PRIMARY KEY, -- UUID + chunk index
  data_type VARCHAR(100) NOT NULL CHECK (data_type IN ('document', 'page', 'url', 'text')),
  content JSONB NOT NULL, -- {title, chunk, chunkIndex, totalChunks, source, ...metadata}
  source VARCHAR(500) NOT NULL,
  processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_knowledge_type ON knowledge_base(data_type);
CREATE INDEX idx_knowledge_source ON knowledge_base(source);
CREATE INDEX idx_knowledge_processed ON knowledge_base(processed_at DESC);

-- Full-text search index for knowledge content
CREATE INDEX idx_knowledge_content_gin ON knowledge_base USING gin(to_tsvector('english', content::text));

-- ============================================================================
-- AI AGENT FRAMEWORK
-- ============================================================================

-- Agent tasks table
CREATE TABLE IF NOT EXISTS agent_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id VARCHAR(500) UNIQUE NOT NULL,
  agent_name VARCHAR(255) NOT NULL,
  task_type VARCHAR(255) NOT NULL,
  input JSONB NOT NULL,
  output JSONB,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'success', 'failed')),
  error TEXT,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  execution_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_agent_tasks_agent ON agent_tasks(agent_name);
CREATE INDEX idx_agent_tasks_status ON agent_tasks(status);
CREATE INDEX idx_agent_tasks_created ON agent_tasks(created_at DESC);

-- ============================================================================
-- BIGMIND AI CHAT SYSTEM
-- ============================================================================

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_type VARCHAR(100) DEFAULT 'general' CHECK (conversation_type IN ('general', 'page_edit', 'seo', 'content')),
  messages JSONB NOT NULL DEFAULT '[]', -- Array of {role, content, timestamp}
  context JSONB DEFAULT '{}', -- {currentPageId, recentActions, preferences, workflowState}
  user_id UUID, -- Future: link to users table
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_conversations_type ON conversations(conversation_type);
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_conversations_updated ON conversations(updated_at DESC);

-- ============================================================================
-- CHANGE MANAGEMENT SYSTEM (From earlier today)
-- ============================================================================

-- Version changesets table
CREATE TABLE IF NOT EXISTS version_changesets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  changeset_id VARCHAR(255) UNIQUE NOT NULL,
  feature_key VARCHAR(255) NOT NULL,
  module VARCHAR(255) NOT NULL,
  intent TEXT NOT NULL,
  diff_summary JSONB NOT NULL,
  ui_placement JSONB,
  api_changes JSONB,
  db_migrations JSONB,
  tests JSONB,
  risk_level VARCHAR(50) CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  rollback_plan JSONB,
  dependencies JSONB DEFAULT '[]',
  git_commits TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255)
);

CREATE INDEX idx_changesets_feature ON version_changesets(feature_key);
CREATE INDEX idx_changesets_module ON version_changesets(module);
CREATE INDEX idx_changesets_created ON version_changesets(created_at DESC);

-- RAG memory objects (lessons learned)
CREATE TABLE IF NOT EXISTS rag_memory_objects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  root_cause JSONB NOT NULL,
  fix_steps JSONB NOT NULL,
  prevention_rule JSONB NOT NULL,
  do_not_repeat_policy TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  severity VARCHAR(50) CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  context JSONB NOT NULL,
  examples JSONB,
  related_lessons TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_triggered TIMESTAMP,
  trigger_count INTEGER DEFAULT 0
);

CREATE INDEX idx_rag_lessons_tags ON rag_memory_objects USING gin(tags);
CREATE INDEX idx_rag_lessons_severity ON rag_memory_objects(severity);
CREATE INDEX idx_rag_lessons_created ON rag_memory_objects(created_at DESC);

-- ============================================================================
-- TRIGGERS FOR AUTO-UPDATED TIMESTAMPS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SEED DATA (Optional)
-- ============================================================================

-- Sample product
INSERT INTO products (name, slug, description, price, category, inventory, status)
VALUES (
  'Sample Product',
  'sample-product',
  'This is a sample product for testing',
  29.99,
  'wellness',
  100,
  'active'
) ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'products', 'orders', 'carts', 
  'knowledge_base', 'agent_tasks', 'conversations',
  'version_changesets', 'rag_memory_objects'
)
ORDER BY table_name;

-- Count records in each table
SELECT 
  'products' as table_name, COUNT(*) as count FROM products
UNION ALL SELECT 'orders', COUNT(*) FROM orders
UNION ALL SELECT 'carts', COUNT(*) FROM carts
UNION ALL SELECT 'knowledge_base', COUNT(*) FROM knowledge_base
UNION ALL SELECT 'agent_tasks', COUNT(*) FROM agent_tasks
UNION ALL SELECT 'conversations', COUNT(*) FROM conversations
UNION ALL SELECT 'version_changesets', COUNT(*) FROM version_changesets
UNION ALL SELECT 'rag_memory_objects', COUNT(*) FROM rag_memory_objects;
