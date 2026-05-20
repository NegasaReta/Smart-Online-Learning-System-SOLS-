import { Request, Response } from 'express';
import * as ScheduleService from '../services/schedule.service';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).auth.userId;
    const { view, date } = req.query;
    const events = await ScheduleService.getEvents(userId, date as string, view as string);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedule events', error: (error as any).message });
  }
};

export const getUpcomingEvents = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).auth.userId;
    const { limit } = req.query;
    const events = await ScheduleService.getUpcomingEvents(userId, limit ? parseInt(limit as string, 10) : 20);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming events', error: (error as any).message });
  }
};

export const exportIcs = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).auth.userId;
    const icsContent = await ScheduleService.exportIcs(userId);
    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename=schedule.ics');
    res.send(icsContent);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting calendar', error: (error as any).message });
  }
};
