import { Router } from "express";
import {
  getAllAttemptsController,
  getAttemptsByQuizController,
  getAttemptStatusController,
} from "../modules/attempts/attempts.controller";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const router = Router();

// GET /api/attempts/user — student sees all their attempts
router.get(
  "/user",
  authenticateJWT,
  authorizeRoles("student"),
  getAllAttemptsController
);

// GET /api/attempts/:quizId/status — check if student can attempt quiz
router.get(
  "/:quizId/status",
  authenticateJWT,
  authorizeRoles("student"),
  getAttemptStatusController
);

// GET /api/attempts/:quizId — get attempts for specific quiz
router.get(
  "/:quizId",
  authenticateJWT,
  authorizeRoles("student", "teacher", "admin"),
  getAttemptsByQuizController
);

export default router;