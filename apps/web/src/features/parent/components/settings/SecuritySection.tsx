import { CheckCircle2, ShieldCheck, Smartphone } from "lucide-react";
import { useState } from "react";
import { useT } from "../../../../i18n/I18nProvider";
import { SettingsSection } from "../ui/SettingsSection";
import { Toggle } from "../ui/Toggle";

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100";

export function SecuritySection() {
  const t = useT();
  const [twoFa, setTwoFa] = useState(true);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const strength = scoreStrength(next);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    if (!current || !next || !confirm) {
      setError(t("All password fields are required."));
      return;
    }
    if (next.length < 8) {
      setError(t("New password must be at least 8 characters."));
      return;
    }
    if (next === current) {
      setError(t("New password must differ from the current password."));
      return;
    }
    if (next !== confirm) {
      setError(t("New password and confirmation do not match."));
      return;
    }
    setError(null);
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setCurrent("");
      setNext("");
      setConfirm("");
      window.setTimeout(() => setSuccess(false), 3000);
    }, 600);
  };

  return (
    <SettingsSection
      icon={ShieldCheck}
      title={t("Security")}
      description={t("Manage your password and two-factor authentication.")}
      iconBg="bg-emerald-50"
      iconColor="text-emerald-600"
    >
      <form onSubmit={submit} noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              {t("Current password")}
            </label>
            <input
              className={inputCls}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              {t("New password")}
            </label>
            <input
              className={inputCls}
              type="password"
              autoComplete="new-password"
              placeholder={t("At least 8 characters")}
              value={next}
              onChange={(e) => setNext(e.target.value)}
            />
            {next.length > 0 && (
              <div className="mt-1.5">
                <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all ${strength.bar}`}
                    style={{ width: `${(strength.score / 4) * 100}%` }}
                  />
                </div>
                <p className={`mt-1 text-[11px] font-semibold ${strength.text}`}>
                  {t(strength.label)}
                </p>
              </div>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              {t("Confirm new password")}
            </label>
            <input
              className={inputCls}
              type="password"
              autoComplete="new-password"
              placeholder={t("Re-enter new password")}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {t("Password updated successfully.")}
          </p>
        )}

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? t("Updating...") : t("Update Password")}
          </button>
        </div>
      </form>

      <div className="mt-6 flex items-start justify-between gap-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-600 ring-1 ring-slate-200">
            <Smartphone className="h-4.5 w-4.5 h-[18px] w-[18px]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {t("Two-Factor Authentication")}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {t("Add an extra layer of security via authenticator app or SMS code.")}
            </p>
          </div>
        </div>
        <Toggle checked={twoFa} onChange={setTwoFa} label="Two-factor auth" />
      </div>
    </SettingsSection>
  );
}

function scoreStrength(pw: string): {
  score: number;
  label: string;
  bar: string;
  text: string;
} {
  if (!pw) return { score: 0, label: "", bar: "bg-slate-200", text: "text-slate-400" };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map: Record<number, { label: string; bar: string; text: string }> = {
    0: { label: "Too weak", bar: "bg-rose-500", text: "text-rose-600" },
    1: { label: "Weak", bar: "bg-rose-500", text: "text-rose-600" },
    2: { label: "Fair", bar: "bg-amber-500", text: "text-amber-600" },
    3: { label: "Strong", bar: "bg-indigo-500", text: "text-indigo-600" },
    4: { label: "Very strong", bar: "bg-emerald-500", text: "text-emerald-600" },
  };
  return { score: s, ...map[s] };
}
