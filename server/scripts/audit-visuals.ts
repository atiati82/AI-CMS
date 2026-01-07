
import { db } from "../db";
import { pages } from "@shared/schema";
import { eq, not } from "drizzle-orm";

async function auditVisuals() {
    console.log("Starting Visual Audit...");

    // Fetch all published pages
    const allPages = await db.select().from(pages).where(eq(pages.status, 'published'));

    const stats = {
        total: allPages.length,
        missingVisualConfig: 0,
        missingImages: 0,
        missingCards: 0,
        richPages: 0,
        textOnly: 0
    };

    const gaps: string[] = [];

    for (const p of allPages) {
        let score = 0;
        const issues = [];

        // 1. Check Visual Config (Hero, Theme, Motion)
        if (!p.visualConfig || Object.keys(p.visualConfig).length === 0) {
            stats.missingVisualConfig++;
            issues.push("No Visual Intelligence (Default Hero)");
        } else {
            score++;
        }

        // 2. Check Content for Images
        // Check for <img> tags or markdown image syntax ![
        const hasImages = (p.content?.includes('<img') || p.content?.includes('![')) ?? false;
        if (!hasImages) {
            stats.missingImages++;
            issues.push("No Inline Images");
        } else {
            score++;
        }

        // 3. Check Content for Glass Cards / Layouts
        const hasCards = (p.content?.includes('glass-card') || p.content?.includes('grid') || p.content?.includes('flex')) ?? false;
        if (!hasCards) {
            stats.missingCards++;
            issues.push("No Layout/Cards (Plain Text)");
        } else {
            score++;
        }

        if (score === 3) stats.richPages++;
        if (score === 0) stats.textOnly++;

        // If it's a science page, be stricter
        if (p.path.startsWith('/science') && score < 2) {
            gaps.push(`[${score}/3] ${p.path} -> ${issues.join(', ')}`);
        }
    }

    console.log("\n--- VISUAL AUDIT RESULTS ---");
    console.log(`Total Pages: ${stats.total}`);
    console.log(`Rich Visual Pages (Perfect): ${stats.richPages}`);
    console.log(`Plain Text Pages (Needs Love): ${stats.textOnly}`);
    console.log(`\nSpecific Gaps:`);
    console.log(`- Missing Visual Config (Hero/Theme): ${stats.missingVisualConfig}`);
    console.log(`- Missing Inline Images: ${stats.missingImages}`);
    console.log(`- Missing Layout Structure (Cards): ${stats.missingCards}`);

    console.log(`\n--- PRIORITY ATTENTION NEEDED (${gaps.length}) ---`);
    if (gaps.length > 0) {
        gaps.slice(0, 20).forEach(g => console.log(g));
        if (gaps.length > 20) console.log(`...and ${gaps.length - 20} more.`);
    }

    process.exit(0);
}

auditVisuals().catch(console.error);
