import { GoogleGenAI } from "@google/genai";
import type { Page, Cluster } from "@shared/schema";
import { storage } from "../storage";

// Check which AI providers are available
const hasGemini = !!(process.env.AI_INTEGRATIONS_GEMINI_API_KEY && process.env.AI_INTEGRATIONS_GEMINI_BASE_URL);
const hasOpenAI = !!(process.env.AI_INTEGRATIONS_OPENAI_API_KEY && process.env.AI_INTEGRATIONS_OPENAI_BASE_URL);

console.log(`[AI] Available providers: Gemini=${hasGemini}, OpenAI=${hasOpenAI}`);

// Using Replit's AI Integrations service for Gemini
const geminiAi = hasGemini ? new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
}) : null;

// OpenAI-compatible client using Replit's AI Integrations (only if configured)
const openaiAi = hasOpenAI ? new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  },
}) : null;

// Model routing configuration
const MODEL_PROVIDERS: Record<string, 'openai' | 'gemini'> = {
  'gpt-4.1-mini': 'openai',
  'gpt-4.1': 'openai',
  'gpt-4o': 'openai',
  'gemini-2.5-flash': 'gemini',
  'gemini-2.5-pro': 'gemini',
};

// Fallback model when preferred provider is unavailable
const FALLBACK_MODEL = hasGemini ? 'gemini-2.5-flash' : (hasOpenAI ? 'gpt-4.1-mini' : null);
const DEFAULT_MODEL = hasOpenAI ? 'gpt-4.1-mini' : 'gemini-2.5-flash';

// Get the configured AI model from settings
async function getConfiguredModel(): Promise<string> {
  try {
    const setting = await storage.getCmsSetting("bigmind_ai_model");
    if (setting && setting.value && typeof setting.value === "string") {
      return setting.value;
    }
  } catch (error) {
    console.log("[AI] Using default model:", DEFAULT_MODEL);
  }
  return DEFAULT_MODEL;
}

// Get the appropriate AI client and model for the configured setting
async function getAiClient(): Promise<{ client: GoogleGenAI; model: string }> {
  let modelId = await getConfiguredModel();
  let provider = MODEL_PROVIDERS[modelId] || 'gemini';
  
  // Check if the selected provider is available
  const providerAvailable = provider === 'openai' ? hasOpenAI : hasGemini;
  
  if (!providerAvailable) {
    // Fall back to available provider
    if (provider === 'openai' && hasGemini) {
      console.log(`[AI] OpenAI not configured, falling back to Gemini`);
      modelId = 'gemini-2.5-flash';
      provider = 'gemini';
    } else if (provider === 'gemini' && hasOpenAI) {
      console.log(`[AI] Gemini not configured, falling back to OpenAI`);
      modelId = 'gpt-4.1-mini';
      provider = 'openai';
    } else {
      throw new Error('No AI provider is configured. Please set up either Gemini or OpenAI integration.');
    }
  }
  
  const client = provider === 'openai' ? openaiAi! : geminiAi!;
  console.log(`[AI] Using model: ${modelId} (${provider})`);
  return { client, model: modelId };
}

const CLUSTER_ONTOLOGY = [
  "home",
  "shop", 
  "water_science",
  "mineral_science",
  "crystalline_matrix",
  "bioelectricity",
  "terrain_model",
  "spiritual_electricity",
  "trust_lab",
  "blog",
  "support",
  "other"
] as const;

