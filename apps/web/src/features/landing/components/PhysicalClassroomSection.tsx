import { Link } from "react-router-dom";
import { landingContent } from "../data/content";

/**
 * "EduSmart's tools help teachers create an online classroom as helpful as a
 * physical one" — copy on the left, photo on the right.
 */
export function PhysicalClassroomSection() {
  const { physical } = landingContent;

  return (
    <section className="bg-surface-page py-20">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl">
            {physical.title}
          </h2>
          <p className="mt-4 text-base text-ink-700">{physical.body}</p>
          <Link
            to="/register"
            className="mt-7 inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-600"
          >
            {physical.cta}
          </Link>
        </div>

        <div className="relative">
          <span
            aria-hidden
            className="absolute -right-4 -top-4 -z-10 size-24 rounded-full bg-amber-200/70"
          />
          <span
            aria-hidden
            className="absolute -bottom-4 -left-4 -z-10 size-28 rounded-2xl bg-brand/15"
          />
          <img
            src={physical.image}
            alt={physical.imageAlt}
            className="w-full rounded-3xl object-cover shadow-card"
          />
        </div>
      </div>
    </section>
  );
}
