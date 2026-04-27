import { useState } from "react";
import { Search, Plus, X, FileText, Clock, Users, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

type ExamStatus = "Scheduled" | "Ongoing" | "Completed" | "Cancelled";

type Exam = {
  id: string;
  title: string;
  subject: string;
  grade: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  students: number;
  status: ExamStatus;
  avgScore?: number;
};

const STATUS_COLORS: Record<ExamStatus, string> = {
  Scheduled:  "bg-violet-50 text-violet-700",
  Ongoing:    "bg-amber-50 text-amber-700",
  Completed:  "bg-emerald-50 text-emerald-700",
  Cancelled:  "bg-red-50 text-red-600",
};

const MOCK_EXAMS: Exam[] = [
  { id: "ex1", title: "Biology Mid-term",           subject: "Biology",     grade: "Grade 10", date: "Oct 14, 2024", time: "10:00 AM", duration: "2 hrs", venue: "Exam Hall A", students: 120, status: "Completed", avgScore: 84 },
  { id: "ex2", title: "Calculus Mid-term",          subject: "Mathematics", grade: "Grade 11", date: "Oct 15, 2024", time: "09:00 AM", duration: "2 hrs", venue: "Exam Hall B", students: 145, status: "Completed", avgScore: 79 },
  { id: "ex3", title: "Physics End-of-Unit Test",   subject: "Physics",     grade: "Grade 11", date: "Oct 28, 2024", time: "11:00 AM", duration: "90 min",venue: "Room 204",    students: 98,  status: "Scheduled" },
  { id: "ex4", title: "Chemistry Lab Practical",    subject: "Chemistry",   grade: "Grade 10", date: "Oct 30, 2024", time: "02:00 PM", duration: "3 hrs", venue: "Lab B",       students: 110, status: "Scheduled" },
  { id: "ex5", title: "Literature Essay Exam",      subject: "Literature",  grade: "Grade 9",  date: "Nov 5, 2024",  time: "10:00 AM", duration: "2 hrs", venue: "Room 101",    students: 95,  status: "Scheduled" },
  { id: "ex6", title: "History Final",              subject: "History",     grade: "Grade 12", date: "Nov 12, 2024", time: "09:00 AM", duration: "2 hrs", venue: "Exam Hall A", students: 72,  status: "Scheduled" },
  { id: "ex7", title: "CS Programming Assessment",  subject: "CS",          grade: "Grade 11", date: "Nov 18, 2024", time: "01:00 PM", duration: "3 hrs", venue: "Computer Lab",students: 135, status: "Scheduled" },
];

const PAGE_SIZE = 6;
const STATUSES: Array<"All" | ExamStatus> = ["All","Scheduled","Ongoing","Completed","Cancelled"];

export default function AdminExamsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ExamStatus>("All");
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<Exam | null>(null);

  const filtered = MOCK_EXAMS.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-12 pt-6">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Exams & Assessments</h1>
              <p className="text-sm text-ink-500">{filtered.length} exams scheduled</p>
            </div>
            <button onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
              <Plus className="size-4" /> Schedule Exam
            </button>
          </div>

          {/* Summary */}
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            {STATUSES.filter(s => s !== "All").map(s => (
              <div key={s} className={`rounded-2xl border border-ink-200 p-4 shadow-card bg-white`}>
                <p className="text-xs font-semibold text-ink-500">{s}</p>
                <p className="mt-1 text-2xl font-bold text-ink-900">{MOCK_EXAMS.filter(e => e.status === s).length}</p>
                <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_COLORS[s]}`}>{s}</span>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-ink-400" />
              <input type="search" placeholder="Search exams..." value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="h-10 w-64 rounded-xl border border-ink-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
            </label>
            <div className="flex gap-2">
              {STATUSES.map(s => (
                <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${statusFilter === s ? "bg-violet-600 text-white" : "bg-white border border-ink-200 text-ink-600 hover:bg-violet-50"}`}>
                  {s}
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
                    <th className="px-5 py-3 text-left">Exam</th>
                    <th className="px-4 py-3 text-left">Grade</th>
                    <th className="px-4 py-3 text-left">Date & Time</th>
                    <th className="px-4 py-3 text-left">Venue</th>
                    <th className="px-4 py-3 text-left">Students</th>
                    <th className="px-4 py-3 text-left">Avg Score</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {paged.map(e => (
                    <tr key={e.id} onClick={() => setSelected(e)}
                      className="cursor-pointer border-b border-ink-50 last:border-0 hover:bg-violet-50/30 transition">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                            <FileText className="size-4 text-violet-600" />
                          </span>
                          <div>
                            <p className="font-semibold text-ink-900">{e.title}</p>
                            <p className="text-xs text-ink-400">{e.subject}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-ink-600">{e.grade}</td>
                      <td className="px-4 py-3.5">
                        <p className="text-xs font-medium text-ink-900">{e.date}</p>
                        <p className="text-xs text-ink-400 flex items-center gap-1"><Clock className="size-3" />{e.time} · {e.duration}</p>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-ink-600">{e.venue}</td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1 text-xs text-ink-600"><Users className="size-3.5" />{e.students}</span>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-ink-900">{e.avgScore ? `${e.avgScore}%` : "—"}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[e.status]}`}>{e.status}</span>
                      </td>
                      <td className="px-4 py-3.5" onClick={ev => ev.stopPropagation()}>
                        <button className="rounded-md p-1 text-ink-400 hover:bg-ink-100"><MoreHorizontal className="size-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3 text-xs text-ink-500">
              <span>Showing {Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}</span>
              <div className="flex items-center gap-1">
                <button disabled={page===1} onClick={() => setPage(p => p-1)} className="rounded-lg p-1.5 hover:bg-ink-100 disabled:opacity-40"><ChevronLeft className="size-4" /></button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i+1)} className={`size-7 rounded-lg text-xs font-semibold ${page===i+1?"bg-violet-600 text-white":"hover:bg-ink-100 text-ink-600"}`}>{i+1}</button>
                ))}
                <button disabled={page===totalPages} onClick={() => setPage(p => p+1)} className="rounded-lg p-1.5 hover:bg-ink-100 disabled:opacity-40"><ChevronRight className="size-4" /></button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{selected.title}</h2>
              <button onClick={() => setSelected(null)} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[["Subject",selected.subject],["Grade",selected.grade],["Date",selected.date],["Time",selected.time],["Duration",selected.duration],["Venue",selected.venue],["Students",String(selected.students)],["Avg Score",selected.avgScore ? selected.avgScore+"%" : "N/A"]].map(([l,v]) => (
                <div key={l} className="rounded-xl bg-ink-50 px-3 py-2.5">
                  <p className="text-xs text-ink-500">{l}</p>
                  <p className="font-semibold text-ink-900">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={() => setSelected(null)} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Close</button>
              <button className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Edit Exam</button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Schedule New Exam</h2>
              <button onClick={() => setShowAdd(false)} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["Exam Title","text"],["Subject","text"],["Grade","text"],["Date","date"],["Time","time"],["Duration","text"],["Venue","text"],["Max Students","number"]].map(([l,t]) => (
                <label key={l} className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-ink-700">{l}</span>
                  <input type={t} className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400" />
                </label>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
