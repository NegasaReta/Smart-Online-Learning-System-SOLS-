import * as CourseModel from '../models/course.model';
import * as LessonModel from '../models/lesson.model';
import * as DashboardModel from '../models/dashboard.model';
import * as AssignmentModel from '../models/assignment.model';
import * as GradeModel from '../models/grade.model';

// Course Services
export const getClasses = async (userId: string) => {
  return await CourseModel.getAllCourses(userId);
};

export const getCourseDetails = async (slug: string, userId: string) => {
  return await CourseModel.getCourseBySlug(slug, userId);
};

// Dashboard Services
export const getProgressOverview = async (userId: string) => {
  return await DashboardModel.getProgressOverview(userId);
};

export const getCurrentCourses = async (userId: string) => {
  return await DashboardModel.getCurrentCourses(userId);
};

export const getUpcomingTasks = async (userId: string) => {
  return await DashboardModel.getUpcomingTasks(userId);
};

export const getRecentGrades = async (userId: string) => {
  return await GradeModel.getRecentGrades(userId, 5);
};

// Lesson Player Services
export const getLesson = async (slug: string, lessonId: string, userId: string) => {
  return await LessonModel.getLessonWithDetails(slug, lessonId, userId);
};

export const markLessonComplete = async (userId: string, lessonId: string, completed: boolean) => {
  return await LessonModel.completeLesson(userId, lessonId, completed);
};

// Assignment Services
export const getAssignments = async (userId: string) => {
  return await AssignmentModel.getStudentAssignments(userId);
};

export const getAssignment = async (assignmentId: string, userId: string) => {
  return await AssignmentModel.getAssignmentById(assignmentId, userId);
};

export const submitAssignment = async (userId: string, assignmentId: string, fileUrl: string) => {
  return await AssignmentModel.submitAssignment(userId, assignmentId, fileUrl);
};

// Grade Services
export const getGrades = async (userId: string) => {
  return await GradeModel.getStudentGrades(userId);
};
