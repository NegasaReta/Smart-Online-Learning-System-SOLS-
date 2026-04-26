import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import StudentDashboardPage from "@/features/student/pages/StudentDashboardPage";
import MyClassesPage from "@/features/student/pages/MyClassesPage";
import AssignmentsPage from "@/features/student/pages/AssignmentsPage";
import SchedulePage from "@/features/student/pages/SchedulePage";
import GradesPage from "@/features/student/pages/GradesPage";
import ResourcesPage from "@/features/student/pages/ResourcesPage";
import AssessmentsPage from "@/features/student/pages/AssessmentsPage";
import CourseDetailPage from "@/features/student/pages/CourseDetailPage";
import AssignmentDetailPage from "@/features/student/pages/AssignmentDetailPage";
import AssessmentDetailPage from "@/features/student/pages/AssessmentDetailPage";
import LessonPlayerPage from "@/features/student/pages/LessonPlayerPage";
import SettingsLayout from "@/features/student/settings/SettingsLayout";
import SettingsSecurityPage from "@/features/student/pages/SettingsSecurityPage";
import SettingsPreferencesPage from "@/features/student/pages/SettingsPreferencesPage";
import SettingsAcademicPage from "@/features/student/pages/SettingsAcademicPage";
import LandingPage from "@/features/landing/pages/LandingPage";

// When Clerk isn't configured, auth routes redirect to the dashboard so the
// preview works without any backend setup.
const CLERK_ENABLED = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          CLERK_ENABLED ? (
            <LoginPage />
          ) : (
            <Navigate to="/student/dashboard" replace />
          )
        }
      />
      <Route
        path="/register"
        element={
          CLERK_ENABLED ? (
            <RegisterPage />
          ) : (
            <Navigate to="/student/dashboard" replace />
          )
        }
      />
      <Route path="/student/dashboard" element={<StudentDashboardPage />} />
      <Route path="/student/classes" element={<MyClassesPage />} />
      <Route path="/student/classes/:slug" element={<CourseDetailPage />} />
      <Route
        path="/student/classes/:slug/lesson/:lessonId"
        element={<LessonPlayerPage />}
      />
      <Route path="/student/assignments" element={<AssignmentsPage />} />
      <Route
        path="/student/assignments/:id"
        element={<AssignmentDetailPage />}
      />
      <Route path="/student/schedule" element={<SchedulePage />} />
      <Route path="/student/grades" element={<GradesPage />} />
      <Route path="/student/resources" element={<ResourcesPage />} />
      <Route path="/student/assessments" element={<AssessmentsPage />} />
      <Route
        path="/student/assessments/:id"
        element={<AssessmentDetailPage />}
      />
      <Route path="/student/settings" element={<SettingsLayout />}>
        <Route index element={<Navigate to="security" replace />} />
        <Route path="security" element={<SettingsSecurityPage />} />
        <Route path="preferences" element={<SettingsPreferencesPage />} />
        <Route path="academic" element={<SettingsAcademicPage />} />
      </Route>
      <Route
        path="/forgot-password"
        element={
          <div className="flex min-h-screen items-center justify-center p-8 text-center text-ink-700">
            Forgot password page — coming soon.
          </div>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
