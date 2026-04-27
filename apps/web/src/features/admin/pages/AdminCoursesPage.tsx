import { useState } from "react";
import { Search, Plus, BookOpen, Users, Clock, MoreHorizontal, X, Star } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

type Course = {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  teacherAvatar: string;
  students: number;
  duration: string;
  modules: number;
  rating: number;
  status: "Active" | "Draft" | "Archived";
  accentClass: string;
};

const MOCK_COURSES: Course[] = [
  { id: "c1", title: "Biology 101: Foundations of Life",    subject: "Biology",     teacher: "Dr. Alice Monroe",  teacherAvatar: "https://i.pravatar.cc/80?img=49", students: 120, duration: "12 weeks", modules: 12, rating: 4.8, status: "Active",   accentClass: "bg-emerald-500" },
  { id: "c2", title: "Calculus for High Schoolers",         subject: "Mathematics", teacher: "Mr. James Okafor",  teacherAvatar: "https://i.pravatar.cc/80?img=11", students: 145, duration: "16 weeks", modules: 15, rating: 4.7, status: "Active",   accentClass: "bg-violet-600" },
  { id: "c3", title: "Physics II: Electromagnetism",        subject: "Physics",     teacher: "Ms. Clara Zhang",   teacherAvatar: "https://i.pravatar.cc/80?img=45", students: 98,  duration: "14 weeks", modules: 10, rating: 4.5, status: "Active",   accentClass: "bg-cyan-500" },
  { id: "c4", title: "Organic Chemistry Fundamentals",      subject: "Chemistry",   teacher: "Mr. David Mensah",  teacherAvatar: "https://i.pravatar.cc/80?img=14", students: 110, duration: "12 weeks", modules: 11, rating: 4.6, status: "Active",   accentClass: "bg-orange-500" },
  { id: "c5", title: "World Literature & Composition",      subject: "Literature",  teacher: "Ms. Fatima Hassan", teacherAvatar: "https://i.pravatar.cc/80?img=41", students: 95,  duration: "10 weeks", modules: 9,  rating: 4.4, status: "Active",   accentClass: "bg-rose-500" },
  { id: "c6", title: "Modern World History",                subject: "History",     teacher: "Mr. Leo Fernandez", teacherAvatar: "https://i.pravatar.cc/80?img=6",  students: 0,   duration: "12 weeks", modules: 8,  rating: 0,   status: "Draft",    accentClass: "bg-amber-500" },
  { id: "c7", title: "Introduction to Programming",         subject: "CS",          teacher: "Mr. James Okafor",  teacherAvatar: "https://i.pravatar.cc/80?img=11", students: 135, duration: "14 weeks", modules: 14, rating: 4.9, status: "Active",   accentClass: "bg-brand" },
  { id: "c8", title: "Environmental Science (2023)",        subject: "Science",     teacher: "Dr. Alice Monroe",  teacherAvatar: "https://i.pravatar.cc/80?img=49", students: 87,  duration: "10 weeks", modules: 8,  rating: 4.3, status: "Archived", accentClass: "bg-teal-500" },
];

const STATUS_COLORS: Record<Course["status"], string> = {
  "Active":   "bg-emerald-50 text-emerald-700",
  "Draft":    "bg-amber-50 text-amber-700",
  "Archived": "bg-ink-100 text-ink-500",
};

export default function AdminCoursesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Course["status"]>("All");
  const [showAdd, setShowAdd] = useState(false);

  const statuses: Array<"All" | Course["status"]> = ["All", "Active", "Draft", "Archived"];

  const filtered = MOCK_COURSES.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-12 pt-6">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Courses</h1>
              <p className="text-sm text-ink-500">{filtered.length} courses available</p>
            </div>
            <button onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">
              <Plus className="size-4" /> New Course
            </button>
          </div>

          {/* Filters */}
          <div className="mb-5 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-ink-400" />
              <input type="search" placeholder="Search courses..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-10 w-64 rounded-xl border border-ink-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
            </label>
            <div className="flex gap-2">
              {statuses.map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${statusFilter===s?"bg-violet-600 text-white":"bg-white border border-ink-200 text-ink-600 hover:bg-violet-50"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            {filtered.map((c, i) => (
              <div key={c.id} className="group flex flex-col rounded-2xl border border-ink-200 bg-white shadow-card overflow-hidden transition hover:shadow-md animate-fade-in-up"
                style={{ animationDelay: `${i * 40}ms` }}>
                {/* Color bar */}
                <div className={`h-2 w-full ${c.accentClass}`} />
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                    <button className="rounded-md p-1 text-ink-400 opacity-0 group-hover:opacity-100 hover:bg-ink-100"><MoreHorizontal className="size-3.5" /></button>
                  </div>
                  <h3 className="mt-2 text-sm font-bold leading-snug text-ink-900">{c.title}</h3>
                  <span className="mt-1 text-xs text-ink-500">{c.subject}</span>

                  <div className="mt-3 flex items-center gap-2">
                    <img src={c.teacherAvatar} alt={c.teacher} className="size-6 rounded-full object-cover" />
                    <span className="text-xs text-ink-600 truncate">{c.teacher}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-ink-500">
                    <span className="flex items-center gap-1"><Users className="size-3.5" />{c.students}</span>
                    <span className="flex items-center gap-1"><Clock className="size-3.5" />{c.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="size-3.5" />{c.modules} modules</span>
                  </div>

                  {c.rating > 0 && (
                    <div className="mt-2 flex items-center gap-1">
                      {[1,2,3,4,5].map(n => (
                        <Star key={n} className={`size-3 ${n <= Math.round(c.rating) ? "fill-amber-400 text-amber-400" : "text-ink-200"}`} />
                      ))}
                      <span className="ml-1 text-xs font-semibold text-ink-700">{c.rating}</span>
                    </div>
                  )}

                  <div className="mt-auto pt-4 flex gap-2">
                    <button className="flex-1 rounded-xl border border-ink-200 py-1.5 text-xs font-semibold text-ink-700 hover:bg-ink-50">Edit</button>
                    <button className="flex-1 rounded-xl bg-violet-600 py-1.5 text-xs font-semibold text-white hover:bg-violet-700">View</button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-4 py-16 text-center text-sm text-ink-400">No courses match your search.</p>
            )}
          </div>
        </main>
      </div>
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Create New Course</h2>
              <button onClick={() => setShowAdd(false)} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["Course Title","text"],["Subject","text"],["Duration","text"],["Modules","number"]].map(([l, t]) => (
                <label key={l} className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-ink-700">{l}</span>
                  <input type={t} className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400" />
                </label>
              ))}
              <label className="col-span-2 flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Assign Teacher</span>
                <select className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400">
                  <option>Dr. Alice Monroe</option>
                  <option>Mr. James Okafor</option>
                  <option>Ms. Clara Zhang</option>
                </select>
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Create Course</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
