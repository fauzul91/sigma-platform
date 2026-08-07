import { requireAdminSession } from "@/lib/requireAdminSession";
import AdminOrganisasiClient from "@/components/admin/organisasi/AdminOrganisasiClient";

export default async function AdminOrganisasiPage() {
  await requireAdminSession();
  return <AdminOrganisasiClient />;
}
