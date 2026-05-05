import { Request, Response } from 'express';
import * as NotificationService from '../services/notification.service';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const notifications = await NotificationService.getNotifications(userId);
    res.json(notifications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    const { notificationId } = req.params;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    await NotificationService.markAsRead(notificationId, userId);
    res.json({ message: 'Notification marked as read' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
