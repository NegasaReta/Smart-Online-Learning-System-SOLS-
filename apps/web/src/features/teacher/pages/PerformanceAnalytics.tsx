import { useT } from "../../../i18n/I18nProvider";
import { AnalyticsGradeDistribution } from "../components/analytics/AnalyticsGradeDistribution";
import { AnalyticsKpiCards } from "../components/analytics/AnalyticsKpiCards";
import { PerformanceTrendChart } from "../components/analytics/PerformanceTrendChart";
import { SmartInsights } from "../components/analytics/SmartInsights";
import { StudentPerformanceRoster } from "../components/analytics/StudentPerformanceRoster";

export function PerformanceAnalytics() {
  const t = useT();
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
          {t("Performance Analytics")}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {t("Overview of Grade 10 Science")}
        </p>
      </header>

      <AnalyticsKpiCards />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <PerformanceTrendChart />
        <div className="space-y-5">
          <SmartInsights />
          <AnalyticsGradeDistribution />
        </div>
      </div>

      <StudentPerformanceRoster />
    </div>
  );
}
