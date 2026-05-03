import { useT } from "../../../../i18n/I18nProvider";
import { gradeDistribution } from "../../data/analytics";

export function AnalyticsGradeDistribution() {
  const t = useT();
  return (
    <section className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100">
      <h3 className="text-sm font-bold text-slate-900">{t("Grade Distribution")}</h3>
      <ul className="mt-4 space-y-3">
        {gradeDistribution.map((g) => (
          <li key={g.letter} className="flex items-center gap-3">
            <span className="w-7 text-xs font-bold text-slate-700">
              {g.letter}
            </span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-indigo-50">
              <div
                className={`h-full rounded-full ${g.cls} transition-[width] duration-500`}
                style={{ width: `${g.percent}%` }}
              />
            </div>
            <span className="w-9 text-right text-xs font-semibold text-slate-600">
              {g.percent}%
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
