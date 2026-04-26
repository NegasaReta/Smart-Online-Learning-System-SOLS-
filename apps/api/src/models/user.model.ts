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

export const registerUser = async (fullName: string, email: string, passwordHash: string, role: string) => {
  const result = await pool.query(
    'INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, full_name as "fullName", email, role',
    [fullName, email, passwordHash, role]
  );
  return result.rows[0];
};
