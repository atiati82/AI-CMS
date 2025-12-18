import { Agent, AgentTask, AgentResult, createSuccessResult, createErrorResult } from './base';
import { visualInterpreterAgentBriefing } from './briefings';

/**
 * Visual Interpreter Agent
 * 
 * Interprets contexts through the lens of a top UI/UX designer, Creative Director,
 * and Motion-Art-Designer. Generates visual language, atmosphere, moodboard feeling,
 * and design specifications aligned with the Andara Ionic aesthetic.
 */

// Andara Color World Mappings
const colorWorlds: Record<string, {
    name: string;
    emotion: string;
    colors: { primary: string; accent: string; glow: string };
    motionStyle: string;
    treeTheme: string; // Andara Ionic 1.0 tree attribute
}> = {
    'water_science': {
        name: 'Water Science',
        emotion: 'Flowing, purifying, life-giving depths',
        colors: { primary: '#1aa7ff', accent: '#38ffd1', glow: 'rgba(26, 167, 255, 0.3)' },
        motionStyle: 'Wave-like oscillations, ripple effects on interaction',
        treeTheme: 'water'
    },
    'mineral_science': {
        name: 'Mineral Science',
        emotion: 'Crystalline clarity, ionic precision',
        colors: { primary: '#63b4ff', accent: '#b8e3ff', glow: 'rgba(99, 180, 255, 0.25)' },
        motionStyle: 'Subtle crystalline sparkle, geometric formations',
        treeTheme: 'mineral'
    },
    'crystalline_matrix': {
        name: 'Crystalline Matrix',
        emotion: 'Sacred geometry, golden harmonics',
        colors: { primary: '#f6d56a', accent: '#ffb74a', glow: 'rgba(246, 213, 106, 0.4)' },
        motionStyle: 'Slow rotation, prismatic light refractions',
        treeTheme: 'matrix'
    },
    'bioelectricity': {
        name: 'Bioelectricity',
        emotion: 'Life force, cellular vitality, healing energy',
        colors: { primary: '#2cff9a', accent: '#00c2ff', glow: 'rgba(44, 255, 154, 0.3)' },
        motionStyle: 'Pulsing glow, organic breathing rhythm',
        treeTheme: 'bioelectric'
    },
    'sulphate_pathways': {
        name: 'Sulphate Pathways',
        emotion: 'Ionic transformations, golden transmutation',
        colors: { primary: '#ffe66b', accent: '#ffb300', glow: 'rgba(255, 230, 107, 0.35)' },
        motionStyle: 'Flowing streams, pathway animations',
        treeTheme: 'sulfur'
    },
    'liquid_crystal': {
        name: 'Liquid Crystal Biology',
        emotion: 'Silver fluidity, reflective intelligence',
        colors: { primary: '#dfe7f1', accent: '#9aa7b6', glow: 'rgba(223, 231, 241, 0.2)' },
        motionStyle: 'Mercury-like flow, liquid transitions',
        treeTheme: 'liquid'
    },
    'dna_codes': {
        name: 'DNA & Mineral Codes',
        emotion: 'Deep violet consciousness, cosmic information',
        colors: { primary: '#9b7bff', accent: '#ff5fd7', glow: 'rgba(155, 123, 255, 0.3)' },
        motionStyle: 'Double helix rotations, data stream effects',
        treeTheme: 'dna'
    },
    'earth_sources': {
        name: 'Earth Sources',
        emotion: 'Grounded wisdom, primordial stability',
        colors: { primary: '#c49a6c', accent: '#7a5a3a', glow: 'rgba(196, 154, 108, 0.25)' },
        motionStyle: 'Steady, grounding presence, minimal movement',
        treeTheme: 'earth'
    }
};

// Visual Interpreter Agent
export const visualInterpreterAgent: Agent = {
    name: visualInterpreterAgentBriefing.name,
    description: visualInterpreterAgentBriefing.role,
    capabilities: visualInterpreterAgentBriefing.capabilities,
    icon: visualInterpreterAgentBriefing.icon,
    role: visualInterpreterAgentBriefing.role,
    rules: visualInterpreterAgentBriefing.rules,

    async execute(task: AgentTask): Promise<AgentResult> {
        try {
            switch (task.type) {
                case 'interpret_page':
                    return interpretPage(task.input);

                case 'describe_component':
                    return describeComponent(task.input);

                case 'suggest_atmosphere':
                    return suggestAtmosphere(task.input);

                case 'map_color_world':
                    return mapColorWorld(task.input);

                default:
                    return createErrorResult(`Unknown task type: ${task.type}`);
            }
        } catch (error: any) {
            return createErrorResult(error.message || 'Visual interpreter failed');
        }
    }
};

