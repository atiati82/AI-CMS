// Script to ingest the Admin UI & Functions learning document into RAG
import 'dotenv/config';
import { ingestDocument } from '../server/services/knowledge-base';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    const docPath = path.join(process.cwd(), 'AI_LEARNING_ADMIN_UI_AND_FUNCTIONS.md');
    const content = fs.readFileSync(docPath, 'utf-8');

    console.log('Ingesting learning document into RAG...');

    const documentId = await ingestDocument({
        title: 'AI CMS Dev Session - Admin UI & 17 BigMind Functions',
        content,
        source: 'development-session:admin-ui-functions',
        type: 'document',
        metadata: {
            tags: ['learning', 'admin-ui', 'bigmind', 'notifications', 'typescript', 'ab-testing'],
            sessionDate: new Date().toISOString().split('T')[0],
            topics: ['Admin Header', 'Notifications', 'Schema Markup', 'Translation', 'Multi-Agent']
        }
    });

    console.log(`✅ Document ingested with ID: ${documentId}`);
    process.exit(0);
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
