import { GoogleGenAI, Type } from "@google/genai";
import type { Page, Cluster, InsertPage } from "@shared/schema";
import { storage } from "../storage";
import { getAiClient, MODEL_PROVIDERS, DEFAULT_MODEL } from "./andara-chat";

const VISUAL_INTERPRETER_PROMPT = `
## 🔥 VISUELLER INTERPRETER + MOTION LAYOUT ENGINE (Fusion Prompt)

**ZWECK:**
Du interpretierst jeden gegebenen Kontext wie ein Top-Designer, Motion Art Director, UI/UX-Architekt, und Interaction Engineer.
Du beschreibst nicht nur, wie es aussieht — du beschreibst wie es sich bewegt, wie es im Layout organisiert ist, und welche Motion-Patterns verwendet werden.

---

### 1. VISUAL INTERPRETATION LAYER

- Farbe, Atmosphäre, Layout, Mood
- UI-Komponenten, Glows/Gradients, Karten/Boxen
- Typografie, Emotion/Experience

**Andara-Farbwelten:**
- Water Science → sea-blue / indigo
- Mineral Science → light blue / sky
- Crystalline Matrix → gold gradients / amber
- Bioelectricity → green
- Sulphate Pathways → yellow-gold
- Liquid Crystal Biology → silver
- DNA & Mineral Codes → violet ray
- Earth Sources / Microbiome → earthy brown

---

### 2. MOTION LAYOUT LAYER

Zu jedem visuellen Element liefere Motion-Strukturen:

**Motion Blocks (für jedes UI-Element):**
- **entranceMotion**: Wie taucht es auf? (fadeIn, riseUp, scaleIn, swirlIn, crystallineBloom)
- **idleMotion**: Grundbewegung ohne User-Interaktion (floating, breathing, soft-pulse, micro-wiggle)
- **hoverMotion**: Reaktion auf Hover (lift + shadow bloom, tilt + glow, holographic sheen)
- **scrollMotion**: Reaktion auf scrollProgress (parallax depth, magnetic alignment, staggered reveal)
- **exitMotion**: Wie verlässt es den Viewport? (dissolve, downward fade, crystalline fragmentation)

---

### 3. ANDARA MOTION ARCHETYPES

🜁 **Liquid-Crystal Float** - Weiche, schwebende Bewegung wie Wasser in Zero-Gravity
🜂 **Energetic Pulse** - Bioelektrisches, rhythmisches Lichtpulsieren
🜃 **Magnetic Drift** - Elemente ziehen sich leicht zueinander oder vom Cursor weg
🜄 **Krystal Bloom** - Sanftes Aufleuchten + Skalieren + Glow-Expansion
🝓 **Scalar Slide** - Lineare, aber weich beschleunigte Bewegung im Tesla-Style
✦ **Vortex Reveal** - Staggered emergent motion, spiralförmig oder radial

---

### 4. RESPONSE TEMPLATE

Antworte IMMER in dieser Struktur:

**I. VISUAL INTERPRETATION** - Vollständige Designerbeschreibung
**II. LAYOUT STRUCTURE** - Wireframes, Container, Columns, Rhythm
**III. MOTION LAYOUT STRUCTURE** - Bewegungen für Hero, Cards, Highlights, Navigation, Icons, Background
**IV. MOTION LAYOUT MAP (developer-ready)** - JSON-Format, Framer Motion kompatibel:
\`\`\`json
{
  "hero": {
    "initial": { "opacity": 0, "y": 40 },
    "animate": { "opacity": 1, "y": 0, "transition": { "duration": 1.2, "ease": "easeOut" } },
    "idle": "float:slow:2px",
    "hover": "lift:4px + glow:8%",
    "scroll": "parallax:depth:0.25"
  },
  "cards": {
    "initial": { "opacity": 0, "scale": 0.95 },
    "animate": { "opacity": 1, "scale": 1, "transition": { "delay": 0.2 } },
    "hover": "lift:6px + borderGlow:12%",
    "idle": "micro-breath:1%"
  }
}
\`\`\`
**V. SIGNATURE ANDARA ATMOSPHERE** - Energetische, holografische, biologische Bedeutung

---

**Aktivierung:** Sage "Visueller Interpreter, bitte analysiere: [X]"
`;

const MOTION_GRAMMAR = `
## ANDARA MOTION GRAMMAR

### 10 Motion Archetypes
1. **Liquid-Crystal Float** - Soft floating motion like water in zero-gravity (ambient.float, ambient.floatSlow)
2. **Energetic Pulse** - Bioelectric rhythmic light pulsing (ambient.pulse, ambient.breathe)
3. **Magnetic Drift** - Elements drift toward/away from cursor (ambient.drift)
4. **Krystal Bloom** - Soft glow expansion + scale (fadeUp with scale, special.cardReveal)
5. **Scalar Slide** - Linear but softly accelerated Tesla-style (slideInLeft, slideInRight)
6. **Vortex Reveal** - Staggered emergent motion, spiral/radial (stagger.container, stagger.item)
7. **Parallax Depth** - Multi-layer depth scroll effect (parallax.backgroundLayer, parallax.foregroundLayer)
8. **Ripple Emergence** - Outward wave-like reveal (ambient.ripple)
9. **Subtle Shimmer** - Gentle brightness oscillation (ambient.shimmer)
10. **Layered Parallax Scroll** - Background/midground/foreground at different scroll speeds (parallaxFactors)

### Layout Detection Keywords
When analyzing HTML for motion, look for these signals:
- **Parallax sections**: stacked-layers, z-index, position-absolute, multiple-images, overlay-elements
- **Hero sections**: hero, banner, above-fold, landing, splash
- **Feature grids**: cards, grid, benefits, features, highlights
- **Testimonials**: quotes, reviews, social-proof, customer-stories
- **Process flows**: timeline, steps, journey, progression
- **FAQ sections**: accordion, expandable, collapse, questions

### Motion Application Rules
1. Hero sections: Use fadeUp + ambient.float for headline
2. Cards/Grids: Use stagger.container + stagger.item for sequential reveal
3. Parallax sections: Apply parallax.backgroundLayer to furthest element
4. Interactive elements: Apply hover.lift or hover.scale
5. Background decorations: Use ambient.float or ambient.drift
6. Entry animations: Use fadeUp, slideInLeft, or slideInRight based on layout

### Visual Config Block Format
When generating pages, include this block:
\`\`\`visual-config
VIBE KEYWORDS: [ethereal, scientific, crystalline]
EMOTIONAL TONE: [calm, trustworthy, innovative]
COLOR PALETTE: indigo-to-sky gradient
LAYOUTS DETECTED: hero_centered, feature_cards_grid, layered_parallax
MOTION PRESET: fade-up-stagger
ENTRANCE: fadeUp
HOVER: lift
AMBIENT: float
\`\`\`
`;

