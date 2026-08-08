import React from "react";
import { StatCardSkeleton, SkeletonBlock } from "@/components/shared/Skeletons";

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Welcome banner skeleton */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3 grow">
          <div className="h-7.5 bg-slate-200 rounded w-1/3" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
        </div>
        <div className="h-11 bg-slate-200 rounded-xl w-36" />
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Bottom widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-100 h-96 flex flex-col justify-between">
          <div className="h-6 bg-slate-200 rounded w-1/4" />
          <div className="grow bg-slate-100/50 rounded-2xl mt-4" />
        </div>
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 h-96 flex flex-col justify-between">
          <div className="h-6 bg-slate-200 rounded w-1/3" />
          <div className="grow bg-slate-100/50 rounded-2xl mt-4" />
        </div>
      </div>
    </div>
  );
}
