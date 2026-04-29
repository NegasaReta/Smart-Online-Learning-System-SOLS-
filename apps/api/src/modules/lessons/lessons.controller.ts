import { Request, Response } from "express";
import {
  createLesson,
  getLessonsBySubject,
  getLessonById,
  updateLesson,
  deleteLesson,
  getNextOrderNo,
} from "./lessons.service";

// POST /api/lessons
export const createLessonController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { subjectId, title, description, orderNo } = req.body;

    if (!subjectId || !title) {
      res.status(400).json({
        success: false,
        message: "subjectId and title are required",
      });
      return;
    }

    // Auto assign order number if not provided
    const finalOrderNo = orderNo ?? (await getNextOrderNo(subjectId));

    const lesson = await createLesson(
      subjectId,
      title,
      description,
      finalOrderNo
    );

    res.status(201).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    console.error("Error in createLessonController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/subjects/:id/lessons
export const getLessonsBySubjectController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const lessons = await getLessonsBySubject(id);

    res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    console.error("Error in getLessonsBySubjectController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/lessons/:id
export const getLessonByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const lesson = await getLessonById(id);

    if (!lesson) {
      res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    console.error("Error in getLessonByIdController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// PUT /api/lessons/:id
export const updateLessonController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, orderNo } = req.body;

    if (!title || !orderNo) {
      res.status(400).json({
        success: false,
        message: "title and orderNo are required",
      });
      return;
    }

    const lesson = await updateLesson(id, title, description, orderNo);

    if (!lesson) {
      res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    console.error("Error in updateLessonController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE /api/lessons/:id
export const deleteLessonController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await deleteLesson(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteLessonController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};