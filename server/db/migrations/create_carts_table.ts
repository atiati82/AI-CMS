
import { pool } from '../../db';

async function runMigration() {
    try {
        console.log('Creating carts table...');
        await pool.query(`
      CREATE TABLE IF NOT EXISTS carts (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id TEXT NOT NULL UNIQUE,
        items JSONB NOT NULL DEFAULT '[]'::jsonb,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
        console.log('Carts table created successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await pool.end();
    }
}

// Run if called directly
import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    runMigration().then(() => process.exit(0));
}
