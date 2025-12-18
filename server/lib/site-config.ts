/**
 * Andara Layout & Cluster Configuration
 * Site architecture and visual vocabulary
 */

// Site cluster ontology
export const CLUSTER_ONTOLOGY = [
    'home',
    'shop',
    'water_science',
    'mineral_science',
    'crystalline_matrix',
    'bioelectricity',
    'terrain_model',
    'spiritual_electricity',
    'trust_lab',
    'blog',
    'support',
    'other'
] as const;

export type ClusterKey = typeof CLUSTER_ONTOLOGY[number];

// Cluster definitions with descriptions
export const CLUSTER_DEFINITIONS: Record<ClusterKey, { name: string; description: string; keywords: string[] }> = {
    home: { name: 'Home', description: 'Landing and overview pages', keywords: ['home', 'landing', 'main'] },
    shop: { name: 'Shop', description: 'Product pages, bundles, checkout', keywords: ['product', 'buy', 'bundle', 'checkout'] },
    water_science: { name: 'Water Science', description: 'EZ Water, structured water, hydration science', keywords: ['ez water', 'structured', 'hydration', 'hexagonal'] },
    mineral_science: { name: 'Mineral Science', description: 'Ionic minerals, sulfate chemistry, trace elements', keywords: ['ionic', 'sulfate', 'minerals', 'trace'] },
    crystalline_matrix: { name: 'Crystalline Matrix', description: 'Crystal structures, water memory, sacred geometry', keywords: ['crystal', 'geometry', 'matrix', 'sacred'] },
    bioelectricity: { name: 'Bioelectricity', description: "Body's electrical system, cellular voltage, mitochondria", keywords: ['bioelectric', 'cellular', 'voltage', 'mitochondria'] },
    terrain_model: { name: 'Terrain Model', description: 'Internal terrain health, Béchamp theory, pH balance', keywords: ['terrain', 'ph', 'balance', 'internal'] },
    spiritual_electricity: { name: 'Spiritual Electricity', description: 'Life force, consciousness, higher vibration', keywords: ['spiritual', 'consciousness', 'life force', 'vibration'] },
    trust_lab: { name: 'Trust Lab', description: 'About us, lab data, certifications, testimonials', keywords: ['about', 'lab', 'certification', 'testimonial'] },
    blog: { name: 'Blog', description: 'News, stories, updates', keywords: ['blog', 'news', 'story', 'update'] },
    support: { name: 'Support', description: 'FAQ, contact, shipping, returns', keywords: ['faq', 'contact', 'shipping', 'returns'] },
    other: { name: 'Other', description: 'Miscellaneous pages', keywords: [] }
};

// Page priority definitions
export const PAGE_PRIORITY = {
    P1: { name: 'P1 - Core', description: 'Core business pages (home, main products, key science overviews) - Must exist' },
    P2: { name: 'P2 - Important', description: 'Important deep-dives and secondary content - Should exist' },
    P3: { name: 'P3 - Supporting', description: 'Supporting content, nice-to-have articles - Optional' }
} as const;

// Page templates
export const PAGE_TEMPLATES = [
    'science-large',
    'science-small',
    'article',
    'product',
    'landing',
    'blog-post'
] as const;

export type PageTemplate = typeof PAGE_TEMPLATES[number];

// Layout vocabulary
export const LAYOUT_VOCABULARY = {
    hero: {
        hero_split: '2-column hero with text and media',
        hero_centered: 'Centered hero with stacked content',
        hero_media_bg: 'Full-width media background hero'
    },
    features: {
        feature_columns: '3-4 icon feature columns',
        benefit_grid: 'Cards grid for benefits',
        icon_bullets: 'Icon + text bullet list'
    },
    process: {
        step_process: 'Numbered step process',
        timeline_vertical: 'Vertical timeline',
        journey_roadmap: 'Journey/roadmap visualization'
    },
    socialProof: {
        testimonial_slider: 'Sliding testimonials',
        testimonial_grid: 'Grid of testimonials',
        logo_wall: 'Partner/certification logos'
    },
    pricing: {
        pricing_table: 'Comparison pricing table',
        offer_highlight: 'Single offer highlight'
    },
    faq: {
        faq_accordion: 'Expandable FAQ accordion',
        tabbed_content: 'Tabbed content sections',
        comparison_table: 'Feature comparison table'
    },
    metrics: {
        stats_highlight: 'Key statistics display',
        highlight_box: 'Highlighted info box'
    },
    content: {
        article_longform: 'Long-form article content',
        blog_list: 'Blog post listing',
        sidebar_content: 'Content with sidebar'
    },
    media: {
        image_gallery_grid: 'Image gallery grid',
        media_caption: 'Media with caption'
    },
    cta: {
        cta_bar: 'Simple CTA bar',
        cta_section: 'Full CTA section'
    }
} as const;

// Get all layout names as flat array
export function getAllLayoutNames(): string[] {
    return Object.values(LAYOUT_VOCABULARY).flatMap(category => Object.keys(category));
}

// Generate layout vocabulary prompt section
export function getLayoutPrompt(): string {
    const sections = Object.entries(LAYOUT_VOCABULARY).map(([category, layouts]) => {
        const layoutList = Object.entries(layouts).map(([name, desc]) => `${name} (${desc})`).join(', ');
        return `**${category.charAt(0).toUpperCase() + category.slice(1)}:** ${layoutList}`;
    });
    return `## LAYOUT VOCABULARY\n${sections.join('\n')}`;
}

// Classify content into cluster based on keywords
export function classifyCluster(content: string): ClusterKey {
    const contentLower = content.toLowerCase();

    for (const [cluster, def] of Object.entries(CLUSTER_DEFINITIONS)) {
        if (def.keywords.some(kw => contentLower.includes(kw))) {
            return cluster as ClusterKey;
        }
    }

    return 'other';
}

// Generate site architecture prompt section
export function getSiteArchitecturePrompt(): string {
    const clusterList = Object.entries(CLUSTER_DEFINITIONS)
        .filter(([k]) => k !== 'other')
        .map(([key, def]) => `- **${key}**: ${def.description}`)
        .join('\n');

    return `## Site Architecture
The site is organized into clusters (pillars):
${clusterList}

## Priority System
${Object.entries(PAGE_PRIORITY).map(([p, def]) => `- **${p}**: ${def.description}`).join('\n')}`;
}
