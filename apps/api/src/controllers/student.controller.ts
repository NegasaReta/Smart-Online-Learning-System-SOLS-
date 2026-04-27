import { Request, Response } from 'express';
import * as StudentService from '../services/student.service';

export const getSubjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const subjects = await StudentService.getSubjects(userId);
    res.status(200).json(subjects);
  } catch (error: any) {
    if (error.message === 'Grade not found for student') {
      res.status(404).json({ error: error.message });
      return;
    }
    console.error('Error fetching subjects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLessons = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { subjectId } = req.params;
    const lessons = await StudentService.getLessons(userId, subjectId);
    res.status(200).json(lessons);
  } catch (error: any) {
    if (error.message === 'Grade not found for student' || error.message === 'Subject not found') {
      res.status(404).json({ error: error.message });
      return;
    }
    if (error.message === 'Unauthorized access to subject from another grade') {
      res.status(403).json({ error: error.message });
      return;
    }
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { lessonId } = req.params;
    const videos = await StudentService.getVideos(userId, lessonId);
    res.status(200).json(videos);
  } catch (error: any) {
    if (error.message === 'Grade not found for student' || error.message === 'Lesson not found' || error.message === 'Subject not found') {
      res.status(404).json({ error: error.message });
      return;
    }
    if (error.message === 'Unauthorized access to materials from another grade') {
      res.status(403).json({ error: error.message });
      return;
    }
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPdfs = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { lessonId } = req.params;
    const pdfs = await StudentService.getPdfs(userId, lessonId);
    res.status(200).json(pdfs);
  } catch (error: any) {
    if (error.message === 'Grade not found for student' || error.message === 'Lesson not found' || error.message === 'Subject not found') {
      res.status(404).json({ error: error.message });
      return;
    }
    if (error.message === 'Unauthorized access to materials from another grade') {
      res.status(403).json({ error: error.message });
      return;
    }
    console.error('Error fetching pdfs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
