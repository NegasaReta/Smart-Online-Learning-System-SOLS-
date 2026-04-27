import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Clock, MapPin } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

type EventType = "class" | "exam" | "meeting" | "holiday" | "assignment";

type CalEvent = {
  id: string;
  title: string;
  date: string;   // "YYYY-MM-DD"
  time: string;
  location: string;
  type: EventType;
};

const TYPE_COLORS: Record<EventType, string> = {
  class:      "bg-violet-100 text-violet-700 border-violet-300",
  exam:       "bg-red-100 text-red-700 border-red-300",
  meeting:    "bg-cyan-100 text-cyan-700 border-cyan-300",
  holiday:    "bg-emerald-100 text-emerald-700 border-emerald-300",
  assignment: "bg-amber-100 text-amber-700 border-amber-300",
};

const TYPE_DOT: Record<EventType, string> = {
  class: "bg-violet-500", exam: "bg-red-500", meeting: "bg-cyan-500",
  holiday: "bg-emerald-500", assignment: "bg-amber-500",
};

const MOCK_EVENTS: CalEvent[] = [
  { id: "e1",  title: "Biology 101 Lecture",          date: "2024-10-07", time: "09:00 AM", location: "Room 204",      type: "class" },
  { id: "e2",  title: "Staff Meeting",                date: "2024-10-09", time: "02:00 PM", location: "Conference Room",type: "meeting" },
  { id: "e3",  title: "Mid-term Exams",               date: "2024-10-14", time: "10:00 AM", location: "Exam Hall A",   type: "exam" },
  { id: "e4",  title: "Mid-term Exams (Day 2)",       date: "2024-10-15", time: "10:00 AM", location: "Exam Hall A",   type: "exam" },
  { id: "e5",  title: "Physics Lab Session",          date: "2024-10-16", time: "01:00 PM", location: "Lab B",         type: "class" },
  { id: "e6",  title: "Assignment Deadline",          date: "2024-10-18", time: "11:59 PM", location: "Online",        type: "assignment" },
  { id: "e7",  title: "Parent-Teacher Conference",    date: "2024-10-21", time: "03:00 PM", location: "Main Hall",     type: "meeting" },
  { id: "e8",  title: "School Founding Day (Holiday)",date: "2024-10-25", time: "All Day",  location: "Campus",        type: "holiday" },
  { id: "e9",  title: "Calculus Exam",                date: "2024-10-28", time: "09:00 AM", location: "Exam Hall B",   type: "exam" },
  { id: "e10", title: "Literature Class",             date: "2024-10-30", time: "11:00 AM", location: "Room 101",      type: "class" },
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function firstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function pad(n: number) { return String(n).padStart(2, "0"); }

export default function AdminCalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [events, setEvents] = useState<CalEvent[]>(MOCK_EVENTS);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", location: "", type: "class" as EventType });

  function prevMonth() { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); }
  function nextMonth() { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); }

  const days = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);
  const cells = Array.from({ length: firstDay + days }, (_, i) => i < firstDay ? null : i - firstDay + 1);

  function dateStr(d: number) { return `${year}-${pad(month + 1)}-${pad(d)}`; }
  function eventsForDay(d: number) { return events.filter(e => e.date === dateStr(d)); }

  const selectedEvents = selectedDay ? events.filter(e => e.date === selectedDay) : [];

  function addEvent() {
    if (!newEvent.title || !newEvent.date) return;
    setEvents(ev => [...ev, { ...newEvent, id: `e${Date.now()}` }]);
    setShowAdd(false);
    setNewEvent({ title: "", date: "", time: "", location: "", type: "class" });
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-12 pt-6">

          <div className="mb-6 flex items-center justify-between animate-fade-in-up">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Calendar</h1>
              <p className="text-sm text-ink-500">School events and schedule</p>
            </div>
            <button onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
              <Plus className="size-4" /> Add Event
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
            {/* Calendar grid */}
            <div className="rounded-2xl border border-ink-200 bg-white shadow-card p-5 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
              {/* Month nav */}
              <div className="mb-4 flex items-center justify-between">
                <button onClick={prevMonth} className="rounded-xl p-2 hover:bg-ink-100"><ChevronLeft className="size-5 text-ink-600" /></button>
                <h2 className="text-base font-bold text-ink-900">{MONTH_NAMES[month]} {year}</h2>
                <button onClick={nextMonth} className="rounded-xl p-2 hover:bg-ink-100"><ChevronRight className="size-5 text-ink-600" /></button>
              </div>

              {/* Day headers */}
              <div className="mb-2 grid grid-cols-7 text-center">
                {DAYS_OF_WEEK.map(d => (
                  <div key={d} className="py-1 text-[11px] font-bold uppercase tracking-wide text-ink-400">{d}</div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                  if (day === null) return <div key={`empty-${i}`} />;
                  const ds = dateStr(day);
                  const dayEvents = eventsForDay(day);
                  const isToday = ds === `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;
                  const isSelected = ds === selectedDay;
                  return (
                    <button key={day} onClick={() => setSelectedDay(isSelected ? null : ds)}
                      className={`flex flex-col items-center rounded-xl p-1.5 transition ${isSelected ? "bg-violet-600" : isToday ? "bg-violet-50" : "hover:bg-ink-50"}`}>
                      <span className={`text-xs font-semibold ${isSelected ? "text-white" : isToday ? "text-violet-700" : "text-ink-700"}`}>{day}</span>
                      <div className="mt-0.5 flex flex-wrap justify-center gap-0.5">
                        {dayEvents.slice(0, 3).map(e => (
                          <span key={e.id} className={`inline-block size-1.5 rounded-full ${isSelected ? "bg-white/80" : TYPE_DOT[e.type]}`} />
                        ))}
                        {dayEvents.length > 3 && <span className={`text-[9px] font-bold ${isSelected ? "text-white/80" : "text-ink-400"}`}>+{dayEvents.length-3}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-3 border-t border-ink-100 pt-4">
                {(Object.entries(TYPE_DOT) as Array<[EventType, string]>).map(([type, dot]) => (
                  <span key={type} className="flex items-center gap-1.5 text-xs capitalize text-ink-500">
                    <span className={`inline-block size-2.5 rounded-full ${dot}`} />{type}
                  </span>
                ))}
              </div>
            </div>

            {/* Side panel */}
            <div className="flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              {/* Selected day events */}
              <div className="rounded-2xl border border-ink-200 bg-white shadow-card p-4">
                <h3 className="mb-3 text-sm font-bold text-ink-900">
                  {selectedDay ? `Events on ${selectedDay}` : "Upcoming Events"}
                </h3>
                <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1">
                  {(selectedDay ? selectedEvents : events.slice(0, 8)).map(e => (
                    <div key={e.id} className={`rounded-xl border px-3 py-2.5 ${TYPE_COLORS[e.type]}`}>
                      <p className="text-xs font-semibold leading-snug">{e.title}</p>
                      <div className="mt-1 flex flex-col gap-0.5 text-[10px] opacity-80">
                        {e.time && <span className="flex items-center gap-1"><Clock className="size-2.5" />{e.time}</span>}
                        {e.location && <span className="flex items-center gap-1"><MapPin className="size-2.5" />{e.location}</span>}
                      </div>
                    </div>
                  ))}
                  {selectedDay && selectedEvents.length === 0 && (
                    <p className="text-center text-xs text-ink-400 py-6">No events on this day.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Add Event</h2>
              <button onClick={() => setShowAdd(false)} className="rounded-full p-1.5 hover:bg-ink-100"><X className="size-4 text-ink-500" /></button>
            </div>
            <div className="flex flex-col gap-4">
              {[["Title","title","text"],["Date","date","date"],["Time","time","time"],["Location","location","text"]].map(([l, k, t]) => (
                <label key={k} className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-ink-700">{l}</span>
                  <input type={t} value={(newEvent as Record<string,string>)[k]}
                    onChange={e => setNewEvent(n => ({ ...n, [k]: e.target.value }))}
                    className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400" />
                </label>
              ))}
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink-700">Type</span>
                <select value={newEvent.type} onChange={e => setNewEvent(n => ({ ...n, type: e.target.value as EventType }))}
                  className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400">
                  {(["class","exam","meeting","holiday","assignment"] as EventType[]).map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
                </select>
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button>
              <button onClick={addEvent} className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Add Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
