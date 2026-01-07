/**
 * Layout Library Registry
 * 
 * Comprehensive tagged registry for designers to discover layouts, animations,
 * and styling patterns. Aggregates patterns from:
 * - GPT Layouts (Landing, Product, Article, Utility)
 * - Motion Presets (Framer Motion)
 * - Scroll Effects (GSAP ScrollTrigger)
 * - Tailwind Animations
 * 
 * Usage:
 *   findByTag('crystalline')        → components with crystalline styling
 *   findByUseCase('science-page')   → recommended for science articles
 *   findByVibe('premium', 'liquid') → premium liquid-alchemy aesthetic
 */

// ============================================================================
// TYPES
// ============================================================================

export type LibraryCategory =
    | 'layout'
    | 'card'
    | 'animation'
    | 'scroll-effect'
    | 'transition'
    | 'micro-interaction'
    | 'visual-component';

export type VibeKeyword =
    | 'premium'
    | 'liquid'
    | 'crystalline'
    | 'scientific'
    | 'organic'
    | 'energetic'
    | 'calm'
    | 'dark'
    | 'glowing'
    | 'minimal'
    | 'bold'
    | 'bioelectric'
    | 'water'
    | 'mineral';

export type UseCase =
    | 'landing-page'
    | 'product-page'
    | 'science-page'
    | 'article'
    | 'utility'
    | 'hero-section'
    | 'cta-block'
    | 'feature-grid'
    | 'testimonial'
    | 'pricing'
    | 'navigation';

export interface LibraryEntry {
    id: string;
    name: string;
    category: LibraryCategory;
    description: string;
    tags: string[];
    vibes: VibeKeyword[];
    useCases: UseCase[];
    source: 'gpt-layout' | 'motion-preset' | 'scroll-effect' | 'component' | 'tailwind';
    importPath?: string;
    example?: string;
    relatedIds?: string[];
}

// ============================================================================
// LAYOUT REGISTRY ENTRIES
// ============================================================================

