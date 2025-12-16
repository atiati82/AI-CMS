import { Router } from 'express';
import { storage } from '../../storage';
import { requireAdmin } from '../middleware/auth';
import { insertScienceArticleSchema } from '@shared/schema';
import { createCrudHandler, createUpdateHandler, createDeleteHandler } from '../../route-helpers';

const router = Router();

// POST /api/admin/science-articles
router.post('/', requireAdmin, createCrudHandler(
    insertScienceArticleSchema, storage.createScienceArticle.bind(storage), 'Failed to create article'
));

// PUT /api/admin/science-articles/:id
router.put('/:id', requireAdmin, createUpdateHandler(
    storage.updateScienceArticle.bind(storage), 'Article not found', 'Failed to update article'
));

// DELETE /api/admin/science-articles/:id
router.delete('/:id', requireAdmin, createDeleteHandler(
    storage.deleteScienceArticle.bind(storage), 'Article not found', 'Failed to delete article'
));

export default router;
