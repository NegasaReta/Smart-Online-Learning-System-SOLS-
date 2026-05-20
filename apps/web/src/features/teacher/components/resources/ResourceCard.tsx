import {
  ClipboardList,
  FileText,
  MoreVertical,
  NotebookPen,
  Play,
} from "lucide-react";
import { useT } from "../../../../i18n/I18nProvider";
import type { Resource, ResourceType } from "../../data/resources";

const typeMeta: Record<
  ResourceType,
  { icon: typeof Play; cls: string }
> = {
  Video: { icon: Play, cls: "bg-rose-50 text-rose-700" },
  PDF: { icon: FileText, cls: "bg-indigo-50 text-indigo-700" },
  "Lesson Plan": { icon: NotebookPen, cls: "bg-emerald-50 text-emerald-700" },
  Quiz: { icon: ClipboardList, cls: "bg-amber-50 text-amber-700" },
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const t = useT();
  const Meta = typeMeta[resource.type];
  const Icon = Meta.icon;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100 transition hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={resource.cover}
          alt={resource.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute right-2 top-2 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold shadow-sm ring-1 ring-white/70 ${Meta.cls}`}
        >
          <Icon className="h-3 w-3" />
          {resource.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h4
          className="line-clamp-1 text-sm font-bold text-slate-900"
          title={resource.title}
        >
          {resource.title}
        </h4>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {resource.description}
        </p>

        <footer className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <p className="text-[11px] font-medium text-slate-500">
            {resource.subjectShort} <span className="mx-1">•</span> {t("Grade")}{" "}
            {resource.grade}
          </p>
          <button
            aria-label="More options"
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </footer>
      </div>
    </article>
  );
}
