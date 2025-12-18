import { storage } from "../storage";
import { searchConsoleService } from "./searchConsoleService";
import { chatWithFunctions } from "./bigmind-cms";
import type { Page, InsertPageAiSuggestion, InsertPageSearchMetrics, InsertProposedPage } from "@shared/schema";

export interface PageOpportunityScore {
  pageId: string;
  pageTitle: string;
  pagePath: string;
  opportunityScore: number;
  factors: {
    impressionsWithLowCtr: number;
    positionImprovement: number;
    contentGap: number;
    internalLinkingOpportunity: number;
  };
  recommendations: string[];
}

export interface SeoSuggestion {
  type: string;
  title: string;
  content?: string;
  rationale: string;
  impactScore: number;
  keywords?: string[];
  targetSection?: string;
  insertAfter?: string;
}

export interface DailySeoReport {
  runId: string;
  runDate: Date;
  pagesAnalyzed: number;
  suggestionsGenerated: number;
  metricsUpdated: number;
  topOpportunityPages: PageOpportunityScore[];
  summary: {
    avgPosition: number;
    totalImpressions: number;
    totalClicks: number;
    avgCtr: number;
    pagesNeedingAttention: number;
  };
}

const SUGGESTION_TYPES = {
  NEW_HEADING: 'new_heading',
  NEW_SECTION: 'new_section',
  INTERNAL_LINKING: 'internal_linking',
  FAQ_BLOCK: 'faq_block',
  SCHEMA_UPDATE: 'schema_update',
  META_IMPROVEMENT: 'meta_improvement',
  CONTENT_EXPANSION: 'content_expansion',
  KEYWORD_OPTIMIZATION: 'keyword_optimization',
  CTA_ADDITION: 'cta_addition',
  IMAGE_SUGGESTION: 'image_suggestion',
} as const;

class SeoBrainService {
  async calculateOpportunityScore(pageId: string): Promise<PageOpportunityScore | null> {
    const page = await storage.getPage(pageId);
    if (!page) return null;

    const latestMetrics = await storage.getLatestPageSearchMetrics(pageId);
    const pageSeo = await storage.getPageSeo(pageId);

    let impressionsWithLowCtr = 0;
    let positionImprovement = 0;
    let contentGap = 0;
    let internalLinkingOpportunity = 0;
    const recommendations: string[] = [];

    if (latestMetrics) {
      if (latestMetrics.impressions && latestMetrics.impressions > 100 && latestMetrics.ctr && latestMetrics.ctr < 200) {
        impressionsWithLowCtr = 30;
        recommendations.push("High impressions but low CTR - consider improving meta title and description");
      }

      if (latestMetrics.avgPosition && latestMetrics.avgPosition > 10 && latestMetrics.avgPosition < 30) {
        positionImprovement = 25;
        recommendations.push("Page ranking on page 2-3 - content optimization could push to page 1");
      }

      if (latestMetrics.avgPosition && latestMetrics.avgPosition > 5 && latestMetrics.avgPosition <= 10) {
        positionImprovement = 20;
        recommendations.push("Close to top 5 - minor improvements could significantly increase traffic");
      }
    }

    if (!page.content || (page.content as string).length < 500) {
      contentGap = 20;
      recommendations.push("Short content - consider expanding with more detailed information");
    }

    if (pageSeo) {
      if (!pageSeo.internalLinks || (pageSeo.internalLinks as string[]).length < 2) {
        internalLinkingOpportunity = 15;
        recommendations.push("Limited internal links - add contextual links to related content");
      }
    } else {
      internalLinkingOpportunity = 10;
      recommendations.push("No SEO data configured - set up focus keyword and meta data");
    }

    const opportunityScore = impressionsWithLowCtr + positionImprovement + contentGap + internalLinkingOpportunity;

    return {
      pageId,
      pageTitle: page.title,
      pagePath: page.path,
      opportunityScore,
      factors: {
        impressionsWithLowCtr,
        positionImprovement,
        contentGap,
        internalLinkingOpportunity,
      },
      recommendations,
    };
  }

