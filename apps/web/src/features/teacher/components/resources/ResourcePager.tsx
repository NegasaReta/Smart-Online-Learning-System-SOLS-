import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  onChange: (next: number) => void;
};

export function ResourcePager({ page, totalPages, onChange }: Props) {
  const items = buildPagerItems(page, totalPages);

  return (
    <div className="inline-flex items-center gap-1.5">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {items.map((it, i) =>
        it === "..." ? (
          <span
            key={`gap-${i}`}
            className="px-1.5 text-xs font-semibold text-slate-400"
          >
            ...
          </span>
        ) : (
          <button
            key={it}
            onClick={() => onChange(it)}
            className={`h-8 min-w-[32px] rounded-full px-2 text-xs font-semibold transition ${
              it === page
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {it}
          </button>
        )
      )}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function buildPagerItems(page: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  // Always: 1, 2, 3, ..., total  (mock-like behavior)
  if (page <= 3) return [1, 2, 3, "...", total];
  if (page >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", page, "...", total];
}
