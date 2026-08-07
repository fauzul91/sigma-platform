"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminKonselingView from "@/components/admin/konseling/AdminKonselingView";
import AdminDeleteModal from "@/components/admin/shared/AdminDeleteModal";
import AdminToast from "@/components/admin/shared/AdminToast";
import { Counselor } from "@/types";

export default function AdminKonselingClient({
  initialCounselors,
}: {
  initialCounselors: Counselor[];
}) {
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
  } = useAdminDashboard({
    initialCounselors,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 5;

  const filteredCounselors = counselors.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const slicedCounselors = filteredCounselors.slice(
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
      <AdminKonselingView
        counselors={slicedCounselors}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        editingCounselor={editingCounselor}
        setEditingCounselor={setEditingCounselor}
        onSave={handleSaveCounselor}
        onDelete={(id, title) =>
          setDeleteTarget({ type: "counselor", id, title })
        }
        currentPage={page}
        totalItems={filteredCounselors.length}
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
