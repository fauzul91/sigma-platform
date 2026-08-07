"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 5;

  const filteredMedia = media.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const slicedMedia = filteredMedia.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <AdminToast toast={toast} />
      <AdminEdukasiView
        media={slicedMedia}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        editingMedia={editingMedia}
        setEditingMedia={setEditingMedia}
        onSave={handleSaveMedia}
        onDelete={(id, title) => setDeleteTarget({ type: "media", id, title })}
        currentPage={page}
        totalItems={filteredMedia.length}
        onPageChange={handlePageChange}
      />
      <AdminDeleteModal
        deleteTarget={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={executeDelete}
      />
    </>
  );
}
