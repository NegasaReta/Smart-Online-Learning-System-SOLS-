import { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  CloudUpload,
  Filter,
  History,
  FileText,
  PlayCircle,
  FileType,
  FileArchive,
  MoreVertical,
  Download,
  Play,
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import {
  fetchAllMaterials,
  fetchRecentlyViewed,
  fetchSubjects,
  type Material,
  type RecentItem,
  type ResourceKind,
  type Subject,
} from "../data/resourcesData";

/**
 * Resources Library — student page for browsing and downloading materials.
 * Layout: page header → filter bar → Recently Viewed → All Materials grid →
 * Load More.
 * Data comes from `resourcesData.ts` fetchers; swap with real API later.
 */
export default function ResourcesPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [recent, setRecent] = useState<RecentItem[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetchSubjects(),
      fetchRecentlyViewed(),
      fetchAllMaterials(),
    ]).then(([s, r, m]) => {
      if (!active) return;
      setSubjects(s);
      setRecent(r);
      setMaterials(m);
    });
    return () => {
      active = false;
    };
  }, []);

  const filteredMaterials = activeSubject
    ? materials.filter(
        (m) => m.subject.toLowerCase() === activeSubject.toLowerCase(),
      )
    : materials;

  return (
    <div className="flex min-h-screen bg-surface-page font-sans text-ink-900">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 pb-12 pt-6">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-ink-500"
          >
            <a href="/student/dashboard" className="hover:text-ink-700">
              Home
            </a>
            <ChevronRight className="size-4" aria-hidden />
            <span className="text-ink-900">Resources Library</span>
          </nav>

          {/* Header */}
          <header className="mt-2 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-ink-900">
                Resources Library
              </h1>
              <p className="mt-1 text-sm text-ink-500">
                Access, organize, and download your learning materials.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white shadow-card transition hover:bg-brand-600"
            >
              <CloudUpload className="size-4" aria-hidden />
              Request Material
            </button>
          </header>

          {/* Subject chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Your Subjects:
            </span>
            <SubjectChip
              label="All"
              active={activeSubject === null}
              onClick={() => setActiveSubject(null)}
            />
            {subjects.map((s) => (
              <SubjectChip
                key={s.id}
                label={s.name}
                dotClass={s.dotClass}
                active={activeSubject === s.name}
                onClick={() =>
                  setActiveSubject(activeSubject === s.name ? null : s.name)
                }
              />
            ))}
          </div>

          {/* Filter bar */}
          <FilterBar onClear={() => setActiveSubject(null)} />

          {/* Recently Viewed */}
          <section className="mt-7">
            <h2 className="flex items-center gap-2 text-sm font-bold text-ink-900">
              <History className="size-4 text-brand" aria-hidden />
              Recently Viewed
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recent.map((r) => (
                <RecentCard key={r.id} item={r} />
              ))}
            </div>
          </section>

          {/* All Materials */}
          <section className="mt-7">
            <header className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-ink-900">All Materials</h2>
              <span className="text-xs text-ink-500">
                {materials.length === 0 ? "—" : `${materials.length * 31} Items`}
              </span>
            </header>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredMaterials.map((m) => (
                <MaterialCard key={m.id} material={m} />
              ))}
            </div>
          </section>

          {/* Load More */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="rounded-full border border-ink-200 bg-white px-6 py-2.5 text-sm font-semibold text-ink-700 shadow-card transition hover:bg-ink-50"
            >
              Load More Resources
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ----------------------------- Subject chip ---------------------------- */

function SubjectChip({
  label,
  dotClass,
  active,
  onClick,
}: {
  label: string;
  dotClass?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "border-brand bg-brand text-white shadow-card"
          : "border-ink-200 bg-white text-ink-700 hover:bg-ink-50"
      }`}
    >
      {dotClass && (
        <span className={`size-2 rounded-full ${dotClass}`} aria-hidden />
      )}
      {label}
    </button>
  );
}

/* ------------------------------- Filter bar ------------------------------ */

function FilterBar({ onClear }: { onClear: () => void }) {
  return (
    <section className="mt-4 grid grid-cols-1 gap-3 rounded-2xl border border-ink-200 bg-white p-4 shadow-card md:grid-cols-[1fr_1fr_1fr_auto]">
      <FilterSelect
        label="SUBJECT"
        placeholder="All Subjects"
        options={["All Subjects", "Mathematics", "Physics", "Literature"]}
      />
      <FilterSelect
        label="RESOURCE TYPE"
        placeholder="All Types"
        options={["All Types", "PDF", "Video", "Document", "Archive"]}
      />
      <FilterSelect
        label="DATE ADDED"
        placeholder="Any Time"
        options={["Any Time", "Last 7 days", "Last 30 days", "This semester"]}
      />
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center justify-center gap-2 self-end rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-700 shadow-card transition hover:bg-ink-50"
      >
        <Filter className="size-4 text-ink-500" aria-hidden />
        Clear
      </button>
    </section>
  );
}

function FilterSelect({
  label,
  placeholder,
  options,
}: {
  label: string;
  placeholder: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
        {label}
      </span>
      <div className="relative">
        <select
          defaultValue={placeholder}
          className="h-10 w-full appearance-none rounded-lg border border-ink-200 bg-white pl-3 pr-9 text-sm text-ink-900 outline-none transition hover:bg-ink-50 focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-ink-500"
          aria-hidden
        />
      </div>
    </label>
  );
}

/* ----------------------------- Resource icon ----------------------------- */

function ResourceIcon({ kind, large }: { kind: ResourceKind; large?: boolean }) {
  const wrap = large ? "size-14 rounded-xl" : "size-10 rounded-lg";
  const inner = large ? "size-7" : "size-5";
  switch (kind) {
    case "pdf":
      return (
        <span
          className={`flex ${wrap} items-center justify-center bg-rose-50 text-rose-500`}
        >
          <FileText className={inner} aria-hidden />
        </span>
      );
    case "video":
      return (
        <span
          className={`flex ${wrap} items-center justify-center bg-brand/10 text-brand`}
        >
          <PlayCircle className={inner} aria-hidden />
        </span>
      );
    case "doc":
      return (
        <span
          className={`flex ${wrap} items-center justify-center bg-emerald-50 text-emerald-600`}
        >
          <FileType className={inner} aria-hidden />
        </span>
      );
    case "archive":
      return (
        <span
          className={`flex ${wrap} items-center justify-center bg-amber-100 text-amber-600`}
        >
          <FileArchive className={inner} aria-hidden />
        </span>
      );
  }
}

/* ----------------------------- Recent card ----------------------------- */

function RecentCard({ item }: { item: RecentItem }) {
  return (
    <article className="rounded-2xl border border-ink-200 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3">
        <ResourceIcon kind={item.kind} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-ink-900">
            {item.title}
          </h3>
          <p className="mt-0.5 text-xs text-ink-500">{item.meta}</p>
        </div>
      </div>
      {item.progress !== null && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
          <div
            className={`h-full rounded-full ${item.progressClass ?? "bg-brand"} transition-[width] duration-700 ease-out`}
            style={{ width: `${Math.round(item.progress * 100)}%` }}
          />
        </div>
      )}
    </article>
  );
}

/* ----------------------------- Material card ----------------------------- */

function MaterialCard({ material }: { material: Material }) {
  return (
    <article className="flex flex-col rounded-2xl border border-ink-200 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Top: icon tile + kebab */}
      <div className="flex items-start justify-between">
        <ResourceIcon kind={material.kind} large />
        <button
          type="button"
          aria-label="More"
          className="rounded-md p-1 text-ink-400 hover:bg-ink-100"
        >
          <MoreVertical className="size-4" aria-hidden />
        </button>
      </div>

      {/* Subject pill */}
      <span
        className={`mt-3 inline-flex w-max items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider ${material.subjectClass}`}
      >
        {material.subject}
      </span>

      {/* Title */}
      <h3 className="mt-3 line-clamp-2 min-h-[40px] text-sm font-semibold text-ink-900">
        {material.title}
      </h3>

      {/* Meta */}
      <p className="mt-2 text-xs text-ink-500">
        {material.size} <span className="mx-1">·</span> {material.date}
      </p>

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        {material.hasView && (
          <button
            type="button"
            className="inline-flex h-9 flex-1 items-center justify-center rounded-lg border border-ink-200 bg-white text-xs font-semibold text-ink-700 transition hover:bg-ink-50"
          >
            View
          </button>
        )}
        <PrimaryActionButton action={material.primaryAction} />
      </div>
    </article>
  );
}

function PrimaryActionButton({
  action,
}: {
  action: Material["primaryAction"];
}) {
  const base =
    "inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand text-xs font-semibold text-white transition hover:bg-brand-600";
  switch (action) {
    case "view":
      return (
        <button type="button" className={base}>
          View
        </button>
      );
    case "watch":
      return (
        <button type="button" className={base}>
          <Play className="size-3.5 fill-white" aria-hidden />
          Watch Video
        </button>
      );
    case "download":
      return (
        <button type="button" className={base}>
          <Download className="size-3.5" aria-hidden />
          Download
        </button>
      );
    case "downloadAll":
      return (
        <button type="button" className={base}>
          <Download className="size-3.5" aria-hidden />
          Download All
        </button>
      );
  }
}
