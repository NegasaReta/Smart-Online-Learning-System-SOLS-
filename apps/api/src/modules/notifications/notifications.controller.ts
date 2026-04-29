import { Request, Response } from "express";
import {
  createNotification,
  getNotificationsByUser,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} from "./notifications.service";

// POST /api/notifications
export const createNotificationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      res.status(400).json({
        success: false,
        message: "userId and message are required",
      });
      return;
    }

    const notification = await createNotification(userId, message);

    res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error("Error in createNotificationController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/notifications
export const getNotificationsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;

    const notifications = await getNotificationsByUser(authUser.userId);

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error("Error in getNotificationsController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/notifications/unread-count
export const getUnreadCountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;

    const count = await getUnreadCount(authUser.userId);

    res.status(200).json({
      success: true,
      data: { unreadCount: count },
    });
  } catch (error) {
    console.error("Error in getUnreadCountController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// PATCH /api/notifications/:id
export const markAsReadController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;
    const { id } = req.params;

    const notification = await markAsRead(id, authUser.userId);

    if (!notification) {
      res.status(404).json({
        success: false,
        message: "Notification not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error("Error in markAsReadController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// PATCH /api/notifications/mark-all-read
export const markAllAsReadController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;

    await markAllAsRead(authUser.userId);

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Error in markAllAsReadController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE /api/notifications/:id
export const deleteNotificationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;
    const { id } = req.params;

    const deleted = await deleteNotification(id, authUser.userId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Notification not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteNotificationController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};