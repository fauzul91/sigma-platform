"use client";

import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, UploadCloud, Heart } from "lucide-react";
import { UgcItem } from "@/types";
import { uploadToCloudinary } from "@/lib/cloudinary";
import AdminPagination from "@/components/admin/shared/AdminPagination";
import DragDropUpload from "@/components/admin/shared/DragDropUpload";

interface AdminKaryaKaderViewProps {
  ugc: UgcItem[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingUgc: Partial<UgcItem> | null;
  setEditingUgc: (val: Partial<UgcItem> | null) => void;
  onSave: () => void;
  onDelete: (id: string, title: string) => void;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function AdminKaryaKaderView({
  ugc,
  searchTerm,
  setSearchTerm,
  editingUgc,
  setEditingUgc,
  onSave,
  onDelete,
  currentPage,
  totalItems,
  onPageChange,
}: AdminKaryaKaderViewProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const url = await uploadToCloudinary(file);
      setEditingUgc({
        ...editingUgc,
        mediaUrl: url,
      });
      setUploadSuccess(true);
    } catch (err: any) {
      setUploadError(err.message || "Gagal mengunggah file.");
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid = () => {
    return (
      editingUgc?.title &&
      editingUgc?.creatorName &&
      editingUgc?.school &&
      editingUgc?.mediaUrl
    );
  };

  const saveDisabled = !isFormValid();
  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header with Title and Create Button aligned */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-dark dark:text-slate-100 tracking-tight">
              Manajemen Karya Kader
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/60 text-[11px] font-black">
              {totalItems} Karya
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Review dan publikasi karya edukasi poster, infografis, dan video dari para kader.
          </p>
        </div>

        <button
          onClick={() => setEditingUgc({ likes: 0, type: "poster" })}
          className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Karya Kader Baru</span>
        </button>
      </div>

      {/* UGC Data Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
        {/* Table Toolbar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Cari karya, kreator, sekolah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary dark:focus:border-primary transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 self-end sm:self-center">
            Total <span className="text-neutral-dark dark:text-slate-200 font-black">{totalItems}</span> Karya Terdaftar
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
            <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-neutral-dark dark:text-slate-300 font-extrabold uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800 text-[10px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Karya</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Kreator &amp; Sekolah</th>
                <th className="py-3.5 px-4">Apresiasi</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {ugc.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-neutral-dark dark:text-slate-200">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                        {item.mediaUrl ? (
                          <img
                            src={item.mediaUrl}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">Foto</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="truncate block max-w-xs font-bold text-neutral-dark dark:text-slate-100">{item.title}</span>
                        {item.description && (
                          <span className="text-[10px] text-slate-400 dark:text-slate-400 truncate block max-w-xs font-normal">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-[10px] uppercase border border-slate-200/60 dark:border-slate-700">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <p className="font-bold text-neutral-dark dark:text-slate-200">{item.creatorName}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-400">{item.school}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1 font-bold text-rose-500">
                      <Heart className="h-3.5 w-3.5 fill-rose-500" />
                      <span>{item.likes}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setEditingUgc(item)}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700"
                        title="Edit Karya"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id, item.title)}
                        className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all cursor-pointer border border-rose-200/60 dark:border-rose-900/50"
                        title="Hapus Karya"
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

      {/* Overlay Modal for UGC CRUD (Scrollable on Tablet & Mobile) */}
      {editingUgc && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-xl max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-slate-900">
              <div>
                <h3 className="font-extrabold text-neutral-dark dark:text-slate-100 text-base sm:text-lg">
                  {editingUgc.id ? "Edit Karya Siswa" : "Tambah Karya Siswa Baru"}
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 font-medium">
                  Pastikan informasi kreator dan media karya terlampir dengan jelas.
                </p>
              </div>
              <button
                onClick={() => setEditingUgc(null)}
                className="text-slate-400 hover:text-neutral-dark dark:hover:text-white font-bold p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Tutup Modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 grow touch-pan-y">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Judul Karya <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Menjaga Diri dari Bahaya"
                    value={editingUgc.title || ""}
                    onChange={(e) =>
                      setEditingUgc({ ...editingUgc, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Nama Kreator <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama siswa/kader..."
                    value={editingUgc.creatorName || ""}
                    onChange={(e) =>
                      setEditingUgc({
                        ...editingUgc,
                        creatorName: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Asal Sekolah <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="SMPN 4 Sumberjambe"
                    value={editingUgc.school || ""}
                    onChange={(e) =>
                      setEditingUgc({ ...editingUgc, school: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Jenis Karya
                  </label>
                  <select
                    value={editingUgc.type || "poster"}
                    onChange={(e) =>
                      setEditingUgc({
                        ...editingUgc,
                        type: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-primary bg-white dark:bg-slate-800 font-bold text-neutral-dark dark:text-slate-100 transition-all"
                  >
                    <option value="poster" className="dark:bg-slate-800">Poster Kampanye</option>
                    <option value="infografis" className="dark:bg-slate-800">Infografis Data</option>
                    <option value="video" className="dark:bg-slate-800">Video Edukasi</option>
                  </select>
                </div>
              </div>

              {/* Full Width for Media Upload to give it more breathing room */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
                  Media Karya Siswa <span className="text-rose-500">*</span>
                </label>
                {editingUgc.type === "video" ? (
                  <input
                    type="text"
                    required
                    placeholder="https://..."
                    value={editingUgc.mediaUrl || ""}
                    onChange={(e) =>
                      setEditingUgc({
                        ...editingUgc,
                        mediaUrl: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-mono"
                  />
                ) : (
                  <DragDropUpload
                    label="Media Gambar Karya Siswa"
                    currentUrl={editingUgc.mediaUrl}
                    onUploadSuccess={(url) =>
                      setEditingUgc({
                        ...editingUgc,
                        mediaUrl: url,
                      })
                    }
                    onRemove={() =>
                      setEditingUgc({
                        ...editingUgc,
                        mediaUrl: "",
                      })
                    }
                  />
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
                  Deskripsi Karya
                </label>
                <textarea
                  rows={3}
                  placeholder="Gagasan atau pesan dari karya ini..."
                  value={editingUgc.description || ""}
                  onChange={(e) =>
                    setEditingUgc({
                      ...editingUgc,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                />
              </div>
            </div>

            {/* Modal Sticky Footer */}
            <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-end space-x-3 shrink-0">
              <button
                onClick={() => setEditingUgc(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (!saveDisabled) onSave();
                }}
                disabled={saveDisabled}
                className={`${
                  saveDisabled
                    ? "px-5 py-2 rounded-xl bg-primary/40 text-white text-xs font-bold cursor-not-allowed"
                    : "px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-xs active:scale-98 cursor-pointer transition-all"
                }`}
              >
                Simpan Karya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
