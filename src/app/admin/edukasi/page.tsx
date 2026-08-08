import { requireAdminSession } from "@/lib/requireAdminSession";
import { fetchMedia } from "@/services/admin/adminService";
import AdminEdukasiClient from "@/components/admin/edukasi/AdminEdukasiClient";

export default async function AdminEdukasiPage() {
  await requireAdminSession();
  const media = await fetchMedia();
  return <AdminEdukasiClient initialMedia={media} />;
}
