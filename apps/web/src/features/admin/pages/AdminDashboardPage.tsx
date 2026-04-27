import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  GraduationCap,
  Users,
  UsersRound,
  DollarSign,
  MoreHorizontal,
  UserPlus,
  BookOpen,
} from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";
import {
  fetchStatCards,
  fetchExamResults,
  fetchGenderSplit,
  fetchStarStudents,
  fetchExamResultFeed,
  type StatCard,
  type ExamResultPoint,
  type StudentGenderSplit,
  type StarStudent,
  type ExamResultFeed,
} from "../data/adminDashboardData";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [examData, setExamData] = useState<ExamResultPoint[]>([]);
  const [gender, setGender] = useState<StudentGenderSplit | null>(null);
  const [students, setStudents] = useState<StarStudent[]>([]);
  const [feed, setFeed] = useState<ExamResultFeed[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchStatCards().then(setStats);
    fetchExamResults().then(setExamData);
    fetchGenderSplit().then(setGender);
    fetchStarStudents().then(setStudents);
    fetchExamResultFeed().then(setFeed);
  }, []);

  function toggleRow(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />

        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-12 pt-6">
          {/* Page title */}
          <h1 className="mb-6 text-2xl font-bold tracking-tight text-ink-900 animate-fade-in-up">
            Admin Dashboard
          </h1>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 animate-fade-in-up">
            {stats.map((s, i) => (
              <StatCardTile key={s.id} card={s} delay={i * 60} />
            ))}
          </div>

          {/* Charts row */}
          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
            {/* Bar chart */}
            <div
              className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card animate-fade-in-up"
              style={{ animationDelay: "120ms" }}
            >
              <div className="mb-1 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-ink-900">
                    All Exam Result
                  </h2>
                  <p className="text-xs text-ink-500">Students &amp; Teacher</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-ink-500">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block size-2.5 rounded-full bg-violet-600" />
                    Teacher
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block size-2.5 rounded-full bg-orange-400" />
                    Student
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={examData}
                  barCategoryGap="30%"
                  barGap={4}
                  margin={{ top: 8, right: 0, left: -20, bottom: 0 }}
                >
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) =>
                      v >= 1000 ? `${v / 1000}k` : String(v)
                    }
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(124,58,237,0.05)" }}
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid #e2e8f0",
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="teacher"
                    fill="#7c3aed"
                    radius={[4, 4, 0, 0]}
                    name="Teacher"
                  />
                  <Bar
                    dataKey="student"
                    fill="#fb923c"
                    radius={[4, 4, 0, 0]}
                    name="Student"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Donut chart */}
            <div
              className="flex flex-col items-center justify-center rounded-2xl border border-ink-200 bg-white p-5 shadow-card animate-fade-in-up"
              style={{ animationDelay: "160ms" }}
            >
              <div className="mb-4 flex w-full items-center justify-between">
                <h2 className="text-base font-bold text-ink-900">Students</h2>
                <button
                  type="button"
                  className="rounded-md p-1 text-ink-400 hover:bg-ink-100"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </div>

              {gender && (
                <>
                  <div className="relative">
                    <PieChart width={180} height={180}>
                      <Pie
                        data={[
                          { name: "Male", value: gender.male },
                          { name: "Female", value: gender.female },
                        ]}
                        cx={85}
                        cy={85}
                        innerRadius={58}
                        outerRadius={82}
                        startAngle={90}
                        endAngle={-270}
                        strokeWidth={0}
                        dataKey="value"
                      >
                        <Cell fill="#7c3aed" />
                        <Cell fill="#fb923c" />
                      </Pie>
                    </PieChart>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xs font-medium text-ink-500">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-ink-900">
                        {gender.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-6 text-sm font-medium">
                    <span className="flex items-center gap-2">
                      <span className="inline-block size-3 rounded-full bg-violet-600" />
                      Male
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="inline-block size-3 rounded-full bg-orange-400" />
                      Female
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
            {/* Star Students table */}
            <div
              className="rounded-2xl border border-ink-200 bg-white shadow-card animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
                <h2 className="text-base font-bold text-ink-900">
                  Star Students
                </h2>
                <button
                  type="button"
                  className="rounded-md p-1 text-ink-400 hover:bg-ink-100"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-ink-100 text-xs font-semibold text-ink-500">
                      <th className="w-10 px-5 py-3 text-left">
                        <span className="sr-only">Select</span>
                      </th>
                      <th className="px-2 py-3 text-left">Name</th>
                      <th className="px-2 py-3 text-left">ID</th>
                      <th className="px-2 py-3 text-left">Marks</th>
                      <th className="px-2 py-3 text-left">Percent</th>
                      <th className="px-2 py-3 text-left">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr
                        key={s.id}
                        onClick={() => toggleRow(s.id)}
                        className={`cursor-pointer border-b border-ink-50 transition last:border-0 hover:bg-violet-50/40 ${
                          selected[s.id] ? "bg-violet-50" : ""
                        }`}
                      >
                        <td className="px-5 py-3">
                          <span
                            className={`flex size-5 items-center justify-center rounded border-2 transition ${
                              selected[s.id]
                                ? "border-violet-600 bg-violet-600"
                                : "border-ink-300 bg-white"
                            }`}
                          >
                            {selected[s.id] && (
                              <svg
                                viewBox="0 0 10 8"
                                className="size-3 text-white"
                                fill="none"
                              >
                                <path
                                  d="M1 4l3 3 5-6"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={s.avatar}
                              alt={s.name}
                              className="size-8 rounded-full object-cover"
                            />
                            <span className="font-medium text-ink-900">
                              {s.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-ink-500">{s.studentId}</td>
                        <td className="px-2 py-3 font-semibold text-ink-900">
                          {s.marks}
                        </td>
                        <td className="px-2 py-3">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                            {s.percent}%
                          </span>
                        </td>
                        <td className="px-2 py-3 text-ink-500">{s.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Exam Result feed */}
            <div
              className="rounded-2xl border border-ink-200 bg-white shadow-card animate-fade-in-up"
              style={{ animationDelay: "240ms" }}
            >
              <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
                <h2 className="text-base font-bold text-ink-900">
                  All Exam Results
                </h2>
                <button
                  type="button"
                  className="rounded-md p-1 text-ink-400 hover:bg-ink-100"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </div>

              <ul className="flex flex-col divide-y divide-ink-50">
                {feed.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-ink-50"
                  >
                    <FeedIcon iconKey={f.iconKey} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink-900">
                        {f.title}
                      </p>
                      <p className="truncate text-xs text-ink-500">
                        {f.subtitle}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-ink-400">
                      {f.timeLabel}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ----------------------------- Stat card tile ----------------------------- */

function StatCardTile({ card, delay }: { card: StatCard; delay: number }) {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl border border-ink-200 p-5 shadow-card animate-fade-in-up ${card.bgClass}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div>
        <p className="text-xs font-semibold text-ink-500">{card.label}</p>
        <p className="mt-1 text-2xl font-bold text-ink-900">{card.value}</p>
      </div>
      <span
        className={`flex size-12 items-center justify-center rounded-2xl ${card.iconBgClass} ${card.iconColorClass}`}
      >
        <StatIcon iconKey={card.iconKey} />
      </span>
    </div>
  );
}

function StatIcon({
  iconKey,
}: {
  iconKey: "students" | "teachers" | "parents" | "earnings";
}) {
  const cls = "size-6";
  switch (iconKey) {
    case "students":
      return <GraduationCap className={cls} aria-hidden />;
    case "teachers":
      return <UsersRound className={cls} aria-hidden />;
    case "parents":
      return <Users className={cls} aria-hidden />;
    case "earnings":
      return <DollarSign className={cls} aria-hidden />;
  }
}

function FeedIcon({
  iconKey,
}: {
  iconKey: "teacher" | "fees" | "course";
}) {
  const wrapCls = "flex size-10 shrink-0 items-center justify-center rounded-xl";
  switch (iconKey) {
    case "teacher":
      return (
        <span className={`${wrapCls} bg-violet-100`}>
          <UserPlus className="size-5 text-violet-600" aria-hidden />
        </span>
      );
    case "fees":
      return (
        <span className={`${wrapCls} bg-rose-100`}>
          <DollarSign className="size-5 text-rose-500" aria-hidden />
        </span>
      );
    case "course":
      return (
        <span className={`${wrapCls} bg-emerald-100`}>
          <BookOpen className="size-5 text-emerald-600" aria-hidden />
        </span>
      );
  }
}
