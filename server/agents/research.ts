import { Agent, AgentTask, AgentResult, createSuccessResult, createErrorResult } from './base';
import { researchAgentBriefing } from './briefings';
import { getAiClient, getToolConfig } from '../services/andara-chat';
import { memoryTools } from './tools/memory';

/**
 * ANDARA IONIC RESEARCH AGENT
 * 
 * Specialized AI agent for ionic mineral research, water science,
 * and regulation-compliant content generation.
 * 
 * Core Principles:
 * - Scientifically grounded, non-medical
 * - Brand-aligned but evidence-aware
 * - Clear distinction between evidence levels
 * - Never claim products prevent, treat, cure, or diagnose disease
 */

// === KNOWLEDGE CLUSTERS ===

const KNOWLEDGE_CLUSTERS = {
    water_science: {
        name: 'Water Science',
        description: 'pH, ORP, EC, TDS, turbidity, flocculation, EZ water research',
        topics: ['phases of water', 'water measurements', 'flocculation', 'coagulation', 'structured water', 'EZ water', 'Pollack research'],
        color: '#1aa7ff'
    },
    mineral_science: {
        name: 'Mineral Science',
        description: 'Ionic vs colloidal vs solid minerals, sulfate chemistry, trace elements',
        topics: ['ionic minerals', 'colloidal minerals', 'sulfate chemistry', 'SO4', 'trace elements', 'multivalent ions', 'flocculation chemistry'],
        color: '#63b4ff'
    },
    crystalline_matrix: {
        name: 'Crystalline Matrix & Geometry',
        description: 'Tetrahedral, hexagonal, triangular motifs in minerals and water',
        topics: ['tetrahedral geometry', 'hexagonal structure', 'ice crystals', 'mineral lattices', 'water structuring', 'crystal templating'],
        color: '#f6d56a'
    },
    bioelectric: {
        name: 'Bioelectric Science & Water',
        description: 'Electrolytes, membrane potentials, charge separation, cellular voltage',
        topics: ['electrolytes', 'conductivity', 'membrane potential', 'proton gradients', 'EZ water charge', 'cellular voltage', 'ATP synthesis'],
        color: '#2cff9a'
    },
    microbiome: {
        name: 'Microbiome & Minerals',
        description: 'Minerals as enzyme cofactors, gut bacteria, SCFAs',
        topics: ['enzyme cofactors', 'Bifidobacterium', 'SCFAs', 'short-chain fatty acids', 'deep-sea water', 'gut ecology', 'sulfate-reducing bacteria'],
        color: '#c49a6c'
    },
    mineral_sources: {
        name: 'Comparative Mineral Sources',
        description: 'Ocean, lake brine, plant, fulvic, sea salt, volcanic black mica comparison',
        topics: ['ocean minerals', 'Quinton', 'lake brine', 'Great Salt Lake', 'kelp', 'spirulina', 'fulvic acid', 'humic', 'shilajit', 'Himalayan salt', 'Celtic salt', 'black mica'],
        color: '#9b7bff'
    },
    compliance: {
        name: 'Trust, Safety & Compliance',
        description: 'Regulatory boundaries, health claim limits, evidence marking',
        topics: ['regulatory compliance', 'health claims', 'evidence levels', 'citations', 'aluminum safety', 'permitted language', 'forbidden claims'],
        color: '#ff5fd7'
    }
} as const;

// === ANDARA ACTIVATION RANGE ===

const ACTIVATION_RANGE = {
    targetMin: 17, // mg/L sulfate
    targetMax: 30, // mg/L sulfate
    practicalDosage: '1 ml concentrate per 1 liter water',
    resultingConcentration: '17-18 mg/L sulfate',
    scientificBasis: [
        { source: 'Human plasma sulfate', value: '~30 mg/L', type: 'physiological' },
        { source: 'EZ water research', value: 'Sulfate-interface structuring', type: 'hypothesis' },
        { source: 'Water treatment standards', value: '10-35 mg/L optimal coagulation', type: 'established' }
    ]
};

// === MINERAL SOURCE COMPARISON ===

