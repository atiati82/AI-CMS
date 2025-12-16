# AI CMS System Documentation

Complete technical documentation for implementing an AI-powered Content Management System with BigMind AI Assistant, Motion Design Engine, and Magic Page Generator.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Dependencies & Installation](#dependencies--installation)
3. [Database Schema](#database-schema)
4. [Backend Services](#backend-services)
5. [BigMind Response Parser](#bigmind-response-parser)
6. [Andara Page Renderer](#andara-page-renderer)
7. [Page Templates](#page-templates)
8. [Frontend Components](#frontend-components)
9. [AI Integration](#ai-integration)
10. [Motion System](#motion-system)
11. [Layout Vocabulary](#layout-vocabulary)
12. [API Endpoints](#api-endpoints)
13. [Admin Panel Features](#admin-panel-features)
14. [Configuration](#configuration)
15. [Complete File Structure](#complete-file-structure)

---

## System Overview

The AI CMS is a full-stack content management system that uses AI to:
- Generate complete pages from text descriptions
- Apply visual styling and motion animations automatically
- Manage content with natural language commands
- Create SEO-optimized metadata and HTML content
- Detect and generate image prompts for page slots

### Core Features

| Feature | Description |
|---------|-------------|
| **BigMind CMS Manager** | AI chat interface with database function calling |
| **Magic Page Generator** | Converts briefs into fully designed pages |
| **Motion Layout Engine** | 10 motion archetypes with element linking |
| **Visual Interpreter** | Auto-detects layouts and applies styling |
| **Image Prompt Generator** | Creates image prompts based on content |
| **Content Clustering** | Organizes pages into thematic zones |

---

## Dependencies & Installation

### Required NPM Packages

```json
{
  "dependencies": {
    "@google/genai": "^1.0.0",
    "@tanstack/react-query": "^5.0.0",
    "drizzle-orm": "^0.30.0",
    "express": "^4.18.0",
    "express-session": "^1.17.0",
    "framer-motion": "^11.0.0",
    "pg": "^8.11.0",
    "react": "^18.2.0",
    "wouter": "^3.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "drizzle-kit": "^0.20.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

### Environment Variables

```bash
# Required
DATABASE_URL=postgresql://user:password@host:5432/database
SESSION_SECRET=your-session-secret

# AI Integration (Replit AI Integrations or direct API keys)
AI_INTEGRATIONS_OPENAI_API_KEY=your-openai-key
AI_INTEGRATIONS_OPENAI_BASE_URL=https://api.openai.com/v1
AI_INTEGRATIONS_GEMINI_API_KEY=your-gemini-key
AI_INTEGRATIONS_GEMINI_BASE_URL=https://generativelanguage.googleapis.com
```

---

## Database Schema

### Core Tables

```typescript
// shared/schema.ts
import { pgTable, text, varchar, timestamp, jsonb, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Pages Table
export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  path: text("path").notNull().unique(),
  clusterKey: text("cluster_key"),
  template: text("template").default("article"),
  status: text("status").default("draft"), // draft, published, archived
  priority: integer("priority").default(2),
  
  // Content
  content: text("content"), // Raw HTML content
  aiStartupHtml: text("ai_startup_html"), // AI-generated HTML
  
  // SEO
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords"),
  
  // Visual Configuration
  visualConfig: jsonb("visual_config").$type<VisualConfig>(),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Visual Config Type
export interface VisualConfig {
  vibeKeywords?: string[];
  emotionalTone?: string;
  colorPalette?: string;
  layoutsDetected?: string[];
  motionPreset?: string;
  entranceMotion?: string;
  hoverMotion?: string;
  ambientMotion?: string;
  elementMotions?: {
    hero?: string;
    content?: string;
    cards?: string;
    buttons?: string;
    background?: string;
    images?: string;
  };
}

// Clusters Table
export const clusters = pgTable("clusters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  zone: integer("zone").default(1), // 1, 2, or 3
  color: text("color"),
  visualVibe: jsonb("visual_vibe"),
  createdAt: timestamp("created_at").defaultNow(),
});

// BigMind Chat Sessions
export const bigmindSessions = pgTable("bigmind_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  mode: text("mode").default("cms"), // cms, library
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// BigMind Chat Messages
export const bigmindMessages = pgTable("bigmind_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull().references(() => bigmindSessions.id),
  role: text("role").notNull(), // user, assistant
  content: text("content").notNull(),
  functionCalls: jsonb("function_calls"),
  createdAt: timestamp("created_at").defaultNow(),
});

// CMS Settings
export const cmsSettings = pgTable("cms_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: jsonb("value"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Document Library
export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  sourceType: text("source_type"), // upload, paste, url
  rawText: text("raw_text"),
  wordCount: integer("word_count"),
  status: text("status").default("pending"), // pending, indexed
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Media Assets
export const mediaAssets = pgTable("media_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").references(() => pages.id),
  slotKey: text("slot_key"),
  slotType: text("slot_type"),
  imagePrompt: text("image_prompt"),
  imageUrl: text("image_url"),
  status: text("status").default("pending"), // pending, generating, ready
  createdAt: timestamp("created_at").defaultNow(),
});

// Export schemas
export const insertPageSchema = createInsertSchema(pages).omit({ id: true, createdAt: true, updatedAt: true });
export const insertClusterSchema = createInsertSchema(clusters).omit({ id: true, createdAt: true });
export type Page = typeof pages.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Cluster = typeof clusters.$inferSelect;
```

---

## Backend Services

### 1. AI Client Setup (`server/services/andara-chat.ts`)

```typescript
import { GoogleGenAI } from "@google/genai";

// Gemini client (native)
const geminiAi = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

// OpenAI-compatible client (via Replit AI Integrations)
const openaiAi = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  },
});

// Model routing
const MODEL_PROVIDERS: Record<string, 'openai' | 'gemini'> = {
  'gpt-4.1-mini': 'openai',
  'gpt-4.1': 'openai',
  'gpt-4o': 'openai',
  'gemini-2.5-flash': 'gemini',
  'gemini-2.5-pro': 'gemini',
};

const DEFAULT_MODEL = 'gpt-4.1-mini';

// Get AI client based on model
export async function getAiClient(modelOverride?: string): Promise<{ client: GoogleGenAI; model: string }> {
  const modelId = modelOverride || await getConfiguredModel();
  const provider = MODEL_PROVIDERS[modelId] || 'openai';
  const client = provider === 'openai' ? openaiAi : geminiAi;
  return { client, model: modelId };
}

async function getConfiguredModel(): Promise<string> {
  try {
    const setting = await storage.getCmsSetting("bigmind_ai_model");
    return setting?.value || DEFAULT_MODEL;
  } catch {
    return DEFAULT_MODEL;
  }
}

export { getAiClient, getConfiguredModel, MODEL_PROVIDERS, DEFAULT_MODEL };
```

### 2. BigMind CMS Manager (`server/services/bigmind-cms.ts`)

The BigMind CMS uses function calling to execute database operations:

```typescript
import { GoogleGenAI, Type } from "@google/genai";
import { storage } from "../storage";
import { getAiClient } from "./andara-chat";

// CMS Function Declarations for AI
const CMS_FUNCTION_DECLARATIONS = [
  {
    name: "listPages",
    description: "List all pages with optional filtering",
    parameters: {
      type: Type.OBJECT,
      properties: {
        cluster: { type: Type.STRING, description: "Filter by cluster key" },
        status: { type: Type.STRING, description: "Filter by status (draft/published)" },
        limit: { type: Type.NUMBER, description: "Max pages to return" },
      },
    },
  },
  {
    name: "createPage",
    description: "Create a new page in the CMS",
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Page title" },
        path: { type: Type.STRING, description: "URL path (e.g. /science/water)" },
        clusterKey: { type: Type.STRING, description: "Cluster to assign" },
        template: { type: Type.STRING, description: "Page template type" },
        content: { type: Type.STRING, description: "HTML content" },
        seoTitle: { type: Type.STRING, description: "SEO title (60 chars)" },
        seoDescription: { type: Type.STRING, description: "Meta description (155 chars)" },
        seoKeywords: { type: Type.STRING, description: "Comma-separated keywords" },
        visualConfig: { type: Type.OBJECT, description: "Visual/motion settings" },
      },
      required: ["title", "path"],
    },
  },
  {
    name: "updatePage",
    description: "Update an existing page",
    parameters: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: "Page ID" },
        title: { type: Type.STRING },
        content: { type: Type.STRING },
        status: { type: Type.STRING },
        visualConfig: { type: Type.OBJECT },
      },
      required: ["id"],
    },
  },
  {
    name: "deletePage",
    description: "Delete a page by ID",
    parameters: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: "Page ID to delete" },
      },
      required: ["id"],
    },
  },
  {
    name: "listClusters",
    description: "List all content clusters",
    parameters: { type: Type.OBJECT, properties: {} },
  },
  {
    name: "applyMotionPreset",
    description: "Apply motion archetype to page elements",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "Page ID" },
        preset: { type: Type.STRING, description: "Motion preset name" },
        elements: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Elements to apply to" },
      },
      required: ["pageId", "preset"],
    },
  },
  {
    name: "updateVisualConfig",
    description: "Update page visual configuration",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING },
        vibeKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        emotionalTone: { type: Type.STRING },
        colorPalette: { type: Type.STRING },
        motionPreset: { type: Type.STRING },
      },
      required: ["pageId"],
    },
  },
  {
    name: "searchDocuments",
    description: "Search document library for content",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING, description: "Search query" },
      },
      required: ["query"],
    },
  },
  {
    name: "getDocument",
    description: "Get full document content by ID",
    parameters: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: "Document ID" },
      },
      required: ["id"],
    },
  },
];

