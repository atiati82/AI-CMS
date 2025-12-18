/**
 * CONTENT FIREWALL SERVICE
 * 
 * ⚠️ INTERNAL SYSTEM - DO NOT EXPOSE PUBLICLY
 * 
 * This service enforces content governance across three zones:
 * - Zone 1 (Product): Water treatment language only, no health claims
 * - Zone 2 (Science): Educational, research-aware, general mechanisms
 * - Zone 3 (Brand): Emotional, visionary, non-medical storytelling
 * 
 * The firewall sits between user requests and AI generation to ensure
 * all content is regulation-safe and brand-aligned.
 */

// === TYPES ===

export type ContentZone = 'product' | 'science' | 'brand';

export interface LanguageRules {
    allowedVerbs: string[];
    forbiddenVerbs: string[];
    forbiddenPatterns: RegExp[];
    requiredDisclaimer: string | null;
    toneGuidance: string;
}

export interface ZoneContext {
    zone: ContentZone;
    zoneNumber: 1 | 2 | 3;
    name: string;
    description: string;
    allowedClusters: string[];
    languageRules: LanguageRules;
    examplePages: string[];
}

export interface ValidationResult {
    isValid: boolean;
    zone: ContentZone;
    violations: Array<{
        pattern: string;
        match: string;
        severity: 'error' | 'warning';
        suggestion: string;
    }>;
    warnings: string[];
    sanitizedContent?: string;
}

// === ZONE DEFINITIONS ===

const ZONE_CLUSTERS: Record<ContentZone, string[]> = {
    product: ['home', 'shop', 'support', 'faq', 'usage', 'safety', 'b2b', 'legal'],
    science: ['water_science', 'mineral_science', 'crystalline_matrix', 'bioelectricity', 'terrain_model', 'sulfur_pathways', 'spiritual_electricity', 'microbiome'],
    brand: ['about', 'trust_lab', 'blog', 'story', 'vision', 'community', 'founder']
};

// === INTENT CLASSIFICATION KEYWORDS ===

const ZONE_KEYWORDS: Record<ContentZone, string[]> = {
    product: [
        'price', 'buy', 'bundle', 'drops', 'dosage', 'dilute', 'dilution',
        'safe', 'safety', 'use', 'how many', 'how much', 'shipping', 'return',
        'order', 'cart', 'checkout', 'payment', 'ml', 'liter', 'bottle',
        'turbidity tube', 'test', 'measure', 'store', 'storage', 'child safe',
        'pet safe', 'is it safe', 'how to use', 'instructions', 'directions'
    ],
    science: [
        'sulfate', 'ionic', 'mineral', 'ez water', 'exclusion zone', 'pollack',
        'enzyme', 'microbiome', 'bioelectric', 'terrain', 'structured water',
        'flocculation', 'coagulation', 'chemistry', 'research', 'study', 'studies',
        'ph', 'orp', 'conductivity', 'tds', 'trace element', 'electrolyte',
        'membrane potential', 'cellular', 'crystalline', 'hexagonal', 'tetrahedral',
        'sulfur pathway', 'scfa', 'bifidobacterium', 'gut bacteria', 'mucin',
        'redox', 'electron', 'proton gradient', 'atp', 'mitochondria'
    ],
    brand: [
        'story', 'about', 'vision', 'volcano', 'bali', 'future', 'ryan', 'founder',
        'mission', 'values', 'community', 'journey', 'inspiration', 'temple',
        'lab', 'origin', 'volcanic', 'primordial', 'ancient', 'wisdom',
        'future cities', 'regenerative', 'architecture', 'project', 'partner'
    ]
};

// === ZONE 1: PRODUCT LANGUAGE RULES ===

