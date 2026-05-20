import { useEffect, useMemo, useState } from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useT } from "@/i18n/I18nProvider";

type SubjectProgress = {
  /** Subject name shown in legend / hover label */
  name: string;
  /** Completion percent (0..100) */
  value: number;
  color: string;
};

const subjects: SubjectProgress[] = [
  { name: "Mathematics", value: 82, color: "#2563eb" },
  { name: "Science",     value: 65, color: "#10b981" },
  { name: "Amharic",     value: 90, color: "#f59e0b" },
  { name: "English",     value: 72, color: "#8b5cf6" },
  { name: "History",     value: 55, color: "#ef4444" },
];

const SIZE = 168;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * RADIUS;
/** Small visual gap (degrees) between segments to keep them distinct. */
const GAP_DEG = 3;

/**
 * OverallProgressCard — animated multi-segment donut showing per-subject
 * progress. Hovering a segment highlights it and reveals the subject name +
 * value in the center; clicking the card navigates to the Grades page.
 *
 * Mock data lives in `subjects` above; swap with an API call once available.
 */
export function OverallProgressCard() {
  const { t } = useT();
  const [hovered, setHovered] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Trigger the stroke draw-on animation on the next frame after mount.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const average = useMemo(
    () => Math.round(subjects.reduce((s, x) => s + x.value, 0) / subjects.length),
    [],
  );

  // Build segments. We give each subject an equal slice of the donut, and the
  // visible-fill within that slice represents its individual completion %.
  const segments = useMemo(() => {
    const sliceDeg = 360 / subjects.length;
    return subjects.map((s, i) => {
      const startDeg = i * sliceDeg + GAP_DEG / 2;
      const fillDeg = Math.max(0, sliceDeg - GAP_DEG) * (s.value / 100);
      return { ...s, startDeg, fillDeg, sliceDeg };
    });
  }, []);

  const center = hovered !== null ? subjects[hovered] : null;

  return (
    <Link
      to="/student/grades"
      className="group relative block rounded-2xl border border-ink-200 bg-white p-5 shadow-card transition hover:border-brand/40 hover:shadow-md"
    >
      <header className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-ink-900">
            {t("student.overallProgress")}
          </h3>
          <p className="mt-0.5 text-xs text-ink-500">
            Hover a segment for details
          </p>
        </div>
        <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 transition group-hover:scale-110">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </header>

      <div className="mt-4 flex items-center gap-5">
        {/* Donut */}
        <div
          className="relative shrink-0"
          style={{ width: SIZE, height: SIZE }}
          onMouseLeave={() => setHovered(null)}
        >
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="-rotate-90"
            role="img"
            aria-label={`Overall progress ${average}%`}
          >
            {/* Track */}
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={STROKE}
            />

            {segments.map((s, i) => {
              const fillFrac = s.fillDeg / 360;
              const dash = mounted ? CIRC * fillFrac : 0;
              const offset = -CIRC * (s.startDeg / 360);
              const isHovered = hovered === i;
              return (
                <circle
                  key={s.name}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={isHovered ? STROKE + 2 : STROKE}
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${CIRC}`}
                  strokeDashoffset={offset}
                  style={{
                    transition:
                      "stroke-dasharray 900ms cubic-bezier(0.22,1,0.36,1), stroke-width 200ms ease",
                    transitionDelay: `${i * 90}ms`,
                    opacity: hovered === null || isHovered ? 1 : 0.35,
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHovered(i)}
                />
              );
            })}
          </svg>

          {/* Center label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            {center ? (
              <>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">
                  {center.name}
                </span>
                <span
                  className="text-3xl font-bold leading-none"
                  style={{ color: center.color }}
                >
                  {center.value}%
                </span>
              </>
            ) : (
              <>
                <span className="text-3xl font-bold text-brand">
                  {average}%
                </span>
                <span className="mt-0.5 text-xs text-ink-500">Average</span>
                <span className="mt-1.5 inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <TrendingUp className="size-3" aria-hidden />
                  +5%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <ul className="flex flex-1 flex-col gap-1.5">
          {subjects.map((s, i) => {
            const isHovered = hovered === i;
            return (
              <li
                key={s.name}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={
                  "flex cursor-pointer items-center justify-between gap-2 rounded-md px-1.5 py-1 transition " +
                  (isHovered ? "bg-ink-50" : "hover:bg-ink-50")
                }
              >
                <span className="flex items-center gap-2 text-xs text-ink-700">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: s.color }}
                    aria-hidden
                  />
                  {s.name}
                </span>
                <span className="text-xs font-bold text-ink-900">
                  {s.value}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Link>
  );
}