export const LAYOUT_LIBRARY: LibraryEntry[] = [
    // --- GPT LAYOUTS ---
    {
        id: 'landing-layout',
        name: 'LandingLayout',
        category: 'layout',
        description: 'High-conversion landing page with hero, pain/proof sections, and CTA. "The Closer".',
        tags: ['landing', 'hero', 'conversion', 'cta', 'two-column', 'marketing'],
        vibes: ['premium', 'bold', 'energetic'],
        useCases: ['landing-page', 'hero-section', 'cta-block'],
        source: 'gpt-layout',
        importPath: '@/templates/gpt/LandingLayout',
    },
    {
        id: 'product-layout',
        name: 'ProductLayout',
        category: 'layout',
        description: 'E-commerce product page with gallery, specs, and buy actions. "The Sales Engine".',
        tags: ['product', 'ecommerce', 'gallery', 'specs', 'buy-button', 'cart'],
        vibes: ['premium', 'minimal', 'bold'],
        useCases: ['product-page', 'pricing'],
        source: 'gpt-layout',
        importPath: '@/templates/gpt/ProductLayout',
    },
    {
        id: 'article-layout',
        name: 'ArticleLayout',
        category: 'layout',
        description: 'SEO-optimized article with sidebar CTA, definition block, FAQ. "The Net".',
        tags: ['article', 'seo', 'sidebar', 'definition', 'faq', 'content', 'science'],
        vibes: ['scientific', 'calm', 'minimal'],
        useCases: ['science-page', 'article'],
        source: 'gpt-layout',
        importPath: '@/templates/gpt/ArticleLayout',
    },
    {
        id: 'utility-layout',
        name: 'UtilityLayout',
        category: 'layout',
        description: 'Minimal prose layout for legal, support, tools. "The Trust Engine".',
        tags: ['utility', 'legal', 'support', 'minimal', 'prose'],
        vibes: ['minimal', 'calm'],
        useCases: ['utility'],
        source: 'gpt-layout',
        importPath: '@/templates/gpt/UtilityLayout',
    },

    // --- CARD PRESETS ---
    {
        id: 'card-glass',
        name: 'Glass Card',
        category: 'card',
        description: 'Glassmorphism card with blur, border glow, and shadow depth.',
        tags: ['card', 'glass', 'glassmorphism', 'blur', 'glow', 'premium'],
        vibes: ['premium', 'liquid', 'glowing'],
        useCases: ['feature-grid', 'testimonial', 'cta-block'],
        source: 'tailwind',
        example: 'cardPresets.glass',
    },
    {
        id: 'card-hover',
        name: 'Hover Card',
        category: 'card',
        description: 'Interactive card with hover border transition.',
        tags: ['card', 'hover', 'interactive', 'border', 'transition'],
        vibes: ['minimal', 'calm'],
        useCases: ['feature-grid', 'navigation'],
        source: 'tailwind',
        example: 'cardPresets.hover',
    },
    {
        id: 'card-feature',
        name: 'Feature Card',
        category: 'card',
        description: 'Feature highlight card with icon container and description.',
        tags: ['card', 'feature', 'icon', 'highlight'],
        vibes: ['scientific', 'minimal'],
        useCases: ['feature-grid', 'science-page'],
        source: 'tailwind',
        example: 'cardPresets.feature',
    },

    // --- SCROLL ANIMATIONS (Framer Motion) ---
    {
        id: 'scroll-fade-up',
        name: 'Scroll Fade Up',
        category: 'animation',
        description: 'Elements fade in and slide up when scrolled into view.',
        tags: ['scroll', 'fade', 'slide', 'reveal', 'entrance'],
        vibes: ['calm', 'organic'],
        useCases: ['article', 'science-page', 'landing-page'],
        source: 'motion-preset',
        importPath: 'MOTION_PRESETS["scroll-fade-up"]',
    },
    {
        id: 'scroll-fade-up-stagger',
        name: 'Scroll Fade Up Stagger',
        category: 'animation',
        description: 'Children fade in sequentially with stagger delay.',
        tags: ['scroll', 'stagger', 'cascade', 'sequential', 'children'],
        vibes: ['premium', 'organic'],
        useCases: ['feature-grid', 'testimonial', 'pricing'],
        source: 'motion-preset',
        importPath: 'MOTION_PRESETS["scroll-fade-up-stagger"]',
    },
    {
        id: 'scroll-scale-up',
        name: 'Scroll Scale Up',
        category: 'animation',
        description: 'Scale up from small when scrolled into view.',
        tags: ['scroll', 'scale', 'zoom', 'reveal'],
        vibes: ['bold', 'energetic'],
        useCases: ['hero-section', 'cta-block'],
        source: 'motion-preset',
        importPath: 'MOTION_PRESETS["scroll-scale-up"]',
    },

    // --- AMBIENT ANIMATIONS ---
    {
        id: 'ambient-water-ripple',
        name: 'Water Ripple',
        category: 'animation',
        description: 'Subtle continuous ripple effect like water surface.',
        tags: ['ambient', 'loop', 'water', 'ripple', 'organic'],
        vibes: ['liquid', 'water', 'calm', 'organic'],
        useCases: ['hero-section', 'science-page'],
        source: 'motion-preset',
        importPath: 'MOTION_PRESETS["ambient-water-ripple"]',
        relatedIds: ['water-scroll-animation'],
    },
    {
        id: 'ambient-pulse',
        name: 'Ambient Pulse',
        category: 'animation',
        description: 'Gentle pulsing glow effect for highlights.',
        tags: ['ambient', 'loop', 'pulse', 'glow', 'highlight'],
        vibes: ['glowing', 'energetic', 'bioelectric'],
        useCases: ['cta-block', 'feature-grid'],
        source: 'motion-preset',
        importPath: 'MOTION_PRESETS["ambient-pulse"]',
    },
    {
        id: 'crystalline-shimmer-slow',
        name: 'Crystalline Shimmer',
        category: 'animation',
        description: 'Slow crystalline shimmer with subtle rotation and brightness.',
        tags: ['crystalline', 'shimmer', 'crystal', 'glow', 'premium', 'mineral'],
        vibes: ['crystalline', 'premium', 'glowing', 'mineral'],
        useCases: ['science-page', 'hero-section', 'product-page'],
        source: 'motion-preset',
        importPath: 'MOTION_PRESETS["crystalline-shimmer-slow"]',
        relatedIds: ['crystalline-scroll-animation'],
    },

    // --- HOVER ANIMATIONS ---
    {
        id: 'hover-lift-soft',
        name: 'Hover Lift Soft',
        category: 'micro-interaction',
        description: 'Subtle lift and scale on hover for cards.',
        tags: ['hover', 'lift', 'scale', 'card', 'interactive'],
        vibes: ['calm', 'minimal'],
        useCases: ['feature-grid', 'navigation'],
        source: 'motion-preset',
        importPath: 'MOTION_PRESETS["hover-lift-soft"]',
    },
    {
        id: 'hover-glow',
        name: 'Hover Glow',
        category: 'micro-interaction',
        description: 'Subtle brightness increase on hover.',
        tags: ['hover', 'glow', 'brightness', 'interactive'],
        vibes: ['glowing', 'premium'],
        useCases: ['cta-block', 'navigation'],
        source: 'motion-preset',
        importPath: 'MOTION_PRESETS["hover-glow"]',
    },

    // --- GSAP SCROLL EFFECTS ---
    {
        id: 'scroll-parallax',
        name: 'Scroll Parallax',
        category: 'scroll-effect',
        description: 'Elements move slower than scroll for depth effect.',
        tags: ['parallax', 'depth', 'background', 'gsap', 'advanced'],
        vibes: ['premium', 'bold'],
        useCases: ['hero-section', 'landing-page'],
        source: 'scroll-effect',
        importPath: 'ScrollParallax',
    },
    {
        id: 'scroll-pin-zoom',
        name: 'Pin & Zoom',
        category: 'scroll-effect',
        description: 'Pins section and zooms background image.',
        tags: ['pin', 'sticky', 'zoom', 'gsap', 'immersive', 'advanced'],
        vibes: ['bold', 'premium', 'energetic'],
        useCases: ['hero-section', 'landing-page'],
        source: 'scroll-effect',
        importPath: 'PinZoom',
    },
    {
        id: 'scroll-horizontal',
        name: 'Horizontal Scroll',
        category: 'scroll-effect',
        description: 'Converts vertical scroll to horizontal movement.',
        tags: ['horizontal', 'scroll', 'carousel', 'gsap', 'advanced'],
        vibes: ['bold', 'energetic'],
        useCases: ['feature-grid', 'testimonial'],
        source: 'scroll-effect',
        importPath: 'ScrollHorizontal',
    },
    {
        id: 'scroll-3d-rotate',
        name: '3D Rotation',
        category: 'scroll-effect',
        description: 'Elements rotate in 3D space on scroll.',
        tags: ['3d', 'rotate', 'perspective', 'gsap', 'advanced'],
        vibes: ['premium', 'bold'],
        useCases: ['feature-grid', 'product-page'],
        source: 'scroll-effect',
        importPath: 'ScrollRotate3D',
    },
    {
        id: 'scroll-blur',
        name: 'Scroll Blur',
        category: 'scroll-effect',
        description: 'Blurs elements as they leave viewport.',
        tags: ['blur', 'exit', 'fade', 'gsap'],
        vibes: ['calm', 'organic'],
        useCases: ['article', 'science-page'],
        source: 'scroll-effect',
        importPath: 'ScrollBlur',
    },
    {
        id: 'sticky-stack',
        name: 'Sticky Stack',
        category: 'scroll-effect',
        description: 'Cards stack on top as user scrolls.',
        tags: ['sticky', 'stack', 'cards', 'layered', 'gsap'],
        vibes: ['premium', 'bold'],
        useCases: ['feature-grid', 'pricing', 'testimonial'],
        source: 'scroll-effect',
        importPath: 'StickyStackItem',
    },

    // --- VISUAL SCROLL COMPONENTS (GSAP) ---
    {
        id: 'crystalline-scroll-animation',
        name: 'CrystallineScrollAnimation',
        category: 'visual-component',
        description: 'GSAP-powered crystalline matrix formation with 4 phases: Chaos → Alignment → Matrix → Resonance.',
        tags: ['crystalline', 'crystal', 'matrix', 'structure', 'gsap', 'phases', 'scientific', 'mineral'],
        vibes: ['crystalline', 'scientific', 'premium', 'mineral'],
        useCases: ['science-page'],
        source: 'component',
        importPath: '@/components/visuals/CrystallineScrollAnimation',
        relatedIds: ['crystalline-shimmer-slow'],
    },
    {
        id: 'water-scroll-animation',
        name: 'WaterScrollAnimation',
        category: 'visual-component',
        description: 'GSAP water structure visualization with EZ water layers.',
        tags: ['water', 'ez-water', 'layers', 'gsap', 'structure', 'scientific'],
        vibes: ['water', 'liquid', 'scientific', 'calm'],
        useCases: ['science-page'],
        source: 'component',
        importPath: '@/components/visuals/WaterScrollAnimation',
        relatedIds: ['ambient-water-ripple'],
    },
    {
        id: 'bioelectric-scroll-animation',
        name: 'BioelectricScrollAnimation',
        category: 'visual-component',
        description: 'GSAP bioelectric field visualization.',
        tags: ['bioelectric', 'electric', 'field', 'gsap', 'energy', 'scientific'],
        vibes: ['bioelectric', 'energetic', 'glowing', 'scientific'],
        useCases: ['science-page'],
        source: 'component',
        importPath: '@/components/visuals/BioelectricScrollAnimation',
    },
    {
        id: 'vortex-scroll-animation',
        name: 'VortexScrollAnimation',
        category: 'visual-component',
        description: 'GSAP vortex/spiral motion visualization.',
        tags: ['vortex', 'spiral', 'rotation', 'gsap', 'water', 'scientific'],
        vibes: ['water', 'liquid', 'organic', 'energetic'],
        useCases: ['science-page'],
        source: 'component',
        importPath: '@/components/visuals/VortexScrollAnimation',
    },
    {
        id: 'dna-scroll-animation',
        name: 'DnaScrollAnimation',
        category: 'visual-component',
        description: 'GSAP DNA helix animation.',
        tags: ['dna', 'helix', 'biology', 'gsap', 'scientific'],
        vibes: ['scientific', 'organic', 'bioelectric'],
        useCases: ['science-page'],
        source: 'component',
        importPath: '@/components/visuals/DnaScrollAnimation',
    },

    // --- SACRED GEOMETRY ICONS ---
    {
        id: 'icon-sacred-dna',
        name: 'Sacred DNA Icon',
        category: 'visual-component',
        description: 'Animated double helix with glowing nodes and connecting rungs.',
        tags: ['icon', 'dna', 'sacred', 'geometry', 'animated', 'svg'],
        vibes: ['scientific', 'premium', 'glowing', 'bioelectric'],
        useCases: ['science-page', 'hero-section'],
        source: 'component',
        importPath: '@/components/visuals/svg/AndaraIconRegistry',
        example: '<SacredDnaIcon />'
    },
    {
        id: 'icon-sacred-hex',
        name: 'Sacred Hex Icon',
        category: 'visual-component',
        description: 'Rotating hexagonal honeycomb with central triangle and pulse.',
        tags: ['icon', 'hex', 'geometry', 'sacred', 'animated', 'svg'],
        vibes: ['scientific', 'premium', 'crystalline'],
        useCases: ['science-page', 'feature-grid'],
        source: 'component',
        importPath: '@/components/visuals/svg/AndaraIconRegistry',
        example: '<SacredHexTriangleIcon />'
    },
    {
        id: 'icon-sacred-matrix',
        name: 'Sacred Matrix Icon',
        category: 'visual-component',
        description: 'Triangular lattice network with staggered pulsing nodes.',
        tags: ['icon', 'matrix', 'geometry', 'network', 'animated', 'svg'],
        vibes: ['scientific', 'complex', 'glowing'],
        useCases: ['science-page', 'hero-section'],
        source: 'component',
        importPath: '@/components/visuals/svg/AndaraIconRegistry',
        example: '<SacredMatrixIcon />'
    },
    {
        id: 'icon-sacred-network',
        name: 'Sacred Network Icon',
        category: 'visual-component',
        description: 'Complex node mesh with orbiting ring and internal web.',
        tags: ['icon', 'network', 'mesh', 'geometry', 'sacred', 'animated', 'svg'],
        vibes: ['scientific', 'complex', 'glowing', 'energetic'],
        useCases: ['science-page', 'hero-section'],
        source: 'component',
        importPath: '@/components/visuals/svg/AndaraIconRegistry',
        example: '<SacredNetworkIcon />'
    },

    // --- TRANSITIONS ---
    {
        id: 'reveal-from-bottom',
        name: 'Reveal From Bottom',
        category: 'transition',
        description: 'Clip reveal animation from bottom edge.',
        tags: ['reveal', 'clip', 'mask', 'entrance'],
        vibes: ['bold', 'premium'],
        useCases: ['hero-section', 'cta-block'],
        source: 'motion-preset',
        importPath: 'MOTION_PRESETS["reveal-from-bottom"]',
    },
    {
        id: 'typewriter-reveal',
        name: 'Typewriter Reveal',
        category: 'transition',
        description: 'Progressive text reveal like typewriter.',
        tags: ['typewriter', 'text', 'reveal', 'progressive'],
        vibes: ['minimal', 'calm'],
        useCases: ['hero-section', 'article'],
        source: 'motion-preset',
        importPath: 'MOTION_PRESETS["typewriter-reveal"]',
    },
];

