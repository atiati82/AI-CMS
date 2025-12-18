import { db } from "../db";
import { sql } from "drizzle-orm";

async function runMigration() {
    console.log("Starting redirects migration...");

    try {
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS redirects (
                id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
                source_path TEXT NOT NULL UNIQUE,
                target_path TEXT NOT NULL,
                type TEXT NOT NULL DEFAULT '301',
                is_active BOOLEAN NOT NULL DEFAULT true,
                description TEXT,
                last_triggered_at TIMESTAMP,
                trigger_count INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL
            );
        `);

        console.log("Redirects table created successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

runMigration();
