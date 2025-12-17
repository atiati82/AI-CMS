/**
 * Direct knowledge base ingestion script
 * Bypasses API auth by using database directly
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment
dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

function splitIntoChunks(content: string, chunkSize: number = 1500): string[] {
    const chunks: string[] = [];
    const sections = content.split(/(?=^#{1,3}\s)/m);

    let currentChunk = '';

    for (const section of sections) {
        if (currentChunk.length + section.length > chunkSize && currentChunk.length > 0) {
            chunks.push(currentChunk.trim());
            currentChunk = section;
        } else {
            currentChunk += section;
        }
    }

    if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
    }

    return chunks.length > 0 ? chunks : [content];
}

async function ingestApiDocs() {
    const docPath = path.join(__dirname, '../docs/API_ROUTING_DOCUMENTATION.md');
    const content = fs.readFileSync(docPath, 'utf-8');

    const documentId = uuidv4();
    const chunks = splitIntoChunks(content);

    console.log(`📄 Document: API Routing Documentation`);
    console.log(`🔢 Split into ${chunks.length} chunks`);

    try {
        // First, delete any existing API documentation
        await pool.query(`DELETE FROM knowledge_base WHERE source = 'system-documentation'`);
        console.log('🗑️  Cleared previous API documentation');

        // Insert each chunk
        for (let i = 0; i < chunks.length; i++) {
            const chunkId = `${documentId}-${i}`;

            await pool.query(`
        INSERT INTO knowledge_base (id, data_type, content, source)
        VALUES ($1, $2, $3, $4)
      `, [
                chunkId,
                'document',
                JSON.stringify({
                    title: 'Andara AI CMS - Complete API Routing Documentation',
                    chunk: chunks[i],
                    chunkIndex: i,
                    totalChunks: chunks.length,
                    source: 'system-documentation',
                    category: 'api-documentation',
                    totalEndpoints: 80,
                    version: '1.0',
                    tags: ['api', 'routes', 'endpoints', 'bigmind', 'agents', 'seo', 'knowledge-base']
                }),
                'system-documentation'
            ]);

            console.log(`  ✓ Chunk ${i + 1}/${chunks.length} inserted`);
        }

        console.log(`\n✅ Successfully ingested API documentation into knowledge base`);
        console.log(`   Document ID: ${documentId}`);
        console.log(`   Total chunks: ${chunks.length}`);

        // Verify insertion
        const result = await pool.query(
            `SELECT COUNT(*) as count FROM knowledge_base WHERE source = 'system-documentation'`
        );
        console.log(`   Verified: ${result.rows[0].count} chunks in database`);

    } catch (error) {
        console.error('❌ Failed to ingest:', error);
    } finally {
        await pool.end();
    }
}

ingestApiDocs();
