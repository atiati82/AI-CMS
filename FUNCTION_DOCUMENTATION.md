# Andara Ionic CMS - Function Documentation

## Table of Contents
1. [AI Services](#ai-services)
2. [SEO Services](#seo-services)
3. [Content Services](#content-services)
4. [Image Services](#image-services)
5. [Stripe/Payment Services](#stripepayment-services)
6. [Maintenance Services](#maintenance-services)
7. [API Routes](#api-routes)

---

## AI Services

### `andara-chat.ts` - BigMind AI Chat

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `chat()` | `messages: ChatMessage[], includeContext?: boolean` | `Promise<string>` | Main AI chat function. Sends messages to AI with optional site context. |
| `getAiClient()` | none | `Promise<{client, model}>` | Gets configured AI client (Gemini or OpenAI). |
| `getConfiguredModel()` | none | `Promise<string>` | Retrieves AI model from CMS settings. |
| `getRelevantContext()` | none | `Promise<string>` | Gathers site content for AI context. |
| `getChatSystemPrompt()` | none | `Promise<string>` | Gets BigMind system prompt. |
| `getSiteOverview()` | none | `Promise<SiteOverview>` | Returns page counts, cluster stats, priority stats. |

### `bigmind-cms.ts` - CMS Function Calling

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `chatWithFunctions()` | `messages, mode, modelOverride?` | `Promise<BigMindResponse>` | AI chat with CMS database operations (create, update, delete pages). |

### `ai-startup.ts` - Page Generation

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `generatePageFromBrief()` | `brief: string, pageSlug?: string` | `Promise<AIStartupResult>` | Generates complete React page from text brief. Returns TSX, HTML, SEO metadata. |
| `detectLayouts()` | `content: string` | `Promise<string[]>` | Detects layout IDs from page content using AI. |

### `ai-enricher.ts` - Content Enrichment

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `enrichPageHtml()` | `html: string, steps?: EnrichmentSteps` | `Promise<AiEnrichment>` | AI analyzes HTML and returns image prompts, layout specs, motion specs, SEO suggestions. |

---

## SEO Services

### `seo-brain.ts` - SEO Brain Service

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `calculateOpportunityScore()` | `pageId: string` | `Promise<PageOpportunityScore>` | Calculates SEO improvement opportunity score (0-100). |
| `generateAiSuggestions()` | `pageId: string, analysisContext?: string` | `Promise<SeoSuggestion[]>` | AI-generated SEO improvement suggestions. |
| `createSuggestionsForPage()` | `pageId: string` | `Promise<InsertPageAiSuggestion[]>` | Creates and saves SEO suggestions to database. |
| `syncSearchConsoleMetrics()` | none | `Promise<number>` | Syncs data from Google Search Console. |
| `runDailyOptimization()` | none | `Promise<DailySeoReport>` | Runs daily SEO analysis across all pages. |
| `generateProposedPage()` | `targetKeyword: string, options?` | `Promise<InsertProposedPage>` | Generates new page blueprint from keyword. |
| `generateContentBlock()` | `pageId, blockType, hook, context?` | `Promise<string>` | Generates FAQ, related links, or other content blocks. |
| `getTodaysActions()` | `limit?: number` | `Promise<TodaysActions>` | Gets daily SEO tasks and opportunities. |

### `seo-scanner.ts` - Keyword Analysis

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `extractKeywordsFromText()` | `text: string, maxKeywords?: number` | `Promise<string[]>` | Extracts keywords from text content. |
| `detectSearchIntent()` | `keyword: string` | `SearchIntent` | Detects intent: informational, commercial, navigational, transactional. |
| `calculateRelevanceScore()` | `keyword: string` | `number` | Calculates keyword relevance score (0-100). |
| `analyzeKeyword()` | `keyword: string` | `Promise<SeoAnalysisResult>` | Full keyword analysis with metrics. |
| `suggestClusterForKeyword()` | `keyword: string` | `string \| undefined` | Suggests content cluster for keyword. |
| `analyzeDocument()` | `document: Document` | `Promise<SeoAnalysisResult[]>` | Analyzes all keywords in a document. |
| `findOpportunities()` | `options?: FilterOptions` | `Promise<SeoAnalysisResult[]>` | Finds SEO opportunities based on criteria. |
| `scanDocumentAndSaveKeywords()` | `documentId: string` | `Promise<InsertSeoKeyword[]>` | Extracts and saves keywords from document. |
| `getSuggestedKeywords()` | `seeds: string[], limit?: number` | `Promise<string[]>` | Suggests related keywords from seeds. |

### `searchConsoleService.ts` - Google Search Console

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `getSearchAnalytics()` | `options: AnalyticsOptions` | `Promise<SearchAnalyticsResponse>` | Gets search performance data from GSC. |
| `getTopQueries()` | `limit?: number` | `Promise<Query[]>` | Gets top search queries. |
| `getTopPages()` | `limit?: number` | `Promise<PageData[]>` | Gets top performing pages. |
| `inspectUrl()` | `url: string` | `Promise<UrlInspection>` | Inspects URL indexing status. |

---

## Content Services

### `internal-linking.ts` - Internal Links & CTAs

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `analyzeContent()` | `content: string, options?` | `Promise<ContentAnalysis>` | Analyzes content for link opportunities and CTA suggestions. |
| `applyInternalLinks()` | `content: string, options?` | `Promise<string>` | Applies suggested internal links to content. |
| `generateCtaBlock()` | `template: CtaTemplate` | `Promise<string>` | Generates HTML CTA block from template. |
| `injectCtaIntoContent()` | `content: string, options?` | `Promise<string>` | Injects CTA at specified position. |
| `autoGenerateLinkingRulesFromPages()` | none | `Promise<LinkingRule[]>` | Auto-generates linking rules from existing pages. |
| `getContentWithEnhancements()` | `pageId: string` | `Promise<EnhancedContent>` | Gets page content with links and CTAs applied. |

### `page-integrator.ts` - Page Integration

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `integrateTsxPage()` | `inputCode: string` | `Promise<IntegrationResult>` | Integrates TSX page into project, updates App.tsx. |
| `convertHtmlToTsx()` | `htmlCode: string, componentName: string` | `Promise<string>` | Converts raw HTML to TSX using AI. |
| `processComponentCode()` | `tsxCode: string, componentName: string` | `string` | Adds wrappers and imports to TSX. |
| `updateAppTsx()` | `routePath, componentName, fileName` | `boolean` | Updates App.tsx with new route. |

### `magic-page-generator.ts` - Magic Page Creator

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `generateMagicPage()` | `proposedPageId: string` | `Promise<GeneratedPage>` | Generates full page from proposed page entry. |

---

## Image Services

### `image-generator.ts` - AI Image Generation

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `generateImage()` | `prompt: string` | `Promise<GeneratedImage>` | Generates image using Gemini AI. Returns file path and base64 data. |
| `regenerateImage()` | `prompt: string, oldFilePath?: string` | `Promise<GeneratedImage>` | Regenerates image, optionally deletes old one. |
| `deleteImage()` | `filePath: string` | `boolean` | Deletes image file from disk. |

### `prompt-synthesizer.ts` - Image Prompt Generation

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `synthesizePrompts()` | `page: Page, slots: DetectedSlot[]` | `Promise<SynthesizedPrompt[]>` | Creates detailed image prompts from page context and detected image slots. |
| `synthesizeSinglePrompt()` | `page: Page, slot: DetectedSlot` | `Promise<SynthesizedPrompt>` | Creates single image prompt for one slot. |

### `image-slot-detector.ts` - Image Slot Detection

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `detectImageSlots()` | `html: string` | `DetectedSlot[]` | Detects placeholder image slots in HTML content. |

---

## Stripe/Payment Services

### `stripeService.ts` - Stripe Integration

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `createCustomer()` | `email, name?, metadata?` | `Promise<Customer>` | Creates Stripe customer. |
| `createCheckoutSession()` | `options: CheckoutOptions` | `Promise<Session>` | Creates Stripe checkout session. |
| `createCustomerPortalSession()` | `customerId, returnUrl` | `Promise<PortalSession>` | Creates customer billing portal session. |
| `getProduct()` | `productId: string` | `Promise<Product>` | Gets single Stripe product. |
| `listProducts()` | `active?: boolean, limit?: number` | `Promise<Product[]>` | Lists all Stripe products. |
| `listProductsWithPrices()` | `active?: boolean, limit?: number` | `Promise<ProductWithPrices[]>` | Lists products with their prices. |
| `getPrice()` | `priceId: string` | `Promise<Price>` | Gets single Stripe price. |
| `listPrices()` | `active?: boolean, limit?: number` | `Promise<Price[]>` | Lists all prices. |
| `getPricesForProduct()` | `productId: string` | `Promise<Price[]>` | Gets prices for specific product. |
| `getSubscription()` | `subscriptionId: string` | `Promise<Subscription>` | Gets subscription details. |
| `getCustomer()` | `customerId: string` | `Promise<Customer>` | Gets customer details. |
| `getPaymentIntent()` | `paymentIntentId: string` | `Promise<PaymentIntent>` | Gets payment intent details. |
| `getCheckoutSession()` | `sessionId: string` | `Promise<Session>` | Gets checkout session details. |

### `webhookHandlers.ts` - Stripe Webhooks

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `processWebhook()` | `payload: Buffer, signature: string, uuid: string` | `Promise<void>` | Processes incoming Stripe webhooks. |

---

## Maintenance Services

### `maintenanceService.ts` - System Health

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `runMaintenanceCheck()` | `triggeredBy?: string` | `Promise<MaintenanceReportData>` | Runs full system health check (types, deps, routes, DB). |
| `getLatestReport()` | none | `MaintenanceReport` | Gets most recent maintenance report. |
| `getReportHistory()` | `limit?: number` | `MaintenanceReport[]` | Gets maintenance report history. |
| `getMaintenanceSettings()` | none | `MaintenanceSettings` | Gets current maintenance settings. |
| `updateMaintenanceSetting()` | `key: string, value: any` | `void` | Updates single maintenance setting. |
| `startMaintenanceScheduler()` | none | `void` | Starts scheduled maintenance checks. |
| `stopMaintenanceScheduler()` | none | `void` | Stops scheduled maintenance. |
| `getAiSummary()` | `report: MaintenanceReportData` | `string` | Generates AI summary of report. |

### `githubClient.ts` - GitHub Integration

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `getOctokit()` | none | `Octokit` | Gets authenticated GitHub client. |
| `getRepoInfo()` | none | `Promise<RepoInfo>` | Gets repository information. |

---

## API Routes

### Public Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | List all products |
| `/api/products/:slug` | GET | Get product by slug |
| `/api/clusters` | GET | List all clusters |
| `/api/clusters/:slug` | GET | Get cluster by slug |
| `/api/pages` | GET | List pages (supports `?tree=true`, `?clusterKey=`, `?parentKey=`) |
| `/api/pages/by-path/*` | GET | Get page by URL path |
| `/api/pages/by-key/:key` | GET | Get page by unique key |
| `/api/pages/:key/breadcrumbs` | GET | Get page breadcrumb trail |
| `/api/pages/:key/children` | GET | Get child pages |
| `/api/navigation` | GET | Get site navigation structure |
| `/api/design-settings` | GET | Get public design settings |

### Admin Routes (require authentication)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/login` | POST | Admin login |
| `/api/admin/me` | GET | Get current admin user |
| `/api/admin/pages` | POST | Create page |
| `/api/admin/pages/:id` | PUT | Update page |
| `/api/admin/pages/:id` | DELETE | Delete page |
| `/api/admin/clusters` | POST | Create cluster |
| `/api/admin/products` | POST | Create product |
| `/api/admin/settings` | GET/POST | CMS settings |
| `/api/admin/ai-settings` | GET/POST | AI configuration settings |
| `/api/admin/html-templates` | GET/POST | HTML templates |
| `/api/admin/generate-image` | POST | Generate AI image |
| `/api/admin/bigmind` | POST | BigMind CMS chat |
| `/api/admin-chat` | POST | Admin AI chat |

### SEO Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/seo/status` | GET | Check GSC configuration |
| `/api/admin/seo/summary` | GET | SEO summary stats |
| `/api/admin/seo/queries` | GET | Top search queries |
| `/api/admin/seo/pages` | GET | Top performing pages |
| `/api/admin/seo/performance` | GET | Performance by date |
| `/api/admin/seo/inspect` | POST | URL inspection |
| `/api/admin/seo-brain/todays-actions` | GET | Daily SEO tasks |
| `/api/admin/seo-brain/run-optimization` | POST | Run SEO analysis |
| `/api/admin/proposed-pages` | GET/POST | Proposed page CRUD |
| `/api/admin/design-tokens` | GET/POST | Design tokens CRUD |

### Stripe Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/stripe/config` | GET | Get Stripe publishable key |
| `/api/stripe/checkout` | POST | Create checkout session |
| `/api/stripe/webhook` | POST | Stripe webhook handler |
| `/api/admin/orders` | GET | List orders |
| `/api/admin/orders/:id` | GET/PUT | Get/update order |

---

## Data Types

### ChatMessage
```typescript
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
```

### AiEnrichment
```typescript
interface AiEnrichment {
  extractedAt: string;
  imagePrompts: ImagePrompt[];
  videoPrompts: VideoPrompt[];
  layoutSpecs: LayoutSpec[];
  animationSpecs: AnimationSpec[];
  motionSpecs: MotionSpec[];
  suggestedSeo: SeoSuggestions;
  suggestedLinks: LinkSuggestion[];
  components: Component[];
}
```

### PageOpportunityScore
```typescript
interface PageOpportunityScore {
  pageId: string;
  pageTitle: string;
  pagePath: string;
  opportunityScore: number;
  factors: {
    impressionsWithLowCtr: number;
    positionImprovement: number;
    contentGap: number;
    internalLinkingOpportunity: number;
  };
  recommendations: string[];
}
```

### GeneratedImage
```typescript
interface GeneratedImage {
  success: boolean;
  filePath?: string;
  publicUrl?: string;
  base64Data?: string;
  mimeType?: string;
  error?: string;
}
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SESSION_SECRET` | Yes | Express session secret |
| `STRIPE_SECRET_KEY` | For payments | Stripe API key |
| `STRIPE_PUBLISHABLE_KEY` | For payments | Stripe public key |
| `GSC_CLIENT_EMAIL` | For SEO | Google Search Console service account |
| `GSC_PRIVATE_KEY` | For SEO | GSC private key |
| `GSC_SITE_URL` | For SEO | Default site URL for GSC |
| `GEMINI_API_KEY` | For AI | Google Gemini API key |
| `OPENAI_API_KEY` | Optional | OpenAI API key (fallback) |

---

*Generated: December 15, 2025*
