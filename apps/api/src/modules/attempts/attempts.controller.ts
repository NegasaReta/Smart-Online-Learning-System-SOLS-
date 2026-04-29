import { Request, Response } from "express";
import {
  getAttemptsByQuiz,
  getAllAttemptsByUser,
  getAttemptStatus,
} from "./attempts.service";

// GET /api/attempts/user — logged in user sees all their attempts
export const getAllAttemptsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;

    const attempts = await getAllAttemptsByUser(authUser.userId);

    res.status(200).json({
      success: true,
      data: attempts,
    });
  } catch (error) {
    console.error("Error in getAllAttemptsController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/attempts/:quizId — get attempts for specific quiz
export const getAttemptsByQuizController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;
    const { quizId } = req.params;

    const attempts = await getAttemptsByQuiz(authUser.userId, quizId);

    res.status(200).json({
      success: true,
      data: attempts,
    });
  } catch (error) {
    console.error("Error in getAttemptsByQuizController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/attempts/:quizId/status — check if student can attempt quiz
export const getAttemptStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;
    const { quizId } = req.params;

    const status = await getAttemptStatus(authUser.userId, quizId);

    if (!status) {
      res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
      return;
    }

    // If student cannot attempt return 403
    if (!status.canAttempt) {
      res.status(403).json({
        success: false,
        message: `Maximum attempts (${status.maxAttempts}) reached for this quiz`,
        data: status,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: status,
    });
  } catch (error) {
    console.error("Error in getAttemptStatusController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};