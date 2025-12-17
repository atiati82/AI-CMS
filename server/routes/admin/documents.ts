import { Router } from 'express';
import { storage } from '../../storage';
import { requireAdmin } from '../middleware/auth';
import { insertDocumentSchema } from '@shared/schema';
import { createCrudHandler, createUpdateHandler, createDeleteHandler } from '../../route-helpers';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// GET /api/admin/documents
router.get('/', requireAdmin, async (req, res) => {
    try {
        const { status, search, limit } = req.query;

        if (search) {
            const documents = await storage.searchDocuments(
                search as string,
                limit ? parseInt(limit as string) : undefined
            );
            return res.json(documents);
        }

        if (status) {
            const documents = await storage.getDocumentsByStatus(status as string);
            return res.json(documents);
        }

        const documents = await storage.getAllDocuments();
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
});

// GET /api/admin/documents/:id
router.get('/:id', requireAdmin, async (req, res) => {
    try {
        const document = await storage.getDocument(req.params.id);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.json(document);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch document' });
    }
});

// GET /api/admin/documents/:id/chunks
router.get('/:id/chunks', requireAdmin, async (req, res) => {
    try {
        const chunks = await storage.getDocumentChunks(req.params.id);
        res.json(chunks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chunks' });
    }
});

// POST /api/admin/documents
router.post('/', requireAdmin, createCrudHandler(
    insertDocumentSchema, storage.createDocument.bind(storage), 'Failed to create document'
));

// PUT /api/admin/documents/:id
router.put('/:id', requireAdmin, createUpdateHandler(
    storage.updateDocument.bind(storage), 'Document not found', 'Failed to update document'
));

// DELETE /api/admin/documents/:id
router.delete('/:id', requireAdmin, createDeleteHandler(
    storage.deleteDocument.bind(storage), 'Document not found', 'Failed to delete document'
));

// POST /api/admin/documents/:id/chunks
router.post('/:id/chunks', requireAdmin, async (req, res) => {
    try {
        const { chunks } = req.body;
        if (!Array.isArray(chunks)) {
            return res.status(400).json({ error: 'chunks must be an array' });
        }

        const documentId = req.params.id;
        const chunksWithDocId = chunks.map((chunk: any, index: number) => ({
            ...chunk,
            documentId,
            chunkIndex: chunk.chunkIndex ?? index
        }));
        const createdChunks = await storage.bulkCreateDocumentChunks(chunksWithDocId);
        res.json(createdChunks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create chunks' });
    }
});

// DELETE /api/admin/documents/:id/chunks
router.delete('/:id/chunks', requireAdmin, async (req, res) => {
    try {
        await storage.deleteDocumentChunks(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete chunks' });
    }
});

// POST /api/admin/documents/upload
router.post('/upload', requireAdmin, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { processUploadedDocument } = await import('../../services/document-processor');
        const result = await processUploadedDocument(req.file, req.body);

        res.json(result);
    } catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({ error: 'Failed to process document' });
    }
});

// POST /api/admin/documents/:id/index
router.post('/:id/index', requireAdmin, async (req, res) => {
    try {
        const { indexDocument } = await import('../../services/document-indexer');
        const result = await indexDocument(req.params.id);

        res.json(result);
    } catch (error) {
        console.error('Document indexing error:', error);
        res.status(500).json({ error: 'Failed to index document' });
    }
});

export default router;