const MINERAL_SOURCES = {
    ocean: {
        name: 'Ocean Minerals (Quinton)',
        origin: 'Seawater',
        processing: 'Cold filtration',
        dominantIons: ['Na', 'Mg', 'Ca', 'K'],
        sulfateProfile: 'Low',
        typicalUses: 'Isotonic therapy',
        flocculationEffect: 'Minimal',
        structuringPotential: 'Moderate'
    },
    lake_brine: {
        name: 'Lake Brine (Great Salt Lake)',
        origin: 'Evaporated lakes',
        processing: 'Solar evaporation',
        dominantIons: ['Mg', 'K', 'Li', 'Na'],
        sulfateProfile: 'Medium',
        typicalUses: 'Magnesium supplements',
        flocculationEffect: 'Low',
        structuringPotential: 'Low-Moderate'
    },
    plant: {
        name: 'Plant Minerals (Kelp, Spirulina)',
        origin: 'Seaweed/algae',
        processing: 'Extraction',
        dominantIons: ['Iodine', 'Fe', 'trace elements'],
        sulfateProfile: 'Low',
        typicalUses: 'Nutritional supplements',
        flocculationEffect: 'None',
        structuringPotential: 'Minimal'
    },
    fulvic: {
        name: 'Fulvic/Humic (Shilajit)',
        origin: 'Decomposed plants',
        processing: 'Water extraction',
        dominantIons: ['Fe', 'Zn', 'trace elements'],
        sulfateProfile: 'None',
        typicalUses: 'Fulvic acid supplements',
        flocculationEffect: 'None',
        structuringPotential: 'Some (organic acids)'
    },
    sea_salt: {
        name: 'Sea Salts (Himalayan, Celtic)',
        origin: 'Salt deposits',
        processing: 'Minimal',
        dominantIons: ['Na', 'Cl', 'trace elements'],
        sulfateProfile: 'Low-Medium',
        typicalUses: 'Culinary, bathing',
        flocculationEffect: 'Minimal',
        structuringPotential: 'Low'
    },
    volcanic_black_mica: {
        name: 'Volcanic Black Mica Ionic',
        origin: 'Volcanic deposits',
        processing: 'Acid extraction',
        dominantIons: ['Fe', 'Mg', 'S', 'trace elements'],
        sulfateProfile: 'High',
        typicalUses: 'Water treatment',
        flocculationEffect: 'High',
        structuringPotential: 'High (sulfate interfaces)'
    }
};

// === EVIDENCE LEVELS ===

const EVIDENCE_LEVELS = {
    solid: {
        name: 'Solid Evidence',
        criteria: 'Peer-reviewed, replicated, scientific consensus',
        expression: ['Research shows...', 'Studies demonstrate...', 'It is established that...']
    },
    hypothesis: {
        name: 'Hypothesis/Emerging Research',
        criteria: 'Published but not yet consensus',
        expression: ['Studies suggest...', 'May...', 'Research indicates potential...', 'Hypothesis:']
    },
    brand_specific: {
        name: 'Brand-Specific Interpretation',
        criteria: 'Andara positioning or application',
        expression: ['Andara Ionic is designed to...', 'In Andara applications...']
    }
};

// === COMPLIANCE RULES ===

const COMPLIANCE_RULES = {
    permitted: [
        'Supports water clarification',
        'Is used to treat and condition water',
        'Can help reduce turbidity',
        'May reorganize hydration structures in water',
        'Is associated with [research finding]',
        'Was observed in this study...'
    ],
    forbidden: [
        'Heals',
        'Treats disease',
        'Cures',
        'Detoxes your body',
        'Prevents [disease]',
        'Treats [condition]',
        'Any claim implying diagnosis'
    ],
    disclaimerText: 'This product is intended for water treatment and conditioning. It is not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional for medical advice.'
};

// === AGENT IMPLEMENTATION ===

export const researchAgent: Agent = {
    name: researchAgentBriefing.name,
    description: researchAgentBriefing.role,
    capabilities: researchAgentBriefing.capabilities,
    icon: researchAgentBriefing.icon,
    role: researchAgentBriefing.role,
    rules: researchAgentBriefing.rules,

    async execute(task: AgentTask): Promise<AgentResult> {
        try {
            switch (task.type) {
                case 'search_knowledge':
                    return searchKnowledge(task.input);

                case 'compare_mineral_sources':
                    return compareMineralSources(task.input);

                case 'generate_research_brief':
                    return await generateResearchBrief(task.input);

                case 'validate_health_claims':
                    return validateHealthClaims(task.input);

                case 'get_evidence_level':
                    return getEvidenceLevel(task.input);

                case 'generate_seo_skeleton':
                    return generateSeoSkeleton(task.input);

                case 'explain_activation_range':
                    return explainActivationRange();

                case 'get_cluster_info':
                    return getClusterInfo(task.input);

                default:
                    return createErrorResult(`Unknown task type: ${task.type}`);
            }
        } catch (error: any) {
            return createErrorResult(error.message || 'Research agent failed');
        }
    }
};

