"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 5;

  const filteredUgc = ugc.filter((u) =>
    u.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.creatorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const slicedUgc = filteredUgc.slice(
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
      <AdminKaryaKaderView
        ugc={slicedUgc}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        editingUgc={editingUgc}
        setEditingUgc={setEditingUgc}
        onSave={handleSaveUgc}
        onDelete={(id, title) => setDeleteTarget({ type: "ugc", id, title })}
        currentPage={page}
        totalItems={filteredUgc.length}
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
