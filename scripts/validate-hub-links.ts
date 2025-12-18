#!/usr/bin/env npx tsx
/**
 * Link Validation Script
 * 
 * Validates that all internal links in hub page JSON files
 * point to pages that exist in the database.
 * 
 * Usage:
 *   npx tsx scripts/validate-hub-links.ts
 */

import fs from 'fs';
import path from 'path';
import { pool } from '../server/db';

interface HubJsonBlock {
    page: { path: string; title: string };
    internalLinks: string[];
}

async function validateLinks() {
    const hubDir = path.join(process.cwd(), 'content', 'hubs');

    if (!fs.existsSync(hubDir)) {
        console.error(`Hub directory not found: ${hubDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(hubDir).filter(f => f.endsWith('.json'));

    console.log('🔗 Hub Pages Link Validation');
    console.log('=============================\n');

    // Get all existing pages from database
    const dbResult = await pool.query('SELECT path FROM pages');
    const existingPaths = new Set(dbResult.rows.map(r => r.path));

    // Also include all hub paths from JSON files (not yet ingested)
    const hubPaths = new Set<string>();
    for (const filename of files) {
        const filepath = path.join(hubDir, filename);
        const content = fs.readFileSync(filepath, 'utf-8');
        const hub = JSON.parse(content) as HubJsonBlock;
        hubPaths.add(hub.page.path);
    }

    const allKnownPaths = new Set([...existingPaths, ...hubPaths]);

    console.log(`📊 Database pages: ${existingPaths.size}`);
    console.log(`📄 Hub JSON files: ${hubPaths.size}`);
    console.log(`📁 Total known paths: ${allKnownPaths.size}\n`);

    let totalLinks = 0;
    let validLinks = 0;
    let brokenLinks: Array<{ source: string; target: string }> = [];

    for (const filename of files) {
        const filepath = path.join(hubDir, filename);
        const content = fs.readFileSync(filepath, 'utf-8');
        const hub = JSON.parse(content) as HubJsonBlock;

        const links = hub.internalLinks || [];
        totalLinks += links.length;

        const broken = links.filter(link => !allKnownPaths.has(link));
        validLinks += links.length - broken.length;

        if (broken.length > 0) {
            console.log(`⚠️  ${hub.page.title}`);
            console.log(`   Path: ${hub.page.path}`);
            console.log(`   Broken links:`);
            broken.forEach(link => {
                console.log(`     ❌ ${link}`);
                brokenLinks.push({ source: hub.page.path, target: link });
            });
            console.log('');
        } else {
            console.log(`✅ ${hub.page.title} — all ${links.length} links valid`);
        }
    }

    console.log('\n=============================');
    console.log('📊 Summary:');
    console.log(`   Total links: ${totalLinks}`);
    console.log(`   Valid: ${validLinks}`);
    console.log(`   Broken: ${brokenLinks.length}`);

    if (brokenLinks.length > 0) {
        console.log('\n📝 Broken Link Details:');

        // Group by target
        const targetCounts = brokenLinks.reduce((acc, link) => {
            acc[link.target] = (acc[link.target] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const sorted = Object.entries(targetCounts).sort((a, b) => b[1] - a[1]);
        sorted.forEach(([target, count]) => {
            console.log(`   ${target} — referenced ${count}x`);
        });

        console.log('\n💡 Pages to create:');
        sorted.forEach(([target]) => {
            console.log(`   - ${target}`);
        });
    } else {
        console.log('\n🎉 All links are valid!');
    }

    await pool.end();
}

validateLinks().catch(console.error);
