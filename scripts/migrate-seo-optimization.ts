#!/usr/bin/env tsx

/**
 * SEO Optimization Migration Script
 * Safely applies the SEO optimization schema changes
 */

import { db } from '../server/db';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';

async function runMigration() {
    console.log('🚀 Starting SEO Optimization migration...\n');

    try {
        // Read the migration SQL file
        const migrationPath = path.join(__dirname, '../db/migrations/002_seo_optimization.sql');
        const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

        // Execute the migration
        console.log('📝 Executing migration SQL...');
        await db.execute(sql.raw(migrationSQL));

        console.log('\n✅ Migration completed successfully!');
        console.log('\nNew tables created:');
        console.log('  - page_metrics');
        console.log('  - page_recommendations');
        console.log('  - optimization_history');
        console.log('  - cluster_optimization_log');
        console.log('  - cron_jobs');
        console.log('  - cron_job_logs');
        console.log('\nPages table extended with SEO optimization fields');
        console.log('Default cron job created: daily-seo-recommendations\n');

        process.exit(0);
    } catch (error: any) {
        console.error('\n❌ Migration failed:', error.message);
        console.error(error);
        process.exit(1);
    }
}

runMigration();
