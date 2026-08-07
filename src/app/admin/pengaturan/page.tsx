import { requireAdminSession } from "@/lib/requireAdminSession";
import AdminPengaturanClient from "@/components/admin/pengaturan/AdminPengaturanClient";

export default async function AdminPengaturanPage() {
  await requireAdminSession();
  return <AdminPengaturanClient />;
}
