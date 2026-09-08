"use client";

import React, { useState, useRef } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  UploadCloud,
  Image as ImageIcon,
  X,
  CheckCircle2,
  Loader2,
  Layers,
  AlertCircle,
} from "lucide-react";
import { EventItem } from "@/types";
import AdminPagination from "@/components/admin/shared/AdminPagination";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface AdminKegiatanViewProps {
  events: EventItem[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingEvent: Partial<EventItem> | null;
  setEditingEvent: (val: Partial<EventItem> | null) => void;
  onSave: () => void;
  onDelete: (id: string, title: string) => void;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function AdminKegiatanView({
  events,
  searchTerm,
  setSearchTerm,
  editingEvent,
  setEditingEvent,
  onSave,
  onDelete,
  currentPage,
  totalItems,
  onPageChange,
}: AdminKegiatanViewProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if chosen week is already used by another event
  const targetWeek = editingEvent?.week ?? 1;
  const existingEventForWeek = events.find(
    (ev) => ev.week === targetWeek && ev.id !== editingEvent?.id
  );

  const handleValidateAndSave = () => {
    if (!editingEvent?.title?.trim()) {
      alert("Nama kegiatan wajib diisi!");
      return;
    }
    if (existingEventForWeek) {
      alert(
        `Gagal Simpan: Minggu ke-${targetWeek} sudah digunakan oleh kegiatan:\n"${existingEventForWeek.title}"\n\nUntuk menjaga keteraturan galeri (1 agenda highlight per minggu), silakan buka dan edit kegiatan tersebut untuk menambahkan foto dokumentasi baru.`
      );
      return;
    }
    onSave();
  };

  const processFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0 || !editingEvent) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];
    let completed = 0;

    try {
      // Process in batches of 3 concurrent uploads for speed & stability
      const BATCH_SIZE = 3;
      for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = files.slice(i, i + BATCH_SIZE);
        setUploadProgress(
          `Mengunggah ${completed + 1} - ${Math.min(completed + batch.length, files.length)} dari ${files.length} foto...`
        );
        const batchUrls = await Promise.all(batch.map((f) => uploadToCloudinary(f)));
        uploadedUrls.push(...batchUrls);
        completed += batch.length;
      }

      const existingImages = (editingEvent.images || []).filter(Boolean);
      setEditingEvent({
        ...editingEvent,
        images: [...existingImages, ...uploadedUrls],
      });
    } catch (err: any) {
      alert("Gagal mengunggah foto ke Cloudinary: " + (err.message || "Error tidak diketahui"));
    } finally {
      setIsUploading(false);
      setUploadProgress("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await processFiles(e.target.files);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (indexToRemove: number) => {
    if (!editingEvent) return;
    const updated = (editingEvent.images || []).filter((_, i) => i !== indexToRemove);
    setEditingEvent({ ...editingEvent, images: updated });
  };

  const clearAllImages = () => {
    if (!editingEvent) return;
    if (window.confirm("Yakin ingin menghapus semua foto dokumentasi yang telah terunggah?")) {
      setEditingEvent({ ...editingEvent, images: [] });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with Title and Create Button aligned */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-neutral-dark">Manajemen Kegiatan &amp; Event</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Kelola jadwal sosialisasi, dokumentasi per minggu, dan unggah foto kegiatan.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingEvent({
              attendees: 0,
              images: [],
              week: 1,
            })
          }
          className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Kegiatan Baru</span>
        </button>
      </div>

      {/* Events Data Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden overflow-x-auto">
        {/* Table Toolbar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-slate-100/80">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Cari kegiatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs focus:outline-none focus:bg-white focus:border-primary transition-all"
            />
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
          <span className="text-xs font-bold text-slate-400">
            Total {totalItems} Kegiatan Tercatat
          </span>
        </div>

        <table className="w-full text-left text-xs font-semibold text-slate-500">
          <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Nama Kegiatan</th>
              <th className="py-3.5 px-4">Minggu</th>
              <th className="py-3.5 px-4">Tanggal</th>
              <th className="py-3.5 px-4">Lokasi</th>
              <th className="py-3.5 px-4">Peserta</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-neutral-dark">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-primary">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <span>{item.title}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[10px]">
                    Minggu {item.week || 1}
                  </span>
                </td>
                <td className="py-3.5 px-4">{item.date}</td>
                <td className="py-3.5 px-4">{item.location}</td>
                <td className="py-3.5 px-4">{item.attendees} Orang</td>
                <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingEvent(item)}
                    className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer"
                    title="Edit Kegiatan"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id, item.title)}
                    className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                    title="Hapus Kegiatan"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Reusable pagination controls */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100">
          <AdminPagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={5}
            onPageChange={onPageChange}
          />
        </div>
      </div>

      {/* Overlay Modal for Event CRUD */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200/80 shadow-xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-extrabold text-neutral-dark text-lg">
                {editingEvent.id ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}
              </h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Nama Kegiatan */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Nama Kegiatan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sosialisasi Pencegahan Perkawinan Anak di SMPN 4"
                  value={editingEvent.title || ""}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              {/* Minggu Program, Tanggal, & Peserta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Minggu ke- (Week)
                  </label>
                  <select
                    value={editingEvent.week ?? 1}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        week: Number(e.target.value),
                      })
                    }
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-primary bg-white transition-colors ${
                      existingEventForWeek
                        ? "border-amber-400 bg-amber-50/30"
                        : "border-slate-200"
                    }`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((w) => {
                      const isOccupied = events.some(
                        (ev) => ev.week === w && ev.id !== editingEvent?.id
                      );
                      return (
                        <option key={w} value={w}>
                          Minggu {w} {isOccupied ? "• (Sudah Terisi)" : "• (Tersedia)"}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Tanggal
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="14 Mei 2026"
                    value={editingEvent.date || ""}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, date: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Peserta
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="100"
                    value={editingEvent.attendees ?? 0}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        attendees: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Warning Banner jika Minggu sudah terisi oleh kegiatan lain */}
              {existingEventForWeek && (
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/90 text-xs text-amber-900 flex items-start gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-extrabold text-amber-950">
                      Minggu ke-{targetWeek} Sudah Memiliki Agenda
                    </p>
                    <p className="text-[11px] text-amber-800">
                      Kegiatan yang sudah terdaftar: <strong className="font-semibold">"{existingEventForWeek.title}"</strong>.
                    </p>
                    <p className="text-[10px] text-amber-700">
                      💡 <em>Saran:</em> Tutup form ini dan klik tombol <strong>Edit</strong> pada kegiatan Minggu ke-{targetWeek} untuk mengunggah foto dokumentasi tambahan.
                    </p>
                  </div>
                </div>
              )}

              {/* Lokasi Kegiatan */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Lokasi Kegiatan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Aula SMPN 4 Sumberjambe"
                  value={editingEvent.location || ""}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              {/* Deskripsi Kegiatan */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Deskripsi Kegiatan
                </label>
                <textarea
                  rows={3}
                  placeholder="Rincian agenda dan hasil dari kegiatan..."
                  value={editingEvent.description || ""}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              {/* CLOUDINARY MULTI-FILE UPLOAD SECTION */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <UploadCloud className="h-4 w-4 text-primary" />
                    <span>Foto Dokumentasi (Cloudinary Multi-Upload)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {(editingEvent.images || []).length} Foto Terlampir
                    </span>
                    {(editingEvent.images || []).length > 0 && (
                      <button
                        type="button"
                        onClick={clearAllImages}
                        className="text-[10px] text-rose-600 hover:text-rose-700 font-bold underline cursor-pointer"
                      >
                        Hapus Semua
                      </button>
                    )}
                  </div>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFilesUpload}
                  className="hidden"
                />

                {/* Upload Trigger Dropzone Box with Drag & Drop */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                    isDragging
                      ? "border-primary bg-emerald-100/40 scale-[1.01]"
                      : isUploading
                      ? "border-primary bg-emerald-50/50"
                      : "border-slate-300 hover:border-primary hover:bg-emerald-50/20"
                  }`}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center space-y-2 py-2">
                      <Loader2 className="h-7 w-7 text-primary animate-spin" />
                      <p className="text-xs font-bold text-emerald-800">
                        {uploadProgress || "Mengunggah foto ke Cloudinary..."}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Mohon tunggu, foto sedang diunggah secara bertahap...
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center border border-emerald-100 shadow-2xs">
                        <UploadCloud className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-800">
                          Klik untuk Memilih File atau Tarik Foto ke Sini
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Bisa memilih <span className="text-emerald-700 font-bold">banyak foto sekaligus</span> (tahan tombol Ctrl / Shift saat memilih).
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-white px-3 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                        <Plus className="h-3.5 w-3.5" /> Pilih Banyak Foto
                      </span>
                    </>
                  )}
                </div>

                {/* Thumbnails of Uploaded Images */}
                {(editingEvent.images || []).length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500">
                        Preview Foto Terunggah ({(editingEvent.images || []).length} Foto):
                      </span>
                      <button
                        type="button"
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                        className="text-xs text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" /> Tambah Foto Lagi
                      </button>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 max-h-60 overflow-y-auto p-1.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                      {(editingEvent.images || []).map((url, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 shadow-2xs"
                        >
                          <img
                            src={url}
                            alt={`Dokumentasi ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono font-bold">
                            #{idx + 1}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-90 hover:opacity-100 hover:scale-110 transition-all shadow-xs cursor-pointer"
                            title="Hapus foto ini"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleValidateAndSave}
                disabled={isUploading || Boolean(existingEventForWeek)}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md disabled:opacity-50 cursor-pointer"
              >
                Simpan Kegiatan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
