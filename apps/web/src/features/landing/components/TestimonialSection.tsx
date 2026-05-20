import { Quote } from "lucide-react";
import { landingContent } from "../data/content";

/**
 * Single testimonial card — large quote on a brand-tinted background.
 */
export function TestimonialSection() {
  const { testimonial } = landingContent;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-[1100px] px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand p-10 text-white shadow-card sm:p-14">
          <Quote
            className="absolute right-8 top-8 size-24 text-white/10"
            aria-hidden
          />
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
            {testimonial.eyebrow}
          </p>
          <blockquote className="mt-4 max-w-3xl text-xl leading-relaxed text-white sm:text-2xl">
            “{testimonial.quote}”
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <img
              src={testimonial.image}
              alt={testimonial.author}
              className="size-12 rounded-full object-cover ring-2 ring-white/30"
            />
            <div>
              <div className="text-sm font-bold">{testimonial.author}</div>
              <div className="text-xs text-white/70">{testimonial.role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
