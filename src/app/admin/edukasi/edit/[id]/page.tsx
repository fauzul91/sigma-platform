import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/requireAdminSession";
import { fetchMediaById } from "@/services/admin/adminService";
import AdminEdukasiForm from "@/components/admin/edukasi/AdminEdukasiForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEdukasiEditPage({ params }: PageProps) {
  await requireAdminSession();
  const { id } = await params;

  const mediaItem = await fetchMediaById(id);
  if (!mediaItem) {
    redirect("/admin/edukasi");
  }

  return <AdminEdukasiForm initialData={mediaItem} />;
}
