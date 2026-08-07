"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminOrganisasiView from "@/components/admin/organisasi/AdminOrganisasiView";
import AdminToast from "@/components/admin/shared/AdminToast";
import { OrgMember } from "@/types";

export default function AdminOrganisasiClient({
  initialMembers,
}: {
  initialMembers: OrgMember[];
}) {
  const {
    orgMembers,
    editingMember,
    setEditingMember,
    handleSaveMember,
    toast,
  } = useAdminDashboard({
    initialOrgMembers: initialMembers,
  });

  return (
    <>
      <AdminToast toast={toast} />
      <AdminOrganisasiView
        members={orgMembers}
        editingMember={editingMember}
        setEditingMember={setEditingMember}
        onSave={handleSaveMember}
      />
    </>
  );
}
