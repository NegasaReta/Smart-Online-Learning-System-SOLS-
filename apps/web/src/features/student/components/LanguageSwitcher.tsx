import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { LOCALES, useT, type Locale } from "@/i18n/I18nProvider";

/**
 * Functional language dropdown — switches the active locale and persists it.
 * Closes on outside click or Escape.
 */
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("common.language")}
        className="flex h-9 items-center gap-1.5 rounded-full border border-ink-200 bg-white px-2.5 text-sm font-medium text-ink-700 transition hover:bg-ink-50"
      >
        <Globe className="size-4 text-ink-500" aria-hidden />
        <span>{current.flag}</span>
        <span className="hidden sm:block">{current.code.toUpperCase()}</span>
        <ChevronDown
          className={`size-3.5 text-ink-500 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-11 z-30 w-48 overflow-hidden rounded-2xl border border-ink-200 bg-white py-1 shadow-xl"
        >
          <li className="border-b border-ink-100 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
              {t("common.language")}
            </p>
          </li>
          {LOCALES.map((l) => {
            const active = l.code === locale;
            return (
              <li key={l.code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(l.code as Locale);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition hover:bg-brand/5 ${
                    active ? "font-semibold text-brand" : "text-ink-700"
                  }`}
                >
                  <span className="text-base">{l.flag}</span>
                  <span className="flex-1">
                    <span className="block leading-tight">{l.native}</span>
                    <span className="text-xs text-ink-400">{l.label}</span>
                  </span>
                  {active && <span className="size-1.5 rounded-full bg-brand" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
