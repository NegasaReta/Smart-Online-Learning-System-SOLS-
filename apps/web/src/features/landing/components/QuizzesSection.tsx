import { X, Check, Send } from "lucide-react";

/**
 * "Assessments, Quizzes, Tests" — bespoke mock matching the reference:
 * a True/False question card with an image inside, two floating circle icons
 * (red X + green check), a "Your answer was sent successfully" toast, and
 * decorative dots / blue arc.
 */
export function QuizzesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
        {/* MOCK */}
        <div className="relative mx-auto w-full max-w-md">
          {/* Decorative shapes */}
          <span
            aria-hidden
            className="absolute -left-6 top-2 size-16 rounded-full border-[6px] border-brand/80"
          />
          <span
            aria-hidden
            className="absolute left-8 -top-3 size-2 rounded-full bg-amber-500"
          />
          <span
            aria-hidden
            className="absolute right-4 top-14 size-2 rounded-full bg-rose-500"
          />
          <span
            aria-hidden
            className="absolute -bottom-2 -left-2 size-2 rounded-full bg-emerald-500"
          />

          {/* Floating red X */}
          <span
            aria-hidden
            className="absolute right-6 top-2 z-10 flex size-10 items-center justify-center rounded-full bg-white text-rose-500 shadow-card ring-1 ring-rose-200"
          >
            <X className="size-5" />
          </span>
          {/* Floating green check */}
          <span
            aria-hidden
            className="absolute right-6 top-16 z-10 flex size-10 items-center justify-center rounded-full bg-white text-emerald-500 shadow-card ring-1 ring-emerald-200"
          >
            <Check className="size-5" />
          </span>

          {/* Question card */}
          <div className="relative ml-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-ink-100">
            <span className="inline-flex rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-700">
              Question 1
            </span>
            <h3 className="mt-3 text-lg font-bold leading-snug text-ink-900">
              True or false? This play
              <br /> takes place in Italy
            </h3>
            <div className="mt-4 overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=80"
                alt="Venice gondolas"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>

          {/* "Sent successfully" badge */}
          <div className="absolute -bottom-4 left-1/3 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-card ring-1 ring-ink-100">
            <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Send className="size-3" aria-hidden />
            </span>
            <div className="text-[11px] leading-tight">
              <div className="font-semibold text-emerald-600">
                Your answer was
              </div>
              <div className="font-semibold text-emerald-600">
                sent successfully
              </div>
            </div>
          </div>
        </div>

        {/* COPY */}
        <div>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-brand sm:text-4xl">
            Assessments,
            <br />
            <span className="text-amber-500">Quizzes</span>,{" "}
            <span className="text-brand">Tests</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-700">
            Easily launch live assignments, quizzes, and tests. Student results
            are automatically entered in the online gradebook.
          </p>
        </div>
      </div>
    </section>
  );
}
