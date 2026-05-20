/**
 * Test data for the Resources Library page. Replace the fetchers with real
 * API calls when the backend is ready — the consumer code stays the same.
 */

export type ResourceKind = "pdf" | "video" | "doc" | "archive";

export type Subject = {
  id: string;
  name: string;
  /** Tailwind dot color class, e.g. "bg-brand". */
  dotClass: string;
};

export type RecentItem = {
  id: string;
  title: string;
  kind: ResourceKind;
  /** Either a "x of y pages", "mm:ss / mm:ss", or descriptive label. */
  meta: string;
  /** 0..1 progress bar fill (or null for no bar). */
  progress: number | null;
  /** Tailwind class for the bar, e.g. "bg-rose-500". */
  progressClass?: string;
};

export type Material = {
  id: string;
  title: string;
  kind: ResourceKind;
  subject: string;
  /** Tailwind classes for the subject pill (bg + text). */
  subjectClass: string;
  size: string;
  date: string;
  /** Optional duration shown on video items. */
  duration?: string;
  primaryAction: "view" | "watch" | "download" | "downloadAll";
  /** Whether to also show a secondary outline View button next to primary. */
  hasView?: boolean;
};

/* ------------------------------- Sources ------------------------------- */

export const subjects: Subject[] = [
  { id: "math", name: "Mathematics", dotClass: "bg-brand" },
  { id: "physics", name: "Physics", dotClass: "bg-emerald-500" },
  { id: "literature", name: "Literature", dotClass: "bg-violet-500" },
];

export const recentlyViewed: RecentItem[] = [
  {
    id: "r1",
    title: "Math Syllabus 20…",
    kind: "pdf",
    meta: "Page 4 of 12",
    progress: 0.33,
    progressClass: "bg-rose-500",
  },
  {
    id: "r2",
    title: "Cellular Biology …",
    kind: "video",
    meta: "12:45 / 45:00",
    progress: 0.28,
    progressClass: "bg-brand",
  },
  {
    id: "r3",
    title: "History Essay Ru…",
    kind: "doc",
    meta: "Viewed 3 days ago",
    progress: 1,
    progressClass: "bg-emerald-500",
  },
  {
    id: "r4",
    title: "Python Final Ass…",
    kind: "archive",
    meta: "Downloaded last week",
    progress: null,
  },
];

export const allMaterials: Material[] = [
  {
    id: "m1",
    title: "Physics Chapter 4 - Thermodynamics…",
    kind: "pdf",
    subject: "PHYSICS",
    subjectClass: "bg-rose-50 text-rose-600",
    size: "2.4 MB",
    date: "Oct 12, 2024",
    primaryAction: "download",
    hasView: true,
  },
  {
    id: "m2",
    title: "Calculus 101: Limits and Continuity",
    kind: "video",
    subject: "MATHEMATICS",
    subjectClass: "bg-brand/10 text-brand",
    size: "45 mins",
    date: "Oct 10, 2024",
    duration: "45 mins",
    primaryAction: "watch",
  },
  {
    id: "m3",
    title: "Hamlet Character Analysis Essay…",
    kind: "doc",
    subject: "LITERATURE",
    subjectClass: "bg-emerald-50 text-emerald-700",
    size: "1.2 MB",
    date: "Oct 05, 2024",
    primaryAction: "download",
    hasView: true,
  },
  {
    id: "m4",
    title: "Python Starter Code & Assets for Final…",
    kind: "archive",
    subject: "COMPUTER SCIENCE",
    subjectClass: "bg-amber-100 text-amber-700",
    size: "15.8 MB",
    date: "Sep 28, 2024",
    primaryAction: "downloadAll",
  },
];

/* ----------------------- Fetchers (swap with API later) ---------------------- */

const delay = <T>(value: T, ms = 200): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const fetchSubjects = () => delay(subjects);
export const fetchRecentlyViewed = () => delay(recentlyViewed);
export const fetchAllMaterials = () => delay(allMaterials);
