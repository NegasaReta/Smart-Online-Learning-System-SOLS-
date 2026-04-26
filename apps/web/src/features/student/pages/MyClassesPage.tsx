import { useState } from "react";
import {
  Calculator,
  FlaskConical,
  BookOpen,
  Languages,
  Globe,
  Monitor,
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { ClassCard, type ClassItem } from "../components/ClassCard";

const classes: ClassItem[] = [
  {
    period: 1,
    slug: "advanced-mathematics",
    title: "Advanced Mathematics",
    teacher: "Mr. Anderson",
    progress: 82,
    chapters: 12,
    hours: 45,
    icon: Calculator,
    theme: {
      headerBg: "#dbeafe",
      iconBg: "#2563eb",
      iconText: "#ffffff",
      accent: "#2563eb",
      accentHover: "#1d4ed8",
      progressText: "#2563eb",
    },
  },
  {
    period: 2,
    slug: "biology-101",
    title: "Biology & Earth Science",
    teacher: "Dr. Ramirez",
    progress: 65,
    chapters: 8,
    hours: 32,
    icon: FlaskConical,
    theme: {
      headerBg: "#d1fae5",
      iconBg: "#10b981",
      iconText: "#ffffff",
      accent: "#10b981",
      accentHover: "#059669",
      progressText: "#059669",
    },
  },
  {
    period: 3,
    slug: "amharic-literature",
    title: "Amharic Literature",
    teacher: "Ms. Tadesse",
    progress: 40,
    chapters: 15,
    hours: 50,
    icon: BookOpen,
    theme: {
      headerBg: "#fef3c7",
      iconBg: "#f59e0b",
      iconText: "#ffffff",
      accent: "#f59e0b",
      accentHover: "#d97706",
      progressText: "#d97706",
    },
  },
  {
    period: 4,
    slug: "english-language-arts",
    title: "English Language Arts",
    teacher: "Mr. Wright",
    progress: 92,
    chapters: 10,
    hours: 38,
    icon: Languages,
    theme: {
      headerBg: "#ede9fe",
      iconBg: "#8b5cf6",
      iconText: "#ffffff",
      accent: "#8b5cf6",
      accentHover: "#7c3aed",
      progressText: "#7c3aed",
    },
  },
  {
    period: 5,
    slug: "world-history",
    title: "World History & Geography",
    teacher: "Ms. Patel",
    progress: 55,
    chapters: 14,
    hours: 42,
    icon: Globe,
    theme: {
      headerBg: "#fee2e2",
      iconBg: "#ef4444",
      iconText: "#ffffff",
      accent: "#ef4444",
      accentHover: "#dc2626",
      progressText: "#dc2626",
    },
  },
  {
    period: 6,
    slug: "information-technology",
    title: "Information Technology",
    teacher: "Mr. Chen",
    progress: 78,
    chapters: 9,
    hours: 36,
    icon: Monitor,
    theme: {
      headerBg: "#ede9fe",
      iconBg: "#7c3aed",
      iconText: "#ffffff",
      accent: "#7c3aed",
      accentHover: "#6d28d9",
      progressText: "#7c3aed",
    },
  },
];

type Filter = "all" | "in-progress" | "completed";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

/**
 * Student "My Classes" page — grid of enrolled courses with filter tabs.
 */
export default function MyClassesPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = classes.filter((c) => {
    if (filter === "all") return true;
    if (filter === "completed") return c.progress >= 100;
    return c.progress < 100;
  });

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6 lg:px-10">
          <div className="mx-auto max-w-[1280px]">
            <header className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-ink-900">
                  My Classes
                </h1>
                <p className="mt-1 text-sm text-ink-500">
                  You are enrolled in {classes.length} classes this semester
                </p>
              </div>

              {/* Filter pills */}
              <div className="flex items-center gap-2 rounded-full">
                {FILTERS.map((f) => {
                  const active = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFilter(f.id)}
                      className={
                        "rounded-full px-4 py-1.5 text-sm font-semibold transition " +
                        (active
                          ? "bg-brand text-white shadow-card"
                          : "bg-white text-ink-700 border border-ink-200 hover:bg-ink-100")
                      }
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </header>

            {/* Grid of class cards */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((c) => (
                <ClassCard key={c.period} item={c} />
              ))}
            </div>

            {visible.length === 0 && (
              <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center text-sm text-ink-500">
                No classes match this filter.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
