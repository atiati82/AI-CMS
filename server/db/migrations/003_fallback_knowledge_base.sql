-- Fallback for environments without pgvector
-- Creates knowledge_base table without vector column to prevent app crashes

CREATE TABLE IF NOT EXISTS knowledge_base (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL,
    content JSONB,
    searchable_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for source lookups
CREATE INDEX IF NOT EXISTS knowledge_base_source_idx ON knowledge_base(source);

-- Full text search index (standard postgres)
CREATE INDEX IF NOT EXISTS knowledge_base_fts_idx 
ON knowledge_base 
USING gin(to_tsvector('english', COALESCE(searchable_text, '')));
