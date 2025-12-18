/**
 * Content Analyzer Service
 * Analyzes page content to detect gaps and opportunities
 */

import { db } from '../db';
import { pages, pageMetrics } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { getMinWordCount } from '../config/seo-scoring';

export interface ContentAnalysis {
    pageId: string;
    hasH1: boolean;
    h2Count: number;
    h3Count: number;
    wordCount: number;
    hasFaqBlock: boolean;
    hasProofBlock: boolean;
    hasGlossary: boolean;
    hasSchema: boolean;
    internalLinksOut: number;
    gaps: ContentGap[];
    recommendations: string[];
}

export interface ContentGap {
    type: 'missing_h1' | 'few_h2' | 'missing_faq' | 'missing_proof' | 'thin_content' | 'low_links' | 'no_schema' | 'missing_glossary';
    severity: 'critical' | 'warning' | 'info';
    message: string;
    impact: number; // 0-10
}

/**
 * Analyze page content for gaps and opportunities
 */
export async function analyzePageContent(pageId: string): Promise<ContentAnalysis> {
    const [page] = await db.select().from(pages).where(eq(pages.id, pageId));

    if (!page) {
        throw new Error(`Page not found: ${pageId}`);
    }

    const content = page.content || '';
    const aiStartupHtml = page.aiStartupHtml || '';
    const fullContent = content + ' ' + aiStartupHtml;

    // Extract structure
    const hasH1 = detectH1(fullContent);
    const h2Count = countHeadings(fullContent, 'h2');
    const h3Count = countHeadings(fullContent, 'h3');
    const wordCount = calculateWordCount(fullContent);

    // Detect components
    const hasFaqBlock = detectFaqBlock(fullContent) || (page.componentBlocks || []).includes('faq');
    const hasProofBlock = detectProofBlock(fullContent) || (page.componentBlocks || []).includes('proof');
    const hasGlossary = detectGlossary(fullContent);
    const hasSchema = !!page.schemaType;

    // Count links
    const internalLinksOut = countInternalLinks(fullContent, page.internalLinks || []);

    // Detect gaps
    const gaps = detectGaps({
        hasH1,
        h2Count,
        wordCount,
        hasFaqBlock,
        hasProofBlock,
        hasSchema,
        internalLinksOut,
        hasGlossary,
        pageType: page.pageType,
        template: page.template
    });

    // Generate recommendations
    const recommendations = generateRecommendations(gaps);

    // Update metrics
    await updateMetrics(pageId, {
        hasH1,
        h2Count,
        wordCount,
        hasFaqBlock,
        hasProofBlock,
        hasGlossary,
        hasSchema,
        internalLinksOut
    });

    return {
        pageId,
        hasH1,
        h2Count,
        h3Count,
        wordCount,
        hasFaqBlock,
        hasProofBlock,
        hasGlossary,
        hasSchema,
        internalLinksOut,
        gaps,
        recommendations
    };
}

/**
 * Detect H1 heading
 */
function detectH1(content: string): boolean {
    return /<h1[^>]*>/.test(content) || /^#\s/.test(content);
}

/**
 * Count headings of a specific level
 */
function countHeadings(content: string, level: 'h2' | 'h3'): number {
    const htmlRegex = new RegExp(`<${level}[^>]*>`, 'g');
    const mdRegex = level === 'h2' ? /^##\s/gm : /^###\s/gm;

    const htmlMatches = content.match(htmlRegex) || [];
    const mdMatches = content.match(mdRegex) || [];

    return htmlMatches.length + mdMatches.length;
}

/**
 * Calculate word count
 */
function calculateWordCount(content: string): number {
    // Strip HTML tags
    const text = content.replace(/<[^>]+>/g, ' ');
    // Count words
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    return words.length;
}

/**
 * Detect FAQ block
 */
function detectFaqBlock(content: string): boolean {
    return /class="faq|<details|<dl|itemtype=".*FAQPage"/i.test(content);
}

/**
 * Detect proof/protocol block
 */
function detectProofBlock(content: string): boolean {
    return /class="proof|protocol|measurement|test-result/i.test(content) ||
        /activation range|measurement protocol|lab test/i.test(content);
}

/**
 * Detect glossary
 */
function detectGlossary(content: string): boolean {
    return /class="glossary|<dfn|<abbr/i.test(content);
}

/**
 * Count internal links
 */
function countInternalLinks(content: string, internalLinksArray: string[]): number {
    const linkMatches = content.match(/href="\/[^"]*"/g) || [];
    return Math.max(linkMatches.length, internalLinksArray.length);
}

/**
 * Detect content gaps
 */
