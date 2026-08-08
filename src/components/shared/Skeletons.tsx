import React from "react";

// Helper for pulsing placeholder block
interface SkeletonBlockProps {
  className?: string;
}

export function SkeletonBlock({ className = "" }: SkeletonBlockProps) {
  return (
    <div
      className={`bg-slate-200/80 animate-pulse rounded-lg motion-reduce:animate-none ${className}`}
    />
  );
}

// 1. Grid/Article/Media Card Skeleton
export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm flex flex-col justify-between h-full space-y-4">
      <div className="space-y-4 w-full">
        {/* Aspect 4:3 Image placeholder */}
        <SkeletonBlock className="aspect-[4/3] w-full rounded-xl" />
        
        {/* Title */}
        <SkeletonBlock className="h-5 w-3/4 rounded-md" />
        
        {/* Description lines */}
        <div className="space-y-2">
          <SkeletonBlock className="h-3 w-full rounded-md" />
          <SkeletonBlock className="h-3 w-5/6 rounded-md" />
        </div>
      </div>

      {/* Footer metadata */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="space-y-1.5 w-1/2">
          <SkeletonBlock className="h-3 w-full rounded-md" />
          <SkeletonBlock className="h-2.5 w-2/3 rounded-md" />
        </div>
        <SkeletonBlock className="h-6 w-12 rounded-lg" />
      </div>
    </div>
  );
}

// 2. Statistics Card Skeleton (Dashboard Panels)
export function StatCardSkeleton() {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center space-x-4">
      {/* Icon circle placeholder */}
      <SkeletonBlock className="h-12 w-12 rounded-2xl shrink-0" />
      
      {/* Label and Count */}
      <div className="space-y-2 grow">
        <SkeletonBlock className="h-3.5 w-1/2 rounded-md" />
        <SkeletonBlock className="h-7 w-1/3 rounded-md" />
      </div>
    </div>
  );
}

// 3. Table Rows Skeleton (Admin Tab Listings)
interface TableSkeletonProps {
  cols?: number;
  rows?: number;
}

