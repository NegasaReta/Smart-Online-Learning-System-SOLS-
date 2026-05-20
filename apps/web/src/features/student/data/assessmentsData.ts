/**
 * Test data for the Assessments & Quizzes page. Replace the fetcher bodies
 * with real API calls when the backend is wired up — consumer code stays
 * the same.
 */

export type AssessmentStatus = "ongoing" | "upcoming" | "completed";

export type AssessmentQuestion = {
  id: string;
  prompt: string;
  options: string[];
  /** Index into `options` of the correct answer. */
  correctIndex: number;
};

export type Assessment = {
  id: string;
  subject: string;
  title: string;
  /** "Today · 10:00 AM" or "Oct 26, 2024 · 1:00 PM". */
  scheduledFor: string;
  /** Display string for duration, e.g. "45 mins". */
  duration: string;
  /** Numeric duration used by the timer (in minutes). */
  durationMinutes: number;
  status: AssessmentStatus;
  /** Tailwind classes for the icon tile (bg + text). */
  iconClass: string;
  /** Lucide icon name key — interpreted in the page. */
  iconKey: "flask" | "calculator" | "scroll" | "book" | "code";
  /** Long instructions shown on the detail / take page. */
  instructions: string;
  /** Multiple-choice question bank. */
  questions: AssessmentQuestion[];
  /** Score percent for completed assessments. */
  resultPercent?: number;
};

/* ------------------------------- Sources ------------------------------- */

export const assessments: Assessment[] = [
  {
    id: "a1",
    subject: "BIOLOGY",
    title: "Unit 2: Cell Structure",
    scheduledFor: "Today · 10:00 AM",
    duration: "45 mins",
    durationMinutes: 45,
    status: "ongoing",
    iconClass: "bg-brand/10 text-brand",
    iconKey: "flask",
    instructions:
      "This 45-minute assessment covers cell organelles, membrane transport, and the cell cycle. Read each question carefully — only the correct answer earns points.",
    questions: [
      {
        id: "q1",
        prompt: "Which organelle is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi apparatus"],
        correctIndex: 2,
      },
      {
        id: "q2",
        prompt:
          "Which process moves substances against a concentration gradient using ATP?",
        options: [
          "Diffusion",
          "Osmosis",
          "Active transport",
          "Facilitated diffusion",
        ],
        correctIndex: 2,
      },
      {
        id: "q3",
        prompt: "During which phase do chromosomes align at the cell's equator?",
        options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
        correctIndex: 1,
      },
      {
        id: "q4",
        prompt: "Ribosomes are responsible for…",
        options: [
          "Photosynthesis",
          "Protein synthesis",
          "Lipid storage",
          "DNA replication",
        ],
        correctIndex: 1,
      },
      {
        id: "q5",
        prompt: "Which structure controls what enters and leaves the cell?",
        options: [
          "Cytoplasm",
          "Cell membrane",
          "Nucleolus",
          "Endoplasmic reticulum",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "a2",
    subject: "MATHEMATICS",
    title: "Algebra Midterm",
    scheduledFor: "Oct 26, 2024 · 1:00 PM",
    duration: "60 mins",
    durationMinutes: 60,
    status: "upcoming",
    iconClass: "bg-amber-100 text-amber-600",
    iconKey: "calculator",
    instructions:
      "Comprehensive midterm covering linear equations, quadratic functions, and systems of equations. Calculator allowed. 40 multiple-choice questions.",
    questions: [
      {
        id: "q1",
        prompt: "Solve for x: 3x + 7 = 22",
        options: ["3", "5", "7", "15"],
        correctIndex: 1,
      },
      {
        id: "q2",
        prompt: "What are the roots of x² - 5x + 6 = 0?",
        options: ["1 and 6", "2 and 3", "-2 and -3", "-1 and -6"],
        correctIndex: 1,
      },
      {
        id: "q3",
        prompt: "Slope of the line through (1, 2) and (4, 11)?",
        options: ["1", "2", "3", "4"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "a3",
    subject: "HISTORY",
    title: "World War II Quiz",
    scheduledFor: "Oct 20, 2024 · 9:00 AM",
    duration: "30 mins",
    durationMinutes: 30,
    status: "completed",
    iconClass: "bg-ink-100 text-ink-500",
    iconKey: "scroll",
    instructions:
      "Quick check-in covering key events of WWII (1939–1945). Already submitted.",
    resultPercent: 88,
    questions: [
      {
        id: "q1",
        prompt: "WWII in Europe ended in which year?",
        options: ["1942", "1943", "1944", "1945"],
        correctIndex: 3,
      },
      {
        id: "q2",
        prompt: "D-Day refers to the Allied landings at…",
        options: ["Sicily", "Normandy", "Anzio", "Iwo Jima"],
        correctIndex: 1,
      },
    ],
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

export async function fetchAssessmentById(
  id: string,
): Promise<Assessment | null> {
  return delay(assessments.find((a) => a.id === id) ?? null);
}
