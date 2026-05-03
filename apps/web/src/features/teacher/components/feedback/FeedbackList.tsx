import { ArrowDownUp, Clock, Filter } from "lucide-react";
import { useT } from "../../../../i18n/I18nProvider";
import type { FeedbackItem, FeedbackStatus } from "../../data/feedback";

const statusBadge: Record<FeedbackStatus, { label: string; cls: string }> = {
  new: { label: "NEW", cls: "bg-indigo-600 text-white" },
  in_progress: { label: "IN PROGRESS", cls: "bg-amber-100 text-amber-700" },
  replied: { label: "REPLIED", cls: "bg-slate-200 text-slate-600" },
};

type Props = {
  items: FeedbackItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function FeedbackList({ items, selectedId, onSelect }: Props) {
  const t = useT();
  return (
    <section className="flex h-full flex-col rounded-2xl bg-white shadow-card ring-1 ring-slate-100">
      <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
            <Filter className="h-3.5 w-3.5" />
            {t("Filter")}
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
            <ArrowDownUp className="h-3.5 w-3.5" />
            {t("Sort")}
          </button>
        </div>
        <p className="text-xs font-medium text-slate-500">
          {t("Showing 1-10 of 18 pending")}
        </p>
      </header>

      <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto">
        {items.map((it) => {
          const isActive = it.id === selectedId;
          return (
            <li key={it.id}>
              <button
                type="button"
                onClick={() => onSelect(it.id)}
                className={`block w-full px-5 py-4 text-left transition ${
                  isActive ? "bg-indigo-50/80" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar item={it} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {it.studentName}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {it.studentClass}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider ${
                      statusBadge[it.status].cls
                    }`}
                  >
                    {t(statusBadge[it.status].label)}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {it.title}
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                  {it.preview}
                </p>
                <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="h-3 w-3" />
                  {it.time}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Avatar({ item }: { item: FeedbackItem }) {
  if (item.studentAvatar) {
    return (
      <img
        src={item.studentAvatar}
        alt={item.studentName}
        className="h-9 w-9 rounded-full object-cover ring-2 ring-white shadow-sm"
      />
    );
  }
  const initials = item.studentName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-800">
      {initials}
    </div>
  );
}
