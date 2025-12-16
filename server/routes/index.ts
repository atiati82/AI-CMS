import { Express } from 'express';
import { Server } from 'http';

// Import public routes
import productsRouter from './public/products';
import clustersRouter from './public/clusters';
import pagesRouter from './public/pages';
import articlesRouter from './public/articles';
import navigationRouter from './public/navigation';
import designRouter from './public/design';

// Import admin routes
import adminAuthRouter from './admin/auth';
import adminPagesRouter from './admin/pages';
import adminProductsRouter from './admin/products';
import adminClustersRouter from './admin/clusters';
import adminArticlesRouter from './admin/articles';

// Import AI routes
import aiEnrichmentRouter from './ai/enrichment';
import aiGenerationRouter from './ai/generation';
import aiImagesRouter from './ai/images';

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

    // Admin routes
    app.use('/api/admin', adminAuthRouter);
    app.use('/api/admin', adminPagesRouter);
    app.use('/api/admin/products', adminProductsRouter);
    app.use('/api/admin/clusters', adminClustersRouter);
    app.use('/api/admin/science-articles', adminArticlesRouter);

    // AI routes
    app.use('/api/admin', aiEnrichmentRouter);
    app.use('/api/admin', aiGenerationRouter);
    app.use('/api/admin', aiImagesRouter);

    console.log('✅ Modular routes registered (Phases 1-3: Public + Admin + AI)');
}
