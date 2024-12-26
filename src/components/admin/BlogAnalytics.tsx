import { ViewsChart } from "./analytics/ViewsChart";
import { SharesAnalytics } from "./analytics/SharesAnalytics";
import { RatingsAnalytics } from "./analytics/RatingsAnalytics";
import { CategoryDistribution } from "./analytics/CategoryDistribution";

export function BlogAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ViewsChart />
        <SharesAnalytics />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RatingsAnalytics />
        <CategoryDistribution />
      </div>
    </div>
  );
}