/**
 * Semantic Search Service
 * 
 * Enhanced knowledge base search using pgvector embeddings.
 * Works alongside the existing keyword-based search in knowledge-base.ts
 */

import { pool as db } from '../db';
import { generateEmbedding, toPgVector, isEmbeddingServiceAvailable, cosineSimilarity } from './embedding';
import { ContentZone } from './content-firewall';

// ============================================================================
// PGVECTOR AVAILABILITY CHECK
// ============================================================================

let pgvectorAvailable: boolean | null = null;

async function checkPgvectorAvailable(): Promise<boolean> {
    if (pgvectorAvailable !== null) return pgvectorAvailable;

    try {
        await db.query('SELECT 1 FROM pg_extension WHERE extname = $1', ['vector']);
        const result = await db.query(
            "SELECT column_name FROM information_schema.columns WHERE table_name = 'knowledge_base' AND column_name = 'embedding'"
        );
        pgvectorAvailable = result.rows.length > 0;
    } catch {
        pgvectorAvailable = false;
    }

    console.log(`[SemanticSearch] pgvector available: ${pgvectorAvailable}`);
    return pgvectorAvailable;
}

// ============================================================================
// SEMANTIC SEARCH
// ============================================================================

export interface SemanticSearchResult {
    id: string;
    title: string;
    content: string;
    zone?: ContentZone;
    source: string;
    similarity: number;
    searchType: 'semantic' | 'keyword' | 'hybrid';
}

/**
 * Perform semantic similarity search using vector embeddings.
 * Falls back to keyword search if pgvector is not available.
 */
export async function semanticSearch(
    query: string,
    options: {
        limit?: number;
        threshold?: number;
        zone?: ContentZone;
        includeInternal?: boolean;
    } = {}
): Promise<SemanticSearchResult[]> {
    const { limit = 5, threshold = 0.5, zone, includeInternal = false } = options;

    // Check if semantic search is available
    const canUseVector = await checkPgvectorAvailable() && isEmbeddingServiceAvailable();

    if (!canUseVector) {
        console.log('[SemanticSearch] Falling back to keyword search');
        return keywordSearchFallback(query, limit, zone);
    }

    try {
        // Generate query embedding
        const { embedding } = await generateEmbedding(query);
        const vectorStr = toPgVector(embedding);

        // Use the semantic_search SQL function
        const result = await db.query(`
            SELECT 
                id,
                content,
                source,
                1 - (embedding <=> $1::vector) as similarity
            FROM knowledge_base
            WHERE embedding IS NOT NULL
            AND 1 - (embedding <=> $1::vector) > $2
            ORDER BY embedding <=> $1::vector
            LIMIT $3
        `, [vectorStr, threshold, limit * 2]);

        // Filter and map results
        const results: SemanticSearchResult[] = result.rows
            .filter((row: any) => {
                const docZone = row.content?.zone;
                const isInternal = row.content?.isInternal;

                if (isInternal && !includeInternal) return false;
                if (zone && docZone && docZone !== zone) return false;
                return true;
            })
            .slice(0, limit)
            .map((row: any) => ({
                id: row.id,
                title: row.content?.title || 'Untitled',
                content: row.content?.chunk || JSON.stringify(row.content),
                zone: row.content?.zone,
                source: row.source,
                similarity: parseFloat(row.similarity) || 0,
                searchType: 'semantic' as const
            }));

        console.log(`[SemanticSearch] Found ${results.length} results for "${query.slice(0, 50)}..."`);
        return results;

    } catch (error: any) {
        console.error('[SemanticSearch] Vector search failed:', error.message);
        return keywordSearchFallback(query, limit, zone);
    }
}

/**
 * Perform hybrid search combining semantic and keyword matching.
 */
export async function hybridSearch(
    query: string,
    options: {
        limit?: number;
        semanticWeight?: number;
        zone?: ContentZone;
    } = {}
): Promise<SemanticSearchResult[]> {
    const { limit = 5, semanticWeight = 0.7, zone } = options;

    const canUseVector = await checkPgvectorAvailable() && isEmbeddingServiceAvailable();

    if (!canUseVector) {
        return keywordSearchFallback(query, limit, zone);
    }

    try {
        // Get both semantic and keyword results
        const [semanticResults, keywordResults] = await Promise.all([
            semanticSearch(query, { limit: limit * 2, zone }),
            keywordSearchFallback(query, limit * 2, zone)
        ]);

        // Merge and re-rank results
        const merged = new Map<string, SemanticSearchResult>();

        for (const result of semanticResults) {
            merged.set(result.id, {
                ...result,
                similarity: result.similarity * semanticWeight,
                searchType: 'hybrid'
            });
        }

        for (const result of keywordResults) {
            const existing = merged.get(result.id);
            if (existing) {
                existing.similarity += result.similarity * (1 - semanticWeight);
            } else {
                merged.set(result.id, {
                    ...result,
                    similarity: result.similarity * (1 - semanticWeight),
                    searchType: 'hybrid'
                });
            }
        }

        return Array.from(merged.values())
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, limit);

    } catch (error) {
        console.error('[HybridSearch] Failed:', error);
        return keywordSearchFallback(query, limit, zone);
    }
}

