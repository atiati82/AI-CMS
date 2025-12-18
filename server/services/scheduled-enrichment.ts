/**
 * Scheduled Enrichment Service
 * Automatically enriches pages that are missing visualConfig
 */

import { db } from '../db';
import { pages } from '../../shared/schema';
import { eq, isNull, or, sql } from 'drizzle-orm';
import { enrichPageHtml } from './ai-enricher';
import type { InsertPage } from '../../shared/schema';

export interface EnrichmentResult {
    pageId: string;
    title: string;
    status: 'success' | 'error' | 'skipped';
    motionSpecs: number;
    imagePrompts: number;
    error?: string;
}

export interface EnrichmentRunLog {
    runId: string;
    startedAt: Date;
    completedAt: Date;
    pagesProcessed: number;
    pagesUpdated: number;
    errors: number;
    results: EnrichmentResult[];
}

// In-memory log of recent runs (in production, store in DB)
export const enrichmentRunLogs: EnrichmentRunLog[] = [];

// In-memory history of visualConfig changes for undo (last 50 changes)
export const visualConfigHistory: Array<{
    pageId: string;
    pageTitle: string;
    previousConfig: any;
    newConfig: any;
    timestamp: Date;
}> = [];

/**
 * Save config to history before updating
 */
export function saveConfigToHistory(pageId: string, pageTitle: string, previousConfig: any, newConfig: any) {
    visualConfigHistory.unshift({
        pageId,
        pageTitle,
        previousConfig,
        newConfig,
        timestamp: new Date(),
    });
    // Keep only last 50 entries
    if (visualConfigHistory.length > 50) {
        visualConfigHistory.pop();
    }
}

/**
 * Get visual config history for a page
 */
export function getPageConfigHistory(pageId?: string): typeof visualConfigHistory {
    if (pageId) {
        return visualConfigHistory.filter(h => h.pageId === pageId);
    }
    return visualConfigHistory;
}

/**
 * Get the previous config for a page (for undo)
 */
export function getPreviousConfig(pageId: string): any | null {
    const history = visualConfigHistory.find(h => h.pageId === pageId);
    return history?.previousConfig || null;
}

/**
 * Find pages that need enrichment (missing visualConfig or empty)
 */
export async function findPagesNeedingEnrichment(limit: number = 20): Promise<typeof pages.$inferSelect[]> {
    const result = await db.select().from(pages)
        .where(
            or(
                isNull(pages.visualConfig),
                sql`${pages.visualConfig}::text = '{}'`,
                sql`${pages.visualConfig}::text = 'null'`
            )
        )
        .limit(limit);

    return result.filter(p => p.aiStartupHtml || p.content);
}

/**
 * Run scheduled enrichment on pages missing visualConfig
 */
