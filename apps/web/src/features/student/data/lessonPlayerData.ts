/**
 * Mock lesson-player content keyed by `${courseSlug}::${lessonId}`.
 * Replace `fetchLesson` with a real API call when the backend is ready.
 */

export type LessonMaterial = {
  id: string;
  title: string;
  meta: string;
  /** Visual key — mapped to a Lucide icon in the page. */
  iconKey: "pdf" | "lab" | "video" | "doc";
  /** "download" triggers a blob download; "external" opens a URL. */
  action: "download" | "external";
  /** Optional href for external links. */
  href?: string;
};

export type LessonOutlineItem = {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  status: "completed" | "current" | "locked";
};

export type TranscriptCue = {
  /** Timestamp shown in the transcript ("00:00", "01:15"). */
  at: string;
  text: string;
};

export type DiscussionPost = {
  id: string;
  author: string;
  avatar: string;
  postedAgo: string;
  body: string;
};

export type KnowledgeCheck = {
  prompt: string;
  /** A short hint shown above the CTA. */
  description: string;
};

export type LessonPlayerData = {
  courseSlug: string;
  courseTitle: string;
  /** Module label shown at the top, e.g. "Module 3: Advanced Biology". */
  moduleLabel: string;
  /** Points (XP) shown in the top bar. */
  points: number;
  lessonId: string;
  /** Numeric label like "Lesson 3.2". */
  lessonNumber: string;
  title: string;
  description: string;
  videoPosterUrl: string;
  /** Mock playable .mp4 — picked from a small public test asset. */
  videoUrl: string;
  /** Lesson outline shown in the right column. */
  outline: LessonOutlineItem[];
  materials: LessonMaterial[];
  transcript: TranscriptCue[];
  discussion: DiscussionPost[];
  knowledgeCheck: KnowledgeCheck;
  /** Adjacent lesson IDs for prev/next navigation, if any. */
  prevLessonId: string | null;
  nextLessonId: string | null;
};

const lessons: Record<string, LessonPlayerData> = {
  "biology-101::l3": {
    courseSlug: "biology-101",
    courseTitle: "Biology 101: Foundations of Life",
    moduleLabel: "Module 3: Advanced Biology",
    points: 150,
    lessonId: "l3",
    lessonNumber: "Lesson 3.2",
    title: "Cellular Respiration",
    description:
      "Understand the complex process cells use to generate energy from nutrients, breaking down glucose to produce ATP.",
    videoPosterUrl:
      "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&w=1200&q=70",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    outline: [
      {
        id: "o1",
        index: 1,
        title: "Introduction to ATP",
        subtitle: "The energy currency of the cell.",
        status: "completed",
      },
      {
        id: "o2",
        index: 2,
        title: "Cellular Respiration",
        subtitle: "Glycolysis and the Krebs Cycle.",
        status: "current",
      },
      {
        id: "o3",
        index: 3,
        title: "Electron Transport",
        subtitle: "Maximizing ATP yield.",
        status: "locked",
      },
    ],
    materials: [
      {
        id: "m1",
        title: "Lecture Notes (PDF)",
        meta: "2.4 MB",
        iconKey: "pdf",
        action: "download",
      },
      {
        id: "m2",
        title: "Interactive Lab",
        meta: "External Link",
        iconKey: "lab",
        action: "external",
        href: "https://phet.colorado.edu/",
      },
    ],
    transcript: [
      {
        at: "00:00",
        text: "Welcome back! In our last session, we discussed photosynthesis. Today, we turn our attention to its counterpart: cellular respiration.",
      },
      {
        at: "01:15",
        text: "Cellular respiration is the process by which biological fuels are oxidized in the presence of an inorganic electron acceptor, such as oxygen, to drive the bulk production of adenosine triphosphate (ATP).",
      },
      {
        at: "02:30",
        text: "We can break this down into three main stages: Glycolysis, the Krebs cycle, and the Electron Transport Chain. Let's look closely at the first stage taking place in the cytoplasm.",
      },
    ],
    discussion: [
      {
        id: "d1",
        author: "Maya Patel",
        avatar: "https://i.pravatar.cc/80?img=44",
        postedAgo: "2 hr ago",
        body: "Quick question — is the Krebs cycle technically aerobic or anaerobic? My notes are unclear.",
      },
      {
        id: "d2",
        author: "Liam O'Connor",
        avatar: "https://i.pravatar.cc/80?img=15",
        postedAgo: "1 hr ago",
        body: "Aerobic — it requires oxygen indirectly to keep the electron transport chain running, which in turn keeps the cycle producing.",
      },
    ],
    knowledgeCheck: {
      prompt: "Knowledge Check",
      description:
        "Test your understanding of cellular respiration before moving to the next module.",
    },
    prevLessonId: "l2",
    nextLessonId: "l4",
  },
  // Fallback lesson when the user clicks Resume on a course that doesn't
  // have a fully authored lesson yet.
  "biology-101::l2": {
    courseSlug: "biology-101",
    courseTitle: "Biology 101: Foundations of Life",
    moduleLabel: "Module 1: Cell Structure & Function",
    points: 80,
    lessonId: "l2",
    lessonNumber: "Lesson 1.2",
    title: "Prokaryotes vs Eukaryotes",
    description:
      "Compare the structural and functional differences between the two fundamental kinds of cells.",
    videoPosterUrl:
      "https://images.unsplash.com/photo-1559757175-08c1f88c5e96?auto=format&fit=crop&w=1200&q=70",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    outline: [
      {
        id: "o1",
        index: 1,
        title: "Introduction to the Cell Theory",
        subtitle: "Foundational concepts.",
        status: "completed",
      },
      {
        id: "o2",
        index: 2,
        title: "Prokaryotes vs Eukaryotes",
        subtitle: "The big two.",
        status: "current",
      },
      {
        id: "o3",
        index: 3,
        title: "Cellular Organelles",
        subtitle: "Mitochondria and friends.",
        status: "locked",
      },
    ],
    materials: [
      {
        id: "m1",
        title: "Reading Pack (PDF)",
        meta: "1.8 MB",
        iconKey: "pdf",
        action: "download",
      },
    ],
    transcript: [
      {
        at: "00:00",
        text: "All living things are made of cells, but those cells fall into two big categories.",
      },
      {
        at: "00:45",
        text: "Prokaryotic cells lack a true nucleus and most membrane-bound organelles.",
      },
    ],
    discussion: [],
    knowledgeCheck: {
      prompt: "Knowledge Check",
      description: "Quick check on prokaryotic vs eukaryotic structures.",
    },
    prevLessonId: "l1",
    nextLessonId: "l3",
  },
};

const delay = <T>(value: T, ms = 150): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

/**
 * Returns the lesson player data for a given course/lesson combo, or null
 * if the combo isn't authored yet (the page will show a placeholder).
 */
export async function fetchLesson(
  courseSlug: string,
  lessonId: string,
): Promise<LessonPlayerData | null> {
  return delay(lessons[`${courseSlug}::${lessonId}`] ?? null);
}
