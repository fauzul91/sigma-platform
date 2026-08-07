"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 5;

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const slicedEvents = filteredEvents.slice(
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

  function setSearchTarget(id: string | number, title: string) {
    setDeleteTarget({ type: "event", id, title });
  }

  return (
    <>
      <AdminToast toast={toast} />
      <AdminKegiatanView
        events={slicedEvents}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        editingEvent={editingEvent}
        setEditingEvent={setEditingEvent}
        onSave={handleSaveEvent}
        onDelete={(id, title) => setSearchTarget(id, title)}
        currentPage={page}
        totalItems={filteredEvents.length}
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
