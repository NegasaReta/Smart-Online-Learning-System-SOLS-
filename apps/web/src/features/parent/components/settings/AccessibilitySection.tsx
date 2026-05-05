import { Accessibility } from "lucide-react";
import { useEffect } from "react";
import {
  applyPreferences,
  getPreferences,
  setPreferences,
  usePreferences,
  type FontSize,
} from "../../../student/settings/preferencesStore";
import { SettingsSection } from "../ui/SettingsSection";
import { Toggle } from "../ui/Toggle";

const FONT_ORDER: FontSize[] = ["small", "standard", "large", "xl"];
const FONT_LABEL: Record<FontSize, string> = {
  small: "Small",
  standard: "Standard",
  large: "Large",
  xl: "Extra Large",
};

export function AccessibilitySection() {
  const prefs = usePreferences();

  // Belt-and-suspenders: re-apply prefs to DOM whenever they change.
  useEffect(() => {
    applyPreferences(prefs);
  }, [prefs]);

  const onContrastChange = (next: boolean) => {
    setPreferences({ ...getPreferences(), highContrast: next });
  };

  const onFontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = Number(e.target.value);
    const fontSize = FONT_ORDER[idx] ?? "standard";
    setPreferences({ ...getPreferences(), fontSize });
  };

  const fontIndex = FONT_ORDER.indexOf(prefs.fontSize);
  const safeIndex = fontIndex === -1 ? 1 : fontIndex;

  return (
    <SettingsSection
      icon={Accessibility}
      title="Accessibility"
      description="Adjust how content is displayed for easier reading."
      iconBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* High Contrast Mode */}
        <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              High Contrast Mode
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Increase contrast for better readability.
            </p>
          </div>
          <Toggle
            checked={prefs.highContrast}
            onChange={onContrastChange}
            label="High contrast mode"
          />
        </div>

        {/* Base Font Size */}
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              Base Font Size
            </p>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              {FONT_LABEL[prefs.fontSize]}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-500">A</span>
            <input
              type="range"
              min={0}
              max={FONT_ORDER.length - 1}
              step={1}
              value={safeIndex}
              onChange={onFontChange}
              aria-label="Base font size"
              className="font-size-slider h-2 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-indigo-600"
              style={{
                background: `linear-gradient(to right, rgb(79 70 229) 0%, rgb(79 70 229) ${
                  (safeIndex / (FONT_ORDER.length - 1)) * 100
                }%, rgb(226 232 240) ${
                  (safeIndex / (FONT_ORDER.length - 1)) * 100
                }%, rgb(226 232 240) 100%)`,
              }}
            />
            <span className="text-2xl font-bold text-slate-700">A</span>
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}
