/**
 * Cluster Design Tokens
 * 
 * Central registry for cluster-themed design tokens including colors,
 * gradients, and utility maps.
 */

export interface ClusterTheme {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    glow: string;
}

export const CLUSTER_THEMES: Record<string, ClusterTheme> = {
    water_science: {
        primary: '#3b82f6', // bright "charged water" blue
        secondary: '#1e40af', // deep aquifer / lab-blue
        accent: '#06b6d4', // turquoise ion glow
        background: 'radial-gradient(circle at top, #1e40af 0, #020617 65%)',
        glow: 'rgba(59, 130, 246, 0.3)',
    },
    mineral_science: {
        primary: '#f97316', // molten mineral orange
        secondary: '#111827', // basalt / deep rock
        accent: '#eab308', // golden ore / sulfur glint
        background: 'conic-gradient(from 210deg at 0% 0%, #111827, #020617, #4b5563, #111827)',
        glow: 'rgba(234, 179, 8, 0.25)',
    },
    crystalline_matrix: {
        primary: '#a855f7', // violet crystal
        secondary: '#4c1d95', // deep amethyst
        accent: '#c4b5fd', // lavender sheen
        background: 'linear-gradient(to bottom, #020617, #0b1120)',
        glow: 'rgba(196, 181, 253, 0.2)',
    },
    bioelectric_science: {
        primary: '#22c55e', // living field green
        secondary: '#064e3b', // deep biofield
        accent: '#22d3ee', // electric cyan charge
        background: 'linear-gradient(135deg, #064e3b 0, #020617 100%)',
        glow: 'rgba(34, 197, 94, 0.35)',
    },
    products: {
        primary: '#4b0082', // Andara cosmic indigo
        secondary: '#020617', // deep background
        accent: '#ffd700', // sunburst gold
        background: 'radial-gradient(circle at center, #4b0082 0, #020617 100%)',
        glow: 'rgba(255, 215, 0, 0.25)',
    },
    support: {
        primary: '#10b981', // reassuring green
        secondary: '#0f172a', // neutral support background
        accent: '#6ee7b7', // soft mint highlight
        background: 'radial-gradient(circle at center, #0f172a 0, #020617 100%)',
        glow: 'rgba(110, 231, 183, 0.2)',
    },
};

/**
 * Get cluster theme by key
 */
export function getClusterTheme(key: string): ClusterTheme | undefined {
    return CLUSTER_THEMES[key.toLowerCase().replace(/-/g, '_')];
}