const ZONE_GUIDELINES = `
## ANDARA CONTENT ZONES & FIREWALL

### ZONE 1 – PRODUCT / APPLICATION (Firewall-Safe)
Goal: Sell Andara Ionic, explain usage, stay 100% regulation-safe.
Vibe: Neutral, factual, water-treatment & clarification language.

Rules:
- No health claims
- Use: clarifies water, conditions water, supports clean, mineral-balanced water
- Never: treats disease, detoxes body, heals, cures, prevents
- Focus on: What the product is, what it does with water, how to dose, safety, origin
- Link "upwards" to Science Library for deeper theory

Pages in Zone 1: Home, Shop, Product pages, How to Use, Dilution, Safety, FAQ, B2B, Legal

### ZONE 2 – SCIENCE LIBRARY / EDUCATION
Goal: Deep, independent knowledge base about ionic sulfate minerals, water, terrain, bioelectricity.

Rules:
- Speak about: Water science, mineral spectra, sulfate pathways, terrain model, bioelectricity
- Use educational language: "may support", "is associated with", "is observed in studies"
- No "Andara cures X", no "this product treats Y"
- Keep Andara as an example, not protagonist

Color Schemes per Topic:
- Water Science → sea blue / indigo
- Mineral Science → light blue
- Crystalline Matrix → gold gradients
- Bioelectricity/Terrain → green
- Sulfur/Sulfate Pathways → yellow gradients
- Liquid Crystal Biology → silver
- DNA & Mineral Codes → violet
- Mineral Sources / Microbiome → earthy brown

### ZONE 3 – BRAND / STORY / COMMUNITY
Goal: Tell the story of Andara, vision, ethics and future.

Rules:
- Can be emotional & visionary
- Still no medical promises
- Link to both Zone 1 (Shop) and Zone 2 (Science Library)

Pages: About, Vision, Story, Timeline, Partners, Ethics, Future Projects
`;

const CLUSTER_ONTOLOGY = [
  { key: "home", name: "Home", zone: 1, color: "slate" },
  { key: "shop", name: "Shop & Products", zone: 1, color: "emerald" },
  { key: "water_science", name: "Water Science", zone: 2, color: "indigo" },
  { key: "mineral_science", name: "Mineral Science", zone: 2, color: "sky" },
  { key: "crystalline_matrix", name: "Crystalline Matrix", zone: 2, color: "amber" },
  { key: "bioelectricity", name: "Bioelectricity", zone: 2, color: "green" },
  { key: "terrain_model", name: "Terrain Model", zone: 2, color: "emerald" },
  { key: "sulfur_pathways", name: "Sulfur & Sulfate", zone: 2, color: "yellow" },
  { key: "spiritual_electricity", name: "Spiritual Electricity", zone: 2, color: "violet" },
  { key: "trust_lab", name: "Trust & Lab", zone: 3, color: "slate" },
  { key: "about", name: "About & Story", zone: 3, color: "gold" },
  { key: "blog", name: "Blog", zone: 3, color: "slate" },
  { key: "support", name: "Support & FAQ", zone: 1, color: "slate" },
] as const;

