import { Request, Response } from 'express';
import * as MessageService from '../services/message.service';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { recipientId, courseSlug, subject, body } = req.body;
    const senderId = req.auth?.userId;

    if (!senderId) return res.status(401).json({ error: 'Unauthorized' });

    const message = await MessageService.sendMessage(senderId, recipientId, courseSlug, subject, body);
    res.status(201).json(message);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const messages = await MessageService.getMessages(userId);
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
