import { GoogleGenAI } from "@google/genai";
import type { Page, VisualConfig, AiEnrichment } from "@shared/schema";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

export interface DetectedSlot {
  slotKey: string;
  slotType: string;
  slotLabel: string;
  contextSnippet: string;
  promptTemplate?: string;
  sortOrder: number;
  metadata?: {
    aspectRatio?: string;
    style?: string;
    vibeKeywords?: string[];
    autoDetected?: boolean;
  };
}

const TEMPLATE_SLOT_DEFINITIONS: Record<string, DetectedSlot[]> = {
  landing_home: [
    { slotKey: 'hero-bg', slotType: 'hero_background', slotLabel: 'Hero Background', contextSnippet: 'Main landing hero section', sortOrder: 0, metadata: { aspectRatio: '16:9', autoDetected: true } },
    { slotKey: 'feature-1', slotType: 'feature_card', slotLabel: 'Feature Card 1', contextSnippet: 'First product feature highlight', sortOrder: 1, metadata: { aspectRatio: '1:1', autoDetected: true } },
    { slotKey: 'feature-2', slotType: 'feature_card', slotLabel: 'Feature Card 2', contextSnippet: 'Second product feature highlight', sortOrder: 2, metadata: { aspectRatio: '1:1', autoDetected: true } },
    { slotKey: 'feature-3', slotType: 'feature_card', slotLabel: 'Feature Card 3', contextSnippet: 'Third product feature highlight', sortOrder: 3, metadata: { aspectRatio: '1:1', autoDetected: true } },
    { slotKey: 'section-texture', slotType: 'ambient_texture', slotLabel: 'Section Texture', contextSnippet: 'Ambient background texture', sortOrder: 4, metadata: { aspectRatio: '16:9', autoDetected: true } },
  ],
  article: [
    { slotKey: 'hero-image', slotType: 'hero_image', slotLabel: 'Article Hero', contextSnippet: 'Main article header image', sortOrder: 0, metadata: { aspectRatio: '16:9', autoDetected: true } },
    { slotKey: 'inline-1', slotType: 'section_background', slotLabel: 'Inline Image 1', contextSnippet: 'First section illustration', sortOrder: 1, metadata: { aspectRatio: '4:3', autoDetected: true } },
  ],
  pillar_overview: [
    { slotKey: 'hero-bg', slotType: 'hero_background', slotLabel: 'Pillar Hero', contextSnippet: 'Science pillar page hero', sortOrder: 0, metadata: { aspectRatio: '16:9', autoDetected: true } },
    { slotKey: 'cluster-1', slotType: 'feature_card', slotLabel: 'Topic Cluster 1', contextSnippet: 'First topic cluster visual', sortOrder: 1, metadata: { aspectRatio: '1:1', autoDetected: true } },
    { slotKey: 'cluster-2', slotType: 'feature_card', slotLabel: 'Topic Cluster 2', contextSnippet: 'Second topic cluster visual', sortOrder: 2, metadata: { aspectRatio: '1:1', autoDetected: true } },
    { slotKey: 'cluster-3', slotType: 'feature_card', slotLabel: 'Topic Cluster 3', contextSnippet: 'Third topic cluster visual', sortOrder: 3, metadata: { aspectRatio: '1:1', autoDetected: true } },
  ],
  product: [
    { slotKey: 'product-hero', slotType: 'product_image', slotLabel: 'Product Hero', contextSnippet: 'Main product showcase image', sortOrder: 0, metadata: { aspectRatio: '1:1', autoDetected: true } },
    { slotKey: 'product-lifestyle', slotType: 'product_image', slotLabel: 'Lifestyle Shot', contextSnippet: 'Product in use lifestyle image', sortOrder: 1, metadata: { aspectRatio: '16:9', autoDetected: true } },
    { slotKey: 'ingredient-texture', slotType: 'ambient_texture', slotLabel: 'Ingredient Texture', contextSnippet: 'Mineral texture close-up', sortOrder: 2, metadata: { aspectRatio: '1:1', autoDetected: true } },
  ],
  guide: [
    { slotKey: 'guide-hero', slotType: 'hero_image', slotLabel: 'Guide Hero', contextSnippet: 'How-to guide header image', sortOrder: 0, metadata: { aspectRatio: '16:9', autoDetected: true } },
    { slotKey: 'step-1', slotType: 'feature_card', slotLabel: 'Step 1 Visual', contextSnippet: 'First step illustration', sortOrder: 1, metadata: { aspectRatio: '4:3', autoDetected: true } },
    { slotKey: 'step-2', slotType: 'feature_card', slotLabel: 'Step 2 Visual', contextSnippet: 'Second step illustration', sortOrder: 2, metadata: { aspectRatio: '4:3', autoDetected: true } },
  ],
  cluster_overview: [
    { slotKey: 'cluster-hero', slotType: 'hero_background', slotLabel: 'Cluster Hero', contextSnippet: 'Science cluster overview hero', sortOrder: 0, metadata: { aspectRatio: '16:9', autoDetected: true } },
  ],
};

