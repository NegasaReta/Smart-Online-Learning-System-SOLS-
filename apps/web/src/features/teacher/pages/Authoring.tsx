import { BookOpen, ClipboardList, FileText, Plus } from "lucide-react";
import { useState } from "react";
import { useT } from "../../../i18n/I18nProvider";
import { AssignmentModal } from "../components/authoring/AssignmentModal";
import {
  AssignmentList,
  CourseList,
  QuizList,
} from "../components/authoring/AuthoringLists";
import { CourseModal } from "../components/authoring/CourseModal";
import { QuizModal } from "../components/authoring/QuizModal";
import { useAuthoringStore } from "../state/authoringStore";

type Tab = "courses" | "quizzes" | "assignments";

const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "quizzes", label: "Quizzes", icon: ClipboardList },
  { id: "assignments", label: "Assignments", icon: FileText },
];

type Props = {
  initialTab?: Tab;
};

export function Authoring({ initialTab = "courses" }: Props) {
  const t = useT();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [openCourse, setOpenCourse] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [openAssignment, setOpenAssignment] = useState(false);

  const courses = useAuthoringStore((s) => s.courses);
  const quizzes = useAuthoringStore((s) => s.quizzes);
  const assignments = useAuthoringStore((s) => s.assignments);
  const counts = {
    courses: courses.length,
    quizzes: quizzes.length,
    assignments: assignments.length,
  };

  const createCta = {
    courses: { label: t("New Course"), onClick: () => setOpenCourse(true) },
    quizzes: { label: t("New Quiz"), onClick: () => setOpenQuiz(true) },
    assignments: {
      label: t("New Assignment"),
      onClick: () => setOpenAssignment(true),
    },
  }[tab];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {t("Course & Content Authoring")}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {t("Create courses, build quizzes, and design assignments for your students.")}
          </p>
        </div>
        <button
          type="button"
          onClick={createCta.onClick}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          {createCta.label}
        </button>
      </header>

      <div className="rounded-xl bg-white p-1.5 shadow-card ring-1 ring-slate-100">
        <nav className="flex flex-wrap gap-1">
          {tabs.map((tb) => {
            const Icon = tb.icon;
            const isActive = tab === tb.id;
            const count = counts[tb.id];
            return (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t(tb.label)}
                <span
                  className={`rounded-full px-1.5 text-[10px] font-bold ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        {tab === "courses" && <CourseList />}
        {tab === "quizzes" && <QuizList />}
        {tab === "assignments" && <AssignmentList />}
      </div>

      <CourseModal open={openCourse} onClose={() => setOpenCourse(false)} />
      <QuizModal open={openQuiz} onClose={() => setOpenQuiz(false)} />
      <AssignmentModal
        open={openAssignment}
        onClose={() => setOpenAssignment(false)}
      />
    </div>
  );
}
