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
  authorizeRoles("Teacher"),
  createCourseController
);

// GET /api/courses/subjects?grade=10 — student, teacher, parent
router.get(
  "/subjects",
  authenticateJWT,
  authorizeRoles("Student", "Teacher", "Parent", "Admin"),
  getCoursesByGradeController
);

// GET /api/courses/my-courses — teacher only
router.get(
  "/my-courses",
  authenticateJWT,
  authorizeRoles("Teacher"),
  getMyCourseController
);

// GET /api/courses/subjects/:id — all roles
router.get(
  "/subjects/:id",
  authenticateJWT,
  authorizeRoles("Student", "Teacher", "Parent", "Admin"),
  getCourseByIdController
);

// PUT /api/courses/subjects/:id — teacher only
router.put(
  "/subjects/:id",
  authenticateJWT,
  authorizeRoles("Teacher"),
  updateCourseController
);

// DELETE /api/courses/subjects/:id — teacher only
router.delete(
  "/subjects/:id",
  authenticateJWT,
  authorizeRoles("Teacher"),
  deleteCourseController
);

// POST /api/courses/assign-teacher — admin only
router.post(
  "/assign-teacher",
  authenticateJWT,
  authorizeRoles("Admin"),
  assignTeacherController
);

export default router;