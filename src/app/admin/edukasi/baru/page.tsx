import { requireAdminSession } from "@/lib/requireAdminSession";
import AdminEdukasiForm from "@/components/admin/edukasi/AdminEdukasiForm";

export default async function AdminEdukasiBaruPage() {
  await requireAdminSession();
  return <AdminEdukasiForm />;
}
