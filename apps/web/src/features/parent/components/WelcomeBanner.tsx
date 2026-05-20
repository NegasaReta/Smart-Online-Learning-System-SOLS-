import { ArrowRight, Sparkles } from "lucide-react";
import { useT } from "../../../i18n/I18nProvider";

type Props = {
  onViewReport?: () => void;
};

export function WelcomeBanner({ onViewReport }: Props) {
  const t = useT();
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-indigo-700 p-8 text-white shadow-card">
      {/* Decorative sparkles */}
      <Sparkles className="pointer-events-none absolute right-10 top-8 h-5 w-5 text-white/30" />
      <Sparkles className="pointer-events-none absolute right-24 top-24 h-8 w-8 text-white/20" />
      <Sparkles className="pointer-events-none absolute right-8 bottom-10 h-10 w-10 text-white/20" />
      <Sparkles className="pointer-events-none absolute right-40 bottom-20 h-4 w-4 text-white/25" />

      <div className="relative max-w-md space-y-4 pt-12">
        <h2 className="text-lg font-semibold">{t("Welcome back,")} Sarah!</h2>
        <p className="text-sm leading-relaxed text-indigo-50/90">
          {t("Here is a quick overview of Alex's progress. He's doing exceptionally well in Science this week.")}
        </p>

        <button
          type="button"
          onClick={onViewReport}
          className="group mt-2 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          {t("View Detailed Report")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </section>
  );
}
