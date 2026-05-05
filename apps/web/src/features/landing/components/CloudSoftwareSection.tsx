import { BookOpen, Calendar, BarChart3, type LucideIcon } from "lucide-react";
import { landingContent } from "../data/content";

const ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Calendar,
  BarChart3,
};

const ACCENT: Record<string, string> = {
  amber: "bg-amber-100 text-amber-600",
  brand: "bg-brand/15 text-brand",
  rose: "bg-rose-100 text-rose-600",
};

/**
 * "All-In-One Cloud Software" — three feature cards in a row.
 */
export function CloudSoftwareSection() {
  const { cloudSoftware } = landingContent;

  return (
    <section className="bg-surface-page py-20">
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            {cloudSoftware.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {cloudSoftware.title}
          </h2>
          <p className="mt-4 text-base text-ink-700">
            {cloudSoftware.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cloudSoftware.features.map((f) => {
            const Icon = ICONS[f.icon] ?? BookOpen;
            return (
              <article
                key={f.title}
                className="rounded-2xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-xl ${ACCENT[f.accent] ?? ACCENT.brand}`}
                >
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {f.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
