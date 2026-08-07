"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminEdukasiView from "@/components/admin/edukasi/AdminEdukasiView";
import AdminDeleteModal from "@/components/admin/shared/AdminDeleteModal";
import AdminToast from "@/components/admin/shared/AdminToast";
import { MediaItem } from "@/types";

export default function AdminEdukasiClient({
  initialMedia,
}: {
  initialMedia: MediaItem[];
}) {
  const {
    media,
    searchTerm,
    setSearchTerm,
    editingMedia,
    setEditingMedia,
    handleSaveMedia,
    deleteTarget,
    setDeleteTarget,
    executeDelete,
    toast,
  } = useAdminDashboard({
    initialMedia,
  });

  return (
    <>
      <AdminToast toast={toast} />
      <AdminEdukasiView
        media={media}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        editingMedia={editingMedia}
        setEditingMedia={setEditingMedia}
        onSave={handleSaveMedia}
        onDelete={(id, title) => setDeleteTarget({ type: "media", id, title })}
      />
      <AdminDeleteModal
        deleteTarget={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={executeDelete}
      />
    </>
  );
}
