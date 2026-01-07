
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { ingestDocument } from '../server/services/knowledge-base';
import { pool } from '../server/db';

async function main() {
    console.log('🧠 Ingesting NotebookLM Content into RAG Knowledge Base...\n');

    const rootDir = path.resolve(process.cwd(), '..'); // Look in parent directory

    const artifacts = [
        {
            file: 'NOTEBOOK_SOURCE_SUMMARIES.md',
            title: 'NotebookLM Source Summaries',
            source: 'notebooklm:source-summaries',
            type: 'research',
            zone: 'science',
            description: 'Comprehensive key takeaways and summaries from the 65 indexed sources.'
        },
        {
            file: 'NOTEBOOK_CHAT_ARCHIVE.md',
            title: 'NotebookLM Chat Intelligence',
            source: 'notebooklm:chat-archive',
            type: 'research',
            zone: 'science',
            description: 'Master Data Export and logic pillars derived from the project chat history.'
        },
        {
            file: '.gemini/antigravity/brain/2a789a65-dbd8-4e9f-a417-600451f9866c/source_inventory.md',
            title: 'NotebookLM Source Inventory',
            source: 'notebooklm:inventory',
            type: 'inventory',
            zone: 'science',
            description: 'Complete checklist of the 65 original files (PDFs, Videos, Links).'
        }
    ];

    try {
        for (const artifact of artifacts) {
            // Handle absolute or relative paths
            let filePath = artifact.file;
            if (!path.isAbsolute(filePath)) {
                // If it starts with .gemini, assume absolute from home? No, user provided relative in prompt but file view showed absolute.
                // Let's try to resolve it from the known locations.
                if (filePath.includes('.gemini')) {
                    filePath = path.join('/Users/atti', filePath);
                } else {
                    filePath = path.join(rootDir, filePath);
                }
            }

            console.log(`📄 processing ${artifact.title} (${path.basename(filePath)})...`);

            try {
                const content = await fs.readFile(filePath, 'utf-8');

                const id = await ingestDocument({
                    title: artifact.title,
                    content: content,
                    source: artifact.source,
                    type: artifact.type,
                    zone: artifact.zone as any,
                    metadata: {
                        imported: new Date().toISOString(),
                        description: artifact.description,
                        tags: ['notebooklm', 'migration', 'science', 'research']
                    }
                });
                console.log(`   ✅ Ingested successfully! ID: ${id}`);
            } catch (err) {
                console.error(`   ❌ Failed to read/ingest ${filePath}:`, err.message);
            }
        }

        console.log('\n✨ All NotebookLM content has been added to the Knowledge Base.');
        console.log('   You can now view these documents in the Admin > Knowledge UI.');

    } catch (error) {
        console.error('❌ Script failed:', error);
    } finally {
        await pool.end();
    }
}

main();
