import { CheckCircle2, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "../../../../i18n/I18nProvider";
import type { Language } from "../../../../i18n/translations";
import { SettingsSection } from "../ui/SettingsSection";

const selectCls =
  "w-full appearance-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100";

export function PreferencesSection() {
  const { lang, setLang, t, languages } = useI18n();
  const [justChanged, setJustChanged] = useState(false);

  useEffect(() => {
    if (!justChanged) return;
    const id = window.setTimeout(() => setJustChanged(false), 2000);
    return () => window.clearTimeout(id);
  }, [justChanged]);

  const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value as Language);
    setJustChanged(true);
  };

  return (
    <SettingsSection
      icon={Globe}
      title={t("prefs.title")}
      description={t("prefs.description")}
      iconBg="bg-sky-50"
      iconColor="text-sky-600"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            {t("prefs.language")}
          </label>
          <select
            className={selectCls}
            value={lang}
            onChange={onLanguageChange}
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.nativeLabel}
                {l.code !== "en" ? ` (${l.label})` : ""}
              </option>
            ))}
          </select>
          {justChanged && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t("common.languageChanged")}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            {t("prefs.timezone")}
          </label>
          <select className={selectCls} defaultValue="cst">
            <option value="cst">Central Time (US)</option>
            <option value="est">Eastern Time (US)</option>
            <option value="eat">East Africa Time</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            {t("prefs.dateFormat")}
          </label>
          <select className={selectCls} defaultValue="mdy">
            <option value="mdy">MM/DD/YYYY</option>
            <option value="dmy">DD/MM/YYYY</option>
            <option value="ymd">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </SettingsSection>
  );
}
