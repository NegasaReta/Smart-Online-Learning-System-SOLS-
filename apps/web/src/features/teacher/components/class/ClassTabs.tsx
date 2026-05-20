import { CalendarCheck, Megaphone, NotebookPen, Users } from "lucide-react";
import { useT } from "../../../../i18n/I18nProvider";

export type ClassTab = "roster" | "attendance" | "gradebook" | "announcements";

const tabs: { id: ClassTab; label: string; icon: typeof Users }[] = [
  { id: "roster", label: "Student Roster", icon: Users },
  { id: "attendance", label: "Attendance", icon: CalendarCheck },
  { id: "gradebook", label: "Gradebook", icon: NotebookPen },
  { id: "announcements", label: "Announcements", icon: Megaphone },
];

type Props = {
  active: ClassTab;
  onChange: (next: ClassTab) => void;
};

export function ClassTabs({ active, onChange }: Props) {
  const t = useT();
  return (
    <div
      role="tablist"
      aria-label="Class sections"
      className="flex gap-2 border-b border-slate-200 overflow-x-auto"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold transition ${
              isActive
                ? "text-indigo-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Icon className="h-4 w-4" />
            {t(tab.label)}
            {isActive && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-t bg-indigo-600" />
            )}
          </button>
        );
      })}
    </div>
  );
}
