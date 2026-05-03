import { useEffect, useState } from "react";
import {
  Globe,
  Palette,
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Accessibility,
  Save,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import {
  applyPreferences,
  getPreferences,
  setPreferences,
  usePreferences,
  type FontSize,
  type Preferences,
  type ThemeMode,
} from "../settings/preferencesStore";
import { useT, type Locale } from "@/i18n/I18nProvider";
import { Toggle } from "./SettingsSecurityPage";

const FONT_STEPS: FontSize[] = ["small", "standard", "large", "xl"];
const FONT_LABEL: Record<FontSize, string> = {
  small: "Small",
  standard: "Standard",
  large: "Large",
  xl: "Extra Large",
};

const LANGUAGE_OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "am", label: "አማርኛ (Amharic)" },
  { value: "om", label: "Afaan Oromoo" },
];

/**
 * Preferences page — wires Language, Theme, Notifications, Accessibility,
 * and a font-size slider to the global preferences store. Settings apply
 * live; "Save" persists to localStorage and the changes survive reloads.
 */
export default function SettingsPreferencesPage() {
  const saved = usePreferences();
  const { setLocale } = useT();
  const [draft, setDraft] = useState<Preferences>(saved);
  const [savedToast, setSavedToast] = useState(false);

  // Re-sync the draft whenever the saved value changes (e.g. via toggles
  // elsewhere on the page that auto-save).
  useEffect(() => {
    setDraft(saved);
  }, [saved]);

  // Live preview: apply draft visual settings (theme / font-size /
  // high-contrast) to the DOM as the user tweaks them, without persisting.
  // Persistence happens on "Save Preferences"; "Cancel" re-applies `saved`.
  useEffect(() => {
    applyPreferences(draft);
  }, [draft.theme, draft.fontSize, draft.highContrast]);

  // If the user navigates away without saving, restore the *current*
  // persisted look (read fresh from the store, NOT a captured snapshot —
  // otherwise a successful Save would be undone by the cleanup running
  // with a stale closure).
  useEffect(() => {
    return () => {
      applyPreferences(getPreferences());
    };
  }, []);

  function update<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function handleSave() {
    setPreferences(draft);
    setLocale(draft.language);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2200);
  }

  function handleCancel() {
    setDraft(saved);
    applyPreferences(saved);
  }

  const fontIndex = FONT_STEPS.indexOf(draft.fontSize);

  return (
    <>
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">
          Preferences
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Customize your learning environment and notifications.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Language */}
        <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
          <h2 className="flex items-center gap-2 text-base font-bold text-ink-900">
            <Globe className="size-4 text-brand" aria-hidden />
            Language &amp; Region
          </h2>
          <label className="mt-4 flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-ink-700">
              Display Language
            </span>
            <select
              value={draft.language}
              onChange={(e) =>
                update("language", e.target.value as Preferences["language"])
              }
              className="h-10 rounded-lg border border-ink-200 bg-white px-3 text-sm text-ink-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            >
              {LANGUAGE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <p className="mt-3 text-xs text-ink-500">
            Changes will apply to the entire platform interface and
            communications.
          </p>
        </section>

        {/* Appearance */}
        <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
          <h2 className="flex items-center gap-2 text-base font-bold text-ink-900">
            <Palette className="size-4 text-violet-500" aria-hidden />
            Appearance
          </h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <ThemeOption
              mode="light"
              active={draft.theme === "light"}
              onSelect={(m) => update("theme", m)}
            />
            <ThemeOption
              mode="dark"
              active={draft.theme === "dark"}
              onSelect={(m) => update("theme", m)}
            />
            <ThemeOption
              mode="system"
              active={draft.theme === "system"}
              onSelect={(m) => update("theme", m)}
            />
          </div>
        </section>
      </div>

      {/* Notifications */}
      <section className="mt-5 rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
        <h2 className="flex items-center gap-2 text-base font-bold text-ink-900">
          <Bell className="size-4 text-amber-500" aria-hidden />
          Notifications
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <NotificationCard
            icon={<Mail className="size-4 text-ink-700" aria-hidden />}
            title="Email"
            subtitle="Weekly summaries and urgent updates."
            checked={draft.notifications.email}
            onToggle={(v) =>
              update("notifications", { ...draft.notifications, email: v })
            }
          />
          <NotificationCard
            icon={<Smartphone className="size-4 text-ink-700" aria-hidden />}
            title="App Push"
            subtitle="Instant alerts for grades and assignments."
            checked={draft.notifications.appPush}
            onToggle={(v) =>
              update("notifications", { ...draft.notifications, appPush: v })
            }
          />
          <NotificationCard
            icon={<MessageSquare className="size-4 text-ink-700" aria-hidden />}
            title="SMS Texts"
            subtitle="Emergency alerts and attendance notices."
            checked={draft.notifications.smsTexts}
            onToggle={(v) =>
              update("notifications", { ...draft.notifications, smsTexts: v })
            }
          />
        </div>
      </section>

      {/* Accessibility */}
      <section className="mt-5 rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
        <h2 className="flex items-center gap-2 text-base font-bold text-ink-900">
          <Accessibility className="size-4 text-brand" aria-hidden />
          Accessibility
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex items-center justify-between rounded-xl border border-ink-200 bg-white p-4">
            <div>
              <p className="text-sm font-semibold text-ink-900">
                High Contrast Mode
              </p>
              <p className="text-xs text-ink-500">
                Increase contrast for better readability.
              </p>
            </div>
            <Toggle
              checked={draft.highContrast}
              onToggle={(v) => update("highContrast", v)}
              ariaLabel="High Contrast Mode"
            />
          </div>

          <div className="rounded-xl border border-ink-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink-900">
                Base Font Size
              </p>
              <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand">
                {FONT_LABEL[draft.fontSize]}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs text-ink-500">A</span>
              <input
                type="range"
                min={0}
                max={FONT_STEPS.length - 1}
                step={1}
                value={fontIndex}
                onChange={(e) =>
                  update("fontSize", FONT_STEPS[Number(e.target.value)])
                }
                aria-label="Base font size"
                className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-ink-200 accent-brand"
              />
              <span className="text-base font-bold text-ink-700">A</span>
            </div>
          </div>
        </div>
      </section>

      {/* Save / Cancel */}
      <footer className="mt-6 flex items-center justify-end gap-3 border-t border-ink-200 pt-4">
        {savedToast && (
          <span className="mr-auto inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Preferences saved
          </span>
        )}
        <button
          type="button"
          onClick={handleCancel}
          className="inline-flex h-10 items-center rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 transition hover:bg-ink-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-600"
        >
          <Save className="size-4" aria-hidden />
          Save Preferences
        </button>
      </footer>
    </>
  );
}

