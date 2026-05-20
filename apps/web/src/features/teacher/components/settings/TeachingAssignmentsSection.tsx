import { BookOpen, Plus, Users } from "lucide-react";
import { useState } from "react";
import { SettingsSection } from "../../../parent/components/ui/SettingsSection";

type Assignment = {
  id: string;
  course: string;
  section: string;
  students: number;
  primary?: boolean;
};

const initial: Assignment[] = [
  {
    id: "a1",
    course: "Biology · Grade 10",
    section: "Section A · Room 302",
    students: 32,
    primary: true,
  },
  {
    id: "a2",
    course: "Biology · Grade 11",
    section: "Section C · Room 314",
    students: 28,
  },
  {
    id: "a3",
    course: "Environmental Science · Grade 9",
    section: "Section B · Lab 2",
    students: 24,
  },
];

export function TeachingAssignmentsSection() {
  const [items, setItems] = useState<Assignment[]>(initial);

  const remove = (id: string) =>
    setItems((arr) => arr.filter((a) => a.id !== id));
  const setPrimary = (id: string) =>
    setItems((arr) =>
      arr.map((a) => ({ ...a, primary: a.id === id }))
    );

  return (
    <SettingsSection
      icon={Users}
      title="Teaching Assignments"
      description="Classes and sections currently assigned to your account."
      iconBg="bg-purple-50"
      iconColor="text-purple-600"
    >
      <ul className="space-y-3">
        {items.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-white p-4 hover:bg-slate-50"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {a.course}
                  </p>
                  {a.primary && (
                    <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                      Primary
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {a.section} · {a.students} students
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!a.primary && (
                <button
                  onClick={() => setPrimary(a.id)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white"
                >
                  Make primary
                </button>
              )}
              <button
                onClick={() => remove(a.id)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/40 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
        <Plus className="h-4 w-4" />
        Request New Assignment
      </button>
    </SettingsSection>
  );
}
