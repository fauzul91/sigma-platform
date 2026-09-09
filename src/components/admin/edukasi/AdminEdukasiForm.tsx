"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  BookOpen,
  Video,
  FileText,
  Tag,
  Play,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { MediaItem } from "@/types";
import { saveMedia } from "@/services/admin/adminService";
import { formatYouTubeEmbedUrl } from "@/utils/mediaUtils";
import TiptapEditor from "@/components/admin/editor/TiptapEditor";
import DragDropUpload from "@/components/admin/shared/DragDropUpload";
import AdminToast from "@/components/admin/shared/AdminToast";

const PRESET_TAGS = [
  "Pernikahan Anak",
  "Advokasi Siswa",
  "Kesehatan Reproduksi",
  "Pubertas",
  "Hak Anak",
  "Kesehatan Mental",
];

interface AdminEdukasiFormProps {
  initialData?: Partial<MediaItem> | null;
}

export default function AdminEdukasiForm({ initialData }: AdminEdukasiFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData?.id);

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [type, setType] = useState<"article" | "video">(initialData?.type || "article");
  const [category, setCategory] = useState<"umum" | "berita" | "edukasi">(initialData?.category || "edukasi");
  const [author, setAuthor] = useState(initialData?.author || (type === "video" ? "" : "Tim Redaksi SIGMA"));
  const [mediaUrl, setMediaUrl] = useState(initialData?.mediaUrl || "");
  const [readTime, setReadTime] = useState(initialData?.readTime || "3 Menit");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [tags, setTags] = useState<string[]>(initialData?.tags || ["Kesehatan Reproduksi"]);
  const [content, setContent] = useState<string>(initialData?.content || "");
  const [newTagInput, setNewTagInput] = useState("");

  // YouTube auto-fetch state
  const [isFetchingYt, setIsFetchingYt] = useState(false);
  const [ytFetchStatus, setYtFetchStatus] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

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

  // Safe parse Tiptap JSON for editor
  const parsedTiptapContent = useMemo(() => {
    if (!content) {
      return {
        type: "doc",
        content: [{ type: "paragraph" }],
      };
    }
    try {
      if (content.trim().startsWith("{")) {
        return JSON.parse(content);
      }
    } catch {}
    return {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: content }],
        },
      ],
    };
  }, [initialData?.id]);

  const ytPreview =
    type === "video" && mediaUrl ? formatYouTubeEmbedUrl(mediaUrl) : null;

  // Tag Handlers
  const handleAddTag = (rawTag: string) => {
    const cleaned = rawTag.trim().replace(/^#+/, "");
    if (!cleaned) return;
    if (!tags.some((t) => t.toLowerCase() === cleaned.toLowerCase())) {
      setTags([...tags, cleaned]);
    }
    setNewTagInput("");
  };

  const handleToggleTag = (tag: string) => {
    const exists = tags.some((t) => t.toLowerCase() === tag.toLowerCase());
    if (exists) {
      setTags(tags.filter((t) => t.toLowerCase() !== tag.toLowerCase()));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  // YouTube Auto-Fetch Metadata
  const fetchYouTubeDetails = async (inputUrl?: string) => {
    const targetUrl = (inputUrl || mediaUrl).trim();
    if (!targetUrl) return;

    if (!targetUrl.includes("youtube.com") && !targetUrl.includes("youtu.be")) {
      setYtFetchStatus({
        type: "error",
        message: "Link harus berupa URL video YouTube yang valid.",
      });
      return;
    }

    setIsFetchingYt(true);
    setYtFetchStatus({
      type: "info",
      message: "Sedang mengambil data channel & durasi dari YouTube...",
    });

    try {
      const res = await fetch(`/api/youtube-meta?url=${encodeURIComponent(targetUrl)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        if (data.channel) setAuthor(data.channel);
        if (data.duration) setDuration(data.duration);
        if (!title.trim() && data.title) setTitle(data.title);

        setYtFetchStatus({
          type: "success",
          message: `Berhasil terhubung ke "${data.channel}" • Durasi: ${data.duration}`,
        });
      } else {
        setYtFetchStatus({
          type: "error",
          message: data.error || "Gagal mengambil data video dari YouTube.",
        });
      }
    } catch {
      setYtFetchStatus({
        type: "error",
        message: "Terjadi kesalahan jaringan saat mengambil info YouTube.",
      });
    } finally {
      setIsFetchingYt(false);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Judul konten wajib diisi!");
      return;
    }

    if (type === "video" && !mediaUrl.trim()) {
      alert("URL video YouTube wajib diisi!");
      return;
    }

    setIsSaving(true);
    try {
      const payload: Partial<MediaItem> = {
        ...(initialData?.id ? { id: initialData.id } : {}),
        title: title.trim(),
        type,
        category,
        author: author.trim() || (type === "video" ? "Channel YouTube" : "Tim Redaksi SIGMA"),
        mediaUrl: mediaUrl.trim(),
        readTime: type === "article" ? readTime || "3 Menit" : undefined,
        duration: type === "video" ? duration || "03:00" : undefined,
        tags: tags.length > 0 ? tags : ["Kesehatan Reproduksi"],
        content,
      };

      const saved = await saveMedia(payload);
      if (saved) {
        showToast(
          isEditing ? "Konten berhasil diperbarui!" : "Konten baru berhasil diterbitkan!",
          "success"
        );
        setTimeout(() => {
          router.push("/admin/edukasi");
          router.refresh();
        }, 800);
      } else {
        showToast("Gagal menyimpan data ke database. Silakan coba lagi.", "danger");
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
              href="/admin/edukasi"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              title="Kembali ke Daftar Edukasi"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate">
                {isEditing ? `Edit: ${initialData?.title || "Konten Edukasi"}` : "Tulis Konten Edukasi Baru"}
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 font-medium hidden xs:block truncate">
                {type === "article" ? "Artikel Literasi Remaja" : "Video Pembelajaran YouTube"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <Link
              href="/admin/edukasi"
              className="px-3 sm:px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-all"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSaving}
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
                  <span>{isEditing ? "Simpan" : "Publikasikan"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Main Form Column (Left 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Type Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-5">
              {/* Type Switcher */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Tipe Konten
                  </label>
                  {isEditing && (
                    <p className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold mt-0.5">
                      Tipe konten terkunci saat mode edit.
                    </p>
                  )}
                </div>

                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700">
                  <button
                    type="button"
                    disabled={isEditing}
                    onClick={() => {
                      setType("article");
                      if (!author || author === "Channel YouTube") setAuthor("Tim Redaksi SIGMA");
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      type === "article"
                        ? "bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    } ${isEditing ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Artikel Literasi</span>
                  </button>

                  <button
                    type="button"
                    disabled={isEditing}
                    onClick={() => {
                      setType("video");
                      if (author === "Tim Redaksi SIGMA") setAuthor("");
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      type === "video"
                        ? "bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    } ${isEditing ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                  >
                    <Video className="h-3.5 w-3.5" />
                    <span>Video YouTube</span>
                  </button>
                </div>
              </div>

              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                  Judul Konten <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    type === "article"
                      ? "Contoh: Panduan Menjaga Kebersihan Reproduksi Saat Pubertas"
                      : "Contoh: Animasi Bahaya Pernikahan Dini Bagi Remaja"
                  }
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Video YouTube Fields */}
              {type === "video" && (
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <svg className="h-4 w-4 text-red-600 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <span>URL Video YouTube</span>
                        <span className="text-rose-500">*</span>
                      </label>
                      <button
                        type="button"
                        disabled={isFetchingYt || !mediaUrl.trim()}
                        onClick={() => fetchYouTubeDetails(mediaUrl)}
                        className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isFetchingYt ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span>Mengambil info...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3 w-3" />
                            <span>Tarik Info Channel &amp; Durasi</span>
                          </>
                        )}
                      </button>
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="https://www.youtube.com/watch?v=... atau https://youtu.be/..."
                      value={mediaUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        setMediaUrl(val);
                        if (val.includes("youtube.com") || val.includes("youtu.be")) {
                          fetchYouTubeDetails(val);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary transition-all font-mono"
                    />

                    {ytFetchStatus && (
                      <p
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border ${
                          ytFetchStatus.type === "success"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                            : ytFetchStatus.type === "info"
                            ? "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800"
                            : "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800"
                        }`}
                      >
                        {ytFetchStatus.message}
                      </p>
                    )}
                  </div>

                  {/* YouTube Player Preview */}
                  {ytPreview && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-video max-w-xl mx-auto shadow-sm">
                      <iframe
                        src={ytPreview}
                        title="YouTube Video Preview"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {/* Catatan / Rangkuman Video */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                      Ringkasan / Sinopsis Video
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tuliskan poin penting yang dibahas dalam video edukasi ini..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary transition-all leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Article Mode: Full Width Tiptap Editor */}
            {type === "article" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100">
                      Isi Konten Artikel Literasi
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                    Mendukung format heading, quote, list, dan sisip gambar
                  </span>
                </div>

                <div className="pt-1">
                  <TiptapEditor
                    key={initialData?.id || "new-article-workspace"}
                    initialContent={parsedTiptapContent}
                    onChange={(jsonDoc) => {
                      setContent(JSON.stringify(jsonDoc));
                    }}
                    placeholder="Tuliskan artikel edukasi selengkapnya di sini..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Settings Column (Right 1/3) */}
          <div className="space-y-6">
            {/* Cover Image (For Article) */}
            {type === "article" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100 block">
                  Foto Sampul (Cover)
                </label>
                <DragDropUpload
                  label="Cover Artikel (JPG / WebP / PNG)"
                  currentUrl={mediaUrl}
                  onUploadSuccess={(url) => setMediaUrl(url)}
                  onRemove={() => setMediaUrl("")}
                  note="Foto otomatis di-compress Full HD"
                />
              </div>
            )}

            {/* Metadata & Attribution Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
                Informasi &amp; Atribusi
              </h3>

              {/* Kategori */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
                  Kategori Materi
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as "umum" | "berita" | "edukasi")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none focus:border-primary"
                >
                  <option value="edukasi">Edukasi &amp; Kesehatan Reproduksi</option>
                  <option value="berita">Berita &amp; Informasi Kegiatan</option>
                  <option value="umum">Umum &amp; Komunitas Remaja</option>
                </select>
              </div>

              {/* Penulis / Narasumber */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {type === "video" ? "Narasumber / Channel" : "Penulis Artikel"}
                  </label>
                  {type === "video" && (
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold lowercase">
                      otomatis YouTube
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder={type === "video" ? "Channel YouTube" : "Tim Redaksi SIGMA"}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none focus:border-primary"
                />
              </div>

              {/* Read Time / Duration */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {type === "video" ? "Durasi Video" : "Estimasi Waktu Baca"}
                  </label>
                  {type === "video" && (
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold lowercase">
                      otomatis YouTube
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder={type === "video" ? "05:30" : "3 Menit"}
                  value={type === "video" ? duration : readTime}
                  onChange={(e) =>
                    type === "video" ? setDuration(e.target.value) : setReadTime(e.target.value)
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Tags Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Topik &amp; Hashtag (#)</span>
                </label>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  {tags.length} Tag
                </span>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-200/80 dark:border-emerald-800/60 text-[11px] font-bold"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(idx)}
                      className="text-emerald-700 dark:text-emerald-400 hover:text-rose-600 dark:hover:text-rose-400 font-extrabold cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Ketik tag + Enter..."
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      handleAddTag(newTagInput);
                    }
                  }}
                  className="flex-1 min-w-[120px] bg-transparent text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none px-1 py-0.5"
                />
              </div>

              {/* Preset Quick Tags */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold block">
                  Pilihan Topik Cepat:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_TAGS.map((preset) => {
                    const isSelected = tags.some(
                      (t) => t.toLowerCase() === preset.toLowerCase()
                    );
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleToggleTag(preset)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-primary text-white shadow-2xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                      >
                        {isSelected ? `✓ #${preset}` : `+#${preset}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
