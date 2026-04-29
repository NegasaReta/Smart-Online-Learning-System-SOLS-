import { Router } from "express";
import {
  createNotificationController,
  getNotificationsController,
  getUnreadCountController,
  markAsReadController,
  markAllAsReadController,
  deleteNotificationController,
} from "../modules/notifications/notifications.controller";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const router = Router();

// POST /api/notifications — teacher or admin creates notification
router.post(
  "/",
  authenticateJWT,
  authorizeRoles("teacher", "admin"),
  createNotificationController
);

// GET /api/notifications — user gets their own notifications
router.get(
  "/",
  authenticateJWT,
  authorizeRoles("student", "teacher", "parent", "admin"),
  getNotificationsController
);

// GET /api/notifications/unread-count — get unread badge count
router.get(
  "/unread-count",
  authenticateJWT,
  authorizeRoles("student", "teacher", "parent", "admin"),
  getUnreadCountController
);

// PATCH /api/notifications/mark-all-read — mark all as read
router.patch(
  "/mark-all-read",
  authenticateJWT,
  authorizeRoles("student", "teacher", "parent", "admin"),
  markAllAsReadController
);

// PATCH /api/notifications/:id — mark single as read
router.patch(
  "/:id",
  authenticateJWT,
  authorizeRoles("student", "teacher", "parent", "admin"),
  markAsReadController
);

// DELETE /api/notifications/:id — delete notification
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("student", "teacher", "parent", "admin"),
  deleteNotificationController
);

export default router;