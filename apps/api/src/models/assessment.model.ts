import { pool } from '../db/index';

export const getStudentAssessments = async (userId: string) => {
  const result = await pool.query(`
    SELECT 
      a.id,
      s.name as subject,
      a.title,
      TO_CHAR(a.scheduled_for, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as "scheduledFor",
      CONCAT(a.duration_minutes, ' mins') as duration,
      a.duration_minutes as "durationMinutes",
      a.status,
      'brain' as "iconKey",
      asub.score as "resultPercent"
    FROM assessments a
    JOIN subjects s ON a.subject_id = s.id
    LEFT JOIN assessment_submissions asub ON a.id = asub.assessment_id AND asub.user_id = $1
  `, [userId]);
  return result.rows;
};

export const getAssessmentById = async (assessmentId: string, userId: string) => {
  const assessmentRes = await pool.query(`
    SELECT 
      a.id,
      s.name as subject,
      a.title,
      TO_CHAR(a.scheduled_for, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as "scheduledFor",
      CONCAT(a.duration_minutes, ' mins') as duration,
      a.duration_minutes as "durationMinutes",
      a.status,
      a.instructions
    FROM assessments a
    JOIN subjects s ON a.subject_id = s.id
    WHERE a.id = $1
  `, [assessmentId]);

  if (assessmentRes.rows.length === 0) return null;

  const assessment = assessmentRes.rows[0];

  // Check if assessment is completed by user
  const submissionRes = await pool.query(`
    SELECT id FROM assessment_submissions WHERE user_id = $1 AND assessment_id = $2
  `, [userId, assessmentId]);

  const isCompleted = submissionRes.rows.length > 0;

  const questionsRes = await pool.query(`
    SELECT id, prompt, options ${isCompleted ? ', correct_index as "correctIndex"' : ''}
    FROM assessment_questions
    WHERE assessment_id = $1
  `, [assessmentId]);

  return {
    ...assessment,
    questions: questionsRes.rows
  };
};

export const submitAssessment = async (
  userId: string, 
  assessmentId: string, 
  answers: { questionId: string, selectedIndex: number }[],
  timeTakenSeconds: number
) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const questionsRes = await client.query(`
      SELECT id, correct_index FROM assessment_questions WHERE assessment_id = $1
    `, [assessmentId]);

    const questionsMap = new Map(questionsRes.rows.map(q => [q.id, q.correct_index]));
    let correctCount = 0;
    const totalQuestions = questionsRes.rows.length;

    const results = answers.map(ans => {
      const correctIndex = questionsMap.get(ans.questionId);
      const isCorrect = ans.selectedIndex === correctIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: ans.questionId,
        correct: isCorrect,
        correctIndex
      };
    });

    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const submissionRes = await client.query(`
      INSERT INTO assessment_submissions (user_id, assessment_id, score, correct_count, total_questions, time_taken_seconds)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `, [userId, assessmentId, score, correctCount, totalQuestions, timeTakenSeconds]);

    const submissionId = submissionRes.rows[0].id;

    for (const ans of answers) {
      const correctIndex = questionsMap.get(ans.questionId);
      const isCorrect = ans.selectedIndex === correctIndex;
      await client.query(`
        INSERT INTO assessment_answers (submission_id, question_id, selected_index, is_correct)
        VALUES ($1, $2, $3, $4)
      `, [submissionId, ans.questionId, ans.selectedIndex, isCorrect]);
    }

    await client.query('COMMIT');

    return {
      score,
      correctCount,
      totalQuestions,
      results
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
