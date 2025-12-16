import { Router } from 'express';
import { storage } from '../../storage';
import { requireAdmin } from '../middleware/auth';
import { insertProductSchema } from '@shared/schema';
import { createCrudHandler, createUpdateHandler, createDeleteHandler } from '../../route-helpers';

const router = Router();

// POST /api/admin/products
router.post('/', requireAdmin, createCrudHandler(
    insertProductSchema, storage.createProduct.bind(storage), 'Failed to create product'
));

// PUT /api/admin/products/:id
router.put('/:id', requireAdmin, createUpdateHandler(
    storage.updateProduct.bind(storage), 'Product not found', 'Failed to update product'
));

// DELETE /api/admin/products/:id
router.delete('/:id', requireAdmin, createDeleteHandler(
    storage.deleteProduct.bind(storage), 'Product not found', 'Failed to delete product'
));

export default router;