/**
 * Interpret a page context with full visual language
 */
function interpretPage(input: any): AgentResult {
    const { context, topic } = input;

    // Detect color world from context
    const detectedWorld = detectColorWorld(context || topic || '');
    const colorWorld = colorWorlds[detectedWorld] || colorWorlds['crystalline_matrix'];

    // Detect if this is a "living field" / advanced metaphysical page
    const isLivingField = detectLivingField(context || topic || '');

    const interpretation = {
        hero: {
            description: isLivingField
                ? `A living field awakens—full-screen animated nebula-water fusion with floating crystalline points of light in 3D space, connected by luminous filaments. The headline breathes in Surrounding font with indigo-to-gold gradient.`
                : `I see a ${colorWorld.name}-infused hero space opening like a crystalline gateway. The headline breathes in Surrounding font with gold gradient luminescence.`,
            atmosphere: isLivingField
                ? 'Sacred, scientific, crystalline, futuristic—a field where matter remembers it is light'
                : colorWorld.emotion,
            primaryGradient: isLivingField
                ? `radial-gradient(circle at 50% 50%, #4b0082 0%, #020617 40%, #818cf8 70%, transparent 100%)`
                : `radial-gradient(circle at 0% 0%, ${colorWorld.colors.primary} 0%, #020617 50%)`,
            motion: isLivingField
                ? 'Light nodes flicker on cursor proximity (ion activation), edges illuminate on scroll (transmission pathways), parallax depth responds to movement'
                : 'Elements float in gentle 3D parallax, responding to scroll with liquid inertia'
        },
        structure: {
            grid: '12-column fluid grid, max-width 1200px, rhythmic 1.5rem gap',
            rhythm: isLivingField
                ? 'Sections breathe with 6rem-8rem vertical padding, creating contemplative space for field activation'
                : 'Sections breathe with 5rem-7rem vertical padding',
            containers: 'Centered with clamp(1.5rem, 4vw, 4rem) horizontal gutter',
            specialLayout: isLivingField
                ? 'Hexagonal grids, tetrahedrons, wave interference patterns, light filament connections'
                : undefined
        },
        cards: {
            appearance: isLivingField
                ? 'Crystalline glassmorphic containers with photonic web effects, backdrop blur 20px, semi-transparent with micro-spark activations'
                : 'Glassmorphic containers with backdrop blur 16px, semi-transparent rgba(15, 23, 42, 0.7)',
            borders: `1px gold-accented edges (${colorWorld.colors.glow})`,
            interaction: isLivingField
                ? 'Hover triggers voltage upshift effect—node brightens from dim to radiant, particle activity spikes'
                : 'Hover lift (translateY -4px) with intensifying border glow',
            shadows: 'Layered—soft 4px 24px outer, subtle 1px inner highlight'
        },
        highlights: {
            style: `4px left border in ${colorWorld.colors.primary}`,
            background: 'Gradient fade from accent to surface',
            purpose: isLivingField
                ? 'Quantum information anchors, consciousness coherence markers'
                : 'Draw attention to key revelations'
        },
        motion: {
            scrollReveal: isLivingField
                ? 'Elements emerge like charged particles assembling—slow breathing, flowing currents, fractal expansions'
                : 'Elements fade-up with scale 0.98→1 on viewport entry',
            hoverLift: isLivingField
                ? 'Micro-flashes on activation, pulsing glow for bioelectric communication'
                : '4px rise with shadow bloom expansion',
            magneticCursor: 'Subtle element attraction toward pointer',
            floatingElements: isLivingField
                ? 'Hydrodynamic motion representing structured water, 8s infinite oscillation with micro-spark activations'
                : '8s infinite gentle oscillation',
            advancedEffects: isLivingField
                ? {
                    ionicActivation: 'Light nodes flicker when cursor approaches',
                    transmissionPathways: 'Edges between nodes illuminate on scroll',
                    photonicWeb: 'Shimmering dynamic matrix responds to interaction',
                    spacetimeBend: 'Cursor distorts grid slightly, like bending spacetime'
                } : undefined
        },
        colorField: {
            world: colorWorld.name,
            emotion: colorWorld.emotion,
            primaryColor: colorWorld.colors.primary,
            accentColor: colorWorld.colors.accent,
            glowColor: colorWorld.colors.glow,
            treeTheme: colorWorld.treeTheme, // For Andara Ionic 1.0 CSS
            advancedPalette: isLivingField ? {
                deepIndigo: '#4b0082',
                electricViolet: '#818cf8',
                goldPlasmaWhite: '#fdf8d0',
                description: 'Deep-indigo → electric-violet → gold-plasma white gradient flow'
            } : undefined
        },
        typography: {
            headlines: isLivingField
                ? "Surrounding font with indigo-to-gold gradient (135deg, #4b0082 0%, #818cf8 50%, #fdf8d0 100%), tight -0.02em tracking"
                : "Surrounding font, gold gradient via -webkit-background-clip, tight -0.02em tracking",
            body: "Open Sans, 1rem base, relaxed 1.7-1.8 line-height, slate-200 color",
            labels: "Uppercase, 0.1em wide tracking, emerald accent color",
            metaphysical: isLivingField ? {
                style: 'Italic, gold-cream color with subtle text-shadow glow',
                usage: 'For consciousness, quantum, and 5D content blocks'
            } : undefined
        },
        iconography: {
            style: isLivingField
                ? 'Sacred geometry (hexagons, tetrahedrons, spirals), mineral nodes with signature frequencies'
                : 'Minimal line icons, 1.5px stroke, cyan-to-indigo gradient fills on hover',
            containers: '3rem circular backgrounds with subtle glow',
            mineralNodes: isLivingField ? {
                magnesium: 'Steady blue glow (stabilizer)',
                silica: 'Geometric patterns (architect)',
                iron: 'Red pulse (activator)',
                sulfates: 'Golden threads (connectors)',
                trace: 'Micro-sparkles (fine-tuners)'
            } : undefined
        },
        userExperience: {
            feeling: isLivingField
                ? `The user enters a living field where matter and light communicate. Each interaction feels like activating a node in a cosmic nervous system. The page breathes, pulses, and responds as if conscious.`
                : `The user feels immersed in ${colorWorld.emotion.toLowerCase()}. Each scroll reveals new crystalline knowledge. Interactions feel magnetic and responsive.`,
            journey: isLivingField
                ? 'Field awakening → scientific anchors → process visualization → bioelectric mapping → crystalline consciousness → integration'
                : 'From cosmic hero → structured education → actionable insights → premium CTA'
        },
        signature: {
            description: isLivingField
                ? 'Andara Ionic Light Architecture: where minerals become nodes, water becomes medium, light becomes carrier—a living knowledge field'
                : 'The Andara Touch: crystalline intelligence, bioelectric vitality, future-organic harmony',
            motionStyle: colorWorld.motionStyle
        }
    };

    return createSuccessResult(interpretation);
}

