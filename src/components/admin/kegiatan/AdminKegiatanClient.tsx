"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminKegiatanView from "@/components/admin/kegiatan/AdminKegiatanView";
import AdminDeleteModal from "@/components/admin/shared/AdminDeleteModal";
import AdminToast from "@/components/admin/shared/AdminToast";
import { EventItem } from "@/types";

export default function AdminKegiatanClient({
  initialEvents,
}: {
  initialEvents: EventItem[];
}) {
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
  } = useAdminDashboard({
    initialEvents,
  });

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
        onDelete={(id, title) => setSearchTarget(id, title)}
      />
      <AdminDeleteModal
        deleteTarget={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={executeDelete}
      />
    </>
  );

  function setSearchTarget(id: string | number, title: string) {
    setDeleteTarget({ type: "event", id, title });
  }
}
