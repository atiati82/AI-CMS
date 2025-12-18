/**
 * MINERAL KNOWLEDGE SERVICE
 * 
 * Provides structured access to mineral and water science data
 * for use by AI agents and content generation.
 */

// === WATER MEASUREMENTS ===

export interface WaterMeasurement {
    metric: string;
    fullName: string;
    description: string;
    unit: string;
    typicalRange: { min: number; max: number; unit: string };
    andaraEffect?: string;
}

export const WATER_MEASUREMENTS: WaterMeasurement[] = [
    {
        metric: 'pH',
        fullName: 'Potential of Hydrogen',
        description: 'Acidity/alkalinity scale (0-14)',
        unit: 'pH units',
        typicalRange: { min: 6.5, max: 8.5, unit: 'drinking water' },
        andaraEffect: 'May shift toward neutral'
    },
    {
        metric: 'ORP',
        fullName: 'Oxidation-Reduction Potential',
        description: 'Electron availability / antioxidant capacity',
        unit: 'mV',
        typicalRange: { min: -200, max: 400, unit: 'mV' },
        andaraEffect: 'May increase reducing capacity'
    },
    {
        metric: 'EC',
        fullName: 'Electrical Conductivity',
        description: 'Ionic content / ability to conduct electricity',
        unit: 'µS/cm',
        typicalRange: { min: 100, max: 1500, unit: 'µS/cm' },
        andaraEffect: 'Increases with ionic minerals'
    },
    {
        metric: 'TDS',
        fullName: 'Total Dissolved Solids',
        description: 'Total mineral content',
        unit: 'mg/L',
        typicalRange: { min: 50, max: 1000, unit: 'mg/L' },
        andaraEffect: 'Slight increase'
    },
    {
        metric: 'Turbidity',
        fullName: 'Turbidity',
        description: 'Cloudiness / suspended particle measure',
        unit: 'NTU',
        typicalRange: { min: 0, max: 5, unit: 'NTU (clear < 1)' },
        andaraEffect: 'Reduces via flocculation'
    },
    {
        metric: 'H2',
        fullName: 'Dissolved Hydrogen',
        description: 'Molecular hydrogen concentration',
        unit: 'ppb',
        typicalRange: { min: 0, max: 1600, unit: 'ppb' },
        andaraEffect: 'May support hydrogen generation'
    }
];

// === MINERAL SOURCES ===

export interface MineralSource {
    key: string;
    name: string;
    origin: string;
    processing: string;
    dominantIons: string[];
    sulfateProfile: 'None' | 'Low' | 'Low-Medium' | 'Medium' | 'High';
    typicalUses: string;
    flocculationEffect: 'None' | 'Minimal' | 'Low' | 'Medium' | 'High';
    structuringPotential: 'Minimal' | 'Low' | 'Low-Moderate' | 'Moderate' | 'High';
    notes: string;
}

