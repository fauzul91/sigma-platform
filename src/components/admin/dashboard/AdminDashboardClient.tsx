"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminDashboardView from "@/components/admin/dashboard/AdminDashboardView";
import { AdminDashboardStats } from "@/types";

export default function AdminDashboardClient({
  initialStats,
}: {
  initialStats: AdminDashboardStats;
}) {
  const { dashboardStats, isLoading } = useAdminDashboard({
    initialDashboardStats: initialStats,
  });

  return <AdminDashboardView stats={dashboardStats} isLoading={isLoading} />;
}
