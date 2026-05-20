import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  icon: LucideIcon;
  title: string;
  description?: string;
  children: ReactNode;
  iconBg?: string;
  iconColor?: string;
};

export function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
  iconBg = "bg-indigo-50",
  iconColor = "text-indigo-600",
}: Props) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
      <header className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {description && (
            <p className="mt-0.5 text-sm text-slate-500">{description}</p>
          )}
        </div>
      </header>
      <div className="mt-5 border-t border-slate-100 pt-5">{children}</div>
    </section>
  );
}
