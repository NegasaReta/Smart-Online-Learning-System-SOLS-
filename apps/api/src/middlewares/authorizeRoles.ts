import { Request, Response, NextFunction } from 'express';

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.auth || !req.auth.role) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!allowedRoles.includes(req.auth.role)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    next();
  };
};
