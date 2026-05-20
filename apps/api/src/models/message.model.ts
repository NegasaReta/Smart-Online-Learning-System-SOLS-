import { pool } from '../db/index';

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  courseSlug?: string;
  subject: string;
  body: string;
  createdAt: string;
}

export const createMessage = async (message: Omit<Message, 'id' | 'createdAt'>): Promise<Message> => {
  const result = await pool.query(
    'INSERT INTO messages (sender_id, recipient_id, course_slug, subject, body) VALUES ($1, $2, $3, $4, $5) RETURNING id, sender_id as "senderId", recipient_id as "recipientId", course_slug as "courseSlug", subject, body, created_at as "createdAt"',
    [message.senderId, message.recipientId, message.courseSlug, message.subject, message.body]
  );
  return result.rows[0];
};

export const getMessagesByUserId = async (userId: string): Promise<Message[]> => {
  const result = await pool.query(
    'SELECT id, sender_id as "senderId", recipient_id as "recipientId", course_slug as "courseSlug", subject, body, created_at as "createdAt" FROM messages WHERE sender_id = $1 OR recipient_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};
