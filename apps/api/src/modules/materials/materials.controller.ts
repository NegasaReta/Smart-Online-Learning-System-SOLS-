import { Request, Response } from "express";
import {
  addVideo,
  addPdf,
  getMaterialsByLesson,
  deleteVideo,
  deletePdf,
} from "./materials.service";

// POST /api/lessons/:id/videos — teacher adds video to lesson
export const addVideoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;

    const lessonId = parseInt(id, 10);

    if (isNaN(lessonId)) {
      res.status(400).json({
        success: false,
        message: "Invalid lesson ID format",
      });
      return;
    }

    if (!title || !url) {
      res.status(400).json({
        success: false,
        message: "title and url are required",
      });
      return;
    }

    const video = await addVideo(lessonId, title, url);

    res.status(201).json({
      success: true,
      data: video,
    });
  } catch (error) {
    console.error("Error in addVideoController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// POST /api/lessons/:id/pdfs — teacher adds PDF to lesson
export const addPdfController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;

    const lessonId = parseInt(id, 10);

    if (isNaN(lessonId)) {
      res.status(400).json({
        success: false,
        message: "Invalid lesson ID format",
      });
      return;
    }

    if (!title || !url) {
      res.status(400).json({
        success: false,
        message: "title and url are required",
      });
      return;
    }

    const pdf = await addPdf(lessonId, title, url);

    res.status(201).json({
      success: true,
      data: pdf,
    });
  } catch (error) {
    console.error("Error in addPdfController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/lessons/:id/materials — get all materials for a lesson
export const getMaterialsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const lessonId = parseInt(id, 10);

    if (isNaN(lessonId)) {
      res.status(400).json({
        success: false,
        message: "Invalid lesson ID format",
      });
      return;
    }

    const materials = await getMaterialsByLesson(lessonId);

    res.status(200).json({
      success: true,
      data: materials,
    });
  } catch (error) {
    console.error("Error in getMaterialsController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE /api/lessons/videos/:id — delete video
export const deleteVideoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const videoId = parseInt(id, 10);

    if (isNaN(videoId)) {
      res.status(400).json({
        success: false,
        message: "Invalid video ID format",
      });
      return;
    }

    const deleted = await deleteVideo(videoId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Video not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteVideoController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE /api/lessons/pdfs/:id — delete PDF
export const deletePdfController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const pdfId = parseInt(id, 10);

    if (isNaN(pdfId)) {
      res.status(400).json({
        success: false,
        message: "Invalid PDF ID format",
      });
      return;
    }

    const deleted = await deletePdf(pdfId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "PDF not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "PDF deleted successfully",
    });
  } catch (error) {
    console.error("Error in deletePdfController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
