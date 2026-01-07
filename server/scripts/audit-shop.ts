
import { db } from "../db";
import { pages } from "@shared/schema";
import { like, or } from "drizzle-orm";

async function auditShop() {
    console.log("Auditing Shop Content...");

    // Find all pages starting with /shop or /products
    const shopPages = await db.select().from(pages).where(
        or(like(pages.path, '/shop%'), like(pages.path, '/products%'))
    );

    console.log(`Found ${shopPages.length} shop-related pages.`);

    const hollow = [];
    const rich = [];

    for (const p of shopPages) {
        if (!p.content || p.content.length < 500) {
            hollow.push(p);
        } else {
            rich.push(p);
        }
    }

    console.log(`\n--- RICH CONTENT (${rich.length}) ---`);
    rich.forEach(p => console.log(`[${p.content.length}] ${p.path} (${p.title})`));

    if (hollow.length > 0) {
        console.log(`\n--- HOLLOW CONTENT (${hollow.length}) ---`);
        hollow.forEach(p => console.log(`[${p.content?.length || 0}] ${p.path} (${p.title})`));
        console.log("\nRecommendation: Hydrate these pages with product details.");
    } else {
        console.log("\nAll shop pages meet minimal density standards.");
    }

    process.exit(0);
}

auditShop().catch(console.error);
