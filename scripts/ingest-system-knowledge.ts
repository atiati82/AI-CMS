
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { ingestDocument } from '../server/services/knowledge-base';
import { pool } from '../server/db';

const KNOWLEDGE_ROOT = '/Users/atti/.gemini/antigravity/knowledge';

async function scanDirectory(dir: string): Promise<string[]> {
    let results: string[] = [];
    const list = fs.readdirSync(dir);

    for (const file of list) {
        const filePath = path.resolve(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            results = results.concat(await scanDirectory(filePath));
        } else if (file.endsWith('.md')) {
            results.push(filePath);
        }
    }
    return results;
}

async function main() {
    console.log(`🔍 Scanning knowledge items in ${KNOWLEDGE_ROOT}...`);

    if (!fs.existsSync(KNOWLEDGE_ROOT)) {
        console.error(`❌ Knowledge root not found: ${KNOWLEDGE_ROOT}`);
        process.exit(1);
    }

    const files = await scanDirectory(KNOWLEDGE_ROOT);
    console.log(`Found ${files.length} markdown artifacts.`);

    let successCount = 0;
    let errorCount = 0;

    for (const filePath of files) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const relativePath = path.relative(KNOWLEDGE_ROOT, filePath);

            // Extract title from filename or first line #
            const filename = path.basename(filePath, '.md');
            const firstLine = content.split('\n')[0];
            const title = firstLine.startsWith('# ')
                ? firstLine.substring(2)
                : filename.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

            const parts = relativePath.split('/');
            const kiName = parts[0];
            const artifactType = parts.includes('artifacts') ? 'artifact' : 'metadata';

            console.log(`📄 Ingesting: ${title} (${kiName})...`);

            await ingestDocument({
                title: title,
                content: content,
                source: `system_knowledge:${kiName}:${filename}`,
                type: 'document',
                isInternal: true,
                clusters: ['system-architecture', kiName],
                metadata: {
                    filePath: relativePath,
                    kiName,
                    artifactType
                }
            });

            successCount++;
        } catch (error) {
            console.error(`❌ Failed to ingest ${filePath}:`, error);
            errorCount++;
        }
    }

    console.log(`\n✅ Ingestion Complete!`);
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);

    // Close DB pool to allow script to exit
    await pool.end();
}

main().catch(console.error);
