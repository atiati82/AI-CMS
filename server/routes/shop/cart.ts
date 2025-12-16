import { Router } from 'express';
import { db } from '../../db';

const router = Router();

// Helper to get or create session ID
function getSessionId(req: any): string {
    if (!req.headers['x-session-id']) {
        throw new Error('Session ID required');
    }
    return req.headers['x-session-id'] as string;
}

// GET /api/shop/cart
router.get('/', async (req, res) => {
    try {
        const sessionId = getSessionId(req);

        const result = await db.query('SELECT * FROM carts WHERE session_id = $1', [sessionId]);

        if (result.rows.length === 0) {
            // Return empty cart
            return res.json({
                ok: true,
                cart: {
                    id: null,
                    sessionId,
                    items: []
                }
            });
        }

        const cart = result.rows[0];

        // Enrich cart items with product details
        if (cart.items && cart.items.length > 0) {
            const productIds = cart.items.map((item: any) => item.productId);
            const productsResult = await db.query(
                `SELECT id, name, slug, price, featured_image FROM products WHERE id = ANY($1)`,
                [productIds]
            );

            const productsMap = new Map(productsResult.rows.map(p => [p.id, p]));

            cart.items = cart.items.map((item: any) => ({
                ...item,
                product: productsMap.get(item.productId)
            }));
        }

        res.json({
            ok: true,
            cart
        });
    } catch (error: any) {
        if (error.message === 'Session ID required') {
            return res.status(400).json({ ok: false, error: 'x-session-id header required' });
        }
        console.error('Get cart error:', error);
        res.status(500).json({ ok: false, error: 'Failed to fetch cart' });
    }
});

// POST /api/shop/cart/add
router.post('/add', async (req, res) => {
    try {
        const sessionId = getSessionId(req);
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ ok: false, error: 'productId and quantity required' });
        }

        // Get or create cart
        let cart = await db.query('SELECT * FROM carts WHERE session_id = $1', [sessionId]);

        let items: any[] = [];

        if (cart.rows.length === 0) {
            // Create new cart
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

            items = [{ productId, quantity }];

            cart = await db.query(`
        INSERT INTO carts (session_id, items, expires_at)
        VALUES ($1, $2, $3)
        RETURNING *
      `, [sessionId, JSON.stringify(items), expiresAt]);
        } else {
            // Update existing cart
            items = cart.rows[0].items || [];
            const existingItem = items.find((item: any) => item.productId === productId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ productId, quantity });
            }

            cart = await db.query(`
        UPDATE carts
        SET items = $1, updated_at = CURRENT_TIMESTAMP
        WHERE session_id = $2
        RETURNING *
      `, [JSON.stringify(items), sessionId]);
        }

        res.json({
            ok: true,
            cart: cart.rows[0]
        });
    } catch (error: any) {
        if (error.message === 'Session ID required') {
            return res.status(400).json({ ok: false, error: 'x-session-id header required' });
        }
        console.error('Add to cart error:', error);
        res.status(500).json({ ok: false, error: 'Failed to add item to cart' });
    }
});

// DELETE /api/shop/cart/:productId
router.delete('/:productId', async (req, res) => {
    try {
        const sessionId = getSessionId(req);
        const { productId } = req.params;

        const cart = await db.query('SELECT * FROM carts WHERE session_id = $1', [sessionId]);

        if (cart.rows.length === 0) {
            return res.status(404).json({ ok: false, error: 'Cart not found' });
        }

        const items = (cart.rows[0].items || []).filter((item: any) => item.productId !== productId);

        const result = await db.query(`
      UPDATE carts
      SET items = $1, updated_at = CURRENT_TIMESTAMP
      WHERE session_id = $2
      RETURNING *
    `, [JSON.stringify(items), sessionId]);

        res.json({
            ok: true,
            cart: result.rows[0]
        });
    } catch (error: any) {
        if (error.message === 'Session ID required') {
            return res.status(400).json({ ok: false, error: 'x-session-id header required' });
        }
        console.error('Remove from cart error:', error);
        res.status(500).json({ ok: false, error: 'Failed to remove item from cart' });
    }
});

// DELETE /api/shop/cart
router.delete('/', async (req, res) => {
    try {
        const sessionId = getSessionId(req);

        const result = await db.query(`
      UPDATE carts
      SET items = '[]'::jsonb, updated_at = CURRENT_TIMESTAMP
      WHERE session_id = $1
      RETURNING *
    `, [sessionId]);

        res.json({
            ok: true,
            cart: result.rows[0] || { items: [] }
        });
    } catch (error: any) {
        if (error.message === 'Session ID required') {
            return res.status(400).json({ ok: false, error: 'x-session-id header required' });
        }
        console.error('Clear cart error:', error);
        res.status(500).json({ ok: false, error: 'Failed to clear cart' });
    }
});

export default router;
