import { useState } from "react";
import { useT } from "../../../../i18n/I18nProvider";
import {
  GRADE_OPTIONS,
  SUBJECT_OPTIONS,
  type Course,
} from "../../data/authoring";
import { authoringActions } from "../../state/authoringStore";
import { FieldError, FieldLabel, Modal, inputCls } from "./Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated?: (c: Course) => void;
};

const blank = {
  title: "",
  subject: SUBJECT_OPTIONS[0],
  grade: GRADE_OPTIONS[1],
  description: "",
  schedule: "",
  room: "",
  capacity: "30",
};

export function CourseModal({ open, onClose, onCreated }: Props) {
  const t = useT();
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof blank, string>>>(
    {}
  );

  const set = <K extends keyof typeof blank>(k: K, v: (typeof blank)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof typeof blank, string>> = {};
    if (!form.title.trim()) next.title = t("Required");
    if (!form.description.trim()) next.description = t("Required");
    if (!form.schedule.trim()) next.schedule = t("Required");
    if (!form.room.trim()) next.room = t("Required");
    const cap = Number(form.capacity);
    if (!Number.isFinite(cap) || cap <= 0) next.capacity = t("Must be > 0");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    const created = authoringActions.addCourse({
      title: form.title.trim(),
      subject: form.subject,
      grade: form.grade,
      description: form.description.trim(),
      schedule: form.schedule.trim(),
      room: form.room.trim(),
      capacity: Number(form.capacity),
    });
    onCreated?.(created);
    setForm(blank);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t("Create Course")}
      description={t("Set up a new class your students can enroll in.")}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {t("Cancel")}
          </button>
          <button
            type="button"
            onClick={submit}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            {t("Create Course")}
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FieldLabel required>{t("Course title")}</FieldLabel>
          <input
            className={inputCls}
            placeholder={t("e.g. AP Biology")}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
          />
          <FieldError message={errors.title} />
        </div>

        <div>
          <FieldLabel required>{t("Subject")}</FieldLabel>
          <select
            className={inputCls}
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
          >
            {SUBJECT_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel required>{t("Grade level")}</FieldLabel>
          <select
            className={inputCls}
            value={form.grade}
            onChange={(e) => set("grade", e.target.value)}
          >
            {GRADE_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <FieldLabel required>{t("Description")}</FieldLabel>
          <textarea
            rows={3}
            className={inputCls}
            placeholder={t("What will students learn in this course?")}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
          <FieldError message={errors.description} />
        </div>

        <div>
          <FieldLabel required>{t("Schedule")}</FieldLabel>
          <input
            className={inputCls}
            placeholder="Mon, Wed, Fri • 9:00 AM"
            value={form.schedule}
            onChange={(e) => set("schedule", e.target.value)}
          />
          <FieldError message={errors.schedule} />
        </div>

        <div>
          <FieldLabel required>{t("Room")}</FieldLabel>
          <input
            className={inputCls}
            placeholder="302"
            value={form.room}
            onChange={(e) => set("room", e.target.value)}
          />
          <FieldError message={errors.room} />
        </div>

        <div>
          <FieldLabel required>{t("Capacity")}</FieldLabel>
          <input
            type="number"
            min={1}
            className={inputCls}
            value={form.capacity}
            onChange={(e) => set("capacity", e.target.value)}
          />
          <FieldError message={errors.capacity} />
        </div>
      </div>
    </Modal>
  );
}
