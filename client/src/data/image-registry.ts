import { AppRoute } from "@/types/routes";

export interface ImageAsset {
    id: string;
    url: string;
    alt: string;
    tags: string[];
    description: string;
    domColors: string[]; // [Primary, Secondary] - for gradients/overlays
    archetype?: string;  // For "System" grouping
    overlayBlendMode?: 'multiply' | 'screen' | 'overlay' | 'normal' | 'soft-light'; // Custom blend mode for background layers
    routes?: AppRoute[]; // Routes that should automatically use this image
}

// --- OPTIMIZATION (O(1) Lookup) ---
let routeMap: Map<AppRoute, ImageAsset> | null = null;

function initializeRouteMap() {
    if (routeMap) return;
    routeMap = new Map();
    Object.values(IMAGE_REGISTRY).forEach(asset => {
        if (asset.routes) {
            asset.routes.forEach(route => {
                routeMap!.set(route, asset);
            });
        }
    });
}

export function getImageForRoute(path: string): ImageAsset | undefined {
    initializeRouteMap();
    // Use the optimized map for instant lookup
    return routeMap!.get(path as AppRoute);
}

export function getRegistryStats() {
    initializeRouteMap();
    const totalAssets = Object.keys(IMAGE_REGISTRY).length;
    const mappedRoutes = routeMap!.size;
    const assetsWithRoutes = Object.values(IMAGE_REGISTRY).filter(a => a.routes && a.routes.length > 0).length;

    return {
        totalAssets,
        mappedRoutes,
        assetsWithRoutes,
        coveragePercent: Math.round((assetsWithRoutes / totalAssets) * 100)
    };
}

/**
 * Smart keyword-based image matching.
 * Returns the image with the highest tag overlap with the provided keywords.
 */
export function getImageByKeywords(keywords: string[]): ImageAsset | undefined {
    const lowerKeywords = keywords.map(k => k.toLowerCase());
    let bestMatch: ImageAsset | undefined;
    let bestScore = 0;

    Object.values(IMAGE_REGISTRY).forEach(asset => {
        const score = asset.tags.filter(tag => lowerKeywords.includes(tag.toLowerCase())).length;
        if (score > bestScore) {
            bestScore = score;
            bestMatch = asset;
        }
    });

    return bestMatch;
}

/**
 * Get a random image by archetype (e.g., "Mineral", "Water", "Bioelectric")
 */
export function getRandomImageByArchetype(archetype: string): ImageAsset | undefined {
    const matches = Object.values(IMAGE_REGISTRY).filter(
        asset => asset.archetype?.toLowerCase() === archetype.toLowerCase()
    );
    if (matches.length === 0) return undefined;
    return matches[Math.floor(Math.random() * matches.length)];
}

/**
 * Get all images by archetype
 */
export function getImagesByArchetype(archetype: string): ImageAsset[] {
    return Object.values(IMAGE_REGISTRY).filter(
        asset => asset.archetype?.toLowerCase() === archetype.toLowerCase()
    );
}