// === TASK IMPLEMENTATIONS ===

function searchKnowledge(input: any): AgentResult {
    const { query, cluster } = input;
    const queryLower = (query || '').toLowerCase();

    // Find relevant clusters
    const relevantClusters: any[] = [];

    Object.entries(KNOWLEDGE_CLUSTERS).forEach(([key, clusterData]) => {
        const relevance = clusterData.topics.filter(topic =>
            queryLower.includes(topic.toLowerCase()) || topic.toLowerCase().includes(queryLower)
        );

        if (relevance.length > 0 || (cluster && cluster === key)) {
            relevantClusters.push({
                key,
                ...clusterData,
                matchedTopics: relevance,
                relevanceScore: relevance.length
            });
        }
    });

    // Sort by relevance
    relevantClusters.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return createSuccessResult({
        query,
        matchedClusters: relevantClusters,
        totalClusters: Object.keys(KNOWLEDGE_CLUSTERS).length,
        suggestion: relevantClusters.length > 0
            ? `Most relevant cluster: ${relevantClusters[0].name}`
            : 'No specific cluster match. Consider browsing all clusters.'
    });
}

function compareMineralSources(input: any): AgentResult {
    const { sources } = input;

    // If specific sources requested, filter; otherwise return all
    const sourcesToCompare = sources && sources.length > 0
        ? Object.entries(MINERAL_SOURCES)
            .filter(([key]) => sources.includes(key))
            .map(([key, data]) => ({ key, ...data }))
        : Object.entries(MINERAL_SOURCES)
            .map(([key, data]) => ({ key, ...data }));

    const comparison = {
        sources: sourcesToCompare,
        summary: {
            highestSulfate: 'volcanic_black_mica',
            highestFlocculation: 'volcanic_black_mica',
            highestStructuring: 'volcanic_black_mica',
            mostTraceElements: 'volcanic_black_mica',
            mostMagnesium: 'lake_brine',
            mostIodine: 'plant'
        },
        differentiators: [
            'Volcanic black mica ionic is uniquely high in sulfate content',
            'Only volcanic black mica provides significant flocculation effect',
            'Ocean minerals most closely match plasma composition',
            'Fulvic minerals are organic-complexed, not ionic'
        ]
    };

    return createSuccessResult(comparison);
}

