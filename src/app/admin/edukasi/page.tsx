import { requireAdminSession } from "@/lib/requireAdminSession";
import AdminEdukasiClient from "@/components/admin/edukasi/AdminEdukasiClient";

export default async function AdminEdukasiPage() {
  await requireAdminSession();
  return <AdminEdukasiClient />;
}
