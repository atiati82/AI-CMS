import { GoogleGenAI } from "@google/genai";
import type { AiEnrichment, MotionSpec } from "@shared/schema";
import { storage } from "../storage";

// Use the same API key detection pattern as andara-chat.ts
const geminiApiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
// Ensure base URL includes /v1beta (env var might be missing it)
const rawGeminiBaseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';
const geminiBaseUrl = rawGeminiBaseUrl.endsWith('/v1beta') ? rawGeminiBaseUrl : `${rawGeminiBaseUrl}/v1beta`;

if (!geminiApiKey) {
  console.warn('[AI Enricher] No Gemini API key found. Enrichment will return empty results.');
}

const ai = geminiApiKey ? new GoogleGenAI({
  apiKey: geminiApiKey,
  httpOptions: {
    apiVersion: "",
    baseUrl: geminiBaseUrl,
  },
}) : null;

const MOTION_PRESETS_REFERENCE = `
Available Motion Presets (for motionItems.preset field):
SCROLL-TRIGGERED:
- scroll-fade-up: Fade in and slide up on scroll
- scroll-fade-up-fast: Quick fade and slide up
- scroll-fade-up-stagger: Children fade in sequentially (for grids/lists)
- scroll-fade-in: Simple opacity fade
- scroll-slide-left: Slide in from left
- scroll-slide-right: Slide in from right
- scroll-scale-up: Scale up from small

HOVER:
- hover-lift-soft: Subtle lift and scale on hover
- hover-lift-strong: More pronounced lift
- hover-scale: Simple scale up
- hover-glow: Brightness increase
- hover-rotate-slight: Playful rotation

AMBIENT/LOOP (continuous):
- ambient-water-ripple: Subtle water surface effect
- ambient-floating-icons: Gentle floating motion
- ambient-pulse: Pulsing glow
- ambient-breathing: Slow organic scale
- ambient-drift: Slow horizontal drift
- crystalline-shimmer-slow: Slow shimmer with rotation
- crystalline-shimmer-fast: Faster shimmer

MOUNT:
- mount-fade-in: Fade in on mount
- mount-slide-up: Slide up on mount
- mount-scale-in: Scale in from small

SPECIAL:
- reveal-from-bottom: Clip reveal animation
`;

