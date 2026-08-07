"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminKaryaKaderView from "@/components/admin/karya-kader/AdminKaryaKaderView";
import AdminDeleteModal from "@/components/admin/shared/AdminDeleteModal";
import AdminToast from "@/components/admin/shared/AdminToast";
import { UgcItem } from "@/types";

export default function AdminKaryaKaderClient({
  initialUgc,
}: {
  initialUgc: UgcItem[];
}) {
  const {
    ugc,
    searchTerm,
    setSearchTerm,
    editingUgc,
    setEditingUgc,
    handleSaveUgc,
    deleteTarget,
    setDeleteTarget,
    executeDelete,
    toast,
  } = useAdminDashboard({
    initialUgc,
  });

  return (
    <>
      <AdminToast toast={toast} />
      <AdminKaryaKaderView
        ugc={ugc}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        editingUgc={editingUgc}
        setEditingUgc={setEditingUgc}
        onSave={handleSaveUgc}
        onDelete={(id, title) => setDeleteTarget({ type: "ugc", id, title })}
      />
      <AdminDeleteModal
        deleteTarget={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={executeDelete}
      />
    </>
  );
}
