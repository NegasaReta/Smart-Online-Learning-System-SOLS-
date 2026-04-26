import { TrendingUp } from "lucide-react";
import { useT } from "@/i18n/I18nProvider";

/**
 * Overall Progress card — donut chart + short summary + weekly delta pill.
 */
export function OverallProgressCard() {
  const { t } = useT();
  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <header className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-ink-900">
            {t("student.overallProgress")}
          </h3>
          <p className="text-xs text-ink-500">{t("student.semester")}</p>
        </div>
        <span className="flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <TrendingUp className="size-4" aria-hidden />
        </span>
      </header>

      <div className="mt-4 flex items-center gap-4">
        <Donut value={75} />
        <p className="text-sm leading-snug text-ink-700">
          {t("student.progressMessage")}
        </p>
      </div>

      <div className="mt-4">
        <span className="inline-flex items-center rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          {t("student.weeklyDelta")}
        </span>
      </div>
    </section>
  );
}

function Donut({ value }: { value: number }) {
  const radius = 36;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="relative size-24 shrink-0">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={stroke}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#2563eb"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-ink-900">
        {value}%
      </span>
    </div>
  );
}
