/**
 * INGEST ANDARA AI KNOWLEDGE
 * 
 * This script teaches the AI RAG system about:
 * 1. Content Firewall (3-zone system) - INTERNAL ONLY
 * 2. Andara Ionic Research Knowledge
 * 3. Zone language rules and compliance
 * 
 * Run with: npx tsx scripts/ingest-ai-knowledge.ts
 */

import 'dotenv/config';
import { ingestDocument, ingestInternalDocument } from '../server/services/knowledge-base';

// ============================================================================
// CONTENT FIREWALL KNOWLEDGE (INTERNAL ONLY)
// ============================================================================

const CONTENT_FIREWALL_KNOWLEDGE = `
# Content Firewall System - Internal AI Knowledge

## Purpose
The Content Firewall ensures all AI-generated content respects the 3-zone governance model:
- Zone 1 (Product): Water treatment language only, no health claims
- Zone 2 (Science): Educational, research-aware, general mechanisms
- Zone 3 (Brand): Emotional, visionary, non-medical storytelling

## The Three Content Zones

### ZONE 1 – PRODUCT & APPLICATION
Goal: Explain the product, usage, what it does to water – WITHOUT health claims.

**Allowed content:**
- Product composition (ionic sulfate minerals, origin, specs)
- What Andara does to water: clarifies, reduces turbidity, changes TDS/EC, pH shift, flocculation
- Usage guides: drops/ml per liter, turbidity tube testing
- Safety & boundaries: "not a food, not a medicine"

**Forbidden in Zone 1:**
- Direct disease or body claims: "treats eczema", "dissolves plaque", "heals gut lining"
- Implying therapeutic use on humans/animals
- Before/after health promises

**Language patterns:**
- Use: "clarifies", "conditions", "structures", "reduces turbidity", "may improve taste"
- Disclaimer: "This product is intended for water clarification and conditioning only."

### ZONE 2 – SCIENCE LIBRARY & EDUCATION
Goal: Explain the underlying science, theory, and mechanisms – still 3D-safe, but more freedom.

**Allowed content:**
- Explanation of: pH, ORP, conductivity, turbidity, EZ water, sulfate chemistry
- Mineral co-factors, enzymes, microbiome, bioelectricity, terrain model
- Discussion of studies and literature (properly neutral)
- Linking concepts to lab measurements: mg/L sulfate, UV measurements

**Forbidden / careful areas:**
- Direct linking of product to disease claims: "Andara cures X"
- "Using Andara reduces risk of Y"
- Mixing brand with medical advice

**Language patterns:**
- Use: "supports", "may contribute", "is associated with", "is discussed as"
- Refer to: "studies", "researchers", "some hypotheses suggest"
- Separate clearly: general science vs. specific product

### ZONE 3 – BRAND, STORY, VISION, COMMUNITY
Goal: Emotion, vision, aesthetics, story – no science claims needed.

**Allowed:**
- Brand story (volcanic origin, Bali, lab + temple narrative)
- Vision (future water, future cities, regenerative architecture)
- Community experiences & experiments (safe, anecdotal form)
- Emotional & metaphysical language

**Forbidden:**
- Concrete medical promises based on someone's story
- "This healed my cancer"
- Strong causal statements combining brand + disease

**Language patterns:**
- Use: "People report feeling…", "many users describe…", "this project aims to…"
- Words like "vision, exploration, journey, inspiration" rather than "therapy, cure, treatment"

## Zone Policy Table

| Zone | Main Use | Allowed Focus | Forbidden Focus | Tone |
|------|----------|---------------|-----------------|------|
| 1 (Product) | Shop, usage, safety | Water clarification, dosing, specs | Health/disease claims | Practical, water-only |
| 2 (Science) | Education, library | Theory, studies, mechanisms | Direct product-health promises | Educational, neutral |
| 3 (Brand) | Story, vision | Narrative, emotion, metaphysics | Medical testimonials | Emotional, aspirational |

## Intent Classification

When a user asks about:
- "price, bundles, how many drops, is this safe" → Zone 1 (product)
- "sulfate function, microbiome, enzymes, EZ water" → Zone 2 (science)
- "brand story, volcano, future water cities" → Zone 3 (brand)

## Output Validation Rules

Always check generated content for:
1. Forbidden patterns (cure, heal, treat disease, detox body)
2. Zone-appropriate language
3. Required disclaimers (Zone 1)
4. Evidence level marking (Zone 2)

If violations found, sanitize by replacing:
- "cures" → "may support"
- "heals" → "is associated with"
- "treats disease" → "conditions water"
- "detoxes body" → "supports water clarification"
`;

// ============================================================================
// ANDARA IONIC CORE KNOWLEDGE
// ============================================================================

const ANDARA_IONIC_CORE_KNOWLEDGE = `
# Andara Ionic Core Knowledge

## Product Definition
- **Brand**: ANDARA IONIC
- **Concept**: Volcanic-origin ionic sulfate mineral concentrate for water treatment & structuring
- **Form**: Fully ionic, sulfate-based solution (no visible particles when diluted)
- **Elements**: Rich spectrum including Fe, Mg, Mn, Cu, B, Li, V, Sr, trace/ultra-trace elements
- **Use**: Water purification, clarification, conditioning (NOT dietary supplement)

## Andara Activation Range
The optimal sulfate concentration in treated water:
- **Target Range**: 17-30 mg/L sulfate
- **Practical Guidance**: 1 ml concentrate per 1 liter water ≈ 17-18 mg/L sulfate

Scientific Basis for this Range:
1. Human plasma sulfate: ~30 mg/L (physiological relevance)
2. EZ water research: Lab tests of EZ-like structuring around sulfate-rich interfaces
3. Water treatment standards: Classical coagulation/clarification optimal at 10-35 mg/L sulfate

## Source Information (Internal Reference)
- Derived from Japanese volcanic black-mica–based mineral technology
- Public Reference: "Volcanic-origin ionic sulfate mineral concentrate"
- Avoid naming specific suppliers publicly unless legally required

## What Andara Does to Water
1. **Flocculation**: Multivalent ions neutralize particle charges, causing aggregation
2. **Clarification**: Suspended particles settle, reducing turbidity
3. **Conductivity**: Increases EC due to ionic mineral content
4. **Structuring**: May promote water organization at mineral interfaces

## Key Differentiators
- High sulfate content (unlike most mineral sources)
- Fully ionic form (not colloidal or solid)  
- Broad trace element spectrum from volcanic origin
- Designed for water treatment, not dietary supplementation
`;

// ============================================================================
// ZONE LANGUAGE EXAMPLES
// ============================================================================

const ZONE_LANGUAGE_EXAMPLES = `
# Zone Language Examples

## Same Topic Across Zones: "Sulfate & Microbiome"

### Zone 1 Answer (Product / Shop FAQ)
"Andara Ionic adds a small amount of sulfate ions to water, in the same order of magnitude as mineral-rich natural springs. Its purpose in the product zone is water clarification and conditioning – helping particles flocculate and settle so the water becomes visibly clearer. The product is not intended to diagnose, treat, or prevent any disease and is used only for conditioning water."

### Zone 2 Answer (Science Library)
"In scientific literature, sulfate ions are discussed as structural and energetic partners in the gut environment. They participate in mucin sulfation, redox cycling, and the ionic conditions that influence microbial communities. Some researchers propose that sulfate availability can shape which microbial species thrive, including certain beneficial bacteria. These are general mechanisms in microbiology and do not refer to any specific commercial product."

### Zone 3 Answer (Brand Story)
"We see sulfate as part of an ancient conversation between minerals and microbes – the unseen agreements that shaped oceans, springs, and, eventually, us. When we talk about 'mineral roots of the microbiome' in our storytelling, we're honoring that relationship on a symbolic level, not prescribing treatments."

## Permitted vs Forbidden Language

### Zone 1 - Product
✅ "Clarifies water and reduces turbidity"
✅ "Conditions water for improved taste"  
✅ "Add 1ml per liter for optimal effect"
❌ "Treats digestive issues"
❌ "Heals the gut lining"
❌ "Detoxifies your body"

### Zone 2 - Science
✅ "Studies suggest sulfate may support mucin production"
✅ "Research indicates ionic minerals are associated with..."
✅ "EZ water theory proposes that interfaces..."
❌ "Andara cures inflammation"
❌ "Using our product treats conditions"

### Zone 3 - Brand
✅ "People report feeling more energized"
✅ "Our vision for future water cities..."
✅ "The volcanic journey from Bali to your glass"
❌ "This cured my arthritis"
❌ "After drinking Andara, my tumor disappeared"
`;

// ============================================================================
// MAIN INGESTION FUNCTION
// ============================================================================

async function main() {
    console.log('🧠 Ingesting AI Knowledge into RAG System...\n');

    try {
        // 1. Ingest Content Firewall (Internal Only)
        console.log('📋 Ingesting Content Firewall knowledge (internal)...');
        const firewallId = await ingestInternalDocument({
            title: 'Content Firewall System - 3 Zone Governance',
            content: CONTENT_FIREWALL_KNOWLEDGE,
            source: 'internal:content-firewall-v1',
            type: 'document',
            metadata: {
                version: '1.0',
                tags: ['firewall', 'zones', 'compliance', 'internal'],
                isInternal: true
            }
        });
        console.log(`   ✅ Firewall knowledge ingested: ${firewallId}`);

        // 2. Ingest Andara Ionic Core Knowledge
        console.log('🔬 Ingesting Andara Ionic core knowledge...');
        const coreId = await ingestDocument({
            title: 'Andara Ionic Core Knowledge',
            content: ANDARA_IONIC_CORE_KNOWLEDGE,
            source: 'teaching:andara-ionic-core',
            type: 'document',
            zone: 'science',
            metadata: {
                version: '1.0',
                tags: ['andara', 'ionic', 'sulfate', 'minerals', 'activation-range']
            }
        });
        console.log(`   ✅ Core knowledge ingested: ${coreId}`);

        // 3. Ingest Zone Language Examples
        console.log('💬 Ingesting zone language examples...');
        const examplesId = await ingestDocument({
            title: 'Zone Language Examples',
            content: ZONE_LANGUAGE_EXAMPLES,
            source: 'teaching:zone-language-examples',
            type: 'document',
            zone: 'science',
            isInternal: true,
            metadata: {
                version: '1.0',
                tags: ['zones', 'language', 'examples', 'compliance']
            }
        });
        console.log(`   ✅ Language examples ingested: ${examplesId}`);

        console.log('\n✅ All AI knowledge successfully ingested!');
        console.log('\nThe AI RAG system now understands:');
        console.log('  • 3-zone content governance (Product/Science/Brand)');
        console.log('  • Andara Ionic activation range (17-30 mg/L sulfate)');
        console.log('  • Zone-appropriate language patterns');
        console.log('  • Health claim boundaries and compliance rules');

    } catch (error) {
        console.error('❌ Error ingesting knowledge:', error);
        process.exit(1);
    }

    process.exit(0);
}

main();
