"use client";

import React from "react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminKuisView from "@/components/admin/kuis/AdminKuisView";
import AdminDeleteModal from "@/components/admin/shared/AdminDeleteModal";
import AdminToast from "@/components/admin/shared/AdminToast";

export default function AdminKuisClient() {
  const {
    quizzes,
    searchTerm,
    setSearchTerm,
    editingQuiz,
    setEditingQuiz,
    handleSaveQuiz,
    deleteTarget,
    setDeleteTarget,
    executeDelete,
    toast,
  } = useAdminDashboard();

  return (
    <>
      <AdminToast toast={toast} />
      <AdminKuisView
        quizzes={quizzes}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        editingQuiz={editingQuiz}
        setEditingQuiz={setEditingQuiz}
        onSave={handleSaveQuiz}
        onDelete={(id, title) => setDeleteTarget({ type: "quiz", id, title })}
      />
      <AdminDeleteModal
        deleteTarget={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={executeDelete}
      />
    </>
  );
}
