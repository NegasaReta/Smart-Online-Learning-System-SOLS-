import { useState } from "react";
import { Trophy, Share2, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Dark encouragement card shown at the bottom of the tasks column.
 */
export function EncouragementCard() {
  const [shared, setShared] = useState(false);

  function handleShare() {
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  }

  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-900 p-5 text-white shadow-card">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/20">
          <Trophy className="size-5 text-amber-400" aria-hidden />
        </span>
        <div>
          <h3 className="text-sm font-bold">Keep it up, Elias!</h3>
          <p className="mt-1.5 text-xs leading-5 text-slate-300">
            You're in the top 10% of your class for consistent assignment
            submissions this month. 🎉
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
        >
          {shared ? (
            <><Check className="size-3.5 text-emerald-400" /> Shared!</>
          ) : (
            <><Share2 className="size-3.5" /> Share</>
          )}
        </button>
        <Link
          to="/student/grades"
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400/20 px-3 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-400/30"
        >
          <Star className="size-3.5" /> View Grades
        </Link>
      </div>
    </section>
  );
}
