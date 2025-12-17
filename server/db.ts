import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Drizzle ORM instance
const drizzleDb = drizzle(pool, { schema });

// Extended db object with raw query support for legacy code
export const db = Object.assign(drizzleDb, {
  // Legacy raw SQL query method - use Drizzle methods when possible
  query: (text: string, params?: any[]) => pool.query(text, params),
});

