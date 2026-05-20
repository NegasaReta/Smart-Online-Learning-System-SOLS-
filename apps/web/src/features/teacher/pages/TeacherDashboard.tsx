import { ClassPerformanceChart } from "../components/ClassPerformanceChart";
import { PendingFeedbackList } from "../components/PendingFeedbackList";
import { StatCards } from "../components/StatCards";
import { WelcomeBanner } from "../components/WelcomeBanner";
import { teacherStats } from "../data/dashboard";
import type { TeacherRouteId } from "../routes";

type Props = {
  onNavigate: (id: TeacherRouteId) => void;
};

export function TeacherDashboard({ onNavigate }: Props) {
  const pending =
    Number(teacherStats.find((s) => s.id === "feedback")?.value) || 0;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <WelcomeBanner
        pendingCount={pending}
        onReview={() => onNavigate("feedback")}
      />

      <StatCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ClassPerformanceChart />
        </div>
        <PendingFeedbackList />
      </div>
    </div>
  );
}
