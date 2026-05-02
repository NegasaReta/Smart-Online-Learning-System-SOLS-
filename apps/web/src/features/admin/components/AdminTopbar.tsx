import { Search, Bell, ChevronDown, Settings, UserCircle, LogOut, User, Shield, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LANGUAGES = [
  { code: "en", label: "English",  flag: "🇬🇧" },
  { code: "am", label: "Amharic",  flag: "🇪🇹" },
  { code: "fr", label: "French",   flag: "🇫🇷" },
  { code: "ar", label: "Arabic",   flag: "🇸🇦" },
  { code: "zh", label: "Chinese",  flag: "🇨🇳" },
];

const NOTIFICATIONS = [
  { id: "n1", text: "New student registered: Amara Osei",        time: "2 min ago",  unread: true },
  { id: "n2", text: "Exam results uploaded for Biology 101",     time: "1 hour ago", unread: true },
  { id: "n3", text: "Parent message from Margaret Harper",       time: "3 hours ago",unread: false },
  { id: "n4", text: "New teacher application received",          time: "Yesterday",  unread: false },
];

export function AdminTopbar() {
  const [query, setQuery] = useState("");
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [activeLang, setActiveLang] = useState(LANGUAGES[0]);
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const notifsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifs.filter(n => n.unread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (notifsRef.current && !notifsRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setShowLang(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  function markAllRead() {
    setNotifs(n => n.map(x => ({ ...x, unread: false })));
  }

  function handleLogout() {
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-ink-200 bg-white px-6">
      {/* Search */}
      <label className="relative flex max-w-sm flex-1 items-center">
        <Search className="pointer-events-none absolute left-3 size-4 text-ink-400" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to find?"
          className="h-10 w-full rounded-full border border-ink-200 bg-ink-50 pl-9 pr-4 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-200"
        />
      </label>

      <div className="ml-auto flex items-center gap-1.5">

        {/* Settings icon */}
        <Link
          to="/admin/account"
          aria-label="Settings"
          className="flex size-9 items-center justify-center rounded-full text-ink-600 transition hover:bg-ink-100"
        >
          <Settings className="size-5" />
        </Link>

        {/* Notifications */}
        <div className="relative" ref={notifsRef}>
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => { setShowNotifs(o => !o); setShowProfile(false); }}
            className="flex size-9 items-center justify-center rounded-full text-ink-600 transition hover:bg-ink-100"
          >
            <Bell className="size-5" />
          </button>
          {unreadCount > 0 && (
            <span className="pointer-events-none absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
              {unreadCount}
            </span>
          )}

          {showNotifs && (
            <div className="absolute right-0 top-11 z-30 w-80 rounded-2xl border border-ink-200 bg-white shadow-xl animate-scale-in">
              <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
                <h3 className="text-sm font-bold text-ink-900">Notifications</h3>
                <button onClick={markAllRead} className="text-xs font-semibold text-violet-600 hover:underline">Mark all read</button>
              </div>
              <ul className="max-h-72 overflow-y-auto divide-y divide-ink-50">
                {notifs.map(n => (
                  <li key={n.id} className={`flex items-start gap-3 px-4 py-3 transition hover:bg-ink-50 ${n.unread ? "bg-violet-50/40" : ""}`}>
                    <span className={`mt-1.5 size-2 shrink-0 rounded-full ${n.unread ? "bg-violet-500" : "bg-ink-200"}`} />
                    <div className="min-w-0">
                      <p className="text-xs text-ink-800 leading-snug">{n.text}</p>
                      <p className="mt-0.5 text-[10px] text-ink-400">{n.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-ink-100 px-4 py-2.5 text-center">
                <Link to="/admin/announcements" onClick={() => setShowNotifs(false)} className="text-xs font-semibold text-violet-600 hover:underline">
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Language selector */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            aria-label="Language"
            onClick={() => { setShowLang(o => !o); setShowProfile(false); setShowNotifs(false); }}
            className="flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-ink-700 transition hover:bg-ink-50"
          >
            <Globe className="size-4 text-ink-400" />
            <span>{activeLang.flag}</span>
            <span className="hidden sm:block">{activeLang.code.toUpperCase()}</span>
            <ChevronDown className={`size-3.5 text-ink-400 transition-transform ${showLang ? "rotate-180" : ""}`} aria-hidden />
          </button>

          {showLang && (
            <div className="absolute right-0 top-11 z-30 w-44 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-xl animate-scale-in">
              <p className="border-b border-ink-100 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Language</p>
              <ul className="py-1">
                {LANGUAGES.map(lang => (
                  <li key={lang.code}>
                    <button
                      type="button"
                      onClick={() => { setActiveLang(lang); setShowLang(false); }}
                      className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition hover:bg-violet-50 ${
                        activeLang.code === lang.code ? "font-semibold text-violet-700" : "text-ink-700"
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      {lang.label}
                      {activeLang.code === lang.code && (
                        <span className="ml-auto size-1.5 rounded-full bg-violet-500" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => { setShowProfile(o => !o); setShowNotifs(false); }}
            className="flex items-center gap-2.5 rounded-full border border-ink-200 bg-white py-1 pl-1 pr-3 transition hover:bg-ink-50"
          >
            <img
              src="https://i.pravatar.cc/80?img=47"
              alt="Admin avatar"
              className="size-8 rounded-full object-cover"
            />
            <div className="text-left leading-tight">
              <p className="text-xs font-semibold text-ink-900">Priscilla Lily</p>
              <p className="text-[10px] text-ink-500">Admin</p>
            </div>
            <ChevronDown className={`size-4 text-ink-400 transition-transform ${showProfile ? "rotate-180" : ""}`} aria-hidden />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 z-30 w-56 rounded-2xl border border-ink-200 bg-white shadow-xl animate-scale-in">
              {/* Profile header */}
              <div className="flex items-center gap-3 border-b border-ink-100 px-4 py-3.5">
                <img src="https://i.pravatar.cc/80?img=47" alt="" className="size-10 rounded-full object-cover ring-2 ring-violet-100" />
                <div>
                  <p className="text-sm font-bold text-ink-900">Priscilla Lily</p>
                  <p className="text-xs text-ink-500">priscilla@school.edu</p>
                  <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">
                    <Shield className="size-2.5" /> Admin
                  </span>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1.5">
                <Link to="/admin/account" onClick={() => setShowProfile(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-700 transition hover:bg-violet-50 hover:text-violet-700">
                  <UserCircle className="size-4" /> My Account
                </Link>
                <Link to="/admin/account" onClick={() => setShowProfile(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-700 transition hover:bg-violet-50 hover:text-violet-700">
                  <User className="size-4" /> Edit Profile
                </Link>
                <Link to="/admin/account" onClick={() => setShowProfile(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-700 transition hover:bg-violet-50 hover:text-violet-700">
                  <Settings className="size-4" /> Settings
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-ink-100 py-1.5">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="size-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
