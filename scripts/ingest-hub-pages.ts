#!/usr/bin/env npx tsx
/**
 * Hub Pages Ingestion Script
 * 
 * Reads JSON Block files from content/hubs/ and inserts them into the pages table.
 * 
 * Usage:
 *   npx tsx scripts/ingest-hub-pages.ts
 *   npx tsx scripts/ingest-hub-pages.ts --dry-run
 *   npx tsx scripts/ingest-hub-pages.ts --update
 */

import fs from 'fs';
import path from 'path';
import { storage } from '../server/storage';
import type { InsertPage, VisualConfig, AiEnrichment } from '@shared/schema';

interface HubJsonBlock {
    page: {
        key: string;
        title: string;
        path: string;
        pageType: string;
        template: string;
        clusterKey?: string;
        priority: number;
        zone?: string;
    };
    seo: {
        title: string;
        description: string;
        focusKeyword: string;
        secondaryKeywords?: string[];
        intent?: string[];
    };
    visualConfig: {
        priority: 'P1' | 'P2' | 'P3';
        vibeKeywords?: string[];
        emotionalTone?: string[];
        motionPreset?: string;
        colorPalette?: string;
        treeTheme?: string;
        requiredVisuals?: string[];
    };
    sections: Array<{
        id: string;
        type: string;
        html: string;
        motion?: {
            preset: string;
            stagger?: boolean | string;
            duration?: string;
        };
    }>;
    faq: {
        title: string;
        items: Array<{
            question: string;
            answer: string;
        }>;
    };
    jsonLd: Record<string, any>;
    dynamicBoxRules?: Record<string, any>;
    internalLinks: string[];
}

async function loadHubFiles(): Promise<{ filename: string; data: HubJsonBlock }[]> {
    const hubDir = path.join(process.cwd(), 'content', 'hubs');

    if (!fs.existsSync(hubDir)) {
        throw new Error(`Hub directory not found: ${hubDir}`);
    }

    const files = fs.readdirSync(hubDir).filter(f => f.endsWith('.json'));
    const hubs: { filename: string; data: HubJsonBlock }[] = [];

    for (const filename of files) {
        const filepath = path.join(hubDir, filename);
        const content = fs.readFileSync(filepath, 'utf-8');
        const data = JSON.parse(content) as HubJsonBlock;
        hubs.push({ filename, data });
    }

    return hubs;
}

function combineHtmlSections(sections: HubJsonBlock['sections']): string {
    return sections.map(s => s.html).join('\n\n');
}

function buildFaqHtml(faq: HubJsonBlock['faq'] | undefined): string {
    if (!faq || !faq.items || !faq.items.length) return '';

    const items = faq.items.map(item => `
    <div class="andara-faq__item">
      <h4 class="andara-faq__question">${item.question}</h4>
      <p class="andara-faq__answer">${item.answer}</p>
    </div>
  `).join('\n');

    return `
<section class="section" id="faq">
  <div class="container">
    <h2 class="h2">${faq.title || 'FAQ'}</h2>
    <div class="andara-faq">
      ${items}
    </div>
  </div>
</section>`;
}

function hubToInsertPage(hub: HubJsonBlock): InsertPage {
    const sectionsHtml = combineHtmlSections(hub.sections);
    const faqHtml = buildFaqHtml(hub.faq);
    const fullHtml = `<main class="andara-page andara-page--hub">\n${sectionsHtml}\n${faqHtml}\n</main>`;

    const visualConfig: VisualConfig = {
        priority: hub.visualConfig?.priority || 'P2',
        vibeKeywords: hub.visualConfig?.vibeKeywords || [],
        emotionalTone: hub.visualConfig?.emotionalTone || [],
        motionPreset: hub.visualConfig?.motionPreset || 'fadeInUp',
        colorPalette: hub.visualConfig?.colorPalette || 'mineral',
        designerNotes: hub.visualConfig?.treeTheme ? `Tree theme: ${hub.visualConfig.treeTheme}` : undefined,
    };

    const aiEnrichment: AiEnrichment = {
        extractedAt: new Date().toISOString(),
        imagePrompts: [],
        videoPrompts: [],
        layoutSpecs: hub.sections.map(s => ({
            section: s.id,
            spec: s.motion?.preset || 'fadeInUp',
        })),
        animationSpecs: hub.sections
            .filter(s => s.motion)
            .map(s => ({
                element: `#${s.id}`,
                spec: JSON.stringify(s.motion),
            })),
        motionSpecs: [],
        suggestedSeo: {
            title: hub.seo?.title || hub.page.title,
            description: hub.seo?.description || '',
            focusKeyword: hub.seo?.focusKeyword || '',
        },
        suggestedLinks: (hub.internalLinks || []).slice(0, 10).map(link => ({
            anchor: link.split('/').pop()?.replace(/-/g, ' ') || link,
            targetPath: link,
            reason: 'Hub navigation',
        })),
        components: hub.sections.map(s => s.type),
    };

    return {
        key: hub.page.key,
        title: hub.page.title,
        path: hub.page.path,
        pageType: hub.page.pageType,
        template: hub.page.template,
        clusterKey: hub.page.clusterKey,
        priority: hub.page.priority,
        summary: hub.seo.description,
        seoFocus: hub.seo.focusKeyword,
        seoTitle: hub.seo.title,
        seoDescription: hub.seo.description,
        status: 'draft',
        aiStartupHtml: fullHtml,
        visualConfig,
        aiEnrichment,
        internalLinks: hub.internalLinks,
        metadata: {
            zone: hub.page.zone,
            jsonLd: hub.jsonLd,
            dynamicBoxRules: hub.dynamicBoxRules,
            faq: hub.faq,
            secondaryKeywords: hub.seo.secondaryKeywords,
            intent: hub.seo.intent,
        },
    };
}

async function main() {
    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run');
    const forceUpdate = args.includes('--update');

    console.log('🚀 Hub Pages Ingestion Script');
    console.log('================================');

    if (dryRun) {
        console.log('📋 DRY RUN MODE - no changes will be made\n');
    }

    try {
        const hubs = await loadHubFiles();
        console.log(`📂 Found ${hubs.length} hub files:\n`);

        for (const { filename, data } of hubs) {
            console.log(`  • ${filename}`);
            console.log(`    Key: ${data.page.key}`);
            console.log(`    Path: ${data.page.path}`);
            console.log(`    Sections: ${data.sections.length}`);
            console.log(`    Links: ${data.internalLinks.length}`);
            console.log();
        }

        if (dryRun) {
            console.log('✅ Dry run complete. Use without --dry-run to insert pages.\n');
            return;
        }

        console.log('📝 Inserting pages...\n');

        for (const { filename, data } of hubs) {
            const pageData = hubToInsertPage(data);

            // Check if page already exists
            const existing = await storage.getPageByPath(data.page.path);

            if (existing) {
                if (forceUpdate) {
                    console.log(`  🔄 Updating: ${data.page.path}`);
                    await storage.updatePage(existing.id, pageData);
                } else {
                    console.log(`  ⏭️  Skipping (exists): ${data.page.path}`);
                    console.log(`      Use --update to overwrite`);
                }
            } else {
                console.log(`  ✨ Creating: ${data.page.path}`);
                await storage.createPage(pageData);
            }
        }

        console.log('\n✅ Ingestion complete!\n');

        // Summary
        const allPages = await storage.getAllPages();
        const hubPages = allPages.filter(p => p.pageType === 'hub');
        console.log(`📊 Total hub pages in database: ${hubPages.length}`);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

main().catch(console.error);