// ============================================================================
// EMBEDDING GENERATION FOR EXISTING DOCUMENTS
// ============================================================================

/**
 * Generate embeddings for documents that don't have them yet.
 * Should be run as a background task or migration.
 */
export async function generateMissingEmbeddings(batchSize: number = 50): Promise<number> {
    if (!isEmbeddingServiceAvailable()) {
        console.warn('[SemanticSearch] Embedding service not available');
        return 0;
    }

    const canUseVector = await checkPgvectorAvailable();
    if (!canUseVector) {
        console.warn('[SemanticSearch] pgvector not available');
        return 0;
    }

    // Find documents without embeddings
    const result = await db.query(`
        SELECT id, content, source
        FROM knowledge_base
        WHERE embedding IS NULL
        LIMIT $1
    `, [batchSize]);

    if (result.rows.length === 0) {
        console.log('[SemanticSearch] No documents need embeddings');
        return 0;
    }

    console.log(`[SemanticSearch] Generating embeddings for ${result.rows.length} documents`);

    let updated = 0;
    for (const row of result.rows) {
        try {
            // Extract text content for embedding
            const textContent = typeof row.content === 'object'
                ? [row.content.title, row.content.chunk].filter(Boolean).join(' ')
                : String(row.content);

            if (!textContent || textContent.length < 10) continue;

            const { embedding } = await generateEmbedding(textContent);
            const vectorStr = toPgVector(embedding);

            await db.query(`
                UPDATE knowledge_base
                SET embedding = $1::vector,
                    searchable_text = $2
                WHERE id = $3
            `, [vectorStr, textContent, row.id]);

            updated++;
        } catch (error: any) {
            console.error(`[SemanticSearch] Failed to embed ${row.id}:`, error.message);
        }
    }

    console.log(`[SemanticSearch] Generated embeddings for ${updated} documents`);
    return updated;
}

// ============================================================================
// FALLBACK KEYWORD SEARCH
// ============================================================================

async function keywordSearchFallback(
    query: string,
    limit: number,
    zone?: ContentZone
): Promise<SemanticSearchResult[]> {
    const keywords = query.toLowerCase().split(' ').filter(k => k.length >= 3);

    if (keywords.length === 0) {
        return [];
    }

    const result = await db.query(
        'SELECT * FROM knowledge_base ORDER BY processed_at DESC LIMIT 200'
    );

    const scored = result.rows
        .filter((row: any) => {
            const docZone = row.content?.zone;
            if (zone && docZone && docZone !== zone) return false;
            return true;
        })
        .map((row: any) => {
            const contentStr = JSON.stringify(row.content).toLowerCase();
            let score = 0;

            for (const keyword of keywords) {
                const matches = contentStr.split(keyword).length - 1;
                score += matches;
            }

            // Normalize score to 0-1 range (rough approximation)
            const normalizedScore = Math.min(score / 10, 1);

            return {
                id: row.id,
                title: row.content?.title || 'Untitled',
                content: row.content?.chunk || '',
                zone: row.content?.zone,
                source: row.source,
                similarity: normalizedScore,
                searchType: 'keyword' as const
            };
        })
        .filter(item => item.similarity > 0)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit);

    return scored;
}

// ============================================================================
// INGEST WITH EMBEDDING
// ============================================================================

/**
 * Ingest a document with automatic embedding generation.
 */
export async function ingestWithEmbedding(doc: {
    id: string;
    content: string;
    title?: string;
    source: string;
    zone?: ContentZone;
}): Promise<boolean> {
    const canUseVector = await checkPgvectorAvailable() && isEmbeddingServiceAvailable();

    if (!canUseVector) {
        return false;
    }

    try {
        const textForEmbedding = [doc.title, doc.content].filter(Boolean).join(' ');
        const { embedding } = await generateEmbedding(textForEmbedding);
        const vectorStr = toPgVector(embedding);

        await db.query(`
            UPDATE knowledge_base
            SET embedding = $1::vector,
                searchable_text = $2
            WHERE id = $3
        `, [vectorStr, textForEmbedding, doc.id]);

        return true;
    } catch (error) {
        console.error('[SemanticSearch] Failed to add embedding:', error);
        return false;
    }
}
