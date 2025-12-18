-- SEO Optimization System Tables Migration
-- This migration adds tables for the SEO optimization and recommendation engine

-- Page Metrics Table
CREATE TABLE IF NOT EXISTS page_metrics (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id VARCHAR NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  calculated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  -- Content Quality Metrics
  has_h1 BOOLEAN DEFAULT FALSE,
  h2_count INTEGER DEFAULT 0,
  has_faq_block BOOLEAN DEFAULT FALSE,
  has_proof_block BOOLEAN DEFAULT FALSE,
  has_glossary BOOLEAN DEFAULT FALSE,
  word_count INTEGER DEFAULT 0,
  
  -- Link Metrics
  internal_links_out INTEGER DEFAULT 0,
  internal_links_in INTEGER DEFAULT 0,
  is_orphan BOOLEAN DEFAULT FALSE,
  
  -- Freshness
  days_since_update INTEGER DEFAULT 0,
  is_stale BOOLEAN DEFAULT FALSE,
  
  -- Schema
  has_schema BOOLEAN DEFAULT FALSE,
  
  -- Computed Scores
  priority_score INTEGER DEFAULT 0,
  business_weight INTEGER DEFAULT 0,
  freshness_weight INTEGER DEFAULT 0,
  gap_weight INTEGER DEFAULT 0,
  link_weight INTEGER DEFAULT 0,
  cluster_balance_weight INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_page_metrics_page_id ON page_metrics(page_id);
CREATE INDEX IF NOT EXISTS idx_page_metrics_priority_score ON page_metrics(priority_score DESC);

-- Page Recommendations Table
CREATE TABLE IF NOT EXISTS page_recommendations (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id VARCHAR NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  recommended_date TIMESTAMP NOT NULL DEFAULT NOW(),
  
  why_selected JSONB DEFAULT '[]'::jsonb,
  tasks JSONB DEFAULT '[]'::jsonb,
  impact_estimate TEXT NOT NULL DEFAULT 'medium',
  
  dynamic_boxes JSONB DEFAULT '[]'::jsonb,
  internal_links_out JSONB DEFAULT '[]'::jsonb,
  internal_links_in_needed JSONB DEFAULT '[]'::jsonb,
  
  upgrade_plan JSONB,
  
  status TEXT NOT NULL DEFAULT 'pending',
  completed_at TIMESTAMP,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_recommendations_page_id ON page_recommendations(page_id);
CREATE INDEX IF NOT EXISTS idx_page_recommendations_date ON page_recommendations(recommended_date DESC);
CREATE INDEX IF NOT EXISTS idx_page_recommendations_status ON page_recommendations(status);

-- Optimization History Table
CREATE TABLE IF NOT EXISTS optimization_history (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id VARCHAR NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  recommendation_id VARCHAR REFERENCES page_recommendations(id) ON DELETE SET NULL,
  
  change_type TEXT NOT NULL,
  change_summary TEXT NOT NULL,
  
  score_before INTEGER,
  score_after INTEGER,
  
  applied_by VARCHAR REFERENCES admin_users(id) ON DELETE SET NULL,
  applied_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_optimization_history_page_id ON optimization_history(page_id);
CREATE INDEX IF NOT EXISTS idx_optimization_history_applied_at ON optimization_history(applied_at DESC);

-- Cluster Optimization Log Table
CREATE TABLE IF NOT EXISTS cluster_optimization_log (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_key TEXT NOT NULL,
  optimized_date TIMESTAMP NOT NULL DEFAULT NOW(),
  page_id VARCHAR REFERENCES pages(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cluster_optimization_log_cluster ON cluster_optimization_log(cluster_key);
CREATE INDEX IF NOT EXISTS idx_cluster_optimization_log_date ON cluster_optimization_log(optimized_date DESC);

-- Cron Jobs Table
CREATE TABLE IF NOT EXISTS cron_jobs (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  schedule TEXT NOT NULL,
  handler TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  last_run_at TIMESTAMP,
  next_run_at TIMESTAMP,
  run_count INTEGER NOT NULL DEFAULT 0,
  failure_count INTEGER NOT NULL DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cron_jobs_status ON cron_jobs(status);
CREATE INDEX IF NOT EXISTS idx_cron_jobs_next_run ON cron_jobs(next_run_at);

-- Cron Job Logs Table
CREATE TABLE IF NOT EXISTS cron_job_logs (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id VARCHAR NOT NULL REFERENCES cron_jobs(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'running',
  started_at TIMESTAMP NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP,
  duration_ms INTEGER,
  output TEXT,
  error_message TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_cron_job_logs_job_id ON cron_job_logs(job_id);
CREATE INDEX IF NOT EXISTS idx_cron_job_logs_started_at ON cron_job_logs(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_cron_job_logs_status ON cron_job_logs(status);

-- Add SEO optimization fields to pages table
ALTER TABLE pages ADD COLUMN IF NOT EXISTS primary_goal TEXT;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS search_intent TEXT;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS primary_kw TEXT;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS secondary_kws JSONB DEFAULT '[]'::jsonb;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS schema_type TEXT;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS content_status TEXT DEFAULT 'draft';
ALTER TABLE pages ADD COLUMN IF NOT EXISTS refresh_interval_days INTEGER DEFAULT 60;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS internal_links_out_target INTEGER DEFAULT 6;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS internal_links_in_target INTEGER DEFAULT 3;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS firewall_class TEXT;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS proof_assets JSONB DEFAULT '[]'::jsonb;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS component_blocks JSONB DEFAULT '[]'::jsonb;

-- Insert default cron job for daily SEO recommendations
INSERT INTO cron_jobs (name, description, schedule, handler, status)
VALUES (
  'daily-seo-recommendations',
  'Generate daily SEO page recommendations based on priority scoring',
  '0 6 * * *',
  'generateDailyRecommendations',
  'active'
)
ON CONFLICT (name) DO NOTHING;

-- Success message
SELECT 'SEO Optimization tables created successfully!' AS message;
