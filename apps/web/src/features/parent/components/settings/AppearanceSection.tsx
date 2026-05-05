import { Monitor, Moon, Palette, Sun } from "lucide-react";
import {
  getPreferences,
  setPreferences,
  usePreferences,
  type ThemeMode,
} from "../../../student/settings/preferencesStore";
import { SettingsSection } from "../ui/SettingsSection";

const THEME_OPTIONS: {
  value: ThemeMode;
  label: string;
  icon: typeof Sun;
  bg: string;
  iconColor: string;
}[] = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
    bg: "bg-gradient-to-br from-slate-50 to-slate-100",
    iconColor: "text-amber-500",
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
    bg: "bg-gradient-to-br from-slate-800 to-slate-900",
    iconColor: "text-white",
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
    bg: "bg-gradient-to-br from-slate-200 to-slate-400",
    iconColor: "text-slate-700",
  },
];

export function AppearanceSection() {
  const prefs = usePreferences();

  const setTheme = (theme: ThemeMode) => {
    setPreferences({ ...getPreferences(), theme });
  };

  return (
    <SettingsSection
      icon={Palette}
      title="Appearance"
      description="Choose how EduSmart looks on this device."
      iconBg="bg-violet-50"
      iconColor="text-violet-600"
    >
      {/* Theme cards */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Theme
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {THEME_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = prefs.theme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTheme(opt.value)}
                aria-pressed={active}
                className={`group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-4 transition ${
                  active
                    ? "border-indigo-500 ring-4 ring-indigo-100"
                    : "border-transparent ring-1 ring-slate-200 hover:ring-slate-300"
                }`}
              >
                <div
                  className={`flex h-24 w-full items-center justify-center rounded-xl ${opt.bg}`}
                >
                  <Icon className={`h-8 w-8 ${opt.iconColor}`} />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    active ? "text-indigo-600" : "text-slate-700"
                  }`}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </SettingsSection>
  );
}
