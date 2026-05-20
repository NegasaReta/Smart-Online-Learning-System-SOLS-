export type Course = {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description: string;
  schedule: string;
  room: string;
  capacity: number;
  createdAt: number;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  points: number;
};

export type Quiz = {
  id: string;
  title: string;
  course: string;
  description: string;
  durationMinutes: number;
  dueDate: string;
  questions: QuizQuestion[];
  published: boolean;
  createdAt: number;
};

export type Assignment = {
  id: string;
  title: string;
  course: string;
  instructions: string;
  dueDate: string;
  totalPoints: number;
  allowLate: boolean;
  attachments: string[];
  published: boolean;
  createdAt: number;
};

export const SUBJECT_OPTIONS = [
  "Biology",
  "Chemistry",
  "Physics",
  "Mathematics",
  "History",
  "English",
  "Computer Science",
  "Art",
];

export const GRADE_OPTIONS = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];

export const INITIAL_COURSES: Course[] = [
  {
    id: "c-seed-1",
    title: "Introductory Biology",
    subject: "Biology",
    grade: "Grade 10",
    description:
      "Foundations of cellular biology, genetics, and ecosystems with weekly labs.",
    schedule: "Mon, Wed, Fri \u2022 9:00 AM",
    room: "302",
    capacity: 32,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
  },
];

export const INITIAL_QUIZZES: Quiz[] = [];
export const INITIAL_ASSIGNMENTS: Assignment[] = [];
