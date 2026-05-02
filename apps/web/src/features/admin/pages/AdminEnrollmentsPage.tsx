import { useState } from "react";
import {
  Search, Plus, X, ChevronLeft, ChevronRight, MoreHorizontal, CheckCircle2, Clock, XCircle,
  Users, GraduationCap, BookOpen, ClipboardList, Mail, Phone, Eye, Trash2, Check, AlertTriangle,
  User, Calendar, Award,
} from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

type EnrollStatus = "Approved" | "Pending" | "Rejected";

type Enrollment = {
  id: string; student: string; avatar: string; studentId: string;
  course: string; subject: string; grade: string; teacher: string;
  enrolledDate: string; status: EnrollStatus;
  email: string; phone: string; parent: string; gpa: number;
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

const STUDENTS_DB = [
  { name: "Evelyn Harper",  avatar: "https://i.pravatar.cc/80?img=44", studentId: "PRE43178", grade: "Grade 10", email: "evelyn@school.edu",  phone: "+1 555-2001", parent: "Margaret Harper", gpa: 3.9 },
  { name: "Diana Plenty",   avatar: "https://i.pravatar.cc/80?img=36", studentId: "PRE43174", grade: "Grade 11", email: "diana@school.edu",   phone: "+1 555-2002", parent: "Robert Plenty",   gpa: 3.7 },
  { name: "John Millar",    avatar: "https://i.pravatar.cc/80?img=15", studentId: "PRE43187", grade: "Grade 10", email: "john@school.edu",    phone: "+1 555-2003", parent: "Sarah Millar",    gpa: 3.6 },
  { name: "Sofia Martinez", avatar: "https://i.pravatar.cc/80?img=47", studentId: "PRE43201", grade: "Grade 9",  email: "sofia@school.edu",   phone: "+1 555-2004", parent: "Carlos Martinez", gpa: 3.8 },
  { name: "Noah Williams",  avatar: "https://i.pravatar.cc/80?img=12", studentId: "PRE43195", grade: "Grade 12", email: "noah@school.edu",    phone: "+1 555-2005", parent: "James Williams",  gpa: 3.5 },
  { name: "Amara Osei",     avatar: "https://i.pravatar.cc/80?img=23", studentId: "PRE43202", grade: "Grade 9",  email: "amara@school.edu",   phone: "+1 555-2006", parent: "Kofi Osei",       gpa: 4.0 },
  { name: "Luca Bianchi",   avatar: "https://i.pravatar.cc/80?img=8",  studentId: "PRE43211", grade: "Grade 11", email: "luca@school.edu",    phone: "+1 555-2007", parent: "Marco Bianchi",   gpa: 3.4 },
  { name: "Priya Sharma",   avatar: "https://i.pravatar.cc/80?img=38", studentId: "PRE43219", grade: "Grade 10", email: "priya@school.edu",   phone: "+1 555-2008", parent: "Ravi Sharma",     gpa: 3.9 },
];

const COURSES_DB = [
  { title: "Biology 101",          subject: "Biology",     teacher: "Dr. Alice Monroe"  },
  { title: "Calculus",             subject: "Mathematics", teacher: "Mr. James Okafor"  },
  { title: "Modern History",       subject: "History",     teacher: "Mr. Leo Fernandez" },
  { title: "World Literature",     subject: "Literature",  teacher: "Ms. Fatima Hassan" },
  { title: "Physics II",           subject: "Physics",     teacher: "Ms. Clara Zhang"   },
  { title: "Organic Chemistry",    subject: "Chemistry",   teacher: "Mr. David Mensah"  },
  { title: "Intro to Programming", subject: "CS",          teacher: "Mr. James Okafor"  },
];

const INITIAL: Enrollment[] = [
  { id: "e1",  ...STUDENTS_DB[0], course: "Biology 101",         subject: "Biology",     teacher: "Dr. Alice Monroe",  enrolledDate: "Sep 1, 2024",  status: "Approved" as EnrollStatus, student: STUDENTS_DB[0].name, avatar: STUDENTS_DB[0].avatar },
  { id: "e2",  ...STUDENTS_DB[1], course: "Calculus",            subject: "Mathematics", teacher: "Mr. James Okafor",  enrolledDate: "Sep 1, 2024",  status: "Approved" as EnrollStatus, student: STUDENTS_DB[1].name, avatar: STUDENTS_DB[1].avatar },
  { id: "e3",  ...STUDENTS_DB[2], course: "Modern History",      subject: "History",     teacher: "Mr. Leo Fernandez", enrolledDate: "Sep 2, 2024",  status: "Approved" as EnrollStatus, student: STUDENTS_DB[2].name, avatar: STUDENTS_DB[2].avatar },
  { id: "e4",  ...STUDENTS_DB[3], course: "World Literature",    subject: "Literature",  teacher: "Ms. Fatima Hassan", enrolledDate: "Sep 2, 2024",  status: "Approved" as EnrollStatus, student: STUDENTS_DB[3].name, avatar: STUDENTS_DB[3].avatar },
  { id: "e5",  ...STUDENTS_DB[4], course: "Physics II",          subject: "Physics",     teacher: "Ms. Clara Zhang",   enrolledDate: "Sep 3, 2024",  status: "Pending"  as EnrollStatus, student: STUDENTS_DB[4].name, avatar: STUDENTS_DB[4].avatar },
  { id: "e6",  ...STUDENTS_DB[5], course: "Organic Chemistry",   subject: "Chemistry",   teacher: "Mr. David Mensah",  enrolledDate: "Sep 3, 2024",  status: "Approved" as EnrollStatus, student: STUDENTS_DB[5].name, avatar: STUDENTS_DB[5].avatar },
  { id: "e7",  ...STUDENTS_DB[6], course: "Calculus",            subject: "Mathematics", teacher: "Mr. James Okafor",  enrolledDate: "Sep 4, 2024",  status: "Approved" as EnrollStatus, student: STUDENTS_DB[6].name, avatar: STUDENTS_DB[6].avatar },
  { id: "e8",  ...STUDENTS_DB[7], course: "Biology 101",         subject: "Biology",     teacher: "Dr. Alice Monroe",  enrolledDate: "Sep 4, 2024",  status: "Rejected" as EnrollStatus, student: STUDENTS_DB[7].name, avatar: STUDENTS_DB[7].avatar },
  { id: "e9",  ...STUDENTS_DB[0], course: "Intro to Programming",subject: "CS",          teacher: "Mr. James Okafor",  enrolledDate: "Sep 5, 2024",  status: "Approved" as EnrollStatus, student: STUDENTS_DB[0].name, avatar: STUDENTS_DB[0].avatar },
  { id: "e10", ...STUDENTS_DB[4], course: "World Literature",    subject: "Literature",  teacher: "Ms. Fatima Hassan", enrolledDate: "Oct 1, 2024",  status: "Pending"  as EnrollStatus, student: STUDENTS_DB[4].name, avatar: STUDENTS_DB[4].avatar },
];

const PAGE_SIZE = 7;
const STATUSES: Array<"All" | EnrollStatus> = ["All", "Approved", "Pending", "Rejected"];

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(INITIAL);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | EnrollStatus>("All");
  const [page, setPage] = useState(1);
  const [showWizard, setShowWizard] = useState(false);
  const [viewTarget, setViewTarget] = useState<Enrollment | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Enrollment | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 2500); }

  const filtered = enrollments.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = e.student.toLowerCase().includes(q) || e.course.toLowerCase().includes(q) || e.studentId.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function approve(id: string) { setEnrollments(es => es.map(e => e.id === id ? { ...e, status: "Approved" } : e)); showToast("Enrollment approved"); }
  function reject(id: string) { setEnrollments(es => es.map(e => e.id === id ? { ...e, status: "Rejected" } : e)); showToast("Enrollment rejected"); }
  function handleAdd(e: Enrollment) { setEnrollments(es => [e, ...es]); setShowWizard(false); showToast(`${e.student} enrolled in ${e.course}`); }
  function handleDelete() {
    if (!deleteTarget) return;
    setEnrollments(es => es.filter(e => e.id !== deleteTarget.id));
    showToast("Enrollment removed");
    setDeleteTarget(null);
  }

  const statValues = {
    total: enrollments.length,
    approved: enrollments.filter(e => e.status === "Approved").length,
    pending: enrollments.filter(e => e.status === "Pending").length,
    rejected: enrollments.filter(e => e.status === "Rejected").length,
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-12 pt-6">

          {/* Header */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Enrollments</h1>
              <p className="text-sm text-ink-500">{filtered.length} enrollment records</p>
            </div>
            <button onClick={() => setShowWizard(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:scale-[1.02] active:scale-100">
              <Plus className="size-4" /> Enroll Student
            </button>
          </div>

          {/* Dashboard-style stat cards */}
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: "40ms" }}>
            {[
              { label: "Total Enrollments", value: statValues.total, icon: ClipboardList, bg: "bg-violet-50", iBg: "bg-violet-100", color: "text-violet-600" },
              { label: "Approved",          value: statValues.approved, icon: CheckCircle2, bg: "bg-emerald-50", iBg: "bg-emerald-100", color: "text-emerald-600" },
              { label: "Pending",           value: statValues.pending, icon: Clock, bg: "bg-amber-50", iBg: "bg-amber-100", color: "text-amber-600" },
              { label: "Rejected",          value: statValues.rejected, icon: XCircle, bg: "bg-red-50", iBg: "bg-red-100", color: "text-red-600" },
            ].map((s, i) => (
              <div key={s.label} className={`group flex items-center justify-between rounded-2xl border border-ink-200 ${s.bg} p-5 shadow-card transition hover:shadow-md hover:scale-[1.02] animate-fade-in-up cursor-default`}
                style={{ animationDelay: `${i * 40}ms` }}>
                <div>
                  <p className="text-xs font-semibold text-ink-500">{s.label}</p>
                  <p className="mt-1 text-2xl font-bold text-ink-900">{s.value}</p>
                </div>
                <span className={`flex size-12 items-center justify-center rounded-2xl ${s.iBg} ${s.color} transition group-hover:scale-110`}>
                  <s.icon className="size-6" aria-hidden />
                </span>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-ink-400" />
              <input type="search" placeholder="Search student, course, or ID..." value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="h-10 w-80 rounded-xl border border-ink-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
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
                    <tr key={e.id} onClick={() => setViewTarget(e)} className="border-b border-ink-50 last:border-0 hover:bg-violet-50/20 transition cursor-pointer">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <img src={e.avatar} alt={e.student} className="size-9 rounded-full object-cover ring-2 ring-violet-100" />
                          <div>
                            <p className="font-semibold text-ink-900">{e.student}</p>
                            <p className="text-xs text-ink-400 font-mono">{e.studentId}</p>
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
                      <td className="px-4 py-3.5" onClick={ev => ev.stopPropagation()}>
                        {e.status === "Pending" ? (
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => approve(e.id)} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition">Approve</button>
                            <button onClick={() => reject(e.id)} className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 transition">Reject</button>
                          </div>
                        ) : (
                          <div className="relative">
                            <button onClick={() => setMenuOpen(menuOpen === e.id ? null : e.id)} className="rounded-md p-1 text-ink-400 hover:bg-ink-100"><MoreHorizontal className="size-4" /></button>
                            {menuOpen === e.id && (
                              <div className="absolute right-0 top-8 z-20 w-36 rounded-xl border border-ink-200 bg-white py-1 shadow-lg animate-scale-in">
                                <button onClick={() => { setViewTarget(e); setMenuOpen(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-xs text-ink-700 hover:bg-ink-50"><Eye className="size-3.5" />View Details</button>
                                <button onClick={() => { setDeleteTarget(e); setMenuOpen(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50"><Trash2 className="size-3.5" />Remove</button>
                              </div>
                            )}
                          </div>
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

      {/* Modals */}
      {viewTarget && <EnrollmentDetail enrollment={viewTarget} onClose={() => setViewTarget(null)} onApprove={() => { approve(viewTarget.id); setViewTarget(null); }} onReject={() => { reject(viewTarget.id); setViewTarget(null); }} />}
      {showWizard && <EnrollmentWizard onClose={() => setShowWizard(false)} onAdd={handleAdd} nextId={enrollments.length + 1} />}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-scale-in text-center">
            <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-red-100"><AlertTriangle className="size-6 text-red-600" /></span>
            <h3 className="text-lg font-bold text-ink-900">Remove Enrollment</h3>
            <p className="mt-1 text-sm text-ink-500">Remove <strong>{deleteTarget.student}</strong> from <strong>{deleteTarget.course}</strong>?</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Remove</button>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-ink-900 px-4 py-3 text-sm font-medium text-white shadow-lg animate-fade-in-up">
          <Check className="size-4 text-emerald-400" /> {toast}
        </div>
      )}
    </div>
  );
}

/* ──────── Enrollment Detail ──────── */
function EnrollmentDetail({ enrollment: e, onClose, onApprove, onReject }: { enrollment: Enrollment; onClose: () => void; onApprove: () => void; onReject: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 animate-fade-in" onClick={onClose}>
      <div className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-xl animate-fade-in-up" onClick={ev => ev.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-100 bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-ink-900">Enrollment Details</h2>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-5 text-ink-500" /></button>
        </div>
        <div className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <img src={e.avatar} alt={e.student} className="size-16 rounded-full object-cover ring-4 ring-violet-100" />
            <div>
              <h3 className="text-xl font-bold text-ink-900">{e.student}</h3>
              <p className="text-sm text-ink-500">{e.grade} · GPA {e.gpa.toFixed(1)}</p>
              <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[e.status]}`}>
                {STATUS_ICON[e.status]}{e.status}
              </span>
            </div>
          </div>

          <div className="mb-5 rounded-xl border border-violet-100 bg-violet-50 p-4">
            <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-violet-700"><BookOpen className="size-3.5" />Enrolled Course</h4>
            <p className="text-base font-bold text-ink-900">{e.course}</p>
            <p className="text-xs text-ink-500">{e.subject} · Taught by {e.teacher}</p>
            <p className="mt-2 flex items-center gap-1 text-xs text-ink-500"><Calendar className="size-3" />Enrolled on {e.enrolledDate}</p>
          </div>

          <div className="mb-5">
            <h4 className="mb-3 text-xs font-bold uppercase text-ink-400">Student Information</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Student ID", value: e.studentId, icon: User },
                { label: "GPA", value: e.gpa.toFixed(2), icon: Award },
                { label: "Email", value: e.email, icon: Mail },
                { label: "Phone", value: e.phone, icon: Phone },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3 rounded-xl border border-ink-100 bg-ink-50 p-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600"><item.icon className="size-4" /></span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase text-ink-400">{item.label}</p>
                    <p className="truncate text-sm font-semibold text-ink-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 rounded-xl border border-ink-100 bg-white p-4">
            <h4 className="mb-2 text-xs font-bold uppercase text-ink-400">Parent / Guardian</h4>
            <p className="text-sm font-semibold text-ink-900">{e.parent}</p>
          </div>

          {e.status === "Pending" && (
            <div className="flex gap-3">
              <button onClick={onReject} className="flex-1 rounded-xl bg-red-50 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100 transition">Reject</button>
              <button onClick={onApprove} className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition">Approve Enrollment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────── Multi-Step Enrollment Wizard ──────── */
const ENROLL_STEPS = ["Select Student", "Choose Course", "Confirm"];

function EnrollmentWizard({ onClose, onAdd, nextId }: { onClose: () => void; onAdd: (e: Enrollment) => void; nextId: number }) {
  const [step, setStep] = useState(0);
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS_DB[number] | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<typeof COURSES_DB[number] | null>(null);
  const [enrollDate, setEnrollDate] = useState(new Date().toISOString().slice(0, 10));

  const studentResults = STUDENTS_DB.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.studentId.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const stepValid = [!!selectedStudent, !!selectedCourse, true];
  function next() { if (stepValid[step] && step < ENROLL_STEPS.length - 1) setStep(s => s + 1); }
  function prev() { if (step > 0) setStep(s => s - 1); }

  function submit() {
    if (!selectedStudent || !selectedCourse) return;
    const formattedDate = new Date(enrollDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    onAdd({
      id: `e${Date.now()}_${nextId}`,
      ...selectedStudent,
      student: selectedStudent.name,
      avatar: selectedStudent.avatar,
      course: selectedCourse.title, subject: selectedCourse.subject, teacher: selectedCourse.teacher,
      enrolledDate: formattedDate, status: "Pending",
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-xl animate-scale-in">
        <div className="border-b border-ink-100 px-6 pt-6 pb-4">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink-900">Enroll Student</h2>
            <button onClick={onClose} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
          </div>
          <div className="flex items-center gap-2">
            {ENROLL_STEPS.map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <div className={`flex flex-col items-center ${i <= step ? "text-violet-600" : "text-ink-400"}`}>
                  <span className={`flex size-7 items-center justify-center rounded-full text-xs font-bold transition ${i < step ? "bg-violet-600 text-white" : i === step ? "bg-violet-600 text-white ring-4 ring-violet-100" : "bg-ink-100 text-ink-500"}`}>
                    {i < step ? <Check className="size-3.5" /> : i + 1}
                  </span>
                  <span className="mt-1 text-[10px] font-semibold whitespace-nowrap">{s}</span>
                </div>
                {i < ENROLL_STEPS.length - 1 && <div className={`h-0.5 flex-1 ${i < step ? "bg-violet-600" : "bg-ink-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 min-h-[320px]">
          {step === 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-ink-700">Search and select a student</p>
              <label className="relative flex items-center">
                <Search className="pointer-events-none absolute left-3 size-4 text-ink-400" />
                <input value={studentSearch} onChange={e => setStudentSearch(e.target.value)} placeholder="Search by name or ID..."
                  className="h-10 w-full rounded-xl border border-ink-200 pl-9 pr-3 text-sm outline-none focus:border-violet-400" />
              </label>
              <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                {studentResults.map(s => (
                  <button key={s.studentId} onClick={() => setSelectedStudent(s)}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition ${selectedStudent?.studentId === s.studentId ? "border-violet-600 bg-violet-50" : "border-ink-200 hover:border-violet-300"}`}>
                    <img src={s.avatar} alt={s.name} className="size-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ink-900">{s.name}</p>
                      <p className="text-xs text-ink-500 font-mono">{s.studentId} · {s.grade} · GPA {s.gpa}</p>
                    </div>
                    {selectedStudent?.studentId === s.studentId && <Check className="size-5 text-violet-600" />}
                  </button>
                ))}
                {studentResults.length === 0 && <p className="py-6 text-center text-xs text-ink-400">No students found</p>}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-ink-700">Choose a course to enroll {selectedStudent?.name} in</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {COURSES_DB.map(c => (
                  <button key={c.title} onClick={() => setSelectedCourse(c)}
                    className={`rounded-xl border-2 p-3 text-left transition ${selectedCourse?.title === c.title ? "border-violet-600 bg-violet-50" : "border-ink-200 hover:border-violet-300"}`}>
                    <p className="text-sm font-bold text-ink-900">{c.title}</p>
                    <p className="text-xs text-ink-500">{c.subject}</p>
                    <p className="mt-1 text-xs text-ink-400">By {c.teacher}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && selectedStudent && selectedCourse && (
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase text-ink-400">Confirm Enrollment</p>

              <div className="flex items-center gap-3 rounded-xl border border-ink-100 bg-ink-50 p-4">
                <img src={selectedStudent.avatar} alt={selectedStudent.name} className="size-12 rounded-full object-cover ring-2 ring-violet-200" />
                <div>
                  <p className="text-[10px] font-semibold uppercase text-ink-400">Student</p>
                  <p className="text-sm font-bold text-ink-900">{selectedStudent.name}</p>
                  <p className="text-xs text-ink-500">{selectedStudent.studentId} · {selectedStudent.grade}</p>
                </div>
              </div>

              <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">
                <p className="text-[10px] font-semibold uppercase text-violet-700">Course</p>
                <p className="text-sm font-bold text-ink-900">{selectedCourse.title}</p>
                <p className="text-xs text-ink-500">{selectedCourse.subject} · {selectedCourse.teacher}</p>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Enrollment Date</span>
                <input type="date" value={enrollDate} onChange={e => setEnrollDate(e.target.value)}
                  className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400" />
              </label>

              <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-700">
                <strong>Note:</strong> This enrollment will be created with <strong>Pending</strong> status and require admin approval.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-ink-100 bg-ink-50 px-6 py-4">
          <button onClick={prev} disabled={step === 0}
            className="inline-flex items-center gap-1 rounded-xl border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 disabled:opacity-40 hover:bg-ink-100">
            <ChevronLeft className="size-4" /> Back
          </button>
          <span className="text-xs text-ink-500">Step {step + 1} of {ENROLL_STEPS.length}</span>
          {step < ENROLL_STEPS.length - 1 ? (
            <button onClick={next} disabled={!stepValid[step]}
              className="inline-flex items-center gap-1 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 hover:bg-violet-700">
              Next <ChevronRight className="size-4" />
            </button>
          ) : (
            <button onClick={submit} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
              Confirm Enrollment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
