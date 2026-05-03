import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  Trash2,
  Users,
} from "lucide-react";
import { useT } from "../../../../i18n/I18nProvider";
import { authoringActions, useAuthoringStore } from "../../state/authoringStore";

const fmtDate = (d?: string) => {
  if (!d) return "No due date";
  try {
    return new Date(d).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return d;
  }
};

export function CourseList() {
  const t = useT();
  const courses = useAuthoringStore((s) => s.courses);
  if (courses.length === 0) return <Empty label={t("No courses yet. Create your first one.")} />;

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {courses.map((c) => (
        <li
          key={c.id}
          className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100"
        >
          <header className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{c.title}</p>
                <p className="text-xs text-slate-500">
                  {c.subject} · {c.grade}
                </p>
              </div>
            </div>
            <button
              onClick={() => authoringActions.removeCourse(c.id)}
              aria-label="Delete course"
              className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </header>
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-600">
            {c.description}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-[11px]">
            <Meta icon={CalendarDays} label={c.schedule} />
            <Meta label={`Room ${c.room}`} />
            <Meta icon={Users} label={`${c.capacity} ${t("seats")}`} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function QuizList() {
  const t = useT();
  const quizzes = useAuthoringStore((s) => s.quizzes);
  if (quizzes.length === 0)
    return <Empty label={t("No quizzes yet. Create one to assign to a class.")} />;

  return (
    <ul className="space-y-3">
      {quizzes.map((q) => {
        const totalPts = q.questions.reduce((s, x) => s + x.points, 0);
        return (
          <li
            key={q.id}
            className="flex items-start justify-between gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {q.title}
                  </p>
                  <StatusPill published={q.published} />
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {q.course} · {q.questions.length} questions · {totalPts} pts
                  · {q.durationMinutes} min · Due {fmtDate(q.dueDate)}
                </p>
                {q.description && (
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {q.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                onClick={() => authoringActions.toggleQuizPublished(q.id)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                {q.published ? t("Unpublish") : t("Publish")}
              </button>
              <button
                onClick={() => authoringActions.removeQuiz(q.id)}
                aria-label="Delete quiz"
                className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function AssignmentList() {
  const t = useT();
  const assignments = useAuthoringStore((s) => s.assignments);
  if (assignments.length === 0)
    return <Empty label={t("No assignments yet. Create one to share with students.")} />;

  return (
    <ul className="space-y-3">
      {assignments.map((a) => (
        <li
          key={a.id}
          className="flex items-start justify-between gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100"
        >
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate text-sm font-bold text-slate-900">
                  {a.title}
                </p>
                <StatusPill published={a.published} />
              </div>
              <p className="mt-0.5 text-xs text-slate-500">
                {a.course} · {a.totalPoints} pts · Due {fmtDate(a.dueDate)} ·{" "}
                {a.allowLate ? t("Late OK") : t("No late")}
              </p>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600">
                {a.instructions}
              </p>
              {a.attachments.length > 0 && (
                <p className="mt-1.5 text-[11px] font-medium text-indigo-600">
                  {a.attachments.length} {a.attachments.length !== 1 ? t("attachments") : t("attachment")}
                </p>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => authoringActions.toggleAssignmentPublished(a.id)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              {a.published ? t("Unpublish") : t("Publish")}
            </button>
            <button
              onClick={() => authoringActions.removeAssignment(a.id)}
              aria-label="Delete assignment"
              className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function StatusPill({ published }: { published: boolean }) {
  const t = useT();
  return published ? (
    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-100">
      {t("Published")}
    </span>
  ) : (
    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
      {t("Draft")}
    </span>
  );
}

function Meta({
  icon: Icon,
  label,
}: {
  icon?: typeof BookOpen;
  label: string;
}) {
  return (
    <p className="inline-flex items-center gap-1 text-slate-500">
      {Icon && <Icon className="h-3 w-3" />}
      <span className="truncate">{label}</span>
    </p>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 px-6 py-12 text-center">
      <p className="text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}