/**
 * Describe a specific UI component
 */
function describeComponent(input: any): AgentResult {
    const { componentType, context } = input;

    const componentDescriptions: Record<string, any> = {
        hero: {
            visual: 'Grand entrance revealing cosmic depth. Multi-layered radial gradients pulse from corners—indigo top-left, emerald bottom-right, cyan bottom-center.',
            typography: 'Surrounding font headline with gold gradient. Subtext in slate-200 with 1.8 line-height.',
            motion: 'Background gradients shift subtly on scroll. Text elements float with parallax offset.',
            emotion: 'Awakening, invitation to explore deeper knowledge'
        },
        glass_card: {
            visual: 'Semi-transparent container with gold edge shimmer. Backdrop blur creates liquid depth effect.',
            structure: 'Rounded 1rem corners, 1.25rem internal padding, 1px gold-accented border',
            motion: 'Hover triggers 4px lift, border glow intensifies, shine sweeps left-to-right',
            emotion: 'Premium containment, liquid crystal intelligence'
        },
        highlight_box: {
            visual: 'Left-accented callout with 4px emerald/gold/indigo border. Gradient background fades from accent to surface.',
            structure: '2rem padding, 1rem border-radius, subtle top border highlight',
            variants: { emerald: 'Benefits/Success', indigo: 'Technical/Comparison', gold: 'Important/Warning' },
            emotion: 'Focused revelation, key insight delivery'
        },
        cta_button: {
            visual: 'Emerald solid button with pill shape (9999px radius). Subtle inner gradient for depth.',
            interaction: 'Hover darkens to #059669, expands shadow glow, slight 2px rise',
            typography: '600 weight, 1rem size, white text on emerald',
            emotion: 'Confident action, life-force powered decision'
        },
        faq_accordion: {
            visual: 'Slate-700 bordered items with emerald hover glow. Question expands to reveal answer.',
            structure: '1.25rem question padding, slate-800 separator lines',
            motion: 'Smooth height animation, icon rotation on expand',
            emotion: 'Knowledge unfolding, answer revelation'
        }
    };

    const description = componentDescriptions[componentType?.toLowerCase()] || {
        visual: 'A refined Andara component with glassmorphism characteristics',
        motion: 'Subtle hover interactions with lift and glow',
        emotion: 'Premium, crystalline, future-organic'
    };

    return createSuccessResult({
        component: componentType,
        ...description,
        context: context || 'General Andara aesthetic'
    });
}

