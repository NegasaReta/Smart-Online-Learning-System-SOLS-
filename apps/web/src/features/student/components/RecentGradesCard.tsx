import { FileText, FlaskConical, BookOpen } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <header className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink-900">
          {t("student.recentGrades")}
        </h3>
        <Link
          to="/student/grades"
          className="text-xs font-semibold text-brand hover:underline"
        >
          {t("common.viewAll")}
        </Link>
      </header>

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
              tabIndex={0}
              role="link"
              onClick={() => navigate("/student/grades")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate("/student/grades");
                }
              }}
              className="cursor-pointer border-b border-ink-100 outline-none transition last:border-0 hover:bg-ink-50 focus:bg-brand/5"
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