const ZONE_1_RULES: LanguageRules = {
    allowedVerbs: [
        'clarifies', 'conditions', 'structures', 'reduces turbidity',
        'improves taste', 'flocculates', 'purifies water', 'treats water',
        'enhances water', 'adds minerals to water', 'balances water'
    ],
    forbiddenVerbs: [
        'treats disease', 'cures', 'heals', 'prevents disease', 'detoxes',
        'cleanses body', 'treats condition', 'heals body', 'cures illness'
    ],
    forbiddenPatterns: [
        /\b(cure|heal|treat)\s+(disease|condition|illness|symptom)/i,
        /\bdetox(es|ifies?)?\s+(your|the)?\s*body/i,
        /\bprevents?\s+(cancer|diabetes|heart|disease|illness)/i,
        /\b(Andara|product|our)\s+(treats|cures|heals)/i,
        /\btherapy\b/i,
        /\bmedic(ine|al|ation)\b/i,
        /\bdiagnos(e|is|tic)/i,
        /\b(treats|cures)\s+your\s+\w+/i,
        /\bhealth\s+benefit/i,
        /\bhealing\s+propert/i
    ],
    requiredDisclaimer: 'This product is intended for water clarification and conditioning only. It is not intended to diagnose, treat, cure, or prevent any disease.',
    toneGuidance: 'Practical, factual, water-treatment focused. Talk about what it does to WATER, not to the body.'
};

// === ZONE 2: SCIENCE LANGUAGE RULES ===

const ZONE_2_RULES: LanguageRules = {
    allowedVerbs: [
        'may support', 'is associated with', 'is discussed as', 'studies suggest',
        'research indicates', 'is observed in', 'is proposed that', 'may contribute',
        'is hypothesized', 'is examined in literature', 'some researchers propose'
    ],
    forbiddenVerbs: [
        'Andara cures', 'our product treats', 'this heals', 'Andara prevents'
    ],
    forbiddenPatterns: [
        /\bAndara\s+(cures|treats|heals|prevents)/i,
        /\b(using|taking|drinking)\s+Andara\s+(reduces|eliminates|cures)\s+(risk|symptoms|disease)/i,
        /\bour\s+product\s+(cures|treats|heals)/i,
        /\bthis\s+mineral\s+(cures|treats|heals)\s+\w+/i
    ],
    requiredDisclaimer: null, // Educational content doesn't need product disclaimer
    toneGuidance: 'Educational, neutral, research-aware. Speak about general mechanisms. Keep Andara as an example mineral solution, not as treatment.'
};

// === ZONE 3: BRAND LANGUAGE RULES ===

const ZONE_3_RULES: LanguageRules = {
    allowedVerbs: [
        'envisions', 'inspires', 'explores', 'journeys', 'dreams',
        'people report', 'users describe', 'community shares', 'we believe'
    ],
    forbiddenVerbs: [
        'cured their cancer', 'healed their condition', 'treated their disease'
    ],
    forbiddenPatterns: [
        /\bafter\s+(using|drinking)\s+.{0,20}\s+(cured|healed|disappeared)/i,
        /\bdiagnosis\s+.{0,20}\s+(disappeared|gone|reversed)/i,
        /\b(cancer|tumor|disease)\s+.{0,20}\s+(cured|healed|gone)/i,
        /\bmy\s+\w+\s+was\s+cured/i
    ],
    requiredDisclaimer: null,
    toneGuidance: 'Emotional, visionary, aspirational but non-medical. Use words like vision, exploration, journey, inspiration rather than therapy, cure, treatment.'
};

// === ZONE CONTEXT BUILDER ===

export function getZoneContext(zone: ContentZone): ZoneContext {
    switch (zone) {
        case 'product':
            return {
                zone: 'product',
                zoneNumber: 1,
                name: 'Product & Application',
                description: 'Shop pages, usage guides, safety, FAQ, B2B',
                allowedClusters: ZONE_CLUSTERS.product,
                languageRules: ZONE_1_RULES,
                examplePages: ['/shop', '/how-to-use', '/safety', '/faq', '/dilution-guide']
            };
        case 'science':
            return {
                zone: 'science',
                zoneNumber: 2,
                name: 'Science Library & Education',
                description: 'Water science, mineral science, bioelectricity, terrain model',
                allowedClusters: ZONE_CLUSTERS.science,
                languageRules: ZONE_2_RULES,
                examplePages: ['/science/water', '/science/minerals', '/science/bioelectricity']
            };
        case 'brand':
            return {
                zone: 'brand',
                zoneNumber: 3,
                name: 'Brand, Story & Vision',
                description: 'About, story, vision, community, founder',
                allowedClusters: ZONE_CLUSTERS.brand,
                languageRules: ZONE_3_RULES,
                examplePages: ['/about', '/story', '/vision', '/community']
            };
    }
}

