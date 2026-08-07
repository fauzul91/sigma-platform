import { requireAdminSession } from "@/lib/requireAdminSession";
import AdminKuisClient from "@/components/admin/kuis/AdminKuisClient";

export default async function AdminKuisPage() {
  await requireAdminSession();
  return <AdminKuisClient />;
}
