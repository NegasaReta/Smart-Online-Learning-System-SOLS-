import { useState } from "react";
import {
  Download,
  GraduationCap,
  IdCard,
  TrendingUp,
  BookOpen,
  User,
  Lock,
  Copy,
  Check,
} from "lucide-react";

const profile = {
  gradeLevel: "Sophomore",
  studentId: "STU-8492-BX",
  enrollmentDate: "August 24, 2022",
};

const gpa = {
  value: 3.84,
  outOf: 4.0,
  standing: "Dean's List",
  percentile: "Top 15% of cohort",
  /** 0..1 fill of the standing bar. */
  fill: 0.85,
};

const semester = {
  label: "Spring 2024",
  subjects: [
    {
      code: "CS 301",
      codeClass: "bg-violet-100 text-violet-700",
      credits: 4,
      title: "Data Structures & Algorithms",
      teacher: "Prof. E. Chen",
    },
    {
      code: "ENG 210",
      codeClass: "bg-emerald-100 text-emerald-700",
      credits: 3,
      title: "Technical Writing",
      teacher: "Dr. A. Miller",
    },
    {
      code: "MAT 205",
      codeClass: "bg-amber-100 text-amber-700",
      credits: 4,
      title: "Linear Algebra",
      teacher: "Prof. J. Davis",
    },
    {
      code: "HIS 102",
      codeClass: "bg-brand/10 text-brand",
      credits: 3,
      title: "Modern World History",
      teacher: "Dr. S. Rahman",
    },
  ],
};

/** Academic Details — student record, GPA card, semester subjects, transcript. */
export default function SettingsAcademicPage() {
  function handleTranscript() {
    // Mock transcript download — generates a tiny .txt blob and saves it.
    const lines = [
      "Academic Transcript",
      "===================",
      `Student ID: ${profile.studentId}`,
      `Grade Level: ${profile.gradeLevel}`,
      `Enrollment Date: ${profile.enrollmentDate}`,
      `Cumulative GPA: ${gpa.value} / ${gpa.outOf}`,
      `Academic Standing: ${gpa.standing}`,
      "",
      `${semester.label} Subjects:`,
      ...semester.subjects.map(
        (s) => `  • ${s.code} — ${s.title} (${s.credits} credits) — ${s.teacher}`,
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "academic-transcript.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">
            Academic Details
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Review your current academic standing and enrollment records.
          </p>
        </div>
        <button
          type="button"
          onClick={handleTranscript}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white shadow-card transition hover:bg-brand-600"
        >
          <Download className="size-4" aria-hidden />
          Academic Transcript
        </button>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <ProfileCard />
        <GpaCard />
      </div>

      <SemesterCard />
    </>
  );
}

/* ----------------------------- Profile card ----------------------------- */

function ProfileCard() {
  const [copied, setCopied] = useState(false);

  function copyId() {
    navigator.clipboard?.writeText(profile.studentId).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <header className="flex items-center gap-2">
        <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <IdCard className="size-5" aria-hidden />
        </span>
        <h2 className="text-base font-bold text-ink-900">
          Student Profile Record
        </h2>
      </header>

      <hr className="my-4 border-ink-100" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
            Current Grade Level
          </p>
          <p className="mt-1.5 text-base font-bold text-ink-900">
            {profile.gradeLevel}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
            Student ID
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="rounded-md bg-ink-100 px-2 py-1 font-mono text-sm font-semibold text-ink-700">
              {profile.studentId}
            </span>
            <button
              type="button"
              onClick={copyId}
              aria-label="Copy student ID"
              className="rounded-md p-1.5 text-ink-500 transition hover:bg-ink-100 hover:text-ink-700"
            >
              {copied ? (
                <Check className="size-3.5 text-emerald-600" aria-hidden />
              ) : (
                <Lock className="size-3.5" aria-hidden />
              )}
            </button>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
            Enrollment Date
          </p>
          <p className="mt-1.5 text-base font-bold text-ink-900">
            {profile.enrollmentDate}
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- GPA card -------------------------------- */

function GpaCard() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl p-5 text-white shadow-card"
      style={{
        backgroundImage: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
      }}
    >
      <header className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/90">Cumulative GPA</h3>
        <TrendingUp className="size-4 text-white/80" aria-hidden />
      </header>
      <p className="mt-3 text-4xl font-bold tracking-tight">{gpa.value}</p>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/80">Academic Standing</span>
          <span className="font-bold">{gpa.standing}</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-[width] duration-700 ease-out"
            style={{ width: `${Math.round(gpa.fill * 100)}%` }}
          />
        </div>
        <p className="mt-2 text-right text-xs text-white/80">
          {gpa.percentile}
        </p>
      </div>
    </section>
  );
}

/* ----------------------------- Semester card ----------------------------- */

function SemesterCard() {
  return (
    <section className="mt-5 rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-bold text-ink-900">
          <BookOpen className="size-4 text-brand" aria-hidden />
          Current Semester Subjects
        </h2>
        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
          {semester.label}
        </span>
      </header>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {semester.subjects.map((s) => (
          <article
            key={s.code}
            className="rounded-xl border border-ink-200 bg-white p-4 transition hover:shadow-card"
          >
            <div className="flex items-center justify-between">
              <span
                className={`rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wider ${s.codeClass}`}
              >
                {s.code}
              </span>
              <span className="text-xs font-semibold text-ink-500">
                {s.credits} Credits
              </span>
            </div>
            <h3 className="mt-2.5 text-sm font-bold leading-snug text-ink-900">
              {s.title}
            </h3>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
              <User className="size-3.5" aria-hidden />
              {s.teacher}
            </p>
          </article>
        ))}
      </div>

      <footer className="mt-5 flex items-center gap-2 text-xs text-ink-500">
        <GraduationCap className="size-3.5" aria-hidden />
        Total enrolled credits:{" "}
        <span className="font-bold text-ink-700">
          {semester.subjects.reduce((sum, s) => sum + s.credits, 0)}
        </span>
      </footer>
    </section>
  );
}
