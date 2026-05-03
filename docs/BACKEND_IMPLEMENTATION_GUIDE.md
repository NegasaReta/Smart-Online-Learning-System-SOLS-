# Backend Implementation Guide — SOLS (Smart Online Learning System)

> **Target audience:** Backend engineers  
> **Purpose:** Provide a complete, page-by-page specification of every API endpoint, data shape, and business rule that the frontend currently simulates with mock data. Replacing the mock fetchers with real API calls is the only integration step required — all consumer code stays the same.  
> **Frontend stack:** React 18 + TypeScript, React Router v6, TailwindCSS, Recharts  
> **Auth provider (planned):** Clerk — `VITE_CLERK_PUBLISHABLE_KEY` env var gates all auth routes

---

## Table of Contents

1. [Project Structure Overview](#1-project-structure-overview)
2. [Authentication](#2-authentication)
3. [Student Dashboard](#3-student-dashboard)
4. [Classes (My Classes + Course Detail + Lesson Player)](#4-classes)
5. [Assignments](#5-assignments)
6. [Assessments & Quizzes](#6-assessments--quizzes)
7. [Grades](#7-grades)
8. [Schedule / Calendar](#8-schedule--calendar)
9. [Resources Library](#9-resources-library)
10. [Settings](#10-settings)
11. [Global Data Conventions](#11-global-data-conventions)
12. [Suggested API Base URL Structure](#12-suggested-api-base-url-structure)

---

## 1. Project Structure Overview

```
apps/
  api/          ← Backend lives here (currently empty scaffold)
  web/
    src/
      features/
        auth/           ← Login, Register pages + Clerk integration
        student/
          pages/        ← One file per page
          components/   ← Reusable UI components
          data/         ← Mock data + async fetchers (REPLACE THESE)
          settings/     ← Settings layout + store
      app/
        router.tsx      ← All frontend routes
```

Every file inside `apps/web/src/features/student/data/` contains:
1. **TypeScript types** — the exact shape the frontend expects from the API
2. **Mock array data** — the example records to match
3. **Async fetcher functions** — the functions to replace with real `fetch`/`axios` calls

---

## 2. Authentication

### Pages
| Route | Component |
|---|---|
| `/login` | `LoginPage` → `LoginForm` |
| `/register` | `RegisterPage` → `RegisterForm` |
| `/forgot-password` | Placeholder (needs implementation) |

### Auth Provider
The project uses **Clerk** (`@clerk/clerk-react`). Set `VITE_CLERK_PUBLISHABLE_KEY` in `.env.local`.

### Login Form Fields
| Field | Type | Validation |
|---|---|---|
| `role` | `"student" \| "teacher" \| "admin"` | Required |
| `email` | `string` | Valid email |
| `password` | `string` | Min 8 chars |
| `rememberMe` | `boolean` | Optional |

### Register Form Fields
| Field | Type | Validation |
|---|---|---|
| `firstName` | `string` | Required |
| `lastName` | `string` | Required |
| `email` | `string` | Valid email |
| `role` | `"student" \| "teacher" \| "admin"` | Required |
| `password` | `string` | Min 8 chars |
| `confirmPassword` | `string` | Must match password |

### Social OAuth
- Google (`oauth_google`)
- Microsoft (`oauth_microsoft`)
- Both use Clerk's `authenticateWithRedirect` with `/sso-callback` redirect URL

### After Login
Successful login redirects to `/student/dashboard`.

---

## 3. Student Dashboard

**Route:** `/student/dashboard`  
**File:** `StudentDashboardPage.tsx`

The dashboard is composed of six independent cards. Each card should have its own API endpoint.

---

### 3.1 Overall Progress Card

**Visual:** Animated multi-segment donut chart  
**Clicking a segment** navigates to `/student/grades`

#### Required endpoint
```
GET /api/student/progress/overview
```

#### Response shape
```ts
{
  overallPercent: number;        // 0–100, center label
  segments: Array<{
    label: string;               // e.g. "Mathematics"
    percent: number;             // slice size
    color: string;               // hex or Tailwind token
  }>;
}
```

---

### 3.2 Weekly Study Hours Card

**Visual:** Combined Bar + Line Recharts chart  
**X-axis:** Day of week (Mon–Sun)

#### Required endpoint
```
GET /api/student/study-hours/weekly
```

#### Response shape
```ts
Array<{
  day: string;        // "Mon", "Tue", …
  hours: number;      // bar height
  target: number;     // line value
}>
```

---

### 3.3 Current Courses Card

**Visual:** Course progress cards  
**"View All"** → `/student/classes`  
**Each card** → `/student/classes/:slug`

#### Required endpoint
```
GET /api/student/courses/current
```

#### Response shape
```ts
Array<{
  id: string;
  slug: string;              // used in route: /student/classes/:slug
  title: string;
  subject: string;
  instructor: string;
  progress: number;          // 0–100
  nextLesson: string;        // display label e.g. "Lesson 3.2"
  colorClass: string;        // UI accent color token
}>
```

---

### 3.4 Learning Path Card

**Visual:** Ordered list of courses with progress  
**"Resume" button** → `/student/classes/:slug`  
**"Review" button** → `/student/classes/:slug`

#### Required endpoint
```
GET /api/student/learning-path
```

#### Response shape
```ts
Array<{
  id: string;
  slug: string;
  title: string;
  status: "in-progress" | "completed" | "locked";
  progress: number;          // 0–100
}>
```

---

### 3.5 Upcoming Tasks Panel

**Visual:** List of upcoming tasks  
**"Submit Assignment"** → `/student/assignments/:id`  
**"Continue Working"** → `/student/assignments/:id`  
**"View Calendar"** → `/student/schedule`

#### Required endpoint
```
GET /api/student/tasks/upcoming
```

#### Response shape
```ts
Array<{
  id: string;
  title: string;
  subject: string;
  dueLabel: string;           // "Today, 11:59 PM"
  type: "assignment" | "assessment" | "quiz";
  status: "pending" | "in-progress";
  assignmentId?: string;      // links to /student/assignments/:id
}>
```

---

### 3.6 Recent Grades Card

**Visual:** Mini grade table  
**"View All"** → `/student/grades`  
**Each row** → `/student/grades`

#### Required endpoint
```
GET /api/student/grades/recent?limit=5
```

#### Response shape
```ts
Array<{
  id: string;
  subject: string;
  title: string;
  score: string;      // "92/100"
  grade: string;      // "A"
  date: string;       // "Oct 05, 2024"
}>
```

---

## 4. Classes

### 4.1 My Classes Page

**Route:** `/student/classes`  
**File:** `MyClassesPage.tsx`  
**Features:** Search bar, filter tabs (All / Active / Completed), staggered card animation

#### Required endpoint
```
GET /api/student/classes?search=&status=
```

Query params:
- `search` — string filter on title/subject/instructor
- `status` — `"all" | "active" | "completed"`

#### Response shape
```ts
Array<{
  id: string;
  slug: string;
  title: string;
  subject: string;
  instructor: string;
  progress: number;           // 0–100
  status: "active" | "completed";
  badge: string;              // e.g. "Core Science Requirement"
  colorAccent: string;        // Tailwind color token
  nextLesson?: string;
  totalModules: number;
  completedModules: number;
}>
```

---

### 4.2 Course Detail Page

**Route:** `/student/classes/:slug`  
**File:** `CourseDetailPage.tsx`  
**Features:**
- Course header with progress bar
- **Resume Course** button → navigates to current lesson (`/student/classes/:slug/lesson/:lessonId`)
- **Syllabus** button → opens modal listing all modules/lessons with Start/Review buttons
- **Message** button → opens message composer modal (sends message to instructor)
- Module list with lesson rows (Start / Review buttons)
- Right rail: Instructor card, Course Resources (downloadable), Upcoming items

#### Required endpoint
```
GET /api/student/classes/:slug
```

#### Response shape (`CourseDetail`)
```ts
{
  slug: string;
  badge: string;
  title: string;
  instructor: string;
  meta: string;                        // "Fall Semester · 12 Modules total"
  progress: number;                    // 0–100
  instructorBio: {
    name: string;
    avatar: string;                    // URL
  };
  resources: Array<{
    id: string;
    title: string;
    iconKey: "textbook" | "lab" | "forum";
    downloadUrl?: string;
  }>;
  upcoming: Array<{
    id: string;
    monthShort: string;                // "OCT"
    day: number;
    title: string;
    due: string;                       // "Closes in 2 days"
  }>;
  modules: Array<{
    id: string;
    topic: string;                     // "TOPIC 1 · CURRENT"
    state: "current" | "locked";
    title: string;
    progress: number | null;
    lockedMeta?: string;               // "4 Lessons · 1 Assignment"
    lessons: Array<{
      id: string;
      index: string;                   // "1.1"
      title: string;
      meta: string;                    // "12 min video"
      metaIcon: "video" | "book" | "lab" | "quiz";
      status: "completed" | "current" | "locked";
      unlockHint?: string;
    }>;
  }>;
}
```

#### Message Instructor endpoint
```
POST /api/student/messages
Body: {
  recipientId: string;       // instructor user ID
  courseSlug: string;
  subject: string;
  body: string;
}
```

---

### 4.3 Lesson Player Page

**Route:** `/student/classes/:slug/lesson/:lessonId`  
**File:** `LessonPlayerPage.tsx`  
**UI resembles Coursera/Udemy with:**
- Video player (poster + `.mp4` URL)
- Lesson outline (right column) — completed / current / locked items
- Materials panel — PDF download and external links
- Tabs: **Transcript** (timestamped cues) | **Discussion** (threaded posts + reply)
- **Knowledge Check** CTA → opens quiz/assessment
- Prev / Next lesson navigation
- **Mark as Complete** toggle

#### Required endpoint
```
GET /api/student/classes/:slug/lessons/:lessonId
```

#### Response shape (`LessonPlayerData`)
```ts
{
  courseSlug: string;
  courseTitle: string;
  moduleLabel: string;               // "Module 3: Advanced Biology"
  points: number;                    // XP shown in top bar
  lessonId: string;
  lessonNumber: string;              // "Lesson 3.2"
  title: string;
  description: string;
  videoPosterUrl: string;
  videoUrl: string;                  // .mp4
  outline: Array<{
    id: string;
    index: number;
    title: string;
    subtitle: string;
    status: "completed" | "current" | "locked";
  }>;
  materials: Array<{
    id: string;
    title: string;
    meta: string;                    // "2.4 MB" or "External Link"
    iconKey: "pdf" | "lab" | "video" | "doc";
    action: "download" | "external";
    href?: string;
    downloadUrl?: string;
  }>;
  transcript: Array<{
    at: string;                      // "00:00"
    text: string;
  }>;
  discussion: Array<{
    id: string;
    author: string;
    avatar: string;
    postedAgo: string;
    body: string;
  }>;
  knowledgeCheck: {
    prompt: string;
    description: string;
    assessmentId?: string;           // links to /student/assessments/:id
  };
  prevLessonId: string | null;
  nextLessonId: string | null;
  isCompleted: boolean;              // student's completion state
}
```

#### Mark Lesson Complete
```
PATCH /api/student/classes/:slug/lessons/:lessonId/complete
Body: { completed: boolean }
```

#### Post Discussion Reply
```
POST /api/student/classes/:slug/lessons/:lessonId/discussion
Body: { body: string }
```

---

## 5. Assignments

### 5.1 Assignments List Page

**Route:** `/student/assignments`  
**File:** `AssignmentsPage.tsx`  
**Features:** Search bar, filter tabs (All / Pending / Submitted / Graded), clickable rows → detail page

#### Required endpoint
```
GET /api/student/assignments?status=&search=
```

Query params:
- `status` — `"all" | "pending" | "in-progress" | "submitted" | "graded"`
- `search` — string filter on title/subject

#### Response shape
```ts
Array<{
  id: string;
  title: string;
  subject: string;
  due: string;                      // "Today, 11:59 PM"
  status: "pending" | "in-progress" | "submitted" | "graded";
  score: string;                    // "-" or "92/100" or "Pending Grading"
  action: "submit" | "continue" | "view" | "feedback";
}>
```

---

### 5.2 Assignment Detail Page

**Route:** `/student/assignments/:id`  
**File:** `AssignmentDetailPage.tsx`  
**Features:**
- Full description + requirements list
- File upload input (drag-and-drop + click) — supports PDF/DOCX/JPG/PNG
- **Submit** button → `POST` multipart form
- For graded assignments: displays teacher feedback
- Breadcrumb back to `/student/assignments`

#### Required endpoint
```
GET /api/student/assignments/:id
```

#### Response shape (`Assignment` full)
```ts
{
  id: string;
  title: string;
  subject: string;
  due: string;
  status: "pending" | "in-progress" | "submitted" | "graded";
  score: string;
  action: "submit" | "continue" | "view" | "feedback";
  description: string;
  requirements: string[];
  maxPoints: number;
  feedback?: string;               // only for graded
  submittedFileUrl?: string;       // URL to previously submitted file
}
```

#### Submit assignment
```
POST /api/student/assignments/:id/submit
Content-Type: multipart/form-data
Body: { file: File }
```

---

## 6. Assessments & Quizzes

### 6.1 Assessments List Page

**Route:** `/student/assessments`  
**File:** `AssessmentsPage.tsx`  
**Features:** Three sections — Ongoing, Upcoming, Completed. Sidebar with assessment guidelines.

#### Required endpoint
```
GET /api/student/assessments
```

#### Response shape
```ts
Array<{
  id: string;
  subject: string;                  // "BIOLOGY"
  title: string;
  scheduledFor: string;             // "Today · 10:00 AM"
  duration: string;                 // "45 mins" (display)
  durationMinutes: number;          // numeric for timer
  status: "ongoing" | "upcoming" | "completed";
  iconKey: "flask" | "calculator" | "scroll" | "book" | "code";
  resultPercent?: number;           // 0–100 for completed
}>
```

#### Guidelines endpoint
```
GET /api/student/assessments/guidelines
```
Returns array of `{ iconKey: "wifi"|"monitor"|"timer", text: string }`.

---

### 6.2 Assessment Detail / Take Quiz Page

**Route:** `/student/assessments/:id`  
**File:** `AssessmentDetailPage.tsx`  
**Features:**
- Countdown timer (auto-submits on timeout)
- Multiple-choice questions, one at a time
- Question navigator palette
- Submit → shows score + correct answers
- Retry option

#### Required endpoint
```
GET /api/student/assessments/:id
```

#### Response shape (`Assessment` full)
```ts
{
  id: string;
  subject: string;
  title: string;
  scheduledFor: string;
  duration: string;
  durationMinutes: number;
  status: "ongoing" | "upcoming" | "completed";
  iconKey: string;
  instructions: string;
  resultPercent?: number;
  questions: Array<{
    id: string;
    prompt: string;
    options: string[];
    correctIndex: number;           // ⚠️ only returned for completed/review mode
  }>;
}
```

> **Security note:** `correctIndex` should **not** be sent to the client while an assessment is in progress. Return it only after submission.

#### Submit assessment
```
POST /api/student/assessments/:id/submit
Body: {
  answers: Array<{
    questionId: string;
    selectedIndex: number;
  }>;
  timeTakenSeconds: number;
}
Response: {
  score: number;           // 0–100
  correctCount: number;
  totalQuestions: number;
  results: Array<{
    questionId: string;
    correct: boolean;
    correctIndex: number;
  }>;
}
```

---

## 7. Grades

**Route:** `/student/grades`  
**File:** `GradesPage.tsx`  
**Features:**
- Term selector dropdown (Fall 2024, Spring 2024, …)
- **Download Report** button → downloads PDF report
- Progress Over Time line chart (Recharts) — Mathematics vs Science
- Skills Radar chart (Recharts)
- Subject breakdown horizontal bar chart
- Teacher remarks section
- Mentoring session booking button

#### Required endpoints

```
GET /api/student/grades?term=fall-2024
```

Response:
```ts
{
  term: string;
  gpa: number;
  progressOverTime: Array<{
    month: string;
    mathematics: number;
    science: number;
  }>;
  skillsRadar: Array<{
    skill: string;
    score: number;
  }>;
  subjectBreakdown: Array<{
    name: string;
    score: number;
    grade: string;
    color: string;
  }>;
  teacherRemarks: Array<{
    teacherName: string;
    subject: string;
    remark: string;
    date: string;
  }>;
}
```

```
GET /api/student/grades/report?term=fall-2024
```
Returns a downloadable PDF (binary response, `Content-Disposition: attachment`).

```
POST /api/student/mentoring/book
Body: { preferredDate: string; subject: string; message?: string }
```

---

## 8. Schedule / Calendar

**Route:** `/student/schedule`  
**File:** `SchedulePage.tsx`  
**Features:**
- **Day / Week / Month** view toggle buttons
- Monthly calendar grid with event dots
- Click event → event detail modal (title, time, location, type, description)
- **View All Upcoming** button → modal listing all future events
- **Download ICS** button → exports calendar file
- **Sync with Google Calendar** button

#### Required endpoints

```
GET /api/student/schedule/events?view=week&date=2024-10-14
```

Response:
```ts
Array<{
  id: string;
  title: string;
  date: string;                  // ISO "2024-10-14"
  startTime: string;             // "10:00 AM"
  endTime: string;               // "11:30 AM"
  type: "class" | "assignment" | "assessment" | "meeting" | "exam";
  location?: string;
  description?: string;
  colorClass: string;            // Tailwind bg color
}>
```

```
GET /api/student/schedule/upcoming?limit=20
```
Returns upcoming events sorted by date.

```
GET /api/student/schedule/export.ics
```
Returns ICS file (`Content-Type: text/calendar`).

---

## 9. Resources Library

**Route:** `/student/resources`  
**File:** `ResourcesPage.tsx`  
**Features:**
- Filter by subject, type (PDF / Video / Doc / Archive), date
- Recently viewed strip with progress indicators
- Materials grid with View / Download / Watch actions
- **Load More** pagination
- **Request Material** button → form/modal
- In-page viewer modal (PDF/doc preview)

#### Required endpoints

```
GET /api/student/resources?subject=&type=&date=&page=1&limit=8
```

Response:
```ts
{
  total: number;
  page: number;
  items: Array<{
    id: string;
    title: string;
    kind: "pdf" | "video" | "doc" | "archive";
    subject: string;
    subjectClass: string;
    size: string;
    date: string;
    duration?: string;
    primaryAction: "view" | "watch" | "download" | "downloadAll";
    downloadUrl?: string;
    viewUrl?: string;
    hasView?: boolean;
  }>;
}
```

```
GET /api/student/resources/recent
```
Returns last 4 viewed items with `progress` (0–1).

```
GET /api/student/resources/subjects
```
Returns `Array<{ id, name, dotClass }>`.

```
POST /api/student/resources/request
Body: { title: string; subject: string; description: string }
```

---

## 10. Settings

**Route:** `/student/settings/*`  
**Layout:** `SettingsLayout.tsx` — tab navigation: Security / Preferences / Academic

### 10.1 Security Settings (`/student/settings/security`)
- Change password form
- Two-factor authentication toggle
- Active sessions list with revoke buttons
- Login history

#### Endpoints
```
PUT  /api/student/settings/password
Body: { currentPassword, newPassword }

POST /api/student/settings/2fa/enable
POST /api/student/settings/2fa/disable

GET  /api/student/settings/sessions
DELETE /api/student/settings/sessions/:sessionId
```

### 10.2 Preferences Settings (`/student/settings/preferences`)
- Theme: Light / Dark / System
- Font size: Small / Medium / Large
- High-contrast toggle
- Language selector
- Notification toggles (email, push, SMS)

#### Endpoints
```
GET  /api/student/settings/preferences
PUT  /api/student/settings/preferences
Body: {
  theme: "light" | "dark" | "system";
  fontSize: "sm" | "md" | "lg";
  highContrast: boolean;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  }
}
```

> **Note:** Preferences are currently persisted in `localStorage` via `preferencesStore.ts`. The backend endpoint would be used to sync across devices.

### 10.3 Academic Settings (`/student/settings/academic`)
- School / grade level info
- Enrolled subjects display
- Academic goals

#### Endpoints
```
GET /api/student/settings/academic
PUT /api/student/settings/academic
Body: {
  school: string;
  gradeLevel: string;
  goals: string;
}
```

---

## 11. Global Data Conventions

### IDs
All resource IDs (`id`, `lessonId`, `slug`) are currently short strings like `"a1"`, `"l3"`, `"biology-101"`. The backend should use **UUIDs** or the slug pattern (`kebab-case`) and the frontend will work without changes since it passes IDs directly to routes.

### Dates
All dates displayed as strings (e.g. `"Today, 11:59 PM"`, `"Oct 12, 2024"`) should come pre-formatted from the API **or** as ISO 8601 strings that the frontend formats with `Intl.DateTimeFormat`.

### Pagination
Pages using "Load More" (Resources) expect: `{ total, page, items[] }`.

### Error Responses
The frontend currently has no global error boundary for API errors. Return standard HTTP status codes:
- `401` → trigger Clerk re-auth
- `403` → redirect to dashboard
- `404` → page shows "not found" state
- `422` → validation errors as `{ errors: { field: string[] } }`

### File Downloads
For download endpoints, return the file as a binary response with:
```
Content-Disposition: attachment; filename="report.pdf"
Content-Type: application/pdf
```

### CORS
The frontend dev server runs on `http://localhost:5173`. Configure CORS to allow this origin in development.

---

## 12. Suggested API Base URL Structure

```
/api/student/
  dashboard/
    progress/overview
    study-hours/weekly
  courses/
    current
  learning-path
  tasks/upcoming
  classes/
    (list)
    :slug
    :slug/lessons/:lessonId
    :slug/lessons/:lessonId/complete
    :slug/lessons/:lessonId/discussion
  assignments/
    (list)
    :id
    :id/submit
  assessments/
    (list)
    guidelines
    :id
    :id/submit
  grades/
    (summary)
    report
  schedule/
    events
    upcoming
    export.ics
  resources/
    (list)
    recent
    subjects
    request
  mentoring/book
  messages
  settings/
    password
    2fa/enable
    2fa/disable
    sessions
    sessions/:id
    preferences
    academic
```

---

## Quick Integration Checklist

- [ ] Implement Clerk webhook to create a `User` record on first sign-in
- [ ] Seed the database with the mock data from `/apps/web/src/features/student/data/*.ts`
- [ ] Replace each `fetchXxx()` function in the data files with real `fetch`/`axios` calls
- [ ] Add `VITE_API_BASE_URL` to `.env.local` and prefix all calls
- [ ] Protect all `/api/student/*` routes with Clerk JWT middleware
- [ ] Return `correctIndex` in assessment questions **only** after submission
- [ ] Implement ICS generation for schedule export
- [ ] Implement PDF report generation for grades download
- [ ] Store file uploads (assignments) in S3 or equivalent; return `downloadUrl`
- [ ] Implement WebSocket or polling for discussion posts on the Lesson Player page

---

*Generated from the frontend codebase at `apps/web/src/features/student/`. Last updated: April 2026.*
