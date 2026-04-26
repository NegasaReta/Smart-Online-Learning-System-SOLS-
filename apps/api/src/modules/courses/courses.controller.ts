import { Request, Response } from "express";
import {
  createCourse,
  getCoursesByGrade,
  getCourseById,
  updateCourse,
  deleteCourse,
  assignTeacher,
  getCoursesByTeacher,
} from "./courses.service";

// POST /api/courses/subject — teacher creates a subject
export const createCourseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;
    const { subjectName, grade, description, language } = req.body;

    if (!subjectName || !grade) {
      res.status(400).json({
        success: false,
        message: "subjectName and grade are required",
      });
      return;
    }

    const course = await createCourse(
      subjectName,
      grade,
      description,
      authUser.userId,
      language
    );

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

// GET /api/courses/subjects?grade=10 — get courses by grade
export const getCoursesByGradeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const grade = parseInt(req.query.grade as string);

    if (!grade || grade < 1 || grade > 12) {
      res.status(400).json({
        success: false,
        message: "Valid grade between 1 and 12 is required",
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

// GET /api/courses/subjects/:id — get single course
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
        message: "Course not found",
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

// PUT /api/courses/subjects/:id — teacher updates course
export const updateCourseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;
    const { id } = req.params;
    const { subjectName, grade, description, language } = req.body;

    if (!subjectName || !grade) {
      res.status(400).json({
        success: false,
        message: "subjectName and grade are required",
      });
      return;
    }

    const course = await updateCourse(
      id,
      authUser.userId,
      subjectName,
      grade,
      description,
      language
    );

    if (!course) {
      res.status(404).json({
        success: false,
        message: "Course not found or you are not the owner",
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

// DELETE /api/courses/subjects/:id — teacher deletes course
export const deleteCourseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;
    const { id } = req.params;

    const deleted = await deleteCourse(id, authUser.userId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Course not found or you are not the owner",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteCourseController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// POST /api/courses/assign-teacher — assign teacher to course
export const assignTeacherController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { courseId, teacherId } = req.body;

    if (!courseId || !teacherId) {
      res.status(400).json({
        success: false,
        message: "courseId and teacherId are required",
      });
      return;
    }

    const course = await assignTeacher(courseId, teacherId);

    if (!course) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Error in assignTeacherController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/courses/my-courses — teacher sees their own courses
export const getMyCourseController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authUser = (req as any).auth;

    const courses = await getCoursesByTeacher(authUser.userId);

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error in getMyCourseController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};