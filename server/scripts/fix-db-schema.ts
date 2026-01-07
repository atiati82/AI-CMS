
import 'dotenv/config';
import { pool as db } from '../db';

async function fixSchema() {
    console.log('🚀 Starting schema fix...');

    try {
        console.log('📦 Creating agent_metrics table if not exists...');
        await db.query(`
            CREATE TABLE IF NOT EXISTS agent_metrics (
                id VARCHAR DEFAULT gen_random_uuid() PRIMARY KEY,
                agent_name TEXT NOT NULL,
                task_type TEXT NOT NULL,
                status TEXT NOT NULL,
                input_tokens INTEGER DEFAULT 0,
                output_tokens INTEGER DEFAULT 0,
                cost_usd DOUBLE PRECISION DEFAULT 0,
                latency_ms INTEGER DEFAULT 0,
                error_message TEXT,
                user_id VARCHAR,
                metadata JSONB DEFAULT '{}'::jsonb,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL
            );
        `);
        console.log('  ✓ agent_metrics table ensured');

        // Optional: Add index for performance if needed
        await db.query(`
            CREATE INDEX IF NOT EXISTS idx_agent_metrics_agent_name ON agent_metrics(agent_name);
            CREATE INDEX IF NOT EXISTS idx_agent_metrics_created_at ON agent_metrics(created_at);
        `);
        console.log('  ✓ agent_metrics indices ensured');

        console.log('\n✅ Schema fix complete!');
    } catch (error: any) {
        console.error('❌ Schema fix failed:', error.message);
        process.exit(1);
    } finally {
        // await db.end(); // Don't end pool if reused, but here it's fine script
    }
}

// Run if called directly
import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    fixSchema().then(() => process.exit(0));
}
