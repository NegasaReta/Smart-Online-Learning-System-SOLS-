import {
  GraduationCap,
  School,
  BookOpenCheck,
  Building2,
  Globe2,
  Landmark,
  Library,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { landingContent } from "../data/content";

const ICONS: LucideIcon[] = [
  GraduationCap,
  School,
  BookOpenCheck,
  Building2,
  Globe2,
  Landmark,
  Library,
  Sparkles,
];

/**
 * "Trusted by …" partner strip with an infinite, paused-on-hover marquee.
 * The list of partners is duplicated and animated by -50% so the loop is
 * seamless. Each item gets a small Lucide icon to feel logo-like without
 * needing real brand assets.
 */
export function TrustedBar() {
  const { trusted } = landingContent;
  // Duplicate list so the -50% translate creates a seamless loop.
  const items = [...trusted.partners, ...trusted.partners];

  return (
    <section className="bg-white py-10">
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-ink-500">
          {trusted.title}
        </p>

        <div
          className="group relative mt-6 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
            {items.map((partner, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div
                  key={`${partner}-${i}`}
                  className="flex shrink-0 items-center gap-2 text-ink-400 transition hover:text-brand"
                  aria-hidden={i >= trusted.partners.length}
                >
                  <Icon className="size-5" aria-hidden />
                  <span className="whitespace-nowrap text-sm font-bold uppercase tracking-wider">
                    {partner}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
