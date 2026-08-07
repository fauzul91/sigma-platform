import { requireAdminSession } from "@/lib/requireAdminSession";
import AdminKaryaKaderClient from "@/components/admin/karya-kader/AdminKaryaKaderClient";

export default async function AdminKaryaKaderPage() {
  await requireAdminSession();
  return <AdminKaryaKaderClient />;
}