// === INTENT CLASSIFIER ===

export function classifyIntent(query: string): ContentZone {
    const queryLower = query.toLowerCase();

    // Score each zone by keyword matches
    const scores: Record<ContentZone, number> = {
        product: 0,
        science: 0,
        brand: 0
    };

    for (const [zone, keywords] of Object.entries(ZONE_KEYWORDS) as [ContentZone, string[]][]) {
        for (const keyword of keywords) {
            if (queryLower.includes(keyword.toLowerCase())) {
                scores[zone] += keyword.length; // Weight by keyword length
            }
        }
    }

    // Find highest scoring zone
    const maxScore = Math.max(...Object.values(scores));

    if (maxScore === 0) {
        // Default to science if no clear match
        return 'science';
    }

    // Return zone with highest score
    for (const [zone, score] of Object.entries(scores) as [ContentZone, number][]) {
        if (score === maxScore) {
            return zone;
        }
    }

    return 'science';
}

// === CLASSIFY BY CLUSTER ===

export function classifyByCluster(clusterKey: string): ContentZone {
    for (const [zone, clusters] of Object.entries(ZONE_CLUSTERS) as [ContentZone, string[]][]) {
        if (clusters.includes(clusterKey)) {
            return zone;
        }
    }
    return 'science'; // Default
}

// === ZONE SYSTEM PROMPT GENERATOR ===

export function generateZoneSystemPrompt(zone: ContentZone): string {
    const context = getZoneContext(zone);
    const rules = context.languageRules;

    let prompt = `
═══════════════════════════════════════════════════════════════════
CONTENT FIREWALL – ACTIVE ZONE: ${zone.toUpperCase()} (Zone ${context.zoneNumber})
${context.name}
═══════════════════════════════════════════════════════════════════

`;

    if (zone === 'product') {
        prompt += `
=== ZONE 1: PRODUCT & APPLICATION ===
You are generating content for product/shop/usage pages.

✅ ALLOWED FOCUS:
- What Andara does to WATER (clarifies, conditions, reduces turbidity)
- How to use (dosage, dilution, testing with turbidity tube)
- Safety information and limitations
- Product specs, composition, origin
- Link "upward" to Science Library for deeper theory

❌ FORBIDDEN (NEVER USE):
- Health/disease claims (treats disease, cures, heals, prevents)
- Body effects (detoxes body, cleanses system, heals gut)
- Medical advice, diagnoses, or therapy language
- Before/after health promises

LANGUAGE PATTERNS:
✅ Use: "${rules.allowedVerbs.slice(0, 5).join('", "')}"
❌ Avoid: "${rules.forbiddenVerbs.slice(0, 4).join('", "')}"

TONE: ${rules.toneGuidance}

REQUIRED DISCLAIMER (include when appropriate):
"${rules.requiredDisclaimer}"
`;
    } else if (zone === 'science') {
        prompt += `
=== ZONE 2: SCIENCE LIBRARY & EDUCATION ===
You are generating educational/scientific content.

✅ ALLOWED FOCUS:
- Water physics, chemistry, bioelectricity explanations
- Mineral science, sulfate chemistry, terrain model, EZ water
- Study references and hypotheses (stated neutrally)
- General biological mechanisms (not tied directly to product)

❌ FORBIDDEN (NEVER USE):
- "Andara cures/treats/heals X"
- "Using Andara reduces risk of Y"
- Direct product → disease cure connections
- Mixing brand with medical advice

LANGUAGE PATTERNS:
✅ Use: "${rules.allowedVerbs.slice(0, 5).join('", "')}"
❌ Avoid: "${rules.forbiddenVerbs.join('", "')}"

TONE: ${rules.toneGuidance}

SEPARATION: Clearly distinguish general science from the specific product.
`;
    } else if (zone === 'brand') {
        prompt += `
=== ZONE 3: BRAND, STORY & VISION ===
You are generating brand narrative/vision content.

✅ ALLOWED FOCUS:
- Brand story (volcanic origin, Bali, lab + temple narrative)
- Vision for future water, cities, regenerative architecture
- Community experiences (anecdotal, careful framing)
- Emotional and metaphysical language
- Founder journey and mission

❌ FORBIDDEN (NEVER USE):
- "This cured my disease" testimonials
- Specific medical outcome stories
- Strong causal statements: product + disease cure

LANGUAGE PATTERNS:
✅ Use: "${rules.allowedVerbs.slice(0, 4).join('", "')}"
❌ Avoid: "${rules.forbiddenVerbs.join('", "')}"

TONE: ${rules.toneGuidance}
`;
    }

    prompt += `

═══════════════════════════════════════════════════════════════════
WHEN GENERATING CONTENT:
1. ALWAYS respect the active zone rules above
2. If crossing zone boundaries, clarify the context
3. NEVER make claims forbidden for this zone
4. Use approved language patterns
5. When in doubt, err on the side of caution
═══════════════════════════════════════════════════════════════════
`;

    return prompt;
}