function detectGaps(data: {
    hasH1: boolean;
    h2Count: number;
    wordCount: number;
    hasFaqBlock: boolean;
    hasProofBlock: boolean;
    hasSchema: boolean;
    internalLinksOut: number;
    hasGlossary: boolean;
    pageType: string;
    template: string;
}): ContentGap[] {
    const gaps: ContentGap[] = [];
    const minWords = getMinWordCount(data.template !== 'article' ? data.template : data.pageType);

    if (!data.hasH1) {
        gaps.push({
            type: 'missing_h1',
            severity: 'critical',
            message: 'Page is missing an H1 heading',
            impact: 9
        });
    }

    if (data.h2Count < 3) {
        gaps.push({
            type: 'few_h2',
            severity: 'warning',
            message: `Page has only ${data.h2Count} H2 headings (recommended: 3+)`,
            impact: 3
        });
    }

    if (data.wordCount < minWords) {
        gaps.push({
            type: 'thin_content',
            severity: 'warning',
            message: `Content is thin (${data.wordCount} words, recommended: ${minWords}+)`,
            impact: 6
        });
    }

    if (!data.hasFaqBlock && ['product', 'hub', 'pillar_overview', 'guide'].includes(data.template)) {
        gaps.push({
            type: 'missing_faq',
            severity: 'warning',
            message: 'Page would benefit from an FAQ section',
            impact: 5
        });
    }

    if (!data.hasProofBlock && ['product', 'calculator', 'tool_calculator'].includes(data.template)) {
        gaps.push({
            type: 'missing_proof',
            severity: 'warning',
            message: 'Page should include proof/measurement protocol',
            impact: 8
        });
    }

    if (!data.hasSchema) {
        gaps.push({
            type: 'no_schema',
            severity: 'info',
            message: 'Page is missing structured data (schema.org)',
            impact: 4
        });
    }

    if (data.internalLinksOut < 3) {
        gaps.push({
            type: 'low_links',
            severity: 'warning',
            message: `Page has only ${data.internalLinksOut} internal links (recommended: 6+)`,
            impact: 7
        });
    }

    if (!data.hasGlossary && data.wordCount > 600) {
        gaps.push({
            type: 'missing_glossary',
            severity: 'info',
            message: 'Page could benefit from glossary definitions',
            impact: 2
        });
    }

    return gaps.sort((a, b) => b.impact - a.impact);
}

/**
 * Generate recommendations from gaps
 */
function generateRecommendations(gaps: ContentGap[]): string[] {
    const recommendations: string[] = [];

    for (const gap of gaps) {
        switch (gap.type) {
            case 'missing_h1':
                recommendations.push('Add a clear H1 heading that includes the primary keyword');
                break;
            case 'few_h2':
                recommendations.push('Add more H2 subheadings to improve content structure');
                break;
            case 'thin_content':
                recommendations.push('Expand content with more detailed information and examples');
                break;
            case 'missing_faq':
                recommendations.push('Add an FAQ section to answer common questions');
                break;
            case 'missing_proof':
                recommendations.push('Add measurement protocol or test results to build trust');
                break;
            case 'no_schema':
                recommendations.push('Add structured data (schema.org) for better search visibility');
                break;
            case 'low_links':
                recommendations.push('Add internal links to related pages and resources');
                break;
            case 'missing_glossary':
                recommendations.push('Define technical terms with glossary tooltips');
                break;
        }
    }

    return recommendations;
}

/**
 * Update page metrics
 */
async function updateMetrics(pageId: string, data: {
    hasH1: boolean;
    h2Count: number;
    wordCount: number;
    hasFaqBlock: boolean;
    hasProofBlock: boolean;
    hasGlossary: boolean;
    hasSchema: boolean;
    internalLinksOut: number;
}): Promise<void> {
    const [existing] = await db.select().from(pageMetrics).where(eq(pageMetrics.pageId, pageId));

    if (existing) {
        await db.update(pageMetrics)
            .set({
                hasH1: data.hasH1,
                h2Count: data.h2Count,
                wordCount: data.wordCount,
                hasFaqBlock: data.hasFaqBlock,
                hasProofBlock: data.hasProofBlock,
                hasGlossary: data.hasGlossary,
                hasSchema: data.hasSchema,
                internalLinksOut: data.internalLinksOut,
                calculatedAt: new Date()
            })
            .where(eq(pageMetrics.pageId, pageId));
    } else {
        await db.insert(pageMetrics).values({
            pageId,
            ...data,
            calculatedAt: new Date()
        });
    }
}

/**
 * Analyze all pages
 */
export async function analyzeAllPages(): Promise<ContentAnalysis[]> {
    const allPages = await db.select({ id: pages.id }).from(pages);

    const analyses: ContentAnalysis[] = [];
    for (const page of allPages) {
        try {
            const analysis = await analyzePageContent(page.id);
            analyses.push(analysis);
        } catch (error) {
            console.error(`Failed to analyze page ${page.id}:`, error);
        }
    }

    return analyses;
}
