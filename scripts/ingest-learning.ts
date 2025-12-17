import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

async function main() {
    try {
        // Dynamic import to ensure env vars are loaded first
        const { ingestDocument } = await import('../server/services/knowledge-base');

        const filePath = path.resolve(process.cwd(), 'AI_LEARNING_SESSION_2025-12-17.md');
        const content = fs.readFileSync(filePath, 'utf-8');

        console.log('Ingesting document...');

        const documentId = await ingestDocument({
            title: 'AI Agent Learning: Restoring AI Agents Tab - 2025-12-17',
            content: content,
            source: 'learning-session',
            type: 'document',
            metadata: {
                specificType: 'learning',
                tags: ['learning', 'ai-agents', 'routing', 'problem-solving'],
                sessionId: '46f2072f-4180-4f40-adf1-260eb7574152',
                date: '2025-12-17'
            }
        });

        console.log(`Successfully ingested document with ID: ${documentId}`);
        process.exit(0);
    } catch (error) {
        console.error('Failed to ingest document:', error);
        process.exit(1);
    }
}

main();
