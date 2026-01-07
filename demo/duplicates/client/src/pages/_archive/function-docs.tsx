import React, { useState } from 'react';
import { Search, Code, Cpu, Database, Zap, Settings, Book, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function FunctionDocumentationPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const sections = [
        {
            id: 'ai-services',
            title: 'AI Services',
            icon: Cpu,
            color: 'from-purple-500 to-purple-700',
            functions: [
                // andara-chat.ts
                { name: 'chat()', service: 'andara-chat.ts', description: 'Main AI chat function. Sends messages to AI with optional site context.', params: 'messages: ChatMessage[], includeContext?: boolean', returns: 'Promise<string>' },
                { name: 'getAiClient()', service: 'andara-chat.ts', description: 'Gets configured AI client (Gemini or OpenAI).', params: 'none', returns: 'Promise<{client, model}>' },
                { name: 'getConfiguredModel()', service: 'andara-chat.ts', description: 'Retrieves AI model from CMS settings.', params: 'none', returns: 'Promise<string>' },
                { name: 'getRelevantContext()', service: 'andara-chat.ts', description: 'Gathers site content for AI context.', params: 'none', returns: 'Promise<string>' },
                { name: 'getChatSystemPrompt()', service: 'andara-chat.ts', description: 'Gets BigMind system prompt.', params: 'none', returns: 'Promise<string>' },
                { name: 'getSiteOverview()', service: 'andara-chat.ts', description: 'Returns page counts, cluster stats, priority stats.', params: 'none', returns: 'Promise<SiteOverview>' },
                // bigmind-cms.ts
                { name: 'chatWithFunctions()', service: 'bigmind-cms.ts', description: 'AI chat with CMS database operations (create, update, delete pages).', params: 'messages, mode, modelOverride?', returns: 'Promise<BigMindResponse>' },
                // ai-startup.ts
                { name: 'generatePageFromBrief()', service: 'ai-startup.ts', description: 'Generates complete React page from text brief. Returns TSX, HTML, SEO metadata.', params: 'brief: string, pageSlug?: string', returns: 'Promise<AIStartupResult>' },
                { name: 'detectLayouts()', service: 'ai-startup.ts', description: 'Detects layout IDs from page content using AI.', params: 'content: string', returns: 'Promise<string[]>' },
                // ai-enricher.ts
                { name: 'enrichPageHtml()', service: 'ai-enricher.ts', description: 'AI analyzes HTML and returns image prompts, layout specs, motion specs, SEO suggestions.', params: 'html: string, steps?: EnrichmentSteps', returns: 'Promise<AiEnrichment>' },
            ]
        },
        {
            id: 'seo-services',
            title: 'SEO Services',
            icon: Zap,
            color: 'from-green-500 to-green-700',
            functions: [
                // seo-brain.ts
                { name: 'calculateOpportunityScore()', service: 'seo-brain.ts', description: 'Calculates SEO improvement opportunity score (0-100).', params: 'pageId: string', returns: 'Promise<PageOpportunityScore>' },
                { name: 'generateAiSuggestions()', service: 'seo-brain.ts', description: 'AI-generated SEO improvement suggestions.', params: 'pageId: string, analysisContext?: string', returns: 'Promise<SeoSuggestion[]>' },
                { name: 'createSuggestionsForPage()', service: 'seo-brain.ts', description: 'Creates and saves SEO suggestions to database.', params: 'pageId: string', returns: 'Promise<InsertPageAiSuggestion[]>' },
                { name: 'syncSearchConsoleMetrics()', service: 'seo-brain.ts', description: 'Syncs data from Google Search Console.', params: 'none', returns: 'Promise<number>' },
                { name: 'runDailyOptimization()', service: 'seo-brain.ts', description: 'Runs daily SEO analysis across all pages.', params: 'none', returns: 'Promise<DailySeoReport>' },
                { name: 'generateProposedPage()', service: 'seo-brain.ts', description: 'Generates new page blueprint from keyword.', params: 'targetKeyword: string, options?', returns: 'Promise<InsertProposedPage>' },
                { name: 'generateContentBlock()', service: 'seo-brain.ts', description: 'Generates FAQ, related links, or other content blocks.', params: 'pageId, blockType, hook, context?', returns: 'Promise<string>' },
                { name: 'getTodaysActions()', service: 'seo-brain.ts', description: 'Gets daily SEO tasks and opportunities.', params: 'limit?: number', returns: 'Promise<TodaysActions>' },
                // seo-scanner.ts
                { name: 'extractKeywordsFromText()', service: 'seo-scanner.ts', description: 'Extracts keywords from text content.', params: 'text: string, maxKeywords?: number', returns: 'Promise<string[]>' },
                { name: 'detectSearchIntent()', service: 'seo-scanner.ts', description: 'Detects intent: informational, commercial, navigational, transactional.', params: 'keyword: string', returns: 'SearchIntent' },
                { name: 'calculateRelevanceScore()', service: 'seo-scanner.ts', description: 'Calculates keyword relevance score (0-100).', params: 'keyword: string', returns: 'number' },
                { name: 'analyzeKeyword()', service: 'seo-scanner.ts', description: 'Full keyword analysis with metrics.', params: 'keyword: string', returns: 'Promise<SeoAnalysisResult>' },
                { name: 'suggestClusterForKeyword()', service: 'seo-scanner.ts', description: 'Suggests content cluster for keyword.', params: 'keyword: string', returns: 'string | undefined' },
                { name: 'analyzeDocument()', service: 'seo-scanner.ts', description: 'Analyzes all keywords in a document.', params: 'document: Document', returns: 'Promise<SeoAnalysisResult[]>' },
                { name: 'findOpportunities()', service: 'seo-scanner.ts', description: 'Finds SEO opportunities based on criteria.', params: 'options?: FilterOptions', returns: 'Promise<SeoAnalysisResult[]>' },
                { name: 'scanDocumentAndSaveKeywords()', service: 'seo-scanner.ts', description: 'Extracts and saves keywords from document.', params: 'documentId: string', returns: 'Promise<InsertSeoKeyword[]>' },
                { name: 'getSuggestedKeywords()', service: 'seo-scanner.ts', description: 'Suggests related keywords from seeds.', params: 'seeds: string[], limit?: number', returns: 'Promise<string[]>' },
                // searchConsoleService.ts
                { name: 'getSearchAnalytics()', service: 'searchConsoleService.ts', description: 'Gets search performance data from GSC.', params: 'options: AnalyticsOptions', returns: 'Promise<SearchAnalyticsResponse>' },
                { name: 'getTopQueries()', service: 'searchConsoleService.ts', description: 'Gets top search queries.', params: 'limit?: number', returns: 'Promise<Query[]>' },
                { name: 'getTopPages()', service: 'searchConsoleService.ts', description: 'Gets top performing pages.', params: 'limit?: number', returns: 'Promise<PageData[]>' },
                { name: 'inspectUrl()', service: 'searchConsoleService.ts', description: 'Inspects URL indexing status.', params: 'url: string', returns: 'Promise<UrlInspection>' },
            ]
        },
        {
            id: 'content-services',
            title: 'Content Services',
            icon: Book,
            color: 'from-blue-500 to-blue-700',
            functions: [
                // internal-linking.ts
                { name: 'analyzeContent()', service: 'internal-linking.ts', description: 'Analyzes content for link opportunities and CTA suggestions.', params: 'content: string, options?', returns: 'Promise<ContentAnalysis>' },
                { name: 'applyInternalLinks()', service: 'internal-linking.ts', description: 'Applies suggested internal links to content.', params: 'content: string, options?', returns: 'Promise<string>' },
                { name: 'generateCtaBlock()', service: 'internal-linking.ts', description: 'Generates HTML CTA block from template.', params: 'template: CtaTemplate', returns: 'Promise<string>' },
                { name: 'injectCtaIntoContent()', service: 'internal-linking.ts', description: 'Injects CTA at specified position.', params: 'content: string, options?', returns: 'Promise<string>' },
                { name: 'autoGenerateLinkingRulesFromPages()', service: 'internal-linking.ts', description: 'Auto-generates linking rules from existing pages.', params: 'none', returns: 'Promise<LinkingRule[]>' },
                { name: 'getContentWithEnhancements()', service: 'internal-linking.ts', description: 'Gets page content with links and CTAs applied.', params: 'pageId: string', returns: 'Promise<EnhancedContent>' },
                // page-integrator.ts
                { name: 'integrateTsxPage()', service: 'page-integrator.ts', description: 'Integrates TSX page into project, updates App.tsx.', params: 'inputCode: string', returns: 'Promise<IntegrationResult>' },
                { name: 'convertHtmlToTsx()', service: 'page-integrator.ts', description: 'Converts raw HTML to TSX using AI.', params: 'htmlCode: string, componentName: string', returns: 'Promise<string>' },
                { name: 'processComponentCode()', service: 'page-integrator.ts', description: 'Adds wrappers and imports to TSX.', params: 'tsxCode: string, componentName: string', returns: 'string' },
                { name: 'updateAppTsx()', service: 'page-integrator.ts', description: 'Updates App.tsx with new route.', params: 'routePath, componentName, fileName', returns: 'boolean' },
                // magic-page-generator.ts
                { name: 'generateMagicPage()', service: 'magic-page-generator.ts', description: 'Generates full page from proposed page entry.', params: 'proposedPageId: string', returns: 'Promise<GeneratedPage>' },
            ]
        },
        {
            id: 'image-services',
            title: 'Image Services',
            icon: Code,
            color: 'from-pink-500 to-pink-700',
            functions: [
                // image-generator.ts
                { name: 'generateImage()', service: 'image-generator.ts', description: 'Generates image using Gemini AI. Returns file path and base64 data.', params: 'prompt: string', returns: 'Promise<GeneratedImage>' },
                { name: 'regenerateImage()', service: 'image-generator.ts', description: 'Regenerates image, optionally deletes old one.', params: 'prompt: string, oldFilePath?: string', returns: 'Promise<GeneratedImage>' },
                { name: 'deleteImage()', service: 'image-generator.ts', description: 'Deletes image file from disk.', params: 'filePath: string', returns: 'boolean' },
                // prompt-synthesizer.ts
                { name: 'synthesizePrompts()', service: 'prompt-synthesizer.ts', description: 'Creates detailed image prompts from page context and detected image slots.', params: 'page: Page, slots: DetectedSlot[]', returns: 'Promise<SynthesizedPrompt[]>' },
                { name: 'synthesizeSinglePrompt()', service: 'prompt-synthesizer.ts', description: 'Creates single image prompt for one slot.', params: 'page: Page, slot: DetectedSlot', returns: 'Promise<SynthesizedPrompt>' },
                // image-slot-detector.ts
                { name: 'detectImageSlots()', service: 'image-slot-detector.ts', description: 'Detects placeholder image slots in HTML content.', params: 'html: string', returns: 'DetectedSlot[]' },
            ]
        },
        {
            id: 'payment-services',
            title: 'Stripe/Payment Services',
            icon: Settings,
            color: 'from-orange-500 to-orange-700',
            functions: [
                // stripeService.ts
                { name: 'createCustomer()', service: 'stripeService.ts', description: 'Creates Stripe customer.', params: 'email, name?, metadata?', returns: 'Promise<Customer>' },
                { name: 'createCheckoutSession()', service: 'stripeService.ts', description: 'Creates Stripe checkout session.', params: 'options: CheckoutOptions', returns: 'Promise<Session>' },
                { name: 'createCustomerPortalSession()', service: 'stripeService.ts', description: 'Creates customer billing portal session.', params: 'customerId, returnUrl', returns: 'Promise<PortalSession>' },
                { name: 'getProduct()', service: 'stripeService.ts', description: 'Gets single Stripe product.', params: 'productId: string', returns: 'Promise<Product>' },
                { name: 'listProducts()', service: 'stripeService.ts', description: 'Lists all Stripe products.', params: 'active?: boolean, limit?: number', returns: 'Promise<Product[]>' },
                { name: 'getSubscription()', service: 'stripeService.ts', description: 'Gets subscription details.', params: 'subscriptionId: string', returns: 'Promise<Subscription>' },
                { name: 'getCustomer()', service: 'stripeService.ts', description: 'Gets customer details.', params: 'customerId: string', returns: 'Promise<Customer>' },
                { name: 'getCheckoutSession()', service: 'stripeService.ts', description: 'Gets checkout session details.', params: 'sessionId: string', returns: 'Promise<Session>' },
                // webhookHandlers.ts
                { name: 'processWebhook()', service: 'webhookHandlers.ts', description: 'Processes incoming Stripe webhooks.', params: 'payload, signature, uuid', returns: 'Promise<void>' },
            ]
        },
        {
            id: 'maintenance-services',
            title: 'Maintenance Services',
            icon: Settings,
            color: 'from-slate-500 to-slate-700',
            functions: [
                // maintenanceService.ts
                { name: 'runMaintenanceCheck()', service: 'maintenanceService.ts', description: 'Runs full system health check (types, deps, routes, DB).', params: 'triggeredBy?: string', returns: 'Promise<MaintenanceReportData>' },
                { name: 'getLatestReport()', service: 'maintenanceService.ts', description: 'Gets most recent maintenance report.', params: 'none', returns: 'MaintenanceReport' },
                { name: 'getMaintenanceSettings()', service: 'maintenanceService.ts', description: 'Gets current maintenance settings.', params: 'none', returns: 'MaintenanceSettings' },
                { name: 'startMaintenanceScheduler()', service: 'maintenanceService.ts', description: 'Starts scheduled maintenance checks.', params: 'none', returns: 'void' },
                { name: 'getAiSummary()', service: 'maintenanceService.ts', description: 'Generates AI summary of report.', params: 'report: MaintenanceReportData', returns: 'string' },
                // githubClient.ts
                { name: 'getOctokit()', service: 'githubClient.ts', description: 'Gets authenticated GitHub client.', params: 'none', returns: 'Octokit' },
            ]
        },
        {
            id: 'api-routes',
            title: 'API Routes',
            icon: Database,
            color: 'from-indigo-500 to-indigo-700',
            functions: [
                { name: 'GET /api/products', service: 'Public API', description: 'List all products', params: '-', returns: 'JSON[]' },
                { name: 'GET /api/pages', service: 'Public API', description: 'List pages (supports ?tree=true)', params: 'tree, clusterKey', returns: 'JSON[]' },
                { name: 'GET /api/pages/by-path/*', service: 'Public API', description: 'Get page by URL path', params: 'path', returns: 'JSON' },
                { name: 'POST /api/admin/login', service: 'Admin API', description: 'Admin login', params: 'username, password', returns: 'Session' },
                { name: 'POST /api/admin/pages', service: 'Admin API', description: 'Create page', params: 'Page object', returns: 'Page' },
                { name: 'POST /api/admin/bigmind', service: 'Admin API', description: 'BigMind CMS chat', params: 'message, context', returns: 'Stream' },
                { name: 'POST /api/admin/seo-brain/run-optimization', service: 'SEO API', description: 'Run SEO analysis', params: '-', returns: 'Report' },
                { name: 'POST /api/stripe/checkout', service: 'Stripe API', description: 'Create checkout session', params: 'cart items', returns: 'Session URL' }
            ]
        }
    ];

    const filteredSections = sections.map(section => ({
        ...section,
        functions: section.functions.filter(fn =>
            searchQuery === '' ||
            fn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            fn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            fn.service.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(section => section.functions.length > 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">Function Documentation</h1>
                            <p className="text-slate-400">Complete reference for all AI functions, services, and API endpoints</p>
                        </div>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                            {sections.reduce((acc, s) => acc + s.functions.length, 0)} Functions
                        </Badge>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search functions, services, or descriptions..."
                            className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="space-y-8">
                    {filteredSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div key={section.id} className="space-y-4">
                                {/* Section Header */}
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-lg bg-gradient-to-br ${section.color}`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                                        <p className="text-sm text-slate-400">{section.functions.length} functions</p>
                                    </div>
                                </div>

                                {/* Function Cards */}
                                <div className="grid grid-cols-1 gap-4">
                                    {section.functions.map((fn, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-slate-600 transition-all group"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <code className="text-lg font-mono font-semibold text-purple-400">
                                                            {fn.name}
                                                        </code>
                                                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                                                    </div>
                                                    <p className="text-slate-300 mb-3">{fn.description}</p>
                                                </div>
                                                <Badge variant="secondary" className="ml-4 shrink-0">
                                                    {fn.service}
                                                </Badge>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-slate-500 font-medium">Parameters:</span>
                                                    <code className="ml-2 text-blue-400">{fn.params}</code>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 font-medium">Returns:</span>
                                                    <code className="ml-2 text-green-400">{fn.returns}</code>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {filteredSections.length === 0 && (
                        <div className="text-center py-16">
                            <Database className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400 text-lg">No functions found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
