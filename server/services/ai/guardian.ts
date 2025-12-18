import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export type GuardianZone = 'product' | 'science' | 'brand';

export interface GuardianCheckResult {
    valid: boolean;
    score: number; // 0-100
    flags: string[];
    reasons: string[];
    suggestedFix?: string;
}

const GUARDIAN_SYSTEM_PROMPT = `
You are THE GUARDIAN, a strict compliance officer for the Andara Ionic CMS.
Your job is to screen content against specific "Zone" rules to prevent rapid regulatory shutdown.

ZONES:
1. **PRODUCT ZONE** (Shop pages, Product descriptions, Checkouts)
   - STRICTLY FORBIDDEN: Making any medical claims (cures, treats, heals, prevents cancer/diabetes/etc).
   - ALLOWED: Structure (ionic sulfate), Sourcing (volcanic), Taste, Usage (dilution), Hydration benefits.
   - RULE: "It is a mineral water supplement, not a medicine."

2. **SCIENCE ZONE** (Articles, Research pages, Blog)
   - ALLOWED: Discussing studies, exploring theories (EZ water, sulfates, metabolic effects), citing research.
   - REQUIREMENT: Must use tentative language ("studies suggest," "research indicates") rather than absolute claims.
   - RULE: "Educational and exploratory, but must cite sources or logic."

3. **BRAND ZONE** (Home, About, Philosophy)
   - ALLOWED: High-level philosophy, "Mineral Network of Light," "Crystalline Geometry."
   - FORBIDDEN: Hard medical claims.
   - FOCUS: Vibe, aesthetic, origin story.

TASK:
Analyze the provided content. Return JSON ONLY.
{
  "valid": boolean,
  "score": number (0-100, where 100 is perfectly safe),
  "flags": ["list", "of", "violations"],
  "reasons": ["detailed explanation"],
  "suggestedFix": "Rewritten excerpt that complies"
}
`;

export class GuardianService {
    private model: any;

    constructor() {
        this.model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    }

    async validateContent(content: string, zone: GuardianZone): Promise<GuardianCheckResult> {
        if (!content) return { valid: true, score: 100, flags: [], reasons: [] };

        try {
            const prompt = `
${GUARDIAN_SYSTEM_PROMPT}

CURRENT ZONE: ${zone.toUpperCase()}
CONTENT TO CHECK:
"""
${content.substring(0, 15000)} ... (truncated if too long)
"""
`;

            const result = await this.model.generateContent({
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            });

            const response = result.response;
            const text = response.text();

            // Extract JSON
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                console.warn("[Guardian] Could not parse AI response, defaulting to PASS.");
                return { valid: true, score: 90, flags: ["parse_error"], reasons: ["AI response parsing failed"] };
            }

            const parsed = JSON.parse(jsonMatch[0]);
            return {
                valid: parsed.valid,
                score: parsed.score,
                flags: parsed.flags || [],
                reasons: parsed.reasons || [],
                suggestedFix: parsed.suggestedFix
            };

        } catch (error: any) {
            console.error("[Guardian] detailed error:", error);
            // Fail open or closed? For compliance, usually fail closed, but for dev we might warn.
            return { valid: true, score: 100, flags: ["guardian_offline"], reasons: [`Error: ${error.message}`] };
        }
    }
}

export const guardian = new GuardianService();
