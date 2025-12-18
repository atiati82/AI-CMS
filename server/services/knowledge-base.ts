import { pool as db } from '../db';
import { v4 as uuidv4 } from 'uuid';
import { ContentZone, inferDocumentZone, classifyByCluster } from './content-firewall';

// ============================================================================
// TEXT CHUNKING
// ============================================================================

function splitIntoChunks(text: string, maxLength: number = 1000): string[] {
    const sentences = text.split(/[.!?]\s+/);
    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
        if (currentChunk.length + sentence.length + 1 > maxLength && currentChunk) {
            chunks.push(currentChunk.trim());
            currentChunk = sentence;
        } else {
            currentChunk += (currentChunk ? '. ' : '') + sentence;
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }

    return chunks.length ? chunks : [text];
}

// ============================================================================
// DOCUMENT INGESTION (WITH ZONE SUPPORT)
// ============================================================================

export async function ingestDocument(doc: {
    title: string;
    content: string;
    source: string;
    type?: string;
    zone?: ContentZone;
    clusters?: string[];
    isInternal?: boolean; // Mark as internal-only (not for public retrieval)
    metadata?: Record<string, any>;
}): Promise<string> {
    const documentId = uuidv4();
    const chunks = splitIntoChunks(doc.content);

    // Infer zone if not provided
    const zone = doc.zone || inferDocumentZone(doc.source, doc.content);

    // Insert each chunk
    for (let i = 0; i < chunks.length; i++) {
        const chunkId = `${documentId}-${i}`;

        await db.query(`
      INSERT INTO knowledge_base (id, data_type, content, source)
      VALUES ($1, $2, $3, $4)
    `, [
            chunkId,
            doc.type || 'document',
            JSON.stringify({
                title: doc.title,
                chunk: chunks[i],
                chunkIndex: i,
                totalChunks: chunks.length,
                source: doc.source,
                zone: zone,
                clusters: doc.clusters || [],
                isInternal: doc.isInternal || false,
                ...doc.metadata
            }),
            doc.source
        ]);
    }

    return documentId;
}

// ============================================================================
// ZONE-FILTERED SEARCH
// ============================================================================

export async function searchKnowledgeByZone(
    query: string,
    zone: ContentZone,
    options: {
        limit?: number;
        includeInternal?: boolean;
    } = {}
): Promise<any[]> {
    const { limit = 5, includeInternal = false } = options;

    // Simple keyword-based search
    const keywords = query.toLowerCase().split(' ').filter(k => k.length >= 3);

    if (keywords.length === 0) {
        return [];
    }

    // Fetch documents - filter by zone in application layer for JSONB
    const result = await db.query(
        'SELECT * FROM knowledge_base ORDER BY processed_at DESC LIMIT 200'
    );

    // Score and filter by zone
    const scored = result.rows
        .filter((row: any) => {
            const docZone = row.content?.zone;
            const isInternal = row.content?.isInternal;

            // Skip internal docs unless explicitly requested
            if (isInternal && !includeInternal) return false;

            // Match zone (or include if no zone set)
            return !docZone || docZone === zone;
        })
        .map((row: any) => {
            const contentStr = JSON.stringify(row.content).toLowerCase();
            let score = 0;

            for (const keyword of keywords) {
                const matches = contentStr.split(keyword).length - 1;
                score += matches;
            }

            return {
                ...row,
                score
            };
        });

    // Sort by score and return top results
    return scored
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => ({
            id: item.id,
            title: item.content.title,
            content: item.content.chunk,
            zone: item.content.zone,
            score: item.score,
            source: item.source
        }));
}

// ============================================================================
// ORIGINAL SEARCH (BACKWARD COMPATIBLE)
// ============================================================================

export async function searchKnowledge(query: string, limit: number = 5): Promise<any[]> {
    // Simple keyword-based search
    const keywords = query.toLowerCase().split(' ').filter(k => k.length >= 3);

    if (keywords.length === 0) {
        return [];
    }

    // Fetch recent documents (last 100)
    const result = await db.query(
        'SELECT * FROM knowledge_base ORDER BY processed_at DESC LIMIT 100'
    );

    // Score each document by keyword frequency
    const scored = result.rows.map((row: any) => {
        const contentStr = JSON.stringify(row.content).toLowerCase();
        let score = 0;

        for (const keyword of keywords) {
            const matches = contentStr.split(keyword).length - 1;
            score += matches;
        }

        return {
            ...row,
            score
        };
    });

    // Sort by score and return top results
    return scored
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => ({
            id: item.id,
            title: item.content.title,
            content: item.content.chunk,
            zone: item.content.zone,
            score: item.score,
            source: item.source
        }));
}

// ============================================================================
// INGEST ALL PAGES (WITH ZONE DETECTION)
// ============================================================================

export async function ingestAllPages(): Promise<number> {
    // Fetch all published pages with cluster info
    const result = await db.query(`
    SELECT id, title, path, summary, content, cluster_key
    FROM pages
    WHERE status = 'published'
  `);

    let count = 0;

    for (const page of result.rows) {
        // Strip HTML tags
        const cleanContent = (page.content || '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (!cleanContent) continue;

        // Combine title, summary, and content
        const fullText = [
            page.title,
            page.summary || '',
            cleanContent
        ].filter(Boolean).join('\n\n');

        // Determine zone from cluster
        const zone = page.cluster_key
            ? classifyByCluster(page.cluster_key)
            : inferDocumentZone(`page:${page.path}`, fullText);

        await ingestDocument({
            title: page.title,
            content: fullText,
            source: `page:${page.path}`,
            type: 'page',
            zone: zone,
            clusters: page.cluster_key ? [page.cluster_key] : [],
            metadata: {
                pageId: page.id,
                path: page.path
            }
        });

        count++;
    }

    return count;
}

// ============================================================================
// INGEST INTERNAL DOCUMENT (FOR SYSTEM KNOWLEDGE)
// ============================================================================

export async function ingestInternalDocument(doc: {
    title: string;
    content: string;
    source: string;
    type?: string;
    metadata?: Record<string, any>;
}): Promise<string> {
    return ingestDocument({
        ...doc,
        isInternal: true,
        zone: 'science' // Internal docs default to science zone
    });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export async function getAllKnowledge(limit: number = 50): Promise<any[]> {
    const result = await db.query(
        'SELECT * FROM knowledge_base ORDER BY processed_at DESC LIMIT $1',
        [limit]
    );

    return result.rows.map(row => ({
        id: row.id,
        dataType: row.data_type,
        content: row.content,
        zone: row.content?.zone,
        source: row.source,
        processedAt: row.processed_at
    }));
}

export async function deleteKnowledge(id: string): Promise<boolean> {
    const result = await db.query(
        'DELETE FROM knowledge_base WHERE id = $1',
        [id]
    );

    return result.rowCount! > 0;
}

// ============================================================================
// GET KNOWLEDGE BY ZONE (FOR CONTEXT BUILDING)
// ============================================================================

export async function getKnowledgeByZone(zone: ContentZone, limit: number = 20): Promise<any[]> {
    const result = await db.query(
        'SELECT * FROM knowledge_base ORDER BY processed_at DESC LIMIT 500'
    );

    return result.rows
        .filter((row: any) => row.content?.zone === zone)
        .slice(0, limit)
        .map(row => ({
            id: row.id,
            title: row.content.title,
            content: row.content.chunk,
            zone: row.content.zone,
            source: row.source
        }));
}

