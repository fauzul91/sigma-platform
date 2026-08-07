"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminKonselingView from "@/components/admin/konseling/AdminKonselingView";
import AdminDeleteModal from "@/components/admin/shared/AdminDeleteModal";
import AdminToast from "@/components/admin/shared/AdminToast";

export default function AdminKonselingClient() {
  const {
    counselors,
    searchTerm,
    setSearchTerm,
    editingCounselor,
    setEditingCounselor,
    handleSaveCounselor,
    deleteTarget,
    setDeleteTarget,
    executeDelete,
    toast,
  } = useAdminDashboard();

  return (
    <>
      <AdminToast toast={toast} />
      <AdminKonselingView
        counselors={counselors}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        editingCounselor={editingCounselor}
        setEditingCounselor={setEditingCounselor}
        onSave={handleSaveCounselor}
        onDelete={(id, title) =>
          setDeleteTarget({ type: "counselor", id, title })
        }
      />
      <AdminDeleteModal
        deleteTarget={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={executeDelete}
      />
    </>
  );
}
