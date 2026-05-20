import { useState } from "react";
import { useT } from "../../i18n/I18nProvider";
import { ParentPortalLayout } from "./components/ParentPortalLayout";
import { ParentDashboard } from "./pages/ParentDashboard";
import { ParentSettings } from "./pages/ParentSettings";
import { ActivityLogs } from "./pages/ActivityLogs";
import { ChildProgress } from "./pages/ChildProgress";
import { ParentReport } from "./pages/ParentReport";
import { ROUTES, type RouteId } from "./routes";

/**
 * Root component for the parent portal. Uses internal state (not react-router)
 * to switch between sub-pages, matching the teammate's original design.
 * Mounted by the AppRouter under /parent/*.
 */
export function ParentPortalRoot() {
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
