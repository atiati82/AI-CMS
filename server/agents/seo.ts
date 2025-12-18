import { Agent, AgentTask, AgentResult, createSuccessResult, createErrorResult } from './base';
import { seoAgentBriefing } from './briefings';
import { getAiClient } from '../services/andara-chat';
import { db } from '../db';
import { pages, pageMetrics } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';
import { generateDailyRecommendations } from '../services/recommendation-engine.service';
import { analyzePageContent } from '../services/content-analyzer.service';
import { calculatePriorityScore } from '../services/scoring-engine.service';

/**
 * SEO AGENT - WITH AI INTEGRATION
 * 
 * Uses official briefing and 100-point CO scoring system.
 * Provides AI-powered keyword suggestions, content optimization,
 * and daily strategic recommendations.
 */
export const seoAgent: Agent = {
    name: seoAgentBriefing.name,
    description: seoAgentBriefing.role,
    capabilities: [
        ...seoAgentBriefing.capabilities,
        'generate_daily_brief',
        'generate_patch',
        'analyze_content_gaps',
        'suggest_internal_links',
        'generate_faq_block',
        'generate_proof_block'
    ],
    icon: seoAgentBriefing.icon,
    role: seoAgentBriefing.role,
    rules: seoAgentBriefing.rules,

    async execute(task: AgentTask): Promise<AgentResult> {
        try {
            switch (task.type) {
                // Legacy / Core Tasks
                case 'calculate_seo_score':
                    return await calculateQualityScore(task.input);
                case 'suggest_keywords':
                    return await suggestKeywords(task.input);
                case 'find_seo_issues':
                    return await findSeoIssues(task.input);
                case 'optimize_page':
                    return await optimizePage(task.input);
                case 'analyze_cluster':
                    return await analyzeCluster(task.input);
                case 'daily_co_report':
                    return await dailyCOReport(task.input);

                // New Capabilities
                case 'generate_daily_brief':
                    return await generateDailyBrief(task.input);
                case 'generate_patch':
                    return await generatePatch(task.input);
                case 'analyze_content_gaps':
                    return await performContentGapAnalysis(task.input);
                case 'suggest_internal_links':
                    return await suggestInternalLinks(task.input);
                case 'generate_faq_block':
                    return await generateFaqBlock(task.input);

                    // ... (in the functions section)

                    async function suggestInternalLinks(input: any): Promise<AgentResult> {
                        const { pageId } = input;
                        const [targetPage] = await db.select().from(pages).where(eq(pages.id, pageId));

                        if (!targetPage) return createErrorResult('Page not found');

                        // Find potential link partners in same cluster
                        const clusterPeers = await db.select().from(pages)
                            .where(eq(pages.clusterKey, targetPage.clusterKey || ''));

                        const opportunities = clusterPeers
                            .filter(p => p.id !== pageId && p.status === 'published')
                            .map(p => ({
                                pageId: p.id,
                                title: p.title,
                                path: p.path,
                                relation: 'Same Cluster',
                                relevance: 10 // Simple score for cluster peers
                            }))
                            .slice(0, 10);

                        return createSuccessResult({
                            targetPage: { title: targetPage.title, path: targetPage.path },
                            opportunities,
                            message: `Found ${opportunities.length} internal linking opportunities in the "${targetPage.clusterKey}" cluster.`
                        });
                    }

                case 'generate_proof_block':
                    return await generateProofBlock(task.input);

                default:
                    return createErrorResult(`Unknown task type: ${task.type}`);
            }
        } catch (error: any) {
            return createErrorResult(error.message || 'SEO agent failed');
        }
    }
};

// --- New Capabilities ---

async function generateDailyBrief(input: any): Promise<AgentResult> {
    const count = input.count || 3;
    const recommendations = await generateDailyRecommendations(count);

    return createSuccessResult({
        date: new Date().toISOString(),
        recommendations,
        message: `Generated ${recommendations.length} recommendations for today based on priority scoring.`
    });
}

