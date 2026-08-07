import { requireAdminSession } from "@/lib/requireAdminSession";
import { fetchEvents } from "@/services/admin/adminService";
import AdminKegiatanClient from "@/components/admin/kegiatan/AdminKegiatanClient";

export default async function AdminKegiatanPage() {
  await requireAdminSession();
  const events = await fetchEvents();
  return <AdminKegiatanClient initialEvents={events} />;
}
