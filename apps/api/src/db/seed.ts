import 'dotenv/config';
import { pool } from './index';
import bcrypt from 'bcrypt';

const seed = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Create Student User (Idempotent)
    const email = 'teststudent@example.com';
    const plainPassword = 'password123';
    const passwordHash = await bcrypt.hash(plainPassword, 10);
    const grade = 'Grade 10';

    let userRes = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    let userId;
    if (userRes.rows.length === 0) {
      userRes = await client.query(
        'INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
        ['Test Student', email, passwordHash, 'student']
      );
      userId = userRes.rows[0].id;

      await client.query(
        'INSERT INTO student_profiles (user_id, student_info) VALUES ($1, $2)',
        [userId, JSON.stringify({ grade })]
      );
    } else {
      userId = userRes.rows[0].id;
      await client.query(
        'UPDATE users SET password = $1 WHERE id = $2',
        [passwordHash, userId]
      );
    }

    // 2. Cleanup Data (Idempotent approach)
    await client.query(`DELETE FROM subjects WHERE grade = 'Grade 10' AND name = 'Advanced Mathematics'`);

    // 3. Create Subject
    const subjectRes = await client.query(
      'INSERT INTO subjects (name, description, grade) VALUES ($1, $2, $3) RETURNING id',
      ['Advanced Mathematics', 'Core concepts in algebra and geometry', grade]
    );
    const subjectId = subjectRes.rows[0].id;

    // 4. Create Lesson
    const lessonRes = await client.query(
      'INSERT INTO lessons (subject_id, title, description, order_no) VALUES ($1, $2, $3, $4) RETURNING id',
      [subjectId, 'Algebraic Expressions', 'Introduction to variables and expressions', 1]
    );
    const lessonId = lessonRes.rows[0].id;

    // 5. Create Video (for progress tracking)
    const videoRes = await client.query(
      'INSERT INTO videos (lesson_id, title, url) VALUES ($1, $2, $3) RETURNING id',
      [lessonId, 'Algebra Basics Video', 'https://www.youtube.com/watch?v=NybHckSEQBI']
    );
    const videoId = videoRes.rows[0].id;

    // 6. Create Quiz
    const quizRes = await client.query(
      'INSERT INTO quizzes (lesson_id, title, description, max_attempts) VALUES ($1, $2, $3, $4) RETURNING id',
      [lessonId, 'Algebra Basics Quiz', 'Test your understanding of algebraic expressions', 3]
    );
    const quizId = quizRes.rows[0].id;

    // 7. Create Questions & Choices
    const q1Options = JSON.stringify([
      { option: 'A', text: '5' },
      { option: 'B', text: '7' },
      { option: 'C', text: '10' }
    ]);
    const q1Res = await client.query(
      'INSERT INTO questions (quiz_id, text, options, correct_option) VALUES ($1, $2, $3, $4) RETURNING id',
      [quizId, 'What is the value of 2x + 3 if x = 2?', q1Options, 'B']
    );

    const q2Options = JSON.stringify([
      { option: 'A', text: 'x^2' },
      { option: 'B', text: '2x' },
      { option: 'C', text: 'x + x' }
    ]);
    const q2Res = await client.query(
      'INSERT INTO questions (quiz_id, text, options, correct_option) VALUES ($1, $2, $3, $4) RETURNING id',
      [quizId, 'What is x multiplied by x?', q2Options, 'A']
    );

    // 8. Create Assignment
    const assignmentRes = await client.query(
      'INSERT INTO assignments (lesson_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING id',
      [lessonId, 'Algebra Essay', 'Write a short summary of how variables work.', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]
    );
    const assignmentId = assignmentRes.rows[0].id;

    await client.query('COMMIT');
    console.log('Test data seeded successfully.');
    console.log(`Email: ${email}`);
    console.log(`Password: ${plainPassword}`);
    console.log(`Subject ID: ${subjectId}`);
    console.log(`Lesson ID: ${lessonId}`);
    console.log(`Quiz ID: ${quizId}`);
    console.log(`Question 1 ID: ${q1Res.rows[0].id}`);
    console.log(`Question 2 ID: ${q2Res.rows[0].id}`);
    console.log(`Video ID: ${videoId}`);
    console.log(`Assignment ID: ${assignmentId}`);
    process.exit(0);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    client.release();
  }
};

seed();