async function performContentGapAnalysis(input: any): Promise<AgentResult> {
    const { pageId } = input;
    if (!pageId) return createErrorResult('Page ID required');

    const analysis = await analyzePageContent(pageId);
    const score = await calculatePriorityScore(pageId);

    return createSuccessResult({
        pageId,
        priorityScore: score,
        ...analysis,
        message: 'Content gap analysis complete.'
    });
}

async function generatePatch(input: any): Promise<AgentResult> {
    const { pageId, instructions } = input;
    const [page] = await db.select().from(pages).where(eq(pages.id, pageId));
    if (!page) return createErrorResult('Page not found');

    const { client, model } = await getAiClient();
    const prompt = `
        You are an expert SEO Content Developer.
        Task: Create a content patch for the page "${page.title}" (Path: ${page.path}).
        Current Content Context: ${(page.content || '').substring(0, 1000)}...
        
        Instructions: ${instructions}
        
        Return ONLY the new HTML/Markdown content snippet to be inserted. Do not include explanation.
    `;

    const response = await client.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    return createSuccessResult({
        patch: response.text,
        target: page.path
    }, { model });
}

async function generateFaqBlock(input: any): Promise<AgentResult> {
    const { pageId, topic } = input;
    const [page] = await db.select().from(pages).where(eq(pages.id, pageId));

    const { client, model } = await getAiClient();
    const prompt = `
        Generate an FAQ HTML block for "${page ? page.title : topic}".
        Focus on "People Also Ask" questions related to: ${topic || page?.seoFocus || 'main topic'}.
        
        Format:
        <div class="faq-block">
          <h3>Frequently Asked Questions</h3>
          <div class="faq-item">
            <h4 class="faq-question">Question?</h4>
            <p class="faq-answer">Answer...</p>
          </div>
          ...
        </div>
    `;

    const response = await client.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    return createSuccessResult({
        html: response.text,
        type: 'faq'
    }, { model });
}

async function generateProofBlock(input: any): Promise<AgentResult> {
    const { claim, evidenceType = 'scientific' } = input;

    const { client, model } = await getAiClient();
    const prompt = `
        Generate a "Proof Box" HTML component to substantiate the claim: "${claim}".
        Evidence Type: ${evidenceType}
        
        Style: Professional, credible, cited if possible (use placeholders if real citations unknown).
        
        Format:
        <div class="proof-box type-${evidenceType}">
           ...content...
        </div>
    `;

    const response = await client.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    return createSuccessResult({
        html: response.text,
        type: 'proof'
    }, { model });
}

// --- Legacy / Core Logic (Preserved) ---

