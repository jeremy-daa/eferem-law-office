import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL || "";

// Neon HTTP Serverless Driver Connection
const sql = neon(databaseUrl || "postgresql://user:pass@localhost:5432/neondb");

export const db = drizzle(sql, { schema });
export { sql };