// Execute CMS functions
async function executeCmsFunction(name: string, args: Record<string, any>): Promise<any> {
  switch (name) {
    case "listPages":
      return storage.getAllPages(args);
    case "createPage":
      return storage.createPage(args);
    case "updatePage":
      const { id, ...updates } = args;
      return storage.updatePage(id, updates);
    case "deletePage":
      return storage.deletePage(args.id);
    case "listClusters":
      return storage.getAllClusters();
    case "applyMotionPreset":
      return applyMotionToPage(args.pageId, args.preset, args.elements);
    case "updateVisualConfig":
      const { pageId, ...config } = args;
      return storage.updatePage(pageId, { visualConfig: config });
    case "searchDocuments":
      return storage.searchDocuments(args.query);
    case "getDocument":
      return storage.getDocument(args.id);
    default:
      return { error: `Unknown function: ${name}` };
  }
}

// Main chat function with function calling
export async function chatWithFunctions(
  messages: Array<{ role: string; content: string }>,
  onFunctionCall?: (name: string, result: any) => void,
  modelOverride?: string
): Promise<{ response: string; functionCalls: Array<{ name: string; result: any }> }> {
  
  const { client, model } = await getAiClient(modelOverride);
  
  const contents = [
    { role: "user", parts: [{ text: `SYSTEM:\n${BIGMIND_SYSTEM_PROMPT}\n\nCONTEXT:\n${await getSummarizedContext()}` }] },
    { role: "model", parts: [{ text: "I'm BigMind, your AI CMS Manager. How can I help?" }] },
    ...messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }))
  ];

  const functionCalls: Array<{ name: string; result: any }> = [];
  let finalResponse = "";
  let iterations = 0;

  while (iterations < 5) {
    iterations++;
    
    const response = await client.models.generateContent({
      model,
      contents,
      config: {
        tools: [{ functionDeclarations: CMS_FUNCTION_DECLARATIONS as any }],
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) {
      finalResponse = "I couldn't process that request.";
      break;
    }

    let hasFunctionCall = false;
    for (const part of candidate.content.parts) {
      if (part.functionCall) {
        hasFunctionCall = true;
        const fnName = part.functionCall.name || "";
        const fnArgs = part.functionCall.args || {};
        
        const result = await executeCmsFunction(fnName, fnArgs as Record<string, any>);
        functionCalls.push({ name: fnName, result });
        
        if (onFunctionCall) onFunctionCall(fnName, result);

        contents.push({
          role: "model",
          parts: [{ functionCall: { name: fnName, args: fnArgs } }]
        });
        contents.push({
          role: "function",
          parts: [{ functionResponse: { name: fnName, response: { result: JSON.stringify(result) } } }]
        });
      }

      if (part.text) {
        finalResponse = part.text;
      }
    }

    if (!hasFunctionCall) break;
  }

  return { response: finalResponse, functionCalls };
}
```

### 3. BigMind System Prompt

```typescript
const BIGMIND_SYSTEM_PROMPT = `You are BigMind, an AI CMS Manager with full database access.

## Your Capabilities
- List, create, update, delete pages
- Manage clusters and content organization
- Apply motion presets and visual styling
- Search document library for research materials
- Generate zone-appropriate content

## Available Motion Archetypes
1. liquid-crystal-float - Soft floating movement
2. energetic-pulse - Rhythmic light pulsing
3. magnetic-drift - Elements attract/repel
4. krystal-bloom - Glow expansion
5. scalar-slide - Linear smooth acceleration
6. vortex-reveal - Spiral staggered motion
7. parallax-depth - Multi-layer scroll
8. ripple-emergence - Wave-like reveal
9. subtle-shimmer - Gentle ambient glow
10. layered-parallax-scroll - Deep 3D scroll effect

## Page Generation Format
When generating pages, output these blocks:

### Block 1: Page Metadata
\`\`\`page-metadata
TITLE: [Page Title]
SLUG: /path/to-page
CLUSTER: [cluster_key]
SEO_TITLE: [60 char title]
SEO_DESCRIPTION: [155 char description]
TEMPLATE: [landing_page|article|product]
\`\`\`

### Block 2: Visual Configuration
\`\`\`visual-config
VIBE_KEYWORDS: [ethereal, scientific, etc]
EMOTIONAL_TONE: [calm, innovative, etc]
COLOR_PALETTE: [color gradient]
MOTION_PRESET: [archetype name]
\`\`\`

### Block 3: HTML Content
\`\`\`andara-html
<div class="andara-page">
  <!-- Full HTML content here -->
</div>
\`\`\`

Always use semantic HTML with andara-* CSS classes.
`;
```

---

## BigMind Response Parser

The BigMind Parser extracts structured data from AI responses, including page metadata, visual configuration, HTML content, and image prompts.

### Parser Interface (`client/src/lib/bigmind-parser.ts`)

```typescript
export interface ParsedBigMindResponse {
  pageMetadata: {
    title?: string;
    h1Title?: string;
    path?: string;
    urlSlug?: string;
    cluster?: string;
    metaTitle?: string;
    metaDescription?: string;
    seoFocus?: string;
    seoKeywords?: string[];
    template?: string;
    priority?: string;
    summary?: string;
    zone?: number;
  };
  visualConfig: {
    vibeKeywords?: string[];
    emotionalTone?: string[];
    colorPalette?: string;
    layoutsDetected?: string[];
    motionPreset?: string;
    entranceMotion?: string;
    hoverMotion?: string;
    ambientMotion?: string;
  };
  htmlContent?: string;
  imagePrompts: Array<{
    id: string;
    slotKey: string;
    slotType: string;
    prompt: string;
    location: string;
  }>;
  motionLayoutJson?: object;
  atmosphere?: string;
}
```

### Main Parser Function

```typescript
export function parseBigMindResponse(rawContent: string): ParsedBigMindResponse {
  const content = cleanAIResponse(rawContent);
  
  const result: ParsedBigMindResponse = {
    pageMetadata: {},
    visualConfig: {},
    imagePrompts: [],
  };

  // 1. Extract page-metadata block
  const pageMetadataMatch = content.match(/```page-metadata\n([\s\S]*?)```/);
  if (pageMetadataMatch) {
    const metaText = pageMetadataMatch[1];
    
    const titleMatch = metaText.match(/^TITLE:\s*(.+)/im);
    if (titleMatch) result.pageMetadata.title = titleMatch[1].trim();
    
    const pathMatch = metaText.match(/PATH:\s*(.+)/i);
    if (pathMatch) {
      result.pageMetadata.path = pathMatch[1].trim();
      result.pageMetadata.urlSlug = pathMatch[1].trim().replace(/^\//, '');
    }
    
    const clusterMatch = metaText.match(/CLUSTER:\s*(.+)/i);
    if (clusterMatch) result.pageMetadata.cluster = clusterMatch[1].trim();
    
    const seoTitleMatch = metaText.match(/SEO_TITLE:\s*(.+)/i);
    if (seoTitleMatch) result.pageMetadata.metaTitle = seoTitleMatch[1].trim();
    
    const seoDescMatch = metaText.match(/SEO_DESCRIPTION:\s*(.+)/i);
    if (seoDescMatch) result.pageMetadata.metaDescription = seoDescMatch[1].trim();
    
    const templateMatch = metaText.match(/TEMPLATE:\s*(.+)/i);
    if (templateMatch) result.pageMetadata.template = templateMatch[1].trim();
  }

  // 2. Extract visual-config block
  const visualConfigMatch = content.match(/```visual-config\n([\s\S]*?)```/);
  if (visualConfigMatch) {
    const configText = visualConfigMatch[1];
    
    const vibeMatch = configText.match(/VIBE KEYWORDS:\s*\[?([^\]\n]+)\]?/i);
    if (vibeMatch) {
      result.visualConfig.vibeKeywords = vibeMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    }
    
    const toneMatch = configText.match(/EMOTIONAL TONE:\s*\[?([^\]\n]+)\]?/i);
    if (toneMatch) {
      result.visualConfig.emotionalTone = toneMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    }
    
    const colorMatch = configText.match(/COLOR PALETTE:\s*([^\n]+)/i);
    if (colorMatch) result.visualConfig.colorPalette = colorMatch[1].trim();
    
    const motionMatch = configText.match(/MOTION PRESET:\s*([^\n]+)/i);
    if (motionMatch) result.visualConfig.motionPreset = motionMatch[1].trim();
    
    const entranceMatch = configText.match(/ENTRANCE:\s*([^\n]+)/i);
    if (entranceMatch) result.visualConfig.entranceMotion = entranceMatch[1].trim();
  }

  // 3. Extract HTML content
  const htmlMatch = content.match(/```html\n([\s\S]*?)```/) ||
                    content.match(/```tsx\n([\s\S]*?)```/) ||
                    content.match(/```andara-html\n([\s\S]*?)```/);
  if (htmlMatch) {
    result.htmlContent = decodeHtmlEntities(htmlMatch[1].trim());
  }

  // 4. Extract image prompts from HTML comments
  if (result.htmlContent) {
    const aiPromptRegex = /<!--\s*AI LAYOUT PROMPT:\s*([^>]+)-->/gi;
    let match;
    let idx = 0;
    while ((match = aiPromptRegex.exec(result.htmlContent)) !== null) {
      idx++;
      result.imagePrompts.push({
        id: `img-${idx}-${Date.now()}`,
        slotKey: `slot-${idx}`,
        slotType: detectSlotType(match[1], idx),
        prompt: match[1].trim(),
        location: `Section ${idx}`,
      });
    }
  }

  // 5. Extract image-prompts block
  const imagePromptsMatch = content.match(/```image-prompts\n([\s\S]*?)```/);
  if (imagePromptsMatch) {
    const lines = imagePromptsMatch[1].split('\n');
    for (const line of lines) {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        const label = line.substring(0, colonIdx).trim();
        const prompt = line.substring(colonIdx + 1).trim();
        result.imagePrompts.push({
          id: `imgblock-${result.imagePrompts.length + 1}`,
          slotKey: label.toLowerCase().replace(/\s+/g, '-'),
          slotType: detectSlotTypeFromLabel(label),
          prompt,
          location: label,
        });
      }
    }
  }

  return result;
}

