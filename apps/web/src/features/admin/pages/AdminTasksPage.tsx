import { useState } from "react";
import { Plus, X, GripVertical, Circle, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

type Priority = "High" | "Medium" | "Low";
type TaskStatus = "To Do" | "In Progress" | "Done";

type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assigneeAvatar: string;
  priority: Priority;
  due: string;
  status: TaskStatus;
};

const PRIORITY_COLORS: Record<Priority, string> = {
  High:   "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-600",
  Low:    "bg-emerald-50 text-emerald-700",
};

const INITIAL_TASKS: Task[] = [
  { id: "tk1", title: "Upload Q3 exam results",          description: "Add Biology & Math exam results to the portal.", assignee: "Dr. Alice Monroe",  assigneeAvatar: "https://i.pravatar.cc/80?img=49", priority: "High",   due: "Oct 30, 2024", status: "To Do" },
  { id: "tk2", title: "Review new teacher applications", description: "Screen applications for 3 open positions.",      assignee: "Admin",             assigneeAvatar: "https://i.pravatar.cc/80?img=47", priority: "High",   due: "Oct 28, 2024", status: "To Do" },
  { id: "tk3", title: "Update course schedules",         description: "Reschedule Chemistry labs for November.",        assignee: "Mr. David Mensah",  assigneeAvatar: "https://i.pravatar.cc/80?img=14", priority: "Medium", due: "Nov 2, 2024",  status: "In Progress" },
  { id: "tk4", title: "Send parent newsletter",          description: "Monthly newsletter with academic updates.",      assignee: "Admin",             assigneeAvatar: "https://i.pravatar.cc/80?img=47", priority: "Medium", due: "Oct 31, 2024", status: "In Progress" },
  { id: "tk5", title: "Audit student attendance",        description: "Generate attendance report for Q3.",             assignee: "Mr. James Okafor", assigneeAvatar: "https://i.pravatar.cc/80?img=11", priority: "Low",    due: "Nov 5, 2024",  status: "In Progress" },
  { id: "tk6", title: "Library inventory update",        description: "Catalog new book arrivals.",                     assignee: "Admin",             assigneeAvatar: "https://i.pravatar.cc/80?img=47", priority: "Low",    due: "Nov 8, 2024",  status: "Done" },
  { id: "tk7", title: "Publish fall term grades",        description: "Grades approved and ready to publish.",         assignee: "Admin",             assigneeAvatar: "https://i.pravatar.cc/80?img=47", priority: "High",   due: "Oct 25, 2024", status: "Done" },
];

const COLUMNS: TaskStatus[] = ["To Do", "In Progress", "Done"];

