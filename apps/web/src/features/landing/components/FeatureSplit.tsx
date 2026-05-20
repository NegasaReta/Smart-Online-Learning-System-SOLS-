import { CheckCircle2 } from "lucide-react";

type FeatureSplitProps = {
  title: string;
  body?: string;
  bullets?: readonly string[];
  image: string;
  imageAlt: string;
  /** When true, image renders on the left instead of the right. */
  reverse?: boolean;
  /** Optional decorative background tint behind the section. */
  tone?: "white" | "muted";
};

/**
 * Reusable two-column "feature deep-dive" block (text + image).
 * Used for Classroom UI, Tools for Teachers, Quizzes, Class Management,
 * and One-on-One sections so they stay visually consistent.
 */
export function FeatureSplit({
  title,
  body,
  bullets,
  image,
  imageAlt,
  reverse = false,
  tone = "white",
}: FeatureSplitProps) {
  const bg = tone === "muted" ? "bg-surface-page" : "bg-white";

  return (
    <section className={`${bg} py-20`}>
      <div
        className={`mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-8 ${
          reverse ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        <div>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl">
            {title}
          </h2>
          {body && <p className="mt-4 text-base text-ink-700">{body}</p>}
          {bullets && bullets.length > 0 && (
            <ul className="mt-5 space-y-3">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm text-ink-700"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-emerald-500"
                    aria-hidden
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <span
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-3xl bg-brand/10"
          />
          <img
            src={image}
            alt={imageAlt}
            className="w-full rounded-3xl object-cover shadow-card"
          />
        </div>
      </div>
    </section>
  );
}
