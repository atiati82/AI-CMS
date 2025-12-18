/**
 * SEO Optimization API Routes
 * Endpoints for recommendations, metrics, and dashboard
 */

import { Router } from 'express';
import { db } from '../../db';
import { pages, pageMetrics, pageRecommendations, optimizationHistory, cronJobs, cronJobLogs } from '@shared/schema';
import { eq, desc, and, gte, sql } from 'drizzle-orm';
import { generateDailyRecommendations, getTodaysRecommendations, getRecommendationsForDate } from '../../services/recommendation-engine.service';
import { calculatePriorityScore, calculateAllScores } from '../../services/scoring-engine.service';
import { analyzePageContent, analyzeAllPages } from '../../services/content-analyzer.service';
import { seoAgent } from '../../agents/seo';
import contentBlocksRouter from './content-blocks';

const router = Router();

// Mount content blocks sub-router
router.use('/content-blocks', contentBlocksRouter);

// ============================================================================
// RECOMMENDATIONS
// ============================================================================

/**
 * GET /api/seo/recommendations
 * Get today's recommendations
 */
router.get('/recommendations', async (req, res) => {
    try {
        const recommendations = await getTodaysRecommendations();

        // Enrich with page data
        const enriched = await Promise.all(
            recommendations.map(async (rec) => {
                const [page] = await db.select().from(pages).where(eq(pages.id, rec.pageId));
                return { ...rec, page };
            })
        );

        res.json({ recommendations: enriched });
    } catch (error: any) {
        console.error('Failed to get recommendations:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/seo/recommendations/:date
 * Get recommendations for a specific date
 */
router.get('/recommendations/:date', async (req, res) => {
    try {
        const date = new Date(req.params.date);
        const recommendations = await getRecommendationsForDate(date);

        const enriched = await Promise.all(
            recommendations.map(async (rec) => {
                const [page] = await db.select().from(pages).where(eq(pages.id, rec.pageId));
                return { ...rec, page };
            })
        );

        res.json({ recommendations: enriched });
    } catch (error: any) {
        console.error('Failed to get recommendations:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/seo/recommendations/generate
 * Manually trigger recommendation generation
 */
router.post('/recommendations/generate', async (req, res) => {
    try {
        const count = parseInt(req.body.count || '3');
        const recommendations = await generateDailyRecommendations(count);
        res.json({ success: true, recommendations });
    } catch (error: any) {
        console.error('Failed to generate recommendations:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * PUT /api/seo/recommendations/:id/status
 * Update recommendation status
 */
router.put('/recommendations/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await db.update(pageRecommendations)
            .set({
                status,
                completedAt: status === 'completed' ? new Date() : null
            })
            .where(eq(pageRecommendations.id, id));

        res.json({ success: true });
    } catch (error: any) {
        console.error('Failed to update recommendation:', error);
        res.status(500).json({ error: error.message });
    }
});

// ============================================================================
// DYNAMIC CONTENT GENERATION
// ============================================================================

/**
 * POST /api/seo/generate/faq
 * Generate FAQ block for a page
 */
router.post('/generate/faq', async (req, res) => {
    try {
        const { pageId, topic } = req.body;
        const result = await seoAgent.execute({
            type: 'generate_faq_block',
            input: { pageId, topic }
        });
        res.json(result);
    } catch (error: any) {
        console.error('Failed to generate FAQ:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/seo/generate/proof
 * Generate Proof block for a claim
 */
router.post('/generate/proof', async (req, res) => {
    try {
        const { claim, evidenceType } = req.body;
        const result = await seoAgent.execute({
            type: 'generate_proof_block',
            input: { claim, evidenceType }
        });
        res.json(result);
    } catch (error: any) {
        console.error('Failed to generate proof:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/seo/generate/patch
 * Generate content patch based on instructions
 */
router.post('/generate/patch', async (req, res) => {
    try {
        const { pageId, instructions } = req.body;
        const result = await seoAgent.execute({
            type: 'generate_patch',
            input: { pageId, instructions }
        });
        res.json(result);
    } catch (error: any) {
        console.error('Failed to generate patch:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/seo/generate/internal-links
 * Suggest internal links for a page
 */
router.post('/generate/internal-links', async (req, res) => {
    try {
        const { pageId } = req.body;
        const result = await seoAgent.execute({
            type: 'suggest_internal_links',
            input: { pageId }
        });
        res.json(result);
    } catch (error: any) {
        console.error('Failed to suggest links:', error);
        res.status(500).json({ error: error.message });
    }
});


// ============================================================================
// METRICS
// ============================================================================

/**
 * GET /api/seo/metrics/:pageId
 * Get metrics for a specific page
 */
router.get('/metrics/:pageId', async (req, res) => {
    try {
        const { pageId } = req.params;

        const [metrics] = await db.select()
            .from(pageMetrics)
            .where(eq(pageMetrics.pageId, pageId))
            .orderBy(desc(pageMetrics.calculatedAt))
            .limit(1);

        if (!metrics) {
            // Calculate and return
            const score = await calculatePriorityScore(pageId);
            const analysis = await analyzePageContent(pageId);

            res.json({ score, analysis });
        } else {
            res.json({ metrics });
        }
    } catch (error: any) {
        console.error('Failed to get metrics:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/seo/metrics/scan
 * Scan all pages and update metrics
 */
router.post('/metrics/scan', async (req, res) => {
    try {
        console.log('🔍 Starting full page scan...');

        const analyses = await analyzeAllPages();
        const scores = await calculateAllScores();

        res.json({
            success: true,
            analyzed: analyses.length,
            scored: scores.length
        });
    } catch (error: any) {
        console.error('Failed to scan pages:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/seo/metrics/orphans
 * Get orphan pages (no inbound links)
 */
router.get('/metrics/orphans', async (req, res) => {
    try {
        const orphans = await db.select()
            .from(pageMetrics)
            .where(eq(pageMetrics.isOrphan, true));

        const enriched = await Promise.all(
            orphans.map(async (metric) => {
                const [page] = await db.select().from(pages).where(eq(pages.id, metric.pageId));
                return { ...metric, page };
            })
        );

        res.json({ orphans: enriched });
    } catch (error: any) {
        console.error('Failed to get orphans:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/seo/metrics/stale
 * Get stale pages (need refresh)
 */
router.get('/metrics/stale', async (req, res) => {
    try {
        const stale = await db.select()
            .from(pageMetrics)
            .where(eq(pageMetrics.isStale, true))
            .orderBy(desc(pageMetrics.daysSinceUpdate));

        const enriched = await Promise.all(
            stale.map(async (metric) => {
                const [page] = await db.select().from(pages).where(eq(pages.id, metric.pageId));
                return { ...metric, page };
            })
        );

        res.json({ stale: enriched });
    } catch (error: any) {
        console.error('Failed to get stale pages:', error);
        res.status(500).json({ error: error.message });
    }
});

// ============================================================================
// DASHBOARD
// ============================================================================

/**
 * GET /api/seo/dashboard
 * Get dashboard overview
 */
router.get('/dashboard', async (req, res) => {
    try {
        const todaysRecs = await getTodaysRecommendations();

        const [totalPages] = await db.select({ count: sql<number>`count(*)` }).from(pages);
        const [analyzedPages] = await db.select({ count: sql<number>`count(*)` }).from(pageMetrics);
        const [orphanCount] = await db.select({ count: sql<number>`count(*)` })
            .from(pageMetrics)
            .where(eq(pageMetrics.isOrphan, true));
        const [staleCount] = await db.select({ count: sql<number>`count(*)` })
            .from(pageMetrics)
            .where(eq(pageMetrics.isStale, true));

        // Get top scored pages
        const topScored = await db.select()
            .from(pageMetrics)
            .orderBy(desc(pageMetrics.priorityScore))
            .limit(10);

        res.json({
            overview: {
                totalPages: totalPages.count,
                analyzedPages: analyzedPages.count,
                orphanPages: orphanCount.count,
                stalePages: staleCount.count,
                todaysRecommendations: todaysRecs.length
            },
            topScored,
            todaysRecommendations: todaysRecs
        });
    } catch (error: any) {
        console.error('Failed to get dashboard:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/seo/dashboard/cluster-health
 * Get cluster optimization balance
 */
router.get('/dashboard/cluster-health', async (req, res) => {
    try {
        // Get all clusters
        const clusters = await db.execute(sql`
      SELECT DISTINCT cluster_key 
      FROM pages 
      WHERE cluster_key IS NOT NULL
    `);

        const clusterHealth = await Promise.all(
            clusters.rows.map(async (row: any) => {
                const clusterKey = row.cluster_key;

                // Count pages in cluster
                const [pageCount] = await db.select({ count: sql<number>`count(*)` })
                    .from(pages)
                    .where(eq(pages.clusterKey, clusterKey));

                // Count recent optimizations (last 7 days)
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                const recentOpts = await db.select()
                    .from(optimizationHistory)
                    .where(gte(optimizationHistory.appliedAt, sevenDaysAgo));

                const clusterOpts = recentOpts.filter(async (opt) => {
                    const [page] = await db.select().from(pages).where(eq(pages.id, opt.pageId));
                    return page?.clusterKey === clusterKey;
                });

                return {
                    clusterKey,
                    pageCount: pageCount.count,
                    recentOptimizations: clusterOpts.length,
                    lastOptimized: clusterOpts[0]?.appliedAt || null
                };
            })
        );

        res.json({ clusterHealth });
    } catch (error: any) {
        console.error('Failed to get cluster health:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/seo/dashboard/quick-wins
 * Get low-hanging fruit pages
 */
router.get('/dashboard/quick-wins', async (req, res) => {
    try {
        // Pages with high score but not yet optimized
        const quickWins = await db.select()
            .from(pageMetrics)
            .where(and(
                gte(pageMetrics.priorityScore, 30),
                eq(pageMetrics.isStale, false)
            ))
            .orderBy(desc(pageMetrics.gapWeight))
            .limit(20);

        const enriched = await Promise.all(
            quickWins.map(async (metric) => {
                const [page] = await db.select().from(pages).where(eq(pages.id, metric.pageId));
                return { ...metric, page };
            })
        );

        res.json({ quickWins: enriched });
    } catch (error: any) {
        console.error('Failed to get quick wins:', error);
        res.status(500).json({ error: error.message });
    }
});

// ============================================================================
// CRON JOBS
// ============================================================================

/**
 * GET /api/seo/cron/jobs
 * Get all cron jobs
 */
router.get('/cron/jobs', async (req, res) => {
    try {
        const jobs = await db.select().from(cronJobs).orderBy(cronJobs.name);
        res.json({ jobs });
    } catch (error: any) {
        console.error('Failed to get cron jobs:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/seo/cron/logs
 * Get cron job logs
 */
router.get('/cron/logs', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string || '50');
        const jobId = req.query.jobId as string;

        let query = db.select().from(cronJobLogs).orderBy(desc(cronJobLogs.startedAt)).limit(limit);

        if (jobId) {
            query = query.where(eq(cronJobLogs.jobId, jobId)) as any;
        }

        const logs = await query;
        res.json({ logs });
    } catch (error: any) {
        console.error('Failed to get cron logs:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * PUT /api/seo/cron/jobs/:id/status
 * Update cron job status
 */
router.put('/cron/jobs/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await db.update(cronJobs)
            .set({ status, updatedAt: new Date() })
            .where(eq(cronJobs.id, id));

        res.json({ success: true });
    } catch (error: any) {
        console.error('Failed to update cron job:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
