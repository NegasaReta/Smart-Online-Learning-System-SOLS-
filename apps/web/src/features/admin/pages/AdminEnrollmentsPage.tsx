import { useState } from "react";
import { Search, Plus, X, ChevronLeft, ChevronRight, MoreHorizontal, CheckCircle2, Clock, XCircle } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

type EnrollStatus = "Approved" | "Pending" | "Rejected";

type Enrollment = {
  id: string;
  student: string;
  avatar: string;
  studentId: string;
  course: string;
  subject: string;
  grade: string;
  teacher: string;
  enrolledDate: string;
  status: EnrollStatus;
};

const STATUS_COLORS: Record<EnrollStatus, string> = {
  Approved: "bg-emerald-50 text-emerald-700",
  Pending:  "bg-amber-50 text-amber-700",
  Rejected: "bg-red-50 text-red-600",
};

const STATUS_ICON: Record<EnrollStatus, React.ReactNode> = {
  Approved: <CheckCircle2 className="size-3.5 text-emerald-500" />,
  Pending:  <Clock className="size-3.5 text-amber-500" />,
  Rejected: <XCircle className="size-3.5 text-red-500" />,
};

const MOCK: Enrollment[] = [
  { id: "e1",  student: "Evelyn Harper",  avatar: "https://i.pravatar.cc/80?img=44", studentId: "PRE43178", course: "Biology 101",        subject: "Biology",     grade: "Grade 10", teacher: "Dr. Alice Monroe",  enrolledDate: "Sep 1, 2024",  status: "Approved" },
  { id: "e2",  student: "Diana Plenty",   avatar: "https://i.pravatar.cc/80?img=36", studentId: "PRE43174", course: "Calculus",           subject: "Mathematics", grade: "Grade 11", teacher: "Mr. James Okafor", enrolledDate: "Sep 1, 2024",  status: "Approved" },
  { id: "e3",  student: "John Millar",    avatar: "https://i.pravatar.cc/80?img=15", studentId: "PRE43187", course: "Modern History",     subject: "History",     grade: "Grade 10", teacher: "Mr. Leo Fernandez",enrolledDate: "Sep 2, 2024",  status: "Approved" },
  { id: "e4",  student: "Sofia Martinez", avatar: "https://i.pravatar.cc/80?img=47", studentId: "PRE43201", course: "World Literature",   subject: "Literature",  grade: "Grade 9",  teacher: "Ms. Fatima Hassan",enrolledDate: "Sep 2, 2024",  status: "Approved" },
  { id: "e5",  student: "Noah Williams",  avatar: "https://i.pravatar.cc/80?img=12", studentId: "PRE43195", course: "Physics II",         subject: "Physics",     grade: "Grade 12", teacher: "Ms. Clara Zhang",  enrolledDate: "Sep 3, 2024",  status: "Pending" },
  { id: "e6",  student: "Amara Osei",     avatar: "https://i.pravatar.cc/80?img=23", studentId: "PRE43202", course: "Organic Chemistry",  subject: "Chemistry",   grade: "Grade 9",  teacher: "Mr. David Mensah", enrolledDate: "Sep 3, 2024",  status: "Approved" },
  { id: "e7",  student: "Luca Bianchi",   avatar: "https://i.pravatar.cc/80?img=8",  studentId: "PRE43211", course: "Calculus",           subject: "Mathematics", grade: "Grade 11", teacher: "Mr. James Okafor", enrolledDate: "Sep 4, 2024",  status: "Approved" },
  { id: "e8",  student: "Priya Sharma",   avatar: "https://i.pravatar.cc/80?img=38", studentId: "PRE43219", course: "Biology 101",        subject: "Biology",     grade: "Grade 10", teacher: "Dr. Alice Monroe",  enrolledDate: "Sep 4, 2024",  status: "Rejected" },
  { id: "e9",  student: "Evelyn Harper",  avatar: "https://i.pravatar.cc/80?img=44", studentId: "PRE43178", course: "Intro to Programming",subject: "CS",         grade: "Grade 10", teacher: "Mr. James Okafor", enrolledDate: "Sep 5, 2024",  status: "Approved" },
  { id: "e10", student: "Noah Williams",  avatar: "https://i.pravatar.cc/80?img=12", studentId: "PRE43195", course: "World Literature",   subject: "Literature",  grade: "Grade 12", teacher: "Ms. Fatima Hassan",enrolledDate: "Oct 1, 2024",  status: "Pending" },
];

