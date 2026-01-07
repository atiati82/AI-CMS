
import { db } from "../db";
import { pages } from "@shared/schema";
import fs from "fs";
import path from "path";

// Simple Levenshtein implementation
function levenshtein(a: string, b: string): number {
    const matrix = [];
    let i, j;
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

async function deepAudit() {
    console.log("Starting Deep Audit...");
    const allPages = await db.select().from(pages);

    // 1. Full Slug List Export
    const slugList = allPages
        .sort((a, b) => a.path.localeCompare(b.path))
        .map(p => `[${p.status.toUpperCase().padEnd(9)}] ${p.path}  --  "${p.title}"  (ID: ${p.id})`)
        .join("\n");

    fs.writeFileSync(path.join(process.cwd(), "server/scripts/audit_slug_list.txt"), slugList);
    console.log(`Exported full slug list to server/scripts/audit_slug_list.txt (${allPages.length} pages)`);

    // 2. Fuzzy Duplicate Detection
    console.log("\n--- Checking for Fuzzy Duplicates ---");
    const fuzzyDupes: string[] = [];
    const checked = new Set();

    // Optimization: comparing title vs title
    for (let i = 0; i < allPages.length; i++) {
        for (let j = i + 1; j < allPages.length; j++) {
            const p1 = allPages[i];
            const p2 = allPages[j];

            // Skip if identical ID (impossible in this loop) or identical Path (already checked)

            // Title Similarity
            const dist = levenshtein(p1.title.toLowerCase(), p2.title.toLowerCase());
            const maxLen = Math.max(p1.title.length, p2.title.length);
            const similarity = 1 - (dist / maxLen);

            // Threshold: 85% similar titles
            if (similarity > 0.85) {
                fuzzyDupes.push(`"${p1.title}" (${p1.path}) <--> "${p2.title}" (${p2.path}) [${(similarity * 100).toFixed(0)}%]`);
            }

            // Path subset check (e.g. /science/water vs /science/water/phases)
            // if (p1.path.includes(p2.path) && p1.path !== p2.path) { ... }
        }
    }

    if (fuzzyDupes.length > 0) {
        console.log(`Found ${fuzzyDupes.length} potentially duplicate pairs:`);
        fuzzyDupes.forEach(d => console.log("  " + d));
    } else {
        console.log("No fuzzy duplicates found.");
    }

    // 3. AI Startup Check
    const missingAiStartup = allPages.filter(p => !p.aiStartupHtml || p.aiStartupHtml.trim() === "");
    console.log(`\nPages missing aiStartupHtml: ${missingAiStartup.length}`);
    if (missingAiStartup.length > 0) {
        missingAiStartup.forEach(p => console.log(`  - ${p.path}`));
    }

    // 4. Broken Content (Distribution issue check)
    // User mentioned "content got distributed... now im not sure if we have duplicates"
    // We check if multiple pages have identical content blocks
    const contentMap = new Map();
    const contentDupes = [];

    for (const p of allPages) {
        if (!p.content || p.content.length < 50) continue;
        const signature = p.content.substring(0, 100); // Check strictly the first 100 chars
        if (contentMap.has(signature)) {
            const existing = contentMap.get(signature);
            contentDupes.push(`${p.path} maps to ${existing.path}`);
        } else {
            contentMap.set(signature, p);
        }
    }

    if (contentDupes.length > 0) {
        console.log(`\n[WARNING] Found ${contentDupes.length} pages with identical content start (Copy-Paste detected):`);
        contentDupes.forEach(d => console.log("  " + d));
    }

    process.exit(0);
}

deepAudit().catch(console.error);
