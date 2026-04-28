import { pool } from '../db/index';

export const getStudentAssignments = async (userId: string) => {
  const result = await pool.query(`
    SELECT 
      a.id,
      a.title,
      s.name as subject,
      a.due_date as due,
      COALESCE(asub.status, 'pending') as status,
      asub.score,
      CASE 
        WHEN asub.status = 'submitted' THEN 'view'
        WHEN asub.status = 'graded' THEN 'view'
        ELSE 'submit'
      END as action
    FROM assignments a
    JOIN lessons l ON a.lesson_id = l.id
    JOIN subjects s ON l.subject_id = s.id
    LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id AND asub.user_id = $1
  `, [userId]);
  return result.rows;
};

export const getAssignmentById = async (assignmentId: string, userId: string) => {
  const result = await pool.query(`
    SELECT 
      a.id,
      a.title,
      a.description,
      a.requirements,
      a.due_date as due,
      COALESCE(asub.status, 'pending') as status,
      asub.score,
      asub.feedback,
      asub.file_url as "submittedFileUrl"
    FROM assignments a
    LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id AND asub.user_id = $2
    WHERE a.id = $1
  `, [assignmentId, userId]);
  return result.rows[0];
};

export const submitAssignment = async (userId: string, assignmentId: string, fileUrl: string) => {
  const result = await pool.query(`
    INSERT INTO assignment_submissions (user_id, assignment_id, file_url, status)
    VALUES ($1, $2, $3, 'submitted')
    ON CONFLICT (user_id, assignment_id) 
    DO UPDATE SET file_url = $3, status = 'submitted', submitted_at = CURRENT_TIMESTAMP
    RETURNING *
  `, [userId, assignmentId, fileUrl]);
  return result.rows[0];
};
