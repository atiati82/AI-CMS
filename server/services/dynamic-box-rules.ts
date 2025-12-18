/**
 * Dynamic Box Rule Engine
 * 
 * Analyzes page content and applies dynamic enhancement rules
 * based on the dynamicBoxRules defined in hub page JSON specs.
 * 
 * Rules include:
 * - Visual Booster: Add diagrams if missing
 * - Glossary Booster: Add term definitions
 * - Link Booster: Add hub cross-links
 * - Protocol Booster: Add measurement protocol links
 */

import { storage } from '../storage';
import type { Page } from '@shared/schema';

export interface DynamicBoxRule {
    trigger: string;
    placement: string;
    action: string;
    adds?: string[];
    requiredTerms?: string[];
}

export interface PageAnalysis {
    hasTriangleDiagram: boolean;
    hasSO4Diagram: boolean;
    diagramCount: number;
    outboundLinkCount: number;
    hasProtocolLinks: boolean;
    missingTerms: string[];
    hubLinksPresent: string[];
}

export interface AppliedRule {
    ruleName: string;
    action: string;
    placement: string;
    content: string;
}

const DEFAULT_GLOSSARY_TERMS: Record<string, string> = {
    'interface': 'A boundary between two phases where water molecules arrange differently than in bulk water.',
    'lattice': 'A repeating geometric arrangement of atoms, ions, or molecules in a crystal structure.',
    'tetrahedron': 'A 3D shape with 4 triangular faces; the geometry of sulfate (SO₄) ions.',
    'symmetry': 'A balanced or repeating pattern in structure or arrangement.',
    'harmonic': 'A pattern that repeats at regular intervals; used as a design metaphor (3-6-9).',
    'coherence': 'A state of order and alignment in a system.',
    'redox': 'Reduction-oxidation reactions involving electron transfer.',
    'conductivity': 'The ability of water to conduct electricity, indicating dissolved ion content (EC).',
    'turbidity': 'Cloudiness caused by suspended particles; a measure of water clarity.',
    'EZ water': 'Exclusion Zone water — a phase of water with different properties near hydrophilic surfaces.'
};

const HUB_LINKS = {
    water: { label: 'Water Science Hub', href: '/science/water', icon: '💧' },
    bioelectric: { label: 'Bioelectricity Hub', href: '/science/bioelectric', icon: '⚡' },
    geometry: { label: 'Crystalline Matrix', href: '/science/geometry', icon: '◇' },
    mineral: { label: 'Mineral Blueprint', href: '/mineral-science-blueprint', icon: '🔷' },
    map: { label: 'Integrated Map', href: '/water-crystal-geometry-map', icon: '△' }
};

const PROTOCOL_LINKS = [
    { label: 'Parameter Tracking', href: '/parameter-tracking' },
    { label: 'Home Test Kit', href: '/home-water-test-kit' },
    { label: 'Comparison Protocol', href: '/andara-vs-baseline-water-protocol' }
];

/**
 * Analyze page content to understand what's present
 */
export function analyzePageContent(html: string, links: string[] = [], glossaryOverride?: Record<string, string>): PageAnalysis {
    const lowerHtml = html.toLowerCase();
    const termsToCheck = glossaryOverride || DEFAULT_GLOSSARY_TERMS;

    return {
        hasTriangleDiagram: lowerHtml.includes('trianglemapsvg') || lowerHtml.includes('triangle-map'),
        hasSO4Diagram: lowerHtml.includes('so4tetrahedron') || lowerHtml.includes('tetrahedron-diagram'),
        diagramCount: (html.match(/class=".*diagram.*"/gi) || []).length +
            (html.match(/COMPONENT:/gi) || []).length,
        outboundLinkCount: links.length,
        hasProtocolLinks: links.some(l =>
            l.includes('parameter-tracking') ||
            l.includes('home-water-test-kit') ||
            l.includes('baseline-water-protocol')
        ),
        missingTerms: Object.keys(termsToCheck).filter(term =>
            !lowerHtml.includes(`data-glossary="${term}"`) &&
            lowerHtml.includes(term)
        ),
        hubLinksPresent: Object.values(HUB_LINKS)
            .filter(hub => links.includes(hub.href))
            .map(hub => hub.href)
    };
}

