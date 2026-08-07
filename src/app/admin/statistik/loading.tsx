import React from "react";
import { StatCardSkeleton, ChartSkeleton, SkeletonBlock } from "@/components/shared/Skeletons";

export default function AdminStatistikLoading() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <SkeletonBlock className="h-8 w-48" />
        <SkeletonBlock className="h-4 w-64" />
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  );
}
