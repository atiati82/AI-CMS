# Andara Ionic CMS - Complete Build Guide

A comprehensive guide to building the Andara Ionic CMS from scratch, based on the complete development history.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Initial Setup](#3-initial-setup)
4. [Database Schema](#4-database-schema)
5. [Backend Architecture](#5-backend-architecture)
6. [Frontend Architecture](#6-frontend-architecture)
7. [AI Integration](#7-ai-integration)
8. [BigMind CMS System](#8-bigmind-cms-system)
9. [Motion & Layout System](#9-motion--layout-system)
10. [SEO Brain System](#10-seo-brain-system)
11. [Stripe Integration](#11-stripe-integration)
12. [Admin Panel](#12-admin-panel)
13. [Deployment](#13-deployment)

---

## 1. Project Overview

### Purpose
Andara Ionic CMS is a full-stack web application for selling primordial ionic sulfate mineral products with an extensive science education library (120+ pages). It features:

- AI-powered content management (BigMind)
- Visual page builder with motion effects
- SEO optimization tools (SEO Brain)
- E-commerce with Stripe integration
- Hierarchical content clustering

### Core Features
- **AI Page Builder**: Auto-generates React pages from text briefs
- **BigMind Chat**: AI assistant for CMS operations via natural language
- **Motion Layout Engine**: 10 motion archetypes, 37+ layout definitions
- **SEO Brain**: WordPress-style AI SEO optimization
- **Content Clustering**: Thematic organization with visual design tokens

---

## 2. Technology Stack

### Frontend
```
React 18 + TypeScript
Vite (bundler)
Wouter (routing)
TanStack Query (server state)
Radix UI + shadcn/ui (components)
Tailwind CSS v4 (styling)
Framer Motion (animations)
```

### Backend
```
Node.js + Express
TypeScript
Drizzle ORM
PostgreSQL
express-session (authentication)
bcryptjs (password hashing)
```

### AI Services
```
Google Gemini (primary)
OpenAI GPT-4 (fallback)
```

### Payments
```
Stripe
stripe-replit-sync (auto-sync)
```

---

## 3. Initial Setup

### Project Structure
```
andara-ionic/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── public/
│   └── index.html
├── server/
│   ├── services/
│   ├── routes.ts
│   ├── storage.ts
│   ├── db.ts
│   └── index.ts
├── shared/
│   └── schema.ts
├── attached_assets/
│   └── generated_images/
└── package.json
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --bundle --platform=node --outdir=dist",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

### Essential Dependencies
```bash
# Frontend
npm install react react-dom wouter @tanstack/react-query
npm install @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-select
npm install tailwindcss framer-motion lucide-react

# Backend
npm install express drizzle-orm pg bcryptjs express-session
npm install @google/genai stripe stripe-replit-sync

# Dev
npm install -D typescript tsx vite @vitejs/plugin-react drizzle-kit
```

---

## 4. Database Schema

### Core Tables

#### Pages Table
```typescript
// shared/schema.ts
import { pgTable, text, varchar, timestamp, jsonb, integer } from "drizzle-orm/pg-core";

export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key").unique().notNull(),
  title: text("title").notNull(),
  path: varchar("path").notNull(),
  content: text("content"),
  template: varchar("template").default("standard"),
  status: varchar("status").default("draft"), // draft, published
  clusterKey: varchar("cluster_key"),
  parentKey: varchar("parent_key"),
  sortOrder: integer("sort_order").default(0),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords").array(),
  visualConfig: jsonb("visual_config"), // Motion, layout, design settings
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

#### Clusters Table
```typescript
export const clusters = pgTable("clusters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key").unique().notNull(),
  name: text("name").notNull(),
  slug: varchar("slug").notNull(),
  description: text("description"),
  color: varchar("color"), // Hex color for visual theming
  icon: varchar("icon"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});
```

#### Products Table
```typescript
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: varchar("slug").unique().notNull(),
  description: text("description"),
  price: integer("price").notNull(), // In cents
  stripeProductId: varchar("stripe_product_id"),
  stripePriceId: varchar("stripe_price_id"),
  images: text("images").array(),
  features: jsonb("features"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});
```

#### Admin Users Table
```typescript
export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  role: varchar("role").default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

#### CMS Settings Table
```typescript
export const cmsSettings = pgTable("cms_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key").unique().notNull(),
  value: jsonb("value"),
  category: varchar("category"), // design, ai, seo
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

#### Admin AI Settings Table
```typescript
export const adminAiSettings = pgTable("admin_ai_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key").unique().notNull(),
  category: varchar("category"),
  label: text("label"),
  value: text("value"), // Prompt text
  description: text("description"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

### SEO Tables

```typescript
export const pageAiSuggestions = pgTable("page_ai_suggestions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").references(() => pages.id),
  suggestionType: varchar("suggestion_type"), // title, description, content, links
  suggestion: text("suggestion"),
  priority: varchar("priority").default("medium"),
  status: varchar("status").default("pending"), // pending, applied, dismissed
  createdAt: timestamp("created_at").defaultNow(),
});

export const pageSearchMetrics = pgTable("page_search_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").references(() => pages.id),
  clicks: integer("clicks"),
  impressions: integer("impressions"),
  ctr: integer("ctr"), // Stored as basis points (200 = 2.00%)
  avgPosition: integer("avg_position"), // Stored as x100
  date: timestamp("date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const proposedPages = pgTable("proposed_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  targetKeyword: varchar("target_keyword").notNull(),
  workingTitle: text("working_title"),
  suggestedSlug: varchar("suggested_slug"),
  outline: jsonb("outline"),
  status: varchar("status").default("suggested"), // suggested, outline_ready, generated
  score: integer("score"),
  generatedPageId: varchar("generated_page_id"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

---

## 5. Backend Architecture

### Server Entry Point
```typescript
// server/index.ts
import express from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { setupVite } from "./vite";
import { setupStatic } from "./static";

const app = express();
const httpServer = createServer(app);

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Parse JSON (but not for Stripe webhooks)
app.use((req, res, next) => {
  if (req.path === '/api/stripe/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Register API routes
await registerRoutes(httpServer, app);

// Setup Vite or static serving
if (process.env.NODE_ENV === "development") {
  await setupVite(app, httpServer);
} else {
  setupStatic(app);
}

httpServer.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
```

### Storage Layer Pattern
```typescript
// server/storage.ts
import { db } from "./db";
import { pages, clusters, products } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Pages
  getAllPages(): Promise<Page[]>;
  getPage(id: string): Promise<Page | null>;
  getPageByPath(path: string): Promise<Page | null>;
  createPage(data: InsertPage): Promise<Page>;
  updatePage(id: string, data: Partial<Page>): Promise<Page>;
  deletePage(id: string): Promise<void>;
  
  // Clusters
  getAllClusters(): Promise<Cluster[]>;
  getClusterBySlug(slug: string): Promise<Cluster | null>;
  
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
}

class DatabaseStorage implements IStorage {
  async getAllPages() {
    return db.select().from(pages).orderBy(pages.sortOrder);
  }
  
  async getPage(id: string) {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page || null;
  }
  
  async createPage(data: InsertPage) {
    const [page] = await db.insert(pages).values(data).returning();
    return page;
  }
  
  // ... more methods
}

export const storage = new DatabaseStorage();
```

### Route Structure
```typescript
// server/routes.ts
export async function registerRoutes(httpServer: Server, app: Express) {
  
  // PUBLIC ROUTES
  app.get("/api/pages", async (req, res) => {
    const pages = await storage.getAllPages();
    res.json(pages);
  });
  
  app.get("/api/products", async (req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });
  
  // ADMIN ROUTES (with auth middleware)
  app.post("/api/admin/pages", requireAuth, async (req, res) => {
    const validated = insertPageSchema.parse(req.body);
    const page = await storage.createPage(validated);
    res.json(page);
  });
  
  // AI ROUTES
  app.post("/api/admin/bigmind", requireAuth, async (req, res) => {
    const { messages, mode, model } = req.body;
    const response = await chatWithFunctions(messages, mode, model);
    res.json(response);
  });
  
  // STRIPE ROUTES
  app.post("/api/stripe/webhook", express.raw({ type: 'application/json' }), 
    async (req, res) => {
      await webhookHandlers.processWebhook(req.body, req.headers['stripe-signature']);
      res.json({ received: true });
    }
  );
  
  return httpServer;
}
```

---

## 6. Frontend Architecture

### App.tsx Routing
```typescript
// client/src/App.tsx
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Pages
import Home from "./pages/home";
import Admin from "./pages/admin";
import ProductPage from "./pages/product";
import SciencePage from "./pages/science";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/product/:slug" component={ProductPage} />
        <Route path="/science/:path*" component={SciencePage} />
        <Route>404 Not Found</Route>
      </Switch>
    </QueryClientProvider>
  );
}
```

### Query Client Setup
```typescript
// client/src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// API helper
export async function apiRequest(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
```

### Custom Hooks Pattern
```typescript
// client/src/hooks/use-pages.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";

export function usePages() {
  return useQuery({
    queryKey: ["pages"],
    queryFn: () => apiRequest("/api/pages"),
  });
}

export function useCreatePage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: InsertPage) => 
      apiRequest("/api/admin/pages", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}
```

---

## 7. AI Integration

### AI Client Setup
```typescript
// server/services/andara-chat.ts
import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Model configuration
const MODEL_PROVIDERS = {
  "gemini-2.5-flash": { provider: "gemini", model: "gemini-2.5-flash" },
  "gemini-2.0-flash": { provider: "gemini", model: "gemini-2.0-flash" },
  "gpt-4.1-mini": { provider: "openai", model: "gpt-4.1-mini" },
};

const DEFAULT_MODEL = "gemini-2.5-flash";

export async function getAiClient() {
  const configuredModel = await getConfiguredModel();
  const modelConfig = MODEL_PROVIDERS[configuredModel] || MODEL_PROVIDERS[DEFAULT_MODEL];
  
  if (modelConfig.provider === "gemini") {
    return { client: gemini, model: modelConfig.model };
  }
  // OpenAI fallback...
}

export async function chat(messages: ChatMessage[], includeContext = true): Promise<string> {
  const systemPrompt = await getChatSystemPrompt();
  const context = includeContext ? await getRelevantContext() : "";
  
  const { client, model } = await getAiClient();
  
  const response = await client.models.generateContent({
    model,
    contents: [
      { role: "user", parts: [{ text: `SYSTEM:\n${systemPrompt}\n\n${context}` }] },
      { role: "model", parts: [{ text: "I understand. How can I help?" }] },
      ...messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }))
    ],
  });
  
  return response.text?.trim() || "";
}
```

### Content Enrichment
```typescript
// server/services/ai-enricher.ts
export async function enrichPageHtml(html: string): Promise<AiEnrichment> {
  const prompt = `Analyze this HTML and extract:
  1. imagePrompts - AI image generation prompts for placeholders
  2. layoutSpecs - Detected layout patterns
  3. motionSpecs - Suggested animations
  4. suggestedSeo - Title, description, keywords
  
  Return JSON only.`;
  
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [{ role: "user", parts: [{ text: `${prompt}\n\n${html}` }] }],
  });
  
  return JSON.parse(response.text);
}
```

---

## 8. BigMind CMS System

### Function Calling Architecture
```typescript
// server/services/bigmind-cms.ts
const CMS_FUNCTIONS = [
  {
    name: "createPage",
    description: "Create a new page in the CMS",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "Page title" },
        path: { type: "string", description: "URL path" },
        content: { type: "string", description: "HTML content" },
        clusterKey: { type: "string", description: "Content cluster" },
        template: { type: "string", description: "Page template" },
      },
      required: ["title", "path"],
    },
  },
  {
    name: "updatePage",
    description: "Update an existing page",
    parameters: {
      type: "object",
      properties: {
        pageId: { type: "string" },
        updates: { type: "object" },
      },
      required: ["pageId", "updates"],
    },
  },
  {
    name: "listPages",
    description: "List pages with optional filters",
    parameters: {
      type: "object",
      properties: {
        clusterKey: { type: "string" },
        status: { type: "string" },
        limit: { type: "number" },
      },
    },
  },
  // ... more functions
];

export async function chatWithFunctions(
  messages: ChatMessage[],
  mode: "cms" | "library",
  modelOverride?: string
): Promise<BigMindResponse> {
  const systemPrompt = mode === "cms" 
    ? await getCmsSystemPrompt() 
    : await getLibrarySystemPrompt();
  
  const { client, model } = await getAiClient(modelOverride);
  
  const response = await client.models.generateContent({
    model,
    contents: messages,
    tools: mode === "cms" ? [{ functionDeclarations: CMS_FUNCTIONS }] : undefined,
  });
  
  // Handle function calls
  if (response.functionCalls?.length) {
    const results = await executeFunctionCalls(response.functionCalls);
    return { response: response.text, functionResults: results };
  }
  
  return { response: response.text };
}

async function executeFunctionCalls(calls: FunctionCall[]) {
  const results = [];
  
  for (const call of calls) {
    switch (call.name) {
      case "createPage":
        const page = await storage.createPage(call.args);
        results.push({ function: "createPage", result: page });
        break;
      case "updatePage":
        const updated = await storage.updatePage(call.args.pageId, call.args.updates);
        results.push({ function: "updatePage", result: updated });
        break;
      // ... more handlers
    }
  }
  
  return results;
}
```

### BigMind System Prompt
```typescript
const BIGMIND_SYSTEM_PROMPT = `You are BigMind, an AI assistant for the Andara Ionic CMS.

## Your Capabilities:
- Create, update, delete pages via function calling
- Analyze content and suggest improvements
- Generate SEO recommendations
- Apply motion and layout configurations

## Content Clusters:
- water-science: Water purification, structured water
- mineral-science: Ionic minerals, sulfates
- bioelectricity: Cellular energy, bioelectric health
- crystalline-matrix: Crystal structure, molecular patterns

## Page Templates:
- standard: Basic content page
- science-article: Educational content
- product-page: E-commerce product
- landing-page: Marketing landing

## Motion Archetypes:
- Liquid-Crystal Float
- Energetic Pulse
- Magnetic Drift
- Krystal Bloom
- Scalar Slide
- Vortex Reveal

When the user asks to create or modify content, use the appropriate function.
For questions and advice, respond conversationally.`;
```

---

## 9. Motion & Layout System

### Motion Definitions
```typescript
// client/src/lib/motion.ts
import { Variants } from "framer-motion";

export const MOTION_ARCHETYPES = {
  "liquid-crystal-float": {
    name: "Liquid-Crystal Float",
    description: "Soft, floating movement like water",
    entrance: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    hover: { y: -5, transition: { duration: 0.3 } },
  },
  "energetic-pulse": {
    name: "Energetic Pulse",
    description: "Bioelectric pulsing glow",
    entrance: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
    ambient: {
      boxShadow: [
        "0 0 20px rgba(100, 200, 255, 0.3)",
        "0 0 40px rgba(100, 200, 255, 0.5)",
        "0 0 20px rgba(100, 200, 255, 0.3)",
      ],
      transition: { duration: 2, repeat: Infinity },
    },
  },
  "magnetic-drift": {
    name: "Magnetic Drift",
    description: "Elements attract toward each other",
    entrance: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  // ... 7 more archetypes
};

export function getMotionProps(archetype: string) {
  const config = MOTION_ARCHETYPES[archetype];
  if (!config) return {};
  
  return {
    initial: config.entrance,
    animate: config.animate,
    transition: config.transition,
    whileHover: config.hover,
  };
}
```

### Layout Vocabulary
```typescript
// client/src/lib/layouts.ts
export const LAYOUT_DEFINITIONS = {
  "hero-centered": {
    name: "Centered Hero",
    category: "hero",
    detection: ["hero", "banner", "main-header"],
    structure: "single-column centered",
    motionPreset: "liquid-crystal-float",
  },
  "two-column-text-image": {
    name: "Text + Image Split",
    category: "content",
    detection: ["split", "two-col", "text-image"],
    structure: "50/50 grid",
    motionPreset: "magnetic-drift",
  },
  "card-grid": {
    name: "Card Grid",
    category: "grid",
    detection: ["cards", "grid", "features"],
    structure: "3-column grid",
    motionPreset: "staggered-reveal",
  },
  "parallax-depth": {
    name: "Layered Parallax",
    category: "immersive",
    detection: ["parallax", "depth-layers", "z-layers"],
    structure: "multi-layer scroll",
    motionPreset: "parallax-float",
  },
  // ... 33 more layouts
};

export function detectLayout(html: string): string[] {
  const detected = [];
  const lowerHtml = html.toLowerCase();
  
  for (const [id, layout] of Object.entries(LAYOUT_DEFINITIONS)) {
    if (layout.detection.some(keyword => lowerHtml.includes(keyword))) {
      detected.push(id);
    }
  }
  
  return detected;
}
```

### Andara Page Renderer
```typescript
// client/src/components/andara-page-renderer.tsx
import { motion } from "framer-motion";
import { getMotionProps, MOTION_ARCHETYPES } from "../lib/motion";

interface AndaraPageRendererProps {
  html: string;
  visualConfig?: VisualConfig;
}

export function AndaraPageRenderer({ html, visualConfig }: AndaraPageRendererProps) {
  const motionPreset = visualConfig?.motionPreset || "liquid-crystal-float";
  const motionProps = getMotionProps(motionPreset);
  
  // Parse HTML and wrap sections with motion
  const sections = parseHtmlSections(html);
  
  return (
    <div className="andara-page">
      {sections.map((section, index) => (
        <motion.section
          key={index}
          {...motionProps}
          transition={{ ...motionProps.transition, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          whileInView={motionProps.animate}
          initial={motionProps.entrance}
        >
          <div dangerouslySetInnerHTML={{ __html: section }} />
        </motion.section>
      ))}
    </div>
  );
}

function parseHtmlSections(html: string): string[] {
  // Split by section tags or major divs
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const sections = doc.querySelectorAll("section, .andara-section, [data-section]");
  
  return Array.from(sections).map(s => s.outerHTML);
}
```

---

## 10. SEO Brain System

### SEO Brain Service
```typescript
// server/services/seo-brain.ts
class SeoBrainService {
  async calculateOpportunityScore(pageId: string): Promise<PageOpportunityScore> {
    const page = await storage.getPage(pageId);
    const metrics = await storage.getLatestPageSearchMetrics(pageId);
    
    let score = 0;
    const recommendations = [];
    
    // High impressions, low CTR
    if (metrics?.impressions > 100 && metrics?.ctr < 200) {
      score += 30;
      recommendations.push("Improve meta title/description for better CTR");
    }
    
    // Position 10-30 (page 2-3)
    if (metrics?.avgPosition > 10 && metrics?.avgPosition < 30) {
      score += 25;
      recommendations.push("Content optimization could push to page 1");
    }
    
    // Short content
    if (!page.content || page.content.length < 500) {
      score += 20;
      recommendations.push("Expand content with more detail");
    }
    
    return { pageId, opportunityScore: score, recommendations };
  }
  
  async generateAiSuggestions(pageId: string): Promise<SeoSuggestion[]> {
    const page = await storage.getPage(pageId);
    
    const prompt = `Analyze this page for SEO improvements:
    Title: ${page.title}
    Content: ${page.content?.slice(0, 2000)}
    
    Suggest improvements for: title, description, headings, internal links.
    Return JSON array of suggestions.`;
    
    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    return JSON.parse(response.text);
  }
  
  async getTodaysActions(limit = 10) {
    const suggestions = await storage.getPendingSuggestions(limit);
    const proposedPages = await storage.getProposedPages(5);
    const opportunities = await this.getTopOpportunities(5);
    
    return { suggestions, proposedPages, topOpportunities: opportunities };
  }
}

export const seoBrainService = new SeoBrainService();
```

### SEO Dashboard Component
```typescript
// client/src/components/seo-dashboard.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";

export function SeoDashboard() {
  const { data: actions } = useQuery({
    queryKey: ["seo-actions"],
    queryFn: () => apiRequest("/api/admin/seo-brain/todays-actions"),
  });
  
  return (
    <Tabs defaultValue="suggestions">
      <TabsList>
        <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
        <TabsTrigger value="opportunities">Top Opportunities</TabsTrigger>
        <TabsTrigger value="proposed">Proposed Pages</TabsTrigger>
      </TabsList>
      
      <TabsContent value="suggestions">
        {actions?.suggestions.map(s => (
          <SuggestionCard 
            key={s.id} 
            suggestion={s}
            onApply={() => applySuggestion(s.id)}
            onDismiss={() => dismissSuggestion(s.id)}
          />
        ))}
      </TabsContent>
      
      <TabsContent value="opportunities">
        {actions?.topOpportunities.map(o => (
          <OpportunityCard key={o.pageId} opportunity={o} />
        ))}
      </TabsContent>
      
      <TabsContent value="proposed">
        {actions?.proposedPages.map(p => (
          <ProposedPageCard 
            key={p.id} 
            page={p}
            onGenerate={() => generatePage(p.id)}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
}
```

---

## 11. Stripe Integration

### Stripe Client Setup
```typescript
// server/services/stripeClient.ts
import Stripe from "stripe";
import { syncStripeData } from "stripe-replit-sync";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Auto-sync products, prices, customers
export async function initStripeSync() {
  await syncStripeData(stripe, db);
  console.log("[stripe] Stripe sync ready");
}
```

### Stripe Service
```typescript
// server/services/stripeService.ts
export class StripeService {
  async createCheckoutSession(options: CheckoutOptions) {
    const session = await stripe.checkout.sessions.create({
      customer: options.customerId,
      customer_email: options.customerEmail,
      line_items: [{
        price: options.priceId,
        quantity: options.quantity || 1,
      }],
      mode: options.mode || "payment",
      success_url: options.successUrl,
      cancel_url: options.cancelUrl,
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "DE"] },
      metadata: options.metadata,
    });
    
    return session;
  }
  
  async listProductsWithPrices(active = true) {
    const products = await stripe.products.list({ active, limit: 100 });
    
    const productsWithPrices = await Promise.all(
      products.data.map(async (product) => {
        const prices = await stripe.prices.list({ product: product.id, active: true });
        return { ...product, prices: prices.data };
      })
    );
    
    return productsWithPrices;
  }
}

export const stripeService = new StripeService();
```

### Webhook Handler
```typescript
// server/services/webhookHandlers.ts
export class WebhookHandlers {
  async processWebhook(payload: Buffer, signature: string) {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    switch (event.type) {
      case "checkout.session.completed":
        await this.handleCheckoutComplete(event.data.object);
        break;
      case "payment_intent.succeeded":
        await this.handlePaymentSuccess(event.data.object);
        break;
      case "customer.subscription.updated":
        await this.handleSubscriptionUpdate(event.data.object);
        break;
    }
  }
  
  private async handleCheckoutComplete(session: Stripe.Checkout.Session) {
    await storage.createOrder({
      stripeSessionId: session.id,
      customerId: session.customer as string,
      customerEmail: session.customer_email,
      amount: session.amount_total,
      status: "paid",
    });
  }
}

export const webhookHandlers = new WebhookHandlers();
```

---

## 12. Admin Panel

### Admin Page Structure
```typescript
// client/src/pages/admin.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function AdminPage() {
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  
  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <main className="admin-main">
        <Tabs defaultValue="pages">
          <TabsList>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="clusters">Clusters</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="seo">SEO Brain</TabsTrigger>
            <TabsTrigger value="bigmind">BigMind</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pages">
            <PageTreeView onSelect={setSelectedPage} />
            {selectedPage && (
              <PageEditorModal 
                page={selectedPage} 
                onClose={() => setSelectedPage(null)} 
              />
            )}
          </TabsContent>
          
          <TabsContent value="bigmind">
            <BigMindChatPanel />
          </TabsContent>
          
          <TabsContent value="seo">
            <SeoDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
```

### Page Editor Modal
```typescript
// client/src/components/page-editor-modal.tsx
export function PageEditorModal({ page, onClose }: Props) {
  const [formData, setFormData] = useState(page);
  const updatePage = useUpdatePage();
  
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <Tabs defaultValue="content">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="visual">Visual Config</TabsTrigger>
            <TabsTrigger value="motion">Motion</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <Input 
              label="Title" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
            <RichTextEditor 
              content={formData.content}
              onChange={content => setFormData({...formData, content})}
            />
          </TabsContent>
          
          <TabsContent value="seo">
            <Input label="SEO Title" value={formData.seoTitle} />
            <Textarea label="SEO Description" value={formData.seoDescription} />
            <TagInput label="Keywords" value={formData.seoKeywords} />
          </TabsContent>
          
          <TabsContent value="motion">
            <MotionPresetSelector 
              value={formData.visualConfig?.motionPreset}
              onChange={preset => setFormData({
                ...formData,
                visualConfig: {...formData.visualConfig, motionPreset: preset}
              })}
            />
            <MotionLayoutLinks visualConfig={formData.visualConfig} />
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => updatePage.mutate(formData)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 13. Deployment

### Environment Variables
```bash
# Required
DATABASE_URL=postgresql://...
SESSION_SECRET=your-secret-key

# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI
GEMINI_API_KEY=...
OPENAI_API_KEY=...  # Optional fallback

# SEO (Optional)
GSC_CLIENT_EMAIL=...
GSC_PRIVATE_KEY=...
GSC_SITE_URL=https://...
```

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Database sync
npm run db:push
```

### Replit Deployment
1. Configure environment variables in Secrets tab
2. Set up PostgreSQL database
3. Run `npm run db:push` to sync schema
4. Click "Deploy" to publish

---

## Appendix: File Checklist

### Required Files
- [ ] `package.json` - Dependencies and scripts
- [ ] `tsconfig.json` - TypeScript config
- [ ] `vite.config.ts` - Vite bundler config
- [ ] `drizzle.config.ts` - Drizzle ORM config
- [ ] `tailwind.config.ts` - Tailwind CSS config

### Server Files
- [ ] `server/index.ts` - Entry point
- [ ] `server/routes.ts` - API routes
- [ ] `server/storage.ts` - Database layer
- [ ] `server/db.ts` - Database connection
- [ ] `server/services/andara-chat.ts` - AI chat
- [ ] `server/services/bigmind-cms.ts` - CMS functions
- [ ] `server/services/seo-brain.ts` - SEO service
- [ ] `server/services/stripeService.ts` - Payments

### Client Files
- [ ] `client/src/App.tsx` - Router
- [ ] `client/src/pages/admin.tsx` - Admin panel
- [ ] `client/src/lib/motion.ts` - Motion system
- [ ] `client/src/lib/layouts.ts` - Layout definitions
- [ ] `client/src/components/andara-page-renderer.tsx`

### Shared Files
- [ ] `shared/schema.ts` - Database schema

---

*Build Guide Version 1.0 - December 2025*
