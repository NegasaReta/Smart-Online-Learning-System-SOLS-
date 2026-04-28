import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { authorizeRoles } from '../middlewares/authorizeRoles';
import * as StudentController from '../controllers/student.controller';
import { upload } from '../lib/upload';

const router = Router();

// Protect all routes and allow only students
router.use(authenticateJWT, authorizeRoles('student'));

// 1. COURSES MODULE
router.get('/classes', StudentController.getClasses);
router.get('/classes/:slug', StudentController.getCourseDetails);

// 2. DASHBOARD
router.get('/progress/overview', StudentController.getProgressOverview);
router.get('/courses/current', StudentController.getCurrentCourses);
router.get('/tasks/upcoming', StudentController.getUpcomingTasks);
router.get('/grades/recent', StudentController.getRecentGrades);

// 3. LESSON PLAYER API
router.get('/classes/:slug/lessons/:lessonId', StudentController.getLesson);
router.patch('/classes/:slug/lessons/:lessonId/complete', StudentController.markLessonComplete);

// 4. ASSIGNMENTS UPGRADE
router.get('/assignments', StudentController.getAssignments);
router.get('/assignments/:id', StudentController.getAssignment);
router.post('/assignments/:id/submit', upload.single('file'), StudentController.submitAssignment);

// 5. BASIC GRADES MODULE
router.get('/grades', StudentController.getGrades);

// --- PHASE 2 MODULES ---

// 6. ASSESSMENTS SYSTEM
import * as AssessmentController from '../controllers/assessment.controller';
router.get('/assessments', AssessmentController.getAssessments);
router.get('/assessments/:id', AssessmentController.getAssessment);
router.post('/assessments/:id/submit', AssessmentController.submitAssessment);

// 7. SCHEDULE / CALENDAR SYSTEM
import * as ScheduleController from '../controllers/schedule.controller';
router.get('/schedule/events', ScheduleController.getEvents);
router.get('/schedule/upcoming', ScheduleController.getUpcomingEvents);
router.get('/schedule/export.ics', ScheduleController.exportIcs);

// 8. RESOURCES LIBRARY
import * as ResourceController from '../controllers/resource.controller';
router.get('/resources', ResourceController.getResources);
router.get('/resources/recent', ResourceController.getRecentResources);
router.get('/resources/subjects', ResourceController.getResourceSubjects);
router.post('/resources/request', ResourceController.requestResource);

export default router;
