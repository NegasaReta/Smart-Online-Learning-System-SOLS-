import { Router } from "express";
import {
  getProgressSummaryController,
  getSubjectProgressController,
  getStudentProgressController,
} from "../modules/progress/progress.controller";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const router = Router();

// GET /api/progress/summary — student sees own overall progress
router.get(
  "/summary",
  authenticateJWT,
  authorizeRoles("student"),
  getProgressSummaryController
);

// GET /api/progress/subject/:id — student sees progress per subject
router.get(
  "/subject/:id",
  authenticateJWT,
  authorizeRoles("student"),
  getSubjectProgressController
);

// GET /api/progress/student/:id — teacher or parent views student progress
router.get(
  "/student/:id",
  authenticateJWT,
  authorizeRoles("teacher", "parent", "admin"),
  getStudentProgressController
);

export default router;