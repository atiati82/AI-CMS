import { GoogleGenAI } from "@google/genai";
import type { Page, VisualConfig, Cluster } from "@shared/schema";
import type { DetectedSlot } from "./image-slot-detector";
import { storage } from "../storage";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

export interface SynthesizedPrompt extends DetectedSlot {
  promptTemplate: string;
  promptFinal: string;
}

const ANDARA_STYLE_BASE = `High-end professional image. Dark cosmic background with deep blacks and subtle blue-purple nebula tones. 
Golden crystalline accents with authentic metallic gold gradient (#d4af37 to #f5d05a). 
Clean, modern aesthetic. No text overlays. No watermarks. Subtle glow effects where appropriate.`;

const SLOT_TYPE_STYLES: Record<string, string> = {
  hero_background: 'Wide panoramic composition, cinematic lighting, atmospheric depth, subtle particle effects',
  hero_image: 'Focused central subject, dramatic lighting, high contrast, professional product photography style',
  section_background: 'Subtle, ambient, not distracting, soft gradients, minimal elements, can be used as overlay',
  feature_card: 'Centered composition, clear visual hierarchy, iconic representation, works at small sizes',
  feature_icon: 'Simple, iconic, minimal detail, works at 64x64px, abstract representation',
  micro_feature: 'Abstract visualization of the concept, crystalline structures, energy patterns, particle effects, scientific aesthetic',
  product_image: 'Clean product photography, glass bottle with golden liquid, reflective surfaces, premium feel',
  gallery_image: 'Storytelling moment, lifestyle context, natural lighting, aspirational',
  ambient_texture: 'Subtle pattern, can tile/repeat, low contrast, works as background overlay',
};

const MICRO_FEATURE_CONCEPTS: Record<string, string> = {
  conductive: 'Flowing electric currents, gold lightning patterns, connected nodes, energy network visualization',
  detoxifying: 'Pure water drops, cleansing spiral motion, removing dark particles, purification visualization',
  alkalizing: 'pH scale visual with alkaline blue-green tones, balanced crystalline structure, harmony patterns',
  crystalline: 'Perfect hexagonal crystal lattice, structured water molecules, geometric precision, sacred geometry',
  bioelectric: 'Cellular energy, mitochondrial glow, life force visualization, electric blue with gold accents',
  hydrating: 'Water molecules penetrating cells, absorption visualization, refreshing splash motion',
  remineralizing: 'Mineral particles depositing, bone/tissue strengthening visualization, building blocks',
  ionic: 'Charged particles, positive/negative attraction, electron orbit patterns, atomic energy',
};

async function getClusterVibe(clusterKey: string | null): Promise<string[]> {
  if (!clusterKey) return [];
  
  try {
    const cluster = await storage.getClusterByKey(clusterKey);
    if (cluster?.visualVibe?.vibeKeywords) {
      return cluster.visualVibe.vibeKeywords;
    }
  } catch {
    return [];
  }
  return [];
}

function buildPromptForSlot(
  slot: DetectedSlot,
  page: Page,
  clusterVibes: string[],
  visualConfig: VisualConfig | null
): string {
  const slotStyle = SLOT_TYPE_STYLES[slot.slotType] || SLOT_TYPE_STYLES.feature_card;
  
  let conceptPrompt = '';
  if (slot.slotType === 'micro_feature') {
    const featureName = slot.slotKey.replace('micro-', '').toLowerCase();
    conceptPrompt = MICRO_FEATURE_CONCEPTS[featureName] || 
      `Abstract visualization of "${featureName}" as a mineral property, crystalline energy patterns`;
  }
  
  const vibeKeywords = [
    ...(visualConfig?.vibeKeywords || []),
    ...(slot.metadata?.vibeKeywords || []),
    ...clusterVibes,
  ].filter(Boolean).slice(0, 5);
  
  const contextParts = [
    slot.contextSnippet,
    conceptPrompt,
    vibeKeywords.length > 0 ? `Vibe: ${vibeKeywords.join(', ')}` : '',
    `Page topic: ${page.title}`,
  ].filter(Boolean);
  
  return `${ANDARA_STYLE_BASE}

${slotStyle}

Context: ${contextParts.join('. ')}

Aspect ratio guidance: ${slot.metadata?.aspectRatio || '16:9'}`;
}

async function synthesizeWithAI(
  slots: DetectedSlot[],
  page: Page,
  visualConfig: VisualConfig | null
): Promise<Map<string, string>> {
  const systemPrompt = `You are an AI prompt engineer for a premium mineral water brand (Andara Ionic).
Generate concise, specific image prompts for each slot that will create cohesive visuals.

Brand style:
- Dark cosmic backgrounds (deep black, subtle blue-purple nebula)  
- Gold crystalline accents (#d4af37 to #f5d05a gradient)
- Clean, modern, premium aesthetic
- Scientific but accessible
- No text in images

Return a JSON object mapping slotKey to prompt string.`;

  const userPrompt = `Generate image prompts for these slots on the page "${page.title}":

${slots.map(s => `- ${s.slotKey} (${s.slotType}): ${s.contextSnippet}`).join('\n')}

${visualConfig ? `Visual direction: ${visualConfig.vibeKeywords?.join(', ')}` : ''}
${visualConfig?.aiImagePrompt ? `Art direction: ${visualConfig.aiImagePrompt}` : ''}

Return ONLY a valid JSON object like {"slot-key": "prompt text", ...}. No other text.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }
      ],
    });

    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const prompts = JSON.parse(jsonMatch[0]) as Record<string, string>;
      return new Map(Object.entries(prompts));
    }
  } catch (error) {
    console.error('AI prompt synthesis failed:', error);
  }
  
  return new Map();
}

export async function synthesizePrompts(
  page: Page,
  slots: DetectedSlot[]
): Promise<SynthesizedPrompt[]> {
  const visualConfig = page.visualConfig as VisualConfig | null;
  const clusterVibes = await getClusterVibe(page.clusterKey);
  
  const aiPrompts = await synthesizeWithAI(slots, page, visualConfig);
  
  const results: SynthesizedPrompt[] = slots.map(slot => {
    const templatePrompt = buildPromptForSlot(slot, page, clusterVibes, visualConfig);
    const aiPrompt = aiPrompts.get(slot.slotKey);
    
    const finalPrompt = aiPrompt 
      ? `${ANDARA_STYLE_BASE}\n\n${aiPrompt}`
      : templatePrompt;
    
    return {
      ...slot,
      promptTemplate: templatePrompt,
      promptFinal: finalPrompt,
    };
  });
  
  return results;
}

export async function synthesizeSinglePrompt(
  page: Page,
  slot: DetectedSlot
): Promise<SynthesizedPrompt> {
  const [result] = await synthesizePrompts(page, [slot]);
  return result;
}
