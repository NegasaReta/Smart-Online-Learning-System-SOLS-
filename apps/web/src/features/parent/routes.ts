export const ROUTES = [
  { id: "dashboard", label: "Dashboard", title: "Overview" },
  { id: "progress", label: "Child Progress", title: "Progress Overview" },
  { id: "report", label: "Report Card", title: "Report Card" },
  { id: "logs", label: "Activity Logs", title: "Activity History" },
  { id: "settings", label: "Settings", title: "Settings" },
] as const;

export type RouteId = (typeof ROUTES)[number]["id"];