export const MINERAL_SOURCES: MineralSource[] = [
    {
        key: 'ocean',
        name: 'Ocean Minerals (Quinton)',
        origin: 'Seawater',
        processing: 'Cold filtration',
        dominantIons: ['Na', 'Mg', 'Ca', 'K'],
        sulfateProfile: 'Low',
        typicalUses: 'Isotonic therapy',
        flocculationEffect: 'Minimal',
        structuringPotential: 'Moderate',
        notes: 'Plasma-like composition'
    },
    {
        key: 'lake_brine',
        name: 'Lake Brine (Great Salt Lake)',
        origin: 'Evaporated inland lakes',
        processing: 'Solar evaporation',
        dominantIons: ['Mg', 'K', 'Li', 'Na'],
        sulfateProfile: 'Medium',
        typicalUses: 'Magnesium supplements',
        flocculationEffect: 'Low',
        structuringPotential: 'Low-Moderate',
        notes: 'Exceptionally high magnesium'
    },
    {
        key: 'plant',
        name: 'Plant Minerals (Kelp, Spirulina)',
        origin: 'Seaweed, algae',
        processing: 'Extraction',
        dominantIons: ['Iodine', 'Fe', 'trace elements'],
        sulfateProfile: 'Low',
        typicalUses: 'Nutritional supplements',
        flocculationEffect: 'None',
        structuringPotential: 'Minimal',
        notes: 'Organic-bound minerals'
    },
    {
        key: 'fulvic',
        name: 'Fulvic/Humic (Shilajit)',
        origin: 'Decomposed ancient plants',
        processing: 'Water extraction',
        dominantIons: ['Fe', 'Zn', 'trace elements'],
        sulfateProfile: 'None',
        typicalUses: 'Fulvic acid supplements',
        flocculationEffect: 'None',
        structuringPotential: 'Low',
        notes: 'Organic complexes, not ionic'
    },
    {
        key: 'sea_salt',
        name: 'Sea Salts (Himalayan, Celtic)',
        origin: 'Ancient salt deposits',
        processing: 'Minimal processing',
        dominantIons: ['Na', 'Cl', 'trace elements'],
        sulfateProfile: 'Low-Medium',
        typicalUses: 'Culinary, bathing',
        flocculationEffect: 'Minimal',
        structuringPotential: 'Low',
        notes: 'Primarily sodium chloride'
    },
    {
        key: 'volcanic_black_mica',
        name: 'Volcanic Black Mica Ionic',
        origin: 'Volcanic deposits',
        processing: 'Acid extraction',
        dominantIons: ['Fe', 'Mg', 'S', 'trace elements'],
        sulfateProfile: 'High',
        typicalUses: 'Water treatment',
        flocculationEffect: 'High',
        structuringPotential: 'High',
        notes: 'Sulfate-rich ionic form, uniquely effective for flocculation'
    }
];

// === TRACE ELEMENTS ===

export interface TraceElement {
    symbol: string;
    name: string;
    category: 'major' | 'trace' | 'ultra-trace';
    knownRoles: string;
    inVolcanicMineral: boolean;
}

export const TRACE_ELEMENTS: TraceElement[] = [
    { symbol: 'Fe', name: 'Iron', category: 'major', knownRoles: 'Oxygen transport, enzymes', inVolcanicMineral: true },
    { symbol: 'Mg', name: 'Magnesium', category: 'major', knownRoles: '300+ enzyme reactions', inVolcanicMineral: true },
    { symbol: 'Mn', name: 'Manganese', category: 'trace', knownRoles: 'Antioxidant enzymes', inVolcanicMineral: true },
    { symbol: 'Cu', name: 'Copper', category: 'trace', knownRoles: 'Iron metabolism, connective tissue', inVolcanicMineral: true },
    { symbol: 'Zn', name: 'Zinc', category: 'trace', knownRoles: 'Immune function, enzymes', inVolcanicMineral: true },
    { symbol: 'B', name: 'Boron', category: 'ultra-trace', knownRoles: 'Bone metabolism, hormones', inVolcanicMineral: true },
    { symbol: 'Li', name: 'Lithium', category: 'ultra-trace', knownRoles: 'Neurological, mood regulation', inVolcanicMineral: true },
    { symbol: 'V', name: 'Vanadium', category: 'ultra-trace', knownRoles: 'Insulin-like effects (research)', inVolcanicMineral: true },
    { symbol: 'Sr', name: 'Strontium', category: 'ultra-trace', knownRoles: 'Bone structure', inVolcanicMineral: true },
    { symbol: 'Se', name: 'Selenium', category: 'ultra-trace', knownRoles: 'Antioxidant (glutathione)', inVolcanicMineral: true },
    { symbol: 'Cr', name: 'Chromium', category: 'ultra-trace', knownRoles: 'Blood sugar regulation', inVolcanicMineral: true },
    { symbol: 'Mo', name: 'Molybdenum', category: 'ultra-trace', knownRoles: 'Enzyme cofactor (sulfite oxidase)', inVolcanicMineral: true }
];

// === ANDARA ACTIVATION RANGE ===

