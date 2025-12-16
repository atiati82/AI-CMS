import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

const LAYOUT_VOCABULARY = `
LAYOUT VOCABULARY (use these IDs to match sections):

HERO LAYOUTS:
- hero_split: Two-column hero (headline left, image right)
- hero_centered: Full-width centered headline + CTA
- hero_media_bg: Background image/video with overlay text

FEATURE LAYOUTS:
- feature_columns: 3-4 column icon grid
- benefit_grid: Card-based benefit grid (2-4 per row)
- icon_bullets: Horizontal icon bullet row

PROCESS LAYOUTS:
- step_process: Numbered steps (1-3-5)
- timeline_vertical: Vertical timeline with connectors
- journey_roadmap: Roadmap with phase cards

SOCIAL PROOF:
- testimonial_slider: Single testimonial carousel
- testimonial_grid: Multi-column testimonial cards
- logo_wall: Partner/client logo grid

PRICING:
- pricing_table: 2-4 pricing tier cards
- offer_highlight: Featured offer card

FAQ & INFO:
- faq_accordion: Expandable Q&A list
- tabbed_content: Tab-switching panels
- comparison_table: Feature comparison table

METRICS:
- stats_highlight: Large KPI numbers
- highlight_box: Callout/note box

CONTENT:
- article_longform: Single column article
- blog_list: Article card list
- sidebar_content: Main + sidebar layout

MEDIA:
- image_gallery_grid: Responsive image grid
- media_caption: Large image with caption

INTERACTIVE:
- modal_overlay: Dialog overlay
- drawer_panel: Slide-in panel

CTA:
- cta_bar: Narrow CTA strip
- cta_section: Large CTA block

FOOTER:
- footer_multi_column: Multi-column footer
`;

const MOTION_SYSTEM = `
MOTION SYSTEM (import from @/lib/motion):

TIMING: timing.fast (0.2s), timing.normal (0.4s), timing.slow (0.6s)
EASING: easing.smooth, easing.snappy, easing.bounce

ENTRANCE ANIMATIONS:
- fadeUp, fadeDown, fadeIn, fadeLeft, fadeRight
- scaleUp, slideInLeft, slideInRight

STAGGER (for lists/grids):
- stagger.container (parent)
- stagger.item (child)

HOVER:
- hover.lift, hover.scale, hover.glow

AMBIENT (looping):
- ambient.pulse, ambient.float, ambient.shimmer

OVERLAY (modals/menus):
- overlay.backdrop, overlay.slideUp, overlay.scale
`;

const GENERATION_PROMPT = `You are an expert React/TypeScript developer creating pages for Andara Ionic, a mineral science education website.

${LAYOUT_VOCABULARY}

${MOTION_SYSTEM}

INSTRUCTIONS:
1. Analyze the user's brief to determine which layouts to use
2. Generate a complete React page component with:
   - Proper imports from @/lib/motion (motion, stagger, fadeUp, etc.)
   - Imports from @/components/ui (Button, Card, etc.)
   - Layout component wrapper from @/components/layout
   - Tailwind CSS with dark cosmic theme (bg-background, text-foreground, accent colors)
   - Framer Motion animations using spread syntax: {...fadeUp} or {...stagger.container}
   - Responsive design (mobile-first)

3. Also generate SEO metadata:
   - title (50-60 chars)
   - description (150-160 chars)
   - keywords (5-8 relevant terms)

RESPONSE FORMAT (JSON):
{
  "layoutsDetected": ["hero_centered", "benefit_grid", "faq_accordion"],
  "seo": {
    "title": "Page Title Here",
    "description": "Meta description here...",
    "keywords": ["keyword1", "keyword2"]
  },
  "tsx": "// Full React component code here..."
}

STYLE RULES:
- Use dark theme: bg-[#0a0a0f], text-white
- Accent colors: cyan-400, purple-500, emerald-400
- Glass effects: bg-white/5 backdrop-blur-sm border border-white/10
- Gradients: bg-gradient-to-br from-cyan-500/20 to-purple-500/20
- Shadows: shadow-lg shadow-cyan-500/10
- Rounded corners: rounded-xl, rounded-2xl
- Spacing: py-20, px-6, gap-8
`;

export interface AIStartupResult {
  layoutsDetected: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  tsx: string;
  html: string;
}

export async function generatePageFromBrief(brief: string, pageSlug?: string): Promise<AIStartupResult> {
  const prompt = `${GENERATION_PROMPT}

USER BRIEF: ${brief}
${pageSlug ? `PAGE SLUG: ${pageSlug}` : ''}

Generate a complete React page component based on this brief. Return ONLY the JSON object, no markdown formatting.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
  });

  const text = response.text?.trim() || "";
  
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
  
  const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse AI response as JSON");
  }

  const result = JSON.parse(jsonMatch[0]) as {
    layoutsDetected: string[];
    seo: { title: string; description: string; keywords: string[] };
    tsx: string;
  };

  const html = convertTsxToHtml(result.tsx);

  return {
    ...result,
    html,
  };
}

function convertTsxToHtml(tsx: string): string {
  const bodyMatch = tsx.match(/return\s*\(\s*([\s\S]*)\s*\);?\s*\}[\s\S]*$/);
  if (!bodyMatch) {
    return `<!-- Generated from AI -->\n<div class="andara-page">\n  ${tsx}\n</div>`;
  }
  
  let jsx = bodyMatch[1];
  
  jsx = jsx.replace(/className=/g, 'class=');
  jsx = jsx.replace(/\{\.\.\.[\w.]+\}/g, '');
  jsx = jsx.replace(/<motion\.(\w+)/g, '<$1');
  jsx = jsx.replace(/<\/motion\.(\w+)>/g, '</$1>');
  jsx = jsx.replace(/\{`([^`]*)`\}/g, '$1');
  jsx = jsx.replace(/\{['"]([^'"]*)['"]\}/g, '$1');
  jsx = jsx.replace(/<(\w+)([^>]*)\s*\/>/g, '<$1$2></$1>');
  
  return jsx.trim();
}

export async function detectLayouts(content: string): Promise<string[]> {
  const prompt = `${LAYOUT_VOCABULARY}

Analyze this content and return a JSON array of layout IDs that best match:

CONTENT: ${content}

Return only a JSON array like: ["hero_centered", "benefit_grid"]`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
  });

  const text = response.text?.trim() || "";
  const match = text.match(/\[[\s\S]*\]/);
  return match ? JSON.parse(match[0]) : [];
}
