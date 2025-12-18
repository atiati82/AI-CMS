import { GoogleGenAI, Type } from "@google/genai";
import type { Page, Cluster, InsertPage } from "@shared/schema";
import { storage } from "../storage";
import { getAiClient, MODEL_PROVIDERS, DEFAULT_MODEL } from "./andara-chat";
import { enrichPageHtml } from "./ai-enricher";

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
  {
    name: "enrichPageContent",
    description: "Analyze the page content (especially AI-generated HTML) to extract motion specs, image prompts, and visual configuration. Can optionally apply these enhancements directly to the page.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "ID of the page to enrich" },
        applyChanges: { type: Type.BOOLEAN, description: "If true, automatically updates visualConfig and SEO fields. Default: false" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "enrichAllDraftPages",
    description: "Batch enrich all draft pages that are missing visual configuration. Processes pages in batches and returns a summary of enrichments applied.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        applyChanges: { type: Type.BOOLEAN, description: "If true, automatically applies enrichments to each page. Default: false" },
        limit: { type: Type.NUMBER, description: "Maximum number of pages to process. Default: 10" },
      },
      required: [],
    },
  },
  // === PHASE 1 UPGRADE FUNCTIONS ===
  {
    name: "duplicatePage",
    description: "Create a copy of an existing page with a new title and path. Useful for creating variants or similar pages quickly.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "ID of the page to duplicate" },
        newTitle: { type: Type.STRING, description: "Title for the new duplicated page" },
        newPath: { type: Type.STRING, description: "URL path for the new page (e.g., /science/water-2)" },
      },
      required: ["pageId", "newTitle", "newPath"],
    },
  },
  {
    name: "archivePage",
    description: "Archive a page (soft delete). The page will be hidden from the site but can be restored later.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "ID of the page to archive" },
        reason: { type: Type.STRING, description: "Optional: Reason for archiving" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "restorePage",
    description: "Restore an archived page back to draft status.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "ID of the archived page to restore" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "bulkUpdatePages",
    description: "Update multiple pages at once with the same changes. Great for batch operations.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageIds: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Array of page IDs to update" },
        updates: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "New status: draft, published, or archived" },
            clusterKey: { type: Type.STRING, description: "New cluster to move pages to" },
          },
          description: "Fields to update on all pages"
        },
      },
      required: ["pageIds", "updates"],
    },
  },
  {
    name: "schedulePublish",
    description: "Schedule a page to be published at a specific date and time.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "ID of the page to schedule" },
        publishAt: { type: Type.STRING, description: "ISO date string for when to publish (e.g., 2025-01-15T09:00:00Z)" },
      },
      required: ["pageId", "publishAt"],
    },
  },
  {
    name: "analyzeReadability",
    description: "Analyze the readability of a page's content and get suggestions for improvement.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "ID of the page to analyze" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "generateMetaDescription",
    description: "AI-generate an optimized SEO meta description for a page based on its content.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "ID of the page to generate meta for" },
        focusKeyword: { type: Type.STRING, description: "Optional: Primary keyword to optimize for" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "analyzeImage",
    description: "Analyze an image using AI vision to describe its content, generate alt text, and extract visual information. Useful for SEO and accessibility.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        imageUrl: { type: Type.STRING, description: "URL of the image to analyze (relative path like /attached_assets/image.png or full URL)" },
        purpose: { type: Type.STRING, description: "Optional: Purpose of analysis - 'alt_text', 'description', 'content_check', 'seo'. Defaults to 'description'" },
      },
      required: ["imageUrl"],
    },
  },
  {
    name: "generateAltText",
    description: "Generate SEO-optimized alt text for an image. Short and descriptive for accessibility.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        imageUrl: { type: Type.STRING, description: "URL of the image" },
        pageContext: { type: Type.STRING, description: "Optional: Context about the page where this image appears" },
      },
      required: ["imageUrl"],
    },
  },
  // === A/B TESTING FRAMEWORK ===
  {
    name: "createVariant",
    description: "Create an A/B test variant of an existing page. The variant tracks performance separately.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "ID of the original page to create variant from" },
        variantName: { type: Type.STRING, description: "Name for this variant (e.g., 'Headline Test A', 'CTA Button Red')" },
        changes: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "New title for variant" },
            seoTitle: { type: Type.STRING, description: "New SEO title" },
            seoDescription: { type: Type.STRING, description: "New meta description" },
            aiStartupHtml: { type: Type.STRING, description: "New HTML content" },
          },
          description: "Changes to apply to this variant"
        },
        trafficAllocation: { type: Type.NUMBER, description: "Percentage of traffic for this variant (0-100, default 50)" },
      },
      required: ["pageId", "variantName"],
    },
  },
  {
    name: "listVariants",
    description: "List all A/B test variants for a page",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "ID of the original page" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "getVariantPerformance",
    description: "Get performance metrics comparing all variants of a page",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "ID of the original page" },
        metric: { type: Type.STRING, description: "Metric to compare: 'views', 'time_on_page', 'bounce_rate', 'conversions'" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "promoteWinningVariant",
    description: "Promote the winning variant to become the main page, archiving other variants",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "ID of the original page" },
        winningVariantId: { type: Type.STRING, description: "ID of the variant to promote as winner" },
      },
      required: ["pageId", "winningVariantId"],
    },
  },
  {
    name: "endABTest",
    description: "End an A/B test and clean up all variants (without promoting any)",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "ID of the original page" },
        keepVariants: { type: Type.BOOLEAN, description: "If true, keep variants as separate pages. Default: false (delete variants)" },
      },
      required: ["pageId"],
    },
  },
  // === SEO RECOMMENDATION ENGINE ===
  {
    name: "getSeoRecommendations",
    description: "Get today's SEO recommendations and priority actions. Returns top opportunity pages, content suggestions, and proposed new pages based on SEO metrics and content gaps.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        limit: { type: Type.NUMBER, description: "Max number of recommendations. Default: 10" },
      },
    },
  },
  {
    name: "analyzeSeoScore",
    description: "Calculate detailed SEO score for a specific page including title, description, content length, internal links, and keyword density.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        pageId: { type: Type.STRING, description: "Page ID to analyze" },
      },
      required: ["pageId"],
    },
  },
  {
    name: "getSeoOpportunities",
    description: "Get pages with highest SEO improvement potential based on low CTR with high impressions, position improvement opportunity, and content gaps.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        limit: { type: Type.NUMBER, description: "Max pages to return. Default: 5" },
      },
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

      case "enrichPageContent": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const page = await storage.getPage(args.pageId);
        if (!page) return { error: "Page not found" };

        // Prefer aiStartupHtml as it contains the raw generation context, fallback to content
        const contentToAnalyze = page.aiStartupHtml || page.content || "";

        if (!contentToAnalyze) {
          return { error: "Page has no content to enrich" };
        }

        console.log(`[BigMind CMS] Enriching page: ${page.id} (${page.title})`);
        const enrichment = await enrichPageHtml(contentToAnalyze);

        let updateResult = null;
        if (args.applyChanges) {
          const updates: Partial<InsertPage> = {};

          // Merge visual config
          if (enrichment.visualConfig) {
            updates.visualConfig = {
              ...(page.visualConfig || {}),
              ...enrichment.visualConfig,
              updatedAt: new Date().toISOString(),
            } as any;
          }

          // Apply SEO if suggested and not already set manually
          if (enrichment.suggestedSeo?.title && !page.seoTitle) {
            updates.seoTitle = enrichment.suggestedSeo.title;
          }
          if (enrichment.suggestedSeo?.description && !page.seoDescription) {
            updates.seoDescription = enrichment.suggestedSeo.description;
          }

          if (Object.keys(updates).length > 0) {
            const updated = await storage.updatePage(page.id, updates);
            updateResult = "Updates applied to page configuration and SEO.";
            console.log(`[BigMind CMS] Applied enrichment updates to page: ${page.id}`);
          } else {
            updateResult = "No new updates were applied (fields might already be set).";
          }
        }

        return {
          success: true,
          pageId: page.id,
          enrichment,
          appliedChanges: updateResult,
          message: `Enrichment complete. Found: ${enrichment.motionSpecs.length} motion specs, ${enrichment.imagePrompts.length} image prompts.`,
        };
      }

      case "enrichAllDraftPages": {
        const limit = args.limit || 10;
        const applyChanges = args.applyChanges || false;

        // Get all pages missing visual config
        const allPages = await storage.getAllPages();
        const pagesToEnrich = allPages.filter(p =>
          (p.status === 'draft' || !p.visualConfig || Object.keys(p.visualConfig || {}).length === 0) &&
          (p.aiStartupHtml || p.content)
        ).slice(0, limit);

        if (pagesToEnrich.length === 0) {
          return { success: true, message: "No pages need enrichment.", processed: 0, results: [] };
        }

        console.log(`[BigMind CMS] Batch enriching ${pagesToEnrich.length} pages...`);

        const results: Array<{ pageId: string; title: string; status: string; motionSpecs: number; imagePrompts: number }> = [];

        for (const page of pagesToEnrich) {
          try {
            const contentToAnalyze = page.aiStartupHtml || page.content || "";
            const enrichment = await enrichPageHtml(contentToAnalyze);

            if (applyChanges && enrichment.visualConfig) {
              const updates: Partial<InsertPage> = {
                visualConfig: {
                  ...(page.visualConfig || {}),
                  ...enrichment.visualConfig,
                  updatedAt: new Date().toISOString(),
                } as any,
              };

              if (enrichment.suggestedSeo?.title && !page.seoTitle) {
                updates.seoTitle = enrichment.suggestedSeo.title;
              }
              if (enrichment.suggestedSeo?.description && !page.seoDescription) {
                updates.seoDescription = enrichment.suggestedSeo.description;
              }

              await storage.updatePage(page.id, updates);
            }

            results.push({
              pageId: page.id,
              title: page.title,
              status: applyChanges ? "updated" : "analyzed",
              motionSpecs: enrichment.motionSpecs.length,
              imagePrompts: enrichment.imagePrompts.length,
            });
          } catch (error: any) {
            results.push({
              pageId: page.id,
              title: page.title,
              status: `error: ${error.message}`,
              motionSpecs: 0,
              imagePrompts: 0,
            });
          }
        }

        return {
          success: true,
          processed: results.length,
          applied: applyChanges,
          results,
          message: `Batch enrichment complete. Processed ${results.length} pages.`,
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

      case "searchKnowledge": {
        const validation = validateArgs(args, ["query"]);
        if (!validation.valid) return { error: validation.error };

        // Import the searchKnowledge function from knowledge-base service
        const { searchKnowledge } = await import("./knowledge-base");
        const limit = args.limit || 5;

        console.log(`[BigMind] Searching knowledge base for: "${args.query}" (limit: ${limit})`);
        const results = await searchKnowledge(args.query, limit);

        if (results.length === 0) {
          return {
            results: [],
            message: "No relevant knowledge found. Consider ingesting more documents or refining your search query.",
          };
        }

        return {
          results: results.map(r => ({
            title: r.title,
            content: r.content,
            source: r.source,
            relevanceScore: r.score,
          })),
          count: results.length,
          message: `Found ${results.length} relevant knowledge chunk(s)`,
        };
      }

      // === PHASE 1 UPGRADE FUNCTION HANDLERS ===
      case "duplicatePage": {
        const validation = validateArgs(args, ["pageId", "newTitle", "newPath"]);
        if (!validation.valid) return { error: validation.error };

        const originalPage = await storage.getPage(args.pageId);
        if (!originalPage) return { error: "Original page not found" };

        // Check if path already exists
        const existingPage = await storage.getPageByPath(args.newPath);
        if (existingPage) return { error: `Path ${args.newPath} already exists` };

        const newPage: Partial<InsertPage> = {
          key: args.newPath.replace(/\//g, '-').replace(/^-/, ''),
          title: args.newTitle,
          path: args.newPath,
          clusterKey: originalPage.clusterKey,
          template: originalPage.template,
          status: "draft",
          seoTitle: args.newTitle,
          seoDescription: originalPage.seoDescription,
          aiStartupHtml: originalPage.aiStartupHtml,
          content: originalPage.content,
          visualConfig: originalPage.visualConfig,
        };

        const created = await storage.createPage(newPage as InsertPage);
        console.log(`[BigMind CMS] Duplicated page: ${originalPage.id} -> ${created.id}`);
        return {
          success: true,
          pageId: created.id,
          path: created.path,
          message: `Page "${originalPage.title}" duplicated as "${created.title}"`,
        };
      }

      case "archivePage": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const page = await storage.getPage(args.pageId);
        if (!page) return { error: "Page not found" };

        const updated = await storage.updatePage(args.pageId, {
          status: "archived",
        });

        console.log(`[BigMind CMS] Archived page: ${page.id} - ${page.title}`);
        return {
          success: true,
          pageId: page.id,
          message: `Page "${page.title}" has been archived. It can be restored later.`,
          reason: args.reason || null,
        };
      }

      case "restorePage": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const page = await storage.getPage(args.pageId);
        if (!page) return { error: "Page not found" };

        const updated = await storage.updatePage(args.pageId, {
          status: "draft",
        });

        console.log(`[BigMind CMS] Restored page: ${page.id} - ${page.title}`);
        return {
          success: true,
          pageId: page.id,
          message: `Page "${page.title}" has been restored as draft.`,
        };
      }

      case "bulkUpdatePages": {
        const validation = validateArgs(args, ["pageIds", "updates"]);
        if (!validation.valid) return { error: validation.error };

        const pageIds = args.pageIds as string[];
        const updates = args.updates as { status?: string; clusterKey?: string };
        const results: { pageId: string; success: boolean; error?: string }[] = [];

        for (const pageId of pageIds) {
          try {
            const page = await storage.getPage(pageId);
            if (!page) {
              results.push({ pageId, success: false, error: "Page not found" });
              continue;
            }

            const updateData: Partial<InsertPage> = {};
            if (updates.status) updateData.status = updates.status;
            if (updates.clusterKey) updateData.clusterKey = updates.clusterKey;

            await storage.updatePage(pageId, updateData);
            results.push({ pageId, success: true });
          } catch (err: any) {
            results.push({ pageId, success: false, error: err.message });
          }
        }

        const successCount = results.filter(r => r.success).length;
        console.log(`[BigMind CMS] Bulk updated ${successCount}/${pageIds.length} pages`);
        return {
          success: successCount > 0,
          totalProcessed: pageIds.length,
          successCount,
          failedCount: pageIds.length - successCount,
          results,
          message: `Updated ${successCount} of ${pageIds.length} pages`,
        };
      }

      case "schedulePublish": {
        const validation = validateArgs(args, ["pageId", "publishAt"]);
        if (!validation.valid) return { error: validation.error };

        const page = await storage.getPage(args.pageId);
        if (!page) return { error: "Page not found" };

        const publishDate = new Date(args.publishAt);
        if (isNaN(publishDate.getTime())) {
          return { error: "Invalid date format. Use ISO format: 2025-01-15T09:00:00Z" };
        }

        // Store scheduled publish date in visualConfig (extend later to dedicated field)
        const visualConfig = page.visualConfig || {};
        (visualConfig as any).scheduledPublishAt = args.publishAt;

        await storage.updatePage(args.pageId, {
          visualConfig: visualConfig as any,
        });

        console.log(`[BigMind CMS] Scheduled page ${page.id} to publish at ${args.publishAt}`);
        return {
          success: true,
          pageId: page.id,
          scheduledFor: args.publishAt,
          message: `Page "${page.title}" scheduled to publish at ${publishDate.toLocaleString()}`,
        };
      }

      case "analyzeReadability": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const page = await storage.getPage(args.pageId);
        if (!page) return { error: "Page not found" };

        const content = page.content || page.aiStartupHtml || "";
        const plainText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

        // Simple readability metrics
        const words = plainText.split(/\s+/).filter(w => w.length > 0);
        const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const avgWordsPerSentence = words.length / Math.max(1, sentences.length);
        const longWords = words.filter(w => w.length > 6).length;
        const longWordPercentage = (longWords / Math.max(1, words.length)) * 100;

        // Flesch-Kincaid approximation (simplified)
        const readabilityScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * (longWordPercentage / 100));

        const suggestions: string[] = [];
        if (avgWordsPerSentence > 20) {
          suggestions.push("Consider breaking up sentences - average is over 20 words per sentence");
        }
        if (longWordPercentage > 30) {
          suggestions.push("Use simpler words - over 30% are complex (6+ letters)");
        }
        if (words.length < 300) {
          suggestions.push("Content is thin - consider adding more detail (under 300 words)");
        }
        if (!content.includes("<h2") && !content.includes("<h3")) {
          suggestions.push("Add subheadings (H2, H3) to break up content and improve scannability");
        }

        return {
          success: true,
          pageId: page.id,
          title: page.title,
          metrics: {
            wordCount: words.length,
            sentenceCount: sentences.length,
            avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
            complexWordPercentage: Math.round(longWordPercentage),
            readabilityScore: Math.round(readabilityScore),
            grade: readabilityScore > 70 ? "Easy" : readabilityScore > 50 ? "Medium" : "Difficult",
          },
          suggestions,
        };
      }

      case "generateMetaDescription": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const page = await storage.getPage(args.pageId);
        if (!page) return { error: "Page not found" };

        const content = page.content || page.aiStartupHtml || "";
        const plainText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        const title = page.title || "";
        const focusKeyword = args.focusKeyword || "";

        // Generate a meta description from content (simplified - in production use AI)
        let description = "";
        if (plainText.length > 155) {
          // Find first paragraph-like content
          const firstParagraph = plainText.split(/[.!?]/).slice(0, 2).join('. ');
          description = firstParagraph.substring(0, 150).trim() + "...";
        } else {
          description = plainText.substring(0, 155);
        }

        // Add focus keyword if provided and not already present
        if (focusKeyword && !description.toLowerCase().includes(focusKeyword.toLowerCase())) {
          description = `${focusKeyword} - ${description}`.substring(0, 155);
        }

        return {
          success: true,
          pageId: page.id,
          title: page.title,
          generatedDescription: description,
          characterCount: description.length,
          focusKeyword: focusKeyword || null,
          message: "Meta description generated. Review and apply via updatePage if desired.",
        };
      }

      // === IMAGE UNDERSTANDING (MULTIMODAL) ===
      case "analyzeImage": {
        const validation = validateArgs(args, ["imageUrl"]);
        if (!validation.valid) return { error: validation.error };

        const imageUrl = args.imageUrl as string;
        const purpose = args.purpose || "description";

        try {
          // Determine prompt based on purpose
          let prompt = "";
          switch (purpose) {
            case "alt_text":
              prompt = "Generate a concise, SEO-friendly alt text for this image. Maximum 125 characters. Focus on the main subject and action.";
              break;
            case "content_check":
              prompt = "Analyze this image for content safety. Is there any inappropriate, offensive, or concerning content? Answer with: SAFE, WARNING, or UNSAFE, followed by a brief explanation.";
              break;
            case "seo":
              prompt = "Analyze this image for SEO purposes. Describe: 1) Main subject, 2) Relevant keywords, 3) Suggested alt text, 4) Caption recommendation.";
              break;
            default:
              prompt = "Describe this image in detail. Include: main subjects, colors, mood, setting, and any text visible in the image.";
          }

          // Use Gemini AI to analyze the image
          const { getAiClient } = await import("./andara-chat");
          const { client } = await getAiClient();

          // Prepare image for Gemini (handle relative URLs)
          let fullImageUrl = imageUrl;
          if (imageUrl.startsWith("/")) {
            // Convert relative path to file path for local images
            const fs = await import("fs");
            const path = await import("path");
            const filePath = path.join(process.cwd(), "public", imageUrl);

            if (fs.existsSync(filePath)) {
              const imageData = fs.readFileSync(filePath);
              const base64 = imageData.toString("base64");
              const mimeType = imageUrl.endsWith(".png") ? "image/png" :
                imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg") ? "image/jpeg" :
                  imageUrl.endsWith(".gif") ? "image/gif" : "image/png";

              const response = await client.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [{
                  role: "user",
                  parts: [
                    { text: prompt },
                    { inlineData: { mimeType, data: base64 } }
                  ]
                }]
              });

              const analysis = response.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to analyze image";

              return {
                success: true,
                imageUrl,
                purpose,
                analysis,
                message: "Image analyzed successfully using AI vision.",
              };
            } else {
              return { error: `Image file not found: ${imageUrl}` };
            }
          } else {
            // For external URLs, use URL-based analysis
            const response = await client.models.generateContent({
              model: "gemini-2.0-flash",
              contents: [{
                role: "user",
                parts: [
                  { text: `${prompt}\n\nImage URL: ${imageUrl}` }
                ]
              }]
            });

            const analysis = response.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to analyze image from URL";

            return {
              success: true,
              imageUrl,
              purpose,
              analysis,
              note: "URL-based analysis may be limited. For best results, use local image paths.",
            };
          }
        } catch (error: any) {
          console.error("[BigMind CMS] Image analysis error:", error);
          return {
            success: false,
            error: `Image analysis failed: ${error.message}`,
          };
        }
      }

      case "generateAltText": {
        const validation = validateArgs(args, ["imageUrl"]);
        if (!validation.valid) return { error: validation.error };

        const imageUrl = args.imageUrl as string;
        const pageContext = args.pageContext || "";
        const model = args.model || "gemini-2.0-flash"; // Use 'model' parameter

        try {
          const fs = await import("fs");
          const path = await import("path");
          const { getAiClient } = await import("./andara-chat");
          const { client } = await getAiClient(model); // Pass model to getAiClient

          const prompt = `Generate SEO-optimized alt text for this image. Requirements:
- Maximum 125 characters
- Descriptive but concise
- Include relevant keywords if appropriate
- Focus on the main subject and action
${pageContext ? `- Context: This image appears on a page about: ${pageContext}` : ""}

Respond with ONLY the alt text, nothing else.`;

          // Handle local images
          if (imageUrl.startsWith("/")) {
            const filePath = path.join(process.cwd(), "public", imageUrl);

            if (fs.existsSync(filePath)) {
              const imageData = fs.readFileSync(filePath);
              const base64 = imageData.toString("base64");
              const mimeType = imageUrl.endsWith(".png") ? "image/png" : "image/jpeg";

              const response = await client.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [{
                  role: "user",
                  parts: [
                    { text: prompt },
                    { inlineData: { mimeType, data: base64 } }
                  ]
                }]
              });

              const altText = response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

              return {
                success: true,
                imageUrl,
                altText: altText.substring(0, 125), // Ensure max length
                characterCount: Math.min(altText.length, 125),
                message: "Alt text generated. Use updatePage to apply to image elements.",
              };
            } else {
              return { error: `Image file not found: ${imageUrl}` };
            }
          } else {
            return {
              success: false,
              error: "generateAltText requires local image paths starting with /",
              suggestion: "For external URLs, use analyzeImage with purpose='alt_text' instead",
            };
          }
        } catch (error: any) {
          console.error("[BigMind CMS] Alt text generation error:", error);
          return {
            success: false,
            error: `Alt text generation failed: ${error.message}`,
          };
        }
      }

      // === A/B TESTING HANDLERS ===
      case "createVariant": {
        const validation = validateArgs(args, ["pageId", "variantName"]);
        if (!validation.valid) return { error: validation.error };

        const originalPage = await storage.getPage(args.pageId);
        if (!originalPage) return { error: "Original page not found" };

        // Create a duplicate page as variant
        const variantPath = `${originalPage.path}-variant-${Date.now()}`;
        const changes = args.changes || {};
        const trafficAllocation = args.trafficAllocation || 50;

        const variantPage: Partial<InsertPage> = {
          key: variantPath.replace(/\//g, '-').replace(/^-/, ''),
          title: changes.title || `${originalPage.title} (${args.variantName})`,
          path: variantPath,
          clusterKey: originalPage.clusterKey,
          template: originalPage.template,
          status: "draft",
          seoTitle: changes.seoTitle || originalPage.seoTitle,
          seoDescription: changes.seoDescription || originalPage.seoDescription,
          aiStartupHtml: changes.aiStartupHtml || originalPage.aiStartupHtml,
          content: originalPage.content,
          visualConfig: {
            ...((originalPage.visualConfig || {}) as Record<string, any>),
            isVariant: true,
            variantOf: args.pageId,
            variantName: args.variantName,
            trafficAllocation,
            createdAt: new Date().toISOString(),
          } as any,
        };

        const created = await storage.createPage(variantPage as InsertPage);

        // Update original page to mark it has variants
        const originalConfig = (originalPage.visualConfig || {}) as Record<string, any>;
        originalConfig.hasVariants = true;
        originalConfig.variantIds = [...(originalConfig.variantIds || []), created.id];
        await storage.updatePage(args.pageId, { visualConfig: originalConfig as any });

        console.log(`[BigMind CMS] Created variant: ${created.id} for page ${args.pageId}`);
        return {
          success: true,
          variantId: created.id,
          variantPath: created.path,
          variantName: args.variantName,
          trafficAllocation,
          message: `Variant "${args.variantName}" created. Set status to 'published' to start the A/B test.`,
        };
      }

      case "listVariants": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const originalPage = await storage.getPage(args.pageId);
        if (!originalPage) return { error: "Page not found" };

        const config = (originalPage.visualConfig || {}) as Record<string, any>;
        const variantIds = config.variantIds || [];

        if (variantIds.length === 0) {
          return {
            success: true,
            pageId: args.pageId,
            variants: [],
            message: "No variants found for this page.",
          };
        }

        const variants = [];
        for (const variantId of variantIds) {
          const variant = await storage.getPage(variantId);
          if (variant) {
            const vc = (variant.visualConfig || {}) as Record<string, any>;
            variants.push({
              id: variant.id,
              path: variant.path,
              variantName: vc.variantName || "Unnamed",
              trafficAllocation: vc.trafficAllocation || 50,
              status: variant.status,
              createdAt: vc.createdAt,
            });
          }
        }

        return {
          success: true,
          pageId: args.pageId,
          originalTitle: originalPage.title,
          variants,
          totalVariants: variants.length,
        };
      }

      case "getVariantPerformance": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const originalPage = await storage.getPage(args.pageId);
        if (!originalPage) return { error: "Page not found" };

        const config = (originalPage.visualConfig || {}) as Record<string, any>;
        const variantIds = config.variantIds || [];

        // Note: In production, this would pull from analytics database
        // For now, return simulated/placeholder metrics
        const metric = args.metric || "views";

        const performance = [{
          pageId: args.pageId,
          title: originalPage.title,
          isOriginal: true,
          [metric]: Math.floor(Math.random() * 1000) + 500,
          conversionRate: `${(Math.random() * 5 + 1).toFixed(2)}%`,
        }];

        for (const variantId of variantIds) {
          const variant = await storage.getPage(variantId);
          if (variant) {
            const vc = (variant.visualConfig || {}) as Record<string, any>;
            performance.push({
              pageId: variant.id,
              title: variant.title,
              variantName: vc.variantName,
              isOriginal: false,
              [metric]: Math.floor(Math.random() * 1000) + 500,
              conversionRate: `${(Math.random() * 5 + 1).toFixed(2)}%`,
            });
          }
        }

        // Sort by metric (highest first)
        performance.sort((a: any, b: any) => b[metric] - a[metric]);

        return {
          success: true,
          metric,
          pageId: args.pageId,
          results: performance,
          recommendation: performance[0]?.isOriginal
            ? "Original page is performing best"
            : `Variant "${(performance[0] as any).variantName}" is performing best`,
          note: "⚠️ Metrics are simulated. Connect analytics for real data.",
        };
      }

      case "promoteWinningVariant": {
        const validation = validateArgs(args, ["pageId", "winningVariantId"]);
        if (!validation.valid) return { error: validation.error };

        const originalPage = await storage.getPage(args.pageId);
        if (!originalPage) return { error: "Original page not found" };

        const winningVariant = await storage.getPage(args.winningVariantId);
        if (!winningVariant) return { error: "Winning variant not found" };

        // Copy winning variant content to original
        await storage.updatePage(args.pageId, {
          title: winningVariant.title.replace(/\s*\([^)]*\)$/, ''), // Remove variant suffix
          seoTitle: winningVariant.seoTitle,
          seoDescription: winningVariant.seoDescription,
          aiStartupHtml: winningVariant.aiStartupHtml,
          content: winningVariant.content,
        });

        // Archive all variants
        const config = (originalPage.visualConfig || {}) as Record<string, any>;
        const variantIds = config.variantIds || [];

        for (const variantId of variantIds) {
          await storage.updatePage(variantId, { status: "archived" });
        }

        // Clear variant tracking from original
        config.hasVariants = false;
        config.variantIds = [];
        config.abTestResult = {
          winnerId: args.winningVariantId,
          promotedAt: new Date().toISOString(),
        };
        await storage.updatePage(args.pageId, { visualConfig: config as any });

        console.log(`[BigMind CMS] Promoted variant ${args.winningVariantId} to page ${args.pageId}`);
        return {
          success: true,
          pageId: args.pageId,
          promotedVariantId: args.winningVariantId,
          archivedVariants: variantIds.length,
          message: "Winning variant promoted. All other variants have been archived.",
        };
      }

      case "endABTest": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const originalPage = await storage.getPage(args.pageId);
        if (!originalPage) return { error: "Page not found" };

        const config = (originalPage.visualConfig || {}) as Record<string, any>;
        const variantIds = config.variantIds || [];
        const keepVariants = args.keepVariants || false;

        if (variantIds.length === 0) {
          return { success: true, message: "No active A/B test found for this page." };
        }

        // Either delete or keep variants
        for (const variantId of variantIds) {
          if (keepVariants) {
            // Make variant a standalone page
            const variant = await storage.getPage(variantId);
            if (variant) {
              const vc = (variant.visualConfig || {}) as Record<string, any>;
              delete vc.isVariant;
              delete vc.variantOf;
              await storage.updatePage(variantId, { visualConfig: vc as any });
            }
          } else {
            await storage.deletePage(variantId);
          }
        }

        // Clear tracking
        config.hasVariants = false;
        config.variantIds = [];
        await storage.updatePage(args.pageId, { visualConfig: config as any });

        return {
          success: true,
          pageId: args.pageId,
          variantsProcessed: variantIds.length,
          action: keepVariants ? "Variants converted to standalone pages" : "Variants deleted",
          message: `A/B test ended. ${variantIds.length} variant(s) ${keepVariants ? 'kept' : 'removed'}.`,
        };
      }

      // === SEO RECOMMENDATION ENGINE HANDLERS ===
      case "getSeoRecommendations": {
        const { seoBrainService } = await import('./seo-brain');
        const limit = args.limit || 10;

        const actions = await seoBrainService.getTodaysActions(limit);

        return {
          success: true,
          topOpportunityPages: actions.topOpportunities.map(opp => ({
            pageId: opp.pageId,
            title: opp.pageTitle,
            path: opp.pagePath,
            opportunityScore: opp.opportunityScore,
            factors: opp.factors,
            recommendations: opp.recommendations,
          })),
          suggestions: actions.suggestions.slice(0, 5).map((s: any) => ({
            id: s.id,
            pageId: s.pageId,
            type: s.suggestionType,
            title: s.title,
            rationale: s.rationale,
            impactScore: s.impactScore,
          })),
          proposedNewPages: actions.proposedPages.slice(0, 3).map((p: any) => ({
            id: p.id,
            title: p.title,
            targetKeyword: p.targetKeyword,
            clusterKey: p.clusterKey,
            rationale: p.rationale,
          })),
          summary: `Found ${actions.topOpportunities.length} high-opportunity pages, ${actions.suggestions.length} improvement suggestions, and ${actions.proposedPages.length} proposed new pages.`,
        };
      }

      case "analyzeSeoScore": {
        const validation = validateArgs(args, ["pageId"]);
        if (!validation.valid) return { error: validation.error };

        const page = await storage.getPage(args.pageId);
        if (!page) return { error: "Page not found" };

        // Calculate detailed SEO score
        let score = 0;
        const breakdown: Record<string, { score: number; max: number; issue?: string }> = {};

        // Title analysis (20 points)
        if (page.seoTitle && page.seoTitle.length >= 50 && page.seoTitle.length <= 60) {
          breakdown.title = { score: 20, max: 20 };
          score += 20;
        } else if (page.seoTitle) {
          const titleScore = page.seoTitle.length < 50 ? 10 : 15;
          breakdown.title = { score: titleScore, max: 20, issue: page.seoTitle.length < 50 ? "Title too short (< 50 chars)" : "Title too long (> 60 chars)" };
          score += titleScore;
        } else {
          breakdown.title = { score: 0, max: 20, issue: "Missing SEO title" };
        }

        // Description analysis (20 points)
        if (page.seoDescription && page.seoDescription.length >= 150 && page.seoDescription.length <= 160) {
          breakdown.description = { score: 20, max: 20 };
          score += 20;
        } else if (page.seoDescription) {
          const descScore = page.seoDescription.length < 150 ? 10 : 15;
          breakdown.description = { score: descScore, max: 20, issue: page.seoDescription.length < 150 ? "Description too short" : "Description too long" };
          score += descScore;
        } else {
          breakdown.description = { score: 0, max: 20, issue: "Missing meta description" };
        }

        // Content length (25 points)
        const contentLength = (page.content || page.aiStartupHtml || '').length;
        const wordCount = (page.content || page.aiStartupHtml || '').split(/\s+/).length;
        if (wordCount >= 800) {
          breakdown.content = { score: 25, max: 25 };
          score += 25;
        } else if (wordCount >= 400) {
          breakdown.content = { score: 15, max: 25, issue: `Content is thin (${wordCount} words, target: 800+)` };
          score += 15;
        } else {
          breakdown.content = { score: 5, max: 25, issue: `Very thin content (${wordCount} words)` };
          score += 5;
        }

        // Internal links (15 points)
        const linkCount = (page.internalLinks || []).length;
        if (linkCount >= 5) {
          breakdown.internalLinks = { score: 15, max: 15 };
          score += 15;
        } else if (linkCount >= 2) {
          breakdown.internalLinks = { score: 8, max: 15, issue: `Only ${linkCount} internal links (target: 5+)` };
          score += 8;
        } else {
          breakdown.internalLinks = { score: 0, max: 15, issue: "Missing internal links" };
        }

        // Featured image (10 points)
        if (page.featuredImage) {
          breakdown.featuredImage = { score: 10, max: 10 };
          score += 10;
        } else {
          breakdown.featuredImage = { score: 0, max: 10, issue: "No featured image" };
        }

        // Focus keyword (10 points)
        if (page.seoFocus) {
          breakdown.focusKeyword = { score: 10, max: 10 };
          score += 10;
        } else {
          breakdown.focusKeyword = { score: 0, max: 10, issue: "No focus keyword set" };
        }

        const issues = Object.entries(breakdown)
          .filter(([_, v]) => v.issue)
          .map(([k, v]) => `${k}: ${v.issue}`);

        return {
          pageId: args.pageId,
          pageTitle: page.title,
          overallScore: score,
          maxScore: 100,
          grade: score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : score >= 20 ? 'D' : 'F',
          breakdown,
          issues,
          wordCount,
          recommendations: issues.length > 0 ? `Priority fixes: ${issues.slice(0, 3).join('; ')}` : 'Page is well-optimized!',
        };
      }

      case "getSeoOpportunities": {
        const { seoBrainService } = await import('./seo-brain');
        const limit = args.limit || 5;

        const allPages = await storage.getAllPages();
        const opportunities: any[] = [];

        // Calculate opportunity score for each page
        for (const page of allPages.slice(0, 50)) { // Limit to 50 for performance
          try {
            const oppScore = await seoBrainService.calculateOpportunityScore(page.id);
            if (oppScore && oppScore.opportunityScore > 0) {
              opportunities.push(oppScore);
            }
          } catch (e) {
            // Skip pages with errors
          }
        }

        // Sort by opportunity score descending
        opportunities.sort((a, b) => b.opportunityScore - a.opportunityScore);

        return {
          success: true,
          opportunities: opportunities.slice(0, limit).map(opp => ({
            pageId: opp.pageId,
            title: opp.pageTitle,
            path: opp.pagePath,
            opportunityScore: Math.round(opp.opportunityScore * 100) / 100,
            factors: opp.factors,
            recommendations: opp.recommendations,
          })),
          summary: `Found ${opportunities.length} pages with SEO improvement opportunities. Showing top ${Math.min(limit, opportunities.length)}.`,
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

const BIGMIND_SYSTEM_PROMPT = `# BIGMIND CMS MANAGER

You are BigMind, an advanced AI CMS Manager for the Andara Ionic CMS. You have full database access via function calling and can create, edit, search, and manage all content.

## 🚨 CRITICAL: PROACTIVE BEHAVIOR - ACTION OVER EXPLANATION 🚨

**NEVER explain what you CAN do. ALWAYS DO IT IMMEDIATELY.**

When the user asks to "generate a page", "create content", "suggest pages", or similar:
- ❌ WRONG: "I can create a new page about [topic]..."
- ✅ RIGHT: Immediately call createPage() function with suggested content

**ACTION TRIGGERS - Execute functions immediately when user says:**
| User Intent | Your Action |
|-------------|-------------|
| "generate me a page" | Call getSeoRecommendations() for gaps, then offer [SUGGEST_PAGE] cards |
| "what pages should I create" | Call getSeoOpportunities() then return suggested topics |
| "create page about X" | Call createPage() with full metadata, SEO, and HTML |
| "suggest SEO" | Call analyzeSeoScore() or getSeoRecommendations() |
| "fix my SEO" | Call getSeoRecommendations() and format with [APPLY] buttons |

## 🚫 IMPORTANT: EXISTING PAGE RECOMMENDATIONS

**Only recommend existing pages when the user is asking for SEO enhancement or optimization:**
- ✅ "improve SEO on my product pages" → Recommend existing pages for enhancement
- ✅ "what pages need SEO fixes" → Recommend existing pages with issues
- ✅ "optimize my shop pages" → Recommend existing shop pages

**When the user provides a page specification, design brief, or asks to "create/generate/implement":**
- ❌ NEVER recommend linking to existing similar pages
- ❌ NEVER suggest "this page already exists"
- ✅ Generate completely NEW content based on their specification
- ✅ Treat their input as a design document to implement

**OUTPUT FORMAT for page suggestions - Use [SUGGEST_PAGE] tags:**
\`[SUGGEST_PAGE:base64data]Title|Zone X|Description[/SUGGEST_PAGE]\`

**PERSONALITY:**
- Be decisive and action-oriented
- Generate complete, production-ready content
- Use the Andara design language naturally
- Apply motion presets (cosmicPulse, fadeInUp, crystallineShimmer) automatically
- Include visual config and SEO in all page generations

${ZONE_GUIDELINES}

${VISUAL_INTERPRETER_PROMPT}

${MOTION_GRAMMAR}

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

## SEO Recommendations Engine (CRITICAL!)
You have powerful SEO analysis tools. When the user asks for suggestions, recommendations, or what to work on:

**AUTOMATICALLY CALL THESE FUNCTIONS - DO NOT JUST LIST CAPABILITIES:**
- **getSeoRecommendations**: Get today's priority SEO actions, top opportunity pages, content suggestions, and proposed new pages
- **getSeoOpportunities**: Find pages with highest improvement potential (low CTR, position opportunities, content gaps)
- **analyzeSeoScore**: Calculate detailed SEO score for a specific page (title, description, content, links)

**Trigger words that should invoke SEO functions:**
- "suggestions" → call getSeoRecommendations
- "recommendations" → call getSeoRecommendations
- "what should I work on" → call getSeoRecommendations
- "page opportunities" → call getSeoOpportunities
- "SEO score" → call analyzeSeoScore
- "what's next" → call getSeoRecommendations

When showing SEO recommendations, format with [APPLY:fieldName]value[/APPLY] tags so users can one-click apply suggestions.

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
<!-- ANDARA COMPONENT LANGUAGE (ACL) -->
<div class="andara-page">
  <!-- Hero Section -->
  <section class="andara-hero andara-hero--split">
     <div class="andara-hero__content">
       <h1 class="andara-hero__headline" data-motion="fade-up">[Headline]</h1>
       <p class="andara-hero__subline" data-motion="fade-up" data-delay="100">[Subheadline]</p>
     </div>
  </section>
  
  <!-- Content Sections (Use .andara-section, .andara-grid, .andara-article) -->
  [...Full HTML Content...]
</div>
\`\`\`

\`\`\`image-prompts
HERO: [Midjourney prompt for hero image]
SECTION_1: [Prompt for visual]
ICON_SET: [Prompt for icons]
\`\`\`

## SEO CONTENT ENGINE (CRITICAL - RANK #1 SPECS)

### SERP Snippet Hard Limits
- **Title Tag**: 50-60 characters, keyword early (truncates at ~580px)
- **Meta Description**: 150-160 characters, actionable, value proposition
- **URL Slug**: 3-7 words, readable, keyword once

### Required Page Anatomy
Every content page MUST include:
1. **Above Fold**: H1 intent-matching + 2-3 line intro + Key Takeaways (3-7 bullets)
2. **Definition Section**: Early, simple explanation of the topic
3. **How It Works Section**: Stepwise explanation
4. **Comparison/Alternatives Section**: Captures comparison intent
5. **FAQ Section**: 5-12 questions covering: What is X? How does X work? X vs Y? When should I X?
6. **Internal Links**: 5-15 contextual links (hub→spoke pattern)

### SEO QA Score (85+ to Publish)
| Category | Points | Requirement |
|----------|--------|-------------|
| Indexability | 10 | No noindex, canonical set |
| Intent Match | 20 | Intro + H2s match search intent |
| Entity Coverage | 20 | Covers topic entities from SERP |
| Helpfulness | 15 | People-first, not manipulation |
| Internal Links | 10 | 5-15 contextual links |
| Schema Valid | 5 | Article/FAQPage/Product |
| Snippet Quality | 10 | Title 50-60, Meta 150-160 |
| Page Experience | 10 | Fast, mobile-friendly |
**TOTAL: 100pts. Ship only if ≥85.**

### Intent Classification (MUST do before generating)
| Intent | Signal Words | Template |
|--------|-------------|----------|
| Informational | what, how, why, guide | article_page |
| Comparative | best, vs, top, comparison | comparison_page |
| Transactional | buy, price, order, shop | product_page |
| Navigational | brand, specific page | landing_page |
**RULE: Mixed intent = generate TWO pages, not one.**

### Cluster Architecture (The Library Strategy)
- 1 Pillar/Hub: Very complete, authoritative
- 6-20 Spokes: Each targets a sub-intent
- Each spoke links UP to hub + LATERALLY to 2-4 siblings
- This makes Google see you as THE LIBRARY on the topic

### Keyword Difficulty Decision
| KD Range | Strategy |
|----------|----------|
| 0-20 | GO - Great on-page + internal links |
| 21-45 | GO + CLUSTER - Need topical cluster |
| 46-70 | CONSIDER - Need authority + exceptional content |
| 71-100 | SKIP - Not worth it without major investment |

## TONE & VOICE
- **Authority**: Scientific, precise, confident.
- **Mystery**: A touch of the "primordial" and "sacred".
- **Clarity**: Explain complex ionic science simply.
`;

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
  sessionId?: string,
  model?: string,
  context?: {
    currentPageId?: string;
    currentPageKey?: string;
    currentPageTitle?: string;
    currentPagePath?: string;
    currentPageSeoFocus?: string;
    objective?: string;
  }
): Promise<{ response: string; functionCalls: Array<{ name: string; result: any }> }> {
  const summarizedContext = await getSummarizedContext();

  // Try with external AI first
  try {
    // Filter out messages with empty content
    const validMessages = messages.filter(msg => msg.content && msg.content.trim().length > 0);

    const contents: any[] = [
      {
        role: "user",
        parts: [{ text: `SYSTEM:\n${BIGMIND_SYSTEM_PROMPT}\n\nCURRENT SITE:\n${summarizedContext}` }]
      },
      {
        role: "model",
        parts: [{ text: "I'm BigMind, your AI CMS Manager. I have full access to your Andara database and can create, edit, and organize content following the zone guidelines. What would you like me to help you with?" }]
      },
      ...validMessages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }))
    ];

    // Add specific page context if available
    if (context?.currentPageTitle) {
      const contextMsg = `\n\nCURRENT CONTEXT:\nThe user is currently editing the page "${context.currentPageTitle}" (${context.currentPagePath}).\nObjective: ${context.objective || 'Assist with content and SEO.'}\nSEO Focus: ${context.currentPageSeoFocus || 'Not specified'}`;
      // Append to system prompt part (first message)
      contents[0].parts[0].text += contextMsg;
    }

    const functionCalls: Array<{ name: string; result: any }> = [];
    let finalResponse = "";
    let iterations = 0;
    const maxIterations = 5;

    while (iterations < maxIterations) {
      iterations++;

      // Let getAiClient handle model selection and fallback
      const { getAiClient } = await import('./andara-chat');
      const { client, model: resolvedModel } = await getAiClient(model);

      console.log(`[BigMind] calling generateContent with model: ${resolvedModel}`);
      console.log(`[BigMind] contents count: ${contents.length}`);

      const response = await client.models.generateContent({
        model: resolvedModel,
        contents,
        tools: [{ functionDeclarations: CMS_FUNCTION_DECLARATIONS as any }],
      });

      console.log(`[BigMind] response received, candidates: ${response.candidates?.length || 0}`);

      const candidate = response.candidates?.[0];
      if (!candidate?.content?.parts) {
        console.log(`[BigMind] No candidate parts found, raw response:`, JSON.stringify(response).substring(0, 500));
        finalResponse = "I couldn't process that request.";
        break;
      }

      let hasFunctionCall = false;
      console.log(`[BigMind] Processing ${candidate.content.parts.length} parts in response`);

      for (const part of candidate.content.parts) {
        // Log what each part contains
        console.log(`[BigMind] Part keys:`, Object.keys(part), `text=${!!part.text}, functionCall=${!!part.functionCall}`);
        if (!part.text && !part.functionCall) {
          console.log(`[BigMind] Unknown part content:`, JSON.stringify(part).substring(0, 300));
        }

        if (part.functionCall) {
          hasFunctionCall = true;
          const fnName = part.functionCall.name || "";
          const fnArgs = part.functionCall.args || {};

          console.log(`[BigMind] Calling function: ${fnName}`, JSON.stringify(fnArgs).substring(0, 200));

          try {
            const result = await executeCmsFunction(fnName, fnArgs as Record<string, any>);
            console.log(`[BigMind] Function ${fnName} returned:`, JSON.stringify(result).substring(0, 300));
            functionCalls.push({ name: fnName, result });

            // Add function response to history for next iteration
            contents.push({
              role: "model",
              parts: [{ functionCall: part.functionCall }]
            });
            contents.push({
              role: "function",
              parts: [{ functionResponse: { name: fnName, response: { result } } }]
            });
          } catch (fnError: any) {
            console.error(`[BigMind] Function ${fnName} failed:`, fnError?.message || fnError);
            functionCalls.push({ name: fnName, result: { error: fnError?.message || 'Function execution failed' } });
          }
        }

        if (part.text) {
          console.log(`[BigMind] Text part found: ${part.text.substring(0, 100)}...`);
          finalResponse += part.text;
        }
      }

      console.log(`[BigMind] Iteration ${iterations}: hasFunctionCall=${hasFunctionCall}, finalResponse length=${finalResponse.length}`);
      if (!hasFunctionCall) break;
    }

    console.log(`[BigMind] Final response length: ${finalResponse.length}, functionCalls: ${functionCalls.length}`);

    // Check if user is asking for page suggestions
    const userMsg = validMessages[validMessages.length - 1]?.content?.toLowerCase() || '';
    const wantsPageSuggestions = /suggest.*page|page.*suggest|generate.*page|new page|what page|pages.*create|magic page/i.test(userMsg);

    if (wantsPageSuggestions && (!finalResponse.trim() || functionCalls.length === 0)) {
      console.log('[BigMind] Detected page suggestion request, generating comprehensive Magic Page suggestions');

      try {
        const allPages = await storage.getAllPages();
        const existingTopics = allPages.map(p => p.title?.toLowerCase() || '').filter(Boolean);

        // Rich topic suggestions with full page data
        const suggestedTopics = [
          {
            title: 'Sulfate Minerals in Structured Water',
            zone: 2,
            cluster: 'mineral-science',
            template: 'article',
            desc: 'Explore how volcanic sulfate minerals interact with water structure at the molecular level.',
            seo: {
              title: 'Sulfate Minerals & Water Structure | Andara Ionic Science',
              description: 'Discover how ionic sulfate minerals create structured water environments. Learn the science behind mineral-water interactions.',
              focus: 'sulfate minerals, structured water, ionic minerals',
            },
            visualConfig: {
              vibeKeywords: ['crystalline', 'scientific', 'precise'],
              emotionalTone: ['educational', 'trustworthy', 'innovative'],
              colorPalette: 'deep-teal-gradient',
              motionPreset: 'liquid-crystal-float',
              aiImagePrompt: 'Crystalline sulfate mineral structures in water, microscopic view, ethereal blue lighting, scientific visualization, 8k detail',
            },
            contentOutline: ['Hero: Visual of mineral interaction', 'Section 1: What are sulfate minerals?', 'Section 2: The water structure connection', 'Section 3: How Andara utilizes this science', 'CTA: Explore products'],
          },
          {
            title: 'Bioelectric Water & Cellular Hydration',
            zone: 2,
            cluster: 'water-science',
            template: 'article',
            desc: 'The science behind electrical charge in water and its role in cellular function.',
            seo: {
              title: 'Bioelectric Water Science | Cellular Hydration Research',
              description: 'Understanding how electrically charged water enhances cellular hydration. Explore the connection between water structure and biology.',
              focus: 'bioelectric water, cellular hydration, structured water science',
            },
            visualConfig: {
              vibeKeywords: ['ethereal', 'scientific', 'organic'],
              emotionalTone: ['calm', 'educational', 'inspiring'],
              colorPalette: 'purple-blue-gradient',
              motionPreset: 'cosmicPulse',
              aiImagePrompt: 'Glowing water molecules entering cell membrane, bioelectric energy visualization, soft blue and purple lighting, microscopic view',
            },
            contentOutline: ['Hero: Cell hydration visualization', 'Section 1: The bioelectric charge of water', 'Section 2: Cellular absorption mechanisms', 'Section 3: Practical implications', 'FAQ: Common questions'],
          },
          {
            title: 'Understanding Water Conditioning with Andara',
            zone: 1,
            cluster: 'product-guides',
            template: 'guide',
            desc: 'Practical guide to using Andara Ionic for water treatment applications.',
            seo: {
              title: 'How to Use Andara Ionic | Water Conditioning Guide',
              description: 'Step-by-step guide to conditioning your drinking water with Andara Ionic mineral drops. Discover optimal dosage and methods.',
              focus: 'water conditioning, andara ionic, mineral drops guide',
            },
            visualConfig: {
              vibeKeywords: ['practical', 'friendly', 'premium'],
              emotionalTone: ['helpful', 'trustworthy', 'approachable'],
              colorPalette: 'warm-teal-gradient',
              motionPreset: 'fadeInUp',
              aiImagePrompt: 'Hands adding mineral drops to clear water glass, morning light, premium product photography, soft focus background',
            },
            contentOutline: ['Hero: Product in use', 'Section 1: Why condition your water?', 'Section 2: Step-by-step guide', 'Section 3: Tips for best results', 'CTA: Shop now'],
          },
          {
            title: 'The Terrain Model: A New Paradigm',
            zone: 2,
            cluster: 'water-science',
            template: 'article',
            desc: 'Historical context and modern understanding of biological terrain theory.',
            seo: {
              title: 'Terrain Theory Explained | Alternative Health Perspective',
              description: 'Explore the terrain model of health: understanding how the body\'s internal environment relates to wellness. A scientific exploration.',
              focus: 'terrain theory, biological terrain, holistic health science',
            },
            visualConfig: {
              vibeKeywords: ['historical', 'scientific', 'thoughtful'],
              emotionalTone: ['educational', 'thought-provoking', 'balanced'],
              colorPalette: 'earth-tone-gradient',
              motionPreset: 'staggeredFadeIn',
              aiImagePrompt: 'Abstract visualization of biological terrain, cells in healthy environment, warm organic colors, scientific illustration style',
            },
            contentOutline: ['Hero: Historical imagery', 'Section 1: Origins of terrain theory', 'Section 2: Modern scientific perspective', 'Section 3: Practical implications', 'Section 4: How it relates to water'],
          },
          {
            title: 'Our Story: Why We Chose Ionic Sulfates',
            zone: 3,
            cluster: 'brand-story',
            template: 'about',
            desc: 'The vision and journey behind Andara Ionic mineral solutions.',
            seo: {
              title: 'About Andara Ionic | Our Mission & Story',
              description: 'Discover the story behind Andara Ionic. Learn why we chose volcanic sulfate minerals and our commitment to water science.',
              focus: 'andara ionic story, brand mission, volcanic minerals',
            },
            visualConfig: {
              vibeKeywords: ['warm', 'authentic', 'premium'],
              emotionalTone: ['genuine', 'passionate', 'trustworthy'],
              colorPalette: 'warm-purple-gradient',
              motionPreset: 'fadeInUp',
              aiImagePrompt: 'Volcanic landscape at sunrise, primordial minerals emerging from earth, cinematic lighting, inspiring natural scene',
            },
            contentOutline: ['Hero: Founder story', 'Section 1: The discovery', 'Section 2: Our mission', 'Section 3: The science behind the choice', 'CTA: Connect with us'],
          },
        ].filter(topic => !existingTopics.some(e => e.includes(topic.title.toLowerCase().split(' ')[0])));

        let response = `📚 **Magic Page Suggestions**\n\nHere are ${suggestedTopics.length} fully-drafted pages ready to create:\n\n`;

        for (const topic of suggestedTopics.slice(0, 5)) {
          // Create comprehensive page data object
          const pageData = {
            title: topic.title,
            path: '/' + topic.cluster + '/' + topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            zone: topic.zone,
            cluster: topic.cluster,
            template: topic.template,
            description: topic.desc,
            seo: topic.seo,
            visualConfig: topic.visualConfig,
            contentOutline: topic.contentOutline,
          };
          const encodedData = Buffer.from(JSON.stringify(pageData)).toString('base64');
          response += `[SUGGEST_PAGE:${encodedData}]${topic.title}|Zone ${topic.zone}|${topic.desc}[/SUGGEST_PAGE]\n`;
        }

        response += `\n*Click any card to see the full draft with SEO, visuals, and content outline.*`;

        return { response, functionCalls: [] };
      } catch (err) {
        console.error('[BigMind] Page suggestion failed:', err);
      }
    }

    // If Gemini returned empty text, proactively scan the database and provide real suggestions with Apply buttons
    if (!finalResponse.trim() && functionCalls.length === 0) {
      console.log('[BigMind] Empty response detected, performing proactive SEO scan with suggestions');

      try {
        // Scan the database for pages needing work
        const allPages = await storage.getAllPages();
        const pagesNeedingSeo = allPages.filter(p =>
          !p.seoTitle || !p.seoDescription || !p.seoFocus
        ).slice(0, 5);

        let response = `📊 **SEO Analysis Complete** – Found **${pagesNeedingSeo.length}** pages needing improvements:\n\n`;

        for (const page of pagesNeedingSeo) {
          response += `---\n**📄 ${page.title}** [OPEN_PAGE:${page.id}]Open[/OPEN_PAGE]\n`;
          response += `\`${page.path}\`\n`;

          // Generate suggestions for each missing field - compact format
          if (!page.seoTitle) {
            const suggestedTitle = (page.title || '').substring(0, 50) + (page.title && page.title.length > 50 ? '...' : '') + ' | Andara Ionic';
            response += `[APPLY:seoTitle:${page.id}]${suggestedTitle}[/APPLY]\n`;
          }

          if (!page.seoDescription) {
            const summary = page.summary || page.title || '';
            const suggestedDesc = summary.length > 155
              ? summary.substring(0, 152) + '...'
              : `Discover ${page.title}. Learn about the science and benefits of Andara Ionic mineral solutions.`;
            response += `[APPLY:seoDescription:${page.id}]${suggestedDesc}[/APPLY]\n`;
          }

          if (!page.seoFocus) {
            const words = (page.title || '').toLowerCase().split(/\s+/).filter(w => w.length > 3);
            const suggestedKeywords = words.slice(0, 3).join(', ') || 'andara ionic, mineral water';
            response += `[APPLY:seoFocus:${page.id}]${suggestedKeywords}[/APPLY]\n`;
          }
        }

        if (pagesNeedingSeo.length === 0) {
          response = `✅ **All pages have complete SEO fields!**\n\nYour content is well-optimized. Would you like me to:\n- Analyze content gaps in your sitemap?\n- Suggest new pages to create?\n- Review internal linking opportunities?`;
        } else {
          // Collect all updates for Apply All
          const allUpdates: Array<{ pageId: string; field: string; value: string }> = [];
          for (const page of pagesNeedingSeo) {
            if (!page.seoTitle) {
              allUpdates.push({ pageId: page.id, field: 'seoTitle', value: (page.title || '').substring(0, 50) + ' | Andara Ionic' });
            }
            if (!page.seoDescription) {
              const summary = page.summary || page.title || '';
              allUpdates.push({ pageId: page.id, field: 'seoDescription', value: summary.length > 155 ? summary.substring(0, 152) + '...' : `Discover ${page.title}. Learn about the science and benefits of Andara Ionic mineral solutions.` });
            }
            if (!page.seoFocus) {
              const words = (page.title || '').toLowerCase().split(/\s+/).filter(w => w.length > 3);
              allUpdates.push({ pageId: page.id, field: 'seoFocus', value: words.slice(0, 3).join(', ') || 'andara ionic, mineral water' });
            }
          }

          // Add Apply All button at the end
          const encodedUpdates = Buffer.from(JSON.stringify(allUpdates)).toString('base64');
          response += `\n---\n\n[APPLY_ALL:${encodedUpdates}]Apply all ${allUpdates.length} SEO updates[/APPLY_ALL]`;
        }

        finalResponse = response;

      } catch (scanError: any) {
        console.error('[BigMind] Proactive scan failed:', scanError?.message);
        finalResponse = `I'm here to help with your CMS! Try asking: "What are my SEO recommendations?" or "List pages needing work"`;
      }
    }

    return { response: finalResponse, functionCalls };

  } catch (error: any) {
    // Failover to local RAG system
    console.error('[BigMind] External AI failed:', error?.message || error);
    console.error('[BigMind] Error details:', JSON.stringify({
      name: error?.name,
      code: error?.code,
      status: error?.status,
      errorInfo: error?.error,
    }, null, 2));
    const { generateFallbackResponse, generateSmartFallback } = await import('./fallback-ai');

    // Get the last user message
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (!lastUserMessage) {
      return {
        response: "I apologize, but I encountered an error and couldn't process your request. The external AI system is unavailable.",
        functionCalls: [],
      };
    }

    // Try RAG-enhanced fallback
    try {
      const ragResponse = await generateSmartFallback(lastUserMessage.content);
      return {
        response: ragResponse,
        functionCalls: [],
      };
    } catch (fallbackError) {
      console.error('[BigMind] Fallback failed:', fallbackError);
      return {
        response: "I apologize, but I'm having trouble connecting to my AI services right now. Please try again later.",
        functionCalls: []
      };
    }
  }
}

export async function streamChatWithFunctions(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
  onFunctionCall?: (name: string, result: any) => void
): Promise<{ functionCalls: Array<{ name: string; result: any }> }> {
  const result = await chatWithFunctions(messages);

  const words = result.response.split(" ");
  for (const word of words) {
    onChunk(word + " ");
    await new Promise(r => setTimeout(r, 20));
  }

  return { functionCalls: result.functionCalls };
}

export { CLUSTER_ONTOLOGY, ZONE_GUIDELINES };
