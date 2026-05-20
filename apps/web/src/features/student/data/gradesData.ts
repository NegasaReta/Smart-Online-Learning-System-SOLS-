/**
 * Test data for the Grades page. When the backend is ready, replace these
 * exports with real fetchers (e.g. react-query) that return the same shapes.
 */

export type ProgressPoint = {
  /** Short month label shown on the X axis. */
  month: string;
  mathematics: number;
  science: number;
};

export type SkillPoint = {
  skill: string;
  /** Score 0..100 for the radar value. */
  score: number;
};

export type SubjectBreakdown = {
  name: string;
  score: number;
  grade: string;
  /** Tailwind class for the bar fill color. */
  color: string;
};

/* -------------------------------- Sources -------------------------------- */

export const progressOverTime: ProgressPoint[] = [
  { month: "Sept", mathematics: 82, science: 78 },
  { month: "Oct", mathematics: 88, science: 84 },
  { month: "Nov", mathematics: 92, science: 86 },
  { month: "Dec", mathematics: 90, science: 92 },
  { month: "Jan", mathematics: 94, science: 91 },
];

export const skillsRadar: SkillPoint[] = [
  { skill: "Logic", score: 85 },
  { skill: "Creativity", score: 70 },
  { skill: "Writing", score: 60 },
  { skill: "Research", score: 78 },
  { skill: "Analysis", score: 72 },
];

export const subjectBreakdown: SubjectBreakdown[] = [
  { name: "Calculus", score: 94, grade: "A", color: "bg-brand" },
  { name: "Physics II", score: 88, grade: "A-", color: "bg-emerald-500" },
  { name: "World History", score: 91, grade: "A", color: "bg-amber-400" },
];

/* -------------------- Async fetchers (swap with API later) -------------------- */

const delay = <T>(value: T, ms = 250): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const fetchProgressOverTime = () => delay(progressOverTime);
export const fetchSkillsRadar = () => delay(skillsRadar);
export const fetchSubjectBreakdown = () => delay(subjectBreakdown);
