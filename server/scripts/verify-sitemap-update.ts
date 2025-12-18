import { db } from "../db";
import { pages } from "@shared/schema";
import { generateSitemapXml } from "../services/sitemap-generator";
import { eq } from "drizzle-orm";

async function verifySitemap() {
    console.log("Starting Sitemap Verification...");

    // 1. Create a test page that SHOULD be in sitemap
    const pageKey = "sitemap-test-page";

    // Cleanup if exists
    await db.delete(pages).where(eq(pages.key, pageKey));

    console.log("Creating test page...");
    const [page] = await db.insert(pages).values({
        key: pageKey,
        title: "Sitemap Test Page",
        path: "/sitemap-test",
        content: "Test content",
        status: "published",
        pageType: "page",
        template: "default",
        isInSitemap: true,
        sitemapPriority: 80
    }).returning();

    console.log(`Created page ${page.id} with isInSitemap=true, priority=80`);

    // 2. Generate Sitemap and Check
    let xml = await generateSitemapXml();
    if (xml.includes("/sitemap-test") && xml.includes("<priority>0.8</priority>")) {
        console.log("✅ PASS: Page found in sitemap with correct priority.");
    } else {
        console.error("❌ FAIL: Page not found or wrong priority.", {
            foundUrl: xml.includes("/sitemap-test"),
            foundPriority: xml.includes("<priority>0.8</priority>")
        });
    }

    // 3. Update to exclude from sitemap
    console.log("Updating page to exclude from sitemap...");
    await db.update(pages).set({ isInSitemap: false }).where(eq(pages.id, page.id));

    // 4. Generate Sitemap and Check
    xml = await generateSitemapXml();
    if (!xml.includes("/sitemap-test")) {
        console.log("✅ PASS: Page correctly excluded from sitemap.");
    } else {
        console.error("❌ FAIL: Page still found in sitemap after exclusion.");
    }

    // Cleanup
    await db.delete(pages).where(eq(pages.id, page.id));
    console.log("Cleanup complete.");
    process.exit(0);
}

verifySitemap().catch(console.error);
