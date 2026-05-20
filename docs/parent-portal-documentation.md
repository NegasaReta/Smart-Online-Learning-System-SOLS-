# EduSmart Parent Portal — Complete Documentation

> **Project**: Smart Online Learning System (SOLS)
> **Portal**: Parent Portal
> **Route**: `#/parent`
> **Tech Stack**: React, TypeScript, TailwindCSS, Lucide Icons
> **Internationalization**: English, Amharic, Afaan Oromoo

---

## Table of Contents

1. [Overview](#1-overview)
2. [Navigation & Routes](#2-navigation--routes)
3. [Pages](#3-pages)
4. [Components](#4-components)
5. [Data Structure](#5-data-structure)
6. [Internationalization](#6-internationalization)
7. [Features](#7-features)

---

## 1. Overview

The **Parent Portal** is a dedicated web interface for parents/guardians to monitor their child's academic progress, view activity logs, manage account settings, and access comprehensive reports. It provides real-time insights into grades, attendance, assignments, and AI-powered learning recommendations.

### Key Capabilities

- **Dashboard**: Quick overview of child's progress, current subjects, and recent activity
- **Progress Tracking**: Detailed academic performance by period (month/semester/year)
- **Activity History**: Timeline of quizzes, submissions, and system events
- **Report Card**: Printable, comprehensive academic report with assessments
- **Settings**: Profile, notifications, security, linked children, language preferences

### Target Users

- Parents and legal guardians of enrolled students
- The portal is accessed via a secure authentication system
- Parents can link multiple children to their account

---

## 2. Navigation & Routes

### Route Configuration

File: `features/parent/routes.ts`

| Route ID | Label           | Title             | Icon       | Description                           |
|----------|-----------------|-------------------|------------|---------------------------------------|
| `dashboard` | Dashboard       | Overview          | LayoutGrid | Main dashboard with summary widgets   |
| `progress`  | Child Progress  | Progress Overview | TrendingUp | Detailed academic performance metrics  |
| `report`    | Report Card     | Report Card       | FileText   | Printable academic report             |
| `logs`      | Activity Logs   | Activity History  | History    | Timeline of student activities        |
| `settings`  | Settings        | Settings          | Settings   | Account and preference management     |

### Navigation Structure

The portal uses a **sidebar navigation** with the following layout:

```
┌─────────────────────────────┐
│  EduSmart                   │
│  PARENT PORTAL              │
├─────────────────────────────┤
│  • Dashboard                │
│  • Child Progress           │
│  • Report Card              │
│  • Activity Logs            │
│  • Settings                 │
├─────────────────────────────┤
│  • Log out                  │
└─────────────────────────────┘
```

### Topbar Features

- **Page Title**: Dynamic title based on current route
- **Notification Bell**: Shows unread notification count, opens notification panel
- **User Profile**: Displays parent name and avatar with account type label

---

## 3. Pages

### 3.1 Dashboard (`ParentDashboard.tsx`)

**Purpose**: Central hub providing a quick snapshot of the child's academic status.

**Layout**: 3-column grid (2 columns main, 1 column sidebar)

**Components**:
- **Welcome Banner** (`WelcomeBanner.tsx`)
  - Personalized greeting with parent name
  - Quick progress summary message
  - "View Detailed Report" button → navigates to Progress page
  - Gradient background with decorative sparkles

- **Current Subjects** (`CurrentSubjects.tsx`)
  - List of enrolled subjects with progress bars
  - Subject name, current topic/unit detail
  - Progress percentage with visual progress bar
  - "View All" button for expanded subject list
  - Subjects: Mathematics, Physics, Literature (mock data)

- **Child Summary Card** (`ChildSummaryCard.tsx`)
  - Child's profile photo with ring accent
  - Child name and grade level
  - Overall GPA display (large, bold)
  - Attendance rate display with percentage
  - School name reference

- **Recent Activity** (`RecentActivity.tsx`)
  - Timeline of recent academic events
  - Activity title with time stamp
  - Status indicators (success/info/warning)
  - "Pending Grade" badge for ungraded submissions
  - Visual timeline with colored dots

### 3.2 Child Progress (`ChildProgress.tsx`)

**Purpose**: Detailed academic performance analysis with customizable time periods.

**Features**:
- **Period Toggle**: Switch between Month, Semester, and Year views
- **KPI Cards** (`KpiCards.tsx`)
  - **GPA Card**: Interactive bar chart showing GPA trend over time
    - Hover over bars to see specific GPA values
    - Delta label showing improvement/drop
    - Latest value displayed prominently
  - **Attendance Card**: Circular progress indicator
    - Percentage display
    - Visual ring chart
    - Contextual text about attendance record
  - **Credits Card**: Credits earned vs total required
    - Progress bar showing completion
    - Promotion status indicator

- **Subject Performance** (`SubjectPerformance.tsx`)
  - Grid of subject cards (Mathematics, Science, Literature)
  - Each card shows:
    - Subject icon and name
    - Letter grade badge (color-coded)
    - Progress bar to next level
    - Footnote with latest assessment info
    - "View Details" button → opens Subject Detail Modal
  - Modal expands to show full assessment breakdown

- **Strengths & Opportunities** (`StrengthsAndOpportunities.tsx`)
  - AI-powered insights section
  - Two-panel layout:
    - **Areas of Strength**: Bullet points of academic strengths
    - **Growth Opportunities**: Improvement recommendations
  - Decorative gradient background with "AI Insight" badge
  - Icons: Star (strengths), Flag (opportunities)

### 3.3 Report Card (`ParentReport.tsx`)

**Purpose**: Printable, comprehensive academic report for term-based assessment.

**Layout**: Single-column, optimized for printing

**Sections**:
1. **Action Bar** (hidden when printing)
   - Print button → invokes `window.print()`
   - Download button → exports CSV file

2. **Header Banner**
   - School name (EduSmart Academy)
   - Report title with term
   - Generation date (auto-calculated)

3. **Student Info**
   - Student Name
   - Student ID
   - Class (Grade – Section)
   - Term

4. **GPA Summary**
   - Large GPA display in colored box
   - Delta label (e.g., "+0.2 from last semester")
   - Weekly Study Hours (actual / goal)
   - Top Subject

5. **Subject Performance Table**
   - Columns: Subject, Grade, Score, Attendance, Teacher, Remarks
   - Grade badges with color coding
   - Progress bars for scores
   - Teacher remarks

6. **Assessment Breakdown**
   - 3-column grid of assessment cards per subject
   - Lists all assessments with scores
   - Shows "Pending" for ungraded work

7. **Strengths & Opportunities**
   - Two-column layout
   - Bulleted lists from AI insights

8. **Signature Area**
   - Three signature lines:
     - Class Teacher
     - Academic Advisor
     - Parent / Guardian
   - Footer text with school contact info

**Export Features**:
- **CSV Export**: Downloads structured data with student metadata and subject performance
- **Print**: Uses browser print with CSS print styles for clean output

### 3.4 Activity Logs (`ActivityLogs.tsx`)

**Purpose**: Timeline view of all student activities with filtering and export.

**Features**:
- **Header**
  - Page title
  - Download Report button → exports filtered activity as CSV

- **Activity Filters** (`ActivityFilters.tsx`)
  - Time range: Last 7 Days, Last 30 Days, All Time
  - Activity type: All Activities, Quizzes, Submissions, System
  - Subject filter: All Subjects, individual subjects
  - Real-time filtering of timeline

- **Activity Timeline** (`ActivityTimeline.tsx`)
  - Grouped by day (Today, Yesterday, dates)
  - Desktop: Alternating left/right layout with center line
  - Mobile: Single column with left-aligned icons
  - Each activity shows:
    - Icon with color coding
    - Activity title
    - Subject
    - Description (if available)
    - Time stamp
    - Optional badge (e.g., "Scored 92%")

- **Weekly Summary** (`WeeklySummary.tsx`)
  - Sticky sidebar panel
  - Active hours this week
  - Weekly goal
  - Delta from last week
  - Subject breakdown by hours with colored dots

**Activity Types**:
- **Quiz**: Completed quizzes with scores
- **Submission**: Assignment submissions
- **System**: Portal logins, system events

### 3.5 Settings (`ParentSettings.tsx`)

**Purpose**: Account management and preference configuration.

**Layout**: Tabbed interface with 6 tabs

**Tabs**:

1. **Profile** (`ProfileSection.tsx`)
   - Full name editing
   - Email address
   - Phone number
   - Profile photo upload
   - Save changes button

2. **Notifications** (`NotificationsSection.tsx`)
   - Email notifications toggle
   - SMS notifications toggle
   - Push notifications toggle
   - Notification preferences per category:
     - Grade updates
     - Attendance alerts
     - Assignment deadlines
     - Teacher messages
     - School announcements

3. **Security** (`SecuritySection.tsx`)
   - Password change form
   - Current password
   - New password
   - Confirm new password
   - Two-factor authentication toggle
   - Active sessions list with "Sign out" buttons

4. **Linked Children** (`LinkedChildrenSection.tsx`)
   - List of linked children
   - Child name, grade, school
   - "Add Child" button
   - "Remove" button per child
   - Link code sharing for adding new children

5. **Preferences** (`PreferencesSection.tsx`)
   - Language selection (English, Amharic, Afaan Oromoo)
   - Timezone selection
   - Date format preference
   - Theme selection (Light/Dark)

6. **Account** (`DangerZoneSection.tsx`)
   - Account deletion warning
   - Deletion consequences description
   - Type confirmation input
   - "Delete account" button

---

## 4. Components

### 4.1 Layout Components

#### ParentPortalLayout (`ParentPortalLayout.tsx`)
- Wraps all pages with sidebar and topbar
- Handles back navigation button (hidden on dashboard)
- Responsive sidebar (hidden on mobile)
- Sticky topbar with blur effect

#### Sidebar (`Sidebar.tsx`)
- School branding with EduSmart logo
- Navigation menu items
- Active route highlighting
- Logout button
- Responsive: hidden on mobile, visible on desktop+

#### Topbar (`Topbar.tsx`)
- Dynamic page title
- Notification bell with unread indicator
- Notification panel trigger
- User profile display (name, avatar, account type)

### 4.2 Dashboard Components

#### WelcomeBanner (`WelcomeBanner.tsx`)
- Gradient background with decorative sparkles
- Personalized greeting
- Progress summary message
- CTA button to view detailed report

#### ChildSummaryCard (`ChildSummaryCard.tsx`)
- Child avatar with ring
- Name and grade/school
- GPA card with trophy icon
- Attendance card with calendar icon

#### CurrentSubjects (`CurrentSubjects.tsx`)
- Subject list with icons
- Progress bars per subject
- Current unit/topic display
- "View All" navigation button

#### RecentActivity (`RecentActivity.tsx`)
- Timeline layout
- Colored status dots
- Activity titles with timestamps
- Pending grade badges

### 4.3 Progress Components

#### KpiCards (`KpiCards.tsx`)
- Container for 3 KPI cards
- GPA Card with interactive bar chart
- Attendance Card with circular progress
- Credits Card with progress bar

#### SubjectPerformance (`SubjectPerformance.tsx`)
- Grid of subject cards
- Grade badges
- Progress bars
- Detail modal trigger
- SubjectDetailModal integration

#### SubjectDetailModal (`SubjectDetailModal.tsx`)
- Full subject breakdown
- Assessment list with scores
- Teacher information
- Attendance details
- AI-generated remarks

#### PeriodToggle (`PeriodToggle.tsx`)
- Tab-like period selector
- Options: Month, Semester, Year
- Active state styling

#### StrengthsAndOpportunities (`StrengthsAndOpportunities.tsx`)
- AI insights panel
- Two-column layout
- Strengths and opportunities sections
- Decorative gradient background

### 4.4 Activity Components

#### ActivityTimeline (`ActivityTimeline.tsx`)
- Day-grouped timeline
- Desktop: Alternating layout
- Mobile: Single column
- Empty state for no results

#### ActivityCard (`ActivityCard.tsx`)
- Individual activity display
- Icon, title, description
- Badge support
- Subject and timestamp

#### ActivityFilters (`ActivityFilters.tsx`)
- Time range dropdown
- Activity type dropdown
- Subject dropdown
- Filter state management

#### WeeklySummary (`WeeklySummary.tsx`)
- Weekly stats display
- Subject breakdown
- Goal comparison

### 4.5 Settings Components

#### ProfileSection (`ProfileSection.tsx`)
- Form fields for profile data
- Photo upload
- Save functionality

#### NotificationsSection (`NotificationsSection.tsx`)
- Toggle switches
- Category-based preferences
- Channel selection

#### SecuritySection (`SecuritySection.tsx`)
- Password form
- 2FA toggle
- Session management

#### LinkedChildrenSection (`LinkedChildrenSection.tsx`)
- Child list
- Add/remove functionality
- Link code display

#### PreferencesSection (`PreferencesSection.tsx`)
- Language selector
- Timezone selector
- Date format selector

#### DangerZoneSection (`DangerZoneSection.tsx`)
- Account deletion flow
- Confirmation input
- Warning text

### 4.6 Shared Components

#### NotificationsPanel (`NotificationsPanel.tsx`)
- Dropdown panel for notifications
- All/Unread tabs
- Mark all read functionality
- Clear all functionality
- Individual notification cards
- Click-outside to close

---

## 5. Data Structure

### 5.1 Mock Data Files

#### `data/mock.ts`
```typescript
- Subject[]: List of subjects with progress
- ActivityItem[]: Recent activity items
```

#### `data/progress.ts`
```typescript
- ProgressPeriodId: "month" | "semester" | "year"
- Assessment: Assessment records with scores
- SubjectPerformance: Per-subject performance by period
- gpaTrendByPeriod: GPA trend data points
- gpaSummaryByPeriod: Summary stats
- strengths: AI-generated strengths
- opportunities: AI-generated opportunities
```

#### `data/activity.ts`
```typescript
- ActivityKind: "quiz" | "submission" | "system"
- ActivityEntry: Full activity records
- WeeklySubject: Subject hour breakdown
- weeklyStats: Weekly summary stats
```

### 5.2 Data Models

#### Subject
```typescript
{
  id: string
  name: string
  detail: string
  progress: number
  icon: LucideIcon
  iconBg: string
  iconColor: string
  barColor: string
}
```

#### SubjectPerformance (by period)
```typescript
{
  grade: string (A, A-, B+, etc.)
  progress: number (0-100)
  footnote: string
  gradeBg: string
  gradeColor: string
  summary: string
  teacher: string
  attendance: number (0-100)
  assessments: Assessment[]
}
```

#### Assessment
```typescript
{
  name: string
  score: number
  outOf: number
  date: string
}
```

#### ActivityEntry
```typescript
{
  id: string
  day: string
  time: string
  subject: string
  title: string
  description?: string
  badge?: { label: string; tone: "success" | "info" | "warning" }
  icon: LucideIcon
  iconBg: string
  iconColor: string
  kind: ActivityKind
}
```

---

## 6. Internationalization

### Supported Languages
- **English** (en) - Default
- **Amharic** (am) - አማርኛ
- **Afaan Oromoo** (om) - Afaan Oromoo

### Translation System

**Provider**: `I18nProvider` (`i18n/I18nProvider.tsx`)
- Exposes `useT()` hook for accessing translations
- Translation keys are English strings (self-documenting)
- Fallback to English if translation missing
- Language preference persisted in localStorage

**Translation Files**:
- `translations.ts` - Base translations
- `translations-extra.ts` - Extended translations for parent/teacher portals

### Translation Key Examples

```typescript
// Navigation
"nav.dashboard" → "Dashboard" / "ዳሽቦርድ" / "Daashbordii"
"nav.progress" → "Child Progress" / "የልጅ እድገት" / "Guddina Ijoollee"
"nav.report" → "Report Card" / "የውጤት ካርድ" / "Kaardii Qabxii"
"nav.settings" → "Settings" / "ቅንብሮች" / "Qindaa'ina"

// Dashboard
"Welcome back," → "Welcome back," / "እንኳን ተመልሰው መጡ፣" / "Baga nagaan deebittan,"
"Current Subjects" → "Current Subjects" / "የአሁን ትምህርቶች" / "Barnoota Ammaa"
"Overall GPA" → "Overall GPA" / "አጠቃላይ ውጤት" / "GPA Waliigalaa"
"Recent Activity" → "Recent Activity" / "የቅርብ ጊዜ እንቅስቃሴ" / "Sochii Dhihoo"

// Report Card
"Report Card" → "Report Card" / "የውጤት ካርድ" / "Kaardii Qabxii"
"Cumulative GPA" → "Cumulative GPA" / "አጠቃላይ ውጤት" / "GPA Waliigalaa"
"Subject Performance" → "Subject Performance" / "የትምህርት አፈፃፀም" / "Raawwii Barnootaa"
"Strengths" → "Strengths" / "ጥንካሬዎች" / "Ciminaawwan"
"Areas for Improvement" → "Areas for Improvement" / "መሻሻል ያለባቸው አካባቢዎች" / "Naannoowwan Fooyyessuu Barbaadan"
```

### Language Switching

- Language selector in Settings → Preferences tab
- Updates entire portal UI instantly
- Persisted across sessions
- Applies to all pages and components

---

## 7. Features

### 7.1 Dashboard Features
- **Personalized Welcome**: Greets parent by name
- **Quick Progress Summary**: One-sentence child progress overview
- **Subject Progress Tracking**: Visual progress bars for each subject
- **GPA at a Glance**: Overall GPA displayed prominently
- **Attendance Overview**: Quick attendance percentage
- **Recent Activity Feed**: Timeline of latest academic events
- **Pending Grade Alerts**: Visual indicators for ungraded work

### 7.2 Progress Tracking Features
- **Multi-Period View**: Month, Semester, Year toggles
- **Interactive GPA Chart**: Hover to see historical GPA values
- **Circular Attendance Indicator**: Visual attendance ring
- **Credits Tracking**: Earned vs required credits
- **Subject-Level Details**: Per-subject grade, progress, teacher info
- **Assessment Breakdown**: Detailed list of all assessments
- **AI-Powered Insights**: Strengths and growth opportunities
- **Subject Detail Modal**: Expanded view for each subject

### 7.3 Report Card Features
- **Print-Ready Layout**: Optimized for printing with CSS print styles
- **CSV Export**: Download structured data for external use
- **Comprehensive Data**: All academic metrics in one document
- **Signature Lines**: For teacher, advisor, and parent signatures
- **School Branding**: Header with school name and term
- **Generation Date**: Auto-calculated report date
- **Professional Design**: Clean, official document appearance

### 7.4 Activity Logs Features
- **Filterable Timeline**: Filter by time, type, and subject
- **Activity Types**: Quizzes, submissions, system events
- **Score Badges**: Visual indicators for quiz scores
- **Subject Grouping**: Activities organized by subject
- **Day Grouping**: Timeline grouped by date
- **Export Functionality**: Download filtered activity as CSV
- **Weekly Summary**: Stats sidebar with hour breakdown

### 7.5 Notifications Features
- **Real-time Indicators**: Unread count on bell icon
- **Notification Panel**: Dropdown with full notification list
- **All/Unread Tabs**: Filter by read status
- **Mark All Read**: Bulk mark as read
- **Clear All**: Remove all notifications
- **Rich Notifications**: Icons, titles, bodies, timestamps
- **Click-to-Read**: Mark individual as read on click
- **Notification Types**: Grades, messages, deadlines, events

### 7.6 Settings Features
- **Profile Management**: Edit personal information
- **Photo Upload**: Change profile picture
- **Notification Preferences**: Toggle notifications by type and channel
- **Security Settings**: Password change, 2FA, session management
- **Multi-Child Support**: Link multiple children to account
- **Language Selection**: Choose from supported languages
- **Timezone Configuration**: Set local timezone
- **Theme Selection**: Light/dark mode
- **Account Deletion**: Full account removal with confirmation

### 7.7 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Desktop Enhancement**: Enhanced layouts for larger screens
- **Sidebar Collapsible**: Hidden on mobile, visible on desktop+
- **Adaptive Grids**: Responsive column layouts
- **Touch-Friendly**: Large tap targets for mobile

### 7.8 Accessibility
- **Keyboard Navigation**: Full keyboard support
- **ARIA Labels**: Screen reader compatibility
- **Focus Management**: Proper focus handling
- **Color Contrast**: WCAG AA compliant colors
- **Semantic HTML**: Proper heading hierarchy
- **Icon Labels**: Descriptive labels for icons

---

## 8. Technical Implementation

### File Structure
```
features/parent/
├── components/
│   ├── WelcomeBanner.tsx
│   ├── ChildSummaryCard.tsx
│   ├── CurrentSubjects.tsx
│   ├── RecentActivity.tsx
│   ├── NotificationsPanel.tsx
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   ├── ParentPortalLayout.tsx
│   ├── activity/
│   │   ├── ActivityTimeline.tsx
│   │   ├── ActivityCard.tsx
│   │   ├── ActivityFilters.tsx
│   │   └── WeeklySummary.tsx
│   ├── progress/
│   │   ├── KpiCards.tsx
│   │   ├── SubjectPerformance.tsx
│   │   ├── SubjectDetailModal.tsx
│   │   ├── PeriodToggle.tsx
│   │   └── StrengthsAndOpportunities.tsx
│   ├── settings/
│   │   ├── ProfileSection.tsx
│   │   ├── NotificationsSection.tsx
│   │   ├── SecuritySection.tsx
│   │   ├── LinkedChildrenSection.tsx
│   │   ├── PreferencesSection.tsx
│   │   └── DangerZoneSection.tsx
│   └── ui/
│       └── SettingsSection.tsx
├── pages/
│   ├── ParentDashboard.tsx
│   ├── ChildProgress.tsx
│   ├── ParentReport.tsx
│   ├── ActivityLogs.tsx
│   └── ParentSettings.tsx
├── data/
│   ├── mock.ts
│   ├── progress.ts
│   └── activity.ts
└── routes.ts
```

### State Management
- React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)
- Local component state for UI interactions
- No external state management library (Redux, etc.)
- Data currently from mock files (to be replaced with API)

### Styling
- TailwindCSS utility classes
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`
- Custom colors: Indigo primary palette
- Shadow system: `shadow-card`
- Ring system: `ring-1 ring-slate-100`

### Icons
- Lucide React icon library
- Consistent icon sizing: `h-4 w-4`, `h-5 w-5`, etc.
- Color-coded icons for visual hierarchy

---

## 9. Future Enhancements

### Planned Features
1. **Real-Time Data**: Replace mock data with live API calls
2. **Multi-Child Dashboard**: Support viewing multiple children simultaneously
3. **Teacher Messaging**: Direct messaging with teachers
4. **Calendar Integration**: Sync school calendar with portal
5. **Payment Portal**: Fee payments and invoice viewing
6. **Mobile App**: Native mobile application
7. **Push Notifications**: Real-time push notifications
8. **Video Conferencing**: Parent-teacher video calls
9. **Document Repository**: Access to school documents
10. **Analytics Dashboard**: Advanced analytics and trends

### Backend Integration
- API endpoints for all data fetching
- WebSocket for real-time updates
- Authentication and authorization
- Data caching and performance optimization
- Audit logging for compliance

---

## 10. Contact & Support

For questions about the Parent Portal:
- **Documentation**: This file
- **Backend Spec**: `docs/parent-report-spec.md`
- **Route Config**: `features/parent/routes.ts`
- **Component Directory**: `features/parent/components/`

---

*Last Updated: April 28, 2026*
*Version: 1.0*
