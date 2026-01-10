import {
  type Product,
  type InsertProduct,
  type ScienceArticle,
  type InsertScienceArticle,
  type Cluster,
  type InsertCluster,
  type AdminUser,
  type InsertAdminUser,
  type Page,
  type InsertPage,
  type PageWithChildren,
  type Document,
  type InsertDocument,
  type DocumentChunk,
  type InsertDocumentChunk,
  type SeoKeyword,
  type InsertSeoKeyword,
  type MagicPageSuggestion,
  type InsertMagicPageSuggestion,
  type LinkingRule,
  type InsertLinkingRule,
  type CtaTemplate,
  type InsertCtaTemplate,
  type CmsSetting,
  type InsertCmsSetting,
  type MagicAiSettings,
  type InsertMagicAiSettings,
  type HtmlTemplate,
  type InsertHtmlTemplate,
  type PageImagePrompt,
  type InsertPageImagePrompt,
  type AdminAiSetting,
  type InsertAdminAiSetting,
  type MagicPageSession,
  type InsertMagicPageSession,
  type BigmindSession,
  type InsertBigmindSession,
  type BigmindMessage,
  type InsertBigmindMessage,
  type PageAiSession,
  type InsertPageAiSession,
  type PageAiMessage,
  type InsertPageAiMessage,
  type PageMediaAsset,
  type InsertPageMediaAsset,
  type PageEnhancement,
  type InsertPageEnhancement,
  type BigmindSuggestion,
  type InsertBigmindSuggestion,
  type Order,
  type InsertOrder,
  type PageSeo,
  type InsertPageSeo,
  type PageSearchMetrics,
  type InsertPageSearchMetrics,
  type PageAiSuggestion,
  type InsertPageAiSuggestion,
  type AiContentBlock,
  type InsertAiContentBlock,
  type DesignToken,
  type InsertDesignToken,
  type ProposedPage,
  type InsertProposedPage,
  type PageLayout,
  type InsertPageLayout,
  type SeoOptimizationRun,
  type InsertSeoOptimizationRun,
  products,
  scienceArticles,
  clusters,
  adminUsers,
  pages,
  documents,
  documentChunks,
  seoKeywords,
  magicPageSuggestions,
  linkingRules,
  ctaTemplates,
  cmsSettings,
  magicAiSettings,
  htmlTemplates,
  pageImagePrompts,
  adminAiSettings,
  magicPageSessions,
  bigmindSessions,
  bigmindMessages,
  pageAiSessions,
  pageAiMessages,
  pageMediaAssets,
  pageEnhancements,
  bigmindSuggestions,
  orders,
  pageSeo,
  pageSearchMetrics,
  pageAiSuggestions,
  aiContentBlocks,
  designTokens,
  proposedPages,
  pageLayouts,
  seoOptimizationRuns,
  // Workflows
  type WorkflowTemplate,
  type InsertWorkflowTemplate,
  type WorkflowExecution,
  type InsertWorkflowExecution,
  type WorkflowStep,
  type InsertWorkflowStep,
  workflowTemplates,
  workflowExecutions,
  workflowSteps,
  // Health
  type HealthRun,
  type InsertHealthRun,
  type HealthIssue,
  type InsertHealthIssue,
  healthRuns,
  healthIssues
} from "@shared/schema";
import { db } from "./db";
import { eq, or, sql, desc, and, isNull, asc, ilike, inArray } from "drizzle-orm";

export interface IStorage {
  // Products
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getAllProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;

  // Clusters
  getCluster(id: string): Promise<Cluster | undefined>;
  getClusterBySlug(slug: string): Promise<Cluster | undefined>;
  getClusterByKey(key: string): Promise<Cluster | undefined>;
  getAllClusters(): Promise<Cluster[]>;
  createCluster(cluster: InsertCluster): Promise<Cluster>;
  updateCluster(id: string, cluster: Partial<InsertCluster>): Promise<Cluster>;
  deleteCluster(id: string): Promise<void>;

