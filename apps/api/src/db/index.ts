import { Pool } from 'pg';

// Pass the raw string. To avoid SSL warnings, you can change 'sslmode=require' to 'sslmode=verify-full' in your .env
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false // Often required for Neon DB
  }
});

// Auto-initialize tables
export const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL
      );

      -- Update any existing users (if testing) to have a default full_name if column was missing
      DO $$
      BEGIN
        BEGIN
          ALTER TABLE users ADD COLUMN full_name VARCHAR(255) NOT NULL DEFAULT 'Unknown';
        EXCEPTION
          WHEN duplicate_column THEN null;
        END;
      END $$;

      CREATE TABLE IF NOT EXISTS student_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        student_info JSONB,
        parent_info JSONB,
        school_preference JSONB
      );
    `);
    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
};

initDb();
