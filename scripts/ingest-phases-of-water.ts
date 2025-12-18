/**
 * Script to ingest the Phases of Water page specification into the RAG knowledge base.
 * 
 * Usage: npx tsx scripts/ingest-phases-of-water.ts
 */

import { ingestDocument, ingestInternalDocument } from '../server/services/knowledge-base';
import fs from 'fs';
import path from 'path';

async function main() {
    console.log('📚 Ingesting Phases of Water Page Specification into RAG...\n');

    // Read the page spec
    const specPath = path.join(process.cwd(), 'docs/page-specs/phases-of-water.md');
    const specContent = fs.readFileSync(specPath, 'utf-8');

    // Ingest as internal document (for AI learning)
    const docId = await ingestInternalDocument({
        title: 'Page Specification: /phases-of-water',
        content: specContent,
        source: 'page-spec:phases-of-water',
        type: 'document',
        metadata: {
            subType: 'page_specification',
            cluster: 'water_science',
            zone: 'Z2',
            priority: 'P2',
            slug: 'phases-of-water',
            pageType: 'article',
            searchIntent: 'learn',
            schemaTypes: ['Article', 'FAQPage'],
            firewallClass: 'Z2_education',
            primaryKeyword: 'phases of water',
            secondaryKeywords: [
                'states of water',
                'ice structure',
                'steam',
                'structured water phase',
                'EZ water phase',
                'fourth phase of water'
            ],
            bridgePages: [
                '/hexagonal-water-structures',
                '/conductivity-tds-water',
                '/orp-redox-water',
                '/ph-balance-water',
                '/turbidity-clarity',
                '/natural-vs-treated-water',
                '/hydration-layers-interfaces',
                '/structured-water-basics',
                '/ez-water-overview',
                '/light-and-water',
                '/parameter-tracking',
                '/andara-vs-baseline-water-protocol',
                '/home-water-test-kit',
                '/experiments-index',
                '/crystalline-matrix-hub'
            ],
            experiments: [
                'Freeze/Thaw Fingerprint',
                'Open vs Closed Container Drift'
            ],
            faqCount: 5,
            sections: [
                'One-Sentence Definition',
                'Classic Three Phases (Ice, Liquid, Vapor)',
                'Beyond Layer (Interfacial/Structured)',
                'Measurement Importance',
                '4-Parameter Fingerprint',
                'Phase-Related Observations',
                'Experiments',
                'Navigation Block'
            ]
        }
    });

    console.log(`✅ Ingested page specification with ID: ${docId}`);

    // Also ingest the AI teaching pattern
    const teachingDoc = await ingestInternalDocument({
        title: 'AI Learning Pattern: Water Science Page Structure',
        content: `
# Water Science Page Structure Pattern

When generating Water Science pages, follow this structure:

## Required Sections
1. **One-Sentence Definition** - Clear, accessible definition
2. **Foundation Content** - Core concepts broken into digestible parts
3. **Bridge Section** - Connects to related concepts and pages
4. **Measurement Integration** - Link to practical testing (EC, ORP, pH, Turbidity)
5. **Observations** - What users might actually see/experience
6. **Experiments** - Reproducible tests users can try
7. **Navigation Block** - Clear pathways to deeper content

## Key Principles
- Always link to measurement pages when discussing observable properties
- Use "bridge pages" to connect concepts
- Include FAQ section with 4-5 questions
- Maintain Z2 educational zone (no medical claims)
- Temperature is the "master variable" - always mention logging it
- Reference the "4-parameter fingerprint" for testing

## Visual Design
- Use \`data-tree="water"\` for cyan theme
- Include phase transition animations
- Show molecular/structural diagrams
- Experiment cards with step-by-step visuals

## Internal Links Pattern
Every Water Science page should link to:
- At least 2 measurement pages (/conductivity-tds-water, /orp-redox-water, etc.)
- At least 1 protocol page (/parameter-tracking, /andara-vs-baseline-water-protocol)
- At least 2 deeper concept pages (specific to topic)
- The experiments index (/experiments-index)

## Schema Requirements
- Article schema for main content
- FAQPage schema if FAQ section present
- Use proper headline hierarchy
`,
        source: 'ai-pattern:water-science-page-structure',
        type: 'document',
        metadata: {
            subType: 'ai_learning_pattern',
            patternType: 'page_structure',
            cluster: 'water_science',
            appliesTo: ['phases-of-water', 'structured-water-basics', 'ez-water-overview', 'hydration-layers-interfaces']
        }
    });

    console.log(`✅ Ingested AI learning pattern with ID: ${teachingDoc}`);

    console.log('\n🎉 RAG ingestion complete!\n');
    console.log('The AI can now:');
    console.log('  - Search for "phases of water" to retrieve this spec');
    console.log('  - Learn the page structure pattern for Water Science content');
    console.log('  - Generate similar pages following this template');

    process.exit(0);
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
