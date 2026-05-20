import { CheckCircle2 } from "lucide-react";
import type { ActivityEntry } from "../../data/activity";

const subjectStyles: Record<string, string> = {
  Physics: "bg-indigo-50 text-indigo-600",
  Mathematics: "bg-emerald-50 text-emerald-600",
  Literature: "bg-purple-50 text-purple-600",
  System: "bg-slate-100 text-slate-600",
};

const badgeTone: Record<string, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  info: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  warning: "bg-amber-50 text-amber-700 ring-amber-100",
};

export function ActivityCard({ entry }: { entry: ActivityEntry }) {
  const subjectClass =
    subjectStyles[entry.subject] ?? "bg-slate-100 text-slate-600";

  return (
    <article className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${subjectClass}`}
        >
          {entry.subject}
        </span>
        <span className="text-xs font-medium text-slate-500">{entry.time}</span>
      </div>

      <h4 className="mt-3 text-base font-semibold leading-snug text-slate-900">
        {entry.title}
      </h4>

      {entry.description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {entry.description}
        </p>
      )}

      {entry.badge && (
        <span
          className={`mt-3 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${
            badgeTone[entry.badge.tone]
          }`}
        >
          <CheckCircle2 className="h-3 w-3" />
          {entry.badge.label}
        </span>
      )}
    </article>
  );
}
