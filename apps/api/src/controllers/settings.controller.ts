import { Request, Response } from 'express';
import * as SettingsService from '../services/settings.service';

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await SettingsService.updatePassword(userId, currentPassword, newPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getPreferences = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const preferences = await SettingsService.getPreferences(userId);
    res.json(preferences);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const updated = await SettingsService.updatePreferences(userId, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAcademic = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const academic = await SettingsService.getAcademicSettings(userId);
    res.json(academic);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAcademic = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const updated = await SettingsService.updateAcademicSettings(userId, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSessions = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const sessions = await SettingsService.getSessions(userId);
    res.json(sessions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    const { sessionId } = req.params;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    await SettingsService.terminateSession(userId, sessionId);
    res.json({ message: 'Session terminated' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const enable2FA = async (req: Request, res: Response) => {
  // Simulated 2FA enabling
  res.json({ message: '2FA enabled successfully (simulated)' });
};

export const disable2FA = async (req: Request, res: Response) => {
  // Simulated 2FA disabling
  res.json({ message: '2FA disabled successfully (simulated)' });
};
