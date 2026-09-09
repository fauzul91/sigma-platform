"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Send,
  Loader2,
  BookOpen,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import { ArticleItem, ArticleStatus } from "@/types";
import { generateSlug } from "@/utils/slugUtils";
import { saveArticle } from "@/services/admin/articleAdminService";
import TiptapEditor from "@/components/admin/editor/TiptapEditor";
import DragDropUpload from "@/components/admin/shared/DragDropUpload";
import AdminToast from "@/components/admin/shared/AdminToast";

interface AdminArtikelFormProps {
  initialData?: ArticleItem | null;
}

export default function AdminArtikelForm({ initialData }: AdminArtikelFormProps) {
  const router = useRouter();
  const isEditing = !!initialData?.id;

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [category, setCategory] = useState(initialData?.category || "Kesehatan Reproduksi");
  const [author, setAuthor] = useState(initialData?.author || "Tim Redaksi SIGMA");
  const [readTime, setReadTime] = useState(initialData?.readTime || "3 Menit");
  const [status, setStatus] = useState<ArticleStatus>(initialData?.status || "published");
  const [content, setContent] = useState<any>(
    initialData?.content || {
      type: "doc",
      content: [{ type: "paragraph" }],
    }
  );

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "danger" } | null>(null);

  const showToast = (message: string, type: "success" | "info" | "danger" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Auto-sync slug from title if not manually edited
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isSlugManuallyEdited && !isEditing) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true);
    setSlug(generateSlug(e.target.value));
  };

  const handleSubmit = async (overrideStatus?: ArticleStatus) => {
    if (!title.trim()) {
      showToast("Judul artikel wajib diisi.", "danger");
      return;
    }

    const finalStatus = overrideStatus || status;
    setIsSaving(true);

    try {
      const payload: Partial<ArticleItem> = {
        id: initialData?.id,
        title: title.trim(),
        slug: slug.trim() || generateSlug(title),
        subtitle: subtitle.trim() || null,
        coverImage: coverImage.trim() || null,
        content,
        status: finalStatus,
        category,
        author: author.trim() || "Tim Redaksi SIGMA",
        readTime,
      };

      const result = await saveArticle(payload);
      if (result) {
        showToast(
          isEditing ? "Artikel berhasil diperbarui!" : "Artikel baru berhasil disimpan!",
          "success"
        );
        setTimeout(() => {
          router.push("/admin/artikel");
          router.refresh();
        }, 1000);
      } else {
        showToast("Gagal menyimpan artikel ke Supabase. Periksa koneksi atau database.", "danger");
      }
    } catch (err: any) {
      showToast(err.message || "Terjadi kesalahan saat menyimpan artikel.", "danger");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300 pb-16">
      <AdminToast toast={toast} />

      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/artikel"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs"
            title="Kembali ke Daftar Artikel"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-dark tracking-tight">
              {isEditing ? "Edit Artikel" : "Tulis Artikel Baru"}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Gunakan editor Tiptap untuk menyusun konten edukasi berkualitas tinggi.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSubmit("draft")}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-extrabold flex items-center space-x-1.5 shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5 text-slate-500" />
            <span>Simpan Draft</span>
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSubmit("published")}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center space-x-1.5 shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            <span>{isSaving ? "Menyimpan..." : "Publikasikan"}</span>
          </button>
        </div>
      </div>

      {/* Main Form Fields Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Main Column: Title, Subtitle, & Tiptap Editor (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title Input */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Judul Artikel <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="Contoh: Mengenal Pubertas & Menjaga Kebersihan Organ Reproduksi..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-extrabold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Slug URL Preview */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                URL Slug (Otomatis)
              </label>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-600">
                <span className="text-slate-400 select-none">/artikel/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={handleSlugChange}
                  className="flex-1 bg-transparent border-0 p-0 focus:outline-none text-slate-800 font-bold"
                  placeholder="slug-artikel"
                />
              </div>
            </div>

            {/* Subtitle / Excerpt */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Subtitle / Ringkasan Singkat (Excerpt)
              </label>
              <textarea
                rows={2}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Tulis ringkasan 1-2 kalimat untuk preview di kartu artikel dan meta SEO..."
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors leading-relaxed"
              />
            </div>
          </div>

          {/* Tiptap Rich Text Editor */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-emerald-600" />
                Isi Konten Artikel (Rich Text Editor)
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                Format heading, list, kutipan &amp; gambar
              </span>
            </div>

            <TiptapEditor
              initialContent={content}
              onChange={setContent}
              placeholder="Mulai tulis materi edukasi, panduan, atau informasi kesehatan di sini..."
            />
          </div>
        </div>

        {/* Right / Sidebar Column: Metadata, Cover, & Settings (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cover Image Uploader */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
              Thumbnail / Cover Utama (Cloudinary)
            </label>
            <DragDropUpload
              label="Cover Artikel"
              currentUrl={coverImage}
              onUploadSuccess={(url) => setCoverImage(url)}
              onRemove={() => setCoverImage("")}
            />
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              Rekomendasi rasio gambar 16:9 (resolusi minimal 1200x675 px) untuk preview yang tajam.
            </p>
          </div>

          {/* Publishing Settings */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Pengaturan Publikasi
            </h3>

            {/* Status Select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Status Tayang
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="published">Tayang (Published)</option>
                <option value="draft">Draft (Belum Tayang)</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="Kesehatan Reproduksi">Kesehatan Reproduksi</option>
                <option value="Pencegahan Kekerasan">Pencegahan Kekerasan</option>
                <option value="Perkawinan Anak">Perkawinan Anak</option>
                <option value="Kesehatan Mental">Kesehatan Mental</option>
                <option value="Hak Anak">Hak-Hak Anak</option>
                <option value="Edukasi Umum">Edukasi Umum</option>
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Penulis / Narasumber
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Contoh: dr. Siti / Tim SIGMA"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Estimasi Waktu Baca
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="Contoh: 3 Menit"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
