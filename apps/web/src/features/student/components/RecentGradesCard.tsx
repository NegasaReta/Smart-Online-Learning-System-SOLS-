import { FileText, FlaskConical, BookOpen } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useT } from "@/i18n/I18nProvider";

type Grade = {
  assessment: string;
  subject: string;
  date: string;
  score: string;
  scoreTone: "success" | "pending";
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const grades: Grade[] = [
  {
    assessment: "Mid-Term Quiz",
    subject: "Mathematics",
    date: "Oct 12, 2024",
    score: "92/100",
    scoreTone: "success",
    icon: FileText,
  },
  {
    assessment: "Lab Report",
    subject: "Science",
    date: "Oct 10, 2024",
    score: "88/100",
    scoreTone: "success",
    icon: FlaskConical,
  },
  {
    assessment: "Essay Submission",
    subject: "Amharic",
    date: "Oct 05, 2024",
    score: "Pending",
    scoreTone: "pending",
    icon: BookOpen,
  },
];

/**
 * Recent Grades table — recent assessments with subject, date, and score.
 */
export function RecentGradesCard() {
  const { t } = useT();
  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <h3 className="text-sm font-semibold text-ink-900">
        {t("student.recentGrades")}
      </h3>

      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="border-b border-ink-200 text-left text-xs font-medium text-ink-500">
            <th className="pb-3 font-medium">Assessment</th>
            <th className="pb-3 font-medium">Subject</th>
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 text-right font-medium">Score</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g) => (
            <tr
              key={g.assessment}
              className="border-b border-ink-100 last:border-0"
            >
              <td className="py-3">
                <div className="flex items-center gap-2 text-ink-900">
                  <g.icon className="size-4 text-brand" aria-hidden />
                  <span className="font-medium">{g.assessment}</span>
                </div>
              </td>
              <td className="py-3 text-ink-700">{g.subject}</td>
              <td className="py-3 text-ink-500">{g.date}</td>
              <td
                className={
                  "py-3 text-right text-sm font-semibold " +
                  (g.scoreTone === "success"
                    ? "text-emerald-600"
                    : "text-brand")
                }
              >
                {g.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
