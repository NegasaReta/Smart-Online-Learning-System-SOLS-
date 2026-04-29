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

    const summary = await getProgressSummary(authUser.userId);

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

    const progress = await getProgressBySubject(authUser.userId, id);

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

    const progress = await getStudentProgress(id);

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