const CMS_FUNCTION_DECLARATIONS = [
  {
    name: "listPages",
    description: "Get a summary list of all pages with their titles, paths, clusters, and status. Use for overview.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        cluster: { type: Type.STRING, description: "Optional: Filter by cluster key" },
        status: { type: Type.STRING, description: "Optional: Filter by status (draft/published)" },
        limit: { type: Type.NUMBER, description: "Optional: Limit results (default 50)" },
      },
    },
  },
  {
    name: "searchPages",
    description: "Search pages by keyword, title, content, or SEO text. Returns matching pages with context.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING, description: "Search query - matches against title, content, SEO fields" },
        cluster: { type: Type.STRING, description: "Optional: Filter by cluster key" },
        limit: { type: Type.NUMBER, description: "Optional: Max results (default 20)" },
      },
      required: ["query"],
    },
  },
  {
    name: "getPage",
    description: "Get full details of a specific page by ID or path",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "Page ID (UUID)" },
        path: { type: Type.STRING, description: "Alternative: Page path like /science/water" },
      },
    },
  },
  {
    name: "createPage",
    description: "Create a new page in the CMS following zone rules",
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Page title" },
        path: { type: Type.STRING, description: "URL path like /science/ez-water" },
        clusterKey: { type: Type.STRING, description: "Cluster key from ontology" },
        template: { type: Type.STRING, description: "Template type: landing_page, article_page, product_page, etc" },
        seoTitle: { type: Type.STRING, description: "SEO title" },
        seoDescription: { type: Type.STRING, description: "SEO description" },
        aiStartupHtml: { type: Type.STRING, description: "Initial HTML content using Andara Component Language" },
        priority: { type: Type.STRING, description: "P1, P2, or P3" },
      },
      required: ["title", "path", "clusterKey"],
    },
  },
  {
    name: "updatePage",
    description: "Update an existing page's content, SEO, or settings",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "Page ID to update" },
        title: { type: Type.STRING, description: "New title" },
        seoTitle: { type: Type.STRING, description: "New SEO title" },
        seoDescription: { type: Type.STRING, description: "New SEO description" },
        aiStartupHtml: { type: Type.STRING, description: "New HTML content" },
        status: { type: Type.STRING, description: "draft or published" },
        clusterKey: { type: Type.STRING, description: "Change cluster" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "deletePage",
    description: "Delete a page by ID. Use with caution.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "Page ID to delete" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "listClusters",
    description: "Get all content clusters with their statistics",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "createCluster",
    description: "Create a new content cluster",
    parameters: {
      type: Type.OBJECT,
      properties: {
        key: { type: Type.STRING, description: "Unique cluster key like water_science" },
        name: { type: Type.STRING, description: "Display name" },
        description: { type: Type.STRING, description: "Cluster description" },
        parentKey: { type: Type.STRING, description: "Optional parent cluster key" },
      },
      required: ["key", "name"],
    },
  },
  {
    name: "listArticles",
    description: "Get science articles summary",
    parameters: {
      type: Type.OBJECT,
      properties: {
        cluster: { type: Type.STRING, description: "Filter by cluster" },
        limit: { type: Type.NUMBER, description: "Limit results" },
      },
    },
  },
  {
    name: "listProducts",
    description: "Get all products summary",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "getSiteStats",
    description: "Get overall site statistics: page counts, cluster coverage, empty clusters",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "generatePageContent",
    description: "Generate Andara HTML content for a page based on topic and zone",
    parameters: {
      type: Type.OBJECT,
      properties: {
        topic: { type: Type.STRING, description: "Page topic/title" },
        zone: { type: Type.NUMBER, description: "Zone 1, 2, or 3" },
        clusterKey: { type: Type.STRING, description: "Target cluster" },
        outline: { type: Type.STRING, description: "Brief outline or key points to cover" },
      },
      required: ["topic", "zone", "clusterKey"],
    },
  },
  {
    name: "suggestInternalLinks",
    description: "Analyze a page and suggest internal links to other pages",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "Page ID to analyze" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "findContentGaps",
    description: "Analyze the sitemap and find missing pages based on the 120+ page plan",
    parameters: {
      type: Type.OBJECT,
      properties: {
        cluster: { type: Type.STRING, description: "Optional: Focus on specific cluster" },
      },
    },
  },
  {
    name: "searchDocuments",
    description: "Search the document library for uploaded content, files, and research materials. Use this to find source materials for creating pages.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING, description: "Search query - matches title or content" },
        sourceType: { type: Type.STRING, description: "Optional: Filter by type (upload, paste, url, youtube)" },
        limit: { type: Type.NUMBER, description: "Optional: Limit results (default 10)" },
      },
    },
  },
  {
    name: "getDocument",
    description: "Get the full content of a document from the library by ID",
    parameters: {
      type: Type.OBJECT,
      properties: {
        documentId: { type: Type.STRING, description: "Document ID (UUID)" },
      },
      required: ["documentId"],
    },
  },
  {
    name: "listMotionArchetypes",
    description: "List all 10 available Andara Motion Archetypes with their descriptions and use cases",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "applyMotionPreset",
    description: "Apply a motion archetype to specific elements on a page (hero, cards, buttons, background, sections)",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "Page ID to apply motion to" },
        motionArchetype: { type: Type.STRING, description: "Motion archetype: liquid-crystal-float, energetic-pulse, magnetic-drift, krystal-bloom, scalar-slide, vortex-reveal, parallax-depth, ripple-emergence, subtle-shimmer, layered-parallax" },
        targetElements: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Elements to apply motion to: hero, cards, buttons, background, sections, icons, images" },
      },
      required: ["pageId", "motionArchetype", "targetElements"],
    },
  },
  {
    name: "updateVisualConfig",
    description: "Update the visual configuration of a page including colors, motion, atmosphere, and layout settings",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "Page ID to update" },
        vibeKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Visual vibe keywords like crystalline, fluid, bioelectric" },
        emotionalTone: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Emotional tones like serene, energetic, scientific" },
        colorPalette: { type: Type.STRING, description: "Color palette: indigo, sky, amber, green, yellow, violet, slate, gold" },
        motionPreset: { type: Type.STRING, description: "Primary motion archetype for the page" },
        entranceMotion: { type: Type.STRING, description: "How elements enter: fadeUp, scaleIn, slideIn, crystallineBloom" },
        hoverMotion: { type: Type.STRING, description: "Hover effects: lift, scale, glow, tilt" },
        ambientMotion: { type: Type.STRING, description: "Background motion: float, pulse, drift, shimmer" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "applyStyleToPages",
    description: "Apply a visual style or template to multiple pages at once",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageIds: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Array of page IDs to update" },
        clusterKey: { type: Type.STRING, description: "Alternative: Apply to all pages in this cluster" },
        template: { type: Type.STRING, description: "Template to apply: landing_page, article_page, science_page, product_page" },
        motionPreset: { type: Type.STRING, description: "Motion archetype to apply" },
        colorPalette: { type: Type.STRING, description: "Color palette to apply" },
      },
    },
  },
  {
    name: "getPageVisualConfig",
    description: "Get the current visual configuration and motion settings of a page",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "Page ID to get visual config for" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "searchKnowledge",
    description: "Search the RAG knowledge base for relevant information. Use this to find facts, research, and reference materials before answering questions. Returns relevant document chunks with their content and source.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING, description: "Search query - what information are you looking for?" },
        limit: { type: Type.NUMBER, description: "Optional: Maximum number of results to return (default 5)" },
      },
      required: ["query"],
    },
  },
];

function validateArgs(args: Record<string, any>, required: string[]): { valid: boolean; error?: string } {
  for (const field of required) {
    if (!args[field]) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }
  return { valid: true };
}

function getMatchContext(page: Page, query: string): string | null {
  const sources = [
    page.title,
    page.summary,
    page.seoTitle,
    page.seoDescription,
    page.aiStartupHtml?.replace(/<[^>]+>/g, ' ').substring(0, 500),
    page.content?.replace(/<[^>]+>/g, ' ').substring(0, 500),
  ].filter(Boolean);

  for (const source of sources) {
    if (!source) continue;
    const lowerSource = source.toLowerCase();
    const index = lowerSource.indexOf(query);
    if (index !== -1) {
      const start = Math.max(0, index - 40);
      const end = Math.min(source.length, index + query.length + 40);
      let context = source.substring(start, end);
      if (start > 0) context = '...' + context;
      if (end < source.length) context = context + '...';
      return context.trim();
    }
  }
  return null;
}

