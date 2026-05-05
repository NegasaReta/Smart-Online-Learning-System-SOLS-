# Parent Report Card — Backend Specification

> Audience: Backend team
> Frontend route: `#/parent` → **Report Card** tab
> Frontend file: `apps/web/src/features/parent/pages/ParentReport.tsx`

---

## 1. Overview

The **Parent Report Card** page renders a printable, term-based academic
report for a single child linked to a parent account. It aggregates data
already used elsewhere in the parent portal (subjects, GPA, attendance,
assessments, AI insights) into one cohesive document that the parent can
view, print, or download as CSV/PDF.

The frontend currently uses mock data from:
- `features/parent/data/progress.ts`
- `features/parent/data/activity.ts`

The backend should expose a single endpoint that returns the same shape so
the existing UI works without changes.

---

## 2. Primary Endpoint

### `GET /api/parents/{parentId}/children/{childId}/report`

Returns the full report-card payload for one child for the requested term.

**Path params**
| Name       | Type   | Description                                |
|------------|--------|--------------------------------------------|
| `parentId` | string | Authenticated parent's user ID             |
| `childId`  | string | Linked student ID (must belong to parent)  |

**Query params**
| Name     | Type                                    | Default     | Description                |
|----------|-----------------------------------------|-------------|----------------------------|
| `period` | `"month"` \| `"semester"` \| `"year"`   | `semester`  | Reporting window           |
| `termId` | string (optional)                       | current     | Specific term, e.g. `2024-S1` |

**Auth**: Bearer token. Backend MUST verify that `childId` is in the
parent-child link table for `parentId`. Return `403` otherwise.

**Response**: `200 OK` with `application/json` — see schema in §4.

**Errors**
| Status | Reason                                         |
|--------|------------------------------------------------|
| 401    | Missing / invalid token                        |
| 403    | Child not linked to this parent                |
| 404    | Child or term not found                        |
| 422    | Invalid `period` value                         |

---

## 3. Secondary Endpoints (optional, for export)

### `GET /api/parents/{parentId}/children/{childId}/report.csv`
Returns a CSV file (Content-Disposition: attachment) with the same data.
Frontend currently builds CSV client-side; server-side is preferred for
large datasets and audit trails.

### `GET /api/parents/{parentId}/children/{childId}/report.pdf`
Returns a generated PDF. Optional — frontend uses `window.print()` today.

---

## 4. Response Schema

```jsonc
{
  "generatedAt": "2025-01-15T08:30:00Z",
  "period": "semester",

  "school": {
    "id": "sch_001",
    "name": "EduSmart Academy",
    "address": "Addis Ababa, Ethiopia",
    "logoUrl": "https://cdn.example.com/schools/sch_001.png"
  },

  "term": {
    "id": "2024-S1",
    "label": "Semester 1, 2024–25",
    "startDate": "2024-09-01",
    "endDate": "2025-01-15"
  },

  "student": {
    "id": "STU-2024-0042",
    "fullName": "Alex Johnson",
    "grade": "Grade 10",
    "section": "Section A",
    "avatarUrl": "https://cdn.example.com/students/STU-2024-0042.jpg"
  },

  "summary": {
    "gpa": 3.8,
    "gpaDeltaLabel": "+0.2 from last semester",
    "weeklyActiveHours": 14.5,
    "weeklyGoalHours": 20,
    "topSubject": "Physics"
  },

  "subjects": [
    {
      "id": "math",
      "name": "Mathematics",
      "grade": "A",
      "scorePct": 92,
      "attendancePct": 98,
      "teacher": "Mr. R. Bekele",
      "remarks": "Top decile performance across calculus, algebra, and problem-solving units.",
      "assessments": [
        { "name": "Mid-Term Exam",  "score": 95, "outOf": 100, "date": "2024-09-22" },
        { "name": "Algebra Quiz",   "score": 92, "outOf": 100, "date": "2024-10-18" },
        { "name": "Geometry Test",  "score": 88, "outOf": 100, "date": "2024-11-03" }
      ]
    }
  ],

  "strengths": [
    "Alex demonstrates exceptional problem-solving skills in Mathematics..."
  ],
  "opportunities": [
    "Encourage more structured reading time at home..."
  ]
}
```

