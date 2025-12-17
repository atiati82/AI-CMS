import { db } from '../db';
import { products, orders, carts } from '@shared/schema';
import { eq, and, sql, desc } from 'drizzle-orm';

// ============================================================================
// PRODUCTS STORAGE
// ============================================================================

export const productsStorage = {
    async getAll(options: { status?: string; category?: string; limit?: number } = {}) {
        let query = db.select().from(products);

        if (options.status) {
            query = query.where(eq(products.status, options.status)) as any;
        }
        if (options.category) {
            query = query.where(eq(products.category, options.category)) as any;
        }
        if (options.limit) {
            query = query.limit(options.limit) as any;
        }

        return query;
    },

    async getById(id: string) {
        const result = await db.select().from(products).where(eq(products.id, id));
        return result[0] || null;
    },

    async getBySlug(slug: string) {
        const result = await db.select().from(products).where(eq(products.slug, slug));
        return result[0] || null;
    },

    async create(data: {
        name: string;
        slug: string;
        description?: string;
        price: string;
        comparePrice?: string;
        category?: string;
        inventory?: number;
        status?: string;
        featuredImage?: string;
        images?: string[];
    }) {
        const result = await db.insert(products).values({
            ...data,
            price: data.price,
            comparePrice: data.comparePrice,
            inventory: data.inventory || 0,
            status: data.status || 'draft',
        }).returning();
        return result[0];
    },

    async update(id: string, data: Partial<typeof products.$inferInsert>) {
        const result = await db.update(products)
            .set(data)
            .where(eq(products.id, id))
            .returning();
        return result[0] || null;
    },

    async delete(id: string) {
        await db.delete(products).where(eq(products.id, id));
        return true;
    },

    async search(query: string, limit: number = 50) {
        // Simple search - can be enhanced with full-text search
        return db.select().from(products)
            .where(sql`${products.name} ILIKE ${'%' + query + '%'}`)
            .limit(limit);
    },

    async updateInventory(id: string, change: number) {
        return db.update(products)
            .set({ inventory: sql`${products.inventory} + ${change}` })
            .where(eq(products.id, id))
            .returning();
    },
};

// ============================================================================
// ORDERS STORAGE
// ============================================================================

export const ordersStorage = {
    async getAll(options: { status?: string; limit?: number } = {}) {
        let query = db.select().from(orders).orderBy(desc(orders.createdAt));

        if (options.status) {
            query = query.where(eq(orders.status, options.status)) as any;
        }
        if (options.limit) {
            query = query.limit(options.limit) as any;
        }

        return query;
    },

    async getById(id: string) {
        const result = await db.select().from(orders).where(eq(orders.id, id));
        return result[0] || null;
    },

    async getByOrderNumber(orderNumber: string) {
        const result = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber));
        return result[0] || null;
    },

    async create(data: {
        customerEmail: string;
        customerName?: string;
        items: Array<{ productId: string; quantity: number; price: number }>;
        shippingAddress?: any;
    }) {
        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        // Calculate totals
        const subtotal = data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
        const total = subtotal + tax + shipping;

        const result = await db.insert(orders).values({
            orderNumber,
            customerEmail: data.customerEmail,
            customerName: data.customerName,
            items: data.items as any,
            shippingAddress: data.shippingAddress as any,
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            shipping: shipping.toFixed(2),
            total: total.toFixed(2),
            status: 'pending',
        }).returning();

        return result[0];
    },

    async updateStatus(id: string, newStatus: string) {
        const updates: any = { status: newStatus };

        // Set timestamps based on status
        if (newStatus === 'paid') updates.paidAt = new Date();
        if (newStatus === 'shipped') updates.shippedAt = new Date();
        if (newStatus === 'delivered') updates.deliveredAt = new Date();

        const result = await db.update(orders)
            .set(updates)
            .where(eq(orders.id, id))
            .returning();

        return result[0] || null;
    },

    async getByEmail(email: string) {
        return db.select().from(orders)
            .where(eq(orders.customerEmail, email))
            .orderBy(desc(orders.createdAt));
    },
};

// ============================================================================
// CARTS STORAGE
// ============================================================================

export const cartsStorage = {
    async getBySession(sessionId: string) {
        const result = await db.select().from(carts).where(eq(carts.sessionId, sessionId));
        return result[0] || null;
    },

    async create(sessionId: string) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

        const result = await db.insert(carts).values({
            sessionId,
            items: [] as any,
            expiresAt,
        }).returning();

        return result[0];
    },

    async updateItems(sessionId: string, items: Array<{ productId: string; quantity: number }>) {
        const result = await db.update(carts)
            .set({ items: items as any })
            .where(eq(carts.sessionId, sessionId))
            .returning();

        return result[0] || null;
    },

    async addItem(sessionId: string, productId: string, quantity: number) {
        // Get or create cart
        let cart = await this.getBySession(sessionId);
        if (!cart) {
            cart = await this.create(sessionId);
        }

        // Update items
        const items = cart.items as Array<{ productId: string; quantity: number }>;
        const existingItem = items.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            items.push({ productId, quantity });
        }

        return this.updateItems(sessionId, items);
    },

    async removeItem(sessionId: string, productId: string) {
        const cart = await this.getBySession(sessionId);
        if (!cart) return null;

        const items = (cart.items as Array<{ productId: string; quantity: number }>)
            .filter(item => item.productId !== productId);

        return this.updateItems(sessionId, items);
    },

    async clear(sessionId: string) {
        return this.updateItems(sessionId, []);
    },
};

// Consolidated export
export const ecommerceStorage = {
    products: productsStorage,
    orders: ordersStorage,
    carts: cartsStorage,
};
