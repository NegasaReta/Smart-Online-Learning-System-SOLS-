import { useState } from "react";
import { useT } from "../../../i18n/I18nProvider";
import type { TranslationKey } from "../../../i18n/translations";
import { ProfileSection } from "../components/settings/ProfileSection";
import { NotificationsSection } from "../components/settings/NotificationsSection";
import { SecuritySection } from "../components/settings/SecuritySection";
import { PreferencesSection } from "../components/settings/PreferencesSection";
import { AppearanceSection } from "../components/settings/AppearanceSection";
import { AccessibilitySection } from "../components/settings/AccessibilitySection";
import { DangerZoneSection } from "../components/settings/DangerZoneSection";

type TabId =
  | "profile"
  | "notifications"
  | "security"
  | "preferences"
  | "danger";

const tabs: { id: TabId; labelKey: TranslationKey }[] = [
  { id: "profile", labelKey: "settings.tab.profile" },
  { id: "notifications", labelKey: "settings.tab.notifications" },
  { id: "security", labelKey: "settings.tab.security" },
  { id: "preferences", labelKey: "settings.tab.preferences" },
  { id: "danger", labelKey: "settings.tab.account" },
];

export function ParentSettings() {
  const t = useT();
  const [active, setActive] = useState<TabId>("profile");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {t("settings.title")}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {t("settings.subtitleParent")}
        </p>
      </header>

      <div className="rounded-xl bg-white p-1.5 shadow-card ring-1 ring-slate-100">
        <nav className="flex flex-wrap gap-1">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {t(tab.labelKey)}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-6">
        {active === "profile" && <ProfileSection />}
        {active === "notifications" && <NotificationsSection />}
        {active === "security" && <SecuritySection />}
        {active === "preferences" && (
          <>
            <AppearanceSection />
            <AccessibilitySection />
            <PreferencesSection />
          </>
        )}
        {active === "danger" && <DangerZoneSection />}
      </div>
    </div>
  );
}
