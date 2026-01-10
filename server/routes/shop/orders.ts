import { Router } from 'express';
import { db } from '../../db';
import { requireAdmin } from '../middleware/auth';
import shippingCalculator from '../../lib/shipping-calculator';

const router = Router();

// GET /api/shop/orders (Admin)
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

// GET /api/shop/orders/stats (Admin)
router.get('/stats', requireAdmin, async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                COUNT(*) as total_orders,
                COUNT(*) FILTER (WHERE status = 'pending') as pending_orders,
                COUNT(*) FILTER (WHERE status = 'paid') as paid_orders,
                COUNT(*) FILTER (WHERE status = 'shipped') as shipped_orders,
                COALESCE(SUM(total) FILTER (WHERE status NOT IN ('cancelled', 'refunded')), 0) as total_revenue
            FROM orders
        `);

        const stats = result.rows[0];

        res.json({
            ok: true,
            totalOrders: parseInt(stats.total_orders),
            pendingOrders: parseInt(stats.pending_orders),
            paidOrders: parseInt(stats.paid_orders),
            shippedOrders: parseInt(stats.shipped_orders),
            totalRevenue: parseInt(stats.total_revenue)
        });
    } catch (error) {
        console.error('Get order stats error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch order stats' });
    }
});

// GET /api/shop/orders/track - Public order tracking
router.post('/track', async (req, res) => {
    try {
        const { orderNumber, email } = req.body;

        if (!orderNumber || !email) {
            return res.status(400).json({ ok: false, error: 'Order number and email required' });
        }

        const result = await db.query(
            `SELECT order_number, status, shipping, cod_fee, total, currency,
                    shipping_address, tracking_number, tracking_url,
                    payment_method, shipping_region,
                    created_at, paid_at, shipped_at, delivered_at
             FROM orders 
             WHERE order_number = $1 AND customer_email = $2`,
            [orderNumber, email.toLowerCase()]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, error: 'Order not found' });
        }

        const order = result.rows[0];

        res.json({
            ok: true,
            order: {
                orderNumber: order.order_number,
                status: order.status,
                total: order.total,
                currency: order.currency,
                paymentMethod: order.payment_method,
                shippingRegion: order.shipping_region,
                shippingAddress: order.shipping_address,
                trackingNumber: order.tracking_number,
                trackingUrl: order.tracking_url,
                createdAt: order.created_at,
                paidAt: order.paid_at,
                shippedAt: order.shipped_at,
                deliveredAt: order.delivered_at
            }
        });
    } catch (error) {
        console.error('Track order error:', error);
        res.status(500).json({ ok: false, error: 'Failed to track order' });
    }
});

// GET /api/shop/orders/:id (Admin)
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

// POST /api/shop/orders - Create new order (Public)
router.post('/', async (req, res) => {
    try {
        const {
            customerEmail,
            customerName,
            customerPhone,
            items,
            shippingAddress,
            paymentMethod = 'cod'
        } = req.body;

        if (!customerEmail || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ ok: false, error: 'Missing required fields' });
        }

        if (!shippingAddress?.country) {
            return res.status(400).json({ ok: false, error: 'Shipping address with country required' });
        }

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        // Calculate subtotal from items (prices in cents)
        const subtotalCents = items.reduce((sum: number, item: any) =>
            sum + (item.unitAmount * item.quantity), 0);

        // Calculate shipping and totals
        const totals = shippingCalculator.calculateOrderTotals(
            subtotalCents,
            shippingAddress.country,
            paymentMethod as 'stripe' | 'cod' | 'bank_transfer'
        );

        // Validate COD availability
        if (paymentMethod === 'cod' && !shippingCalculator.isCodAvailable(totals.region)) {
            return res.status(400).json({
                ok: false,
                error: 'Cash on Delivery is only available for Germany'
            });
        }

        const result = await db.query(`
            INSERT INTO orders (
                order_number, customer_email, customer_name, customer_phone,
                items, shipping_address, payment_method, shipping_region,
                subtotal, tax, shipping, cod_fee, total, currency, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            RETURNING *
        `, [
            orderNumber,
            customerEmail.toLowerCase(),
            customerName || null,
            customerPhone || null,
            JSON.stringify(items),
            JSON.stringify(shippingAddress),
            paymentMethod,
            totals.region,
            totals.subtotal,
            totals.tax,
            totals.shipping,
            totals.codFee,
            totals.total,
            'eur',
            'pending'
        ]);

        res.json({
            ok: true,
            order: result.rows[0],
            shipping: {
                region: totals.region,
                cost: totals.shipping,
                isFreeShipping: totals.isFreeShipping,
                estimatedDays: totals.estimatedDays
            }
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ ok: false, error: 'Failed to create order' });
    }
});

// POST /api/shop/orders/calculate - Calculate order totals (Public)
router.post('/calculate', async (req, res) => {
    try {
        const { items, countryCode, paymentMethod = 'cod' } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ ok: false, error: 'Items required' });
        }

        if (!countryCode) {
            return res.status(400).json({ ok: false, error: 'Country code required' });
        }

        // Calculate subtotal from items
        const subtotalCents = items.reduce((sum: number, item: any) =>
            sum + (item.price * item.quantity), 0);

        const totals = shippingCalculator.calculateOrderTotals(
            subtotalCents,
            countryCode,
            paymentMethod as 'stripe' | 'cod' | 'bank_transfer'
        );

        const availablePaymentMethods = shippingCalculator.getAvailablePaymentMethods(totals.region);

        res.json({
            ok: true,
            subtotal: totals.subtotal,
            shipping: totals.shipping,
            codFee: totals.codFee,
            tax: totals.tax,
            total: totals.total,
            region: totals.region,
            isFreeShipping: totals.isFreeShipping,
            estimatedDays: totals.estimatedDays,
            availablePaymentMethods,
            codAvailable: shippingCalculator.isCodAvailable(totals.region)
        });
    } catch (error) {
        console.error('Calculate order error:', error);
        res.status(500).json({ ok: false, error: 'Failed to calculate order' });
    }
});

// PATCH /api/shop/orders/:id/status (Admin)
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
        if (status === 'cancelled') timestampField = 'cancelled_at';

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

// PUT /api/shop/orders/:id/status (Admin) - Alias for PATCH
router.put('/:id/status', requireAdmin, async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ ok: false, error: 'Status is required' });
        }

        let timestampField = null;
        if (status === 'paid') timestampField = 'paid_at';
        if (status === 'shipped') timestampField = 'shipped_at';
        if (status === 'delivered') timestampField = 'delivered_at';
        if (status === 'cancelled') timestampField = 'cancelled_at';

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

// PATCH /api/shop/orders/:id/tracking (Admin)
router.patch('/:id/tracking', requireAdmin, async (req, res) => {
    try {
        const { trackingNumber, trackingUrl } = req.body;

        const result = await db.query(`
            UPDATE orders 
            SET tracking_number = $1, tracking_url = $2, updated_at = CURRENT_TIMESTAMP 
            WHERE id = $3 
            RETURNING *
        `, [trackingNumber, trackingUrl, req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, error: 'Order not found' });
        }

        res.json({
            ok: true,
            order: result.rows[0]
        });
    } catch (error) {
        console.error('Update tracking error:', error);
        res.status(500).json({ ok: false, error: 'Failed to update tracking' });
    }
});

export default router;
