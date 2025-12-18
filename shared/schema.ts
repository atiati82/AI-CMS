import { sql } from "drizzle-orm";
import { pgTable, text, integer, timestamp, varchar, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// --- TEMPLATE TYPES ---
export const PAGE_TEMPLATES = [
  'landing_home',
  'shop_overview',
  'product',
  'product_bundles',
  'tool_calculator',
  'guide',
  'b2b',
  'pillar_overview',
  'cluster_overview',
  'article',
  'longform_comparison',
  'explain_like_school',
  'about',
  'team',
  'legal',
  'blog_overview',
  'blog_post',
  'faq',
  'lab_data',
] as const;

export const PAGE_TYPES = ['page', 'product', 'tool', 'article', 'blog_post'] as const;

export const PAGE_STATUS = ['draft', 'published', 'archived'] as const;

// --- VISUAL VIBE TYPE (for clusters) ---
export type VisualVibe = {
  vibeKeywords: string[];
  emotionalTone: string[];
  animationIdeas: string[];
  aiImagePromptPattern?: string;
  aiVideoPromptPattern?: string;
  designerNotes?: string;
};

// --- VISUAL CONFIG TYPE (for pages) ---
export type VisualConfig = {
  pageId?: string;
  cluster?: string;
  priority?: 'P1' | 'P2' | 'P3';
  vibeKeywords?: string[];
  emotionalTone?: string[];
  animationIdeas?: string[];
  aiImagePrompt?: string;
  aiVideoPrompt?: string;
  designerNotes?: string;
  colorPalette?: string;
  motionPreset?: string;
  entranceMotion?: string;
  hoverMotion?: string;
  ambientMotion?: string;
  motionElements?: string[];
  motionConfig?: {
    archetype: string;
    elements: string[];
    appliedAt: string;
  };
  layoutsDetected?: string[];
  updatedAt?: string;
  batchUpdatedAt?: string;
};

// --- MOTION SPEC TYPE (parsed from REPLIT / MOTION LAYOUT PROMPT comments) ---
export type MotionSpec = {
  section: string;
  layoutClass?: string;
  layoutSpec?: string;
  responsiveSpec?: string;
  motionItems: Array<{
    preset: string;
    targetSelector?: string;
    targetDescription?: string;
    trigger?: 'scroll' | 'hover' | 'loop' | 'mount';
  }>;
  imageryDescription?: string;
  colorPalette?: string[];
  vibeKeywords?: string[];
  emotionalTone?: string[];
};

// --- AI ENRICHMENT TYPE (extracted from AI Startup HTML) ---
export type AiEnrichment = {
  extractedAt: string;
  imagePrompts: Array<{
    id: string;
    prompt: string;
    location: string;
    generated?: boolean;
    generatedUrl?: string;
  }>;
  videoPrompts: Array<{
    id: string;
    prompt: string;
    location: string;
  }>;
  layoutSpecs: Array<{
    section: string;
    spec: string;
  }>;
  animationSpecs: Array<{
    element: string;
    spec: string;
  }>;
  motionSpecs: Array<MotionSpec>;
  suggestedSeo: {
    title?: string;
    description?: string;
    focusKeyword?: string;
  };
  suggestedLinks: Array<{
    anchor: string;
    targetPath: string;
    reason: string;
  }>;
  components: string[];
  visualConfig?: {
    priority: 'P1' | 'P2' | 'P3';
    vibeKeywords: string[];
    emotionalTone: string[];
    animationIdeas: string[];
    aiImagePrompt: string;
    aiVideoPrompt: string;
    designerNotes: string;
  };
};

// --- CLUSTERS TABLE (expanded for all cluster types) ---
export const clusters = pgTable("clusters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  parentClusterKey: text("parent_cluster_key"),
  priority: integer("priority").notNull().default(5),
  color: text("color"),
  visualVibe: jsonb("visual_vibe").$type<VisualVibe>(),
});

export const insertClusterSchema = createInsertSchema(clusters).omit({ id: true });
export const selectClusterSchema = createSelectSchema(clusters);
export type InsertCluster = z.infer<typeof insertClusterSchema>;
export type Cluster = typeof clusters.$inferSelect;

// --- PAGES TABLE (flexible content for all page types) ---
export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  title: text("title").notNull(),
  path: text("path").notNull().unique(),
  pageType: text("page_type").notNull().default('page'),
  template: text("template").notNull().default('article'),
  clusterKey: text("cluster_key"),
  parentKey: text("parent_key"),
  priority: integer("priority").notNull().default(5),

  summary: text("summary"),
  content: text("content"),

  seoFocus: text("seo_focus"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoScore: integer("seo_score"),
  readabilityScore: integer("readability_score"),
  contentLengthWords: integer("content_length_words"),
  internalLinks: jsonb("internal_links").$type<string[]>().default([]),
  entities: jsonb("entities").$type<string[]>().default([]),

  featuredImage: text("featured_image"),
  icon: text("icon"),

  status: text("status").notNull().default('draft'),

  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  visualConfig: jsonb("visual_config").$type<VisualConfig>(),

  aiStartupHtml: text("ai_startup_html"),
  aiEnrichment: jsonb("ai_enrichment").$type<AiEnrichment>(),
  aiChatHistory: jsonb("ai_chat_history").$type<{
    messages: Array<{ role: 'user' | 'assistant'; content: string; timestamp: string; model?: string }>;
    lastModel?: string;
    extractedEnhancements?: {
      title?: string;
      seoTitle?: string;
      seoDescription?: string;
      visualConfig?: any;
      imagePrompts?: string[];
      motionSpecs?: any;
    };
  }>(),

  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectPageSchema = createSelectSchema(pages);
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;

// --- PRODUCTS TABLE ---
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  sizeMl: integer("size_ml").notNull(),
  descriptionShort: text("description_short").notNull(),
  descriptionLong: text("description_long").notNull(),
  highlights: text("highlights").array().notNull().default(sql`ARRAY[]::text[]`),
  price: integer("price").notNull(),
  pricePerLiter: integer("price_per_liter").notNull(),
  images: text("images").array().notNull().default(sql`ARRAY[]::text[]`),
  tags: text("tags").array().notNull().default(sql`ARRAY[]::text[]`),
  bundles: jsonb("bundles").$type<Array<{
    name: string;
    units: number;
    price: number;
    save: string;
  }>>().notNull().default([]),
  pageKey: text("page_key"),
  templateId: text("template_id"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});