  // Pages
  getPage(id: string): Promise<Page | undefined>;
  getPageByKey(key: string): Promise<Page | undefined>;
  getPageByPath(path: string): Promise<Page | undefined>;
  getAllPages(): Promise<Page[]>;
  getPagesByCluster(clusterKey: string): Promise<Page[]>;
  getChildPages(parentKey: string): Promise<Page[]>;
  getRootPages(): Promise<Page[]>;
  getPageTree(): Promise<PageWithChildren[]>;
  getBreadcrumbs(pageKey: string): Promise<Page[]>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: string, page: Partial<InsertPage>): Promise<Page>;
  deletePage(id: string): Promise<void>;
  bulkCreatePages(pagesData: InsertPage[]): Promise<Page[]>;

  // Science Articles
  getScienceArticle(id: string): Promise<ScienceArticle | undefined>;
  getScienceArticleBySlug(slug: string): Promise<ScienceArticle | undefined>;
  getAllScienceArticles(): Promise<ScienceArticle[]>;
  getScienceArticlesByCluster(clusterId: string): Promise<ScienceArticle[]>;
  getRelevantArticles(options: {
    tags?: string[];
    clusterId?: string;
    relatedProductIds?: string[];
    limit?: number;
  }): Promise<ScienceArticle[]>;
  createScienceArticle(article: InsertScienceArticle): Promise<ScienceArticle>;
  updateScienceArticle(id: string, article: Partial<InsertScienceArticle>): Promise<ScienceArticle>;
  deleteScienceArticle(id: string): Promise<void>;

  // Admin
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;

  // Stats
  getContentStats(): Promise<{
    totalPages: number;
    publishedPages: number;
    draftPages: number;
    totalProducts: number;
    totalArticles: number;
    totalClusters: number;
  }>;

  // Documents (Knowledge Base)
  getDocument(id: string): Promise<Document | undefined>;
  getAllDocuments(): Promise<Document[]>;
  getDocumentsByStatus(status: string): Promise<Document[]>;
  searchDocuments(query: string, limit?: number): Promise<Document[]>;
  createDocument(doc: InsertDocument): Promise<Document>;
  updateDocument(id: string, doc: Partial<InsertDocument>): Promise<Document>;
  deleteDocument(id: string): Promise<void>;

  // Document Chunks
  getDocumentChunks(documentId: string): Promise<DocumentChunk[]>;
  createDocumentChunk(chunk: InsertDocumentChunk): Promise<DocumentChunk>;
  bulkCreateDocumentChunks(chunks: InsertDocumentChunk[]): Promise<DocumentChunk[]>;
  deleteDocumentChunks(documentId: string): Promise<void>;
  searchChunksByContent(query: string, limit?: number): Promise<DocumentChunk[]>;

  // SEO Keywords
  getSeoKeyword(id: string): Promise<SeoKeyword | undefined>;
  getSeoKeywordByKeyword(keyword: string): Promise<SeoKeyword | undefined>;
  getAllSeoKeywords(): Promise<SeoKeyword[]>;
  getSeoKeywordsByStatus(status: string): Promise<SeoKeyword[]>;
  getHighOpportunityKeywords(options?: { minRelevance?: number; maxDifficulty?: number; minVolume?: number; limit?: number }): Promise<SeoKeyword[]>;
  createSeoKeyword(keyword: InsertSeoKeyword): Promise<SeoKeyword>;
  updateSeoKeyword(id: string, keyword: Partial<InsertSeoKeyword>): Promise<SeoKeyword>;
  deleteSeoKeyword(id: string): Promise<void>;
  bulkCreateSeoKeywords(keywords: InsertSeoKeyword[]): Promise<SeoKeyword[]>;

  // Magic Page Suggestions
  getMagicPageSuggestion(id: string): Promise<MagicPageSuggestion | undefined>;
  getAllMagicPageSuggestions(): Promise<MagicPageSuggestion[]>;
  getMagicPageSuggestionsByStatus(status: string): Promise<MagicPageSuggestion[]>;
  getMagicPageSuggestionByKeyword(keywordId: string): Promise<MagicPageSuggestion | undefined>;
  createMagicPageSuggestion(suggestion: InsertMagicPageSuggestion): Promise<MagicPageSuggestion>;
  updateMagicPageSuggestion(id: string, suggestion: Partial<InsertMagicPageSuggestion>): Promise<MagicPageSuggestion>;
  deleteMagicPageSuggestion(id: string): Promise<void>;

  // Linking Rules
  getLinkingRule(id: string): Promise<LinkingRule | undefined>;
  getAllLinkingRules(): Promise<LinkingRule[]>;
  getActiveLinkingRules(): Promise<LinkingRule[]>;
  getLinkingRulesByType(ruleType: string): Promise<LinkingRule[]>;
  createLinkingRule(rule: InsertLinkingRule): Promise<LinkingRule>;
  updateLinkingRule(id: string, rule: Partial<InsertLinkingRule>): Promise<LinkingRule>;
  deleteLinkingRule(id: string): Promise<void>;

  // CTA Templates
  getCtaTemplate(id: string): Promise<CtaTemplate | undefined>;
  getCtaTemplateBySlug(slug: string): Promise<CtaTemplate | undefined>;
  getAllCtaTemplates(): Promise<CtaTemplate[]>;
  getActiveCtaTemplates(): Promise<CtaTemplate[]>;
  getCtaTemplatesByPosition(position: string): Promise<CtaTemplate[]>;
  getMatchingCtaTemplates(options: { clusterKey?: string; keywords?: string[] }): Promise<CtaTemplate[]>;
  createCtaTemplate(template: InsertCtaTemplate): Promise<CtaTemplate>;
  updateCtaTemplate(id: string, template: Partial<InsertCtaTemplate>): Promise<CtaTemplate>;
  deleteCtaTemplate(id: string): Promise<void>;

  // CMS Settings
  getCmsSetting(key: string): Promise<CmsSetting | undefined>;
  getAllCmsSettings(): Promise<CmsSetting[]>;
  getCmsSettingsByCategory(category: string): Promise<CmsSetting[]>;
  setCmsSetting(key: string, value: any, description?: string, category?: string): Promise<CmsSetting>;
  deleteCmsSetting(key: string): Promise<void>;

  // Magic AI Settings (singleton)
  getMagicAiSettings(): Promise<MagicAiSettings | undefined>;
  updateMagicAiSettings(basePrompt: string): Promise<MagicAiSettings>;

  // HTML Templates (Andara Component System)
  getHtmlTemplate(id: string): Promise<HtmlTemplate | undefined>;
  getHtmlTemplateBySlug(slug: string): Promise<HtmlTemplate | undefined>;
  getAllHtmlTemplates(): Promise<HtmlTemplate[]>;
  getHtmlTemplatesByType(templateType: string): Promise<HtmlTemplate[]>;
  createHtmlTemplate(template: InsertHtmlTemplate): Promise<HtmlTemplate>;
  updateHtmlTemplate(id: string, template: Partial<InsertHtmlTemplate>): Promise<HtmlTemplate>;
  deleteHtmlTemplate(id: string): Promise<void>;

  // Page Image Prompts (AI-generated image slots)
  getPageImagePrompt(id: string): Promise<PageImagePrompt | undefined>;
  getPageImagePrompts(pageId: string): Promise<PageImagePrompt[]>;
  createPageImagePrompt(prompt: InsertPageImagePrompt): Promise<PageImagePrompt>;
  updatePageImagePrompt(id: string, prompt: Partial<InsertPageImagePrompt>): Promise<PageImagePrompt>;
  deletePageImagePrompt(id: string): Promise<void>;
  deleteAllPageImagePrompts(pageId: string): Promise<void>;
  bulkCreatePageImagePrompts(prompts: InsertPageImagePrompt[]): Promise<PageImagePrompt[]>;

  // Admin AI Settings (BigMind preferences)
  getAdminAiSetting(key: string): Promise<AdminAiSetting | undefined>;
  getAllAdminAiSettings(): Promise<AdminAiSetting[]>;
  getAdminAiSettingsByCategory(category: string): Promise<AdminAiSetting[]>;
  getActiveAdminAiSettings(): Promise<AdminAiSetting[]>;
  createAdminAiSetting(setting: InsertAdminAiSetting): Promise<AdminAiSetting>;
  updateAdminAiSetting(key: string, setting: Partial<InsertAdminAiSetting>): Promise<AdminAiSetting>;
  deleteAdminAiSetting(key: string): Promise<void>;

  // Magic Page Sessions (AI page generation workflow)
  getMagicPageSession(id: string): Promise<MagicPageSession | undefined>;
  getAllMagicPageSessions(): Promise<MagicPageSession[]>;
  getMagicPageSessionsByStatus(status: string): Promise<MagicPageSession[]>;
  createMagicPageSession(session: InsertMagicPageSession): Promise<MagicPageSession>;
  updateMagicPageSession(id: string, session: Partial<InsertMagicPageSession>): Promise<MagicPageSession>;
  deleteMagicPageSession(id: string): Promise<void>;

  // BigMind Chat Sessions
  getBigmindSession(id: string): Promise<BigmindSession | undefined>;
  getAllBigmindSessions(): Promise<BigmindSession[]>;
  createBigmindSession(session: InsertBigmindSession): Promise<BigmindSession>;
  updateBigmindSession(id: string, session: Partial<InsertBigmindSession>): Promise<BigmindSession>;
  deleteBigmindSession(id: string): Promise<void>;

  // BigMind Chat Messages
  getBigmindMessages(sessionId: string): Promise<BigmindMessage[]>;
  createBigmindMessage(message: InsertBigmindMessage): Promise<BigmindMessage>;
  getRecentBigmindMessages(limit?: number): Promise<BigmindMessage[]>;

  // Page AI Chat Sessions
  getPageAiSession(id: string): Promise<PageAiSession | undefined>;
  getAllPageAiSessions(): Promise<PageAiSession[]>;
  getPageAiSessionsByPageKey(pageKey: string): Promise<PageAiSession[]>;
  createPageAiSession(session: InsertPageAiSession): Promise<PageAiSession>;
  updatePageAiSession(id: string, session: Partial<InsertPageAiSession>): Promise<PageAiSession>;
  deletePageAiSession(id: string): Promise<void>;

  // Page AI Chat Messages
  getPageAiMessages(sessionId: string): Promise<PageAiMessage[]>;
  createPageAiMessage(message: InsertPageAiMessage): Promise<PageAiMessage>;

  // Page Media Assets (multiple images per page)
  getPageMediaAssets(pageKey: string): Promise<PageMediaAsset[]>;
  getPageMediaAsset(id: string): Promise<PageMediaAsset | undefined>;
  createPageMediaAsset(asset: InsertPageMediaAsset): Promise<PageMediaAsset>;
  updatePageMediaAsset(id: string, asset: Partial<InsertPageMediaAsset>): Promise<PageMediaAsset>;
  deletePageMediaAsset(id: string): Promise<void>;
  deletePageMediaAssetsByPageKey(pageKey: string): Promise<void>;

  // Page Enhancements (AI-generated suggestions)
  getPageEnhancement(id: string): Promise<PageEnhancement | undefined>;
  getPageEnhancements(pageId: string): Promise<PageEnhancement[]>;
  getPageEnhancementsBySession(sessionId: string): Promise<PageEnhancement[]>;
  getPendingEnhancements(pageId: string): Promise<PageEnhancement[]>;
  createPageEnhancement(enhancement: InsertPageEnhancement): Promise<PageEnhancement>;
  bulkCreatePageEnhancements(enhancements: InsertPageEnhancement[]): Promise<PageEnhancement[]>;
  updatePageEnhancement(id: string, enhancement: Partial<InsertPageEnhancement>): Promise<PageEnhancement>;
  deletePageEnhancement(id: string): Promise<void>;
  deletePageEnhancementsByPage(pageId: string): Promise<void>;
  applyEnhancements(enhancementIds: string[]): Promise<void>;

  // BigMind Suggestions (AI recommendations from chat)
  getBigmindSuggestion(id: string): Promise<BigmindSuggestion | undefined>;
  getAllBigmindSuggestions(): Promise<BigmindSuggestion[]>;
  getBigmindSuggestionsByStatus(status: string): Promise<BigmindSuggestion[]>;
  getBigmindSuggestionsByPageKey(pageKey: string): Promise<BigmindSuggestion[]>;
  getPendingBigmindSuggestions(): Promise<BigmindSuggestion[]>;
  createBigmindSuggestion(suggestion: InsertBigmindSuggestion): Promise<BigmindSuggestion>;
  bulkCreateBigmindSuggestions(suggestions: InsertBigmindSuggestion[]): Promise<BigmindSuggestion[]>;
  updateBigmindSuggestion(id: string, suggestion: Partial<InsertBigmindSuggestion>): Promise<BigmindSuggestion>;
  deleteBigmindSuggestion(id: string): Promise<void>;
  applyBigmindSuggestion(id: string): Promise<BigmindSuggestion>;
  dismissBigmindSuggestion(id: string): Promise<BigmindSuggestion>;

  // ============================================================================
  // SEO BRAIN STORAGE INTERFACE
  // ============================================================================

  // Page SEO (Enhanced SEO metadata per page)
  getPageSeo(pageId: string): Promise<PageSeo | undefined>;
  createPageSeo(seo: InsertPageSeo): Promise<PageSeo>;
  updatePageSeo(id: string, seo: Partial<InsertPageSeo>): Promise<PageSeo>;
  deletePageSeo(id: string): Promise<void>;
  upsertPageSeo(pageId: string, seo: Partial<InsertPageSeo>): Promise<PageSeo>;

  // Page Search Metrics (Daily metrics from Search Console)
  getPageSearchMetrics(pageId: string, options?: { limit?: number; startDate?: Date; endDate?: Date }): Promise<PageSearchMetrics[]>;
  getLatestPageSearchMetrics(pageId: string): Promise<PageSearchMetrics | undefined>;
  createPageSearchMetrics(metrics: InsertPageSearchMetrics): Promise<PageSearchMetrics>;
  bulkCreatePageSearchMetrics(metrics: InsertPageSearchMetrics[]): Promise<PageSearchMetrics[]>;
  getTopPerformingPages(options?: { limit?: number; metric?: 'clicks' | 'impressions' | 'ctr' }): Promise<Array<{ pageId: string; value: number }>>;

  // Page AI Suggestions (Granular AI recommendations)
  getPageAiSuggestion(id: string): Promise<PageAiSuggestion | undefined>;
  getPageAiSuggestions(pageId: string): Promise<PageAiSuggestion[]>;
  getPageAiSuggestionsByStatus(status: string): Promise<PageAiSuggestion[]>;
  getPendingPageAiSuggestions(options?: { limit?: number; priority?: number }): Promise<PageAiSuggestion[]>;
  createPageAiSuggestion(suggestion: InsertPageAiSuggestion): Promise<PageAiSuggestion>;
  bulkCreatePageAiSuggestions(suggestions: InsertPageAiSuggestion[]): Promise<PageAiSuggestion[]>;
  updatePageAiSuggestion(id: string, suggestion: Partial<InsertPageAiSuggestion>): Promise<PageAiSuggestion>;
  deletePageAiSuggestion(id: string): Promise<void>;
  acceptPageAiSuggestion(id: string, reviewerId?: string): Promise<PageAiSuggestion>;
  rejectPageAiSuggestion(id: string, reviewerId?: string): Promise<PageAiSuggestion>;
  implementPageAiSuggestion(id: string): Promise<PageAiSuggestion>;

  // AI Content Blocks (Dynamic SEO content blocks)
  getAiContentBlock(id: string): Promise<AiContentBlock | undefined>;
  getAiContentBlocks(pageId: string): Promise<AiContentBlock[]>;
  getAiContentBlocksByHook(pageId: string, hook: string): Promise<AiContentBlock[]>;
  getLiveAiContentBlocks(pageId: string): Promise<AiContentBlock[]>;
  createAiContentBlock(block: InsertAiContentBlock): Promise<AiContentBlock>;
  updateAiContentBlock(id: string, block: Partial<InsertAiContentBlock>): Promise<AiContentBlock>;
  deleteAiContentBlock(id: string): Promise<void>;
  publishAiContentBlock(id: string, reviewerId?: string): Promise<AiContentBlock>;
  archiveAiContentBlock(id: string): Promise<AiContentBlock>;
  incrementBlockImpressions(id: string): Promise<void>;
  incrementBlockClickThroughs(id: string): Promise<void>;

  // Design Tokens (Per-cluster visual tokens)
  getDesignToken(id: string): Promise<DesignToken | undefined>;
  getDesignTokenByClusterKey(clusterKey: string): Promise<DesignToken | undefined>;
  getAllDesignTokens(): Promise<DesignToken[]>;
  createDesignToken(token: InsertDesignToken): Promise<DesignToken>;
  updateDesignToken(id: string, token: Partial<InsertDesignToken>): Promise<DesignToken>;
  deleteDesignToken(id: string): Promise<void>;
  upsertDesignToken(clusterKey: string, token: Partial<InsertDesignToken>): Promise<DesignToken>;

  // Proposed Pages (Magic Page Blueprints)
  getProposedPage(id: string): Promise<ProposedPage | undefined>;
  getAllProposedPages(): Promise<ProposedPage[]>;
  getProposedPagesByStatus(status: string): Promise<ProposedPage[]>;
  getProposedPagesByCluster(clusterKey: string): Promise<ProposedPage[]>;
  createProposedPage(page: InsertProposedPage): Promise<ProposedPage>;
  updateProposedPage(id: string, page: Partial<InsertProposedPage>): Promise<ProposedPage>;
  deleteProposedPage(id: string): Promise<void>;
  approveProposedPage(id: string, reviewerId?: string): Promise<ProposedPage>;
  rejectProposedPage(id: string, reviewerId?: string): Promise<ProposedPage>;
  linkProposedPageToCreated(proposedId: string, createdPageId: string): Promise<ProposedPage>;

  // Page Layouts (Layout structure per page)
  getPageLayout(pageId: string): Promise<PageLayout | undefined>;
  createPageLayout(layout: InsertPageLayout): Promise<PageLayout>;
  updatePageLayout(id: string, layout: Partial<InsertPageLayout>): Promise<PageLayout>;
  deletePageLayout(id: string): Promise<void>;
  upsertPageLayout(pageId: string, layout: Partial<InsertPageLayout>): Promise<PageLayout>;

  // SEO Optimization Runs (Track daily jobs)
  getSeoOptimizationRun(id: string): Promise<SeoOptimizationRun | undefined>;
  getLatestSeoOptimizationRun(): Promise<SeoOptimizationRun | undefined>;
  getAllSeoOptimizationRuns(options?: { limit?: number }): Promise<SeoOptimizationRun[]>;
  createSeoOptimizationRun(run: InsertSeoOptimizationRun): Promise<SeoOptimizationRun>;
  updateSeoOptimizationRun(id: string, run: Partial<InsertSeoOptimizationRun>): Promise<SeoOptimizationRun>;
  completeSeoOptimizationRun(id: string, summary: any): Promise<SeoOptimizationRun>;
  failSeoOptimizationRun(id: string, errorLog: string): Promise<SeoOptimizationRun>;

  // ============================================================================
  // WORKFLOWS STORAGE INTERFACE
  // ============================================================================

  // Workflow Templates
  createWorkflowTemplate(template: InsertWorkflowTemplate): Promise<WorkflowTemplate>;
  getWorkflowTemplate(id: string): Promise<WorkflowTemplate | undefined>;
  getAllWorkflowTemplates(): Promise<WorkflowTemplate[]>;
  deleteWorkflowTemplate(id: string): Promise<void>;

  // Workflow Executions
  createWorkflowExecution(execution: InsertWorkflowExecution): Promise<WorkflowExecution>;
  getWorkflowExecution(id: string): Promise<WorkflowExecution | undefined>;
  getAllWorkflowExecutions(): Promise<WorkflowExecution[]>;
  updateWorkflowExecution(id: string, execution: Partial<WorkflowExecution>): Promise<WorkflowExecution>;
  deleteWorkflowExecution(id: string): Promise<void>;

  // Workflow Steps
  createWorkflowStep(step: InsertWorkflowStep): Promise<WorkflowStep>;
  getWorkflowSteps(executionId: string): Promise<WorkflowStep[]>;
  updateWorkflowStep(id: string, step: Partial<WorkflowStep>): Promise<WorkflowStep>;

  // Health Monitoring
  getHealthRuns(limit?: number): Promise<HealthRun[]>;
  getHealthRun(id: string): Promise<HealthRun | undefined>;
  createHealthRun(run: InsertHealthRun): Promise<HealthRun>;
  updateHealthRun(id: string, run: Partial<HealthRun>): Promise<HealthRun>;
  getHealthIssues(runId: string): Promise<HealthIssue[]>;
  createHealthIssue(issue: InsertHealthIssue): Promise<HealthIssue>;
  updateHealthIssue(id: string, issue: Partial<HealthIssue>): Promise<HealthIssue>;
}

