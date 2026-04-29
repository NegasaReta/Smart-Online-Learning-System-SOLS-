import { pool } from "../../db/index";

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  orderNo: number;
}

// Create a new lesson under a subject
export async function createLesson(
  subjectId: string,
  title: string,
  description: string,
  orderNo: number
): Promise<Lesson> {
  const result = await pool.query(
    `INSERT INTO lessons (subject_id, title, description, order_no)
     VALUES ($1, $2, $3, $4)
     RETURNING id, subject_id AS "subjectId", title, description,
               order_no AS "orderNo"`,
    [subjectId, title, description, orderNo]
  );
  return result.rows[0];
}

// Get all lessons under a subject in order
export async function getLessonsBySubject(
  subjectId: string
): Promise<Lesson[]> {
  const result = await pool.query(
    `SELECT id, subject_id AS "subjectId", title, description,
            order_no AS "orderNo"
     FROM lessons
     WHERE subject_id = $1
     ORDER BY order_no ASC`,
    [subjectId]
  );
  return result.rows;
}

// Get single lesson by id
export async function getLessonById(id: string): Promise<Lesson | null> {
  const result = await pool.query(
    `SELECT id, subject_id AS "subjectId", title, description,
            order_no AS "orderNo"
     FROM lessons
     WHERE id = $1`,
    [id]
  );
  if (result.rows.length === 0) return null;
  return result.rows[0];
}

// Update lesson
export async function updateLesson(
  id: string,
  title: string,
  description: string,
  orderNo: number
): Promise<Lesson | null> {
  const result = await pool.query(
    `UPDATE lessons
     SET title = $1, description = $2, order_no = $3
     WHERE id = $4
     RETURNING id, subject_id AS "subjectId", title, description,
               order_no AS "orderNo"`,
    [title, description, orderNo, id]
  );
  if (result.rows.length === 0) return null;
  return result.rows[0];
}

// Delete lesson
export async function deleteLesson(id: string): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM lessons WHERE id = $1`,
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}

// Get next order number for a subject
export async function getNextOrderNo(subjectId: string): Promise<number> {
  const result = await pool.query(
    `SELECT COALESCE(MAX(order_no), 0) + 1 AS next_order
     FROM lessons
     WHERE subject_id = $1`,
    [subjectId]
  );
  return result.rows[0].next_order;
}