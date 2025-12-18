import * as dotenv from 'dotenv';
dotenv.config();

async function indexAllDocuments() {
    try {
        const { storage } = await import('../server/storage');
        const { indexDocument } = await import('../server/services/document-indexer');

        console.log('Fetching all documents...');
        const documents = await storage.getAllDocuments();

        console.log(`Total documents: ${documents.length}`);

        // Find documents that need indexing
        const needsIndexing = documents.filter(doc =>
            doc.status !== 'indexed' || doc.chunkCount === 0
        );

        console.log(`Documents needing indexing: ${needsIndexing.length}`);

        if (needsIndexing.length === 0) {
            console.log('All documents are already indexed!');
            process.exit(0);
        }

        let successCount = 0;
        let failCount = 0;

        for (const doc of needsIndexing) {
            console.log(`\n[${successCount + failCount + 1}/${needsIndexing.length}] Indexing: ${doc.title}`);
            try {
                const result = await indexDocument(doc.id);
                console.log(`✓ Success: ${result.chunksCreated} chunks created`);
                successCount++;
            } catch (error) {
                console.error(`✗ Failed:`, error instanceof Error ? error.message : error);
                failCount++;
            }
        }

        console.log(`\n=== Indexing Complete ===`);
        console.log(`Success: ${successCount}`);
        console.log(`Failed: ${failCount}`);
        console.log(`Total: ${needsIndexing.length}`);

        process.exit(failCount > 0 ? 1 : 0);
    } catch (error) {
        console.error('Script failed:', error);
        process.exit(1);
    }
}

indexAllDocuments();