const COL_META: Record<TaskStatus, { icon: React.ReactNode; headerClass: string }> = {
  "To Do":       { icon: <Circle className="size-4 text-ink-400" />,        headerClass: "border-ink-300" },
  "In Progress": { icon: <Clock className="size-4 text-amber-500" />,       headerClass: "border-amber-400" },
  "Done":        { icon: <CheckCircle2 className="size-4 text-emerald-500" />, headerClass: "border-emerald-400" },
};

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "Medium" as Priority, due: "", status: "To Do" as TaskStatus });

  function moveTask(id: string, to: TaskStatus) {
    setTasks(ts => ts.map(t => t.id === id ? { ...t, status: to } : t));
  }

  function deleteTask(id: string) {
    setTasks(ts => ts.filter(t => t.id !== id));
  }

  function addTask() {
    if (!newTask.title.trim()) return;
    const task: Task = {
      id: `tk${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      assignee: "Admin",
      assigneeAvatar: "https://i.pravatar.cc/80?img=47",
      priority: newTask.priority,
      due: newTask.due || "TBD",
      status: newTask.status,
    };
    setTasks(ts => [task, ...ts]);
    setShowAdd(false);
    setNewTask({ title: "", description: "", priority: "Medium", due: "", status: "To Do" });
  }

  const counts = COLUMNS.reduce((acc, col) => {
    acc[col] = tasks.filter(t => t.status === col).length;
    return acc;
  }, {} as Record<TaskStatus, number>);

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-12 pt-6">

          <div className="mb-6 flex items-center justify-between animate-fade-in-up">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Tasks</h1>
              <p className="text-sm text-ink-500">{tasks.length} tasks across all boards</p>
            </div>
            <button onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">
              <Plus className="size-4" /> Add Task
            </button>
          </div>

          {/* Kanban */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            {COLUMNS.map(col => {
              const colTasks = tasks.filter(t => t.status === col);
              const meta = COL_META[col];
              return (
                <div key={col} className="flex flex-col gap-3">
                  {/* Column header */}
                  <div className={`flex items-center gap-2 rounded-xl border-l-4 bg-white px-4 py-3 shadow-card ${meta.headerClass}`}>
                    {meta.icon}
                    <span className="font-semibold text-ink-900">{col}</span>
                    <span className="ml-auto flex size-6 items-center justify-center rounded-full bg-ink-100 text-xs font-bold text-ink-600">{counts[col]}</span>
                  </div>

                  {/* Task cards */}
                  <div className="flex flex-col gap-3">
                    {colTasks.map((t, i) => (
                      <TaskCard key={t.id} task={t} columns={COLUMNS} onMove={moveTask} onDelete={deleteTask}
                        animDelay={i * 40} />
                    ))}
                    {colTasks.length === 0 && (
                      <div className="rounded-2xl border-2 border-dashed border-ink-200 py-8 text-center text-xs text-ink-400">No tasks here</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">New Task</h2>
              <button onClick={() => setShowAdd(false)} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Title *</span>
                <input value={newTask.title} onChange={e => setNewTask(n => ({ ...n, title: e.target.value }))}
                  className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400" placeholder="Task title..." />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Description</span>
                <textarea value={newTask.description} onChange={e => setNewTask(n => ({ ...n, description: e.target.value }))}
                  className="rounded-xl border border-ink-200 px-3 py-2 text-sm outline-none focus:border-violet-400 resize-none" rows={3} placeholder="Short description..." />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-ink-700">Priority</span>
                  <select value={newTask.priority} onChange={e => setNewTask(n => ({ ...n, priority: e.target.value as Priority }))}
                    className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400">
                    {(["High","Medium","Low"] as Priority[]).map(p => <option key={p}>{p}</option>)}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-ink-700">Column</span>
                  <select value={newTask.status} onChange={e => setNewTask(n => ({ ...n, status: e.target.value as TaskStatus }))}
                    className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400">
                    {COLUMNS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </label>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Due Date</span>
                <input type="date" value={newTask.due} onChange={e => setNewTask(n => ({ ...n, due: e.target.value }))}
                  className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400" />
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button>
              <button onClick={addTask} className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Create Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskCard({ task, columns, onMove, onDelete, animDelay }: {
  task: Task;
  columns: TaskStatus[];
  onMove: (id: string, to: TaskStatus) => void;
  onDelete: (id: string) => void;
  animDelay: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const others = columns.filter(c => c !== task.status);

  return (
    <div className="relative rounded-2xl border border-ink-200 bg-white p-4 shadow-card transition hover:shadow-md animate-fade-in-up"
      style={{ animationDelay: `${animDelay}ms` }}>
      <div className="flex items-start gap-2">
        <GripVertical className="mt-0.5 size-4 shrink-0 text-ink-300" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-ink-900 leading-snug">{task.title}</p>
            <div className="relative">
              <button onClick={() => setMenuOpen(o => !o)}
                className="shrink-0 rounded-md p-1 text-ink-400 hover:bg-ink-100">
                <AlertCircle className="size-3.5" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-6 z-20 w-40 rounded-xl border border-ink-200 bg-white shadow-lg py-1 animate-scale-in">
                  {others.map(col => (
                    <button key={col} onClick={() => { onMove(task.id, col); setMenuOpen(false); }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-xs text-ink-700 hover:bg-violet-50">
                      Move to {col}
                    </button>
                  ))}
                  <button onClick={() => { onDelete(task.id); setMenuOpen(false); }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          {task.description && <p className="mt-1 text-xs text-ink-500 line-clamp-2">{task.description}</p>}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <img src={task.assigneeAvatar} alt={task.assignee} className="size-5 rounded-full object-cover" />
              <span className="text-xs text-ink-500 truncate max-w-[100px]">{task.assignee}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-ink-400">Due: {task.due}</p>
        </div>
      </div>
    </div>
  );
}
