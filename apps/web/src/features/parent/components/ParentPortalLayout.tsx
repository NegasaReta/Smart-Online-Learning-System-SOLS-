import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useT } from "../../../i18n/I18nProvider";
import type { RouteId } from "../routes";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type Props = {
  children: ReactNode;
  title: string;
  activeRoute: RouteId;
  onNavigate: (id: RouteId) => void;
};

export function ParentPortalLayout({
  children,
  title,
  activeRoute,
  onNavigate,
}: Props) {
  const t = useT();
  const showBack = activeRoute !== "dashboard";
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar active={activeRoute} onNavigate={onNavigate} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} onNavigate={onNavigate} />
        <main className="flex-1 px-6 py-6 md:px-10 md:py-8">
          {showBack && (
            <button
              type="button"
              onClick={() => onNavigate("dashboard")}
              className="mb-5 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("common.back")}
            </button>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
