import { useState } from "react";
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  Award,
  Plus,
  Lightbulb,
  Check,
  ChevronRight,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

type StatusKey = "pending" | "in-progress" | "submitted" | "graded";

type Assignment = {
  id: string;
  title: string;
  subject: string;
  due: string;
  status: StatusKey;
  score: string;
  action: "submit" | "continue" | "view" | "feedback";
};

const assignments: Assignment[] = [
  {
    id: "a1",
    title: "Cellular Mitosis Essay",
    subject: "Biology",
    due: "Today, 11:59 PM",
    status: "pending",
    score: "-",
    action: "submit",
  },
  {
    id: "a2",
    title: "Calculus Chapter 4 Set",
    subject: "Math",
    due: "Tomorrow, 5:00 PM",
    status: "in-progress",
    score: "-",
    action: "continue",
  },
  {
    id: "a3",
    title: "World War II Timeline",
    subject: "History",
    due: "Oct 12, 2023",
    status: "submitted",
    score: "Pending Grading",
    action: "view",
  },
  {
    id: "a4",
    title: "Poetry Analysis",
    subject: "Literature",
    due: "Oct 05, 2023",
    status: "graded",
    score: "92/100",
    action: "feedback",
  },
];

type Tab = "all" | "pending" | "submitted" | "graded";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "submitted", label: "Submitted" },
  { id: "graded", label: "Graded" },
];

