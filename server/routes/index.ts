import { Express } from 'express';
import { Server } from 'http';

// Import public routes
import productsRouter from './public/products';
import clustersRouter from './public/clusters';
import pagesRouter from './public/pages';
import articlesRouter from './public/articles';
import navigationRouter from './public/navigation';
import designRouter from './public/design';

/**
 * Register all modular routes
 * This is the new modular route registration system
 */
export async function registerModularRoutes(
    httpServer: Server,
    app: Express
): Promise<void> {
    // Public API routes
    app.use('/api/products', productsRouter);
    app.use('/api/clusters', clustersRouter);
    app.use('/api/pages', pagesRouter);
    app.use('/api/science-articles', articlesRouter);
    app.use('/api/navigation', navigationRouter);
    app.use('/api/design-settings', designRouter);

    console.log('✅ Modular routes registered (Phase 1: Public routes)');
}
