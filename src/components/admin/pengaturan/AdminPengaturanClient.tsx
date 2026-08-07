"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminPengaturanView from "@/components/admin/pengaturan/AdminPengaturanView";
import AdminToast from "@/components/admin/shared/AdminToast";
import { AdminGeneralSettings } from "@/types";

export default function AdminPengaturanClient({
  initialSettings,
}: {
  initialSettings: AdminGeneralSettings | null;
}) {
  const {
    vision,
    setVision,
    mission,
    setMission,
    ketuaName,
    setKetuaName,
    handleSaveSettings,
    toast,
  } = useAdminDashboard({
    initialSettings,
  });

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
