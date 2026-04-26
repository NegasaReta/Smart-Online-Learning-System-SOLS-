import {
  GraduationCap,
  Award,
  CalendarCheck,
  ChevronDown,
  Download,
  PartyPopper,
  CalendarDays,
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { ProgressOverTimeChart } from "../components/ProgressOverTimeChart";
import { SkillsRadarChartCard } from "../components/SkillsRadarChart";
import { SubjectBreakdownCard } from "../components/SubjectBreakdownCard";

/**
 * Grades / Performance Analytics page.
 * Layout matches the reference: header → 3 stat cards → charts row →
 * (Subject Breakdown + Teacher Remarks) → encouragement banner.
 */
export default function GradesPage() {
  return (
    <div className="flex min-h-screen bg-surface-page font-sans text-ink-900">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 pb-12 pt-6">
          <PageHeader />

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            <StatCard
              eyebrow="CUMULATIVE GPA"
              value="3.7"
              suffix="/ 4.0"
              footer={
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <span aria-hidden>↗</span> +0.2 from last term
                </span>
              }
              icon={<GraduationCap className="size-5" aria-hidden />}
              iconClass="bg-brand/10 text-brand"
              spark={<Sparkline color="#2563eb" />}
            />
            <StatCard
              eyebrow="CLASS RANK"
              value="12"
              suffix="/ 48"
              footer={
                <span className="inline-flex items-center gap-1 text-amber-600">
                  <span aria-hidden>★</span> Top 25% percentile
                </span>
              }
              icon={<Award className="size-5" aria-hidden />}
              iconClass="bg-amber-100 text-amber-600"
              spark={<Sparkline color="#f59e0b" />}
            />
            <StatCard
              eyebrow="ATTENDANCE"
              value="96"
              suffix="%"
              footer={
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <span aria-hidden>●</span> 2 absences total
                </span>
              }
              icon={<CalendarCheck className="size-5" aria-hidden />}
              iconClass="bg-emerald-100 text-emerald-600"
              spark={<Sparkline color="#10b981" />}
            />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
            <ProgressOverTimeChart />
            <SkillsRadarChartCard />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <SubjectBreakdownCard />
            <TeacherRemarksCard />
          </div>

          <EncouragementBanner />
        </main>
      </div>
    </div>
  );
}

/* ----------------------------- Page header ----------------------------- */

function PageHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl font-bold tracking-tight text-ink-900">
        Enhanced Performance Analytics Dashboard
      </h1>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 text-sm font-medium text-ink-700 shadow-card transition hover:bg-ink-50"
        >
          Fall 2024
          <ChevronDown className="size-4 text-ink-500" aria-hidden />
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white shadow-card transition hover:bg-brand-600"
        >
          <Download className="size-4" aria-hidden />
          Download PDF
        </button>
      </div>
    </header>
  );
}

/* ----------------------------- Stat card ----------------------------- */

type StatCardProps = {
  eyebrow: string;
  value: string;
  suffix?: string;
  footer: React.ReactNode;
  icon: React.ReactNode;
  iconClass: string;
  spark: React.ReactNode;
};

function StatCard({
  eyebrow,
  value,
  suffix,
  footer,
  icon,
  iconClass,
  spark,
}: StatCardProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
            {eyebrow}
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-ink-900">{value}</span>
            {suffix && (
              <span className="text-sm font-medium text-ink-500">{suffix}</span>
            )}
          </div>
          <p className="mt-2 text-xs font-medium">{footer}</p>
        </div>
        <span
          className={`flex size-10 items-center justify-center rounded-full ${iconClass}`}
        >
          {icon}
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 h-12 w-32 opacity-80">
        {spark}
      </div>
    </section>
  );
}

function Sparkline({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 40" className="h-full w-full">
      <defs>
        <linearGradient id={`g-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 30 Q15 22 30 26 T60 18 T90 22 T120 10"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M0 30 Q15 22 30 26 T60 18 T90 22 T120 10 L120 40 L0 40 Z"
        fill={`url(#g-${color})`}
      />
    </svg>
  );
}

/* --------------------------- Teacher Remarks --------------------------- */

function TeacherRemarksCard() {
  const remarks = [
    {
      avatar: "https://i.pravatar.cc/80?img=47",
      name: "Mrs. Davis",
      subject: "CALCULUS",
      subjectClass: "bg-brand/10 text-brand",
      date: "Oct 12",
      body:
        "Elias shows exceptional problem-solving skills. He consistently helps peers during group work.",
    },
    {
      avatar: "https://i.pravatar.cc/80?img=12",
      name: "Mr. Thompson",
      subject: "PHYSICS",
      subjectClass: "bg-emerald-100 text-emerald-700",
      date: "Sep 28",
      body:
        "Great participation in lab experiments, though written reports could use a bit more detail.",
    },
  ];

  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <header className="flex items-center justify-between">
        <h3 className="text-base font-bold text-ink-900">Teacher Remarks</h3>
        <a href="#" className="text-xs font-semibold text-brand hover:underline">
          View All
        </a>
      </header>
      <ul className="mt-4 space-y-4">
        {remarks.map((r) => (
          <li
            key={r.name}
            className="rounded-xl border border-ink-100 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <img
                src={r.avatar}
                alt={r.name}
                className="size-10 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-ink-900">
                      {r.name}
                    </span>
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wider ${r.subjectClass}`}
                    >
                      {r.subject}
                    </span>
                  </div>
                  <span className="text-xs text-ink-500">{r.date}</span>
                </div>
                <p className="mt-1.5 text-sm text-ink-700">{r.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------ Encouragement banner ------------------------ */

function EncouragementBanner() {
  return (
    <section
      className="mt-5 flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-2xl p-6 text-white shadow-card"
      style={{
        backgroundImage: "linear-gradient(135deg, #0b2a6b 0%, #1d4ed8 100%)",
      }}
    >
      <div className="flex items-start gap-3">
        <PartyPopper className="size-6 shrink-0 text-amber-300" aria-hidden />
        <div>
          <h3 className="text-lg font-bold">Great progress, Elias!</h3>
          <p className="mt-1 max-w-md text-sm text-white/80">
            You're on track for a fantastic semester. Let's discuss your next
            steps and college prep.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-ink-900 shadow-card transition hover:bg-ink-50"
      >
        <CalendarDays className="size-4" aria-hidden />
        Book a 1-on-1 Mentoring Session
      </button>
    </section>
  );
}
