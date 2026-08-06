"use client";

import React from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { QuizQuestion } from "@/types";

interface AdminKuisViewProps {
  quizzes: QuizQuestion[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingQuiz: Partial<QuizQuestion> | null;
  setEditingQuiz: (val: Partial<QuizQuestion> | null) => void;
  onSave: () => void;
  onDelete: (id: string, title: string) => void;
}

export default function AdminKuisView({
  quizzes,
  searchTerm,
  setSearchTerm,
  editingQuiz,
  setEditingQuiz,
  onSave,
  onDelete,
}: AdminKuisViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
          />
          <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
        </div>

        <button
          onClick={() =>
            setEditingQuiz({ options: ["", "", "", ""], correctAnswer: 0 })
          }
          className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Pertanyaan Kuis Baru</span>
        </button>
      </div>

      {/* Quiz Questions Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs font-semibold text-slate-500">
          <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Pertanyaan</th>
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4">Kunci</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quizzes
              .filter((q) =>
                q.questionText.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-neutral-dark truncate max-w-xs">
                    {q.questionText}
                  </td>
                  <td className="py-3.5 px-4 capitalize">{q.category}</td>
                  <td className="py-3.5 px-4">
                    Opsi {String.fromCharCode(65 + q.correctAnswer)}
                  </td>
                  <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingQuiz(q)}
                      className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(q.id, q.questionText)}
                      className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Overlay Modal for Quiz Question CRUD */}
      {editingQuiz && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
              <h3 className="font-extrabold text-neutral-dark text-lg">
                {editingQuiz.id
                  ? "Edit Pertanyaan Kuis"
                  : "Tambah Pertanyaan Kuis Baru"}
              </h3>
              <button
                onClick={() => setEditingQuiz(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Teks Pertanyaan
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingQuiz.questionText || ""}
                  onChange={(e) =>
                    setEditingQuiz({
                      ...editingQuiz,
                      questionText: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                  Opsi Jawaban (A s.d D)
                </label>
                {editingQuiz.options?.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="text-xs font-extrabold text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => {
                        const updated = [...(editingQuiz.options || [])];
                        updated[idx] = e.target.value;
                        setEditingQuiz({ ...editingQuiz, options: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Jawaban Benar
                  </label>
                  <select
                    value={editingQuiz.correctAnswer ?? 0}
                    onChange={(e) =>
                      setEditingQuiz({
                        ...editingQuiz,
                        correctAnswer: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-bold"
                  >
                    <option value={0}>Opsi A</option>
                    <option value={1}>Opsi B</option>
                    <option value={2}>Opsi C</option>
                    <option value={3}>Opsi D</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Kategori Kuis
                  </label>
                  <select
                    value={editingQuiz.category || "pubertas"}
                    onChange={(e) =>
                      setEditingQuiz({
                        ...editingQuiz,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-bold focus:outline-none"
                  >
                    <option value="pubertas">
                      Kesehatan Reproduksi (pubertas)
                    </option>
                    <option value="pernikahan-anak">
                      Pencegahan Perkawinan Anak
                    </option>
                    <option value="hak-anak">Hak-Hak Anak</option>
                    <option value="kesehatan-mental">Kesehatan Mental</option>
                    <option value="kekerasan-seksual">
                      Pencegahan Kekerasan Seksual
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Penjelasan Edukasi
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingQuiz.explanation || ""}
                  onChange={(e) =>
                    setEditingQuiz({
                      ...editingQuiz,
                      explanation: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
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
