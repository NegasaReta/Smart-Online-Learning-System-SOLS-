import { Router } from "express";
import {
  createCourseController,
  getCoursesByGradeController,
  getCourseByIdController,
  getAllCoursesController,
  updateCourseController,
  deleteCourseController,
} from "../modules/courses/courses.controller";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const router = Router();

// POST /api/courses/subjects — teacher or admin creates subject
router.post(
  "/subjects",
  authenticateJWT,
  authorizeRoles("teacher", "admin"),
  createCourseController
);

// GET /api/courses/subjects?grade=Grade 10 — all roles
router.get(
  "/subjects",
  authenticateJWT,
  authorizeRoles("student", "teacher", "parent", "admin"),
  getCoursesByGradeController
);

// GET /api/courses/subjects/all — all subjects (teacher/admin)
router.get(
  "/subjects/all",
  authenticateJWT,
  authorizeRoles("teacher", "admin"),
  getAllCoursesController
);

// GET /api/courses/subjects/:id — single subject
router.get(
  "/subjects/:id",
  authenticateJWT,
  authorizeRoles("student", "teacher", "parent", "admin"),
  getCourseByIdController
);

// PUT /api/courses/subjects/:id — teacher or admin updates
router.put(
  "/subjects/:id",
  authenticateJWT,
  authorizeRoles("teacher", "admin"),
  updateCourseController
);

// DELETE /api/courses/subjects/:id — admin only
router.delete(
  "/subjects/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  deleteCourseController
);

export default router;