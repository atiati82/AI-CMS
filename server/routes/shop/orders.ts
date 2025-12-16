import { Router } from 'express';
import { db } from '../../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/shop/orders
router.get('/', requireAdmin, async (req, res) => {
    try {
        const { status, limit } = req.query;

        let query = 'SELECT * FROM orders WHERE 1=1';
        const params: any[] = [];
        let paramIndex = 1;

        if (status) {
            query += ` AND status = $${paramIndex++}`;
            params.push(status);
        }

        query += ' ORDER BY created_at DESC';

        if (limit) {
            query += ` LIMIT $${paramIndex}`;
            params.push(parseInt(limit as string));
        }

        const result = await db.query(query, params);

        res.json({
            ok: true,
            orders: result.rows,
            count: result.rows.length
        });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch orders' });
    }
});

// GET /api/shop/orders/:id
router.get('/:id', requireAdmin, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, error: 'Order not found' });
        }

        res.json({
            ok: true,
            order: result.rows[0]
        });
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch order' });
    }
});

// POST /api/shop/orders
router.post('/', async (req, res) => {
    try {
        const { customerEmail, customerName, items, shippingAddress } = req.body;

        if (!customerEmail || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ ok: false, error: 'Missing required fields' });
        }

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        // Calculate totals
        const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
        const total = subtotal + tax + shipping;

        const result = await db.query(`
      INSERT INTO orders (
        order_number, customer_email, customer_name, items,
        shipping_address, subtotal, tax, shipping, total, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [
            orderNumber,
            customerEmail,
            customerName || null,
            JSON.stringify(items),
            shippingAddress ? JSON.stringify(shippingAddress) : null,
            subtotal.toFixed(2),
            tax.toFixed(2),
            shipping.toFixed(2),
            total.toFixed(2),
            'pending'
        ]);

        res.json({
            ok: true,
            order: result.rows[0]
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ ok: false, error: 'Failed to create order' });
    }
});

// PATCH /api/shop/orders/:id/status
router.patch('/:id/status', requireAdmin, async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ ok: false, error: 'Status is required' });
        }

        // Determine which timestamp to update
        let timestampField = null;
        if (status === 'paid') timestampField = 'paid_at';
        if (status === 'shipped') timestampField = 'shipped_at';
        if (status === 'delivered') timestampField = 'delivered_at';

        const query = timestampField
            ? `UPDATE orders SET status = $1, ${timestampField} = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`
            : `UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`;

        const result = await db.query(query, [status, req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, error: 'Order not found' });
        }

        res.json({
            ok: true,
            order: result.rows[0]
        });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ ok: false, error: 'Failed to update order status' });
    }
});

export default router;
