import { User, BookOpen, Clock } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";

export type ClassTheme = {
  /** soft header background tint */
  headerBg: string;
  /** icon tile background */
  iconBg: string;
  /** icon color */
  iconText: string;
  /** progress bar fill and button bg */
  accent: string;
  /** primary button hover */
  accentHover: string;
  /** progress percent text color */
  progressText: string;
};

export type ClassItem = {
  period: number;
  title: string;
  teacher: string;
  progress: number;
  chapters: number;
  hours: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  theme: ClassTheme;
  /** URL-safe identifier used for the course detail route. */
  slug: string;
};

/**
 * Class card matching the "My Classes" Figma: soft colored header with period
 * pill + subject name + subject icon tile, body with teacher, progress bar,
 * metadata row, and a colored "Continue Lesson" button.
 */
export function ClassCard({ item }: { item: ClassItem }) {
  const { theme } = item;
  const Icon = item.icon;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card">
      {/* Colored header */}
      <header
        className="relative px-5 pb-5 pt-4"
        style={{ backgroundColor: theme.headerBg }}
      >
        <span
          className="inline-flex items-center rounded-md bg-white/70 px-2 py-0.5 text-[11px] font-semibold text-ink-700"
        >
          Period {item.period}
        </span>
        <h3 className="mt-2 max-w-[75%] text-lg font-bold leading-6 text-ink-900">
          {item.title}
        </h3>
        <span
          className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: theme.iconBg }}
        >
          <Icon className="size-5" style={{ color: theme.iconText }} aria-hidden />
        </span>
      </header>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-ink-700">
          <User className="size-4 text-ink-500" aria-hidden />
          <span>{item.teacher}</span>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink-500">Progress</span>
            <span
              className="font-semibold"
              style={{ color: theme.progressText }}
            >
              {item.progress}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full rounded-full"
              style={{
                width: `${item.progress}%`,
                backgroundColor: theme.accent,
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-ink-500">
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-3.5" aria-hidden />
            {item.chapters} Chapters
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden />
            {item.hours} Hrs
          </span>
        </div>

        <Link
          to={`/student/classes/${item.slug}`}
          className="mt-1 block w-full rounded-lg py-2.5 text-center text-sm font-semibold text-white transition"
          style={{ backgroundColor: theme.accent }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = theme.accentHover)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = theme.accent)
          }
        >
          Continue Lesson
        </Link>
      </div>
    </article>
  );
}