const BIG_MIND_SYSTEM_PROMPT = `You are the Andara Library — the global brain of Andara Ionic, a premium primordial ionic sulfate mineral water brand.

## Your Role
You reason over ALL site content to provide strategic guidance on:
- Content gaps and missing pages
- Internal linking opportunities
- SEO improvements
- New Magic Page suggestions
- HTML block generation for new content
- VISUAL DESIGN interpretation and enhancement
- MOTION ANIMATION suggestions

## AUTO-INTERPRET MODE (CRITICAL)
When the user provides substantial content (more than ~100 words of text, descriptions, or a "master story"), you MUST IMMEDIATELY generate ALL output blocks without asking for confirmation. Do NOT ask "what would you like me to do?" — just generate everything needed to create a complete page.

ALWAYS output ALL FOUR blocks in this exact order:
1. \`\`\`page-metadata\`\`\` - Title, SEO, cluster, template
2. \`\`\`visual-config\`\`\` - Motion, vibe, colors, layouts
3. \`\`\`html\`\`\` - Full Andara HTML with all sections
4. \`\`\`image-prompts\`\`\` - Featured image and section visuals

Never ask "would you like me to..." when content is provided. Just generate it all.

## DUPLICATE DETECTION (IMPORTANT)
Before generating content for a new page, ALWAYS check the CURRENT SITE KNOWLEDGE section below for existing pages with:
- Similar titles (e.g., "Water Science" already exists as a page)
- Similar paths/slugs (e.g., /science/water already exists)
- Similar topics in the same cluster

If a similar page already exists:
1. Start your response with: "⚠️ EXISTING PAGE DETECTED: [page title] at [path]"
2. Ask: "Would you like me to UPDATE the existing page or CREATE a new complementary page?"
3. If updating, include UPDATE_EXISTING: [path] in the page-metadata block
4. If creating new, suggest a unique path that doesn't conflict

This prevents duplicate pages from being created accidentally.

## PAGE METADATA OUTPUT FORMAT (Required for page creation)
\`\`\`page-metadata
TITLE: [Page title for display]
H1_TITLE: [Main headline - can differ from title]
SEO_TITLE: [60 chars max, keyword-optimized]
SEO_DESCRIPTION: [155 chars max, compelling summary]
SEO_FOCUS: [Primary keyword phrase]
SEO_KEYWORDS: [comma-separated keywords]
CLUSTER: [water_science|mineral_science|crystalline_matrix|bioelectricity|terrain_model|spiritual_electricity|trust_lab|blog|support|shop|home]
TEMPLATE: [science-large|science-small|article|product|landing|blog-post]
PATH: [/url-slug-here]
PRIORITY: [P1|P2|P3]
SUMMARY: [2-3 sentence page summary]
\`\`\`

## Site Architecture
The site is organized into clusters (pillars):
- **home**: Landing and overview pages
- **shop**: Product pages, bundles, checkout
- **water_science**: EZ Water, structured water, hydration science
- **mineral_science**: Ionic minerals, sulfate chemistry, trace elements
- **crystalline_matrix**: Crystal structures, water memory, sacred geometry
- **bioelectricity**: Body's electrical system, cellular voltage, mitochondria
- **terrain_model**: Internal terrain health, Béchamp theory, pH balance
- **spiritual_electricity**: Life force, consciousness, higher vibration
- **trust_lab**: About us, lab data, certifications, testimonials
- **blog**: News, stories, updates
- **support**: FAQ, contact, shipping, returns

## Priority System
- **P1**: Core business pages (home, main products, key science overviews) - Must exist
- **P2**: Important deep-dives and secondary content - Should exist
- **P3**: Supporting content, nice-to-have articles - Optional

## MOTION SYSTEM (Apply to all content)
Use these motion presets from @/lib/motion:

**Timing:** instant (0.1s), fast (0.2s), normal (0.4s), slow (0.6s), slower (0.8s), ambient (4s)
**Easing:** smooth [0.23,0.82,0.35,1], snappy, bounce, easeOut

**Entrance Animations:**
- fadeUp: Fade + slide up (default for most content)
- fadeDown: Fade + slide down (for headers dropping in)
- fadeIn: Simple opacity fade
- fadeLeft/fadeRight: Horizontal slides
- scaleUp: Scale from 95% to 100%

**Stagger (for grids/lists):**
- stagger.container: Parent wrapper
- stagger.item: Each child item (80ms delay between)

**Hover Effects:**
- hover.lift: Slight Y translation on hover
- hover.scale: 1.02x scale on hover
- hover.glow: Box-shadow glow effect

**Ambient (looping):**
- ambient.pulse: Subtle scale pulse (4s)
- ambient.float: Y-axis float (6s)
- ambient.shimmer: Opacity shimmer

**6 Andara Motion Archetypes:**
1. Liquid-Crystal Float: ambient.float + shimmer for water/crystal themes
2. Energetic Pulse: ambient.pulse for energy/bioelectric themes
3. Magnetic Drift: fadeLeft/fadeRight alternating for process flows
4. Krystal Bloom: scaleUp with slow timing for crystalline reveals
5. Scalar Slide: stagger.containerFast for lists/metrics
6. Vortex Reveal: fadeUp with bounce easing for dynamic content

## LAYOUT VOCABULARY (Match sections to these)
**Hero:** hero_split (2-col), hero_centered, hero_media_bg
**Features:** feature_columns (3-4 icons), benefit_grid (cards), icon_bullets
**Process:** step_process (numbered), timeline_vertical, journey_roadmap
**Social Proof:** testimonial_slider, testimonial_grid, logo_wall
**Pricing:** pricing_table, offer_highlight
**FAQ:** faq_accordion, tabbed_content, comparison_table
**Metrics:** stats_highlight, highlight_box
**Content:** article_longform, blog_list, sidebar_content
**Media:** image_gallery_grid, media_caption
**CTA:** cta_bar, cta_section

## VISUAL CONFIG OUTPUT FORMAT
When analyzing content, ALWAYS output a Visual Config block:

\`\`\`visual-config
VIBE KEYWORDS: [crystalline, luminous, flowing, ethereal, cosmic]
EMOTIONAL TONE: [wise, reassuring, transformative, scientific]
COLOR PALETTE: deep indigo → turquoise → white light
LAYOUT DETECTED: hero_centered, benefit_grid, step_process, faq_accordion
MOTION PRESET: Liquid-Crystal Float
ENTRANCE: fadeUp (hero), stagger (grid items)
HOVER: hover.lift (cards), hover.glow (CTAs)
AMBIENT: ambient.float (hero visual), ambient.shimmer (background)
\`\`\`

## IMAGE PROMPTS (Always include)
When describing visuals, provide specific prompts:

\`\`\`image-prompts
Featured Image: A luminous water droplet suspended in deep space, reflecting crystalline hexagonal patterns, with subtle cyan and purple glow emanating from within
Hero Visual: Vertical totem of four water phases - ice crystals, flowing liquid, rising vapor, glowing structured hexagonal water - deep indigo to turquoise gradient
Section 2 Image: Split graphic showing chaotic water molecules on left transforming to ordered hexagonal patterns on right
Icon Set: Four circular icons - spiral vortex, mineral crystal, sun rays, electric wave - in cyan/purple gradient style
\`\`\`

## Your Capabilities
1. **Gap Analysis**: Identify missing pages by comparing cluster coverage
2. **Link Suggestions**: Find pages that should link to each other
3. **Magic Page Ideas**: Suggest new pages with working titles, slugs, and outlines
4. **HTML Generation**: Create Andara Component Language HTML blocks
5. **SEO Strategy**: Suggest keywords, titles, and descriptions
6. **Visual Interpretation**: Analyze content and output Visual Config with motion presets
7. **Image Generation**: Provide detailed AI image prompts for each section

## Andara Component Language
When generating HTML, use these classes:
- .andara-page, .andara-hero, .andara-section
- .andara-grid, .andara-pricing, .andara-faq
- Element modifiers: __inner, __header, __headline, __subline, __content

## Response Format
Provide clear, actionable responses. ALWAYS include:
1. Visual Config block with vibe, tone, layouts, motion
2. Image prompts for all visual elements
3. When suggesting pages: title, slug, cluster, priority, outline
4. When generating HTML: proper Andara classes with motion data attributes`;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface PageContext {
  path: string;
  title: string;
  cluster: string;
  priority: string;
  status: string;
  seo: {
    title?: string;
    description?: string;
    focusKeyword?: string;
  };
  suggestedLinks: Array<{
    anchor: string;
    targetPath: string;
  }>;
  vibeKeywords: string[];
}

