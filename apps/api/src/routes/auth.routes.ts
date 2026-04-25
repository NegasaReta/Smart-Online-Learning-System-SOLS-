// apps/api/src/routes/auth.routes.ts

import { Router } from 'express';
import { getSession, logoutSession } from '../modules/auth/auth.controller';

// Note: @Samford-Zed is building the authenticateClerk middleware.
// Once his branch is merged, this will be imported like this:
// import { authenticateClerk } from '../middlewares/authenticateClerk';

const router = Router();

// GET /api/auth/session
// Later, add 'authenticateClerk' as the second argument to protect this route
router.get('/session', getSession);

// POST /api/auth/logout
router.post('/logout', logoutSession);

export default router;