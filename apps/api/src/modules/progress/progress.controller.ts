import { Request, Response } from "express";
import {
  getProgressBySubject,
  getProgressSummary,
  getStudentProgress,
} from "./progress.service";

// GET /api/progress/summary — logged in student sees own summary
export const getProgressSummaryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;
    
    // Parse the authenticated user's ID to a number
    const userId = parseInt(authUser.userId, 10);

    const summary = await getProgressSummary(userId);

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Error in getProgressSummaryController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/progress/subject/:id — progress for specific subject
export const getSubjectProgressController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;
    const { id } = req.params;

    // Parse both IDs from strings to numbers
    const userId = parseInt(authUser.userId, 10);
    const subjectId = parseInt(id, 10);

    // Validate that the subject ID is a valid number
    if (isNaN(subjectId)) {
      res.status(400).json({
        success: false,
        message: "Invalid subject ID format",
      });
      return;
    }

    const progress = await getProgressBySubject(userId, subjectId);

    if (!progress) {
      res.status(404).json({
        success: false,
        message: "Subject not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error("Error in getSubjectProgressController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/progress/student/:id — teacher or parent views student progress
export const getStudentProgressController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Parse the student ID from string to number
    const studentId = parseInt(id, 10);

    // Validate that the student ID is a valid number
    if (isNaN(studentId)) {
      res.status(400).json({
        success: false,
        message: "Invalid student ID format",
      });
      return;
    }

    const progress = await getStudentProgress(studentId);

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error("Error in getStudentProgressController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
