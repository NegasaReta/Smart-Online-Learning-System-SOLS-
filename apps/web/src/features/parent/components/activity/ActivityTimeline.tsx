import { Fragment } from "react";
import { useT } from "../../../../i18n/I18nProvider";
import type { ActivityEntry } from "../../data/activity";
import { ActivityCard } from "./ActivityCard";

type Props = {
  entries: ActivityEntry[];
};

export function ActivityTimeline({ entries }: Props) {
  const t = useT();
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 px-6 py-16 text-center">
        <p className="text-sm font-medium text-slate-500">
          {t("No activity matches the selected filters.")}
        </p>
      </div>
    );
  }

  // Group by day, preserving order of first appearance
  const groups: { day: string; items: ActivityEntry[] }[] = [];
  for (const e of entries) {
    const last = groups[groups.length - 1];
    if (last && last.day === e.day) last.items.push(e);
    else groups.push({ day: e.day, items: [e] });
  }

  return (
    <div className="relative">
      {/* Center vertical line (desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-slate-200 md:block"
      />
      {/* Mobile vertical line (left) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-5 w-px bg-slate-200 md:hidden"
      />

      <div className="space-y-10">
        {groups.map((group) => (
          <Fragment key={group.day}>
            <DayPill label={group.day} />
            <ul className="space-y-8">
              {group.items.map((entry, idx) => (
                <TimelineRow
                  key={entry.id}
                  entry={entry}
                  side={idx % 2 === 0 ? "left" : "right"}
                />
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function DayPill({ label }: { label: string }) {
  return (
    <div className="relative flex justify-center">
      <span className="relative z-10 rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-600 ring-4 ring-slate-50">
        {label}
      </span>
    </div>
  );
}

function TimelineRow({
  entry,
  side,
}: {
  entry: ActivityEntry;
  side: "left" | "right";
}) {
  const Icon = entry.icon;

  return (
    <li className="relative">
      {/* Mobile layout (icon left, card right) */}
      <div className="md:hidden flex gap-4">
        <div
          className={`relative z-10 mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-4 ring-slate-50 ${entry.iconBg}`}
        >
          <Icon className={`h-4 w-4 ${entry.iconColor}`} />
        </div>
        <div className="min-w-0 flex-1">
          <ActivityCard entry={entry} />
        </div>
      </div>

      {/* Desktop layout (alternating sides) */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-start gap-6">
        <div className={side === "left" ? "" : "invisible"}>
          {side === "left" && <ActivityCard entry={entry} />}
        </div>

        <div
          className={`relative z-10 mt-4 flex h-10 w-10 items-center justify-center rounded-lg ring-4 ring-slate-50 ${entry.iconBg}`}
        >
          <Icon className={`h-4 w-4 ${entry.iconColor}`} />
        </div>

        <div className={side === "right" ? "" : "invisible"}>
          {side === "right" && <ActivityCard entry={entry} />}
        </div>
      </div>
    </li>
  );
}
