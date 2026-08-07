import { requireAdminSession } from "@/lib/requireAdminSession";
import { fetchModules } from "@/services/admin/adminService";
import AdminRepropediaClient from "@/components/admin/repropedia/AdminRepropediaClient";

export default async function AdminRepropediaPage() {
  await requireAdminSession();
  const modules = await fetchModules();
  return <AdminRepropediaClient initialModules={modules} />;
}
