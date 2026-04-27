import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, PieChart, Pie, Cell,
} from "recharts";
import { Download, TrendingUp, Users, BookOpen, Award } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

const ENROLLMENT_DATA = [
  { month: "Jan", students: 1200, teachers: 80 },
  { month: "Feb", students: 1350, teachers: 85 },
  { month: "Mar", students: 1420, teachers: 88 },
  { month: "Apr", students: 1500, teachers: 90 },
  { month: "May", students: 1650, teachers: 92 },
  { month: "Jun", students: 1580, teachers: 91 },
  { month: "Jul", students: 1490, teachers: 89 },
  { month: "Aug", students: 1720, teachers: 95 },
  { month: "Sep", students: 1800, teachers: 98 },
  { month: "Oct", students: 1900, teachers: 102 },
];

const GRADE_DIST = [
  { name: "A (90-100%)", value: 28, color: "#7c3aed" },
  { name: "B (80-89%)",  value: 35, color: "#06b6d4" },
  { name: "C (70-79%)",  value: 22, color: "#f59e0b" },
  { name: "D (60-69%)",  value: 10, color: "#f97316" },
  { name: "F (<60%)",    value: 5,  color: "#ef4444" },
];

const SUBJECT_PERFORMANCE = [
  { subject: "Biology",     avg: 84 },
  { subject: "Mathematics", avg: 79 },
  { subject: "Physics",     avg: 76 },
  { subject: "Chemistry",   avg: 81 },
  { subject: "Literature",  avg: 88 },
  { subject: "History",     avg: 85 },
];

const SUMMARY_CARDS = [
  { label: "Avg. Grade",       value: "82.4%",  icon: Award,    color: "text-violet-600",  bg: "bg-violet-50" },
  { label: "Pass Rate",        value: "95%",    icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Total Enrolled",   value: "1,900",  icon: Users,    color: "text-cyan-600",    bg: "bg-cyan-50" },
  { label: "Active Courses",   value: "7",      icon: BookOpen, color: "text-orange-500",  bg: "bg-orange-50" },
];

const TERMS = ["Fall 2024", "Spring 2024", "Fall 2023"];

export default function AdminReportsPage() {
  const [term, setTerm] = useState("Fall 2024");

  function handleDownload() {
    const blob = new Blob(["Academic Report\nTerm: " + term + "\nGenerated: " + new Date().toLocaleDateString()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `report-${term.replace(" ", "-")}.txt`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-12 pt-6">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Reports</h1>
              <p className="text-sm text-ink-500">Academic performance overview</p>
            </div>
            <div className="flex items-center gap-3">
              <select value={term} onChange={e => setTerm(e.target.value)}
                className="h-10 rounded-xl border border-ink-200 bg-white px-3 text-sm outline-none focus:border-violet-400">
                {TERMS.map(t => <option key={t}>{t}</option>)}
              </select>
              <button onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
                <Download className="size-4" /> Download
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            {SUMMARY_CARDS.map((c, i) => (
              <div key={c.label} className="flex items-center gap-3 rounded-2xl border border-ink-200 bg-white p-4 shadow-card animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}>
                <span className={`flex size-11 items-center justify-center rounded-xl ${c.bg}`}>
                  <c.icon className={`size-5 ${c.color}`} />
                </span>
                <div>
                  <p className="text-xs text-ink-500">{c.label}</p>
                  <p className="text-xl font-bold text-ink-900">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts row 1 */}
          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px] animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
              <h2 className="mb-4 text-base font-bold text-ink-900">Enrollment Over Time</h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={ENROLLMENT_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="students" stroke="#7c3aed" strokeWidth={2.5} dot={false} name="Students" />
                  <Line type="monotone" dataKey="teachers" stroke="#06b6d4" strokeWidth={2.5} dot={false} name="Teachers" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
              <h2 className="mb-4 text-base font-bold text-ink-900">Grade Distribution</h2>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={GRADE_DIST} cx="50%" cy="50%" outerRadius={70} innerRadius={40} strokeWidth={0} dataKey="value">
                    {GRADE_DIST.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 flex flex-col gap-1.5">
                {GRADE_DIST.map(g => (
                  <div key={g.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block size-2.5 rounded-full" style={{ background: g.color }} />
                      {g.name}
                    </span>
                    <span className="font-semibold text-ink-700">{g.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject performance */}
          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card animate-fade-in-up" style={{ animationDelay: "140ms" }}>
            <h2 className="mb-4 text-base font-bold text-ink-900">Average Score by Subject</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={SUBJECT_PERFORMANCE} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Bar dataKey="avg" fill="#7c3aed" radius={[6, 6, 0, 0]} name="Avg. Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}
