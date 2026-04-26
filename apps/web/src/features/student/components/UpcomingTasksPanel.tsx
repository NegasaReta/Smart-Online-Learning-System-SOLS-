import { AlertTriangle, FileText } from "lucide-react";
import { useT } from "@/i18n/I18nProvider";

/**
 * Upcoming Tasks — right-column panel with task cards + calendar link.
 */
export function UpcomingTasksPanel() {
  const { t } = useT();
  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <header className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink-900">
          {t("student.upcomingTasks")}
        </h3>
        <span className="flex size-6 items-center justify-center rounded-full bg-red-100 text-[11px] font-bold text-red-600">
          2
        </span>
      </header>

      <div className="mt-4 flex flex-col gap-4">
        {/* Task 1 — due tomorrow */}
        <article className="rounded-xl border-l-4 border-red-400 bg-ink-50 p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="text-sm font-semibold text-ink-900">
              Math Worksheet #5
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-red-600">
              <AlertTriangle className="size-3.5" aria-hidden />
              Due Tomorrow
            </div>
          </div>
          <p className="mt-1 text-xs text-ink-500">
            Complete all 15 algebra problems.
          </p>
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 shadow-card transition hover:bg-ink-50"
          >
            <FileText className="size-3.5" aria-hidden />
            Submit Assignment
          </button>
        </article>

        {/* Task 2 — due in 3 days */}
        <article className="rounded-xl border-l-4 border-brand bg-ink-50 p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="text-sm font-semibold text-ink-900">
              Science Project Proposal
            </div>
            <div className="text-xs font-semibold text-ink-500">Due in 3 days</div>
          </div>
          <p className="mt-1 text-xs text-ink-500">
            Submit your topic and initial research outline.
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white shadow-card transition hover:bg-brand-600"
          >
            Continue Working
          </button>
        </article>

        {/* Task 3 — next week */}
        <article className="px-1 py-1">
          <div className="flex items-start justify-between gap-2">
            <div className="text-sm font-semibold text-ink-900">
              Read Chapter 3
            </div>
            <div className="text-xs font-semibold text-ink-500">Next Week</div>
          </div>
          <p className="mt-1 text-xs text-ink-500">
            Amharic Literature prep for discussion.
          </p>
        </article>
      </div>

      <div className="mt-4 flex justify-center border-t border-ink-100 pt-4">
        <a href="#" className="text-xs font-semibold text-brand hover:underline">
          View Calendar
        </a>
      </div>
    </section>
  );
}