/* ------------------------------ Theme tile ------------------------------ */

function ThemeOption({
  mode,
  active,
  onSelect,
}: {
  mode: ThemeMode;
  active: boolean;
  onSelect: (m: ThemeMode) => void;
}) {
  const meta = {
    light: {
      label: "Light",
      bg: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      icon: <Sun className="size-6 text-amber-500" aria-hidden />,
    },
    dark: {
      label: "Dark",
      bg: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      icon: <Moon className="size-6 text-white" aria-hidden />,
    },
    system: {
      label: "System",
      bg: "linear-gradient(135deg, #cbd5e1 0%, #1e293b 100%)",
      icon: <Monitor className="size-6 text-white" aria-hidden />,
    },
  }[mode];

  return (
    <button
      type="button"
      onClick={() => onSelect(mode)}
      aria-pressed={active}
      className={`flex flex-col items-center gap-2 rounded-xl border-2 p-2 transition ${
        active
          ? "border-brand bg-brand/5"
          : "border-transparent hover:bg-ink-50"
      }`}
    >
      <span
        className="flex h-16 w-full items-center justify-center rounded-lg"
        style={{ background: meta.bg }}
      >
        {meta.icon}
      </span>
      <span
        className={`text-xs font-semibold ${
          active ? "text-brand" : "text-ink-700"
        }`}
      >
        {meta.label}
      </span>
    </button>
  );
}

/* ------------------------ Notification preference ------------------------ */

function NotificationCard({
  icon,
  title,
  subtitle,
  checked,
  onToggle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  checked: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-ink-200 bg-white p-4">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span className="mt-0.5">{icon}</span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink-900">{title}</p>
          <p className="mt-0.5 text-xs text-ink-500">{subtitle}</p>
        </div>
      </div>
      <Toggle checked={checked} onToggle={onToggle} ariaLabel={title} />
    </div>
  );
}
