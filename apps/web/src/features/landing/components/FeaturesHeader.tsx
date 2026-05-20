import { landingContent } from "../data/content";

/**
 * "Our Features" section divider — bold blue + amber heading with subtitle.
 * Mirrors the reference exactly.
 */
export function FeaturesHeader() {
  const { featuresHeader } = landingContent;

  return (
    <section id="features" className="bg-white pb-4 pt-20">
      <div className="mx-auto w-full max-w-[1200px] px-6 text-center lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-brand sm:text-3xl">
          {featuresHeader.titleStart}{" "}
          <span className="text-amber-500">{featuresHeader.titleAccent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-ink-500">
          {featuresHeader.body}
        </p>
      </div>
    </section>
  );
}
