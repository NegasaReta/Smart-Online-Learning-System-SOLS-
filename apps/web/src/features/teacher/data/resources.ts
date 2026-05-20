export type ResourceType = "Video" | "PDF" | "Lesson Plan" | "Quiz";
export type ResourceSubject =
  | "Mathematics"
  | "Science"
  | "History"
  | "Literature";

export type Resource = {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  subject: ResourceSubject;
  subjectShort: string;
  grade: number;
  cover: string;
};

export const subjectFilters: { name: ResourceSubject; count: number }[] = [
  { name: "Mathematics", count: 42 },
  { name: "Science", count: 38 },
  { name: "History", count: 24 },
  { name: "Literature", count: 31 },
];

export const gradeLevels = [9, 10, 11, 12];

export const resourceTypes: ("All" | ResourceType)[] = [
  "All",
  "Video",
  "PDF",
  "Lesson Plan",
  "Quiz",
];

export const resources: Resource[] = [
  {
    id: "r1",
    title: "Introduction to Trigonometry",
    description:
      "A comprehensive video guide explaining sine, cosine, and tangent fundamentals.",
    type: "Video",
    subject: "Mathematics",
    subjectShort: "Math",
    grade: 9,
    cover:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "r2",
    title: "Algebra II Worksheet",
    description:
      "A printable worksheet covering polynomial operations and factoring drills.",
    type: "PDF",
    subject: "Mathematics",
    subjectShort: "Math",
    grade: 10,
    cover:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "r3",
    title: "Cellular Biology Lesson",
    description:
      "Complete step-by-step instructions for teaching cell structure and function.",
    type: "Lesson Plan",
    subject: "Science",
    subjectShort: "Science",
    grade: 9,
    cover:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "r4",
    title: "World War II Key Events",
    description:
      "A 20-question multiple choice quiz covering major WWII milestones.",
    type: "Quiz",
    subject: "History",
    subjectShort: "History",
    grade: 11,
    cover:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "r5",
    title: "Shakespeare's Sonnets",
    description:
      "Lesson plan exploring iambic pentameter through Shakespeare's most famous sonnets.",
    type: "Lesson Plan",
    subject: "Literature",
    subjectShort: "Literature",
    grade: 11,
    cover:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "r6",
    title: "Chemistry Lab Safety",
    description: "An overview video on essential laboratory safety procedures.",
    type: "Video",
    subject: "Science",
    subjectShort: "Science",
    grade: 10,
    cover:
      "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?auto=format&fit=crop&w=600&q=60",
  },
];
