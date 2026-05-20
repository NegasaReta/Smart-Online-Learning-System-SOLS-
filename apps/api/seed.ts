import 'dotenv/config';
import { pool } from './src/db/index.js';
import bcrypt from 'bcrypt';

async function seedAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Check if admin exists
    const res = await pool.query("SELECT * FROM users WHERE email = 'admin@example.com'");
    
    if (res.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (email, password, role) VALUES ('admin@example.com', $1, 'admin')",
        [hashedPassword]
      );
      console.log('✅ Admin user successfully created!');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
    } else {
      console.log('✅ Admin user already exists!');
    }
  } catch (err) {
    console.error('Error seeding admin:', err);
  } finally {
    process.exit(0);
  }
}

seedAdmin();
