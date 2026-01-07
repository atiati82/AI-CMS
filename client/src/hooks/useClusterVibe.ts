import { useQuery } from '@tanstack/react-query';

export type VisualVibe = {
    vibeKeywords: string[];
    emotionalTone: string[];
    animationIdeas: string[];
    aiImagePromptPattern?: string;
    aiVideoPromptPattern?: string;
    designerNotes?: string;
};

export type Cluster = {
    id: string;
    key: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    parentClusterKey: string | null;
    priority: number;
    color: string | null;
    visualVibe: VisualVibe | null;
};

export type ClusterVibeResult = {
    cluster: Cluster | null;
    color: string;
    vibeKeywords: string[];
    emotionalTone: string[];
    isLoading: boolean;
    error: Error | null;
};

const DEFAULT_COLOR = '#10b981'; // Emerald (fallback)

/**
 * Hook to fetch cluster data and extract visual vibe information.
 * Uses the cluster key to look up the cluster via API.
 */
export function useClusterVibe(clusterKey: string | null | undefined): ClusterVibeResult {
    const { data: clusters, isLoading, error } = useQuery<Cluster[]>({
        queryKey: ['/api/clusters'],
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        enabled: !!clusterKey,
    });

    // Find the cluster by key
    const cluster = clusters?.find(c => c.key === clusterKey) ?? null;

    return {
        cluster,
        color: cluster?.color || DEFAULT_COLOR,
        vibeKeywords: cluster?.visualVibe?.vibeKeywords || [],
        emotionalTone: cluster?.visualVibe?.emotionalTone || [],
        isLoading,
        error: error as Error | null,
    };
}

/**
 * Generate CSS custom properties from cluster color.
 * These can be used in inline styles or CSS variables.
 */
export function getClusterColorVars(color: string) {
    return {
        '--cluster-color': color,
        '--cluster-color-10': `${color}1a`, // 10% opacity
        '--cluster-color-20': `${color}33`, // 20% opacity
        '--cluster-color-30': `${color}4d`, // 30% opacity
        '--cluster-color-50': `${color}80`, // 50% opacity
    } as React.CSSProperties;
}
