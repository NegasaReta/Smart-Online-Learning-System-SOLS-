import { TrendingUp } from "lucide-react";
import { useT } from "../../../../i18n/I18nProvider";
import { weeklyStats, weeklySubjects } from "../../data/activity";

export function WeeklySummary() {
  const t = useT();
  const { activeHours, weeklyGoal, deltaFromLastWeek } = weeklyStats;
  const pct = Math.min(100, Math.round((activeHours / weeklyGoal) * 100));

  return (
    <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
      <header className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
          <TrendingUp className="h-4.5 w-4.5 h-[18px] w-[18px] text-indigo-600" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">{t("Weekly Summary")}</h3>
      </header>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="flex items-end justify-between gap-3">
          <p className="text-sm font-medium text-slate-600">{t("Active Study Hours")}</p>
          <p className="text-3xl font-extrabold tracking-tight text-slate-900">
            {activeHours}
          </p>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-1.5 text-right text-xs text-slate-500">
          +{deltaFromLastWeek} hrs from last week
        </p>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-slate-900">
          {t("Most Accessed Subjects")}
        </p>
        <ul className="mt-3 space-y-3">
          {weeklySubjects.map((s) => (
            <li
              key={s.name}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="inline-flex items-center gap-2.5 text-slate-700">
                <span
                  className={`h-2 w-2 rounded-full ${s.dotColor}`}
                  aria-hidden
                />
                {s.name}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {s.hours} hrs
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
