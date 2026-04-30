import * as NotificationModel from '../models/notification.model';
import { emitToUser } from '../lib/socket';

export const notifyUser = async (userId: string, message: string, type?: string) => {
  const notification = await NotificationModel.createNotification(userId, message, type);
  
  // Real-time alert
  emitToUser(userId, 'notification', notification);
  
  return notification;
};

export const getNotifications = async (userId: string) => {
  return await NotificationModel.getNotificationsByUserId(userId);
};

export const markAsRead = async (notificationId: string, userId: string) => {
  await NotificationModel.markNotificationAsRead(notificationId, userId);
};
