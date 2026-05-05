import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useT } from "../../../../i18n/I18nProvider";
import {
  subjectPerformance,
  type ProgressPeriodId,
  type SubjectPerformance as SubjectPerformanceData,
} from "../../data/progress";
import { SubjectDetailModal } from "./SubjectDetailModal";

type Props = {
  period: ProgressPeriodId;
};

export function SubjectPerformance({ period }: Props) {
  const t = useT();
  const [openSubject, setOpenSubject] =
    useState<SubjectPerformanceData | null>(null);

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900">{t("Subject Performance")}</h3>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {subjectPerformance.map((s) => {
          const Icon = s.icon;
          const data = s.byPeriod[period];
          return (
            <article
              key={s.id}
              className="group rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100 transition hover:shadow-md"
            >
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.iconBg}`}
                  >
                    <Icon className={`h-5 w-5 ${s.iconColor}`} />
                  </div>
                  <p className="text-base font-semibold text-slate-900">
                    {s.name}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${data.gradeBg} ${data.gradeColor}`}
                >
                  {data.grade}
                </span>
              </header>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{t("Progress to Next Level")}</span>
                  <span className="font-semibold text-slate-700">
                    {data.progress}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-[width] duration-500 ${s.barColor}`}
                    style={{ width: `${data.progress}%` }}
                  />
                </div>
              </div>

              <footer className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-500">{data.footnote}</p>
                <button
                  type="button"
                  onClick={() => setOpenSubject(s)}
                  className="inline-flex items-center gap-0.5 text-xs font-semibold text-amber-700 hover:text-amber-800"
                >
                  {t("View Details")}
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </footer>
            </article>
          );
        })}
      </div>

      <SubjectDetailModal
        subject={openSubject}
        period={period}
        onClose={() => setOpenSubject(null)}
      />
    </section>
  );
}
