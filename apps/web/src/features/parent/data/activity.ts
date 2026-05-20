import type { LucideIcon } from "lucide-react";
import { BookOpen, FlaskConical, LogIn } from "lucide-react";

export type ActivityKind = "quiz" | "submission" | "system";

export type ActivityEntry = {
  id: string;
  day: "Today" | "Yesterday" | string;
  time: string;
  subject: string;
  title: string;
  description?: string;
  badge?: { label: string; tone: "success" | "info" | "warning" };
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  kind: ActivityKind;
};

export const activityEntries: ActivityEntry[] = [
  {
    id: "a1",
    day: "Today",
    time: "10:45 AM",
    subject: "Physics",
    title: "Completed Thermodynamics Quiz",
    badge: { label: "Scored 92%", tone: "success" },
    icon: FlaskConical,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    kind: "quiz",
  },
  {
    id: "a2",
    day: "Today",
    time: "08:15 AM",
    subject: "Literature",
    title: "Submitted Essay Draft",
    description:
      "\u201CThe Impact of Modernism on 20th Century Poetry\u201D submitted for review.",
    icon: BookOpen,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    kind: "submission",
  },
  {
    id: "a3",
    day: "Yesterday",
    time: "03:30 PM",
    subject: "System",
    title: "Logged into Portal",
    description: "Active session duration: 45 mins",
    icon: LogIn,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
    kind: "system",
  },
];

export type WeeklySubject = {
  name: string;
  hours: number;
  dotColor: string;
};

export const weeklySubjects: WeeklySubject[] = [
  { name: "Physics", hours: 5, dotColor: "bg-indigo-500" },
  { name: "Mathematics", hours: 4.5, dotColor: "bg-emerald-500" },
  { name: "Literature", hours: 3, dotColor: "bg-purple-500" },
];

export const weeklyStats = {
  activeHours: 14.5,
  weeklyGoal: 20,
  deltaFromLastWeek: 2,
};
