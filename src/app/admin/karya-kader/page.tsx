import { requireAdminSession } from "@/lib/requireAdminSession";
import { fetchUgc } from "@/services/admin/adminService";
import AdminKaryaKaderClient from "@/components/admin/karya-kader/AdminKaryaKaderClient";

export default async function AdminKaryaKaderPage() {
  await requireAdminSession();
  const ugc = await fetchUgc();
  return <AdminKaryaKaderClient initialUgc={ugc} />;
}
