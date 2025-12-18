import { db } from "../db";
import { sql } from "drizzle-orm";

async function runMigration() {
    console.log("Starting sitemap migration...");

    try {
        // Pages
        console.log("Updating pages...");
        await db.execute(sql`ALTER TABLE pages ADD COLUMN IF NOT EXISTS is_in_sitemap BOOLEAN NOT NULL DEFAULT true`);
        await db.execute(sql`ALTER TABLE pages ADD COLUMN IF NOT EXISTS sitemap_priority INTEGER DEFAULT 70`);

        // Products
        console.log("Updating products...");
        await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS is_in_sitemap BOOLEAN NOT NULL DEFAULT true`);
        await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS sitemap_priority INTEGER DEFAULT 80`);

        // Science Articles
        console.log("Updating science_articles...");
        try {
            await db.execute(sql`ALTER TABLE science_articles ADD COLUMN IF NOT EXISTS is_in_sitemap BOOLEAN NOT NULL DEFAULT true`);
            await db.execute(sql`ALTER TABLE science_articles ADD COLUMN IF NOT EXISTS sitemap_priority INTEGER DEFAULT 60`);
        } catch (e) {
            console.warn("Could not update science_articles (might not exist):", e);
        }

        console.log("Migration complete.");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

runMigration();
