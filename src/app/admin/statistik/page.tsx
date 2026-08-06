"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminStatistikView from "@/components/admin/statistik/AdminStatistikView";
import AdminDeleteModal from "@/components/admin/shared/AdminDeleteModal";
import AdminToast from "@/components/admin/shared/AdminToast";

export default function AdminStatistikPage() {
  const {
    stats,
    searchTerm,
    setSearchTerm,
    editingStat,
    setEditingStat,
    handleSaveStat,
    deleteTarget,
    setDeleteTarget,
    executeDelete,
    toast
  } = useAdminDashboard();

  return (
    <>
      <AdminToast toast={toast} />
      <AdminStatistikView
        stats={stats}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        editingStat={editingStat}
        setEditingStat={setEditingStat}
        onSave={handleSaveStat}
        onDelete={(idx, title) => setDeleteTarget({ type: "stat", id: idx, title })}
      />
      <AdminDeleteModal
        deleteTarget={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={executeDelete}
      />
    </>
  );
}
