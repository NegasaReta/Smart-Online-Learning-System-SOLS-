# EduSmart Teacher Portal — Complete Documentation

> **Project**: Smart Online Learning System (SOLS)
> **Portal**: Teacher Portal
> **Route**: `#/teacher`
> **Tech Stack**: React, TypeScript, TailwindCSS, Lucide Icons
> **Internationalization**: English, Amharic, Afaan Oromoo

---

## Table of Contents

1. [Overview](#1-overview)
2. [Navigation & Routes](#2-navigation--routes)
3. [Pages](#3-pages)
4. [Components](#4-components)
5. [Data Structure](#5-data-structure)
6. [State Management](#6-state-management)
7. [Internationalization](#7-internationalization)
8. [Features](#8-features)

---

## 1. Overview

The **Teacher Portal** is a dedicated web interface for teachers to manage
classes, create courses/quizzes/assignments, browse subject resources,
respond to student feedback, and view performance analytics. It provides
tools for day-to-day classroom management alongside AI-powered insights to
support data-driven teaching.

### Key Capabilities

- **Dashboard**: Quick stats, class performance chart, and pending feedback
- **Class Management**: Student roster, attendance tracking, gradebook, announcements
- **Content Authoring**: Create courses, quizzes, and assignments (persisted in localStorage)
- **Subject Resources**: Searchable resource library with filters and pagination
- **Student Feedback**: Threaded messaging with students, export to CSV
- **Performance Analytics**: KPI cards, trend charts, grade distribution, AI insights
- **Settings**: Teacher profile, teaching assignments, notifications, security, preferences

### Target Users

- Teachers and instructors assigned to classes/sections
- Access via secure authentication with role-based permissions

---

## 2. Navigation & Routes

### Route Configuration

File: `features/teacher/routes.ts`

| Route ID     | Sidebar Label         | Page Title                     | Icon           |
|--------------|-----------------------|--------------------------------|----------------|
| `dashboard`  | Dashboard             | Teacher Dashboard              | LayoutGrid     |
| `classes`    | Class Management      | Class Management               | BookOpen       |
| `authoring`  | Create Content        | Course & Content Authoring     | PenSquare      |
| `resources`  | Subject Resources     | Subject Resources              | GraduationCap  |
| `feedback`   | Student Feedback      | Student Feedback               | MessageSquare  |
| `analytics`  | Performance Analytics | Performance Analytics          | BarChart3      |
| `settings`   | Settings              | Settings                       | Settings       |

### Navigation Structure

```
┌─────────────────────────────┐
│  EduSmart K-12              │
│  Role-Based Access          │
├─────────────────────────────┤
│  • Dashboard                │
│  • Class Management         │
│  • Create Content           │
│  • Subject Resources        │
│  • Student Feedback         │
│  • Performance Analytics    │
│  • Settings                 │
├─────────────────────────────┤
│  • Log out                  │
└─────────────────────────────┘
```

### Topbar Features (matches parent portal design)

- **Page title** — Dynamic, translated based on current route
- **Settings gear** — Navigates to Settings page
- **Notification bell** — Red badge with unread count, opens notification panel
- **Messages icon** — Red dot indicator for unread messages
- **Language switcher** — Pill button with 🌐 globe, country flag, language code (EN/AM/OM), and chevron; dropdown to switch language
- **Divider** — Vertical separator
- **User profile** — Avatar + "Ms. Sarah" + "Teacher" role label

---

## 3. Pages

### 3.1 Teacher Dashboard (`TeacherDashboard.tsx`)

**Purpose**: Central landing page with quick overview of teaching workload.

**Layout**: Max-width 6xl container with stacked sections

**Components**:

1. **Welcome Banner** (`WelcomeBanner.tsx`)
   - Greeting: "Welcome back, Ms. Sarah!"
   - Shows pending feedback count (e.g., "24 pending feedback requests today.")
   - "Review Feedback" CTA button → navigates to Feedback page
   - Light indigo background with ring

2. **Stat Cards** (`StatCards.tsx`)
   - 3-column grid of metric cards:
     - **Total Students**: `148` (+4% badge)
     - **Active Subjects**: `5` (Semester 2 badge)
     - **Pending Feedback**: `24` (highlighted with indigo ring + left accent bar)
   - Each card has icon, label, value, and optional trend badge

3. **Class Performance Chart** (`ClassPerformanceChart.tsx`)
   - Interactive bar chart showing subject averages
   - Subjects: Math (78%), Science (72%), History (86%), English (76%), Art (92%)
   - Hover tooltips showing percentage
   - Click to select/highlight a bar
   - Filter dropdown: "Subject Averages", "Top Quartile", "Bottom Quartile"
   - Y-axis labels: 100%, 75%, 50%, 25%
   - Dashed grid lines for visual reference

4. **Pending Feedback List** (`PendingFeedbackList.tsx`)
   - Right sidebar list of recent feedback requests
   - Each item: avatar circle with initials, student name, topic, timestamp
   - "View All" button
   - Sample entries: John Doe (Biology Midterm), Alice Smith (Math Quiz), etc.

---

### 3.2 Class Management (`ClassManagement.tsx`)

**Purpose**: Complete classroom operations — roster, attendance, grades, and announcements.

**Layout**: Header + KPI cards + tabbed content + sidebar

**Sections**:

1. **Class Header** (`ClassHeader.tsx`)
   - Department: "Biology Department"
   - Class title: "Grade 10 - Biology Section A"
   - Meta: "Fall Semester 2024 · Room 302"
   - "Edit" button → opens Edit Class Modal
   - "Export CSV" button → downloads class data as CSV

2. **Class KPI Cards** (`ClassKpiCards.tsx`)
   - **Total Students**: 32
   - **Attendance Rate**: 94%
   - **Average Grade**: B-

3. **Tabs** (`ClassTabs.tsx`)
   - 4 tabs: **Roster** | **Attendance** | **Gradebook** | **Announcements**
   - Active tab highlighted in indigo

4. **Tab: Student Roster** (`StudentRoster.tsx`)
   - Full student list with avatar, name, email, student ID, grade, grade %
   - Sortable columns
   - Search functionality
   - Status indicators
   - Total student count display

5. **Tab: Attendance** (`AttendanceView.tsx`)
   - Per-student attendance status: Present / Late / Absent
   - Toggle status per student
   - "Mark All" bulk action (Present, Late, or Absent)
   - Toast notification on bulk action

6. **Tab: Gradebook** (`GradebookView.tsx`)
   - Per-student grade percentage editor
   - Inline editable grade fields
   - Grade letter display
   - Real-time grade updates

7. **Tab: Announcements** (`AnnouncementsView.tsx`)
   - Create new announcement (title + body)
   - List of existing announcements with timestamp
   - Pin/unpin announcements
   - Delete announcement
   - Pinned items float to top
   - Toast notification on post

8. **Sidebar Widgets**:
   - **Attendance Summary** (`AttendanceSummary.tsx`)
     - Present: 28, Late: 2, Absent: 2
     - Visual breakdown bars
     - Date display
   - **Grade Distribution** (`GradeDistribution.tsx`)
     - Bar chart: A (8), B (14), C (7), D (2), F (1)
     - "View Full Report" button → opens Grade Report Modal

9. **Modals**:
   - **Edit Class Modal** (`EditClassModal.tsx`)
     - Edit department, title, meta info
     - Save/Cancel buttons
     - Toast on successful save
   - **Grade Report Modal** (`GradeReportModal.tsx`)
     - Detailed grade distribution report
     - Visual charts and breakdowns

**Export Feature**:
- CSV export includes: Student ID, Name, Email, Grade, Grade %, Attendance
- Header metadata: Class name, department, details, export date

---

### 3.3 Course & Content Authoring (`Authoring.tsx`)

**Purpose**: Create and manage courses, quizzes, and assignments.

**Layout**: Header with dynamic CTA + tabbed content

**Features**:

1. **Tab Navigation**
   - **Courses** (BookOpen icon) — count badge
   - **Quizzes** (ClipboardList icon) — count badge
   - **Assignments** (FileText icon) — count badge

2. **Dynamic CTA Button**
   - Changes based on active tab:
     - "New Course" / "New Quiz" / "New Assignment"
   - Opens corresponding creation modal

3. **Course List** (`AuthoringLists.tsx → CourseList`)
   - Lists all created courses
   - Shows: title, subject, grade, description, schedule, room, capacity
   - Delete course action
   - Seed course: "Introductory Biology" (Grade 10)

4. **Quiz List** (`AuthoringLists.tsx → QuizList`)
   - Lists all created quizzes
   - Shows: title, course, description, duration, due date, question count
   - Publish/Unpublish toggle
   - Delete quiz action

5. **Assignment List** (`AuthoringLists.tsx → AssignmentList`)
   - Lists all created assignments
   - Shows: title, course, instructions, due date, total points
   - Late submission toggle
   - Publish/Unpublish toggle
   - Delete assignment action

6. **Modals**:
   - **Course Modal** (`CourseModal.tsx`)
     - Fields: Title, Subject (dropdown: 8 subjects), Grade (dropdown: 9-12), Description, Schedule, Room, Capacity
     - Create button
   - **Quiz Modal** (`QuizModal.tsx`)
     - Fields: Title, Course, Description, Duration (minutes), Due Date
     - Dynamic question builder:
       - Add questions with prompt text
       - 4 multiple-choice options per question
       - Select correct answer
       - Points per question
     - Publish toggle
     - Create button
   - **Assignment Modal** (`AssignmentModal.tsx`)
     - Fields: Title, Course, Instructions, Due Date, Total Points
     - Allow late submissions toggle
     - Attachments (text input)
     - Publish toggle
     - Create button

**Persistence**: All authoring data is stored in `localStorage` via `authoringStore.ts` and survives page reloads.

---

### 3.4 Subject Resources (`SubjectResources.tsx`)

**Purpose**: Searchable, filterable resource library for teaching materials.

**Layout**: Header with search + sidebar filters + resource grid

**Features**:

1. **Header**
   - Title: "Subject Resources"
   - Search bar with icon
   - "Add Resource" button → opens Add Resource Modal

2. **Sidebar Filters** (`ResourceFilters.tsx`)
   - **Subject Filter**: Mathematics, Science, History, Literature (multi-select with counts)
   - **Grade Level Filter**: Grade 9, 10, 11, 12 (single-select)

3. **Type Tabs**
   - Pill-style filter buttons: All Resources | Video | PDF | Lesson Plan | Quiz
   - Active type highlighted in indigo

4. **Resource Grid** (`ResourceCard.tsx`)
   - Responsive grid: 1-3 columns
   - Each card shows:
     - Cover image
     - Resource type badge
     - Title
     - Description
     - Subject tag + grade level

5. **Pagination** (`ResourcePager.tsx`)
   - Page navigation with previous/next buttons
   - Current page indicator

6. **Add Resource Modal** (`AddResourceModal.tsx`)
   - Fields: Title, Description, Type (dropdown), Subject (dropdown), Grade (dropdown), Cover URL
   - Create button
   - Toast notification on success

7. **Empty State**
   - Dashed border container with "No resources match the selected filters" message

**Sample Resources**:
- Introduction to Trigonometry (Video, Math, Grade 9)
- Algebra II Worksheet (PDF, Math, Grade 10)
- Cellular Biology Lesson (Lesson Plan, Science, Grade 9)
- World War II Key Events (Quiz, History, Grade 11)
- Shakespeare's Sonnets (Lesson Plan, Literature, Grade 11)
- Chemistry Lab Safety (Video, Science, Grade 10)

---

### 3.5 Student Feedback (`StudentFeedback.tsx`)

**Purpose**: Review, manage, and respond to student inquiries with threaded conversations.

**Layout**: Header + KPI cards + split list/thread view

**Features**:

1. **Header**
   - Title: "Student Feedback"
   - Subtitle: "Review, manage, and respond to student inquiries and feedback."
   - "Export Report" button → downloads CSV

2. **Feedback KPI Cards** (`FeedbackKpiCards.tsx`)
   - **Total Received**: 342 (lifetime)
   - **Pending**: 18
   - **Average Rating**: 4.8

3. **Feedback List** (`FeedbackList.tsx`)
   - Left panel showing all feedback items
   - Each item: student avatar, name, class, title, preview, time, status badge
   - Status badges: `New` (blue), `In Progress` (amber), `Replied` (green)
   - Click to select and view thread

4. **Feedback Thread** (`FeedbackThread.tsx`)
   - Right panel showing conversation thread
   - Message bubbles with:
     - Author avatar, name, timestamp
     - Message body (supports multi-line)
   - Reply text area at bottom
   - "Send Reply" button
   - "Mark Resolved" button
   - Student info header: name, class, course

5. **Reply System**
   - Teacher sends reply → status auto-changes to "Replied"
   - Reply appears in thread with teacher avatar and timestamp
   - Teacher identity: "Ms. Sarah"

6. **CSV Export**
   - Summary section: total, new, in-progress, replied counts, lifetime stats
   - Detail rows: ID, Student, Class, Course, Title, Status, Received, Messages, Last Message
   - File naming: `student-feedback-report_YYYY-MM-DD.csv`

**Sample Feedback Items**:
- Emma Watson: "Question about the Physics assignment" (New)
- Liam Johnson: "Feedback on Chapter 4 Quiz" (In Progress)
- Noah Davis: "Extension request" (Replied — with teacher response)

---

### 3.6 Performance Analytics (`PerformanceAnalytics.tsx`)

**Purpose**: Data-driven overview of class-wide academic performance.

**Layout**: Header + KPIs + trend chart with sidebar insights + student roster

**Features**:

1. **Header**
   - Title: "Performance Analytics"
   - Subtitle: "Overview of Grade 10 Science"

2. **Analytics KPI Cards** (`AnalyticsKpiCards.tsx`)
   - **Average Class Grade**: 84.5% (+2.4% delta, green badge)
   - **Attendance Rate**: 96.2% (0.0% delta, neutral badge)
   - **Completion Rate**: 89.1% (-1.2% delta, red badge)
   - Delta badges: green (↑), red (↓), grey (—) with trend icons

3. **Performance Trend Chart** (`PerformanceTrendChart.tsx`)
   - Line/area chart showing weekly performance trends
   - Toggle: 4-week vs 6-week view
   - Data points with labels (W1, W2, W3, etc.)
   - Hover tooltips with values
   - 4-week data: 78 → 82 → 80 → 85
   - 6-week data: 76 → 79 → 82 → 81 → 86 → 88

4. **Smart Insights** (`SmartInsights.tsx`)
   - AI-powered insight cards:
     - **At-Risk Students** (rose background): "3 students have dropped below 60% this week. Review recent quiz scores."
     - **Positive Trend** (indigo background): "Overall class participation increased by 15% after implementing interactive labs."
   - Lightbulb icon header

5. **Grade Distribution** (`AnalyticsGradeDistribution.tsx`)
   - Horizontal bar chart:
     - A: 35% (indigo-500)
     - B: 40% (indigo-400)
     - C: 15% (indigo-300)
     - D/F: 10% (rose-400)

6. **Student Performance Roster** (`StudentPerformanceRoster.tsx`)
   - Full table of students with performance metrics
   - Columns: Student, Grade %, Attendance %, Completion %, Status
   - Status badges:
     - **Excelling** (green)
     - **On Track** (blue)
     - **At Risk** (red)
   - Student avatars with name and email
   - 6 sample students with varied performance levels

---

### 3.7 Settings (`TeacherSettings.tsx`)

**Purpose**: Account management and teaching configuration.

**Layout**: Tabbed interface with 6 tabs

**Tabs**:

1. **Profile** (`TeacherProfileSection.tsx`)
   - Full name, email, phone
   - Profile photo upload
   - Department, employee ID
   - Bio/description
   - Save changes button

2. **Notifications** (shared from parent portal: `NotificationsSection.tsx`)
   - Email, SMS, push notification toggles
   - Category-based preferences

3. **Security** (shared from parent portal: `SecuritySection.tsx`)
   - Password change form
   - Two-factor authentication
   - Active sessions management

4. **Teaching Assignments** (`TeachingAssignmentsSection.tsx`)
   - List of assigned classes/sections:
     - Biology · Grade 10 — Section A · Room 302 (32 students) — **Primary**
     - Biology · Grade 11 — Section C · Room 314 (28 students)
     - Environmental Science · Grade 9 — Section B · Lab 2 (24 students)
   - "Make Primary" button per assignment
   - "Remove" button per assignment
   - "Request New Assignment" button

5. **Preferences** (shared from parent portal: `PreferencesSection.tsx`)
   - Language selection (English, Amharic, Afaan Oromoo)
   - Timezone, date format, theme

6. **Account** (shared from parent portal: `DangerZoneSection.tsx`)
   - Account deletion with confirmation

---

## 4. Components

### 4.1 Layout Components

| Component                 | File                           | Description                        |
|---------------------------|--------------------------------|------------------------------------|
| `TeacherPortalLayout`     | `TeacherPortalLayout.tsx`      | Shell with sidebar + topbar + main |
| `Sidebar`                 | `Sidebar.tsx`                  | 7 nav items + logout               |
| `Topbar`                  | `Topbar.tsx`                   | Title, gear, bell, messages, lang, profile |

### 4.2 Dashboard Components

| Component                 | File                           | Description                        |
|---------------------------|--------------------------------|------------------------------------|
| `WelcomeBanner`           | `WelcomeBanner.tsx`            | Greeting + pending count + CTA     |
| `StatCards`               | `StatCards.tsx`                | 3 KPI metric cards                 |
| `ClassPerformanceChart`   | `ClassPerformanceChart.tsx`    | Interactive bar chart              |
| `PendingFeedbackList`     | `PendingFeedbackList.tsx`      | Recent feedback sidebar            |

### 4.3 Class Management Components (11 files)

| Component              | File                      | Description                              |
|------------------------|---------------------------|------------------------------------------|
| `ClassHeader`          | `ClassHeader.tsx`         | Class info with edit/export buttons      |
| `ClassKpiCards`        | `ClassKpiCards.tsx`       | 3 class-level KPI cards                  |
| `ClassTabs`            | `ClassTabs.tsx`           | Roster/Attendance/Gradebook/Announcements|
| `StudentRoster`        | `StudentRoster.tsx`       | Searchable, sortable student list        |
| `AttendanceView`       | `AttendanceView.tsx`      | Per-student attendance toggle            |
| `GradebookView`        | `GradebookView.tsx`       | Inline grade editing                     |
| `AnnouncementsView`    | `AnnouncementsView.tsx`   | Create, pin, delete announcements        |
| `AttendanceSummary`    | `AttendanceSummary.tsx`   | Attendance breakdown sidebar             |
| `GradeDistribution`    | `GradeDistribution.tsx`   | A/B/C/D/F bar chart sidebar              |
| `EditClassModal`       | `EditClassModal.tsx`      | Edit class details modal                 |
| `GradeReportModal`     | `GradeReportModal.tsx`    | Full grade report modal                  |

### 4.4 Authoring Components (5 files)

| Component              | File                      | Description                              |
|------------------------|---------------------------|------------------------------------------|
| `CourseList`           | `AuthoringLists.tsx`      | List of all courses                      |
| `QuizList`             | `AuthoringLists.tsx`      | List of all quizzes                      |
| `AssignmentList`       | `AuthoringLists.tsx`      | List of all assignments                  |
| `CourseModal`          | `CourseModal.tsx`         | Create course form modal                 |
| `QuizModal`            | `QuizModal.tsx`           | Create quiz with question builder        |
| `AssignmentModal`      | `AssignmentModal.tsx`     | Create assignment form modal             |
| `Modal`                | `Modal.tsx`               | Shared modal wrapper (backdrop + close)  |

### 4.5 Resource Components (4 files)

| Component              | File                      | Description                              |
|------------------------|---------------------------|------------------------------------------|
| `ResourceCard`         | `ResourceCard.tsx`        | Resource card with cover, type, title    |
| `ResourceFilters`      | `ResourceFilters.tsx`     | Subject + grade filter sidebar           |
| `ResourcePager`        | `ResourcePager.tsx`       | Pagination controls                      |
| `AddResourceModal`     | `AddResourceModal.tsx`    | Create new resource modal                |

### 4.6 Feedback Components (3 files)

| Component              | File                      | Description                              |
|------------------------|---------------------------|------------------------------------------|
| `FeedbackKpiCards`     | `FeedbackKpiCards.tsx`    | Total/Pending/Rating KPI cards           |
| `FeedbackList`         | `FeedbackList.tsx`        | Selectable feedback item list            |
| `FeedbackThread`       | `FeedbackThread.tsx`      | Threaded conversation with reply         |

### 4.7 Analytics Components (5 files)

| Component                    | File                              | Description                          |
|------------------------------|-----------------------------------|--------------------------------------|
| `AnalyticsKpiCards`          | `AnalyticsKpiCards.tsx`           | Grade/Attendance/Completion KPIs     |
| `PerformanceTrendChart`      | `PerformanceTrendChart.tsx`       | Weekly trend line chart              |
| `SmartInsights`              | `SmartInsights.tsx`               | AI insight cards (at-risk, trends)   |
| `AnalyticsGradeDistribution` | `AnalyticsGradeDistribution.tsx` | A/B/C/D/F horizontal bars           |
| `StudentPerformanceRoster`   | `StudentPerformanceRoster.tsx`    | Student table with status badges     |

### 4.8 Settings Components (2 teacher-specific + 4 shared from parent)

| Component                     | File                                | Description                       |
|-------------------------------|-------------------------------------|-----------------------------------|
| `TeacherProfileSection`       | `settings/TeacherProfileSection.tsx` | Teacher profile form              |
| `TeachingAssignmentsSection`  | `settings/TeachingAssignmentsSection.tsx` | Assigned classes management  |
| `NotificationsSection`        | *(shared from parent portal)*       | Notification toggles              |
| `SecuritySection`             | *(shared from parent portal)*       | Password + 2FA + sessions         |
| `PreferencesSection`          | *(shared from parent portal)*       | Language, timezone, theme         |
| `DangerZoneSection`           | *(shared from parent portal)*       | Account deletion                  |

### 4.9 Shared Components

| Component               | File                        | Description                          |
|--------------------------|-----------------------------|--------------------------------------|
| `NotificationsPanel`     | `NotificationsPanel.tsx`    | Bell dropdown with notification list |

---

## 5. Data Structure

### 5.1 Data Files

#### `data/dashboard.ts`
```typescript
StatCard {
  id: string
  label: string
  value: string | number
  badge?: { label: string; tone: "success" | "info" }
}

SubjectAverage {
  short: string    // "Math", "Sci", etc.
  name: string     // Full name
  value: number    // 0-100 percentage
}

FeedbackRequest {
  id: string
  initials: string
  name: string
  topic: string
  time: string
  avatarBg: string
  avatarColor: string
}
```

#### `data/classManagement.ts`
```typescript
AttendanceStatus = "present" | "late" | "absent"

Student {
  id: string
  name: string
  email: string
  avatarUrl: string
  studentId: string      // e.g. "#ST-2024-01"
  grade: string          // Letter grade "A", "B-", etc.
  gradePct: number       // 0-100
  status: AttendanceStatus
}

classInfo {
  department: string
  title: string
  meta: string
  totalStudents: number
  attendanceRate: number
  avgPerformance: number
  avgGrade: string
  date: string
}

attendanceCounts: Record<AttendanceStatus, number>
gradeDistribution: { letter: string; count: number }[]
```

#### `data/authoring.ts`
```typescript
Course {
  id: string
  title: string
  subject: string
  grade: string
  description: string
  schedule: string
  room: string
  capacity: number
  createdAt: number
}

Quiz {
  id: string
  title: string
  course: string
  description: string
  durationMinutes: number
  dueDate: string
  questions: QuizQuestion[]
  published: boolean
  createdAt: number
}

QuizQuestion {
  id: string
  prompt: string
  options: string[]     // 4 choices
  correctIndex: number
  points: number
}

Assignment {
  id: string
  title: string
  course: string
  instructions: string
  dueDate: string
  totalPoints: number
  allowLate: boolean
  attachments: string[]
  published: boolean
  createdAt: number
}

SUBJECT_OPTIONS: ["Biology", "Chemistry", "Physics", "Mathematics",
                   "History", "English", "Computer Science", "Art"]
GRADE_OPTIONS: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"]
```

#### `data/resources.ts`
```typescript
ResourceType = "Video" | "PDF" | "Lesson Plan" | "Quiz"
ResourceSubject = "Mathematics" | "Science" | "History" | "Literature"

Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  subject: ResourceSubject
  subjectShort: string
  grade: number           // 9, 10, 11, 12
  cover: string           // Image URL
}

subjectFilters: { name: ResourceSubject; count: number }[]
gradeLevels: [9, 10, 11, 12]
resourceTypes: ["All", "Video", "PDF", "Lesson Plan", "Quiz"]
```

#### `data/feedback.ts`
```typescript
FeedbackStatus = "new" | "in_progress" | "replied"

FeedbackMessage {
  authorName: string
  authorAvatar: string
  timestamp: string
  body: string
}

FeedbackItem {
  id: string
  studentName: string
  studentAvatar: string
  studentClass: string
  course?: string
  subjectTag?: string
  title: string
  preview: string
  time: string
  status: FeedbackStatus
  thread: FeedbackMessage[]
}

feedbackStats {
  totalReceived: 342
  pending: 18
  averageRating: 4.8
}
```

#### `data/analytics.ts`
```typescript
TrendRange = "4w" | "6w"
TrendPoint { label: string; value: number }

analyticsKpis {
  avgGrade: 84.5
  avgGradeDelta: 2.4
  attendance: 96.2
  attendanceDelta: 0
  completion: 89.1
  completionDelta: -1.2
}

performanceTrend: Record<TrendRange, TrendPoint[]>

gradeDistribution: { letter: string; percent: number; cls: string }[]

RosterStatus = "on_track" | "at_risk" | "excelling"

RosterStudent {
  id: string
  name: string
  email: string
  avatar: string
  grade: number       // Percentage
  attendance: number  // Percentage
  completion: number  // Percentage
  status: RosterStatus
}
```

---

## 6. State Management

### 6.1 Local Component State
- Most pages use React `useState` / `useMemo` for local UI state
- Attendance, grades, filters, modals, toasts — all managed locally

### 6.2 Authoring Store (`state/authoringStore.ts`)
- **Custom external store** using `useSyncExternalStore` (React 18)
- Persists to `localStorage` under key `sols.teacher.authoring.v1`
- Survives page reloads and browser sessions

**Store Shape**:
```typescript
{
  courses: Course[]
  quizzes: Quiz[]
  assignments: Assignment[]
}
```

**Actions** (`authoringActions`):
| Action                      | Description                              |
|-----------------------------|------------------------------------------|
| `addCourse(input)`          | Create new course, auto-generates ID     |
| `removeCourse(id)`          | Delete course by ID                      |
| `addQuiz(input)`            | Create new quiz with questions           |
| `toggleQuizPublished(id)`   | Toggle quiz publish/draft status         |
| `removeQuiz(id)`            | Delete quiz by ID                        |
| `addAssignment(input)`      | Create new assignment                    |
| `toggleAssignmentPublished(id)` | Toggle assignment publish/draft      |
| `removeAssignment(id)`      | Delete assignment by ID                  |

**Usage**: `const courses = useAuthoringStore((s) => s.courses);`

---

## 7. Internationalization

### Supported Languages
- **English** (en) — Default
- **Amharic** (am) — አማርኛ
- **Afaan Oromoo** (om) — Afaan Oromoo

### Translation System
- Same `I18nProvider` and `useT()` hook as parent portal
- English strings used as keys (self-documenting)
- Fallback to English if translation missing
- Language persisted in localStorage (shared across portals)

### Teacher-Specific Translation Keys

```typescript
// Navigation
"nav.dashboard"             → "ዳሽቦርድ" / "Daashbordii"
"nav.classManagement"       → "የክፍል አስተዳደር" / "Bulchiinsa Daree"
"nav.createContent"         → "ይዘት ፍጠር" / "Qabiyyee Uumi"
"nav.subjectResources"      → "የትምህርት ሀብቶች" / "Qabeenya Barnootaa"
"nav.studentFeedback"       → "የተማሪ አስተያየት" / "Yaada Barattootaa"
"nav.performanceAnalytics"  → "የአፈጻጸም ትንተና" / "Xiinxala Raawwii"
"nav.settings"              → "ቅንብሮች" / "Qindaa'ina"

// Dashboard
"Total Students"            → "ጠቅላላ ተማሪዎች" / "Barattootaa Waliigalaa"
"Active Subjects"           → "ንቁ ትምህርቶች" / "Barnoota Socho'aa"
"Pending Feedback"          → "በመጠባበቅ ያለ አስተያየት" / "Yaada Eeggataa"

// Route Titles
"Teacher Dashboard"         → "የመማሪያ ዳሽቦርድ" / "Daashboordii Barsiisaa"
"Class Management"          → "የክፍል አስተዳደር" / "Bulchiinsa Daree"
"Settings"                  → "ቅንብሮች" / "Qindaa'ina"
```

### Language Switching
- Available from Topbar language pill in both portals
- Updates all UI text instantly
- Persisted in localStorage across sessions

---

## 8. Features

### 8.1 Dashboard Features
- **Personalized Welcome**: Greets teacher by name with pending count
- **Quick KPI Overview**: Students, subjects, and pending feedback at a glance
- **Interactive Bar Chart**: Subject averages with hover tooltips and chart filters
- **Pending Feedback Queue**: Quick access to recent student requests
- **Navigation Shortcuts**: CTA buttons to jump to feedback page

### 8.2 Class Management Features
- **Student Roster**: Full searchable student directory with grades
- **Attendance Tracking**: Per-student present/late/absent toggling
- **Bulk Attendance**: Mark all students with one click
- **Gradebook**: Inline grade editing with letter grade display
- **Announcements**: Create, pin, delete class announcements
- **Attendance Summary**: Visual sidebar with daily breakdown
- **Grade Distribution**: A–F bar chart with report modal
- **Class Info Editing**: Edit department, title, metadata via modal
- **CSV Export**: Full class data download (ID, name, email, grade, attendance)
- **Toast Notifications**: Success messages for actions

### 8.3 Content Authoring Features
- **Course Creation**: Full course details with subject, grade, schedule, room
- **Quiz Builder**: Multi-question quizzes with 4-choice MCQ and point values
- **Assignment Creator**: Instructions, due dates, points, late policy, attachments
- **Publish/Draft Toggle**: Control visibility of quizzes and assignments
- **Persistent Storage**: All data survives page reloads via localStorage
- **Delete Actions**: Remove courses, quizzes, or assignments
- **Dynamic Tab Counts**: Badge counters on each tab

### 8.4 Subject Resources Features
- **Search**: Full-text search across resource titles and descriptions
- **Subject Filtering**: Multi-select subject filter with item counts
- **Grade Filtering**: Single-select grade level filter
- **Type Filtering**: All / Video / PDF / Lesson Plan / Quiz pill buttons
- **Resource Cards**: Cover image, type badge, title, description
- **Pagination**: Page navigation for large resource sets
- **Add Resource**: Modal to create new resources with all metadata
- **Empty State**: Friendly message when no results match

### 8.5 Student Feedback Features
- **Threaded Conversations**: Full message history per student
- **Reply System**: Send replies directly from the thread view
- **Status Management**: Auto-update status on reply (New → Replied)
- **Mark Resolved**: Manual status change to Replied
- **KPI Dashboard**: Total received, pending, average rating
- **CSV Export**: Full feedback report with summary and detail rows
- **Status Badges**: Color-coded New / In Progress / Replied indicators

### 8.6 Performance Analytics Features
- **KPI Cards**: Grade, attendance, completion with delta badges
- **Trend Chart**: 4-week and 6-week performance trend visualization
- **AI Smart Insights**: At-risk student alerts and positive trend highlights
- **Grade Distribution**: Horizontal percentage bars for A/B/C/D/F
- **Student Roster**: Full performance table with status badges (Excelling/On Track/At Risk)

### 8.7 Settings Features
- **Teacher Profile**: Name, email, phone, department, bio, photo upload
- **Teaching Assignments**: View/manage assigned classes with primary designation
- **Notification Preferences**: Toggle by channel and category
- **Security**: Password change, 2FA, session management
- **Language/Theme/Timezone**: Full preference configuration
- **Account Deletion**: Danger zone with confirmation

### 8.8 Responsive Design
- **Mobile**: Sidebar hidden, single-column layouts, touch-friendly
- **Tablet**: Adaptive grids, sidebar visible on md+
- **Desktop**: Full multi-column layouts with sidebars
- **Print**: Not primary focus (report card is in parent portal)

### 8.9 Shared Infrastructure with Parent Portal
- **Settings Tabs**: Notifications, Security, Preferences, Account sections are shared React components
- **I18n System**: Same provider, same translation files, same hook
- **Topbar Design**: Identical layout (gear, bell, messages, language, profile)
- **UI Components**: SettingsSection wrapper used by both portals

---

## 9. File Structure

```
features/teacher/
├── TeacherPortal.tsx                      # Root component, route switching
├── routes.ts                              # 7 routes with icons
├── state/
│   └── authoringStore.ts                  # Persistent store (useSyncExternalStore)
├── data/
│   ├── dashboard.ts                       # Stats, subject averages, pending feedback
│   ├── classManagement.ts                 # Students, class info, attendance, grades
│   ├── authoring.ts                       # Course/Quiz/Assignment types + seeds
│   ├── resources.ts                       # Resource types + seed data
│   ├── feedback.ts                        # Feedback items + stats
│   └── analytics.ts                       # KPIs, trends, roster students
├── components/
│   ├── TeacherPortalLayout.tsx
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   ├── WelcomeBanner.tsx
│   ├── StatCards.tsx
│   ├── ClassPerformanceChart.tsx
│   ├── PendingFeedbackList.tsx
│   ├── NotificationsPanel.tsx
│   ├── class/
│   │   ├── ClassHeader.tsx
│   │   ├── ClassKpiCards.tsx
│   │   ├── ClassTabs.tsx
│   │   ├── StudentRoster.tsx
│   │   ├── AttendanceView.tsx
│   │   ├── GradebookView.tsx
│   │   ├── AnnouncementsView.tsx
│   │   ├── AttendanceSummary.tsx
│   │   ├── GradeDistribution.tsx
│   │   ├── EditClassModal.tsx
│   │   └── GradeReportModal.tsx
│   ├── authoring/
│   │   ├── AuthoringLists.tsx
│   │   ├── CourseModal.tsx
│   │   ├── QuizModal.tsx
│   │   ├── AssignmentModal.tsx
│   │   └── Modal.tsx
│   ├── resources/
│   │   ├── ResourceCard.tsx
│   │   ├── ResourceFilters.tsx
│   │   ├── ResourcePager.tsx
│   │   └── AddResourceModal.tsx
│   ├── feedback/
│   │   ├── FeedbackKpiCards.tsx
│   │   ├── FeedbackList.tsx
│   │   └── FeedbackThread.tsx
│   ├── analytics/
│   │   ├── AnalyticsKpiCards.tsx
│   │   ├── PerformanceTrendChart.tsx
│   │   ├── SmartInsights.tsx
│   │   ├── AnalyticsGradeDistribution.tsx
│   │   └── StudentPerformanceRoster.tsx
│   └── settings/
│       ├── TeacherProfileSection.tsx
│       └── TeachingAssignmentsSection.tsx
└── pages/
    ├── TeacherDashboard.tsx
    ├── ClassManagement.tsx
    ├── Authoring.tsx
    ├── SubjectResources.tsx
    ├── StudentFeedback.tsx
    ├── PerformanceAnalytics.tsx
    └── TeacherSettings.tsx
```

**Total**: 7 pages, 38+ components, 6 data files, 1 state store

---

## 10. Component Count Summary

| Category            | Count |
|---------------------|-------|
| Pages               | 7     |
| Layout components   | 3     |
| Dashboard components| 4     |
| Class components    | 11    |
| Authoring components| 5     |
| Resource components | 4     |
| Feedback components | 3     |
| Analytics components| 5     |
| Settings components | 2 (+ 4 shared) |
| Shared components   | 1     |
| Data files          | 6     |
| State stores        | 1     |
| **Total files**     | **~52** |

---

*Last Updated: April 29, 2026*
*Version: 1.0*