const DEFAULT_EXTRACTION_PROMPT = `You are an AI assistant that parses Andara Component Language HTML markup with a focus on extracting motion/animation specifications.

Your task is to analyze the HTML and extract the following information in JSON format:

1. **Motion Specs** (PRIORITY - from REPLIT / MOTION LAYOUT PROMPT comments):
   Look for HTML comments that start with "REPLIT / MOTION LAYOUT PROMPT" and extract:
   - section: The section name (e.g., "HERO", "OVERVIEW GRID", "TEMPLES")
   - layoutClass: CSS class for the layout (e.g., ".andara-grid--05")
   - layoutSpec: Description of the layout (columns, responsive behavior)
   - responsiveSpec: Mobile/desktop responsive behavior
   - motionItems: Array of motion directives, each with:
     - preset: The motion preset name (e.g., "scroll-fade-up", "hover-lift-soft")
     - targetSelector: CSS selector or element type to apply to
     - targetDescription: Human description of what element
     - trigger: "scroll" | "hover" | "loop" | "mount"
   - imageryDescription: Description of imagery/visuals for the section
   - colorPalette: Array of colors mentioned
   - vibeKeywords: Keywords describing the vibe/feel
   - emotionalTone: Emotional descriptors

${MOTION_PRESETS_REFERENCE}

2. **Image Prompts**: Find image generation prompts from:
   - HTML comments containing image descriptions
   - <figcaption> elements describing images
   - Comments with patterns like "AI image prompt:" or describing visuals
   - Imagery sections within REPLIT / MOTION LAYOUT PROMPT comments
   
3. **Video Prompts**: Find video generation prompts from:
   - HTML comments describing video/animation content
   - Comments with patterns like "AI video prompt:" or describing motion

4. **Layout Specs**: Find layout specifications from:
   - Comments starting with "LAYOUT SPEC:" or within Motion Layout Prompts
   - Comments describing column layouts, grid arrangements, responsive behavior

5. **Animation Specs**: Find animation specifications from:
   - Comments starting with "ANIMATION SPEC:"
   - Motion directives within REPLIT / MOTION LAYOUT PROMPT comments

6. **SEO Suggestions**: Based on the content, suggest:
   - A compelling SEO title (50-60 chars)
   - A meta description (150-160 chars)
   - A focus keyword

7. **Internal Link Suggestions**: Based on content topics, suggest internal links to:
   - Related science articles
   - Product pages
   - Other relevant sections

8. **Components Used**: List all Andara component classes found (e.g., .andara-hero, .andara-section, .andara-grid)

9. **Visual Config**: Based on the overall page content, generate:
   - vibeKeywords: 3-6 visual style keywords
   - emotionalTone: 3-5 emotional descriptors
   - animationIdeas: 2-4 animation concepts for the page
   - aiImagePrompt: A detailed prompt for generating the main hero/product image
   - aiVideoPrompt: A detailed prompt for generating background video content
   - designerNotes: Any helpful notes for designers
   - priority: "P1" for hero/main pages, "P2" for secondary, "P3" for supporting content

Return a JSON object with this exact structure:
{
  "motionSpecs": [
    {
      "section": "HERO",
      "layoutClass": ".andara-hero",
      "layoutSpec": "Two-column: 60% text left, 40% image right",
      "responsiveSpec": "Stack on mobile: text above image",
      "motionItems": [
        {"preset": "scroll-fade-up", "targetSelector": ".andara-hero__headline", "targetDescription": "headline text", "trigger": "scroll"},
        {"preset": "ambient-water-ripple", "targetSelector": ".andara-hero__bg", "targetDescription": "background overlay", "trigger": "loop"}
      ],
      "imageryDescription": "Panoramic illustration with 5 zones: ocean, kelp, soil, salt crystals, volcanic mica",
      "colorPalette": ["indigo", "turquoise", "emerald green", "warm brown", "soft pink", "obsidian", "gold"],
      "vibeKeywords": ["cosmic", "educational", "reassuring", "elemental"],
      "emotionalTone": ["wonder", "clarity"]
    }
  ],
  "imagePrompts": [{"id": "unique-id", "prompt": "description", "location": "where in the HTML"}],
  "videoPrompts": [{"id": "unique-id", "prompt": "description", "location": "where in the HTML"}],
  "layoutSpecs": [{"section": "section name", "spec": "layout description"}],
  "animationSpecs": [{"element": "element selector", "spec": "animation description"}],
  "suggestedSeo": {"title": "...", "description": "...", "focusKeyword": "..."},
  "suggestedLinks": [{"anchor": "link text", "targetPath": "/path", "reason": "why this link"}],
  "components": ["andara-hero", "andara-section", ...],
  "visualConfig": {
    "priority": "P1" | "P2" | "P3",
    "vibeKeywords": ["keyword1", "keyword2", ...],
    "emotionalTone": ["tone1", "tone2", ...],
    "animationIdeas": ["idea1", "idea2", ...],
    "aiImagePrompt": "detailed image generation prompt",
    "aiVideoPrompt": "detailed video generation prompt",
    "designerNotes": "helpful notes for designers"
  }
}

IMPORTANT: When you see motion directives like:
- "Apply \`ambient-water-ripple\` to subtle overlays" → preset: "ambient-water-ripple", trigger: "loop"
- "Apply \`scroll-fade-up\` for headline" → preset: "scroll-fade-up", trigger: "scroll"
- "On hover, use \`hover-lift-soft\`" → preset: "hover-lift-soft", trigger: "hover"

Map these to the corresponding preset names from the Motion Presets Reference above.

Andara Component Classes to look for:
- .andara-page, .andara-hero, .andara-section, .andara-grid
- .andara-pricing, .andara-testimonial, .andara-faq
- .andara-activation, .andara-dilution, .andara-library-footer
- Element classes: __inner, __header, __headline, __subline, __content, __items, __item, etc.

Site context for link suggestions:
- /shop - Product shop
- /science - Science library
- /science/water-structure - Structured water articles
- /science/ionic-minerals - Mineral science
- /product/100ml, /product/1l - Product pages`;

async function getEnrichmentPrompt(): Promise<string> {
  try {
    const setting = await storage.getCmsSetting('ai_enrichment_prompt');
    if (setting && setting.value && typeof setting.value === 'string' && setting.value.trim().length > 0) {
      return setting.value;
    }
  } catch (error) {
    console.error("Failed to fetch custom enrichment prompt, using default:", error);
  }
  return DEFAULT_EXTRACTION_PROMPT;
}

export type EnrichmentSteps = {
  imagePrompts?: boolean;
  videoPrompts?: boolean;
  layoutSpecs?: boolean;
  motionSpecs?: boolean;
  animationSpecs?: boolean;
  suggestedSeo?: boolean;
  suggestedLinks?: boolean;
  components?: boolean;
  visualConfig?: boolean;
};

