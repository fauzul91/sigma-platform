"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminStatistikView from "@/components/admin/statistik/AdminStatistikView";
import AdminDeleteModal from "@/components/admin/shared/AdminDeleteModal";
import AdminToast from "@/components/admin/shared/AdminToast";
import { StatRecord } from "@/types";

export default function AdminStatistikClient({
  initialStats,
}: {
  initialStats: StatRecord[];
}) {
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
    toast,
  } = useAdminDashboard({
    initialStats,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 5;

  const filteredStats = stats.filter((s) =>
    s.year.toString().includes(searchTerm)
  );

  const slicedStats = filteredStats.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Auto-redirect ke page terakhir yang valid jika page sekarang kosong setelah delete
  useEffect(() => {
    if (filteredStats.length === 0) return; // tidak ada data sama sekali, biarkan
    const maxPage = Math.ceil(filteredStats.length / pageSize);
    if (page > maxPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", maxPage.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [filteredStats.length, page, pageSize, pathname, router, searchParams]);

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
      <AdminStatistikView
        stats={slicedStats}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        editingStat={editingStat}
        setEditingStat={setEditingStat}
        onSave={handleSaveStat}
        onDelete={(idx, title) =>
          setDeleteTarget({ type: "stat", id: idx, title })
        }
        currentPage={page}
        totalItems={filteredStats.length}
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
