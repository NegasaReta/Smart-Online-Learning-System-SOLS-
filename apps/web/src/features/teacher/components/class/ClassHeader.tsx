import { Download, FlaskConical, Pencil } from "lucide-react";
import { useT } from "../../../../i18n/I18nProvider";
import { classInfo as defaultInfo } from "../../data/classManagement";

type Props = {
  info?: { department: string; title: string; meta: string };
  onEdit?: () => void;
  onExport?: () => void;
};

export function ClassHeader({ info, onEdit, onExport }: Props) {
  const t = useT();
  const data = info ?? defaultInfo;
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600">
          <FlaskConical className="h-4 w-4" />
          {data.department}
        </span>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
          {data.title}
        </h2>
        <p className="mt-0.5 text-sm text-slate-500">{data.meta}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          {t("Export Data")}
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          <Pencil className="h-4 w-4" />
          {t("Edit Class")}
        </button>
      </div>
    </header>
  );
}