export const IMAGE_REGISTRY: Record<string, ImageAsset> = {
    // --- MINERAL SOURCES ---
    'mineral-ocean': {
        id: 'mineral-ocean',
        url: '/images/minerals/ocean.png',
        alt: 'Ocean Mineral Macro Texture',
        tags: ['water', 'ocean', 'blue', 'liquid', 'macro', 'mineral', 'fluid'],
        description: 'Macro photography of deep blue ocean water texture, liquid and flowing.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Mineral',
        routes: ['/mineral-sources-comparison', '/trust/comparison-other-mineral-products', '/minerals-hub', '/science/mineral-science-blueprint', '/minerals-and-microbiome', '/science/minerals-microbiome-research-hub']
    },
    'mineral-plant': {
        id: 'mineral-plant',
        url: '/images/minerals/plant.png',
        alt: 'Plant Mineral Macro Texture',
        tags: ['plant', 'green', 'chlorophyll', 'macro', 'nature', 'mineral', 'organic'],
        description: 'Close-up texture of green plant cells and chlorophyll structures.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Plant'
    },
    'mineral-fulvic': {
        id: 'mineral-fulvic',
        url: '/images/minerals/fulvic.png',
        alt: 'Fulvic Mineral Macro Texture',
        tags: ['earth', 'soil', 'brown', 'gold', 'macro', 'mineral', 'humic'],
        description: 'Rich dark earth texture showing humus and organic decomposition.',
        domColors: ['#8b5a2b', '#020617'],
        archetype: 'Fulvic'
    },
    'mineral-salts': {
        id: 'mineral-salts',
        url: '/images/minerals/salts.png',
        alt: 'Sea Salt Macro Texture',
        tags: ['salt', 'crystal', 'white', 'macro', 'mineral', 'structure'],
        description: 'Crystalline lattice structure of raw sea salt.',
        domColors: ['#e8e4e0', '#020617'],
        archetype: 'Salts',
        routes: ['/science/minerals']
    },
    'mineral-volcanic': {
        id: 'mineral-volcanic',
        url: '/images/minerals/volcanic.png',
        alt: 'Volcanic Mineral Macro Texture',
        tags: ['fire', 'volcanic', 'gold', 'ash', 'macro', 'mineral', 'sulfate'],
        description: 'Macro texture of volcanic ash and sulfur rich minerals.',
        domColors: ['#f6d56a', '#020617'],
        archetype: 'Volcanic',
        routes: ['/ferrous-iron-sulphate', '/iron-sulfur-synergy', '/aluminum-school-minerals', '/science/iron-magnesium-silicates', '/science/sulfur-sulfate-overview', '/science/sulfate-chemistry', '/science/sulfur-detox-transport', '/science/sulfur-springs-tradition', '/science/terrain-sulfur', '/science/sulfate-pathways-water-body', '/science/sulfate-structuring-ez', '/science/tetrahedral-sulfate-geometry', '/science/sulfate-activation-range']
    },

    // --- WATER SCIENCE ---
    'water-network': {
        id: 'water-network',
        url: '/images/water/network.png',
        alt: 'Water Molecular Network',
        tags: ['water', 'network', 'blue', 'molecules', 'connection', 'macro'],
        description: 'Abstract network of water molecules and nodes of light in deep blue liquid.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Network',
        overlayBlendMode: 'screen',
        routes: ['/science-library', '/natural-vs-treated-water', '/science/water-science-master', '/science/water-phases', '/science/water-phases-structure-activation', '/science/hydration-clusters', '/science/turbidity-clarity-flocculation', '/science/vortexing-spirals-flow-coherence', '/science/water-memory']
    },
    'water-geometry': {
        id: 'water-geometry',
        url: '/images/water/geometry.png',
        alt: 'Water Crystal Geometry',
        tags: ['water', 'geometry', 'crystal', 'hexagon', 'cyan', 'structure'],
        description: 'Hexagonal water crystal structure, sacred geometry in water.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Geometry',
        routes: ['/science/hexagonal-structures', '/science/crystalline-matrix-overview', '/science/light-mineral-field', '/science/sacred-geometry-water', '/science/ez-geometry-map', '/science/crystal-memory-minerals', '/science/geometric-flow-devices', '/science/geometry-consciousness']
    },
    'water-interface': {
        id: 'water-interface',
        url: '/images/water/interface.png',
        alt: 'EZ Water Interface',
        tags: ['water', 'EZ', 'interface', 'layers', 'purple', 'blue'],
        description: 'Macro cross-section of EZ water interface layers against a surface.',
        domColors: ['#63b4ff', '#020617'],
        archetype: 'Interface',
        overlayBlendMode: 'screen',
        routes: ['/ez-water-overview']
    },
    'water-terrain': {
        id: 'water-terrain',
        url: '/images/water/terrain.png',
        alt: 'Biological Water Terrain',
        tags: ['water', 'terrain', 'biology', 'landscape', 'green', 'organic'],
        description: 'Macro landscape of biological tissue with flowing water rivers.',
        domColors: ['#2cff9a', '#020617'],
        archetype: 'Terrain'
    },
    'water-mineral-interaction': {
        id: 'water-mineral-interaction',
        url: '/images/water/mineral-interaction.png',
        alt: 'Water Mineral Interaction',
        tags: ['water', 'mineral', 'ions', 'gold', 'sparks', 'magic'],
        description: 'Glowing mineral ions floating in structured water, gold and silver sparks.',
        domColors: ['#f2c76c', '#020617'],
        archetype: 'Alchemy'
    },
    'energy-proton-gradient': {
        id: 'energy-proton-gradient',
        url: '/images/water/proton-gradient.png',
        alt: 'Proton Gradient',
        tags: ['proton', 'gradient', 'energy', 'membrane', 'teal', 'glowing'],
        description: 'Glowing H+ ions accumulating on a membrane, teal bioluminescence.',
        domColors: ['#2cff9a', '#020617'],
        archetype: 'Energy',
        overlayBlendMode: 'screen'
    },
    'magnetic-flux': {
        id: 'magnetic-flux',
        url: '/images/water/magnetic-flux.png',
        alt: 'Magnetic Flux Lines',
        tags: ['magnetic', 'flux', 'field', 'purple', 'lines', 'quantum'],
        description: 'Purple and violet magnetic field lines interacting with liquid structure.',
        domColors: ['#9b7bff', '#020617'],
        archetype: 'Magnetics',
        overlayBlendMode: 'screen',
        routes: ['/magnetics-water', '/magnet-placement-experiments']
    },

    // --- BATCH 1: FOUNDATIONS (Header & Jobs) ---
    'water-molecular': {
        id: 'water-molecular',
        url: '/images/water/molecular.png',
        alt: 'Molecular Water',
        tags: ['water', 'molecular', 'H2O', 'chaos', 'blue', 'macro'],
        description: 'Chaotic liquid water molecules moving rapidly.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Molecular',
        overlayBlendMode: 'screen',
        routes: ['/how-andara-works', '/how-andara-works-clarification-conditioning', '/what-is-andara-ionic']
    },
    'water-structured': {
        id: 'water-structured',
        url: '/images/water/structured.png',
        alt: 'Structured Water',
        tags: ['water', 'structured', 'lattice', 'order', 'cyan', 'macro'],
        description: 'Hexagonal water lattice structure, glowing cyan.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Structured',
        routes: ['/structured-water-basics', '/hydration-layers-interfaces']
    },
    'water-field': {
        id: 'water-field',
        url: '/images/water/field.png',
        alt: 'Field-Active Water',
        tags: ['water', 'field', 'liquid-crystal', 'purple', 'macro'],
        description: 'Liquid crystal water responding to electromagnetic fields.',
        domColors: ['#9b7bff', '#020617'],
        archetype: 'Field',
        routes: ['/science/liquid-crystal-biology-overview', '/science/spiritual-electricity-ion-intelligence', '/science/liquid-crystal-bioelectric-bridge', '/science/liquid-crystal-resonance', '/science/liquid-crystal-memory', '/science/consciousness-fields-water', '/science/spiritual-electricity-myths']
    },
    'job-solvent': {
        id: 'job-solvent',
        url: '/images/water/job-solvent.png',
        alt: 'Solvent Water',
        tags: ['water', 'solvent', 'dissolving', 'blue', 'macro'],
        description: 'Water dissolving salt crystals, swirling particles.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Solvent'
    },
    'job-transport': {
        id: 'job-transport',
        url: '/images/water/job-transport.png',
        alt: 'Transport Water',
        tags: ['water', 'transport', 'flow', 'river', 'blood', 'macro'],
        description: 'Liquid river flowing inside a biological tube carrying nutrients.',
        domColors: ['#1aa7ff', '#ff5f5f'],
        archetype: 'Transport'
    },
    'job-structure': {
        id: 'job-structure',
        url: '/images/water/job-structure.png',
        alt: 'Structure Water',
        tags: ['water', 'structure', 'scaffold', 'support', 'cyan', 'macro'],
        description: 'Rigid water scaffold structure supporting a cell.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Structure'
    },
    'job-battery': {
        id: 'job-battery',
        url: '/images/water/job-battery.png',
        alt: 'Battery Water',
        tags: ['water', 'battery', 'charge', 'voltage', 'ions', 'macro'],
        description: 'Biological water battery with charge separation.',
        domColors: ['#2cff9a', '#ff5fd7'],
        archetype: 'Battery',
        overlayBlendMode: 'screen'
    },

    // --- BATCH 2: DYNAMICS (Geometry, Interfaces, Phases) ---
    'geo-hex-holographic': {
        id: 'geo-hex-holographic',
        url: '/images/geometry/hexagonal-water-holographic.png',
        alt: 'Holographic Hexagonal Water Structure',
        tags: ['geometry', 'hologram', 'hex', 'water'],
        description: 'A holographic projection of a hexagonal water structure.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Geometry',
        overlayBlendMode: 'screen',
        routes: ['/science/hexagonal-structures', '/science/water-memory', '/science/triangular-harmonics']
    },
    'water-exclusion-holographic': {
        id: 'water-exclusion-holographic',
        url: '/images/water/exclusion-zone-holographic.png',
        alt: 'Holographic Exclusion Zone',
        tags: ['water', 'EZ', 'hologram', 'shield', 'cyan'],
        description: 'Holographic visualization of water exclusion zone layers.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Interface',
        overlayBlendMode: 'screen'
    },
    'water-battery-holographic': {
        id: 'water-battery-holographic',
        url: '/images/water/electron-treasury-holographic.png',
        alt: 'Holographic Electron Treasury',
        tags: ['water', 'battery', 'hologram', 'energy', 'gold'],
        description: 'Holographic visualization of water as an electron battery.',
        domColors: ['#f6d56a', '#020617'],
        archetype: 'Battery',
        overlayBlendMode: 'screen'
    },
    // Minerals Hub Aliases
    // Minerals Hub Aliases (Renamed to avoid collision)
    'mineral-job-transport': {
        id: 'mineral-job-transport',
        url: '/images/water/conductivity-flow.jpg', // Aliasing to existing or placeholder
        alt: 'Ionic Transport',
        tags: ['conductivity', 'transport', 'ions'],
        description: 'Visualizing ionic transport channels.',
        domColors: ['#3b82f6', '#1e3a8a'],
        archetype: 'Flow'
    },
    'mineral-water-interface': {
        id: 'mineral-water-interface',
        url: '/images/water/hydration-shell-layers.jpg',
        alt: 'Water Interface Layers',
        tags: ['interface', 'ez-water', 'structure'],
        description: 'Layers of structured water at a mineral interface.',
        domColors: ['#06b6d4', '#0891b2'],
        archetype: 'Structure'
    },
    'mineral-bioelectric-context': {
        id: 'mineral-bioelectric-context',
        url: '/images/science/enzymatic-cofactor-lock.jpg',
        alt: 'Enzymatic Cofactor',
        tags: ['enzyme', 'cofactor', 'mineral'],
        description: 'Minerals acting as keys for enzymatic locks.',
        domColors: ['#a855f7', '#7e22ce'],
        archetype: 'Alchemy'
    },
    'ice-hex-holographic': {
        id: 'ice-hex-holographic',
        url: '/images/water/exclusion-zone-holographic.png',
        alt: 'Hexagonal Ice Lattice',
        tags: ['ice', 'hexagonal', 'frozen', 'cyan'],
        description: 'Holographic representation of hexagonal ice lattice.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Structure',
        overlayBlendMode: 'screen'
    },
    'ionic-drops-macro': {
        id: 'ionic-drops-macro',
        url: '/images/water/terrain-clear.png',
        alt: 'Macro View of Ionic Drop',
        tags: ['water', 'drop', 'macro', 'ionic'],
        description: 'Close-up macro view of a structured water drop.',
        domColors: ['#1aa7ff', '#ffffff'],
        archetype: 'Terrain'
    },
    'community-gathering': {
        id: 'community-gathering',
        url: '/images/water/context-education.png',
        alt: 'Community Learning and resonance',
        tags: ['community', 'event', 'education'],
        description: 'Abstract visualization of community resonance and learning.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Context'
    },
    'geo-tetrahedral': {
        id: 'geo-tetrahedral',
        url: '/images/geometry/geo-tetrahedral-gold.svg',
        alt: 'Tetrahedral Geometry',
        tags: ['water', 'geometry', 'tetrahedron', 'molecule', 'gold', 'animated'],
        description: 'Animated golden tetrahedral structure showing molecular stability.',
        domColors: ['#f6d56a', '#020617'],
        archetype: 'Geometry',
        overlayBlendMode: 'screen'
    },
    'geo-hexagonal': {
        id: 'geo-hexagonal',
        url: '/images/geometry/geo-hexagonal-gold.svg',
        alt: 'Hexagonal Geometry',
        tags: ['water', 'geometry', 'hexagon', 'crystal', 'gold', 'animated'],
        description: 'Animated golden hexagonal lattice breathing and rotating.',
        domColors: ['#f6d56a', '#020617'],
        archetype: 'Geometry',
        overlayBlendMode: 'screen'
    },

    'geo-vortex': {
        id: 'geo-vortex',
        url: '/images/geometry/geo-vortex-gold.svg',
        alt: 'Vortex Geometry',
        tags: ['water', 'geometry', 'vortex', 'spiral', 'gold', 'animated'],
        description: 'Animated golden vortex spiral showing implosion dynamics.',
        domColors: ['#f6d56a', '#020617'],
        archetype: 'Geometry',
        routes: ['/vortex-technologies', '/vortex-spiral-hydrodynamics']
    },
    'geo-lotus-flower': {
        id: 'geo-lotus-flower',
        url: '/images/geometry/lotus-flower-gold.svg',
        alt: 'Lotus Flower of Life',
        tags: ['lotusflower of life', 'kryst code', 'source code', 'sacred geometry', 'spiring', 'order', 'love', 'creation'],
        description: 'Golden animated Lotus Flower of Life sacred geometry symbol.',
        domColors: ['#f6d56a', '#020617'],
        archetype: 'Geometry',
        overlayBlendMode: 'screen'
    },
    'interface-bio': {
        id: 'interface-bio',
        url: '/images/water/interface-bio.png',
        alt: 'Bio-Interface',
        tags: ['water', 'interface', 'cell', 'membrane', 'EZ', 'macro'],
        description: 'EZ water layers next to a biological cell membrane.',
        domColors: ['#63b4ff', '#020617'],
        archetype: 'Interface'
    },
    'interface-soil': {
        id: 'interface-soil',
        url: '/images/water/interface-soil.png',
        alt: 'Soil-Interface',
        tags: ['water', 'interface', 'soil', 'root', 'brown', 'gold', 'macro'],
        description: 'Water layers coating soil particles and roots.',
        domColors: ['#f2c76c', '#020617'],
        archetype: 'Interface'
    },
    'phase-bulk': {
        id: 'phase-bulk',
        url: '/images/water/phase-bulk.png',
        alt: 'Bulk Phase Water',
        tags: ['water', 'phase', 'bulk', 'liquid', 'chaos', 'macro'],
        description: 'Chaotic bulk liquid water flow.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Phase'
    },
    'phase-gel': {
        id: 'phase-gel',
        url: '/images/water/phase-gel.png',
        alt: 'Gel Phase Water',
        tags: ['water', 'phase', 'gel', 'viscous', 'structured', 'macro'],
        description: 'Semi-solid gel-phase water structure.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Phase'
    },
    'phase-ordered': {
        id: 'phase-ordered',
        url: '/images/water/phase-ordered.png',
        alt: 'Ordered Phase Water',
        tags: ['water', 'phase', 'ordered', 'crystalline', 'rainbow', 'macro'],
        description: 'Highly ordered water layers with rainbow sheen.',
        domColors: ['#2cff9a', '#020617'],
        archetype: 'Phase',
        routes: ['/phases-of-water']
    },

    // --- BATCH 3: BUILDING BLOCKS (Terrain & Types) ---
    'terrain-clear': {
        id: 'terrain-clear',
        url: '/images/water/terrain-clear.png',
        alt: 'Clear Terrain',
        tags: ['water', 'terrain', 'clear', 'pure', 'macro'],
        description: 'Crystal clear water drop showing high refraction.',
        domColors: ['#1aa7ff', '#ffffff'],
        archetype: 'Terrain'
    },
    'terrain-mineral': {
        id: 'terrain-mineral',
        url: '/images/water/terrain-mineral.png',
        alt: 'Mineral Terrain',
        tags: ['water', 'terrain', 'mineral', 'gold', 'sparkle', 'macro'],
        description: 'Mineral-rich water with gold and silver flecks.',
        domColors: ['#f2c76c', '#020617'],
        archetype: 'Terrain'
    },
    'terrain-coherent': {
        id: 'terrain-coherent',
        url: '/images/water/terrain-coherent.png',
        alt: 'Coherent Terrain',
        tags: ['water', 'terrain', 'coherent', 'blue', 'laser', 'macro'],
        description: 'Coherent water with laser-like alignment.',
        domColors: ['#2cff9a', '#020617'],
        archetype: 'Terrain'
    },
    'type-ocean': {
        id: 'type-ocean',
        url: '/images/water/type-ocean.png',
        alt: 'Ocean Water',
        tags: ['water', 'type', 'ocean', 'salt', 'deep', 'macro'],
        description: 'Deep ocean water, heavy and salt-rich.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Type'
    },
    'type-spring': {
        id: 'type-spring',
        url: '/images/water/type-spring.png',
        alt: 'Spring Water',
        tags: ['water', 'type', 'spring', 'fresh', 'sunlit', 'macro'],
        description: 'Bubbling mountain spring water, fresh and light.',
        domColors: ['#38ffd1', '#ffffff'],
        archetype: 'Type',
        routes: ['/science/springs']
    },
    'type-sulfate': {
        id: 'type-sulfate',
        url: '/images/water/type-sulfate.png',
        alt: 'Sulfate Water',
        tags: ['water', 'type', 'sulfate', 'yellow', 'gold', 'macro'],
        description: 'Sulfate-rich water with oily gold texture.',
        domColors: ['#f2c76c', '#020617'],
        archetype: 'Type'
    },
    'type-pure': {
        id: 'type-pure',
        url: '/images/water/type-pure.png',
        alt: 'Ultra-Pure Water',
        tags: ['water', 'type', 'pure', 'void', 'empty', 'macro'],
        description: 'Ultra-pure water, aggressive and empty.',
        domColors: ['#ffffff', '#020617'],
        archetype: 'Type',
        routes: ['/science/ph-orp-ec']
    },

    // --- BATCH 4: CONTEXT ---
    'context-education': {
        id: 'context-education',
        url: '/images/water/context-education.png',
        alt: 'Education Context',
        tags: ['water', 'education', 'book', 'knowledge', 'blue', 'macro'],
        description: 'Abstract visualization of knowledge as fluid pages.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Context'
    },
    'context-framework': {
        id: 'context-framework',
        url: '/images/water/context-framework.png',
        alt: 'Framework Context',
        tags: ['water', 'framework', 'grid', 'lattice', 'blueprint', 'macro'],
        description: 'Water grid framework connecting pillars.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Context'
    },
    'pillar-mineral': {
        id: 'pillar-mineral',
        url: '/images/water/pillar-mineral.png',
        alt: 'Mineral Pillar',
        tags: ['water', 'pillar', 'mineral', 'crystal', 'stable', 'macro'],
        description: 'Crystalline mineral pillar rising from water.',
        domColors: ['#f2c76c', '#020617'],
        archetype: 'Pillar'
    },
    'pillar-electric': {
        id: 'pillar-electric',
        url: '/images/water/pillar-electric.png',
        alt: 'Electric Pillar',
        tags: ['water', 'pillar', 'electric', 'lightning', 'violet', 'macro'],
        description: 'Electrified water pillar with trapped lightning.',
        domColors: ['#9b7bff', '#020617'],
        archetype: 'Pillar'
    },
    'pillar-matrix': {
        id: 'pillar-matrix',
        url: '/images/water/pillar-matrix.png',
        alt: 'Matrix Pillar',
        tags: ['water', 'pillar', 'matrix', 'holographic', 'data', 'macro'],
        description: 'Sacred geometry water matrix pillar.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Pillar'
    },
    'light-and-water-bg': {
        id: 'light-and-water-bg',
        url: '/images/light-water-bg.png',
        alt: 'Light and Water Interaction',
        tags: ['light', 'water', 'photonic', 'spectrum'],
        description: 'Abstract background representing light interacting with water.',
        domColors: ['#f6d56a', '#020617'],
        archetype: 'Context',
        routes: ['/science/light-sound-water', '/science/light-mineral-field']
    },
    'hydration-layers-bg': {
        id: 'hydration-layers-bg',
        url: '/images/water/interface.png', // Reusing interface image for now
        alt: 'Hydration Layers',
        tags: ['water', 'hydration', 'layers', 'interface'],
        description: 'Hydration layers at a hydrophilic interface.',
        domColors: ['#63b4ff', '#020617'],
        archetype: 'Interface',
        routes: ['/science/water-structure']
    },

    // --- BATCH 5: GENERATED ASSETS (Restored) ---
    'black-mica-bg': {
        id: 'black-mica-bg',
        url: '/images/minerals/black-mica-bg.png',
        alt: 'Black Mica Biotite',
        tags: ['mineral', 'mica', 'biotite', 'gold', 'black'],
        description: 'Macro photography of black mica mineral layers with gold flecks.',
        domColors: ['#000000', '#f6d56a'],
        archetype: 'Mineral',
        routes: ['/black-mica-sulfated-minerals', '/science/minerals/iron-magnesium-silicates']
    },
    'cell-voltage-bg': {
        id: 'cell-voltage-bg',
        url: '/images/bioelectric/cell-voltage-bg.png', // Ensure this file exists
        alt: 'Cell Voltage Potential',
        tags: ['bioelectric', 'cell', 'voltage', 'membrane', 'blue'],
        description: 'Abstract visualization of electric potential across a cell membrane.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Bioelectric',
        overlayBlendMode: 'screen',
        routes: ['/science/cell-voltage', '/science/bioelectricity-invisible-voltage']
    },
    'chem-education-bg': {
        id: 'chem-education-bg',
        url: '/images/education/chem-education-bg.png',
        alt: 'Chemistry Education',
        tags: ['education', 'chemistry', 'molecules', 'learning'],
        description: 'Educational background featuring chemical structures.',
        domColors: ['#1aa7ff', '#ffffff'],
        archetype: 'Education',
        routes: ['/safety-boundaries-legal-use', '/mineral-toxicity-boundaries']
    },
    'crystalline-matrix-bg': {
        id: 'crystalline-matrix-bg',
        url: '/images/geometry/crystalline-matrix-bg.png',
        alt: 'Crystalline Light Matrix',
        tags: ['geometry', 'matrix', 'light', 'cyan', 'crystal'],
        description: 'Glowing sacred geometry lattice structure in deep space.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Geometry',
        overlayBlendMode: 'screen'
    },
    'ionic-colloidal-bg': {
        id: 'ionic-colloidal-bg',
        url: '/images/water/ionic-colloidal-bg.png',
        alt: 'Ionic vs Colloidal',
        tags: ['water', 'ionic', 'colloidal', 'comparison', 'tyndall'],
        description: 'Macro split comparison of clear ionic solution vs cloudy colloid.',
        domColors: ['#ffffff', '#000000'],
        archetype: 'Context'
    },
    'link-lattices-bg': {
        id: 'link-lattices-bg',
        url: '/images/bioelectric/link-lattices-bg.png',
        alt: 'Molecular Link Lattices',
        tags: ['bioelectric', 'lattice', 'grid', 'connection', 'purple'],
        description: 'Glowing purple lattice structures connecting nodes.',
        domColors: ['#9b7bff', '#020617'],
        archetype: 'Bioelectric',
        overlayBlendMode: 'screen',
        routes: ['/dna-mineral-codes', '/mineral-cofactors-enzymes', '/voltage-detox-pathways']
    },
    'terrain-concepts-bg': {
        id: 'terrain-concepts-bg',
        url: '/images/water/terrain-concepts-bg.png',
        alt: 'Terrain Concepts',
        tags: ['bioelectric', 'terrain', 'concepts', 'abstract', 'green'],
        description: 'Abstract visualization of biological terrain concepts.',
        domColors: ['#2cff9a', '#020617'],
        archetype: 'Bioelectric',
        routes: ['/terrain-vs-symptom', '/sulfate-pathways-terrain-model', '/terrain-concepts', '/concepts/terrain-model-overview', '/concepts/water-minerals-terrain', '/concepts/terrain-vs-symptom-thinking', '/concepts/terrain-maps', '/concepts/terrain-principles-everyday', '/science/bioelectric-terrain-model', '/science/terrain-vs-symptom']
    },
    'volcanic-triad-bg': {
        id: 'volcanic-triad-bg',
        url: '/images/minerals/volcanic-triad-bg.png',
        alt: 'Volcanic Mineral Triad',
        tags: ['mineral', 'volcanic', 'sulfur', 'magma', 'gold'],
        description: 'Volcanic mineral formation with glowing veins of sulfur.',
        domColors: ['#f6d56a', '#ff5f5f'],
        archetype: 'Volcanic',
        routes: ['/trust/sourcing', '/trust/certifications', '/trust/lab-methods', '/trust/faq-safety', '/trust/glossary', '/about/andara-story', '/about/founder-message', '/about/vision-mission', '/about/timeline', '/about/overview', '/about/building-andara-library', '/community/events', '/community/join', '/community/newsletter']
    },
    'grid-overlay': {
        id: 'grid-overlay',
        url: '/images/geometry/grid-overlay-bg.png',
        alt: 'Technical Grid Overlay',
        tags: ['geometry', 'grid', 'technical', 'overlay', 'hex'],
        description: 'Hexagonal technical grid overlay pattern.',
        domColors: ['#ffffff', '#000000'],
        archetype: 'UI',
        overlayBlendMode: 'screen'
    },
    'human-cell-membrane': {
        id: 'human-cell-membrane',
        url: '/images/bioelectric/human-cell-membrane-bg.png',
        alt: 'Human Cell Membrane',
        tags: ['biology', 'cell', 'membrane', 'lipid', 'macro'],
        description: 'Lipid bilayer cell membrane macro with ion channels.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Interface'
    },

    // --- BATCH 6: UI ASSETS (Auto-Indexed) ---
    'ui-bioelectric-card': {
        id: 'ui-bioelectric-card',
        url: '/images/bioelectric-maps-card.png',
        alt: 'Bioelectric Maps Card Background',
        tags: ['ui', 'card', 'bioelectric', 'map'],
        description: 'Card background for bioelectric maps section.',
        domColors: ['#020617', '#38ffd1'],
        archetype: 'UI',
        routes: ['/bioelectric-maps-water-body-soil']
    },
    'bioelectric-context': {
        id: 'bioelectric-context',
        url: '/bioelectric-bg.png', // Root public asset
        alt: 'Bioelectric Water Context',
        tags: ['bioelectric', 'water', 'voltage', 'waves'],
        description: 'Abstract bioelectric waves representing water voltage.',
        domColors: ['#020617', '#38ffd1'],
        archetype: 'Context',
        routes: ['/bioelectric-water', '/science/bioelectric-water', '/science/cell-voltage', '/science/charge-coherence', '/science/conductivity-signals', '/science/ion-transport']
    },
    'bioelectric-ion-field': {
        id: 'bioelectric-ion-field',
        url: '/ion-field-bg.png',
        alt: 'Bioelectric Ion Field',
        tags: ['bioelectric', 'ion', 'field', 'conductivity'],
        description: 'Visualizing the conductive ion field.',
        domColors: ['#020617', '#38ffd1'],
        archetype: 'Field',
        routes: ['/bioelectric-conductivity-tissues']
    },
    'bioelectric-proton-gradient': {
        id: 'bioelectric-proton-gradient',
        url: '/proton-gradient-bg.png',
        alt: 'Proton Gradient Energy',
        tags: ['bioelectric', 'proton', 'gradient', 'energy'],
        description: 'Proton gradient representing potential energy.',
        domColors: ['#020617', '#1aa7ff'],
        archetype: 'Energy', // or Field
        overlayBlendMode: 'screen',
        routes: ['/ion-channels-gradients', '/proton-gradients-energy-transfer']
    },
    'ui-minerals-hub-bg': {
        id: 'ui-minerals-hub-bg',
        url: '/images/ui/minerals-hub-bg.jpg', // Verify path
        alt: 'Minerals Hub Background',
        tags: ['ui', 'hub', 'minerals', 'dark'],
        description: 'Deep, dark abstract background for the minerals hub.',
        domColors: ['#020617', '#1e293b'],
        archetype: 'UI',
        routes: ['/bundle-savings-overview', '/product-hub', '/shop', '/andara-ionic-1l-bundles', '/shop/andara-ionic-100ml', '/andara-dilution-calculator', '/tools/dilution-table', '/tools/dilution-calculator', '/products/andara-ionic-100ml', '/products/andara-ionic-1l', '/products/andara-ionic-100ml-bundles', '/products/andara-ionic-1l-bundles', '/compare-bundles', '/ionic-drops', '/how-to-use-andara', '/b2b-reseller']
    },

    // --- BATCH 6: SVGs (Static Assets) ---
    'svg-andara-gold-logo': {
        id: 'svg-andara-gold-logo',
        url: '/andara-gold-logo.svg',
        alt: 'Andara Gold Logo',
        tags: ['svg', 'logo', 'brand', 'gold'],
        description: 'Official Andara gold logo SVG.',
        domColors: ['#f2c76c', '#000000'],
        archetype: 'Brand'
    },
    'svg-andara-icon': {
        id: 'svg-andara-icon',
        url: '/andara-icon.svg',
        alt: 'Andara Icon',
        tags: ['svg', 'icon', 'brand'],
        description: 'Official Andara icon SVG.',
        domColors: ['#1aa7ff', '#000000'],
        archetype: 'Brand'
    },
    'svg-andara-logo-full': {
        id: 'svg-andara-logo-full',
        url: '/andara-logo-full.svg',
        alt: 'Andara Full Logo',
        tags: ['svg', 'logo', 'brand', 'full'],
        description: 'Full width Andara logo SVG.',
        domColors: ['#ffffff', '#000000'],
        archetype: 'Brand'
    },
    'svg-andara-logo': {
        id: 'svg-andara-logo',
        url: '/andara-logo.svg',
        alt: 'Andara Logo Standard',
        tags: ['svg', 'logo', 'brand'],
        description: 'Standard Andara logo SVG.',
        domColors: ['#ffffff', '#000000'],
        archetype: 'Brand'
    },
    'svg-hex-grid-bg': {
        id: 'svg-hex-grid-bg',
        url: '/hex-grid-bg.svg',
        alt: 'Hex Grid Background',
        tags: ['svg', 'background', 'pattern', 'hex'],
        description: 'Hexagonal grid pattern background SVG.',
        domColors: ['#333333', '#000000'],
        archetype: 'UI'
    },

    // --- BATCH 7: PRODUCTS (Recovered Assets) ---
    'product-100ml-zoom': {
        id: 'product-100ml-zoom',
        url: '/assets/andara-bottle-zoom.png',
        alt: 'Andara Ionic 100ml Bottle Zoom',
        tags: ['product', 'bottle', '100ml', 'zoom'],
        description: 'Close up of the 100ml Andara Ionic bottle.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Product',
        routes: ['/shop/andara-ionic-100ml']
    },
    'product-100ml-transparent': {
        id: 'product-100ml-transparent',
        url: '/assets/generated_images/andara-ionic-100ml-transparent.png',
        alt: 'Andara Ionic 100ml - Transparent',
        tags: ['product', '100ml', 'transparent', 'bottle'],
        description: 'High-fidelity isolated product shot of Andara Ionic 100ml bottle.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Product',
        routes: ['/shop/andara-ionic-100ml', '/shop']
    },
    'product-100ml-quad': {
        id: 'product-100ml-quad',
        url: '/assets/generated_images/andara-ionic-100ml-quad-bundle.png',
        alt: 'Andara Ionic 100ml - Ritual Bundle',
        tags: ['product', 'bundle', '100ml', 'quad'],
        description: 'Bundle of 4 Andara Ionic bottles (3+1 Free).',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Product',
        routes: ['/shop/andara-ionic-100ml', '/andara-ionic-100ml-bundles']
    },
    'product-nature-context': {
        id: 'product-nature-context',
        url: '/assets/andara-ionic-100ml-nature.jpg',
        alt: 'Andara Ionic Nature Context',
        tags: ['product', 'context', 'nature', 'water'],
        description: 'Andara Ionic bottle in a natural water setting.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Product'
    },
    'product-1l-placeholder': {
        id: 'product-1l-placeholder',
        url: '/assets/andara-ionic-100ml-nature.jpg', // Re-using nature shot for 1L context for now
        alt: 'Andara Ionic 1L Context',
        tags: ['product', 'bottle', '1L'],
        description: 'Placeholder context image for 1L product.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Product'
    },

    // --- BATCH 8: GENERATED DIAGRAMS (Auto-Indexed) ---
    'cell-battery-diagram': {
        id: 'cell-battery-diagram',
        url: '/images/gen-diagrams/cell-membrane-battery.png',
        alt: 'Cell Membrane Battery Diagram',
        tags: ['diagram', 'battery', 'cell', 'voltage'],
        description: 'Diagram illustrating the cell membrane acting as a capacitor.',
        domColors: ['#1aa7ff', '#ffffff'],
        archetype: 'Diagram'
    },

    // --- BATCH 9: VEO VIDEO ASSETS (Smart Video Production) ---
    'veo-volcano': {
        id: 'veo-volcano',
        url: '/images/veo/frame_1_volcano.png',
        alt: 'Veo Asset: Volcanic Origin',
        tags: ['veo', 'video-asset', 'volcano', 'fire', 'origin'],
        description: 'Cinematic keyframe of cooling volcanic rock with gold veins. Scene 1: Origins.',
        domColors: ['#0f0f0f', '#ffaa00'],
        archetype: 'Cinematic'
    },
    'veo-ionic-dispersion': {
        id: 'veo-ionic-dispersion',
        url: '/images/veo/frame_2_ionic_dispersion.png',
        alt: 'Veo Asset: Ionic Dispersion',
        tags: ['veo', 'video-asset', 'dispersion', 'gold', 'blue'],
        description: 'Microscopic view of minerals dissolving into ionic mist. Scene 2: Dispersion.',
        domColors: ['#1aa7ff', '#ffd700'],
        archetype: 'Cinematic'
    },
    'veo-hexagonal-structure': {
        id: 'veo-hexagonal-structure',
        url: '/images/veo/frame_3_hexagonal_structure.png',
        alt: 'Veo Asset: Hexagonal Structure',
        tags: ['veo', 'video-asset', 'structure', 'hexagon', 'cyan'],
        description: 'Perfect hexagonal water lattice visualization. Scene 3: Structure.',
        domColors: ['#00ffff', '#020617'],
        archetype: 'Cinematic'
    },
    'veo-final-product': {
        id: 'veo-final-product',
        url: '/images/veo/frame_4_final_product_new.png',
        alt: 'Veo Asset: Final Product Hero',
        tags: ['veo', 'video-asset', 'product', 'bottle', 'nature'],
        description: 'Hero shot of Andara Ionic bottle in nature. Scene 4: Product.',
        domColors: ['#1aa7ff', '#ffffff'],
        archetype: 'Product'
    },
    'veo-ez-chaos': {
        id: 'veo-ez-chaos',
        url: '/images/veo/ez_frame_1_chaos_order.png',
        alt: 'Veo Asset: Chaos vs Order',
        tags: ['veo', 'video-asset', 'ez-water', 'chaos', 'order'],
        description: 'Split screen showing chaotic bulk water vs ordered EZ water. Ep 2: Science.',
        domColors: ['#020617', '#00ffff'],
        archetype: 'Scientific'
    },
    'veo-ez-battery': {
        id: 'veo-ez-battery',
        url: '/images/veo/ez_frame_2_battery_charge.png',
        alt: 'Veo Asset: EZ Battery',
        tags: ['veo', 'video-asset', 'ez-water', 'battery', 'charge'],
        description: 'Visualization of the charge separation in EZ water. Ep 2: Science.',
        domColors: ['#00ffff', '#ff00ff'],
        archetype: 'Scientific'
    },
    'veo-ez-light': {
        id: 'veo-ez-light',
        url: '/images/veo/ez_frame_3_light_activation.png',
        alt: 'Veo Asset: Light Activation',
        tags: ['veo', 'video-asset', 'ez-water', 'light', 'infrared'],
        description: 'Infrared light expanding the Exclusion Zone. Ep 2: Science.',
        domColors: ['#ffaa00', '#00ffff'],
        archetype: 'Scientific'
    },
    'veo-master-shot-8s': {
        id: 'veo-master-shot-8s',
        url: '/images/veo/veo_8s_master_shot.png',
        alt: 'Veo Asset: 8s Master Shot',
        tags: ['veo', 'video-asset', 'commercial', 'master-shot', 'split'],
        description: 'Single continuous shot visualization: Chaos to Crystallization. Commercial Spot.',
        domColors: ['#0f0f0f', '#00ffff'],
        archetype: 'Cinematic'
    },
    'veo-viral-reel-12s': {
        id: 'veo-viral-reel-12s',
        url: '/images/veo/veo_12s_viral_reel.png',
        alt: 'Veo Asset: 12s Viral Reel',
        tags: ['veo', 'video-asset', 'viral', 'reel', 'vertical'],
        description: 'Vertical format high-energy montage keyframe. Social Spot.',
        domColors: ['#00ffff', '#020617'],
        archetype: 'Social'
    },

    // --- BATCH 9: HOME PAGE V7 ASSETS (Restored & Mapped) ---
    'glass-origin-highlight': {
        id: 'glass-origin-highlight',
        url: '/assets/origin-highlight.png',
        alt: 'Origin Highlight',
        tags: ['highlight', 'origin', 'background'],
        description: 'Highlight image for Origin section.',
        domColors: ['#f6d56a', '#000000'],
        archetype: 'Highlight'
    },
    'glass-activation-highlight': {
        id: 'glass-activation-highlight',
        url: '/assets/activation-highlight.png',
        alt: 'Activation Highlight',
        tags: ['highlight', 'activation', 'background'],
        description: 'Highlight image for Activation section.',
        domColors: ['#f6d56a', '#000000'],
        archetype: 'Highlight'
    },
    'glass-structure': {
        id: 'glass-structure',
        url: '/assets/generated_images/sulfate_tetrahedron_water_purification.png',
        alt: 'Sulfate Tetrahedron Structure',
        tags: ['structure', 'sulfate', 'tetrahedron'],
        description: 'Detail of sulfate tetrahedron structure.',
        domColors: ['#38ffd1', '#000000'],
        archetype: 'Structure'
    },
    'glass-chemistry': {
        id: 'glass-chemistry',
        url: '/assets/generated_images/ethereal-scientific-visualization-of-ion_ae00251c.png',
        alt: 'Ionic Chemistry Visualization',
        tags: ['chemistry', 'ions', 'visualization'],
        description: 'Scientific visualization of ionic chemistry.',
        domColors: ['#1aa7ff', '#000000'],
        archetype: 'Chemistry'
    },
    'glass-geometry': {
        id: 'glass-geometry',
        url: '/assets/generated_images/ethereal-scientific-visualization-of-wat_8a9b8e3d.png',
        alt: 'Water Geometry Visualization',
        tags: ['geometry', 'water', 'visualization'],
        description: 'Scientific visualization of water geometry.',
        domColors: ['#38ffd1', '#000000'],
        archetype: 'Geometry'
    },
    'product-100ml-nature': {
        id: 'product-100ml-nature',
        url: '/assets/products/andara-volcanic-origin.png',
        alt: 'Andara Ionic 100ml in Potential',
        tags: ['product', '100ml', 'nature'],
        description: 'Andara Ionic 100ml bottle with volcanic energetic context.',
        domColors: ['#000000', '#f6d56a'],
        archetype: 'Product'
    },
    'product-1l-refill': {
        id: 'product-1l-refill',
        url: '/assets/products/andara-studio-clean.png',
        alt: 'Andara Ionic 1L Clean',
        tags: ['product', '1l', 'clean'],
        description: 'Andara Ionic 1L bottle in clean studio context.',
        domColors: ['#ffffff', '#000000'],
        archetype: 'Product'
    },


    'hydration-stack-diagram': {
        id: 'hydration-stack-diagram',
        url: '/images/gen-diagrams/hydration-stack.png',
        alt: 'Hydration Layer Stacking Diagram',
        tags: ['diagram', 'water', 'EZ', 'stacking', 'layers'],
        description: 'Cross-section of water exclusion zones stacking at an interface.',
        domColors: ['#020617', '#38ffd1'],
        archetype: 'Diagram',
        routes: ['/hydration-layers-interfaces']
    },
    'logic-strata-diagram': {
        id: 'logic-strata-diagram',
        url: '/images/gen-diagrams/logic-strata.png',
        alt: 'Holographic Logic Strata',
        tags: ['diagram', 'logic', 'hologram', 'data', 'strata'],
        description: 'Futuristic holographic visualization of logic layers.',
        domColors: ['#020617', '#9b7bff'],
        archetype: 'Diagram',
        overlayBlendMode: 'screen',
        routes: ['/bioelectricity-invisible-voltage']
    },
    'mineral-triad-diagram': {
        id: 'mineral-triad-diagram',
        url: '/images/gen-diagrams/mineral-triad.png',
        alt: 'Mineral Triad: Fe-Mg-Si',
        tags: ['diagram', 'mineral', 'triad', 'geometry', 'gold'],
        description: 'Alchemical triangle diagram connecting Iron, Magnesium, and Silicates.',
        domColors: ['#020617', '#f6d56a'],
        archetype: 'Diagram',
        overlayBlendMode: 'screen',
        routes: ['/science/minerals/iron-magnesium-silicates']
    },
    'shipping-box-graphic': {
        id: 'shipping-box-graphic',
        url: '/images/gen-diagrams/shipping-box.png',
        alt: 'Andara Global Shipping Box',
        tags: ['graphic', 'shipping', 'box', 'packaging', 'black'],
        description: 'Sleek black shipping box with gold Andara branding.',
        domColors: ['#000000', '#f6d56a'],
        archetype: 'Product',
        routes: ['/global-shipping-packaging', '/support/shipping-returns']
    },
    'search-help-graphic': {
        id: 'search-help-graphic',
        url: '/images/gen-diagrams/search-help.png',
        alt: 'Search and Help Interface',
        tags: ['graphic', 'ui', 'search', 'help', 'hud'],
        description: 'Futuristic HUD interface for search and assistance.',
        domColors: ['#020617', '#1aa7ff'],
        archetype: 'UI',
        overlayBlendMode: 'screen',
        routes: ['/faq-product-application', '/applications/travel-portable-water', '/applications/steam-sauna', '/applications/cleaning-surfaces', '/applications/water-devices', '/applications/travel-mobile', '/applications/detox-protocol-support', '/applications/drinking-water-home', '/applications/cooking-tea-coffee', '/applications/plant-watering', '/applications/shower-bath', '/applications/soil-garden', '/support/how-to-prepare-water', '/support/how-to-choose-dose', '/support/troubleshooting-water', '/support/shipping-returns', '/support/resources-downloads']
    },

    // --- BATCH 9: VISUAL AUDIT GENERATION (High Priority) ---
    'voltage-highways-hero': {
        id: 'voltage-highways-hero',
        url: '/images/bioelectric/voltage-detox-pathways.png',
        alt: 'Bioelectric Voltage Highways',
        tags: ['bioelectric', 'voltage', 'detox', 'pathways', 'blue', 'glass'],
        description: 'Scientific visualization of bioelectric voltage pathways and cellular detox zones.',
        domColors: ['#1aa7ff', '#f6d56a'],
        archetype: 'Bioelectric',
        routes: ['/science/voltage-detox-pathways']
    },
    'proton-motive-hero': {
        id: 'proton-motive-hero',
        url: '/images/bioelectric/proton-gradients-energy.png',
        alt: 'Mitochondrial Proton Gradients',
        tags: ['proton', 'gradient', 'mitochondria', 'energy', 'teal', 'glass'],
        description: 'Detailed visualization of proton gradients and ATP energy generation.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Energy',
        overlayBlendMode: 'screen',
        routes: ['/science/proton-gradients-energy-transfer']
    },
    'bioelectric-proof-hero': {
        id: 'bioelectric-proof-hero',
        url: '/images/bioelectric/bioelectric-case-studies.png',
        alt: 'Bioelectric Field Restoration',
        tags: ['bioelectric', 'restoration', 'healing', 'data', 'glass', 'violet'],
        description: 'Human bioelectric field restoration visualization with data overlays.',
        domColors: ['#9b7bff', '#38ffd1'],
        archetype: 'Bioelectric',
        routes: ['/bioelectric-case-studies']
    },

    // --- BATCH 10: VISUAL AUDIT GENERATION (High Priority - Batch 2) ---
    'liquid-crystal-hero': {
        id: 'liquid-crystal-hero',
        url: '/images/water/liquid-crystal-biology.png',
        alt: 'Biological Liquid Crystal Water',
        tags: ['water', 'liquid-crystal', 'biology', 'coherence', 'blue', 'glass'],
        description: 'Scientific visualization of water as a liquid crystal lattice within biological tissue.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Structure',
        routes: ['/liquid-crystal-biology']
    },
    'magnetic-water-hero': {
        id: 'magnetic-water-hero',
        url: '/images/water/magnetics-water.png',
        alt: 'Magnetic Water Interaction',
        tags: ['water', 'magnetics', 'flux', 'toroidal', 'purple', 'glass'],
        description: 'Magnetic fields organizing water molecules into toroidal flow structures.',
        domColors: ['#9b7bff', '#020617'],
        archetype: 'Magnetics',
        routes: ['/science/magnetics-water']
    },
    'natural-springs-hero': {
        id: 'natural-springs-hero',
        url: '/images/water/natural-springs.png',
        alt: 'Natural Spring Source',
        tags: ['water', 'spring', 'nature', 'vortex', 'green', 'glass'],
        description: 'Pristine natural spring water emerging from mineral-rich earth.',
        domColors: ['#2cff9a', '#ffffff'],
        archetype: 'Type',
        routes: ['/science/springs']
    },

    // --- BATCH 11: VISUAL AUDIT GENERATION (High Priority - Batch 3) ---
    'microbiome-minerals-hero': {
        id: 'microbiome-minerals-hero',
        url: '/images/minerals/minerals-microbiome.png',
        alt: 'Minerals and Microbiome',
        tags: ['minerals', 'microbiome', 'bacteria', 'gut', 'gold', 'green', 'diagram'],
        description: 'Scientific visualization of healthy gut microbiome powered by ionic minerals.',
        domColors: ['#2cff9a', '#f6d56a'],
        archetype: 'Mineral', // or Biology
        routes: ['/minerals-and-microbiome']
    },

    // Batch 4: Medium Priority - Science Hubs
    'science-library-hero': {
        id: 'science-library-hero',
        url: '/images/hubs/science-library-hero.png',
        alt: 'Andara Science Library',
        tags: ['hub', 'science', 'library', 'education'],
        description: 'A grand, ethereal library of water structures and mineral crystals.',
        domColors: ['#0f172a', '#3b82f6', '#94a3b8'],
        archetype: 'structure',
        overlayBlendMode: 'overlay',
        routes: ['/science-library'] as AppRoute[],
    },
    'water-hub-hero': {
        id: 'water-hub-hero',
        url: '/images/hubs/water-hub-hero.png',
        alt: 'Water Science Hub',
        tags: ['hub', 'water', 'science', 'network'],
        description: 'Interconnected flowing water streams forming a network or web.',
        domColors: ['#0ea5e9', '#0284c7', '#e0f2fe'],
        archetype: 'flow',
        overlayBlendMode: 'screen',
        routes: ['/water-science-architecture-of-life'] as AppRoute[],
    },
    'mineral-hub-hero': {
        id: 'mineral-hub-hero',
        url: '/images/hubs/mineral-hub-hero.png',
        alt: 'Mineral Science Blueprint',
        tags: ['hub', 'minerals', 'science', 'blueprint'],
        description: 'A detailed blueprint or schematic overlay on top of raw crystalline mineral formations.',
        domColors: ['#581c87', '#fbbf24', '#64748b'],
        archetype: 'structure',
        overlayBlendMode: 'overlay',
        routes: ['/mineral-science-blueprint'] as AppRoute[],
    },
    'minerals-index-hero': {
        id: 'minerals-index-hero',
        url: '/images/hubs/minerals-index-hero.png',
        alt: 'Minerals Index Collection',
        tags: ['hub', 'minerals', 'collection', 'elements'],
        description: 'A curated collection of various vibrant mineral samples displayed artistically.',
        domColors: ['#b45309', '#d97706', '#78350f'],
        archetype: 'matter',
        routes: ['/minerals-hub'] as AppRoute[],
    },

    // Batch 5: Medium Priority - Tools & Ops
    'dilution-calculator-hero': {
        id: 'dilution-calculator-hero',
        url: '/images/tools/dilution-calculator-hero.png',
        alt: 'Scientific glassware illustrating precise dilution ratios for ionic mineral solutions',
        tags: ['tools', 'calculator', 'science', 'math', 'precision'],
        description: 'Hero image for the Dilution Calculator tool',
        domColors: ['#E0F7FA', '#006064', '#00BCD4'],
        archetype: 'structure',
        overlayBlendMode: 'multiply',
        routes: ['/tools/dilution-calculator'] as AppRoute[],
    },
    'dilution-table-hero': {
        id: 'dilution-table-hero',
        url: '/images/tools/dilution-table-hero.png',
        alt: 'Reference table and charts for mineral dilution protocols',
        tags: ['tools', 'reference', 'data', 'chart', 'guide'],
        description: 'Hero image for the Dilution Reference Table',
        domColors: ['#F3E5F5', '#4A148C', '#AB47BC'],
        archetype: 'structure',
        overlayBlendMode: 'multiply',
        routes: ['/tools/dilution-table'] as AppRoute[],
    },
    'shipping-hero': {
        id: 'shipping-hero',
        url: '/images/tools/shipping-hero.png',
        alt: 'Global logistics map visualizing shipping networks',
        tags: ['tools', 'shipping', 'global', 'logistics', 'map'],
        description: 'Hero image for Global Shipping and Packaging visualization.',
        domColors: ['#E3F2FD', '#1565C0', '#1E88E5'],
        archetype: 'Structure',
        overlayBlendMode: 'multiply',
        routes: ['/global-shipping-packaging'] as AppRoute[],
    },

    'hydration-clusters-hero': {
        id: 'hydration-clusters-hero',
        url: '/images/water/hydration-clusters.png',
        alt: 'Hydration Clusters Microstructure',
        tags: ['water', 'hydration', 'clusters', 'structure', 'cyan', 'molecular'],
        description: 'Molecular visualization of hydration clusters and water microstructure.',
        domColors: ['#1aa7ff', '#38ffd1'],
        archetype: 'Structure',
        routes: ['/hydration-clusters-microstructure', '/structured-water-basics']
    },
    'spiritual-electricity-hero': {
        id: 'spiritual-electricity-hero',
        url: '/images/bioelectric/spiritual-electricity.png',
        alt: 'Spiritual Electricity',
        tags: ['spiritual', 'electricity', 'conscousness', 'ions', 'violet', 'cosmic'],
        description: 'Abstract visualization of spiritual electricity and ion intelligence.',
        domColors: ['#9b7bff', '#f6d56a'],
        archetype: 'Bioelectric',
        routes: ['/spiritual-electricity-ion-intelligence']
    },
    // --- BATCH 9: V6 GLASS JOURNEY ---
    'glass-origin': {
        id: 'glass-origin',
        url: '/images/visuals/glass-origin.png',
        alt: 'Primordial Origin Glass',
        tags: ['glass', 'origin', 'amber', 'gold', 'abstract'],
        description: 'Abstract molten glass sphere representing primordial origin.',
        domColors: ['#d97706', '#000000'],
        archetype: 'Glass'
    },
    'glass-clarity': {
        id: 'glass-clarity',
        url: '/images/visuals/glass-clarity.png',
        alt: 'Ionic Clarity Glass',
        tags: ['glass', 'clarity', 'cyan', 'crystal', 'abstract'],
        description: 'Abstract hexagonal cyan crystal prism representing clarity.',
        domColors: ['#06b6d4', '#000000'],
        archetype: 'Glass'
    },
    'glass-activation': {
        id: 'glass-activation',
        url: '/images/visuals/glass-activation.png',
        alt: 'Bioelectric Activation Glass',
        tags: ['glass', 'activation', 'blue', 'electric', 'fluid'],
        description: 'Abstract electric blue liquid glass splash representing activation.',
        domColors: ['#3b82f6', '#000000'],
        archetype: 'Glass'
    },
    'glass-resonance': {
        id: 'glass-resonance',
        url: '/images/visuals/glass-resonance.png',
        alt: 'Cellular Resonance Glass',
        tags: ['glass', 'resonance', 'purple', 'dna', 'helix'],
        description: 'Abstract purple glass helix representing cellular resonance.',
        domColors: ['#8b5cf6', '#000000'],
        archetype: 'Glass'
    },
    'glass-star-beam': {
        id: 'glass-star-beam',
        url: '/images/visuals/star-beam-bg.png',
        alt: 'Cosmic Star Beam',
        tags: ['background', 'space', 'stars', 'beam'],
        description: 'Cinematic star background with central light beam.',
        domColors: ['#000000', '#ffffff'],
        archetype: 'Background'
    },

    // --- BATCH 12: UNINDEXED MACRO ASSETS (Dec 30, 2025) ---
    'macro-magnetic-flux': {
        id: 'macro-magnetic-flux',
        url: '/images/water/magnetic_flux_macro_1766233412476.png',
        alt: 'Magnetic Flux Macro',
        tags: ['magnetic', 'flux', 'field', 'purple', 'macro', 'lines'],
        description: 'Macro photography of magnetic flux lines in water.',
        domColors: ['#9b7bff', '#020617'],
        archetype: 'Magnetics',
        routes: ['/magnet-placement-experiments'] as AppRoute[]
    },
    'macro-mineral-fulvic': {
        id: 'macro-mineral-fulvic',
        url: '/images/water/mineral_fulvic_macro_1766231557090.png',
        alt: 'Fulvic Mineral Macro',
        tags: ['mineral', 'fulvic', 'earth', 'gold', 'macro', 'humic'],
        description: 'Macro photography of fulvic acid mineral deposits.',
        domColors: ['#8b5a2b', '#020617'],
        archetype: 'Mineral'
    },
    'macro-mineral-ocean': {
        id: 'macro-mineral-ocean',
        url: '/images/water/mineral_ocean_macro_1766231523218.png',
        alt: 'Ocean Mineral Macro',
        tags: ['mineral', 'ocean', 'sea', 'blue', 'macro', 'salt'],
        description: 'Macro photography of oceanic mineral structures.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Mineral'
    },
    'macro-mineral-plant': {
        id: 'macro-mineral-plant',
        url: '/images/water/mineral_plant_macro_1766231538557.png',
        alt: 'Plant Mineral Macro',
        tags: ['mineral', 'plant', 'green', 'chlorophyll', 'macro', 'organic'],
        description: 'Macro photography of plant-derived mineral structures.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Mineral'
    },
    'macro-mineral-salt': {
        id: 'macro-mineral-salt',
        url: '/images/water/mineral_salt_macro_1766231571686.png',
        alt: 'Salt Crystal Macro',
        tags: ['mineral', 'salt', 'crystal', 'white', 'macro', 'structure'],
        description: 'Macro photography of crystalline salt mineral structures.',
        domColors: ['#e8e4e0', '#020617'],
        archetype: 'Mineral'
    },
    'macro-mineral-volcanic': {
        id: 'macro-mineral-volcanic',
        url: '/images/water/mineral_volcanic_macro_1766231591599.png',
        alt: 'Volcanic Mineral Macro',
        tags: ['mineral', 'volcanic', 'fire', 'gold', 'macro', 'sulfate'],
        description: 'Macro photography of volcanic mineral deposits with sulfate veins.',
        domColors: ['#f6d56a', '#020617'],
        archetype: 'Volcanic',
        routes: ['/mineral-origin', '/black-mica-sulfated-minerals'] as AppRoute[]
    },
    'macro-water-geometry': {
        id: 'macro-water-geometry',
        url: '/images/water/water_geometry_macro_1766233067908.png',
        alt: 'Water Geometry Macro',
        tags: ['water', 'geometry', 'hexagon', 'crystal', 'macro', 'structure'],
        description: 'Macro photography of hexagonal water crystal geometry.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Geometry',
        routes: ['/science/hexagonal-structures'] as AppRoute[]
    },
    'macro-water-interface': {
        id: 'macro-water-interface',
        url: '/images/water/water_interface_macro_1766233086097.png',
        alt: 'Water Interface Macro',
        tags: ['water', 'interface', 'EZ', 'layers', 'macro', 'blue'],
        description: 'Macro photography of water interface layers.',
        domColors: ['#63b4ff', '#020617'],
        archetype: 'Interface'
    },
    'macro-water-mineral': {
        id: 'macro-water-mineral',
        url: '/images/water/water_mineral_macro_1766233122742.png',
        alt: 'Water Mineral Interaction Macro',
        tags: ['water', 'mineral', 'ions', 'gold', 'macro', 'sparks'],
        description: 'Macro photography of mineral ions floating in structured water.',
        domColors: ['#f2c76c', '#020617'],
        archetype: 'Alchemy'
    },
    'macro-water-network': {
        id: 'macro-water-network',
        url: '/images/water/water_network_macro_1766233048524.png',
        alt: 'Water Network Macro',
        tags: ['water', 'network', 'molecules', 'blue', 'macro', 'connection'],
        description: 'Macro photography of water molecular network.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Network'
    },
    'macro-proton-gradient': {
        id: 'macro-proton-gradient',
        url: '/images/water/proton_gradient_macro_1766233372440.png',
        alt: 'Proton Gradient Macro',
        tags: ['proton', 'gradient', 'energy', 'membrane', 'macro', 'teal'],
        description: 'Macro photography of proton gradient accumulation.',
        domColors: ['#2cff9a', '#020617'],
        archetype: 'Energy'
    },

    // --- BATCH 13: GENERATED WATER VISUALS ---
    'gen-water-chaotic': {
        id: 'gen-water-chaotic',
        url: '/images/generated/water-chaotic-molecular.png',
        alt: 'Chaotic Molecular Water',
        tags: ['water', 'chaos', 'molecular', 'bulk', 'blue'],
        description: 'Visualization of chaotic bulk water molecules.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Phase'
    },
    'gen-water-ez-interface': {
        id: 'gen-water-ez-interface',
        url: '/images/generated/water-ez-interface.png',
        alt: 'EZ Water Interface',
        tags: ['water', 'EZ', 'interface', 'layers', 'cyan'],
        description: 'Visualization of EZ water interface layers.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Interface'
    },
    'gen-water-hexagonal': {
        id: 'gen-water-hexagonal',
        url: '/images/generated/water-structured-hexagonal.png',
        alt: 'Structured Hexagonal Water',
        tags: ['water', 'hexagonal', 'structured', 'crystal', 'cyan'],
        description: 'Visualization of hexagonal structured water lattice.',
        domColors: ['#38ffd1', '#020617'],
        archetype: 'Structure'
    },
    'gen-water-vortex': {
        id: 'gen-water-vortex',
        url: '/images/generated/water-vortex-spiral.png',
        alt: 'Water Vortex Spiral',
        tags: ['water', 'vortex', 'spiral', 'flow', 'blue'],
        description: 'Visualization of water vortex spiral dynamics.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Geometry',
        routes: ['/vortex-spiral-hydrodynamics']
    },

    // --- BATCH 14: ASSET ADDITIONS ---
    'product-box-zoom': {
        id: 'product-box-zoom',
        url: '/assets/andara-box-zoom.png',
        alt: 'Andara Ionic Box Zoom',
        tags: ['product', 'box', 'packaging', 'zoom'],
        description: 'Close up of the Andara Ionic packaging box.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Product'
    },
    'product-100ml-transparent-v2': {
        id: 'product-100ml-transparent-v2',
        url: '/assets/generated_images/andara-ionic-100ml-transparent-v2.png',
        alt: 'Andara Ionic 100ml V2',
        tags: ['product', '100ml', 'transparent', 'bottle', 'v2'],
        description: 'Version 2 high-fidelity product shot of Andara Ionic 100ml.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Product'
    },
    'product-100ml-transparent-v3': {
        id: 'product-100ml-transparent-v3',
        url: '/assets/generated_images/andara-ionic-100ml-transparent-v3.png',
        alt: 'Andara Ionic 100ml V3',
        tags: ['product', '100ml', 'transparent', 'bottle', 'v3'],
        description: 'Version 3 high-fidelity product shot of Andara Ionic 100ml.',
        domColors: ['#1aa7ff', '#020617'],
        archetype: 'Product'
    }
};

