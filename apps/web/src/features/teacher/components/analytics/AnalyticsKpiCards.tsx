import {
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useT } from "../../../../i18n/I18nProvider";
import { analyticsKpis } from "../../data/analytics";

export function AnalyticsKpiCards() {
  const t = useT();
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <Card
        icon={GraduationCap}
        iconBg="bg-indigo-100"
        iconColor="text-indigo-600"
        label={t("Average Class Grade")}
        value={`${analyticsKpis.avgGrade}%`}
        delta={analyticsKpis.avgGradeDelta}
      />
      <Card
        icon={CalendarCheck}
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
        label={t("Attendance Rate")}
        value={`${analyticsKpis.attendance}%`}
        delta={analyticsKpis.attendanceDelta}
      />
      <Card
        icon={CheckCircle2}
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        label={t("Completion Rate")}
        value={`${analyticsKpis.completion}%`}
        delta={analyticsKpis.completionDelta}
      />
    </div>
  );
}

function Card({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  delta,
}: {
  icon: typeof GraduationCap;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  delta: number;
}) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100">
      <header className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <DeltaBadge delta={delta} />
      </header>

      <p className="mt-5 text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
        {value}
      </p>
    </article>
  );
}

function DeltaBadge({ delta }: { delta: number }) {
  if (delta > 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
        <TrendingUp className="h-3 w-3" />
        {delta.toFixed(1)}%
      </span>
    );
  }
  if (delta < 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-700 ring-1 ring-rose-100">
        <TrendingDown className="h-3 w-3" />
        {delta.toFixed(1)}%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
      <Minus className="h-3 w-3" />
      {delta.toFixed(1)}%
    </span>
  );
}
