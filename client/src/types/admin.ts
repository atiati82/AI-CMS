import { Wand2, Key, BarChart2, Search, RefreshCw, Shield, Settings } from "lucide-react";
import type { MaintenanceReport } from "@shared/schema";

export type ContentStats = {
    totalPages: number;
    publishedPages: number;
    draftPages: number;
    totalProducts: number;
    totalArticles: number;
    totalClusters: number;
};

export type VisualVibe = {
    vibeKeywords: string[];
    emotionalTone: string[];
    animationIdeas: string[];
    aiImagePromptPattern?: string;
    aiVideoPromptPattern?: string;
    designerNotes?: string;
};

export type VisualConfig = {
    pageId: string;
    cluster: string;
    priority: 'P1' | 'P2' | 'P3';
    vibeKeywords: string[];
    emotionalTone: string[];
    animationIdeas: string[];
    aiImagePrompt: string;
    aiVideoPrompt: string;
    designerNotes: string;
    motionPreset?: string;
};

export type Page = {
    id: string;
    key: string;
    title: string;
    path: string;
    pageType: string;
    template: string;
    clusterKey: string | null;
    parentKey: string | null;
    priority: number;
    status: string;
    summary: string | null;
    content: string | null;
    seoFocus: string | null;
    visualConfig?: VisualConfig | null;
    isInSitemap?: boolean;
    sitemapPriority?: number;
    children?: Page[];
    createdAt?: string | null;
    updatedAt?: string | null;
    publishedAt?: string | null;
};

export type Product = {
    id: string;
    name: string;
    slug: string;
    sizeMl: number;
    descriptionShort: string;
    descriptionLong: string;
    price: number;
    pricePerLiter: number;
    pageKey: string | null;
    templateId: string | null;
    highlights: string[];
    tags: string[];
};

export type Cluster = {
    id: string;
    key: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    parentClusterKey?: string | null;
    priority?: number;
    color?: string | null;
    visualVibe?: VisualVibe | null;
};

export type Article = {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    clusterId: string;
    tags: string[];
    priority: number;
    pageKey: string | null;
    publishedAt: string;
};

export type Document = {
    id: string;
    title: string;
    sourceType: 'upload' | 'youtube' | 'url' | 'paste';
    sourceUrl: string | null;
    rawText: string;
    cleanText: string | null;
    tags: string[];
    entities: string[];
    wordCount: number;
    chunkCount: number;
    status: 'pending' | 'processing' | 'indexed' | 'failed';
    embeddingModel: string | null;
    errorMessage: string | null;
    metadata: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
};

export type DocumentChunk = {
    id: string;
    documentId: string;
    chunkIndex: number;
    content: string;
    tokenCount: number;
    createdAt: string;
};

export type SeoKeyword = {
    id: string;
    keyword: string;
    searchIntent: 'informational' | 'commercial' | 'navigational' | 'transactional';
    difficultyScore: number | null;
    volumeEstimate: number | null;
    relevanceScore: number | null;
    competitorNotes: string | null;
    status: 'idea' | 'analyzing' | 'planned' | 'in_progress' | 'published' | 'rejected';
    suggestedPageId: string | null;
    targetClusterKey: string | null;
    relatedDocIds: string[] | null;
    notes: string | null;
    lastAnalyzedAt: string | null;
    createdAt: string;
    updatedAt: string;
};

export type MagicPageOutlineSection = {
    heading: string;
    level: number;
    description?: string;
};

export type MagicPageDraftContent = {
    hero?: { title: string; subtitle?: string };
    tldr?: string;
    sections?: Array<{ heading: string; content: string }>;
    faq?: Array<{ question: string; answer: string }>;
    cta?: { text: string; buttonText: string; productSlug?: string };
};

export type MagicPageSuggestion = {
    id: string;
    keywordId: string | null;
    targetKeyword: string;
    workingTitle: string;
    suggestedSlug: string;
    targetPersona: string | null;
    outline: { sections: MagicPageOutlineSection[] } | null;
    sourceDocIds: string[];
    suggestedProductLinks: string[];
    suggestedPageLinks: string[];
    draftContent: MagicPageDraftContent | null;
    generatedPageId: string | null;
    status: 'suggested' | 'outline_ready' | 'generating' | 'draft_ready' | 'editing' | 'published' | 'rejected';
    score: number | null;
    generationModel: string | null;
    generatedAt: string | null;
    createdAt: string;
    updatedAt: string;
};