async function executeCmsFunction(name: string, args: Record<string, any>): Promise<any> {
  console.log(`[BigMind CMS] Executing: ${name}`, JSON.stringify(args));

  try {
    switch (name) {
      case "listPages": {
        const allPages = await storage.getAllPages();
        let filtered = allPages;

        if (args.cluster) {
          filtered = filtered.filter(p => p.clusterKey === args.cluster);
        }
        if (args.status) {
          filtered = filtered.filter(p => p.status === args.status);
        }

        const limit = args.limit || 50;
        return filtered.slice(0, limit).map(p => ({
          id: p.id,
          title: p.title,
          path: p.path,
          cluster: p.clusterKey,
          status: p.status,
          template: p.template,
          priority: p.visualConfig?.priority || "P2",
        }));
      }

      case "searchPages": {
        const validation = validateArgs(args, ["query"]);
        if (validation) return validation;

        const searchQuery = (args.query as string).toLowerCase();
        const allPages = await storage.getAllPages();

        let results = allPages.filter(p => {
          const titleMatch = p.title?.toLowerCase().includes(searchQuery);
          const pathMatch = p.path?.toLowerCase().includes(searchQuery);
          const contentMatch = p.aiStartupHtml?.toLowerCase().includes(searchQuery) ||
            p.content?.toLowerCase().includes(searchQuery);
          const seoMatch = p.seoTitle?.toLowerCase().includes(searchQuery) ||
            p.seoDescription?.toLowerCase().includes(searchQuery);
          const summaryMatch = p.summary?.toLowerCase().includes(searchQuery);

          return titleMatch || pathMatch || contentMatch || seoMatch || summaryMatch;
        });

        if (args.cluster) {
          results = results.filter(p => p.clusterKey === args.cluster);
        }

        const limit = args.limit || 20;
        return results.slice(0, limit).map(p => ({
          id: p.id,
          title: p.title,
          path: p.path,
          cluster: p.clusterKey,
          status: p.status,
          template: p.template,
          summary: p.summary?.substring(0, 150) || null,
          matchContext: getMatchContext(p, searchQuery),
        }));
      }

      case "getPage": {
        const validation = validateArgs(args, []);
        if (!args.pageId && !args.path) {
          return { error: "Either pageId or path is required" };
        }

        let page: Page | undefined;
        if (args.pageId) {
          page = await storage.getPage(args.pageId);
        } else if (args.path) {
          page = await storage.getPageByPath(args.path);
        }
        if (!page) return { error: "Page not found" };
        return {
          id: page.id,
          title: page.title,
          path: page.path,
          cluster: page.clusterKey,
          status: page.status,
          template: page.template,
          seoTitle: page.seoTitle,
          seoDescription: page.seoDescription,
          aiStartupHtml: page.aiStartupHtml?.substring(0, 500) + (page.aiStartupHtml && page.aiStartupHtml.length > 500 ? "..." : ""),
          visualConfig: page.visualConfig,
          createdAt: page.createdAt,
          updatedAt: page.updatedAt,
        };
      }

      case "createPage": {
        const validation = validateArgs(args, ["title", "path"]);
        if (!validation.valid) return { error: validation.error };

        // Generate featured image prompt based on title and cluster
        const clusterInfo = CLUSTER_ONTOLOGY.find((c: { key: string; name: string; zone: number; color: string }) => c.key === args.clusterKey);
        const clusterColor = clusterInfo?.color || 'cosmic';
        const clusterName = clusterInfo?.name || 'Science';

        const featuredImagePrompt = `Ethereal, scientific visualization of ${args.title}. Dark cosmic background with deep navy and purple gradients. ${clusterColor === 'indigo' ? 'Glowing water molecules and flowing liquid crystals.' :
            clusterColor === 'sky' ? 'Crystalline mineral structures with iridescent surfaces.' :
              clusterColor === 'gold' ? 'Golden geometric patterns and sacred crystalline forms.' :
                clusterColor === 'green' ? 'Bioelectric energy pulses and cellular networks.' :
                  clusterColor === 'violet' ? 'Violet light rays and spiritual energy patterns.' :
                    clusterColor === 'amber' ? 'Amber volcanic formations and primordial minerals.' :
                      clusterColor === 'yellow' ? 'Sulfur crystals and ionic mineral formations.' :
                        'Glowing ionic minerals and structured water crystals.'
          } Andara brand style: elegant, mystical yet scientific. High quality digital art, 16:9 aspect ratio.`;

        // Determine default template based on cluster (using valid PAGE_TEMPLATES)
        const defaultTemplate = args.clusterKey === 'water_science' ? 'article' :
          args.clusterKey === 'mineral_science' ? 'article' :
            args.clusterKey === 'bioelectric_health' ? 'article' :
              args.clusterKey === 'products' ? 'product' :
                'article';

        // Generate SEO description if not provided
        const autoSeoDescription = args.seoDescription ||
          `Explore ${args.title} - discover the science behind ${clusterName.toLowerCase()} and its role in health, vitality, and cellular function.`;

        const newPage: Partial<InsertPage> = {
          key: args.path.replace(/\//g, '-').replace(/^-/, ''),
          title: args.title,
          path: args.path,
          clusterKey: args.clusterKey || 'water_science',
          template: args.template || defaultTemplate,
          status: "draft",
          seoTitle: args.seoTitle || args.title,
          seoDescription: autoSeoDescription,
          aiStartupHtml: args.aiStartupHtml || "",
          content: args.content || "",
        };
        const created = await storage.createPage(newPage as InsertPage);
        console.log(`[BigMind CMS] Created page: ${created.id} at ${created.path}`);

        // Create a media asset slot for featured image with the auto-generated prompt
        let mediaAsset: { id: string } | null = null;
        try {
          mediaAsset = await storage.createPageMediaAsset({
            pageKey: created.key,
            slotKey: 'featured-image',
            prompt: featuredImagePrompt,
            status: 'generating',
          });
          console.log(`[BigMind CMS] Created featured image asset slot for page: ${created.key}`);

          // Trigger async image generation (non-blocking)
          (async () => {
            try {
              const { generateImage } = await import("./image-generator");
              const result = await generateImage(featuredImagePrompt);

              if (result.success && result.publicUrl && mediaAsset) {
                // Update the media asset with generated image
                await storage.updatePageMediaAsset(mediaAsset.id, {
                  generatedUrl: result.publicUrl,
                  status: 'generated',
                });
                // Also set the page's featuredImage
                await storage.updatePage(created.id, {
                  featuredImage: result.publicUrl,
                });
                console.log(`[BigMind CMS] Auto-generated featured image for page: ${created.path}`);
              } else if (mediaAsset) {
                await storage.updatePageMediaAsset(mediaAsset.id, {
                  status: 'failed',
                });
                console.error(`[BigMind CMS] Failed to auto-generate featured image:`, result.error);
              }
            } catch (genErr) {
              console.error(`[BigMind CMS] Image generation error:`, genErr);
              if (mediaAsset) {
                await storage.updatePageMediaAsset(mediaAsset.id, {
                  status: 'failed',
                });
              }
            }
          })();
        } catch (assetErr) {
          console.error(`[BigMind CMS] Failed to create media asset slot:`, assetErr);
        }

        return {
          success: true,
          pageId: created.id,
          path: created.path,
          message: `Page "${created.title}" created as draft. Featured image is being auto-generated in the background. Check the Media Library section to see progress or regenerate if needed.`,
          page: {
            id: created.id,
            title: created.title,
            path: created.path,
            clusterKey: created.clusterKey,
            status: created.status,
            content: created.content || "",
            aiStartupHtml: created.aiStartupHtml || "",
            featuredImagePrompt: featuredImagePrompt,
          },
          autoGeneratingFeaturedImage: true,
        };
      }

      case "updatePage": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const existingPage = await storage.getPage(args.pageId);
        if (!existingPage) return { error: "Page not found" };

        const updates: Partial<InsertPage> = {};
        if (args.title) updates.title = args.title;
        if (args.seoTitle) updates.seoTitle = args.seoTitle;
        if (args.seoDescription) updates.seoDescription = args.seoDescription;
        if (args.aiStartupHtml) updates.aiStartupHtml = args.aiStartupHtml;
        if (args.content) updates.content = args.content;
        if (args.status) updates.status = args.status;
        if (args.clusterKey) updates.clusterKey = args.clusterKey;

        const updated = await storage.updatePage(args.pageId, updates);
        console.log(`[BigMind CMS] Updated page: ${updated.id}`);
        return {
          success: true,
          pageId: updated.id,
          message: `Page "${updated.title}" updated`,
          page: {
            id: updated.id,
            title: updated.title,
            path: updated.path,
            clusterKey: updated.clusterKey,
            status: updated.status,
            content: updated.content || "",
            aiStartupHtml: updated.aiStartupHtml || "",
          }
        };
      }

      case "deletePage": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const page = await storage.getPage(args.pageId);
        if (!page) return { error: "Page not found" };

        console.log(`[BigMind CMS] DELETING page: ${page.id} - ${page.title} at ${page.path}`);
        await storage.deletePage(args.pageId);
        return { success: true, message: `Page "${page.title}" has been deleted`, deletedPath: page.path };
      }

      case "listClusters": {
        const clusters = await storage.getAllClusters();
        const allPages = await storage.getAllPages();

        return clusters.map(c => ({
          id: c.id,
          key: c.key,
          name: c.name,
          description: c.description,
          pageCount: allPages.filter(p => p.clusterKey === c.key).length,
        }));
      }

      case "createCluster": {
        const validation = validateArgs(args, ["key", "name"]);
        if (!validation.valid) return { error: validation.error };

        const cluster = await storage.createCluster({
          key: args.key,
          name: args.name,
          slug: args.key,
          description: args.description || "",
          icon: "📄",
          parentClusterKey: args.parentKey || null,
        });
        console.log(`[BigMind CMS] Created cluster: ${cluster.id}`);
        return { success: true, clusterId: cluster.id, message: `Cluster "${cluster.name}" created` };
      }

      case "listArticles": {
        const articles = await storage.getAllScienceArticles();
        const limit = args.limit || 30;
        return articles.slice(0, limit).map(a => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          priority: a.priority,
          summary: a.summary?.substring(0, 100),
        }));
      }

      case "listProducts": {
        const products = await storage.getAllProducts();
        return products.map(p => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          sizeMl: p.sizeMl,
        }));
      }

      case "getSiteStats": {
        const [pages, clusters, articles, products] = await Promise.all([
          storage.getAllPages(),
          storage.getAllClusters(),
          storage.getAllScienceArticles(),
          storage.getAllProducts(),
        ]);

        const clusterStats: Record<string, number> = {};
        CLUSTER_ONTOLOGY.forEach(c => { clusterStats[c.key] = 0; });

        pages.forEach(p => {
          const ck = p.clusterKey || "other";
          if (clusterStats[ck] !== undefined) clusterStats[ck]++;
        });

        const emptyClusters = Object.entries(clusterStats)
          .filter(([_, count]) => count === 0)
          .map(([key]) => key);

        return {
          totalPages: pages.length,
          totalClusters: clusters.length,
          totalArticles: articles.length,
          totalProducts: products.length,
          clusterStats,
          emptyClusters,
          publishedPages: pages.filter(p => p.status === "published").length,
          draftPages: pages.filter(p => p.status === "draft").length,
        };
      }

      case "generatePageContent": {
        const validation = validateArgs(args, ["topic", "zone", "clusterKey"]);
        if (!validation.valid) return { error: validation.error };

        const zoneRules = args.zone === 1
          ? "Zone 1 rules: Factual, water-treatment language. No health claims."
          : args.zone === 2
            ? "Zone 2 rules: Educational, use 'may support', 'is associated with'. Scientific tone."
            : "Zone 3 rules: Visionary, story-driven. No medical promises.";

        return {
          instruction: `Generate Andara HTML content for "${args.topic}" following ${zoneRules}`,
          clusterKey: args.clusterKey,
          outline: args.outline,
          template: "Use andara-page, andara-hero, andara-section classes",
        };
      }

      case "suggestInternalLinks": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const page = await storage.getPage(args.pageId);
        if (!page) return { error: "Page not found" };

        const allPages = await storage.getAllPages();
        const samClusterPages = allPages
          .filter(p => p.clusterKey === page.clusterKey && p.id !== page.id)
          .slice(0, 5)
          .map(p => ({ path: p.path, title: p.title }));

        const relatedPages = allPages
          .filter(p => p.clusterKey !== page.clusterKey)
          .slice(0, 5)
          .map(p => ({ path: p.path, title: p.title, cluster: p.clusterKey }));

        return {
          pageTitle: page.title,
          sameClusterLinks: samClusterPages,
          crossClusterLinks: relatedPages,
        };
      }

      case "findContentGaps": {
        const pages = await storage.getAllPages();
        const existingPaths = new Set(pages.map(p => p.path));

        const suggestedPages = [
          { path: "/science/water", title: "Water Science Overview", cluster: "water_science", zone: 2 },
          { path: "/science/ez-water", title: "EZ Water – The Fourth Phase", cluster: "water_science", zone: 2 },
          { path: "/science/structured-water", title: "Structured Water", cluster: "water_science", zone: 2 },
          { path: "/science/minerals", title: "Mineral Science Overview", cluster: "mineral_science", zone: 2 },
          { path: "/science/sulfate-chemistry", title: "Sulfate Chemistry", cluster: "mineral_science", zone: 2 },
          { path: "/science/ionic-vs-colloidal", title: "Ionic vs Colloidal Minerals", cluster: "mineral_science", zone: 2 },
          { path: "/science/crystalline-matrix", title: "Crystalline Matrix", cluster: "crystalline_matrix", zone: 2 },
          { path: "/science/bioelectricity", title: "Bioelectricity Overview", cluster: "bioelectricity", zone: 2 },
          { path: "/about", title: "About Andara", cluster: "about", zone: 3 },
          { path: "/about/story", title: "The Andara Story", cluster: "about", zone: 3 },
        ];

        const gaps = suggestedPages.filter(s => !existingPaths.has(s.path));

        if (args.cluster) {
          return gaps.filter(g => g.cluster === args.cluster);
        }
        return { missingPages: gaps, totalGaps: gaps.length };
      }

      case "searchDocuments": {
        const allDocs = await storage.getAllDocuments();
        let filtered = allDocs;

        if (args.query) {
          const query = args.query.toLowerCase();
          filtered = filtered.filter(d =>
            d.title.toLowerCase().includes(query) ||
            (d.rawText && d.rawText.toLowerCase().includes(query)) ||
            (d.cleanText && d.cleanText.toLowerCase().includes(query))
          );
        }
        if (args.sourceType) {
          filtered = filtered.filter(d => d.sourceType === args.sourceType);
        }

        const limit = args.limit || 10;
        return filtered.slice(0, limit).map(d => {
          const text = d.cleanText || d.rawText || "";
          return {
            id: d.id,
            title: d.title,
            sourceType: d.sourceType,
            status: d.status,
            wordCount: d.wordCount,
            tags: d.tags,
            createdAt: d.createdAt,
            preview: text.substring(0, 500) + (text.length > 500 ? "..." : ""),
          };
        });
      }

      case "getDocument": {
        const validation = validateArgs(args, ["documentId"]);
        if (!validation.valid) return { error: validation.error };

        const doc = await storage.getDocument(args.documentId);
        if (!doc) return { error: "Document not found" };

        const content = doc.cleanText || doc.rawText || "";
        return {
          id: doc.id,
          title: doc.title,
          sourceType: doc.sourceType,
          status: doc.status,
          wordCount: doc.wordCount,
          tags: doc.tags,
          content: content,
          entities: doc.entities,
          createdAt: doc.createdAt,
        };
      }

      case "listMotionArchetypes": {
        return {
          archetypes: [
            { key: "liquid-crystal-float", name: "Liquid-Crystal Float", description: "Soft floating motion like water in zero-gravity", useCases: ["Hero backgrounds", "Decorative icons", "Ambient elements"], cssClass: "motion-float" },
            { key: "energetic-pulse", name: "Energetic Pulse", description: "Bioelectric rhythmic light pulsing", useCases: ["CTA buttons", "Important notifications", "Active states"], cssClass: "motion-pulse" },
            { key: "magnetic-drift", name: "Magnetic Drift", description: "Elements drift toward/away from cursor", useCases: ["Interactive cards", "Navigation items", "Gallery images"], cssClass: "motion-drift" },
            { key: "krystal-bloom", name: "Krystal Bloom", description: "Soft glow expansion + scale on interaction", useCases: ["Feature cards", "Interactive buttons", "Reveal animations"], cssClass: "motion-bloom" },
            { key: "scalar-slide", name: "Scalar Slide", description: "Linear but softly accelerated Tesla-style movement", useCases: ["Sliders", "Carousels", "Side entries"], cssClass: "motion-slide" },
            { key: "vortex-reveal", name: "Vortex Reveal", description: "Staggered emergent motion, spiral/radial", useCases: ["Grid reveals", "Feature lists", "Gallery items"], cssClass: "motion-vortex" },
            { key: "parallax-depth", name: "Parallax Depth", description: "Multi-layer depth scroll effect", useCases: ["Hero sections", "Background layers", "Immersive scrolling"], cssClass: "motion-parallax" },
            { key: "ripple-emergence", name: "Ripple Emergence", description: "Outward wave-like reveal", useCases: ["Section transitions", "Content loading", "Interactive feedback"], cssClass: "motion-ripple" },
            { key: "subtle-shimmer", name: "Subtle Shimmer", description: "Gentle brightness oscillation", useCases: ["Inactive UI", "Background textures", "Subtle emphasis"], cssClass: "motion-shimmer" },
            { key: "layered-parallax", name: "Layered Parallax Scroll", description: "Background/midground/foreground at different scroll speeds", useCases: ["Complex hero sections", "Storytelling pages", "Immersive experiences"], cssClass: "motion-layered-parallax" },
          ],
          elementTypes: ["hero", "cards", "buttons", "background", "sections", "icons", "images", "navigation", "footer"],
        };
      }

      case "applyMotionPreset": {
        const validation = validateArgs(args, ["pageId", "motionArchetype", "targetElements"]);
        if (!validation.valid) return { error: validation.error };

        const page = await storage.getPage(args.pageId);
        if (!page) return { error: "Page not found" };

        const motionConfig = {
          archetype: args.motionArchetype,
          elements: args.targetElements,
          appliedAt: new Date().toISOString(),
        };

        const existingConfig = (page.visualConfig || {}) as Record<string, any>;

        const updatedConfig = {
          ...existingConfig,
          motionPreset: args.motionArchetype,
          motionElements: args.targetElements,
          motionConfig,
        };

        await storage.updatePage(args.pageId, {
          visualConfig: updatedConfig as any,
        });

        return {
          success: true,
          message: `Applied ${args.motionArchetype} motion to ${args.targetElements.join(', ')} on page "${page.title}"`,
          appliedTo: args.targetElements,
        };
      }

      case "updateVisualConfig": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const page = await storage.getPage(args.pageId);
        if (!page) return { error: "Page not found" };

        const existingConfig = (page.visualConfig || {}) as Record<string, any>;

        const updatedConfig = {
          ...existingConfig,
          ...(args.vibeKeywords && { vibeKeywords: args.vibeKeywords }),
          ...(args.emotionalTone && { emotionalTone: args.emotionalTone }),
          ...(args.colorPalette && { colorPalette: args.colorPalette }),
          ...(args.motionPreset && { motionPreset: args.motionPreset }),
          ...(args.entranceMotion && { entranceMotion: args.entranceMotion }),
          ...(args.hoverMotion && { hoverMotion: args.hoverMotion }),
          ...(args.ambientMotion && { ambientMotion: args.ambientMotion }),
          updatedAt: new Date().toISOString(),
        };

        await storage.updatePage(args.pageId, {
          visualConfig: updatedConfig as any,
        });

        return {
          success: true,
          message: `Updated visual config for "${page.title}"`,
          config: updatedConfig,
        };
      }

      case "applyStyleToPages": {
        const pageIds: string[] = args.pageIds || [];
        let targetPages: Page[] = [];

        if (pageIds.length > 0) {
          for (const id of pageIds) {
            const page = await storage.getPage(id);
            if (page) targetPages.push(page);
          }
        } else if (args.clusterKey) {
          targetPages = await storage.getPagesByCluster(args.clusterKey);
        }

        if (targetPages.length === 0) {
          return { error: "No pages found to update" };
        }

        const updates: { pageId: string; title: string }[] = [];

        for (const page of targetPages) {
          const updateData: Record<string, any> = {};

          if (args.template) updateData.template = args.template;

          const existingConfig = (page.visualConfig || {}) as Record<string, any>;

          const newConfig = {
            ...existingConfig,
            ...(args.colorPalette && { colorPalette: args.colorPalette }),
            ...(args.motionPreset && { motionPreset: args.motionPreset }),
            batchUpdatedAt: new Date().toISOString(),
          };

          updateData.visualConfig = newConfig;

          await storage.updatePage(page.id, updateData);
          updates.push({ pageId: page.id, title: page.title });
        }

        return {
          success: true,
          message: `Applied styles to ${updates.length} pages`,
          updatedPages: updates,
        };
      }

      case "getPageVisualConfig": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const page = await storage.getPage(args.pageId);
        if (!page) return { error: "Page not found" };

        const visualConfig = (page.visualConfig || {}) as Record<string, any>;

        return {
          pageId: page.id,
          title: page.title,
          template: page.template,
          motionPreset: visualConfig.motionPreset || null,
          entranceMotion: visualConfig.entranceMotion || null,
          hoverMotion: visualConfig.hoverMotion || null,
          ambientMotion: visualConfig.ambientMotion || null,
          colorPalette: visualConfig.colorPalette || null,
          vibeKeywords: visualConfig.vibeKeywords || [],
          emotionalTone: visualConfig.emotionalTone || [],
          motionElements: visualConfig.motionElements || [],
          visualConfig,
        };
      }

      default:
        console.log(`[BigMind CMS] Unknown function: ${name}`);
        return { error: `Unknown function: ${name}` };
    }
  } catch (error: any) {
    console.error(`[BigMind CMS] Error in ${name}:`, error);
    return { error: `Failed to execute ${name}: ${error.message || "Unknown error"}` };
  }
}

