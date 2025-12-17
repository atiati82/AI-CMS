import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertProductSchema,
  insertScienceArticleSchema,
  insertClusterSchema,
  insertPageSchema,
  insertDocumentSchema,
  insertSeoKeywordSchema,
  insertMagicPageSuggestionSchema,
  insertHtmlTemplateSchema,
  insertPageImagePromptSchema
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createCrudHandler, createUpdateHandler, createDeleteHandler, handleZodError } from "./route-helpers";
import { parsePdfBuffer } from "./pdf-parser";
import { searchConsoleService } from "./services/searchConsoleService";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 300 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'text/plain', 'text/markdown', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype) || file.originalname.endsWith('.md') || file.originalname.endsWith('.txt')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, TXT, MD, and DOC files are allowed'));
    }
  }
});

const JWT_SECRET = process.env.JWT_SECRET || "andara-ionic-jwt-secret-2024";
const JWT_EXPIRES_IN = "24h";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // --- PUBLIC PRODUCT ROUTES ---
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // --- PUBLIC CLUSTER ROUTES ---
  app.get("/api/clusters", async (req, res) => {
    try {
      const clusters = await storage.getAllClusters();
      res.json(clusters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch clusters" });
    }
  });

  app.get("/api/clusters/:slug", async (req, res) => {
    try {
      const cluster = await storage.getClusterBySlug(req.params.slug);
      if (!cluster) {
        return res.status(404).json({ error: "Cluster not found" });
      }
      res.json(cluster);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cluster" });
    }
  });

  // --- PUBLIC PAGE ROUTES ---
  app.get("/api/pages", async (req, res) => {
    try {
      const { clusterKey, parentKey, tree } = req.query;

      if (tree === 'true') {
        const pageTree = await storage.getPageTree();
        return res.json(pageTree);
      }

      if (clusterKey) {
        const pages = await storage.getPagesByCluster(clusterKey as string);
        return res.json(pages);
      }

      if (parentKey) {
        const pages = await storage.getChildPages(parentKey as string);
        return res.json(pages);
      }

      const pages = await storage.getAllPages();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pages" });
    }
  });

  app.get("/api/pages/by-path/*", async (req, res) => {
    try {
      const pathParam = (req.params as Record<string, string>)[0] || '';
      const path = '/' + pathParam;
      const page = await storage.getPageByPath(path);
      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });

  app.get("/api/pages/by-key/:key", async (req, res) => {
    try {
      const page = await storage.getPageByKey(req.params.key);
      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });

  app.get("/api/pages/:key/breadcrumbs", async (req, res) => {
    try {
      const breadcrumbs = await storage.getBreadcrumbs(req.params.key);
      res.json(breadcrumbs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch breadcrumbs" });
    }
  });

  app.get("/api/pages/:key/children", async (req, res) => {
    try {
      const children = await storage.getChildPages(req.params.key);
      res.json(children);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch children" });
    }
  });

  // --- PUBLIC DESIGN SETTINGS ---
  app.get("/api/design-settings", async (req, res) => {
    try {
      const settings = await storage.getCmsSettingsByCategory('design');
      const settingsMap: Record<string, any> = {};
      for (const setting of settings) {
        settingsMap[setting.key] = setting.value;
      }
      res.json(settingsMap);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch design settings" });
    }
  });

  // --- NAVIGATION API ---
  app.get("/api/navigation", async (req, res) => {
    try {
      const allPages = await storage.getAllPages();
      const publishedPages = allPages.filter(p => p.status === 'published');

      const mainSections = [
        {
          key: 'shop',
          label: 'Shop',
          path: '/shop',
          children: publishedPages
            .filter(p => p.parentKey === 'shop_overview' || p.key === 'shop_overview')
            .map(p => ({ key: p.key, label: p.title, path: p.path }))
        },
        {
          key: 'science',
          label: 'Science',
          path: '/science',
          children: publishedPages
            .filter(p => p.parentKey === 'science_library_overview')
            .map(p => ({ key: p.key, label: p.title, path: p.path }))
        },
        {
          key: 'about',
          label: 'About',
          path: '/about',
          children: publishedPages
            .filter(p => p.parentKey === 'about_andara' || p.key === 'about_andara')
            .map(p => ({ key: p.key, label: p.title, path: p.path }))
        },
        {
          key: 'trust',
          label: 'Trust',
          path: '/trust',
          children: publishedPages
            .filter(p => p.parentKey === 'trust_quality_overview')
            .map(p => ({ key: p.key, label: p.title, path: p.path }))
        },
        {
          key: 'blog',
          label: 'Blog',
          path: '/blog',
          children: []
        }
      ];

      res.json({
        sections: mainSections,
        legal: publishedPages
          .filter(p => p.template === 'legal')
          .map(p => ({ key: p.key, label: p.title, path: p.path }))
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch navigation" });
    }
  });

  // --- PUBLIC SCIENCE ARTICLE ROUTES ---
  app.get("/api/science-articles", async (req, res) => {
    try {
      const { clusterId, tags, relatedProductIds, limit } = req.query;

      if (clusterId || tags || relatedProductIds) {
        const articles = await storage.getRelevantArticles({
          clusterId: clusterId as string,
          tags: tags ? (tags as string).split(',') : undefined,
          relatedProductIds: relatedProductIds ? (relatedProductIds as string).split(',') : undefined,
          limit: limit ? parseInt(limit as string) : undefined
        });
        return res.json(articles);
      }

      const articles = await storage.getAllScienceArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/science-articles/:slug", async (req, res) => {
    try {
      const article = await storage.getScienceArticleBySlug(req.params.slug);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  // --- ADMIN STATS ---
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getContentStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // --- ADMIN AUTH (JWT-based) ---
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const user = await storage.getAdminUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.json({ success: true, token, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    res.json({ success: true });
  });

  app.get("/api/admin/me", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
      const user = await storage.getAdminUser(decoded.userId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      res.json({ id: user.id, username: user.username });
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
  });

  // --- ADMIN AUTH MIDDLEWARE (JWT-based) ---
  const requireAdmin = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Authentication required" });
    }

    try {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
      const user = await storage.getAdminUser(decoded.userId);
      if (!user) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.adminUser = user;
      next();
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
  };

  // --- GOOGLE SEARCH CONSOLE (SEO Analytics) ---
  app.get("/api/admin/seo/status", requireAdmin, async (req, res) => {
    try {
      res.json({
        configured: searchConsoleService.isConfigured(),
        message: searchConsoleService.isConfigured()
          ? "Google Search Console is configured"
          : "GSC credentials not configured. Add GSC_CLIENT_EMAIL and GSC_PRIVATE_KEY secrets."
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/seo/sites", requireAdmin, async (req, res) => {
    try {
      const sites = await searchConsoleService.listSites();
      res.json(sites);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/seo/summary", requireAdmin, async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 28;
      const summary = await searchConsoleService.getSummaryStats(days);
      res.json(summary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/seo/queries", requireAdmin, async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 28;
      const limit = parseInt(req.query.limit as string) || 50;
      const queries = await searchConsoleService.getTopQueries(days, limit);
      res.json(queries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/seo/pages", requireAdmin, async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 28;
      const limit = parseInt(req.query.limit as string) || 50;
      const pages = await searchConsoleService.getTopPages(days, limit);
      res.json(pages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/seo/performance", requireAdmin, async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 28;
      const performance = await searchConsoleService.getPerformanceByDate(days);
      res.json(performance);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/seo/inspect", requireAdmin, async (req, res) => {
    try {
      const { url, siteUrl } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }
      const result = await searchConsoleService.inspectUrl(url, siteUrl);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // --- ADMIN PAGE ROUTES ---
  app.post("/api/admin/pages", requireAdmin, createCrudHandler(
    insertPageSchema, storage.createPage.bind(storage), "Failed to create page"
  ));

  app.post("/api/admin/pages/bulk", requireAdmin, async (req, res) => {
    try {
      const pagesData = req.body.pages;
      if (!Array.isArray(pagesData)) {
        return res.status(400).json({ error: "pages must be an array" });
      }
      const validatedPages = pagesData.map((p: any) => insertPageSchema.parse(p));
      const createdPages = await storage.bulkCreatePages(validatedPages);
      res.json(createdPages);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      res.status(500).json({ error: "Failed to bulk create pages" });
    }
  });

  app.put("/api/admin/pages/:id", requireAdmin, async (req, res) => {
    try {
      const page = await storage.updatePage(req.params.id, req.body);
      res.json(page);
    } catch (error: any) {
      console.error("[PAGE UPDATE ERROR]", error?.message || error);
      console.error("[PAGE UPDATE ERROR DETAILS]", JSON.stringify({
        pageId: req.params.id,
        bodyKeys: Object.keys(req.body || {}),
        errorMessage: error?.message,
        errorCode: error?.code,
        stack: error?.stack?.split('\n').slice(0, 5).join('\n')
      }, null, 2));
      res.status(500).json({ error: "Failed to update page", details: error?.message });
    }
  });

  app.delete("/api/admin/pages/:id", requireAdmin, createDeleteHandler(
    storage.deletePage.bind(storage), "Page not found", "Failed to delete page"
  ));

  // --- AI PAGE ENRICHMENT ---
  app.post("/api/admin/pages/:id/enrich", requireAdmin, async (req, res) => {
    try {
      const { enrichPageHtml } = await import("./services/ai-enricher");

      const page = await storage.getPage(req.params.id);
      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }

      const html = page.aiStartupHtml;
      if (!html || html.trim().length === 0) {
        return res.status(400).json({ error: "No AI Startup HTML content to enrich" });
      }

      // Get selected enrichment steps from request body
      const steps = req.body?.steps || null;

      const enrichment = await enrichPageHtml(html, steps);

      // Get existing aiEnrichment to preserve data for disabled steps
      const existingEnrichment = page.aiEnrichment || {};

      // Helper to check if a step was enabled
      const isStepEnabled = (stepName: string): boolean => {
        if (!steps) return true; // All steps enabled if none specified
        return (steps as any)[stepName] !== false;
      };

      // Merge enrichment, keeping existing data for disabled steps
      const mergedEnrichment: any = {
        extractedAt: enrichment.extractedAt,
        imagePrompts: isStepEnabled('imagePrompts') ? enrichment.imagePrompts : (existingEnrichment as any).imagePrompts || [],
        videoPrompts: isStepEnabled('videoPrompts') ? enrichment.videoPrompts : (existingEnrichment as any).videoPrompts || [],
        layoutSpecs: isStepEnabled('layoutSpecs') ? enrichment.layoutSpecs : (existingEnrichment as any).layoutSpecs || [],
        animationSpecs: isStepEnabled('animationSpecs') ? enrichment.animationSpecs : (existingEnrichment as any).animationSpecs || [],
        motionSpecs: isStepEnabled('motionSpecs') ? enrichment.motionSpecs : (existingEnrichment as any).motionSpecs || [],
        suggestedSeo: isStepEnabled('suggestedSeo') ? enrichment.suggestedSeo : (existingEnrichment as any).suggestedSeo || {},
        suggestedLinks: isStepEnabled('suggestedLinks') ? enrichment.suggestedLinks : (existingEnrichment as any).suggestedLinks || [],
        components: isStepEnabled('components') ? enrichment.components : (existingEnrichment as any).components || [],
        visualConfig: isStepEnabled('visualConfig') ? enrichment.visualConfig : (existingEnrichment as any).visualConfig,
      };

      // Build update object with merged enrichment
      const updateData: any = { aiEnrichment: mergedEnrichment };

      // If AI generated visual config and visualConfig step was enabled, merge it with existing or create new
      if (isStepEnabled('visualConfig') && enrichment.visualConfig) {
        const existingConfig = page.visualConfig || {} as any;
        updateData.visualConfig = {
          pageId: page.key,
          cluster: page.clusterKey || existingConfig.cluster || "",
          priority: enrichment.visualConfig.priority || existingConfig.priority || "P2",
          vibeKeywords: enrichment.visualConfig.vibeKeywords || existingConfig.vibeKeywords || [],
          emotionalTone: enrichment.visualConfig.emotionalTone || existingConfig.emotionalTone || [],
          animationIdeas: enrichment.visualConfig.animationIdeas || existingConfig.animationIdeas || [],
          aiImagePrompt: enrichment.visualConfig.aiImagePrompt || existingConfig.aiImagePrompt || "",
          aiVideoPrompt: enrichment.visualConfig.aiVideoPrompt || existingConfig.aiVideoPrompt || "",
          designerNotes: enrichment.visualConfig.designerNotes || existingConfig.designerNotes || "",
        };
      }

      const updatedPage = await storage.updatePage(req.params.id, updateData);

      res.json({
        success: true,
        enrichment,
        page: updatedPage
      });
    } catch (error) {
      console.error("AI enrichment error:", error);
      res.status(500).json({ error: "Failed to enrich page with AI" });
    }
  });

  // --- AI PAGE INTEGRATION (TSX to App) ---
  app.post("/api/admin/pages/:id/integrate", requireAdmin, async (req, res) => {
    try {
      const { integrateTsxPage } = await import("./services/page-integrator");

      const page = await storage.getPage(req.params.id);
      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }

      const tsxCode = (page as any).aiStartupHtml;
      if (!tsxCode || tsxCode.trim().length === 0) {
        return res.status(400).json({ error: "No AI Startup HTML/TSX content to integrate" });
      }

      const result = await integrateTsxPage(tsxCode);

      if (!result.success) {
        return res.status(400).json({
          error: result.error || "Integration failed",
          details: result
        });
      }

      res.json({
        success: true,
        message: `Page integrated successfully! View at ${result.routePath}`,
        pageId: result.pageId,
        fileName: result.fileName,
        routePath: result.routePath,
        componentName: result.componentName
      });
    } catch (error) {
      console.error("Page integration error:", error);
      res.status(500).json({ error: "Failed to integrate page" });
    }
  });

  // --- AI STARTUP (generate page from brief) ---
  app.post("/api/admin/ai-startup", requireAdmin, async (req, res) => {
    try {
      const { generatePageFromBrief } = await import("./services/ai-startup");

      const { brief, pageSlug } = req.body;

      if (!brief || brief.trim().length === 0) {
        return res.status(400).json({ error: "Brief is required" });
      }

      const result = await generatePageFromBrief(brief, pageSlug);

      res.json({
        success: true,
        layoutsDetected: result.layoutsDetected,
        seo: result.seo,
        tsx: result.tsx,
        html: result.html,
      });
    } catch (error) {
      console.error("AI Startup error:", error);
      res.status(500).json({ error: "Failed to generate page from brief" });
    }
  });

  // --- AI IMAGE GENERATION ---
  app.post("/api/admin/generate-image", requireAdmin, async (req, res) => {
    try {
      const { generateImage } = await import("./services/image-generator");

      const { prompt } = req.body;

      if (!prompt || prompt.trim().length === 0) {
        return res.status(400).json({ error: "Image prompt is required" });
      }

      const result = await generateImage(prompt);

      if (!result.success) {
        return res.status(500).json({ error: result.error || "Failed to generate image" });
      }

      res.json({
        success: true,
        publicUrl: result.publicUrl,
        filePath: result.filePath,
      });
    } catch (error) {
      console.error("Image generation error:", error);
      res.status(500).json({ error: "Failed to generate image" });
    }
  });

  app.post("/api/admin/regenerate-image", requireAdmin, async (req, res) => {
    try {
      const { regenerateImage } = await import("./services/image-generator");

      const { prompt, oldFilePath } = req.body;

      if (!prompt || prompt.trim().length === 0) {
        return res.status(400).json({ error: "Image prompt is required" });
      }

      const result = await regenerateImage(prompt, oldFilePath);

      if (!result.success) {
        return res.status(500).json({ error: result.error || "Failed to regenerate image" });
      }

      res.json({
        success: true,
        publicUrl: result.publicUrl,
        filePath: result.filePath,
      });
    } catch (error) {
      console.error("Image regeneration error:", error);
      res.status(500).json({ error: "Failed to regenerate image" });
    }
  });

  // --- ADMIN PRODUCT ROUTES ---
  app.post("/api/admin/products", requireAdmin, createCrudHandler(
    insertProductSchema, storage.createProduct.bind(storage), "Failed to create product"
  ));
  app.put("/api/admin/products/:id", requireAdmin, createUpdateHandler(
    storage.updateProduct.bind(storage), "Product not found", "Failed to update product"
  ));
  app.delete("/api/admin/products/:id", requireAdmin, createDeleteHandler(
    storage.deleteProduct.bind(storage), "Product not found", "Failed to delete product"
  ));

  // --- ADMIN CLUSTER ROUTES ---
  app.post("/api/admin/clusters", requireAdmin, createCrudHandler(
    insertClusterSchema, storage.createCluster.bind(storage), "Failed to create cluster"
  ));
  app.put("/api/admin/clusters/:id", requireAdmin, createUpdateHandler(
    storage.updateCluster.bind(storage), "Cluster not found", "Failed to update cluster"
  ));
  app.delete("/api/admin/clusters/:id", requireAdmin, createDeleteHandler(
    storage.deleteCluster.bind(storage), "Cluster not found", "Failed to delete cluster"
  ));

  // --- ADMIN SCIENCE ARTICLE ROUTES ---
  app.post("/api/admin/science-articles", requireAdmin, createCrudHandler(
    insertScienceArticleSchema, storage.createScienceArticle.bind(storage), "Failed to create article"
  ));
  app.put("/api/admin/science-articles/:id", requireAdmin, createUpdateHandler(
    storage.updateScienceArticle.bind(storage), "Article not found", "Failed to update article"
  ));
  app.delete("/api/admin/science-articles/:id", requireAdmin, createDeleteHandler(
    storage.deleteScienceArticle.bind(storage), "Article not found", "Failed to delete article"
  ));

  // --- ADMIN DOCUMENT ROUTES (Knowledge Base) ---
  app.get("/api/admin/documents", requireAdmin, async (req, res) => {
    try {
      const { status, search, limit } = req.query;

      if (search) {
        const documents = await storage.searchDocuments(
          search as string,
          limit ? parseInt(limit as string) : undefined
        );
        return res.json(documents);
      }

      if (status) {
        const documents = await storage.getDocumentsByStatus(status as string);
        return res.json(documents);
      }

      const documents = await storage.getAllDocuments();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  app.get("/api/admin/documents/:id", requireAdmin, async (req, res) => {
    try {
      const document = await storage.getDocument(req.params.id);
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }
      res.json(document);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch document" });
    }
  });

  app.get("/api/admin/documents/:id/chunks", requireAdmin, async (req, res) => {
    try {
      const chunks = await storage.getDocumentChunks(req.params.id);
      res.json(chunks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch document chunks" });
    }
  });

  app.post("/api/admin/documents", requireAdmin, createCrudHandler(
    insertDocumentSchema, storage.createDocument.bind(storage), "Failed to create document"
  ));
  app.put("/api/admin/documents/:id", requireAdmin, createUpdateHandler(
    storage.updateDocument.bind(storage), "Document not found", "Failed to update document"
  ));
  app.delete("/api/admin/documents/:id", requireAdmin, createDeleteHandler(
    storage.deleteDocument.bind(storage), "Document not found", "Failed to delete document"
  ));

  app.post("/api/admin/documents/:id/chunks", requireAdmin, async (req, res) => {
    try {
      const { chunks } = req.body;
      if (!Array.isArray(chunks)) {
        return res.status(400).json({ error: "chunks must be an array" });
      }
      const documentId = req.params.id;
      const chunksWithDocId = chunks.map((chunk: any, index: number) => ({
        ...chunk,
        documentId,
        chunkIndex: chunk.chunkIndex ?? index
      }));
      const createdChunks = await storage.bulkCreateDocumentChunks(chunksWithDocId);
      res.json(createdChunks);
    } catch (error) {
      res.status(500).json({ error: "Failed to create document chunks" });
    }
  });

  app.delete("/api/admin/documents/:id/chunks", requireAdmin, async (req, res) => {
    try {
      await storage.deleteDocumentChunks(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete document chunks" });
    }
  });

  // Upload and transcribe a document (PDF, TXT, MD)
  app.post("/api/admin/documents/upload", requireAdmin, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const file = req.file;
      let extractedText = '';
      let documentType = 'text';

      // Extract text based on file type
      if (file.mimetype === 'application/pdf' || file.originalname.endsWith('.pdf')) {
        documentType = 'pdf';
        const pdfResult = await parsePdfBuffer(file.buffer, file.originalname);
        if (!pdfResult.success) {
          return res.status(400).json(pdfResult);
        }
        extractedText = pdfResult.text;
      } else if (file.mimetype === 'text/plain' || file.originalname.endsWith('.txt')) {
        documentType = 'txt';
        extractedText = file.buffer.toString('utf-8');
      } else if (file.mimetype === 'text/markdown' || file.originalname.endsWith('.md')) {
        documentType = 'markdown';
        extractedText = file.buffer.toString('utf-8');
      } else {
        return res.status(400).json({ error: "Unsupported file type. Please upload PDF, TXT, or MD files." });
      }

      if (!extractedText.trim()) {
        return res.status(400).json({ error: "No text content found in the uploaded file." });
      }

      // Clean up the extracted text
      const cleanText = extractedText
        .replace(/\r\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      // Create document record
      const title = req.body.title || file.originalname.replace(/\.[^/.]+$/, '');
      const wordCount = cleanText.split(/\s+/).filter(Boolean).length;

      const document = await storage.createDocument({
        title,
        sourceType: documentType,
        rawText: extractedText,
        cleanText,
        wordCount,
        status: 'uploaded',
        metadata: {
          originalFilename: file.originalname,
          fileSize: file.size,
          mimeType: file.mimetype,
          uploadedAt: new Date().toISOString()
        } as Record<string, any>
      });

      res.json({
        success: true,
        document,
        extractedChars: cleanText.length,
        wordCount
      });
    } catch (error) {
      console.error('Document upload error:', error);
      res.status(500).json({ error: "Failed to upload and process document" });
    }
  });

  // Index a document (chunk its content and mark as indexed)
  app.post("/api/admin/documents/:id/index", requireAdmin, async (req, res) => {
    try {
      const documentId = req.params.id;
      const document = await storage.getDocument(documentId);

      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }

      // Mark as processing
      await storage.updateDocument(documentId, { status: 'processing' });

      // Get the text content
      const textContent = document.cleanText || document.rawText || '';

      if (!textContent.trim()) {
        await storage.updateDocument(documentId, { status: 'failed', errorMessage: 'No text content to index' });
        return res.status(400).json({ error: "Document has no text content to index" });
      }

      // Delete existing chunks
      await storage.deleteDocumentChunks(documentId);

      // Simple chunking: split into ~500 word chunks
      const words = textContent.split(/\s+/).filter(w => w);
      const chunkSize = 500;
      const chunks: { content: string; chunkIndex: number; tokenCount: number; documentId: string }[] = [];

      for (let i = 0; i < words.length; i += chunkSize) {
        const chunkWords = words.slice(i, i + chunkSize);
        const content = chunkWords.join(' ');
        chunks.push({
          documentId,
          chunkIndex: Math.floor(i / chunkSize),
          content,
          tokenCount: Math.ceil(chunkWords.length * 1.3), // Rough token estimate
        });
      }

      // If no chunks created (very short content), create a single chunk
      if (chunks.length === 0 && textContent.trim()) {
        chunks.push({
          documentId,
          chunkIndex: 0,
          content: textContent.trim(),
          tokenCount: Math.ceil(words.length * 1.3),
        });
      }

      // Save chunks
      await storage.bulkCreateDocumentChunks(chunks);

      // Mark as indexed
      const updatedDoc = await storage.updateDocument(documentId, {
        status: 'indexed',
        cleanText: textContent,
        errorMessage: null
      });

      res.json({
        success: true,
        document: updatedDoc,
        chunksCreated: chunks.length
      });
    } catch (error) {
      console.error('Failed to index document:', error);
      try {
        await storage.updateDocument(req.params.id, {
          status: 'failed',
          errorMessage: error instanceof Error ? error.message : 'Unknown error'
        });
      } catch { }
      res.status(500).json({ error: "Failed to index document" });
    }
  });

  // --- ADMIN SEO KEYWORD ROUTES ---
  app.get("/api/admin/seo-keywords", requireAdmin, async (req, res) => {
    try {
      const { status, opportunities, minRelevance, maxDifficulty, minVolume, limit } = req.query;

      if (opportunities === 'true') {
        const keywords = await storage.getHighOpportunityKeywords({
          minRelevance: minRelevance ? parseInt(minRelevance as string) : undefined,
          maxDifficulty: maxDifficulty ? parseInt(maxDifficulty as string) : undefined,
          minVolume: minVolume ? parseInt(minVolume as string) : undefined,
          limit: limit ? parseInt(limit as string) : undefined
        });
        return res.json(keywords);
      }

      if (status) {
        const keywords = await storage.getSeoKeywordsByStatus(status as string);
        return res.json(keywords);
      }

      const keywords = await storage.getAllSeoKeywords();
      res.json(keywords);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SEO keywords" });
    }
  });

  app.get("/api/admin/seo-keywords/:id", requireAdmin, async (req, res) => {
    try {
      const keyword = await storage.getSeoKeyword(req.params.id);
      if (!keyword) {
        return res.status(404).json({ error: "SEO keyword not found" });
      }
      res.json(keyword);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SEO keyword" });
    }
  });

  app.post("/api/admin/seo-keywords", requireAdmin, createCrudHandler(
    insertSeoKeywordSchema, storage.createSeoKeyword.bind(storage), "Failed to create SEO keyword"
  ));

  app.post("/api/admin/seo-keywords/bulk", requireAdmin, async (req, res) => {
    try {
      const { keywords } = req.body;
      if (!Array.isArray(keywords)) {
        return res.status(400).json({ error: "keywords must be an array" });
      }
      const validatedKeywords = keywords.map((k: any) => insertSeoKeywordSchema.parse(k));
      const createdKeywords = await storage.bulkCreateSeoKeywords(validatedKeywords);
      res.json(createdKeywords);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      res.status(500).json({ error: "Failed to bulk create SEO keywords" });
    }
  });

  app.put("/api/admin/seo-keywords/:id", requireAdmin, createUpdateHandler(
    storage.updateSeoKeyword.bind(storage), "Keyword not found", "Failed to update SEO keyword"
  ));
  app.delete("/api/admin/seo-keywords/:id", requireAdmin, createDeleteHandler(
    storage.deleteSeoKeyword.bind(storage), "Keyword not found", "Failed to delete SEO keyword"
  ));

  // --- ADMIN MAGIC PAGE SUGGESTION ROUTES ---
  app.get("/api/admin/magic-pages", requireAdmin, async (req, res) => {
    try {
      const { status, keywordId } = req.query;

      if (keywordId) {
        const suggestion = await storage.getMagicPageSuggestionByKeyword(keywordId as string);
        return res.json(suggestion ? [suggestion] : []);
      }

      if (status) {
        const suggestions = await storage.getMagicPageSuggestionsByStatus(status as string);
        return res.json(suggestions);
      }

      const suggestions = await storage.getAllMagicPageSuggestions();
      res.json(suggestions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch magic page suggestions" });
    }
  });

  app.get("/api/admin/magic-pages/:id", requireAdmin, async (req, res) => {
    try {
      const suggestion = await storage.getMagicPageSuggestion(req.params.id);
      if (!suggestion) {
        return res.status(404).json({ error: "Magic page suggestion not found" });
      }
      res.json(suggestion);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch magic page suggestion" });
    }
  });

  app.post("/api/admin/magic-pages", requireAdmin, createCrudHandler(
    insertMagicPageSuggestionSchema, storage.createMagicPageSuggestion.bind(storage), "Failed to create magic page suggestion"
  ));
  app.put("/api/admin/magic-pages/:id", requireAdmin, createUpdateHandler(
    storage.updateMagicPageSuggestion.bind(storage), "Suggestion not found", "Failed to update magic page suggestion"
  ));
  app.delete("/api/admin/magic-pages/:id", requireAdmin, createDeleteHandler(
    storage.deleteMagicPageSuggestion.bind(storage), "Suggestion not found", "Failed to delete magic page suggestion"
  ));

  // --- ADMIN MAGIC PAGE GENERATOR ROUTES ---
  const { magicPageGenerator } = await import("./services/magic-page-generator");

  app.post("/api/admin/magic-pages/suggest", requireAdmin, async (req, res) => {
    try {
      const { minScore, limit } = req.body;
      const suggestions = await magicPageGenerator.suggestPagesFromKeywords({
        minScore: minScore ?? 50,
        limit: limit ?? 10
      });

      const created = [];
      for (const suggestion of suggestions) {
        const saved = await storage.createMagicPageSuggestion(suggestion);
        created.push(saved);
      }

      res.json({
        success: true,
        count: created.length,
        suggestions: created
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate suggestions" });
    }
  });

  app.post("/api/admin/magic-pages/:id/outline", requireAdmin, async (req, res) => {
    try {
      const suggestion = await magicPageGenerator.generateOutline(req.params.id);
      res.json(suggestion);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to generate outline" });
    }
  });

  app.post("/api/admin/magic-pages/:id/draft", requireAdmin, async (req, res) => {
    try {
      const suggestion = await magicPageGenerator.generateDraft(req.params.id);
      res.json(suggestion);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to generate draft" });
    }
  });

  app.post("/api/admin/magic-pages/:id/publish", requireAdmin, async (req, res) => {
    try {
      const page = await magicPageGenerator.publishSuggestionAsPage(req.params.id);
      res.json({
        success: true,
        page
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to publish page" });
    }
  });

  app.post("/api/admin/magic-pages/:id/reject", requireAdmin, async (req, res) => {
    try {
      const { reason } = req.body;
      const suggestion = await magicPageGenerator.rejectSuggestion(req.params.id, reason);
      res.json(suggestion);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to reject suggestion" });
    }
  });

  app.get("/api/admin/magic-pages/:id/details", requireAdmin, async (req, res) => {
    try {
      const details = await magicPageGenerator.getSuggestionWithKeyword(req.params.id);
      res.json(details);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch suggestion details" });
    }
  });

  // --- ADMIN CMS SETTINGS ROUTES ---
  app.get("/api/admin/settings", requireAdmin, async (req, res) => {
    try {
      const { category } = req.query;

      if (category) {
        const settings = await storage.getCmsSettingsByCategory(category as string);
        return res.json(settings);
      }

      const settings = await storage.getAllCmsSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch CMS settings" });
    }
  });

  app.get("/api/admin/settings/:key", requireAdmin, async (req, res) => {
    try {
      const setting = await storage.getCmsSetting(req.params.key);
      if (!setting) {
        return res.status(404).json({ error: "Setting not found" });
      }
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch setting" });
    }
  });

  app.put("/api/admin/settings/:key", requireAdmin, async (req, res) => {
    try {
      const { value, description, category } = req.body;
      if (value === undefined) {
        return res.status(400).json({ error: "value is required" });
      }
      const setting = await storage.setCmsSetting(req.params.key, value, description, category);
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Failed to update setting" });
    }
  });

  app.delete("/api/admin/settings/:key", requireAdmin, async (req, res) => {
    try {
      await storage.deleteCmsSetting(req.params.key);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete setting" });
    }
  });

  // --- ADMIN SEO SCANNER ROUTES ---
  const { seoScanner } = await import("./services/seo-scanner");

  app.post("/api/admin/seo/analyze-keyword", requireAdmin, async (req, res) => {
    try {
      const { keyword } = req.body;
      if (!keyword) {
        return res.status(400).json({ error: "keyword is required" });
      }
      const analysis = await seoScanner.analyzeKeyword(keyword);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: "Failed to analyze keyword" });
    }
  });

  app.post("/api/admin/seo/analyze-keywords", requireAdmin, async (req, res) => {
    try {
      const { keywords } = req.body;
      if (!Array.isArray(keywords) || keywords.length === 0) {
        return res.status(400).json({ error: "keywords array is required" });
      }
      const analyses = await Promise.all(
        keywords.map((kw: string) => seoScanner.analyzeKeyword(kw))
      );
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ error: "Failed to analyze keywords" });
    }
  });

  app.post("/api/admin/seo/scan-document/:id", requireAdmin, async (req, res) => {
    try {
      const documentId = req.params.id;
      const keywordSuggestions = await seoScanner.scanDocumentAndSaveKeywords(documentId);

      const createdKeywords = await storage.bulkCreateSeoKeywords(keywordSuggestions);

      res.json({
        success: true,
        keywordsFound: createdKeywords.length,
        keywords: createdKeywords
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to scan document" });
    }
  });

  app.get("/api/admin/seo/opportunities", requireAdmin, async (req, res) => {
    try {
      const { minRelevance, maxDifficulty, minVolume, limit } = req.query;
      const opportunities = await seoScanner.findOpportunities({
        minRelevance: minRelevance ? parseInt(minRelevance as string) : undefined,
        maxDifficulty: maxDifficulty ? parseInt(maxDifficulty as string) : undefined,
        minVolume: minVolume ? parseInt(minVolume as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined
      });
      res.json(opportunities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SEO opportunities" });
    }
  });

  app.post("/api/admin/seo/suggest-keywords", requireAdmin, async (req, res) => {
    try {
      const { seeds, limit } = req.body;
      if (!Array.isArray(seeds) || seeds.length === 0) {
        return res.status(400).json({ error: "seeds array is required" });
      }
      const suggestions = await seoScanner.getSuggestedKeywords(seeds, limit || 10);
      res.json(suggestions);
    } catch (error) {
      res.status(500).json({ error: "Failed to suggest keywords" });
    }
  });

  app.post("/api/admin/seo/extract-keywords", requireAdmin, async (req, res) => {
    try {
      const { text, maxKeywords } = req.body;
      if (!text) {
        return res.status(400).json({ error: "text is required" });
      }
      const keywords = await seoScanner.extractKeywordsFromText(text, maxKeywords || 20);
      res.json(keywords);
    } catch (error) {
      res.status(500).json({ error: "Failed to extract keywords" });
    }
  });

  // --- ADMIN LINKING RULES ROUTES ---
  const { internalLinkingService } = await import("./services/internal-linking");
  const { insertLinkingRuleSchema, insertCtaTemplateSchema } = await import("@shared/schema");

  app.get("/api/admin/linking-rules", requireAdmin, async (req, res) => {
    try {
      const { ruleType, active } = req.query;

      if (active === 'true') {
        const rules = await storage.getActiveLinkingRules();
        return res.json(rules);
      }

      if (ruleType) {
        const rules = await storage.getLinkingRulesByType(ruleType as string);
        return res.json(rules);
      }

      const rules = await storage.getAllLinkingRules();
      res.json(rules);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch linking rules" });
    }
  });

  app.get("/api/admin/linking-rules/:id", requireAdmin, async (req, res) => {
    try {
      const rule = await storage.getLinkingRule(req.params.id);
      if (!rule) {
        return res.status(404).json({ error: "Linking rule not found" });
      }
      res.json(rule);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch linking rule" });
    }
  });

  app.post("/api/admin/linking-rules", requireAdmin, async (req, res) => {
    try {
      const validated = insertLinkingRuleSchema.parse(req.body);
      const rule = await storage.createLinkingRule(validated);
      res.json(rule);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      res.status(500).json({ error: "Failed to create linking rule" });
    }
  });

  app.put("/api/admin/linking-rules/:id", requireAdmin, async (req, res) => {
    try {
      const rule = await storage.updateLinkingRule(req.params.id, req.body);
      res.json(rule);
    } catch (error) {
      res.status(500).json({ error: "Failed to update linking rule" });
    }
  });

  app.delete("/api/admin/linking-rules/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteLinkingRule(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete linking rule" });
    }
  });

  app.post("/api/admin/linking-rules/auto-generate", requireAdmin, async (req, res) => {
    try {
      const newRules = await internalLinkingService.autoGenerateLinkingRulesFromPages();
      res.json({
        success: true,
        count: newRules.length,
        rules: newRules
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to auto-generate linking rules" });
    }
  });

  // --- ADMIN CTA TEMPLATES ROUTES ---
  app.get("/api/admin/cta-templates", requireAdmin, async (req, res) => {
    try {
      const { position, active } = req.query;

      if (active === 'true') {
        const templates = await storage.getActiveCtaTemplates();
        return res.json(templates);
      }

      if (position) {
        const templates = await storage.getCtaTemplatesByPosition(position as string);
        return res.json(templates);
      }

      const templates = await storage.getAllCtaTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch CTA templates" });
    }
  });

  app.get("/api/admin/cta-templates/:id", requireAdmin, async (req, res) => {
    try {
      const template = await storage.getCtaTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ error: "CTA template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch CTA template" });
    }
  });

  app.post("/api/admin/cta-templates", requireAdmin, async (req, res) => {
    try {
      const validated = insertCtaTemplateSchema.parse(req.body);
      const template = await storage.createCtaTemplate(validated);
      res.json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      res.status(500).json({ error: "Failed to create CTA template" });
    }
  });

  app.put("/api/admin/cta-templates/:id", requireAdmin, async (req, res) => {
    try {
      const template = await storage.updateCtaTemplate(req.params.id, req.body);
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to update CTA template" });
    }
  });

  app.delete("/api/admin/cta-templates/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteCtaTemplate(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete CTA template" });
    }
  });

  // --- INTERNAL LINKING ANALYSIS ROUTES ---
  app.post("/api/admin/linking/analyze", requireAdmin, async (req, res) => {
    try {
      const { content, pageClusterKey, excludePaths } = req.body;
      if (!content) {
        return res.status(400).json({ error: "content is required" });
      }
      const analysis = await internalLinkingService.analyzeContent(content, {
        pageClusterKey,
        excludePaths
      });
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: "Failed to analyze content" });
    }
  });

  app.post("/api/admin/linking/apply", requireAdmin, async (req, res) => {
    try {
      const { content, pageClusterKey, excludePaths, maxLinks } = req.body;
      if (!content) {
        return res.status(400).json({ error: "content is required" });
      }
      const enhancedContent = await internalLinkingService.applyInternalLinks(content, {
        pageClusterKey,
        excludePaths,
        maxLinks
      });
      res.json({ enhancedContent });
    } catch (error) {
      res.status(500).json({ error: "Failed to apply internal links" });
    }
  });

  app.get("/api/admin/linking/enhance/:pageId", requireAdmin, async (req, res) => {
    try {
      const result = await internalLinkingService.getContentWithEnhancements(req.params.pageId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to enhance page content" });
    }
  });

  // --- MAGIC AI SETTINGS ROUTES ---
  app.get("/api/admin/magic-ai-settings", requireAdmin, async (req, res) => {
    try {
      const settings = await storage.getMagicAiSettings();
      if (!settings) {
        return res.json({
          id: 1,
          magicPageBasePrompt: '',
          updatedAt: new Date()
        });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Magic AI settings" });
    }
  });

  const updateMagicAiSettingsSchema = z.object({
    magicPageBasePrompt: z.string(),
  });

  app.put("/api/admin/magic-ai-settings", requireAdmin, async (req, res) => {
    try {
      const validated = updateMagicAiSettingsSchema.parse(req.body);
      const settings = await storage.updateMagicAiSettings(validated.magicPageBasePrompt);
      res.json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      res.status(500).json({ error: "Failed to update Magic AI settings" });
    }
  });

  // --- HTML TEMPLATES ROUTES (Andara Component System) ---
  app.get("/api/admin/html-templates", requireAdmin, async (req, res) => {
    try {
      const { type } = req.query;

      if (type) {
        const templates = await storage.getHtmlTemplatesByType(type as string);
        return res.json(templates);
      }

      const templates = await storage.getAllHtmlTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch HTML templates" });
    }
  });

  app.get("/api/admin/html-templates/:id", requireAdmin, async (req, res) => {
    try {
      const template = await storage.getHtmlTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ error: "HTML template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch HTML template" });
    }
  });

  app.get("/api/admin/html-templates/by-slug/:slug", requireAdmin, async (req, res) => {
    try {
      const template = await storage.getHtmlTemplateBySlug(req.params.slug);
      if (!template) {
        return res.status(404).json({ error: "HTML template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch HTML template" });
    }
  });

  app.post("/api/admin/html-templates", requireAdmin, async (req, res) => {
    try {
      const validated = insertHtmlTemplateSchema.parse(req.body);
      const template = await storage.createHtmlTemplate(validated);
      res.json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      res.status(500).json({ error: "Failed to create HTML template" });
    }
  });

  app.put("/api/admin/html-templates/:id", requireAdmin, async (req, res) => {
    try {
      const template = await storage.updateHtmlTemplate(req.params.id, req.body);
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to update HTML template" });
    }
  });

  app.delete("/api/admin/html-templates/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteHtmlTemplate(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete HTML template" });
    }
  });

  // Public route for fetching templates by slug
  app.get("/api/html-templates/by-slug/:slug", async (req, res) => {
    try {
      const template = await storage.getHtmlTemplateBySlug(req.params.slug);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch template" });
    }
  });

  // Public route for fetching templates by ID
  app.get("/api/html-templates/:id", async (req, res) => {
    try {
      const template = await storage.getHtmlTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch template" });
    }
  });

  // --- PAGE IMAGE PROMPTS ROUTES (AI-generated image slots) ---
  app.get("/api/admin/pages/:pageId/image-prompts", requireAdmin, async (req, res) => {
    try {
      const prompts = await storage.getPageImagePrompts(req.params.pageId);
      res.json(prompts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch image prompts" });
    }
  });

  app.get("/api/admin/image-prompts/:id", requireAdmin, async (req, res) => {
    try {
      const prompt = await storage.getPageImagePrompt(req.params.id);
      if (!prompt) {
        return res.status(404).json({ error: "Image prompt not found" });
      }
      res.json(prompt);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch image prompt" });
    }
  });

  app.post("/api/admin/pages/:pageId/image-prompts", requireAdmin, async (req, res) => {
    try {
      const validated = insertPageImagePromptSchema.parse({
        ...req.body,
        pageId: req.params.pageId
      });
      const prompt = await storage.createPageImagePrompt(validated);
      res.json(prompt);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      res.status(500).json({ error: "Failed to create image prompt" });
    }
  });

  app.post("/api/admin/pages/:pageId/image-prompts/bulk", requireAdmin, async (req, res) => {
    try {
      const { prompts } = req.body;
      if (!prompts || !Array.isArray(prompts)) {
        return res.status(400).json({ error: "prompts array is required" });
      }
      const validated = prompts.map((p: any) =>
        insertPageImagePromptSchema.parse({
          ...p,
          pageId: req.params.pageId
        })
      );
      const created = await storage.bulkCreatePageImagePrompts(validated);
      res.json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      res.status(500).json({ error: "Failed to create image prompts" });
    }
  });

  app.put("/api/admin/image-prompts/:id", requireAdmin, async (req, res) => {
    try {
      const prompt = await storage.updatePageImagePrompt(req.params.id, req.body);
      res.json(prompt);
    } catch (error) {
      res.status(500).json({ error: "Failed to update image prompt" });
    }
  });

  app.delete("/api/admin/image-prompts/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deletePageImagePrompt(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete image prompt" });
    }
  });

  app.delete("/api/admin/pages/:pageId/image-prompts", requireAdmin, async (req, res) => {
    try {
      await storage.deleteAllPageImagePrompts(req.params.pageId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete image prompts" });
    }
  });

  // Generate image for a single prompt slot
  app.post("/api/admin/image-prompts/:id/generate", requireAdmin, async (req, res) => {
    try {
      const prompt = await storage.getPageImagePrompt(req.params.id);
      if (!prompt) {
        return res.status(404).json({ error: "Image prompt not found" });
      }

      await storage.updatePageImagePrompt(req.params.id, { status: "generating" });

      const { generateImage, deleteImage } = await import("./services/image-generator");

      const finalPrompt = prompt.promptFinal || prompt.promptTemplate || "Abstract visual with golden crystalline patterns";
      const result = await generateImage(finalPrompt);

      if (result.success && result.publicUrl) {
        if (prompt.assetPath) {
          deleteImage(prompt.assetPath);
        }

        const updated = await storage.updatePageImagePrompt(req.params.id, {
          status: "ready",
          assetUrl: result.publicUrl,
          assetPath: result.filePath
        });
        res.json(updated);
      } else {
        await storage.updatePageImagePrompt(req.params.id, {
          status: "failed",
          metadata: { ...(prompt.metadata || {}), lastError: result.error }
        });
        res.status(500).json({ error: result.error || "Failed to generate image" });
      }
    } catch (error) {
      console.error("Image generation error:", error);
      res.status(500).json({ error: "Failed to generate image" });
    }
  });

  // Detect image slots for a page using AI
  app.post("/api/admin/pages/:pageId/detect-slots", requireAdmin, async (req, res) => {
    try {
      const { detectImageSlots } = await import("./services/image-slot-detector");
      const page = await storage.getPageByKey(req.params.pageId)
        || await storage.getPage(req.params.pageId);

      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }

      const slots = await detectImageSlots(page);
      res.json(slots);
    } catch (error) {
      console.error("Slot detection error:", error);
      res.status(500).json({ error: "Failed to detect image slots" });
    }
  });

  // Synthesize prompts for detected slots using AI
  app.post("/api/admin/pages/:pageId/synthesize-prompts", requireAdmin, async (req, res) => {
    try {
      const { synthesizePrompts } = await import("./services/prompt-synthesizer");
      const page = await storage.getPageByKey(req.params.pageId)
        || await storage.getPage(req.params.pageId);

      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }

      const { slots } = req.body;
      if (!slots || !Array.isArray(slots)) {
        return res.status(400).json({ error: "slots array is required" });
      }

      const synthesized = await synthesizePrompts(page, slots);
      res.json(synthesized);
    } catch (error) {
      console.error("Prompt synthesis error:", error);
      res.status(500).json({ error: "Failed to synthesize prompts" });
    }
  });

  // --- ANDARA LIBRARY / BIG MIND CHAT ---
  app.post("/api/admin-chat", requireAdmin, async (req, res) => {
    try {
      const { chat } = await import("./services/andara-chat");
      const { messages, includeContext = true } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      const response = await chat(messages, includeContext);
      res.json({ response });
    } catch (error) {
      console.error("Admin chat error:", error);
      res.status(500).json({ error: "Failed to get response from Andara Library" });
    }
  });

  app.get("/api/admin-chat/overview", requireAdmin, async (req, res) => {
    try {
      const { getSiteOverview } = await import("./services/andara-chat");
      const overview = await getSiteOverview();
      res.json(overview);
    } catch (error) {
      console.error("Site overview error:", error);
      res.status(500).json({ error: "Failed to get site overview" });
    }
  });

  // --- BIGMIND CMS MANAGER (Advanced AI with function calling) ---
  app.post("/api/admin/bigmind/chat", requireAdmin, async (req, res) => {
    try {
      const { chatWithFunctions } = await import("./services/bigmind-cms");
      const { messages, model } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      const result = await chatWithFunctions(messages, undefined, model);
      res.json(result);
    } catch (error) {
      console.error("BigMind CMS error:", error);
      res.status(500).json({ error: "Failed to process BigMind request" });
    }
  });

  // Streaming chat endpoint for modern UI
  app.post("/api/admin/bigmind/chat/stream", requireAdmin, async (req, res) => {
    const { handleStreamingChat } = await import("./services/streaming-chat");
    await handleStreamingChat(req, res);
  });

  app.get("/api/admin/bigmind/context", requireAdmin, async (req, res) => {
    try {
      const { getSummarizedContext, CLUSTER_ONTOLOGY, ZONE_GUIDELINES } = await import("./services/bigmind-cms");
      const context = await getSummarizedContext();
      res.json({
        context,
        clusters: CLUSTER_ONTOLOGY,
        zones: ZONE_GUIDELINES
      });
    } catch (error) {
      console.error("BigMind context error:", error);
      res.status(500).json({ error: "Failed to get BigMind context" });
    }
  });

  // --- BIGMIND CHAT SESSIONS (Persistent chat history) ---
  app.get("/api/admin/bigmind/sessions", requireAdmin, async (req, res) => {
    try {
      const sessions = await storage.getAllBigmindSessions();
      res.json(sessions);
    } catch (error) {
      console.error("Get BigMind sessions error:", error);
      res.status(500).json({ error: "Failed to get sessions" });
    }
  });

  app.post("/api/admin/bigmind/sessions", requireAdmin, async (req, res) => {
    try {
      const { title, mode } = req.body;
      const session = await storage.createBigmindSession({
        title: title || 'New Chat',
        mode: mode || 'cms'
      });
      res.json(session);
    } catch (error) {
      console.error("Create BigMind session error:", error);
      res.status(500).json({ error: "Failed to create session" });
    }
  });

  app.get("/api/admin/bigmind/sessions/:id", requireAdmin, async (req, res) => {
    try {
      const session = await storage.getBigmindSession(req.params.id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      console.error("Get BigMind session error:", error);
      res.status(500).json({ error: "Failed to get session" });
    }
  });

  app.put("/api/admin/bigmind/sessions/:id", requireAdmin, async (req, res) => {
    try {
      const session = await storage.updateBigmindSession(req.params.id, req.body);
      res.json(session);
    } catch (error) {
      console.error("Update BigMind session error:", error);
      res.status(500).json({ error: "Failed to update session" });
    }
  });

  app.delete("/api/admin/bigmind/sessions/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteBigmindSession(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete BigMind session error:", error);
      res.status(500).json({ error: "Failed to delete session" });
    }
  });

  app.get("/api/admin/bigmind/sessions/:id/messages", requireAdmin, async (req, res) => {
    try {
      const messages = await storage.getBigmindMessages(req.params.id);
      res.json(messages);
    } catch (error) {
      console.error("Get BigMind messages error:", error);
      res.status(500).json({ error: "Failed to get messages" });
    }
  });

  app.post("/api/admin/bigmind/sessions/:id/messages", requireAdmin, async (req, res) => {
    try {
      const { role, content, functionCalls, attachments } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }
      const message = await storage.createBigmindMessage({
        sessionId: req.params.id,
        role: role || 'user',
        content,
        functionCalls,
        attachments
      });
      res.json(message);
    } catch (error) {
      console.error("Create BigMind message error:", error);
      res.status(500).json({ error: "Failed to create message" });
    }
  });

  // --- BIGMIND SUGGESTIONS (AI recommendations from chat) ---
  app.get("/api/admin/bigmind/suggestions", requireAdmin, async (req, res) => {
    try {
      const { status, pageKey } = req.query;
      let suggestions;
      if (status) {
        suggestions = await storage.getBigmindSuggestionsByStatus(status as string);
      } else if (pageKey) {
        suggestions = await storage.getBigmindSuggestionsByPageKey(pageKey as string);
      } else {
        suggestions = await storage.getAllBigmindSuggestions();
      }
      res.json(suggestions);
    } catch (error) {
      console.error("Get BigMind suggestions error:", error);
      res.status(500).json({ error: "Failed to get suggestions" });
    }
  });

  app.get("/api/admin/bigmind/suggestions/pending", requireAdmin, async (req, res) => {
    try {
      const suggestions = await storage.getPendingBigmindSuggestions();
      res.json(suggestions);
    } catch (error) {
      console.error("Get pending suggestions error:", error);
      res.status(500).json({ error: "Failed to get pending suggestions" });
    }
  });

  app.post("/api/admin/bigmind/suggestions", requireAdmin, async (req, res) => {
    try {
      const suggestion = await storage.createBigmindSuggestion(req.body);
      res.json(suggestion);
    } catch (error) {
      console.error("Create BigMind suggestion error:", error);
      res.status(500).json({ error: "Failed to create suggestion" });
    }
  });

  app.post("/api/admin/bigmind/suggestions/bulk", requireAdmin, async (req, res) => {
    try {
      const { suggestions } = req.body;
      if (!Array.isArray(suggestions)) {
        return res.status(400).json({ error: "suggestions must be an array" });
      }
      const created = await storage.bulkCreateBigmindSuggestions(suggestions);
      res.json(created);
    } catch (error) {
      console.error("Bulk create suggestions error:", error);
      res.status(500).json({ error: "Failed to create suggestions" });
    }
  });

  app.post("/api/admin/bigmind/suggestions/:id/apply", requireAdmin, async (req, res) => {
    try {
      const suggestion = await storage.applyBigmindSuggestion(req.params.id);
      res.json(suggestion);
    } catch (error) {
      console.error("Apply BigMind suggestion error:", error);
      res.status(500).json({ error: "Failed to apply suggestion" });
    }
  });

  app.post("/api/admin/bigmind/suggestions/:id/dismiss", requireAdmin, async (req, res) => {
    try {
      const suggestion = await storage.dismissBigmindSuggestion(req.params.id);
      res.json(suggestion);
    } catch (error) {
      console.error("Dismiss BigMind suggestion error:", error);
      res.status(500).json({ error: "Failed to dismiss suggestion" });
    }
  });

  app.delete("/api/admin/bigmind/suggestions/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteBigmindSuggestion(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete BigMind suggestion error:", error);
      res.status(500).json({ error: "Failed to delete suggestion" });
    }
  });

  // --- PAGE AI CHAT SESSIONS (Persistent chat history for page editor) ---
  app.get("/api/admin/page-ai/sessions", requireAdmin, async (req, res) => {
    try {
      const { pageKey } = req.query;
      const sessions = pageKey
        ? await storage.getPageAiSessionsByPageKey(pageKey as string)
        : await storage.getAllPageAiSessions();
      res.json(sessions);
    } catch (error) {
      console.error("Get Page AI sessions error:", error);
      res.status(500).json({ error: "Failed to get sessions" });
    }
  });

  app.post("/api/admin/page-ai/sessions", requireAdmin, async (req, res) => {
    try {
      const { title, pageKey } = req.body;
      const session = await storage.createPageAiSession({
        title: title || 'New Page Chat',
        pageKey: pageKey || null
      });
      res.json(session);
    } catch (error) {
      console.error("Create Page AI session error:", error);
      res.status(500).json({ error: "Failed to create session" });
    }
  });

  app.get("/api/admin/page-ai/sessions/:id", requireAdmin, async (req, res) => {
    try {
      const session = await storage.getPageAiSession(req.params.id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      console.error("Get Page AI session error:", error);
      res.status(500).json({ error: "Failed to get session" });
    }
  });

  app.put("/api/admin/page-ai/sessions/:id", requireAdmin, async (req, res) => {
    try {
      const session = await storage.updatePageAiSession(req.params.id, req.body);
      res.json(session);
    } catch (error) {
      console.error("Update Page AI session error:", error);
      res.status(500).json({ error: "Failed to update session" });
    }
  });

  app.delete("/api/admin/page-ai/sessions/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deletePageAiSession(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete Page AI session error:", error);
      res.status(500).json({ error: "Failed to delete session" });
    }
  });

  app.get("/api/admin/page-ai/sessions/:id/messages", requireAdmin, async (req, res) => {
    try {
      const messages = await storage.getPageAiMessages(req.params.id);
      res.json(messages);
    } catch (error) {
      console.error("Get Page AI messages error:", error);
      res.status(500).json({ error: "Failed to get messages" });
    }
  });

  app.post("/api/admin/page-ai/sessions/:id/messages", requireAdmin, async (req, res) => {
    try {
      const { role, content, metadata } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }
      const message = await storage.createPageAiMessage({
        sessionId: req.params.id,
        role: role || 'user',
        content,
        metadata
      });
      res.json(message);
    } catch (error) {
      console.error("Create Page AI message error:", error);
      res.status(500).json({ error: "Failed to create message" });
    }
  });

  // --- PAGE MEDIA ASSETS (multiple images per page) ---
  app.get("/api/admin/page-media/:pageKey", requireAdmin, async (req, res) => {
    try {
      const assets = await storage.getPageMediaAssets(req.params.pageKey);
      res.json(assets);
    } catch (error) {
      console.error("Get page media assets error:", error);
      res.status(500).json({ error: "Failed to get page media assets" });
    }
  });

  app.post("/api/admin/page-media", requireAdmin, async (req, res) => {
    try {
      const { pageKey, slotKey, slotType, prompt, status, generatedUrl, generatorModel, metadata } = req.body;
      if (!pageKey || !slotKey || !prompt) {
        return res.status(400).json({ error: "pageKey, slotKey, and prompt are required" });
      }
      const asset = await storage.createPageMediaAsset({
        pageKey,
        slotKey,
        slotType: slotType || 'custom',
        prompt,
        status: status || 'pending',
        generatedUrl,
        generatorModel,
        metadata
      });
      res.json(asset);
    } catch (error) {
      console.error("Create page media asset error:", error);
      res.status(500).json({ error: "Failed to create page media asset" });
    }
  });

  app.put("/api/admin/page-media/:id", requireAdmin, async (req, res) => {
    try {
      const existing = await storage.getPageMediaAsset(req.params.id);
      if (!existing) {
        return res.status(404).json({ error: "Asset not found" });
      }
      const asset = await storage.updatePageMediaAsset(req.params.id, req.body);
      res.json(asset);
    } catch (error) {
      console.error("Update page media asset error:", error);
      res.status(500).json({ error: "Failed to update page media asset" });
    }
  });

  app.delete("/api/admin/page-media/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deletePageMediaAsset(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete page media asset error:", error);
      res.status(500).json({ error: "Failed to delete page media asset" });
    }
  });

  app.delete("/api/admin/page-media/page/:pageKey", requireAdmin, async (req, res) => {
    try {
      await storage.deletePageMediaAssetsByPageKey(req.params.pageKey);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete page media assets error:", error);
      res.status(500).json({ error: "Failed to delete page media assets" });
    }
  });

  // --- ADMIN AI SETTINGS (BigMind Studio preferences) ---
  app.get("/api/admin/ai-settings", requireAdmin, async (req, res) => {
    try {
      const settings = await storage.getAllAdminAiSettings();
      res.json(settings);
    } catch (error) {
      console.error("Get AI settings error:", error);
      res.status(500).json({ error: "Failed to get AI settings" });
    }
  });

  app.get("/api/admin/ai-settings/:key", requireAdmin, async (req, res) => {
    try {
      const setting = await storage.getAdminAiSetting(req.params.key);
      if (!setting) {
        return res.status(404).json({ error: "Setting not found" });
      }
      res.json(setting);
    } catch (error) {
      console.error("Get AI setting error:", error);
      res.status(500).json({ error: "Failed to get AI setting" });
    }
  });

  app.post("/api/admin/ai-settings", requireAdmin, async (req, res) => {
    try {
      const { key, category, label, value, description, isActive, sortOrder, metadata } = req.body;
      if (!key || !label || value === undefined) {
        return res.status(400).json({ error: "Key, label, and value are required" });
      }
      const setting = await storage.createAdminAiSetting({
        key, category: category || 'prompts', label, value, description,
        isActive: isActive ?? true, sortOrder: sortOrder ?? 0, metadata
      });
      res.json(setting);
    } catch (error) {
      console.error("Create AI setting error:", error);
      res.status(500).json({ error: "Failed to create AI setting" });
    }
  });

  app.put("/api/admin/ai-settings/:key", requireAdmin, async (req, res) => {
    try {
      const existing = await storage.getAdminAiSetting(req.params.key);
      if (!existing) {
        return res.status(404).json({ error: "Setting not found" });
      }
      const setting = await storage.updateAdminAiSetting(req.params.key, req.body);
      res.json(setting);
    } catch (error) {
      console.error("Update AI setting error:", error);
      res.status(500).json({ error: "Failed to update AI setting" });
    }
  });

  app.delete("/api/admin/ai-settings/:key", requireAdmin, async (req, res) => {
    try {
      await storage.deleteAdminAiSetting(req.params.key);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete AI setting error:", error);
      res.status(500).json({ error: "Failed to delete AI setting" });
    }
  });

  // --- MAGIC PAGE SESSIONS (BigMind Studio wizard) ---
  app.get("/api/admin/magic-sessions", requireAdmin, async (req, res) => {
    try {
      const sessions = await storage.getAllMagicPageSessions();
      res.json(sessions);
    } catch (error) {
      console.error("Get magic sessions error:", error);
      res.status(500).json({ error: "Failed to get magic sessions" });
    }
  });

  app.get("/api/admin/magic-sessions/:id", requireAdmin, async (req, res) => {
    try {
      const session = await storage.getMagicPageSession(req.params.id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      console.error("Get magic session error:", error);
      res.status(500).json({ error: "Failed to get magic session" });
    }
  });

  app.post("/api/admin/magic-sessions", requireAdmin, async (req, res) => {
    try {
      const { title, sourceType, sourceContent, documentId } = req.body;
      if (!title || !sourceContent) {
        return res.status(400).json({ error: "Title and sourceContent are required" });
      }
      const session = await storage.createMagicPageSession({
        title,
        sourceType: sourceType || 'prompt',
        sourceContent,
        documentId,
        status: 'analyzing'
      });
      res.json(session);
    } catch (error) {
      console.error("Create magic session error:", error);
      res.status(500).json({ error: "Failed to create magic session" });
    }
  });

  app.put("/api/admin/magic-sessions/:id", requireAdmin, async (req, res) => {
    try {
      const existing = await storage.getMagicPageSession(req.params.id);
      if (!existing) {
        return res.status(404).json({ error: "Session not found" });
      }
      const session = await storage.updateMagicPageSession(req.params.id, req.body);
      res.json(session);
    } catch (error) {
      console.error("Update magic session error:", error);
      res.status(500).json({ error: "Failed to update magic session" });
    }
  });

  app.delete("/api/admin/magic-sessions/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteMagicPageSession(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete magic session error:", error);
      res.status(500).json({ error: "Failed to delete magic session" });
    }
  });

  app.post("/api/admin/magic-sessions/:id/generate", requireAdmin, async (req, res) => {
    try {
      const session = await storage.getMagicPageSession(req.params.id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      const { generatePageFromBrief } = await import("./services/ai-startup");
      const result = await generatePageFromBrief(session.sourceContent, session.generatedPath || undefined);

      const updated = await storage.updateMagicPageSession(req.params.id, {
        generatedHtml: result.html,
        analysis: {
          suggestedLayouts: result.layoutsDetected,
          keywords: result.seo.keywords,
          summary: result.seo.description,
          suggestedZone: 2,
          suggestedCluster: 'general',
          outline: []
        },
        status: 'ready'
      });

      res.json(updated);
    } catch (error) {
      console.error("Generate magic page error:", error);
      res.status(500).json({ error: "Failed to generate page" });
    }
  });

  // --- PAGE ENHANCEMENTS (AI-generated suggestions) ---
  app.get("/api/admin/pages/:pageId/enhancements", requireAdmin, async (req, res) => {
    try {
      const enhancements = await storage.getPageEnhancements(req.params.pageId);
      res.json(enhancements);
    } catch (error) {
      console.error("Get page enhancements error:", error);
      res.status(500).json({ error: "Failed to get enhancements" });
    }
  });

  app.get("/api/admin/pages/:pageId/enhancements/pending", requireAdmin, async (req, res) => {
    try {
      const enhancements = await storage.getPendingEnhancements(req.params.pageId);
      res.json(enhancements);
    } catch (error) {
      console.error("Get pending enhancements error:", error);
      res.status(500).json({ error: "Failed to get pending enhancements" });
    }
  });

  app.post("/api/admin/pages/:pageId/enhancements", requireAdmin, async (req, res) => {
    try {
      const enhancement = await storage.createPageEnhancement({
        ...req.body,
        pageId: req.params.pageId
      });
      res.json(enhancement);
    } catch (error) {
      console.error("Create enhancement error:", error);
      res.status(500).json({ error: "Failed to create enhancement" });
    }
  });

  app.post("/api/admin/pages/:pageId/enhancements/bulk", requireAdmin, async (req, res) => {
    try {
      const { enhancements } = req.body;
      if (!Array.isArray(enhancements)) {
        return res.status(400).json({ error: "Enhancements array required" });
      }
      const created = await storage.bulkCreatePageEnhancements(
        enhancements.map((e: any) => ({ ...e, pageId: req.params.pageId }))
      );
      res.json(created);
    } catch (error) {
      console.error("Bulk create enhancements error:", error);
      res.status(500).json({ error: "Failed to create enhancements" });
    }
  });

  app.put("/api/admin/enhancements/:id", requireAdmin, async (req, res) => {
    try {
      const enhancement = await storage.updatePageEnhancement(req.params.id, req.body);
      res.json(enhancement);
    } catch (error) {
      console.error("Update enhancement error:", error);
      res.status(500).json({ error: "Failed to update enhancement" });
    }
  });

  app.delete("/api/admin/enhancements/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deletePageEnhancement(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete enhancement error:", error);
      res.status(500).json({ error: "Failed to delete enhancement" });
    }
  });

  app.post("/api/admin/enhancements/apply", requireAdmin, async (req, res) => {
    try {
      const { enhancementIds, pageId } = req.body;
      if (!Array.isArray(enhancementIds) || !pageId) {
        return res.status(400).json({ error: "enhancementIds array and pageId required" });
      }

      const enhancements = await Promise.all(
        enhancementIds.map(id => storage.getPageEnhancement(id))
      );

      const page = await storage.getPage(pageId);
      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }

      const updates: Record<string, any> = {};
      for (const enhancement of enhancements) {
        if (!enhancement || enhancement.status !== 'pending') continue;

        switch (enhancement.enhancementType) {
          case 'title':
            updates.title = enhancement.suggestedValue;
            break;
          case 'summary':
            updates.summary = enhancement.suggestedValue;
            break;
          case 'seo_title':
            updates.seoTitle = enhancement.suggestedValue;
            break;
          case 'seo_description':
            updates.seoDescription = enhancement.suggestedValue;
            break;
          case 'seo_focus':
            updates.seoFocus = enhancement.suggestedValue;
            break;
          case 'hero_content':
          case 'section_content':
            if (enhancement.fieldName === 'aiStartupHtml') {
              updates.aiStartupHtml = enhancement.suggestedValue;
            } else if (enhancement.fieldName === 'content') {
              updates.content = enhancement.suggestedValue;
            }
            break;
        }
      }

      if (Object.keys(updates).length > 0) {
        await storage.updatePage(pageId, updates);
      }

      await storage.applyEnhancements(enhancementIds);

      res.json({
        success: true,
        appliedCount: enhancementIds.length,
        updates
      });
    } catch (error) {
      console.error("Apply enhancements error:", error);
      res.status(500).json({ error: "Failed to apply enhancements" });
    }
  });

  app.post("/api/admin/enhancements/reject", requireAdmin, async (req, res) => {
    try {
      const { enhancementIds } = req.body;
      if (!Array.isArray(enhancementIds)) {
        return res.status(400).json({ error: "enhancementIds array required" });
      }

      for (const id of enhancementIds) {
        await storage.updatePageEnhancement(id, { status: 'rejected' });
      }

      res.json({ success: true, rejectedCount: enhancementIds.length });
    } catch (error) {
      console.error("Reject enhancements error:", error);
      res.status(500).json({ error: "Failed to reject enhancements" });
    }
  });

  // --- STRIPE E-COMMERCE ROUTES ---
  const { stripeService } = await import("./services/stripeService");
  const { getStripePublishableKey, getUncachableStripeClient } = await import("./services/stripeClient");

  app.get("/api/stripe/config", async (req, res) => {
    try {
      const publishableKey = await getStripePublishableKey();
      res.json({ publishableKey });
    } catch (error) {
      console.error("Get Stripe config error:", error);
      res.status(500).json({ error: "Failed to get Stripe configuration" });
    }
  });

  app.get("/api/stripe/products", async (req, res) => {
    try {
      const products = await stripeService.listProductsWithPrices(true);
      res.json(products);
    } catch (error) {
      console.error("List Stripe products error:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/stripe/products/:productId", async (req, res) => {
    try {
      const product = await stripeService.getProduct(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const prices = await stripeService.getPricesForProduct(req.params.productId);
      res.json({ product, prices });
    } catch (error) {
      console.error("Get Stripe product error:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/stripe/checkout", async (req, res) => {
    try {
      const { priceId, quantity, customerEmail, successUrl, cancelUrl, metadata } = req.body;

      if (!priceId) {
        return res.status(400).json({ error: "priceId is required" });
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const session = await stripeService.createCheckoutSession({
        priceId,
        quantity: quantity || 1,
        customerEmail,
        successUrl: successUrl || `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: cancelUrl || `${baseUrl}/shop`,
        metadata,
      });

      res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
      console.error("Create checkout session error:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  app.get("/api/stripe/checkout/:sessionId", async (req, res) => {
    try {
      const session = await stripeService.getCheckoutSession(req.params.sessionId);
      res.json(session);
    } catch (error) {
      console.error("Get checkout session error:", error);
      res.status(500).json({ error: "Failed to get checkout session" });
    }
  });

  // --- ADMIN ORDER MANAGEMENT ---
  app.get("/api/admin/orders", requireAdmin, async (req, res) => {
    try {
      const { status } = req.query;
      const orders = status
        ? await storage.getOrdersByStatus(status as string)
        : await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error("Get orders error:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/admin/orders/stats", requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getOrderStats();
      res.json(stats);
    } catch (error) {
      console.error("Get order stats error:", error);
      res.status(500).json({ error: "Failed to fetch order stats" });
    }
  });

  app.get("/api/admin/orders/:id", requireAdmin, async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Get order error:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  app.put("/api/admin/orders/:id", requireAdmin, async (req, res) => {
    try {
      const order = await storage.updateOrder(req.params.id, req.body);
      res.json(order);
    } catch (error) {
      console.error("Update order error:", error);
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  app.put("/api/admin/orders/:id/status", requireAdmin, async (req, res) => {
    try {
      const { status, trackingNumber, trackingUrl, notes } = req.body;
      if (!status) {
        return res.status(400).json({ error: "status is required" });
      }

      const order = await storage.updateOrderStatus(req.params.id, status, {
        trackingNumber,
        trackingUrl,
        notes,
      });
      res.json(order);
    } catch (error) {
      console.error("Update order status error:", error);
      res.status(500).json({ error: "Failed to update order status" });
    }
  });

  app.delete("/api/admin/orders/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteOrder(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete order error:", error);
      res.status(500).json({ error: "Failed to delete order" });
    }
  });

  // --- MAINTENANCE ROUTES ---
  const maintenanceService = await import("./services/maintenanceService");

  app.get("/api/admin/maintenance/settings", requireAdmin, async (req, res) => {
    try {
      const settings = await maintenanceService.getMaintenanceSettings();
      res.json(settings);
    } catch (error) {
      console.error("Get maintenance settings error:", error);
      res.status(500).json({ error: "Failed to fetch maintenance settings" });
    }
  });

  app.put("/api/admin/maintenance/settings", requireAdmin, async (req, res) => {
    try {
      const { key, value } = req.body;
      if (!key) {
        return res.status(400).json({ error: "key is required" });
      }
      await maintenanceService.updateMaintenanceSetting(key, value);
      res.json({ success: true });
    } catch (error) {
      console.error("Update maintenance settings error:", error);
      res.status(500).json({ error: "Failed to update maintenance settings" });
    }
  });

  app.post("/api/admin/maintenance/run", requireAdmin, async (req, res) => {
    try {
      const report = await maintenanceService.runMaintenanceCheck('manual');
      res.json(report);
    } catch (error) {
      console.error("Run maintenance check error:", error);
      res.status(500).json({ error: "Failed to run maintenance check" });
    }
  });

  app.get("/api/admin/maintenance/latest", requireAdmin, async (req, res) => {
    try {
      const report = await maintenanceService.getLatestReport();
      res.json(report || null);
    } catch (error) {
      console.error("Get latest report error:", error);
      res.status(500).json({ error: "Failed to fetch latest report" });
    }
  });

  app.get("/api/admin/maintenance/history", requireAdmin, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const reports = await maintenanceService.getReportHistory(limit);
      res.json(reports);
    } catch (error) {
      console.error("Get report history error:", error);
      res.status(500).json({ error: "Failed to fetch report history" });
    }
  });

  app.get("/api/admin/maintenance/ai-summary", requireAdmin, async (req, res) => {
    try {
      const report = await maintenanceService.getLatestReport();
      if (!report) {
        return res.json({ summary: "No maintenance reports available. Run a check first." });
      }
      const summary = maintenanceService.getAiSummary({
        timestamp: report.timestamp?.toISOString() || new Date().toISOString(),
        triggeredBy: report.triggeredBy,
        results: report.results as any,
        backendRoutes: [],
        frontendCalls: [],
        routeMismatches: report.routeMismatches as any || { missingBackend: [], unusedBackend: [] },
        suggestions: report.suggestions as string[] || [],
        summary: report.summary as any,
      });
      res.json({ summary });
    } catch (error) {
      console.error("Get AI summary error:", error);
      res.status(500).json({ error: "Failed to generate AI summary" });
    }
  });

  maintenanceService.startMaintenanceScheduler();

  // ============================================================================
  // SEO BRAIN API ROUTES
  // ============================================================================

  // --- PAGE SEO ROUTES ---
  app.get("/api/admin/seo/page/:pageId", requireAdmin, async (req, res) => {
    try {
      const seo = await storage.getPageSeo(req.params.pageId);
      res.json(seo || null);
    } catch (error) {
      console.error("Get page SEO error:", error);
      res.status(500).json({ error: "Failed to fetch page SEO" });
    }
  });

  app.put("/api/admin/seo/page/:pageId", requireAdmin, async (req, res) => {
    try {
      const seo = await storage.upsertPageSeo(req.params.pageId, req.body);
      res.json(seo);
    } catch (error) {
      console.error("Update page SEO error:", error);
      res.status(500).json({ error: "Failed to update page SEO" });
    }
  });

  // --- PAGE SEARCH METRICS ROUTES ---
  app.get("/api/admin/seo/metrics/:pageId", requireAdmin, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 30;
      const metrics = await storage.getPageSearchMetrics(req.params.pageId, { limit });
      res.json(metrics);
    } catch (error) {
      console.error("Get page metrics error:", error);
      res.status(500).json({ error: "Failed to fetch page metrics" });
    }
  });

  app.get("/api/admin/seo/metrics/:pageId/latest", requireAdmin, async (req, res) => {
    try {
      const metrics = await storage.getLatestPageSearchMetrics(req.params.pageId);
      res.json(metrics || null);
    } catch (error) {
      console.error("Get latest page metrics error:", error);
      res.status(500).json({ error: "Failed to fetch latest page metrics" });
    }
  });

  app.get("/api/admin/seo/top-pages", requireAdmin, async (req, res) => {
    try {
      const metric = (req.query.metric as 'clicks' | 'impressions' | 'ctr') || 'clicks';
      const limit = parseInt(req.query.limit as string) || 10;
      const pages = await storage.getTopPerformingPages({ metric, limit });
      res.json(pages);
    } catch (error) {
      console.error("Get top pages error:", error);
      res.status(500).json({ error: "Failed to fetch top pages" });
    }
  });

  // --- PAGE AI SUGGESTIONS ROUTES ---
  app.get("/api/admin/seo/suggestions", requireAdmin, async (req, res) => {
    try {
      const status = req.query.status as string;
      const limit = parseInt(req.query.limit as string) || 50;
      const priority = parseInt(req.query.priority as string) || undefined;

      if (status === 'proposed') {
        const suggestions = await storage.getPendingPageAiSuggestions({ limit, priority });
        return res.json(suggestions);
      }

      if (status) {
        const suggestions = await storage.getPageAiSuggestionsByStatus(status);
        return res.json(suggestions);
      }

      const suggestions = await storage.getPendingPageAiSuggestions({ limit });
      res.json(suggestions);
    } catch (error) {
      console.error("Get suggestions error:", error);
      res.status(500).json({ error: "Failed to fetch suggestions" });
    }
  });

  app.get("/api/admin/seo/suggestions/page/:pageId", requireAdmin, async (req, res) => {
    try {
      const suggestions = await storage.getPageAiSuggestions(req.params.pageId);
      res.json(suggestions);
    } catch (error) {
      console.error("Get page suggestions error:", error);
      res.status(500).json({ error: "Failed to fetch page suggestions" });
    }
  });

  app.post("/api/admin/seo/suggestions", requireAdmin, async (req, res) => {
    try {
      const suggestion = await storage.createPageAiSuggestion(req.body);
      res.json(suggestion);
    } catch (error) {
      console.error("Create suggestion error:", error);
      res.status(500).json({ error: "Failed to create suggestion" });
    }
  });

  app.put("/api/admin/seo/suggestions/:id", requireAdmin, async (req, res) => {
    try {
      const suggestion = await storage.updatePageAiSuggestion(req.params.id, req.body);
      res.json(suggestion);
    } catch (error) {
      console.error("Update suggestion error:", error);
      res.status(500).json({ error: "Failed to update suggestion" });
    }
  });

  app.post("/api/admin/seo/suggestions/:id/accept", requireAdmin, async (req, res) => {
    try {
      const adminId = (req as any).adminUser?.id;
      const suggestion = await storage.acceptPageAiSuggestion(req.params.id, adminId);
      res.json(suggestion);
    } catch (error) {
      console.error("Accept suggestion error:", error);
      res.status(500).json({ error: "Failed to accept suggestion" });
    }
  });

  app.post("/api/admin/seo/suggestions/:id/reject", requireAdmin, async (req, res) => {
    try {
      const adminId = (req as any).adminUser?.id;
      const suggestion = await storage.rejectPageAiSuggestion(req.params.id, adminId);
      res.json(suggestion);
    } catch (error) {
      console.error("Reject suggestion error:", error);
      res.status(500).json({ error: "Failed to reject suggestion" });
    }
  });

  app.post("/api/admin/seo/suggestions/:id/implement", requireAdmin, async (req, res) => {
    try {
      const suggestion = await storage.implementPageAiSuggestion(req.params.id);
      res.json(suggestion);
    } catch (error) {
      console.error("Implement suggestion error:", error);
      res.status(500).json({ error: "Failed to implement suggestion" });
    }
  });

  app.delete("/api/admin/seo/suggestions/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deletePageAiSuggestion(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete suggestion error:", error);
      res.status(500).json({ error: "Failed to delete suggestion" });
    }
  });

  // --- AI CONTENT BLOCKS ROUTES ---
  app.get("/api/admin/seo/blocks/:pageId", requireAdmin, async (req, res) => {
    try {
      const blocks = await storage.getAiContentBlocks(req.params.pageId);
      res.json(blocks);
    } catch (error) {
      console.error("Get content blocks error:", error);
      res.status(500).json({ error: "Failed to fetch content blocks" });
    }
  });

  app.get("/api/admin/seo/blocks/:pageId/live", requireAdmin, async (req, res) => {
    try {
      const blocks = await storage.getLiveAiContentBlocks(req.params.pageId);
      res.json(blocks);
    } catch (error) {
      console.error("Get live blocks error:", error);
      res.status(500).json({ error: "Failed to fetch live blocks" });
    }
  });

  app.get("/api/seo/blocks/:pageId", async (req, res) => {
    try {
      const blocks = await storage.getLiveAiContentBlocks(req.params.pageId);
      res.json(blocks);
    } catch (error) {
      console.error("Get public blocks error:", error);
      res.status(500).json({ error: "Failed to fetch blocks" });
    }
  });

  app.post("/api/admin/seo/blocks", requireAdmin, async (req, res) => {
    try {
      const block = await storage.createAiContentBlock(req.body);
      res.json(block);
    } catch (error) {
      console.error("Create block error:", error);
      res.status(500).json({ error: "Failed to create block" });
    }
  });

  app.put("/api/admin/seo/blocks/:id", requireAdmin, async (req, res) => {
    try {
      const block = await storage.updateAiContentBlock(req.params.id, req.body);
      res.json(block);
    } catch (error) {
      console.error("Update block error:", error);
      res.status(500).json({ error: "Failed to update block" });
    }
  });

  app.post("/api/admin/seo/blocks/:id/publish", requireAdmin, async (req, res) => {
    try {
      const adminId = (req as any).adminUser?.id;
      const block = await storage.publishAiContentBlock(req.params.id, adminId);
      res.json(block);
    } catch (error) {
      console.error("Publish block error:", error);
      res.status(500).json({ error: "Failed to publish block" });
    }
  });

  app.post("/api/admin/seo/blocks/:id/archive", requireAdmin, async (req, res) => {
    try {
      const block = await storage.archiveAiContentBlock(req.params.id);
      res.json(block);
    } catch (error) {
      console.error("Archive block error:", error);
      res.status(500).json({ error: "Failed to archive block" });
    }
  });

  app.delete("/api/admin/seo/blocks/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteAiContentBlock(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete block error:", error);
      res.status(500).json({ error: "Failed to delete block" });
    }
  });

  app.post("/api/seo/blocks/:id/impression", async (req, res) => {
    try {
      await storage.incrementBlockImpressions(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to track impression" });
    }
  });

  app.post("/api/seo/blocks/:id/click", async (req, res) => {
    try {
      await storage.incrementBlockClickThroughs(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to track click" });
    }
  });

  // --- DESIGN TOKENS ROUTES ---
  app.get("/api/admin/design-tokens", requireAdmin, async (req, res) => {
    try {
      const tokens = await storage.getAllDesignTokens();
      res.json(tokens);
    } catch (error) {
      console.error("Get design tokens error:", error);
      res.status(500).json({ error: "Failed to fetch design tokens" });
    }
  });

  app.get("/api/admin/design-tokens/:clusterKey", requireAdmin, async (req, res) => {
    try {
      const token = await storage.getDesignTokenByClusterKey(req.params.clusterKey);
      res.json(token || null);
    } catch (error) {
      console.error("Get design token error:", error);
      res.status(500).json({ error: "Failed to fetch design token" });
    }
  });

  app.get("/api/design-tokens/:clusterKey", async (req, res) => {
    try {
      const token = await storage.getDesignTokenByClusterKey(req.params.clusterKey);
      res.json(token || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch design token" });
    }
  });

  app.put("/api/admin/design-tokens/:clusterKey", requireAdmin, async (req, res) => {
    try {
      const token = await storage.upsertDesignToken(req.params.clusterKey, req.body);
      res.json(token);
    } catch (error) {
      console.error("Update design token error:", error);
      res.status(500).json({ error: "Failed to update design token" });
    }
  });

  app.delete("/api/admin/design-tokens/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteDesignToken(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete design token error:", error);
      res.status(500).json({ error: "Failed to delete design token" });
    }
  });

  // --- PROPOSED PAGES ROUTES ---
  app.get("/api/admin/proposed-pages", requireAdmin, async (req, res) => {
    try {
      const status = req.query.status as string;
      const clusterKey = req.query.clusterKey as string;

      if (status) {
        const pages = await storage.getProposedPagesByStatus(status);
        return res.json(pages);
      }

      if (clusterKey) {
        const pages = await storage.getProposedPagesByCluster(clusterKey);
        return res.json(pages);
      }

      const pages = await storage.getAllProposedPages();
      res.json(pages);
    } catch (error) {
      console.error("Get proposed pages error:", error);
      res.status(500).json({ error: "Failed to fetch proposed pages" });
    }
  });

  app.get("/api/admin/proposed-pages/:id", requireAdmin, async (req, res) => {
    try {
      const page = await storage.getProposedPage(req.params.id);
      if (!page) {
        return res.status(404).json({ error: "Proposed page not found" });
      }
      res.json(page);
    } catch (error) {
      console.error("Get proposed page error:", error);
      res.status(500).json({ error: "Failed to fetch proposed page" });
    }
  });

  app.post("/api/admin/proposed-pages", requireAdmin, async (req, res) => {
    try {
      const page = await storage.createProposedPage(req.body);
      res.json(page);
    } catch (error) {
      console.error("Create proposed page error:", error);
      res.status(500).json({ error: "Failed to create proposed page" });
    }
  });

  app.put("/api/admin/proposed-pages/:id", requireAdmin, async (req, res) => {
    try {
      const page = await storage.updateProposedPage(req.params.id, req.body);
      res.json(page);
    } catch (error) {
      console.error("Update proposed page error:", error);
      res.status(500).json({ error: "Failed to update proposed page" });
    }
  });

  app.post("/api/admin/proposed-pages/:id/approve", requireAdmin, async (req, res) => {
    try {
      const adminId = (req as any).adminUser?.id;
      const page = await storage.approveProposedPage(req.params.id, adminId);
      res.json(page);
    } catch (error) {
      console.error("Approve proposed page error:", error);
      res.status(500).json({ error: "Failed to approve proposed page" });
    }
  });

  app.post("/api/admin/proposed-pages/:id/reject", requireAdmin, async (req, res) => {
    try {
      const adminId = (req as any).adminUser?.id;
      const page = await storage.rejectProposedPage(req.params.id, adminId);
      res.json(page);
    } catch (error) {
      console.error("Reject proposed page error:", error);
      res.status(500).json({ error: "Failed to reject proposed page" });
    }
  });

  app.post("/api/admin/proposed-pages/:id/create", requireAdmin, async (req, res) => {
    try {
      const proposedPage = await storage.getProposedPage(req.params.id);
      if (!proposedPage) {
        return res.status(404).json({ error: "Proposed page not found" });
      }

      const newPage = await storage.createPage({
        key: proposedPage.proposedSlug,
        path: `/${proposedPage.proposedSlug}`,
        title: proposedPage.proposedTitle,
        seoTitle: proposedPage.proposedMetaTitle || proposedPage.proposedTitle,
        seoDescription: proposedPage.proposedMetaDescription,
        clusterKey: proposedPage.clusterKey || undefined,
        status: 'draft',
        template: 'content',
        excerpt: proposedPage.draftIntro || '',
        content: proposedPage.draftIntro || '',
      });

      const linkedPage = await storage.linkProposedPageToCreated(req.params.id, newPage.id);
      res.json({ proposedPage: linkedPage, createdPage: newPage });
    } catch (error) {
      console.error("Create page from proposed error:", error);
      res.status(500).json({ error: "Failed to create page from proposed" });
    }
  });

  app.delete("/api/admin/proposed-pages/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProposedPage(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete proposed page error:", error);
      res.status(500).json({ error: "Failed to delete proposed page" });
    }
  });

  // --- PAGE LAYOUTS ROUTES ---
  app.get("/api/admin/page-layouts/:pageId", requireAdmin, async (req, res) => {
    try {
      const layout = await storage.getPageLayout(req.params.pageId);
      res.json(layout || null);
    } catch (error) {
      console.error("Get page layout error:", error);
      res.status(500).json({ error: "Failed to fetch page layout" });
    }
  });

  app.put("/api/admin/page-layouts/:pageId", requireAdmin, async (req, res) => {
    try {
      const layout = await storage.upsertPageLayout(req.params.pageId, req.body);
      res.json(layout);
    } catch (error) {
      console.error("Update page layout error:", error);
      res.status(500).json({ error: "Failed to update page layout" });
    }
  });

  // --- SEO OPTIMIZATION RUNS ROUTES ---
  app.get("/api/admin/seo/optimization-runs", requireAdmin, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const runs = await storage.getAllSeoOptimizationRuns({ limit });
      res.json(runs);
    } catch (error) {
      console.error("Get optimization runs error:", error);
      res.status(500).json({ error: "Failed to fetch optimization runs" });
    }
  });

  app.get("/api/admin/seo/optimization-runs/latest", requireAdmin, async (req, res) => {
    try {
      const run = await storage.getLatestSeoOptimizationRun();
      res.json(run || null);
    } catch (error) {
      console.error("Get latest optimization run error:", error);
      res.status(500).json({ error: "Failed to fetch latest optimization run" });
    }
  });

  // --- SEO BRAIN DASHBOARD SUMMARY ---
  app.get("/api/admin/seo/dashboard", requireAdmin, async (req, res) => {
    try {
      const [pendingSuggestions, latestRun, topPages] = await Promise.all([
        storage.getPendingPageAiSuggestions({ limit: 5 }),
        storage.getLatestSeoOptimizationRun(),
        storage.getTopPerformingPages({ limit: 5, metric: 'clicks' })
      ]);

      const proposedPagesCount = (await storage.getProposedPagesByStatus('proposed')).length;
      const approvedPagesCount = (await storage.getProposedPagesByStatus('approved')).length;

      res.json({
        pendingSuggestions,
        pendingSuggestionsCount: pendingSuggestions.length,
        latestOptimizationRun: latestRun,
        topPages,
        proposedPagesCount,
        approvedPagesCount,
      });
    } catch (error) {
      console.error("Get SEO dashboard error:", error);
      res.status(500).json({ error: "Failed to fetch SEO dashboard" });
    }
  });

  // --- SEO BRAIN SERVICE ROUTES ---
  const seoBrainModule = await import("./services/seo-brain");
  const seoBrainService = seoBrainModule.seoBrainService;

  app.get("/api/admin/seo/todays-actions", requireAdmin, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const actions = await seoBrainService.getTodaysActions(limit);
      res.json(actions);
    } catch (error) {
      console.error("Get today's actions error:", error);
      res.status(500).json({ error: "Failed to fetch today's actions" });
    }
  });

  app.get("/api/admin/seo/opportunity/:pageId", requireAdmin, async (req, res) => {
    try {
      const score = await seoBrainService.calculateOpportunityScore(req.params.pageId);
      res.json(score || null);
    } catch (error) {
      console.error("Get opportunity score error:", error);
      res.status(500).json({ error: "Failed to calculate opportunity score" });
    }
  });

  app.post("/api/admin/seo/generate-suggestions/:pageId", requireAdmin, async (req, res) => {
    try {
      const { context } = req.body;
      const suggestions = await seoBrainService.createSuggestionsForPage(req.params.pageId);
      res.json({ suggestions, count: suggestions.length });
    } catch (error) {
      console.error("Generate suggestions error:", error);
      res.status(500).json({ error: "Failed to generate suggestions" });
    }
  });

  app.post("/api/admin/seo/generate-proposed-page", requireAdmin, async (req, res) => {
    try {
      const { targetKeyword, clusterKey, sourceDocIds } = req.body;
      if (!targetKeyword) {
        return res.status(400).json({ error: "targetKeyword is required" });
      }

      const proposedPage = await seoBrainService.generateProposedPage(targetKeyword, {
        clusterKey,
        sourceDocIds,
      });

      if (proposedPage) {
        const created = await storage.createProposedPage(proposedPage);
        res.json(created);
      } else {
        res.status(500).json({ error: "Failed to generate proposed page" });
      }
    } catch (error) {
      console.error("Generate proposed page error:", error);
      res.status(500).json({ error: "Failed to generate proposed page" });
    }
  });

  app.post("/api/admin/seo/generate-content-block", requireAdmin, async (req, res) => {
    try {
      const { pageId, blockType, hook, context } = req.body;
      if (!pageId || !blockType || !hook) {
        return res.status(400).json({ error: "pageId, blockType, and hook are required" });
      }

      const htmlContent = await seoBrainService.generateContentBlock(pageId, blockType, hook, context);

      if (htmlContent) {
        const block = await storage.createAiContentBlock({
          pageId,
          blockType,
          hook,
          htmlContent,
        });
        res.json(block);
      } else {
        res.status(500).json({ error: "Failed to generate content block" });
      }
    } catch (error) {
      console.error("Generate content block error:", error);
      res.status(500).json({ error: "Failed to generate content block" });
    }
  });

  app.post("/api/admin/seo/run-optimization", requireAdmin, async (req, res) => {
    try {
      const report = await seoBrainService.runDailyOptimization();
      res.json(report);
    } catch (error) {
      console.error("Run optimization error:", error);
      res.status(500).json({ error: "Failed to run SEO optimization" });
    }
  });

  app.post("/api/admin/seo/sync-metrics", requireAdmin, async (req, res) => {
    try {
      const count = await seoBrainService.syncSearchConsoleMetrics();
      res.json({ metricsUpdated: count });
    } catch (error) {
      console.error("Sync metrics error:", error);
      res.status(500).json({ error: "Failed to sync metrics" });
    }
  });

  return httpServer;
}
