import type { LucideIcon } from "lucide-react";
import { BookOpen, FlaskConical, LayoutGrid } from "lucide-react";

export type ProgressPeriodId = "month" | "semester" | "year";

export type Assessment = {
  name: string;
  score: number;
  outOf: number;
  date: string;
};

export type SubjectPerformance = {
  id: string;
  name: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  barColor: string;
  byPeriod: Record<
    ProgressPeriodId,
    {
      grade: string;
      progress: number;
      footnote: string;
      gradeBg: string;
      gradeColor: string;
      summary: string;
      teacher: string;
      attendance: number;
      assessments: Assessment[];
    }
  >;
};

export const subjectPerformance: SubjectPerformance[] = [
  {
    id: "math",
    name: "Mathematics",
    icon: LayoutGrid,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    barColor: "bg-indigo-500",
    byPeriod: {
      month: {
        grade: "A",
        progress: 88,
        footnote: "Last assessment: 92/100",
        gradeBg: "bg-emerald-50",
        gradeColor: "text-emerald-700",
        summary:
          "Strong algebraic reasoning and consistent homework completion this month.",
        teacher: "Mr. R. Bekele",
        attendance: 100,
        assessments: [
          { name: "Algebra Quiz", score: 92, outOf: 100, date: "Oct 18" },
          { name: "Homework Avg", score: 95, outOf: 100, date: "Oct" },
        ],
      },
      semester: {
        grade: "A",
        progress: 92,
        footnote: "Last assessment: 95/100",
        gradeBg: "bg-emerald-50",
        gradeColor: "text-emerald-700",
        summary:
          "Top decile performance across calculus, algebra, and problem-solving units.",
        teacher: "Mr. R. Bekele",
        attendance: 98,
        assessments: [
          { name: "Mid-Term Exam", score: 95, outOf: 100, date: "Sep 22" },
          { name: "Algebra Quiz", score: 92, outOf: 100, date: "Oct 18" },
          { name: "Geometry Test", score: 88, outOf: 100, date: "Nov 03" },
        ],
      },
      year: {
        grade: "A",
        progress: 90,
        footnote: "Cumulative: 90/100 average",
        gradeBg: "bg-emerald-50",
        gradeColor: "text-emerald-700",
        summary:
          "Year-long upward trend with steady improvement across all units.",
        teacher: "Mr. R. Bekele",
        attendance: 97,
        assessments: [
          { name: "Term 1 Final", score: 89, outOf: 100, date: "Jan" },
          { name: "Mid-Term Exam", score: 95, outOf: 100, date: "Sep" },
          { name: "Cumulative Avg", score: 90, outOf: 100, date: "YTD" },
        ],
      },
    },
  },
  {
    id: "science",
    name: "Science",
    icon: FlaskConical,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    barColor: "bg-emerald-500",
    byPeriod: {
      month: {
        grade: "A-",
        progress: 84,
        footnote: "Lab report due Friday",
        gradeBg: "bg-emerald-50",
        gradeColor: "text-emerald-700",
        summary: "Increased class participation and strong lab observations.",
        teacher: "Ms. L. Tadesse",
        attendance: 95,
        assessments: [
          { name: "Lab Practical", score: 86, outOf: 100, date: "Oct 12" },
          { name: "Pop Quiz", score: 82, outOf: 100, date: "Oct 25" },
        ],
      },
      semester: {
        grade: "A-",
        progress: 88,
        footnote: "Project pending",
        gradeBg: "bg-emerald-50",
        gradeColor: "text-emerald-700",
        summary:
          "Solid grasp of physics fundamentals; project work demonstrates curiosity.",
        teacher: "Ms. L. Tadesse",
        attendance: 96,
        assessments: [
          { name: "Mid-Term Exam", score: 88, outOf: 100, date: "Sep 24" },
          { name: "Lab Practical", score: 86, outOf: 100, date: "Oct 12" },
          { name: "Group Project", score: 0, outOf: 100, date: "pending" },
        ],
      },
      year: {
        grade: "A-",
        progress: 86,
        footnote: "Cumulative: 86/100 average",
        gradeBg: "bg-emerald-50",
        gradeColor: "text-emerald-700",
        summary: "Consistent A- across the year with strong lab work.",
        teacher: "Ms. L. Tadesse",
        attendance: 95,
        assessments: [
          { name: "Term 1 Final", score: 84, outOf: 100, date: "Jan" },
          { name: "Mid-Term Exam", score: 88, outOf: 100, date: "Sep" },
          { name: "Cumulative Avg", score: 86, outOf: 100, date: "YTD" },
        ],
      },
    },
  },
  {
    id: "literature",
    name: "Literature",
    icon: BookOpen,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    barColor: "bg-purple-500",
    byPeriod: {
      month: {
        grade: "B",
        progress: 72,
        footnote: "Reading log overdue",
        gradeBg: "bg-amber-50",
        gradeColor: "text-amber-700",
        summary:
          "Comprehension scores dipped slightly; more guided reading recommended.",
        teacher: "Mr. T. Alemu",
        attendance: 92,
        assessments: [
          { name: "Comprehension Quiz", score: 70, outOf: 100, date: "Oct 09" },
          { name: "Essay Draft", score: 76, outOf: 100, date: "Oct 22" },
        ],
      },
      semester: {
        grade: "B+",
        progress: 76,
        footnote: "Reading log due",
        gradeBg: "bg-amber-50",
        gradeColor: "text-amber-700",
        summary:
          "Strong essay writing voice; needs improvement on reading comprehension.",
        teacher: "Mr. T. Alemu",
        attendance: 93,
        assessments: [
          { name: "Mid-Term Essay", score: 78, outOf: 100, date: "Sep 26" },
          { name: "Comprehension Quiz", score: 70, outOf: 100, date: "Oct 09" },
          { name: "Essay Draft", score: 76, outOf: 100, date: "Oct 22" },
        ],
      },
      year: {
        grade: "B+",
        progress: 78,
        footnote: "Cumulative: 78/100 average",
        gradeBg: "bg-amber-50",
        gradeColor: "text-amber-700",
        summary: "Steady B+ year-round with strong creative writing.",
        teacher: "Mr. T. Alemu",
        attendance: 93,
        assessments: [
          { name: "Term 1 Final", score: 80, outOf: 100, date: "Jan" },
          { name: "Mid-Term Essay", score: 78, outOf: 100, date: "Sep" },
          { name: "Cumulative Avg", score: 78, outOf: 100, date: "YTD" },
        ],
      },
    },
  },
];

