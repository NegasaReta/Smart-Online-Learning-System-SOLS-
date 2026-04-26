// apps/api/src/config/db.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';

dotenv.config();

// Connect to Neon Serverless PostgreSQL
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });