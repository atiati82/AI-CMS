import { GoogleGenAI } from "@google/genai";
import type { Page, Cluster } from "@shared/schema";
import { storage } from "../storage";

// Check which AI providers are available
// Support both Replit format (AI_INTEGRATIONS_*) and local format (GOOGLE_API_KEY, OPENAI_API_KEY)
const geminiApiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
// Ensure base URL includes /v1beta (env var might be missing it)
const rawGeminiBaseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';
const geminiBaseUrl = rawGeminiBaseUrl.endsWith('/v1beta') ? rawGeminiBaseUrl : `${rawGeminiBaseUrl}/v1beta`;
const openaiApiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const openaiBaseUrl = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

const hasGemini = !!geminiApiKey;
const hasOpenAI = !!openaiApiKey;

console.log(`[AI] Available providers: Gemini=${hasGemini}, OpenAI=${hasOpenAI}`);
if (geminiApiKey) console.log(`[AI] Gemini API key configured (${geminiApiKey.substring(0, 8)}...)`);
if (openaiApiKey) console.log(`[AI] OpenAI API key configured (${openaiApiKey.substring(0, 8)}...)`);

// Initialize Gemini client (Google GenAI SDK)
const geminiAi = hasGemini ? new GoogleGenAI({ apiKey: geminiApiKey! }) : null;

// OpenAI-compatible client (only used via Replit's AI Integrations proxy)
// Note: For direct OpenAI API calls, we'd need a different SDK
const openaiAi = hasOpenAI && openaiApiKey?.startsWith('sk-') === false ? new GoogleGenAI({ apiKey: openaiApiKey! }) : null;

// Model routing configuration
const MODEL_PROVIDERS: Record<string, 'openai' | 'gemini'> = {
  'gpt-4.1-mini': 'openai',
  'gpt-4.1': 'openai',
  'gpt-4o': 'openai',
  'gemini-2.0-flash': 'gemini',
  'gemini-2.0-flash-exp': 'gemini',
};

// Fallback model when preferred provider is unavailable
// Note: OpenAI client is only available via Replit proxy (non-sk- keys)
// For real OpenAI API keys (sk-...), we need the OpenAI SDK, not GoogleGenAI
const FALLBACK_MODEL = hasGemini ? 'gemini-2.0-flash' : (hasOpenAI ? 'gpt-4.1-mini' : null);
// Always prefer Gemini since the OpenAI client via GoogleGenAI only works with Replit proxy
const DEFAULT_MODEL = hasGemini ? 'gemini-2.0-flash' : 'gpt-4.1-mini';

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
async function getAiClient(modelId?: string): Promise<{ client: GoogleGenAI; model: string }> {
  let selectedModel = modelId || await getConfiguredModel();
  let provider = MODEL_PROVIDERS[selectedModel] || 'gemini';

  // Check if the selected provider's client is actually available
  // Note: openaiAi is null for real OpenAI keys (sk-...) since GoogleGenAI SDK doesn't support them
  const openaiClientAvailable = openaiAi !== null;
  const geminiClientAvailable = geminiAi !== null;

  // If OpenAI is selected but client is not available, fall back to Gemini
  if (provider === 'openai' && !openaiClientAvailable) {
    if (geminiClientAvailable) {
      console.log(`[AI] OpenAI client not available (real sk- key requires OpenAI SDK), falling back to Gemini`);
      selectedModel = 'gemini-2.0-flash';
      provider = 'gemini';
    } else {
      throw new Error('No AI provider is available. OpenAI requires the OpenAI SDK for sk- keys, and Gemini is not configured.');
    }
  }

  // If Gemini is selected but client is not available, try OpenAI
  if (provider === 'gemini' && !geminiClientAvailable) {
    if (openaiClientAvailable) {
      console.log(`[AI] Gemini not configured, falling back to OpenAI`);
      selectedModel = 'gpt-4.1-mini';
      provider = 'openai';
    } else {
      throw new Error('No AI provider is configured. Please set up either Gemini or OpenAI integration.');
    }
  }

  const client = provider === 'openai' ? openaiAi! : geminiAi!;

  if (!client) {
    throw new Error(`AI client is null for provider ${provider}. Check your API key configuration.`);
  }

  console.log(`[AI] Using model: ${selectedModel} (${provider})`);
  return { client, model: selectedModel };
}

