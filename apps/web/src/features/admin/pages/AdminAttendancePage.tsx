import { useState } from "react";
import { Search, Download, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock, Minus } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

type AttStatus = "Present" | "Absent" | "Late" | "Excused";

type AttRecord = {
  id: string;
  name: string;
  avatar: string;
  studentId: string;
  grade: string;
  mon: AttStatus; tue: AttStatus; wed: AttStatus; thu: AttStatus; fri: AttStatus;
  total: number;
  percent: number;
};

const STATUS_ICON: Record<AttStatus, React.ReactNode> = {
  Present: <CheckCircle2 className="size-4 text-emerald-500" />,
  Absent:  <XCircle className="size-4 text-red-500" />,
  Late:    <Clock className="size-4 text-amber-500" />,
  Excused: <Minus className="size-4 text-ink-400" />,
};

const STATUS_BG: Record<AttStatus, string> = {
  Present: "bg-emerald-50",
  Absent:  "bg-red-50",
  Late:    "bg-amber-50",
  Excused: "bg-ink-50",
};

const MOCK: AttRecord[] = [
  { id: "1", name: "Evelyn Harper",  avatar: "https://i.pravatar.cc/80?img=44", studentId: "PRE43178", grade: "Grade 10", mon: "Present", tue: "Present", wed: "Present", thu: "Present", fri: "Present", total: 22, percent: 100 },
  { id: "2", name: "Diana Plenty",   avatar: "https://i.pravatar.cc/80?img=36", studentId: "PRE43174", grade: "Grade 11", mon: "Present", tue: "Late",    wed: "Present", thu: "Present", fri: "Present", total: 21, percent: 95 },
  { id: "3", name: "John Millar",    avatar: "https://i.pravatar.cc/80?img=15", studentId: "PRE43187", grade: "Grade 10", mon: "Absent",  tue: "Present", wed: "Present", thu: "Late",    fri: "Present", total: 19, percent: 86 },
  { id: "4", name: "Sofia Martinez", avatar: "https://i.pravatar.cc/80?img=47", studentId: "PRE43201", grade: "Grade 9",  mon: "Present", tue: "Present", wed: "Excused", thu: "Present", fri: "Present", total: 20, percent: 91 },
  { id: "5", name: "Noah Williams",  avatar: "https://i.pravatar.cc/80?img=12", studentId: "PRE43195", grade: "Grade 12", mon: "Absent",  tue: "Absent",  wed: "Present", thu: "Present", fri: "Late",    total: 17, percent: 77 },
  { id: "6", name: "Amara Osei",     avatar: "https://i.pravatar.cc/80?img=23", studentId: "PRE43202", grade: "Grade 9",  mon: "Present", tue: "Present", wed: "Present", thu: "Present", fri: "Present", total: 22, percent: 100 },
  { id: "7", name: "Luca Bianchi",   avatar: "https://i.pravatar.cc/80?img=8",  studentId: "PRE43211", grade: "Grade 11", mon: "Late",    tue: "Present", wed: "Present", thu: "Absent",  fri: "Present", total: 19, percent: 86 },
  { id: "8", name: "Priya Sharma",   avatar: "https://i.pravatar.cc/80?img=38", studentId: "PRE43219", grade: "Grade 10", mon: "Absent",  tue: "Absent",  wed: "Absent",  thu: "Present", fri: "Present", total: 14, percent: 64 },
];

const DAYS: Array<keyof Omit<AttRecord, "id"|"name"|"avatar"|"studentId"|"grade"|"total"|"percent">> = ["mon","tue","wed","thu","fri"];
const DAY_LABELS = ["Mon","Tue","Wed","Thu","Fri"];

const WEEKS = ["Week of Oct 7", "Week of Oct 14", "Week of Oct 21", "Week of Oct 28"];

