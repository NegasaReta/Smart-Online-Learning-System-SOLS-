import { pool } from '../db/index';

export const getProgressSummary = async (userId: string) => {
  const quizzesRes = await pool.query('SELECT COUNT(*) FROM quiz_submissions WHERE user_id = $1', [userId]);
  const assignmentsRes = await pool.query('SELECT COUNT(*) FROM assignment_submissions WHERE user_id = $1', [userId]);
  const scoreRes = await pool.query('SELECT SUM(score) FROM quiz_submissions WHERE user_id = $1', [userId]);
  
  // Lesson completion can be approximated by video progress
  const videosRes = await pool.query(`
    SELECT 
      COUNT(*) as total_watched, 
      SUM(CASE WHEN is_completed = true THEN 1 ELSE 0 END) as total_completed 
    FROM video_progress WHERE user_id = $1
  `, [userId]);

  return {
    quizzesCompleted: parseInt(quizzesRes.rows[0].count, 10),
    assignmentsSubmitted: parseInt(assignmentsRes.rows[0].count, 10),
    totalScore: parseInt(scoreRes.rows[0].sum || '0', 10),
    videosWatched: parseInt(videosRes.rows[0].total_watched, 10),
    videosCompleted: parseInt(videosRes.rows[0].total_completed || '0', 10)
  };
};

export const getRecentActivity = async (userId: string) => {
  const result = await pool.query(`
    SELECT 'quiz' as type, quizzes.title, quiz_submissions.submitted_at as date
    FROM quiz_submissions 
    JOIN quizzes ON quiz_submissions.quiz_id = quizzes.id
    WHERE quiz_submissions.user_id = $1
    UNION ALL
    SELECT 'assignment' as type, assignments.title, assignment_submissions.submitted_at as date
    FROM assignment_submissions
    JOIN assignments ON assignment_submissions.assignment_id = assignments.id
    WHERE assignment_submissions.user_id = $1
    ORDER BY date DESC
    LIMIT 5
  `, [userId]);
  return result.rows;
};

export const getNotifications = async (userId: string) => {
  const result = await pool.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
};

export const markNotificationRead = async (userId: string, notificationId: string) => {
  const result = await pool.query(
    'UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2 RETURNING *',
    [notificationId, userId]
  );
  return result.rows[0];
};

export const linkParent = async (userId: string, parentEmail: string, parentName: string) => {
  const parentInfo = { email: parentEmail, name: parentName };
  const result = await pool.query(
    'UPDATE student_profiles SET parent_info = $1 WHERE user_id = $2 RETURNING *',
    [JSON.stringify(parentInfo), userId]
  );
  return result.rows[0];
};

export const getProfile = async (userId: string) => {
  const result = await pool.query(`
    SELECT u.full_name, u.email, sp.student_info, sp.parent_info, sp.school_preference 
    FROM users u
    LEFT JOIN student_profiles sp ON u.id = sp.user_id
    WHERE u.id = $1
  `, [userId]);
  return result.rows[0];
};

export const updateProfile = async (userId: string, studentInfo: any, schoolPreference: any) => {
  const result = await pool.query(
    'UPDATE student_profiles SET student_info = COALESCE($1, student_info), school_preference = COALESCE($2, school_preference) WHERE user_id = $3 RETURNING *',
    [studentInfo ? JSON.stringify(studentInfo) : null, schoolPreference ? JSON.stringify(schoolPreference) : null, userId]
  );
  return result.rows[0];
};
