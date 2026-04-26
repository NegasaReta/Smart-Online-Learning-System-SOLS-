import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MoreHorizontal } from "lucide-react";
import {
  fetchProgressOverTime,
  type ProgressPoint,
} from "../data/gradesData";

/**
 * Real interactive line/area chart for the Grades page.
 * Data is fetched via `fetchProgressOverTime()` — swap that with a real API
 * call (or react-query) when the backend is wired up; the props shape stays
 * the same.
 */
export function ProgressOverTimeChart() {
  const [data, setData] = useState<ProgressPoint[]>([]);

  useEffect(() => {
    let active = true;
    fetchProgressOverTime().then((rows) => {
      if (active) setData(rows);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <header className="flex items-start justify-between">
        <h3 className="text-base font-bold text-ink-900">Progress Over Time</h3>
        <button
          type="button"
          aria-label="More"
          className="rounded-md p-1 text-ink-500 hover:bg-ink-100"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </header>

      <div className="mt-3 h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="mathGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="sciGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[70, 100]}
              ticks={[70, 80, 90, 100]}
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#cbd5e1" }} />
            <Area
              type="monotone"
              dataKey="science"
              name="Science"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#sciGrad)"
              animationDuration={900}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="mathematics"
              name="Mathematics"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#mathGrad)"
              animationDuration={900}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex justify-center gap-6 text-xs text-ink-700">
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-brand" /> Mathematics
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-emerald-500" /> Science
        </span>
      </div>
    </section>
  );
}

type TooltipPayload = {
  dataKey?: string | number;
  name?: string;
  value?: number | string;
  stroke?: string;
  color?: string;
};

function ChartTooltip(props: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
}) {
  const { active, payload, label } = props;
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-ink-200 bg-white p-2.5 text-xs shadow-card">
      <div className="mb-1 font-semibold text-ink-900">{label}</div>
      {payload.map((p, i) => (
        <div
          key={p.dataKey ?? i}
          className="flex items-center gap-2 text-ink-700"
        >
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: p.stroke ?? p.color }}
          />
          <span className="capitalize">{p.name}</span>
          <span className="ml-auto font-semibold text-ink-900">{p.value}</span>
        </div>
      ))}
    </div>
  );
}
