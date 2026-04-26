import { Router } from "express";
import {
  createCourseController,
  getCoursesByGradeController,
  getCourseByIdController,
  updateCourseController,
  deleteCourseController,
  assignTeacherController,
  getMyCourseController,
} from "../modules/courses/courses.controller";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const router = Router();

// POST /api/courses/subject — teacher only
router.post(
  "/subject",
  authenticateJWT,
  authorizeRoles("teacher"),
  createCourseController
);

// GET /api/courses/subjects?grade=10 — student, teacher, parent
router.get(
  "/subjects",
  authenticateJWT,
  authorizeRoles("student", "teacher", "parent", "admin"),
  getCoursesByGradeController
);

// GET /api/courses/my-courses — teacher only
router.get(
  "/my-courses",
  authenticateJWT,
  authorizeRoles("teacher"),
  getMyCourseController
);

// GET /api/courses/subjects/:id — all roles
router.get(
  "/subjects/:id",
  authenticateJWT,
  authorizeRoles("student", "teacher", "parent", "admin"),
  getCourseByIdController
);

// PUT /api/courses/subjects/:id — teacher only
router.put(
  "/subjects/:id",
  authenticateJWT,
  authorizeRoles("teacher"),
  updateCourseController
);

// DELETE /api/courses/subjects/:id — teacher only
router.delete(
  "/subjects/:id",
  authenticateJWT,
  authorizeRoles("teacher"),
  deleteCourseController
);

// POST /api/courses/assign-teacher — admin only
router.post(
  "/assign-teacher",
  authenticateJWT,
  authorizeRoles("admin"),
  assignTeacherController
);

export default router;