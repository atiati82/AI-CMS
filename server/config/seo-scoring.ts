/**
 * SEO Scoring Configuration
 * Tunable weights for the multi-factor priority scoring algorithm
 */

export const scoringConfig = {
    // Priority weights (P1, P2, P3)
    priorityWeights: {
        1: 5,  // P1
        2: 3,  // P2
        3: 1,  // P3
        4: 0.5, // P4
        5: 0.2  // P5
    },

    // Business weights by page type
    businessWeights: {
        product: 5,
        calculator: 4,
        tool_calculator: 4,
        hub: 4,
        pillar_overview: 4,
        cluster_overview: 3.5,
        'getting-started': 3,
        guide: 3,
        faq: 3,
        article: 2,
        blog_post: 2,
        legal: 0.5,
        about: 1,
        team: 1
    },

    // Gap weights (content quality issues)
    gapWeights: {
        missingFaq: 0.5,
        missingProof: 0.8,
        thinContent: 0.6,
        lowInternalLinks: 0.7,
        noSchema: 0.4,
        missingH1: 0.9,
        fewH2: 0.3,
        missingGlossary: 0.2
    },

    // Refresh intervals by priority (in days)
    refreshIntervals: {
        1: 30,   // P1
        2: 60,   // P2
        3: 120,  // P3
        4: 180,  // P4
        5: 365   // P5
    },

    // Link targets by page type
    linkTargets: {
        hub: { out: 12, in: 8 },
        pillar_overview: { out: 10, in: 6 },
        cluster_overview: { out: 8, in: 5 },
        product: { out: 8, in: 6 },
        calculator: { out: 6, in: 4 },
        tool_calculator: { out: 6, in: 4 },
        article: { out: 6, in: 3 },
        guide: { out: 8, in: 4 },
        faq: { out: 4, in: 2 },
        blog_post: { out: 5, in: 2 },
        legal: { out: 2, in: 1 },
        default: { out: 6, in: 3 }
    },

    // Minimum word counts by page type
    minWordCounts: {
        product: 500,
        hub: 800,
        pillar_overview: 1000,
        cluster_overview: 600,
        article: 600,
        guide: 800,
        calculator: 300,
        tool_calculator: 300,
        faq: 400,
        blog_post: 600,
        legal: 300,
        default: 400
    },

    // Cluster balance penalty
    clusterBalance: {
        recentDays: 7,
        penaltyWeight: -1.0,
        bonusWeight: 0.3
    }
};

/**
 * Get business weight for a page type
 */
export function getBusinessWeight(pageType: string): number {
    return scoringConfig.businessWeights[pageType as keyof typeof scoringConfig.businessWeights]
        || scoringConfig.businessWeights.article;
}

/**
 * Get refresh interval for a priority level
 */
export function getRefreshInterval(priority: number): number {
    return scoringConfig.refreshIntervals[priority as keyof typeof scoringConfig.refreshIntervals]
        || scoringConfig.refreshIntervals[3];
}

/**
 * Get link targets for a page type
 */
export function getLinkTargets(pageType: string): { out: number; in: number } {
    return scoringConfig.linkTargets[pageType as keyof typeof scoringConfig.linkTargets]
        || scoringConfig.linkTargets.default;
}

/**
 * Get minimum word count for a page type
 */
export function getMinWordCount(pageType: string): number {
    return scoringConfig.minWordCounts[pageType as keyof typeof scoringConfig.minWordCounts]
        || scoringConfig.minWordCounts.default;
}
