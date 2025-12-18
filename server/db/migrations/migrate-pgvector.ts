/**
 * pgvector Migration Script
 * 
 * Run this script to set up pgvector and generate embeddings for existing documents.
 * 
 * Usage: npx tsx server/db/migrations/migrate-pgvector.ts
 */

import { pool as db } from '../../db';
import { generateMissingEmbeddings } from '../../services/semantic-search';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
    console.log('🚀 Starting pgvector migration...\n');

    try {
        // Step 1: Run the SQL migration
        console.log('📦 Step 1: Running SQL migration...');
        const sqlPath = path.join(__dirname, '003_pgvector_embeddings.sql');
        const sql = fs.readFileSync(sqlPath, 'utf-8');

        // Split by semicolon and run each statement
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0 && !s.startsWith('--'));

        for (const statement of statements) {
            try {
                await db.query(statement);
                console.log('  ✓', statement.slice(0, 60) + '...');
            } catch (err: any) {
                // Some statements may fail if extension not available
                console.log('  ⚠', statement.slice(0, 60) + '...', err.message.slice(0, 50));
            }
        }

        console.log('\n📦 Step 2: Checking pgvector availability...');
        const extCheck = await db.query(
            "SELECT * FROM pg_extension WHERE extname = 'vector'"
        );

        if (extCheck.rows.length === 0) {
            console.log('⚠️  pgvector extension not installed.');
            console.log('   To install, run: CREATE EXTENSION vector;');
            console.log('   (Requires superuser or cloud SQL admin permissions)\n');
            console.log('   Semantic search will fall back to keyword matching.\n');
            return;
        }

        console.log('  ✓ pgvector extension is available\n');

        // Step 3: Generate embeddings for existing documents
        console.log('📦 Step 3: Generating embeddings for existing documents...');

        let totalGenerated = 0;
        let batchCount = 0;
        const BATCH_SIZE = 50;

        while (true) {
            const generated = await generateMissingEmbeddings(BATCH_SIZE);
            totalGenerated += generated;
            batchCount++;

            if (generated < BATCH_SIZE) break;
            if (batchCount > 20) {
                console.log('   (Stopping after 20 batches, run again for more)');
                break;
            }

            console.log(`   Batch ${batchCount}: ${generated} embeddings generated`);
        }

        console.log(`\n✅ Migration complete!`);
        console.log(`   Total embeddings generated: ${totalGenerated}`);

        // Report stats
        const stats = await db.query(`
            SELECT 
                COUNT(*) as total,
                COUNT(embedding) as with_embedding
            FROM knowledge_base
        `);

        const { total, with_embedding } = stats.rows[0];
        console.log(`\n📊 Knowledge Base Stats:`);
        console.log(`   Total documents: ${total}`);
        console.log(`   With embeddings: ${with_embedding} (${Math.round(with_embedding / total * 100)}%)`);

    } catch (error: any) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    } finally {
        await db.end();
    }
}

// Run if called directly
// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    runMigration().then(() => process.exit(0));
}

export { runMigration };
