import { Megaphone, Pin, PinOff, Send, Trash2 } from "lucide-react";
import { useState } from "react";
import { useT } from "../../../../i18n/I18nProvider";

export type Announcement = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  pinned: boolean;
};

type Props = {
  items: Announcement[];
  onAdd: (a: Omit<Announcement, "id" | "createdAt">) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
};

export function AnnouncementsView({
  items,
  onAdd,
  onDelete,
  onTogglePin,
}: Props) {
  const t = useT();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [pinned, setPinned] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError(t("Title and message are required."));
      return;
    }
    onAdd({ title: title.trim(), body: body.trim(), pinned });
    setTitle("");
    setBody("");
    setPinned(false);
    setError(null);
  };

  const sorted = [...items].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.createdAt - a.createdAt;
  });

  return (
    <section className="space-y-4">
      <form
        onSubmit={submit}
        className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Megaphone className="h-4 w-4 text-indigo-600" />
          {t("Post an announcement")}
        </div>
        <div className="mt-3 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("Title (e.g. Lab report due Friday)")}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder={t("Write your message to the class...")}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          {error && (
            <p className="rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
              {error}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              {t("Pin to top")}
            </label>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              <Send className="h-4 w-4" />
              {t("Post")}
            </button>
          </div>
        </div>
      </form>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 px-6 py-16 text-center">
          <Megaphone className="mx-auto h-6 w-6 text-slate-300" />
          <p className="mt-2 text-sm font-medium text-slate-500">
            {t("No announcements yet. Post one to get started.")}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sorted.map((a) => (
            <li
              key={a.id}
              className={`rounded-2xl bg-white p-5 shadow-card ring-1 ${
                a.pinned ? "ring-indigo-200" : "ring-slate-100"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {a.pinned && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                        <Pin className="h-3 w-3" />
                        {t("Pinned")}
                      </span>
                    )}
                    <h4 className="text-sm font-semibold text-slate-900">
                      {a.title}
                    </h4>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">
                    {a.body}
                  </p>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onTogglePin(a.id)}
                    aria-label={a.pinned ? "Unpin" : "Pin"}
                    className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-indigo-600"
                  >
                    {a.pinned ? (
                      <PinOff className="h-4 w-4" />
                    ) : (
                      <Pin className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(a.id)}
                    aria-label="Delete announcement"
                    className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