/**
 * Suggest atmosphere for content
 */
function suggestAtmosphere(input: any): AgentResult {
    const { content, mood, pageType } = input;

    // Determine base mood
    const detectedWorld = detectColorWorld(content || '');
    const colorWorld = colorWorlds[detectedWorld] || colorWorlds['crystalline_matrix'];

    const pageAtmospheres: Record<string, any> = {
        science: {
            backgroundGradient: `linear-gradient(180deg, #020617 0%, #0f172a 50%, #020617 100%)`,
            accentUsage: 'Emerald highlights for key findings, cyan for technical data',
            spacing: 'Generous 6rem section padding for contemplative reading',
            motionIntensity: 'Subtle—let content breathe'
        },
        product: {
            backgroundGradient: `radial-gradient(ellipse at center, #0f172a 0%, #020617 100%)`,
            accentUsage: 'Gold gradients for premium features, emerald for CTAs',
            spacing: 'Tighter 4rem sections for conversion focus',
            motionIntensity: 'Medium—dynamic product showcase'
        },
        article: {
            backgroundGradient: '#020617 solid',
            accentUsage: 'Minimal accent, focus on readability',
            spacing: 'Relaxed 1.7 line-height, max-width 800px for comfort',
            motionIntensity: 'Minimal—reader focus'
        },
        landing: {
            backgroundGradient: colorWorld.colors.glow,
            accentUsage: 'Bold gold CTAs, emerald supporting actions',
            spacing: 'Varied—hero impact → conversion flow',
            motionIntensity: 'High—impressive entrance animations'
        }
    };

    const atmosphere = pageAtmospheres[pageType?.toLowerCase()] || pageAtmospheres['science'];

    return createSuccessResult({
        colorWorld: colorWorld.name,
        emotion: colorWorld.emotion,
        colors: colorWorld.colors,
        ...atmosphere,
        recommendedMotion: colorWorld.motionStyle
    });
}

/**
 * Map topic to Andara color world
 */
function mapColorWorld(input: any): AgentResult {
    const { topic } = input;
    const detected = detectColorWorld(topic || '');
    const world = colorWorlds[detected] || colorWorlds['crystalline_matrix'];

    return createSuccessResult({
        topic,
        detectedKey: detected,
        colorWorld: world
    });
}

/**
 * Detect which color world matches the content
 */
function detectColorWorld(text: string): string {
    const lower = text.toLowerCase();

    if (lower.includes('water') || lower.includes('hydration') || lower.includes('ez water') || lower.includes('structured water')) {
        return 'water_science';
    }
    if (lower.includes('mineral') || lower.includes('ionic') || lower.includes('sulphate') || lower.includes('sulfate')) {
        return 'sulphate_pathways';
    }
    if (lower.includes('crystal') || lower.includes('matrix') || lower.includes('sacred') || lower.includes('geometry')) {
        return 'crystalline_matrix';
    }
    if (lower.includes('bio') || lower.includes('cell') || lower.includes('voltage') || lower.includes('electric') || lower.includes('energy')) {
        return 'bioelectricity';
    }
    if (lower.includes('liquid crystal') || lower.includes('collagen') || lower.includes('fascia')) {
        return 'liquid_crystal';
    }
    if (lower.includes('dna') || lower.includes('gene') || lower.includes('code') || lower.includes('cosmic')) {
        return 'dna_codes';
    }
    if (lower.includes('earth') || lower.includes('primordial') || lower.includes('ancient') || lower.includes('source')) {
        return 'earth_sources';
    }

    // Default to crystalline matrix (gold-focused)
    return 'crystalline_matrix';
}

/**
 * Detect if this is a "living field" page requiring advanced metaphysical design
 */
function detectLivingField(text: string): boolean {
    const lower = text.toLowerCase();

    const livingFieldKeywords = [
        'network of light',
        'mineral network',
        'photonic',
        'biophoton',
        'consciousness',
        'quantum',
        '5d',
        'crystalline consciousness',
        'bioelectric field',
        'ionic intelligence',
        'light lattice',
        'sacred geometry',
        'frequency',
        'vibration',
        'coherence',
        'primordial blueprint',
        'cosmic nervous system',
        'matter is light',
        'light becomes matter'
    ];

    return livingFieldKeywords.some(keyword => lower.includes(keyword));
}
