/**
 * Scoring Engine Service
 * Implements the multi-factor priority scoring algorithm for SEO optimization
 */

import { db } from '../db';
import { pages, pageMetrics, clusterOptimizationLog } from '@shared/schema';
import { eq, and, gte, sql } from 'drizzle-orm';
import { scoringConfig, getBusinessWeight, getRefreshInterval, getLinkTargets } from '../config/seo-scoring';

export interface PageScore {
    pageId: string;
    priorityScore: number;
    businessWeight: number;
    priorityWeight: number;
    freshnessWeight: number;
    gapWeight: number;
    linkWeight: number;
    clusterBalanceWeight: number;
    breakdown: {
        business: number;
        priority: number;
        freshness: number;
        gaps: number;
        links: number;
        clusterBalance: number;
    };
}

/**
 * Calculate priority score for a page
 */
export async function calculatePriorityScore(pageId: string): Promise<PageScore> {
    // Get page data
    const [page] = await db.select().from(pages).where(eq(pages.id, pageId));
    if (!page) {
        throw new Error(`Page not found: ${pageId}`);
    }

    // Get or create metrics
    let [metrics] = await db.select().from(pageMetrics).where(eq(pageMetrics.pageId, pageId));

    if (!metrics) {
        // Create initial metrics
        metrics = await createInitialMetrics(pageId);
    }

    // Calculate individual weights
    const businessWeight = calculateBusinessWeight(page.pageType, page.template);
    const priorityWeight = calculatePriorityWeight(page.priority);
    const freshnessWeight = calculateFreshnessWeight(
        metrics.daysSinceUpdate || 0,
        page.refreshIntervalDays || getRefreshInterval(page.priority)
    );
    const gapWeight = calculateGapWeight(metrics);
    const linkWeight = calculateLinkWeight(metrics, page.pageType);
    const clusterBalanceWeight = await calculateClusterBalanceWeight(page.clusterKey || '');

    // Total score
    const priorityScore = Math.round(
        (businessWeight * priorityWeight) +
        freshnessWeight +
        gapWeight +
        linkWeight +
        clusterBalanceWeight
    );

    // Update metrics with computed scores
    await db.update(pageMetrics)
        .set({
            priorityScore,
            businessWeight: Math.round(businessWeight),
            freshnessWeight: Math.round(freshnessWeight),
            gapWeight: Math.round(gapWeight),
            linkWeight: Math.round(linkWeight),
            clusterBalanceWeight: Math.round(clusterBalanceWeight),
            calculatedAt: new Date()
        })
        .where(eq(pageMetrics.pageId, pageId));

    return {
        pageId,
        priorityScore,
        businessWeight,
        priorityWeight,
        freshnessWeight,
        gapWeight,
        linkWeight,
        clusterBalanceWeight,
        breakdown: {
            business: Math.round(businessWeight * priorityWeight),
            priority: priorityWeight,
            freshness: Math.round(freshnessWeight),
            gaps: Math.round(gapWeight),
            links: Math.round(linkWeight),
            clusterBalance: Math.round(clusterBalanceWeight)
        }
    };
}

/**
 * Calculate business weight based on page type
 */
function calculateBusinessWeight(pageType: string, template: string): number {
    // Use template if it's more specific
    const type = template !== 'article' ? template : pageType;
    return getBusinessWeight(type);
}

/**
 * Calculate priority weight (P1=5, P2=3, P3=1)
 */
function calculatePriorityWeight(priority: number): number {
    return scoringConfig.priorityWeights[priority as keyof typeof scoringConfig.priorityWeights] || 1;
}

/**
 * Calculate freshness weight (staleness penalty)
 */
function calculateFreshnessWeight(daysSinceUpdate: number, refreshInterval: number): number {
    const staleness = (daysSinceUpdate - refreshInterval) / refreshInterval;
    const clampedStaleness = Math.max(0, Math.min(2, staleness));
    return clampedStaleness * 10; // Scale to 0-20 points
}

