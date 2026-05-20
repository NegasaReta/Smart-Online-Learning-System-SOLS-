import { ChildSummaryCard } from "../components/ChildSummaryCard";
import { CurrentSubjects } from "../components/CurrentSubjects";
import { RecentActivity } from "../components/RecentActivity";
import { WelcomeBanner } from "../components/WelcomeBanner";
import type { RouteId } from "../routes";

type Props = {
  onNavigate: (id: RouteId) => void;
};

export function ParentDashboard({ onNavigate }: Props) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left/main column */}
      <div className="space-y-6 lg:col-span-2">
        <WelcomeBanner onViewReport={() => onNavigate("progress")} />
        <CurrentSubjects />
      </div>

      {/* Right column */}
      <div className="space-y-6">
        <ChildSummaryCard />
        <RecentActivity />
      </div>
    </div>
  );
}