// Clean AI response - remove markdown wrappers and decode entities
function cleanAIResponse(content: string): string {
  let cleaned = content;
  cleaned = decodeHtmlEntities(cleaned);
  cleaned = cleaned.replace(/^```(?:html|tsx|jsx)?\n?/i, '').replace(/\n?```$/i, '');
  cleaned = cleaned.replace(/``<code[^>]*>\s*([a-z-]+)/gi, '```$1');
  cleaned = cleaned.replace(/<\/code>\s*<\/pre>\s*([a-z-]+)/gi, '```$1');
  return cleaned;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function detectSlotType(prompt: string, index: number): string {
  const lower = prompt.toLowerCase();
  if (lower.includes('hero') || index === 1) return 'hero_background';
  if (lower.includes('feature') || lower.includes('card')) return 'feature_card';
  if (lower.includes('icon')) return 'feature_icon';
  if (lower.includes('background')) return 'section_background';
  return 'gallery_image';
}

function detectSlotTypeFromLabel(label: string): string {
  const lower = label.toLowerCase();
  if (lower.includes('hero')) return 'hero_background';
  if (lower.includes('feature')) return 'feature_card';
  if (lower.includes('icon')) return 'feature_icon';
  if (lower.includes('background')) return 'section_background';
  return 'gallery_image';
}
```

---

## Andara Page Renderer

The Andara Page Renderer transforms static HTML content into animated, motion-enhanced pages.

### Component (`client/src/components/andara-page-renderer.tsx`)

```typescript
import { motion } from "framer-motion";
import { useRef } from "react";

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 },
  },
  viewport: { once: true, amount: 0.1 },
};

