import { landingContent } from "../data/content";

/**
 * "Everything you need in one place" — integration logos / wordmarks.
 */
export function IntegrationsSection() {
  const { integrations } = landingContent;

  return (
    <section className="bg-surface-page py-20">
      <div className="mx-auto w-full max-w-[1200px] px-6 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          {integrations.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          {integrations.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-ink-700">
          {integrations.body}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {integrations.items.map((name) => (
            <div
              key={name}
              className="flex h-20 items-center justify-center rounded-xl bg-white text-sm font-bold text-ink-700 shadow-card transition hover:text-brand"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
