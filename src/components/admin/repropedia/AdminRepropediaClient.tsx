"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 5;

  const filteredModules = modules.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const slicedModules = filteredModules.slice(
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
      <AdminRepropediaView
        modules={slicedModules}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        editingModule={editingModule}
        setEditingModule={setEditingModule}
        onSave={handleSaveModule}
        onDelete={(id, title) => setDeleteTarget({ type: "module", id, title })}
        currentPage={page}
        totalItems={filteredModules.length}
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
