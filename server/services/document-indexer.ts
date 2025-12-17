// Document Indexer Service
// Handles document chunking and indexing for search

import { storage } from '../storage';

export interface IndexResult {
    success: boolean;
    documentId: string;
    chunksCreated: number;
    status: string;
}

export async function indexDocument(documentId: string): Promise<IndexResult> {
    const document = await storage.getDocument(documentId);

    if (!document) {
        throw new Error('Document not found');
    }

    // Mark as processing
    await storage.updateDocument(documentId, { status: 'processing' });

    const text = document.cleanText || document.rawText || '';

    if (!text.trim()) {
        await storage.updateDocument(documentId, {
            status: 'failed',
            errorMessage: 'No text content to index'
        });
        throw new Error('No text content to index');
    }

    // Delete existing chunks
    await storage.deleteDocumentChunks(documentId);

    // Simple chunking - split by paragraphs, aiming for ~500 char chunks
    const paragraphs = text.split(/\n\n+/);
    const chunks: Array<{
        documentId: string;
        chunkIndex: number;
        content: string;
        wordCount: number;
    }> = [];

    let currentChunk = '';
    let chunkIndex = 0;

    for (const paragraph of paragraphs) {
        if ((currentChunk + paragraph).length > 500 && currentChunk.length > 0) {
            chunks.push({
                documentId,
                chunkIndex: chunkIndex++,
                content: currentChunk.trim(),
                wordCount: currentChunk.split(/\s+/).filter(Boolean).length
            });
            currentChunk = paragraph;
        } else {
            currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
        }
    }

    // Add remaining content
    if (currentChunk.trim()) {
        chunks.push({
            documentId,
            chunkIndex: chunkIndex++,
            content: currentChunk.trim(),
            wordCount: currentChunk.split(/\s+/).filter(Boolean).length
        });
    }

    // Create chunks in database
    if (chunks.length > 0) {
        await storage.bulkCreateDocumentChunks(chunks);
    }

    // Mark as indexed
    await storage.updateDocument(documentId, { status: 'indexed' });

    return {
        success: true,
        documentId,
        chunksCreated: chunks.length,
        status: 'indexed'
    };
}
