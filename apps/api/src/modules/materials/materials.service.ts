import { pool } from "../../db/index";

export interface Video {
  id: number;
  lessonId: number;
  title: string;
  url: string;
}

export interface Pdf {
  id: number;
  lessonId: number;
  title: string;
  url: string;
}

export interface Materials {
  videos: Video[];
  pdfs: Pdf[];
}

// Add video to lesson
export async function addVideo(
  lessonId: number,
  title: string,
  url: string
): Promise<Video> {
  const result = await pool.query(
    `INSERT INTO videos (lesson_id, title, url)
     VALUES ($1, $2, $3)
     RETURNING id, lesson_id AS "lessonId", title, url`,
    [lessonId, title, url]
  );
  
  const row = result.rows[0];
  return {
    ...row,
    id: parseInt(row.id, 10),
    lessonId: parseInt(row.lessonId, 10)
  };
}

// Add PDF to lesson
export async function addPdf(
  lessonId: number,
  title: string,
  url: string
): Promise<Pdf> {
  const result = await pool.query(
    `INSERT INTO pdfs (lesson_id, title, url)
     VALUES ($1, $2, $3)
     RETURNING id, lesson_id AS "lessonId", title, url`,
    [lessonId, title, url]
  );
  
  const row = result.rows[0];
  return {
    ...row,
    id: parseInt(row.id, 10),
    lessonId: parseInt(row.lessonId, 10)
  };
}

// Get all materials for a lesson
export async function getMaterialsByLesson(
  lessonId: number
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

  // Safely parse array rows from BIGINT strings to JavaScript numbers
  const videos = videosResult.rows.map(row => ({
    ...row,
    id: parseInt(row.id, 10),
    lessonId: parseInt(row.lessonId, 10)
  }));

  const pdfs = pdfsResult.rows.map(row => ({
    ...row,
    id: parseInt(row.id, 10),
    lessonId: parseInt(row.lessonId, 10)
  }));

  return {
    videos,
    pdfs,
  };
}

// Delete video
export async function deleteVideo(id: number): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM videos WHERE id = $1`,
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}

// Delete PDF
export async function deletePdf(id: number): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM pdfs WHERE id = $1`,
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}