export default function AdminAttendancePage() {
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [week, setWeek] = useState(WEEKS[1]);
  const grades = ["All","Grade 9","Grade 10","Grade 11","Grade 12"];

  const filtered = MOCK.filter(r =>
    (gradeFilter === "All" || r.grade === gradeFilter) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) || r.studentId.toLowerCase().includes(search.toLowerCase()))
  );

  const presentCount = MOCK.reduce((acc, r) => acc + [r.mon,r.tue,r.wed,r.thu,r.fri].filter(s => s === "Present").length, 0);
  const total = MOCK.length * 5;

  function handleExport() {
    const csv = ["Name,ID,Grade,Mon,Tue,Wed,Thu,Fri,Total,Percent",
      ...MOCK.map(r => `${r.name},${r.studentId},${r.grade},${r.mon},${r.tue},${r.wed},${r.thu},${r.fri},${r.total},${r.percent}%`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "attendance.csv"; a.click();
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
              <h1 className="text-2xl font-bold text-ink-900">Attendance</h1>
              <p className="text-sm text-ink-500">Track daily student attendance</p>
            </div>
            <button onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
              <Download className="size-4" /> Export CSV
            </button>
          </div>

          {/* Summary cards */}
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            {[
              { label: "Total Students",  value: MOCK.length,                                                                    bg: "bg-violet-50",  text: "text-violet-700" },
              { label: "Present Today",   value: MOCK.filter(r => r.fri === "Present").length,                                   bg: "bg-emerald-50", text: "text-emerald-700" },
              { label: "Absent Today",    value: MOCK.filter(r => r.fri === "Absent").length,                                    bg: "bg-red-50",     text: "text-red-700" },
              { label: "Avg. Rate",       value: Math.round(MOCK.reduce((a,r) => a + r.percent, 0) / MOCK.length) + "%",         bg: "bg-amber-50",   text: "text-amber-700" },
            ].map(s => (
              <div key={s.label} className={`rounded-2xl border border-ink-200 p-4 shadow-card ${s.bg}`}>
                <p className="text-xs font-semibold text-ink-500">{s.label}</p>
                <p className={`mt-1 text-2xl font-bold ${s.text}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-5 rounded-2xl border border-ink-200 bg-white p-5 shadow-card animate-fade-in-up" style={{ animationDelay: "80ms" }}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-ink-900">Weekly Attendance Rate</span>
              <span className="font-bold text-violet-700">{Math.round(presentCount / total * 100)}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-ink-100 overflow-hidden">
              <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${Math.round(presentCount / total * 100)}%` }} />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <select value={week} onChange={e => setWeek(e.target.value)}
              className="h-10 rounded-xl border border-ink-200 bg-white px-3 text-sm outline-none focus:border-violet-400">
              {WEEKS.map(w => <option key={w}>{w}</option>)}
            </select>
            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-ink-400" />
              <input type="search" placeholder="Search student..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-10 w-56 rounded-xl border border-ink-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
            </label>
            <div className="flex gap-2">
              {grades.map(g => (
                <button key={g} onClick={() => setGradeFilter(g)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${gradeFilter === g ? "bg-violet-600 text-white" : "bg-white border border-ink-200 text-ink-600 hover:bg-violet-50"}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-ink-200 bg-white shadow-card overflow-hidden animate-fade-in-up" style={{ animationDelay: "140ms" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-100 bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    <th className="px-5 py-3 text-left">Student</th>
                    <th className="px-3 py-3 text-left">Grade</th>
                    {DAY_LABELS.map(d => <th key={d} className="px-3 py-3 text-center">{d}</th>)}
                    <th className="px-3 py-3 text-center">Total</th>
                    <th className="px-3 py-3 text-center">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => (
                    <tr key={r.id} className="border-b border-ink-50 last:border-0 hover:bg-violet-50/20 transition">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <img src={r.avatar} alt={r.name} className="size-8 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-ink-900">{r.name}</p>
                            <p className="text-xs text-ink-400">{r.studentId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs text-ink-600">{r.grade}</td>
                      {DAYS.map((d, i) => (
                        <td key={d} className={`px-3 py-3 text-center ${STATUS_BG[r[d]]}`}>
                          <div className="flex justify-center">{STATUS_ICON[r[d]]}</div>
                        </td>
                      ))}
                      <td className="px-3 py-3 text-center font-semibold text-ink-900">{r.total}/22</td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-bold ${r.percent >= 90 ? "bg-emerald-50 text-emerald-700" : r.percent >= 75 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"}`}>
                          {r.percent}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