const DEFAULT_SLOTS: DetectedSlot[] = [
  { slotKey: 'hero-bg', slotType: 'hero_background', slotLabel: 'Hero Background', contextSnippet: 'Page hero section', sortOrder: 0, metadata: { aspectRatio: '16:9', autoDetected: true } },
];

function extractMicroFeatures(html: string): DetectedSlot[] {
  const microFeatures: DetectedSlot[] = [];
  const featurePatterns = [
    /(?:Conductive|Detoxifying|Alkalizing|Crystalline|Bioelectric|Hydrating|Remineralizing|Ionic)/gi
  ];
  
  let sortOrder = 10;
  for (const pattern of featurePatterns) {
    const matches = html.match(pattern);
    if (matches) {
      const uniqueMatches = Array.from(new Set(matches.map(m => m.toLowerCase())));
      for (const match of uniqueMatches) {
        const capitalizedMatch = match.charAt(0).toUpperCase() + match.slice(1);
        microFeatures.push({
          slotKey: `micro-${match}`,
          slotType: 'micro_feature',
          slotLabel: `${capitalizedMatch} Feature`,
          contextSnippet: `Micro-feature box for "${capitalizedMatch}" property`,
          sortOrder: sortOrder++,
          metadata: {
            aspectRatio: '1:1',
            style: 'abstract',
            vibeKeywords: [match, 'crystalline', 'energy'],
            autoDetected: true,
          }
        });
      }
    }
  }
  
  return microFeatures;
}

async function detectSlotsWithAI(page: Page): Promise<DetectedSlot[]> {
  const content = page.aiStartupHtml || page.content || '';
  const visualConfig = page.visualConfig as VisualConfig | null;
  
  const systemPrompt = `You are an image slot detector for a mineral water science website (Andara Ionic). 
Analyze the page content and identify where images are needed.

Slot types available:
- hero_background: Full-width hero section backgrounds
- hero_image: Focused hero images (product shots, illustrations)
- section_background: Section ambient backgrounds
- feature_card: Feature box/card images
- feature_icon: Small icon-style images
- micro_feature: Abstract property visualizations (e.g., "Conductive", "Crystalline")
- product_image: Product photography
- gallery_image: Gallery/carousel images
- ambient_texture: Subtle texture overlays

Return a JSON array of detected slots. Each slot should have:
{
  "slotKey": "unique-kebab-case-id",
  "slotType": "one of the types above",
  "slotLabel": "Human readable label",
  "contextSnippet": "What this image represents based on surrounding content",
  "sortOrder": number (order on page),
  "metadata": {
    "aspectRatio": "16:9 or 1:1 or 4:3",
    "style": "photography or abstract or illustration",
    "vibeKeywords": ["keyword1", "keyword2"]
  }
}`;

  const userPrompt = `Analyze this page and detect image slots:

Page Title: ${page.title}
Template: ${page.template}
Cluster: ${page.clusterKey || 'none'}
${visualConfig ? `Vibe Keywords: ${visualConfig.vibeKeywords?.join(', ') || 'none'}` : ''}

Content/HTML:
${content.slice(0, 8000)}

Return ONLY a valid JSON array of slots. No other text.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }
      ],
    });

    const text = response.text || '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const slots = JSON.parse(jsonMatch[0]) as DetectedSlot[];
      return slots.map((slot, index) => ({
        ...slot,
        sortOrder: slot.sortOrder ?? index,
        metadata: { ...slot.metadata, autoDetected: true }
      }));
    }
  } catch (error) {
    console.error('AI slot detection failed:', error);
  }
  
  return [];
}

export async function detectImageSlots(page: Page): Promise<DetectedSlot[]> {
  const template = page.template || 'article';
  
  let templateSlots = TEMPLATE_SLOT_DEFINITIONS[template] || DEFAULT_SLOTS;
  templateSlots = templateSlots.map(slot => ({ ...slot }));
  
  const html = page.aiStartupHtml || page.content || '';
  const microFeatures = extractMicroFeatures(html);
  
  let aiSlots: DetectedSlot[] = [];
  if (html.length > 500) {
    aiSlots = await detectSlotsWithAI(page);
  }
  
  const allSlots = [...templateSlots, ...microFeatures];
  
  for (const aiSlot of aiSlots) {
    const exists = allSlots.some(s => s.slotKey === aiSlot.slotKey);
    if (!exists) {
      allSlots.push(aiSlot);
    }
  }
  
  allSlots.sort((a, b) => a.sortOrder - b.sortOrder);
  
  return allSlots;
}
