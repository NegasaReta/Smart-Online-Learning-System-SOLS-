import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, Clock, Target } from "lucide-react";
import {
  fetchWeeklyStudyHours,
  type WeeklyStudyHourPoint,
} from "../data/dashboardChartsData";

/**
 * WeeklyStudyHoursChart — composed bar + target-line chart of how many hours
 * the student studied per day this week vs. their daily target. Hovering a
 * bar highlights it and reveals the exact value via the custom tooltip.
 */
export function WeeklyStudyHoursChart() {
  const [data, setData] = useState<WeeklyStudyHourPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetchWeeklyStudyHours().then((d) => {
      if (!active) return;
      setData(d);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const totalHours = useMemo(
    () => data.reduce((sum, d) => sum + d.hours, 0),
    [data],
  );
  const targetHours = useMemo(
    () => data.reduce((sum, d) => sum + d.target, 0),
    [data],
  );
  const bestDay = useMemo(() => {
    if (!data.length) return null;
    return data.reduce((best, d) => (d.hours > best.hours ? d : best), data[0]);
  }, [data]);

  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-ink-900">
            Weekly Study Hours
          </h3>
          <p className="text-xs text-ink-500">
            Daily focus time vs. your 3-hour goal
          </p>
        </div>
        <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
          <Clock className="size-4" aria-hidden />
        </span>
      </header>

      {/* Stat strip */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Stat
          icon={<Clock className="size-3.5 text-brand" aria-hidden />}
          label="Total"
          value={`${totalHours.toFixed(1)}h`}
        />
        <Stat
          icon={<Target className="size-3.5 text-amber-500" aria-hidden />}
          label="Target"
          value={`${targetHours.toFixed(0)}h`}
        />
        <Stat
          icon={<TrendingUp className="size-3.5 text-emerald-600" aria-hidden />}
          label="Best Day"
          value={bestDay ? `${bestDay.day} · ${bestDay.hours}h` : "—"}
        />
      </div>

      <div className="mt-4 h-56 w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center text-xs text-ink-500">
            Loading chart…
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                unit="h"
              />
              <Tooltip
                cursor={false}
                content={<StudyTooltip />}
              />
              <Legend
                verticalAlign="top"
                height={28}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 11, color: "#475569" }}
              />
              <Bar
                dataKey="hours"
                name="Studied"
                radius={[6, 6, 0, 0]}
                onMouseEnter={(_, i) => setActiveIndex(i)}
              >
                {data.map((d, i) => (
                  <Cell
                    key={d.day}
                    fill={
                      activeIndex === i
                        ? "#1d4ed8"
                        : d.hours >= d.target
                          ? "#10b981"
                          : "#2563eb"
                    }
                  />
                ))}
              </Bar>
              <Line
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                activeDot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-ink-200 bg-surface-page px-3 py-2">
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-ink-500">
        {icon}
        {label}
      </div>
      <div className="mt-0.5 text-sm font-bold text-ink-900">{value}</div>
    </div>
  );
}

type TooltipPayload = {
  payload: WeeklyStudyHourPoint;
};

function StudyTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  const met = point.hours >= point.target;
  return (
    <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-xs shadow-card">
      <p className="font-semibold text-ink-900">{label}</p>
      <p className="mt-1 text-ink-700">
        Studied:{" "}
        <span className="font-bold text-brand">{point.hours}h</span>
      </p>
      <p className="text-ink-700">
        Target:{" "}
        <span className="font-bold text-amber-600">{point.target}h</span>
      </p>
      <p
        className={`mt-1 text-[11px] font-semibold ${
          met ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {met ? "Goal met" : `${(point.target - point.hours).toFixed(1)}h short`}
      </p>
    </div>
  );
}

