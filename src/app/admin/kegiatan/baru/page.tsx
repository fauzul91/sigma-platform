import { requireAdminSession } from "@/lib/requireAdminSession";
import { fetchEvents } from "@/services/admin/adminService";
import AdminKegiatanForm from "@/components/admin/kegiatan/AdminKegiatanForm";

export default async function AdminKegiatanBaruPage() {
  await requireAdminSession();
  const existingEvents = await fetchEvents();
  return <AdminKegiatanForm existingEvents={existingEvents} />;
}