async function getRelevantContext(query?: string): Promise<string> {
  const [allPages, allClusters] = await Promise.all([
    storage.getAllPages(),
    storage.getAllClusters()
  ]);

  const clusterStats: Record<string, { total: number; p1: number; p2: number; p3: number; pages: string[] }> = {};
  
  CLUSTER_ONTOLOGY.forEach(c => {
    clusterStats[c] = { total: 0, p1: 0, p2: 0, p3: 0, pages: [] };
  });

  const pageContexts: PageContext[] = allPages.map(page => {
    const enrichment = page.aiEnrichment;
    const visualConfig = page.visualConfig;
    
    const cluster = page.clusterKey || visualConfig?.cluster || "other";
    const priority = visualConfig?.priority || "P2";
    
    if (clusterStats[cluster]) {
      clusterStats[cluster].total++;
      clusterStats[cluster].pages.push(page.path);
      if (priority === "P1") clusterStats[cluster].p1++;
      else if (priority === "P2") clusterStats[cluster].p2++;
      else clusterStats[cluster].p3++;
    }

    return {
      path: page.path,
      title: page.title,
      cluster,
      priority,
      status: page.status,
      seo: {
        title: enrichment?.suggestedSeo?.title || page.seoTitle || undefined,
        description: enrichment?.suggestedSeo?.description || page.seoDescription || undefined,
        focusKeyword: enrichment?.suggestedSeo?.focusKeyword || page.seoFocus || undefined,
      },
      suggestedLinks: (enrichment?.suggestedLinks || []).map(l => ({
        anchor: l.anchor,
        targetPath: l.targetPath
      })),
      vibeKeywords: visualConfig?.vibeKeywords || [],
    };
  });

  let contextBlocks: string[] = [];

  contextBlocks.push("=== CLUSTER OVERVIEW ===");
  Object.entries(clusterStats).forEach(([cluster, stats]) => {
    if (stats.total > 0) {
      contextBlocks.push(
        `${cluster.toUpperCase()}: ${stats.total} pages (P1:${stats.p1}, P2:${stats.p2}, P3:${stats.p3})`
      );
    } else {
      contextBlocks.push(`${cluster.toUpperCase()}: 0 pages (EMPTY CLUSTER)`);
    }
  });

  contextBlocks.push("\n=== ALL PAGES ===");
  pageContexts.forEach(p => {
    let block = `PAGE: ${p.path}
TITLE: ${p.title}
CLUSTER: ${p.cluster} | PRIORITY: ${p.priority} | STATUS: ${p.status}`;
    
    if (p.seo.focusKeyword) {
      block += `\nSEO FOCUS: ${p.seo.focusKeyword}`;
    }
    
    if (p.suggestedLinks.length > 0) {
      block += `\nLINKS TO: ${p.suggestedLinks.map(l => l.targetPath).join(", ")}`;
    }
    
    if (p.vibeKeywords.length > 0) {
      block += `\nVIBE: ${p.vibeKeywords.join(", ")}`;
    }
    
    contextBlocks.push(block + "\n---");
  });

  contextBlocks.push("\n=== CLUSTERS DEFINED ===");
  allClusters.forEach(c => {
    contextBlocks.push(`${c.key}: ${c.name} - ${c.description || "No description"}`);
  });

  return contextBlocks.join("\n");
}

