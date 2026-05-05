/**
 * Mock assignment data + async fetchers.
 * Replace `fetchAssignmentById` with a real API call once available.
 */

export type AssignmentStatusKey =
  | "pending"
  | "in-progress"
  | "submitted"
  | "graded";

export type Assignment = {
  id: string;
  title: string;
  subject: string;
  due: string;
  status: AssignmentStatusKey;
  score: string;
  action: "submit" | "continue" | "view" | "feedback";
  /** Long description shown on the detail page. */
  description: string;
  /** Bullet-list of submission requirements. */
  requirements: string[];
  /** Maximum points for the assignment. */
  maxPoints: number;
  /** Teacher feedback (only present for graded assignments). */
  feedback?: string;
};

export const assignments: Assignment[] = [
  {
    id: "a1",
    title: "Cellular Mitosis Essay",
    subject: "Biology",
    due: "Today, 11:59 PM",
    status: "pending",
    score: "-",
    action: "submit",
    description:
      "Write a 1500-word essay describing the four phases of mitosis (prophase, metaphase, anaphase, telophase), including the role of the spindle apparatus and at least two real-world implications of mitotic errors.",
    requirements: [
      "1500-word minimum, 12pt font, double-spaced",
      "Cite at least 3 peer-reviewed sources (APA format)",
      "Include one labeled diagram of mitotic phases",
      "Submit as a single PDF or DOCX file",
    ],
    maxPoints: 100,
  },
  {
    id: "a2",
    title: "Calculus Chapter 4 Set",
    subject: "Math",
    due: "Tomorrow, 5:00 PM",
    status: "in-progress",
    score: "-",
    action: "continue",
    description:
      "Complete problems 1-15 in Chapter 4. Show all work and use proper notation. Partial credit awarded for correct setup even if the final answer is incorrect.",
    requirements: [
      "Show every algebraic step",
      "Label answers clearly",
      "Hand-written work scanned to PDF is acceptable",
    ],
    maxPoints: 50,
  },
  {
    id: "a3",
    title: "World War II Timeline",
    subject: "History",
    due: "Oct 12, 2023",
    status: "submitted",
    score: "Pending Grading",
    action: "view",
    description:
      "Build a visual timeline of the major events of World War II from 1939 to 1945, including political, military, and humanitarian milestones.",
    requirements: [
      "At least 20 events with dates",
      "Include sources for each event",
      "Visual format (Canva, Figma, or similar)",
    ],
    maxPoints: 100,
  },
  {
    id: "a4",
    title: "Poetry Analysis",
    subject: "Literature",
    due: "Oct 05, 2023",
    status: "graded",
    score: "92/100",
    action: "feedback",
    description:
      "Analyze the use of metaphor and rhythm in Robert Frost's \"The Road Not Taken\" in a 750-word essay.",
    requirements: [
      "750 words ± 10%",
      "Quote at least 4 lines from the poem",
      "Compare with one contemporary poem",
    ],
    maxPoints: 100,
    feedback:
      "Excellent close reading and a strong thesis. The comparison with Mary Oliver's work was insightful. Watch for occasional comma splices in paragraph 3.",
  },
];

const delay = <T>(value: T, ms = 150): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export async function fetchAssignments(): Promise<Assignment[]> {
  return delay(assignments);
}

export async function fetchAssignmentById(
  id: string,
): Promise<Assignment | null> {
  return delay(assignments.find((a) => a.id === id) ?? null);
}
