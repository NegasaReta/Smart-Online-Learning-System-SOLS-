// apps/api/src/modules/auth/auth.controller.ts

import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

export const getSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Samford-Zed's Clerk middleware will likely attach auth info to 'req.auth'
        // We use '(req as any)' temporarily to avoid TypeScript errors until his types are merged
        const clerkAuthData = (req as any).auth;

        const sessionSummary = await AuthService.getSessionSummary(clerkAuthData);

        res.status(200).json({
            success: true,
            data: sessionSummary
        });
    } catch (error) {
        // Pass any errors to NegasaReta's authErrorHandler
        next(error);
    }
};

export const logoutSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AuthService.logout();

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};