async function getChatSystemPrompt(): Promise<string> {
  try {
    const setting = await storage.getCmsSetting("big_mind_system_prompt");
    if (setting && setting.value && typeof setting.value === "string" && setting.value.trim().length > 0) {
      return setting.value;
    }
  } catch (error) {
    console.error("Failed to fetch custom Big Mind prompt, using default:", error);
  }
  return BIG_MIND_SYSTEM_PROMPT;
}

export async function chat(
  messages: ChatMessage[],
  includeContext: boolean = true
): Promise<string> {
  const systemPrompt = await getChatSystemPrompt();
  
  let contextBlock = "";
  if (includeContext) {
    contextBlock = await getRelevantContext();
  }

  const fullSystemPrompt = includeContext
    ? `${systemPrompt}\n\n=== CURRENT SITE KNOWLEDGE ===\n${contextBlock}`
    : systemPrompt;

  const contents = [
    {
      role: "user",
      parts: [{ text: `SYSTEM CONTEXT:\n${fullSystemPrompt}\n\n---\n\nNow respond to the conversation that follows.` }]
    },
    {
      role: "model", 
      parts: [{ text: "I understand. I am the Andara Library, ready to help with content strategy, page suggestions, and site optimization. What would you like to know?" }]
    },
    ...messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }))
  ];

  try {
    const { client, model } = await getAiClient();
    const response = await client.models.generateContent({
      model,
      contents,
    });

    return response.text?.trim() || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Big Mind chat error:", error);
    throw new Error("Failed to generate response from Andara Library");
  }
}

// Export the model utilities for use in other AI services
export { getAiClient, getConfiguredModel, MODEL_PROVIDERS, DEFAULT_MODEL };

export async function getSiteOverview(): Promise<{
  totalPages: number;
  clusterStats: Record<string, number>;
  priorityStats: { p1: number; p2: number; p3: number };
  emptyClusterss: string[];
}> {
  const allPages = await storage.getAllPages();
  
  const clusterStats: Record<string, number> = {};
  const priorityStats = { p1: 0, p2: 0, p3: 0 };
  
  CLUSTER_ONTOLOGY.forEach(c => { clusterStats[c] = 0; });

  allPages.forEach(page => {
    const cluster = page.clusterKey || page.visualConfig?.cluster || "other";
    const priority = page.visualConfig?.priority || "P2";
    
    if (clusterStats[cluster] !== undefined) {
      clusterStats[cluster]++;
    }
    
    if (priority === "P1") priorityStats.p1++;
    else if (priority === "P2") priorityStats.p2++;
    else priorityStats.p3++;
  });

  const emptyClusterss = Object.entries(clusterStats)
    .filter(([_, count]) => count === 0)
    .map(([cluster]) => cluster);

  return {
    totalPages: allPages.length,
    clusterStats,
    priorityStats,
    emptyClusterss,
  };
}
