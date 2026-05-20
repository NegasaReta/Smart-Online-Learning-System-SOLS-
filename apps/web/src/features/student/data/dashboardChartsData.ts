/**
 * Mock data + async fetchers for dashboard charts.
 * Replace `fetchWeeklyStudyHours` with a real API call when the backend
 * exposes the matching endpoint.
 */

export type WeeklyStudyHourPoint = {
  /** Three-letter weekday label (Mon, Tue, ...). */
  day: string;
  /** Hours actually studied that day. */
  hours: number;
  /** The student's daily target in hours (used for the comparison line). */
  target: number;
};

const weeklyStudyHours: WeeklyStudyHourPoint[] = [
  { day: "Mon", hours: 2.4, target: 3 },
  { day: "Tue", hours: 3.1, target: 3 },
  { day: "Wed", hours: 1.8, target: 3 },
  { day: "Thu", hours: 3.6, target: 3 },
  { day: "Fri", hours: 2.9, target: 3 },
  { day: "Sat", hours: 4.2, target: 3 },
  { day: "Sun", hours: 1.4, target: 3 },
];

const delay = <T>(value: T, ms = 200): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export async function fetchWeeklyStudyHours(): Promise<WeeklyStudyHourPoint[]> {
  return delay(weeklyStudyHours);
}