/** Student Assignments page. */
export default function AssignmentsPage() {
  const [tab, setTab] = useState<Tab>("all");

  const visible = assignments.filter((a) => {
    if (tab === "all") return true;
    if (tab === "pending") return a.status === "pending" || a.status === "in-progress";
    if (tab === "submitted") return a.status === "submitted";
    return a.status === "graded";
  });

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6 lg:px-10">
          <div className="mx-auto max-w-[1280px]">
            {/* Header */}
            <header className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-ink-900">
                  Assignments
                </h1>
                <p className="mt-1 text-sm text-ink-500">
                  You have 5 active assignments
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-600"
              >
                <Plus className="size-4" aria-hidden />
                New Submission
              </button>
            </header>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard
                icon={AlertCircle}
                label="Due Today"
                value="2"
                tileBg="#fee2e2"
                tileColor="#dc2626"
              />
              <StatCard
                icon={Clock}
                label="Due This Week"
                value="3"
                tileBg="#fef3c7"
                tileColor="#d97706"
              />
              <StatCard
                icon={CheckCircle2}
                label="Submitted"
                value="12"
                tileBg="#d1fae5"
                tileColor="#059669"
              />
              <StatCard
                icon={Award}
                label="Graded"
                value="8"
                tileBg="#dbeafe"
                tileColor="#2563eb"
              />
            </div>

            {/* Body grid: list + tips */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              {/* Left: tabs + table */}
              <section>
                <div className="flex items-center gap-6 border-b border-ink-200">
                  {TABS.map((t) => {
                    const active = tab === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        className={
                          "-mb-px border-b-2 pb-2.5 text-sm font-semibold transition " +
                          (active
                            ? "border-brand text-brand"
                            : "border-transparent text-ink-500 hover:text-ink-700")
                        }
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card">
                  {/* Table header */}
                  <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] items-center gap-4 border-b border-ink-200 bg-ink-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    <span>Assignment</span>
                    <span>Due Date</span>
                    <span>Status</span>
                    <span>Score</span>
                    <span className="text-right">Actions</span>
                  </div>

                  <ul>
                    {visible.map((a, i) => (
                      <li
                        key={a.id}
                        className={
                          "grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] items-center gap-4 px-5 py-4 text-sm " +
                          (i !== visible.length - 1
                            ? "border-b border-ink-100"
                            : "")
                        }
                      >
                        <div>
                          <div className="font-semibold text-ink-900">
                            {a.title}
                          </div>
                          <span className="mt-1 inline-flex rounded bg-ink-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-500">
                            {a.subject}
                          </span>
                        </div>

                        <div className="text-ink-700">{a.due}</div>

                        <div>
                          <StatusPill status={a.status} />
                        </div>

                        <div
                          className={
                            a.status === "graded"
                              ? "font-semibold text-emerald-600"
                              : "text-ink-500"
                          }
                        >
                          {a.score}
                        </div>

                        <div className="flex justify-end">
                          <ActionButton action={a.action} />
                        </div>
                      </li>
                    ))}
                  </ul>

                  {visible.length === 0 && (
                    <div className="px-5 py-10 text-center text-sm text-ink-500">
                      Nothing to show here yet.
                    </div>
                  )}
                </div>
              </section>

              {/* Right: tips */}
              <TipsCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ------------------------------- Components ------------------------------- */

function StatCard({
  icon: Icon,
  label,
  value,
  tileBg,
  tileColor,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  tileBg: string;
  tileColor: string;
}) {
  return (
    <article className="rounded-2xl border border-ink-200 bg-white p-4 shadow-card">
      <div className="flex items-center gap-2">
        <span
          className="flex size-6 items-center justify-center rounded-full"
          style={{ backgroundColor: tileBg }}
        >
          <Icon className="size-3.5" style={{ color: tileColor }} aria-hidden />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-ink-500">
          {label}
        </span>
      </div>
      <div className="mt-2 text-2xl font-bold text-ink-900">{value}</div>
    </article>
  );
}

function StatusPill({ status }: { status: StatusKey }) {
  const map: Record<
    StatusKey,
    { label: string; bg: string; text: string }
  > = {
    pending: { label: "Pending", bg: "#fde2e4", text: "#b91c1c" },
    "in-progress": { label: "In Progress", bg: "#fde4c7", text: "#c2410c" },
    submitted: { label: "Submitted", bg: "#bbf7d0", text: "#047857" },
    graded: { label: "Graded", bg: "#dbeafe", text: "#1d4ed8" },
  };
  const s = map[status];
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}

function ActionButton({ action }: { action: Assignment["action"] }) {
  if (action === "submit") {
    return (
      <button
        type="button"
        className="rounded-lg bg-brand px-4 py-1.5 text-xs font-semibold text-white shadow-card transition hover:bg-brand-600"
      >
        Submit
      </button>
    );
  }
  if (action === "continue") {
    return (
      <button
        type="button"
        className="rounded-lg border border-ink-200 bg-white px-4 py-1.5 text-xs font-semibold text-ink-700 transition hover:bg-ink-50"
      >
        Continue
      </button>
    );
  }
  if (action === "view") {
    return (
      <button
        type="button"
        className="text-xs font-semibold text-brand transition hover:underline"
      >
        View
      </button>
    );
  }
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 text-xs font-semibold text-brand transition hover:underline"
    >
      Feedback
      <ChevronRight className="size-3.5" aria-hidden />
    </button>
  );
}

function TipsCard() {
  const tips = [
    "Ensure all files are in PDF or DOCX format before uploading.",
    "Check the rubric attached to the assignment details for grading criteria.",
    "Late submissions will incur a 10% penalty per day.",
    "Reach out to your teacher via Messages if you need an extension.",
  ];
  return (
    <aside
      className="self-start rounded-2xl border border-amber-200 p-5 shadow-card"
      style={{ backgroundColor: "#fdeed1" }}
    >
      <header className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-amber-500 text-white">
          <Lightbulb className="size-4" aria-hidden />
        </span>
        <h3 className="text-sm font-bold text-ink-900">Tips: How to Submit</h3>
      </header>

      <ul className="mt-4 flex flex-col gap-3">
        {tips.map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm text-ink-700">
            <Check
              className="mt-0.5 size-4 shrink-0 text-emerald-600"
              aria-hidden
            />
            <span className="leading-5">{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
