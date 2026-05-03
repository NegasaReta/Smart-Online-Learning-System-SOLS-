import { useState } from "react";
import { useT } from "../../i18n/I18nProvider";
import { TeacherPortalLayout } from "./components/TeacherPortalLayout";
import { Authoring } from "./pages/Authoring";
import { ClassManagement } from "./pages/ClassManagement";
import { PerformanceAnalytics } from "./pages/PerformanceAnalytics";
import { StudentFeedback } from "./pages/StudentFeedback";
import { SubjectResources } from "./pages/SubjectResources";
import { TeacherDashboard } from "./pages/TeacherDashboard";
import { TeacherSettings } from "./pages/TeacherSettings";
import { TEACHER_ROUTES, type TeacherRouteId } from "./routes";

export function TeacherPortal() {
  const t = useT();
  const [route, setRoute] = useState<TeacherRouteId>("dashboard");
  const rawTitle =
    TEACHER_ROUTES.find((r) => r.id === route)?.title ?? "Teacher Dashboard";
  const title = t(rawTitle);

  return (
    <TeacherPortalLayout
      title={title}
      activeRoute={route}
      onNavigate={setRoute}
    >
      {route === "dashboard" && <TeacherDashboard onNavigate={setRoute} />}
      {route === "classes" && <ClassManagement />}
      {route === "authoring" && <Authoring />}
      {route === "resources" && <SubjectResources />}
      {route === "feedback" && <StudentFeedback />}
      {route === "analytics" && <PerformanceAnalytics />}
      {route === "settings" && <TeacherSettings />}
    </TeacherPortalLayout>
  );
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-12 text-center shadow-card ring-1 ring-slate-100">
      <h2 className="text-lg font-semibold text-slate-900">{label}</h2>
      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </div>
  );
}
