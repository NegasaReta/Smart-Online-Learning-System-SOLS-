import { AlertTriangle, CheckCircle2, Trash2, X, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useT } from "../../../../i18n/I18nProvider";

export function DangerZoneSection() {
  const t = useT();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-rose-100">
      <header className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50">
          <AlertTriangle className="h-5 w-5 text-rose-600" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">{t("Danger Zone")}</h3>
          <p className="mt-0.5 text-sm text-slate-500">
            {t("Irreversible and destructive actions for this account.")}
          </p>
        </div>
      </header>

      <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
        <Row
          icon={Trash2}
          title={t("Delete account")}
          description={t("Permanently remove this account and all linked data.")}
          actionLabel={deleted ? t("Account deleted") : t("Delete account")}
          destructive
          disabled={deleted}
          onClick={() => setConfirmOpen(true)}
        />
        {deleted && (
          <p className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {t("Account scheduled for deletion. You'll be signed out shortly.")}
          </p>
        )}
      </div>

      {confirmOpen && (
        <DeleteAccountModal
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            setDeleted(true);
          }}
        />
      )}
    </section>
  );
}

function Row({
  icon: Icon,
  title,
  description,
  actionLabel,
  destructive,
  disabled,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-600 ring-1 ring-slate-200">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
          destructive
            ? "bg-rose-600 text-white hover:bg-rose-700"
            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        }`}
      >
        {actionLabel}
      </button>
    </div>
  );
}

function DeleteAccountModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const t = useT();
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const canDelete = text.trim().toUpperCase() === "DELETE" && !submitting;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel, submitting]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canDelete) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      onConfirm();
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      onClick={() => !submitting && onCancel()}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-account-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            </span>
            <h3
              id="delete-account-title"
              className="text-base font-semibold text-slate-900"
            >
              {t("Delete account?")}
            </h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            aria-label="Close"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form onSubmit={submit} className="px-5 py-5">
          <p className="text-sm text-slate-600">
            {t("This will permanently remove your account, profile, and all linked data.")}{" "}
            <span className="font-semibold text-slate-900">{t("This action cannot be undone.")}</span>
          </p>

          <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-500">
            <li>{t("All saved preferences will be erased")}</li>
            <li>{t("Linked records will be detached")}</li>
            <li>{t("You will be signed out of every device")}</li>
          </ul>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700">
              {t("Type")} <span className="font-mono font-bold text-rose-600">DELETE</span> {t("to confirm")}
            </span>
            <input
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="DELETE"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
            />
          </label>

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              {t("Cancel")}
            </button>
            <button
              type="submit"
              disabled={!canDelete}
              className="rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? t("Deleting...") : t("Delete account")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
