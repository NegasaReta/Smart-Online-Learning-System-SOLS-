import { useEffect, useState } from "react";
import {
  fetchSubjectBreakdown,
  type SubjectBreakdown,
} from "../data/gradesData";

/**
 * Animated subject breakdown — bars grow from 0 → score% on mount and have a
 * subtle shimmer overlay. Data is fetched via `fetchSubjectBreakdown()`;
 * swap with a real API call later.
 */
export function SubjectBreakdownCard() {
  const [rows, setRows] = useState<SubjectBreakdown[]>([]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let active = true;
    fetchSubjectBreakdown().then((data) => {
      if (!active) return;
      setRows(data);
      // Trigger animation on the next paint so the transition runs.
      requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <h3 className="text-base font-bold text-ink-900">Subject Breakdown</h3>
      <ul className="mt-5 space-y-5">
        {rows.map((r) => (
          <li key={r.name}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-ink-900">{r.name}</span>
              <span className="text-ink-700">
                <span className="font-semibold">{r.score}%</span>
                <span className="ml-2 rounded bg-ink-100 px-1.5 py-0.5 text-[11px] font-bold text-ink-700">
                  {r.grade}
                </span>
              </span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-ink-100">
              <div
                className={`relative h-full rounded-full ${r.color} transition-[width] duration-[1200ms] ease-out`}
                style={{ width: animate ? `${r.score}%` : "0%" }}
              >
                {/* Shimmer */}
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full animate-shimmer rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