### Field notes
- `score` of `0` with `date: "pending"` means the assessment has not yet
  been graded; frontend renders it as "Pending".
- `grade` is the letter grade (`A`, `A-`, `B+`, …). Backend computes it
  from `scorePct` using the school's grading scale.
- `gpa` is on a 4.0 scale, two decimals.
- All percentages are integers `0–100`.
- `remarks` is a short teacher-authored summary; max ~300 chars.

---

## 5. Data Sources / Computation

| Field                  | Source / How to compute                                         |
|------------------------|-----------------------------------------------------------------|
| `summary.gpa`          | Weighted avg of subject grade points for the period             |
| `summary.gpaDeltaLabel`| Difference vs. previous period of same type                     |
| `summary.weeklyActiveHours` | Sum of student session hours in last 7 days                |
| `summary.weeklyGoalHours`   | School-level config (default 20)                           |
| `summary.topSubject`        | Subject with highest `scorePct` this period                |
| `subjects[].scorePct`       | Avg of `assessments[].score / outOf * 100`                 |
| `subjects[].grade`          | Apply grading scale to `scorePct`                          |
| `subjects[].attendancePct`  | Attended sessions ÷ total sessions × 100                   |
| `subjects[].remarks`        | Latest teacher remark for the term, falls back to AI summary |
| `strengths`, `opportunities`| AI-generated; cached per term, regenerated weekly          |

---

## 6. Caching & Performance

- Cache the assembled response per `(childId, period, termId)` for **1 hour**.
- Invalidate on: new grade entry, attendance update, teacher remark change.
- Expected payload size: 4–10 KB.
- Target p95 latency: **< 400 ms**.

---

## 7. Authorization Matrix

| Role     | Can call endpoint?                                |
|----------|----------------------------------------------------|
| Parent   | Yes, only for their own linked children            |
| Teacher  | No (use teacher-specific endpoints)                |
| Admin    | Yes, for any child (audit-logged)                  |
| Student  | Yes, only for themselves                           |

---

## 8. Internationalization

The backend returns **raw English strings** for `remarks`, `strengths`,
`opportunities`. The frontend handles translation via the existing i18n
layer (English / Amharic / Afaan Oromoo). Do **not** localize on the server.

Exception: `term.label` may be localized later via a separate `lang`
query param if needed.

---

## 9. Audit / Logging

Every successful response should write an audit entry:

```
event:        parent_report_viewed
parentId:     <id>
childId:      <id>
termId:       <id>
ipAddress:    <ip>
userAgent:    <ua>
timestamp:    <iso>
```

PDF / CSV downloads should be logged with `event: parent_report_exported`
and the export format.

---

## 10. Acceptance Criteria

- [ ] Endpoint returns the schema in §4 exactly (key names + nesting).
- [ ] `403` is returned when parent is not linked to the child.
- [ ] `period=month|semester|year` each return correctly scoped data.
- [ ] Pending assessments are represented as `score: 0, date: "pending"`.
- [ ] GPA delta label reflects the previous period of the same type.
- [ ] Audit log entry is written on every successful call.
- [ ] p95 latency under 400 ms with cache warm.
- [ ] CSV export endpoint produces a file matching frontend column order:
      `Subject, Grade, Score, Attendance, Teacher, Remarks`.

---

## 11. Sample cURL

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://api.edusmart.example.com/api/parents/p_123/children/STU-2024-0042/report?period=semester"
```

---

## 12. Open Questions for Backend Team

1. Will `strengths` / `opportunities` be generated by the existing AI
   service, or do we need a new pipeline?
2. Do we expose attempt-level data (per-question quiz answers), or only
   aggregated assessment scores?
3. PDF rendering: server-side (e.g. headless Chromium) or keep client-side
   `window.print()`?
4. Should the report include behavioral / conduct notes? (Currently not
   in the UI.)
5. Multi-child parents: is there a separate "all children" rollup endpoint
   needed, or do we always fetch per child?
