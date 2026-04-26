/**
 * Test data for the Course Detail page. Replace `fetchCourseBySlug` with a
 * real API call once the backend is ready.
 */

export type LessonStatus = "completed" | "current" | "locked";

export type Lesson = {
  id: string;
  index: string; // e.g. "1.1"
  title: string;
  /** Short meta line like "12 min video" or "Reading & Quiz". */
  meta: string;
  /** Lucide-style key, mapped in the page. */
  metaIcon: "video" | "book" | "lab" | "quiz";
  status: LessonStatus;
  /** Optional unlock-after-this hint (used by locked lessons). */
  unlockHint?: string;
};

export type ModuleTopic = {
  id: string;
  topic: string; // "TOPIC 1"
  state: "current" | "locked";
  title: string;
  /** Module-level percent for the active topic (0..100), null otherwise. */
  progress: number | null;
  /** For locked topics: meta like "4 Lessons · 1 Assignment". */
  lockedMeta?: string;
  lessons: Lesson[];
};

export type CourseResource = {
  id: string;
  title: string;
  iconKey: "textbook" | "lab" | "forum";
};

export type UpcomingItem = {
  id: string;
  /** "OCT" + day number. */
  monthShort: string;
  day: number;
  title: string;
  due: string;
};

export type CourseDetail = {
  slug: string;
  badge: string; // "Core Science Requirement"
  title: string; // "Biology 101: Foundations of Life"
  instructor: string;
  meta: string; // "Fall Semester · 12 Modules total"
  progress: number; // 0..100
  instructorBio: {
    name: string;
    avatar: string;
  };
  resources: CourseResource[];
  upcoming: UpcomingItem[];
  modules: ModuleTopic[];
};

/* ------------------------------- Sources ------------------------------- */

const courses: Record<string, CourseDetail> = {
  "biology-101": {
    slug: "biology-101",
    badge: "Core Science Requirement",
    title: "Biology 101: Foundations of Life",
    instructor: "Dr. Sarah Jenkins",
    meta: "Fall Semester · 12 Modules total",
    progress: 34,
    instructorBio: {
      name: "Dr. Sarah Jenkins",
      avatar: "https://i.pravatar.cc/80?img=32",
    },
    resources: [
      { id: "r1", title: "Digital Textbook (PDF)", iconKey: "textbook" },
      { id: "r2", title: "Virtual Lab Simulator", iconKey: "lab" },
      { id: "r3", title: "Study Group Forum", iconKey: "forum" },
    ],
    upcoming: [
      {
        id: "u1",
        monthShort: "OCT",
        day: 14,
        title: "Topic 1 Quiz",
        due: "Closes in 2 days",
      },
    ],
    modules: [
      {
        id: "m1",
        topic: "TOPIC 1 · CURRENT",
        state: "current",
        title: "Cell Structure & Function",
        progress: 66,
        lessons: [
          {
            id: "l1",
            index: "1.1",
            title: "Introduction to the Cell Theory",
            meta: "12 min video",
            metaIcon: "video",
            status: "completed",
          },
          {
            id: "l2",
            index: "1.2",
            title: "Prokaryotes vs Eukaryotes",
            meta: "Reading & Quiz",
            metaIcon: "book",
            status: "completed",
          },
          {
            id: "l3",
            index: "1.3",
            title: "Cellular Organelles",
            meta: "Interactive Lab · Est. 25 min",
            metaIcon: "lab",
            status: "current",
          },
          {
            id: "l4",
            index: "1.4",
            title: "The Cell Membrane & Transport",
            meta: "Complete 1.3 to unlock",
            metaIcon: "book",
            status: "locked",
            unlockHint: "Complete 1.3 to unlock",
          },
        ],
      },
      {
        id: "m2",
        topic: "TOPIC 2 · LOCKED",
        state: "locked",
        title: "Mendelian Genetics",
        progress: null,
        lockedMeta: "4 Lessons · 1 Assignment",
        lessons: [],
      },
      {
        id: "m3",
        topic: "TOPIC 3 · LOCKED",
        state: "locked",
        title: "Evolution & Natural Selection",
        progress: null,
        lockedMeta: "5 Lessons · 2 Quizzes",
        lessons: [],
      },
    ],
  },
};

/* ----------------------- Fetcher (swap with API later) ---------------------- */

const delay = <T>(value: T, ms = 150): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export async function fetchCourseBySlug(
  slug: string,
): Promise<CourseDetail | null> {
  return delay(courses[slug] ?? null);
}
