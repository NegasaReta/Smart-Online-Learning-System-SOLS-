import {
  BookOpen,
  Check,
  FileText,
  Link as LinkIcon,
  MoreVertical,
  Paperclip,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useT } from "../../../../i18n/I18nProvider";
import type { FeedbackItem, FeedbackMessage } from "../../data/feedback";

type Props = {
  item: FeedbackItem;
  onMarkResolved: (id: string) => void;
  onSendReply: (id: string, body: string) => void;
};

export function FeedbackThread({ item, onMarkResolved, onSendReply }: Props) {
  const t = useT();
  const [draft, setDraft] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  // Reset draft when switching threads
  useEffect(() => {
    setDraft("");
    setSavedAt(null);
  }, [item.id]);

  const send = () => {
    const body = draft.trim();
    if (!body) return;
    onSendReply(item.id, body);
    setDraft("");
    setSavedAt(null);
  };

  const saveDraft = () => {
    if (!draft.trim()) return;
    const now = new Date();
    setSavedAt(
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100">
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-6 py-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {item.status === "new" && (
              <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">
                {t("NEW")}
              </span>
            )}
            {item.course && (
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                <BookOpen className="h-3 w-3" />
                {item.course}
              </span>
            )}
          </div>
          <h3 className="mt-2 text-xl font-bold leading-snug text-slate-900">
            {item.title}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMarkResolved(item.id)}
            aria-label="Mark resolved"
            title="Mark resolved"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-emerald-600"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            aria-label="More options"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-600"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
        {item.thread.map((m, i) => (
          <Message key={i} message={m} />
        ))}
      </div>

      <footer className="border-t border-slate-100 p-4">
        <div className="rounded-xl border border-slate-200 bg-white focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
          <textarea
            ref={taRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Type your response to ${item.studentName.split(" ")[0]}...`}
            rows={3}
            className="block w-full resize-none rounded-xl bg-transparent px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                send();
              }
            }}
          />
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-3 py-2">
            <div className="flex items-center gap-1 text-slate-400">
              <IconBtn label={t("Attach file")}>
                <Paperclip className="h-4 w-4" />
              </IconBtn>
              <IconBtn label={t("Insert link")}>
                <LinkIcon className="h-4 w-4" />
              </IconBtn>
              <IconBtn label={t("Insert template")}>
                <FileText className="h-4 w-4" />
              </IconBtn>
              {savedAt && (
                <span className="ml-2 text-[11px] font-medium text-emerald-600">
                  {t("Draft saved at")} {savedAt}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={saveDraft}
                disabled={!draft.trim()}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("Save Draft")}
              </button>
              <button
                type="button"
                onClick={send}
                disabled={!draft.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-3.5 w-3.5" />
                {t("Send Reply")}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

function Message({ message }: { message: FeedbackMessage }) {
  const initials = message.authorName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="flex gap-3">
      {message.authorAvatar ? (
        <img
          src={message.authorAvatar}
          alt={message.authorName}
          className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
        />
      ) : (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-800">
          {initials}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-semibold text-slate-900">
            {message.authorName}
          </p>
          <p className="text-xs text-slate-500">{message.timestamp}</p>
        </div>
        <div className="mt-2 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-100 whitespace-pre-line">
          {message.body}
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
    >
      {children}
    </button>
  );
}
