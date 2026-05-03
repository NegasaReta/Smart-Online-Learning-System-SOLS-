import { useEffect, useState } from "react";
import { useT } from "./i18n/I18nProvider";
import { ParentPortalLayout } from "./features/parent/components/ParentPortalLayout";
import { ParentDashboard } from "./features/parent/pages/ParentDashboard";
import { ParentSettings } from "./features/parent/pages/ParentSettings";
import { ActivityLogs } from "./features/parent/pages/ActivityLogs";
import { ChildProgress } from "./features/parent/pages/ChildProgress";
import { ParentReport } from "./features/parent/pages/ParentReport";
import { ROUTES, type RouteId } from "./features/parent/routes";
import { TeacherPortal } from "./features/teacher/TeacherPortal";

type Portal = "parent" | "teacher";

function readPortalFromHash(): Portal {
  return window.location.hash.includes("teacher") ? "teacher" : "parent";
}

export default function App() {
  const [portal, setPortal] = useState<Portal>(readPortalFromHash());

  useEffect(() => {
    const onHash = () => setPortal(readPortalFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return portal === "teacher" ? <TeacherPortal /> : <ParentPortalRoot />;
}

function ParentPortalRoot() {
  const t = useT();
  const [route, setRoute] = useState<RouteId>("dashboard");
  const rawTitle = ROUTES.find((r) => r.id === route)?.title ?? "Overview";
  const title = t(rawTitle);

  return (
    <ParentPortalLayout
      title={title}
      activeRoute={route}
      onNavigate={setRoute}
    >
      {route === "dashboard" && <ParentDashboard onNavigate={setRoute} />}
      {route === "settings" && <ParentSettings />}
      {route === "progress" && <ChildProgress />}
      {route === "report" && <ParentReport />}
      {route === "logs" && <ActivityLogs />}
    </ParentPortalLayout>
  );
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-12 text-center shadow-card ring-1 ring-slate-100">
      <h2 className="text-lg font-semibold text-slate-900">{label}</h2>
      <p className="mt-2 text-sm text-slate-500">
        This page is coming soon.
      </p>
    </div>
  );
}
