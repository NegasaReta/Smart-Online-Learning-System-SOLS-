import { pool } from '../db/index';

export const getProgressOverview = async (userId: string) => {
  const result = await pool.query(`
    SELECT 
      COALESCE(AVG(CASE WHEN is_completed = true THEN 100 ELSE 0 END), 0) as overall_percent
    FROM lesson_completion
    WHERE user_id = $1
  `, [userId]);

  const overallPercent = Math.round(result.rows[0].overall_percent);

  // Example segments based on categories or progress
  const segments = [
    { label: "Lessons", percent: overallPercent, color: "#4F46E5" },
    { label: "Quizzes", percent: 0, color: "#10B981" }, // Placeholder for now
    { label: "Assignments", percent: 0, color: "#F59E0B" } // Placeholder for now
  ];

  return {
    overallPercent,
    segments
  };
};

export const getCurrentCourses = async (userId: string) => {
  const result = await pool.query(`
    SELECT 
      s.id,
      s.slug,
      s.name as title,
      s.name as subject,
      s.instructor,
      COALESCE(
        (SELECT COUNT(*)::float / NULLIF((SELECT COUNT(*) FROM lessons WHERE subject_id = s.id), 0) * 100 
         FROM lesson_completion lc 
         JOIN lessons l ON lc.lesson_id = l.id
         WHERE lc.user_id = $1 AND l.subject_id = s.id AND lc.is_completed = true), 0
      ) as progress,
      (SELECT title FROM lessons WHERE subject_id = s.id AND id NOT IN (SELECT lesson_id FROM lesson_completion WHERE user_id = $1 AND is_completed = true) ORDER BY order_no ASC LIMIT 1) as "nextLesson"
    FROM subjects s
    LIMIT 3
  `, [userId]);
  return result.rows.map(row => ({
    ...row,
    progress: Math.round(row.progress)
  }));
};

export const getUpcomingTasks = async (userId: string) => {
  const assignmentsRes = await pool.query(`
    SELECT 
      a.id,
      a.title,
      s.name as subject,
      TO_CHAR(a.due_date, 'Mon DD, YYYY') as "dueLabel",
      'assignment' as type,
      CASE WHEN asub.id IS NULL THEN 'pending' ELSE 'in-progress' END as status
    FROM assignments a
    JOIN lessons l ON a.lesson_id = l.id
    JOIN subjects s ON l.subject_id = s.id
    LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id AND asub.user_id = $1
    WHERE a.due_date > NOW() AND (asub.status IS NULL OR asub.status = 'pending')
    ORDER BY a.due_date ASC
  `, [userId]);

  const quizzesRes = await pool.query(`
    SELECT 
      q.id,
      q.title,
      s.name as subject,
      'Today' as "dueLabel",
      'quiz' as type,
      'pending' as status
    FROM quizzes q
    JOIN lessons l ON q.lesson_id = l.id
    JOIN subjects s ON l.subject_id = s.id
    LEFT JOIN quiz_submissions qs ON q.id = qs.quiz_id AND qs.user_id = $1
    WHERE qs.id IS NULL
  `, [userId]);

  return [...assignmentsRes.rows, ...quizzesRes.rows];
};