export function TableSkeleton({ cols = 5, rows = 6 }: TableSkeletonProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden w-full">
      {/* Header skeleton */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex space-x-4 w-full">
          {Array.from({ length: cols }).map((_, idx) => (
            <SkeletonBlock
              key={`th-${idx}`}
              className={`h-4 rounded-md ${idx === 0 ? "w-1/4" : "w-1/6"}`}
            />
          ))}
        </div>
      </div>

      {/* Body rows skeleton */}
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={`tr-${rowIdx}`} className="px-6 py-4.5 flex items-center justify-between">
            <div className="flex space-x-4 w-full items-center">
              {Array.from({ length: cols }).map((_, colIdx) => {
                if (colIdx === 0) {
                  // First column: image + text or title
                  return (
                    <div key={`td-${rowIdx}-${colIdx}`} className="flex items-center space-x-3 w-1/4 shrink-0">
                      <SkeletonBlock className="w-10 h-7 rounded-md shrink-0" />
                      <SkeletonBlock className="h-3.5 w-3/4 rounded-md" />
                    </div>
                  );
                }
                if (colIdx === cols - 1) {
                  // Action buttons at the end
                  return (
                    <div key={`td-${rowIdx}-${colIdx}`} className="flex justify-end space-x-2 grow">
                      <SkeletonBlock className="h-7.5 w-14 rounded-xl" />
                      <SkeletonBlock className="h-7.5 w-14 rounded-xl" />
                    </div>
                  );
                }
                return (
                  <SkeletonBlock
                    key={`td-${rowIdx}-${colIdx}`}
                    className="h-3.5 w-1/6 rounded-md"
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Vertical List Item Skeleton (Directory/Org/FAQ)
export function ListSkeleton() {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start space-x-4">
      {/* Icon circle */}
      <SkeletonBlock className="h-10 w-10 rounded-xl shrink-0" />
      
      {/* Body */}
      <div className="space-y-2 grow">
        <SkeletonBlock className="h-4 w-1/3 rounded-md" />
        <SkeletonBlock className="h-3 w-5/6 rounded-md" />
        <SkeletonBlock className="h-3 w-2/3 rounded-md" />
      </div>
    </div>
  );
}

// 5. Chart Placeholder Skeleton
export function ChartSkeleton() {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6 w-full h-[320px] flex flex-col justify-between">
      {/* Header title */}
      <div className="flex justify-between items-center">
        <div className="space-y-1.5 w-1/3">
          <SkeletonBlock className="h-4.5 w-3/4 rounded-md" />
          <SkeletonBlock className="h-3 w-1/2 rounded-md" />
        </div>
        <SkeletonBlock className="h-6 w-16 rounded-md" />
      </div>

      {/* Grid bars imitating Recharts */}
      <div className="grow flex items-end justify-between space-x-3 pt-6 border-b border-slate-100 pb-2">
        <SkeletonBlock className="w-full h-1/3 rounded-t-md" />
        <SkeletonBlock className="w-full h-2/3 rounded-t-md" />
        <SkeletonBlock className="w-full h-1/2 rounded-t-md" />
        <SkeletonBlock className="w-full h-5/6 rounded-t-md" />
        <SkeletonBlock className="w-full h-2/5 rounded-t-md" />
        <SkeletonBlock className="w-full h-3/5 rounded-t-md" />
        <SkeletonBlock className="w-full h-3/4 rounded-t-md" />
      </div>

      {/* X-Axis labels */}
      <div className="flex justify-between px-2">
        <SkeletonBlock className="h-2.5 w-10 rounded-md" />
        <SkeletonBlock className="h-2.5 w-10 rounded-md" />
        <SkeletonBlock className="h-2.5 w-10 rounded-md" />
        <SkeletonBlock className="h-2.5 w-10 rounded-md" />
        <SkeletonBlock className="h-2.5 w-10 rounded-md" />
      </div>
    </div>
  );
}

// 6. Form Fields Skeleton (Settings / CRUD Editor)
export function FormSkeleton() {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-5">
      <div className="space-y-4">
        {/* 2-column input rows */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <SkeletonBlock className="h-3 w-1/3 rounded-md" />
            <SkeletonBlock className="h-10 w-full rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <SkeletonBlock className="h-3 w-1/3 rounded-md" />
            <SkeletonBlock className="h-10 w-full rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <SkeletonBlock className="h-3 w-1/3 rounded-md" />
            <SkeletonBlock className="h-10 w-full rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <SkeletonBlock className="h-3 w-1/3 rounded-md" />
            <SkeletonBlock className="h-10 w-full rounded-xl" />
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-1.5">
          <SkeletonBlock className="h-3 w-1/6 rounded-md" />
          <SkeletonBlock className="h-24 w-full rounded-xl" />
        </div>
      </div>

      {/* Button footer */}
      <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
        <SkeletonBlock className="h-10 w-20 rounded-xl" />
        <SkeletonBlock className="h-10 w-28 rounded-xl" />
      </div>
    </div>
  );
}

// 7. Full Article Detail View Skeleton
export function DetailSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
      {/* Category + Title */}
      <div className="space-y-3">
        <SkeletonBlock className="h-5 w-20 rounded-md" />
        <SkeletonBlock className="h-8 w-3/4 rounded-md" />
        <div className="flex space-x-4 pt-1">
          <SkeletonBlock className="h-3 w-24 rounded-md" />
          <SkeletonBlock className="h-3 w-28 rounded-md" />
        </div>
      </div>

      {/* Banner Image */}
      <SkeletonBlock className="aspect-video w-full rounded-2xl" />

      {/* Paragraph blocks */}
      <div className="space-y-3.5">
        <SkeletonBlock className="h-3.5 w-full rounded-md" />
        <SkeletonBlock className="h-3.5 w-full rounded-md" />
        <SkeletonBlock className="h-3.5 w-5/6 rounded-md" />
        <SkeletonBlock className="h-3.5 w-4/5 rounded-md" />
      </div>

      <div className="space-y-3.5 pt-4">
        <SkeletonBlock className="h-3.5 w-full rounded-md" />
        <SkeletonBlock className="h-3.5 w-11/12 rounded-md" />
        <SkeletonBlock className="h-3.5 w-5/6 rounded-md" />
      </div>
    </div>
  );
}