  async generateAiSuggestions(pageId: string, analysisContext?: string): Promise<SeoSuggestion[]> {
    const page = await storage.getPage(pageId);
    if (!page) return [];

    const pageSeo = await storage.getPageSeo(pageId);
    const latestMetrics = await storage.getLatestPageSearchMetrics(pageId);

    const prompt = `Analyze this page and generate SEO improvement suggestions:

PAGE TITLE: ${page.title}
PAGE PATH: ${page.path}
CLUSTER: ${page.clusterKey || 'none'}
FOCUS KEYWORD: ${pageSeo?.focusKeyword || 'not set'}
CURRENT META TITLE: ${page.seoTitle || page.title}
CURRENT META DESCRIPTION: ${page.seoDescription || 'not set'}

CONTENT EXCERPT:
${(page.content as string || '').substring(0, 1500)}

PERFORMANCE DATA:
- Impressions: ${latestMetrics?.impressions || 'N/A'}
- Clicks: ${latestMetrics?.clicks || 'N/A'}
- CTR: ${latestMetrics?.ctr ? (latestMetrics.ctr / 100).toFixed(2) + '%' : 'N/A'}
- Avg Position: ${latestMetrics?.avgPosition || 'N/A'}
- Top Query: ${latestMetrics?.topQuery || 'N/A'}

${analysisContext ? `ADDITIONAL CONTEXT:\n${analysisContext}` : ''}

Generate 3-5 specific, actionable SEO suggestions. For each suggestion, provide:
1. Type: One of [new_heading, new_section, internal_linking, faq_block, schema_update, meta_improvement, content_expansion, keyword_optimization, cta_addition, image_suggestion]
2. Title: Brief description
3. Content: Actual content or specific recommendation
4. Rationale: Why this improvement matters
5. Impact Score: 1-100 estimate of traffic impact
6. Keywords: Relevant keywords to target (if applicable)

Return as JSON array.`;

    try {
      const response = await chatWithFunctions([
        { role: 'user', content: prompt }
      ]);

      if (response.response) {
        const jsonMatch = response.response.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
    } catch (error) {
      console.error("[SEO Brain] Error generating AI suggestions:", error);
    }

    return [];
  }

  async createSuggestionsForPage(pageId: string): Promise<InsertPageAiSuggestion[]> {
    const suggestions = await this.generateAiSuggestions(pageId);
    const createdSuggestions: InsertPageAiSuggestion[] = [];

    for (const suggestion of suggestions) {
      const insertSuggestion: InsertPageAiSuggestion = {
        pageId,
        suggestionType: suggestion.type,
        suggestionPayload: {
          title: suggestion.title,
          content: suggestion.content,
          rationale: suggestion.rationale,
          impactScore: suggestion.impactScore,
          keywords: suggestion.keywords,
          targetSection: suggestion.targetSection,
          insertAfter: suggestion.insertAfter,
        },
        priority: Math.ceil((100 - suggestion.impactScore) / 20),
        opportunityScore: suggestion.impactScore,
      };

      createdSuggestions.push(insertSuggestion);
    }

    if (createdSuggestions.length > 0) {
      await storage.bulkCreatePageAiSuggestions(createdSuggestions);

      // Auto-generate content block drafts for certain suggestion types
      await this.autoGenerateContentBlocks(pageId, suggestions);
    }

    return createdSuggestions;
  }

  /**
   * Auto-generate content block drafts based on AI suggestions
   */
  private async autoGenerateContentBlocks(pageId: string, suggestions: any[]): Promise<void> {
    const blockTypes: Record<string, string> = {
      'faq_block': 'faq',
      'content_expansion': 'insight',
      'new_section': 'insight',
      'internal_linking': 'related_links',
    };

    for (const suggestion of suggestions) {
      const blockType = blockTypes[suggestion.type];
      if (!blockType) continue;

      // Only auto-generate for high-impact suggestions
      if (suggestion.impactScore < 40) continue;

      try {
        const hook = suggestion.insertAfter
          ? `after_h2:${suggestion.insertAfter.toLowerCase().replace(/\s+/g, '-')}`
          : 'inline';

        const htmlContent = await this.generateContentBlock(
          pageId,
          blockType,
          hook,
          suggestion.rationale
        );

        if (htmlContent) {
          await storage.createAiContentBlock({
            pageId,
            hook,
            blockType,
            htmlContent,
            focusKeyword: suggestion.keywords?.[0] || null,
            secondaryKeywords: suggestion.keywords?.slice(1) || [],
            priority: Math.ceil((100 - suggestion.impactScore) / 20),
            status: 'draft',
            generatedAt: new Date(),
          });
          console.log(`[SEO Brain] Auto-generated ${blockType} block draft for page ${pageId}`);
        }
      } catch (error) {
        console.error(`[SEO Brain] Failed to auto-generate block for suggestion:`, error);
      }
    }
  }

  async syncSearchConsoleMetrics(): Promise<number> {
    const isConfigured = searchConsoleService.isConfigured();
    if (!isConfigured) {
      console.log("[SEO Brain] Search Console not configured, skipping metrics sync");
      return 0;
    }

    try {
      const topPages = await searchConsoleService.getTopPages(7, 100);
      const pages = await storage.getAllPages();
      let metricsUpdated = 0;

      const pagePathMap = new Map(pages.map(p => [p.path, p]));

      for (const row of topPages) {
        const pagePath = row.keys?.[0];
        if (!pagePath) continue;

        const urlPath = new URL(pagePath).pathname;
        const page = pagePathMap.get(urlPath);

        if (page) {
          const metrics: InsertPageSearchMetrics = {
            pageId: page.id,
            date: new Date(),
            impressions: row.impressions || 0,
            clicks: row.clicks || 0,
            avgPosition: Math.round((row.position || 0) * 10),
            ctr: Math.round((row.ctr || 0) * 10000),
            topQuery: undefined,
          };

          await storage.createPageSearchMetrics(metrics);
          metricsUpdated++;
        }
      }

      return metricsUpdated;
    } catch (error) {
      console.error("[SEO Brain] Error syncing metrics:", error);
      return 0;
    }
  }

  async runDailyOptimization(): Promise<DailySeoReport> {
    console.log("[SEO Brain] Starting daily optimization run...");

    const run = await storage.createSeoOptimizationRun({
      status: 'running',
      pagesAnalyzed: 0,
      suggestionsGenerated: 0,
      metricsUpdated: 0,
    });

    try {
      const metricsUpdated = await this.syncSearchConsoleMetrics();

      const pages = await storage.getAllPages();
      const opportunityScores: PageOpportunityScore[] = [];
      let totalSuggestions = 0;

      let totalImpressions = 0;
      let totalClicks = 0;
      let totalPosition = 0;
      let pagesWithMetrics = 0;

      for (const page of pages) {
        if (page.status !== 'published') continue;

        const score = await this.calculateOpportunityScore(page.id);
        if (score && score.opportunityScore > 20) {
          opportunityScores.push(score);
          // Removed blocking AI call here to prevent timeouts
          // We will generate suggestions only for top pages after sorting
        }

        const metrics = await storage.getLatestPageSearchMetrics(page.id);
        if (metrics) {
          totalImpressions += metrics.impressions || 0;
          totalClicks += metrics.clicks || 0;
          totalPosition += metrics.avgPosition || 0;
          pagesWithMetrics++;
        }
      }

      opportunityScores.sort((a, b) => b.opportunityScore - a.opportunityScore);
      const topOpportunityPages = opportunityScores.slice(0, 10);

      // Generate AI suggestions only for top 3 pages to avoid timeout
      console.log(`[SEO Brain] Generating AI suggestions for top 3 pages...`);
      for (const opportunity of topOpportunityPages.slice(0, 3)) {
        try {
          const suggestions = await this.createSuggestionsForPage(opportunity.pageId);
          totalSuggestions += suggestions.length;
        } catch (e) {
          console.error(`[SEO Brain] Failed to generate suggestions for ${opportunity.pageId}`, e);
        }
      }

      const summary = {
        avgPosition: pagesWithMetrics > 0 ? Math.round(totalPosition / pagesWithMetrics) : 0,
        totalImpressions,
        totalClicks,
        avgCtr: totalImpressions > 0 ? Math.round((totalClicks / totalImpressions) * 10000) : 0,
        pagesNeedingAttention: opportunityScores.length,
      };

      const completedRun = await storage.completeSeoOptimizationRun(run.id, summary);

      await storage.updateSeoOptimizationRun(run.id, {
        pagesAnalyzed: pages.filter(p => p.status === 'published').length,
        suggestionsGenerated: totalSuggestions,
        metricsUpdated,
        topOpportunityPages: topOpportunityPages.map(p => ({
          pageId: p.pageId,
          title: p.pageTitle,
          opportunityScore: p.opportunityScore,
        })),
      });

      console.log(`[SEO Brain] Daily optimization complete. Pages: ${pages.length}, Suggestions: ${totalSuggestions}`);

      return {
        runId: run.id,
        runDate: run.runDate,
        pagesAnalyzed: pages.filter(p => p.status === 'published').length,
        suggestionsGenerated: totalSuggestions,
        metricsUpdated,
        topOpportunityPages,
        summary,
      };
    } catch (error: any) {
      console.error("[SEO Brain] Daily optimization failed:", error);
      await storage.failSeoOptimizationRun(run.id, error.message || 'Unknown error');
      throw error;
    }
  }

  async generateProposedPage(
    targetKeyword: string,
    options?: {
      clusterKey?: string;
      sourceDocIds?: string[];
    }
  ): Promise<InsertProposedPage | null> {
    const prompt = `Generate a comprehensive page blueprint for the target keyword:

TARGET KEYWORD: ${targetKeyword}
CLUSTER: ${options?.clusterKey || 'general'}

Create a detailed page outline that would rank well for this keyword. The content should be educational and authoritative about ionic minerals, structured water, and bioelectric health.

Provide the response as JSON with this structure:
{
  "proposedTitle": "Page title optimized for SEO",
  "proposedSlug": "url-friendly-slug",
  "outline": {
    "h1": "Main heading",
    "sections": [
      { "heading": "Section heading", "level": 2, "description": "What this section covers" }
    ]
  },
  "draftIntro": "Compelling introduction paragraph (2-3 sentences)",
  "draftSummary": "Summary of key takeaways",
  "focusKeyword": "${targetKeyword}",
  "secondaryKeywords": ["keyword1", "keyword2"],
  "proposedMetaTitle": "SEO-optimized meta title (60 chars max)",
  "proposedMetaDescription": "Compelling meta description (160 chars max)",
  "suggestedContentBlocks": [
    { "blockType": "faq", "hook": "after_h2:section-name", "content": "FAQ content" }
  ],
  "searchVolume": estimated monthly searches (number),
  "difficulty": 1-100 difficulty score (number),
  "semanticScore": 1-100 semantic relevance to site (number),
  "opportunityScore": 1-100 overall opportunity (number)
}`;

    try {
      const response = await chatWithFunctions([
        { role: 'user', content: prompt }
      ]);

      if (response.response) {
        const jsonMatch = response.response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const data = JSON.parse(jsonMatch[0]);

          return {
            targetKeyword,
            searchVolume: data.searchVolume || 0,
            difficulty: data.difficulty || 50,
            proposedTitle: data.proposedTitle,
            proposedSlug: data.proposedSlug,
            clusterKey: options?.clusterKey,
            outline: data.outline,
            draftIntro: data.draftIntro,
            draftSummary: data.draftSummary,
            focusKeyword: data.focusKeyword,
            secondaryKeywords: data.secondaryKeywords || [],
            proposedMetaTitle: data.proposedMetaTitle,
            proposedMetaDescription: data.proposedMetaDescription,
            suggestedContentBlocks: data.suggestedContentBlocks || [],
            sourceDocIds: options?.sourceDocIds || [],
            semanticScore: data.semanticScore || 0,
            opportunityScore: data.opportunityScore || 0,
          };
        }
      }
    } catch (error) {
      console.error("[SEO Brain] Error generating proposed page:", error);
    }

    return null;
  }

