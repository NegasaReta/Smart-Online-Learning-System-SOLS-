import { pool } from '../db/index';

export const getEvents = async (userId: string, date: string, view: string) => {
  // view=week logic could be implemented here to calculate date range
  // For now, let's fetch all events and assignments/assessments for simplicity
  
  const eventsRes = await pool.query(`
    SELECT 
      id, title, 
      TO_CHAR(start_time, 'YYYY-MM-DD') as date,
      TO_CHAR(start_time, 'HH24:MI') as "startTime",
      TO_CHAR(end_time, 'HH24:MI') as "endTime",
      type, location, description, color_class as "colorClass"
    FROM events
    WHERE user_id = $1 OR user_id IS NULL
  `, [userId]);

  const assignmentsRes = await pool.query(`
    SELECT 
      a.id, a.title,
      TO_CHAR(a.due_date, 'YYYY-MM-DD') as date,
      '09:00' as "startTime",
      '10:00' as "endTime",
      'assignment' as type,
      '' as location,
      a.description,
      'bg-blue-500' as "colorClass"
    FROM assignments a
    JOIN lessons l ON a.lesson_id = l.id
    JOIN subjects s ON l.subject_id = s.id
  `);

  const assessmentsRes = await pool.query(`
    SELECT 
      a.id, a.title,
      TO_CHAR(a.scheduled_for, 'YYYY-MM-DD') as date,
      TO_CHAR(a.scheduled_for, 'HH24:MI') as "startTime",
      TO_CHAR(a.scheduled_for + (a.duration_minutes || ' minutes')::interval, 'HH24:MI') as "endTime",
      'assessment' as type,
      'Online' as location,
      a.instructions as description,
      'bg-red-500' as "colorClass"
    FROM assessments a
  `);

  return [...eventsRes.rows, ...assignmentsRes.rows, ...assessmentsRes.rows];
};

export const getUpcomingEvents = async (userId: string, limit: number) => {
  const result = await pool.query(`
    WITH all_events AS (
      SELECT 
        id, title, start_time as full_date,
        TO_CHAR(start_time, 'YYYY-MM-DD') as date,
        TO_CHAR(start_time, 'HH24:MI') as "startTime",
        TO_CHAR(end_time, 'HH24:MI') as "endTime",
        type, location, description, color_class as "colorClass"
      FROM events
      WHERE (user_id = $1 OR user_id IS NULL) AND start_time > NOW()
      UNION ALL
      SELECT 
        a.id, a.title, a.due_date as full_date,
        TO_CHAR(a.due_date, 'YYYY-MM-DD') as date,
        '09:00' as "startTime",
        '10:00' as "endTime",
        'assignment' as type,
        '' as location,
        a.description,
        'bg-blue-500' as "colorClass"
      FROM assignments a
      WHERE a.due_date > NOW()
      UNION ALL
      SELECT 
        a.id, a.title, a.scheduled_for as full_date,
        TO_CHAR(a.scheduled_for, 'YYYY-MM-DD') as date,
        TO_CHAR(a.scheduled_for, 'HH24:MI') as "startTime",
        TO_CHAR(a.scheduled_for + (a.duration_minutes || ' minutes')::interval, 'HH24:MI') as "endTime",
        'assessment' as type,
        'Online' as location,
        a.instructions as description,
        'bg-red-500' as "colorClass"
      FROM assessments a
      WHERE a.scheduled_for > NOW()
    )
    SELECT * FROM all_events
    ORDER BY full_date ASC
    LIMIT $2
  `, [userId, limit]);

  return result.rows;
};
