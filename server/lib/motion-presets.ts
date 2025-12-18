/**
 * Andara Motion Presets Library
 * Centralized motion system for consistent animations across agents
 */

// Motion timing values
export const MOTION_TIMING = {
    instant: '0.1s',
    fast: '0.2s',
    normal: '0.4s',
    slow: '0.6s',
    slower: '0.8s',
    ambient: '4s'
} as const;

// Easing curves
export const MOTION_EASING = {
    smooth: [0.23, 0.82, 0.35, 1],
    snappy: [0.25, 0.1, 0.25, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    easeOut: [0, 0, 0.2, 1]
} as const;

// Entrance animations
export const ENTRANCE_ANIMATIONS = {
    fadeUp: { name: 'fadeUp', description: 'Fade + slide up (default for most content)' },
    fadeDown: { name: 'fadeDown', description: 'Fade + slide down (for headers dropping in)' },
    fadeIn: { name: 'fadeIn', description: 'Simple opacity fade' },
    fadeLeft: { name: 'fadeLeft', description: 'Horizontal slide from left' },
    fadeRight: { name: 'fadeRight', description: 'Horizontal slide from right' },
    scaleUp: { name: 'scaleUp', description: 'Scale from 95% to 100%' }
} as const;

// Stagger patterns
export const STAGGER_PATTERNS = {
    container: { name: 'stagger.container', description: 'Parent wrapper for staggered items' },
    containerFast: { name: 'stagger.containerFast', description: 'Fast stagger for lists/metrics' },
    item: { name: 'stagger.item', description: 'Each child item (80ms delay between)' }
} as const;

// Hover effects
export const HOVER_EFFECTS = {
    lift: { name: 'hover.lift', description: 'Slight Y translation on hover' },
    scale: { name: 'hover.scale', description: '1.02x scale on hover' },
    glow: { name: 'hover.glow', description: 'Box-shadow glow effect' }
} as const;

// Ambient animations
export const AMBIENT_ANIMATIONS = {
    pulse: { name: 'ambient.pulse', description: 'Subtle scale pulse (4s)' },
    float: { name: 'ambient.float', description: 'Y-axis float (6s)' },
    shimmer: { name: 'ambient.shimmer', description: 'Opacity shimmer' }
} as const;

// 6 Andara Motion Archetypes
export const MOTION_ARCHETYPES = {
    'Liquid-Crystal Float': {
        description: 'ambient.float + shimmer for water/crystal themes',
        entrance: 'fadeUp',
        ambient: ['ambient.float', 'ambient.shimmer'],
        hover: 'hover.lift',
        timing: 'normal',
        themes: ['water', 'crystal', 'hydration']
    },
    'Energetic Pulse': {
        description: 'ambient.pulse for energy/bioelectric themes',
        entrance: 'scaleUp',
        ambient: ['ambient.pulse'],
        hover: 'hover.glow',
        timing: 'fast',
        themes: ['energy', 'bioelectric', 'cellular']
    },
    'Magnetic Drift': {
        description: 'fadeLeft/fadeRight alternating for process flows',
        entrance: 'fadeLeft',
        alternateEntrance: 'fadeRight',
        ambient: [],
        hover: 'hover.scale',
        timing: 'normal',
        themes: ['process', 'flow', 'journey']
    },
    'Krystal Bloom': {
        description: 'scaleUp with slow timing for crystalline reveals',
        entrance: 'scaleUp',
        ambient: ['ambient.shimmer'],
        hover: 'hover.lift',
        timing: 'slow',
        themes: ['crystalline', 'mineral', 'geometric']
    },
    'Scalar Slide': {
        description: 'stagger.containerFast for lists/metrics',
        entrance: 'fadeUp',
        stagger: 'stagger.containerFast',
        ambient: [],
        hover: 'hover.lift',
        timing: 'fast',
        themes: ['lists', 'metrics', 'data']
    },
    'Vortex Reveal': {
        description: 'fadeUp with bounce easing for dynamic content',
        entrance: 'fadeUp',
        easing: 'bounce',
        ambient: ['ambient.pulse'],
        hover: 'hover.glow',
        timing: 'normal',
        themes: ['dynamic', 'vortex', 'energy']
    }
} as const;

export type MotionArchetypeName = keyof typeof MOTION_ARCHETYPES;

// Get archetype by theme keyword
export function getArchetypeByTheme(theme: string): MotionArchetypeName {
    const themeLower = theme.toLowerCase();
    for (const [name, config] of Object.entries(MOTION_ARCHETYPES)) {
        if (config.themes.some(t => themeLower.includes(t))) {
            return name as MotionArchetypeName;
        }
    }
    return 'Liquid-Crystal Float'; // Default
}

// Generate motion system prompt section
export function getMotionSystemPrompt(): string {
    return `## MOTION SYSTEM
Use these motion presets from @/lib/motion:

**Timing:** ${Object.entries(MOTION_TIMING).map(([k, v]) => `${k} (${v})`).join(', ')}
**Easing:** smooth [0.23,0.82,0.35,1], snappy, bounce, easeOut

**Entrance Animations:** ${Object.values(ENTRANCE_ANIMATIONS).map(a => `${a.name}: ${a.description}`).join('; ')}

**Stagger:** ${Object.values(STAGGER_PATTERNS).map(s => `${s.name}: ${s.description}`).join('; ')}

**Hover Effects:** ${Object.values(HOVER_EFFECTS).map(h => `${h.name}: ${h.description}`).join('; ')}

**Ambient:** ${Object.values(AMBIENT_ANIMATIONS).map(a => `${a.name}: ${a.description}`).join('; ')}

**6 Andara Motion Archetypes:**
${Object.entries(MOTION_ARCHETYPES).map(([name, config], i) =>
        `${i + 1}. ${name}: ${config.description}`
    ).join('\n')}`;
}
