import { useState } from "react";
import { Search, Plus, MoreHorizontal, X, Mail, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

type Parent = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  children: string[];
  occupation: string;
  status: "Active" | "Inactive";
};

const MOCK_PARENTS: Parent[] = [
  { id: "p1", name: "Margaret Harper",  avatar: "https://i.pravatar.cc/80?img=46", email: "margaret@mail.com", phone: "+1 555-1001", children: ["Evelyn Harper"],          occupation: "Nurse",           status: "Active" },
  { id: "p2", name: "Robert Plenty",    avatar: "https://i.pravatar.cc/80?img=9",  email: "robert@mail.com",   phone: "+1 555-1002", children: ["Diana Plenty"],            occupation: "Engineer",        status: "Active" },
  { id: "p3", name: "Sarah Millar",     avatar: "https://i.pravatar.cc/80?img=42", email: "sarah@mail.com",    phone: "+1 555-1003", children: ["John Millar"],             occupation: "Teacher",         status: "Active" },
  { id: "p4", name: "Carlos Martinez",  avatar: "https://i.pravatar.cc/80?img=13", email: "carlos@mail.com",   phone: "+1 555-1004", children: ["Sofia Martinez"],          occupation: "Accountant",      status: "Active" },
  { id: "p5", name: "James Williams",   avatar: "https://i.pravatar.cc/80?img=19", email: "james.w@mail.com",  phone: "+1 555-1005", children: ["Noah Williams"],           occupation: "Business Owner",  status: "Inactive" },
  { id: "p6", name: "Kofi Osei",        avatar: "https://i.pravatar.cc/80?img=24", email: "kofi@mail.com",     phone: "+1 555-1006", children: ["Amara Osei"],              occupation: "Architect",       status: "Active" },
  { id: "p7", name: "Marco Bianchi",    avatar: "https://i.pravatar.cc/80?img=5",  email: "marco@mail.com",    phone: "+1 555-1007", children: ["Luca Bianchi"],            occupation: "Doctor",          status: "Active" },
  { id: "p8", name: "Ravi Sharma",      avatar: "https://i.pravatar.cc/80?img=33", email: "ravi@mail.com",     phone: "+1 555-1008", children: ["Priya Sharma"],            occupation: "Pharmacist",      status: "Active" },
];

const PAGE_SIZE = 6;

export default function AdminParentsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = MOCK_PARENTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.children.join(", ").toLowerCase().includes(search.toLowerCase())
  );

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
              <h1 className="text-2xl font-bold text-ink-900">Parents</h1>
              <p className="text-sm text-ink-500">{filtered.length} parents registered</p>
            </div>
            <button onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">
              <Plus className="size-4" /> Add Parent
            </button>
          </div>

          <div className="mb-4 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            <label className="relative flex items-center w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 size-4 text-ink-400" />
              <input type="search" placeholder="Search parents or children..." value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="h-10 w-full rounded-xl border border-ink-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
            </label>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            {paged.map((p, i) => (
              <div key={p.id} className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card hover:shadow-md transition animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={p.avatar} alt={p.name} className="size-11 rounded-full object-cover ring-2 ring-violet-100" />
                    <div>
                      <p className="font-semibold text-ink-900">{p.name}</p>
                      <p className="text-xs text-ink-500">{p.occupation}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-ink-100 text-ink-500"}`}>
                    {p.status}
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-2 text-xs text-ink-500">
                  <span className="flex items-center gap-2"><Mail className="size-3.5 shrink-0" />{p.email}</span>
                  <span className="flex items-center gap-2"><Phone className="size-3.5 shrink-0" />{p.phone}</span>
                </div>
                <div className="mt-3 border-t border-ink-100 pt-3">
                  <p className="text-xs font-semibold text-ink-500 mb-1.5">Children</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.children.map(c => (
                      <span key={c} className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">{c}</span>
                    ))}
                  </div>
                </div>
                <button className="mt-3 w-full rounded-xl border border-ink-200 py-2 text-xs font-semibold text-ink-600 transition hover:bg-violet-50 hover:border-violet-300 hover:text-violet-700">
                  View Profile
                </button>
              </div>
            ))}
            {paged.length === 0 && (
              <p className="col-span-3 py-16 text-center text-sm text-ink-400">No parents found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-5 flex items-center justify-between text-xs text-ink-500 animate-fade-in-up">
            <span>Showing {Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}</span>
            <div className="flex items-center gap-1">
              <button disabled={page===1} onClick={() => setPage(p => p-1)} className="rounded-lg p-1.5 hover:bg-ink-100 disabled:opacity-40"><ChevronLeft className="size-4" /></button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i+1)} className={`size-7 rounded-lg text-xs font-semibold ${page===i+1?"bg-violet-600 text-white":"hover:bg-ink-100 text-ink-600"}`}>{i+1}</button>
              ))}
              <button disabled={page===totalPages} onClick={() => setPage(p => p+1)} className="rounded-lg p-1.5 hover:bg-ink-100 disabled:opacity-40"><ChevronRight className="size-4" /></button>
            </div>
          </div>
        </main>
      </div>
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Add Parent</h2>
              <button onClick={() => setShowAdd(false)} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
            </div>
            <p className="text-sm text-ink-500 mb-6">Fill in the details below to add a new parent to the system.</p>
            {[["Full Name","text"],["Email","email"],["Phone","tel"],["Occupation","text"]].map(([l, t]) => (
              <label key={l} className="mb-4 flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">{l}</span>
                <input type={t} className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400" />
              </label>
            ))}
            <div className="mt-2 flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Add Parent</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
