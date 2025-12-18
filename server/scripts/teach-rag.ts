
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { storage } from '../storage';
import { processUploadedDocument } from '../services/document-processor';
import { indexDocument } from '../services/document-indexer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function techRag() {
    try {
        console.log('📚 Starting Knowledge Base Ingestion for CHANGE_MANAGEMENT_SYSTEM.md...');

        const filePath = path.resolve(process.cwd(), 'CHANGE_MANAGEMENT_SYSTEM.md');
        if (!fs.existsSync(filePath)) {
            console.error('❌ File not found:', filePath);
            process.exit(1);
        }

        const stats = fs.statSync(filePath);
        const fileBuffer = fs.readFileSync(filePath);

        // Mock Multer file object
        const mockFile: Express.Multer.File = {
            fieldname: 'file',
            originalname: 'CHANGE_MANAGEMENT_SYSTEM.md',
            encoding: '7bit',
            mimetype: 'text/markdown',
            buffer: fileBuffer,
            size: stats.size,
            destination: '',
            filename: '',
            path: '',
            stream: null as any
        };

        console.log(`📄 Processing file: ${mockFile.originalname} (${mockFile.size} bytes)`);

        // 1. Process (Extract text & create document record)
        const processedDoc = await processUploadedDocument(mockFile, { title: 'AI CMS Change Management System' });
        console.log(`✅ Document Created: ${processedDoc.title} (ID: ${processedDoc.id})`);
        console.log(`📝 Word Count: ${processedDoc.wordCount}`);

        // 2. Index (Chunk & Embed)
        console.log('🧠 Indexing document for RAG...');
        const indexedDoc = await indexDocument(processedDoc.id);
        console.log(`✅ Indexing Complete! Created ${indexedDoc.chunkCount} chunks.`);

    } catch (error) {
        console.error('❌ Error during ingestion:', error);
    }
}

techRag();
