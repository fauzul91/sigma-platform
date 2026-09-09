import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/requireAdminSession";
import { fetchEventById, fetchEvents } from "@/services/admin/adminService";
import AdminKegiatanForm from "@/components/admin/kegiatan/AdminKegiatanForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminKegiatanEditPage({ params }: PageProps) {
  await requireAdminSession();
  const { id } = await params;

  const [eventItem, allEvents] = await Promise.all([
    fetchEventById(id),
    fetchEvents(),
  ]);

  if (!eventItem) {
    redirect("/admin/kegiatan");
  }

  return (
    <AdminKegiatanForm
      initialData={eventItem}
      existingEvents={allEvents}
    />
  );
}
