import { useState } from "react";
import { useT } from "../../../i18n/I18nProvider";
import {
  AnnouncementsView,
  type Announcement,
} from "../components/class/AnnouncementsView";
import { AttendanceSummary } from "../components/class/AttendanceSummary";
import { AttendanceView } from "../components/class/AttendanceView";
import { ClassHeader } from "../components/class/ClassHeader";
import { ClassKpiCards } from "../components/class/ClassKpiCards";
import { ClassTabs, type ClassTab } from "../components/class/ClassTabs";
import {
  EditClassModal,
  type ClassInfoEditable,
} from "../components/class/EditClassModal";
import { GradeDistribution } from "../components/class/GradeDistribution";
import { GradebookView } from "../components/class/GradebookView";
import { GradeReportModal } from "../components/class/GradeReportModal";
import { StudentRoster } from "../components/class/StudentRoster";
import {
  classInfo as defaultClassInfo,
  students,
  type AttendanceStatus,
} from "../data/classManagement";

export function ClassManagement() {
  const t = useT();
  const [tab, setTab] = useState<ClassTab>("roster");
  const [info, setInfo] = useState<ClassInfoEditable>({
    department: defaultClassInfo.department,
    title: defaultClassInfo.title,
    meta: defaultClassInfo.meta,
  });
  const [editOpen, setEditOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(
    () =>
      students.reduce(
        (acc, s) => {
          acc[s.id] = s.status;
          return acc;
        },
        {} as Record<string, AttendanceStatus>
      )
  );
  const [grades, setGrades] = useState<Record<string, number>>(() =>
    students.reduce(
      (acc, s) => {
        acc[s.id] = s.gradePct;
        return acc;
      },
      {} as Record<string, number>
    )
  );
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "a1",
      title: "Lab safety quiz on Friday",
      body: "Review the safety handout, chapters 1-3. Quiz takes 20 minutes at the start of class.",
      createdAt: Date.now() - 1000 * 60 * 60 * 26,
      pinned: true,
    },
    {
      id: "a2",
      title: "Field trip permission slips",
      body: "Please return signed slips by next Monday. Reach out if you need another copy.",
      createdAt: Date.now() - 1000 * 60 * 60 * 72,
      pinned: false,
    },
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  };

  const handleExport = () => {
    const headers = [
      "Student ID",
      "Name",
      "Email",
      "Grade",
      "Grade %",
      "Attendance",
    ];
    const rows = students.map((s) => [
      s.studentId,
      s.name,
      s.email,
      s.grade,
      String(s.gradePct),
      s.status,
    ]);
    const meta = [
      [`Class\t${info.title}`],
      [`Department\t${info.department}`],
      [`Details\t${info.meta}`],
      [`Exported\t${new Date().toLocaleString()}`],
      [],
    ];
    const csv = [
      ...meta.map((r) => r.join(",")),
      headers.join(","),
      ...rows.map((r) =>
        r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safe = info.title.replace(/[^a-z0-9-]+/gi, "_").toLowerCase();
    a.href = url;
    a.download = `${safe || "class"}_export.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(t("Class data exported."));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <ClassHeader
        info={info}
        onEdit={() => setEditOpen(true)}
        onExport={handleExport}
      />
      <ClassKpiCards />
      <ClassTabs active={tab} onChange={setTab} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          {tab === "roster" && (
            <StudentRoster totalStudents={defaultClassInfo.totalStudents} />
          )}
          {tab === "attendance" && (
            <AttendanceView
              attendance={attendance}
              onChange={(id, status) =>
                setAttendance((prev) => ({ ...prev, [id]: status }))
              }
              onMarkAll={(status) => {
                setAttendance(
                  students.reduce(
                    (acc, s) => {
                      acc[s.id] = status;
                      return acc;
                    },
                    {} as Record<string, AttendanceStatus>
                  )
                );
                showToast(`${t("All marked")} ${t(status)}.`);
              }}
            />
          )}
          {tab === "gradebook" && (
            <GradebookView
              grades={grades}
              onChange={(id, pct) =>
                setGrades((prev) => ({ ...prev, [id]: pct }))
              }
            />
          )}
          {tab === "announcements" && (
            <AnnouncementsView
              items={announcements}
              onAdd={(a) => {
                setAnnouncements((prev) => [
                  {
                    id: `a${Date.now()}`,
                    createdAt: Date.now(),
                    ...a,
                  },
                  ...prev,
                ]);
                showToast(t("Announcement posted."));
              }}
              onDelete={(id) =>
                setAnnouncements((prev) => prev.filter((x) => x.id !== id))
              }
              onTogglePin={(id) =>
                setAnnouncements((prev) =>
                  prev.map((x) =>
                    x.id === id ? { ...x, pinned: !x.pinned } : x
                  )
                )
              }
            />
          )}
        </div>

        <aside className="space-y-4">
          <AttendanceSummary />
          <GradeDistribution onViewReport={() => setReportOpen(true)} />
        </aside>
      </div>

      {editOpen && (
        <EditClassModal
          initial={info}
          onClose={() => setEditOpen(false)}
          onSave={(next) => {
            setInfo(next);
            showToast(t("Class details updated."));
          }}
        />
      )}
      {reportOpen && <GradeReportModal onClose={() => setReportOpen(false)} />}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

