import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

async function ingestCurrentSession() {
    try {
        const { ingestDocument } = await import('../server/services/knowledge-base');

        const filePath = path.join(process.cwd(), 'AI_LEARNING_SESSION_2025-12-17_PART2.md');
        const content = fs.readFileSync(filePath, 'utf-8');

        console.log('Ingesting current session learning document...');

        const result = await ingestDocument({
            title: 'AI Learning: Function Docs & RAG Indexing - 2025-12-17',
            content: content,
            source: 'learning-session',
            type: 'document',
            metadata: {
                specificType: 'learning',
                tags: ['function-documentation', 'rag-indexing', 'knowledge-base', 'ui-improvements'],
                sessionId: '46f2072f-4180-4f40-adf1-260eb7574152',
                date: '2025-12-17',
                part: 2
            }
        });

        console.log('Successfully ingested learning document:', result);
        process.exit(0);
    } catch (error) {
        console.error('Failed to ingest document:', error);
        process.exit(1);
    }
}

ingestCurrentSession();