async function generateResearchBrief(input: any): Promise<AgentResult> {
    const { topic, depth = 'standard' } = input;
    const topicLower = (topic || '').toLowerCase();

    // Identify relevant cluster
    let primaryCluster = 'mineral_science';
    Object.entries(KNOWLEDGE_CLUSTERS).forEach(([key, data]) => {
        if (data.topics.some(t => topicLower.includes(t.toLowerCase()))) {
            primaryCluster = key;
        }
    });

    const clusterData = KNOWLEDGE_CLUSTERS[primaryCluster as keyof typeof KNOWLEDGE_CLUSTERS];

    // Try AI-powered research brief
    try {
        const { client, model } = await getAiClient();
        const tools = memoryTools;
        const toolConfig = getToolConfig(tools);

        const prompt = `${researchAgentBriefing.systemPrompt}

Generate a comprehensive research brief on: "${topic}"

Context:
- Primary knowledge cluster: ${clusterData.name}
- Cluster description: ${clusterData.description}
- Related topics: ${clusterData.topics.join(', ')}
- Depth level: ${depth}

Requirements:
1. Start with a clear definition and overview
2. Provide scientific background with proper evidence levels
3. Explain mechanisms and processes
4. Include practical applications for Andara Ionic
5. Add compliance-safe language suggestions
6. Suggest SEO keywords for this topic
7. SEARCH THE KNOWLEDGE BASE if you need specific facts or Andara policies.

Evidence Level Marking:
- Use "Research shows..." for solid evidence
- Use "Studies suggest..." for hypotheses
- Use "Andara Ionic is designed to..." for brand-specific claims

IMPORTANT: Never make health claims. Focus on water treatment applications.

Format as a structured research brief with clear sections.`;

        let chatHistory: any[] = [{ role: 'user', parts: [{ text: prompt }] }];
        let aiContent = '';

        // Function calling loop (max 5 turns)
        for (let turn = 0; turn < 5; turn++) {
            const response = await client.models.generateContent({
                model,
                contents: chatHistory,
                config: { tools: toolConfig as any }
            });

            const part = response.candidates?.[0]?.content?.parts?.[0];

            if (!part) throw new Error('No content in AI response');

            // Handle Function Call
            if (part.functionCall) {
                const call = part.functionCall;
                console.log(`[ResearchAgent] 🧠 Tool Call: ${call.name}`, call.args);

                const tool = tools.find(t => t.name === call.name);
                let toolResult = "Error: Tool not found"; // Default error string

                if (tool) {
                    try {
                        // args is an object, but tool.execute might expect specific args
                        toolResult = await tool.execute(call.args);
                    } catch (err: any) {
                        toolResult = `Tool execution failed: ${err.message}`;
                    }
                }

                // Add conversation turn
                chatHistory.push({ role: 'model', parts: [part] });
                chatHistory.push({
                    role: 'function', // Using 'function' role for tool outputs
                    parts: [{
                        functionResponse: {
                            name: call.name,
                            response: { result: toolResult }
                        }
                    }]
                });
                continue; // Loop to generate next response based on tool output
            }

            // Normal Text Response
            if (part.text) {
                aiContent = part.text;
                break; // Done
            }
        }

        if (!aiContent) throw new Error('Failed to generate text content after tool calls');

        return createSuccessResult({
            topic,
            primaryCluster,
            clusterInfo: clusterData,
            depth,
            aiGeneratedBrief: aiContent,
            suggestedSections: [
                'Introduction & Definitions',
                'Scientific Background',
                'Mechanisms & Processes',
                'Evidence Summary',
                'Practical Applications',
                'Limitations & Caveats'
            ],
            evidenceLevels: EVIDENCE_LEVELS,
            complianceReminder: COMPLIANCE_RULES.disclaimerText
        }, { model, source: 'ai' });

    } catch (error: any) {
        // Fallback to structured brief without AI
        console.log('[ResearchAgent] AI unavailable, using structured fallback');

        return createSuccessResult({
            topic,
            primaryCluster,
            clusterInfo: clusterData,
            suggestedSections: [
                'Introduction & Definitions',
                'Scientific Background',
                'Mechanisms & Processes',
                'Evidence Summary',
                'Practical Applications',
                'Limitations & Caveats'
            ],
            evidenceLevels: EVIDENCE_LEVELS,
            complianceReminder: COMPLIANCE_RULES.disclaimerText,
            depth,
            note: 'AI generation unavailable - structured outline provided'
        });
    }
}

function validateHealthClaims(input: any): AgentResult {
    const { content } = input;
    const contentLower = (content || '').toLowerCase();

    const violations: string[] = [];
    const warnings: string[] = [];

    // Check for forbidden claims
    const forbiddenPatterns = [
        { pattern: /\bcures?\b/i, term: 'cure' },
        { pattern: /\bheals?\b/i, term: 'heal' },
        { pattern: /\btreats?\s+(disease|condition|illness)/i, term: 'treats disease' },
        { pattern: /\bprevents?\s+(disease|condition|illness|cancer|diabetes)/i, term: 'prevents disease' },
        { pattern: /\bdetox(es|ify|ifies)?\s+(your|the)?\s*body/i, term: 'detoxes body' },
        { pattern: /\bdiagnos(e|es|is)/i, term: 'diagnose' }
    ];

    forbiddenPatterns.forEach(({ pattern, term }) => {
        if (pattern.test(content)) {
            violations.push(`Found forbidden claim: "${term}"`);
        }
    });

    // Check for risky but possibly acceptable
    const riskyPatterns = [
        { pattern: /\bimproves?\s+health/i, warning: 'Consider specifying water-related rather than health claims' },
        { pattern: /\bbenefits?\s+your\s+body/i, warning: 'May imply health benefits; reframe around water treatment' },
        { pattern: /\btherapy\b/i, warning: 'Avoid therapy terminology unless in educational context' }
    ];

    riskyPatterns.forEach(({ pattern, warning }) => {
        if (pattern.test(content)) {
            warnings.push(warning);
        }
    });

    const isCompliant = violations.length === 0;

    return createSuccessResult({
        isCompliant,
        violations,
        warnings,
        recommendation: isCompliant
            ? 'Content appears compliant with health claim boundaries'
            : 'Content contains regulatory violations that must be addressed',
        permittedAlternatives: COMPLIANCE_RULES.permitted
    });
}

