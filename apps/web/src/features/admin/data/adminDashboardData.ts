/**
 * Mock data for the Admin Dashboard.
 * Replace each fetcher with a real API call when the backend is ready.
 */

export type StatCard = {
  id: string;
  label: string;
  value: string;
  iconKey: "students" | "teachers" | "parents" | "earnings";
  bgClass: string;
  iconBgClass: string;
  iconColorClass: string;
};

export type ExamResultPoint = {
  month: string;
  teacher: number;
  student: number;
};

export type StudentGenderSplit = {
  total: number;
  male: number;
  female: number;
};

export type StarStudent = {
  id: string;
  name: string;
  avatar: string;
  studentId: string;
  marks: number;
  percent: number;
  year: number;
};

export type ExamResultFeed = {
  id: string;
  title: string;
  subtitle: string;
  iconKey: "teacher" | "fees" | "course";
  timeLabel: string;
};

/* -------------------------------- Sources -------------------------------- */

export const statCards: StatCard[] = [
  {
    id: "s1",
    label: "Students",
    value: "15.00K",
    iconKey: "students",
    bgClass: "bg-violet-50",
    iconBgClass: "bg-violet-100",
    iconColorClass: "text-violet-600",
  },
  {
    id: "s2",
    label: "Teachers",
    value: "2.00K",
    iconKey: "teachers",
    bgClass: "bg-cyan-50",
    iconBgClass: "bg-cyan-100",
    iconColorClass: "text-cyan-600",
  },
  {
    id: "s3",
    label: "Parents",
    value: "5.6K",
    iconKey: "parents",
    bgClass: "bg-orange-50",
    iconBgClass: "bg-orange-100",
    iconColorClass: "text-orange-500",
  },
  {
    id: "s4",
    label: "Earnings",
    value: "$19.3K",
    iconKey: "earnings",
    bgClass: "bg-emerald-50",
    iconBgClass: "bg-emerald-100",
    iconColorClass: "text-emerald-600",
  },
];

export const examResults: ExamResultPoint[] = [
  { month: "Jan", teacher: 60000, student: 45000 },
  { month: "Feb", teacher: 75000, student: 55000 },
  { month: "Mar", teacher: 65000, student: 50000 },
  { month: "Apr", teacher: 80000, student: 65000 },
  { month: "May", teacher: 110000, student: 90000 },
  { month: "Jun", teacher: 68000, student: 55000 },
  { month: "Jul", teacher: 72000, student: 58000 },
  { month: "Aug", teacher: 85000, student: 68000 },
  { month: "Sep", teacher: 105000, student: 82000 },
  { month: "Oct", teacher: 78000, student: 62000 },
  { month: "Nov", teacher: 70000, student: 56000 },
  { month: "Dec", teacher: 63000, student: 49000 },
];

export const genderSplit: StudentGenderSplit = {
  total: 15000,
  male: 8400,
  female: 6600,
};

export const starStudents: StarStudent[] = [
  {
    id: "st1",
    name: "Evelyn Harper",
    avatar: "https://i.pravatar.cc/80?img=44",
    studentId: "PRE43178",
    marks: 1185,
    percent: 98,
    year: 2014,
  },
  {
    id: "st2",
    name: "Diana Plenty",
    avatar: "https://i.pravatar.cc/80?img=36",
    studentId: "PRE43174",
    marks: 1165,
    percent: 91,
    year: 2014,
  },
  {
    id: "st3",
    name: "John Millar",
    avatar: "https://i.pravatar.cc/80?img=15",
    studentId: "PRE43187",
    marks: 1175,
    percent: 92,
    year: 2014,
  },
  {
    id: "st4",
    name: "Sofia Martinez",
    avatar: "https://i.pravatar.cc/80?img=47",
    studentId: "PRE43201",
    marks: 1150,
    percent: 89,
    year: 2014,
  },
  {
    id: "st5",
    name: "Noah Williams",
    avatar: "https://i.pravatar.cc/80?img=12",
    studentId: "PRE43195",
    marks: 1140,
    percent: 87,
    year: 2014,
  },
];

export const examResultFeed: ExamResultFeed[] = [
  {
    id: "f1",
    title: "New Teacher",
    subtitle: "It is a long established readable...",
    iconKey: "teacher",
    timeLabel: "Just now",
  },
  {
    id: "f2",
    title: "Fees Structure",
    subtitle: "It is a long established readable...",
    iconKey: "fees",
    timeLabel: "Today",
  },
  {
    id: "f3",
    title: "New Course",
    subtitle: "It is a long established readable...",
    iconKey: "course",
    timeLabel: "24 Sep 2023",
  },
];

/* ----------------------- Fetchers (swap with API later) ---------------------- */

const delay = <T,>(value: T, ms = 150): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const fetchStatCards = () => delay(statCards);
export const fetchExamResults = () => delay(examResults);
export const fetchGenderSplit = () => delay(genderSplit);
export const fetchStarStudents = () => delay(starStudents);
export const fetchExamResultFeed = () => delay(examResultFeed);
