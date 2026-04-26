import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Utensils,
  Clock,
  Download,
  Link as LinkIcon,
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

/* ------------------------- Types & static data ------------------------- */

type EventKind = "live" | "assignment" | "exam" | "review";

type CalendarEvent = {
  id: string;
  title: string;
  subtitle?: string;
  extra?: string[];
  day: 0 | 1 | 2 | 3 | 4; // Mon..Fri
  startHour: number; // 8..16
  endHour: number; // exclusive
  kind: EventKind;
};

const events: CalendarEvent[] = [
  {
    id: "e1",
    title: "Physics …",
    subtitle: "Live",
    day: 0,
    startHour: 9,
    endHour: 10,
    kind: "live",
  },
  {
    id: "e2",
    title: "Study Gro…",
    subtitle: "Library",
    day: 1,
    startHour: 10,
    endHour: 12,
    kind: "review",
  },
  {
    id: "e3",
    title: "Essay Dra…",
    subtitle: "Eng Lit",
    day: 2,
    startHour: 9,
    endHour: 10,
    kind: "assignment",
  },
  {
    id: "e4",
    title: "Midterm Exam",
    subtitle: "Calculus II",
    extra: ["Room 402", "Bring calculator."],
    day: 2,
    startHour: 13,
    endHour: 15,
    kind: "exam",
  },
  {
    id: "e5",
    title: "Art History",
    subtitle: "Live",
    day: 4,
    startHour: 15,
    endHour: 16,
    kind: "live",
  },
];

type Upcoming = {
  id: string;
  title: string;
  dayPill: string;
  dayPillBg: string;
  dayPillText: string;
  time: string;
  location: string;
  cta: string;
};

const upcoming: Upcoming[] = [
  {
    id: "u1",
    title: "Essay Draft Due",
    dayPill: "Wed",
    dayPillBg: "#fef3c7",
    dayPillText: "#b45309",
    time: "9:00 AM",
    location: "English Lit",
    cta: "View Details",
  },
  {
    id: "u2",
    title: "Calculus Midterm",
    dayPill: "Thu",
    dayPillBg: "#fee2e2",
    dayPillText: "#b91c1c",
    time: "1:00 PM",
    location: "Room 402",
    cta: "Study Guide",
  },
  {
    id: "u3",
    title: "Art History Live",
    dayPill: "Fri",
    dayPillBg: "#dbeafe",
    dayPillText: "#1d4ed8",
    time: "3:00 PM",
    location: "Online",
    cta: "Prepare Link",
  },
];

const DAYS = [
  { label: "MON", date: 14 },
  { label: "TUE", date: 15 },
  { label: "WED", date: 16, today: true },
  { label: "THU", date: 17 },
  { label: "FRI", date: 18 },
];

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16]; // 8 AM – 4 PM labels
const ROW_HEIGHT = 72; // px per hour
const TIME_COL = 64; // px

const KIND_STYLES: Record<
  EventKind,
  { bg: string; border: string; title: string; subtitle: string }
> = {
  live: {
    bg: "#dbeafe",
    border: "#2563eb",
    title: "#1e3a8a",
    subtitle: "#1d4ed8",
  },
  assignment: {
    bg: "#fde4c7",
    border: "#f59e0b",
    title: "#7c2d12",
    subtitle: "#b45309",
  },
  exam: {
    bg: "#fee2e2",
    border: "#ef4444",
    title: "#7f1d1d",
    subtitle: "#991b1b",
  },
  review: {
    bg: "#bbf7d0",
    border: "#10b981",
    title: "#064e3b",
    subtitle: "#065f46",
  },
};

type View = "Day" | "Week" | "Month";

/* ----------------------------- Page component ----------------------------- */

