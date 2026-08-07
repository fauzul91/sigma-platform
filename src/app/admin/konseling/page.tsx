import { requireAdminSession } from "@/lib/requireAdminSession";
import { fetchCounselors } from "@/services/admin/adminService";
import AdminKonselingClient from "@/components/admin/konseling/AdminKonselingClient";

export default async function AdminKonselingPage() {
  await requireAdminSession();
  const counselors = await fetchCounselors();
  return <AdminKonselingClient initialCounselors={counselors} />;
}
