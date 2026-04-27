import { useState } from "react";
import { Search, Plus, MoreHorizontal, X, Shield, ChevronLeft, ChevronRight, Edit2, Trash2, Lock } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

type Role = "Admin" | "Teacher" | "Student" | "Parent";
type UserStatus = "Active" | "Suspended" | "Pending";

type SystemUser = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: Role;
  lastLogin: string;
  status: UserStatus;
  joined: string;
};

const ROLE_COLORS: Record<Role, string> = {
  Admin:   "bg-violet-100 text-violet-700",
  Teacher: "bg-cyan-50 text-cyan-700",
  Student: "bg-emerald-50 text-emerald-700",
  Parent:  "bg-orange-50 text-orange-600",
};

const STATUS_COLORS: Record<UserStatus, string> = {
  Active:    "bg-emerald-50 text-emerald-700",
  Suspended: "bg-red-50 text-red-600",
  Pending:   "bg-amber-50 text-amber-700",
};

const MOCK_USERS: SystemUser[] = [
  { id: "u1",  name: "Priscilla Lily",   avatar: "https://i.pravatar.cc/80?img=47", email: "priscilla@school.edu",  role: "Admin",   lastLogin: "Just now",       status: "Active",    joined: "Jan 2022" },
  { id: "u2",  name: "Dr. Alice Monroe", avatar: "https://i.pravatar.cc/80?img=49", email: "alice@school.edu",      role: "Teacher", lastLogin: "2 hours ago",    status: "Active",    joined: "Aug 2022" },
  { id: "u3",  name: "Mr. James Okafor",avatar: "https://i.pravatar.cc/80?img=11",  email: "james@school.edu",      role: "Teacher", lastLogin: "Yesterday",      status: "Active",    joined: "Aug 2022" },
  { id: "u4",  name: "Evelyn Harper",    avatar: "https://i.pravatar.cc/80?img=44", email: "evelyn@school.edu",     role: "Student", lastLogin: "3 hours ago",    status: "Active",    joined: "Sep 2023" },
  { id: "u5",  name: "Diana Plenty",     avatar: "https://i.pravatar.cc/80?img=36", email: "diana@school.edu",      role: "Student", lastLogin: "1 day ago",      status: "Active",    joined: "Sep 2023" },
  { id: "u6",  name: "Margaret Harper",  avatar: "https://i.pravatar.cc/80?img=46", email: "margaret@mail.com",     role: "Parent",  lastLogin: "5 days ago",     status: "Active",    joined: "Sep 2023" },
  { id: "u7",  name: "Noah Williams",    avatar: "https://i.pravatar.cc/80?img=12", email: "noah@school.edu",       role: "Student", lastLogin: "2 weeks ago",    status: "Suspended", joined: "Sep 2023" },
  { id: "u8",  name: "New Teacher",      avatar: "https://i.pravatar.cc/80?img=21", email: "newteacher@school.edu", role: "Teacher", lastLogin: "Never",          status: "Pending",   joined: "Oct 2024" },
  { id: "u9",  name: "Priya Sharma",     avatar: "https://i.pravatar.cc/80?img=38", email: "priya@school.edu",      role: "Student", lastLogin: "3 weeks ago",    status: "Suspended", joined: "Sep 2022" },
  { id: "u10", name: "Kofi Osei",        avatar: "https://i.pravatar.cc/80?img=24", email: "kofi@mail.com",         role: "Parent",  lastLogin: "1 week ago",     status: "Active",    joined: "Sep 2022" },
];

const PAGE_SIZE = 7;
const ROLES: Array<"All" | Role> = ["All", "Admin", "Teacher", "Student", "Parent"];

export default function AdminUserManagementPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | Role>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | UserStatus>("All");
  const [users, setUsers] = useState<SystemUser[]>(MOCK_USERS);
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState<SystemUser | null>(null);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleStatus(id: string) {
    setUsers(us => us.map(u => u.id === id
      ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
      : u));
  }

  function deleteUser(id: string) {
    setUsers(us => us.filter(u => u.id !== id));
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-12 pt-6">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">User Management</h1>
              <p className="text-sm text-ink-500">{users.length} system users</p>
            </div>
            <button onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
              <Plus className="size-4" /> Invite User
            </button>
          </div>

          {/* Role summary badges */}
          <div className="mb-5 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            {(["Admin","Teacher","Student","Parent"] as Role[]).map(r => {
              const count = users.filter(u => u.role === r).length;
              return (
                <button key={r} onClick={() => { setRoleFilter(roleFilter === r ? "All" : r); setPage(1); }}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${roleFilter === r ? "border-violet-300 bg-violet-600 text-white" : "border-ink-200 bg-white text-ink-700 hover:bg-violet-50"}`}>
                  <Shield className="size-4" />{r}
                  <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${roleFilter === r ? "bg-white/20 text-white" : "bg-ink-100 text-ink-600"}`}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-ink-400" />
              <input type="search" placeholder="Search users..." value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="h-10 w-64 rounded-xl border border-ink-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
            </label>
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value as "All" | UserStatus); setPage(1); }}
              className="h-10 rounded-xl border border-ink-200 bg-white px-3 text-sm outline-none focus:border-violet-400">
              {(["All","Active","Suspended","Pending"] as Array<"All"|UserStatus>).map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-ink-200 bg-white shadow-card overflow-hidden animate-fade-in-up" style={{ animationDelay: "140ms" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-100 bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    <th className="px-5 py-3 text-left">User</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Last Login</th>
                    <th className="px-4 py-3 text-left">Joined</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map(u => (
                    <tr key={u.id} className="border-b border-ink-50 last:border-0 hover:bg-violet-50/30 transition">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <img src={u.avatar} alt={u.name} className="size-8 rounded-full object-cover ring-2 ring-ink-100" />
                          <div>
                            <p className="font-semibold text-ink-900">{u.name}</p>
                            <p className="text-xs text-ink-400">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${ROLE_COLORS[u.role]}`}>
                          <Shield className="size-2.5" />{u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-ink-500">{u.lastLogin}</td>
                      <td className="px-4 py-3.5 text-xs text-ink-500">{u.joined}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[u.status]}`}>{u.status}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setEditUser(u)} title="Edit" className="rounded-md p-1.5 text-ink-400 hover:bg-violet-50 hover:text-violet-700"><Edit2 className="size-3.5" /></button>
                          <button onClick={() => toggleStatus(u.id)} title={u.status === "Active" ? "Suspend" : "Activate"}
                            className="rounded-md p-1.5 text-ink-400 hover:bg-amber-50 hover:text-amber-600"><Lock className="size-3.5" /></button>
                          <button onClick={() => deleteUser(u.id)} title="Delete" className="rounded-md p-1.5 text-ink-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="size-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paged.length === 0 && (
                    <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-ink-400">No users found.</td></tr>
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

      {/* Edit modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Edit User</h2>
              <button onClick={() => setEditUser(null)} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Name</span>
                <input defaultValue={editUser.name} className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Role</span>
                <select defaultValue={editUser.role} className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400">
                  {(["Admin","Teacher","Student","Parent"] as Role[]).map(r => <option key={r}>{r}</option>)}
                </select>
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setEditUser(null)} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button>
              <button onClick={() => setEditUser(null)} className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Save</button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Invite User</h2>
              <button onClick={() => setShowAdd(false)} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Email</span>
                <input type="email" className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400" placeholder="user@school.edu" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Role</span>
                <select className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400">
                  {(["Teacher","Student","Parent"] as Role[]).map(r => <option key={r}>{r}</option>)}
                </select>
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
