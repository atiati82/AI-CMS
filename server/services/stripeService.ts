// Stripe Service for Andara Ionic - handles Stripe API operations
import { getUncachableStripeClient } from './stripeClient';
import { db } from '../db';
import { sql } from 'drizzle-orm';

export class StripeService {
  private stripeTablesExist: boolean | null = null;

  private async checkStripeTablesExist(): Promise<boolean> {
    if (this.stripeTablesExist !== null) {
      return this.stripeTablesExist;
    }
    try {
      await db.execute(sql`SELECT 1 FROM stripe.products LIMIT 1`);
      this.stripeTablesExist = true;
      return true;
    } catch {
      this.stripeTablesExist = false;
      return false;
    }
  }

  async createCustomer(email: string, name?: string, metadata?: Record<string, string>) {
    const stripe = await getUncachableStripeClient();
    return await stripe.customers.create({
      email,
      name,
      metadata,
    });
  }

  async createCheckoutSession(options: {
    customerId?: string;
    customerEmail?: string;
    priceId: string;
    quantity?: number;
    successUrl: string;
    cancelUrl: string;
    mode?: 'payment' | 'subscription';
    metadata?: Record<string, string>;
  }) {
    const stripe = await getUncachableStripeClient();
    
    const sessionParams: any = {
      payment_method_types: ['card'],
      line_items: [{ 
        price: options.priceId, 
        quantity: options.quantity || 1 
      }],
      mode: options.mode || 'payment',
      success_url: options.successUrl,
      cancel_url: options.cancelUrl,
      metadata: options.metadata,
    };

    if (options.customerId) {
      sessionParams.customer = options.customerId;
    } else if (options.customerEmail) {
      sessionParams.customer_email = options.customerEmail;
    }

    return await stripe.checkout.sessions.create(sessionParams);
  }

  async createCustomerPortalSession(customerId: string, returnUrl: string) {
    const stripe = await getUncachableStripeClient();
    return await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
  }

  async getProduct(productId: string) {
    if (await this.checkStripeTablesExist()) {
      const result = await db.execute(
        sql`SELECT * FROM stripe.products WHERE id = ${productId}`
      );
      if (result.rows[0]) return result.rows[0];
    }
    const stripe = await getUncachableStripeClient();
    return await stripe.products.retrieve(productId);
  }

  async listProducts(active = true, limit = 20) {
    if (await this.checkStripeTablesExist()) {
      const result = await db.execute(
        sql`SELECT * FROM stripe.products WHERE active = ${active} LIMIT ${limit}`
      );
      if (result.rows.length > 0) return result.rows;
    }
    const stripe = await getUncachableStripeClient();
    const products = await stripe.products.list({ active, limit });
    return products.data;
  }

  async listProductsWithPrices(active = true, limit = 20) {
    if (await this.checkStripeTablesExist()) {
      try {
        const result = await db.execute(
          sql`
            WITH paginated_products AS (
              SELECT id, name, description, metadata, active, images
              FROM stripe.products
              WHERE active = ${active}
              ORDER BY id
              LIMIT ${limit}
            )
            SELECT 
              p.id as product_id,
              p.name as product_name,
              p.description as product_description,
              p.active as product_active,
              p.metadata as product_metadata,
              p.images as product_images,
              pr.id as price_id,
              pr.unit_amount,
              pr.currency,
              pr.recurring,
              pr.active as price_active,
              pr.metadata as price_metadata
            FROM paginated_products p
            LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
            ORDER BY p.id, pr.unit_amount
          `
        );
        if (result.rows.length > 0) return result.rows;
      } catch {
        // Tables don't exist yet, fall through to API
      }
    }
    
    const stripe = await getUncachableStripeClient();
    const products = await stripe.products.list({ active, limit, expand: ['data.default_price'] });
    const prices = await stripe.prices.list({ active: true, limit: 100 });
    
    return products.data.flatMap(product => {
      const productPrices = prices.data.filter(p => p.product === product.id);
      if (productPrices.length === 0) {
        return [{
          product_id: product.id,
          product_name: product.name,
          product_description: product.description,
          product_active: product.active,
          product_metadata: product.metadata,
          product_images: product.images,
          price_id: null,
          unit_amount: null,
          currency: null,
          recurring: null,
          price_active: null,
          price_metadata: null,
        }];
      }
      return productPrices.map(price => ({
        product_id: product.id,
        product_name: product.name,
        product_description: product.description,
        product_active: product.active,
        product_metadata: product.metadata,
        product_images: product.images,
        price_id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
        recurring: price.recurring,
        price_active: price.active,
        price_metadata: price.metadata,
      }));
    });
  }

  async getPrice(priceId: string) {
    if (await this.checkStripeTablesExist()) {
      const result = await db.execute(
        sql`SELECT * FROM stripe.prices WHERE id = ${priceId}`
      );
      if (result.rows[0]) return result.rows[0];
    }
    const stripe = await getUncachableStripeClient();
    return await stripe.prices.retrieve(priceId);
  }

  async listPrices(active = true, limit = 20) {
    if (await this.checkStripeTablesExist()) {
      const result = await db.execute(
        sql`SELECT * FROM stripe.prices WHERE active = ${active} LIMIT ${limit}`
      );
      if (result.rows.length > 0) return result.rows;
    }
    const stripe = await getUncachableStripeClient();
    const prices = await stripe.prices.list({ active, limit });
    return prices.data;
  }

  async getPricesForProduct(productId: string) {
    if (await this.checkStripeTablesExist()) {
      const result = await db.execute(
        sql`SELECT * FROM stripe.prices WHERE product = ${productId} AND active = true`
      );
      if (result.rows.length > 0) return result.rows;
    }
    const stripe = await getUncachableStripeClient();
    const prices = await stripe.prices.list({ product: productId, active: true });
    return prices.data;
  }

  async getSubscription(subscriptionId: string) {
    if (await this.checkStripeTablesExist()) {
      const result = await db.execute(
        sql`SELECT * FROM stripe.subscriptions WHERE id = ${subscriptionId}`
      );
      if (result.rows[0]) return result.rows[0];
    }
    const stripe = await getUncachableStripeClient();
    return await stripe.subscriptions.retrieve(subscriptionId);
  }

  async getCustomer(customerId: string) {
    if (await this.checkStripeTablesExist()) {
      const result = await db.execute(
        sql`SELECT * FROM stripe.customers WHERE id = ${customerId}`
      );
      if (result.rows[0]) return result.rows[0];
    }
    const stripe = await getUncachableStripeClient();
    return await stripe.customers.retrieve(customerId);
  }

  async getPaymentIntent(paymentIntentId: string) {
    if (await this.checkStripeTablesExist()) {
      const result = await db.execute(
        sql`SELECT * FROM stripe.payment_intents WHERE id = ${paymentIntentId}`
      );
      if (result.rows[0]) return result.rows[0];
    }
    const stripe = await getUncachableStripeClient();
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  }

  async getCheckoutSession(sessionId: string) {
    const stripe = await getUncachableStripeClient();
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'payment_intent'],
    });
  }
}

export const stripeService = new StripeService();