export interface ActivationRange {
    targetMin: number;
    targetMax: number;
    unit: string;
    practicalDosage: string;
    resultingConcentration: string;
    scientificBasis: Array<{
        source: string;
        value: string;
        evidenceLevel: 'established' | 'hypothesis' | 'brand';
    }>;
}

export const ANDARA_ACTIVATION_RANGE: ActivationRange = {
    targetMin: 17,
    targetMax: 30,
    unit: 'mg/L sulfate',
    practicalDosage: '1 ml concentrate per 1 liter water',
    resultingConcentration: '17-18 mg/L sulfate',
    scientificBasis: [
        { source: 'Human plasma sulfate', value: '~30 mg/L', evidenceLevel: 'established' },
        { source: 'EZ water interface research', value: 'Sulfate promotes structuring', evidenceLevel: 'hypothesis' },
        { source: 'Water treatment standards', value: '10-35 mg/L optimal', evidenceLevel: 'established' }
    ]
};

// === KNOWLEDGE CLUSTERS ===

export interface KnowledgeCluster {
    key: string;
    name: string;
    description: string;
    topics: string[];
    color: string;
    zone: 1 | 2 | 3;
}

export const KNOWLEDGE_CLUSTERS: KnowledgeCluster[] = [
    {
        key: 'water_science',
        name: 'Water Science',
        description: 'Phases of water, measurements, flocculation, structuring',
        topics: ['pH', 'ORP', 'EC', 'TDS', 'turbidity', 'flocculation', 'coagulation', 'EZ water', 'Pollack research', 'vortexing'],
        color: '#1aa7ff',
        zone: 2
    },
    {
        key: 'mineral_science',
        name: 'Mineral Science',
        description: 'Ionic minerals, sulfate chemistry, trace elements',
        topics: ['ionic minerals', 'colloidal minerals', 'sulfate SO₄²⁻', 'trace elements', 'multivalent ions', 'Fe³⁺', 'Mg²⁺'],
        color: '#63b4ff',
        zone: 2
    },
    {
        key: 'crystalline_matrix',
        name: 'Crystalline Matrix & Geometry',
        description: 'Molecular geometry, mineral lattices, water structuring',
        topics: ['tetrahedral geometry', 'hexagonal structure', 'ice crystals', 'mineral lattices', 'sacred geometry'],
        color: '#f6d56a',
        zone: 2
    },
    {
        key: 'bioelectric',
        name: 'Bioelectric Science & Water',
        description: 'Electrolytes, cellular voltage, charge separation',
        topics: ['electrolytes', 'membrane potential', 'proton gradients', 'ATP synthesis', 'EZ water charge', 'cellular voltage'],
        color: '#2cff9a',
        zone: 2
    },
    {
        key: 'microbiome',
        name: 'Microbiome & Minerals',
        description: 'Gut bacteria, enzyme cofactors, deep-sea water research',
        topics: ['Bifidobacterium', 'SCFAs', 'enzyme cofactors', 'sulfate-reducing bacteria', 'deep-sea water'],
        color: '#c49a6c',
        zone: 2
    },
    {
        key: 'mineral_sources',
        name: 'Comparative Mineral Sources',
        description: 'Comparison of ocean, lake, plant, fulvic, volcanic sources',
        topics: ['Quinton', 'Great Salt Lake', 'kelp', 'shilajit', 'Himalayan salt', 'volcanic black mica'],
        color: '#9b7bff',
        zone: 2
    },
    {
        key: 'compliance',
        name: 'Trust, Safety & Compliance',
        description: 'Regulatory boundaries, evidence levels, health claim limits',
        topics: ['FDA', 'health claims', 'evidence levels', 'citations', 'aluminum safety', 'permitted language'],
        color: '#ff5fd7',
        zone: 3
    }
];

// === SERVICE FUNCTIONS ===

/**
 * Get water measurement by metric name
 */