function getEvidenceLevel(input: any): AgentResult {
    const { claim } = input;
    const claimLower = (claim || '').toLowerCase();

    // Categorize based on claim content
    let level = 'hypothesis';
    let confidence = 'medium';

    // Solid evidence topics
    const solidTopics = ['electrolyte', 'conductivity', 'ph', 'turbidity', 'flocculation', 'membrane potential'];
    // Hypothesis topics  
    const hypothesisTopics = ['ez water', 'structured water', 'water memory', 'exclusion zone', 'pollack'];
    // Brand-specific topics
    const brandTopics = ['andara', 'activation range', '17-30 mg'];

    if (solidTopics.some(t => claimLower.includes(t))) {
        level = 'solid';
        confidence = 'high';
    } else if (brandTopics.some(t => claimLower.includes(t))) {
        level = 'brand_specific';
        confidence = 'high';
    } else if (hypothesisTopics.some(t => claimLower.includes(t))) {
        level = 'hypothesis';
        confidence = 'medium';
    }

    const levelData = EVIDENCE_LEVELS[level as keyof typeof EVIDENCE_LEVELS];

    return createSuccessResult({
        claim,
        evidenceLevel: level,
        levelInfo: levelData,
        confidence,
        suggestedPhrasing: levelData.expression[0]
    });
}

function generateSeoSkeleton(input: any): AgentResult {
    const { topic, targetKeyword } = input;

    const skeleton = {
        topic,
        suggestedKeywords: [
            targetKeyword || topic,
            `what are ${topic.toLowerCase()}`,
            `${topic.toLowerCase()} benefits`,
            `${topic.toLowerCase()} vs`,
            `how ${topic.toLowerCase()} work`,
            `${topic.toLowerCase()} science`
        ],
        questionsToAnswer: [
            `What are ${topic.toLowerCase()}?`,
            `How do ${topic.toLowerCase()} work?`,
            `What is the difference between ionic and colloidal minerals?`,
            `Are ${topic.toLowerCase()} safe?`,
            `What are the benefits of ${topic.toLowerCase()} for water?`
        ],
        suggestedHeadings: [
            `Introduction to ${topic}`,
            `The Science Behind ${topic}`,
            `How ${topic} Affect Water`,
            `Comparing Different ${topic} Sources`,
            `Frequently Asked Questions`,
            `The Research Summary`
        ],
        contentZone: 'Zone 2 - Science Library',
        complianceNote: 'Keep content educational. Avoid health claims. Focus on water treatment applications.'
    };

    return createSuccessResult(skeleton);
}

function explainActivationRange(): AgentResult {
    return createSuccessResult({
        name: 'Andara Activation Range',
        range: `${ACTIVATION_RANGE.targetMin}-${ACTIVATION_RANGE.targetMax} mg/L sulfate`,
        practicalGuidance: ACTIVATION_RANGE.practicalDosage,
        expectedResult: ACTIVATION_RANGE.resultingConcentration,
        scientificBasis: ACTIVATION_RANGE.scientificBasis,
        explanation: `The Andara Activation Range (${ACTIVATION_RANGE.targetMin}-${ACTIVATION_RANGE.targetMax} mg/L sulfate) represents the optimal sulfate concentration for water treatment and structuring effects. This range is derived from three sources: (1) human plasma sulfate levels (~30 mg/L), (2) laboratory research on EZ-like water structuring at sulfate-rich interfaces, and (3) established water treatment science showing optimal coagulation/clarification at 10-35 mg/L sulfate.`,
        evidenceLevel: 'Mixed: Plasma levels are established science; EZ structuring is emerging research; water treatment ranges are established.'
    });
}

function getClusterInfo(input: any): AgentResult {
    const { cluster } = input;

    if (cluster && KNOWLEDGE_CLUSTERS[cluster as keyof typeof KNOWLEDGE_CLUSTERS]) {
        return createSuccessResult(KNOWLEDGE_CLUSTERS[cluster as keyof typeof KNOWLEDGE_CLUSTERS]);
    }

    return createSuccessResult({
        availableClusters: Object.entries(KNOWLEDGE_CLUSTERS).map(([key, data]) => ({
            key,
            name: data.name,
            description: data.description,
            topicCount: data.topics.length
        }))
    });
}
