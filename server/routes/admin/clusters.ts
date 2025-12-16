import { Router } from 'express';
import { storage } from '../../storage';
import { requireAdmin } from '../middleware/auth';
import { insertClusterSchema } from '@shared/schema';
import { createCrudHandler, createUpdateHandler, createDeleteHandler } from '../../route-helpers';

const router = Router();

// POST /api/admin/clusters
router.post('/', requireAdmin, createCrudHandler(
    insertClusterSchema, storage.createCluster.bind(storage), 'Failed to create cluster'
));

// PUT /api/admin/clusters/:id
router.put('/:id', requireAdmin, createUpdateHandler(
    storage.updateCluster.bind(storage), 'Cluster not found', 'Failed to update cluster'
));

// DELETE /api/admin/clusters/:id
router.delete('/:id', requireAdmin, createDeleteHandler(
    storage.deleteCluster.bind(storage), 'Cluster not found', 'Failed to delete cluster'
));

export default router;
