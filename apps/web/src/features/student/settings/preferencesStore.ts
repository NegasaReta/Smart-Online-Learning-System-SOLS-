import { useEffect, useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store for user preferences. Components subscribe
 * via `usePreferences()` and update via `setPreferences()`. Side-effects
 * (theme attribute, root font-size, high-contrast class) are applied
 * automatically by `applyPreferences()` and on every store change.
 */

export type ThemeMode = "light" | "dark" | "system";
export type FontSize = "small" | "standard" | "large" | "xl";

export type NotificationChannels = {
  email: boolean;
  appPush: boolean;
  smsTexts: boolean;
};

export type Preferences = {
  /** UI display language code (matches I18nProvider). */
  language: "en" | "am" | "om";
  theme: ThemeMode;
  notifications: NotificationChannels;
  highContrast: boolean;
  fontSize: FontSize;
  /** Two-factor settings — not security-grade, just UI state for the page. */
  twoFactor: {
    authenticatorApp: boolean;
    smsBackup: boolean;
  };
};

const STORAGE_KEY = "edusmart.preferences.v1";

const defaultPrefs: Preferences = {
  language: "en",
  theme: "light",
  notifications: { email: true, appPush: true, smsTexts: false },
  highContrast: false,
  fontSize: "standard",
  twoFactor: { authenticatorApp: true, smsBackup: false },
};

function readFromStorage(): Preferences {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw) as Partial<Preferences>;
    return {
      ...defaultPrefs,
      ...parsed,
      notifications: {
        ...defaultPrefs.notifications,
        ...(parsed.notifications ?? {}),
      },
      twoFactor: {
        ...defaultPrefs.twoFactor,
        ...(parsed.twoFactor ?? {}),
      },
    };
  } catch {
    return defaultPrefs;
  }
}

let current: Preferences = readFromStorage();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function getPreferences(): Preferences {
  return current;
}

export function setPreferences(next: Preferences) {
  current = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota/private-mode errors */
  }
  applyPreferences(next);
  emit();
}

/** React hook returning the live preferences value. */
export function usePreferences(): Preferences {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => current,
  );
}

/* ------------------------- Side-effect application ------------------------- */

const FONT_SIZE_MAP: Record<FontSize, string> = {
  small: "14px",
  standard: "16px",
  large: "18px",
  xl: "20px",
};

/**
 * Applies the visual side-effects of the preferences to the DOM. Safe to
 * call repeatedly (no listeners involved).
 */
export function applyPreferences(p: Preferences) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  // Theme: light/dark/system
  const resolvedDark =
    p.theme === "dark" ||
    (p.theme === "system" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches);
  root.dataset.theme = resolvedDark ? "dark" : "light";
  root.classList.toggle("theme-dark", resolvedDark);

  // High contrast
  root.classList.toggle("hc", p.highContrast);

  // Base font-size
  root.style.fontSize = FONT_SIZE_MAP[p.fontSize];
}

/** Hook to ensure preferences are applied once on mount. */
export function useApplyPreferencesOnMount() {
  useEffect(() => {
    applyPreferences(current);
  }, []);
}