function decodeHtmlEntities(text: string): string {
  if (typeof document === 'undefined') return text;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

function parseHtmlIntoSections(html: string): { type: string; content: string; id?: string }[] {
  const decoded = html.includes('&lt;') ? decodeHtmlEntities(html) : html;
  const sections: { type: string; content: string; id?: string }[] = [];
  
  const sectionPattern = /<section([^>]*)>([\s\S]*?)<\/section>/gi;
  const mainPattern = /<main([^>]*)>([\s\S]*?)<\/main>/gi;
  const headerPattern = /<header([^>]*)>([\s\S]*?)<\/header>/gi;
  
  let mainMatch = mainPattern.exec(decoded);
  if (mainMatch) {
    const mainContent = mainMatch[2];
    
    const headerMatch = headerPattern.exec(mainContent);
    if (headerMatch) {
      sections.push({ type: 'header', content: headerMatch[0], id: 'hero' });
    }
    
    let sectionMatch;
    while ((sectionMatch = sectionPattern.exec(mainContent)) !== null) {
      const attrs = sectionMatch[1];
      const content = sectionMatch[0];
      const id = attrs.match(/id="([^"]+)"/)?.[1] || `section-${sections.length}`;
      const isHero = attrs.includes('hero') || content.includes('andara-hero');
      sections.push({ type: isHero ? 'hero' : 'section', content, id });
    }
  } else {
    let sectionMatch;
    while ((sectionMatch = sectionPattern.exec(decoded)) !== null) {
      const attrs = sectionMatch[1];
      const content = sectionMatch[0];
      const id = attrs.match(/id="([^"]+)"/)?.[1] || `section-${sections.length}`;
      sections.push({ type: 'section', content, id });
    }
  }
  
  if (sections.length === 0) {
    sections.push({ type: 'full', content: decoded, id: 'page' });
  }
  
  return sections;
}

function AnimatedSection({ section, index }: { section: { type: string; content: string; id?: string }; index: number }) {
  const isHero = section.type === 'hero' || section.type === 'header';
  const delay = isHero ? 0 : index * 0.1;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: isHero ? 20 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: isHero ? 0.3 : 0.15 }}
      transition={{ 
        duration: isHero ? 0.8 : 0.6, 
        delay,
        ease: [0.23, 0.82, 0.35, 1] 
      }}
      className="andara-animated-section"
      data-section-id={section.id}
      dangerouslySetInnerHTML={{ __html: section.content }}
    />
  );
}

interface AndaraPageRendererProps {
  content: string;
  className?: string;
}

export function AndaraPageRenderer({ content, className = '' }: AndaraPageRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  if (!content) {
    return null;
  }
  
  const sections = parseHtmlIntoSections(content);
  
  return (
    <motion.div 
      ref={containerRef}
      className={`andara-page-wrapper ${className}`}
      {...staggerContainer}
      data-testid="andara-page-animated"
    >
      {sections.map((section, index) => (
        <AnimatedSection 
          key={section.id || index} 
          section={section} 
          index={index} 
        />
      ))}
    </motion.div>
  );
}
```

---

## Page Templates

The system includes 18 specialized page templates for different content types.

### Template Definitions

```typescript
// shared/schema.ts
export const PAGE_TEMPLATES = [
  'landing_home',       // Homepage with hero, features, CTAs
  'shop_overview',      // Product catalog/shop page
  'product',            // Individual product page
  'product_bundles',    // Bundle/package product page
  'tool_calculator',    // Interactive tool (calculators, etc.)
  'guide',              // Step-by-step guide
  'b2b',                // Business-to-business landing
  'pillar_overview',    // Topic pillar/hub page
  'cluster_overview',   // Content cluster index
  'article',            // Standard article/blog post
  'longform_comparison',// Detailed comparison article
  'explain_like_school',// Educational explainer
  'about',              // About/company page
  'team',               // Team/people page
  'legal',              // Legal pages (privacy, terms)
  'blog_overview',      // Blog index/listing
  'blog_post',          // Individual blog post
  'faq',                // FAQ page with accordion
  'lab_data',           // Data/research presentation
] as const;

