import { db } from '../db';
import { products, orders } from '@shared/schema';
import { eq, desc, ilike, or, sql } from 'drizzle-orm';

// ============================================================================
// PRODUCTS STORAGE (using actual schema.ts products table)
// ============================================================================

export const productsStorage = {
    async getAll(options: { limit?: number } = {}) {
        let query = db.select().from(products);

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
        sizeMl: number;
        descriptionShort: string;
        descriptionLong: string;
        price: number;
        pricePerLiter: number;
        highlights?: string[];
        images?: string[];
        tags?: string[];
        bundles?: any[];
        pageKey?: string;
        templateId?: string;
        seoTitle?: string;
        seoDescription?: string;
    }) {
        const result = await db.insert(products).values({
            name: data.name,
            slug: data.slug,
            sizeMl: data.sizeMl,
            descriptionShort: data.descriptionShort,
            descriptionLong: data.descriptionLong,
            price: data.price,
            pricePerLiter: data.pricePerLiter,
            highlights: data.highlights || [],
            images: data.images || [],
            tags: data.tags || [],
            bundles: data.bundles || [],
            pageKey: data.pageKey,
            templateId: data.templateId,
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
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
        return db.select().from(products)
            .where(or(
                ilike(products.name, `%${query}%`),
                ilike(products.descriptionShort, `%${query}%`)
            ))
            .limit(limit);
    },
};

// ============================================================================
// ORDERS STORAGE (using actual schema.ts orders table)
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
        orderNumber: string;
        customerEmail: string;
        customerName?: string;
        items: Array<{ productId: string; productName: string; quantity: number; unitAmount: number; currency: string }>;
        subtotal: number;
        tax?: number;
        shipping?: number;
        total: number;
        currency?: string;
        stripeCheckoutSessionId?: string;
    }) {
        const result = await db.insert(orders).values({
            orderNumber: data.orderNumber,
            customerEmail: data.customerEmail,
            customerName: data.customerName,
            items: data.items.map(item => ({
                priceId: '',
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                unitAmount: item.unitAmount,
                currency: item.currency,
            })),
            subtotal: data.subtotal,
            tax: data.tax || 0,
            shipping: data.shipping || 0,
            total: data.total,
            currency: data.currency || 'usd',
            stripeCheckoutSessionId: data.stripeCheckoutSessionId,
            status: 'pending',
        }).returning();

        return result[0];
    },

    async updateStatus(id: string, newStatus: string) {
        const updates: Record<string, any> = { status: newStatus };

        // Set timestamps based on status
        if (newStatus === 'paid') updates.paidAt = new Date();
        if (newStatus === 'shipped') updates.shippedAt = new Date();
        if (newStatus === 'delivered') updates.deliveredAt = new Date();
        if (newStatus === 'cancelled') updates.cancelledAt = new Date();

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
// CARTS STORAGE (in-memory cart for now - no carts table in schema)
// ============================================================================

// Simple in-memory cart storage (for session-based carts)
const cartStore = new Map<string, { items: Array<{ productId: string; quantity: number }>, expiresAt: Date }>();

export const cartsStorage = {
    async getBySession(sessionId: string) {
        const cart = cartStore.get(sessionId);
        if (!cart || cart.expiresAt < new Date()) {
            cartStore.delete(sessionId);
            return null;
        }
        return { sessionId, items: cart.items };
    },

    async create(sessionId: string) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        cartStore.set(sessionId, { items: [], expiresAt });
        return { sessionId, items: [] };
    },

    async updateItems(sessionId: string, items: Array<{ productId: string; quantity: number }>) {
        const cart = cartStore.get(sessionId);
        if (!cart) return null;

        cart.items = items;
        return { sessionId, items };
    },

    async addItem(sessionId: string, productId: string, quantity: number) {
        let cart = cartStore.get(sessionId);
        if (!cart || cart.expiresAt < new Date()) {
            await this.create(sessionId);
            cart = cartStore.get(sessionId)!;
        }

        const existingItem = cart.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        return { sessionId, items: cart.items };
    },

    async removeItem(sessionId: string, productId: string) {
        const cart = cartStore.get(sessionId);
        if (!cart) return null;

        cart.items = cart.items.filter(item => item.productId !== productId);
        return { sessionId, items: cart.items };
    },

    async clear(sessionId: string) {
        const cart = cartStore.get(sessionId);
        if (!cart) return null;

        cart.items = [];
        return { sessionId, items: [] };
    },
};

// Consolidated export
export const ecommerceStorage = {
    products: productsStorage,
    orders: ordersStorage,
    carts: cartsStorage,
};
