"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  Calendar,
  MapPin,
  Users,
  UploadCloud,
  Plus,
  X,
  Layers,
  AlertCircle,
} from "lucide-react";
import { EventItem } from "@/types";
import { saveEvent } from "@/services/admin/adminService";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { compressImage, runWithConcurrency } from "@/lib/imageCompression";
import AdminToast from "@/components/admin/shared/AdminToast";

interface AdminKegiatanFormProps {
  initialData?: Partial<EventItem> | null;
  existingEvents?: EventItem[];
}

export default function AdminKegiatanForm({
  initialData,
  existingEvents = [],
}: AdminKegiatanFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData?.id);

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [week, setWeek] = useState<number>(initialData?.week ?? 1);
  const [isCustomWeek, setIsCustomWeek] = useState(false);
  const [date, setDate] = useState(initialData?.date || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [attendees, setAttendees] = useState<number>(initialData?.attendees || 0);
  const [description, setDescription] = useState(initialData?.description || "");
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  // Sync custom week mode
  useEffect(() => {
    if (initialData?.week !== undefined) {
      const isPreset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 99].includes(initialData.week);
      setIsCustomWeek(!isPreset);
    }
  }, [initialData?.week]);

  // Upload States
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [uploadStats, setUploadStats] = useState<{
    completed: number;
    total: number;
    phase: "compressing" | "uploading";
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Saving state & Toast
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info" | "danger";
  } | null>(null);

  const showToast = (message: string, toastType: "success" | "info" | "danger" = "success") => {
    setToast({ message, type: toastType });
    setTimeout(() => setToast(null), 3500);
  };

  // Check if chosen week is already used by another event
  const existingEventForWeek = existingEvents.find(
    (ev) => ev.week === week && ev.id !== initialData?.id
  );
  const targetLabel = week === 99 ? "Penutupan Program" : `Minggu ke-${week}`;

  // Multi-photo processing pipeline (auto-compress + concurrent upload)
  const processFiles = async (fileList: FileList | File[]) => {
    const rawFiles = Array.from(fileList).filter((f) => {
      return f.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|avif)$/i.test(f.name);
    });
    if (rawFiles.length === 0) return;

    setIsUploading(true);
    setUploadStats({ completed: 0, total: rawFiles.length, phase: "compressing" });
    setUploadProgress(`Mengompresi ${rawFiles.length} foto di browser...`);

    try {
      // 1. Kompresi Cepat di Sisi Klien (HTML5 Canvas Native)
      const compressedFiles = await Promise.all(
        rawFiles.map((f) =>
          compressImage(f, {
            maxWidth: 1920,
            maxHeight: 1920,
            quality: 0.82,
          })
        )
      );

      // 2. Unggah Simultan ke Cloudinary (Worker Pool 3 koneksi)
      setUploadStats({ completed: 0, total: compressedFiles.length, phase: "uploading" });
      setUploadProgress(`Mengunggah 0 dari ${compressedFiles.length} foto...`);

      const uploadedUrls: string[] = [];
      const failedNames: string[] = [];

      await runWithConcurrency(
        compressedFiles,
        3,
        async (file) => {
          return await uploadToCloudinary(file, {
            folder: "sigma-assets/kegiatan",
            skipCompression: true,
          });
        },
        (completed, total, url, err, idx) => {
          setUploadStats({ completed, total, phase: "uploading" });
          setUploadProgress(`Mengunggah foto ${completed} dari ${total}...`);

          if (url) {
            uploadedUrls.push(url);
            // Progresif real-time: langsung muncul di thumbnail grid
            setImages((prev) => [...prev, url]);
          } else if (err && idx !== undefined) {
            failedNames.push(rawFiles[idx]?.name || `Foto #${idx + 1}`);
          }
        }
      );

      if (failedNames.length > 0) {
        showToast(
          `${uploadedUrls.length} foto berhasil diunggah. ${failedNames.length} foto gagal.`,
          "info"
        );
      } else {
        showToast(`${uploadedUrls.length} foto dokumentasi berhasil ditambahkan!`, "success");
      }
    } catch (err: any) {
      showToast("Gagal mengunggah foto: " + (err.message || "Error tidak diketahui"), "danger");
    } finally {
      setIsUploading(false);
      setUploadStats(null);
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
    setImages(images.filter((_, i) => i !== indexToRemove));
  };

  const clearAllImages = () => {
    if (window.confirm("Yakin ingin menghapus semua foto dokumentasi ini?")) {
      setImages([]);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Nama kegiatan wajib diisi!");
      return;
    }

    if (existingEventForWeek) {
      alert(
        `Gagal Simpan: Agenda ${targetLabel} sudah digunakan oleh kegiatan:\n"${existingEventForWeek.title}"\n\nUntuk menjaga keteraturan galeri (1 agenda highlight per minggu/kategori), silakan gunakan nomor minggu lain atau edit kegiatan yang sudah ada.`
      );
      return;
    }

    setIsSaving(true);
    try {
      const payload: Partial<EventItem> = {
        ...(initialData?.id ? { id: initialData.id } : {}),
        title: title.trim(),
        week: Number(week) || 1,
        date: date.trim() || "Hari ini",
        location: location.trim() || "SMPN 4 Sumberjambe",
        attendees: Number(attendees) || 0,
        description: description.trim(),
        images,
      };

      const saved = await saveEvent(payload);
      if (saved) {
        showToast(
          isEditing ? "Agenda kegiatan berhasil diperbarui!" : "Agenda kegiatan baru berhasil dicatat!",
          "success"
        );
        setTimeout(() => {
          router.push("/admin/kegiatan");
          router.refresh();
        }, 800);
      } else {
        showToast("Gagal menyimpan agenda ke database. Silakan coba lagi.", "danger");
      }
    } catch (err: any) {
      showToast("Terjadi kesalahan: " + (err.message || "Gagal simpan"), "danger");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <AdminToast toast={toast} />

      <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300 pb-16">
        {/* Top Sticky Action Bar */}
        <div className="sticky top-16 z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2.5 shadow-2xs">
          <div className="flex items-center space-x-2.5 min-w-0">
            <Link
              href="/admin/kegiatan"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              title="Kembali ke Daftar Kegiatan"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate">
                {isEditing ? `Edit: ${initialData?.title || "Kegiatan"}` : "Catat Agenda & Dokumentasi Baru"}
              </h2>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60 shrink-0">
                  {targetLabel}
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">
                  {images.length} Foto Terlampir
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <Link
              href="/admin/kegiatan"
              className="px-3 sm:px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-all"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="px-3.5 sm:px-4.5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs hover:shadow-sm active:scale-98 transition-all disabled:opacity-60 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{isEditing ? "Simpan" : "Simpan Agenda"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Left Column (5/12): Informasi Agenda & Jadwal */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Rincian Informasi Agenda</span>
              </h3>

              {/* Nama Kegiatan */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide block">
                  Nama Kegiatan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sosialisasi Pencegahan Pernikahan Dini"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Selektor Minggu / Penutupan */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Kategori Agenda / Minggu</span>
                </label>
                <select
                  value={isCustomWeek ? "custom" : week}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "custom") {
                      setIsCustomWeek(true);
                      if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 99].includes(week)) {
                        setWeek(11);
                      }
                    } else {
                      setIsCustomWeek(false);
                      setWeek(Number(val));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none focus:border-primary"
                >
                  <optgroup label="Minggu Pelaksanaan Program">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        Minggu ke-{num}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Agenda Khusus">
                    <option value={99}>Penutupan Program (Closing)</option>
                  </optgroup>
                  <optgroup label="Kustom">
                    <option value="custom">+ Custom Nomor Minggu Lainnya...</option>
                  </optgroup>
                </select>

                {/* Input angka tambahan jika memilih Custom */}
                {isCustomWeek && (
                  <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 space-y-1 animate-in fade-in duration-200">
                    <label className="text-[11px] font-extrabold text-emerald-900 dark:text-emerald-200 block">
                      Masukkan Nomor Minggu Kustom:
                    </label>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Minggu ke-</span>
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={week}
                        onChange={(e) => setWeek(Number(e.target.value) || 1)}
                        className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                )}

                {/* Warning jika minggu sudah dipakai agenda lain */}
                {existingEventForWeek && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs space-y-1 animate-in fade-in">
                    <div className="flex items-center space-x-1.5 font-bold text-amber-800 dark:text-amber-300">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{targetLabel} Sudah Terisi</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-amber-800/90 dark:text-amber-300/90">
                      Kegiatan <strong>"{existingEventForWeek.title}"</strong> telah menggunakan slot ini.
                    </p>
                  </div>
                )}
              </div>

              {/* Tanggal & Lokasi (Grid 2 Kolom) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide block">
                    Tanggal Pelaksanaan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 15 Maret 2026"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide block">
                    Peserta (Orang)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Contoh: 65"
                    value={attendees}
                    onChange={(e) => setAttendees(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Lokasi Kegiatan */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide block">
                  Lokasi Kegiatan
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Aula SMPN 4 Sumberjambe"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary"
                  />
                  <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-3" />
                </div>
              </div>

              {/* Deskripsi Kegiatan */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide block">
                  Rincian Deskripsi Kegiatan
                </label>
                <textarea
                  rows={4}
                  placeholder="Rincian pelaksanaan sosialisasi, topik edukasi yang dibawakan, dan respon audiens..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Right Column (7/12): Multi-Upload Foto Dokumentasi */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <UploadCloud className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100">
                    Galeri Dokumentasi Foto
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                    {images.length} Foto
                  </span>
                  {images.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAllImages}
                      className="text-[11px] text-rose-600 dark:text-rose-400 hover:text-rose-700 font-bold underline cursor-pointer"
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

              {/* Upload Dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all flex flex-col items-center justify-center space-y-2.5 cursor-pointer ${
                  isDragging
                    ? "border-primary bg-emerald-100/40 dark:bg-emerald-950/30 scale-[1.01]"
                    : isUploading
                    ? "border-primary bg-emerald-50/50 dark:bg-emerald-950/20"
                    : "border-slate-300 dark:border-slate-700 hover:border-primary hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20"
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center space-y-2.5 py-3 w-full max-w-sm mx-auto">
                    <Loader2 className="h-7 w-7 text-primary dark:text-emerald-400 animate-spin" />
                    <div className="text-center space-y-1.5 w-full">
                      <p className="text-xs font-extrabold text-emerald-900 dark:text-emerald-200">
                        {uploadProgress || "Mengunggah foto..."}
                      </p>
                      {uploadStats && uploadStats.total > 0 && (
                        <div className="w-full space-y-1.5 pt-1">
                          <div className="w-full bg-emerald-100/70 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                              style={{
                                width: `${Math.round(
                                  (uploadStats.completed / uploadStats.total) * 100
                                )}%`,
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 px-0.5">
                            <span>
                              {uploadStats.phase === "compressing"
                                ? "Kompresi Klien (Hemat Ukuran ~90%)"
                                : `${uploadStats.completed} dari ${uploadStats.total} foto selesai`}
                            </span>
                            <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">
                              {Math.round((uploadStats.completed / uploadStats.total) * 100)}%
                            </span>
                          </div>
                        </div>
                      )}
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        Foto di-compress otomatis di browser &amp; langsung muncul di bawah.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-800 text-primary dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-slate-700 shadow-2xs">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                        Klik untuk Memilih Banyak Foto atau Tarik File ke Sini
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Bisa memilih <span className="text-emerald-700 dark:text-emerald-400 font-bold">banyak foto sekaligus</span> (JPG, PNG, atau WebP).
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary dark:text-emerald-400 bg-white dark:bg-slate-800 px-3.5 py-1.5 rounded-xl border border-emerald-200 dark:border-slate-700 shadow-2xs">
                      <Plus className="h-3.5 w-3.5" /> Pilih Foto Dokumentasi
                    </span>
                  </>
                )}
              </div>

              {/* Uploaded Photos Grid Preview */}
              {images.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                      Foto Terunggah ({images.length} Foto):
                    </span>
                    <button
                      type="button"
                      onClick={() => !isUploading && fileInputRef.current?.click()}
                      className="text-xs text-primary dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Tambah Foto Lagi
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[480px] overflow-y-auto p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                    {images.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 dark:bg-slate-700 border border-slate-200/80 dark:border-slate-700 shadow-2xs"
                      >
                        <img
                          src={url}
                          alt={`Dokumentasi ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono font-bold">
                          #{idx + 1}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-rose-600 text-white opacity-90 hover:opacity-100 hover:scale-110 transition-all shadow-xs cursor-pointer"
                          title="Hapus foto ini"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
