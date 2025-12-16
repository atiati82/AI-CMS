import { Router } from 'express';
import { storage } from '../../storage';

const router = Router();

// GET /api/products
router.get('/', async (req, res) => {
    try {
        const products = await storage.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
    try {
        const product = await storage.getProductBySlug(req.params.slug);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

export default router;
