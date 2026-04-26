import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { useT } from "@/i18n/I18nProvider";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { OverallProgressCard } from "../components/OverallProgressCard";
import { UpNextCard } from "../components/UpNextCard";
import { LearningPathCard } from "../components/LearningPathCard";
import { CurrentCoursesCard } from "../components/CurrentCoursesCard";
import { RecentGradesCard } from "../components/RecentGradesCard";
import { UpcomingTasksPanel } from "../components/UpcomingTasksPanel";
import { EncouragementCard } from "../components/EncouragementCard";
import { WeeklyStudyHoursChart } from "../components/WeeklyStudyHoursChart";

/**
 * StudentDashboardPage — the Grade 10 student dashboard.
 * Layout: fixed left sidebar, top app bar, 2-column main grid (content + tasks).
 */
/**
 * Wraps a child in a staggered fade-in-up entry animation.
 * `delay` is in milliseconds.
 */
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function StudentDashboardPage() {
  const { t } = useT();
  return (
    <div className="flex min-h-screen bg-surface-page font-sans text-ink-900">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 pb-10 pt-6">
          {/* Welcome header */}
          <div
            className="mb-6 flex items-start justify-between gap-4 animate-fade-in-up"
            style={{ animationDelay: "0ms" }}
          >
            <div>
              <h1 className="text-xl font-semibold text-ink-900">
                {t("student.welcomeBack", { name: "" })}
                <span className="text-brand">Elias</span>{" "}
                <span aria-hidden>👋</span>
              </h1>
              <p className="mt-1 text-sm text-ink-500">
                {t("student.dueToday", { count: 2 })}
              </p>
            </div>
            <Link
              to="/student/schedule"
              className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 shadow-card transition hover:bg-ink-50"
            >
              <CalendarDays className="size-4" aria-hidden />
              {t("common.viewSchedule")}
            </Link>
          </div>

          {/* Two-column content grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            {/* Main column */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Reveal delay={80}>
                  <OverallProgressCard />
                </Reveal>
                <Reveal delay={160}>
                  <UpNextCard />
                </Reveal>
              </div>

              <Reveal delay={240}>
                <LearningPathCard />
              </Reveal>
              <Reveal delay={320}>
                <CurrentCoursesCard />
              </Reveal>
              <Reveal delay={400}>
                <WeeklyStudyHoursChart />
              </Reveal>
              <Reveal delay={480}>
                <RecentGradesCard />
              </Reveal>
            </div>

            {/* Right column */}
            <aside className="flex flex-col gap-6">
              <Reveal delay={200}>
                <UpcomingTasksPanel />
              </Reveal>
              <Reveal delay={360}>
                <EncouragementCard />
              </Reveal>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
