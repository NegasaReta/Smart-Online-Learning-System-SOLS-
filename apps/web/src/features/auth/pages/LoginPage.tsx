import { GraduationCap } from "lucide-react";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#f0f0f0] p-4 font-sans lg:p-8">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl" style={{ minHeight: 680 }}>

        {/* ── Left: rounded image card ── */}
        <aside
          aria-hidden
          className="relative hidden w-[46%] shrink-0 flex-col justify-between overflow-hidden rounded-3xl p-8 lg:flex"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=90')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* dark gradient overlay — heavier at bottom */}
          <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.72) 100%)" }} />

          {/* Quote label */}
          <div className="relative flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">A Wise Quote</span>
            <div className="h-px w-12 bg-white/40" />
          </div>

          {/* Bottom text */}
          <div className="relative">
            <h1 className="font-serif text-[44px] font-bold leading-[1.1] tracking-tight text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Get<br />Everything<br />You Want
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              You can get everything you want if you work hard,<br />
              trust the process, and stick to the plan.
            </p>
          </div>
        </aside>

        {/* ── Right: form panel ── */}
        <section className="relative flex flex-1 flex-col justify-between p-8 lg:px-14 lg:py-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <GraduationCap className="size-5 text-ink-900" />
            <span className="text-[15px] font-bold tracking-tight text-ink-900">EduSmart K-12</span>
          </div>

          {/* Form centred */}
          <div className="flex flex-1 items-center justify-center">
            <LoginForm />
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-ink-500">
            Need help?{" "}
            <a href="#" className="font-semibold text-ink-900 hover:underline">Contact Support</a>
          </p>
        </section>

      </div>
    </main>
  );
}
