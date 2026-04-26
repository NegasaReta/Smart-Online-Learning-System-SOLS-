import type { ButtonHTMLAttributes } from "react";
import {
  GraduationCap,
  Search,
  Bell,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useT } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Top app bar: brand, search, language, notifications, settings, avatar.
 */
export function Topbar() {
  const { t } = useT();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-ink-200 bg-white px-6">
      {/* Brand */}
      <div className="flex items-center gap-2 pr-4">
        <span className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <GraduationCap className="size-5" aria-hidden />
        </span>
        <span className="text-lg font-bold tracking-tight text-brand">
          EduSmart K-12
        </span>
      </div>

      {/* Search */}
      <label className="relative flex max-w-md flex-1 items-center">
        <Search
          className="pointer-events-none absolute left-3 size-4 text-ink-500"
          aria-hidden
        />
        <input
          type="search"
          placeholder={t("common.search")}
          className="h-10 w-full rounded-full border border-ink-200 bg-ink-50 pl-9 pr-4 text-sm text-ink-900 placeholder:text-ink-500 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <div className="ml-auto flex items-center gap-3">
        <LanguageSwitcher />

        <div className="relative">
          <IconButton aria-label={t("common.notifications")}>
            <Bell className="size-5" />
          </IconButton>
          <span
            className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500 ring-2 ring-white"
            aria-hidden
          />
        </div>

        <Link
          to="/student/settings"
          aria-label={t("common.settings")}
          className="flex size-9 items-center justify-center rounded-full text-ink-700 transition hover:bg-ink-100"
        >
          <Settings className="size-5" />
        </Link>

        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/80?img=47"
          alt="Elias avatar"
          className="size-9 rounded-full border-2 border-white object-cover shadow-card"
        />
      </div>
    </header>
  );
}

function IconButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className="flex size-9 items-center justify-center rounded-full text-ink-700 transition hover:bg-ink-100"
    >
      {children}
    </button>
  );
}
