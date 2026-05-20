import { pool } from "../../db/index";

export interface Attempt {
  id: number;
  userId: number;
  quizId: number;
  score: number;
  totalQuestions: number;
  isPassed: boolean;
  submittedAt: Date;
}

export interface AttemptStatus {
  quizId: number;
  quizTitle: string;
  maxAttempts: number;
  usedAttempts: number;
  remainingAttempts: number;
  canAttempt: boolean;
  bestScore: number | null;
  isPassed: boolean;
}

// Get all attempts for a quiz by a user
export async function getAttemptsByQuiz(
  userId: number,
  quizId: number
): Promise<Attempt[]> {
  const result = await pool.query(
    `SELECT 
      qs.id, 
      qs.user_id AS "userId", 
      qs.quiz_id AS "quizId",
      qs.score,
      qs.total_questions AS "totalQuestions",
      CASE WHEN qs.score >= (qs.total_questions * 0.5) 
           THEN true ELSE false 
      END AS "isPassed",
      qs.submitted_at AS "submittedAt"
     FROM quiz_submissions qs
     WHERE qs.user_id = $1 AND qs.quiz_id = $2
     ORDER BY qs.submitted_at DESC`,
    [userId, quizId]
  );
  
  // Explicitly map over rows to parse BIGINT strings into JavaScript numbers
  return result.rows.map(row => ({
    ...row,
    id: parseInt(row.id, 10),
    userId: parseInt(row.userId, 10),
    quizId: parseInt(row.quizId, 10)
  }));
}

// Get all attempts by a user across all quizzes
export async function getAllAttemptsByUser(
  userId: number
): Promise<Attempt[]> {
  const result = await pool.query(
    `SELECT 
      qs.id,
      qs.user_id AS "userId",
      qs.quiz_id AS "quizId",
      qs.score,
      qs.total_questions AS "totalQuestions",
      CASE WHEN qs.score >= (qs.total_questions * 0.5)
           THEN true ELSE false
      END AS "isPassed",
      qs.submitted_at AS "submittedAt"
     FROM quiz_submissions qs
     WHERE qs.user_id = $1
     ORDER BY qs.submitted_at DESC`,
    [userId]
  );
  
  // Explicitly map over rows to parse BIGINT strings into JavaScript numbers
  return result.rows.map(row => ({
    ...row,
    id: parseInt(row.id, 10),
    userId: parseInt(row.userId, 10),
    quizId: parseInt(row.quizId, 10)
  }));
}

// Check attempt status for a quiz
export async function getAttemptStatus(
  userId: number,
  quizId: number
): Promise<AttemptStatus | null> {
  // Get quiz info
  const quizResult = await pool.query(
    `SELECT id, title, max_attempts AS "maxAttempts"
     FROM quizzes
     WHERE id = $1`,
    [quizId]
  );
  if (quizResult.rows.length === 0) return null;
  const quiz = quizResult.rows[0];

  // Get used attempts and best score
  const attemptsResult = await pool.query(
    `SELECT 
      COUNT(*) AS used_attempts,
      MAX(score) AS best_score
     FROM quiz_submissions
     WHERE user_id = $1 AND quiz_id = $2`,
    [userId, quizId]
  );

  const usedAttempts = parseInt(attemptsResult.rows[0].used_attempts, 10);
  const bestScore = attemptsResult.rows[0].best_score
    ? parseInt(attemptsResult.rows[0].best_score, 10)
    : null;

  // Get total questions for pass check
  const totalResult = await pool.query(
    `SELECT total_questions FROM quiz_submissions
     WHERE user_id = $1 AND quiz_id = $2
     ORDER BY submitted_at DESC
     LIMIT 1`,
    [userId, quizId]
  );
  const totalQuestions =
    totalResult.rows.length > 0
      ? parseInt(totalResult.rows[0].total_questions, 10)
      : 0;

  const remainingAttempts = Math.max(0, quiz.maxAttempts - usedAttempts);
  const canAttempt = remainingAttempts > 0;
  const isPassed = bestScore !== null && totalQuestions > 0
    ? bestScore >= totalQuestions * 0.5
    : false;

  return {
    quizId: parseInt(quiz.id, 10), // Parse database string to number
    quizTitle: quiz.title,
    maxAttempts: quiz.maxAttempts,
    usedAttempts,
    remainingAttempts,
    canAttempt,
    bestScore,
    isPassed,
  };
}
