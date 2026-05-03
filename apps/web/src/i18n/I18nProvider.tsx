import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LANGUAGES,
  TRANSLATIONS,
  type Language,
  type TranslationKey,
} from "./translations";

const STORAGE_KEY = "sols.lang.v1";

type Ctx = {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: TranslationKey) => string;
  languages: typeof LANGUAGES;
};

const I18nContext = createContext<Ctx | null>(null);

function readInitial(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored && stored in TRANSLATIONS) return stored;
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey) => TRANSLATIONS[lang][key] ?? TRANSLATIONS.en[key] ?? key,
    [lang]
  );

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t, languages: LANGUAGES }),
    [lang, setLang, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}
