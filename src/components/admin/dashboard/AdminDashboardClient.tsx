"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminDashboardView from "@/components/admin/dashboard/AdminDashboardView";

export default function AdminDashboardClient() {
  const { dashboardStats, isLoading } = useAdminDashboard();

  return <AdminDashboardView stats={dashboardStats} isLoading={isLoading} />;
}