export default function SchedulePage() {
  const [view, setView] = useState<View>("Week");

  const totalRows = HOURS.length; // 9 rows
  const gridHeight = totalRows * ROW_HEIGHT;

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6 lg:px-10">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            {/* LEFT — calendar card */}
            <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
              {/* Header */}
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-ink-900">
                    My Schedule
                  </h1>
                  <div className="mt-2 flex items-center gap-2 text-sm text-ink-700">
                    <button
                      type="button"
                      className="rounded-md p-1 hover:bg-ink-100"
                      aria-label="Previous week"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <span>Week of Oct 14–20</span>
                    <button
                      type="button"
                      className="rounded-md p-1 hover:bg-ink-100"
                      aria-label="Next week"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>

                {/* View toggle */}
                <div className="flex items-center rounded-full border border-ink-200 bg-white p-1 text-sm">
                  {(["Day", "Week", "Month"] as View[]).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setView(v)}
                      className={
                        "rounded-full px-4 py-1 font-semibold transition " +
                        (view === v
                          ? "bg-white text-ink-900 shadow-card"
                          : "text-ink-500 hover:text-ink-700")
                      }
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </header>

              {/* Calendar grid */}
              <div className="mt-5 overflow-hidden rounded-xl border border-ink-200">
                {/* Day headers */}
                <div
                  className="grid border-b border-ink-200 bg-white text-xs font-semibold text-ink-500"
                  style={{
                    gridTemplateColumns: `${TIME_COL}px repeat(${DAYS.length}, 1fr)`,
                  }}
                >
                  <div />
                  {DAYS.map((d) => (
                    <div
                      key={d.label}
                      className={
                        "flex flex-col items-center gap-1 py-2 " +
                        (d.today ? "bg-brand/5 text-brand" : "")
                      }
                    >
                      <span>{d.label}</span>
                      {d.today ? (
                        <span className="flex size-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                          {d.date}
                        </span>
                      ) : (
                        <span className="text-base font-bold text-ink-900">
                          {d.date}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Body with events overlay */}
                <div
                  className="relative"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `${TIME_COL}px repeat(${DAYS.length}, 1fr)`,
                    gridTemplateRows: `repeat(${totalRows}, ${ROW_HEIGHT}px)`,
                    height: gridHeight,
                  }}
                >
                  {/* Background cells */}
                  {HOURS.map((h, rowIdx) => (
                    <div key={`t-${h}`} style={{ gridColumn: 1, gridRow: rowIdx + 1 }}>
                      <div className="flex h-full items-start justify-end pr-3 pt-1 text-[11px] font-medium text-ink-500">
                        {formatHour(h)}
                      </div>
                    </div>
                  ))}

                  {HOURS.map((_, rowIdx) =>
                    DAYS.map((d, colIdx) => (
                      <div
                        key={`cell-${rowIdx}-${colIdx}`}
                        className={
                          "border-b border-l border-ink-100 " +
                          (d.today ? "bg-brand/5" : "")
                        }
                        style={{
                          gridColumn: colIdx + 2,
                          gridRow: rowIdx + 1,
                        }}
                      />
                    )),
                  )}

                  {/* Lunch row (12 PM — row index 4) */}
                  <div
                    className="flex items-center justify-center gap-2 bg-ink-100/80 text-sm font-semibold text-ink-700"
                    style={{
                      gridColumn: `2 / span ${DAYS.length}`,
                      gridRow: `${HOURS.indexOf(12) + 1}`,
                    }}
                  >
                    <Utensils className="size-4" aria-hidden />
                    Lunch Break
                  </div>

                  {/* Events */}
                  {events.map((ev) => {
                    const style = KIND_STYLES[ev.kind];
                    const rowStart = HOURS.indexOf(ev.startHour) + 1;
                    const rowSpan = ev.endHour - ev.startHour;
                    return (
                      <article
                        key={ev.id}
                        className="m-1 flex flex-col gap-1 rounded-md px-2 py-1.5 text-[11px]"
                        style={{
                          gridColumn: ev.day + 2,
                          gridRow: `${rowStart} / span ${rowSpan}`,
                          backgroundColor: style.bg,
                          borderLeft: `3px solid ${style.border}`,
                          color: style.title,
                        }}
                      >
                        <div
                          className="text-[12px] font-bold leading-tight"
                          style={{ color: style.title }}
                        >
                          {ev.title}
                        </div>
                        {ev.subtitle && (
                          <div
                            className="flex items-center gap-1 text-[11px] font-semibold"
                            style={{ color: style.subtitle }}
                          >
                            <Dot kind={ev.kind} />
                            {ev.subtitle}
                          </div>
                        )}
                        {ev.extra?.map((line) => (
                          <div
                            key={line}
                            className="text-[11px] leading-tight"
                            style={{ color: style.subtitle }}
                          >
                            {line}
                          </div>
                        ))}
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* Footer row: legend + actions */}
              <footer className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-700">
                  <LegendItem color="#2563eb" label="Live Class" />
                  <LegendItem color="#f59e0b" label="Assignment" />
                  <LegendItem color="#ef4444" label="Exam" />
                  <LegendItem color="#10b981" label="Review" />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2 text-xs font-semibold text-ink-700 transition hover:bg-ink-50"
                  >
                    <LinkIcon className="size-4" aria-hidden />
                    Sync with Google
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white shadow-card transition hover:bg-brand-600"
                  >
                    <Download className="size-4" aria-hidden />
                    ICS
                  </button>
                </div>
              </footer>
            </section>

            {/* RIGHT — upcoming panel */}
            <aside className="self-start rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
              <header className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-ink-900">
                  Upcoming This Week
                </h2>
                <span className="flex size-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                  {upcoming.length + 1}
                </span>
              </header>

              <div className="mt-4 flex flex-col gap-3">
                {upcoming.map((u) => (
                  <article
                    key={u.id}
                    className="rounded-xl border border-ink-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-bold text-ink-900">
                        {u.title}
                      </div>
                      <span
                        className="rounded-md px-2 py-0.5 text-[11px] font-bold"
                        style={{
                          backgroundColor: u.dayPillBg,
                          color: u.dayPillText,
                        }}
                      >
                        {u.dayPill}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
                      <Clock className="size-3.5" aria-hidden />
                      {u.time} · {u.location}
                    </div>
                    <button
                      type="button"
                      className="mt-3 w-full rounded-md border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 transition hover:bg-ink-50"
                    >
                      {u.cta}
                    </button>
                  </article>
                ))}
              </div>

              <div className="mt-4 text-center">
                <a
                  href="#"
                  className="text-sm font-semibold text-brand hover:underline"
                >
                  View All Upcoming
                </a>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ------------------------------ Small bits ------------------------------ */

function formatHour(h: number): string {
  if (h === 12) return "12 PM";
  if (h < 12) return `${h} AM`;
  return `${h - 12} PM`;
}

function Dot({ kind }: { kind: EventKind }) {
  return (
    <span
      className="inline-block size-1.5 rounded-full"
      style={{ backgroundColor: KIND_STYLES[kind].border }}
    />
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block size-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}
