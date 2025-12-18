/**
 * Embedding Service
 * 
 * Generates vector embeddings using Gemini's text-embedding-004 model
 * for semantic search in the RAG knowledge base.
 */

import { GoogleGenAI } from "@google/genai";

// Gemini client for embeddings
const geminiApiKey = process.env.GEMINI_API_KEY;
const client = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

// Embedding model configuration
const EMBEDDING_MODEL = 'text-embedding-004';
const EMBEDDING_DIMENSIONS = 768;

// Cache to avoid re-embedding identical text (in-memory for session)
const embeddingCache = new Map<string, number[]>();
const CACHE_MAX_SIZE = 1000;

export interface EmbeddingResult {
    embedding: number[];
    model: string;
    dimensions: number;
    cached: boolean;
}

/**
 * Generate embedding for a single text using Gemini text-embedding-004
 */
export async function generateEmbedding(text: string): Promise<EmbeddingResult> {
    if (!client) {
        throw new Error('Gemini API key not configured. Set GEMINI_API_KEY environment variable.');
    }

    // Normalize text for caching
    const normalizedText = text.trim().toLowerCase().slice(0, 10000); // Limit to ~10k chars
    const cacheKey = hashText(normalizedText);

    // Check cache first
    if (embeddingCache.has(cacheKey)) {
        return {
            embedding: embeddingCache.get(cacheKey)!,
            model: EMBEDDING_MODEL,
            dimensions: EMBEDDING_DIMENSIONS,
            cached: true
        };
    }

    try {
        // Use Gemini's embedding model
        const result = await client.models.embedContent({
            model: EMBEDDING_MODEL,
            contents: text,
            config: {
                outputDimensionality: EMBEDDING_DIMENSIONS
            }
        });

        const embedding = result.embeddings?.[0]?.values;

        if (!embedding || embedding.length === 0) {
            throw new Error('Empty embedding response from Gemini');
        }

        // Cache the result
        if (embeddingCache.size >= CACHE_MAX_SIZE) {
            // Clear oldest entries (simple approach - clear half the cache)
            const entries = Array.from(embeddingCache.keys());
            for (let i = 0; i < CACHE_MAX_SIZE / 2; i++) {
                embeddingCache.delete(entries[i]);
            }
        }
        embeddingCache.set(cacheKey, embedding);

        return {
            embedding,
            model: EMBEDDING_MODEL,
            dimensions: EMBEDDING_DIMENSIONS,
            cached: false
        };

    } catch (error: any) {
        console.error('[EmbeddingService] Failed to generate embedding:', error.message);
        throw error;
    }
}

/**
 * Generate embeddings for multiple texts (batched for efficiency)
 */
export async function generateEmbeddings(texts: string[]): Promise<EmbeddingResult[]> {
    const results: EmbeddingResult[] = [];

    // Process in batches of 10 to avoid rate limits
    const BATCH_SIZE = 10;

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
        const batch = texts.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(
            batch.map(text => generateEmbedding(text))
        );
        results.push(...batchResults);

        // Small delay between batches to respect rate limits
        if (i + BATCH_SIZE < texts.length) {
            await sleep(100);
        }
    }

    return results;
}

/**
 * Calculate cosine similarity between two embeddings
 */
export function cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
        throw new Error('Embedding dimensions must match');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
    return magnitude === 0 ? 0 : dotProduct / magnitude;
}

/**
 * Format embedding as PostgreSQL vector string
 */
export function toPgVector(embedding: number[]): string {
    return `[${embedding.join(',')}]`;
}

/**
 * Parse PostgreSQL vector string to number array
 */
export function fromPgVector(vectorStr: string): number[] {
    const cleaned = vectorStr.replace(/[\[\]]/g, '');
    return cleaned.split(',').map(Number);
}

/**
 * Get embedding dimension count
 */
export function getEmbeddingDimensions(): number {
    return EMBEDDING_DIMENSIONS;
}

/**
 * Check if embedding service is available
 */
export function isEmbeddingServiceAvailable(): boolean {
    return client !== null;
}

// Utility functions

function hashText(text: string): string {
    // Simple hash for caching
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