export class DatabaseStorage implements IStorage {
  // --- PRODUCTS ---
  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product || undefined;
  }

  async getAllProducts(): Promise<Product[]> {
    return db.select().from(products).orderBy(products.createdAt);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [created] = await db.insert(products).values(product as any).returning();
    return created;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product> {
    const [updated] = await db
      .update(products)
      .set(product as any)
      .where(eq(products.id, id))
      .returning();
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // --- CLUSTERS ---
  async getCluster(id: string): Promise<Cluster | undefined> {
    const [cluster] = await db.select().from(clusters).where(eq(clusters.id, id));
    return cluster || undefined;
  }

  async getClusterBySlug(slug: string): Promise<Cluster | undefined> {
    const [cluster] = await db.select().from(clusters).where(eq(clusters.slug, slug));
    return cluster || undefined;
  }

  async getClusterByKey(key: string): Promise<Cluster | undefined> {
    const [cluster] = await db.select().from(clusters).where(eq(clusters.key, key));
    return cluster || undefined;
  }

  async getAllClusters(): Promise<Cluster[]> {
    return db.select().from(clusters).orderBy(asc(clusters.priority));
  }

  async createCluster(cluster: InsertCluster): Promise<Cluster> {
    const [created] = await db.insert(clusters).values(cluster as any).returning();
    return created;
  }

  async updateCluster(id: string, cluster: Partial<InsertCluster>): Promise<Cluster> {
    const [updated] = await db
      .update(clusters)
      .set(cluster as any)
      .where(eq(clusters.id, id))
      .returning();
    return updated;
  }

  async deleteCluster(id: string): Promise<void> {
    await db.delete(clusters).where(eq(clusters.id, id));
  }

  // --- PAGES ---
  async getPage(id: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page || undefined;
  }

  async getPageByKey(key: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.key, key));
    return page || undefined;
  }

  async getPageByPath(path: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.path, path));
    return page || undefined;
  }

  async getAllPages(): Promise<Page[]> {
    const start = Date.now();
    const results = await db.select().from(pages).orderBy(asc(pages.priority), asc(pages.title));
    const duration = Date.now() - start;
    if (duration > 1000) {
      console.warn(`[storage] getAllPages took ${duration}ms`);
    }
    return results;
  }

  async getPagesByCluster(clusterKey: string): Promise<Page[]> {
    return db
      .select()
      .from(pages)
      .where(eq(pages.clusterKey, clusterKey))
      .orderBy(asc(pages.priority));
  }

  async getChildPages(parentKey: string): Promise<Page[]> {
    return db
      .select()
      .from(pages)
      .where(eq(pages.parentKey, parentKey))
      .orderBy(asc(pages.priority));
  }

  async getRootPages(): Promise<Page[]> {
    return db
      .select()
      .from(pages)
      .where(isNull(pages.parentKey))
      .orderBy(asc(pages.priority));
  }

  async getPageTree(): Promise<PageWithChildren[]> {
    const allPages = await this.getAllPages();

    const buildTree = (parentKey: string | null): PageWithChildren[] => {
      return allPages
        .filter(p => p.parentKey === parentKey)
        .sort((a, b) => a.priority - b.priority)
        .map(page => ({
          ...page,
          children: buildTree(page.key)
        }));
    };

    return buildTree(null);
  }

  async getBreadcrumbs(pageKey: string): Promise<Page[]> {
    const breadcrumbs: Page[] = [];
    let currentKey: string | null = pageKey;

    while (currentKey) {
      const page = await this.getPageByKey(currentKey);
      if (page) {
        breadcrumbs.unshift(page);
        currentKey = page.parentKey;
      } else {
        break;
      }
    }

    return breadcrumbs;
  }

  async createPage(page: InsertPage): Promise<Page> {
    const [created] = await db.insert(pages).values(page as any).returning();
    return created;
  }

  async updatePage(id: string, page: Partial<InsertPage>): Promise<Page> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(page)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }

    const [updated] = await db
      .update(pages)
      .set(filteredUpdates as any)
      .where(eq(pages.id, id))
      .returning();
    return updated;
  }

  async deletePage(id: string): Promise<void> {
    await db.delete(pages).where(eq(pages.id, id));
  }

  async bulkCreatePages(pagesData: InsertPage[]): Promise<Page[]> {
    if (pagesData.length === 0) return [];
    const created = await db.insert(pages).values(pagesData as any).returning();
    return created;
  }

  // --- SCIENCE ARTICLES ---
  async getScienceArticle(id: string): Promise<ScienceArticle | undefined> {
    const [article] = await db.select().from(scienceArticles).where(eq(scienceArticles.id, id));
    return article || undefined;
  }

  async getScienceArticleBySlug(slug: string): Promise<ScienceArticle | undefined> {
    const [article] = await db.select().from(scienceArticles).where(eq(scienceArticles.slug, slug));
    return article || undefined;
  }

  async getAllScienceArticles(): Promise<ScienceArticle[]> {
    return db.select().from(scienceArticles).orderBy(desc(scienceArticles.priority), desc(scienceArticles.publishedAt));
  }

  async getScienceArticlesByCluster(clusterId: string): Promise<ScienceArticle[]> {
    return db
      .select()
      .from(scienceArticles)
      .where(eq(scienceArticles.clusterId, clusterId))
      .orderBy(desc(scienceArticles.priority), desc(scienceArticles.publishedAt));
  }

  async getRelevantArticles(options: {
    tags?: string[];
    clusterId?: string;
    relatedProductIds?: string[];
    limit?: number;
  }): Promise<ScienceArticle[]> {
    const { tags, clusterId, relatedProductIds, limit = 5 } = options;

    const conditions = [];

    if (clusterId) {
      conditions.push(eq(scienceArticles.clusterId, clusterId));
    }

    if (tags && tags.length > 0) {
      conditions.push(sql`${scienceArticles.tags} && ${tags}`);
    }

    if (relatedProductIds && relatedProductIds.length > 0) {
      conditions.push(sql`${scienceArticles.relatedProductIds} && ${relatedProductIds}`);
    }

    if (conditions.length > 0) {
      const results = await db
        .select()
        .from(scienceArticles)
        .where(or(...conditions))
        .orderBy(desc(scienceArticles.priority), desc(scienceArticles.publishedAt))
        .limit(limit);
      return results;
    }

    const results = await db
      .select()
      .from(scienceArticles)
      .orderBy(desc(scienceArticles.priority), desc(scienceArticles.publishedAt))
      .limit(limit);

    return results;
  }

  async createScienceArticle(article: InsertScienceArticle): Promise<ScienceArticle> {
    const [created] = await db.insert(scienceArticles).values(article as any).returning();
    return created;
  }

  async updateScienceArticle(id: string, article: Partial<InsertScienceArticle>): Promise<ScienceArticle> {
    const [updated] = await db
      .update(scienceArticles)
      .set({ ...article, updatedAt: new Date() })
      .where(eq(scienceArticles.id, id))
      .returning();
    return updated;
  }

  async deleteScienceArticle(id: string): Promise<void> {
    await db.delete(scienceArticles).where(eq(scienceArticles.id, id));
  }

  // --- ADMIN ---
  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return user || undefined;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return user || undefined;
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const [created] = await db.insert(adminUsers).values(user).returning();
    return created;
  }

  // --- STATS ---
  async getContentStats(): Promise<{
    totalPages: number;
    publishedPages: number;
    draftPages: number;
    totalProducts: number;
    totalArticles: number;
    totalClusters: number;
  }> {
    const [pagesResult] = await db.select({ count: sql<number>`count(*)` }).from(pages);
    const [publishedResult] = await db.select({ count: sql<number>`count(*)` }).from(pages).where(eq(pages.status, 'published'));
    const [draftResult] = await db.select({ count: sql<number>`count(*)` }).from(pages).where(eq(pages.status, 'draft'));
    const [productsResult] = await db.select({ count: sql<number>`count(*)` }).from(products);
    const [articlesResult] = await db.select({ count: sql<number>`count(*)` }).from(scienceArticles);
    const [clustersResult] = await db.select({ count: sql<number>`count(*)` }).from(clusters);

    return {
      totalPages: Number(pagesResult?.count) || 0,
      publishedPages: Number(publishedResult?.count) || 0,
      draftPages: Number(draftResult?.count) || 0,
      totalProducts: Number(productsResult?.count) || 0,
      totalArticles: Number(articlesResult?.count) || 0,
      totalClusters: Number(clustersResult?.count) || 0,
    };
  }

  // --- DOCUMENTS (Knowledge Base) ---
  async getDocument(id: string): Promise<Document | undefined> {
    const [doc] = await db.select().from(documents).where(eq(documents.id, id));
    return doc || undefined;
  }

  async getAllDocuments(): Promise<Document[]> {
    return db.select().from(documents).orderBy(desc(documents.createdAt));
  }

  async getDocumentsByStatus(status: string): Promise<Document[]> {
    return db.select().from(documents).where(eq(documents.status, status)).orderBy(desc(documents.createdAt));
  }

  async searchDocuments(query: string, limit: number = 50): Promise<Document[]> {
    // Use word-boundary matching for better search results
    // Split query into words and match each word with word boundaries
    const words = query.trim().split(/\s+/).filter(Boolean);

    if (words.length === 0) {
      return db.select().from(documents).orderBy(desc(documents.createdAt)).limit(limit);
    }

    // Create patterns that match whole words (using word boundaries with wildcards)
    const conditions = words.map(word => {
      // Pattern matches word at start, end, or surrounded by non-word chars
      const wordPattern = `%${word}%`;
      return or(
        ilike(documents.title, wordPattern),
        ilike(documents.rawText, wordPattern),
        ilike(documents.cleanText, wordPattern)
      );
    });

    // All words must match (AND logic for multi-word queries)
    return db
      .select()
      .from(documents)
      .where(and(...conditions))
      .orderBy(desc(documents.createdAt))
      .limit(limit);
  }

  async createDocument(doc: InsertDocument): Promise<Document> {
    const wordCount = doc.rawText ? doc.rawText.trim().split(/\s+/).filter(Boolean).length : 0;
    const [created] = await db.insert(documents).values({ ...doc, wordCount }).returning();
    return created;
  }

  async updateDocument(id: string, doc: Partial<InsertDocument>): Promise<Document> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(doc)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    if (doc.rawText !== undefined) {
      filteredUpdates.wordCount = doc.rawText ? doc.rawText.trim().split(/\s+/).filter(Boolean).length : 0;
    }
    const [updated] = await db
      .update(documents)
      .set(filteredUpdates as any)
      .where(eq(documents.id, id))
      .returning();
    return updated;
  }

  async deleteDocument(id: string): Promise<void> {
    await this.deleteDocumentChunks(id);
    await db.delete(documents).where(eq(documents.id, id));
  }

  // --- DOCUMENT CHUNKS ---
  async getDocumentChunks(documentId: string): Promise<DocumentChunk[]> {
    return db
      .select()
      .from(documentChunks)
      .where(eq(documentChunks.documentId, documentId))
      .orderBy(asc(documentChunks.chunkIndex));
  }

  async createDocumentChunk(chunk: InsertDocumentChunk): Promise<DocumentChunk> {
    const [created] = await db.insert(documentChunks).values(chunk as any).returning();
    await this.updateDocumentChunkCount(chunk.documentId);
    return created;
  }

  async bulkCreateDocumentChunks(chunks: InsertDocumentChunk[]): Promise<DocumentChunk[]> {
    if (chunks.length === 0) return [];
    const created = await db.insert(documentChunks).values(chunks as any).returning();
    const documentIds = Array.from(new Set(chunks.map(c => c.documentId)));
    for (const docId of documentIds) {
      await this.updateDocumentChunkCount(docId);
    }
    return created;
  }

  async deleteDocumentChunks(documentId: string): Promise<void> {
    await db.delete(documentChunks).where(eq(documentChunks.documentId, documentId));
    await this.updateDocumentChunkCount(documentId);
  }

  private async updateDocumentChunkCount(documentId: string): Promise<void> {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(documentChunks)
      .where(eq(documentChunks.documentId, documentId));
    const chunkCount = Number(result?.count) || 0;
    await db
      .update(documents)
      .set({ chunkCount, updatedAt: new Date() })
      .where(eq(documents.id, documentId));
  }

  async searchChunksByContent(query: string, limit: number = 20): Promise<DocumentChunk[]> {
    const searchPattern = `%${query}%`;
    return db
      .select()
      .from(documentChunks)
      .where(ilike(documentChunks.content, searchPattern))
      .limit(limit);
  }

  // --- SEO KEYWORDS ---
  async getSeoKeyword(id: string): Promise<SeoKeyword | undefined> {
    const [keyword] = await db.select().from(seoKeywords).where(eq(seoKeywords.id, id));
    return keyword || undefined;
  }

  async getSeoKeywordByKeyword(keyword: string): Promise<SeoKeyword | undefined> {
    const [result] = await db.select().from(seoKeywords).where(eq(seoKeywords.keyword, keyword));
    return result || undefined;
  }

  async getAllSeoKeywords(): Promise<SeoKeyword[]> {
    return db.select().from(seoKeywords).orderBy(desc(seoKeywords.relevanceScore), asc(seoKeywords.difficultyScore));
  }

  async getSeoKeywordsByStatus(status: string): Promise<SeoKeyword[]> {
    return db.select().from(seoKeywords).where(eq(seoKeywords.status, status)).orderBy(desc(seoKeywords.relevanceScore));
  }

  async getHighOpportunityKeywords(options: { minRelevance?: number; maxDifficulty?: number; minVolume?: number; limit?: number } = {}): Promise<SeoKeyword[]> {
    const { minRelevance = 50, maxDifficulty = 60, minVolume = 20, limit = 50 } = options;

    return db
      .select()
      .from(seoKeywords)
      .where(
        and(
          sql`${seoKeywords.relevanceScore} >= ${minRelevance}`,
          sql`${seoKeywords.difficultyScore} <= ${maxDifficulty}`,
          sql`${seoKeywords.volumeEstimate} >= ${minVolume}`
        )
      )
      .orderBy(desc(seoKeywords.relevanceScore), asc(seoKeywords.difficultyScore))
      .limit(limit);
  }

  async createSeoKeyword(keyword: InsertSeoKeyword): Promise<SeoKeyword> {
    const [created] = await db.insert(seoKeywords).values(keyword).returning();
    return created;
  }

  async updateSeoKeyword(id: string, keyword: Partial<InsertSeoKeyword>): Promise<SeoKeyword> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(keyword)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(seoKeywords)
      .set(filteredUpdates as any)
      .where(eq(seoKeywords.id, id))
      .returning();
    return updated;
  }

  async deleteSeoKeyword(id: string): Promise<void> {
    await db.delete(seoKeywords).where(eq(seoKeywords.id, id));
  }

  async bulkCreateSeoKeywords(keywords: InsertSeoKeyword[]): Promise<SeoKeyword[]> {
    if (keywords.length === 0) return [];
    const created = await db.insert(seoKeywords).values(keywords).returning();
    return created;
  }

  // --- MAGIC PAGE SUGGESTIONS ---
  async getMagicPageSuggestion(id: string): Promise<MagicPageSuggestion | undefined> {
    const [suggestion] = await db.select().from(magicPageSuggestions).where(eq(magicPageSuggestions.id, id));
    return suggestion || undefined;
  }

  async getAllMagicPageSuggestions(): Promise<MagicPageSuggestion[]> {
    return db.select().from(magicPageSuggestions).orderBy(desc(magicPageSuggestions.score), desc(magicPageSuggestions.createdAt));
  }

  async getMagicPageSuggestionsByStatus(status: string): Promise<MagicPageSuggestion[]> {
    return db
      .select()
      .from(magicPageSuggestions)
      .where(eq(magicPageSuggestions.status, status))
      .orderBy(desc(magicPageSuggestions.score));
  }

  async getMagicPageSuggestionByKeyword(keywordId: string): Promise<MagicPageSuggestion | undefined> {
    const [suggestion] = await db
      .select()
      .from(magicPageSuggestions)
      .where(eq(magicPageSuggestions.keywordId, keywordId));
    return suggestion || undefined;
  }

  async createMagicPageSuggestion(suggestion: InsertMagicPageSuggestion): Promise<MagicPageSuggestion> {
    const [created] = await db.insert(magicPageSuggestions).values(suggestion as any).returning();
    return created;
  }

  async updateMagicPageSuggestion(id: string, suggestion: Partial<InsertMagicPageSuggestion>): Promise<MagicPageSuggestion> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(suggestion)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(magicPageSuggestions)
      .set(filteredUpdates as any)
      .where(eq(magicPageSuggestions.id, id))
      .returning();
    return updated;
  }

  async deleteMagicPageSuggestion(id: string): Promise<void> {
    await db.delete(magicPageSuggestions).where(eq(magicPageSuggestions.id, id));
  }

  // --- CMS SETTINGS ---
  async getCmsSetting(key: string): Promise<CmsSetting | undefined> {
    const [setting] = await db.select().from(cmsSettings).where(eq(cmsSettings.key, key));
    return setting || undefined;
  }

  async getAllCmsSettings(): Promise<CmsSetting[]> {
    return db.select().from(cmsSettings).orderBy(asc(cmsSettings.category), asc(cmsSettings.key));
  }

  async getCmsSettingsByCategory(category: string): Promise<CmsSetting[]> {
    return db
      .select()
      .from(cmsSettings)
      .where(eq(cmsSettings.category, category))
      .orderBy(asc(cmsSettings.key));
  }

  async setCmsSetting(key: string, value: any, description?: string, category?: string): Promise<CmsSetting> {
    const existing = await this.getCmsSetting(key);

    if (existing) {
      const [updated] = await db
        .update(cmsSettings)
        .set({
          value,
          description: description !== undefined ? description : existing.description,
          category: category !== undefined ? category : existing.category,
          updatedAt: new Date()
        })
        .where(eq(cmsSettings.key, key))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(cmsSettings)
        .values({ key, value, description, category: category ?? 'general' })
        .returning();
      return created;
    }
  }

  async deleteCmsSetting(key: string): Promise<void> {
    await db.delete(cmsSettings).where(eq(cmsSettings.key, key));
  }

  // --- LINKING RULES ---
  async getLinkingRule(id: string): Promise<LinkingRule | undefined> {
    const [rule] = await db.select().from(linkingRules).where(eq(linkingRules.id, id));
    return rule || undefined;
  }

  async getAllLinkingRules(): Promise<LinkingRule[]> {
    return db.select().from(linkingRules).orderBy(asc(linkingRules.priority), desc(linkingRules.createdAt));
  }

  async getActiveLinkingRules(): Promise<LinkingRule[]> {
    return db
      .select()
      .from(linkingRules)
      .where(eq(linkingRules.isActive, true))
      .orderBy(asc(linkingRules.priority));
  }

  async getLinkingRulesByType(ruleType: string): Promise<LinkingRule[]> {
    return db
      .select()
      .from(linkingRules)
      .where(eq(linkingRules.ruleType, ruleType))
      .orderBy(asc(linkingRules.priority));
  }

  async createLinkingRule(rule: InsertLinkingRule): Promise<LinkingRule> {
    const [created] = await db.insert(linkingRules).values(rule).returning();
    return created;
  }

  async updateLinkingRule(id: string, rule: Partial<InsertLinkingRule>): Promise<LinkingRule> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(rule)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(linkingRules)
      .set(filteredUpdates as any)
      .where(eq(linkingRules.id, id))
      .returning();
    return updated;
  }

  async deleteLinkingRule(id: string): Promise<void> {
    await db.delete(linkingRules).where(eq(linkingRules.id, id));
  }

  // --- CTA TEMPLATES ---
  async getCtaTemplate(id: string): Promise<CtaTemplate | undefined> {
    const [template] = await db.select().from(ctaTemplates).where(eq(ctaTemplates.id, id));
    return template || undefined;
  }

  async getCtaTemplateBySlug(slug: string): Promise<CtaTemplate | undefined> {
    const [template] = await db.select().from(ctaTemplates).where(eq(ctaTemplates.slug, slug));
    return template || undefined;
  }

  async getAllCtaTemplates(): Promise<CtaTemplate[]> {
    return db.select().from(ctaTemplates).orderBy(asc(ctaTemplates.priority), desc(ctaTemplates.createdAt));
  }

  async getActiveCtaTemplates(): Promise<CtaTemplate[]> {
    return db
      .select()
      .from(ctaTemplates)
      .where(eq(ctaTemplates.isActive, true))
      .orderBy(asc(ctaTemplates.priority));
  }

  async getCtaTemplatesByPosition(position: string): Promise<CtaTemplate[]> {
    return db
      .select()
      .from(ctaTemplates)
      .where(and(eq(ctaTemplates.position, position), eq(ctaTemplates.isActive, true)))
      .orderBy(asc(ctaTemplates.priority));
  }

  async getMatchingCtaTemplates(options: { clusterKey?: string; keywords?: string[] }): Promise<CtaTemplate[]> {
    const { clusterKey, keywords } = options;
    const conditions = [eq(ctaTemplates.isActive, true)];

    if (clusterKey) {
      conditions.push(sql`${ctaTemplates.triggerClusters} && ARRAY[${clusterKey}]::text[]`);
    }

    if (keywords && keywords.length > 0) {
      conditions.push(sql`${ctaTemplates.triggerKeywords} && ${keywords}::text[]`);
    }

    if (conditions.length === 1) {
      return db
        .select()
        .from(ctaTemplates)
        .where(conditions[0])
        .orderBy(asc(ctaTemplates.priority));
    }

    return db
      .select()
      .from(ctaTemplates)
      .where(or(...conditions))
      .orderBy(asc(ctaTemplates.priority));
  }

  async createCtaTemplate(template: InsertCtaTemplate): Promise<CtaTemplate> {
    const [created] = await db.insert(ctaTemplates).values(template as any).returning();
    return created;
  }

  async updateCtaTemplate(id: string, template: Partial<InsertCtaTemplate>): Promise<CtaTemplate> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(template)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(ctaTemplates)
      .set(filteredUpdates as any)
      .where(eq(ctaTemplates.id, id))
      .returning();
    return updated;
  }

  async deleteCtaTemplate(id: string): Promise<void> {
    await db.delete(ctaTemplates).where(eq(ctaTemplates.id, id));
  }

  // --- MAGIC AI SETTINGS (singleton) ---
  async getMagicAiSettings(): Promise<MagicAiSettings | undefined> {
    const [settings] = await db.select().from(magicAiSettings).where(eq(magicAiSettings.id, 1));
    return settings || undefined;
  }

  async updateMagicAiSettings(basePrompt: string): Promise<MagicAiSettings> {
    const existing = await this.getMagicAiSettings();

    if (existing) {
      const [updated] = await db
        .update(magicAiSettings)
        .set({ magicPageBasePrompt: basePrompt, updatedAt: new Date() })
        .where(eq(magicAiSettings.id, 1))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(magicAiSettings)
        .values({ id: 1, magicPageBasePrompt: basePrompt })
        .returning();
      return created;
    }
  }

  // --- HTML TEMPLATES (Andara Component System) ---
  async getHtmlTemplate(id: string): Promise<HtmlTemplate | undefined> {
    const [template] = await db.select().from(htmlTemplates).where(eq(htmlTemplates.id, id));
    return template || undefined;
  }

  async getHtmlTemplateBySlug(slug: string): Promise<HtmlTemplate | undefined> {
    const [template] = await db.select().from(htmlTemplates).where(eq(htmlTemplates.slug, slug));
    return template || undefined;
  }

  async getAllHtmlTemplates(): Promise<HtmlTemplate[]> {
    return db.select().from(htmlTemplates).orderBy(desc(htmlTemplates.createdAt));
  }

  async getHtmlTemplatesByType(templateType: string): Promise<HtmlTemplate[]> {
    return db
      .select()
      .from(htmlTemplates)
      .where(eq(htmlTemplates.templateType, templateType))
      .orderBy(desc(htmlTemplates.createdAt));
  }

  async createHtmlTemplate(template: InsertHtmlTemplate): Promise<HtmlTemplate> {
    const [created] = await db.insert(htmlTemplates).values(template as any).returning();
    return created;
  }

  async updateHtmlTemplate(id: string, template: Partial<InsertHtmlTemplate>): Promise<HtmlTemplate> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(template)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(htmlTemplates)
      .set(filteredUpdates as any)
      .where(eq(htmlTemplates.id, id))
      .returning();
    return updated;
  }

  async deleteHtmlTemplate(id: string): Promise<void> {
    await db.delete(htmlTemplates).where(eq(htmlTemplates.id, id));
  }

  // --- PAGE IMAGE PROMPTS (AI-generated image slots) ---
  async getPageImagePrompt(id: string): Promise<PageImagePrompt | undefined> {
    const [prompt] = await db.select().from(pageImagePrompts).where(eq(pageImagePrompts.id, id));
    return prompt || undefined;
  }

  async getPageImagePrompts(pageId: string): Promise<PageImagePrompt[]> {
    return db
      .select()
      .from(pageImagePrompts)
      .where(eq(pageImagePrompts.pageId, pageId))
      .orderBy(asc(pageImagePrompts.sortOrder));
  }

  async createPageImagePrompt(prompt: InsertPageImagePrompt): Promise<PageImagePrompt> {
    const [created] = await db.insert(pageImagePrompts).values(prompt as any).returning();
    return created;
  }

  async updatePageImagePrompt(id: string, prompt: Partial<InsertPageImagePrompt>): Promise<PageImagePrompt> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(prompt)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(pageImagePrompts)
      .set(filteredUpdates as any)
      .where(eq(pageImagePrompts.id, id))
      .returning();
    return updated;
  }

  async deletePageImagePrompt(id: string): Promise<void> {
    await db.delete(pageImagePrompts).where(eq(pageImagePrompts.id, id));
  }

  async deleteAllPageImagePrompts(pageId: string): Promise<void> {
    await db.delete(pageImagePrompts).where(eq(pageImagePrompts.pageId, pageId));
  }

  async bulkCreatePageImagePrompts(prompts: InsertPageImagePrompt[]): Promise<PageImagePrompt[]> {
    if (prompts.length === 0) return [];
    return db.insert(pageImagePrompts).values(prompts as any).returning();
  }

  // --- ADMIN AI SETTINGS (BigMind preferences) ---
  async getAdminAiSetting(key: string): Promise<AdminAiSetting | undefined> {
    const [setting] = await db.select().from(adminAiSettings).where(eq(adminAiSettings.key, key));
    return setting || undefined;
  }

  async getAllAdminAiSettings(): Promise<AdminAiSetting[]> {
    return db.select().from(adminAiSettings).orderBy(asc(adminAiSettings.sortOrder));
  }

  async getAdminAiSettingsByCategory(category: string): Promise<AdminAiSetting[]> {
    return db
      .select()
      .from(adminAiSettings)
      .where(eq(adminAiSettings.category, category))
      .orderBy(asc(adminAiSettings.sortOrder));
  }

  async getActiveAdminAiSettings(): Promise<AdminAiSetting[]> {
    return db
      .select()
      .from(adminAiSettings)
      .where(eq(adminAiSettings.isActive, true))
      .orderBy(asc(adminAiSettings.sortOrder));
  }

  async createAdminAiSetting(setting: InsertAdminAiSetting): Promise<AdminAiSetting> {
    const [created] = await db.insert(adminAiSettings).values(setting as any).returning();
    return created;
  }

  async updateAdminAiSetting(key: string, setting: Partial<InsertAdminAiSetting>): Promise<AdminAiSetting> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [k, value] of Object.entries(setting)) {
      if (value !== undefined) {
        filteredUpdates[k] = value;
      }
    }
    const [updated] = await db
      .update(adminAiSettings)
      .set(filteredUpdates as any)
      .where(eq(adminAiSettings.key, key))
      .returning();
    return updated;
  }

  async deleteAdminAiSetting(key: string): Promise<void> {
    await db.delete(adminAiSettings).where(eq(adminAiSettings.key, key));
  }

  // --- MAGIC PAGE SESSIONS (AI page generation workflow) ---
  async getMagicPageSession(id: string): Promise<MagicPageSession | undefined> {
    const [session] = await db.select().from(magicPageSessions).where(eq(magicPageSessions.id, id));
    return session || undefined;
  }

  async getAllMagicPageSessions(): Promise<MagicPageSession[]> {
    return db.select().from(magicPageSessions).orderBy(desc(magicPageSessions.createdAt));
  }

  async getMagicPageSessionsByStatus(status: string): Promise<MagicPageSession[]> {
    return db
      .select()
      .from(magicPageSessions)
      .where(eq(magicPageSessions.status, status))
      .orderBy(desc(magicPageSessions.createdAt));
  }

  async createMagicPageSession(session: InsertMagicPageSession): Promise<MagicPageSession> {
    const [created] = await db.insert(magicPageSessions).values(session as any).returning();
    return created;
  }

  async updateMagicPageSession(id: string, session: Partial<InsertMagicPageSession>): Promise<MagicPageSession> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(session)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(magicPageSessions)
      .set(filteredUpdates as any)
      .where(eq(magicPageSessions.id, id))
      .returning();
    return updated;
  }

  async deleteMagicPageSession(id: string): Promise<void> {
    await db.delete(magicPageSessions).where(eq(magicPageSessions.id, id));
  }

  // --- BIGMIND CHAT SESSIONS ---
  async getBigmindSession(id: string): Promise<BigmindSession | undefined> {
    const [session] = await db.select().from(bigmindSessions).where(eq(bigmindSessions.id, id));
    return session || undefined;
  }

  async getAllBigmindSessions(): Promise<BigmindSession[]> {
    return db.select().from(bigmindSessions).orderBy(desc(bigmindSessions.updatedAt));
  }

  async createBigmindSession(session: InsertBigmindSession): Promise<BigmindSession> {
    const [created] = await db.insert(bigmindSessions).values(session as any).returning();
    return created;
  }

  async updateBigmindSession(id: string, session: Partial<InsertBigmindSession>): Promise<BigmindSession> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(session)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(bigmindSessions)
      .set(filteredUpdates as any)
      .where(eq(bigmindSessions.id, id))
      .returning();
    return updated;
  }

  async deleteBigmindSession(id: string): Promise<void> {
    await db.delete(bigmindSessions).where(eq(bigmindSessions.id, id));
  }

  // --- BIGMIND CHAT MESSAGES ---
  async getBigmindMessages(sessionId: string): Promise<BigmindMessage[]> {
    return db
      .select()
      .from(bigmindMessages)
      .where(eq(bigmindMessages.sessionId, sessionId))
      .orderBy(asc(bigmindMessages.createdAt));
  }

  async createBigmindMessage(message: InsertBigmindMessage): Promise<BigmindMessage> {
    const [created] = await db.insert(bigmindMessages).values(message as any).returning();
    // Update session message count and last message timestamp
    await db
      .update(bigmindSessions)
      .set({
        messageCount: sql`${bigmindSessions.messageCount} + 1`,
        lastMessageAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(bigmindSessions.id, message.sessionId));
    return created;
  }

  async getRecentBigmindMessages(limit: number = 50): Promise<BigmindMessage[]> {
    return db
      .select()
      .from(bigmindMessages)
      .orderBy(desc(bigmindMessages.createdAt))
      .limit(limit);
  }

  // --- PAGE AI CHAT SESSIONS ---
  async getPageAiSession(id: string): Promise<PageAiSession | undefined> {
    const [session] = await db.select().from(pageAiSessions).where(eq(pageAiSessions.id, id));
    return session || undefined;
  }

  async getAllPageAiSessions(): Promise<PageAiSession[]> {
    return db.select().from(pageAiSessions).orderBy(desc(pageAiSessions.updatedAt));
  }

  async getPageAiSessionsByPageKey(pageKey: string): Promise<PageAiSession[]> {
    return db.select().from(pageAiSessions).where(eq(pageAiSessions.pageKey, pageKey)).orderBy(desc(pageAiSessions.updatedAt));
  }

  async createPageAiSession(session: InsertPageAiSession): Promise<PageAiSession> {
    const [created] = await db.insert(pageAiSessions).values(session as any).returning();
    return created;
  }

  async updatePageAiSession(id: string, session: Partial<InsertPageAiSession>): Promise<PageAiSession> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(session)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(pageAiSessions)
      .set(filteredUpdates as any)
      .where(eq(pageAiSessions.id, id))
      .returning();
    return updated;
  }

  async deletePageAiSession(id: string): Promise<void> {
    await db.delete(pageAiSessions).where(eq(pageAiSessions.id, id));
  }

  // --- PAGE AI CHAT MESSAGES ---
  async getPageAiMessages(sessionId: string): Promise<PageAiMessage[]> {
    return db
      .select()
      .from(pageAiMessages)
      .where(eq(pageAiMessages.sessionId, sessionId))
      .orderBy(asc(pageAiMessages.createdAt));
  }

  async createPageAiMessage(message: InsertPageAiMessage): Promise<PageAiMessage> {
    const [created] = await db.insert(pageAiMessages).values(message as any).returning();
    // Update session message count and last message timestamp
    await db
      .update(pageAiSessions)
      .set({
        messageCount: sql`${pageAiSessions.messageCount} + 1`,
        lastMessageAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(pageAiSessions.id, message.sessionId));
    return created;
  }

  // --- PAGE MEDIA ASSETS ---
  async getPageMediaAssets(pageKey: string): Promise<PageMediaAsset[]> {
    return db.select().from(pageMediaAssets).where(eq(pageMediaAssets.pageKey, pageKey)).orderBy(asc(pageMediaAssets.createdAt));
  }

  async getPageMediaAsset(id: string): Promise<PageMediaAsset | undefined> {
    const [asset] = await db.select().from(pageMediaAssets).where(eq(pageMediaAssets.id, id));
    return asset || undefined;
  }

  async createPageMediaAsset(asset: InsertPageMediaAsset): Promise<PageMediaAsset> {
    const [created] = await db.insert(pageMediaAssets).values(asset as any).returning();
    return created;
  }

  async updatePageMediaAsset(id: string, asset: Partial<InsertPageMediaAsset>): Promise<PageMediaAsset> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(asset)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(pageMediaAssets)
      .set(filteredUpdates as any)
      .where(eq(pageMediaAssets.id, id))
      .returning();
    return updated;
  }

  async deletePageMediaAsset(id: string): Promise<void> {
    await db.delete(pageMediaAssets).where(eq(pageMediaAssets.id, id));
  }

  async deletePageMediaAssetsByPageKey(pageKey: string): Promise<void> {
    await db.delete(pageMediaAssets).where(eq(pageMediaAssets.pageKey, pageKey));
  }

  // --- PAGE ENHANCEMENTS ---
  async getPageEnhancement(id: string): Promise<PageEnhancement | undefined> {
    const [enhancement] = await db.select().from(pageEnhancements).where(eq(pageEnhancements.id, id));
    return enhancement || undefined;
  }

  async getPageEnhancements(pageId: string): Promise<PageEnhancement[]> {
    return db.select().from(pageEnhancements).where(eq(pageEnhancements.pageId, pageId)).orderBy(desc(pageEnhancements.createdAt));
  }

  async getPageEnhancementsBySession(sessionId: string): Promise<PageEnhancement[]> {
    return db.select().from(pageEnhancements).where(eq(pageEnhancements.sessionId, sessionId)).orderBy(desc(pageEnhancements.createdAt));
  }

  async getPendingEnhancements(pageId: string): Promise<PageEnhancement[]> {
    return db.select().from(pageEnhancements)
      .where(and(eq(pageEnhancements.pageId, pageId), eq(pageEnhancements.status, 'pending')))
      .orderBy(desc(pageEnhancements.createdAt));
  }

  async createPageEnhancement(enhancement: InsertPageEnhancement): Promise<PageEnhancement> {
    const [created] = await db.insert(pageEnhancements).values(enhancement as any).returning();
    return created;
  }

  async bulkCreatePageEnhancements(enhancements: InsertPageEnhancement[]): Promise<PageEnhancement[]> {
    if (enhancements.length === 0) return [];
    return db.insert(pageEnhancements).values(enhancements as any).returning();
  }

  async updatePageEnhancement(id: string, enhancement: Partial<InsertPageEnhancement>): Promise<PageEnhancement> {
    const filteredUpdates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(enhancement)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(pageEnhancements)
      .set(filteredUpdates as any)
      .where(eq(pageEnhancements.id, id))
      .returning();
    return updated;
  }

  async deletePageEnhancement(id: string): Promise<void> {
    await db.delete(pageEnhancements).where(eq(pageEnhancements.id, id));
  }

  async deletePageEnhancementsByPage(pageId: string): Promise<void> {
    await db.delete(pageEnhancements).where(eq(pageEnhancements.pageId, pageId));
  }

  async applyEnhancements(enhancementIds: string[]): Promise<void> {
    if (enhancementIds.length === 0) return;
    await db.update(pageEnhancements)
      .set({ status: 'applied', appliedAt: new Date() })
      .where(inArray(pageEnhancements.id, enhancementIds));
  }

  // --- BIGMIND SUGGESTIONS ---
  async getBigmindSuggestion(id: string): Promise<BigmindSuggestion | undefined> {
    const [suggestion] = await db.select().from(bigmindSuggestions).where(eq(bigmindSuggestions.id, id));
    return suggestion || undefined;
  }

  async getAllBigmindSuggestions(): Promise<BigmindSuggestion[]> {
    return db.select().from(bigmindSuggestions).orderBy(desc(bigmindSuggestions.createdAt));
  }

  async getBigmindSuggestionsByStatus(status: string): Promise<BigmindSuggestion[]> {
    return db.select().from(bigmindSuggestions)
      .where(eq(bigmindSuggestions.status, status))
      .orderBy(desc(bigmindSuggestions.createdAt));
  }

  async getBigmindSuggestionsByPageKey(pageKey: string): Promise<BigmindSuggestion[]> {
    return db.select().from(bigmindSuggestions)
      .where(eq(bigmindSuggestions.pageKey, pageKey))
      .orderBy(desc(bigmindSuggestions.createdAt));
  }

  async getPendingBigmindSuggestions(): Promise<BigmindSuggestion[]> {
    return db.select().from(bigmindSuggestions)
      .where(eq(bigmindSuggestions.status, 'pending'))
      .orderBy(desc(bigmindSuggestions.createdAt));
  }

  async createBigmindSuggestion(suggestion: InsertBigmindSuggestion): Promise<BigmindSuggestion> {
    const [created] = await db.insert(bigmindSuggestions).values(suggestion as any).returning();
    return created;
  }

  async bulkCreateBigmindSuggestions(suggestions: InsertBigmindSuggestion[]): Promise<BigmindSuggestion[]> {
    if (suggestions.length === 0) return [];
    return db.insert(bigmindSuggestions).values(suggestions as any).returning();
  }

  async updateBigmindSuggestion(id: string, suggestion: Partial<InsertBigmindSuggestion>): Promise<BigmindSuggestion> {
    const filteredUpdates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(suggestion)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(bigmindSuggestions)
      .set(filteredUpdates as any)
      .where(eq(bigmindSuggestions.id, id))
      .returning();
    return updated;
  }

  async deleteBigmindSuggestion(id: string): Promise<void> {
    await db.delete(bigmindSuggestions).where(eq(bigmindSuggestions.id, id));
  }

  async applyBigmindSuggestion(id: string): Promise<BigmindSuggestion> {
    const [updated] = await db
      .update(bigmindSuggestions)
      .set({ status: 'applied', appliedAt: new Date() })
      .where(eq(bigmindSuggestions.id, id))
      .returning();
    return updated;
  }

  async dismissBigmindSuggestion(id: string): Promise<BigmindSuggestion> {
    const [updated] = await db
      .update(bigmindSuggestions)
      .set({ status: 'dismissed' })
      .where(eq(bigmindSuggestions.id, id))
      .returning();
    return updated;
  }

  // --- ORDERS ---
  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber));
    return order || undefined;
  }

  async getOrderByStripeSession(sessionId: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.stripeCheckoutSessionId, sessionId));
    return order || undefined;
  }

  async getAllOrders(): Promise<Order[]> {
    return db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    return db.select().from(orders)
      .where(eq(orders.status, status))
      .orderBy(desc(orders.createdAt));
  }

  async getOrdersByCustomerEmail(email: string): Promise<Order[]> {
    return db.select().from(orders)
      .where(eq(orders.customerEmail, email))
      .orderBy(desc(orders.createdAt));
  }

  async getRecentOrders(limit: number = 10): Promise<Order[]> {
    return db.select().from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(limit);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [created] = await db.insert(orders).values(order as any).returning();
    return created;
  }

  async updateOrder(id: string, order: Partial<InsertOrder>): Promise<Order> {
    const filteredUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(order)) {
      if (value !== undefined) {
        filteredUpdates[key] = value;
      }
    }
    const [updated] = await db
      .update(orders)
      .set(filteredUpdates as any)
      .where(eq(orders.id, id))
      .returning();
    return updated;
  }

  async updateOrderStatus(id: string, status: string, additionalFields?: Partial<InsertOrder>): Promise<Order> {
    const updates: Record<string, unknown> = {
      status,
      updatedAt: new Date(),
      ...additionalFields
    };

    if (status === 'paid') updates.paidAt = new Date();
    if (status === 'shipped') updates.shippedAt = new Date();
    if (status === 'delivered') updates.deliveredAt = new Date();
    if (status === 'cancelled') updates.cancelledAt = new Date();

    const [updated] = await db
      .update(orders)
      .set(updates)
      .where(eq(orders.id, id))
      .returning();
    return updated;
  }

  async deleteOrder(id: string): Promise<void> {
    await db.delete(orders).where(eq(orders.id, id));
  }

  async getOrderStats(): Promise<{
    totalOrders: number;
    pendingOrders: number;
    paidOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    totalRevenue: number;
  }> {
    const allOrders = await this.getAllOrders();
    const pendingOrders = allOrders.filter(o => o.status === 'pending').length;
    const paidOrders = allOrders.filter(o => o.status === 'paid' || o.status === 'processing').length;
    const shippedOrders = allOrders.filter(o => o.status === 'shipped').length;
    const deliveredOrders = allOrders.filter(o => o.status === 'delivered').length;
    const totalRevenue = allOrders
      .filter(o => ['paid', 'processing', 'shipped', 'delivered'].includes(o.status))
      .reduce((sum, o) => sum + o.total, 0);

    return {
      totalOrders: allOrders.length,
      pendingOrders,
      paidOrders,
      shippedOrders,
      deliveredOrders,
      totalRevenue,
    };
  }

  generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `AND-${timestamp}-${random}`;
  }

  // ============================================================================
  // SEO BRAIN STORAGE IMPLEMENTATIONS
  // ============================================================================

  // --- PAGE SEO ---
  async getPageSeo(pageId: string): Promise<PageSeo | undefined> {
    const [seo] = await db.select().from(pageSeo).where(eq(pageSeo.pageId, pageId));
    return seo || undefined;
  }

  async createPageSeo(seo: InsertPageSeo): Promise<PageSeo> {
    const [created] = await db.insert(pageSeo).values(seo as any).returning();
    return created;
  }

  async updatePageSeo(id: string, seo: Partial<InsertPageSeo>): Promise<PageSeo> {
    const [updated] = await db
      .update(pageSeo)
      .set({ ...seo, updatedAt: new Date() } as any)
      .where(eq(pageSeo.id, id))
      .returning();
    return updated;
  }

  async deletePageSeo(id: string): Promise<void> {
    await db.delete(pageSeo).where(eq(pageSeo.id, id));
  }

  async upsertPageSeo(pageId: string, seo: Partial<InsertPageSeo>): Promise<PageSeo> {
    const existing = await this.getPageSeo(pageId);
    if (existing) {
      return this.updatePageSeo(existing.id, seo);
    }
    return this.createPageSeo({ ...seo, pageId } as InsertPageSeo);
  }

  // --- PAGE SEARCH METRICS ---
  async getPageSearchMetrics(pageId: string, options?: { limit?: number; startDate?: Date; endDate?: Date }): Promise<PageSearchMetrics[]> {
    const conditions = [eq(pageSearchMetrics.pageId, pageId)];
    if (options?.startDate) {
      conditions.push(sql`${pageSearchMetrics.date} >= ${options.startDate}`);
    }
    if (options?.endDate) {
      conditions.push(sql`${pageSearchMetrics.date} <= ${options.endDate}`);
    }
    let query = db.select().from(pageSearchMetrics).where(and(...conditions)).orderBy(desc(pageSearchMetrics.date));
    if (options?.limit) {
      query = query.limit(options.limit) as typeof query;
    }
    return query;
  }

  async getLatestPageSearchMetrics(pageId: string): Promise<PageSearchMetrics | undefined> {
    const [metrics] = await db
      .select()
      .from(pageSearchMetrics)
      .where(eq(pageSearchMetrics.pageId, pageId))
      .orderBy(desc(pageSearchMetrics.date))
      .limit(1);
    return metrics || undefined;
  }

  async createPageSearchMetrics(metrics: InsertPageSearchMetrics): Promise<PageSearchMetrics> {
    const [created] = await db.insert(pageSearchMetrics).values(metrics).returning();
    return created;
  }

  async bulkCreatePageSearchMetrics(metrics: InsertPageSearchMetrics[]): Promise<PageSearchMetrics[]> {
    if (metrics.length === 0) return [];
    return db.insert(pageSearchMetrics).values(metrics).returning();
  }

  async getTopPerformingPages(options?: { limit?: number; metric?: 'clicks' | 'impressions' | 'ctr' }): Promise<Array<{ pageId: string; value: number }>> {
    const metric = options?.metric || 'clicks';
    const limit = options?.limit || 10;
    const column = metric === 'clicks' ? pageSearchMetrics.clicks :
      metric === 'impressions' ? pageSearchMetrics.impressions :
        pageSearchMetrics.ctr;

    const results = await db
      .select({
        pageId: pageSearchMetrics.pageId,
        value: sql<number>`SUM(${column})`
      })
      .from(pageSearchMetrics)
      .groupBy(pageSearchMetrics.pageId)
      .orderBy(desc(sql`SUM(${column})`))
      .limit(limit);

    return results;
  }

  // --- PAGE AI SUGGESTIONS ---
  async getPageAiSuggestion(id: string): Promise<PageAiSuggestion | undefined> {
    const [suggestion] = await db.select().from(pageAiSuggestions).where(eq(pageAiSuggestions.id, id));
    return suggestion || undefined;
  }

  async getPageAiSuggestions(pageId: string): Promise<PageAiSuggestion[]> {
    return db.select().from(pageAiSuggestions).where(eq(pageAiSuggestions.pageId, pageId)).orderBy(asc(pageAiSuggestions.priority), desc(pageAiSuggestions.opportunityScore));
  }

  async getPageAiSuggestionsByStatus(status: string): Promise<PageAiSuggestion[]> {
    return db.select().from(pageAiSuggestions).where(eq(pageAiSuggestions.status, status)).orderBy(asc(pageAiSuggestions.priority), desc(pageAiSuggestions.opportunityScore));
  }

  async getPendingPageAiSuggestions(options?: { limit?: number; priority?: number }): Promise<PageAiSuggestion[]> {
    const conditions = [eq(pageAiSuggestions.status, 'proposed')];
    if (options?.priority) {
      conditions.push(sql`${pageAiSuggestions.priority} <= ${options.priority}`);
    }
    let query = db.select().from(pageAiSuggestions).where(and(...conditions)).orderBy(asc(pageAiSuggestions.priority), desc(pageAiSuggestions.opportunityScore));
    if (options?.limit) {
      query = query.limit(options.limit) as typeof query;
    }
    return query;
  }

  async createPageAiSuggestion(suggestion: InsertPageAiSuggestion): Promise<PageAiSuggestion> {
    const [created] = await db.insert(pageAiSuggestions).values(suggestion as any).returning();
    return created;
  }

  async bulkCreatePageAiSuggestions(suggestions: InsertPageAiSuggestion[]): Promise<PageAiSuggestion[]> {
    if (suggestions.length === 0) return [];
    return db.insert(pageAiSuggestions).values(suggestions as any).returning();
  }

  async updatePageAiSuggestion(id: string, suggestion: Partial<InsertPageAiSuggestion>): Promise<PageAiSuggestion> {
    const [updated] = await db
      .update(pageAiSuggestions)
      .set({ ...suggestion, updatedAt: new Date() } as any)
      .where(eq(pageAiSuggestions.id, id))
      .returning();
    return updated;
  }

  async deletePageAiSuggestion(id: string): Promise<void> {
    await db.delete(pageAiSuggestions).where(eq(pageAiSuggestions.id, id));
  }

  async acceptPageAiSuggestion(id: string, reviewerId?: string): Promise<PageAiSuggestion> {
    const [updated] = await db
      .update(pageAiSuggestions)
      .set({ status: 'accepted', reviewedBy: reviewerId || null, updatedAt: new Date() })
      .where(eq(pageAiSuggestions.id, id))
      .returning();
    return updated;
  }

  async rejectPageAiSuggestion(id: string, reviewerId?: string): Promise<PageAiSuggestion> {
    const [updated] = await db
      .update(pageAiSuggestions)
      .set({ status: 'rejected', reviewedBy: reviewerId || null, updatedAt: new Date() })
      .where(eq(pageAiSuggestions.id, id))
      .returning();
    return updated;
  }

  async implementPageAiSuggestion(id: string): Promise<PageAiSuggestion> {
    const [updated] = await db
      .update(pageAiSuggestions)
      .set({ status: 'implemented', implementedAt: new Date(), updatedAt: new Date() })
      .where(eq(pageAiSuggestions.id, id))
      .returning();
    return updated;
  }

  // --- AI CONTENT BLOCKS ---
  async getAiContentBlock(id: string): Promise<AiContentBlock | undefined> {
    const [block] = await db.select().from(aiContentBlocks).where(eq(aiContentBlocks.id, id));
    return block || undefined;
  }

  async getAiContentBlocks(pageId: string): Promise<AiContentBlock[]> {
    return db.select().from(aiContentBlocks).where(eq(aiContentBlocks.pageId, pageId)).orderBy(asc(aiContentBlocks.priority));
  }

  async getAiContentBlocksByHook(pageId: string, hook: string): Promise<AiContentBlock[]> {
    return db.select().from(aiContentBlocks).where(and(eq(aiContentBlocks.pageId, pageId), eq(aiContentBlocks.hook, hook))).orderBy(asc(aiContentBlocks.priority));
  }

  async getLiveAiContentBlocks(pageId: string): Promise<AiContentBlock[]> {
    return db.select().from(aiContentBlocks).where(and(eq(aiContentBlocks.pageId, pageId), eq(aiContentBlocks.status, 'live'))).orderBy(asc(aiContentBlocks.priority));
  }

  async createAiContentBlock(block: InsertAiContentBlock): Promise<AiContentBlock> {
    const [created] = await db.insert(aiContentBlocks).values(block as any).returning();
    return created;
  }

  async updateAiContentBlock(id: string, block: Partial<InsertAiContentBlock>): Promise<AiContentBlock> {
    const [updated] = await db
      .update(aiContentBlocks)
      .set({ ...block, updatedAt: new Date() } as any)
      .where(eq(aiContentBlocks.id, id))
      .returning();
    return updated;
  }

  async deleteAiContentBlock(id: string): Promise<void> {
    await db.delete(aiContentBlocks).where(eq(aiContentBlocks.id, id));
  }

  async publishAiContentBlock(id: string, reviewerId?: string): Promise<AiContentBlock> {
    const [updated] = await db
      .update(aiContentBlocks)
      .set({ status: 'live', lastReviewedAt: new Date(), reviewedBy: reviewerId || null, updatedAt: new Date() })
      .where(eq(aiContentBlocks.id, id))
      .returning();
    return updated;
  }

  async archiveAiContentBlock(id: string): Promise<AiContentBlock> {
    const [updated] = await db
      .update(aiContentBlocks)
      .set({ status: 'archived', updatedAt: new Date() })
      .where(eq(aiContentBlocks.id, id))
      .returning();
    return updated;
  }

  async incrementBlockImpressions(id: string): Promise<void> {
    await db.update(aiContentBlocks)
      .set({ impressions: sql`${aiContentBlocks.impressions} + 1` })
      .where(eq(aiContentBlocks.id, id));
  }

  async incrementBlockClickThroughs(id: string): Promise<void> {
    await db.update(aiContentBlocks)
      .set({ clickThroughs: sql`${aiContentBlocks.clickThroughs} + 1` })
      .where(eq(aiContentBlocks.id, id));
  }

  // --- DESIGN TOKENS ---
  async getDesignToken(id: string): Promise<DesignToken | undefined> {
    const [token] = await db.select().from(designTokens).where(eq(designTokens.id, id));
    return token || undefined;
  }

  async getDesignTokenByClusterKey(clusterKey: string): Promise<DesignToken | undefined> {
    const [token] = await db.select().from(designTokens).where(eq(designTokens.clusterKey, clusterKey));
    return token || undefined;
  }

  async getAllDesignTokens(): Promise<DesignToken[]> {
    return db.select().from(designTokens).orderBy(asc(designTokens.clusterKey));
  }

  async createDesignToken(token: InsertDesignToken): Promise<DesignToken> {
    const [created] = await db.insert(designTokens).values(token).returning();
    return created;
  }

  async updateDesignToken(id: string, token: Partial<InsertDesignToken>): Promise<DesignToken> {
    const [updated] = await db
      .update(designTokens)
      .set({ ...token, updatedAt: new Date() })
      .where(eq(designTokens.id, id))
      .returning();
    return updated;
  }

  async deleteDesignToken(id: string): Promise<void> {
    await db.delete(designTokens).where(eq(designTokens.id, id));
  }

  async upsertDesignToken(clusterKey: string, token: Partial<InsertDesignToken>): Promise<DesignToken> {
    const existing = await this.getDesignTokenByClusterKey(clusterKey);
    if (existing) {
      return this.updateDesignToken(existing.id, token);
    }
    return this.createDesignToken({ ...token, clusterKey } as InsertDesignToken);
  }

  // --- PROPOSED PAGES ---
  async getProposedPage(id: string): Promise<ProposedPage | undefined> {
    const [page] = await db.select().from(proposedPages).where(eq(proposedPages.id, id));
    return page || undefined;
  }

  async getAllProposedPages(): Promise<ProposedPage[]> {
    return db.select().from(proposedPages).orderBy(desc(proposedPages.opportunityScore), desc(proposedPages.createdAt));
  }

  async getProposedPagesByStatus(status: string): Promise<ProposedPage[]> {
    return db.select().from(proposedPages).where(eq(proposedPages.status, status)).orderBy(desc(proposedPages.opportunityScore));
  }

  async getProposedPagesByCluster(clusterKey: string): Promise<ProposedPage[]> {
    return db.select().from(proposedPages).where(eq(proposedPages.clusterKey, clusterKey)).orderBy(desc(proposedPages.opportunityScore));
  }

  async createProposedPage(page: InsertProposedPage): Promise<ProposedPage> {
    const [created] = await db.insert(proposedPages).values(page as any).returning();
    return created;
  }

  async updateProposedPage(id: string, page: Partial<InsertProposedPage>): Promise<ProposedPage> {
    const [updated] = await db
      .update(proposedPages)
      .set({ ...page, updatedAt: new Date() } as any)
      .where(eq(proposedPages.id, id))
      .returning();
    return updated;
  }

  async deleteProposedPage(id: string): Promise<void> {
    await db.delete(proposedPages).where(eq(proposedPages.id, id));
  }

  async approveProposedPage(id: string, reviewerId?: string): Promise<ProposedPage> {
    const [updated] = await db
      .update(proposedPages)
      .set({ status: 'approved', reviewedBy: reviewerId || null, reviewedAt: new Date(), updatedAt: new Date() })
      .where(eq(proposedPages.id, id))
      .returning();
    return updated;
  }

  async rejectProposedPage(id: string, reviewerId?: string): Promise<ProposedPage> {
    const [updated] = await db
      .update(proposedPages)
      .set({ status: 'rejected', reviewedBy: reviewerId || null, reviewedAt: new Date(), updatedAt: new Date() })
      .where(eq(proposedPages.id, id))
      .returning();
    return updated;
  }

  async linkProposedPageToCreated(proposedId: string, createdPageId: string): Promise<ProposedPage> {
    const [updated] = await db
      .update(proposedPages)
      .set({ status: 'published', createdPageId, updatedAt: new Date() })
      .where(eq(proposedPages.id, proposedId))
      .returning();
    return updated;
  }

  // --- PAGE LAYOUTS ---
  async getPageLayout(pageId: string): Promise<PageLayout | undefined> {
    const [layout] = await db.select().from(pageLayouts).where(eq(pageLayouts.pageId, pageId));
    return layout || undefined;
  }

  async createPageLayout(layout: InsertPageLayout): Promise<PageLayout> {
    const [created] = await db.insert(pageLayouts).values(layout as any).returning();
    return created;
  }

  async updatePageLayout(id: string, layout: Partial<InsertPageLayout>): Promise<PageLayout> {
    const [updated] = await db
      .update(pageLayouts)
      .set({ ...layout, updatedAt: new Date() } as any)
      .where(eq(pageLayouts.id, id))
      .returning();
    return updated;
  }

  async deletePageLayout(id: string): Promise<void> {
    await db.delete(pageLayouts).where(eq(pageLayouts.id, id));
  }

  async upsertPageLayout(pageId: string, layout: Partial<InsertPageLayout>): Promise<PageLayout> {
    const existing = await this.getPageLayout(pageId);
    if (existing) {
      return this.updatePageLayout(existing.id, layout);
    }
    return this.createPageLayout({ ...layout, pageId } as InsertPageLayout);
  }

  // --- SEO OPTIMIZATION RUNS ---
  async getSeoOptimizationRun(id: string): Promise<SeoOptimizationRun | undefined> {
    const [run] = await db.select().from(seoOptimizationRuns).where(eq(seoOptimizationRuns.id, id));
    return run || undefined;
  }

  async getLatestSeoOptimizationRun(): Promise<SeoOptimizationRun | undefined> {
    const [run] = await db.select().from(seoOptimizationRuns).orderBy(desc(seoOptimizationRuns.runDate)).limit(1);
    return run || undefined;
  }

  async getAllSeoOptimizationRuns(options?: { limit?: number }): Promise<SeoOptimizationRun[]> {
    let query = db.select().from(seoOptimizationRuns).orderBy(desc(seoOptimizationRuns.runDate));
    if (options?.limit) {
      query = query.limit(options.limit) as typeof query;
    }
    return query;
  }

  async createSeoOptimizationRun(run: InsertSeoOptimizationRun): Promise<SeoOptimizationRun> {
    const [created] = await db.insert(seoOptimizationRuns).values(run as any).returning();
    return created;
  }

  async updateSeoOptimizationRun(id: string, run: Partial<InsertSeoOptimizationRun>): Promise<SeoOptimizationRun> {
    const [updated] = await db
      .update(seoOptimizationRuns)
      .set(run as any)
      .where(eq(seoOptimizationRuns.id, id))
      .returning();
    return updated;
  }

  async completeSeoOptimizationRun(id: string, summary: any): Promise<SeoOptimizationRun> {
    const [updated] = await db
      .update(seoOptimizationRuns)
      .set({ status: 'completed', summary, completedAt: new Date() })
      .where(eq(seoOptimizationRuns.id, id))
      .returning();
    return updated;
  }

  async failSeoOptimizationRun(id: string, errorLog: string): Promise<SeoOptimizationRun> {
    const [updated] = await db
      .update(seoOptimizationRuns)
      .set({ status: 'failed', errorLog, completedAt: new Date() })
      .where(eq(seoOptimizationRuns.id, id))
      .returning();
    return updated;
  }

  // ============================================================================
  // WORKFLOWS STORAGE IMPLEMENTATION
  // ============================================================================

  // --- Workflow Templates ---
  async createWorkflowTemplate(template: InsertWorkflowTemplate): Promise<WorkflowTemplate> {
    const [created] = await db.insert(workflowTemplates).values(template as any).returning();
    return created;
  }

  async getWorkflowTemplate(id: string): Promise<WorkflowTemplate | undefined> {
    const [template] = await db.select().from(workflowTemplates).where(eq(workflowTemplates.id, id));
    return template || undefined;
  }

  async getAllWorkflowTemplates(): Promise<WorkflowTemplate[]> {
    return db.select().from(workflowTemplates).orderBy(desc(workflowTemplates.createdAt));
  }

  async deleteWorkflowTemplate(id: string): Promise<void> {
    await db.delete(workflowTemplates).where(eq(workflowTemplates.id, id));
  }

  // --- Workflow Executions ---
  async createWorkflowExecution(execution: InsertWorkflowExecution): Promise<WorkflowExecution> {
    const [created] = await db.insert(workflowExecutions).values(execution as any).returning();
    return created;
  }

  async getWorkflowExecution(id: string): Promise<WorkflowExecution | undefined> {
    const [execution] = await db.select().from(workflowExecutions).where(eq(workflowExecutions.id, id));
    return execution || undefined;
  }

  async getAllWorkflowExecutions(): Promise<WorkflowExecution[]> {
    return db.select().from(workflowExecutions).orderBy(desc(workflowExecutions.startedAt));
  }

  async updateWorkflowExecution(id: string, execution: Partial<WorkflowExecution>): Promise<WorkflowExecution> {
    const [updated] = await db
      .update(workflowExecutions)
      .set({ ...execution, updatedAt: new Date() })
      .where(eq(workflowExecutions.id, id))
      .returning();
    return updated;
  }

  async deleteWorkflowExecution(id: string): Promise<void> {
    await db.delete(workflowExecutions).where(eq(workflowExecutions.id, id));
  }

  // --- Workflow Steps ---
  async createWorkflowStep(step: InsertWorkflowStep): Promise<WorkflowStep> {
    const [created] = await db.insert(workflowSteps).values(step as any).returning();
    return created;
  }

  async getWorkflowSteps(executionId: string): Promise<WorkflowStep[]> {
    return db
      .select()
      .from(workflowSteps)
      .where(eq(workflowSteps.executionId, executionId))
      .orderBy(asc(workflowSteps.stepIndex));
  }

  async updateWorkflowStep(id: string, step: Partial<WorkflowStep>): Promise<WorkflowStep> {
    const [updated] = await db
      .update(workflowSteps)
      .set(step)
      .where(eq(workflowSteps.id, id))
      .returning();
    return updated;
  }

  // --- Health Monitoring ---
  async getHealthRuns(limit: number = 20): Promise<HealthRun[]> {
    return db.select().from(healthRuns).orderBy(desc(healthRuns.startedAt)).limit(limit);
  }

  async getHealthRun(id: string): Promise<HealthRun | undefined> {
    const [run] = await db.select().from(healthRuns).where(eq(healthRuns.id, id));
    return run || undefined;
  }

  async createHealthRun(run: InsertHealthRun): Promise<HealthRun> {
    const [created] = await db.insert(healthRuns).values(run as any).returning();
    return created;
  }

  async updateHealthRun(id: string, run: Partial<HealthRun>): Promise<HealthRun> {
    const [updated] = await db
      .update(healthRuns)
      .set(run as any)
      .where(eq(healthRuns.id, id))
      .returning();
    return updated;
  }

  async getHealthIssues(runId: string): Promise<HealthIssue[]> {
    return db.select().from(healthIssues).where(eq(healthIssues.runId, runId)).orderBy(asc(healthIssues.createdAt));
  }

  async createHealthIssue(issue: InsertHealthIssue): Promise<HealthIssue> {
    const [created] = await db.insert(healthIssues).values(issue as any).returning();
    return created;
  }

  async updateHealthIssue(id: string, issue: Partial<HealthIssue>): Promise<HealthIssue> {
    const [updated] = await db
      .update(healthIssues)
      .set(issue as any)
      .where(eq(healthIssues.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