// === OUTPUT VALIDATION ===

export function validateOutput(content: string, zone: ContentZone): ValidationResult {
    const context = getZoneContext(zone);
    const violations: ValidationResult['violations'] = [];
    const warnings: string[] = [];

    // Check forbidden patterns for this zone
    for (const pattern of context.languageRules.forbiddenPatterns) {
        const matches = content.match(pattern);
        if (matches) {
            violations.push({
                pattern: pattern.toString(),
                match: matches[0],
                severity: 'error',
                suggestion: getSuggestionForViolation(matches[0], zone)
            });
        }
    }

    // Check for forbidden verbs
    for (const verb of context.languageRules.forbiddenVerbs) {
        if (content.toLowerCase().includes(verb.toLowerCase())) {
            violations.push({
                pattern: verb,
                match: verb,
                severity: 'error',
                suggestion: `Replace "${verb}" with zone-appropriate language`
            });
        }
    }

    // Zone 1: Check for missing disclaimer if product-related
    if (zone === 'product' && content.length > 500) {
        if (!content.toLowerCase().includes('not intended to') &&
            !content.toLowerCase().includes('water clarification') &&
            !content.toLowerCase().includes('conditioning only')) {
            warnings.push('Consider adding water-only disclaimer for product content');
        }
    }

    // Check for any cross-zone violations (universal forbidden patterns)
    const universalForbidden = [
        /\b(cure|heal)\s+your\s+(cancer|diabetes|disease)/i,
        /\bmedical\s+treatment/i,
        /\bprescription/i,
        /\breplace\s+your\s+doctor/i
    ];

    for (const pattern of universalForbidden) {
        const matches = content.match(pattern);
        if (matches) {
            violations.push({
                pattern: pattern.toString(),
                match: matches[0],
                severity: 'error',
                suggestion: 'Remove medical claim - forbidden in all zones'
            });
        }
    }

    return {
        isValid: violations.length === 0,
        zone,
        violations,
        warnings,
        sanitizedContent: violations.length > 0 ? sanitizeOutput(content, zone) : undefined
    };
}

// === OUTPUT SANITIZATION ===