/**
 * Generate content for a specific rule action
 */
function generateRuleContent(action: string, analysis: PageAnalysis): string {
    switch (action) {
        case 'addDiagrams':
            // Logic to choose diagram based on page context could go here
            // For now, if it's magnetics, show magnet diagram
            return `
<div class="dynamic-box diagram-booster">
  <div class="grid cols-2">
    <div>
      <!-- COMPONENT: MagnetPlacementDiagram mode="side" size={300} -->
      <p class="caption center-text">Side Placement (Baseline)</p>
    </div>
    <div>
      <!-- COMPONENT: MagnetPlacementDiagram mode="two-sided" size={300} -->
      <p class="caption center-text">Through-Field (Strong)</p>
    </div>
  </div>
</div>`;

        case 'addMagnetPlacementDiagram':
            return `
<div class="dynamic-box diagram-booster">
  <!-- COMPONENT: MagnetPlacementDiagram mode="side" size={300} -->
  <p class="caption">Standard Side Placement Setup</p>
</div>`;

        case 'addTempWarning':
            return `
<div class="dynamic-box warning-booster">
  <h4>🌡️ Temperature Check</h4>
  <p><strong>Critical:</strong> A 1°C shift can change ORP by 10-20mV. Always match temperature between control and test samples before measuring.</p>
</div>`;

        case 'addTriangleMapSVG':
            return `
<div class="dynamic-box diagram-booster">
  <!-- COMPONENT: TriangleMapSVG size={350} -->
  <p class="caption">The Andara Triangle: Water Structure • Mineral Geometry • Fields & Flow</p>
</div>`;

        case 'addSO4Diagram':
            return `
<div class="dynamic-box so4-booster">
  <!-- COMPONENT: SO4TetrahedronDiagram size={280} -->
  <p class="caption">SO₄²⁻ Tetrahedral Geometry</p>
</div>`;

        case 'addGlossaryTooltips':
            const tooltips = analysis.missingTerms.slice(0, 5).map(term =>
                `<span class="glossary-term" data-glossary="${term}" title="${getGlossaryDefinition(term, analysis)}">${term}</span>`
            ).join('');
            return `
<div class="dynamic-box glossary-booster">
  <h4>Key Terms</h4>
  <div class="glossary-chips">${tooltips}</div>
</div>`;

        case 'addHubLinks':
            const missingHubs = Object.values(HUB_LINKS)
                .filter(hub => !analysis.hubLinksPresent.includes(hub.href));
            const hubChips = missingHubs.map(hub =>
                `<a href="${hub.href}" class="chip">${hub.icon} ${hub.label}</a>`
            ).join('\n');
            return `
<div class="dynamic-box hub-booster">
  <h4>Explore Related Hubs</h4>
  <div class="chip-group">${hubChips}</div>
</div>`;

        case 'addProtocolLinks':
        case 'addProtocolLink':
            const protoLinks = PROTOCOL_LINKS.map(p =>
                `<a href="${p.href}" class="chip">${p.label}</a>`
            ).join('\n');
            return `
<div class="dynamic-box protocol-booster">
  <h4>Measurement Protocol</h4>
  <p>Ground your understanding with consistent measurement:</p>
  <div class="chip-group">${protoLinks}</div>
</div>`;

        default:
            return '';
    }
}

/**
 * Evaluate if a rule should trigger based on analysis
 */
