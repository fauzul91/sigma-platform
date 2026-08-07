import { requireAdminSession } from "@/lib/requireAdminSession";
import AdminRepropediaClient from "@/components/admin/repropedia/AdminRepropediaClient";

export default async function AdminRepropediaPage() {
  await requireAdminSession();
  return <AdminRepropediaClient />;
}
