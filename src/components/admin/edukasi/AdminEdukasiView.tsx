"use client";

import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, UploadCloud } from "lucide-react";
import { MediaItem } from "@/types";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface AdminEdukasiViewProps {
  media: MediaItem[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingMedia: Partial<MediaItem> | null;
  setEditingMedia: (val: Partial<MediaItem> | null) => void;
  onSave: () => void;
  onDelete: (id: string, title: string) => void;
}

export default function AdminEdukasiView({
  media,
  searchTerm,
  setSearchTerm,
  editingMedia,
  setEditingMedia,
  onSave,
  onDelete,
}: AdminEdukasiViewProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    setUploadSuccess(false);
    const file = e.target.files?.[0];
    if (!file) return;

    const maxBytes = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxBytes) {
      setUploadError("File terlalu besar. Maksimal 10 MB.");
      return;
    }

    setIsUploading(true);
    try {
      const secureUrl = await uploadToCloudinary(file);
      setEditingMedia({ ...(editingMedia || {}), mediaUrl: secureUrl });
      setUploadSuccess(true);
    } catch (err) {
      setUploadError("Gagal mengunggah. Coba lagi.");
    } finally {
      setIsUploading(false);
    }
  };
  const isFormValid = () => {
    const titleValid = (editingMedia?.title || "").toString().trim().length > 0;
    const categoryValid = (editingMedia?.category || "").toString().trim().length > 0;
    const mediaUrlValid = (editingMedia?.mediaUrl || "").toString().trim().length > 0;
    return titleValid && categoryValid && mediaUrlValid && !isUploading;
  };
  const saveDisabled = !isFormValid();
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Cari artikel/video..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
          />
          <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
        </div>

        <button
          onClick={() => setEditingMedia({})}
          className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Konten Edukasi</span>
        </button>
      </div>

      {/* Media Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-xs font-semibold text-slate-500">
          <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Judul Artikel / Video</th>
              <th className="py-3.5 px-4">Tipe</th>
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {media
              .filter((m) =>
                m.title.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-neutral-dark">
                    {item.title}
                  </td>
                  <td className="py-3.5 px-4 capitalize">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.type === "video"
                          ? "bg-amber-50 text-amber-800"
                          : "bg-blue-50 text-blue-800"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 capitalize">{item.category}</td>
                  <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingMedia(item)}
                      className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id, item.title)}
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

      {/* Overlay Modal for Media CRUD */}
      {editingMedia && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
              <h3 className="font-extrabold text-neutral-dark text-lg">
                {editingMedia.id
                  ? "Edit Artikel/Video"
                  : "Unggah Artikel/Video Baru"}
              </h3>
              <button
                onClick={() => setEditingMedia(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Judul Media
                </label>
                <input
                  type="text"
                  required
                  value={editingMedia.title || ""}
                  onChange={(e) =>
                    setEditingMedia({ ...editingMedia, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Tipe Media
                  </label>
                  <select
                    value={editingMedia.type || "article"}
                    onChange={(e) =>
                      setEditingMedia({
                        ...editingMedia,
                        type: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white font-bold"
                  >
                    <option value="article">Artikel Teks</option>
                    <option value="video">Video Kampanye</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Kategori
                  </label>
                  <select
                    value={editingMedia.category || "edukasi"}
                    onChange={(e) =>
                      setEditingMedia({
                        ...editingMedia,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white font-bold"
                  >
                    <option value="edukasi">Edukasi</option>
                    <option value="umum">Umum</option>
                    <option value="berita">Berita & Rilis</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  {editingMedia.type === "video"
                    ? "Embed Video URL (YouTube)"
                    : "Featured Image CDN URL"}
                </label>
                {editingMedia.type === "video" ? (
                  <input
                    type="text"
                    placeholder="https://..."
                    value={editingMedia.mediaUrl || ""}
                    onChange={(e) =>
                      setEditingMedia({
                        ...editingMedia,
                        mediaUrl: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                ) : (
                  <div className="flex flex-col">
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs cursor-pointer form-input hover:bg-slate-50">
                      <UploadCloud className="h-4 w-4 text-slate-600" />
                      <span className="font-bold text-xs text-slate-700">
                        {isUploading ? "Mengunggah..." : "Unggah Gambar"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <div className="mt-2">
                      <span className="text-[11px] text-slate-400">Catatan: Maks 10 MB. Unggah file desain (JPG/PNG).</span>
                      {uploadError && (
                        <div className="text-[11px] text-rose-600 mt-1">{uploadError}</div>
                      )}
                      {uploadSuccess && !isUploading && (
                        <div className="text-[12px] text-emerald-600 mt-1">Unggah berhasil.</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Deskripsi / Konten Teks
                </label>
                <textarea
                  rows={4}
                  value={editingMedia.content || ""}
                  onChange={(e) =>
                    setEditingMedia({
                      ...editingMedia,
                      content: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setEditingMedia(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => { if (!saveDisabled) onSave(); }}
                disabled={saveDisabled}
                className={`${saveDisabled ? 'px-5 py-2.5 rounded-xl bg-primary/40 text-white text-xs font-bold cursor-not-allowed' : 'px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md cursor-pointer'}`}
              >
                Simpan Media
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
