"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, CheckCircle2, AlertCircle } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface DragDropUploadProps {
  currentUrl?: string;
  onUploadSuccess: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  note?: string;
}

export default function DragDropUpload({
  currentUrl,
  onUploadSuccess,
  onRemove,
  label = "Media Gambar",
  note = "Format JPG, PNG, atau WEBP. Maksimal 10 MB.",
}: DragDropUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("File harus berupa gambar (JPG, PNG, atau WEBP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Ukuran file terlalu besar (maksimal 10 MB).");
      return;
    }

    setIsUploading(true);
    setErrorMsg(null);

    try {
      const url = await uploadToCloudinary(file);
      onUploadSuccess(url);
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal mengunggah gambar. Silakan coba lagi.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
        {label}
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {currentUrl ? (
        /* Image Preview Box */
        <div className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3 min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUrl}
              alt="Preview"
              className="w-16 h-12 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs shrink-0"
            />
            <div className="min-w-0">
              <span className="text-xs font-bold text-neutral-dark dark:text-slate-100 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Gambar Tersimpan</span>
              </span>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate mt-0.5 max-w-[200px] sm:max-w-xs">
                {currentUrl}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              Ganti File
            </button>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="p-1.5 rounded-xl text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all cursor-pointer"
                title="Hapus gambar"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Drag & Drop Dropzone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-2 ${
            isDragging
              ? "border-primary bg-emerald-50/60 dark:bg-emerald-950/30 scale-[1.01]"
              : "border-slate-300/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 hover:border-slate-400 dark:hover:border-slate-600"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2 py-2">
              <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Mengunggah gambar ke server...</p>
            </div>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200 dark:border-slate-700 text-primary dark:text-emerald-400">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-neutral-dark dark:text-slate-100">
                  Tarik & Lepas Gambar di Sini
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  atau <span className="text-primary dark:text-emerald-400 font-bold underline">pilih file</span> dari komputer Anda
                </p>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{note}</p>
            </>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center space-x-1.5 text-[11px] font-bold text-rose-600 mt-1.5">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
