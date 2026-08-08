import React from "react";
import { TableSkeleton, SkeletonBlock } from "@/components/shared/Skeletons";

export default function AdminDefaultLoading() {
  return (
    <div className="space-y-6">
      {/* Title & Button header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <SkeletonBlock className="h-8 w-48" />
          <SkeletonBlock className="h-4 w-64" />
        </div>
        <SkeletonBlock className="h-10 w-36 rounded-xl" />
      </div>

      {/* Search control */}
      <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <SkeletonBlock className="h-9 w-64 rounded-xl" />
      </div>

      {/* Table skeleton */}
      <TableSkeleton cols={5} rows={6} />
    </div>
  );
}
