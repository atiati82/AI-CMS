
import { db } from "../db";
import { pages } from "@shared/schema";
import { sql } from "drizzle-orm";

async function auditPageTotals() {
    console.log("Starting Page Audit...");

    const allPages = await db.select().from(pages);

    console.log(`\n--- SUMMARY ---`);
    console.log(`Total Pages in Database: ${allPages.length}`);

    // 1. Check for Duplicate Titles
    const titleCounts: Record<string, number> = {};
    const duplicateTitles: string[] = [];

    for (const p of allPages) {
        titleCounts[p.title] = (titleCounts[p.title] || 0) + 1;
        if (titleCounts[p.title] === 2) {
            duplicateTitles.push(p.title);
        }
    }

    if (duplicateTitles.length > 0) {
        console.log(`\n--- POTENTIAL DUPLICATES (Same Title) ---`);
        console.log(`Found ${duplicateTitles.length} titles appearing more than once:`);
        for (const title of duplicateTitles) {
            const matches = allPages.filter(p => p.title === title);
            console.log(`\nTitle: "${title}"`);
            matches.forEach(m => console.log(`  - Path: ${m.path} [ID: ${m.id}]`));
        }
    } else {
        console.log("\nNo strict title duplicates found.");
    }

    // 2. Check for Similarity (e.g. "Water Science" vs "Water Science Master")
    // Simple heuristic: similar paths
    console.log(`\n--- PATH ANALYSIS ---`);
    // Group by rough "folder"
    const folderCounts: Record<string, number> = {};
    for (const p of allPages) {
        const parts = p.path.split('/');
        const root = parts[1] || 'root';
        folderCounts[root] = (folderCounts[root] || 0) + 1;
    }

    console.log("Pages by Section:");
    Object.entries(folderCounts)
        .sort(([, a], [, b]) => b - a)
        .forEach(([folder, count]) => console.log(`  /${folder}: ${count}`));

    process.exit(0);
}

auditPageTotals().catch(console.error);
