import { GraduationCap, Plus, UserCircle2 } from "lucide-react";
import { useT } from "../../../../i18n/I18nProvider";
import { SettingsSection } from "../ui/SettingsSection";

type Child = {
  id: string;
  name: string;
  grade: string;
  school: string;
  avatar: string;
  primary?: boolean;
};

const children: Child[] = [
  {
    id: "alex",
    name: "Alex Johnson",
    grade: "Grade 10",
    school: "Lincoln High",
    avatar: "https://i.pravatar.cc/120?img=12",
    primary: true,
  },
  {
    id: "emma",
    name: "Emma Johnson",
    grade: "Grade 7",
    school: "Lincoln Middle",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
];

export function LinkedChildrenSection() {
  const t = useT();
  return (
    <SettingsSection
      icon={UserCircle2}
      title={t("Linked Children")}
      description={t("Children connected to this parent account.")}
      iconBg="bg-purple-50"
      iconColor="text-purple-600"
    >
      <ul className="space-y-3">
        {children.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-white p-4 hover:bg-slate-50"
          >
            <div className="flex items-center gap-4">
              <img
                src={c.avatar}
                alt={c.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {c.name}
                  </p>
                  {c.primary && (
                    <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                      {t("Primary")}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-500">
                  <GraduationCap className="h-3 w-3" />
                  {c.grade} · {c.school}
                </p>
              </div>
            </div>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white">
              {t("Manage")}
            </button>
          </li>
        ))}
      </ul>

      <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/40 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
        <Plus className="h-4 w-4" />
        {t("Link Another Child")}
      </button>
    </SettingsSection>
  );
}