export const PAGE_TYPES = ['page', 'product', 'tool', 'article', 'blog_post'] as const;

export type PageTemplate = typeof PAGE_TEMPLATES[number];
export type PageType = typeof PAGE_TYPES[number];
```

### Template-to-Image-Slot Mapping

Each template has predefined image slots:

```typescript
const TEMPLATE_SLOT_DEFINITIONS: Record<string, DetectedSlot[]> = {
  landing_home: [
    { slotKey: 'hero-bg', slotType: 'hero_background', slotLabel: 'Hero Background', sortOrder: 0 },
    { slotKey: 'feature-1', slotType: 'feature_card', slotLabel: 'Feature Card 1', sortOrder: 1 },
    { slotKey: 'feature-2', slotType: 'feature_card', slotLabel: 'Feature Card 2', sortOrder: 2 },
    { slotKey: 'feature-3', slotType: 'feature_card', slotLabel: 'Feature Card 3', sortOrder: 3 },
  ],
  article: [
    { slotKey: 'hero-image', slotType: 'hero_image', slotLabel: 'Article Hero', sortOrder: 0 },
    { slotKey: 'inline-1', slotType: 'section_background', slotLabel: 'Inline Image 1', sortOrder: 1 },
  ],
  pillar_overview: [
    { slotKey: 'hero-bg', slotType: 'hero_background', slotLabel: 'Pillar Hero', sortOrder: 0 },
    { slotKey: 'cluster-1', slotType: 'feature_card', slotLabel: 'Topic Cluster 1', sortOrder: 1 },
  ],
  product: [
    { slotKey: 'product-hero', slotType: 'product_image', slotLabel: 'Product Image', sortOrder: 0 },
    { slotKey: 'product-gallery-1', slotType: 'gallery_image', slotLabel: 'Gallery 1', sortOrder: 1 },
  ],
};
```

---

## Motion System

### Motion Library (`client/src/lib/motion.ts`)

```typescript
import { Variants, Transition } from "framer-motion";

// Timing tokens
export const timing = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  ambient: 4,
} as const;

// Easing presets
export const easing = {
  smooth: [0.23, 0.82, 0.35, 1] as const,
  snappy: [0.25, 0.1, 0.25, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  easeOut: "easeOut" as const,
  easeIn: "easeIn" as const,
  easeInOut: "easeInOut" as const,
} as const;

// Viewport settings
export const viewport = {
  default: { once: true, amount: 0.25 as const },
  eager: { once: true, amount: 0.1 as const, margin: "-100px" },
  lazy: { once: true, amount: 0.4 as const },
  repeat: { once: false, amount: 0.25 as const },
} as const;

// Entrance animations
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const fadeDown = {
  initial: { opacity: 0, y: -24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.easeOut },
};

export const fadeLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const fadeRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: viewport.default,
  transition: { duration: timing.slower, ease: easing.smooth },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const slideInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.smooth },
};

// Stagger system
export const stagger = {
  container: {
    initial: {},
    whileInView: {},
    viewport: viewport.default,
    transition: { staggerChildren: 0.08 },
  },
  item: {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: timing.normal, ease: easing.easeOut },
  },
  itemFast: {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: timing.fast, ease: easing.easeOut },
  },
};

// Hover effects
export const hover = {
  lift: { y: -4, transition: { duration: timing.fast } },
  scale: { scale: 1.02, transition: { duration: timing.fast } },
  glow: { boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.3)" },
  tilt: { rotateX: -2, rotateY: 2 },
};

