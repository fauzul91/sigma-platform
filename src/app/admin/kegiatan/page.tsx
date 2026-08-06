"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminKegiatanView from "@/components/admin/kegiatan/AdminKegiatanView";
import AdminDeleteModal from "@/components/admin/shared/AdminDeleteModal";
import AdminToast from "@/components/admin/shared/AdminToast";

export default function AdminKegiatanPage() {
  const {
    events,
    searchTerm,
    setSearchTerm,
    editingEvent,
    setEditingEvent,
    handleSaveEvent,
    deleteTarget,
    setDeleteTarget,
    executeDelete,
    toast,
  } = useAdminDashboard();

  return (
    <>
      <AdminToast toast={toast} />
      <AdminKegiatanView
        events={events}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        editingEvent={editingEvent}
        setEditingEvent={setEditingEvent}
        onSave={handleSaveEvent}
        onDelete={(id, title) => setDeleteTarget({ type: "event", id, title })}
      />
      <AdminDeleteModal
        deleteTarget={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={executeDelete}
      />
    </>
  );
}
