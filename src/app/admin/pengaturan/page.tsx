import { requireAdminSession } from "@/lib/requireAdminSession";
import { fetchSettings } from "@/services/admin/adminService";
import AdminPengaturanClient from "@/components/admin/pengaturan/AdminPengaturanClient";

export default async function AdminPengaturanPage() {
  await requireAdminSession();
  const settings = await fetchSettings();
  return <AdminPengaturanClient initialSettings={settings} />;
}
