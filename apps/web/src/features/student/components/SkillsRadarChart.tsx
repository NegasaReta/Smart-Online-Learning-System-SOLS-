import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { fetchSkillsRadar, type SkillPoint } from "../data/gradesData";

/**
 * Real interactive radar chart for the Grades page.
 * Data is fetched via `fetchSkillsRadar()` — swap with a real API call later.
 */
export function SkillsRadarChartCard() {
  const [data, setData] = useState<SkillPoint[]>([]);

  useEffect(() => {
    let active = true;
    fetchSkillsRadar().then((rows) => {
      if (active) setData(rows);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <h3 className="text-base font-bold text-ink-900">Skills Radar</h3>
      <div className="mx-auto mt-2 h-[260px] w-full max-w-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="75%">
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: "#475569", fontSize: 11, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 12,
              }}
              labelStyle={{ fontWeight: 600, color: "#0f172a" }}
              formatter={(v) => [`${v}`, "Score"]}
            />
            <Radar
              name="Skills"
              dataKey="score"
              stroke="#2563eb"
              strokeWidth={2}
              fill="#2563eb"
              fillOpacity={0.25}
              animationDuration={900}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
