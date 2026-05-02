import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";
import { ClipboardList } from "lucide-react";

export default function AdminExamsPage() {
  return (
    <div className="flex min-h-screen bg-[#f5f5fb] font-sans text-ink-900">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 animate-fade-in">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-violet-100">
            <ClipboardList className="size-8 text-violet-600" aria-hidden />
          </span>
          <h1 className="text-2xl font-bold text-ink-900">Exams</h1>
          <p className="max-w-sm text-center text-sm text-ink-500">
            This section is under construction. The backend team can wire it up
            once the API endpoints are ready.
          </p>
        </main>
      </div>
    </div>
  );
}
