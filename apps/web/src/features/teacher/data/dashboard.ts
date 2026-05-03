export type StatCard = {
  id: string;
  label: string;
  value: string | number;
  badge?: { label: string; tone: "success" | "info" };
};

export const teacherStats: StatCard[] = [
  {
    id: "students",
    label: "Total Students",
    value: 148,
    badge: { label: "+4%", tone: "success" },
  },
  {
    id: "subjects",
    label: "Active Subjects",
    value: 5,
    badge: { label: "Semester 2", tone: "info" },
  },
  {
    id: "feedback",
    label: "Pending Feedback",
    value: 24,
  },
];

export type SubjectAverage = {
  short: string;
  name: string;
  value: number; // 0-100
};

export const subjectAverages: SubjectAverage[] = [
  { short: "Math", name: "Mathematics", value: 78 },
  { short: "Sci", name: "Science", value: 72 },
  { short: "Hist", name: "History", value: 86 },
  { short: "Eng", name: "English", value: 76 },
  { short: "Art", name: "Art", value: 92 },
];

export type FeedbackRequest = {
  id: string;
  initials: string;
  name: string;
  topic: string;
  time: string;
  avatarBg: string;
  avatarColor: string;
};

export const pendingFeedback: FeedbackRequest[] = [
  {
    id: "f1",
    initials: "JD",
    name: "John Doe",
    topic: "Biology Midterm Review",
    time: "10 mins ago",
    avatarBg: "bg-amber-100",
    avatarColor: "text-amber-700",
  },
  {
    id: "f2",
    initials: "AS",
    name: "Alice Smith",
    topic: "Math Quiz #4",
    time: "1 hour ago",
    avatarBg: "bg-indigo-100",
    avatarColor: "text-indigo-700",
  },
  {
    id: "f3",
    initials: "MJ",
    name: "Marcus Johnson",
    topic: "History Project Draft",
    time: "2 hours ago",
    avatarBg: "bg-emerald-100",
    avatarColor: "text-emerald-700",
  },
  {
    id: "f4",
    initials: "EW",
    name: "Emma Wilson",
    topic: "Biology Lab Report",
    time: "3 hours ago",
    avatarBg: "bg-rose-100",
    avatarColor: "text-rose-700",
  },
];
