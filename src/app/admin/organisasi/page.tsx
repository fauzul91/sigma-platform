import { redirect } from "next/navigation";
// import { requireAdminSession } from "@/lib/requireAdminSession";
// import { fetchOrgMembers } from "@/services/admin/adminService";
// import AdminOrganisasiClient from "@/components/admin/organisasi/AdminOrganisasiClient";

export default async function AdminOrganisasiPage() {
  // Halaman disembunyikan sementara sesuai permintaan, redirect ke dashboard
  redirect("/admin/dashboard");
}