// Ambient animations
export const ambient = {
  pulse: {
    animate: { opacity: [1, 0.7, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
  float: {
    animate: { y: [0, -8, 0] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
  shimmer: {
    animate: { opacity: [0.5, 1, 0.5] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  breathe: {
    animate: { scale: [1, 1.02, 1] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

// Overlay/modal animations
export const overlay = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: timing.normal },
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: timing.normal, ease: easing.easeOut },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: timing.normal, ease: easing.easeOut },
  },
};

// Motion archetypes
export const MOTION_ARCHETYPES = [
  {
    key: 'liquid-crystal-float',
    name: 'Liquid-Crystal Float',
    description: 'Soft floating movement like water in zero-gravity',
    entrance: fadeUp,
    hover: hover.lift,
    ambient: ambient.float,
  },
  {
    key: 'energetic-pulse',
    name: 'Energetic Pulse',
    description: 'Bioelectric rhythmic light pulsing',
    entrance: scaleUp,
    hover: hover.glow,
    ambient: ambient.pulse,
  },
  {
    key: 'magnetic-drift',
    name: 'Magnetic Drift',
    description: 'Elements attract/repel from cursor',
    entrance: fadeIn,
    hover: { x: 4, y: -2 },
    ambient: ambient.breathe,
  },
  {
    key: 'krystal-bloom',
    name: 'Krystal Bloom',
    description: 'Glow expansion + scale bloom',
    entrance: scaleUp,
    hover: hover.scale,
    ambient: ambient.shimmer,
  },
  {
    key: 'scalar-slide',
    name: 'Scalar Slide',
    description: 'Linear smooth acceleration',
    entrance: slideInLeft,
    hover: hover.lift,
    ambient: null,
  },
  {
    key: 'vortex-reveal',
    name: 'Vortex Reveal',
    description: 'Spiral staggered emergence',
    entrance: stagger.container,
    item: stagger.item,
    hover: hover.scale,
  },
  {
    key: 'parallax-depth',
    name: 'Parallax Depth',
    description: 'Multi-layer scroll depth',
    entrance: fadeUp,
    hover: hover.tilt,
    ambient: null,
  },
  {
    key: 'ripple-emergence',
    name: 'Ripple Emergence',
    description: 'Wave-like sequential reveal',
    entrance: fadeUp,
    hover: hover.lift,
    ambient: ambient.pulse,
  },
  {
    key: 'subtle-shimmer',
    name: 'Subtle Shimmer',
    description: 'Gentle ambient background glow',
    entrance: fadeIn,
    hover: null,
    ambient: ambient.shimmer,
  },
  {
    key: 'layered-parallax-scroll',
    name: 'Layered Parallax Scroll',
    description: 'Deep 3D multi-speed scroll',
    entrance: fadeUp,
    hover: hover.lift,
    ambient: null,
  },
];

// Get motion by key
export function getMotionByKey(key: string) {
  return MOTION_ARCHETYPES.find(m => m.key === key);
}

// Reduced motion hook
export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
```

---

## Layout Vocabulary

### Layout Definitions (`client/src/lib/layouts.ts`)

```typescript
export type LayoutCategory = 
  | "hero" | "features" | "process" | "social-proof" 
  | "pricing" | "faq" | "metrics" | "content" 
  | "media" | "interactive" | "lists" | "scroll" | "cta" | "footer";

export interface LayoutDefinition {
  id: string;
  name: string;
  description: string;
  category: LayoutCategory;
  keywords: string[];
  signals: string[];
  motion: {
    container?: object;
    item?: object;
    entrance?: object;
    hover?: object;
  };
  visualEnhancements?: string[];
}

export const layouts: LayoutDefinition[] = [
  // HERO LAYOUTS
  {
    id: "hero_split",
    name: "Hero Split Layout",
    description: "Two-column: headline left, image right",
    category: "hero",
    keywords: ["hero", "two-column", "headline", "image-right"],
    signals: ["h1", "cta-button", "large-image", "grid-2-col"],
    motion: { container: stagger.container, item: stagger.item },
    visualEnhancements: ["gradient-text", "glow effect on CTA"],
  },
  {
    id: "hero_centered",
    name: "Hero Centered Layout",
    description: "Full-width centered headline + CTA",
    category: "hero",
    keywords: ["hero", "centered", "full-width", "single-cta"],
    signals: ["h1", "text-center", "cta-button"],
    motion: { entrance: fadeUp },
    visualEnhancements: ["animated gradient background", "particle effects"],
  },
  {
    id: "hero_media_bg",
    name: "Hero Media Background",
    description: "Background image/video with overlay text",
    category: "hero",
    keywords: ["hero", "background-image", "overlay-text", "video-bg"],
    signals: ["background-image", "overlay", "h1"],
    motion: { entrance: fadeUp },
  },
  
  // FEATURE LAYOUTS
  {
    id: "feature_columns",
    name: "Feature Columns",
    description: "3-4 column icon/feature grid",
    category: "features",
    keywords: ["features", "columns", "icons", "grid-3-col", "grid-4-col"],
    signals: ["grid", "icon", "h3", "short-text"],
    motion: { container: stagger.container, item: stagger.item },
  },
  {
    id: "benefit_grid",
    name: "Benefit Card Grid",
    description: "Card-based benefit display (2-4 per row)",
    category: "features",
    keywords: ["benefits", "cards", "grid", "features"],
    signals: ["card", "grid", "icon", "headline"],
    motion: { container: stagger.container, item: stagger.item, hover: hover.lift },
  },
  
  // PROCESS LAYOUTS
  {
    id: "step_process",
    name: "Step Process",
    description: "Numbered steps (1-3-5)",
    category: "process",
    keywords: ["steps", "process", "numbered", "how-to"],
    signals: ["number", "step", "arrow", "sequential"],
    motion: { container: stagger.container, item: stagger.item },
  },
  {
    id: "timeline_vertical",
    name: "Vertical Timeline",
    description: "Vertical timeline with connectors",
    category: "process",
    keywords: ["timeline", "vertical", "history", "milestones"],
    signals: ["timeline", "connector", "date", "vertical-list"],
    motion: { entrance: fadeUp },
  },
  
  // SOCIAL PROOF
  {
    id: "testimonial_grid",
    name: "Testimonial Grid",
    description: "Multi-column testimonial cards",
    category: "social-proof",
    keywords: ["testimonials", "reviews", "quotes", "grid"],
    signals: ["quote", "avatar", "name", "card"],
    motion: { container: stagger.container, item: stagger.item },
  },
  
  // FAQ
  {
    id: "faq_accordion",
    name: "FAQ Accordion",
    description: "Expandable Q&A list",
    category: "faq",
    keywords: ["faq", "accordion", "questions", "expandable"],
    signals: ["accordion", "question", "answer", "toggle"],
    motion: { entrance: fadeUp },
  },
  
  // METRICS
  {
    id: "stats_highlight",
    name: "Stats Highlight",
    description: "Large KPI numbers",
    category: "metrics",
    keywords: ["stats", "numbers", "metrics", "kpi", "highlights"],
    signals: ["large-number", "label", "grid"],
    motion: { entrance: scaleUp },
  },
  
  // CONTENT
  {
    id: "article_longform",
    name: "Article Longform",
    description: "Single column article",
    category: "content",
    keywords: ["article", "longform", "text", "prose", "blog"],
    signals: ["prose", "paragraphs", "headings", "single-column"],
    motion: { entrance: fadeUp },
  },
  
  // CTA
  {
    id: "cta_section",
    name: "CTA Section",
    description: "Large CTA block",
    category: "cta",
    keywords: ["cta", "call-to-action", "conversion", "signup"],
    signals: ["cta-button", "headline", "subhead", "centered"],
    motion: { entrance: scaleUp },
  },
];

// Match layout by keywords
export function matchLayoutByKeywords(keywords: string[]): LayoutDefinition | null {
  let bestMatch: LayoutDefinition | null = null;
  let bestScore = 0;
  
  for (const layout of layouts) {
    const score = keywords.filter(k => 
      layout.keywords.includes(k.toLowerCase())
    ).length;
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = layout;
    }
  }
  
  return bestMatch;
}

// Get layout by ID
export function getLayoutById(id: string): LayoutDefinition | undefined {
  return layouts.find(l => l.id === id);
}
```

---

## API Endpoints

### Routes (`server/routes.ts`)

```typescript
import { Express } from "express";
import { storage } from "./storage";

export async function registerRoutes(app: Express) {
  
  // ========== PAGES ==========
  
  app.get("/api/pages", async (req, res) => {
    const pages = await storage.getAllPages();
    res.json(pages);
  });
  
  app.get("/api/pages/:id", async (req, res) => {
    const page = await storage.getPage(req.params.id);
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json(page);
  });
  
  app.post("/api/pages", requireAdmin, async (req, res) => {
    const page = await storage.createPage(req.body);
    res.json(page);
  });
  
  app.put("/api/pages/:id", requireAdmin, async (req, res) => {
    const page = await storage.updatePage(req.params.id, req.body);
    res.json(page);
  });
  
  app.delete("/api/pages/:id", requireAdmin, async (req, res) => {
    await storage.deletePage(req.params.id);
    res.json({ success: true });
  });
  
  // ========== CLUSTERS ==========
  
  app.get("/api/clusters", async (req, res) => {
    const clusters = await storage.getAllClusters();
    res.json(clusters);
  });
  
  // ========== BIGMIND CHAT ==========
  
  app.post("/api/admin/bigmind/chat", requireAdmin, async (req, res) => {
    try {
      const { chatWithFunctions } = await import("./services/bigmind-cms");
      const { messages, model } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array required" });
      }
      
      const result = await chatWithFunctions(messages, undefined, model);
      res.json(result);
    } catch (error) {
      console.error("BigMind error:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });
  
  // ========== CHAT SESSIONS ==========
  
  app.get("/api/admin/bigmind/sessions", requireAdmin, async (req, res) => {
    const sessions = await storage.getAllBigmindSessions();
    res.json(sessions);
  });
  
  app.post("/api/admin/bigmind/sessions", requireAdmin, async (req, res) => {
    const session = await storage.createBigmindSession(req.body);
    res.json(session);
  });
  
  app.post("/api/admin/bigmind/sessions/:id/messages", requireAdmin, async (req, res) => {
    const message = await storage.createBigmindMessage({
      sessionId: req.params.id,
      ...req.body
    });
    res.json(message);
  });
  
  // ========== DOCUMENTS ==========
  
  app.get("/api/documents", async (req, res) => {
    const documents = await storage.getAllDocuments();
    res.json(documents);
  });
  
  app.post("/api/documents", requireAdmin, async (req, res) => {
    const document = await storage.createDocument(req.body);
    res.json(document);
  });
  
  // ========== CMS SETTINGS ==========
  
  app.get("/api/admin/settings/:key", requireAdmin, async (req, res) => {
    const setting = await storage.getCmsSetting(req.params.key);
    res.json(setting);
  });
  
  app.put("/api/admin/settings/:key", requireAdmin, async (req, res) => {
    const setting = await storage.setCmsSetting(req.params.key, req.body.value);
    res.json(setting);
  });
  
  // ========== IMAGE GENERATION ==========
  
  app.post("/api/admin/generate-image", requireAdmin, async (req, res) => {
    const { prompt, aspectRatio = "16:9" } = req.body;
    
    // Use your preferred image generation service
    // Example with placeholder response:
    res.json({ 
      success: true, 
      imageUrl: `/generated/${Date.now()}.png`,
      prompt 
    });
  });
}

// Auth middleware
function requireAdmin(req: any, res: any, next: any) {
  if (!req.session?.adminUserId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
```

---

## Frontend Components

### AI Chat Panel Hook

```typescript
// client/src/hooks/use-ai-chat.ts
import { useState, useCallback } from "react";

export type AIModel = 'gpt-4.1-mini' | 'gpt-4.1' | 'gemini-2.5-flash' | 'gemini-2.5-pro';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  functionCalls?: Array<{ name: string; result: any }>;
}

export function useAIChat(endpoint: string = '/api/admin/bigmind/chat') {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel>('gpt-4.1-mini');

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ messages: newMessages, model: selectedModel }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        functionCalls: data.functionCalls,
      };
      setMessages([...newMessages, assistantMessage]);
      return data;
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, selectedModel, endpoint]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    selectedModel,
    setSelectedModel,
    sendMessage,
    clearChat,
  };
}
```

### AI Model Selector

```tsx
// Model selector dropdown
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const AI_MODELS = [
  { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini' },
  { value: 'gpt-4.1', label: 'GPT-4.1' },
  { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
];

function ModelSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {AI_MODELS.map(model => (
          <SelectItem key={model.value} value={model.value}>
            {model.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

---

## Configuration

### AI Model Settings

Store the default AI model in CMS settings:

```typescript
// Get/set default model
const setting = await storage.getCmsSetting("bigmind_ai_model");
await storage.setCmsSetting("bigmind_ai_model", "gpt-4.1-mini");
```

### Cluster Ontology

Define your content clusters:

```typescript
const CLUSTER_ONTOLOGY = [
  { key: "home", name: "Home", zone: 1, color: "slate" },
  { key: "shop", name: "Shop & Products", zone: 1, color: "emerald" },
  { key: "science", name: "Science Library", zone: 2, color: "indigo" },
  { key: "about", name: "About & Story", zone: 3, color: "gold" },
  { key: "blog", name: "Blog", zone: 3, color: "slate" },
];
```

### Zone System

Pages are organized into zones with different content rules:

| Zone | Purpose | Rules |
|------|---------|-------|
| Zone 1 | Product/Commercial | Factual, no health claims |
| Zone 2 | Education/Science | Research-backed, "may support" language |
| Zone 3 | Brand/Story | Emotional, vision-focused |

---

## Quick Start Checklist

1. **Install dependencies**: `npm install` with packages listed above
2. **Set up database**: Create PostgreSQL tables from schema
3. **Configure env vars**: DATABASE_URL, SESSION_SECRET, AI keys
4. **Create storage layer**: Implement CRUD operations for all tables
5. **Register routes**: Add API endpoints to Express app
6. **Add AI services**: Create bigmind-cms.ts and andara-chat.ts
7. **Build frontend**: Create chat panel with model selector
8. **Add motion library**: Copy motion.ts and layouts.ts

---

## Admin Panel Features

### CMS Dashboard
The admin panel includes a comprehensive dashboard with:
- **Page Tree View**: Hierarchical display of all pages organized by cluster
- **Draft/Published Status**: Visual indicators for content status
- **Quick Actions**: Edit, preview, publish, delete buttons
- **Statistics**: Page count, published count, draft count

### BigMind Chat Panel
Two operational modes:
1. **CMS Mode**: Directly manipulates database using function calling
   - Create, update, delete pages
   - Apply motion presets
   - Manage clusters
2. **Library Mode**: Provides strategic advice from science library documents

### Page Editor Modal
Comprehensive page editing interface with:
- **Basic Info Tab**: Title, slug, cluster, template selection
- **SEO Tab**: Meta title, description, keywords, focus keyword
- **Content Tab**: Rich text editor or HTML input
- **Visual Config Tab**: 
  - Motion preset selector (10 archetypes)
  - Vibe keywords input
  - Color palette selector
  - Element motion linking grid
- **Preview Tab**: Live preview with motion animations

### Motion Layout Link Manager
Visual grid for linking motion archetypes to page elements:
- **6 Element Slots**: Hero, Content Sections, Cards, Buttons, Background, Images
- **Auto-Link Button**: Apply defaults to all elements
- **Clear All Button**: Remove all motion links
- **Visual Feedback**: Shows linked status per element

### Suggested Images Panel
In BigMind chat responses with image prompts:
- **Images Button**: Shows count of suggested prompts
- **Expandable Panel**: Lists all suggested images
- **Editable Prompts**: Modify before generating
- **Generate Button**: Creates AI images via `/api/admin/generate-image`
- **Inline Preview**: Shows generated images with success indicators

### Media Library
Image asset management:
- **Upload Images**: Drag-and-drop or file browser
- **Generate Images**: AI image generation from prompts
- **Link to Pages**: Assign images as featured images
- **Delete/Regenerate**: Manage existing assets

---

## Complete File Structure

```
project/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── andara-page-renderer.tsx    # Animated HTML renderer
│   │   │   ├── ai-chat-panel.tsx           # BigMind chat interface
│   │   │   ├── page-editor-modal.tsx       # Page editing modal
│   │   │   ├── motion-link-manager.tsx     # Motion-element linking grid
│   │   │   ├── suggested-images-panel.tsx  # AI image prompt viewer
│   │   │   └── page-content-preview.tsx    # Live page preview
│   │   ├── hooks/
│   │   │   ├── use-ai-chat.ts              # Chat state management
│   │   │   └── use-pages.ts                # Page CRUD operations
│   │   ├── lib/
│   │   │   ├── motion.ts                   # 10 motion archetypes
│   │   │   ├── layouts.ts                  # 37+ layout definitions
│   │   │   ├── bigmind-parser.ts           # AI response parser
│   │   │   └── queryClient.ts              # React Query setup
│   │   ├── pages/
│   │   │   ├── admin.tsx                   # Admin dashboard
│   │   │   ├── page-view.tsx               # Public page view
│   │   │   └── home.tsx                    # Homepage
│   │   └── styles/
│   │       └── andara.css                  # Andara styling system
│   └── index.html
├── server/
│   ├── services/
│   │   ├── andara-chat.ts                  # Library mode AI
│   │   ├── bigmind-cms.ts                  # CMS mode with function calling
│   │   ├── prompt-synthesizer.ts           # AI prompt generator
│   │   ├── image-slot-detector.ts          # Template slot detection
│   │   └── stripeClient.ts                 # Stripe integration
│   ├── storage.ts                          # Database abstraction layer
│   ├── routes.ts                           # API endpoints
│   ├── db.ts                               # Database connection
│   └── index.ts                            # Express server entry
├── shared/
│   └── schema.ts                           # Drizzle ORM schema
├── attached_assets/
│   └── generated_images/                   # AI-generated images
├── AI_CMS_DOCUMENTATION.md                 # This documentation
├── replit.md                               # Project configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
└── drizzle.config.ts
```

---

## Key Implementation Notes

### AI Model Selection
The system supports multiple AI models with runtime selection:
- **gpt-4.1-mini**: Default for code generation (fast, cost-effective)
- **gpt-4.1**: Higher quality for complex pages
- **gemini-2.5-flash**: Google's fast model
- **gemini-2.5-pro**: Google's premium model

Model selection is passed from frontend → backend → AI client:
```typescript
// Frontend sends model in request body
body: JSON.stringify({ messages, model: selectedModel })

// Backend extracts and passes to AI client
const { model } = req.body;
const result = await chatWithFunctions(messages, callback, model);

// AI client uses model override
export async function chatWithFunctions(
  messages: Array<{ role: string; content: string }>,
  onFunctionCall?: (name: string, result: any) => void,
  modelOverride?: string  // Takes precedence over configured model
)
```

### Motion Grammar Integration
AI interprets natural language motion descriptions:
- "Liquid flow" → `liquid-crystal-float` archetype
- "Energetic" → `energetic-pulse` archetype
- "Parallax depth" → `layered-parallax-scroll` archetype

### Content Zones
Pages are organized into semantic zones:
| Zone | Purpose | Tone Guidelines |
|------|---------|-----------------|
| Zone 1 | Product/Commercial | Factual, no health claims |
| Zone 2 | Education/Science | Research-backed, "may support" |
| Zone 3 | Brand/Story | Emotional, vision-focused |

### Andara CSS Class System
Standard classes for AI-generated HTML:
- `.andara-hero` - Hero sections
- `.andara-section` - Content sections  
- `.andara-card` - Feature cards
- `.andara-grid` - Grid layouts
- `.andara-text-gradient` - Gradient text effects
- `.andara-glow` - Glow effects
- `.andara-glass` - Glass morphism panels

---

## Quick Start Checklist

1. **Install dependencies**: `npm install` with packages listed above
2. **Set up database**: Create PostgreSQL tables from schema
3. **Configure env vars**: DATABASE_URL, SESSION_SECRET, AI keys
4. **Create storage layer**: Implement CRUD operations for all tables
5. **Register routes**: Add API endpoints to Express app
6. **Add AI services**: Create bigmind-cms.ts and andara-chat.ts
7. **Build frontend**: Create chat panel with model selector
8. **Add motion library**: Copy motion.ts and layouts.ts
9. **Add parser**: Implement bigmind-parser.ts for response handling
10. **Add renderer**: Implement andara-page-renderer.tsx for animations

---

This documentation covers all core AI CMS functionality. Copy these files and adapt the prompts, clusters, and styling to your specific project.
