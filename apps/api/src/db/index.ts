import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "../config/env";

const connectionString = process.env.DATABASE_URL ?? (env as any).DATABASE_URL;

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool);
