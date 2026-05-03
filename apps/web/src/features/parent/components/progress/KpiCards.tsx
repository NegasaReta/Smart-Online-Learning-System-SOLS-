import { CalendarDays, GraduationCap, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useT } from "../../../../i18n/I18nProvider";
import {
  gpaSummaryByPeriod,
  gpaTrendByPeriod,
  type ProgressPeriodId,
} from "../../data/progress";

type Props = {
  period: ProgressPeriodId;
};

export function KpiCards({ period }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <GpaCard period={period} />
      <AttendanceCard />
      <CreditsCard />
    </div>
  );
}

function CardShell({
  label,
  icon: Icon,
  iconBg,
  iconColor,
  children,
}: {
  label: string;
  icon: typeof TrendingUp;
  iconBg: string;
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100">
      <header className="flex items-start justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </p>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon className={`h-4.5 w-4.5 h-[18px] w-[18px] ${iconColor}`} />
        </div>
      </header>
      {children}
    </section>
  );
}

function GpaCard({ period }: { period: ProgressPeriodId }) {
  const points = gpaTrendByPeriod[period];
  const summary = gpaSummaryByPeriod[period];
  const t = useT();
  const [hover, setHover] = useState<number | null>(
    points.length - 1
  );

  // Scale bars relative to a fixed 4.0 GPA max for honest visual comparison.
  const SCALE_MAX = 4.0;
  const SCALE_MIN = 2.5;
  const range = SCALE_MAX - SCALE_MIN;
  const heightFor = (gpa: number) =>
    Math.max(8, ((gpa - SCALE_MIN) / range) * 100);

  const active = hover != null ? points[hover] : points[points.length - 1];

  return (
    <CardShell
      label={t("Current GPA")}
      icon={TrendingUp}
      iconBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <p className="mt-3 text-4xl font-extrabold tracking-tight text-indigo-600">
        {(active?.gpa ?? summary.current).toFixed(2)}
      </p>
      <div className="mt-1 text-xs text-slate-500">
        {hover != null ? active?.label : t("Latest")}
      </div>

      <div
        className="mt-4 flex h-16 items-end gap-2"
        onMouseLeave={() => setHover(points.length - 1)}
      >
        {points.map((p, i) => {
          const isActive = hover === i;
          const isLatest = i === points.length - 1;
          return (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              aria-label={`${p.label}: GPA ${p.gpa.toFixed(2)}`}
              className="group relative flex-1 cursor-pointer focus:outline-none"
              style={{ height: "100%" }}
            >
              <span
                className={`block w-full rounded-t-md transition-colors ${
                  isActive || isLatest ? "bg-indigo-600" : "bg-indigo-200"
                } group-hover:bg-indigo-600`}
                style={{
                  height: `${heightFor(p.gpa)}%`,
                  marginTop: "auto",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
              {isActive && (
                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow">
                  {p.gpa.toFixed(2)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">
        <TrendingUp className="h-3 w-3" />
        {summary.deltaLabel}
      </p>
    </CardShell>
  );
}

function AttendanceCard() {
  const t = useT();
  const pct = 96;
  // Circular progress
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <CardShell
      label={t("Attendance Rate")}
      icon={CalendarDays}
      iconBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <p className="mt-3 text-4xl font-extrabold tracking-tight text-indigo-600">
        {pct}%
      </p>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={r}
              fill="none"
              stroke="#e0e7ff"
              strokeWidth="6"
            />
            <circle
              cx="32"
              cy="32"
              r={r}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-indigo-600">
            {pct}%
          </span>
        </div>
        <p className="text-sm leading-snug text-slate-600">
          {t("2 days absent this semester. Exceptional record.")}
        </p>
      </div>
    </CardShell>
  );
}

function CreditsCard() {
  const t = useT();
  const earned = 14;
  const total = 18;
  const pct = (earned / total) * 100;
  return (
    <CardShell
      label={t("Credits Earned")}
      icon={GraduationCap}
      iconBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <p className="mt-3 text-4xl font-extrabold tracking-tight text-indigo-600">
        {earned}
        <span className="ml-1 text-xl font-semibold text-slate-400">
          / {total}
        </span>
      </p>
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-3 text-center text-xs font-medium text-slate-500">
        {t("On track for promotion")}
      </p>
    </CardShell>
  );
}