// Import external configurations for reuse
import { CLUSTER_ONTOLOGY, getSiteArchitecturePrompt, getLayoutPrompt } from '../lib/site-config';
import { Tool } from '../agents/tools/types';

// ... existing code ...

/**
 * Transform internal Tool definitions to Gemini's expected format
 */
export function getToolConfig(tools: Tool[]) {
  // Transform our Tool definition to Gemini's expected format
  const functionDeclarations = tools.map(tool => ({
    name: tool.name,
    description: tool.description,
    parameters: tool.parameters
  }));

  return [{ functionDeclarations }];
}


import { getMotionSystemPrompt } from '../lib/motion-presets';
import { bigmindBriefing } from '../agents/briefings';

// === ANDARA IONIC RESEARCH CONTEXT ===
// This knowledge is integrated into all BigMind interactions

const ANDARA_RESEARCH_CONTEXT = `
## ANDARA IONIC CORE KNOWLEDGE

### Product Definition
- **Brand**: ANDARA IONIC
- **Concept**: Volcanic-origin ionic sulfate mineral concentrate for water treatment & structuring
- **Form**: Fully ionic, sulfate-based solution (no visible particles when diluted)
- **Elements**: Rich spectrum including Fe, Mg, Mn, Cu, B, Li, V, Sr, trace/ultra-trace elements
- **Use**: Water purification, clarification, conditioning (NOT dietary supplement)

### Andara Activation Range
- **Target**: 17-30 mg/L sulfate in treated water
- **Practical**: 1 ml concentrate per 1 liter water ≈ 17-18 mg/L sulfate
- **Scientific Basis**: 
  - Human plasma sulfate (~30 mg/L)
  - EZ water research on sulfate-interface structuring
  - Water treatment standards (10-35 mg/L optimal coagulation)

### Content Boundaries (CRITICAL)
✅ **Permitted Claims**:
- "Supports water clarification"
- "Is used to treat and condition water"
- "Can help reduce turbidity"
- "May reorganize hydration structures in water"
- "Is associated with..." (when citing research)

❌ **Forbidden Claims** (Never use these):
- Prevents, treats, cures, or diagnoses any disease
- "Heals", "detoxes your body", medical terminology
- Direct health benefit claims

### Internal Knowledge (Do not expose publicly)
- Source: Japanese volcanic black-mica–based mineral technology
- In content, refer to: "volcanic-origin ionic sulfate mineral concentrate"
- Avoid naming suppliers/brands unless legally required

### Knowledge Clusters
When discussing science topics, draw from these areas:
1. **Water Science**: pH, ORP, EC, TDS, turbidity, flocculation, EZ water
2. **Mineral Science**: Ionic vs colloidal, sulfate chemistry (SO₄²⁻), trace elements
3. **Crystalline Matrix**: Tetrahedral/hexagonal geometry, mineral lattices
4. **Bioelectric Science**: Electrolytes, membrane potentials, charge separation
5. **Microbiome**: Enzyme cofactors, gut bacteria, deep-sea water research
6. **Comparative Sources**: Ocean, lake brine, plant, fulvic, volcanic comparison

### Evidence Level Marking
Always distinguish:
- **Solid evidence**: Peer-reviewed, replicated ("Research shows...")
- **Hypothesis**: Published but emerging ("Studies suggest...", "May...")
- **Brand-specific**: Andara interpretation ("Andara is designed to...")
`;

const BIG_MIND_SYSTEM_PROMPT = `You are the Andara Library — the global brain of Andara Ionic, a premium primordial ionic sulfate mineral water brand.

${ANDARA_RESEARCH_CONTEXT}

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

${getSiteArchitecturePrompt()}

${getMotionSystemPrompt()}

${getLayoutPrompt()}

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
