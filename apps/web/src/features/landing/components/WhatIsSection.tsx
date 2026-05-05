import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { landingContent } from "../data/content";

/**
 * "What is EduSmart K-12?" — image on the left, tabbed copy on the right.
 * Tabs: For Instructors / For Students / For Parents.
 */
export function WhatIsSection() {
  const { whatIs } = landingContent;
  const [active, setActive] = useState<string>(whatIs.tabs[0].key);
  const current = whatIs.tabs.find((t) => t.key === active) ?? whatIs.tabs[0];

  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative">
          <span
            aria-hidden
            className="absolute -left-4 -top-4 -z-10 size-24 rounded-full bg-brand/15"
          />
          <span
            aria-hidden
            className="absolute -bottom-4 -right-4 -z-10 size-28 rounded-2xl bg-amber-200/60"
          />
          <img
            src={whatIs.image}
            alt={whatIs.imageAlt}
            className="w-full rounded-3xl object-cover shadow-card"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            {whatIs.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {whatIs.title}
          </h2>
          <p className="mt-4 text-base text-ink-700">{whatIs.description}</p>

          <div className="mt-6 flex flex-wrap gap-2 border-b border-ink-100">
            {whatIs.tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={`-mb-px border-b-2 px-3 py-2 text-xs font-bold tracking-wider transition ${
                  active === tab.key
                    ? "border-brand text-brand"
                    : "border-transparent text-ink-500 hover:text-ink-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-5">
            <h3 className="text-xl font-bold text-ink-900">{current.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              {current.body}
            </p>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-600"
            >
              {current.cta}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