export function sanitizeOutput(content: string, zone: ContentZone): string {
    let sanitized = content;

    // Universal replacements (all zones)
    sanitized = sanitized.replace(/\bcures?\b/gi, 'may support');
    sanitized = sanitized.replace(/\bheals?\b/gi, 'is associated with');
    sanitized = sanitized.replace(/\btreats\s+disease/gi, 'conditions water');
    sanitized = sanitized.replace(/\btreats\s+your/gi, 'may benefit your');
    sanitized = sanitized.replace(/\bdetoxes?\s+(your|the)?\s*body/gi, 'conditions water');
    sanitized = sanitized.replace(/\bprevents\s+(cancer|disease|illness)/gi, 'supports overall water quality');
    sanitized = sanitized.replace(/\bmedical\s+treatment/gi, 'wellness practice');
    sanitized = sanitized.replace(/\btherapy\b/gi, 'approach');

    // Zone-specific adjustments
    if (zone === 'product') {
        // Ensure water-focused language
        sanitized = sanitized.replace(/\bimproves\s+your\s+health/gi, 'improves water quality');
        sanitized = sanitized.replace(/\bbenefits\s+your\s+body/gi, 'benefits your water');
    }

    if (zone === 'science') {
        // Ensure neutral research language
        sanitized = sanitized.replace(/\bAndara\s+cures/gi, 'ionic minerals may support');
        sanitized = sanitized.replace(/\bour\s+product/gi, 'ionic sulfate minerals');
    }

    if (zone === 'brand') {
        // Soften health testimonials
        sanitized = sanitized.replace(/\bcured\s+my/gi, 'supported my');
        sanitized = sanitized.replace(/\bhealed\s+my/gi, 'contributed to my');
    }

    return sanitized;
}

// === HELPER: GET SUGGESTION FOR VIOLATION ===

function getSuggestionForViolation(match: string, zone: ContentZone): string {
    const lowerMatch = match.toLowerCase();

    if (lowerMatch.includes('cure')) {
        return zone === 'product'
            ? 'Replace with "clarifies water" or "conditions water"'
            : 'Replace with "may support" or "is associated with"';
    }

    if (lowerMatch.includes('heal')) {
        return zone === 'product'
            ? 'Replace with water treatment language'
            : 'Replace with "studies suggest" or "research indicates"';
    }

    if (lowerMatch.includes('treat')) {
        return 'Replace with "conditions water" (Zone 1) or "may support" (Zone 2)';
    }

    if (lowerMatch.includes('detox')) {
        return 'Replace with "supports water clarification" - avoid body detox claims';
    }

    if (lowerMatch.includes('prevent')) {
        return 'Remove disease prevention claim - focus on water properties';
    }

    return 'Rephrase to avoid health/medical claims';
}

// === DOCUMENT ZONE TAGGING ===

export function inferDocumentZone(source: string, content: string): ContentZone {
    // Check source path first
    const sourceLower = source.toLowerCase();

    if (sourceLower.includes('/shop') || sourceLower.includes('/product') ||
        sourceLower.includes('/how-to') || sourceLower.includes('/safety') ||
        sourceLower.includes('/usage') || sourceLower.includes('/faq')) {
        return 'product';
    }

    if (sourceLower.includes('/science') || sourceLower.includes('/research') ||
        sourceLower.includes('/water') || sourceLower.includes('/mineral') ||
        sourceLower.includes('/bioelectric') || sourceLower.includes('/terrain')) {
        return 'science';
    }

    if (sourceLower.includes('/about') || sourceLower.includes('/story') ||
        sourceLower.includes('/vision') || sourceLower.includes('/community') ||
        sourceLower.includes('/blog')) {
        return 'brand';
    }

    // Fall back to content analysis
    return classifyIntent(content.substring(0, 500));
}

// === ZONE POLICY TABLE (FOR REFERENCE) ===

export const ZONE_POLICY_TABLE = `
| Zone | Main Use | Allowed Focus | Forbidden Focus | Tone |
|------|----------|---------------|-----------------|------|
| 1 (Product) | Shop, usage, safety | Water clarification, dosing, specs | Health/disease claims | Practical, water-only |
| 2 (Science) | Education, library | Theory, studies, mechanisms | Direct product-health promises | Educational, neutral |
| 3 (Brand) | Story, vision | Narrative, emotion, metaphysics | Medical testimonials | Emotional, aspirational |
`;

// === EXPORT ALL ===

export const ContentFirewall = {
    classifyIntent,
    classifyByCluster,
    getZoneContext,
    generateZoneSystemPrompt,
    validateOutput,
    sanitizeOutput,
    inferDocumentZone,
    ZONE_POLICY_TABLE,
    ZONE_CLUSTERS,
    ZONE_KEYWORDS
};
