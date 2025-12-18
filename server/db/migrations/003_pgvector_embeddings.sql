-- pgvector Extension and Knowledge Base Vector Support
-- Run this migration to enable semantic vector search

-- Enable pgvector extension (requires superuser or cloud SQL admin)
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column to knowledge_base table
-- Using 768 dimensions for Gemini text-embedding-004
ALTER TABLE knowledge_base 
ADD COLUMN IF NOT EXISTS embedding vector(768);

-- Create index for fast similarity search using HNSW (Hierarchical Navigable Small World)
-- HNSW provides better query performance than IVFFlat for most use cases
CREATE INDEX IF NOT EXISTS knowledge_base_embedding_idx 
ON knowledge_base 
USING hnsw (embedding vector_cosine_ops);

-- Add searchable text column for hybrid search (vector + keyword)
ALTER TABLE knowledge_base 
ADD COLUMN IF NOT EXISTS searchable_text TEXT;

-- Create GIN index for full-text search (hybrid approach)
CREATE INDEX IF NOT EXISTS knowledge_base_fts_idx 
ON knowledge_base 
USING gin(to_tsvector('english', COALESCE(searchable_text, '')));

-- Function to perform semantic similarity search
CREATE OR REPLACE FUNCTION semantic_search(
    query_embedding vector(768),
    match_threshold float DEFAULT 0.7,
    match_count int DEFAULT 5
)
RETURNS TABLE (
    id text,
    content jsonb,
    source text,
    similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        kb.id,
        kb.content,
        kb.source,
        1 - (kb.embedding <=> query_embedding) as similarity
    FROM knowledge_base kb
    WHERE kb.embedding IS NOT NULL
    AND 1 - (kb.embedding <=> query_embedding) > match_threshold
    ORDER BY kb.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- Function for hybrid search (combines vector similarity with keyword matching)
CREATE OR REPLACE FUNCTION hybrid_search(
    query_embedding vector(768),
    query_text text,
    match_threshold float DEFAULT 0.5,
    match_count int DEFAULT 10,
    semantic_weight float DEFAULT 0.7
)
RETURNS TABLE (
    id text,
    content jsonb,
    source text,
    semantic_score float,
    keyword_score float,
    combined_score float
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        kb.id,
        kb.content,
        kb.source,
        CASE 
            WHEN kb.embedding IS NOT NULL 
            THEN 1 - (kb.embedding <=> query_embedding) 
            ELSE 0 
        END as semantic_score,
        CASE 
            WHEN kb.searchable_text IS NOT NULL 
            THEN ts_rank(to_tsvector('english', kb.searchable_text), plainto_tsquery('english', query_text))
            ELSE 0 
        END as keyword_score,
        (
            semantic_weight * COALESCE(1 - (kb.embedding <=> query_embedding), 0) +
            (1 - semantic_weight) * COALESCE(ts_rank(to_tsvector('english', kb.searchable_text), plainto_tsquery('english', query_text)), 0)
        ) as combined_score
    FROM knowledge_base kb
    WHERE 
        (kb.embedding IS NOT NULL AND 1 - (kb.embedding <=> query_embedding) > match_threshold)
        OR
        (kb.searchable_text IS NOT NULL AND to_tsvector('english', kb.searchable_text) @@ plainto_tsquery('english', query_text))
    ORDER BY combined_score DESC
    LIMIT match_count;
END;
$$;

-- Add comment explaining the schema
COMMENT ON COLUMN knowledge_base.embedding IS 'Vector embedding from Gemini text-embedding-004 (768 dimensions)';
COMMENT ON COLUMN knowledge_base.searchable_text IS 'Concatenated searchable text for hybrid search';
