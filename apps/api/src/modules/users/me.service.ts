import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon serverless postgres
  },
});

export interface MeResult {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export async function getUserById(id: string): Promise<MeResult | null> {
  try {
    const result = await pool.query(
      `SELECT id, full_name AS "fullName", email, role
       FROM users
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as MeResult;
  } catch (error) {
    console.error("Database error in getUserById:", error);
    throw new Error("Failed to fetch user from database");
  }
}