// ============================================================================
// SEARCH FUNCTIONS
// ============================================================================

/**
 * Find entries by tag (case-insensitive partial match)
 */
export function findByTag(tag: string): LibraryEntry[] {
    const lowerTag = tag.toLowerCase();
    return LAYOUT_LIBRARY.filter(entry =>
        entry.tags.some(t => t.toLowerCase().includes(lowerTag))
    );
}

/**
 * Find entries by multiple tags (AND logic)
 */
export function findByTags(tags: string[]): LibraryEntry[] {
    return LAYOUT_LIBRARY.filter(entry =>
        tags.every(tag =>
            entry.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
        )
    );
}

/**
 * Find entries by use case
 */
export function findByUseCase(useCase: UseCase): LibraryEntry[] {
    return LAYOUT_LIBRARY.filter(entry => entry.useCases.includes(useCase));
}

/**
 * Find entries by vibe keywords (OR logic - match any)
 */
export function findByVibe(...vibes: VibeKeyword[]): LibraryEntry[] {
    return LAYOUT_LIBRARY.filter(entry =>
        vibes.some(vibe => entry.vibes.includes(vibe))
    );
}

/**
 * Find entries by category
 */
export function findByCategory(category: LibraryCategory): LibraryEntry[] {
    return LAYOUT_LIBRARY.filter(entry => entry.category === category);
}

/**
 * Find entries by source
 */
export function findBySource(source: LibraryEntry['source']): LibraryEntry[] {
    return LAYOUT_LIBRARY.filter(entry => entry.source === source);
}

/**
 * Get entry by ID
 */
export function getById(id: string): LibraryEntry | undefined {
    return LAYOUT_LIBRARY.find(entry => entry.id === id);
}

/**
 * Get related entries for a given entry
 */
export function getRelated(id: string): LibraryEntry[] {
    const entry = getById(id);
    if (!entry?.relatedIds) return [];
    return entry.relatedIds.map(getById).filter(Boolean) as LibraryEntry[];
}

/**
 * Search entries by query (searches name, description, and tags)
 */
export function search(query: string): LibraryEntry[] {
    const lowerQuery = query.toLowerCase();
    return LAYOUT_LIBRARY.filter(entry =>
        entry.name.toLowerCase().includes(lowerQuery) ||
        entry.description.toLowerCase().includes(lowerQuery) ||
        entry.tags.some(t => t.toLowerCase().includes(lowerQuery))
    );
}

/**
 * Get all available tags
 */
export function getAllTags(): string[] {
    const tags = new Set<string>();
    LAYOUT_LIBRARY.forEach(entry => entry.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
}

/**
 * Get all available vibes
 */
export function getAllVibes(): VibeKeyword[] {
    const vibes = new Set<VibeKeyword>();
    LAYOUT_LIBRARY.forEach(entry => entry.vibes.forEach(v => vibes.add(v)));
    return Array.from(vibes).sort();
}

/**
 * Get summary statistics
 */
export function getStats() {
    return {
        total: LAYOUT_LIBRARY.length,
        byCategory: {
            layouts: findByCategory('layout').length,
            cards: findByCategory('card').length,
            animations: findByCategory('animation').length,
            scrollEffects: findByCategory('scroll-effect').length,
            transitions: findByCategory('transition').length,
            microInteractions: findByCategory('micro-interaction').length,
            visualComponents: findByCategory('visual-component').length,
        },
        bySource: {
            gptLayout: findBySource('gpt-layout').length,
            motionPreset: findBySource('motion-preset').length,
            scrollEffect: findBySource('scroll-effect').length,
            component: findBySource('component').length,
            tailwind: findBySource('tailwind').length,
        },
        tags: getAllTags().length,
        vibes: getAllVibes().length,
    };
}

// ============================================================================
// DESIGNER RECOMMENDATIONS
// ============================================================================

/**
 * Get recommended components for a page type
 */
export function getRecommendationsForPage(pageType: 'landing' | 'product' | 'science' | 'article' | 'utility') {
    const mapping: Record<string, { layout: string; animations: string[]; scrollEffects: string[] }> = {
        landing: {
            layout: 'landing-layout',
            animations: ['scroll-fade-up', 'scroll-scale-up', 'hover-lift-soft'],
            scrollEffects: ['scroll-parallax', 'scroll-pin-zoom'],
        },
        product: {
            layout: 'product-layout',
            animations: ['scroll-fade-up', 'hover-glow', 'ambient-pulse'],
            scrollEffects: ['scroll-3d-rotate'],
        },
        science: {
            layout: 'article-layout',
            animations: ['scroll-fade-up-stagger', 'crystalline-shimmer-slow', 'ambient-water-ripple'],
            scrollEffects: ['scroll-blur', 'sticky-stack'],
        },
        article: {
            layout: 'article-layout',
            animations: ['scroll-fade-up', 'hover-lift-soft'],
            scrollEffects: ['scroll-blur'],
        },
        utility: {
            layout: 'utility-layout',
            animations: ['scroll-fade-up'],
            scrollEffects: [],
        },
    };

    const rec = mapping[pageType];
    return {
        layout: getById(rec.layout),
        animations: rec.animations.map(getById).filter(Boolean),
        scrollEffects: rec.scrollEffects.map(getById).filter(Boolean),
    };
}

export default LAYOUT_LIBRARY;
