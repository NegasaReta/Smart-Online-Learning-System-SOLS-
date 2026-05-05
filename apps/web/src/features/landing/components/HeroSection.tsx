import { Link } from "react-router-dom";
import { Play, GraduationCap, CheckCircle2, Calendar } from "lucide-react";
import { landingContent } from "../data/content";

/**
 * Hero section — large headline on the left, student photo on the right
 * surrounded by decorative shapes and floating info cards. Background uses
 * a warm peach tint that pairs with the brand-blue palette without
 * clashing with the dashboard surfaces.
 */
export function HeroSection() {
  const { hero } = landingContent;

  return (
    <section className="relative overflow-hidden bg-[#fff7ed]">
      {/* Decorative shapes */}
      <span
        aria-hidden
        className="absolute -left-10 top-24 size-6 rounded-full bg-amber-400/80"
      />
      <span
        aria-hidden
        className="absolute right-10 top-16 size-3 rounded-full bg-brand"
      />
      <span
        aria-hidden
        className="absolute bottom-24 left-1/3 size-2 rounded-full bg-emerald-500"
      />
      <svg
        aria-hidden
        className="absolute right-[42%] top-10 text-amber-300"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 6 }).map((__, c) => (
            <circle
              key={`${r}-${c}`}
              cx={c * 14 + 4}
              cy={r * 14 + 4}
              r="1.6"
              fill="currentColor"
            />
          )),
        )}
      </svg>

      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* Copy column */}
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            <span className="text-amber-500">{hero.eyebrow}</span>{" "}
            {hero.headline}
            <br />
            <span className="text-brand">{hero.headlineLine2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-700">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to={hero.primaryCta.to}
              className="inline-flex items-center rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-600"
            >
              {hero.primaryCta.label}
            </Link>
            <a
              href={hero.secondaryCta.to}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition hover:text-brand"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-white text-brand shadow-card">
                <Play className="size-4 fill-current" aria-hidden />
              </span>
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        {/* Image column */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Soft circle behind image */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 mx-auto block aspect-square w-[85%] translate-y-6 rounded-full bg-brand/15"
          />
          <span
            aria-hidden
            className="absolute -right-4 top-8 -z-10 size-16 rounded-2xl bg-amber-300/70 blur-[1px]"
          />

          <img
            src={hero.image}
            alt={hero.imageAlt}
            className="mx-auto w-full max-w-md rounded-[2rem] object-cover shadow-card"
            loading="eager"
          />

          {/* Floating "Assisted Students" badge — top-left */}
          <div className="absolute -left-2 top-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card sm:-left-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand/15 text-brand">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <div>
              <div className="text-base font-bold text-ink-900">
                {hero.badges.assisted.value}
              </div>
              <div className="text-xs text-ink-500">
                {hero.badges.assisted.label}
              </div>
            </div>
          </div>

          {/* "Live Class" card — bottom-left */}
          <div className="absolute -left-2 bottom-8 w-[210px] rounded-2xl bg-white p-3 shadow-card sm:-left-8">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <Calendar className="size-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-ink-900">
                  {hero.badges.class.title}
                </div>
                <div className="truncate text-[11px] text-ink-500">
                  {hero.badges.class.time}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-3 w-full rounded-lg bg-brand py-1.5 text-xs font-semibold text-white transition hover:bg-brand-600"
            >
              {hero.badges.class.cta}
            </button>
          </div>

          {/* "Congratulations" badge — right */}
          <div className="absolute -right-2 bottom-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card sm:-right-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="size-5" aria-hidden />
            </span>
            <div>
              <div className="text-sm font-semibold text-ink-900">
                {hero.badges.congrats.title}
              </div>
              <div className="text-[11px] text-ink-500">
                {hero.badges.congrats.subtitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
