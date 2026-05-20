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
    
    // Parse the authenticated user's ID to a number
    const userId = parseInt(authUser.userId, 10);

    const attempts = await getAllAttemptsByUser(userId);

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

    // Parse string parameters to numbers
    const userId = parseInt(authUser.userId, 10);
    const parsedQuizId = parseInt(quizId, 10);

    // Validate that the quiz ID is a valid number
    if (isNaN(parsedQuizId)) {
      res.status(400).json({
        success: false,
        message: "Invalid quiz ID format",
      });
      return;
    }

    const attempts = await getAttemptsByQuiz(userId, parsedQuizId);

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

    // Parse string parameters to numbers
    const userId = parseInt(authUser.userId, 10);
    const parsedQuizId = parseInt(quizId, 10);

    // Validate that the quiz ID is a valid number
    if (isNaN(parsedQuizId)) {
      res.status(400).json({
        success: false,
        message: "Invalid quiz ID format",
      });
      return;
    }

    const status = await getAttemptStatus(userId, parsedQuizId);

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