export const selectProductSchema = createSelectSchema(products);
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// --- SCIENCE ARTICLES TABLE ---
export const scienceArticles = pgTable("science_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  clusterId: text("cluster_id").notNull().references(() => clusters.id, { onDelete: 'cascade' }),
  tags: text("tags").array().notNull().default(sql`ARRAY[]::text[]`),
  relatedProductIds: text("related_product_ids").array().notNull().default(sql`ARRAY[]::text[]`),
  priority: integer("priority").notNull().default(5),
  pageKey: text("page_key"),
  publishedAt: timestamp("published_at").notNull(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertScienceArticleSchema = createInsertSchema(scienceArticles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectScienceArticleSchema = createSelectSchema(scienceArticles);
export type InsertScienceArticle = z.infer<typeof insertScienceArticleSchema>;
export type ScienceArticle = typeof scienceArticles.$inferSelect;

// --- ADMIN USERS TABLE (Simple auth) ---
export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
});
export const selectAdminUserSchema = createSelectSchema(adminUsers);
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

// --- ADMIN AI SETTINGS TABLE (BigMind preferences) ---
export const AI_SETTING_CATEGORIES = ['tone', 'style', 'prompts', 'presets', 'magic_page'] as const;

export const adminAiSettings = pgTable("admin_ai_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  category: text("category").notNull().default('prompts'),
  label: text("label").notNull(),
  value: text("value").notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  metadata: jsonb("metadata").$type<{
    presetName?: string;
    zoneRestriction?: number;
    clusterRestriction?: string;
  }>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAdminAiSettingSchema = createInsertSchema(adminAiSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectAdminAiSettingSchema = createSelectSchema(adminAiSettings);
export type InsertAdminAiSetting = z.infer<typeof insertAdminAiSettingSchema>;
export type AdminAiSetting = typeof adminAiSettings.$inferSelect;

// --- MAGIC PAGE SESSIONS TABLE (track AI page generation workflow) ---
export const MAGIC_SESSION_STATUS = ['analyzing', 'outline_ready', 'generating', 'preview_ready', 'applied', 'cancelled'] as const;

export const magicPageSessions = pgTable("magic_page_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  sourceType: text("source_type").notNull().default('prompt'),
  sourceContent: text("source_content").notNull(),
  documentId: varchar("document_id").references(() => documents.id, { onDelete: 'set null' }),
  analysis: jsonb("analysis").$type<{
    keywords: string[];
    suggestedZone: number;
    suggestedCluster: string;
    suggestedLayouts: string[];
    outline: string[];
    summary: string;
  }>(),
  generatedHtml: text("generated_html"),
  generatedPath: text("generated_path"),
  status: text("status").notNull().default('analyzing'),
  appliedPageId: varchar("applied_page_id").references(() => pages.id, { onDelete: 'set null' }),
  createdBy: varchar("created_by").references(() => adminUsers.id, { onDelete: 'set null' }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMagicPageSessionSchema = createInsertSchema(magicPageSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectMagicPageSessionSchema = createSelectSchema(magicPageSessions);
export type InsertMagicPageSession = z.infer<typeof insertMagicPageSessionSchema>;
export type MagicPageSession = typeof magicPageSessions.$inferSelect;

// --- DOCUMENTS TABLE (Knowledge Base) ---
export const SOURCE_TYPES = ['upload', 'youtube', 'url', 'paste'] as const;
export const DOCUMENT_STATUS = ['pending', 'processing', 'indexed', 'failed'] as const;

export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  sourceType: text("source_type").notNull().default('upload'),
  sourceUrl: text("source_url"),
  rawText: text("raw_text").notNull(),
  cleanText: text("clean_text"),
  tags: text("tags").array().notNull().default(sql`ARRAY[]::text[]`),
  entities: text("entities").array().notNull().default(sql`ARRAY[]::text[]`),
  wordCount: integer("word_count").default(0),
  chunkCount: integer("chunk_count").default(0),
  status: text("status").notNull().default('pending'),
  embeddingModel: text("embedding_model"),
  errorMessage: text("error_message"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectDocumentSchema = createSelectSchema(documents);
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

// --- DOCUMENT CHUNKS TABLE (for semantic search) ---
export const documentChunks = pgTable("document_chunks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: varchar("document_id").notNull().references(() => documents.id, { onDelete: 'cascade' }),
  chunkIndex: integer("chunk_index").notNull(),
  content: text("content").notNull(),
  tokenCount: integer("token_count").default(0),
  embedding: jsonb("embedding").$type<number[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDocumentChunkSchema = createInsertSchema(documentChunks).omit({
  id: true,
  createdAt: true,
});
export const selectDocumentChunkSchema = createSelectSchema(documentChunks);
export type InsertDocumentChunk = z.infer<typeof insertDocumentChunkSchema>;
export type DocumentChunk = typeof documentChunks.$inferSelect;

// --- SEO KEYWORDS TABLE ---
export const SEARCH_INTENT = ['informational', 'commercial', 'navigational', 'transactional'] as const;
export const SEO_KEYWORD_STATUS = ['idea', 'analyzing', 'planned', 'in_progress', 'published', 'rejected'] as const;

export const seoKeywords = pgTable("seo_keywords", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  keyword: text("keyword").notNull(),
  searchIntent: text("search_intent").notNull().default('informational'),
  difficultyScore: integer("difficulty_score").default(50),
  volumeEstimate: integer("volume_estimate").default(0),
  relevanceScore: integer("relevance_score").default(50),
  competitorNotes: text("competitor_notes"),
  status: text("status").notNull().default('idea'),
  suggestedPageId: varchar("suggested_page_id"),
  targetClusterKey: text("target_cluster_key"),
  relatedDocIds: text("related_doc_ids").array().notNull().default(sql`ARRAY[]::text[]`),
  notes: text("notes"),
  lastAnalyzedAt: timestamp("last_analyzed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSeoKeywordSchema = createInsertSchema(seoKeywords).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectSeoKeywordSchema = createSelectSchema(seoKeywords);
export type InsertSeoKeyword = z.infer<typeof insertSeoKeywordSchema>;
export type SeoKeyword = typeof seoKeywords.$inferSelect;

// --- MAGIC PAGE SUGGESTIONS TABLE ---
export const MAGIC_PAGE_STATUS = ['suggested', 'outline_ready', 'generating', 'draft_ready', 'editing', 'published', 'rejected'] as const;

export const magicPageSuggestions = pgTable("magic_page_suggestions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  keywordId: varchar("keyword_id").references(() => seoKeywords.id, { onDelete: 'set null' }),
  targetKeyword: text("target_keyword").notNull(),
  workingTitle: text("working_title").notNull(),
  suggestedSlug: text("suggested_slug").notNull(),
  targetPersona: text("target_persona"),
  outline: jsonb("outline").$type<{
    sections: Array<{
      heading: string;
      level: number;
      description?: string;
    }>;
  }>().default({ sections: [] }),
  sourceDocIds: text("source_doc_ids").array().notNull().default(sql`ARRAY[]::text[]`),
  suggestedProductLinks: text("suggested_product_links").array().notNull().default(sql`ARRAY[]::text[]`),
  suggestedPageLinks: text("suggested_page_links").array().notNull().default(sql`ARRAY[]::text[]`),
  draftContent: jsonb("draft_content").$type<{
    hero?: { title: string; subtitle?: string };
    tldr?: string;
    sections?: Array<{ heading: string; content: string }>;
    faq?: Array<{ question: string; answer: string }>;
    cta?: { text: string; buttonText: string; productSlug?: string };
  }>(),
  generatedPageId: varchar("generated_page_id"),
  status: text("status").notNull().default('suggested'),
  score: integer("score").default(0),
  generationModel: text("generation_model"),
  generatedAt: timestamp("generated_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMagicPageSuggestionSchema = createInsertSchema(magicPageSuggestions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectMagicPageSuggestionSchema = createSelectSchema(magicPageSuggestions);
export type InsertMagicPageSuggestion = z.infer<typeof insertMagicPageSuggestionSchema>;
export type MagicPageSuggestion = typeof magicPageSuggestions.$inferSelect;

// --- LINKING RULES TABLE ---
export const LINKING_RULE_TYPES = ['keyword_match', 'cluster_based', 'page_type', 'manual'] as const;

export const linkingRules = pgTable("linking_rules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  ruleType: text("rule_type").notNull().default('keyword_match'),
  triggerPattern: text("trigger_pattern").notNull(),
  targetPagePath: text("target_page_path").notNull(),
  anchorText: text("anchor_text"),
  priority: integer("priority").notNull().default(5),
  maxOccurrences: integer("max_occurrences").notNull().default(1),
  isActive: boolean("is_active").notNull().default(true),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertLinkingRuleSchema = createInsertSchema(linkingRules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectLinkingRuleSchema = createSelectSchema(linkingRules);
export type InsertLinkingRule = z.infer<typeof insertLinkingRuleSchema>;
export type LinkingRule = typeof linkingRules.$inferSelect;

// --- CTA TEMPLATES TABLE ---
export const CTA_POSITIONS = ['after_intro', 'mid_content', 'before_faq', 'footer', 'sidebar'] as const;

export const ctaTemplates = pgTable("cta_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  headline: text("headline").notNull(),
  description: text("description"),
  buttonText: text("button_text").notNull().default('Learn More'),
  buttonLink: text("button_link"),
  productSlug: text("product_slug"),
  position: text("position").notNull().default('mid_content'),
  triggerClusters: text("trigger_clusters").array().notNull().default(sql`ARRAY[]::text[]`),
  triggerKeywords: text("trigger_keywords").array().notNull().default(sql`ARRAY[]::text[]`),
  priority: integer("priority").notNull().default(5),
  isActive: boolean("is_active").notNull().default(true),
  styling: jsonb("styling").$type<{
    backgroundColor?: string;
    textColor?: string;
    buttonColor?: string;
    borderStyle?: string;
  }>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCtaTemplateSchema = createInsertSchema(ctaTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectCtaTemplateSchema = createSelectSchema(ctaTemplates);
export type InsertCtaTemplate = z.infer<typeof insertCtaTemplateSchema>;
export type CtaTemplate = typeof ctaTemplates.$inferSelect;

// --- CMS SETTINGS TABLE ---
export const cmsSettings = pgTable("cms_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: jsonb("value").$type<any>().notNull(),
  description: text("description"),
  category: text("category").notNull().default('general'),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCmsSettingSchema = createInsertSchema(cmsSettings).omit({
  id: true,
  updatedAt: true,
});
export const selectCmsSettingSchema = createSelectSchema(cmsSettings);
export type InsertCmsSetting = z.infer<typeof insertCmsSettingSchema>;
export type CmsSetting = typeof cmsSettings.$inferSelect;

// --- MAGIC AI SETTINGS TABLE (singleton for base prompt) ---
export const magicAiSettings = pgTable("magic_ai_settings", {
  id: integer("id").primaryKey().default(1),
  magicPageBasePrompt: text("magic_page_base_prompt").notNull().default(''),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMagicAiSettingsSchema = createInsertSchema(magicAiSettings).omit({ updatedAt: true });
export const selectMagicAiSettingsSchema = createSelectSchema(magicAiSettings);
export type InsertMagicAiSettings = z.infer<typeof insertMagicAiSettingsSchema>;
export type MagicAiSettings = typeof magicAiSettings.$inferSelect;

// --- PAGE ENHANCEMENTS TABLE (AI-generated suggestions for pages) ---
export const ENHANCEMENT_TYPES = ['title', 'summary', 'seo_title', 'seo_description', 'hero_content', 'section_content', 'faq', 'cta', 'image_prompt', 'internal_link', 'tag', 'keyword'] as const;
export const ENHANCEMENT_STATUS = ['pending', 'accepted', 'rejected', 'applied'] as const;

export const pageEnhancements = pgTable("page_enhancements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").references(() => pages.id, { onDelete: 'cascade' }),
  sessionId: varchar("session_id"),
  enhancementType: text("enhancement_type").notNull(),
  fieldName: text("field_name"),
  currentValue: text("current_value"),
  suggestedValue: text("suggested_value").notNull(),
  reason: text("reason"),
  confidence: integer("confidence").default(80),
  status: text("status").notNull().default('pending'),
  sourceDocumentId: varchar("source_document_id").references(() => documents.id, { onDelete: 'set null' }),
  metadata: jsonb("metadata").$type<{
    aiModel?: string;
    prompt?: string;
    sourceChunks?: string[];
    relatedEnhancementIds?: string[];
  }>().default({}),
  appliedAt: timestamp("applied_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPageEnhancementSchema = createInsertSchema(pageEnhancements).omit({
  id: true,
  createdAt: true,
});
export const selectPageEnhancementSchema = createSelectSchema(pageEnhancements);
export type InsertPageEnhancement = z.infer<typeof insertPageEnhancementSchema>;
export type PageEnhancement = typeof pageEnhancements.$inferSelect;

// --- SERP SNAPSHOTS TABLE ---
export const serpSnapshots = pgTable("serp_snapshots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  keywordId: varchar("keyword_id").notNull().references(() => seoKeywords.id, { onDelete: 'cascade' }),
  keyword: text("keyword").notNull(),
  capturedAt: timestamp("captured_at").defaultNow().notNull(),
  source: text("source").notNull().default('manual'),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
});

export const insertSerpSnapshotSchema = createInsertSchema(serpSnapshots).omit({ id: true, capturedAt: true });
export const selectSerpSnapshotSchema = createSelectSchema(serpSnapshots);
export type InsertSerpSnapshot = z.infer<typeof insertSerpSnapshotSchema>;
export type SerpSnapshot = typeof serpSnapshots.$inferSelect;

// --- SERP RESULTS TABLE ---
export const serpResults = pgTable("serp_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  snapshotId: varchar("snapshot_id").notNull().references(() => serpSnapshots.id, { onDelete: 'cascade' }),
  position: integer("position").notNull(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  snippet: text("snippet"),
  isFeaturedSnippet: boolean("is_featured_snippet").notNull().default(false),
  isVideo: boolean("is_video").notNull().default(false),
  domainAuthorityApprox: integer("domain_authority_approx"),
});

export const insertSerpResultSchema = createInsertSchema(serpResults).omit({ id: true });
export const selectSerpResultSchema = createSelectSchema(serpResults);
export type InsertSerpResult = z.infer<typeof insertSerpResultSchema>;
export type SerpResult = typeof serpResults.$inferSelect;

// --- PAGE SEARCH PERFORMANCE TABLE (Google Search Console data) ---
export const pageSearchPerformance = pgTable("page_search_performance", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: 'cascade' }),
  query: text("query").notNull(),
  impressions: integer("impressions").notNull().default(0),
  clicks: integer("clicks").notNull().default(0),
  ctr: integer("ctr").notNull().default(0),
  position: integer("position").notNull().default(0),
  fromDate: timestamp("from_date").notNull(),
  toDate: timestamp("to_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPageSearchPerformanceSchema = createInsertSchema(pageSearchPerformance).omit({ id: true, createdAt: true });
export const selectPageSearchPerformanceSchema = createSelectSchema(pageSearchPerformance);
export type InsertPageSearchPerformance = z.infer<typeof insertPageSearchPerformanceSchema>;
export type PageSearchPerformance = typeof pageSearchPerformance.$inferSelect;

// --- LANDING PAGE SCORES TABLE ---
export const landingPageScores = pgTable("landing_page_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: 'cascade' }),
  calculatedAt: timestamp("calculated_at").defaultNow().notNull(),
  overallScore: integer("overall_score").notNull().default(0),
  onPageScore: integer("on_page_score").notNull().default(0),
  topicalDepthScore: integer("topical_depth_score").notNull().default(0),
  userSignalScore: integer("user_signal_score").notNull().default(0),
  internalLinkScore: integer("internal_link_score").notNull().default(0),
  notes: text("notes"),
});

export const insertLandingPageScoreSchema = createInsertSchema(landingPageScores).omit({ id: true, calculatedAt: true });
export const selectLandingPageScoreSchema = createSelectSchema(landingPageScores);
export type InsertLandingPageScore = z.infer<typeof insertLandingPageScoreSchema>;
export type LandingPageScore = typeof landingPageScores.$inferSelect;

// --- FILE ASSETS TABLE ---
export const fileAssets = pgTable("file_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: varchar("document_id").references(() => documents.id, { onDelete: 'set null' }),
  filename: text("filename").notNull(),
  originalFilename: text("original_filename").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  storagePath: text("storage_path").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFileAssetSchema = createInsertSchema(fileAssets).omit({ id: true, createdAt: true });
export const selectFileAssetSchema = createSelectSchema(fileAssets);
export type InsertFileAsset = z.infer<typeof insertFileAssetSchema>;
export type FileAsset = typeof fileAssets.$inferSelect;

// --- HTML TEMPLATES TABLE (Andara Component System) ---
export const TEMPLATE_TYPES = [
  'hero',
  'section',
  'grid',
  'calculator',
  'faq',
  'table',
  'cta',
  'callout',
  'full_page',
] as const;

export const htmlTemplates = pgTable("html_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  templateType: text("template_type").notNull().default('section'),
  componentClass: text("component_class"),
  description: text("description"),
  htmlContent: text("html_content").notNull(),
  previewImage: text("preview_image"),
  tags: text("tags").array().notNull().default(sql`ARRAY[]::text[]`),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertHtmlTemplateSchema = createInsertSchema(htmlTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectHtmlTemplateSchema = createSelectSchema(htmlTemplates);
export type InsertHtmlTemplate = z.infer<typeof insertHtmlTemplateSchema>;
export type HtmlTemplate = typeof htmlTemplates.$inferSelect;

// --- AI FILES TABLE (for AI chat file uploads) ---
export const AI_FILE_SCOPE = ['page', 'global'] as const;

export const aiFiles = pgTable("ai_files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  storagePath: text("storage_path").notNull(),
  textContent: text("text_content"),
  scope: text("scope").notNull().default('page'),
  pageId: varchar("page_id").references(() => pages.id, { onDelete: 'set null' }),
  uploadedBy: varchar("uploaded_by").references(() => adminUsers.id, { onDelete: 'set null' }),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAiFileSchema = createInsertSchema(aiFiles).omit({
  id: true,
  createdAt: true,
});
export const selectAiFileSchema = createSelectSchema(aiFiles);
export type InsertAiFile = z.infer<typeof insertAiFileSchema>;
export type AiFile = typeof aiFiles.$inferSelect;

// --- PAGE IMAGE PROMPTS TABLE (AI-generated image slots per page) ---
export const IMAGE_SLOT_TYPES = [
  'hero_background',
  'hero_image',
  'section_background',
  'feature_card',
  'feature_icon',
  'micro_feature',
  'product_image',
  'gallery_image',
  'ambient_texture',
  'custom',
] as const;

export const IMAGE_PROMPT_STATUS = ['pending', 'generating', 'ready', 'failed'] as const;

export const pageImagePrompts = pgTable("page_image_prompts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: 'cascade' }),
  slotKey: text("slot_key").notNull(),
  slotType: text("slot_type").notNull().default('custom'),
  slotLabel: text("slot_label"),
  contextSnippet: text("context_snippet"),
  promptTemplate: text("prompt_template"),
  promptFinal: text("prompt_final"),
  status: text("status").notNull().default('pending'),
  assetUrl: text("asset_url"),
  assetPath: text("asset_path"),
  sortOrder: integer("sort_order").notNull().default(0),
  metadata: jsonb("metadata").$type<{
    aspectRatio?: string;
    style?: string;
    vibeKeywords?: string[];
    autoDetected?: boolean;
    lastError?: string;
  }>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPageImagePromptSchema = createInsertSchema(pageImagePrompts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectPageImagePromptSchema = createSelectSchema(pageImagePrompts);
export type InsertPageImagePrompt = z.infer<typeof insertPageImagePromptSchema>;
export type PageImagePrompt = typeof pageImagePrompts.$inferSelect;

// --- BIGMIND CHAT SESSIONS TABLE ---
export const bigmindSessions = pgTable("bigmind_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull().default('New Chat'),
  mode: text("mode").notNull().default('cms'),
  messageCount: integer("message_count").notNull().default(0),
  lastMessageAt: timestamp("last_message_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBigmindSessionSchema = createInsertSchema(bigmindSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectBigmindSessionSchema = createSelectSchema(bigmindSessions);
export type InsertBigmindSession = z.infer<typeof insertBigmindSessionSchema>;
export type BigmindSession = typeof bigmindSessions.$inferSelect;

// --- BIGMIND CHAT MESSAGES TABLE ---
export const BIGMIND_MESSAGE_ROLES = ['user', 'assistant', 'system', 'function'] as const;

export const bigmindMessages = pgTable("bigmind_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull().references(() => bigmindSessions.id, { onDelete: 'cascade' }),
  role: text("role").notNull().default('user'),
  content: text("content").notNull(),
  functionCalls: jsonb("function_calls").$type<Array<{ name: string; args: any; result?: any }>>(),
  attachments: jsonb("attachments").$type<Array<{ type: string; name: string; id?: string }>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBigmindMessageSchema = createInsertSchema(bigmindMessages).omit({
  id: true,
  createdAt: true,
});
export const selectBigmindMessageSchema = createSelectSchema(bigmindMessages);
export type InsertBigmindMessage = z.infer<typeof insertBigmindMessageSchema>;
export type BigmindMessage = typeof bigmindMessages.$inferSelect;

// --- PAGE AI CHAT SESSIONS TABLE ---
export const pageAiSessions = pgTable("page_ai_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageKey: varchar("page_key"),
  title: text("title").notNull().default('New Page Chat'),
  messageCount: integer("message_count").notNull().default(0),
  lastMessageAt: timestamp("last_message_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPageAiSessionSchema = createInsertSchema(pageAiSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectPageAiSessionSchema = createSelectSchema(pageAiSessions);
export type InsertPageAiSession = z.infer<typeof insertPageAiSessionSchema>;
export type PageAiSession = typeof pageAiSessions.$inferSelect;

// --- PAGE AI CHAT MESSAGES TABLE ---
export const pageAiMessages = pgTable("page_ai_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull().references(() => pageAiSessions.id, { onDelete: 'cascade' }),
  role: text("role").notNull().default('user'),
  content: text("content").notNull(),
  metadata: jsonb("metadata").$type<{ proposedHtml?: string; pageTitle?: string; seoTitle?: string; seoDescription?: string }>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPageAiMessageSchema = createInsertSchema(pageAiMessages).omit({
  id: true,
  createdAt: true,
});
export const selectPageAiMessageSchema = createSelectSchema(pageAiMessages);
export type InsertPageAiMessage = z.infer<typeof insertPageAiMessageSchema>;
export type PageAiMessage = typeof pageAiMessages.$inferSelect;

// --- PAGE MEDIA ASSETS TABLE (for multiple images per page) ---
export const MEDIA_SLOT_TYPES = ['hero', 'featured', 'section', 'icon', 'gallery', 'background', 'custom'] as const;
export const MEDIA_STATUS = ['pending', 'generating', 'generated', 'failed'] as const;

export const pageMediaAssets = pgTable("page_media_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageKey: varchar("page_key").notNull(),
  slotKey: text("slot_key").notNull(),
  slotType: text("slot_type").notNull().default('custom'),
  prompt: text("prompt").notNull(),
  status: text("status").notNull().default('pending'),
  generatedUrl: text("generated_url"),
  generatorModel: text("generator_model"),
  metadata: jsonb("metadata").$type<{
    aspectRatio?: string;
    style?: string;
    sourceMessage?: string;
    width?: number;
    height?: number;
  }>(),
  generatedAt: timestamp("generated_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPageMediaAssetSchema = createInsertSchema(pageMediaAssets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  generatedAt: true,
});
export const selectPageMediaAssetSchema = createSelectSchema(pageMediaAssets);
export type InsertPageMediaAsset = z.infer<typeof insertPageMediaAssetSchema>;
export type PageMediaAsset = typeof pageMediaAssets.$inferSelect;

// --- HELPER TYPES FOR FRONTEND ---
export type PageWithChildren = Page & {
  children?: PageWithChildren[];
};

export type ClusterWithPages = Cluster & {
  pages?: Page[];
};

export type SeoKeywordWithSuggestion = SeoKeyword & {
  suggestion?: MagicPageSuggestion;
};

export type DocumentWithChunks = Document & {
  chunks?: DocumentChunk[];
};

export type SerpSnapshotWithResults = SerpSnapshot & {
  results?: SerpResult[];
};

export type PageWithSeoData = Page & {
  searchPerformance?: PageSearchPerformance[];
  landingPageScore?: LandingPageScore;
};

// --- BIGMIND SUGGESTIONS TABLE (AI recommendations from BigMind chat) ---
export const BIGMIND_SUGGESTION_TYPES = [
  'content_gap',
  'visual_config',
  'motion_config',
  'internal_link',
  'publish_draft',
  'seo_improvement',
  'document_integration',
] as const;

export const BIGMIND_SUGGESTION_STATUS = ['pending', 'applied', 'dismissed'] as const;

export const bigmindSuggestions = pgTable("bigmind_suggestions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sourceMessageId: varchar("source_message_id"),
  pageKey: varchar("page_key"),
  type: text("type").notNull(),
  title: text("title").notNull(),
  summary: text("summary"),
  payload: jsonb("payload").$type<Record<string, any>>().default({}),
  status: text("status").notNull().default('pending'),
  appliedAt: timestamp("applied_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBigmindSuggestionSchema = createInsertSchema(bigmindSuggestions).omit({
  id: true,
  appliedAt: true,
  createdAt: true,
});
export const selectBigmindSuggestionSchema = createSelectSchema(bigmindSuggestions);
export type InsertBigmindSuggestion = z.infer<typeof insertBigmindSuggestionSchema>;
export type BigmindSuggestion = typeof bigmindSuggestions.$inferSelect;

// --- ORDERS TABLE (for Stripe e-commerce) ---
export const ORDER_STATUS = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'] as const;

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: text("order_number").notNull().unique(),
  stripeCheckoutSessionId: text("stripe_checkout_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  stripeCustomerId: text("stripe_customer_id"),
  customerEmail: text("customer_email").notNull(),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone"),
  items: jsonb("items").$type<Array<{
    priceId: string;
    productId: string;
    productName: string;
    quantity: number;
    unitAmount: number;
    currency: string;
  }>>().notNull().default([]),
  subtotal: integer("subtotal").notNull().default(0),
  tax: integer("tax").default(0),
  shipping: integer("shipping").default(0),
  total: integer("total").notNull().default(0),
  currency: text("currency").notNull().default('usd'),
  status: text("status").notNull().default('pending'),
  shippingAddress: jsonb("shipping_address").$type<{
    name?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }>(),
  trackingNumber: text("tracking_number"),
  trackingUrl: text("tracking_url"),
  notes: text("notes"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  paidAt: timestamp("paid_at"),
  shippedAt: timestamp("shipped_at"),
  deliveredAt: timestamp("delivered_at"),
  cancelledAt: timestamp("cancelled_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectOrderSchema = createSelectSchema(orders);
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// --- MAINTENANCE SETTINGS TABLE ---
export const maintenanceSettings = pgTable("maintenance_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: jsonb("value").$type<any>().default({}),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMaintenanceSettingSchema = createInsertSchema(maintenanceSettings).omit({
  id: true,
  updatedAt: true,
});
export type InsertMaintenanceSetting = z.infer<typeof insertMaintenanceSettingSchema>;
export type MaintenanceSetting = typeof maintenanceSettings.$inferSelect;

// --- MAINTENANCE REPORTS TABLE ---
export const MAINTENANCE_CHECK_STATUS = ['ok', 'warn', 'error'] as const;

export const maintenanceReports = pgTable("maintenance_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  triggeredBy: text("triggered_by").notNull().default('manual'),
  summary: jsonb("summary").$type<{
    totalChecks: number;
    passed: number;
    warnings: number;
    errors: number;
  }>().notNull(),
  results: jsonb("results").$type<Array<{
    name: string;
    status: 'ok' | 'warn' | 'error';
    message?: string;
    details?: string;
    count?: number;
  }>>().notNull().default([]),
  routeMismatches: jsonb("route_mismatches").$type<{
    missingBackend: string[];
    unusedBackend: string[];
  }>().default({ missingBackend: [], unusedBackend: [] }),
  suggestions: jsonb("suggestions").$type<string[]>().default([]),
  backendRoutesCount: integer("backend_routes_count").default(0),
  frontendCallsCount: integer("frontend_calls_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMaintenanceReportSchema = createInsertSchema(maintenanceReports).omit({
  id: true,
  createdAt: true,
});
export type InsertMaintenanceReport = z.infer<typeof insertMaintenanceReportSchema>;
export type MaintenanceReport = typeof maintenanceReports.$inferSelect;

// ============================================================================
// SEO BRAIN TABLES (SEO-Driven AI CMS Extension)
// ============================================================================

// --- PAGE SEO TABLE (Enhanced SEO metadata per page) ---
export const SCHEMA_TYPES = ['Article', 'Product', 'FAQ', 'HowTo', 'WebPage', 'Organization', 'LocalBusiness'] as const;

export const pageSeo = pgTable("page_seo", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: 'cascade' }),
  focusKeyword: text("focus_keyword"),
  secondaryKeywords: jsonb("secondary_keywords").$type<string[]>().default([]),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  canonicalUrl: text("canonical_url"),
  schemaType: text("schema_type").default('Article'),
  internalLinks: jsonb("internal_links").$type<string[]>().default([]),
  outboundLinks: jsonb("outbound_links").$type<string[]>().default([]),
  contentScore: integer("content_score").default(0),
  techScore: integer("tech_score").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPageSeoSchema = createInsertSchema(pageSeo).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectPageSeoSchema = createSelectSchema(pageSeo);
export type InsertPageSeo = z.infer<typeof insertPageSeoSchema>;
export type PageSeo = typeof pageSeo.$inferSelect;

// --- PAGE SEARCH METRICS TABLE (Daily metrics from Search Console) ---
export const pageSearchMetrics = pgTable("page_search_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: 'cascade' }),
  date: timestamp("date").notNull(),
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  avgPosition: integer("avg_position").default(0),
  ctr: integer("ctr").default(0), // stored as percentage * 100 (e.g., 5.5% = 550)
  refDomainCount: integer("ref_domain_count").default(0),
  serpCompetitionScore: integer("serp_competition_score").default(50),
  topQuery: text("top_query"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPageSearchMetricsSchema = createInsertSchema(pageSearchMetrics).omit({
  id: true,
  createdAt: true,
});
export const selectPageSearchMetricsSchema = createSelectSchema(pageSearchMetrics);
export type InsertPageSearchMetrics = z.infer<typeof insertPageSearchMetricsSchema>;
export type PageSearchMetrics = typeof pageSearchMetrics.$inferSelect;

// --- PAGE AI SUGGESTIONS TABLE (Granular AI recommendations) ---
export const AI_SUGGESTION_TYPES = [
  'new_heading', 'new_section', 'internal_linking', 'faq_block',
  'schema_update', 'meta_improvement', 'content_expansion',
  'keyword_optimization', 'cta_addition', 'image_suggestion'
] as const;

export const AI_SUGGESTION_STATUS = ['proposed', 'accepted', 'rejected', 'implemented'] as const;

export const pageAiSuggestions = pgTable("page_ai_suggestions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: 'cascade' }),
  dateGenerated: timestamp("date_generated").defaultNow().notNull(),
  suggestionType: text("suggestion_type").notNull(),
  suggestionPayload: jsonb("suggestion_payload").$type<{
    title?: string;
    content?: string;
    insertAfter?: string;
    targetSection?: string;
    rationale?: string;
    impactScore?: number;
    keywords?: string[];
    links?: Array<{ anchor: string; targetPath: string }>;
  }>().notNull(),
  priority: integer("priority").default(3), // 1-5, 1 is highest
  status: text("status").notNull().default('proposed'),
  opportunityScore: integer("opportunity_score").default(0),
  implementedAt: timestamp("implemented_at"),
  reviewedBy: varchar("reviewed_by").references(() => adminUsers.id, { onDelete: 'set null' }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPageAiSuggestionSchema = createInsertSchema(pageAiSuggestions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectPageAiSuggestionSchema = createSelectSchema(pageAiSuggestions);
export type InsertPageAiSuggestion = z.infer<typeof insertPageAiSuggestionSchema>;
export type PageAiSuggestion = typeof pageAiSuggestions.$inferSelect;

// --- AI CONTENT BLOCKS TABLE (Dynamic SEO content blocks with hook placement) ---
export const CONTENT_BLOCK_TYPES = ['insight', 'faq', 'related_links', 'definition', 'comparison', 'stat_highlight', 'cta'] as const;
export const CONTENT_BLOCK_STATUS = ['draft', 'live', 'archived'] as const;

export const aiContentBlocks = pgTable("ai_content_blocks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: 'cascade' }),
  hook: text("hook").notNull(), // e.g., "after_h2:ez-water", "sidebar:main", "inline:section3"
  blockType: text("block_type").notNull().default('insight'),
  htmlContent: text("html_content").notNull(),
  focusKeyword: text("focus_keyword"),
  secondaryKeywords: jsonb("secondary_keywords").$type<string[]>().default([]),
  priority: integer("priority").default(5), // 1-10, 1 is highest
  status: text("status").notNull().default('draft'),
  impressions: integer("impressions").default(0),
  clickThroughs: integer("click_throughs").default(0),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
  lastReviewedAt: timestamp("last_reviewed_at"),
  reviewedBy: varchar("reviewed_by").references(() => adminUsers.id, { onDelete: 'set null' }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAiContentBlockSchema = createInsertSchema(aiContentBlocks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectAiContentBlockSchema = createSelectSchema(aiContentBlocks);
export type InsertAiContentBlock = z.infer<typeof insertAiContentBlockSchema>;
export type AiContentBlock = typeof aiContentBlocks.$inferSelect;

// --- DESIGN TOKENS TABLE (Per-cluster visual tokens) ---
export const MOTION_PROFILES = [
  'float_slow', 'fade_up', 'pulse_subtle', 'slide_in', 'scale_up',
  'liquid_crystal', 'energetic_pulse', 'magnetic_drift', 'krystal_bloom',
  'scalar_slide', 'vortex_reveal', 'parallax_depth', 'ripple_emergence'
] as const;

export const designTokens = pgTable("design_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clusterId: varchar("cluster_id").references(() => clusters.id, { onDelete: 'cascade' }),
  clusterKey: text("cluster_key").notNull().unique(),
  primaryColor: text("primary_color").notNull().default('#6366f1'),
  secondaryColor: text("secondary_color").notNull().default('#8b5cf6'),
  accentColor: text("accent_color").notNull().default('#22d3ee'),
  bgGradient: text("bg_gradient").default('linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)'),
  cardRadius: text("card_radius").default('1rem'),
  shadowStyle: text("shadow_style").default('0 4px 20px rgba(99, 102, 241, 0.15)'),
  motionProfile: text("motion_profile").default('fade_up'),
  typographyScale: jsonb("typography_scale").$type<{
    headlineSize: string;
    bodySize: string;
    spacing: string;
  }>().default({ headlineSize: '2.5rem', bodySize: '1rem', spacing: '1.5' }),
  customProperties: jsonb("custom_properties").$type<Record<string, string>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertDesignTokenSchema = createInsertSchema(designTokens).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectDesignTokenSchema = createSelectSchema(designTokens);
export type InsertDesignToken = z.infer<typeof insertDesignTokenSchema>;
export type DesignToken = typeof designTokens.$inferSelect;

// --- PROPOSED PAGES TABLE (Magic Page Blueprints from AI) ---
export const PROPOSED_PAGE_STATUS = ['proposed', 'reviewed', 'approved', 'in_progress', 'published', 'rejected'] as const;

export const proposedPages = pgTable("proposed_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  targetKeyword: text("target_keyword").notNull(),
  searchVolume: integer("search_volume").default(0),
  difficulty: integer("difficulty").default(50),
  proposedTitle: text("proposed_title").notNull(),
  proposedSlug: text("proposed_slug").notNull(),
  clusterId: varchar("cluster_id").references(() => clusters.id, { onDelete: 'set null' }),
  clusterKey: text("cluster_key"),
  outline: jsonb("outline").$type<{
    h1: string;
    sections: Array<{
      heading: string;
      level: number;
      description?: string;
    }>;
  }>().notNull(),
  draftIntro: text("draft_intro"),
  draftSummary: text("draft_summary"),
  focusKeyword: text("focus_keyword"),
  secondaryKeywords: jsonb("secondary_keywords").$type<string[]>().default([]),
  proposedMetaTitle: text("proposed_meta_title"),
  proposedMetaDescription: text("proposed_meta_description"),
  suggestedContentBlocks: jsonb("suggested_content_blocks").$type<Array<{
    blockType: string;
    hook: string;
    content?: string;
    faqs?: Array<{ question: string; answer: string }>;
  }>>().default([]),
  sourceDocIds: jsonb("source_doc_ids").$type<string[]>().default([]),
  semanticScore: integer("semantic_score").default(0),
  opportunityScore: integer("opportunity_score").default(0),
  status: text("status").notNull().default('proposed'),
  createdPageId: varchar("created_page_id").references(() => pages.id, { onDelete: 'set null' }),
  reviewedBy: varchar("reviewed_by").references(() => adminUsers.id, { onDelete: 'set null' }),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProposedPageSchema = createInsertSchema(proposedPages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectProposedPageSchema = createSelectSchema(proposedPages);
export type InsertProposedPage = z.infer<typeof insertProposedPageSchema>;
export type ProposedPage = typeof proposedPages.$inferSelect;

// --- PAGE LAYOUT BLUEPRINTS TABLE (Layout structure per page) ---
export const LAYOUT_COMPONENT_TYPES = [
  'HeroSection', 'ContentSection', 'InfoCardGrid', 'FAQAccordion',
  'TimelineSection', 'StatHighlights', 'TestimonialCarousel', 'CTASection',
  'DynamicSEOBlock', 'ComparisonTable', 'GalleryGrid', 'VideoEmbed'
] as const;

export const pageLayouts = pgTable("page_layouts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: 'cascade' }),
  layoutStructure: jsonb("layout_structure").$type<Array<{
    type: string;
    variant?: string;
    props?: Record<string, any>;
    order: number;
  }>>().notNull().default([]),
  aiSuggestedChanges: jsonb("ai_suggested_changes").$type<Array<{
    action: 'add' | 'remove' | 'move' | 'modify';
    componentType: string;
    reason: string;
    position?: number;
  }>>().default([]),
  lastOptimizedAt: timestamp("last_optimized_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPageLayoutSchema = createInsertSchema(pageLayouts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectPageLayoutSchema = createSelectSchema(pageLayouts);
export type InsertPageLayout = z.infer<typeof insertPageLayoutSchema>;
export type PageLayout = typeof pageLayouts.$inferSelect;

// --- SEO OPTIMIZATION RUNS TABLE (Track daily optimization jobs) ---
export const SEO_RUN_STATUS = ['running', 'completed', 'failed'] as const;

export const seoOptimizationRuns = pgTable("seo_optimization_runs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  runDate: timestamp("run_date").defaultNow().notNull(),
  status: text("status").notNull().default('running'),
  pagesAnalyzed: integer("pages_analyzed").default(0),
  suggestionsGenerated: integer("suggestions_generated").default(0),
  metricsUpdated: integer("metrics_updated").default(0),
  topOpportunityPages: jsonb("top_opportunity_pages").$type<Array<{
    pageId: string;
    title: string;
    opportunityScore: number;
  }>>().default([]),
  summary: jsonb("summary").$type<{
    avgPosition: number;
    totalImpressions: number;
    totalClicks: number;
    avgCtr: number;
    pagesNeedingAttention: number;
  }>(),
  errorLog: text("error_log"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSeoOptimizationRunSchema = createInsertSchema(seoOptimizationRuns).omit({
  id: true,
  createdAt: true,
});
export const selectSeoOptimizationRunSchema = createSelectSchema(seoOptimizationRuns);
export type InsertSeoOptimizationRun = z.infer<typeof insertSeoOptimizationRunSchema>;
export type SeoOptimizationRun = typeof seoOptimizationRuns.$inferSelect;

// --- PAGE METRICS TABLE (for SEO optimization scoring) ---
export const pageMetrics = pgTable("page_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: 'cascade' }),
  calculatedAt: timestamp("calculated_at").defaultNow().notNull(),

  // Content Quality Metrics
  hasH1: boolean("has_h1").default(false),
  h2Count: integer("h2_count").default(0),
  hasFaqBlock: boolean("has_faq_block").default(false),
  hasProofBlock: boolean("has_proof_block").default(false),
  hasGlossary: boolean("has_glossary").default(false),
  wordCount: integer("word_count").default(0),

  // Link Metrics
  internalLinksOut: integer("internal_links_out").default(0),
  internalLinksIn: integer("internal_links_in").default(0),
  isOrphan: boolean("is_orphan").default(false),

  // Freshness
  daysSinceUpdate: integer("days_since_update").default(0),
  isStale: boolean("is_stale").default(false),

  // Schema
  hasSchema: boolean("has_schema").default(false),

  // Computed Scores
  priorityScore: integer("priority_score").default(0),
  businessWeight: integer("business_weight").default(0),
  freshnessWeight: integer("freshness_weight").default(0),
  gapWeight: integer("gap_weight").default(0),
  linkWeight: integer("link_weight").default(0),
  clusterBalanceWeight: integer("cluster_balance_weight").default(0),
});

export const insertPageMetricSchema = createInsertSchema(pageMetrics).omit({
  id: true,
  calculatedAt: true,
});
export const selectPageMetricSchema = createSelectSchema(pageMetrics);
export type InsertPageMetric = z.infer<typeof insertPageMetricSchema>;
export type PageMetric = typeof pageMetrics.$inferSelect;

// --- PAGE RECOMMENDATIONS TABLE (daily AI recommendations) ---
export const RECOMMENDATION_STATUS = ['pending', 'in_progress', 'completed', 'skipped'] as const;
export const IMPACT_ESTIMATE = ['high', 'medium', 'low'] as const;

export const pageRecommendations = pgTable("page_recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: 'cascade' }),
  recommendedDate: timestamp("recommended_date").defaultNow().notNull(),

  whySelected: jsonb("why_selected").$type<string[]>().default([]),
  tasks: jsonb("tasks").$type<string[]>().default([]),
  impactEstimate: text("impact_estimate").notNull().default('medium'),

  dynamicBoxes: jsonb("dynamic_boxes").$type<string[]>().default([]),
  internalLinksOut: jsonb("internal_links_out").$type<string[]>().default([]),
  internalLinksInNeeded: jsonb("internal_links_in_needed").$type<string[]>().default([]),

  upgradePlan: jsonb("upgrade_plan").$type<Record<string, any>>(),

  status: text("status").notNull().default('pending'),
  completedAt: timestamp("completed_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPageRecommendationSchema = createInsertSchema(pageRecommendations).omit({
  id: true,
  createdAt: true,
});
export const selectPageRecommendationSchema = createSelectSchema(pageRecommendations);
export type InsertPageRecommendation = z.infer<typeof insertPageRecommendationSchema>;
export type PageRecommendation = typeof pageRecommendations.$inferSelect;

// --- OPTIMIZATION HISTORY TABLE (track changes and results) ---
export const CHANGE_TYPES = ['title', 'meta', 'content', 'links', 'schema', 'faq', 'proof', 'structure'] as const;

export const optimizationHistory = pgTable("optimization_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: 'cascade' }),
  recommendationId: varchar("recommendation_id").references(() => pageRecommendations.id, { onDelete: 'set null' }),

  changeType: text("change_type").notNull(),
  changeSummary: text("change_summary").notNull(),

  scoreBefore: integer("score_before"),
  scoreAfter: integer("score_after"),

  appliedBy: varchar("applied_by").references(() => adminUsers.id, { onDelete: 'set null' }),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
});

export const insertOptimizationHistorySchema = createInsertSchema(optimizationHistory).omit({
  id: true,
  appliedAt: true,
});
export const selectOptimizationHistorySchema = createSelectSchema(optimizationHistory);
export type InsertOptimizationHistory = z.infer<typeof insertOptimizationHistorySchema>;
export type OptimizationHistory = typeof optimizationHistory.$inferSelect;

// --- CLUSTER OPTIMIZATION LOG TABLE (track cluster balance) ---
export const clusterOptimizationLog = pgTable("cluster_optimization_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clusterKey: text("cluster_key").notNull(),
  optimizedDate: timestamp("optimized_date").defaultNow().notNull(),
  pageId: varchar("page_id").references(() => pages.id, { onDelete: 'cascade' }),
});

export const insertClusterOptimizationLogSchema = createInsertSchema(clusterOptimizationLog).omit({
  id: true,
  optimizedDate: true,
});
export const selectClusterOptimizationLogSchema = createSelectSchema(clusterOptimizationLog);
export type InsertClusterOptimizationLog = z.infer<typeof insertClusterOptimizationLogSchema>;
export type ClusterOptimizationLog = typeof clusterOptimizationLog.$inferSelect;

// --- CRON JOBS TABLE (scheduled tasks management) ---
export const CRON_JOB_STATUS = ['active', 'paused', 'disabled'] as const;

export const cronJobs = pgTable("cron_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  description: text("description"),
  schedule: text("schedule").notNull(), // cron expression
  handler: text("handler").notNull(), // function name to execute
  status: text("status").notNull().default('active'),
  lastRunAt: timestamp("last_run_at"),
  nextRunAt: timestamp("next_run_at"),
  runCount: integer("run_count").notNull().default(0),
  failureCount: integer("failure_count").notNull().default(0),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCronJobSchema = createInsertSchema(cronJobs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectCronJobSchema = createSelectSchema(cronJobs);
export type InsertCronJob = z.infer<typeof insertCronJobSchema>;
export type CronJob = typeof cronJobs.$inferSelect;

// --- CRON JOB LOGS TABLE (execution history) ---
export const CRON_LOG_STATUS = ['running', 'success', 'failed'] as const;

export const cronJobLogs = pgTable("cron_job_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").notNull().references(() => cronJobs.id, { onDelete: 'cascade' }),
  status: text("status").notNull().default('running'),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  durationMs: integer("duration_ms"),
  output: text("output"),
  errorMessage: text("error_message"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
});

export const insertCronJobLogSchema = createInsertSchema(cronJobLogs).omit({
  id: true,
  startedAt: true,
});
export const selectCronJobLogSchema = createSelectSchema(cronJobLogs);
export type InsertCronJobLog = z.infer<typeof insertCronJobLogSchema>;
export type CronJobLog = typeof cronJobLogs.$inferSelect;
