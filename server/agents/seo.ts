import { Agent, AgentTask, AgentResult, createSuccessResult, createErrorResult } from './base';
import { db } from '../db';
import { pages } from '@shared/schema';
import { eq } from 'drizzle-orm';

// SEO Agent - Handles SEO analysis, scoring, and optimization
export const seoAgent: Agent = {
    name: 'seo',
    description: 'SEO analysis and optimization agent',
    capabilities: ['calculate_seo_score', 'optimize_page', 'find_seo_issues', 'suggest_keywords'],

    async execute(task: AgentTask): Promise<AgentResult> {
        try {
            switch (task.type) {
                case 'calculate_seo_score':
                    return await calculateSeoScore(task.input);

                case 'optimize_page':
                    return await optimizePage(task.input);

                case 'find_seo_issues':
                    return await findSeoIssues(task.input);

                case 'suggest_keywords':
                    return await suggestKeywords(task.input);

                default:
                    return createErrorResult(`Unknown task type: ${task.type}`);
            }
        } catch (error: any) {
            return createErrorResult(error.message || 'SEO agent failed');
        }
    }
};

// Task handlers
async function calculateSeoScore(input: any): Promise<AgentResult> {
    const { pageId } = input;

    const [page] = await db.select().from(pages).where(eq(pages.id, pageId));
    if (!page) {
        return createErrorResult('Page not found');
    }

    let score = 0;
    const breakdown: Record<string, number> = {};

    // Title (20 points)
    if (page.seoTitle && page.seoTitle.length >= 50 && page.seoTitle.length <= 60) {
        breakdown.title = 20;
        score += 20;
    } else if (page.seoTitle) {
        breakdown.title = 10;
        score += 10;
    }

    // Description (20 points)
    if (page.seoDescription && page.seoDescription.length >= 150 && page.seoDescription.length <= 160) {
        breakdown.description = 20;
        score += 20;
    } else if (page.seoDescription) {
        breakdown.description = 10;
        score += 10;
    }

    // Content (25 points)
    if (page.content && page.content.length > 500) {
        breakdown.content = 25;
        score += 25;
    } else if (page.content) {
        breakdown.content = 10;
        score += 10;
    }

    // Images (15 points)
    if (page.featuredImage) {
        breakdown.images = 15;
        score += 15;
    }

    // Internal links (10 points)
    const linkCount = (page.internalLinks || []).length;
    if (linkCount >= 3) {
        breakdown.links = 10;
        score += 10;
    } else if (linkCount > 0) {
        breakdown.links = 5;
        score += 5;
    }

    // Technical (10 points)
    if (page.path) {
        breakdown.technical = 10;
        score += 10;
    }

    return createSuccessResult({ overall: score, breakdown });
}

async function optimizePage(input: any): Promise<AgentResult> {
    const { pageId } = input;

    const [page] = await db.select().from(pages).where(eq(pages.id, pageId));
    if (!page) {
        return createErrorResult('Page not found');
    }

    // Generate optimized SEO metadata
    const seoTitle = page.title.substring(0, 60);
    const seoDescription = page.summary ?
        page.summary.substring(0, 160) :
        `Learn about ${page.title}`;

    // Update page
    await db.update(pages)
        .set({ seoTitle, seoDescription })
        .where(eq(pages.id, pageId));

    return createSuccessResult({ seoTitle, seoDescription });
}

async function findSeoIssues(input: any): Promise<AgentResult> {
    const { pageId } = input;

    const [page] = await db.select().from(pages).where(eq(pages.id, pageId));
    if (!page) {
        return createErrorResult('Page not found');
    }

    const issues: any[] = [];

    if (!page.seoTitle) {
        issues.push({ type: 'title_missing', severity: 'critical', message: 'SEO title is missing' });
    } else if (page.seoTitle.length < 50) {
        issues.push({ type: 'title_length', severity: 'warning', message: 'SEO title is too short' });
    }

    if (!page.seoDescription) {
        issues.push({ type: 'description_missing', severity: 'critical', message: 'Meta description is missing' });
    }

    if (!page.content || page.content.length < 300) {
        issues.push({ type: 'content_thin', severity: 'warning', message: 'Content is too short' });
    }

    return createSuccessResult({ issues });
}

async function suggestKeywords(input: any): Promise<AgentResult> {
    const { topic } = input;

    // Simple keyword suggestion based on topic
    const keywords = [
        topic,
        `${topic} benefits`,
        `${topic} guide`,
        `best ${topic}`,
        `${topic} tips`
    ];

    return createSuccessResult({ keywords });
}