  async generateContentBlock(
    pageId: string,
    blockType: string,
    hook: string,
    context?: string
  ): Promise<string | null> {
    const page = await storage.getPage(pageId);
    if (!page) return null;

    const pageSeo = await storage.getPageSeo(pageId);

    const prompt = `Generate a dynamic SEO content block for this page:

PAGE: ${page.title}
BLOCK TYPE: ${blockType}
HOOK POSITION: ${hook}
FOCUS KEYWORD: ${pageSeo?.focusKeyword || 'ionic minerals'}

${context ? `CONTEXT:\n${context}` : ''}

Generate HTML content for a ${blockType} block that:
1. Is relevant to the page topic
2. Targets the focus keyword naturally
3. Provides value to readers
4. Is styled using Andara CSS classes (glass-card, glow-border, text-gradient, etc.)
5. Is concise but informative (100-300 words)

For FAQ blocks, include 2-3 relevant questions and answers.
For insight blocks, provide a valuable tip or fact.
For related_links blocks, suggest 3 internal links with anchor text.
For stat_highlight blocks, present key statistics with context.

Return only the HTML content, no markdown wrapping.`;

    try {
      const response = await chatWithFunctions([
        { role: 'user', content: prompt }
      ]);

      if (response.response) {
        const htmlMatch = response.response.match(/<[^>]+>[\s\S]*<\/[^>]+>/);
        if (htmlMatch) {
          return htmlMatch[0];
        }
        return response.response.replace(/```html?\n?/g, '').replace(/```/g, '').trim();
      }
    } catch (error) {
      console.error("[SEO Brain] Error generating content block:", error);
    }

    return null;
  }

  async getTodaysActions(limit: number = 10): Promise<{
    suggestions: any[];
    proposedPages: any[];
    topOpportunities: PageOpportunityScore[];
  }> {
    const [suggestions, proposedPages, pages] = await Promise.all([
      storage.getPendingPageAiSuggestions({ limit }),
      storage.getProposedPagesByStatus('proposed'),
      storage.getAllPages(),
    ]);

    const opportunities: PageOpportunityScore[] = [];
    for (const page of pages.filter(p => p.status === 'published').slice(0, 20)) {
      const score = await this.calculateOpportunityScore(page.id);
      if (score && score.opportunityScore > 15) {
        opportunities.push(score);
      }
    }

    opportunities.sort((a, b) => b.opportunityScore - a.opportunityScore);

    return {
      suggestions,
      proposedPages: proposedPages.slice(0, 5),
      topOpportunities: opportunities.slice(0, 5),
    };
  }
}

export const seoBrainService = new SeoBrainService();
