import { useLocation } from "react-router-dom";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";
import { Construction } from "lucide-react";

/**
 * Generic placeholder shown for admin pages that haven't been built yet.
 * Reuses the admin layout so navigation works correctly.
 */
export default function AdminPlaceholderPage() {
  const { pathname } = useLocation();
  const page = pathname.split("/").filter(Boolean).pop() ?? "page";
  const label = page.charAt(0).toUpperCase() + page.slice(1);

  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 animate-fade-in">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-violet-100">
            <Construction className="size-8 text-violet-600" aria-hidden />
          </span>
          <h1 className="text-2xl font-bold text-ink-900">{label}</h1>
          <p className="max-w-sm text-center text-sm text-ink-500">
            This section is under construction. The backend team can wire it up
            once the API endpoints are ready.
          </p>
        </main>
      </div>
    </div>
  );
}