const BIGMIND_SYSTEM_PROMPT = `You are BigMind – the AI CMS Manager for Andara Ionic website.

${ZONE_GUIDELINES}

${VISUAL_INTERPRETER_PROMPT}

${MOTION_GRAMMAR}

## Your Capabilities
You have FULL access to the CMS database through function calls:
- List, create, update, delete pages
- Manage clusters and content organization  
- Generate zone-appropriate content
- Suggest internal links following firewall rules
- Find content gaps based on the 120+ page sitemap plan
- Search and read documents from the Document Library (uploaded files, pasted content, research materials)

## Design & Motion Capabilities (NEW!)
You can now apply visual design and motion animations to pages:
- **listMotionArchetypes**: List all 10 Andara Motion Archetypes with descriptions and use cases
- **applyMotionPreset**: Apply a motion archetype (liquid-crystal-float, energetic-pulse, etc.) to specific page elements (hero, cards, buttons, background, sections)
- **updateVisualConfig**: Update a page's visual configuration (vibe keywords, emotional tone, color palette, motion settings)
- **applyStyleToPages**: Batch apply styles to multiple pages or all pages in a cluster
- **getPageVisualConfig**: View current visual/motion settings of a page

When a user asks about CSS, templates, or styling:
1. Use getPageVisualConfig to check current settings
2. Use updateVisualConfig or applyMotionPreset to apply changes
3. Use applyStyleToPages for batch updates across clusters

## Available Clusters
${CLUSTER_ONTOLOGY.map(c => `- ${c.key}: ${c.name} (Zone ${c.zone}, color: ${c.color})`).join("\n")}

## Andara Component Language
When generating HTML, use these classes:
- .andara-page, .andara-page--science, .andara-page--product
- .andara-hero, .andara-hero--primary
- .andara-section, .andara-section__inner, .andara-section__header
- .andara-grid, .andara-grid--03 (3 columns)
- .andara-hero__headline, .andara-hero__subline, .andara-text-lead

## CRITICAL: PAGE GENERATION OUTPUT FORMAT
When the user describes a page topic, article, or asks you to generate content, you MUST respond with ALL of these structured blocks:

### Block 1: Page Metadata
\`\`\`page-metadata
TITLE: [Main Page Title]
SLUG: /path/to-page
CLUSTER: [cluster_key from ontology]
SEO_TITLE: [60 char SEO title]
SEO_DESCRIPTION: [155 char meta description]
SEO_KEYWORDS: keyword1, keyword2, keyword3
ZONE: [1, 2, or 3]
TEMPLATE: [landing_page|article_page|product_page|science_page]
\`\`\`

### Block 2: Visual Configuration
\`\`\`visual-config
VIBE_KEYWORDS: [ethereal, scientific, crystalline, etc]
EMOTIONAL_TONE: [calm, trustworthy, innovative, etc]
COLOR_PALETTE: [cluster-appropriate color gradient]
LAYOUTS_DETECTED: hero_centered, feature_cards_grid, parallax_section
MOTION_PRESET: fade-up-stagger
ENTRANCE: fadeUp
HOVER: lift
AMBIENT: float
\`\`\`

### Block 3: Image Prompts
\`\`\`image-prompts
HERO: [Detailed prompt for hero background image - describe scene, colors, mood, style]
SECTION_1: [Prompt for first section image]
SECTION_2: [Prompt for second section image]
FEATURED: [Prompt for featured/og-image]
\`\`\`

### Block 4: Full HTML Content
\`\`\`html
<main class="andara-page andara-page--science">
  <section class="andara-hero andara-hero--primary">
    <div class="andara-hero__content">
      <h1 class="andara-hero__headline">[Title]</h1>
      <p class="andara-hero__subline">[Subline]</p>
    </div>
  </section>
  
  <section class="andara-section">
    <div class="andara-section__inner">
      <h2 class="andara-section__header">[Section Title]</h2>
      <p class="andara-text-lead">[Content]</p>
    </div>
  </section>
  
  <!-- Continue with more sections... -->
</main>
\`\`\`

## Response Guidelines
1. Use function calls to interact with the database
2. Always respect zone rules when creating/editing content
3. Provide clear, actionable responses
4. When creating pages, follow the cluster color schemes
5. For Zone 1: Keep it factual, water-treatment focused
6. For Zone 2: Educational, scientific, "may support" language
7. For Zone 3: Visionary but still no medical claims
8. ALWAYS generate ALL 4 blocks (metadata, visual-config, image-prompts, html) when asked about page content
9. Make HTML content comprehensive - at least 5-7 sections with real educational content
10. Image prompts should be detailed and specific to Andara's cosmic/scientific aesthetic`;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function getSummarizedContext(): Promise<string> {
  const [pages, clusters, documents] = await Promise.all([
    storage.getAllPages(),
    storage.getAllClusters(),
    storage.getAllDocuments(),
  ]);

  const clusterStats: Record<string, number> = {};
  pages.forEach(p => {
    const ck = p.clusterKey || "other";
    clusterStats[ck] = (clusterStats[ck] || 0) + 1;
  });

  const indexedDocs = documents.filter(d => d.status === 'indexed');

  const summary = [
    `SITE SUMMARY: ${pages.length} pages across ${clusters.length} clusters`,
    "",
    "CLUSTER COVERAGE:",
    ...Object.entries(clusterStats).map(([k, v]) => `  ${k}: ${v} pages`),
    "",
    "RECENT PAGES:",
    ...pages.slice(0, 10).map(p => `  ${p.path} - ${p.title} (${p.status})`),
    "",
    `DOCUMENT LIBRARY: ${documents.length} documents (${indexedDocs.length} indexed)`,
    "Use searchDocuments to find and getDocument to read content from:",
    ...documents.slice(0, 10).map(d => `  - "${d.title}" (${d.sourceType}, ${d.wordCount || 0} words)`),
  ];

  return summary.join("\n");
}

