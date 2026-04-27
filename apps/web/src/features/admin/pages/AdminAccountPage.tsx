import { useState } from "react";
import { Camera, Save, Lock, Bell, Shield, Eye, EyeOff } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

const TABS = ["Profile", "Security", "Notifications", "Preferences"] as const;
type Tab = typeof TABS[number];

export default function AdminAccountPage() {
  const [tab, setTab] = useState<Tab>("Profile");

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[900px] flex-1 px-6 pb-12 pt-6">

          <div className="mb-6 animate-fade-in-up">
            <h1 className="text-2xl font-bold text-ink-900">My Account</h1>
            <p className="text-sm text-ink-500">Manage your profile and settings</p>
          </div>

          {/* Tab bar */}
          <div className="mb-6 flex gap-1 rounded-xl border border-ink-200 bg-white p-1 shadow-card w-fit animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${tab === t ? "bg-violet-600 text-white shadow-sm" : "text-ink-600 hover:bg-violet-50 hover:text-violet-700"}`}>
                {t}
              </button>
            ))}
          </div>

          {tab === "Profile" && <ProfileTab />}
          {tab === "Security" && <SecurityTab />}
          {tab === "Notifications" && <NotificationsTab />}
          {tab === "Preferences" && <PreferencesTab />}
        </main>
      </div>
    </div>
  );
}

function ProfileTab() {
  const [form, setForm] = useState({
    firstName: "Priscilla", lastName: "Lily", email: "priscilla@school.edu",
    phone: "+1 555-0001", role: "Admin", bio: "School administrator with 8 years of experience managing academic operations.",
  });
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up">
      {/* Avatar section */}
      <div className="flex items-center gap-5 rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
        <div className="relative">
          <img src="https://i.pravatar.cc/80?img=47" alt="Avatar" className="size-20 rounded-full object-cover ring-4 ring-violet-100" />
          <button className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full bg-violet-600 text-white shadow-md hover:bg-violet-700 transition">
            <Camera className="size-3.5" />
          </button>
        </div>
        <div>
          <p className="text-lg font-bold text-ink-900">{form.firstName} {form.lastName}</p>
          <p className="text-sm text-ink-500">{form.email}</p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-bold text-violet-700">
            <Shield className="size-3" /> {form.role}
          </span>
        </div>
        <button onClick={() => {}} className="ml-auto rounded-xl border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-50">
          Upload Photo
        </button>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="mb-5 text-base font-bold text-ink-900">Personal Information</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[["First Name","firstName"],["Last Name","lastName"],["Email","email"],["Phone","phone"]].map(([label, key]) => (
            <label key={key} className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-ink-700">{label}</span>
              <input value={(form as Record<string,string>)[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
            </label>
          ))}
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-xs font-semibold text-ink-700">Bio</span>
            <textarea value={form.bio} rows={3}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              className="rounded-xl border border-ink-200 px-3 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 resize-none" />
          </label>
        </div>
        <div className="mt-5 flex justify-end">
          <button onClick={handleSave}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition ${saved ? "bg-emerald-500" : "bg-violet-600 hover:bg-violet-700"}`}>
            <Save className="size-4" /> {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  const [show, setShow] = useState({ curr: false, new: false, conf: false });
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up">
      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-ink-900"><Lock className="size-4 text-violet-600" /> Change Password</h2>
        <div className="flex flex-col gap-4 max-w-sm">
          {([["Current Password","curr"],["New Password","new"],["Confirm Password","conf"]] as [string, keyof typeof show][]).map(([label, key]) => (
            <label key={key} className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-ink-700">{label}</span>
              <div className="relative">
                <input type={show[key] ? "text" : "password"}
                  className="h-10 w-full rounded-xl border border-ink-200 px-3 pr-10 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
                <button type="button" onClick={() => setShow(s => ({ ...s, [key]: !s[key] }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700">
                  {show[key] ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </label>
          ))}
          <button className="mt-1 w-fit rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Update Password</button>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-base font-bold text-ink-900"><Shield className="size-4 text-violet-600" /> Two-Factor Authentication</h2>
            <p className="mt-1 text-sm text-ink-500">Add an extra layer of security to your account.</p>
          </div>
          <button onClick={() => setTwoFA(v => !v)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${twoFA ? "bg-violet-600" : "bg-ink-200"}`}>
            <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${twoFA ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
        {twoFA && (
          <div className="mt-4 rounded-xl bg-violet-50 px-4 py-3 text-sm text-violet-700 font-medium">
            Two-factor authentication is <strong>enabled</strong>. An OTP will be sent to your email on login.
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    emailNewStudent: true, emailExamResults: true, emailMessages: false,
    pushAnnouncements: true, pushTasks: true, pushReports: false,
  });
  type PrefKey = keyof typeof prefs;

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card animate-fade-in-up">
      <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-ink-900"><Bell className="size-4 text-violet-600" /> Notification Preferences</h2>
      <div className="flex flex-col divide-y divide-ink-100">
        {([
          ["emailNewStudent",   "New Student Registration",  "Email"],
          ["emailExamResults",  "Exam Results Uploaded",     "Email"],
          ["emailMessages",     "New Messages",              "Email"],
          ["pushAnnouncements", "New Announcements",         "Push"],
          ["pushTasks",         "Task Assignments",          "Push"],
          ["pushReports",       "Report Generation",         "Push"],
        ] as [PrefKey, string, string][]).map(([key, label, channel]) => (
          <div key={key} className="flex items-center justify-between py-3.5">
            <div>
              <p className="text-sm font-semibold text-ink-900">{label}</p>
              <p className="text-xs text-ink-400">{channel} notification</p>
            </div>
            <button onClick={() => setPrefs(p => ({ ...p, [key]: !p[key] }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${prefs[key] ? "bg-violet-600" : "bg-ink-200"}`}>
              <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${prefs[key] ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        ))}
      </div>
      <button className="mt-4 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Save Preferences</button>
    </div>
  );
}

function PreferencesTab() {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");
  const [fontSize, setFontSize] = useState("md");

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card animate-fade-in-up">
      <h2 className="mb-5 text-base font-bold text-ink-900">Display Preferences</h2>
      <div className="flex flex-col gap-5 max-w-sm">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-ink-700">Theme</span>
          <div className="flex gap-3">
            {["light","dark","system"].map(t => (
              <button key={t} onClick={() => setTheme(t)}
                className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold capitalize transition ${theme === t ? "border-violet-400 bg-violet-50 text-violet-700" : "border-ink-200 text-ink-600 hover:bg-ink-50"}`}>
                {t}
              </button>
            ))}
          </div>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-ink-700">Language</span>
          <select value={lang} onChange={e => setLang(e.target.value)}
            className="h-10 rounded-xl border border-ink-200 px-3 text-sm outline-none focus:border-violet-400">
            <option value="en">English</option>
            <option value="am">Amharic</option>
            <option value="fr">French</option>
            <option value="ar">Arabic</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-ink-700">Font Size</span>
          <div className="flex gap-3">
            {[["sm","Small"],["md","Medium"],["lg","Large"]].map(([v,l]) => (
              <button key={v} onClick={() => setFontSize(v)}
                className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition ${fontSize === v ? "border-violet-400 bg-violet-50 text-violet-700" : "border-ink-200 text-ink-600 hover:bg-ink-50"}`}>
                {l}
              </button>
            ))}
          </div>
        </label>
        <button className="w-fit rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Save Preferences</button>
      </div>
    </div>
  );
}
