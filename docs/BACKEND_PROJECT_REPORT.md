# SOLS — Backend Project Report

**Smart Online Learning System (SOLS)** — a multi-portal K-12 platform.
Branch analysed: `development` @ commit `2989d7b` (frontend complete for all four
portals).

This document is intended as a working brief for the backend team. It maps every
screen, action, and data shape that the frontend currently expects so the
backend can be delivered in parallel without guessing intent.

---

## Table of contents

1. [Executive Summary](#1-executive-summary)
2. [Frontend Architecture (so you know what you're integrating with)](#2-frontend-architecture)
3. [The Four Portals](#3-the-four-portals)
4. [Authentication, Roles & Authorization](#4-authentication-roles--authorization)
5. [Domain Model / Recommended Database Schema](#5-domain-model--recommended-database-schema)
6. [REST API Surface (by portal)](#6-rest-api-surface-by-portal)
7. [Real-Time / Notifications](#7-real-time--notifications)
8. [File Storage](#8-file-storage)
9. [Internationalization (i18n)](#9-internationalization-i18n)
10. [Security Checklist](#10-security-checklist)
11. [Suggested Backend Project Structure](#11-suggested-backend-project-structure)
12. [Recommended Phased Delivery Plan](#12-recommended-phased-delivery-plan)
13. [Open Questions for the Backend Team](#13-open-questions)
14. [Appendix — File-by-file pointer index](#14-appendix--file-pointers)

---

## 1. Executive summary

| Aspect | Status |
|---|---|
| Frontend portals built | ✅ Admin, Student, Parent, Teacher (all routes render) |
| Backend integration | ❌ Not started — frontend currently uses mocks + `localStorage` |
| Auth provider in place | Clerk (publishable key via `VITE_CLERK_PUBLISHABLE_KEY`) — but most pages still bypass it for preview mode |
| API client stub | `apps/web/src/services/api.ts` (only `/health` + `/api/student/me`) |
| Languages supported | English, Amharic (አማርኛ), Afaan Oromoo |
| Persistent state today | Browser `localStorage` (theme, language, teacher authoring drafts) |

**The single biggest task** for backend is replacing dozens of in-memory mock
arrays (e.g. `INITIAL_COURSES`, `MOCK_USERS`, `STUDENTS_DB`) with real REST or
GraphQL endpoints, and wiring real auth + RBAC into every portal's protected
routes.

---

## 2. Frontend architecture

### Stack

- **Framework:** React 18 + Vite 5 + TypeScript 5
- **Styling:** Tailwind CSS 3 + custom `ink/surface/brand` palette
- **Routing:** `react-router-dom` v6 (`BrowserRouter` in `apps/web/src/main.tsx`)
- **Forms:** `react-hook-form` + `zod` validation (`apps/web/src/features/auth/validation/`)
- **Auth client:** `@clerk/clerk-react` v5 (provider in `apps/web/src/app/providers/ClerkProvider.tsx`)
- **Charts:** `recharts` 3.x
- **Icons:** `lucide-react`
- **i18n:** custom provider — `apps/web/src/i18n/I18nProvider.tsx`
- **API client:** thin `fetch` wrapper — `apps/web/src/services/api.ts`

### Where the routes live

All protected portals are mounted in the central router:

> `apps/web/src/app/router.tsx`

```
/                       → Landing page
/login                  → LoginPage  (role: student | teacher | admin)
/register               → RegisterPage (role: student | teacher | parent)
/complete-profile       → CompleteProfilePage

/admin/*                → 18 admin pages (dashboard, teachers, parents, courses,
                          enrollments, students, calendar, tasks, reports,
                          users, analytics, account, attendance, exams,
                          messages, announcements, manage-pages)
/student/*              → Dashboard, Classes, Assignments, Schedule, Grades,
                          Resources, Assessments, Settings (security /
                          preferences / academic), CourseDetail, AssignmentDetail,
                          AssessmentDetail, LessonPlayer
/parent/*               → ParentPortalRoot — Dashboard, Child Progress, Report
                          Card, Activity Logs, Settings
/teacher/*              → TeacherPortal — Dashboard, Class Management,
                          Authoring (Courses/Quizzes/Assignments), Subject
                          Resources, Student Feedback, Performance Analytics,
                          Settings
```

### Persistent state today (in browser)

| Key | Lives in | Purpose |
|---|---|---|
| `edusmart.locale` | `I18nProvider.tsx` | Active locale (`en` / `am` / `om`) |
| `sols.lang.v1` | (legacy from teammate's branch — same purpose) |
| `sols.preferences.v1` | `apps/web/src/features/student/settings/preferencesStore.ts` | Theme, font size, high-contrast |
| `sols.teacher.authoring.v1` | `apps/web/src/features/teacher/state/authoringStore.ts` | Teacher's draft courses/quizzes/assignments |

> Backend should **persist all of these per-user** (preferences belong on the
> user record; teacher drafts belong in the database).

---

## 3. The four portals

### 3.1 Admin portal (`/admin/*`)

**Audience:** school administrators / superusers.
**Sidebar:** `apps/web/src/features/admin/components/AdminSidebar.tsx`

Pages and their primary data needs:

| Route | Page | What backend must provide |
|---|---|---|
| `/admin/dashboard` | `AdminDashboardPage` | Aggregate counts (students, teachers, parents, classes, fee status, exam-results timeseries, gender split, attendance %, top performers) |
| `/admin/teachers` | `AdminTeachersPage` | CRUD + filter/search teachers |
| `/admin/parents` | `AdminParentsPage` | CRUD + filter parents (linked-student counts) |
| `/admin/students` | `AdminStudentsPage` | CRUD students (extends users) |
| `/admin/courses` | `AdminCoursesPage` | CRUD courses; subject, level, duration, modules, status (Active/Draft/Archived), assigned teacher, syllabus, rating |
| `/admin/enrollments` | `AdminEnrollmentsPage` | Approve / reject / list / search enrollments; status: Approved \| Pending \| Rejected |
| `/admin/calendar` | `AdminCalendarPage` | Events / school calendar |
| `/admin/tasks` | `AdminTasksPage` | Internal task / kanban |
| `/admin/reports` | `AdminReportsPage` | Generated reports |
| `/admin/users` | `AdminUserManagementPage` | Cross-role user management (Admin, Teacher, Student, Parent); statuses: Active \| Inactive \| Suspended \| Pending |
| `/admin/analytics` | `AdminAnalyticsPage` | KPI tiles + chart series |
| `/admin/account` | `AdminAccountPage` | Profile, security (password / 2FA), preferences (theme/font/lang), activity log |
| `/admin/attendance` | `AdminAttendancePage` | Daily attendance roster |
| `/admin/exams` | `AdminExamsPage` | Exam scheduling |
| `/admin/messages` | `AdminMessagesPage` | Inbox / threads |
| `/admin/announcements` | `AdminAnnouncementsPage` | Broadcasts |
| `/admin/manage-pages` | `AdminManagePagesPage` | CMS-ish — control which pages are visible (placeholder) |

### 3.2 Student portal (`/student/*`)

**Sidebar:** `apps/web/src/features/student/components/Sidebar.tsx`
**Mock data:** `apps/web/src/features/student/data/*.ts`

| Route | Page | Data |
|---|---|---|
| `/student/dashboard` | `StudentDashboardPage` | "Up next" lesson, learning path, current courses, recent grades, overall progress, weekly study hours, skills radar, encouragement |
| `/student/classes` | `MyClassesPage` | List + grid of enrolled courses |
| `/student/classes/:slug` | `CourseDetailPage` | Course overview, modules, lessons |
| `/student/classes/:slug/lesson/:lessonId` | `LessonPlayerPage` | Video / content + progress save |
| `/student/assignments` | `AssignmentsPage` | List, status, due dates |
| `/student/assignments/:id` | `AssignmentDetailPage` | Submit assignment (file upload + text) |
| `/student/assessments` | `AssessmentsPage` | Quizzes/tests list |
| `/student/assessments/:id` | `AssessmentDetailPage` | Take assessment, submit answers, see score |
| `/student/schedule` | `SchedulePage` | Weekly calendar |
| `/student/grades` | `GradesPage` | All grades, GPA, per-subject breakdown |
| `/student/resources` | `ResourcesPage` | PDFs, videos, links |
| `/student/settings/security` | `SettingsSecurityPage` | Password, 2FA, sessions |
| `/student/settings/preferences` | `SettingsPreferencesPage` | Theme, font size, language |
| `/student/settings/academic` | `SettingsAcademicPage` | Academic profile |

### 3.3 Parent portal (`/parent/*`)

Internal state-based navigation (no nested routes; sub-pages are switched in
`apps/web/src/features/parent/ParentPortalRoot.tsx`).

| Sub-page | Component | Data |
|---|---|---|
| Dashboard | `ParentDashboard` | Welcome banner, child summary, current subjects, recent activity, notifications |
| Child Progress | `ChildProgress` | KPI cards, period toggle (Term/Year), per-subject performance, strengths & opportunities, subject detail modal |
| Report Card | `ParentReport` | Term report card |
| Activity Logs | `ActivityLogs` | Filterable timeline of child's activity |
| Settings | `ParentSettings` | Profile, notifications, security, preferences, linked children, danger zone (delete account) |

> A parent account is **linked to one or more student accounts**. The selected
> child should be derivable either from a `?childId=…` query string or a
> per-parent "active child" stored in localStorage and mirrored on the server.

### 3.4 Teacher portal (`/teacher/*`)

Internal state-based navigation; entry: `apps/web/src/features/teacher/TeacherPortal.tsx`.

| Sub-page | Component | Data |
|---|---|---|
| Dashboard | `TeacherDashboard` | Welcome banner with pending feedback count, stat cards, class performance chart, pending feedback list, notifications |
| Class Management | `ClassManagement` | Class header, KPI cards, tabs: Roster, Gradebook, Attendance, Grade Distribution, Announcements; Edit-class modal, Grade-report modal |
| Authoring | `Authoring` | Tabs for Courses / Quizzes / Assignments. Modal-based create + publish/unpublish/delete. **Currently saved to `localStorage`** |
| Subject Resources | `SubjectResources` | Filterable resource cards (filter by subject + grade) + add modal |
| Student Feedback | `StudentFeedback` | Threaded feedback list, mark resolved, send reply, CSV export |
| Performance Analytics | `PerformanceAnalytics` | KPI cards, trend chart, grade distribution, smart insights, student roster |
| Settings | `TeacherSettings` | Profile, teaching assignments, notifications, security, preferences, danger zone |

---

## 4. Authentication, roles & authorization

### Login (`apps/web/src/features/auth/validation/login.schema.ts`)

```ts
{
  role: "student" | "teacher" | "admin",
  email: string,
  password: string (min 8),
  rememberMe?: boolean
}
```

### Register (`apps/web/src/features/auth/validation/register.schema.ts`)

```ts
{
  role: "student" | "teacher" | "parent",   // admin is invite-only
  fullName: string (2-80),
  email: string,
  password: string (min 8, must contain upper, lower, digit),
  acceptTerms: true
}
```

### Roles seen across the app

`Admin | Teacher | Student | Parent` — see
`apps/web/src/features/admin/pages/AdminUserManagementPage.tsx:10`.

### Required behaviour from backend

1. **JWT or session cookie** issued on login. Clerk is wired up but the team can
   choose either (1) Clerk hosted auth or (2) a custom JWT auth — frontend
   already supports both via the `VITE_AUTH_PREVIEW` env flag.
2. `POST /auth/login` → `{ token, user }`. `user` shape:
   ```ts
   {
     id: string, email: string, name: string, avatarUrl?: string,
     role: "admin" | "teacher" | "student" | "parent",
     status: "active" | "inactive" | "suspended" | "pending",
     locale: "en" | "am" | "om",
     createdAt: ISOString
   }
   ```
3. `POST /auth/register` (student/teacher/parent only — admin invite-only).
4. `GET /auth/me` returning the same shape — used to gate routes after a refresh.
5. `POST /auth/logout`.
6. `POST /auth/forgot-password` and `POST /auth/reset-password`.
7. **RBAC middleware**: every endpoint listed in §6 must enforce the allowed
   roles indicated in the right-hand column.
8. **Tenant scoping**: `parent` accounts can only read data for their linked
   students; `teacher` accounts only for classes they own.

---

## 5. Domain model / recommended database schema

Below is a normalised proposal. Names follow the frontend's vocabulary so the
mapping is obvious. SQL flavour is illustrative — adapt to your ORM.

### Users & identity

```
User
  id              uuid pk
  email           citext unique not null
  password_hash   text                       -- if not using Clerk
  full_name       text
  avatar_url      text
  phone           text
  role            enum('admin','teacher','student','parent')
  status          enum('active','inactive','suspended','pending') default 'pending'
  locale          enum('en','am','om') default 'en'
  preferences     jsonb                      -- theme, font_size, high_contrast
  last_login_at   timestamptz
  created_at      timestamptz
  updated_at      timestamptz

StudentProfile  (1:1 with User where role='student')
  user_id           uuid fk → User.id pk
  student_code      text unique               -- e.g. "PRE43178"
  grade             text                      -- "Grade 9".."Grade 12"
  gpa               numeric(3,2)
  enrolled_on       date
  parent_user_id    uuid? fk → User.id        -- legacy single-parent link

TeacherProfile  (1:1 with User where role='teacher')
  user_id           uuid fk → User.id pk
  department        text
  subjects          text[]
  hired_on          date

ParentProfile  (1:1 with User where role='parent')
  user_id           uuid fk → User.id pk
  occupation        text

ParentStudent  (M:N — a parent can have multiple children)
  parent_user_id    uuid fk → User.id
  student_user_id   uuid fk → User.id
  primary key (parent_user_id, student_user_id)
```

### Academic core

```
Course
  id            uuid pk
  title         text
  subject       text          -- "Biology", "Mathematics", …
  description   text
  level         text          -- "Beginner" | "Intermediate" | "Advanced"
  duration      text
  modules_count int
  rating        numeric(2,1)
  status        enum('active','draft','archived')
  start_date    date
  syllabus      text[]
  teacher_id    uuid fk → User.id (role='teacher')
  capacity      int
  schedule      text          -- "Mon, Wed, Fri • 9:00 AM"
  room          text
  created_at    timestamptz

Enrollment
  id            uuid pk
  student_id    uuid fk → User.id
  course_id     uuid fk → Course.id
  status        enum('approved','pending','rejected')
  enrolled_on   date
  approved_by   uuid? fk → User.id (admin)
  approved_at   timestamptz
  unique (student_id, course_id)

Module           -- a course is broken into modules
  id            uuid pk
  course_id     uuid fk
  title         text
  position      int

Lesson
  id            uuid pk
  module_id     uuid fk
  title         text
  type          enum('video','reading','quiz','assignment')
  content_url   text          -- video/PDF in object storage
  duration_min  int
  position      int

LessonProgress  -- tracks per-student lesson completion
  student_id    uuid fk
  lesson_id     uuid fk
  status        enum('not_started','in_progress','completed')
  watched_seconds int
  updated_at    timestamptz
  primary key (student_id, lesson_id)
```

### Assignments / quizzes / grades

```
Assignment
  id            uuid pk
  course_id     uuid fk
  teacher_id    uuid fk
  title         text
  instructions  text
  due_at        timestamptz
  total_points  int
  allow_late    bool
  attachments   text[]                       -- s3 URLs
  published     bool default false
  created_at    timestamptz

AssignmentSubmission
  id            uuid pk
  assignment_id uuid fk
  student_id    uuid fk
  content       text
  attachments   text[]
  submitted_at  timestamptz
  grade         numeric(5,2)?
  feedback      text?
  graded_by     uuid? fk → User.id
  graded_at     timestamptz?

Quiz
  id            uuid pk
  course_id     uuid fk
  teacher_id    uuid fk
  title         text
  description   text
  duration_min  int
  due_at        timestamptz
  published     bool

QuizQuestion
  id            uuid pk
  quiz_id       uuid fk
  prompt        text
  options       jsonb         -- string[]
  correct_index int
  points        int
  position      int

QuizAttempt
  id            uuid pk
  quiz_id       uuid fk
  student_id    uuid fk
  answers       jsonb         -- index per question
  score         numeric(5,2)
  started_at    timestamptz
  submitted_at  timestamptz

Grade   -- generic gradebook entry (also produced by submissions/attempts)
  id            uuid pk
  student_id    uuid fk
  course_id     uuid fk
  source_type   enum('assignment','quiz','exam','manual')
  source_id     uuid?
  score         numeric(5,2)
  max_score     numeric(5,2)
  recorded_at   timestamptz
```

### Attendance & exams

```
Attendance
  id            uuid pk
  course_id     uuid fk
  student_id    uuid fk
  date          date
  status        enum('present','absent','late','excused')
  recorded_by   uuid fk → User.id (teacher)

Exam
  id            uuid pk
  course_id     uuid fk
  title         text
  scheduled_at  timestamptz
  duration_min  int
  total_points  int

ExamResult
  exam_id       uuid fk
  student_id    uuid fk
  score         numeric(5,2)
  primary key (exam_id, student_id)
```

### Communication

```
Notification
  id            uuid pk
  user_id       uuid fk          -- recipient
  type          enum('grade','assignment','attendance','system','feedback')
  title         text
  body          text
  link          text?
  unread        bool default true
  created_at    timestamptz

MessageThread
  id            uuid pk
  subject       text
  last_message_at timestamptz

MessageThreadParticipant
  thread_id     uuid fk
  user_id       uuid fk
  primary key (thread_id, user_id)

Message
  id            uuid pk
  thread_id     uuid fk
  sender_id     uuid fk
  body          text
  attachments   text[]
  sent_at       timestamptz

Feedback   -- teacher-to-student feedback used by /teacher/feedback
  id            uuid pk
  teacher_id    uuid fk
  student_id    uuid fk
  course_id     uuid? fk
  subject       text
  body          text
  status        enum('open','resolved')
  created_at    timestamptz

Announcement
  id            uuid pk
  author_id     uuid fk → User.id
  audience      enum('all','students','teachers','parents','course')
  course_id     uuid? fk
  title         text
  body          text
  published_at  timestamptz
```

### Resources, calendar, activity logs

```
Resource
  id            uuid pk
  uploaded_by   uuid fk
  title         text
  description   text
  type          enum('Video','PDF','Link','Image','Other')
  subject       text
  grade         text
  url           text
  thumbnail_url text?
  created_at    timestamptz

CalendarEvent
  id            uuid pk
  owner_id      uuid? fk      -- null = school-wide
  title         text
  description   text
  starts_at     timestamptz
  ends_at       timestamptz
  type          enum('class','exam','holiday','meeting','other')

ActivityLog   -- powers parent activity timeline + admin audit
  id            uuid pk
  actor_id      uuid fk
  subject_id    uuid?         -- the student the activity is about
  type          text          -- "quiz.completed", "lesson.viewed", …
  metadata      jsonb
  created_at    timestamptz
```

---

## 6. REST API surface (by portal)

> **Conventions**
> - Base URL: `${VITE_API_BASE_URL}` (default `http://localhost:4000`)
> - All responses JSON. Errors: `{ error: { code, message } }` with appropriate HTTP status.
> - Pagination: `?page=1&pageSize=20` → `{ data, page, pageSize, total }`
> - Filtering: `?search=foo&status=active&role=student`
> - Auth: `Authorization: Bearer <jwt>` on every non-auth route.
> - Role column shows who's allowed.

### 6.0 Auth (public unless noted)

| Method | Path | Roles | Purpose |
|---|---|---|---|
| `POST` | `/auth/register` | public | Self-signup (student / teacher / parent) |
| `POST` | `/auth/login` | public | Returns `{ token, user }` |
| `POST` | `/auth/logout` | any | Invalidate session |
| `GET`  | `/auth/me` | any | Current user (used on app init) |
| `POST` | `/auth/forgot-password` | public | Send reset email |
| `POST` | `/auth/reset-password` | public | Consume reset token |
| `POST` | `/auth/change-password` | any | Authenticated change |
| `POST` | `/auth/2fa/enable` / `/disable` / `/verify` | any | TOTP 2FA |

### 6.1 Admin (`role=admin`)

| Method | Path | Purpose |
|---|---|---|
| `GET`  | `/admin/dashboard/stats` | Aggregate counts + chart series |
| `GET`  | `/admin/users` | List all users; filters: `role`, `status`, `search`, page |
| `POST` | `/admin/users` | Invite a new user |
| `GET`  | `/admin/users/:id` | Detail |
| `PATCH`| `/admin/users/:id` | Update |
| `PATCH`| `/admin/users/:id/status` | `{ status: active\|inactive\|suspended }` |
| `DELETE`| `/admin/users/:id` | Remove |
| `GET`  | `/admin/teachers` / `POST` / `PATCH` / `DELETE` | Teacher CRUD |
| `GET`  | `/admin/parents` / `POST` / `PATCH` / `DELETE` | Parent CRUD |
| `GET`  | `/admin/students` / `POST` / `PATCH` / `DELETE` | Student CRUD |
| `GET`  | `/admin/courses` / `POST` / `PATCH` / `DELETE` | Course CRUD |
| `GET`  | `/admin/enrollments` | List with filters |
| `POST` | `/admin/enrollments` | Manual enrollment |
| `PATCH`| `/admin/enrollments/:id/approve` | Set status `approved` |
| `PATCH`| `/admin/enrollments/:id/reject`  | Set status `rejected` |
| `DELETE`| `/admin/enrollments/:id` | Remove |
| `GET`  | `/admin/calendar` / `POST` / `PATCH` / `DELETE` | School-wide events |
| `GET`  | `/admin/announcements` / `POST` / `DELETE` | Broadcasts |
| `GET`  | `/admin/messages` | Admin inbox |
| `GET`  | `/admin/attendance?date=…&courseId=…` | Daily roster |
| `GET`  | `/admin/exams` / `POST` / `PATCH` / `DELETE` | Exam scheduling |
| `GET`  | `/admin/reports?type=…&from=…&to=…` | Generated report download |
| `GET`  | `/admin/analytics?metric=…&range=…` | KPI / chart data |
| `GET`  | `/admin/activity-log?since=…` | Audit log |

### 6.2 Student (`role=student`)

| Method | Path | Purpose |
|---|---|---|
| `GET`  | `/student/me` | Profile (already stubbed in `services/api.ts`) |
| `GET`  | `/student/dashboard` | Up-next, learning path, progress, study hours, skills, grades |
| `GET`  | `/student/classes` | Enrolled courses |
| `GET`  | `/student/classes/:slug` | Course detail (modules, lessons, progress) |
| `GET`  | `/student/lessons/:id` | Lesson content |
| `POST` | `/student/lessons/:id/progress` | `{ watchedSeconds, completed }` |
| `GET`  | `/student/assignments` | List with status filter |
| `GET`  | `/student/assignments/:id` | Detail |
| `POST` | `/student/assignments/:id/submit` | `{ content, attachments[] }` |
| `GET`  | `/student/assessments` | Quizzes / exams list |
| `GET`  | `/student/assessments/:id` | Detail (questions hidden until started) |
| `POST` | `/student/assessments/:id/start` | Returns `attemptId` |
| `POST` | `/student/assessments/:id/submit` | `{ answers }` |
| `GET`  | `/student/grades` | All grades + GPA |
| `GET`  | `/student/schedule?week=YYYY-WW` | Weekly calendar |
| `GET`  | `/student/resources` | Filterable list |
| `GET`  | `/student/notifications` | Unread + recent |
| `PATCH`| `/student/notifications/:id/read` | Mark read |
| `GET`  | `/student/preferences` / `PATCH` | Theme, font size, language |

### 6.3 Parent (`role=parent`)

> All endpoints are scoped to `studentId` query param; backend must verify the
> requested student is linked to the calling parent (`ParentStudent` table).

| Method | Path | Purpose |
|---|---|---|
| `GET`  | `/parent/me` | Profile + linked children |
| `GET`  | `/parent/children` | List linked students with summary |
| `GET`  | `/parent/children/:studentId/dashboard` | Welcome/summary |
| `GET`  | `/parent/children/:studentId/progress?period=term\|year` | KPIs + per-subject |
| `GET`  | `/parent/children/:studentId/report` | Term report card |
| `GET`  | `/parent/children/:studentId/activity?type=&from=&to=` | Filtered timeline |
| `GET`  | `/parent/notifications` | Inbox |
| `PATCH`| `/parent/notifications/:id/read` | Mark read |
| `GET`  | `/parent/settings` / `PATCH` | Profile, notification prefs |
| `POST` | `/parent/children/link` | `{ studentCode, relationship }` request to link a child |
| `DELETE`| `/parent/children/:studentId` | Unlink |
| `DELETE`| `/parent/account` | Danger zone — delete account |

### 6.4 Teacher (`role=teacher`)

| Method | Path | Purpose |
|---|---|---|
| `GET`  | `/teacher/me` | Profile + assigned classes |
| `GET`  | `/teacher/dashboard` | Stats, performance chart, pending feedback |
| `GET`  | `/teacher/classes` | List of classes I teach |
| `GET`  | `/teacher/classes/:id` | Class header + KPI |
| `PATCH`| `/teacher/classes/:id` | Edit class info |
| `GET`  | `/teacher/classes/:id/roster` | Students enrolled |
| `GET`  | `/teacher/classes/:id/gradebook` | All grades for the class |
| `POST` | `/teacher/classes/:id/grades` | `{ studentId, sourceType, sourceId, score }` |
| `GET`  | `/teacher/classes/:id/attendance?date=…` / `POST` | Take attendance |
| `GET`  | `/teacher/classes/:id/announcements` / `POST` / `DELETE` | Class announcements |
| `GET`  | `/teacher/classes/:id/grade-distribution` | Histogram |
| `POST` | `/teacher/classes/:id/grade-report` | Generate downloadable report |
| `GET`  | `/teacher/courses` / `POST` / `DELETE` | Authoring — course CRUD |
| `GET`  | `/teacher/quizzes` / `POST` / `DELETE` | Quiz CRUD |
| `PATCH`| `/teacher/quizzes/:id/publish` | Toggle published |
| `GET`  | `/teacher/assignments` / `POST` / `DELETE` | Assignment CRUD |
| `PATCH`| `/teacher/assignments/:id/publish` | Toggle published |
| `GET`  | `/teacher/resources?subject=&grade=` / `POST` / `DELETE` | Subject resources |
| `GET`  | `/teacher/feedback` | All threads I'm involved in |
| `POST` | `/teacher/feedback` | `{ studentId, body }` |
| `POST` | `/teacher/feedback/:id/reply` | Add a reply |
| `PATCH`| `/teacher/feedback/:id/resolve` | Mark resolved |
| `GET`  | `/teacher/feedback/export.csv` | CSV export |
| `GET`  | `/teacher/analytics?range=6w\|term\|year` | Trend, distribution, insights, roster |
| `GET`  | `/teacher/notifications` / `PATCH /:id/read` | Inbox |
| `GET`  | `/teacher/settings` / `PATCH` | Profile, assignments, notifications, security |

---

## 7. Real-time / notifications

Several screens implicitly need live updates. We recommend WebSockets (or
Server-Sent Events) on a single channel per user:

```
GET /ws?token=<jwt>
→ events: { type, payload, ts }
```

Event types in current frontend code:

| Event | Triggered when | Consumed by |
|---|---|---|
| `notification.created` | Any backend action that creates a `Notification` row | Bell badge in Topbar (admin/student/parent/teacher) |
| `enrollment.status_changed` | Admin approves/rejects | Admin enrollments page, student dashboard |
| `assignment.graded` | Teacher posts a grade | Student grades page, parent activity log |
| `feedback.replied` | Either side replies on a feedback thread | Teacher feedback list, student inbox |
| `attendance.recorded` | Teacher marks attendance | Parent activity log |

A polling-only fallback is acceptable for v1 — the Topbars already poll every
~30s in mock form.

---

## 8. File storage

Frontend expects the backend to handle uploads for:

- **Avatars** — `User.avatar_url`
- **Assignment submissions** — multiple files
- **Lesson content** — videos, PDFs (via the lesson player)
- **Resource library** — teacher uploads
- **Message / feedback attachments**

Recommended pattern:

```
POST /uploads/sign      → returns { uploadUrl, fileUrl }
PUT  <uploadUrl>        → client puts the file directly to S3 / Azure Blob
POST /uploads/confirm   → backend records final URL on the parent resource
```

Hard size limits: 50 MB per file, 200 MB total per assignment submission.

---

## 9. Internationalization (i18n)

Frontend ships translation dictionaries in:

- `apps/web/src/i18n/en.json` (canonical English)
- `apps/web/src/i18n/am.json` (Amharic)
- `apps/web/src/i18n/om.json` (Afaan Oromoo)
- `apps/web/src/i18n/translations.ts` + `translations-extra.ts` (additional flat
  keys used by the parent/teacher portals)

The active locale is one of `"en" | "am" | "om"` and is **persisted in
`User.locale`** so it follows the user across devices. Backend should:

1. Echo `locale` in every `GET /auth/me` and `*/me` response.
2. Accept `PATCH /preferences` with `{ locale }` and store on the user record.
3. (Optional v2) Accept `Accept-Language` header on server-rendered emails so
   notification emails are sent in the user's chosen language.

---

## 10. Security checklist

- [ ] **Password hashing:** bcrypt or argon2 (never MD5/SHA-1).
- [ ] **JWT signing key** in env, not committed.
- [ ] **CORS** restricted to the deployed frontend origin(s).
- [ ] **Rate limit** auth endpoints (5/min per IP) and password reset (3/hour).
- [ ] **RBAC middleware** on every route — never trust `role` from the client.
- [ ] **Tenant scoping**: parents only see linked students; teachers only see
      their classes; students only see their own data.
- [ ] **Input validation** at the boundary (mirror the zod schemas in §4).
- [ ] **Audit log** every admin action (`ActivityLog`).
- [ ] **2FA** support (TOTP) for admins by default.
- [ ] **Soft delete** (`deleted_at`) for users + content rather than hard delete.
- [ ] **CSRF protection** if cookies are used; SameSite=strict on session cookie.
- [ ] **File upload virus scan** (ClamAV or a hosted equivalent).
- [ ] **Privacy:** PII export + account deletion endpoints (parents/teachers).

---

## 11. Suggested backend project structure

The repo already has an `apps/api/` placeholder folder. We recommend:

```
apps/api/
├── src/
│   ├── auth/                 # login, register, JWT, 2FA
│   ├── users/                # cross-role user model + admin user mgmt
│   ├── students/
│   ├── teachers/
│   ├── parents/
│   ├── admins/
│   ├── courses/              # courses, modules, lessons, enrollments
│   ├── assignments/
│   ├── quizzes/
│   ├── grades/
│   ├── attendance/
│   ├── exams/
│   ├── messages/
│   ├── feedback/
│   ├── announcements/
│   ├── notifications/
│   ├── calendar/
│   ├── resources/
│   ├── analytics/
│   ├── uploads/              # signed URLs
│   ├── realtime/             # WS / SSE gateway
│   ├── middleware/           # auth, rbac, tenant-scope, error handler
│   ├── db/                   # migrations, seed data
│   └── server.ts
├── prisma/   (or knex/migrations/)
├── tests/
├── package.json
└── README.md
```

**Stack suggestion** (any one of these maps cleanly to the routes above):

- **Node.js + Fastify + Prisma + PostgreSQL** ← recommended for parity with the
  React/TS frontend
- **NestJS + TypeORM + PostgreSQL**
- **Django + DRF + PostgreSQL** (if Python is preferred)

Whichever stack is chosen, please **expose an OpenAPI 3 spec** at
`/openapi.json` so the frontend team can codegen a typed client.

---

## 12. Recommended phased delivery plan

| Phase | Goal | Endpoints needed | Why |
|---|---|---|---|
| **P0 — Auth foundation (week 1)** | A user can register, log in, and `GET /auth/me` succeeds with the right role | `/auth/*` + RBAC middleware + `User`, `*Profile` tables | Every other page is gated by this |
| **P1 — Admin core (week 2)** | Admin can manage users, teachers, parents, students | `/admin/users`, `/admin/teachers`, `/admin/parents`, `/admin/students` | Unblocks population of demo data |
| **P2 — Courses + enrollments (week 3)** | Students can be enrolled into courses; admin can approve/reject | `/admin/courses`, `/admin/enrollments`, `/student/classes`, `/student/me` | Backbone of the student experience |
| **P3 — Teacher class management (week 4)** | A teacher can see their roster + take attendance + post a grade | `/teacher/classes/*`, `/teacher/classes/:id/attendance`, `/teacher/classes/:id/gradebook` | Unblocks parent visibility |
| **P4 — Authoring (week 5)** | Teacher can create courses/quizzes/assignments stored in DB rather than localStorage | `/teacher/courses`, `/teacher/quizzes`, `/teacher/assignments` | Replaces `sols.teacher.authoring.v1` localStorage |
| **P5 — Student work loop (week 6)** | Student can submit assignments, take quizzes, see grades | `/student/assignments/:id/submit`, `/student/assessments/:id/start\|submit`, `/student/grades` | First end-to-end vertical slice |
| **P6 — Parent portal (week 7)** | Parent sees linked child's progress + activity | `/parent/*` | Depends on P3-P5 |
| **P7 — Comms (week 8)** | Notifications, messages, feedback, announcements | `/notifications`, `/messages`, `/feedback`, `/announcements` |  |
| **P8 — Analytics, calendar, exams, reports (week 9-10)** | Remaining admin and analytics pages | `/admin/analytics`, `/admin/calendar`, `/admin/exams`, `/admin/reports`, `/teacher/analytics` | Polish + reporting |
| **P9 — Real-time + uploads (week 10)** | WS gateway + signed upload URLs | `/ws`, `/uploads/sign\|confirm` | Lifts perceived quality |

> Frontend can start consuming each phase **the moment its endpoints land** —
> the mock data is already shaped to match the contracts in §6.

---

## 13. Open questions

These need a decision before P0 starts. Tag the team in the issue thread:

1. **Auth provider:** Clerk-hosted vs. custom JWT? (Frontend supports both via
   `VITE_AUTH_PREVIEW`.)
2. **Database:** PostgreSQL ↔ MySQL?
3. **ORM:** Prisma ↔ TypeORM ↔ raw SQL?
4. **Hosting:** Render / Railway / Azure / AWS?
5. **Email provider** for password reset + notifications: Resend ↔ SendGrid ↔ SES?
6. **Object storage** for uploads: S3 ↔ Azure Blob ↔ Cloudflare R2?
7. **Multi-tenancy:** is each school a separate tenant, or single-school for v1?
8. **Soft-delete vs. hard-delete** for student records (data-retention policy).
9. **Admin invite flow:** magic link vs. temporary password?
10. **API versioning:** `/v1/...` prefix from day one or only when we break?

---

## 14. Appendix — file pointers

A condensed map of where the frontend looks for each shape — open these to
double-check field names before you finalise the schema.

### Admin

| Concern | File |
|---|---|
| User mgmt schema | `apps/web/src/features/admin/pages/AdminUserManagementPage.tsx` (lines 10-52) |
| Enrollments | `apps/web/src/features/admin/pages/AdminEnrollmentsPage.tsx` (lines 10-65) |
| Teachers | `apps/web/src/features/admin/pages/AdminTeachersPage.tsx` |
| Parents | `apps/web/src/features/admin/pages/AdminParentsPage.tsx` |
| Courses | `apps/web/src/features/admin/pages/AdminCoursesPage.tsx` |
| Dashboard data | `apps/web/src/features/admin/data/adminDashboardData.ts` |
| Sidebar nav | `apps/web/src/features/admin/components/AdminSidebar.tsx` |

### Student

| Concern | File |
|---|---|
| Dashboard charts | `apps/web/src/features/student/data/dashboardChartsData.ts` |
| Assignments mock | `apps/web/src/features/student/data/assignmentsData.ts` |
| Assessments mock | `apps/web/src/features/student/data/assessmentsData.ts` |
| Grades mock | `apps/web/src/features/student/data/gradesData.ts` |
| Resources mock | `apps/web/src/features/student/data/resourcesData.ts` |
| Course detail mock | `apps/web/src/features/student/data/courseDetailData.ts` |
| Lesson player mock | `apps/web/src/features/student/data/lessonPlayerData.ts` |
| Preferences store | `apps/web/src/features/student/settings/preferencesStore.ts` |

### Parent

| Concern | File |
|---|---|
| Subjects + activity mock | `apps/web/src/features/parent/data/mock.ts` |
| Activity timeline data | `apps/web/src/features/parent/data/activity.ts` |
| Progress KPIs | `apps/web/src/features/parent/data/progress.ts` |
| Routes config | `apps/web/src/features/parent/routes.ts` |

### Teacher

| Concern | File |
|---|---|
| Course/Quiz/Assignment types | `apps/web/src/features/teacher/data/authoring.ts` |
| Authoring localStorage store | `apps/web/src/features/teacher/state/authoringStore.ts` |
| Class management mock | `apps/web/src/features/teacher/data/classManagement.ts` |
| Dashboard mock | `apps/web/src/features/teacher/data/dashboard.ts` |
| Feedback mock | `apps/web/src/features/teacher/data/feedback.ts` |
| Resources mock | `apps/web/src/features/teacher/data/resources.ts` |
| Analytics mock | `apps/web/src/features/teacher/data/analytics.ts` |

### Auth + API

| Concern | File |
|---|---|
| Login schema (zod) | `apps/web/src/features/auth/validation/login.schema.ts` |
| Register schema (zod) | `apps/web/src/features/auth/validation/register.schema.ts` |
| API client | `apps/web/src/services/api.ts` |
| Clerk provider | `apps/web/src/app/providers/ClerkProvider.tsx` |
| Router | `apps/web/src/app/router.tsx` |

### Existing related docs

- `docs/BACKEND_IMPLEMENTATION_GUIDE.md` — earlier high-level guide
- `docs/parent-portal-documentation.md` — parent UX spec
- `docs/parent-report-spec.md` — report card spec
- `docs/teacher-portal-documentation.md` — teacher UX spec

---

*Generated for the SOLS backend team. If anything in this document is
ambiguous, reply on the GitHub issue thread and the frontend team will clarify
or update the contract.*