// 100-Point CO Scoring System (Renamed to Quality Score to distinguish from Priority Score)
async function calculateQualityScore(input: any): Promise<AgentResult> {
    const { pageId } = input;

    const [page] = await db.select().from(pages).where(eq(pages.id, pageId));
    if (!page) {
        return createErrorResult('Page not found');
    }

    const breakdown: Record<string, { score: number; max: number; details: string }> = {};
    let totalScore = 0;

    // 1. Content Depth (25 pts)
    const contentLength = (page.content || '').length;
    if (contentLength >= 2000) {
        breakdown.contentDepth = { score: 25, max: 25, details: `${contentLength} chars - Excellent depth` };
        totalScore += 25;
    } else if (contentLength >= 1000) {
        breakdown.contentDepth = { score: 18, max: 25, details: `${contentLength} chars - Good depth` };
        totalScore += 18;
    } else if (contentLength >= 500) {
        breakdown.contentDepth = { score: 10, max: 25, details: `${contentLength} chars - Minimal content` };
        totalScore += 10;
    } else {
        breakdown.contentDepth = { score: 0, max: 25, details: `${contentLength} chars - Thin content` };
        totalScore += 0;
    }

    // 2. Semantic Coverage (20 pts)
    const hasSeoFocus = !!page.seoFocus;
    const seoKeywords = (page as any).seoKeywords || [];
    if (hasSeoFocus && seoKeywords.length >= 5) {
        breakdown.semanticCoverage = { score: 20, max: 20, details: 'Focus keyword + 5+ secondary keywords' };
        totalScore += 20;
    } else if (hasSeoFocus) {
        breakdown.semanticCoverage = { score: 12, max: 20, details: 'Focus keyword set, needs more secondary' };
        totalScore += 12;
    } else {
        breakdown.semanticCoverage = { score: 0, max: 20, details: 'Missing focus keyword' };
        totalScore += 0;
    }

    // 3. Structure (15 pts) - Check for headings in content
    const content = page.content || '';
    const h1Count = (content.match(/<h1|^#\s/gm) || []).length;
    const h2Count = (content.match(/<h2|^##\s/gm) || []).length;
    if (h1Count === 1 && h2Count >= 2) {
        breakdown.structure = { score: 15, max: 15, details: 'Proper heading hierarchy' };
        totalScore += 15;
    } else if (h1Count > 0 || h2Count > 0) {
        breakdown.structure = { score: 8, max: 15, details: 'Partial heading structure' };
        totalScore += 8;
    } else {
        breakdown.structure = { score: 0, max: 15, details: 'No heading structure detected' };
        totalScore += 0;
    }

    // 4. Internal Links (15 pts)
    const linkCount = (page.internalLinks || []).length;
    if (linkCount >= 5) {
        breakdown.internalLinks = { score: 15, max: 15, details: `${linkCount} internal links - Excellent` };
        totalScore += 15;
    } else if (linkCount >= 3) {
        breakdown.internalLinks = { score: 10, max: 15, details: `${linkCount} internal links - Good` };
        totalScore += 10;
    } else if (linkCount > 0) {
        breakdown.internalLinks = { score: 5, max: 15, details: `${linkCount} internal links - Needs more` };
        totalScore += 5;
    } else {
        breakdown.internalLinks = { score: 0, max: 15, details: 'No internal links' };
        totalScore += 0;
    }

    // 5. Media Completeness (10 pts)
    const hasFeaturedImage = !!page.featuredImage;
    if (hasFeaturedImage) {
        breakdown.media = { score: 10, max: 10, details: 'Featured image present' };
        totalScore += 10;
    } else {
        breakdown.media = { score: 0, max: 10, details: 'Missing featured image' };
        totalScore += 0;
    }

    // 6. Metadata & Schema (15 pts)
    const seoTitle = page.seoTitle || '';
    const seoDesc = page.seoDescription || '';
    const titleOk = seoTitle.length >= 50 && seoTitle.length <= 60;
    const descOk = seoDesc.length >= 150 && seoDesc.length <= 160;

    if (titleOk && descOk) {
        breakdown.metadata = { score: 15, max: 15, details: 'Perfect title and description length' };
        totalScore += 15;
    } else if (seoTitle && seoDesc) {
        breakdown.metadata = { score: 10, max: 15, details: 'Metadata present but not optimal length' };
        totalScore += 10;
    } else if (seoTitle || seoDesc) {
        breakdown.metadata = { score: 5, max: 15, details: 'Partial metadata' };
        totalScore += 5;
    } else {
        breakdown.metadata = { score: 0, max: 15, details: 'Missing SEO metadata' };
        totalScore += 0;
    }

    // Determine grade
    let grade = 'F';
    if (totalScore >= 90) grade = 'A';
    else if (totalScore >= 80) grade = 'B';
    else if (totalScore >= 70) grade = 'C';
    else if (totalScore >= 60) grade = 'D';

    return createSuccessResult({
        pageId,
        pagePath: page.path,
        pageTitle: page.title,
        overall: totalScore,
        grade,
        breakdown
    });
}

// AI-powered keyword suggestions
async function suggestKeywords(input: any): Promise<AgentResult> {
    const { topic, intent = 'informational', existingContent } = input;

    const prompt = `${seoAgentBriefing.systemPrompt}

---

Suggest SEO keywords for this topic: "${topic}"
Search Intent: ${intent}
${existingContent ? `\nExisting Content:\n${existingContent.substring(0, 500)}...` : ''}

Focus on:
- Andara Ionic brand clusters (mineral science, water science, bioelectricity)
- Long-tail keywords (3-5 words)
- Low competition wellness/science terms

Return JSON:
{
  "primary": "main keyword phrase",
  "secondary": ["keyword1", "keyword2", "keyword3"],
  "longTail": ["long tail phrase 1", "long tail phrase 2", "long tail phrase 3"],
  "intent": "informational|commercial|navigational",
  "difficulty": "low|medium|high",
  "clusters": ["mineral_science", "water_science"],
  "rationale": "brief explanation"
}`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const responseText = response.text?.trim() || '{}';
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const keywords = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

        return createSuccessResult({ topic, ...keywords }, { model });
    } catch (error: any) {
        // Fallback to template-based suggestions
        const keywords = {
            primary: topic,
            secondary: [`${topic} benefits`, `${topic} science`, `best ${topic}`],
            longTail: [`how does ${topic} work`, `${topic} for health`],
            fallback: true
        };
        return createSuccessResult({ topic, ...keywords });
    }
}

// Find SEO issues on a page
async function findSeoIssues(input: any): Promise<AgentResult> {
    const { pageId } = input;

    const [page] = await db.select().from(pages).where(eq(pages.id, pageId));
    if (!page) {
        return createErrorResult('Page not found');
    }

    const issues: Array<{ type: string; severity: 'critical' | 'warning' | 'info'; message: string; impact: string }> = [];

    // Critical issues
    if (!page.seoTitle) {
        issues.push({ type: 'title_missing', severity: 'critical', message: 'SEO title is missing', impact: 'Major negative impact on rankings' });
    } else if (page.seoTitle.length < 50) {
        issues.push({ type: 'title_short', severity: 'warning', message: 'SEO title is too short', impact: 'Missing keyword opportunity' });
    } else if (page.seoTitle.length > 60) {
        issues.push({ type: 'title_long', severity: 'warning', message: 'SEO title exceeds 60 chars', impact: 'Will be truncated in search results' });
    }

    if (!page.seoDescription) {
        issues.push({ type: 'description_missing', severity: 'critical', message: 'Meta description is missing', impact: 'Search engines will auto-generate' });
    }

    if (!page.content || page.content.length < 300) {
        issues.push({ type: 'content_thin', severity: 'critical', message: 'Content is too thin', impact: 'May be flagged as low-quality' });
    }

    if (!page.seoFocus) {
        issues.push({ type: 'focus_missing', severity: 'warning', message: 'Focus keyword not set', impact: 'Unclear optimization target' });
    }

    if (!page.featuredImage) {
        issues.push({ type: 'image_missing', severity: 'warning', message: 'No featured image', impact: 'Missing visual engagement' });
    }

    const linkCount = (page.internalLinks || []).length;
    if (linkCount === 0) {
        issues.push({ type: 'no_internal_links', severity: 'warning', message: 'No internal links', impact: 'Poor cluster connectivity' });
    }

    // URL / Slug Checks
    const slug = page.path.split('/').filter(Boolean).pop() || '';
    if (page.path.split('/').filter(Boolean).length > 3) {
        issues.push({ type: 'url_depth', severity: 'info', message: 'URL is very deep (>3 levels)', impact: 'May dilute authority' });
    }
    if (/[A-Z]/.test(page.path)) {
        issues.push({ type: 'url_case', severity: 'warning', message: 'URL contains uppercase letters', impact: 'Duplicate content risk' });
    }
    if (/[_ ]/.test(page.path)) {
        issues.push({ type: 'url_chars', severity: 'warning', message: 'URL contains underscores or spaces', impact: 'Use hyphens instead' });
    }
    if (page.seoFocus && !slug.toLowerCase().includes(page.seoFocus.toLowerCase().replace(/ /g, '-'))) {
        issues.push({ type: 'url_keyword', severity: 'info', message: 'URL does not contain focus keyword', impact: 'Missed keyword signal' });
    }

    return createSuccessResult({
        pageId,
        pagePath: page.path,
        pageTitle: page.title,
        issueCount: issues.length,
        criticalCount: issues.filter(i => i.severity === 'critical').length,
        issues
    });
}

// Optimize page metadata
async function optimizePage(input: any): Promise<AgentResult> {
    const { pageId } = input;

    const [page] = await db.select().from(pages).where(eq(pages.id, pageId));
    if (!page) {
        return createErrorResult('Page not found');
    }

    const prompt = `${seoAgentBriefing.systemPrompt}

---

Optimize SEO metadata for this page:

Title: ${page.title}
Current SEO Title: ${page.seoTitle || 'Not set'}
Current Description: ${page.seoDescription || 'Not set'}
Current URL Path: ${page.path}
Content Preview: ${(page.content || '').substring(0, 500)}

Generate optimized metadata:
{
  "seoTitle": "50-60 chars, keyword-rich, compelling",
  "seoDescription": "150-160 chars, includes CTA, compelling",
  "suggestedPath": "short, lowercase, hyphenated, keyword-rich (only if current is poor)",
  "focusKeyword": "primary keyword phrase",
  "secondaryKeywords": ["kw1", "kw2", "kw3"],
  "improvements": ["what was improved 1", "what was improved 2"]
}`;

    try {
        const { client, model } = await getAiClient();
        const response = await client.models.generateContent({
            model,
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const responseText = response.text?.trim() || '{}';
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const optimizations = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

        return createSuccessResult({
            pageId,
            pagePath: page.path,
            pageTitle: page.title,
            current: {
                seoTitle: page.seoTitle,
                seoDescription: page.seoDescription,
                seoFocus: page.seoFocus
            },
            suggested: optimizations,
            note: 'Review and apply via admin panel - changes not auto-applied'
        }, { model });
    } catch (error: any) {
        return createErrorResult(`Optimization failed: ${error.message}`);
    }
}

// Analyze cluster coverage
async function analyzeCluster(input: any): Promise<AgentResult> {
    const { cluster } = input;

    const allPages = await db.select().from(pages);
    const clusterPages = allPages.filter(p => p.clusterKey === cluster);

    const analysis = {
        cluster,
        totalPages: clusterPages.length,
        publishedPages: clusterPages.filter(p => p.status === 'published').length,
        draftPages: clusterPages.filter(p => p.status === 'draft').length,
        avgContentLength: Math.round(
            clusterPages.reduce((sum, p) => sum + (p.content || '').length, 0) / (clusterPages.length || 1)
        ),
        pagesWithSeoTitle: clusterPages.filter(p => p.seoTitle).length,
        pagesWithFocusKeyword: clusterPages.filter(p => p.seoFocus).length,
        recommendations: [] as string[]
    };

    // Generate recommendations
    if (analysis.totalPages < 5) {
        analysis.recommendations.push(`Cluster needs more pages (currently ${analysis.totalPages}, recommend 5+)`);
    }
    if (analysis.avgContentLength < 1000) {
        analysis.recommendations.push(`Average content is thin (${analysis.avgContentLength} chars), aim for 1500+`);
    }
    if (analysis.pagesWithSeoTitle < analysis.totalPages) {
        analysis.recommendations.push(`${analysis.totalPages - analysis.pagesWithSeoTitle} pages missing SEO titles`);
    }

    return createSuccessResult(analysis);
}

// Daily CO report
async function dailyCOReport(input: any): Promise<AgentResult> {
    const { limit = 10 } = input;

    const allPages = await db.select().from(pages);

    // Calculate scores for all pages
    const pageScores = await Promise.all(
        allPages.slice(0, limit).map(async (page) => {
            const result = await calculateQualityScore({ pageId: page.id });
            if (result.success) {
                return {
                    pageId: page.id,
                    path: page.path,
                    title: page.title,
                    score: result.output.overall,
                    grade: result.output.grade
                };
            }
            return null;
        })
    );

    const validScores = pageScores.filter(Boolean) as any[];
    validScores.sort((a, b) => a.score - b.score);

    return createSuccessResult({
        reportDate: new Date().toISOString(),
        totalPagesAnalyzed: validScores.length,
        averageScore: Math.round(validScores.reduce((sum, p) => sum + p.score, 0) / validScores.length),
        lowestScoring: validScores.slice(0, 5),
        highestScoring: validScores.slice(-5).reverse(),
        recommendations: [
            'Focus on pages scoring below 60',
            'Add missing SEO metadata',
            'Improve internal linking between clusters'
        ]
    });
}
