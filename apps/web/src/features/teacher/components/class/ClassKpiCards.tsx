import { CalendarCheck, TrendingUp, Users } from "lucide-react";
import { useT } from "../../../../i18n/I18nProvider";
import { classInfo } from "../../data/classManagement";

export function ClassKpiCards() {
  const t = useT();
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <KpiCard
        icon={Users}
        iconBg="bg-indigo-100"
        iconColor="text-indigo-600"
        label={t("Total Students")}
        value={`${classInfo.totalStudents}`}
      />
      <KpiCard
        icon={CalendarCheck}
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
        label={t("Attendance Rate")}
        value={`${classInfo.attendanceRate}%`}
      />
      <KpiCard
        icon={TrendingUp}
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        label={t("Avg. Performance")}
        value={
          <span>
            {classInfo.avgPerformance}%{" "}
            <span className="text-base font-bold text-amber-600">
              {classInfo.avgGrade}
            </span>
          </span>
        }
      />
    </div>
  );
}

function KpiCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
}: {
  icon: typeof Users;
  iconBg: string;
  iconColor: string;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <article className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          {label}
        </p>
        <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
          {value}
        </p>
      </div>
    </article>
  );
}
