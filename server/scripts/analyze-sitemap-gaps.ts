
import { db } from "../db";
import { pages, clusters } from "@shared/schema";
import fs from "fs";
import path from "path";

// 1. Map Cluster IDs correctly based on the sitemap
// We'll normalize cluster keys from the MD file to DB keys
function normalizeClusterKey(name: string): string {
    console.log(`Checking cluster name: "${name}"`);
    if (name.includes("CORE") || name.includes("HOME")) return "home";
    if (name.includes("PRODUCTS") || name.includes("Product")) return "shop"; // Case sensitive check in original?
    if (name.includes("WATER") || name.includes("Water Science")) return "water_science";
    if (name.includes("MINERAL") || name.includes("Mineral Science")) return "mineral_science";
    if (name.includes("CRYSTALLINE") || name.includes("Crystalline")) return "crystalline_matrix";
    if (name.includes("BIOELECTRIC") || name.includes("Bioelectricity")) return "bioelectricity";
    if (name.includes("TERRAIN") || name.includes("Terrain")) return "terrain_model";
    if (name.includes("SULFUR") || name.includes("Sulfur")) return "sulfur_pathways";
    if (name.includes("MICROBIOME") || name.includes("Microbiome")) return "minerals_microbiome";
    if (name.includes("LIQUID") || name.includes("Liquid Crystal")) return "liquid_crystal_biology";
    if (name.includes("SPIRITUAL") || name.includes("Spiritual")) return "spiritual_electricity";
    if (name.includes("TRUST") || name.includes("Trust")) return "trust_lab";
    if (name.includes("BRAND") || name.includes("Brand")) return "about";
    if (name.includes("SUPPORT") || name.includes("Support")) return "support";
    if (name.includes("BLOG") || name.includes("Blog")) return "blog";
    return "uncategorized";
}

async function analyzeSitemap() {
    console.log("Starting Sitemap Gap Analysis...");

    // 1. Parse Sitemap MD
    const sitemapPath = path.join(process.cwd(), "ANDARA_SITEMAP_V1_3.md");
    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");

    const lines = sitemapContent.split("\n");
    const targetPages: any[] = [];
    let currentCluster = "uncategorized";

    // Simple regex-based parsing of the friendly MD format
    // ## Cluster 1: CORE / HOME
    // ### home_main
    // **Slug:** `/`
    // **Title:** Andara Ionic...
    // **Zone:** Mixed...

    let currentPage: any = {};

    for (const line of lines) {
        if (line.startsWith("## Cluster")) {
            currentCluster = normalizeClusterKey(line);
        } else if (line.startsWith("### ")) {
            if (currentPage.path) {
                targetPages.push(currentPage);
            }
            currentPage = { cluster: currentCluster, key: line.replace("### ", "").trim() };
        } else if (line.trim().startsWith("**Slug:**")) {
            currentPage.path = line.replace("**Slug:**", "").trim().replace(/`/g, "");
        } else if (line.trim().startsWith("**Title:**")) {
            currentPage.title = line.replace("**Title:**", "").trim();
        } else if (line.trim().startsWith("**Zone:**")) {
            currentPage.zone = line.replace("**Zone:**", "").trim();
        }
    }
    // Push last page
    if (currentPage.path) {
        targetPages.push(currentPage);
    }

    console.log(`Target Pages in Sitemap: ${targetPages.length}`);

    // 2. Fetch DB Pages
    const dbPages = await db.select().from(pages);
    const dbPageMap = new Map(dbPages.map(p => [p.path, p]));

    // 3. Compare
    const missingPages = [];
    const contentGaps = [];

    for (const target of targetPages) {
        const exists = dbPageMap.get(target.path);
        if (!exists) {
            missingPages.push(target);
        } else {
            // Check if existing page has content
            if (!exists.content || exists.content.trim().length < 50) {
                contentGaps.push(target);
            }
        }
    }

    console.log(`\n--- GAP REPORT ---`);
    console.log(`Missing Pages (Need Creation): ${missingPages.length}`);
    console.log(`Existing but Empty (Need Content): ${contentGaps.length}`);
    console.log(`Total Pages needing generation: ${missingPages.length + contentGaps.length}`);

    // Group by Cluster
    const byCluster: Record<string, number> = {};
    missingPages.forEach(p => {
        byCluster[p.cluster] = (byCluster[p.cluster] || 0) + 1;
    });

    console.log("\n--- MISSING BY CLUSTER ---");
    Object.entries(byCluster).forEach(([cluster, count]) => {
        console.log(`${cluster}: ${count}`);
    });

    // Save list to file for the generation script
    const toGenerate = [...missingPages, ...contentGaps];
    fs.writeFileSync(
        path.join(process.cwd(), "server/scripts/pages-to-generate.json"),
        JSON.stringify(toGenerate, null, 2)
    );
    console.log("\nSaved generation list to server/scripts/pages-to-generate.json");

    process.exit(0);
}

analyzeSitemap().catch(console.error);
