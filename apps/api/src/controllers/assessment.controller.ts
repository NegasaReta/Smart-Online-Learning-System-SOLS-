import { Request, Response } from 'express';
import * as AssessmentService from '../services/assessment.service';

export const getAssessments = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).auth.userId;
    const assessments = await AssessmentService.getAssessments(userId);
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assessments', error: (error as any).message });
  }
};

export const getAssessment = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).auth.userId;
    const { id } = req.params;
    const assessment = await AssessmentService.getAssessment(id, userId);
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' });
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assessment', error: (error as any).message });
  }
};

export const submitAssessment = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).auth.userId;
    const { id } = req.params;
    const { answers, timeTakenSeconds } = req.body;
    const result = await AssessmentService.submitAssessment(userId, id, answers, timeTakenSeconds);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting assessment', error: (error as any).message });
  }
};
