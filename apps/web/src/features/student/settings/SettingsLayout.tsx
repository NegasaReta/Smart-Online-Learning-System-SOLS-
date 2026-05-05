import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Shield,
  SlidersHorizontal,
  GraduationCap,
  LogOut,
  Settings as SettingsIcon,
  ArrowLeft,
} from "lucide-react";
import { Topbar } from "../components/Topbar";

/**
 * Settings shell — left mini-sidebar (avatar header + tabs + Logout) and an
 * <Outlet /> for the active sub-page. Reuses the global Topbar so the
 * navigation, search, and language switcher stay consistent with the rest
 * of the dashboard.
 */
export default function SettingsLayout() {
  const navigate = useNavigate();

  function goBack() {
    // If there is a previous entry in history go back, otherwise fall back
    // to the dashboard so the button is never a dead-end.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/student/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen bg-surface-page font-sans text-ink-900">
      <SettingsSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="mx-auto w-full max-w-[1100px] flex-1 px-8 pb-12 pt-6">
          <button
            type="button"
            onClick={goBack}
            className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm font-semibold text-ink-700 shadow-card transition hover:bg-ink-50"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const tabs = [
  {
    to: "/student/settings/security",
    label: "Account Security",
    icon: Shield,
  },
  {
    to: "/student/settings/preferences",
    label: "Preferences",
    icon: SlidersHorizontal,
  },
  {
    to: "/student/settings/academic",
    label: "Academic Details",
    icon: GraduationCap,
  },
];

function SettingsSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-ink-200 bg-white lg:flex">
      {/* Avatar header */}
      <header className="flex items-center gap-3 px-5 py-5">
        <span className="flex size-10 items-center justify-center rounded-full bg-brand/10 text-brand">
          <SettingsIcon className="size-5" aria-hidden />
        </span>
        <div>
          <p className="text-base font-bold text-brand">Settings</p>
          <p className="text-xs text-ink-500">Manage your experience</p>
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) =>
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition " +
              (isActive
                ? "bg-brand/10 text-brand"
                : "text-ink-700 hover:bg-ink-50")
            }
          >
            <t.icon className="size-4" aria-hidden />
            {t.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-ink-200 px-3 py-4">
        <NavLink
          to="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50"
        >
          <LogOut className="size-4" aria-hidden />
          Logout
        </NavLink>
      </div>
    </aside>
  );
}
