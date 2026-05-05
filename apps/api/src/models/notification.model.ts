import { pool } from '../db/index';

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type?: string;
  isRead: boolean;
  createdAt: string;
}

export const createNotification = async (userId: string, message: string, type?: string): Promise<Notification> => {
  const result = await pool.query(
    'INSERT INTO notifications (user_id, message, type) VALUES ($1, $2, $3) RETURNING id, user_id as "userId", message, type, is_read as "isRead", created_at as "createdAt"',
    [userId, message, type]
  );
  return result.rows[0];
};

export const getNotificationsByUserId = async (userId: string): Promise<Notification[]> => {
  const result = await pool.query(
    'SELECT id, user_id as "userId", message, type, is_read as "isRead", created_at as "createdAt" FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};

export const markNotificationAsRead = async (notificationId: string, userId: string): Promise<void> => {
  await pool.query('UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2', [notificationId, userId]);
};
