/**
 * Test data for the Assessments & Quizzes page. Replace the fetcher bodies
 * with real API calls when the backend is wired up — consumer code stays
 * the same.
 */

export type AssessmentStatus = "ongoing" | "upcoming" | "completed";

export type Assessment = {
  id: string;
  subject: string;
  title: string;
  /** "Today · 10:00 AM" or "Oct 26, 2024 · 1:00 PM". */
  scheduledFor: string;
  /** Display string for duration, e.g. "45 mins". */
  duration: string;
  status: AssessmentStatus;
  /** Tailwind classes for the icon tile (bg + text). */
  iconClass: string;
  /** Lucide icon name key — interpreted in the page. */
  iconKey: "flask" | "calculator" | "scroll" | "book" | "code";
};

/* ------------------------------- Sources ------------------------------- */

export const assessments: Assessment[] = [
  {
    id: "a1",
    subject: "BIOLOGY",
    title: "Unit 2: Cell Structure",
    scheduledFor: "Today · 10:00 AM",
    duration: "45 mins",
    status: "ongoing",
    iconClass: "bg-brand/10 text-brand",
    iconKey: "flask",
  },
  {
    id: "a2",
    subject: "MATHEMATICS",
    title: "Algebra Midterm",
    scheduledFor: "Oct 26, 2024 · 1:00 PM",
    duration: "60 mins",
    status: "upcoming",
    iconClass: "bg-amber-100 text-amber-600",
    iconKey: "calculator",
  },
  {
    id: "a3",
    subject: "HISTORY",
    title: "World War II Quiz",
    scheduledFor: "Oct 20, 2024 · 9:00 AM",
    duration: "30 mins",
    status: "completed",
    iconClass: "bg-ink-100 text-ink-500",
    iconKey: "scroll",
  },
];

export const assessmentGuidelines = [
  {
    iconKey: "wifi" as const,
    text: "Ensure you have a stable internet connection before starting.",
  },
  {
    iconKey: "monitor" as const,
    text: "Do not close the browser window during an active assessment.",
  },
  {
    iconKey: "timer" as const,
    text: "Assessments will automatically submit when the timer runs out.",
  },
];

/* ----------------------- Fetchers (swap with API later) ---------------------- */

const delay = <T>(value: T, ms = 200): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const fetchAssessments = () => delay(assessments);
export const fetchGuidelines = () => delay(assessmentGuidelines);
