import { Music2, LayoutGrid } from "lucide-react";

/**
 * "Tools for Teachers and Learners" — student portrait inside a colored circle
 * with floating Microsoft-style + music icon badges and decorative dotted
 * patterns. Mirrors the reference layout.
 */
export function ToolsForTeachersSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
        {/* COPY */}
        <div>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-brand sm:text-4xl">
            <span className="text-amber-500">Tools</span> For Teachers
            <br /> And Learners
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-700">
            EduSmart has a dynamic set of teaching tools built to be deployed
            and used during class. Teachers can hand out assignments in
            real-time for students to complete and submit.
          </p>
        </div>

        {/* MOCK */}
        <div className="relative mx-auto w-full max-w-md">
          {/* Dotted backdrop */}
          <DotsPattern className="absolute -left-6 top-10 text-ink-300" />
          <DotsPattern className="absolute -right-2 bottom-0 text-ink-300" />

          {/* Decorative dots */}
          <span
            aria-hidden
            className="absolute -left-2 top-1/3 size-3 rounded-full bg-amber-400"
          />
          <span
            aria-hidden
            className="absolute right-2 top-2 size-3 rounded-full bg-emerald-500"
          />
          <span
            aria-hidden
            className="absolute -right-2 bottom-10 size-3 rounded-full bg-indigo-500"
          />

          {/* Photo with circle behind */}
          <div className="relative flex justify-center">
            <span
              aria-hidden
              className="absolute top-6 size-72 rounded-full bg-rose-400/80"
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80"
              alt="Student holding books"
              className="relative h-[420px] w-auto object-contain"
            />
          </div>

          {/* Floating Microsoft-style logo badge */}
          <div className="absolute left-2 top-32 flex size-14 items-center justify-center rounded-full bg-white shadow-card ring-1 ring-ink-100">
            <div className="grid grid-cols-2 gap-0.5">
              <span className="size-2.5 bg-rose-500" />
              <span className="size-2.5 bg-emerald-500" />
              <span className="size-2.5 bg-brand" />
              <span className="size-2.5 bg-amber-400" />
            </div>
          </div>

          {/* Floating music icon badge */}
          <div className="absolute right-2 top-40 flex size-14 items-center justify-center rounded-full bg-white text-brand shadow-card ring-1 ring-ink-100">
            <Music2 className="size-6" aria-hidden />
          </div>

          {/* Optional grid icon bottom */}
          <div className="absolute -bottom-2 left-10 flex size-12 items-center justify-center rounded-full bg-white text-amber-500 shadow-card ring-1 ring-ink-100">
            <LayoutGrid className="size-5" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

function DotsPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
    >
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 8 }).map((__, c) => (
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
  );
}
