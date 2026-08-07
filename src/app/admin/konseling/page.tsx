import { requireAdminSession } from "@/lib/requireAdminSession";
import AdminKonselingClient from "@/components/admin/konseling/AdminKonselingClient";

export default async function AdminKonselingPage() {
  await requireAdminSession();
  return <AdminKonselingClient />;
}
