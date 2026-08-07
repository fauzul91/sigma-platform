"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminOrganisasiView from "@/components/admin/organisasi/AdminOrganisasiView";
import AdminToast from "@/components/admin/shared/AdminToast";

export default function AdminOrganisasiClient() {
  const {
    orgMembers,
    editingMember,
    setEditingMember,
    handleSaveMember,
    toast,
  } = useAdminDashboard();

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
