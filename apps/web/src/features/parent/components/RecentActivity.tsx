import { CheckCircle2, Clock, FileWarning } from "lucide-react";
import { useT } from "../../../i18n/I18nProvider";
import { recentActivity } from "../data/mock";

const dotStyles: Record<string, string> = {
  success: "bg-emerald-500",
  info: "bg-indigo-500",
  warning: "bg-amber-500",
};

export function RecentActivity() {
  const t = useT();
  return (
    <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
      <h3 className="text-base font-semibold text-slate-900">
        {t("Recent Activity")}
      </h3>

      <ul className="mt-5 space-y-5">
        {recentActivity.map((item, idx) => (
          <li key={item.id} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`mt-1 h-3 w-3 rounded-full ring-4 ring-white ${
                  dotStyles[item.status]
                }`}
              >
                {item.status === "success" && (
                  <CheckCircle2 className="hidden" />
                )}
              </div>
              {idx !== recentActivity.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-slate-200" />
              )}
            </div>

            <div className="-mt-0.5 flex-1 pb-1">
              <p className="text-sm font-semibold leading-snug text-slate-900">
                {item.title}
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="h-3 w-3" />
                {item.time}
              </p>

              {item.pendingGrade && (
                <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-100">
                  <FileWarning className="h-3 w-3" />
                  {t("Pending Grade")}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
