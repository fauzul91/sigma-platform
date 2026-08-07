import { requireAdminSession } from "@/lib/requireAdminSession";
import AdminKegiatanClient from "@/components/admin/kegiatan/AdminKegiatanClient";

export default async function AdminKegiatanPage() {
  await requireAdminSession();
  return <AdminKegiatanClient />;
}
