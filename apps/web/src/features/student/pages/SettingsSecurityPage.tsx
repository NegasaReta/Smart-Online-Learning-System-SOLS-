import { useMemo, useState } from "react";
import {
  Eye,
  EyeOff,
  Key,
  Smartphone,
  History,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import {
  setPreferences,
  usePreferences,
} from "../settings/preferencesStore";

type ActivityStatus =
  | "current"
  | "successful"
  | "failed"
  | "password-changed";

const recentActivity: {
  id: string;
  date: string;
  time: string;
  device: string;
  browser: string;
  location: string;
  unknown?: boolean;
  status: ActivityStatus;
}[] = [
  {
    id: "a1",
    date: "Oct 24, 2023",
    time: "09:41 AM",
    device: "Mac OS X",
    browser: "Chrome 118.0",
    location: "Chicago, IL, USA",
    status: "current",
  },
  {
    id: "a2",
    date: "Oct 22, 2023",
    time: "08:15 PM",
    device: "iPhone 13",
    browser: "Safari Mobile",
    location: "Chicago, IL, USA",
    status: "successful",
  },
  {
    id: "a3",
    date: "Oct 15, 2023",
    time: "11:20 AM",
    device: "Windows 11",
    browser: "Edge 117.0",
    location: "Unknown Location",
    unknown: true,
    status: "failed",
  },
  {
    id: "a4",
    date: "Oct 10, 2023",
    time: "02:30 PM",
    device: "Mac OS X",
    browser: "Chrome 118.0",
    location: "Chicago, IL, USA",
    status: "password-changed",
  },
];

/** Account Security page — change password, two-factor toggles, activity log. */
export default function SettingsSecurityPage() {
  return (
    <>
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">
          Account Security
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Manage your password, two-factor authentication, and monitor account
          activity.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[360px_1fr]">
        <div className="flex flex-col gap-5">
          <ChangePasswordCard />
          <TwoFactorCard />
        </div>
        <RecentActivityCard />
      </div>
    </>
  );
}

/* --------------------------- Change Password --------------------------- */

function ChangePasswordCard() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  const checks = useMemo(
    () => ({
      length: next.length >= 8,
      number: /\d/.test(next),
      special: /[!@#$%^&*(),.?":{}|<>_\-+=\\/[\]~`';]/.test(next),
    }),
    [next],
  );
  const score = Object.values(checks).filter(Boolean).length;
  const strengthLabel =
    score === 0 ? "—" : score === 1 ? "Weak" : score === 2 ? "Medium" : "Strong";
  const strengthColor =
    score === 0
      ? "text-ink-500"
      : score === 1
        ? "text-rose-600"
        : score === 2
          ? "text-amber-600"
          : "text-emerald-600";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!current || !next || score < 2) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setCurrent("");
    setNext("");
  }

  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <header className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <Key className="size-4" aria-hidden />
        </span>
        <h2 className="text-base font-bold text-ink-900">Change Password</h2>
      </header>

      <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
        <PasswordField
          label="Current Password"
          value={current}
          onChange={setCurrent}
          show={showCurrent}
          onToggle={() => setShowCurrent((s) => !s)}
          placeholder="Enter current password"
        />
        <PasswordField
          label="New Password"
          value={next}
          onChange={setNext}
          show={showNext}
          onToggle={() => setShowNext((s) => !s)}
          placeholder="Enter new password"
        />

        <div className="rounded-xl border border-ink-200 bg-surface-page p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-700">
              Password Strength
            </span>
            <span className={`text-xs font-bold ${strengthColor}`}>
              {strengthLabel}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-colors ${
                  i < score
                    ? score === 1
                      ? "bg-rose-500"
                      : score === 2
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    : "bg-ink-200"
                }`}
              />
            ))}
          </div>
          <ul className="mt-3 space-y-1.5 text-xs">
            <CheckLine met={checks.length} label="8+ characters" />
            <CheckLine met={checks.number} label="1 number" />
            <CheckLine met={checks.special} label="1 special character" />
          </ul>
        </div>

        {status === "error" && (
          <p className="text-xs font-medium text-rose-600">
            Please fill in both fields and meet at least Medium strength.
          </p>
        )}
        {status === "success" && (
          <p className="text-xs font-medium text-emerald-600">
            Password updated successfully.
          </p>
        )}

        <button
          type="submit"
          className="mt-1 inline-flex h-10 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white shadow-card transition hover:bg-brand-600"
        >
          Update Password
        </button>
      </form>
    </section>
  );
}

function CheckLine({ met, label }: { met: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2">
      {met ? (
        <Check className="size-3.5 text-emerald-600" aria-hidden />
      ) : (
        <X className="size-3.5 text-ink-400" aria-hidden />
      )}
      <span className={met ? "text-ink-700" : "text-ink-500"}>{label}</span>
    </li>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-ink-700">{label}</span>
      <span className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-ink-200 bg-white px-3 pr-10 text-sm text-ink-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-500 hover:bg-ink-100"
        >
          {show ? (
            <EyeOff className="size-4" aria-hidden />
          ) : (
            <Eye className="size-4" aria-hidden />
          )}
        </button>
      </span>
    </label>
  );
}

/* ------------------------------ Two-Factor ------------------------------ */

function TwoFactorCard() {
  const prefs = usePreferences();

  function setTwoFactor(patch: Partial<typeof prefs.twoFactor>) {
    setPreferences({
      ...prefs,
      twoFactor: { ...prefs.twoFactor, ...patch },
    });
  }

  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <header className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Smartphone className="size-4" aria-hidden />
        </span>
        <h2 className="text-base font-bold text-ink-900">Two-Factor Auth</h2>
      </header>

      <div className="mt-4 flex flex-col gap-3">
        <ToggleRow
          title="Authenticator App"
          subtitle="Recommended for high security"
          checked={prefs.twoFactor.authenticatorApp}
          onToggle={(v) => setTwoFactor({ authenticatorApp: v })}
        />
        <ToggleRow
          title="SMS Backup"
          subtitle="Send recovery codes via SMS"
          checked={prefs.twoFactor.smsBackup}
          onToggle={(v) => setTwoFactor({ smsBackup: v })}
        />
      </div>
    </section>
  );
}

function ToggleRow({
  title,
  subtitle,
  checked,
  onToggle,
}: {
  title: string;
  subtitle: string;
  checked: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-ink-900">{title}</p>
        <p className="text-xs text-ink-500">{subtitle}</p>
      </div>
      <Toggle checked={checked} onToggle={onToggle} />
    </div>
  );
}

/** Reusable toggle switch. */
export function Toggle({
  checked,
  onToggle,
  ariaLabel,
}: {
  checked: boolean;
  onToggle: (v: boolean) => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onToggle(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
        checked ? "bg-brand" : "bg-ink-200"
      }`}
    >
      <span
        className={`inline-block size-5 transform rounded-full bg-white shadow transition ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

/* ----------------------------- Recent Activity ----------------------------- */

function RecentActivityCard() {
  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold text-ink-900">
          <span className="flex size-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <History className="size-4" aria-hidden />
          </span>
          Recent Security Activity
        </h2>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          View All <ArrowRight className="size-3.5" aria-hidden />
        </a>
      </header>

      <p className="mt-3 text-sm text-ink-700">
        Review recent login attempts and security events associated with your
        account. If you see unrecognized activity, change your password
        immediately.
      </p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
              <th className="pb-2 pr-3">Date &amp; Time</th>
              <th className="pb-2 pr-3">Device / Browser</th>
              <th className="pb-2 pr-3">Location</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((a) => (
              <tr key={a.id} className="border-b border-ink-100 last:border-0">
                <td className="py-3 pr-3 align-top">
                  <p className="text-sm font-medium text-ink-900">{a.date}</p>
                  <p className="text-xs text-ink-500">{a.time}</p>
                </td>
                <td className="py-3 pr-3 align-top">
                  <p className="text-sm font-medium text-ink-900">{a.device}</p>
                  <p className="text-xs text-ink-500">{a.browser}</p>
                </td>
                <td className="py-3 pr-3 align-top">
                  <span
                    className={
                      "inline-flex items-center gap-1 text-sm " +
                      (a.unknown ? "font-semibold text-rose-600" : "text-ink-700")
                    }
                  >
                    {a.unknown ? (
                      <AlertTriangle className="size-3.5" aria-hidden />
                    ) : (
                      <span aria-hidden>📍</span>
                    )}
                    {a.location}
                  </span>
                </td>
                <td className="py-3 align-top">
                  <ActivityPill status={a.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ActivityPill({ status }: { status: ActivityStatus }) {
  switch (status) {
    case "current":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Current Session
        </span>
      );
    case "successful":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
          <span className="size-1.5 rounded-full bg-brand" />
          Successful Login
        </span>
      );
    case "failed":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
          <span className="size-1.5 rounded-full bg-rose-500" />
          Failed Attempt
        </span>
      );
    case "password-changed":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
          <span className="size-1.5 rounded-full bg-violet-500" />
          Password Changed
        </span>
      );
  }
}
