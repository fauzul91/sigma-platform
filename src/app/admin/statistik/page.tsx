import { requireAdminSession } from "@/lib/requireAdminSession";
import AdminStatistikClient from "@/components/admin/statistik/AdminStatistikClient";

export default async function AdminStatistikPage() {
  await requireAdminSession();
  return <AdminStatistikClient />;
}
