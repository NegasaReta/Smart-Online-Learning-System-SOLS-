import { Request, Response } from "express";
import {
  createCourse,
  getCoursesByGrade,
  getCourseById,
  getAllCourses,
  updateCourse,
  deleteCourse,
} from "./courses.service";

// POST /api/courses/subjects
export const createCourseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, grade, description } = req.body;

    if (!name || !grade) {
      res.status(400).json({
        success: false,
        message: "name and grade are required",
      });
      return;
    }

    const course = await createCourse(name, grade, description);

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Error in createCourseController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/courses/subjects?grade=Grade 10
export const getCoursesByGradeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const grade = req.query.grade as string;

    if (!grade) {
      res.status(400).json({
        success: false,
        message: "grade query parameter is required e.g. ?grade=Grade 10",
      });
      return;
    }

    const courses = await getCoursesByGrade(grade);

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error in getCoursesByGradeController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/courses/subjects/all
export const getAllCoursesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courses = await getAllCourses();

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error in getAllCoursesController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/courses/subjects/:id
export const getCourseByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const course = await getCourseById(id);

    if (!course) {
      res.status(404).json({
        success: false,
        message: "Subject not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Error in getCourseByIdController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// PUT /api/courses/subjects/:id
export const updateCourseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, grade, description } = req.body;

    if (!name || !grade) {
      res.status(400).json({
        success: false,
        message: "name and grade are required",
      });
      return;
    }

    const course = await updateCourse(id, name, grade, description);

    if (!course) {
      res.status(404).json({
        success: false,
        message: "Subject not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Error in updateCourseController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE /api/courses/subjects/:id
export const deleteCourseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteCourse(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Subject not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteCourseController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};