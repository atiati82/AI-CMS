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
import adminDocumentsRouter from './admin/documents';
import adminSettingsRouter from './admin/settings';

// Import AI routes
import aiEnrichmentRouter from './ai/enrichment';
import aiGenerationRouter from './ai/generation';
import aiImagesRouter from './ai/images';
import aiKnowledgeRouter from './ai/knowledge';
import aiAgentsRouter from './ai/agents';
import aiChatRouter from './ai/chat';
import aiLearningRouter from './ai/learning';

// Import shop routes
import shopProductsRouter from './shop/products';
import shopOrdersRouter from './shop/orders';
import shopCartRouter from './shop/cart';

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
    app.use('/api/admin/documents', adminDocumentsRouter);
    app.use('/api/admin', adminSettingsRouter);

    // AI routes
    app.use('/api/admin', aiEnrichmentRouter);
    app.use('/api/admin', aiGenerationRouter);
    app.use('/api/admin', aiImagesRouter);
    app.use('/api/ai', aiKnowledgeRouter);
    app.use('/api/ai', aiAgentsRouter);
    app.use('/api/ai', aiChatRouter);
    app.use('/api/ai', aiLearningRouter);

    // Shop routes (E-commerce)
    app.use('/api/shop/products', shopProductsRouter);
    app.use('/api/shop/orders', shopOrdersRouter);
    app.use('/api/shop/cart', shopCartRouter);

    console.log('✅ All 5 Plugin Systems + Conversation Learning Installed');
}
