"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import AdminKuisView from "@/components/admin/kuis/AdminKuisView";
import AdminDeleteModal from "@/components/admin/shared/AdminDeleteModal";
import AdminToast from "@/components/admin/shared/AdminToast";
import { QuizQuestion } from "@/types";

export default function AdminKuisClient({
  initialQuizzes,
}: {
  initialQuizzes: QuizQuestion[];
}) {
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
  } = useAdminDashboard({
    initialQuizzes,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 5;

  const filteredQuizzes = quizzes.filter((q) =>
    q.questionText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const slicedQuizzes = filteredQuizzes.slice(
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
      <AdminKuisView
        quizzes={slicedQuizzes}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        editingQuiz={editingQuiz}
        setEditingQuiz={setEditingQuiz}
        onSave={handleSaveQuiz}
        onDelete={(id, title) => setDeleteTarget({ type: "quiz", id, title })}
        currentPage={page}
        totalItems={filteredQuizzes.length}
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
