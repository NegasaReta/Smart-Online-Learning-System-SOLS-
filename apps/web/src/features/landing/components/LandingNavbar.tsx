import { Link } from "react-router-dom";
import { Logo } from "@/components/shared/Logo";
import { landingContent } from "../data/content";

/**
 * Top navigation for the landing page.
 * Mirrors the Skilline reference: logo on the left, primary nav in the middle,
 * Login + Sign Up CTAs on the right. Uses the project's brand-blue palette.
 */
export function LandingNavbar() {
  const { nav } = landingContent;

  return (
    <header
      id="home"
      className="sticky top-0 z-30 w-full border-b border-ink-100 bg-white/90 backdrop-blur"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 lg:px-8">
        <Link to="/" aria-label="EduSmart K-12 home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-ink-700 transition hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm font-semibold text-ink-900 transition hover:text-brand sm:inline-flex"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-brand-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
