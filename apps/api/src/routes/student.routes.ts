import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { authorizeRoles } from '../middlewares/authorizeRoles';
import * as StudentController from '../controllers/student.controller';

const router = Router();

// Protect all routes and allow only students
router.use(authenticateJWT, authorizeRoles('student'));

router.get('/subjects', StudentController.getSubjects);
router.get('/subjects/:subjectId/lessons', StudentController.getLessons);
router.get('/lessons/:lessonId/videos', StudentController.getVideos);
router.get('/lessons/:lessonId/pdfs', StudentController.getPdfs);

// Interaction endpoints
import * as InteractionController from '../controllers/interaction.controller';

router.get('/quizzes/:id', InteractionController.getQuiz);
router.post('/quizzes/:id/submit', InteractionController.submitQuiz);
router.get('/assignments', InteractionController.getAssignments);
router.post('/assignments/:id/submit', InteractionController.submitAssignment);
router.post('/videos/:id/progress', InteractionController.updateVideoProgress);

// Dashboard, Progress, Notifications & Profile
import * as DashboardController from '../controllers/dashboard.controller';

router.get('/progress', DashboardController.getProgress);
router.get('/dashboard', DashboardController.getDashboard);

router.get('/notifications', DashboardController.getNotifications);
router.patch('/notifications/:id', DashboardController.markNotificationRead);

router.post('/link-parent', DashboardController.linkParent);

router.get('/profile', DashboardController.getProfile);
router.put('/profile', DashboardController.updateProfile);

export default router;
