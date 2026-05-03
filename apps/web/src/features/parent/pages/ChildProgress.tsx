import { useState } from "react";
import { useT } from "../../../i18n/I18nProvider";
import { KpiCards } from "../components/progress/KpiCards";
import { PeriodToggle } from "../components/progress/PeriodToggle";
import { StrengthsAndOpportunities } from "../components/progress/StrengthsAndOpportunities";
import { SubjectPerformance } from "../components/progress/SubjectPerformance";
import type { ProgressPeriodId } from "../data/progress";

export function ChildProgress() {
  const t = useT();
  const [period, setPeriod] = useState<ProgressPeriodId>("semester");

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {t("Progress Overview")}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {t("Tracking Alex's academic journey.")}
          </p>
        </div>
        <PeriodToggle value={period} onChange={setPeriod} />
      </header>

      <KpiCards period={period} />

      <SubjectPerformance period={period} />

      <StrengthsAndOpportunities />
    </div>
  );
}
