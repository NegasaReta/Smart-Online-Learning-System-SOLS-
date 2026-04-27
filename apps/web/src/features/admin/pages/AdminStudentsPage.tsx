import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

type Student = {
  id: string;
  name: string;
  avatar: string;
  studentId: string;
  grade: string;
  subject: string;
  email: string;
  parent: string;
  status: "Active" | "Inactive" | "Suspended";
};

const MOCK_STUDENTS: Student[] = [
  { id: "1", name: "Evelyn Harper",  avatar: "https://i.pravatar.cc/80?img=44", studentId: "PRE43178", grade: "Grade 10", subject: "Science",    email: "evelyn@school.edu",  parent: "Margaret Harper",  status: "Active" },
  { id: "2", name: "Diana Plenty",   avatar: "https://i.pravatar.cc/80?img=36", studentId: "PRE43174", grade: "Grade 11", subject: "Mathematics", email: "diana@school.edu",   parent: "Robert Plenty",    status: "Active" },
  { id: "3", name: "John Millar",    avatar: "https://i.pravatar.cc/80?img=15", studentId: "PRE43187", grade: "Grade 10", subject: "History",     email: "john@school.edu",    parent: "Sarah Millar",     status: "Active" },
  { id: "4", name: "Sofia Martinez", avatar: "https://i.pravatar.cc/80?img=47", studentId: "PRE43201", grade: "Grade 9",  subject: "Literature",  email: "sofia@school.edu",   parent: "Carlos Martinez",  status: "Active" },
  { id: "5", name: "Noah Williams",  avatar: "https://i.pravatar.cc/80?img=12", studentId: "PRE43195", grade: "Grade 12", subject: "Physics",     email: "noah@school.edu",    parent: "James Williams",   status: "Inactive" },
  { id: "6", name: "Amara Osei",     avatar: "https://i.pravatar.cc/80?img=23", studentId: "PRE43202", grade: "Grade 9",  subject: "Art",         email: "amara@school.edu",   parent: "Kofi Osei",        status: "Active" },
  { id: "7", name: "Luca Bianchi",   avatar: "https://i.pravatar.cc/80?img=8",  studentId: "PRE43211", grade: "Grade 11", subject: "Chemistry",   email: "luca@school.edu",    parent: "Marco Bianchi",    status: "Active" },
  { id: "8", name: "Priya Sharma",   avatar: "https://i.pravatar.cc/80?img=38", studentId: "PRE43219", grade: "Grade 10", subject: "Biology",     email: "priya@school.edu",   parent: "Ravi Sharma",      status: "Suspended" },
];

const STATUS_COLORS = {
  Active:    "bg-emerald-50 text-emerald-700",
  Inactive:  "bg-ink-100 text-ink-500",
  Suspended: "bg-red-50 text-red-600",
};

const PAGE_SIZE = 6;

export default function AdminStudentsPage() {
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const grades = ["All", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

  const filtered = MOCK_STUDENTS.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchGrade = gradeFilter === "All" || s.grade === gradeFilter;
    return matchSearch && matchGrade;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === paged.length) setSelected(new Set());
    else setSelected(new Set(paged.map((s) => s.id)));
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-12 pt-6">

          {/* Header */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Students</h1>
              <p className="text-sm text-ink-500">{filtered.length} students total</p>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              <Plus className="size-4" /> Add Student
            </button>
          </div>

          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-ink-400" />
              <input
                type="search"
                placeholder="Search students..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="h-10 w-64 rounded-xl border border-ink-200 bg-white pl-9 pr-4 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />
            </label>
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-ink-400" />
              {grades.map((g) => (
                <button
                  key={g}
                  onClick={() => { setGradeFilter(g); setPage(1); }}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${gradeFilter === g ? "bg-violet-600 text-white" : "bg-white border border-ink-200 text-ink-600 hover:bg-violet-50"}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-ink-200 bg-white shadow-card overflow-hidden animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-100 bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    <th className="px-5 py-3 text-left w-10">
                      <input type="checkbox" checked={selected.size === paged.length && paged.length > 0} onChange={toggleAll} className="accent-violet-600 size-4 rounded" />
                    </th>
                    <th className="px-4 py-3 text-left">Student</th>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Grade</th>
                    <th className="px-4 py-3 text-left">Subject</th>
                    <th className="px-4 py-3 text-left">Parent</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((s) => (
                    <tr key={s.id} className={`border-b border-ink-50 last:border-0 transition hover:bg-violet-50/30 ${selected.has(s.id) ? "bg-violet-50/50" : ""}`}>
                      <td className="px-5 py-3.5">
                        <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggleSelect(s.id)} className="accent-violet-600 size-4 rounded" />
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <img src={s.avatar} alt={s.name} className="size-8 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-ink-900">{s.name}</p>
                            <p className="text-xs text-ink-400">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-ink-500">{s.studentId}</td>
                      <td className="px-4 py-3.5 text-ink-700">{s.grade}</td>
                      <td className="px-4 py-3.5 text-ink-700">{s.subject}</td>
                      <td className="px-4 py-3.5 text-ink-500">{s.parent}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[s.status]}`}>{s.status}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <button className="rounded-md p-1 text-ink-400 hover:bg-ink-100"><MoreHorizontal className="size-4" /></button>
                      </td>
                    </tr>
                  ))}
                  {paged.length === 0 && (
                    <tr><td colSpan={8} className="px-5 py-12 text-center text-sm text-ink-400">No students found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3 text-xs text-ink-500">
              <span>Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</span>
              <div className="flex items-center gap-1">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="rounded-lg p-1.5 hover:bg-ink-100 disabled:opacity-40"><ChevronLeft className="size-4" /></button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)} className={`size-7 rounded-lg text-xs font-semibold ${page === i + 1 ? "bg-violet-600 text-white" : "hover:bg-ink-100 text-ink-600"}`}>{i + 1}</button>
                ))}
                <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)} className="rounded-lg p-1.5 hover:bg-ink-100 disabled:opacity-40"><ChevronRight className="size-4" /></button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Student Modal */}
      {showAdd && <AddStudentModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}

function AddStudentModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", grade: "Grade 9", subject: "", parent: "" });
  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink-900">Add New Student</h2>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
        </div>
        <div className="flex flex-col gap-4">
          {[["Full Name", "name", "text"], ["Email", "email", "email"], ["Subject", "subject", "text"], ["Parent / Guardian", "parent", "text"]].map(([label, key, type]) => (
            <label key={key} className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-ink-700">{label}</span>
              <input type={type} value={(form as Record<string,string>)[key]} onChange={e => set(key, e.target.value)}
                className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
            </label>
          ))}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-ink-700">Grade</span>
            <select value={form.grade} onChange={e => set("grade", e.target.value)}
              className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400">
              {["Grade 9","Grade 10","Grade 11","Grade 12"].map(g => <option key={g}>{g}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button>
          <button onClick={onClose} className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Add Student</button>
        </div>
      </div>
    </div>
  );
}
