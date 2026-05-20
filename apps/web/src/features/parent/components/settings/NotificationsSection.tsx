import { Bell } from "lucide-react";
import { useState } from "react";
import { useT } from "../../../../i18n/I18nProvider";
import { SettingsSection } from "../ui/SettingsSection";
import { Toggle } from "../ui/Toggle";

type Pref = {
  id: string;
  title: string;
  description: string;
};

const prefs: Pref[] = [
  {
    id: "grades",
    title: "Grade Updates",
    description: "Get notified when Alex receives a new grade or feedback.",
  },
  {
    id: "attendance",
    title: "Attendance Alerts",
    description: "Be alerted on absences, tardies, or early dismissals.",
  },
  {
    id: "weekly",
    title: "Weekly Summary",
    description: "A digest of progress, activity, and upcoming work each Sunday.",
  },
  {
    id: "messages",
    title: "Teacher Messages",
    description: "Direct messages from teachers and school staff.",
  },
  {
    id: "marketing",
    title: "Product Announcements",
    description: "News, tips, and feature updates from EduSmart.",
  },
];

const channels = [
  { id: "email", label: "Email" },
  { id: "push", label: "Push" },
  { id: "sms", label: "SMS" },
] as const;

type ChannelId = (typeof channels)[number]["id"];

export function NotificationsSection() {
  const t = useT();
  const [state, setState] = useState<Record<string, Record<ChannelId, boolean>>>(
    () =>
      Object.fromEntries(
        prefs.map((p) => [
          p.id,
          {
            email: p.id !== "marketing",
            push: ["grades", "attendance", "messages"].includes(p.id),
            sms: p.id === "attendance",
          },
        ])
      )
  );

  const toggle = (prefId: string, channel: ChannelId) =>
    setState((s) => ({
      ...s,
      [prefId]: { ...s[prefId], [channel]: !s[prefId][channel] },
    }));

  return (
    <SettingsSection
      icon={Bell}
      title={t("Notification Preferences")}
      description={t("Choose how you'd like to be notified for each activity type.")}
      iconBg="bg-amber-50"
      iconColor="text-amber-600"
    >
      <div className="overflow-hidden rounded-xl ring-1 ring-slate-100">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">{t("Notification")}</th>
              {channels.map((c) => (
                <th key={c.id} className="px-4 py-3 text-center">
                  {t(c.label)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {prefs.map((p) => (
              <tr key={p.id} className="bg-white">
                <td className="px-4 py-4 align-top">
                  <p className="font-semibold text-slate-900">{t(p.title)}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{t(p.description)}</p>
                </td>
                {channels.map((c) => (
                  <td key={c.id} className="px-4 py-4 text-center align-top">
                    <div className="flex justify-center">
                      <Toggle
                        checked={state[p.id][c.id]}
                        onChange={() => toggle(p.id, c.id)}
                        label={`${p.title} via ${t(c.label)}`}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SettingsSection>
  );
}
