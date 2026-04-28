import { Request, Response } from 'express';
import * as ResourceService from '../services/resource.service';

export const getResources = async (req: Request, res: Response) => {
  try {
    const { subject, type, page, limit } = req.query;
    const resources = await ResourceService.getResources(
      subject as string, 
      type as string, 
      page ? parseInt(page as string, 10) : 1, 
      limit ? parseInt(limit as string, 10) : 8
    );
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources', error: (error as any).message });
  }
};

export const getRecentResources = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).auth.userId;
    const resources = await ResourceService.getRecentResources(userId);
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent resources', error: (error as any).message });
  }
};

export const getResourceSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await ResourceService.getResourceSubjects();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resource subjects', error: (error as any).message });
  }
};

export const requestResource = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).auth.userId;
    const { title, subject, description } = req.body;
    const request = await ResourceService.requestResource(userId, title, subject, description);
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error requesting resource', error: (error as any).message });
  }
};
