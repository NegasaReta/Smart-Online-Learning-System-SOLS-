import * as StudentModel from '../models/student.model';

export const getSubjects = async (userId: string) => {
  const grade = await StudentModel.getStudentGrade(userId);
  if (!grade) {
    throw new Error('Grade not found for student');
  }
  return await StudentModel.getSubjectsByGrade(grade);
};

export const getLessons = async (userId: string, subjectId: string) => {
  const grade = await StudentModel.getStudentGrade(userId);
  if (!grade) {
    throw new Error('Grade not found for student');
  }

  const subject = await StudentModel.getSubjectById(subjectId);
  if (!subject) {
    throw new Error('Subject not found');
  }

  if (subject.grade !== grade) {
    throw new Error('Unauthorized access to subject from another grade');
  }

  return await StudentModel.getLessonsBySubjectId(subjectId);
};

export const getVideos = async (userId: string, lessonId: string) => {
  const grade = await StudentModel.getStudentGrade(userId);
  if (!grade) {
    throw new Error('Grade not found for student');
  }

  const lesson = await StudentModel.getLessonById(lessonId);
  if (!lesson) {
    throw new Error('Lesson not found');
  }

  const subject = await StudentModel.getSubjectById(lesson.subject_id);
  if (!subject) {
    throw new Error('Subject not found');
  }

  if (subject.grade !== grade) {
    throw new Error('Unauthorized access to materials from another grade');
  }

  return await StudentModel.getVideosByLessonId(lessonId);
};

export const getPdfs = async (userId: string, lessonId: string) => {
  const grade = await StudentModel.getStudentGrade(userId);
  if (!grade) {
    throw new Error('Grade not found for student');
  }

  const lesson = await StudentModel.getLessonById(lessonId);
  if (!lesson) {
    throw new Error('Lesson not found');
  }

  const subject = await StudentModel.getSubjectById(lesson.subject_id);
  if (!subject) {
    throw new Error('Subject not found');
  }

  if (subject.grade !== grade) {
    throw new Error('Unauthorized access to materials from another grade');
  }

  return await StudentModel.getPdfsByLessonId(lessonId);
};
