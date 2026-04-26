import { Trophy } from "lucide-react";

/**
 * Dark encouragement card shown at the bottom of the tasks column.
 */
export function EncouragementCard() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-900 p-5 text-white shadow-card">
      <h3 className="pr-10 text-sm font-semibold">Keep it up, Elias!</h3>
      <p className="mt-2 pr-10 text-xs leading-5 text-slate-300">
        You're in the top 10% of your class for consistent assignment submissions
        this month.
      </p>
      <Trophy
        className="absolute right-4 bottom-4 size-10 text-white/20"
        aria-hidden
      />
    </section>
  );
}