export async function runScheduledEnrichment(limit: number = 10): Promise<EnrichmentRunLog> {
    const runId = `run-${Date.now()}`;
    const startedAt = new Date();
    const results: EnrichmentResult[] = [];
    let pagesUpdated = 0;
    let errors = 0;

    console.log(`[Scheduled Enrichment] Starting run ${runId}...`);

    try {
        const pagesToEnrich = await findPagesNeedingEnrichment(limit);
        console.log(`[Scheduled Enrichment] Found ${pagesToEnrich.length} pages to enrich`);

        for (const page of pagesToEnrich) {
            try {
                const contentToAnalyze = page.aiStartupHtml || page.content || '';

                if (!contentToAnalyze.trim()) {
                    results.push({
                        pageId: page.id,
                        title: page.title,
                        status: 'skipped',
                        motionSpecs: 0,
                        imagePrompts: 0,
                        error: 'No content to analyze'
                    });
                    continue;
                }

                console.log(`[Scheduled Enrichment] Processing: ${page.title}`);
                const enrichment = await enrichPageHtml(contentToAnalyze);

                if (enrichment.visualConfig) {
                    const updates: Partial<InsertPage> = {
                        visualConfig: {
                            ...(page.visualConfig || {}),
                            ...enrichment.visualConfig,
                            updatedAt: new Date().toISOString(),
                            autoEnriched: true,
                        } as any,
                    };

                    if (enrichment.suggestedSeo?.title && !page.seoTitle) {
                        updates.seoTitle = enrichment.suggestedSeo.title;
                    }
                    if (enrichment.suggestedSeo?.description && !page.seoDescription) {
                        updates.seoDescription = enrichment.suggestedSeo.description;
                    }

                    await db.update(pages).set(updates as any).where(eq(pages.id, page.id as string));
                    pagesUpdated++;

                    results.push({
                        pageId: page.id,
                        title: page.title,
                        status: 'success',
                        motionSpecs: enrichment.motionSpecs?.length || 0,
                        imagePrompts: enrichment.imagePrompts?.length || 0,
                    });
                } else {
                    results.push({
                        pageId: page.id,
                        title: page.title,
                        status: 'skipped',
                        motionSpecs: 0,
                        imagePrompts: 0,
                        error: 'No enrichment data extracted'
                    });
                }
            } catch (error: any) {
                errors++;
                results.push({
                    pageId: page.id,
                    title: page.title,
                    status: 'error',
                    motionSpecs: 0,
                    imagePrompts: 0,
                    error: error.message,
                });
                console.error(`[Scheduled Enrichment] Error on ${page.title}:`, error.message);
            }
        }
    } catch (error: any) {
        console.error('[Scheduled Enrichment] Fatal error:', error);
        errors++;
    }

    const completedAt = new Date();
    const log: EnrichmentRunLog = {
        runId,
        startedAt,
        completedAt,
        pagesProcessed: results.length,
        pagesUpdated,
        errors,
        results,
    };

    // Store log (keep last 10 runs)
    enrichmentRunLogs.unshift(log);
    if (enrichmentRunLogs.length > 10) {
        enrichmentRunLogs.pop();
    }

    console.log(`[Scheduled Enrichment] Run ${runId} complete: ${pagesUpdated}/${results.length} pages updated, ${errors} errors`);
    return log;
}

/**
 * Get recent enrichment run logs
 */
export function getEnrichmentLogs(): EnrichmentRunLog[] {
    return enrichmentRunLogs;
}

/**
 * Get analytics summary
 */
export function getEnrichmentAnalytics(): {
    totalRuns: number;
    totalPagesProcessed: number;
    totalUpdated: number;
    totalErrors: number;
    successRate: number;
    averagePagesPerRun: number;
    lastRunTime: string | null;
} {
    const totalRuns = enrichmentRunLogs.length;
    const totalPagesProcessed = enrichmentRunLogs.reduce((sum, log) => sum + log.pagesProcessed, 0);
    const totalUpdated = enrichmentRunLogs.reduce((sum, log) => sum + log.pagesUpdated, 0);
    const totalErrors = enrichmentRunLogs.reduce((sum, log) => sum + log.errors, 0);
    const successRate = totalPagesProcessed > 0 ? Math.round((totalUpdated / totalPagesProcessed) * 100) : 0;
    const averagePagesPerRun = totalRuns > 0 ? Math.round(totalPagesProcessed / totalRuns) : 0;
    const lastRunTime = enrichmentRunLogs.length > 0 ? enrichmentRunLogs[0].completedAt.toISOString() : null;

    return {
        totalRuns,
        totalPagesProcessed,
        totalUpdated,
        totalErrors,
        successRate,
        averagePagesPerRun,
        lastRunTime,
    };
}

/**
 * Schedule daily enrichment at midnight
 * Call this function during server startup
 */
export function scheduleDaily() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Next midnight

    const msUntilMidnight = midnight.getTime() - now.getTime();

    console.log(`[Scheduled Enrichment] Scheduled for ${midnight.toISOString()}`);

    // Run at midnight, then every 24 hours
    setTimeout(() => {
        runScheduledEnrichment();
        setInterval(() => runScheduledEnrichment(), 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
}
