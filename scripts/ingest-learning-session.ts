// Script to ingest the learning document into RAG
import 'dotenv/config';
import { ingestDocument } from '../server/services/knowledge-base';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    const docPath = path.join(process.cwd(), 'AI_LEARNING_SESSION_2025-12-17_UPGRADES.md');
    const content = fs.readFileSync(docPath, 'utf-8');

    console.log('Ingesting learning document into RAG...');

    const documentId = await ingestDocument({
        title: 'AI CMS Development Session - Dec 17, 2025 - BigMind Upgrades',
        content,
        source: 'development-session:2025-12-17-upgrades',
        type: 'document',
        metadata: {
            tags: ['learning', 'bigmind', 'multimodal', 'function-calling', 'ai-agents', 'phase1-upgrades'],
            sessionDate: '2025-12-17',
            topics: ['BigMind functions', 'multimodal AI', 'image understanding', 'visual config']
        }
    });

    console.log(`✅ Document ingested with ID: ${documentId}`);
    process.exit(0);
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
