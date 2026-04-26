// apps/api/src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 1. Tell TypeScript that our Request has a 'user' property
export interface AuthRequest extends Request {
    user?: any;
}

// 2. Verify the JWT Token
export const verifyJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Session expired or invalid token. Please log in again.' });
    }
};

// 3. Role Guard (The part that got cut off)
export const requireRole = (allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        // Check if the user exists on the request and if their role is in the allowed list
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            res.status(403).json({ message: 'Forbidden. You do not have the required permissions.' });
            return;
        }
        next(); // User has the right role, continue to the controller
    };
};