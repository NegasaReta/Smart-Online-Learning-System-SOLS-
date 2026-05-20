import { AlertTriangle, Info, Lightbulb, TrendingUp } from "lucide-react";
import { useT } from "../../../../i18n/I18nProvider";

export function SmartInsights() {
  const t = useT();
  return (
    <section className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100">
      <header className="inline-flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-amber-500" />
        <h3 className="text-sm font-bold text-slate-900">{t("Smart Insights")}</h3>
      </header>

      <div className="mt-4 space-y-3">
        <article className="flex gap-3 rounded-xl bg-rose-50 p-3 ring-1 ring-rose-100">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-rose-100">
            <Info className="h-3.5 w-3.5 text-rose-600" />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">{t("At-Risk Students")}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
              {t("3 students have dropped below 60% this week. Review recent quiz scores.")}
            </p>
          </div>
        </article>

        <article className="flex gap-3 rounded-xl bg-indigo-50 p-3 ring-1 ring-indigo-100">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-indigo-100">
            <TrendingUp className="h-3.5 w-3.5 text-indigo-600" />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">{t("Positive Trend")}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-indigo-700">
              {t("Overall class participation increased by 15% after implementing interactive labs.")}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