/**
 * Calculate gap weight (content quality issues)
 */
function calculateGapWeight(metrics: any): number {
    let weight = 0;
    const gaps = scoringConfig.gapWeights;

    if (!metrics.hasH1) weight += gaps.missingH1;
    if (metrics.h2Count < 3) weight += gaps.fewH2;
    if (!metrics.hasFaqBlock) weight += gaps.missingFaq;
    if (!metrics.hasProofBlock) weight += gaps.missingProof;
    if (!metrics.hasSchema) weight += gaps.noSchema;
    if (!metrics.hasGlossary) weight += gaps.missingGlossary;
    if (metrics.wordCount < 400) weight += gaps.thinContent;
    if (metrics.internalLinksOut < 3) weight += gaps.lowInternalLinks;

    return weight * 10; // Scale up
}

/**
 * Calculate link weight (link graph health)
 */
function calculateLinkWeight(metrics: any, pageType: string): number {
    const targets = getLinkTargets(pageType);
    let weight = 0;

    // Low inbound links
    if (metrics.internalLinksIn < targets.in) {
        weight += 0.8;
    }

    // Low outbound links
    if (metrics.internalLinksOut < targets.out) {
        weight += 0.6;
    }

    // Orphan page (critical issue)
    if (metrics.isOrphan) {
        weight += 1.2;
    }

    return weight * 10; // Scale up
}

/**
 * Calculate cluster balance weight (avoid overworking one cluster)
 */
async function calculateClusterBalanceWeight(clusterKey: string): Promise<number> {
    if (!clusterKey) return 0.3 * 10; // Bonus for unclustered pages

    const { recentDays, penaltyWeight, bonusWeight } = scoringConfig.clusterBalance;

    // Check if cluster was optimized in last N days
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - recentDays);

    const recentOptimizations = await db.select()
        .from(clusterOptimizationLog)
        .where(
            and(
                eq(clusterOptimizationLog.clusterKey, clusterKey),
                gte(clusterOptimizationLog.optimizedDate, recentDate)
            )
        );

    // If optimized recently, apply penalty
    if (recentOptimizations.length >= 2) {
        return penaltyWeight * 10;
    }

    return bonusWeight * 10; // Small bonus
}

/**
 * Create initial metrics for a page
 */
async function createInitialMetrics(pageId: string): Promise<any> {
    const [page] = await db.select().from(pages).where(eq(pages.id, pageId));

    const daysSinceUpdate = Math.floor(
        (Date.now() - new Date(page.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
    );

    const [newMetrics] = await db.insert(pageMetrics)
        .values({
            pageId,
            daysSinceUpdate,
            isStale: daysSinceUpdate > (page.refreshIntervalDays || 60),
            wordCount: page.contentLengthWords || 0,
            internalLinksOut: (page.internalLinks || []).length,
            internalLinksIn: 0, // Will be calculated separately
            isOrphan: false, // Will be calculated separately
            hasH1: false, // Will be analyzed from content
            h2Count: 0, // Will be analyzed from content
            hasFaqBlock: (page.componentBlocks || []).includes('faq'),
            hasProofBlock: (page.componentBlocks || []).includes('proof'),
            hasSchema: !!page.schemaType,
            hasGlossary: false // Will be analyzed from content
        })
        .returning();

    return newMetrics;
}

/**
 * Calculate scores for all pages
 */
export async function calculateAllScores(): Promise<PageScore[]> {
    const allPages = await db.select({ id: pages.id }).from(pages);

    const scores: PageScore[] = [];
    for (const page of allPages) {
        try {
            const score = await calculatePriorityScore(page.id);
            scores.push(score);
        } catch (error) {
            console.error(`Failed to score page ${page.id}:`, error);
        }
    }

    return scores.sort((a, b) => b.priorityScore - a.priorityScore);
}

/**
 * Get top N pages by priority score
 */
export async function getTopScoredPages(limit: number = 10): Promise<PageScore[]> {
    const scores = await calculateAllScores();
    return scores.slice(0, limit);
}
