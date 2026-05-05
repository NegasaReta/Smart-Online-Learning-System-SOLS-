import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "./en.json";
import am from "./am.json";
import om from "./om.json";
import { TRANSLATIONS, LANGUAGES } from "./translations";

export type Locale = "en" | "am" | "om";

export const LOCALES: { code: Locale; label: string; native: string; flag: string }[] = [
  { code: "en", label: "English",     native: "English",      flag: "🇬🇧" },
  { code: "am", label: "Amharic",     native: "አማርኛ",         flag: "🇪🇹" },
  { code: "om", label: "Afaan Oromo", native: "Afaan Oromoo", flag: "🇪🇹" },
];

type Dict = Record<string, unknown>;
const dictionaries: Record<Locale, Dict> = {
  en: en as Dict,
  am: am as Dict,
  om: om as Dict,
};

type Vars = Record<string, string | number>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Vars) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "edusmart.locale";

function resolve(dict: Dict, key: string): string | undefined {
  const parts = key.split(".");
  let cur: unknown = dict;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Dict)) {
      cur = (cur as Dict)[p];
    } else {
      return undefined;
    }
  }
  return typeof cur === "string" ? cur : undefined;
}

function format(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k: string) =>
    k in vars ? String(vars[k]) : `{${k}}`,
  );
}

/**
 * Provides the active locale and a `t()` translation function to the app.
 * Persists the selection to localStorage so it survives reloads.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    return saved && saved in dictionaries ? saved : "en";
  });

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Vars) => {
      // Priority: JSON dict (current locale) → JSON dict (EN) → teammate's flat
      // TRANSLATIONS dict (current locale) → TRANSLATIONS (EN) → raw key.
      const value =
        resolve(dictionaries[locale], key) ??
        resolve(dictionaries.en, key) ??
        TRANSLATIONS[locale]?.[key] ??
        TRANSLATIONS.en?.[key] ??
        key;
      return format(value, vars);
    },
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Callable i18n hook that is compatible with BOTH usage styles used across
 * the codebase:
 *
 *   const { t, locale, setLocale } = useT();     // object destructure
 *   t("some.key")
 *
 *   const t = useT();                            // treat as a function
 *   t("some.key")
 *
 * The returned value is a function (so calling `t("key")` works directly) that
 * also has `.t`, `.locale`, and `.setLocale` attached, so destructuring works
 * as before.
 */
type LegacyAliases = {
  /** Alias of `locale` (used by teammate's parent/teacher portal code). */
  lang: Locale;
  /** Alias of `setLocale`. */
  setLang: (l: Locale) => void;
  /** List of available languages in the teammate's shape. */
  languages: typeof LANGUAGES;
};

type CallableT = I18nContextValue &
  LegacyAliases &
  ((key: string, vars?: Vars) => string);

export function useT(): CallableT {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useT must be used within an I18nProvider");
  }
  const fn = ((key: string, vars?: Vars) => ctx.t(key, vars)) as CallableT;
  fn.t = ctx.t;
  fn.locale = ctx.locale;
  fn.setLocale = ctx.setLocale;
  // Legacy aliases for teammate's parent/teacher portal code.
  fn.lang = ctx.locale;
  fn.setLang = ctx.setLocale;
  fn.languages = LANGUAGES;
  return fn;
}

/**
 * Compatibility alias for code expecting `useI18n()` (teammate's parent/teacher
 * portal imports this name in a few files).
 */
export function useI18n(): CallableT {
  return useT();
}