export type LinkingRule = {
    id: string;
    name: string;
    ruleType: 'keyword_match' | 'cluster_based' | 'page_type' | 'manual';
    triggerPattern: string;
    targetPagePath: string;
    anchorText: string | null;
    priority: number;
    maxOccurrences: number;
    isActive: boolean;
    metadata: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
};

export type CtaTemplate = {
    id: string;
    name: string;
    slug: string;
    headline: string;
    description: string | null;
    buttonText: string;
    buttonLink: string | null;
    productSlug: string | null;
    position: 'after_intro' | 'mid_content' | 'before_faq' | 'footer' | 'sidebar';
    triggerClusters: string[];
    triggerKeywords: string[];
    priority: number;
    isActive: boolean;
    styling: {
        backgroundColor?: string;
        textColor?: string;
        buttonColor?: string;
        borderStyle?: string;
    };
    createdAt: string;
    updatedAt: string;
};

export type HtmlTemplate = {
    id: string;
    name: string;
    slug: string;
    templateType: 'hero' | 'section' | 'grid' | 'calculator' | 'faq' | 'table' | 'cta' | 'callout' | 'full_page';
    componentClass: string | null;
    description: string | null;
    htmlContent: string;
    previewImage: string | null;
    tags: string[];
    metadata: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
};

export type CmsSetting = {
    id: string;
    key: string;
    value: any;
    description: string | null;
    category: string;
    updatedAt: string;
    inputType?: 'text' | 'number' | 'textarea' | 'password' | 'tags' | 'select';
    options?: readonly { value: string; label: string; description: string }[];
};

export type AIAgent = {
    name: string;
    displayName?: string;
    description: string;
    capabilities: string[];
    icon?: string;
    role?: string;
    rules?: string[];
    systemPrompt?: string;
    examples?: Array<{ type: string; input: Record<string, any> }>;
};

