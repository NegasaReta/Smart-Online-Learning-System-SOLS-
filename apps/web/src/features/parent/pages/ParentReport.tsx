import { Download, Printer } from "lucide-react";
import { useT } from "../../../i18n/I18nProvider";
import {
  subjectPerformance,
  strengths,
  opportunities,
  gpaSummaryByPeriod,
} from "../data/progress";
import { weeklyStats, weeklySubjects } from "../data/activity";

const student = {
  name: "Alex Johnson",
  grade: "Grade 10",
  section: "Section A",
  id: "STU-2024-0042",
  school: "EduSmart Academy",
  term: "Semester 1, 2024–25",
};

export function ParentReport() {
  const t = useT();
  const period = "semester" as const;
  const gpa = gpaSummaryByPeriod[period];

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const rows = subjectPerformance.map((s) => {
      const d = s.byPeriod[period];
      return [
        s.name,
        d.grade,
        `${d.progress}%`,
        `${d.attendance}%`,
        d.teacher,
        `"${d.summary.replace(/"/g, '""')}"`,
      ].join(",");
    });
    const header = "Subject,Grade,Score,Attendance,Teacher,Remarks";
    const meta = [
      `Student,${student.name}`,
      `ID,${student.id}`,
      `Class,${student.grade} – ${student.section}`,
      `Term,${student.term}`,
      `GPA,${gpa.current}`,
      "",
    ];
    const csv = [...meta, header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-card_${student.name.replace(/ /g, "_")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 print:max-w-none print:space-y-4 print:p-0">
      {/* Action bar (hidden when printing) */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
          {t("Report Card")}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Printer className="h-4 w-4" />
            {t("Print")}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            <Download className="h-4 w-4" />
            {t("Download Report")}
          </button>
        </div>
      </div>

      {/* Report Card Container */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100 print:rounded-none print:shadow-none print:ring-0">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-6 text-white print:bg-indigo-600">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{student.school}</h3>
              <p className="mt-0.5 text-sm text-indigo-100">
                {t("Student Report Card")} — {student.term}
              </p>
            </div>
            <div className="text-right text-sm">
              <p className="font-semibold">{t("Generated")}</p>
              <p className="text-indigo-200">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-2 gap-4 border-b border-slate-100 px-8 py-5 sm:grid-cols-4">
          <InfoCell label={t("Student Name")} value={student.name} />
          <InfoCell label={t("Student ID")} value={student.id} />
          <InfoCell label={t("Class")} value={`${student.grade} – ${student.section}`} />
          <InfoCell label={t("Term")} value={student.term} />
        </div>

        {/* GPA Summary */}
        <div className="flex flex-wrap items-center gap-6 border-b border-slate-100 px-8 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-2xl font-extrabold text-indigo-600">
              {gpa.current}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {t("Cumulative GPA")}
              </p>
              <p className="text-xs text-slate-500">{gpa.deltaLabel}</p>
            </div>
          </div>
          <div className="h-10 w-px bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {t("Weekly Study Hours")}
            </p>
            <p className="text-xs text-slate-500">
              {weeklyStats.activeHours}h / {weeklyStats.weeklyGoal}h {t("goal")}
            </p>
          </div>
          <div className="h-10 w-px bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {t("Top Subject")}
            </p>
            <p className="text-xs text-slate-500">{weeklySubjects[0]?.name}</p>
          </div>
        </div>

        {/* Subject Performance Table */}
        <div className="px-8 py-5">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
            {t("Subject Performance")}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">{t("Subject")}</th>
                  <th className="px-4 py-3 text-center">{t("Grade")}</th>
                  <th className="px-4 py-3 text-center">{t("Score")}</th>
                  <th className="px-4 py-3 text-center">{t("Attendance")}</th>
                  <th className="px-4 py-3">{t("Teacher")}</th>
                  <th className="py-3 pl-4">{t("Remarks")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjectPerformance.map((subj) => {
                  const d = subj.byPeriod[period];
                  return (
                    <tr key={subj.id} className="hover:bg-slate-50/60">
                      <td className="py-3.5 pr-4 font-medium text-slate-900">
                        {subj.name}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={`inline-block rounded-md px-2.5 py-1 text-xs font-bold ${d.gradeBg} ${d.gradeColor}`}
                        >
                          {d.grade}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${subj.barColor}`}
                              style={{ width: `${d.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-700">
                            {d.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center text-xs font-medium text-slate-700">
                        {d.attendance}%
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600">
                        {d.teacher}
                      </td>
                      <td className="py-3.5 pl-4 text-xs leading-relaxed text-slate-500">
                        {d.summary}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assessment Breakdown */}
        <div className="border-t border-slate-100 px-8 py-5">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
            {t("Assessment Breakdown")}
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {subjectPerformance.map((subj) => {
              const d = subj.byPeriod[period];
              return (
                <div
                  key={subj.id}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <p className="mb-2 text-xs font-bold text-slate-900">
                    {subj.name}
                  </p>
                  <ul className="space-y-1.5">
                    {d.assessments.map((a) => (
                      <li
                        key={a.name}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-600">{a.name}</span>
                        <span className="font-semibold text-slate-800">
                          {a.score > 0
                            ? `${a.score}/${a.outOf}`
                            : t("Pending")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths & Opportunities */}
        <div className="grid grid-cols-1 gap-0 border-t border-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-slate-100">
          <div className="px-8 py-5">
            <h4 className="mb-2 text-sm font-bold text-emerald-700">
              ✦ {t("Strengths")}
            </h4>
            <ul className="space-y-2">
              {strengths.map((s, i) => (
                <li
                  key={i}
                  className="text-xs leading-relaxed text-slate-600"
                >
                  • {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-8 py-5">
            <h4 className="mb-2 text-sm font-bold text-amber-700">
              ✦ {t("Areas for Improvement")}
            </h4>
            <ul className="space-y-2">
              {opportunities.map((o, i) => (
                <li
                  key={i}
                  className="text-xs leading-relaxed text-slate-600"
                >
                  • {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer / Signature area */}
        <div className="border-t border-slate-100 bg-slate-50/50 px-8 py-5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <SignatureLine label={t("Class Teacher")} />
            <SignatureLine label={t("Academic Advisor")} />
            <SignatureLine label={t("Parent / Guardian")} />
          </div>
          <p className="mt-4 text-center text-[10px] text-slate-400">
            {t("This is a system-generated report from")} {student.school}.{" "}
            {t("For queries, contact the school administration.")}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function SignatureLine({ label }: { label: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-1 h-px w-40 bg-slate-300" />
      <p className="text-[10px] font-medium text-slate-500">{label}</p>
    </div>
  );
}
