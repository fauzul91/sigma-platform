import { requireAdminSession } from "@/lib/requireAdminSession";
import { fetchOrgMembers } from "@/services/admin/adminService";
import AdminOrganisasiClient from "@/components/admin/organisasi/AdminOrganisasiClient";

export default async function AdminOrganisasiPage() {
  await requireAdminSession();
  const members = await fetchOrgMembers();
  return <AdminOrganisasiClient initialMembers={members} />;
}
