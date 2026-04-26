import { CheckCircle2, PlayCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useT } from "@/i18n/I18nProvider";

/** Slug for the active learning-path course. */
const COURSE_SLUG = "advanced-mathematics";

type Status = "completed" | "active" | "locked";

type Lesson = {
  chapter: string;
  lesson: string;
  title: string;
  status: Status;
};

const lessons: Lesson[] = [
  {
    chapter: "Chapter 4",
    lesson: "Lesson 1",
    title: "Intro to Quadratics",
    status: "completed",
  },
  {
    chapter: "Chapter 4",
    lesson: "Lesson 2",
    title: "Solving by Factoring",
    status: "active",
  },
  {
    chapter: "Chapter 4",
    lesson: "Lesson 3",
    title: "Completing the Square",
    status: "locked",
  },
];

/**
 * Learning Path card — vertical list of lessons with completed / active / locked states.
 */
export function LearningPathCard() {
  const { t } = useT();
  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <h3 className="text-sm font-semibold text-ink-900">
        {t("student.learningPath")}: Advanced Mathematics
      </h3>

      <ul className="mt-4 flex flex-col gap-2">
        {lessons.map((l) => (
          <LessonRow key={l.lesson} lesson={l} />
        ))}
      </ul>
    </section>
  );
}

function LessonRow({ lesson }: { lesson: Lesson }) {
  const { status } = lesson;

  if (status === "active") {
    return (
      <li className="flex items-center justify-between gap-3 rounded-xl border border-brand/30 bg-brand/5 px-3 py-3">
        <div className="flex items-center gap-3">
          <PlayCircle className="size-6 text-brand" aria-hidden />
          <div className="leading-tight">
            <div className="text-[11px] font-medium text-ink-500">
              <span className="font-semibold text-ink-700">{lesson.chapter}</span>{" "}
              · {lesson.lesson}
            </div>
            <div className="text-sm font-medium text-ink-900">{lesson.title}</div>
          </div>
        </div>
        <Link
          to={`/student/classes/${COURSE_SLUG}`}
          className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-600"
        >
          Resume
        </Link>
      </li>
    );
  }

  if (status === "locked") {
    return (
      <li className="flex items-center justify-between gap-3 rounded-xl bg-ink-50 px-3 py-3 text-ink-500">
        <div className="flex items-center gap-3">
          <span className="flex size-6 items-center justify-center rounded-full bg-ink-200">
            <Lock className="size-3.5 text-ink-500" aria-hidden />
          </span>
          <div className="leading-tight">
            <div className="text-[11px] font-medium">
              <span className="font-semibold">{lesson.chapter}</span> ·{" "}
              {lesson.lesson}
            </div>
            <div className="text-sm font-medium text-ink-700">
              {lesson.title}
            </div>
          </div>
        </div>
      </li>
    );
  }

  // completed
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 hover:bg-ink-50">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="size-6 text-brand" aria-hidden />
        <div className="leading-tight">
          <div className="text-[11px] font-medium text-ink-500">
            <span className="font-semibold text-ink-700">{lesson.chapter}</span>{" "}
            · {lesson.lesson}
          </div>
          <div className="text-sm font-medium text-ink-900">{lesson.title}</div>
        </div>
      </div>
      <Link
        to={`/student/classes/${COURSE_SLUG}`}
        className="text-xs font-semibold text-brand hover:underline"
      >
        Review
      </Link>
    </li>
  );
}
