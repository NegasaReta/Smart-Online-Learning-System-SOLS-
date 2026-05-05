import { CalendarCheck, GraduationCap, Trophy, X } from "lucide-react";
import { useEffect } from "react";
import { useT } from "../../../../i18n/I18nProvider";
import type {
  ProgressPeriodId,
  SubjectPerformance,
} from "../../data/progress";

type Props = {
  subject: SubjectPerformance | null;
  period: ProgressPeriodId;
  onClose: () => void;
};

const periodLabel: Record<ProgressPeriodId, string> = {
  month: "Past Month",
  semester: "This Semester",
  year: "Year to Date",
};

export function SubjectDetailModal({ subject, period, onClose }: Props) {
  useEffect(() => {
    if (!subject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [subject, onClose]);

  const t = useT();
  if (!subject) return null;
  const data = subject.byPeriod[period];
  const Icon = subject.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="subject-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-100">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>

        <header className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${subject.iconBg}`}
          >
            <Icon className={`h-6 w-6 ${subject.iconColor}`} />
          </div>
          <div className="min-w-0 flex-1">
            <h3
              id="subject-detail-title"
              className="text-xl font-bold text-slate-900"
            >
              {subject.name}
            </h3>
            <p className="text-xs text-slate-500">
              {t(periodLabel[period])} · {t("Teacher:")} {data.teacher}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-sm font-bold ${data.gradeBg} ${data.gradeColor}`}
          >
            {data.grade}
          </span>
        </header>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          {data.summary}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <Stat
            icon={Trophy}
            label={t("Progress")}
            value={`${data.progress}%`}
            color="text-indigo-600"
            bg="bg-indigo-50"
          />
          <Stat
            icon={CalendarCheck}
            label={t("Attendance")}
            value={`${data.attendance}%`}
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
          <Stat
            icon={GraduationCap}
            label={t("Assessments")}
            value={`${data.assessments.length}`}
            color="text-purple-600"
            bg="bg-purple-50"
          />
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-900">
            {t("Recent Assessments")}
          </p>
          <ul className="mt-3 divide-y divide-slate-100 rounded-xl ring-1 ring-slate-100">
            {data.assessments.map((a, i) => {
              const pct =
                a.outOf > 0 ? Math.round((a.score / a.outOf) * 100) : null;
              return (
                <li
                  key={i}
                  className="flex items-center justify-between px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-slate-900">{a.name}</p>
                    <p className="text-xs text-slate-500">{a.date}</p>
                  </div>
                  <p
                    className={`text-sm font-bold ${
                      pct == null
                        ? "text-amber-600"
                        : pct >= 85
                        ? "text-emerald-600"
                        : pct >= 70
                        ? "text-indigo-600"
                        : "text-rose-600"
                    }`}
                  >
                    {pct == null ? t("Pending") : `${a.score}/${a.outOf}`}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {t("Close")}
          </button>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            {t("Message Teacher")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: typeof Trophy;
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div className={`rounded-xl p-3 ring-1 ring-slate-100 ${bg}`}>
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
        {label}
      </div>
      <p className={`mt-1 text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}
