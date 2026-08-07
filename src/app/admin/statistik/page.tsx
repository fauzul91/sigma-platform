import { requireAdminSession } from "@/lib/requireAdminSession";
import { fetchStats } from "@/services/admin/adminService";
import AdminStatistikClient from "@/components/admin/statistik/AdminStatistikClient";

export default async function AdminStatistikPage() {
  await requireAdminSession();
  const stats = await fetchStats();
  return <AdminStatistikClient initialStats={stats} />;
}
