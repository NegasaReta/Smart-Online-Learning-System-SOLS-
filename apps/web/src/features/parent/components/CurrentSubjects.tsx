import { ArrowRight } from "lucide-react";
import { useT } from "../../../i18n/I18nProvider";
import { subjects } from "../data/mock";

export function CurrentSubjects() {
  const t = useT();
  return (
    <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">
          {t("Current Subjects")}
        </h3>
        <button className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
          {t("View All")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <ul className="mt-5 space-y-5">
        {subjects.map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.id}>
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${s.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${s.iconColor}`} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {s.name}
                    </p>
                    <p className="text-sm font-semibold text-slate-700">
                      {s.progress}%
                    </p>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{s.detail}</p>

                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${s.barColor}`}
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
