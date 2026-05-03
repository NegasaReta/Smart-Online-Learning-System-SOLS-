import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useT } from "../../../../i18n/I18nProvider";

export type ClassInfoEditable = {
  department: string;
  title: string;
  meta: string;
};

type Props = {
  initial: ClassInfoEditable;
  onClose: () => void;
  onSave: (next: ClassInfoEditable) => void;
};

export function EditClassModal({ initial, onClose, onSave }: Props) {
  const t = useT();
  const [title, setTitle] = useState(initial.title);
  const [department, setDepartment] = useState(initial.department);
  // Split meta "Fall Semester 2024 • Room 302" into two fields
  const [semester, setSemester] = useState(
    initial.meta.split(/\s*[\u2022\-]\s*/)[0] ?? ""
  );
  const [room, setRoom] = useState(
    initial.meta.split(/\s*[\u2022\-]\s*/)[1]?.replace(/^Room\s*/i, "") ?? ""
  );
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
    if (!title.trim() || !department.trim()) {
      setError(t("Title and department are required."));
      return;
    }
    onSave({
      title: title.trim(),
      department: department.trim(),
      meta: `${semester.trim()} \u2022 Room ${room.trim()}`,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-class-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3
            id="edit-class-title"
            className="text-base font-semibold text-slate-900"
          >
            {t("Edit Class")}
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
          <Field label={t("Class Title")}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </Field>
          <Field label={t("Department")}>
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("Semester")}>
              <input
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </Field>
            <Field label={t("Room")}>
              <input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
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
              {t("Save Changes")}
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
