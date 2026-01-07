import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

console.log(`[DB] Connecting to: ${process.env.DATABASE_URL?.split('@')[1] || 'URL NOT SET'}`);
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Neon/Pooler optimization: Ensure search_path is set to public for every new connection
pool.on('connect', (client) => {
  client.query('SET search_path TO public, "$user"').catch(err => {
    console.error('[DB] Error setting search_path on connect:', err);
  });
});

// Drizzle ORM instance
const drizzleDb = drizzle(pool, { schema });

// Extended db object with raw query support for legacy code
export const db = Object.assign(drizzleDb, {
  // Legacy raw SQL query method - use Drizzle methods when possible
  query: (text: string, params?: any[]) => pool.query(text, params),
});

