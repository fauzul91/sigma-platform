"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Heart,
  ShieldCheck,
  UserCheck,
  Compass,
  BookmarkCheck,
  Layers,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { QuizQuestion } from "@/types";
import AdminPagination from "@/components/admin/shared/AdminPagination";

interface AdminKuisViewProps {
  quizzes: QuizQuestion[];
  allQuizzes: QuizQuestion[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategoryTab: string;
  setSelectedCategoryTab: (tab: string) => void;
  editingQuiz: Partial<QuizQuestion> | null;
  setEditingQuiz: (val: Partial<QuizQuestion> | null) => void;
  onSave: () => void;
  onDelete: (id: string, title: string) => void;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const quizCategoryList = [
  {
    slug: "semua",
    label: "Semua Kategori",
    icon: Layers,
    bgActive: "bg-slate-900 text-white border-slate-900",
    badgeBg: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700",
  },
  {
    slug: "pubertas",
    label: "Kesehatan Reproduksi",
    icon: Heart,
    bgActive: "bg-rose-600 text-white border-rose-600",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900/60",
  },
  {
    slug: "pernikahan-anak",
    label: "Pencegahan Perkawinan Anak",
    icon: ShieldCheck,
    bgActive: "bg-emerald-600 text-white border-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900/60",
  },
  {
    slug: "hak-anak",
    label: "Hak-Hak Anak",
    icon: UserCheck,
    bgActive: "bg-blue-600 text-white border-blue-600",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900/60",
  },
  {
    slug: "kesehatan-mental",
    label: "Kesehatan Mental",
    icon: Compass,
    bgActive: "bg-violet-600 text-white border-violet-600",
    badgeBg: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-900/60",
  },
  {
    slug: "kekerasan-seksual",
    label: "Pencegahan Kekerasan Seksual",
    icon: BookmarkCheck,
    bgActive: "bg-amber-600 text-white border-amber-600",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900/60",
  },
];

export default function AdminKuisView({
  quizzes,
  allQuizzes,
  searchTerm,
  setSearchTerm,
  selectedCategoryTab,
  setSelectedCategoryTab,
  editingQuiz,
  setEditingQuiz,
  onSave,
  onDelete,
  currentPage,
  totalItems,
  onPageChange,
}: AdminKuisViewProps) {
  // Compute counts per category
  const getCategoryCount = (slug: string) => {
    if (slug === "semua") return allQuizzes.length;
    return allQuizzes.filter((q) => q.category === slug).length;
  };

  const getCategoryBadge = (slug: string) => {
    const found = quizCategoryList.find((c) => c.slug === slug);
    return found ? found.badgeBg : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700";
  };

  const getCategoryLabel = (slug: string) => {
    const found = quizCategoryList.find((c) => c.slug === slug);
    return found ? found.label : slug;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* 1. Header Overview - Consistent with other modules */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-dark dark:text-slate-100 tracking-tight">
              Manajemen Kuis Interaktif
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/60 text-[11px] font-black">
              {totalItems} Soal
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Kelola bank soal kuis edukasi ramah remaja berdasarkan 5 kategori materi utama.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingQuiz({
              options: ["", "", "", ""],
              correctAnswer: 0,
              category: selectedCategoryTab !== "semua" ? selectedCategoryTab : "pubertas",
            })
          }
          className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Soal Baru</span>
        </button>
      </div>

      {/* 2. Category Section Selector Tabs (Touch-friendly Horizontal Scroll & Responsive) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {quizCategoryList.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategoryTab === cat.slug;
          const count = getCategoryCount(cat.slug);

          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategoryTab(cat.slug)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shrink-0 border transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-white border-primary shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-slate-400 dark:text-slate-400"}`} />
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Quiz Questions Data Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
        {/* Table Toolbar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Cari pertanyaan kuis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary dark:focus:border-primary transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 self-end sm:self-center">
            Total <span className="text-neutral-dark dark:text-slate-200 font-black">{totalItems}</span> Soal Terdaftar
          </div>
        </div>

        {quizzes.length === 0 ? (
          <div className="p-10 text-center space-y-2">
            <HelpCircle className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Belum ada pertanyaan pada kategori ini.</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Klik "Tambah Soal Baru" untuk menambahkan pertanyaan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
              <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-neutral-dark dark:text-slate-300 font-extrabold uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800 text-[10px]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Pertanyaan Kuis</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Kunci Jawaban</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {quizzes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-neutral-dark dark:text-slate-200">
                      <div className="space-y-1">
                        <p className="text-xs text-neutral-dark dark:text-slate-100 line-clamp-2 max-w-md">{q.questionText}</p>
                        {q.explanation && (
                          <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium line-clamp-1 italic">
                            Ket: {q.explanation}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${getCategoryBadge(q.category)}`}>
                        {getCategoryLabel(q.category)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/50 text-xs font-black">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Opsi {String.fromCharCode(65 + q.correctAnswer)}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setEditingQuiz(q)}
                          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700"
                          title="Edit Soal"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(q.id, q.questionText)}
                          className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all cursor-pointer border border-rose-200/60 dark:border-rose-900/50"
                          title="Hapus Soal"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reusable premium pagination controls */}
        <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
          <AdminPagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={5}
            onPageChange={onPageChange}
          />
        </div>
      </div>

      {/* 4. Overlay Modal for Quiz Question CRUD (Scrollable on Tablet & Mobile) */}
      {editingQuiz && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-xl max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-slate-900">
              <div>
                <h3 className="font-extrabold text-neutral-dark dark:text-slate-100 text-base sm:text-lg">
                  {editingQuiz.id ? "Edit Pertanyaan Kuis" : "Tambah Pertanyaan Kuis Baru"}
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 font-medium">
                  Pastikan opsi dan kunci jawaban telah ditentukan dengan benar.
                </p>
              </div>
              <button
                onClick={() => setEditingQuiz(null)}
                className="text-slate-400 hover:text-neutral-dark dark:hover:text-white font-bold p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Tutup Modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 grow touch-pan-y">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Teks Pertanyaan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Tuliskan soal pertanyaan di sini..."
                  value={editingQuiz.questionText || ""}
                  onChange={(e) =>
                    setEditingQuiz({
                      ...editingQuiz,
                      questionText: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
                  Pilihan Opsi Jawaban (A - D) <span className="text-rose-500">*</span>
                </label>
                {editingQuiz.options?.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5">
                    <span className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black text-xs flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <input
                      type="text"
                      required
                      placeholder={`Jawaban opsi ${String.fromCharCode(65 + idx)}`}
                      value={opt}
                      onChange={(e) => {
                        const updated = [...(editingQuiz.options || [])];
                        updated[idx] = e.target.value;
                        setEditingQuiz({ ...editingQuiz, options: updated });
                      }}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all"
                    />
                  </div>
                ))}
              </div>

              {/* Responsive Grid for Answer & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Kunci Jawaban Benar
                  </label>
                  <select
                    value={editingQuiz.correctAnswer ?? 0}
                    onChange={(e) =>
                      setEditingQuiz({
                        ...editingQuiz,
                        correctAnswer: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 font-bold text-neutral-dark dark:text-slate-100 focus:outline-none focus:border-primary dark:focus:border-primary transition-all"
                  >
                    <option value={0} className="dark:bg-slate-800">Opsi A</option>
                    <option value={1} className="dark:bg-slate-800">Opsi B</option>
                    <option value={2} className="dark:bg-slate-800">Opsi C</option>
                    <option value={3} className="dark:bg-slate-800">Opsi D</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Seksi Kategori
                  </label>
                  <select
                    value={editingQuiz.category || "pubertas"}
                    onChange={(e) =>
                      setEditingQuiz({
                        ...editingQuiz,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 font-bold text-neutral-dark dark:text-slate-100 focus:outline-none focus:border-primary dark:focus:border-primary transition-all"
                  >
                    <option value="pubertas" className="dark:bg-slate-800">Kesehatan Reproduksi (Pubertas)</option>
                    <option value="pernikahan-anak" className="dark:bg-slate-800">Pencegahan Perkawinan Anak</option>
                    <option value="hak-anak" className="dark:bg-slate-800">Hak-Hak Anak</option>
                    <option value="kesehatan-mental" className="dark:bg-slate-800">Kesehatan Mental</option>
                    <option value="kekerasan-seksual" className="dark:bg-slate-800">Pencegahan Kekerasan Seksual</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Penjelasan Edukasi
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Penjelasan ringkas yang muncul setelah remaja menjawab..."
                  value={editingQuiz.explanation || ""}
                  onChange={(e) =>
                    setEditingQuiz({
                      ...editingQuiz,
                      explanation: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                />
              </div>
            </div>

            {/* Modal Sticky Footer */}
            <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-end space-x-3 shrink-0">
              <button
                onClick={() => setEditingQuiz(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
              >
                Batal
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-xs active:scale-98 cursor-pointer transition-all"
              >
                Simpan Soal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