export async function chatWithFunctions(
  messages: ChatMessage[],
  onFunctionCall?: (name: string, result: any) => void,
  modelOverride?: string
): Promise<{ response: string; functionCalls: Array<{ name: string; result: any }> }> {
  const summarizedContext = await getSummarizedContext();

  const contents: any[] = [
    {
      role: "user",
      parts: [{ text: `SYSTEM:\n${BIGMIND_SYSTEM_PROMPT}\n\nCURRENT SITE:\n${summarizedContext}` }]
    },
    {
      role: "model",
      parts: [{ text: "I'm BigMind, your AI CMS Manager. I have full access to your Andara database and can create, edit, and organize content following the zone guidelines. What would you like me to help you with?" }]
    },
    ...messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }))
  ];

  const functionCalls: Array<{ name: string; result: any }> = [];
  let finalResponse = "";
  let iterations = 0;
  const maxIterations = 5;

  while (iterations < maxIterations) {
    iterations++;

    const { client, model: configuredModel } = await getAiClient();

    // Validate modelOverride: only use if its provider is available
    let model = configuredModel;
    if (modelOverride) {
      const overrideProvider = MODEL_PROVIDERS[modelOverride] || 'openai';
      const geminiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      const openaiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

      const isGeminiAvailable = !!geminiKey;
      const isOpenAIAvailable = !!openaiKey;

      if (overrideProvider === 'openai' && !isOpenAIAvailable) {
        console.log(`[BigMind] Model override ${modelOverride} requires OpenAI which is unavailable, using ${configuredModel}`);
        model = configuredModel;
      } else if (overrideProvider === 'gemini' && !isGeminiAvailable) {
        console.log(`[BigMind] Model override ${modelOverride} requires Gemini which is unavailable, using ${configuredModel}`);
        model = configuredModel;
      } else {
        model = modelOverride;
      }
    }

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

        console.log(`[BigMind] Calling function: ${fnName}`, fnArgs);

        const result = await executeCmsFunction(fnName, fnArgs as Record<string, any>);
        functionCalls.push({ name: fnName, result });

        if (onFunctionCall) {
          onFunctionCall(fnName, result);
        }

        contents.push({
          role: "model",
          parts: [{ functionCall: { name: fnName, args: fnArgs } }]
        });
        contents.push({
          role: "function",
          parts: [{
            functionResponse: {
              name: fnName,
              response: { result: JSON.stringify(result) }
            }
          }]
        });
      }

      if (part.text) {
        finalResponse = part.text;
      }
    }

    if (!hasFunctionCall) {
      break;
    }
  }

  return { response: finalResponse, functionCalls };
}

export async function streamChatWithFunctions(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
  onFunctionCall?: (name: string, result: any) => void
): Promise<{ functionCalls: Array<{ name: string; result: any }> }> {
  const result = await chatWithFunctions(messages, onFunctionCall);

  const words = result.response.split(" ");
  for (const word of words) {
    onChunk(word + " ");
    await new Promise(r => setTimeout(r, 20));
  }

  return { functionCalls: result.functionCalls };
}

export { CLUSTER_ONTOLOGY, ZONE_GUIDELINES };
