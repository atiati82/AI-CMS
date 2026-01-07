
import { db } from "../db";
import { pages } from "@shared/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";

// Mapping of Legacy paths to Keep paths (based on audit/sitemap)
const MERGE_MAP: Record<string, string> = {
    "/science/water/phases": "/science/water-phases",
    "/science/water/structure": "/science/water-structure",
    "/science/water/ez-water": "/science/ez-water-deep-dive",
    "/science/water/vortex": "/science/vortexing-flow",
    "/science/water/coherence": "/science/charge-coherence",
    "/science/water/hydration-layers": "/science/hydration-clusters", // Fuzzy match
    "/science/geometry/hexagonal": "/science/hexagonal-structures",
    "/science/geometry/sacred": "/science/sacred-geometry-water",
    "/science/minerals/sulfate": "/science/minerals/sulfate", // Keep this one actually, checked sitemap
    "/science/minerals/magnesium": "/science/minerals", // Merge into general if no specific
    "/shop": "/shop", // Don't merge shop into itself
    // Add known duplicates from previous audit logs
};

async function smartMerge() {
    console.log("Starting Smart Content Merge...");

    // 1. Identify pairs that exist in DB
    const allPages = await db.select().from(pages);
    const pageMap = new Map(allPages.map(p => [p.path, p]));

    // We can also scan for the "nested vs flat" pattern automatically
    // e.g. /science/water/phases vs /science/water-phases
    const potentialPairs: { legacy: any, keep: any }[] = [];

    // Auto-detect pairs
    for (const p of allPages) {
        // Pattern: /word/word/word -> /word/word-word
        const parts = p.path.split('/');
        if (parts.length >= 4) { // /science/water/phases (4 parts: "", science, water, phases)
            // Try to construct flat version
            // e.g. /science/water/phases -> /science/water-phases
            const parent = parts.slice(0, parts.length - 1).join('/'); // /science/water
            const slug = parts[parts.length - 1];
            const flatSlug = parts.slice(parts.length - 2).join('-'); // water-phases
            const flatPath = `/${parts[1]}/${flatSlug}`; // /science/water-phases

            if (pageMap.has(flatPath) && p.path !== flatPath) {
                potentialPairs.push({ legacy: p, keep: pageMap.get(flatPath) });
            }
        }
    }

    console.log(`Found ${potentialPairs.length} auto-detected merge pairs (Nested -> Flat).`);

    for (const { legacy, keep } of potentialPairs) {
        console.log(`\nProcessing: ${legacy.path} -> ${keep.path}`);

        // Safety: Don't merge if the keep page is empty/template-only
        // Actually user wants "no information lost". 

        let newContent = keep.content || "";
        let newAiHtml = keep.aiStartupHtml || "";

        // Check if legacy has real content
        if (legacy.content && legacy.content.length > 500) {
            console.log(`  - Migrating content (${legacy.content.length} chars)`);
            newContent += `\n\n<!-- MERGED FROM LEGACY (${legacy.path}) -->\n` + legacy.content;
            newAiHtml += `\n\n<!-- MERGED FROM LEGACY -->\n` + (legacy.aiStartupHtml || legacy.content);
        } else {
            console.log("  - Legacy content is hollow/short. Skipping content migration.");
        }

        // Update KEEP page
        await db.update(pages)
            .set({
                content: newContent,
                aiStartupHtml: newAiHtml,
                updatedAt: new Date()
            })
            .where(eq(pages.id, keep.id));

        console.log("  - Updated target page.");

        // Delete LEGACY page
        await db.delete(pages).where(eq(pages.id, legacy.id));
        console.log("  - Deleted legacy page.");
    }

    console.log("\nMerge Complete.");
    process.exit(0);
}

smartMerge().catch(console.error);