function shouldTriggerRule(rule: DynamicBoxRule, analysis: PageAnalysis, html: string): boolean {
    // Check if trigger property exists to prevent runtime errors
    if (!rule || !rule.trigger) return false;

    const trigger = rule.trigger.toLowerCase();

    if (trigger.includes('always show') || trigger.includes('always')) {
        return true;
    }

    if (trigger.includes('temperature mismatch') || trigger.includes('temp mismatch')) {
        // This is a logic checking rule, effectively 'always' for the dynamic list,
        // but semantically distinct.
        return true;
    }

    if (trigger.includes('fewer than 2 diagrams') || trigger.includes('lacks visible triangle')) {
        return analysis.diagramCount < 2;
    }

    if (trigger.includes('missing key definitions') || trigger.includes('missing definitions')) {
        return analysis.missingTerms.length > 0;
    }

    if (trigger.includes('outbound links < 12') || trigger.includes('links <')) {
        return analysis.outboundLinkCount < 12;
    }

    if (trigger.includes('no measurement links') || trigger.includes('parameter-tracking not linked')) {
        return !analysis.hasProtocolLinks;
    }

    if (trigger.includes('no placement diagrams') || trigger.includes('missing diagrams')) {
        return !html.includes('MagnetPlacementdiagram') && !html.includes('<!-- COMPONENT: MagnetPlacementDiagram -->');
    }

    return false;
}

/**
 * Apply dynamic box rules to page content
 */
export function applyDynamicRules(
    html: string,
    rules: Record<string, DynamicBoxRule>,
    internalLinks: string[] = [],
    glossaryTerms?: Record<string, string>
): { enhancedHtml: string; appliedRules: AppliedRule[] } {
    const analysis = analyzePageContent(html, internalLinks, glossaryTerms);
    const appliedRules: AppliedRule[] = [];
    let enhancedHtml = html;

    for (const [ruleName, rule] of Object.entries(rules)) {
        if (shouldTriggerRule(rule, analysis, html)) {
            const content = generateRuleContent(rule.action, analysis);

            if (content) {
                appliedRules.push({
                    ruleName,
                    action: rule.action,
                    placement: rule.placement,
                    content
                });

                // Insert at end of page (before closing section)
                // In production, would parse placement more precisely
                if (enhancedHtml.includes('</section>\n</article>')) {
                    enhancedHtml = enhancedHtml.replace(
                        '</section>\n</article>',
                        `${content}\n</section>\n</article>`
                    );
                } else {
                    enhancedHtml += `\n${content}`;
                }
            }
        }
    }

    return { enhancedHtml, appliedRules };
}

/**
 * Process a page from the database with its dynamic rules
 */
export async function processPageWithRules(pageId: string): Promise<{
    page: Page;
    appliedRules: AppliedRule[];
    originalHtml: string;
    enhancedHtml: string;
}> {
    const page = await storage.getPage(pageId);
    if (!page) {
        throw new Error(`Page not found: ${pageId}`);
    }

    const originalHtml = page.aiStartupHtml || page.content || '';
    const dynamicRules = (page.visualConfig as any)?.dynamicBoxRules || {};
    const internalLinks = (page.aiEnrichment as any)?.internalLinks || [];

    // Fetch glossary terms from settings
    const glossarySetting = await storage.getCmsSetting('glossary_terms');
    const customGlossary = glossarySetting?.value ? (glossarySetting.value as Record<string, string>) : {};
    const glossaryTerms = { ...DEFAULT_GLOSSARY_TERMS, ...customGlossary };

    const { enhancedHtml, appliedRules } = applyDynamicRules(
        originalHtml,
        dynamicRules,
        internalLinks,
        glossaryTerms
    );

    return {
        page,
        appliedRules,
        originalHtml,
        enhancedHtml
    };
}

/**
 * Get glossary term definition
 */
export function getGlossaryDefinition(term: string, analysis?: PageAnalysis): string | undefined {
    // If we have an analysis context with custom terms, we could access them if passed, 
    // but for now we'll check both Default and assume the caller has ensured availability if using custom.
    // Ideally update signature or use a global config pattern if this becomes complex.
    // For simple usage:
    return DEFAULT_GLOSSARY_TERMS[term.toLowerCase()];
}

/**
 * Get all hub links for navigation
 */
export function getHubLinks() {
    return Object.entries(HUB_LINKS).map(([key, value]) => ({
        key,
        ...value
    }));
}

export default {
    analyzePageContent,
    applyDynamicRules,
    processPageWithRules,
    getGlossaryDefinition,
    getHubLinks
};
