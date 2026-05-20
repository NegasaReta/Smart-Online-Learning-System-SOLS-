import { X } from "lucide-react";
import { useEffect } from "react";
import { useT } from "../../../../i18n/I18nProvider";
import { gradeDistribution, students } from "../../data/classManagement";

type Props = {
  onClose: () => void;
};

export function GradeReportModal({ onClose }: Props) {
  const t = useT();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const total = gradeDistribution.reduce((s, d) => s + d.count, 0);
  const avg =
    students.length === 0
      ? 0
      : Math.round(
          students.reduce((s, st) => s + st.gradePct, 0) / students.length
        );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="grade-report-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h3
              id="grade-report-title"
              className="text-base font-semibold text-slate-900"
            >
              {t("Full Grade Report")}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              {t("Distribution across")} {total} {t("students")} &bull; {t("Class average")} {avg}%
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="max-h-[60vh] overflow-y-auto px-5 py-5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                <th className="py-2">{t("Grade")}</th>
                <th className="py-2">{t("Students")}</th>
                <th className="py-2">{t("% of Class")}</th>
                <th className="py-2">{t("Bar")}</th>
              </tr>
            </thead>
            <tbody>
              {gradeDistribution.map((d) => {
                const pct = total === 0 ? 0 : Math.round((d.count / total) * 100);
                return (
                  <tr
                    key={d.letter}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-2.5 font-semibold text-slate-900">
                      {d.letter}
                    </td>
                    <td className="py-2.5 text-slate-700">{d.count}</td>
                    <td className="py-2.5 text-slate-700">{pct}%</td>
                    <td className="py-2.5">
                      <div className="h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-indigo-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h4 className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {t("Top Performers")}
          </h4>
          <ul className="divide-y divide-slate-100 rounded-lg border border-slate-100">
            {[...students]
              .sort((a, b) => b.gradePct - a.gradePct)
              .slice(0, 5)
              .map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between px-3 py-2.5 text-sm"
                >
                  <span className="font-medium text-slate-800">{s.name}</span>
                  <span className="font-semibold text-indigo-600">
                    {s.grade} &bull; {s.gradePct}%
                  </span>
                </li>
              ))}
          </ul>
        </div>

        <footer className="flex justify-end border-t border-slate-100 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            {t("Close")}
          </button>
        </footer>
      </div>
    </div>
  );
}