export async function enrichPageHtml(html: string, steps?: EnrichmentSteps | null): Promise<AiEnrichment> {
  if (!html || html.trim().length === 0) {
    return createEmptyEnrichment();
  }

  // Check if AI is available
  if (!ai) {
    console.warn('[AI Enricher] No AI client available, returning empty enrichment');
    return createEmptyEnrichment();
  }

  try {
    const extractionPrompt = await getEnrichmentPrompt();

    console.log('[AI Enricher] Calling Gemini with HTML length:', html.length);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Use the correct model name
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${extractionPrompt}

Here is the HTML to analyze:

\`\`\`html
${html}
\`\`\`

Return ONLY the JSON object, no markdown formatting or explanation.`
            }
          ]
        }
      ],
    });

    const text = response.text?.trim() || "";
    console.log('[AI Enricher] Got response, length:', text.length);

    if (!text) {
      console.error('[AI Enricher] Empty response from AI');
      return createEmptyEnrichment();
    }

    let jsonText = text;
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.slice(7);
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.slice(3);
    }
    if (jsonText.endsWith("```")) {
      jsonText = jsonText.slice(0, -3);
    }
    jsonText = jsonText.trim();

    console.log('[AI Enricher] Parsing JSON...');
    const parsed = JSON.parse(jsonText);
    console.log('[AI Enricher] Parsed successfully, keys:', Object.keys(parsed));

    // Helper to check if a step is enabled (default to true if steps is null/undefined)
    const isStepEnabled = (stepName: keyof EnrichmentSteps): boolean => {
      if (!steps) return true; // If no steps specified, run all
      return steps[stepName] !== false;
    };

    // Build result with undefined for skipped steps (so they don't overwrite existing data)
    const result: AiEnrichment = {
      extractedAt: new Date().toISOString(),
      imagePrompts: [],
      videoPrompts: [],
      layoutSpecs: [],
      animationSpecs: [],
      motionSpecs: [],
      suggestedSeo: {},
      suggestedLinks: [],
      components: [],
    };

    // Only set fields for enabled steps
    if (isStepEnabled('imagePrompts')) {
      result.imagePrompts = (parsed.imagePrompts || []).map((p: any, i: number) => ({
        id: p.id || `img-${i + 1}`,
        prompt: p.prompt || "",
        location: p.location || "",
        generated: false,
      }));
    }

    if (isStepEnabled('videoPrompts')) {
      result.videoPrompts = (parsed.videoPrompts || []).map((p: any, i: number) => ({
        id: p.id || `vid-${i + 1}`,
        prompt: p.prompt || "",
        location: p.location || "",
      }));
    }

    if (isStepEnabled('layoutSpecs')) {
      result.layoutSpecs = (parsed.layoutSpecs || []).map((s: any) => ({
        section: s.section || "",
        spec: s.spec || "",
      }));
    }

    if (isStepEnabled('animationSpecs')) {
      result.animationSpecs = (parsed.animationSpecs || []).map((s: any) => ({
        element: s.element || "",
        spec: s.spec || "",
      }));
    }

    if (isStepEnabled('motionSpecs')) {
      result.motionSpecs = (parsed.motionSpecs || []).map((m: any): MotionSpec => ({
        section: m.section || "",
        layoutClass: m.layoutClass || undefined,
        layoutSpec: m.layoutSpec || undefined,
        responsiveSpec: m.responsiveSpec || undefined,
        motionItems: (m.motionItems || []).map((item: any) => ({
          preset: item.preset || "",
          targetSelector: item.targetSelector || undefined,
          targetDescription: item.targetDescription || undefined,
          trigger: item.trigger || "scroll",
        })),
        imageryDescription: m.imageryDescription || undefined,
        colorPalette: m.colorPalette || undefined,
        vibeKeywords: m.vibeKeywords || undefined,
        emotionalTone: m.emotionalTone || undefined,
      }));
    }

    if (isStepEnabled('suggestedSeo')) {
      result.suggestedSeo = {
        title: parsed.suggestedSeo?.title || undefined,
        description: parsed.suggestedSeo?.description || undefined,
        focusKeyword: parsed.suggestedSeo?.focusKeyword || undefined,
      };
    }

    if (isStepEnabled('suggestedLinks')) {
      result.suggestedLinks = (parsed.suggestedLinks || []).map((l: any) => ({
        anchor: l.anchor || "",
        targetPath: l.targetPath || "",
        reason: l.reason || "",
      }));
    }

    if (isStepEnabled('components')) {
      result.components = parsed.components || [];
    }

    if (isStepEnabled('visualConfig') && parsed.visualConfig) {
      result.visualConfig = {
        priority: parsed.visualConfig.priority || "P2",
        vibeKeywords: parsed.visualConfig.vibeKeywords || [],
        emotionalTone: parsed.visualConfig.emotionalTone || [],
        animationIdeas: parsed.visualConfig.animationIdeas || [],
        aiImagePrompt: parsed.visualConfig.aiImagePrompt || "",
        aiVideoPrompt: parsed.visualConfig.aiVideoPrompt || "",
        designerNotes: parsed.visualConfig.designerNotes || "",
      };
    }

    // Track which steps were actually run for merge logic
    (result as any)._enabledSteps = steps || null;

    return result;
  } catch (error: any) {
    console.error("[AI Enricher] ERROR:", error?.message || error);
    console.error("[AI Enricher] Error details:", JSON.stringify({
      name: error?.name,
      code: error?.code,
      status: error?.status,
      statusText: error?.statusText,
    }, null, 2));
    return createEmptyEnrichment();
  }
}

function createEmptyEnrichment(): AiEnrichment {
  return {
    extractedAt: new Date().toISOString(),
    imagePrompts: [],
    videoPrompts: [],
    layoutSpecs: [],
    animationSpecs: [],
    motionSpecs: [],
    suggestedSeo: {},
    suggestedLinks: [],
    components: [],
  };
}
