import { ArrowRight } from "lucide-react";
import { landingContent } from "../data/content";

/**
 * Latest news/resources — three article cards with image + category + title.
 */
export function NewsSection() {
  const { news } = landingContent;

  return (
    <section id="news" className="bg-surface-page py-20">
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              {news.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              {news.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base text-ink-700">{news.body}</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-600"
          >
            See all
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {news.items.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  {item.category}
                </span>
                <h3 className="mt-2 text-base font-bold text-ink-900">
                  {item.title}
                </h3>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink-700 transition hover:text-brand"
                >
                  Read more
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