const PAGE_SIZE = 7;
const STATUSES: Array<"All" | EnrollStatus> = ["All", "Approved", "Pending", "Rejected"];

export default function AdminEnrollmentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | EnrollStatus>("All");
  const [enrollments, setEnrollments] = useState(MOCK);
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = enrollments.filter(e => {
    const matchSearch =
      e.student.toLowerCase().includes(search.toLowerCase()) ||
      e.course.toLowerCase().includes(search.toLowerCase()) ||
      e.studentId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function approve(id: string) { setEnrollments(es => es.map(e => e.id === id ? { ...e, status: "Approved" } : e)); }
  function reject(id: string)  { setEnrollments(es => es.map(e => e.id === id ? { ...e, status: "Rejected" } : e)); }

  const counts = STATUSES.filter(s => s !== "All").map(s => ({
    label: s, value: enrollments.filter(e => e.status === s).length,
    bg: s === "Approved" ? "bg-emerald-50" : s === "Pending" ? "bg-amber-50" : "bg-red-50",
    text: s === "Approved" ? "text-emerald-700" : s === "Pending" ? "text-amber-700" : "text-red-600",
  }));

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-12 pt-6">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Enrollments</h1>
              <p className="text-sm text-ink-500">{filtered.length} enrollment records</p>
            </div>
            <button onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
              <Plus className="size-4" /> Enroll Student
            </button>
          </div>

          {/* Summary */}
          <div className="mb-6 grid grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            {counts.map(c => (
              <div key={c.label} className={`flex items-center gap-3 rounded-2xl border border-ink-200 bg-white p-4 shadow-card`}>
                <span className={`flex size-10 items-center justify-center rounded-xl ${c.bg}`}>
                  {STATUS_ICON[c.label as EnrollStatus]}
                </span>
                <div>
                  <p className="text-xs text-ink-500">{c.label}</p>
                  <p className={`text-2xl font-bold ${c.text}`}>{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-ink-400" />
              <input type="search" placeholder="Search student or course..." value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="h-10 w-72 rounded-xl border border-ink-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
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
                    <th className="px-5 py-3 text-left">Student</th>
                    <th className="px-4 py-3 text-left">Course</th>
                    <th className="px-4 py-3 text-left">Grade</th>
                    <th className="px-4 py-3 text-left">Teacher</th>
                    <th className="px-4 py-3 text-left">Enrolled</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map(e => (
                    <tr key={e.id} className="border-b border-ink-50 last:border-0 hover:bg-violet-50/20 transition">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <img src={e.avatar} alt={e.student} className="size-8 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-ink-900">{e.student}</p>
                            <p className="text-xs text-ink-400">{e.studentId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="font-medium text-ink-900">{e.course}</p>
                        <p className="text-xs text-ink-400">{e.subject}</p>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-ink-600">{e.grade}</td>
                      <td className="px-4 py-3.5 text-xs text-ink-600">{e.teacher}</td>
                      <td className="px-4 py-3.5 text-xs text-ink-500">{e.enrolledDate}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[e.status]}`}>
                          {STATUS_ICON[e.status]}{e.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        {e.status === "Pending" ? (
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => approve(e.id)}
                              className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition">Approve</button>
                            <button onClick={() => reject(e.id)}
                              className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 transition">Reject</button>
                          </div>
                        ) : (
                          <button className="rounded-md p-1 text-ink-400 hover:bg-ink-100"><MoreHorizontal className="size-4" /></button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {paged.length === 0 && (
                    <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-400">No enrollments found.</td></tr>
                  )}
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

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Enroll Student</h2>
              <button onClick={() => setShowAdd(false)} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Student</span>
                <select className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400">
                  {["Evelyn Harper","Diana Plenty","John Millar","Sofia Martinez","Noah Williams"].map(s => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Course</span>
                <select className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400">
                  {["Biology 101","Calculus","Physics II","Organic Chemistry","World Literature","Modern History"].map(c => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Enrollment Date</span>
                <input type="date" className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400" />
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Enroll</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
