import { useState } from "react";
import { Plus, X, Megaphone, Pin, Trash2, Edit2, Search, Globe, Users, GraduationCap } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

type Audience = "All" | "Students" | "Teachers" | "Parents";
type AnnouncementStatus = "Published" | "Draft";

type Announcement = {
  id: string;
  title: string;
  body: string;
  audience: Audience;
  status: AnnouncementStatus;
  date: string;
  pinned: boolean;
  author: string;
  authorAvatar: string;
};

const AUDIENCE_ICON: Record<Audience, React.ReactNode> = {
  All:      <Globe className="size-3.5" />,
  Students: <Users className="size-3.5" />,
  Teachers: <GraduationCap className="size-3.5" />,
  Parents:  <Users className="size-3.5" />,
};

const AUDIENCE_COLORS: Record<Audience, string> = {
  All:      "bg-violet-50 text-violet-700",
  Students: "bg-emerald-50 text-emerald-700",
  Teachers: "bg-cyan-50 text-cyan-700",
  Parents:  "bg-orange-50 text-orange-600",
};

const INITIAL: Announcement[] = [
  { id: "a1", title: "Mid-term Exam Schedule Released",          body: "The mid-term exam schedule for all grades is now available on the portal. Please review your assigned dates and venues.",                pinned: true,  audience: "All",      status: "Published", date: "Oct 10, 2024", author: "Priscilla Lily", authorAvatar: "https://i.pravatar.cc/80?img=47" },
  { id: "a2", title: "Parent-Teacher Conference — Oct 21",       body: "We are pleased to invite all parents to our annual Parent-Teacher Conference on October 21st at 3:00 PM in the Main Hall.",            pinned: true,  audience: "Parents",  status: "Published", date: "Oct 8, 2024",  author: "Priscilla Lily", authorAvatar: "https://i.pravatar.cc/80?img=47" },
  { id: "a3", title: "New Library Hours Effective November",     body: "Starting November 1st, the school library will be open from 7:30 AM to 6:00 PM on weekdays and 9:00 AM to 1:00 PM on Saturdays.",    pinned: false, audience: "All",      status: "Published", date: "Oct 7, 2024",  author: "Dr. Alice Monroe", authorAvatar: "https://i.pravatar.cc/80?img=49" },
  { id: "a4", title: "Sports Day Registration Open",             body: "Students wishing to participate in Sports Day on November 15th should register with their class teacher by October 31st.",             pinned: false, audience: "Students", status: "Published", date: "Oct 5, 2024",  author: "Priscilla Lily", authorAvatar: "https://i.pravatar.cc/80?img=47" },
  { id: "a5", title: "Teacher Professional Development — Draft", body: "A professional development workshop will be held on November 8th. All teaching staff must attend. Details to follow.",               pinned: false, audience: "Teachers", status: "Draft",     date: "Oct 4, 2024",  author: "Priscilla Lily", authorAvatar: "https://i.pravatar.cc/80?img=47" },
];

