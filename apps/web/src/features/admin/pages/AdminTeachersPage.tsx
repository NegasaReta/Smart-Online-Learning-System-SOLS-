import { useState } from "react";
import { Search, Plus, MoreHorizontal, X, Mail, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

type Teacher = {
  id: string;
  name: string;
  avatar: string;
  teacherId: string;
  subject: string;
  email: string;
  phone: string;
  classes: number;
  students: number;
  status: "Active" | "On Leave" | "Inactive";
};

const MOCK_TEACHERS: Teacher[] = [
  { id: "t1", name: "Dr. Alice Monroe",   avatar: "https://i.pravatar.cc/80?img=49", teacherId: "TCH10012", subject: "Biology",     email: "alice@school.edu",   phone: "+1 555-0101", classes: 4, students: 120, status: "Active" },
  { id: "t2", name: "Mr. James Okafor",   avatar: "https://i.pravatar.cc/80?img=11", teacherId: "TCH10023", subject: "Mathematics", email: "james@school.edu",   phone: "+1 555-0102", classes: 5, students: 145, status: "Active" },
  { id: "t3", name: "Ms. Clara Zhang",    avatar: "https://i.pravatar.cc/80?img=45", teacherId: "TCH10031", subject: "Physics",     email: "clara@school.edu",   phone: "+1 555-0103", classes: 3, students: 98,  status: "On Leave" },
  { id: "t4", name: "Mr. David Mensah",   avatar: "https://i.pravatar.cc/80?img=14", teacherId: "TCH10044", subject: "Chemistry",   email: "david@school.edu",   phone: "+1 555-0104", classes: 4, students: 110, status: "Active" },
  { id: "t5", name: "Ms. Fatima Hassan",  avatar: "https://i.pravatar.cc/80?img=41", teacherId: "TCH10055", subject: "Literature",  email: "fatima@school.edu",  phone: "+1 555-0105", classes: 3, students: 95,  status: "Active" },
  { id: "t6", name: "Mr. Leo Fernandez",  avatar: "https://i.pravatar.cc/80?img=6",  teacherId: "TCH10066", subject: "History",     email: "leo@school.edu",     phone: "+1 555-0106", classes: 2, students: 72,  status: "Inactive" },
];

const STATUS_COLORS: Record<Teacher["status"], string> = {
  "Active":   "bg-emerald-50 text-emerald-700",
  "On Leave": "bg-amber-50 text-amber-700",
  "Inactive": "bg-ink-100 text-ink-500",
};

const PAGE_SIZE = 5;

export default function AdminTeachersPage() {
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);

  const subjects = ["All", ...Array.from(new Set(MOCK_TEACHERS.map(t => t.subject)))];

  const filtered = MOCK_TEACHERS.filter(t => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.teacherId.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subjectFilter === "All" || t.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-12 pt-6">

          {/* Header */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Teachers</h1>
              <p className="text-sm text-ink-500">{filtered.length} teachers on staff</p>
            </div>
            <button onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">
              <Plus className="size-4" /> Add Teacher
            </button>
          </div>

          {/* Stats strip */}
          <div className="mb-6 grid grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            {[
              { label: "Total Teachers", value: MOCK_TEACHERS.length, color: "bg-violet-50 text-violet-700" },
              { label: "Active",         value: MOCK_TEACHERS.filter(t => t.status === "Active").length,   color: "bg-emerald-50 text-emerald-700" },
              { label: "On Leave",       value: MOCK_TEACHERS.filter(t => t.status === "On Leave").length, color: "bg-amber-50 text-amber-700" },
            ].map(s => (
              <div key={s.label} className={`rounded-2xl border border-ink-200 bg-white p-4 shadow-card`}>
                <p className="text-xs font-semibold text-ink-500">{s.label}</p>
                <p className={`mt-1 text-2xl font-bold ${s.color.split(" ")[1]}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Search + filter */}
          <div className="mb-4 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-ink-400" />
              <input type="search" placeholder="Search teachers..."
                value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="h-10 w-64 rounded-xl border border-ink-200 bg-white pl-9 pr-4 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
            </label>
            <select value={subjectFilter} onChange={e => { setSubjectFilter(e.target.value); setPage(1); }}
              className="h-10 rounded-xl border border-ink-200 bg-white px-3 text-sm outline-none focus:border-violet-400">
              {subjects.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-ink-200 bg-white shadow-card overflow-hidden animate-fade-in-up" style={{ animationDelay: "140ms" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-100 bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    <th className="px-5 py-3 text-left">Teacher</th>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Subject</th>
                    <th className="px-4 py-3 text-left">Contact</th>
                    <th className="px-4 py-3 text-left">Classes</th>
                    <th className="px-4 py-3 text-left">Students</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map(t => (
                    <tr key={t.id} className="border-b border-ink-50 last:border-0 transition hover:bg-violet-50/30">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <img src={t.avatar} alt={t.name} className="size-9 rounded-full object-cover ring-2 ring-violet-100" />
                          <p className="font-semibold text-ink-900">{t.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-ink-500">{t.teacherId}</td>
                      <td className="px-4 py-3.5">
                        <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700">{t.subject}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-col gap-0.5 text-xs text-ink-500">
                          <span className="flex items-center gap-1"><Mail className="size-3" />{t.email}</span>
                          <span className="flex items-center gap-1"><Phone className="size-3" />{t.phone}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-ink-900">{t.classes}</td>
                      <td className="px-4 py-3.5 text-ink-700">{t.students}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[t.status]}`}>{t.status}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <button className="rounded-md p-1 text-ink-400 hover:bg-ink-100"><MoreHorizontal className="size-4" /></button>
                      </td>
                    </tr>
                  ))}
                  {paged.length === 0 && (
                    <tr><td colSpan={8} className="px-5 py-12 text-center text-sm text-ink-400">No teachers found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3 text-xs text-ink-500">
              <span>Showing {Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}</span>
              <div className="flex items-center gap-1">
                <button disabled={page === 1} onClick={() => setPage(p => p-1)} className="rounded-lg p-1.5 hover:bg-ink-100 disabled:opacity-40"><ChevronLeft className="size-4" /></button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i+1)} className={`size-7 rounded-lg text-xs font-semibold ${page===i+1?"bg-violet-600 text-white":"hover:bg-ink-100 text-ink-600"}`}>{i+1}</button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(p => p+1)} className="rounded-lg p-1.5 hover:bg-ink-100 disabled:opacity-40"><ChevronRight className="size-4" /></button>
              </div>
            </div>
          </div>
        </main>
      </div>
      {showAdd && <AddTeacherModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}

function AddTeacherModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "" });
  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink-900">Add New Teacher</h2>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
        </div>
        <div className="flex flex-col gap-4">
          {[["Full Name","name","text"],["Email","email","email"],["Phone","phone","tel"],["Subject","subject","text"]].map(([label,key,type]) => (
            <label key={key} className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-ink-700">{label}</span>
              <input type={type} value={(form as Record<string,string>)[key]} onChange={e => set(key, e.target.value)}
                className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
            </label>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button>
          <button onClick={onClose} className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Add Teacher</button>
        </div>
      </div>
    </div>
  );
}
