import { pool } from '../db/index';

export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
}

export const findUserByEmail = async (email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const registerUser = async (fullName: string, email: string, passwordHash: string, role: string, grade?: string) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(
      'INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, full_name as "fullName", email, role',
      [fullName, email, passwordHash, role]
    );
    const user = result.rows[0];

    if (role === 'student' && grade) {
      await client.query(
        'INSERT INTO student_profiles (user_id, student_info) VALUES ($1, $2)',
        [user.id, JSON.stringify({ grade })]
      );
    }

    await client.query('COMMIT');
    return user;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

