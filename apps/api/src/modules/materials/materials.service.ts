import { pool } from "../../db/index";

export interface Video {
  id: string;
  lessonId: string;
  title: string;
  url: string;
}

export interface Pdf {
  id: string;
  lessonId: string;
  title: string;
  url: string;
}

export interface Materials {
  videos: Video[];
  pdfs: Pdf[];
}

// Add video to lesson
export async function addVideo(
  lessonId: string,
  title: string,
  url: string
): Promise<Video> {
  const result = await pool.query(
    `INSERT INTO videos (lesson_id, title, url)
     VALUES ($1, $2, $3)
     RETURNING id, lesson_id AS "lessonId", title, url`,
    [lessonId, title, url]
  );
  return result.rows[0];
}

// Add PDF to lesson
export async function addPdf(
  lessonId: string,
  title: string,
  url: string
): Promise<Pdf> {
  const result = await pool.query(
    `INSERT INTO pdfs (lesson_id, title, url)
     VALUES ($1, $2, $3)
     RETURNING id, lesson_id AS "lessonId", title, url`,
    [lessonId, title, url]
  );
  return result.rows[0];
}

// Get all materials for a lesson
export async function getMaterialsByLesson(
  lessonId: string
): Promise<Materials> {
  const videosResult = await pool.query(
    `SELECT id, lesson_id AS "lessonId", title, url
     FROM videos
     WHERE lesson_id = $1
     ORDER BY title ASC`,
    [lessonId]
  );

  const pdfsResult = await pool.query(
    `SELECT id, lesson_id AS "lessonId", title, url
     FROM pdfs
     WHERE lesson_id = $1
     ORDER BY title ASC`,
    [lessonId]
  );

  return {
    videos: videosResult.rows,
    pdfs: pdfsResult.rows,
  };
}

// Delete video
export async function deleteVideo(id: string): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM videos WHERE id = $1`,
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}

// Delete PDF
export async function deletePdf(id: string): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM pdfs WHERE id = $1`,
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}