// Available AI models for BigMind
export const AI_MODEL_OPTIONS = [
    { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini (Default)', description: 'Best for page code, components, animations - fast & efficient' },
    { value: 'gpt-4.1', label: 'GPT-4.1', description: 'Premium model for complex reasoning tasks' },
    { value: 'gpt-4o', label: 'GPT-4o', description: 'OpenAI flagship multimodal model' },
    { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', description: 'Google fast model - good for quick tasks' },
    { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', description: 'Google premium model for advanced reasoning' },
] as const;

export const SETTINGS_CATEGORIES = [
    { key: 'magic_ai', label: 'Magic AI', icon: Wand2, description: 'Magic Page AI system prompt' },
    { key: 'api_keys', label: 'API Keys', icon: Key, description: 'External service API keys' },
    { key: 'thresholds', label: 'Thresholds', icon: BarChart2, description: 'Scoring and generation thresholds' },
    { key: 'seo', label: 'SEO Settings', icon: Search, description: 'SEO scanner configuration' },
    { key: 'maintenance', label: 'Maintenance', icon: RefreshCw, description: 'AI-powered codebase maintenance' },
    { key: 'security', label: 'Security & Governance', icon: Shield, description: 'Rate limits and agent governance' },
    { key: 'general', label: 'General', icon: Settings, description: 'General CMS settings' },
];

export const LINKING_RULE_TYPE_CONFIG: Record<string, { label: string; color: string }> = {
    keyword_match: { label: 'Keyword', color: 'bg-blue-100 text-blue-700' },
    cluster_based: { label: 'Cluster', color: 'bg-purple-100 text-purple-700' },
    page_type: { label: 'Page Type', color: 'bg-green-100 text-green-700' },
    manual: { label: 'Manual', color: 'bg-orange-100 text-orange-700' },
};

export const CTA_POSITION_CONFIG: Record<string, { label: string; description: string }> = {
    after_intro: { label: 'After Intro', description: 'After the first paragraph' },
    mid_content: { label: 'Mid Content', description: 'In the middle of the article' },
    before_faq: { label: 'Before FAQ', description: 'Before the FAQ section' },
    footer: { label: 'Footer', description: 'At the end of the content' },
    sidebar: { label: 'Sidebar', description: 'In the sidebar area' },
};

export const TEMPLATE_TYPE_CONFIG: Record<string, { label: string; color: string }> = {
    hero: { label: 'Hero', color: 'bg-blue-100 text-blue-700' },
    section: { label: 'Section', color: 'bg-green-100 text-green-700' },
    grid: { label: 'Grid', color: 'bg-purple-100 text-purple-700' },
    calculator: { label: 'Calculator', color: 'bg-amber-100 text-amber-700' },
    faq: { label: 'FAQ', color: 'bg-cyan-100 text-cyan-700' },
    table: { label: 'Table', color: 'bg-orange-100 text-orange-700' },
    cta: { label: 'CTA', color: 'bg-rose-100 text-rose-700' },
    callout: { label: 'Callout', color: 'bg-indigo-100 text-indigo-700' },
    full_page: { label: 'Full Page', color: 'bg-slate-100 text-slate-700' },
};

export const DEFAULT_SETTINGS: { key: string; category: string; description: string; defaultValue: any; inputType: 'text' | 'number' | 'textarea' | 'password' | 'tags' | 'select'; options?: typeof AI_MODEL_OPTIONS }[] = [
    { key: 'bigmind_ai_model', category: 'magic_ai', description: 'AI model for BigMind chat, page generation, and content enrichment', defaultValue: 'gpt-4.1-mini', inputType: 'select', options: AI_MODEL_OPTIONS },
    { key: 'openai_api_key', category: 'api_keys', description: 'OpenAI API key for AI content generation', defaultValue: '', inputType: 'password' },
    { key: 'google_api_key', category: 'api_keys', description: 'Google Gemini API key for AI content generation', defaultValue: '', inputType: 'password' },
    { key: 'seo_min_difficulty', category: 'thresholds', description: 'Minimum keyword difficulty score (0-100)', defaultValue: 20, inputType: 'number' },
    { key: 'seo_max_difficulty', category: 'thresholds', description: 'Maximum keyword difficulty score (0-100)', defaultValue: 60, inputType: 'number' },
    { key: 'magic_page_min_score', category: 'thresholds', description: 'Minimum score for magic page suggestions (0-100)', defaultValue: 50, inputType: 'number' },
    { key: 'magic_page_max_per_run', category: 'thresholds', description: 'Maximum pages to generate per run', defaultValue: 5, inputType: 'number' },

    // Security & Governance
    { key: 'auth_rate_limit_window', category: 'security', description: 'Window in minutes for auth rate limiting', defaultValue: 15, inputType: 'number' },
    { key: 'auth_rate_limit_max', category: 'security', description: 'Max login attempts per window', defaultValue: 5, inputType: 'number' },
    { key: 'ai_rate_limit_max', category: 'security', description: 'Max standard AI requests per minute', defaultValue: 100, inputType: 'number' },
    { key: 'autonomous_rate_limit_max', category: 'security', description: 'Max autonomous agent runs per hour', defaultValue: 10, inputType: 'number' },

    { key: 'seed_keywords', category: 'seo', description: 'Comma-separated seed keywords for SEO scanning', defaultValue: '', inputType: 'tags' },
    { key: 'excluded_keywords', category: 'seo', description: 'Comma-separated keywords to exclude from scanning', defaultValue: '', inputType: 'tags' },
    { key: 'site_name', category: 'general', description: 'Website name for SEO and branding', defaultValue: 'Andara Ionic', inputType: 'text' },
    { key: 'default_author', category: 'general', description: 'Default author name for generated content', defaultValue: '', inputType: 'text' },
];

export type AiEnrichment = {
    extractedAt: string;
    imagePrompts: Array<{ id: string; prompt: string; location: string; generated?: boolean; generatedUrl?: string }>;
    videoPrompts: Array<{ id: string; prompt: string; location: string }>;
    layoutSpecs: Array<{ section: string; spec: string }>;
    animationSpecs: Array<{ element: string; spec: string }>;
    suggestedSeo: { title?: string; description?: string; focusKeyword?: string };
    suggestedLinks: Array<{ anchor: string; targetPath: string; reason: string }>;
    components: string[];
};

export type PageFormData = {
    key: string;
    title: string;
    path: string;
    pageType: string;
    template: string;
    clusterKey: string | null;
    parentKey: string | null;
    priority: number;
    status: string;
    summary: string | null;
    content: string | null;
    seoFocus: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    featuredImage: string | null;
    icon: string | null;
    visualConfig: VisualConfig | null;
    aiStartupHtml: string | null;
    aiEnrichment: AiEnrichment | null;
    isInSitemap?: boolean;
    sitemapPriority?: number;
    // Additional fields for UI state
    aiChatMessages?: any[];
    isGenerating?: boolean;
    extractedImagePrompts?: any[];
    extractedVisualConfig?: any;
    selectedEnhancementTasks?: string[];
    attachedFiles?: File[];
    aiChatInput?: string;
};

