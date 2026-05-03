import { useT } from "../../../../i18n/I18nProvider";
import type { ProgressPeriodId } from "../../data/progress";

export const PROGRESS_PERIODS: { id: ProgressPeriodId; label: string }[] = [
  { id: "month", label: "Past Month" },
  { id: "semester", label: "This Semester" },
  { id: "year", label: "Year to Date" },
];

type Props = {
  value: ProgressPeriodId;
  onChange: (next: ProgressPeriodId) => void;
};

export function PeriodToggle({ value, onChange }: Props) {
  const t = useT();
  return (
    <div
      role="tablist"
      aria-label="Progress period"
      className="inline-flex items-center rounded-xl bg-white p-1 ring-1 ring-slate-200"
    >
      {PROGRESS_PERIODS.map((p) => {
        const active = p.id === value;
        return (
          <button
            key={p.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(p.id)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              active
                ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t(p.label)}
          </button>
        );
      })}
    </div>
  );
}
