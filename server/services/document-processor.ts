// Document Processor Service
// Handles document upload and text extraction

import { storage } from '../storage';

export interface ProcessedDocument {
    id: string;
    title: string;
    rawText: string;
    cleanText: string;
    wordCount: number;
}

export async function processUploadedDocument(
    file: Express.Multer.File,
    options: { title?: string } = {}
): Promise<ProcessedDocument> {
    const title = options.title || file.originalname.replace(/\.[^/.]+$/, '');

    // Extract text based on file type
    let rawText = '';

    if (file.mimetype === 'text/plain' || file.originalname.endsWith('.txt')) {
        rawText = file.buffer?.toString('utf-8') || '';
    } else if (file.mimetype === 'text/markdown' || file.originalname.endsWith('.md')) {
        rawText = file.buffer?.toString('utf-8') || '';
    } else if (file.mimetype === 'application/pdf' || file.originalname.endsWith('.pdf')) {
        try {
            // @ts-ignore - Handle CommonJS/ESM interop for pdf-parse
            const pdfModule = await import('pdf-parse');
            const pdfParser = pdfModule.default || pdfModule;
            const data = await pdfParser(file.buffer);
            rawText = data.text;
        } catch (error) {
            console.error('PDF parsing failed:', error);
            rawText = `Error extracting PDF content: ${error instanceof Error ? error.message : String(error)}`;
        }
    } else {
        // For other file types, just store the filename
        rawText = `Content from file: ${file.originalname}`;
    }

    const cleanText = rawText
        .replace(/\r\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    const wordCount = cleanText.split(/\s+/).filter(Boolean).length;

    const document = await storage.createDocument({
        title,
        sourceType: file.mimetype || 'unknown',
        rawText,
        cleanText,
        wordCount,
        status: 'uploaded',
        metadata: {
            originalFilename: file.originalname,
            fileSize: file.size,
            mimeType: file.mimetype,
            uploadedAt: new Date().toISOString()
        } as Record<string, any>
    });

    return {
        id: document.id,
        title: document.title,
        rawText: document.rawText || '',
        cleanText: document.cleanText || '',
        wordCount: document.wordCount || 0
    };
}