export const strengths = [
  "Alex demonstrates exceptional problem-solving skills in Mathematics, consistently scoring above 90% on complex algorithmic tests.",
  "Class participation in Science has increased notably over the last month.",
];

export const opportunities = [
  "Encourage more structured reading time at home to boost Literature comprehension scores, which have dipped slightly.",
  "Reviewing historical timelines might help prepare for the upcoming History mid-term.",
];

// GPA trend bars (oldest -> newest)
export type GpaPoint = { label: string; gpa: number };

export const gpaTrendByPeriod: Record<ProgressPeriodId, GpaPoint[]> = {
  month: [
    { label: "Wk 1", gpa: 3.5 },
    { label: "Wk 2", gpa: 3.6 },
    { label: "Wk 3", gpa: 3.55 },
    { label: "Wk 4", gpa: 3.7 },
  ],
  semester: [
    { label: "Aug", gpa: 3.4 },
    { label: "Sep", gpa: 3.5 },
    { label: "Oct", gpa: 3.55 },
    { label: "Nov", gpa: 3.65 },
    { label: "Dec", gpa: 3.75 },
    { label: "Jan", gpa: 3.8 },
  ],
  year: [
    { label: "Q1", gpa: 3.3 },
    { label: "Q2", gpa: 3.5 },
    { label: "Q3", gpa: 3.65 },
    { label: "Q4", gpa: 3.8 },
  ],
};

export const gpaSummaryByPeriod: Record<
  ProgressPeriodId,
  { current: number; deltaLabel: string }
> = {
  month: { current: 3.7, deltaLabel: "+0.1 from last month" },
  semester: { current: 3.8, deltaLabel: "+0.2 from last semester" },
  year: { current: 3.8, deltaLabel: "+0.5 from last year" },
};
