
import 'dotenv/config';
import { pool } from './server/db';

async function checkTables() {
    try {
        const res = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);

        const tables = res.rows.map((row: any) => row.table_name);
        console.log('Existing tables:', tables);

        const requiredTables = ['products', 'agent_metrics', 'agent_configurations', 'carts', 'linking_rules', 'bigmind_sessions', 'bigmind_messages', 'cta_templates', 'knowledge_base'];
        const missingTables = requiredTables.filter(t => !tables.includes(t));

        if (missingTables.length > 0) {
            console.log('Missing tables:', missingTables);
        } else {
            console.log('All required Admin tables exist (products, agent_metrics, agent_configurations, carts, linking_rules, bigmind_sessions, bigmind_messages, cta_templates, knowledge_base).');
        }
    } catch (err) {
        console.error('Error checking tables:', err);
    } finally {
        await pool.end();
    }
}

checkTables();
