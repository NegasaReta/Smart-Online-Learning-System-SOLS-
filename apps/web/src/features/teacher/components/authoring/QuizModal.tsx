import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useT } from "../../../../i18n/I18nProvider";
import type { Quiz, QuizQuestion } from "../../data/authoring";
import { authoringActions, useAuthoringStore } from "../../state/authoringStore";
import { FieldError, FieldLabel, Modal, inputCls } from "./Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated?: (q: Quiz) => void;
};

const newQuestion = (): QuizQuestion => ({
  id: `qq-${Math.random().toString(36).slice(2, 8)}`,
  prompt: "",
  options: ["", "", "", ""],
  correctIndex: 0,
  points: 1,
});

export function QuizModal({ open, onClose, onCreated }: Props) {
  const t = useT();
  const courses = useAuthoringStore((s) => s.courses);
  const courseOptions = useMemo(
    () => (courses.length ? courses.map((c) => c.title) : ["General"]),
    [courses]
  );

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState(courseOptions[0]);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("20");
  const [dueDate, setDueDate] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([newQuestion()]);
  const [error, setError] = useState<string | null>(null);

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const updateQ = (id: string, patch: Partial<QuizQuestion>) => {
    setQuestions((arr) =>
      arr.map((q) => (q.id === id ? { ...q, ...patch } : q))
    );
  };
  const updateOption = (id: string, idx: number, value: string) => {
    setQuestions((arr) =>
      arr.map((q) =>
        q.id === id
          ? { ...q, options: q.options.map((o, i) => (i === idx ? value : o)) }
          : q
      )
    );
  };

  const submit = (publish: boolean) => {
    setError(null);
    if (!title.trim()) return setError(t("Quiz title is required."));
    if (!course.trim()) return setError(t("Select a course."));
    if (questions.length === 0)
      return setError(t("Add at least one question."));
    for (const q of questions) {
      if (!q.prompt.trim()) return setError(t("Every question needs a prompt."));
      if (q.options.some((o) => !o.trim()))
        return setError(t("Every option must be filled in."));
    }

    const created = authoringActions.addQuiz({
      title: title.trim(),
      course,
      description: description.trim(),
      durationMinutes: Number(duration) || 0,
      dueDate,
      questions,
      published: publish,
    });
    onCreated?.(created);
    // reset
    setTitle("");
    setDescription("");
    setDueDate("");
    setQuestions([newQuestion()]);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t("Create Quiz")}
      description={t("Build a quiz with multiple-choice questions and assign it to a course.")}
      size="lg"
      footer={
        <>
          <p className="mr-auto text-xs font-medium text-slate-500">
            {questions.length} {questions.length !== 1 ? t("questions") : t("question")} ·{" "}
            {totalPoints} {t("pt total")}
          </p>
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
            {t("Publish Quiz")}
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FieldLabel required>{t("Quiz title")}</FieldLabel>
          <input
            className={inputCls}
            placeholder="Chapter 4 Comprehension Quiz"
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
          <FieldLabel>{t("Duration (minutes)")}</FieldLabel>
          <input
            type="number"
            min={1}
            className={inputCls}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <FieldLabel>{t("Due date")}</FieldLabel>
          <input
            type="date"
            className={inputCls}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel>{t("Description")}</FieldLabel>
          <textarea
            rows={2}
            className={inputCls}
            placeholder={t("Optional instructions for students.")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-900">{t("Questions")}</h4>
          <button
            type="button"
            onClick={() => setQuestions((qs) => [...qs, newQuestion()])}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-3.5 w-3.5" />
            {t("Add question")}
          </button>
        </div>

        <ol className="mt-3 space-y-4">
          {questions.map((q, i) => (
            <li
              key={q.id}
              className="rounded-xl border border-slate-200 bg-slate-50/40 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t("Question")} {i + 1}
                </p>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setQuestions((arr) => arr.filter((x) => x.id !== q.id))
                    }
                    className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-rose-600"
                    aria-label="Remove question"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="mt-2">
                <input
                  className={inputCls}
                  placeholder={t("Type your question...")}
                  value={q.prompt}
                  onChange={(e) => updateQ(q.id, { prompt: e.target.value })}
                />
              </div>

              <ul className="mt-3 space-y-2">
                {q.options.map((opt, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${q.id}`}
                      checked={q.correctIndex === idx}
                      onChange={() => updateQ(q.id, { correctIndex: idx })}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <input
                      className={`${inputCls} flex-1`}
                      placeholder={`Option ${idx + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(q.id, idx, e.target.value)}
                    />
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center gap-3">
                <FieldLabel>{t("Points")}</FieldLabel>
                <input
                  type="number"
                  min={1}
                  className={`${inputCls} w-24`}
                  value={q.points}
                  onChange={(e) =>
                    updateQ(q.id, { points: Number(e.target.value) || 0 })
                  }
                />
                <p className="text-xs text-slate-500">
                  {t("Correct answer:")}{" "}
                  <span className="font-semibold text-slate-700">
                    {t("Option")} {q.correctIndex + 1}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <FieldError message={error ?? undefined} />
    </Modal>
  );
}
