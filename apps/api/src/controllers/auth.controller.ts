import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, role, grade } = req.body;

    if (!fullName || !email || !password || !role) {
      res.status(400).json({ error: 'fullName, email, password, and role are required' });
      return;
    }

    if (role === 'student' && !grade) {
      res.status(400).json({ error: 'grade is required for student role' });
      return;
    }

    const user = await AuthService.registerUser(fullName, email, password, role, grade);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error: any) {
    if (error.message === 'Email already exists') {
      res.status(400).json({ error: error.message });
      return;
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const { token, user } = await AuthService.login(email, password);
    res.status(200).json({ token, user });
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      res.status(401).json({ error: error.message });
      return;
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMe = (req: Request, res: Response): void => {
  res.status(200).json(req.auth);
};
