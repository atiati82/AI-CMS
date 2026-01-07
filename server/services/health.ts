
import { pool } from '../db';

const REQUIRED_TABLES = [
    // Core
    // Core
    'admin_users',
    // Shop
    'products',
    'carts',
    'orders',
    // Content
    'pages',
    'clusters',
    'page_media_assets',
    // Science
    'science_articles',
    // AI & RAG
    'documents',
    'document_chunks',
    'seo_keywords',
    'magic_page_suggestions',
    'agent_configurations',
    // Admin Tabs (The ones that were crashing)
    'linking_rules',
    'cta_templates',
    'bigmind_sessions',
    'bigmind_messages'
];

export class HealthGate {
    /**
     * Checks if all required database tables exist.
     * Returns true if healthy, false if missing tables.
     * Logs missing tables to console.
     */
    static async checkDatabaseTables(retries = 3): Promise<boolean> {
        console.log('[HealthGate] Verifying database schema integrity...');

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                // Get all table names in public schema
                const result = await pool.query(`
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public'
                `);

                const existingTables = new Set(result.rows.map((row: any) => row.table_name));
                const missingTables = REQUIRED_TABLES.filter(table => !existingTables.has(table));

                if (missingTables.length > 0) {
                    console.error('❌ [HealthGate] CRITICAL: Missing required database tables:');
                    missingTables.forEach(table => console.error(`   - ${table}`));
                    console.error('\n[HealthGate] Server startup aborted to prevent runtime crashes.');
                    console.error('[HealthGate] Please run migrations: npm run db:push\n');
                    return false;
                }

                console.log('✅ [HealthGate] Database schema integrity verified.');
                return true;
            } catch (error) {
                console.warn(`⚠️ [HealthGate] Database connection attempt ${attempt}/${retries} failed:`, error instanceof Error ? error.message : error);
                if (attempt < retries) {
                    console.log(`[HealthGate] Retrying in 2 seconds...`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                } else {
                    console.error('❌ [HealthGate] All database connection attempts failed.');
                    return false;
                }
            }
        }
        return false;
    }
}
