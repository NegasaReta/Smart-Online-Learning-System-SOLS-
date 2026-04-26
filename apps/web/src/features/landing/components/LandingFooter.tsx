import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { landingContent } from "../data/content";

/**
 * Marketing footer — brand, link columns, social icons, copyright.
 */
export function LandingFooter() {
  const { footer } = landingContent;

  return (
    <footer className="bg-[#0b2a6b] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <Logo tone="light" withTagline />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              {footer.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Social link"
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60">
          <span>{footer.copyright}</span>
          <span>Made with care for Ethiopian schools.</span>
        </div>
      </div>
    </footer>
  );
}
