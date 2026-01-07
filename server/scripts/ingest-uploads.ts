
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

import { storage } from '../storage';
import { processUploadedDocument } from '../services/document-processor';
import { indexDocument } from '../services/document-indexer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function ingestUploads() {
    try {
        const uploadsDir = path.resolve(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            console.error('❌ Uploads directory not found:', uploadsDir);
            process.exit(1);
        }

        const files = fs.readdirSync(uploadsDir);
        console.log(`📂 Found ${files.length} files in ${uploadsDir}`);

        for (const file of files) {
            const filePath = path.join(uploadsDir, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) continue;

            const ext = path.extname(file).toLowerCase();
            if (!['.pdf', '.txt', '.md'].includes(ext)) {
                console.log(`⚠️ Skipping unsupported file type: ${file}`);
                continue;
            }

            console.log(`\n📄 Processing: ${file} (${stats.size} bytes)`);

            try {
                const fileBuffer = fs.readFileSync(filePath);

                let mimetype = 'application/octet-stream';
                if (ext === '.pdf') mimetype = 'application/pdf';
                else if (ext === '.txt') mimetype = 'text/plain';
                else if (ext === '.md') mimetype = 'text/markdown';

                // Mock Multer file object
                const mockFile: Express.Multer.File = {
                    fieldname: 'file',
                    originalname: file,
                    encoding: '7bit',
                    mimetype: mimetype,
                    buffer: fileBuffer,
                    size: stats.size,
                    destination: uploadsDir,
                    filename: file,
                    path: filePath,
                    stream: null as any
                };

                // 1. Process (Extract text & create document record)
                console.log('   ↳ Extracting text...');
                const processedDoc = await processUploadedDocument(mockFile);
                console.log(`   ✅ Document Created: "${processedDoc.title}" (ID: ${processedDoc.id})`);
                console.log(`   📝 Word Count: ${processedDoc.wordCount}`);

                // 2. Index (Chunk & Embed)
                console.log('   ↳ Indexing for RAG...');
                const indexedDoc = await indexDocument(processedDoc.id);
                console.log(`   ✅ Indexing Complete! Created ${indexedDoc.chunksCreated} chunks.`);

            } catch (err) {
                console.error(`   ❌ Failed to process ${file}:`, err);
            }
        }

        console.log('\n🎉 Ingestion complete!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Fatal error during ingestion:', error);
        process.exit(1);
    }
}

ingestUploads();
