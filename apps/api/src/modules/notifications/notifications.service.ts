import { pool } from "../../db/index";

export interface Notification {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

// Create a notification
export async function createNotification(
  userId: string,
  message: string
): Promise<Notification> {
  const result = await pool.query(
    `INSERT INTO notifications (user_id, message)
     VALUES ($1, $2)
     RETURNING id, user_id AS "userId", message,
               is_read AS "isRead", created_at AS "createdAt"`,
    [userId, message]
  );
  return result.rows[0];
}

// Get all notifications for a user
export async function getNotificationsByUser(
  userId: string
): Promise<Notification[]> {
  const result = await pool.query(
    `SELECT id, user_id AS "userId", message,
            is_read AS "isRead", created_at AS "createdAt"
     FROM notifications
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
}

// Mark notification as read
export async function markAsRead(
  id: string,
  userId: string
): Promise<Notification | null> {
  const result = await pool.query(
    `UPDATE notifications
     SET is_read = true
     WHERE id = $1 AND user_id = $2
     RETURNING id, user_id AS "userId", message,
               is_read AS "isRead", created_at AS "createdAt"`,
    [id, userId]
  );
  if (result.rows.length === 0) return null;
  return result.rows[0];
}

// Mark all notifications as read for a user
export async function markAllAsRead(userId: string): Promise<boolean> {
  const result = await pool.query(
    `UPDATE notifications
     SET is_read = true
     WHERE user_id = $1`,
    [userId]
  );
  return (result.rowCount ?? 0) > 0;
}

// Delete a notification
export async function deleteNotification(
  id: string,
  userId: string
): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM notifications
     WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
  return (result.rowCount ?? 0) > 0;
}

// Get unread notification count
export async function getUnreadCount(userId: string): Promise<number> {
  const result = await pool.query(
    `SELECT COUNT(*) AS count
     FROM notifications
     WHERE user_id = $1 AND is_read = false`,
    [userId]
  );
  return parseInt(result.rows[0].count);
}