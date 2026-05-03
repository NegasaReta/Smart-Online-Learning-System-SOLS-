import { useState } from "react";
import { Timer, ChevronRight, Clock, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useT } from "@/i18n/I18nProvider";

const LESSON_SLUG = "advanced-mathematics";

/**
 * "Up Next" card — highlights the next upcoming live lesson.
 * Uses the brand gradient from the login page for visual continuity.
 */
export function UpNextCard() {
  const { t } = useT();
  const navigate = useNavigate();
  const [joining, setJoining] = useState(false);

  function handleJoin() {
    setJoining(true);
    // Brief "Joining…" feedback before routing into the live lesson.
    setTimeout(() => {
      navigate(`/student/classes/${LESSON_SLUG}`);
    }, 600);
  }

  return (
    <section
      className="relative overflow-hidden rounded-2xl p-5 text-white shadow-card"
      style={{
        backgroundImage:
          "linear-gradient(141deg, #0b2a6b 0%, #1d4ed8 60%, #2170e4 100%)",
      }}
    >
      <header className="flex items-start justify-between">
        <span className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
          {t("student.upNext")}
        </span>
        <span className="flex size-7 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
          <Timer className="size-4" aria-hidden />
        </span>
      </header>

      {/* Breadcrumb */}
      <Link
        to={`/student/classes/${LESSON_SLUG}`}
        className="mt-3 flex flex-wrap items-center gap-1 text-[11px] font-medium text-brand-100 hover:underline"
        aria-label="Open lesson detail"
      >
        <span>Advanced Mathematics</span>
        <ChevronRight className="size-3" aria-hidden />
        <span>Chapter 4</span>
        <ChevronRight className="size-3" aria-hidden />
        <span>Lesson 2</span>
      </Link>

      <h3 className="mt-1 text-lg font-semibold leading-6 text-white">
        Quadratic Equations
      </h3>

      {/* Inner light card */}
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-white/10 p-2 pl-3 backdrop-blur">
        <div className="flex items-center gap-2 text-xs text-white">
          <Clock className="size-4" aria-hidden />
          Starts in 15 mins
        </div>
        <button
          type="button"
          onClick={handleJoin}
          disabled={joining}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-brand shadow-card transition hover:bg-brand-50 disabled:opacity-80"
        >
          {joining ? (
            <>
              <Check className="size-3.5" aria-hidden />
              Joining…
            </>
          ) : (
            "Join Class"
          )}
        </button>
      </div>
    </section>
  );
}
