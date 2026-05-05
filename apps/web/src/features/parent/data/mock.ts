import type { LucideIcon } from "lucide-react";
import { BookOpen, FlaskConical, LayoutGrid } from "lucide-react";

export type Subject = {
  id: string;
  name: string;
  detail: string;
  progress: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  barColor: string;
};

export const subjects: Subject[] = [
  {
    id: "math",
    name: "Advanced Mathematics",
    detail: "Unit 4: Calculus Intro",
    progress: 92,
    icon: LayoutGrid,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    barColor: "bg-indigo-500",
  },
  {
    id: "physics",
    name: "Physics",
    detail: "Lab Report Pending",
    progress: 85,
    icon: FlaskConical,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    barColor: "bg-emerald-500",
  },
  {
    id: "lit",
    name: "World Literature",
    detail: "Essay Draft Submitted",
    progress: 78,
    icon: BookOpen,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    barColor: "bg-purple-500",
  },
];

export type ActivityItem = {
  id: string;
  title: string;
  time: string;
  status: "success" | "info" | "warning";
  pendingGrade?: boolean;
};

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    title: "Scored 92% in Math Quiz",
    time: "Today, 10:30 AM",
    status: "success",
  },
  {
    id: "2",
    title: "Completed Lesson 4: Physics",
    time: "Yesterday, 3:15 PM",
    status: "info",
  },
  {
    id: "3",
    title: "Submitted Literature Essay",
    time: "Oct 12, 11:00 AM",
    status: "warning",
    pendingGrade: true,
  },
];
