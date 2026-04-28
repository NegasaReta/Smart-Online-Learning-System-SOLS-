import 'dotenv/config';
import { pool, initDb } from './index';
import bcrypt from 'bcrypt';

const seed = async () => {
  await initDb();
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

    // 3. Create Subject (Course)
    const subjectRes = await client.query(
      'INSERT INTO subjects (name, slug, description, grade, instructor) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      ['Advanced Mathematics', 'adv-math', 'Core concepts in algebra and geometry', grade, 'Dr. Sarah Smith']
    );
    const subjectId = subjectRes.rows[0].id;

    // 4. Create Module
    const moduleRes = await client.query(
      'INSERT INTO modules (subject_id, title, order_no) VALUES ($1, $2, $3) RETURNING id',
      [subjectId, 'Module 1: Algebra Foundations', 1]
    );
    const moduleId = moduleRes.rows[0].id;

    // 5. Create Lesson
    const lessonRes = await client.query(
      'INSERT INTO lessons (subject_id, module_id, title, description, order_no) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [subjectId, moduleId, 'Algebraic Expressions', 'Introduction to variables and expressions', 1]
    );
    const lessonId = lessonRes.rows[0].id;

    // 6. Create Video (for progress tracking)
    const videoRes = await client.query(
      'INSERT INTO videos (lesson_id, title, url) VALUES ($1, $2, $3) RETURNING id',
      [lessonId, 'Algebra Basics Video', 'https://www.youtube.com/watch?v=NybHckSEQBI']
    );
    const videoId = videoRes.rows[0].id;

    // 7. Create PDF
    await client.query(
      'INSERT INTO pdfs (lesson_id, title, url) VALUES ($1, $2, $3)',
      [lessonId, 'Algebra Notes', 'https://example.com/notes.pdf']
    );

    // 8. Create Quiz
    const quizRes = await client.query(
      'INSERT INTO quizzes (lesson_id, title, description, max_attempts) VALUES ($1, $2, $3, $4) RETURNING id',
      [lessonId, 'Algebra Basics Quiz', 'Test your understanding of algebraic expressions', 3]
    );
    const quizId = quizRes.rows[0].id;

    // 9. Create Questions & Choices
    const q1Options = JSON.stringify([
      { option: 'A', text: '5' },
      { option: 'B', text: '7' },
      { option: 'C', text: '10' }
    ]);
    const q1Res = await client.query(
      'INSERT INTO questions (quiz_id, text, options, correct_option) VALUES ($1, $2, $3, $4) RETURNING id',
      [quizId, 'What is the value of 2x + 3 if x = 2?', q1Options, 'B']
    );

    // 10. Create Assignment
    const assignmentRes = await client.query(
      'INSERT INTO assignments (lesson_id, title, description, requirements, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [lessonId, 'Algebra Essay', 'Write a short summary of how variables work.', ['Must be 500 words', 'Use at least 3 examples'], new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]
    );
    const assignmentId = assignmentRes.rows[0].id;

    // 11. Create Assessment
    const assessmentRes = await client.query(
      'INSERT INTO assessments (subject_id, title, duration_minutes, scheduled_for, instructions, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [subjectId, 'Midterm Math Exam', 60, new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), 'Please read all questions carefully.', 'upcoming']
    );
    const assessmentId = assessmentRes.rows[0].id;

    // 12. Create Assessment Questions
    await client.query(
      'INSERT INTO assessment_questions (assessment_id, prompt, options, correct_index) VALUES ($1, $2, $3, $4)',
      [assessmentId, 'Solve for x: 3x + 5 = 11', JSON.stringify(['x=2', 'x=3', 'x=4', 'x=5']), 0]
    );

    // 13. Create Resource
    await client.query(
      'INSERT INTO resources (subject_id, title, kind, size, duration, download_url, view_url) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [subjectId, 'Calculus Guide', 'pdf', '1.2MB', null, 'https://example.com/calculus.pdf', 'https://example.com/viewer?file=calculus.pdf']
    );

    // 14. Create Event
    await client.query('INSERT INTO events (user_id, title, start_time, end_time, type, location, description, color_class) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [userId, 'Math Study Group', new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), 'class', 'Library Room 4', 'Group study for algebra', 'bg-green-500']
    );

    await client.query('COMMIT');
    console.log('Test data seeded successfully.');
    console.log(`Email: ${email}`);
    console.log(`Password: ${plainPassword}`);
    console.log(`Subject ID: ${subjectId}`);
    console.log(`Lesson ID: ${lessonId}`);
    console.log(`Quiz ID: ${quizId}`);
    console.log(`Question 1 ID: ${q1Res.rows[0].id}`);
    console.log(`Video ID: ${videoId}`);
    console.log(`Assignment ID: ${assignmentId}`);
    console.log(`Assessment ID: ${assessmentId}`);
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
