import { pool } from "../../db/index";

export interface SubjectProgress {
  subjectId: string;
  subjectName: string;
  grade: string;
  totalLessons: number;
  totalVideos: number;
  watchedVideos: number;
  totalQuizzes: number;
  passedQuizzes: number;
  totalAssignments: number;
  submittedAssignments: number;
  overallPercent: number;
}

export interface ProgressSummary {
  totalSubjects: number;
  overallPercent: number;
  subjectProgress: SubjectProgress[];
}

// Get progress for a student per subject
export async function getProgressBySubject(
  userId: string,
  subjectId: string
): Promise<SubjectProgress | null> {
  // Get subject info
  const subjectResult = await pool.query(
    `SELECT id, name, grade FROM subjects WHERE id = $1`,
    [subjectId]
  );
  if (subjectResult.rows.length === 0) return null;
  const subject = subjectResult.rows[0];

  // Get total lessons
  const lessonsResult = await pool.query(
    `SELECT COUNT(*) AS total FROM lessons WHERE subject_id = $1`,
    [subjectId]
  );
  const totalLessons = parseInt(lessonsResult.rows[0].total);

  // Get total videos and watched videos
  const videosResult = await pool.query(
    `SELECT 
      COUNT(v.id) AS total_videos,
      COUNT(vp.id) FILTER (WHERE vp.is_completed = true) AS watched_videos
     FROM lessons l
     LEFT JOIN videos v ON v.lesson_id = l.id
     LEFT JOIN video_progress vp ON vp.video_id = v.id AND vp.user_id = $1
     WHERE l.subject_id = $2`,
    [userId, subjectId]
  );
  const totalVideos = parseInt(videosResult.rows[0].total_videos);
  const watchedVideos = parseInt(videosResult.rows[0].watched_videos);

  // Get total quizzes and passed quizzes
  const quizzesResult = await pool.query(
    `SELECT
      COUNT(q.id) AS total_quizzes,
      COUNT(qs.id) FILTER (WHERE qs.score >= (qs.total_questions * 0.5)) AS passed_quizzes
     FROM lessons l
     LEFT JOIN quizzes q ON q.lesson_id = l.id
     LEFT JOIN quiz_submissions qs ON qs.quiz_id = q.id AND qs.user_id = $1
     WHERE l.subject_id = $2`,
    [userId, subjectId]
  );
  const totalQuizzes = parseInt(quizzesResult.rows[0].total_quizzes);
  const passedQuizzes = parseInt(quizzesResult.rows[0].passed_quizzes);

  // Get total assignments and submitted assignments
  const assignmentsResult = await pool.query(
    `SELECT
      COUNT(a.id) AS total_assignments,
      COUNT(asub.id) AS submitted_assignments
     FROM lessons l
     LEFT JOIN assignments a ON a.lesson_id = l.id
     LEFT JOIN assignment_submissions asub ON asub.assignment_id = a.id 
       AND asub.user_id = $1
     WHERE l.subject_id = $2`,
    [userId, subjectId]
  );
  const totalAssignments = parseInt(
    assignmentsResult.rows[0].total_assignments
  );
  const submittedAssignments = parseInt(
    assignmentsResult.rows[0].submitted_assignments
  );

  // Calculate overall percent
  const totalItems = totalVideos + totalQuizzes + totalAssignments;
  const completedItems = watchedVideos + passedQuizzes + submittedAssignments;
  const overallPercent =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return {
    subjectId: subject.id,
    subjectName: subject.name,
    grade: subject.grade,
    totalLessons,
    totalVideos,
    watchedVideos,
    totalQuizzes,
    passedQuizzes,
    totalAssignments,
    submittedAssignments,
    overallPercent,
  };
}

// Get full progress summary for a student
export async function getProgressSummary(
  userId: string
): Promise<ProgressSummary> {
  // Get all subjects that have content the student interacted with
  const subjectsResult = await pool.query(
    `SELECT DISTINCT s.id
     FROM subjects s
     LEFT JOIN lessons l ON l.subject_id = s.id
     LEFT JOIN videos v ON v.lesson_id = l.id
     LEFT JOIN video_progress vp ON vp.video_id = v.id AND vp.user_id = $1
     LEFT JOIN quizzes q ON q.lesson_id = l.id
     LEFT JOIN quiz_submissions qs ON qs.quiz_id = q.id AND qs.user_id = $1
     LEFT JOIN assignments a ON a.lesson_id = l.id
     LEFT JOIN assignment_submissions asub ON asub.assignment_id = a.id 
       AND asub.user_id = $1
     WHERE vp.id IS NOT NULL 
        OR qs.id IS NOT NULL 
        OR asub.id IS NOT NULL`,
    [userId]
  );

  const subjectProgress: SubjectProgress[] = [];
  let totalPercent = 0;

  for (const row of subjectsResult.rows) {
    const progress = await getProgressBySubject(userId, row.id);
    if (progress) {
      subjectProgress.push(progress);
      totalPercent += progress.overallPercent;
    }
  }

  const totalSubjects = subjectProgress.length;
  const overallPercent =
    totalSubjects > 0 ? Math.round(totalPercent / totalSubjects) : 0;

  return {
    totalSubjects,
    overallPercent,
    subjectProgress,
  };
}

// Get progress for a specific student by id (for teacher/parent view)
export async function getStudentProgress(
  studentId: string
): Promise<ProgressSummary> {
  return getProgressSummary(studentId);
}