import { Router } from "express";
import {
  createLessonController,
  getLessonsBySubjectController,
  getLessonByIdController,
  updateLessonController,
  deleteLessonController,
} from "../modules/lessons/lessons.controller";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const router = Router();

// POST /api/lessons — teacher creates lesson
router.post(
  "/",
  authenticateJWT,
  authorizeRoles("teacher", "admin"),
  createLessonController
);

// GET /api/subjects/:id/lessons — all roles view lessons
router.get(
  "/subjects/:id/lessons",
  authenticateJWT,
  authorizeRoles("student", "teacher", "parent", "admin"),
  getLessonsBySubjectController
);

// GET /api/lessons/:id — single lesson
router.get(
  "/:id",
  authenticateJWT,
  authorizeRoles("student", "teacher", "parent", "admin"),
  getLessonByIdController
);

// PUT /api/lessons/:id — teacher updates lesson
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("teacher", "admin"),
  updateLessonController
);

// DELETE /api/lessons/:id — admin only
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  deleteLessonController
);

export default router;