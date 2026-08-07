"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminRepropediaView from "@/components/admin/repropedia/AdminRepropediaView";
import AdminDeleteModal from "@/components/admin/shared/AdminDeleteModal";
import AdminToast from "@/components/admin/shared/AdminToast";
import { RepropediaItem } from "@/types";

export default function AdminRepropediaClient({
  initialModules,
}: {
  initialModules: RepropediaItem[];
}) {
  const {
    modules,
    searchTerm,
    setSearchTerm,
    editingModule,
    setEditingModule,
    handleSaveModule,
    deleteTarget,
    setDeleteTarget,
    executeDelete,
    toast,
  } = useAdminDashboard({
    initialModules,
  });

  return (
    <>
      <AdminToast toast={toast} />
      <AdminRepropediaView
        modules={modules}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        editingModule={editingModule}
        setEditingModule={setEditingModule}
        onSave={handleSaveModule}
        onDelete={(id, title) => setDeleteTarget({ type: "module", id, title })}
      />
      <AdminDeleteModal
        deleteTarget={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={executeDelete}
      />
    </>
  );
}
