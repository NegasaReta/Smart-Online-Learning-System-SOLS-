import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useT } from "../../../../i18n/I18nProvider";
import {
  gradeLevels,
  resourceTypes,
  subjectFilters,
  type Resource,
  type ResourceSubject,
  type ResourceType,
} from "../../data/resources";

const SHORT: Record<ResourceSubject, string> = {
  Mathematics: "Math",
  Science: "Science",
  History: "History",
  Literature: "Lit",
};

const DEFAULT_COVERS: Record<ResourceType, string> = {
  Video:
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=60",
  PDF: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=60",
  "Lesson Plan":
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=60",
  Quiz: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=60",
};

type Props = {
  onClose: () => void;
  onAdd: (resource: Resource) => void;
};

export function AddResourceModal({ onClose, onAdd }: Props) {
  const t = useT();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ResourceType>("Video");
  const [subject, setSubject] = useState<ResourceSubject>("Mathematics");
  const [grade, setGrade] = useState<number>(9);
  const [cover, setCover] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError(t("Title and description are required."));
      return;
    }
    onAdd({
      id: `r-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      type,
      subject,
      subjectShort: SHORT[subject],
      grade,
      cover: cover.trim() || DEFAULT_COVERS[type],
    });
    onClose();
  };

  const typeOptions = resourceTypes.filter(
    (rt): rt is ResourceType => rt !== "All"
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-resource-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3
            id="add-resource-title"
            className="text-base font-semibold text-slate-900"
          >
            {t("Add Resource")}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form onSubmit={submit} className="space-y-4 px-5 py-5">
          <Field label={t("Title")}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Introduction to Quadratic Equations"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </Field>

          <Field label={t("Description")}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Short summary that appears on the resource card."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label={t("Type")}>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ResourceType)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                {typeOptions.map((rt) => (
                  <option key={rt} value={rt}>
                    {rt}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("Subject")}>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as ResourceSubject)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                {subjectFilters.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label={t("Grade Level")}>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                {gradeLevels.map((g) => (
                  <option key={g} value={g}>
                    {t("Grade")} {g}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("Cover image URL (optional)")}>
              <input
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </Field>
          </div>

          {error && (
            <p className="rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {t("Cancel")}
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              {t("Add Resource")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-600">
        {label}
      </span>
      {children}
    </label>
  );
}
