import { storage } from "../storage";
import { PageMediaAsset } from "@shared/schema";

export class AssetIntelligenceService {
    async autoTagAsset(assetId: string): Promise<PageMediaAsset | null> {
        const asset = await storage.getPageMediaAsset(assetId);
        if (!asset) throw new Error(`Asset ${assetId} not found`);

        // Simulate "Vision Intelligence" by analyzing the prompt and filename (if any)
        const prompt = asset.prompt || "";
        const existingMetadata = asset.metadata || {};

        // 1. Generate Tags from Prompt
        const keywords = this.extractKeywords(prompt);

        // 2. Generate Alt Text
        // Transform prompt into descriptive sentence
        const altText = this.generateAltText(prompt);

        // 3. Update Metadata
        const newMetadata = {
            ...existingMetadata,
            tags: keywords,
            altText: altText,
            autoTaggedAt: new Date().toISOString()
        };

        // 4. Save
        await storage.updatePageMediaAsset(assetId, { metadata: newMetadata });

        return (await storage.getPageMediaAsset(assetId)) || null;
    }

    // A simplified Keyword Extractor (heuristic)
    private extractKeywords(text: string): string[] {
        const stopWords = new Set(['a', 'an', 'the', 'of', 'in', 'on', 'with', 'by', 'and', 'or', 'for', 'to', 'is', 'are', 'style', 'vibe', 'render', 'cinematic', 'photorealistic', '4k']);
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 3 && !stopWords.has(w));

        // Dedupe
        return Array.from(new Set(words)).slice(0, 8);
    }

    private generateAltText(prompt: string): string {
        // If prompt is "crystal structure of sulfate minerals in blue water"
        // Alt text: "Crystal structure of sulfate minerals in blue water - Cinematic Scientific Visualization"
        // We clean it up a bit.
        let clean = prompt.replace(/style|cinematic|photorealistic|render|8k|highly detailed/gi, "").trim();
        clean = clean.replace(/\s+/g, " ");
        if (clean.length < 10) return prompt; // Fallback
        return `${clean.charAt(0).toUpperCase() + clean.slice(1)}`;
    }
}

export const assetIntelligenceService = new AssetIntelligenceService();
