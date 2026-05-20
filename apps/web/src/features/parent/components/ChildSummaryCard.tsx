import { CalendarCheck, GraduationCap, Trophy } from "lucide-react";
import { useT } from "../../../i18n/I18nProvider";

export function ChildSummaryCard() {
  const t = useT();
  return (
    <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full p-1 ring-2 ring-indigo-500">
          <img
            src="https://i.pravatar.cc/160?img=12"
            alt="Alex Johnson"
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">
          Alex Johnson
        </h3>
        <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-500">
          <GraduationCap className="h-3.5 w-3.5" />
          Grade 10 · Lincoln High
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-indigo-50/60 p-4 ring-1 ring-indigo-100">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            <Trophy className="h-3.5 w-3.5 text-indigo-500" />
            {t("Overall GPA")}
          </div>
          <p className="mt-3 text-2xl font-bold text-indigo-600">3.8</p>
        </div>

        <div className="rounded-xl bg-emerald-50/60 p-4 ring-1 ring-emerald-100">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            <CalendarCheck className="h-3.5 w-3.5 text-emerald-500" />
            {t("Attendance")}
          </div>
          <p className="mt-3 text-2xl font-bold text-emerald-600">98%</p>
        </div>
      </div>
    </section>
  );
}
