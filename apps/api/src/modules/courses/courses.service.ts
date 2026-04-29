import { pool } from "../../db/index";

export interface Course {
  id: string;
  name: string;
  description: string;
  grade: string;
  createdAt?: Date;
}

// Create a new subject
export async function createCourse(
  name: string,
  grade: string,
  description: string
): Promise<Course> {
  const result = await pool.query(
    `INSERT INTO subjects (name, grade, description)
     VALUES ($1, $2, $3)
     RETURNING id, name, grade, description`,
    [name, grade, description]
  );
  return result.rows[0];
}

// Get all subjects by grade
export async function getCoursesByGrade(grade: string): Promise<Course[]> {
  const result = await pool.query(
    `SELECT id, name, grade, description
     FROM subjects
     WHERE grade = $1
     ORDER BY name ASC`,
    [grade]
  );
  return result.rows;
}

// Get all subjects
export async function getAllCourses(): Promise<Course[]> {
  const result = await pool.query(
    `SELECT id, name, grade, description
     FROM subjects
     ORDER BY grade ASC, name ASC`
  );
  return result.rows;
}

// Get single subject by id
export async function getCourseById(id: string): Promise<Course | null> {
  const result = await pool.query(
    `SELECT id, name, grade, description
     FROM subjects
     WHERE id = $1`,
    [id]
  );
  if (result.rows.length === 0) return null;
  return result.rows[0];
}

// Update subject
export async function updateCourse(
  id: string,
  name: string,
  grade: string,
  description: string
): Promise<Course | null> {
  const result = await pool.query(
    `UPDATE subjects
     SET name = $1, grade = $2, description = $3
     WHERE id = $4
     RETURNING id, name, grade, description`,
    [name, grade, description, id]
  );
  if (result.rows.length === 0) return null;
  return result.rows[0];
}

// Delete subject
export async function deleteCourse(id: string): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM subjects WHERE id = $1`,
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}