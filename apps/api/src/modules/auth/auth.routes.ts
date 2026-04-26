// apps/api/src/modules/auth/auth.routes.ts
import { Router } from 'express';
import { registerTeacher, loginTeacher, logoutTeacher } from './auth.controller';
import { verifyJWT } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/teacher/register', registerTeacher);
router.post('/teacher/login', loginTeacher);
router.post('/teacher/logout', verifyJWT, logoutTeacher);

export default router;