import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  CheckCircle2,
  CloudUpload,
  FileText,
  MessageCircle,
  Trash2,
  Upload,
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import {
  fetchAssignmentById,
  type Assignment,
} from "../data/assignmentsData";

/**
 * AssignmentDetailPage — opens when a user clicks any action on the
 * Assignments table. Shows the brief, requirements, and a working file
 * upload + submit flow (entirely client-side; the upload is mocked but
 * the UX flow is fully wired).
 */
export default function AssignmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchAssignmentById(id ?? "").then((a) => {
      if (!active) return;
      setAssignment(a);
      setSubmitted(a?.status === "submitted" || a?.status === "graded");
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [id]);

  function onFilesPicked(picked: FileList | null) {
    if (!picked) return;
    setFiles((prev) => [...prev, ...Array.from(picked)]);
  }

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  function handleSubmit() {
    if (files.length === 0) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFiles([]);
    }, 900);
  }

  return (
    <div className="flex min-h-screen bg-surface-page font-sans text-ink-900">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="mx-auto w-full max-w-[1100px] flex-1 px-8 pb-12 pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-brand"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back
          </button>

          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-ink-500"
          >
            <Link to="/student/assignments" className="hover:text-ink-700">
              Assignments
            </Link>
            <ChevronRight className="size-4" aria-hidden />
            <span className="text-ink-900">{assignment?.title ?? "Loading"}</span>
          </nav>

          {loading && (
            <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center text-sm text-ink-500">
              Loading assignment…
            </div>
          )}

          {!loading && !assignment && (
            <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center">
              <p className="text-sm text-ink-700">
                Assignment not found.{" "}
                <Link
                  to="/student/assignments"
                  className="font-semibold text-brand hover:underline"
                >
                  Back to Assignments
                </Link>
              </p>
            </div>
          )}

          {assignment && (
            <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
              {/* Main */}
              <div className="flex flex-col gap-5">
                {/* Title block */}
                <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card animate-fade-in-up">
                  <span className="inline-flex rounded-md bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                    {assignment.subject}
                  </span>
                  <h1 className="mt-2 text-2xl font-bold text-ink-900">
                    {assignment.title}
                  </h1>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
                    <CalendarDays className="size-3.5" aria-hidden />
                    Due: {assignment.due} · Out of {assignment.maxPoints} points
                  </p>
                </section>

                {/* Description */}
                <section
                  className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card animate-fade-in-up"
                  style={{ animationDelay: "80ms" }}
                >
                  <h2 className="text-sm font-bold text-ink-900">
                    Description
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-ink-700">
                    {assignment.description}
                  </p>

                  <h3 className="mt-4 text-sm font-bold text-ink-900">
                    Requirements
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {assignment.requirements.map((r) => (
                      <li
                        key={r}
                        className="flex items-start gap-2 text-sm text-ink-700"
                      >
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-emerald-600"
                          aria-hidden
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Submission area (only for non-graded) */}
                {assignment.status !== "graded" && (
                  <section
                    className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card animate-fade-in-up"
                    style={{ animationDelay: "160ms" }}
                  >
                    <h2 className="text-sm font-bold text-ink-900">
                      {submitted ? "Submission" : "Submit Work"}
                    </h2>

                    {submitted ? (
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                        <CheckCircle2 className="size-4" aria-hidden />
                        Submitted successfully. You can upload new files to
                        replace the previous submission.
                      </div>
                    ) : null}

                    <label
                      htmlFor="file-upload"
                      className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-200 bg-surface-page px-6 py-8 text-center transition hover:border-brand/60 hover:bg-brand/5"
                    >
                      <CloudUpload
                        className="size-8 text-ink-500"
                        aria-hidden
                      />
                      <p className="text-sm font-semibold text-ink-700">
                        Click to choose files or drop them here
                      </p>
                      <p className="text-xs text-ink-500">
                        PDF or DOCX, max 25 MB each
                      </p>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => onFilesPicked(e.target.files)}
                    />

                    {files.length > 0 && (
                      <ul className="mt-3 flex flex-col gap-2">
                        {files.map((f) => (
                          <li
                            key={f.name}
                            className="flex items-center gap-3 rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm"
                          >
                            <FileText
                              className="size-4 shrink-0 text-rose-500"
                              aria-hidden
                            />
                            <span className="min-w-0 flex-1 truncate font-medium text-ink-900">
                              {f.name}
                            </span>
                            <span className="text-xs text-ink-500">
                              {(f.size / 1024).toFixed(0)} KB
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(f.name)}
                              aria-label="Remove file"
                              className="rounded-md p-1 text-ink-500 hover:bg-ink-100 hover:text-rose-600"
                            >
                              <Trash2 className="size-3.5" aria-hidden />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={files.length === 0 || submitting}
                      className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white shadow-card transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Upload className="size-4" aria-hidden />
                      {submitting
                        ? "Submitting…"
                        : submitted
                          ? "Re-submit Files"
                          : "Submit Assignment"}
                    </button>
                  </section>
                )}

                {/* Feedback (graded only) */}
                {assignment.feedback && (
                  <section
                    className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-card animate-fade-in-up"
                    style={{ animationDelay: "160ms" }}
                  >
                    <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-700">
                      <MessageCircle className="size-4" aria-hidden />
                      Teacher Feedback
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-ink-700">
                      {assignment.feedback}
                    </p>
                    <p className="mt-3 text-2xl font-bold text-emerald-700">
                      {assignment.score}
                    </p>
                  </section>
                )}
              </div>

              {/* Right rail */}
              <aside
                className="self-start rounded-2xl border border-ink-200 bg-white p-5 shadow-card animate-fade-in-up"
                style={{ animationDelay: "120ms" }}
              >
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-500">
                  Status
                </h3>
                <p className="mt-1.5 text-base font-bold capitalize text-ink-900">
                  {assignment.status.replace("-", " ")}
                </p>

                <hr className="my-4 border-ink-100" />
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-500">
                  Score
                </h3>
                <p className="mt-1.5 text-base font-bold text-ink-900">
                  {assignment.score}
                </p>

                <hr className="my-4 border-ink-100" />
                <Link
                  to="/student/assignments"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2 text-xs font-semibold text-ink-700 transition hover:bg-ink-50"
                >
                  All Assignments
                </Link>
              </aside>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
