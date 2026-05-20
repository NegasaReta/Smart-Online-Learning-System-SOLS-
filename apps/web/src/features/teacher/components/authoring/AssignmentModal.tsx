import { Paperclip, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useT } from "../../../../i18n/I18nProvider";
import type { Assignment } from "../../data/authoring";
import { authoringActions, useAuthoringStore } from "../../state/authoringStore";
import { FieldError, FieldLabel, Modal, inputCls } from "./Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated?: (a: Assignment) => void;
};

export function AssignmentModal({ open, onClose, onCreated }: Props) {
  const t = useT();
  const courses = useAuthoringStore((s) => s.courses);
  const courseOptions = useMemo(
    () => (courses.length ? courses.map((c) => c.title) : ["General"]),
    [courses]
  );

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState(courseOptions[0]);
  const [instructions, setInstructions] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [points, setPoints] = useState("100");
  const [allowLate, setAllowLate] = useState(true);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [attachmentInput, setAttachmentInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addAttachment = () => {
    const v = attachmentInput.trim();
    if (!v) return;
    if (attachments.includes(v)) return setAttachmentInput("");
    setAttachments((a) => [...a, v]);
    setAttachmentInput("");
  };

  const submit = (publish: boolean) => {
    setError(null);
    if (!title.trim()) return setError(t("Assignment title is required."));
    if (!instructions.trim()) return setError(t("Instructions are required."));
    if (!dueDate) return setError(t("Pick a due date."));
    const totalPoints = Number(points);
    if (!Number.isFinite(totalPoints) || totalPoints <= 0)
      return setError(t("Total points must be greater than 0."));

    const created = authoringActions.addAssignment({
      title: title.trim(),
      course,
      instructions: instructions.trim(),
      dueDate,
      totalPoints,
      allowLate,
      attachments,
      published: publish,
    });
    onCreated?.(created);
    setTitle("");
    setInstructions("");
    setDueDate("");
    setPoints("100");
    setAllowLate(true);
    setAttachments([]);
    setAttachmentInput("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t("Create Assignment")}
      description={t("Define what students will submit and when it's due.")}
      size="lg"
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
            onClick={() => submit(false)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {t("Save as Draft")}
          </button>
          <button
            type="button"
            onClick={() => submit(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            {t("Publish Assignment")}
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FieldLabel required>{t("Assignment title")}</FieldLabel>
          <input
            className={inputCls}
            placeholder="Lab Report: Cellular Respiration"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <FieldLabel required>{t("Course")}</FieldLabel>
          <select
            className={inputCls}
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            {courseOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel required>{t("Due date")}</FieldLabel>
          <input
            type="date"
            className={inputCls}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <FieldLabel required>{t("Total points")}</FieldLabel>
          <input
            type="number"
            min={1}
            className={inputCls}
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={allowLate}
              onChange={(e) => setAllowLate(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            {t("Allow late submissions")}
          </label>
        </div>
        <div className="sm:col-span-2">
          <FieldLabel required>{t("Instructions")}</FieldLabel>
          <textarea
            rows={5}
            className={inputCls}
            placeholder={t("What should students do? Include rubric, formatting, length...")}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel>{t("Attachments (links or filenames)")}</FieldLabel>
          <div className="flex gap-2">
            <input
              className={inputCls}
              placeholder="rubric.pdf or https://..."
              value={attachmentInput}
              onChange={(e) => setAttachmentInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addAttachment();
                }
              }}
            />
            <button
              type="button"
              onClick={addAttachment}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {t("Add")}
            </button>
          </div>
          {attachments.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {attachments.map((a) => (
                <li
                  key={a}
                  className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100"
                >
                  <Paperclip className="h-3 w-3" />
                  {a}
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((arr) => arr.filter((x) => x !== a))
                    }
                    aria-label={`Remove ${a}`}
                    className="ml-0.5 rounded p-0.5 hover:bg-indigo-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <FieldError message={error ?? undefined} />
    </Modal>
  );
}
