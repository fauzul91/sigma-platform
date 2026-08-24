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
    badgeBg: "bg-slate-100 text-slate-800 border-slate-200",
  },
  {
    slug: "pubertas",
    label: "Kesehatan Reproduksi",
    icon: Heart,
    bgActive: "bg-rose-600 text-white border-rose-600",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    slug: "pernikahan-anak",
    label: "Pencegahan Perkawinan Anak",
    icon: ShieldCheck,
    bgActive: "bg-emerald-600 text-white border-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    slug: "hak-anak",
    label: "Hak-Hak Anak",
    icon: UserCheck,
    bgActive: "bg-blue-600 text-white border-blue-600",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    slug: "kesehatan-mental",
    label: "Kesehatan Mental",
    icon: Compass,
    bgActive: "bg-violet-600 text-white border-violet-600",
    badgeBg: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    slug: "kekerasan-seksual",
    label: "Pencegahan Kekerasan Seksual",
    icon: BookmarkCheck,
    bgActive: "bg-amber-600 text-white border-amber-600",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
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
    return found ? found.badgeBg : "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getCategoryLabel = (slug: string) => {
    const found = quizCategoryList.find((c) => c.slug === slug);
    return found ? found.label : slug;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-neutral-dark">Manajemen Kuis Interaktif</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
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
          className="px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Soal Baru</span>
        </button>
      </div>

      {/* Category Section Selector Tabs (Visual Grid/Scroll) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {quizCategoryList.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategoryTab === cat.slug;
          const count = getCategoryCount(cat.slug);

          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategoryTab(cat.slug)}
              className={`p-5 rounded-3xl border text-left flex flex-col justify-between space-y-4 transition-all duration-200 cursor-pointer ${
                isActive
                  ? `${cat.bgActive} shadow-lg scale-[1.02]`
                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`p-2.5 rounded-2xl ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
                  <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-500"}`} />
                </div>
                <span
                  className={`text-xs font-black px-3 py-1 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count} Soal
                </span>
              </div>
              <span className="text-sm font-bold leading-snug">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quiz Questions Data Table Container */}
      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden mt-6">
        
        {/* Table Toolbar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-slate-100/80">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Cari pertanyaan kuis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          </div>
          <div className="text-xs font-bold text-slate-400">
            Total <span className="text-neutral-dark">{totalItems}</span> Soal
          </div>
        </div>

        {quizzes.length === 0 ? (
          <div className="p-10 text-center space-y-2">
            <HelpCircle className="h-8 w-8 text-slate-300 mx-auto" />
            <p className="text-xs font-bold text-slate-500">Belum ada pertanyaan pada seksi ini.</p>
            <p className="text-[11px] text-slate-400">Klik "Tambah Soal Baru" untuk menambahkan pertanyaan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold text-slate-500">
              <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200/80 text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Pertanyaan Kuis</th>
                  <th className="py-3.5 px-4">Seksi Kategori</th>
                  <th className="py-3.5 px-4">Kunci Jawaban</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quizzes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-neutral-dark">
                      <div className="space-y-1">
                        <p className="text-xs text-neutral-dark line-clamp-2 max-w-md">{q.questionText}</p>
                        {q.explanation && (
                          <p className="text-[10px] text-slate-400 font-medium line-clamp-1 italic">
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
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-black">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Opsi {String.fromCharCode(65 + q.correctAnswer)}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setEditingQuiz(q)}
                          className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-primary transition-all cursor-pointer border border-slate-200/60"
                          title="Edit Soal"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(q.id, q.questionText)}
                          className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all cursor-pointer border border-rose-200/60"
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
        <div className="p-4 bg-slate-50/50 border-t border-slate-100">
          <AdminPagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={5}
            onPageChange={onPageChange}
          />
        </div>
      </div>

      {/* Overlay Modal for Quiz Question CRUD */}
      {editingQuiz && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <h3 className="font-extrabold text-neutral-dark text-lg">
                {editingQuiz.id ? "Edit Pertanyaan Kuis" : "Tambah Pertanyaan Kuis Baru"}
              </h3>
              <button
                onClick={() => setEditingQuiz(null)}
                className="text-slate-400 hover:text-neutral-dark font-bold p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">
                  Teks Pertanyaan
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide block">
                  Pilihan Opsi Jawaban (A - D)
                </label>
                {editingQuiz.options?.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5">
                    <span className="h-7 w-7 rounded-lg bg-slate-100 text-slate-600 font-extrabold text-xs flex items-center justify-center shrink-0">
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
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-bold text-neutral-dark focus:outline-none"
                  >
                    <option value={0}>Opsi A</option>
                    <option value={1}>Opsi B</option>
                    <option value={2}>Opsi C</option>
                    <option value={3}>Opsi D</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-bold text-neutral-dark focus:outline-none"
                  >
                    <option value="pubertas">Kesehatan Reproduksi (Pubertas)</option>
                    <option value="pernikahan-anak">Pencegahan Perkawinan Anak</option>
                    <option value="hak-anak">Hak-Hak Anak</option>
                    <option value="kesehatan-mental">Kesehatan Mental</option>
                    <option value="kekerasan-seksual">Pencegahan Kekerasan Seksual</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setEditingQuiz(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md cursor-pointer"
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