const AUDIENCES: Array<"All" | Audience> = ["All", "Students", "Teachers", "Parents"];

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState(INITIAL);
  const [search, setSearch] = useState("");
  const [audienceFilter, setAudienceFilter] = useState<"All" | Audience>("All");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState({ title: "", body: "", audience: "All" as Audience, status: "Published" as AnnouncementStatus });

  const filtered = items.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.body.toLowerCase().includes(search.toLowerCase());
    const matchAudience = audienceFilter === "All" || a.audience === audienceFilter;
    return matchSearch && matchAudience;
  });

  const pinned = filtered.filter(a => a.pinned);
  const rest = filtered.filter(a => !a.pinned);

  function togglePin(id: string) { setItems(is => is.map(i => i.id === id ? { ...i, pinned: !i.pinned } : i)); }
  function deleteItem(id: string) { setItems(is => is.filter(i => i.id !== id)); }

  function saveNew() {
    if (!form.title.trim()) return;
    const item: Announcement = {
      id: `a${Date.now()}`, ...form,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      author: "Priscilla Lily", authorAvatar: "https://i.pravatar.cc/80?img=47", pinned: false,
    };
    setItems(is => [item, ...is]);
    setShowAdd(false);
    setForm({ title: "", body: "", audience: "All", status: "Published" });
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[1100px] flex-1 px-6 pb-12 pt-6">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Announcements</h1>
              <p className="text-sm text-ink-500">{items.filter(a => a.status === "Published").length} published · {items.filter(a => a.status === "Draft").length} drafts</p>
            </div>
            <button onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
              <Plus className="size-4" /> New Announcement
            </button>
          </div>

          {/* Filters */}
          <div className="mb-5 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-ink-400" />
              <input type="search" placeholder="Search announcements..." value={search} onChange={e => setSearch(e.target.value)}
                className="h-10 w-64 rounded-xl border border-ink-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
            </label>
            <div className="flex gap-2">
              {AUDIENCES.map(a => (
                <button key={a} onClick={() => setAudienceFilter(a)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${audienceFilter === a ? "bg-violet-600 text-white" : "bg-white border border-ink-200 text-ink-600 hover:bg-violet-50"}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Pinned */}
          {pinned.length > 0 && (
            <div className="mb-5 animate-fade-in-up" style={{ animationDelay: "80ms" }}>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-500"><Pin className="size-3.5" /> Pinned</p>
              <div className="flex flex-col gap-3">
                {pinned.map((a, i) => <AnnouncementCard key={a.id} item={a} onPin={togglePin} onDelete={deleteItem} onEdit={setEditing} delay={i * 40} />)}
              </div>
            </div>
          )}

          {/* Rest */}
          <div className="flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: "120ms" }}>
            {rest.map((a, i) => <AnnouncementCard key={a.id} item={a} onPin={togglePin} onDelete={deleteItem} onEdit={setEditing} delay={i * 40} />)}
            {filtered.length === 0 && <p className="py-16 text-center text-sm text-ink-400">No announcements found.</p>}
          </div>
        </main>
      </div>

      {/* Add / Edit modal */}
      {(showAdd || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">{editing ? "Edit Announcement" : "New Announcement"}</h2>
              <button onClick={() => { setShowAdd(false); setEditing(null); }} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Title *</span>
                <input defaultValue={editing?.title} value={editing ? undefined : form.title}
                  onChange={e => !editing && setForm(f => ({ ...f, title: e.target.value }))}
                  className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400" placeholder="Announcement title..." />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Body *</span>
                <textarea rows={4} defaultValue={editing?.body} value={editing ? undefined : form.body}
                  onChange={e => !editing && setForm(f => ({ ...f, body: e.target.value }))}
                  className="rounded-xl border border-ink-200 px-3 py-2 text-sm outline-none focus:border-violet-400 resize-none" placeholder="Write your announcement..." />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-ink-700">Audience</span>
                  <select defaultValue={editing?.audience} value={editing ? undefined : form.audience}
                    onChange={e => !editing && setForm(f => ({ ...f, audience: e.target.value as Audience }))}
                    className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400">
                    {(["All","Students","Teachers","Parents"] as Audience[]).map(a => <option key={a}>{a}</option>)}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-ink-700">Status</span>
                  <select defaultValue={editing?.status} value={editing ? undefined : form.status}
                    onChange={e => !editing && setForm(f => ({ ...f, status: e.target.value as AnnouncementStatus }))}
                    className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400">
                    <option>Published</option><option>Draft</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => { setShowAdd(false); setEditing(null); }} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button>
              <button onClick={() => { editing ? setEditing(null) : saveNew(); }} className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">
                {editing ? "Save Changes" : "Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AnnouncementCard({ item, onPin, onDelete, onEdit, delay }: {
  item: Announcement;
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (a: Announcement) => void;
  delay: number;
}) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card transition hover:shadow-md animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-100">
            <Megaphone className="size-4 text-violet-600" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-ink-900">{item.title}</h3>
              {item.pinned && <Pin className="size-3.5 text-violet-500" />}
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${AUDIENCE_COLORS[item.audience]}`}>
                {AUDIENCE_ICON[item.audience]}{item.audience}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                {item.status}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-ink-600 line-clamp-2">{item.body}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-ink-400">
              <img src={item.authorAvatar} alt="" className="size-4 rounded-full" />
              <span>{item.author}</span>
              <span>·</span>
              <span>{item.date}</span>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button onClick={() => onPin(item.id)} title={item.pinned ? "Unpin" : "Pin"}
            className={`rounded-md p-1.5 transition hover:bg-violet-50 ${item.pinned ? "text-violet-600" : "text-ink-400"}`}>
            <Pin className="size-3.5" />
          </button>
          <button onClick={() => onEdit(item)} className="rounded-md p-1.5 text-ink-400 hover:bg-blue-50 hover:text-blue-600"><Edit2 className="size-3.5" /></button>
          <button onClick={() => onDelete(item.id)} className="rounded-md p-1.5 text-ink-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="size-3.5" /></button>
        </div>
      </div>
    </div>
  );
}
