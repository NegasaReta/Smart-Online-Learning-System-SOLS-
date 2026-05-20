import { GraduationCap } from "lucide-react";

type LogoProps = {
  /** Tone determines text color: 'dark' for light backgrounds, 'light' for dark backgrounds. */
  tone?: "dark" | "light";
  /** Whether to render the secondary tagline next to the wordmark. */
  withTagline?: boolean;
};

/**
 * EduSmart K-12 wordmark.
 * Reuses the same brand mark used in the dashboard Topbar so marketing and
 * authenticated surfaces stay visually consistent.
 */
export function Logo({ tone = "dark", withTagline = false }: LogoProps) {
  const text = tone === "dark" ? "text-ink-900" : "text-white";
  const tagline = tone === "dark" ? "text-ink-500" : "text-white/70";

  return (
    <div className="flex items-center gap-2">
      <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white shadow-card">
        <GraduationCap className="size-5" aria-hidden />
      </span>
      <div className="leading-tight">
        <div className={`text-lg font-extrabold tracking-tight ${text}`}>
          EduSmart <span className="text-brand">K-12</span>
        </div>
        {withTagline && (
          <div className={`text-[11px] font-medium ${tagline}`}>
            Smart Online Learning System
          </div>
        )}
      </div>
    </div>
  );
}