export function getWaterMeasurement(metric: string): WaterMeasurement | undefined {
    return WATER_MEASUREMENTS.find(m => m.metric.toLowerCase() === metric.toLowerCase());
}

/**
 * Get mineral source by key
 */
export function getMineralSource(key: string): MineralSource | undefined {
    return MINERAL_SOURCES.find(s => s.key === key);
}

/**
 * Compare multiple mineral sources
 */
export function compareMineralSources(keys: string[]): MineralSource[] {
    if (keys.length === 0) return MINERAL_SOURCES;
    return MINERAL_SOURCES.filter(s => keys.includes(s.key));
}

/**
 * Get trace elements by category
 */
export function getTraceElements(category?: 'major' | 'trace' | 'ultra-trace'): TraceElement[] {
    if (!category) return TRACE_ELEMENTS;
    return TRACE_ELEMENTS.filter(e => e.category === category);
}

/**
 * Get knowledge cluster by key
 */
export function getKnowledgeCluster(key: string): KnowledgeCluster | undefined {
    return KNOWLEDGE_CLUSTERS.find(c => c.key === key);
}

/**
 * Search knowledge clusters by topic
 */
export function searchClusters(query: string): KnowledgeCluster[] {
    const queryLower = query.toLowerCase();
    return KNOWLEDGE_CLUSTERS.filter(cluster =>
        cluster.topics.some(topic =>
            topic.toLowerCase().includes(queryLower) || queryLower.includes(topic.toLowerCase())
        )
    );
}

/**
 * Get activation range explanation
 */
export function getActivationRangeExplanation(): string {
    const range = ANDARA_ACTIVATION_RANGE;
    return `The Andara Activation Range (${range.targetMin}-${range.targetMax} ${range.unit}) represents the optimal sulfate concentration for water treatment and structuring effects. Practical guidance: ${range.practicalDosage} results in approximately ${range.resultingConcentration}. This range is scientifically grounded in: ${range.scientificBasis.map(b => `${b.source} (${b.value})`).join(', ')}.`;
}

/**
 * Validate content for health claim compliance
 */
export function validateContentCompliance(content: string): {
    isCompliant: boolean;
    violations: string[];
    warnings: string[];
} {
    const contentLower = content.toLowerCase();
    const violations: string[] = [];
    const warnings: string[] = [];

    // Forbidden patterns
    const forbiddenPatterns = [
        { pattern: /\bcures?\b/i, term: 'cure' },
        { pattern: /\bheals?\b/i, term: 'heal' },
        { pattern: /\btreats?\s+(disease|condition|illness)/i, term: 'treats disease' },
        { pattern: /\bprevents?\s+(disease|condition|cancer|diabetes)/i, term: 'prevents disease' },
        { pattern: /\bdetox(es|ify)?\s+(your|the)?\s*body/i, term: 'detoxes body' }
    ];

    forbiddenPatterns.forEach(({ pattern, term }) => {
        if (pattern.test(content)) {
            violations.push(`Found forbidden claim: "${term}"`);
        }
    });

    // Warning patterns
    const warningPatterns = [
        { pattern: /\bimproves?\s+health/i, warning: 'Consider specifying water-related rather than health claims' },
        { pattern: /\bbenefits?\s+your\s+body/i, warning: 'May imply health benefits; reframe around water treatment' }
    ];

    warningPatterns.forEach(({ pattern, warning }) => {
        if (pattern.test(content)) {
            warnings.push(warning);
        }
    });

    return {
        isCompliant: violations.length === 0,
        violations,
        warnings
    };
}

// Export everything as a namespace-like object for easy import
export const MineralKnowledge = {
    WATER_MEASUREMENTS,
    MINERAL_SOURCES,
    TRACE_ELEMENTS,
    KNOWLEDGE_CLUSTERS,
    ANDARA_ACTIVATION_RANGE,
    getWaterMeasurement,
    getMineralSource,
    compareMineralSources,
    getTraceElements,
    getKnowledgeCluster,
    searchClusters,
    getActivationRangeExplanation,
    validateContentCompliance
};
