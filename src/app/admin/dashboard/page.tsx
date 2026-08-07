import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionCookie,
} from "@/lib/adminSession";
import { fetchDashboardStats } from "@/services/admin/adminService";
import AdminDashboardClient from "@/components/admin/dashboard/AdminDashboardClient";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = await verifyAdminSessionCookie(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value,
  );

  if (!session) {
    redirect("/admin/login");
  }

  const stats = await fetchDashboardStats();

  return <AdminDashboardClient initialStats={stats} />;
}