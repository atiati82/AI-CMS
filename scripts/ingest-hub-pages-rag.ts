#!/usr/bin/env npx tsx
/**
 * Hub Pages RAG Ingestion Script
 * 
 * Ingests hub page JSON specifications into the AI RAG knowledge base
 * so the AI can learn and reference this content structure.
 * 
 * Usage:
 *   npx tsx scripts/ingest-hub-pages-rag.ts
 */

import fs from 'fs';
import path from 'path';
import { ingestDocument } from '../server/services/knowledge-base';

interface HubSection {
    id: string;
    type: string;
    html: string;
    motion?: {
        preset: string;
        stagger?: boolean | string;
    };
}

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
    };
    visualConfig: {
        priority: string;
        vibeKeywords?: string[];
        emotionalTone?: string[];
        motionPreset?: string;
        colorPalette?: string;
        treeTheme?: string;
    };
    sections: HubSection[];
    faq: {
        title: string;
        items: Array<{ question: string; answer: string }>;
    };
    jsonLd: Record<string, any>;
    dynamicBoxRules?: Record<string, any>;
    internalLinks: string[];
}

function hubToMarkdownContent(hub: HubJsonBlock): string {
    const lines: string[] = [];

    // Header
    lines.push(`# ${hub.page.title}`);
    lines.push('');
    lines.push(`**Path:** ${hub.page.path}`);
    lines.push(`**Type:** ${hub.page.pageType} (${hub.page.template})`);
    lines.push(`A: ${item.answer}`);
    lines.push('');
}
        }

// Internal Links
if (hub.internalLinks.length) {
    lines.push('## Internal Links');
    lines.push(`This hub links to ${hub.internalLinks.length} pages:`);
    lines.push(hub.internalLinks.map(l => `- ${l}`).join('\n'));
    lines.push('');
}

// Dynamic Box Rules
if (hub.dynamicBoxRules) {
    lines.push('## Dynamic Box Rules (AI Evolution)');
    for (const [ruleName, rule] of Object.entries(hub.dynamicBoxRules)) {
        const r = rule as { condition?: string; action?: string; requiredTerms?: string[] };
        lines.push(`- **${ruleName}:** ${r.condition || ''} → ${r.action || ''}`);
        if (r.requiredTerms) {
            lines.push(`  Required terms: ${r.requiredTerms.join(', ')}`);
        }
    }
}

return lines.join('\n');
    }

async function loadAndIngestHubs() {
    const hubDir = path.join(process.cwd(), 'content', 'hubs');

    if (!fs.existsSync(hubDir)) {
        throw new Error(`Hub directory not found: ${hubDir}`);
    }

    const files = fs.readdirSync(hubDir).filter(f => f.endsWith('.json'));

    console.log('🧠 Hub Pages RAG Ingestion');
    console.log('==========================\n');
    console.log(`📂 Found ${files.length} hub files\n`);

    let ingested = 0;

    for (const filename of files) {
        const filepath = path.join(hubDir, filename);
        const content = fs.readFileSync(filepath, 'utf-8');
        const hub = JSON.parse(content) as HubJsonBlock;

        console.log(`📄 Ingesting: ${hub.page.title}`);
        console.log(`   Path: ${hub.page.path}`);
        console.log(`   Sections: ${hub.sections.length}`);

        // Convert to markdown for better RAG retrieval
        const markdownContent = hubToMarkdownContent(hub);

        // Ingest into knowledge base
        // Note: data_type must be one of: 'document', 'page', 'url', 'text'
        const docId = await ingestDocument({
            title: `Hub Page Spec: ${hub.page.title}`,
            content: markdownContent,
            source: `hub-spec:${hub.page.path}`,
            type: 'document',  // Must use valid type from constraint
            zone: hub.page.zone === 'Z1' ? 'product' : 'science',
            clusters: hub.page.clusterKey ? [hub.page.clusterKey] : [],
            isInternal: false,
            metadata: {
                pageKey: hub.page.key,
                path: hub.page.path,
                pageType: hub.page.pageType,
                template: hub.page.template,
                sectionCount: hub.sections.length,
                linkCount: hub.internalLinks.length,
                faqCount: hub.faq.items.length,
                focusKeyword: hub.seo.focusKeyword,
                visualConfig: hub.visualConfig,
            }
        });

        console.log(`   ✅ Document ID: ${docId.slice(0, 8)}...\n`);
        ingested++;
    }

    console.log('==========================');
    console.log(`✅ Ingested ${ingested} hub specifications into RAG`);
    console.log('\nThe AI can now:');
    console.log('- Reference hub page structures');
    console.log('- Learn from section patterns');
    console.log('- Apply dynamic box rules');
    console.log('- Suggest internal links');
    console.log('');
}

loadAndIngestHubs().catch(console.error);
