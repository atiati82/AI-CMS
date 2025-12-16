import { Router } from 'express';
import { db } from '../../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/shop/products
router.get('/', async (req, res) => {
    try {
        const { status, category, limit } = req.query;

        let query = 'SELECT * FROM shop_products WHERE 1=1';
        const params: any[] = [];
        let paramIndex = 1;

        if (status) {
            query += ` AND status = $${paramIndex++}`;
            params.push(status);
        }
        if (category) {
            query += ` AND category = $${paramIndex++}`;
            params.push(category);
        }

        query += ' ORDER BY created_at DESC';

        if (limit) {
            query += ` LIMIT $${paramIndex}`;
            params.push(parseInt(limit as string));
        }

        const result = await db.query(query, params);

        res.json({
            ok: true,
            products: result.rows,
            count: result.rows.length
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch products' });
    }
});

// GET /api/shop/products/:id
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM shop_products WHERE id = $1', [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, error: 'Product not found' });
        }

        res.json({
            ok: true,
            product: result.rows[0]
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch product' });
    }
});

// POST /api/shop/products (Admin only)
router.post('/', requireAdmin, async (req, res) => {
    try {
        const {
            name, slug, description, price, comparePrice,
            category, inventory, status, featuredImage, images
        } = req.body;

        const result = await db.query(`
      INSERT INTO shop_products (
        name, slug, description, price, compare_price,
        category, inventory, status, featured_image, images
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [
            name, slug, description || null, price, comparePrice || null,
            category || null, inventory || 0, status || 'draft',
            featuredImage || null, images || []
        ]);

        res.json({
            ok: true,
            product: result.rows[0]
        });
    } catch (error: any) {
        console.error('Create product error:', error);
        if (error.code === '23505') { // Unique violation
            return res.status(400).json({ ok: false, error: 'Product slug already exists' });
        }
        res.status(500).json({ ok: false, error: 'Failed to create product' });
    }
});

// PATCH /api/shop/products/:id (Admin only)
router.patch('/:id', requireAdmin, async (req, res) => {
    try {
        const updates: string[] = [];
        const values: any[] = [];
        let paramIndex = 1;

        const allowedFields = [
            'name', 'slug', 'description', 'price', 'compare_price',
            'category', 'inventory', 'status', 'featured_image', 'images'
        ];

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates.push(`${field} = $${paramIndex++}`);
                values.push(req.body[field]);
            }
        }

        if (updates.length === 0) {
            return res.status(400).json({ ok: false, error: 'No fields to update' });
        }

        values.push(req.params.id);

        const result = await db.query(`
      UPDATE shop_products
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramIndex}
      RETURNING *
    `, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, error: 'Product not found' });
        }

        res.json({
            ok: true,
            product: result.rows[0]
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ ok: false, error: 'Failed to update product' });
    }
});

// DELETE /api/shop/products/:id (Admin only)
router.delete('/:id', requireAdmin, async (req, res) => {
    try {
        const result = await db.query('DELETE FROM shop_products WHERE id = $1 RETURNING id', [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, error: 'Product not found' });
        }

        res.json({
            ok: true,
            deleted: true
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ ok: false, error: 'Failed to delete product' });
    }
});

export default router;
