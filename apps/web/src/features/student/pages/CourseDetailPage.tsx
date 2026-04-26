import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Play,
  FileText,
  Mail,
  CheckCircle2,
  Lock,
  Video,
  BookOpen,
  FlaskConical,
  Users,
  ChevronLeft,
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import {
  fetchCourseBySlug,
  type CourseDetail,
  type Lesson,
  type LessonStatus,
  type ModuleTopic,
  type UpcomingItem,
} from "../data/courseDetailData";

/**
 * Course Detail page — opens when the student clicks a class card.
 * Shows the course header (with progress + Resume / Syllabus actions),
 * a module/lesson list, and a right-rail with instructor, course resources,
 * and upcoming items.
 *
 * Data comes from `fetchCourseBySlug(slug)`; swap with a real API later.
 */
export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchCourseBySlug(slug ?? "").then((c) => {
      if (!active) return;
      setCourse(c);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <div className="flex min-h-screen bg-surface-page font-sans text-ink-900">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 pb-12 pt-6">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-ink-500"
          >
            <Link to="/student/classes" className="hover:text-ink-700">
              Classes
            </Link>
            <ChevronRight className="size-4" aria-hidden />
            <span className="text-ink-900">{course?.title ?? "Course"}</span>
          </nav>

          {loading && (
            <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center text-sm text-ink-500">
              Loading course…
            </div>
          )}

          {!loading && !course && (
            <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center">
              <p className="text-sm text-ink-700">
                Course not found.{" "}
                <Link
                  to="/student/classes"
                  className="font-semibold text-brand hover:underline"
                >
                  Back to Classes
                </Link>
              </p>
            </div>
          )}

          {course && (
            <>
              <CourseHeader course={course} />

              <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
                {/* Modules column */}
                <section>
                  <h2 className="text-base font-bold text-ink-900">Modules</h2>
                  <div className="mt-3 flex flex-col gap-4">
                    {course.modules.map((m) => (
                      <ModuleCard key={m.id} module={m} />
                    ))}
                  </div>
                </section>

                {/* Right rail */}
                <aside className="flex flex-col gap-4">
                  <InstructorCard course={course} />
                  <ResourcesCard course={course} />
                  <UpcomingCard items={course.upcoming} />
                </aside>
              </div>

              {/* Back link for small screens */}
              <div className="mt-8 lg:hidden">
                <Link
                  to="/student/classes"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                  Back to Classes
                </Link>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

/* ------------------------------ Course header ------------------------------ */

function CourseHeader({ course }: { course: CourseDetail }) {
  return (
    <section className="relative mt-3 overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
      {/* Decorative gradient circle */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0) 65%)",
        }}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
            <FlaskConical className="size-3.5" aria-hidden />
            {course.badge}
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink-900">
            {course.title}
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            <span className="font-medium text-ink-700">
              Instructor: {course.instructor}
            </span>{" "}
            <span className="mx-1.5">·</span> {course.meta}
          </p>

          {/* Progress */}
          <div className="mt-5 max-w-[460px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-ink-500">Course Progress</span>
              <span className="font-semibold text-brand">
                {course.progress}%
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 flex-col gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-600"
          >
            <Play className="size-4 fill-white" aria-hidden />
            Resume Course
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-ink-200 bg-white px-5 text-sm font-semibold text-brand transition hover:bg-ink-50"
          >
            <FileText className="size-4" aria-hidden />
            Syllabus
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Module card ------------------------------ */

function ModuleCard({ module: m }: { module: ModuleTopic }) {
  const locked = m.state === "locked";

  return (
    <article
      className={`rounded-2xl border bg-white p-5 shadow-card ${
        locked ? "border-ink-200" : "border-ink-200"
      }`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className={`text-[11px] font-bold uppercase tracking-wider ${
              locked ? "text-ink-500" : "text-brand"
            }`}
          >
            {m.topic}
          </p>
          <h3
            className={`mt-1 text-lg font-bold ${
              locked ? "text-ink-700" : "text-ink-900"
            }`}
          >
            {m.title}
          </h3>
          {m.lockedMeta && (
            <p className="mt-1 text-xs text-ink-500">{m.lockedMeta}</p>
          )}
        </div>

        {m.progress !== null && (
          <div className="flex min-w-[180px] items-center gap-3 rounded-xl border border-ink-200 px-3 py-2">
            <span className="text-[11px] font-medium text-ink-500">
              Module Progress
            </span>
            <span className="text-xs font-semibold text-ink-900">
              {m.progress}%
            </span>
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
                style={{ width: `${m.progress}%` }}
              />
            </div>
          </div>
        )}

        {locked && (
          <span className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-500">
            <Lock className="size-3.5" aria-hidden />
            Locked
          </span>
        )}
      </header>

      {!locked && (
        <ul className="mt-4 flex flex-col">
          {m.lessons.map((l) => (
            <LessonRow key={l.id} lesson={l} />
          ))}
        </ul>
      )}
    </article>
  );
}

/* ------------------------------ Lesson row ------------------------------ */

function LessonRow({ lesson }: { lesson: Lesson }) {
  const isCurrent = lesson.status === "current";
  const isLocked = lesson.status === "locked";

  return (
    <li
      className={`relative flex flex-wrap items-center gap-4 rounded-xl px-3 py-3 ${
        isCurrent ? "bg-brand/5" : ""
      }`}
    >
      {isCurrent && (
        <span
          aria-hidden
          className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-brand"
        />
      )}

      <LessonStatusIcon status={lesson.status} />

      <div className="min-w-0 flex-1">
        <h4
          className={`text-sm font-semibold ${
            isCurrent
              ? "text-brand"
              : isLocked
                ? "text-ink-500"
                : "text-ink-900"
          }`}
        >
          {lesson.index} {lesson.title}
        </h4>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-500">
          <LessonMetaIcon kind={lesson.metaIcon} />
          {lesson.meta}
        </p>
      </div>

      {isCurrent && (
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-brand px-3 text-xs font-semibold text-white transition hover:bg-brand-600"
        >
          Start
        </button>
      )}
    </li>
  );
}

function LessonStatusIcon({ status }: { status: LessonStatus }) {
  switch (status) {
    case "completed":
      return (
        <span className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="size-5" aria-hidden />
        </span>
      );
    case "current":
      return (
        <span className="flex size-9 items-center justify-center rounded-full bg-brand text-white">
          <Play className="size-4 fill-white" aria-hidden />
        </span>
      );
    case "locked":
      return (
        <span className="flex size-9 items-center justify-center rounded-full bg-ink-100 text-ink-400">
          <Lock className="size-4" aria-hidden />
        </span>
      );
  }
}

function LessonMetaIcon({ kind }: { kind: Lesson["metaIcon"] }) {
  const cls = "size-3.5";
  switch (kind) {
    case "video":
      return <Video className={cls} aria-hidden />;
    case "book":
      return <BookOpen className={cls} aria-hidden />;
    case "lab":
      return <FlaskConical className={cls} aria-hidden />;
    case "quiz":
      return <FileText className={cls} aria-hidden />;
  }
}

/* --------------------------- Right rail blocks --------------------------- */

function InstructorCard({ course }: { course: CourseDetail }) {
  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-500">
        Instructor
      </h3>
      <div className="mt-3 flex items-center gap-3">
        <img
          src={course.instructorBio.avatar}
          alt={course.instructorBio.name}
          className="size-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-bold text-ink-900">
            {course.instructorBio.name}
          </p>
          <a
            href="#"
            className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
          >
            <Mail className="size-3.5" aria-hidden />
            Message
          </a>
        </div>
      </div>
    </section>
  );
}

function ResourcesCard({ course }: { course: CourseDetail }) {
  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-500">
        Course Resources
      </h3>
      <ul className="mt-3 flex flex-col gap-3">
        {course.resources.map((r) => (
          <li key={r.id}>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-1 py-1 text-sm text-ink-900 transition hover:bg-ink-50"
            >
              <ResourceIcon kind={r.iconKey} />
              <span className="font-medium">{r.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ResourceIcon({ kind }: { kind: "textbook" | "lab" | "forum" }) {
  switch (kind) {
    case "textbook":
      return (
        <span className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <BookOpen className="size-5" aria-hidden />
        </span>
      );
    case "lab":
      return (
        <span className="flex size-9 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
          <FlaskConical className="size-5" aria-hidden />
        </span>
      );
    case "forum":
      return (
        <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Users className="size-5" aria-hidden />
        </span>
      );
  }
}

function UpcomingCard({ items }: { items: UpcomingItem[] }) {
  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <header className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-500">
          Upcoming
        </h3>
        <a href="#" className="text-xs font-semibold text-brand hover:underline">
          View All
        </a>
      </header>
      <ul className="mt-3 flex flex-col gap-3">
        {items.map((u) => (
          <li
            key={u.id}
            className="flex items-center gap-3 rounded-xl border border-ink-100 p-2.5"
          >
            <span className="flex size-12 flex-col items-center justify-center rounded-lg bg-rose-50 text-rose-600">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {u.monthShort}
              </span>
              <span className="text-base font-bold leading-none">{u.day}</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900">
                {u.title}
              </p>
              <p className="mt-0.5 text-xs font-medium text-rose-600">
                {u.due}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
