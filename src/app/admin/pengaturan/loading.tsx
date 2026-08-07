import React from "react";
import { FormSkeleton, SkeletonBlock } from "@/components/shared/Skeletons";

export default function AdminSettingsLoading() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <SkeletonBlock className="h-8 w-48" />
        <SkeletonBlock className="h-4 w-64" />
      </div>

      {/* Form skeleton */}
      <FormSkeleton />
    </div>
  );
}
