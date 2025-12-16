// Stripe Client for local development
import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export async function getUncachableStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY not set in environment variables');
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-08-27.basil',
  });
}

export async function getStripePublishableKey() {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error('STRIPE_PUBLISHABLE_KEY not set in environment variables');
  }
  return publishableKey;
}

export async function getStripeSecretKey() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY not set in environment variables');
  }
  return secretKey;
}

// Simple stub for getStripeSync - no longer using stripe-replit-sync
export async function getStripeSync() {
  // Just return a dummy object so the app doesn't crash
  // The sync functionality is Replit-specific
  console.log('[stripe] Using local Stripe client (no sync functionality)');
  return { initialized: true };
}
