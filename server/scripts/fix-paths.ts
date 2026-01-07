
import 'dotenv/config';
import { db } from "../db";
import { pages } from "@shared/schema";
import { eq } from "drizzle-orm";

async function fixPaths() {
    console.log("🔧 Fixing Paths to match App.tsx...");

    const MAPPINGS = [
        { old: "/science/water/structured-water-ez", new: "/science/ez-water-overview" },
        { old: "/science/minerals/types", new: "/science/ionic-vs-colloidal-vs-solid" },
        { old: "/science/water/memory", new: "/science/water-memory" }
    ];

    for (const mapping of MAPPINGS) {
        // Check if old exists
        const oldPage = await db.select().from(pages).where(eq(pages.path, mapping.old)).limit(1);
        if (oldPage.length > 0) {
            console.log(`Migrating: ${mapping.old} -> ${mapping.new}`);
            await db.update(pages)
                .set({ path: mapping.new, updatedAt: new Date() })
                .where(eq(pages.id, oldPage[0].id));
        } else {
            console.log(`[INFO] Old path not found (already fixed?): ${mapping.old}`);
        }
    }
    console.log("✅ Path Fix Complete.");
    process.exit(0);
}

fixPaths().catch(console.error);
