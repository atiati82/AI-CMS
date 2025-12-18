import { db } from '../server/db.js';
import { documents, documentChunks } from '../shared/schema.js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { eq } from 'drizzle-orm';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { indexDocument } from '../server/services/document-indexer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Ingest Design System Knowledge into RAG
 * 
 * This script ingests all Andara design system documentation
 * into the knowledge base (documents table) for AI agent learning.
 */

const DESIGN_DOCS = [
    {
        path: 'ANDARA_DESIGN_SYSTEM.md',
        title: 'Andara Design System - Complete Reference',
        tags: ['design', 'mineral-network', 'living-field', 'visual-interpreter']
    },
    {
        path: 'ANDARA_IONIC_V1_CSS.md',
        title: 'Andara Ionic 1.0 CSS - Tree Theming System',
        tags: ['css', 'tree-theming', 'components', 'tokens']
    },
    {
        path: 'client/src/styles/andara-ionic-v1.css',
        title: 'Andara Ionic 1.0 CSS - Source Code',
        tags: ['css', 'source-code', 'tree-theming']
    },
    {
        path: 'ANDARA_123_PAGE_LIBRARY.md',
        title: 'Andara 123-Page Library - Visual & Motion Specifications',
        tags: ['pages', 'visual-specs', 'motion', 'components']
    },
    {
        path: 'ANDARA_SITEMAP_V1_3.md',
        title: 'Andara Sitemap v1.3 - Complete Motion & Visual Specifications',
        tags: ['sitemap', 'clusters', 'motion', 'priorities']
    },
    {
        path: 'ANDARA_PAGE_SPEC_TEMPLATE.md',
        title: 'Andara Page Specification Template',
        tags: ['template', 'page-specs', 'visual-description', 'motion']
    },
    {
        path: 'server/agents/visual-interpreter.ts',
        title: 'Visual Interpreter Agent - Source Code',
        tags: ['agent', 'visual-interpreter', 'color-worlds', 'living-field']
    }
];

async function ingestDesignKnowledge() {
    console.log('🎨 Ingesting Andara Design System Knowledge...\n');

    const projectRoot = join(__dirname, '..');
    let successCount = 0;
    let errorCount = 0;

    for (const doc of DESIGN_DOCS) {
        try {
            const filePath = join(projectRoot, doc.path);
            console.log(`📄 Reading: ${doc.path}`);

            const content = readFileSync(filePath, 'utf-8');

            // Check if document already exists
            const existing = await db.select().from(documents).where(eq(documents.title, doc.title)).limit(1);
            const docRecord = existing[0];

            let docId: string;

            if (docRecord) {
                console.log(`   ⚠️  Already exists, updating content...`);
                await db
                    .update(documents)
                    .set({
                        rawText: content,
                        cleanText: content,
                        tags: doc.tags,
                        metadata: {
                            ...docRecord.metadata as Record<string, any>,
                            filePath: doc.path,
                            ingestedAt: new Date().toISOString(),
                            version: '1.0',
                            category: 'design-system'
                        },
                        status: 'pending', // Reset status to trigger re-indexing
                        updatedAt: new Date()
                    })
                    .where(eq(documents.id, docRecord.id));
                docId = docRecord.id;
            } else {
                console.log(`   ✅ Inserting new document...`);
                const [inserted] = await db.insert(documents).values({
                    title: doc.title,
                    rawText: content,
                    cleanText: content,
                    sourceType: 'upload',
                    tags: doc.tags,
                    status: 'pending',
                    metadata: {
                        filePath: doc.path,
                        ingestedAt: new Date().toISOString(),
                        version: '1.0',
                        category: 'design-system'
                    }
                }).returning({ id: documents.id });
                docId = inserted.id;
            }

            console.log(`   🧠 Indexing document (ID: ${docId})...`);
            await indexDocument(docId);
            console.log(`   ✅ Success (${content.length} characters)\n`);
            successCount++;

        } catch (error: any) {
            console.error(`   ❌ Error: ${error.message}\n`);
            errorCount++;
        }
    }

    console.log('═══════════════════════════════════════');
    console.log(`✅ Successfully ingested: ${successCount} documents`);
    if (errorCount > 0) {
        console.log(`❌ Failed: ${errorCount} documents`);
    }
    console.log('═══════════════════════════════════════\n');
}

// Run ingestion
ingestDesignKnowledge()
    .then(() => {
        console.log('\n✅ Design knowledge ingestion complete!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Ingestion failed:', error);
        process.exit(1);
    });
