import { BookMarked, Calendar, ChevronDown, SlidersHorizontal, Search } from "lucide-react";
import { useT } from "../../../../i18n/I18nProvider";

export type ActivityFiltersValue = {
  range: string;
  type: string;
  subject: string;
};

type Props = {
  value: ActivityFiltersValue;
  onChange: (next: ActivityFiltersValue) => void;
};

const rangeOptions = ["Last 7 Days", "Last 30 Days", "This Semester", "All Time"];
const typeOptions = ["All Activities", "Quizzes", "Submissions", "System"];
const subjectOptions = [
  "All Subjects",
  "Physics",
  "Mathematics",
  "Literature",
  "System",
];

export function ActivityFilters({ value, onChange }: Props) {
  const t = useT();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterSelect
        icon={Calendar}
        value={value.range}
        options={rangeOptions}
        onChange={(v) => onChange({ ...value, range: v })}
      />
      <FilterSelect
        icon={SlidersHorizontal}
        value={value.type}
        options={typeOptions}
        onChange={(v) => onChange({ ...value, type: v })}
      />
      <FilterSelect
        icon={BookMarked}
        value={value.subject}
        options={subjectOptions}
        onChange={(v) => onChange({ ...value, subject: v })}
      />
    </div>
  );
}

function FilterSelect({
  icon: Icon,
  value,
  options,
  onChange,
}: {
  icon: typeof Calendar;
  value: string;
  options: string[];
  onChange: (next: string) => void;
}) {
  const t = useT();
  return (
    <label className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300">
      <span>{t(value)}</span>
      <Icon className="h-4 w-4 text-slate-400" />
      <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
      <select
        aria-label={value}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {t(opt)}
          </option>
        ))}
      </select>
    </label>
  );
}
