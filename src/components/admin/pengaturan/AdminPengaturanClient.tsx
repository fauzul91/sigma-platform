"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminPengaturanView from "@/components/admin/pengaturan/AdminPengaturanView";
import AdminToast from "@/components/admin/shared/AdminToast";

export default function AdminPengaturanClient() {
  const {
    vision,
    setVision,
    mission,
    setMission,
    ketuaName,
    setKetuaName,
    handleSaveSettings,
    toast,
  } = useAdminDashboard();

  return (
    <>
      <AdminToast toast={toast} />
      <AdminPengaturanView
        vision={vision}
        setVision={setVision}
        mission={mission}
        setMission={setMission}
        ketuaName={ketuaName}
        setKetuaName={setKetuaName}
        onSave={handleSaveSettings}
      />
    </>
  );
}
