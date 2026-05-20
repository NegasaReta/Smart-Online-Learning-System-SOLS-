import * as AssessmentModel from '../models/assessment.model';

export const getAssessments = async (userId: string) => {
  return await AssessmentModel.getStudentAssessments(userId);
};

export const getAssessment = async (assessmentId: string, userId: string) => {
  return await AssessmentModel.getAssessmentById(assessmentId, userId);
};

export const submitAssessment = async (
  userId: string, 
  assessmentId: string, 
  answers: { questionId: string, selectedIndex: number }[],
  timeTakenSeconds: number
) => {
  return await AssessmentModel.submitAssessment(userId, assessmentId, answers, timeTakenSeconds);
};
