
import 'dotenv/config';
import { pool } from '../../db';

async function runMigration() {
    const client = await pool.connect();
    try {
        console.log('Starting migration for missing admin tables...');
        await client.query('BEGIN');

        // Linking Rules
        console.log('Creating linking_rules...');
        await client.query(`
      CREATE TABLE IF NOT EXISTS linking_rules (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        rule_type TEXT NOT NULL DEFAULT 'keyword_match',
        trigger_pattern TEXT NOT NULL,
        target_page_path TEXT NOT NULL,
        anchor_text TEXT,
        priority INTEGER NOT NULL DEFAULT 5,
        max_occurrences INTEGER NOT NULL DEFAULT 1,
        is_active BOOLEAN NOT NULL DEFAULT true,
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

        // CTA Templates
        console.log('Creating cta_templates...');
        await client.query(`
      CREATE TABLE IF NOT EXISTS cta_templates (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        headline TEXT NOT NULL,
        description TEXT,
        button_text TEXT NOT NULL DEFAULT 'Learn More',
        button_link TEXT,
        product_slug TEXT,
        position TEXT NOT NULL DEFAULT 'mid_content',
        trigger_clusters TEXT[] NOT NULL DEFAULT ARRAY[]::text[],
        trigger_keywords TEXT[] NOT NULL DEFAULT ARRAY[]::text[],
        priority INTEGER NOT NULL DEFAULT 5,
        is_active BOOLEAN NOT NULL DEFAULT true,
        styling JSONB DEFAULT '{}',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

        // BigMind Sessions
        console.log('Creating bigmind_sessions...');
        await client.query(`
      CREATE TABLE IF NOT EXISTS bigmind_sessions (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL DEFAULT 'New Chat',
        mode TEXT NOT NULL DEFAULT 'cms',
        message_count INTEGER NOT NULL DEFAULT 0,
        last_message_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

        // BigMind Messages (dependent on sessions)
        console.log('Creating bigmind_messages...');
        await client.query(`
      CREATE TABLE IF NOT EXISTS bigmind_messages (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id VARCHAR NOT NULL REFERENCES bigmind_sessions(id) ON DELETE CASCADE,
        role TEXT NOT NULL DEFAULT 'user',
        content TEXT NOT NULL,
        function_calls JSONB,
        attachments JSONB,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

        // BigMind Suggestions
        console.log('Creating bigmind_suggestions...');
        await client.query(`
      CREATE TABLE IF NOT EXISTS bigmind_suggestions (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        source_message_id VARCHAR,
        page_key VARCHAR,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        summary TEXT,
        payload JSONB DEFAULT '{}',
        status TEXT NOT NULL DEFAULT 'pending',
        applied_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

        await client.query('COMMIT');
        console.log('Migration completed successfully.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

// Run if called directly
import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    runMigration().then(() => process.exit(0));
}
