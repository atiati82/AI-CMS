/**
 * Recommendation Engine Service
 * Generates daily page recommendations with balanced selection
 */

import { db } from '../db';
import { pages, pageRecommendations, clusterOptimizationLog } from '@shared/schema';
import { eq, desc, and, gte, lte } from 'drizzle-orm';
import { calculatePriorityScore, type PageScore } from './scoring-engine.service';
import { analyzePageContent } from './content-analyzer.service';

export interface DailyRecommendation {
    pageId: string;
    pageTitle: string;
    pagePath: string;
    priority: number;
    cluster: string | null;
    whySelected: string[];
    tasks: string[];
    impactEstimate: 'high' | 'medium' | 'low';
    dynamicBoxes: string[];
    internalLinksOut: string[];
    internalLinksInNeeded: string[];
    upgradePlan: any;
}

/**
 * Generate daily recommendations (3-5 pages)
 */
export async function generateDailyRecommendations(count: number = 3): Promise<DailyRecommendation[]> {
    console.log(`🎯 Generating ${count} daily recommendations...`);

    // Calculate scores for all pages
    const allPages = await db.select().from(pages);
    const scoredPages: (PageScore & { page: typeof allPages[0] })[] = [];

    for (const page of allPages) {
        try {
            const score = await calculatePriorityScore(page.id);
            scoredPages.push({ ...score, page });
        } catch (error) {
            console.error(`Failed to score page ${page.id}:`, error);
        }
    }

    // Sort by priority score
    scoredPages.sort((a, b) => b.priorityScore - a.priorityScore);

    // Select balanced pages
    const selected = await selectBalancedPages(scoredPages, count);

    // Generate upgrade plans
    const recommendations: DailyRecommendation[] = [];
    for (const item of selected) {
        const recommendation = await generateUpgradePlan(item.page, item);
        recommendations.push(recommendation);

        // Save to database
        await db.insert(pageRecommendations).values({
            pageId: item.page.id,
            whySelected: recommendation.whySelected,
            tasks: recommendation.tasks,
            impactEstimate: recommendation.impactEstimate,
            dynamicBoxes: recommendation.dynamicBoxes,
            internalLinksOut: recommendation.internalLinksOut,
            internalLinksInNeeded: recommendation.internalLinksInNeeded,
            upgradePlan: recommendation.upgradePlan,
            status: 'pending'
        });

        // Log cluster optimization
        if (item.page.clusterKey) {
            await db.insert(clusterOptimizationLog).values({
                clusterKey: item.page.clusterKey,
                pageId: item.page.id
            });
        }
    }

    console.log(`✅ Generated ${recommendations.length} recommendations`);
    return recommendations;
}

/**
 * Select balanced pages (1× Money/Trust, 1× Hub, 1× Support/FAQ)
 */
async function selectBalancedPages(
    scoredPages: (PageScore & { page: any })[],
    count: number
): Promise<(PageScore & { page: any })[]> {
    const selected: (PageScore & { page: any })[] = [];

    // Category 1: Money/Trust (product, calculator)
    const moneyPages = scoredPages.filter(p =>
        ['product', 'calculator', 'tool_calculator'].includes(p.page.template)
    );
    if (moneyPages.length > 0) {
        selected.push(moneyPages[0]);
    }

    // Category 2: Hub strengthener (hub, pillar, cluster overview)
    const hubPages = scoredPages.filter(p =>
        ['hub', 'pillar_overview', 'cluster_overview'].includes(p.page.template) &&
        !selected.includes(p)
    );
    if (hubPages.length > 0) {
        selected.push(hubPages[0]);
    }

    // Category 3: Support/FAQ/Experiment
    const supportPages = scoredPages.filter(p =>
        ['faq', 'guide', 'article'].includes(p.page.template) &&
        !selected.includes(p)
    );
    if (supportPages.length > 0) {
        selected.push(supportPages[0]);
    }

    // Fill remaining slots with highest scores
    const remaining = scoredPages.filter(p => !selected.includes(p));
    while (selected.length < count && remaining.length > 0) {
        selected.push(remaining.shift()!);
    }

    return selected.slice(0, count);
}

/**
 * Generate upgrade plan for a page
 */
async function generateUpgradePlan(page: any, score: PageScore): Promise<DailyRecommendation> {
    const analysis = await analyzePageContent(page.id);

    // Determine why selected
    const whySelected: string[] = [];
    if (score.breakdown.business >= 15) {
        whySelected.push('High business leverage (drives conversion)');
    }
    if (score.breakdown.freshness >= 10) {
        whySelected.push(`Stale content (last updated ${Math.floor((Date.now() - new Date(page.updatedAt).getTime()) / (1000 * 60 * 60 * 24))} days ago)`);
    }
    if (analysis.gaps.length > 0) {
        const criticalGaps = analysis.gaps.filter(g => g.severity === 'critical');
        if (criticalGaps.length > 0) {
            whySelected.push(`Critical gaps: ${criticalGaps.map(g => g.type).join(', ')}`);
        }
    }
    if (score.breakdown.links >= 8) {
        whySelected.push('Weak internal linking structure');
    }

    // Generate tasks
    const tasks: string[] = [];
    for (const gap of analysis.gaps.slice(0, 5)) {
        tasks.push(analysis.recommendations[analysis.gaps.indexOf(gap)] || gap.message);
    }

    // Determine dynamic boxes needed
    const dynamicBoxes: string[] = [];
    if (!analysis.hasFaqBlock) dynamicBoxes.push('FAQ Booster');
    if (!analysis.hasProofBlock && ['product', 'calculator'].includes(page.template)) {
        dynamicBoxes.push('Proof Booster');
    }
    if (analysis.internalLinksOut < 6) dynamicBoxes.push('Link Booster');
    if (!analysis.hasGlossary && analysis.wordCount > 600) {
        dynamicBoxes.push('Glossary Booster');
    }

    // Determine impact
    let impactEstimate: 'high' | 'medium' | 'low' = 'medium';
    if (score.priorityScore > 50) impactEstimate = 'high';
    else if (score.priorityScore < 20) impactEstimate = 'low';

    return {
        pageId: page.id,
        pageTitle: page.title,
        pagePath: page.path,
        priority: page.priority,
        cluster: page.clusterKey,
        whySelected,
        tasks,
        impactEstimate,
        dynamicBoxes,
        internalLinksOut: [], // Will be populated by link graph service
        internalLinksInNeeded: [], // Will be populated by link graph service
        upgradePlan: {
            pageId: page.id,
            priority: `P${page.priority}`,
            whySelected,
            tasks,
            dynamicBoxesToConsider: dynamicBoxes,
            impactEstimate
        }
    };
}

/**
 * Get recommendations for a specific date
 */
export async function getRecommendationsForDate(date: Date): Promise<any[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await db.select()
        .from(pageRecommendations)
        .where(
            and(
                gte(pageRecommendations.recommendedDate, startOfDay),
                lte(pageRecommendations.recommendedDate, endOfDay)
            )
        )
        .orderBy(desc(pageRecommendations.recommendedDate));
}

/**
 * Get today's recommendations
 */
export async function getTodaysRecommendations(): Promise<any[]> {
    return await getRecommendationsForDate(new Date());
}
