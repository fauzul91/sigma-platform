"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Play,
  FileText,
  ExternalLink,
  Video,
  Clock,
  BookOpen,
  Sparkles,
  X,
  Layers,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { MediaItem } from "@/types";
import AdminPagination from "@/components/admin/shared/AdminPagination";
import DragDropUpload from "@/components/admin/shared/DragDropUpload";
import TiptapEditor from "@/components/admin/editor/TiptapEditor";
import { getYouTubeThumbnail, formatYouTubeEmbedUrl } from "@/utils/mediaUtils";

const PRESET_TAGS = [
  "Pernikahan Anak",
  "Advokasi Siswa",
  "Kesehatan Reproduksi",
  "Hak Anak",
  "Pencegahan Kekerasan",
  "Pubertas",
  "Kesehatan Mental",
];

interface AdminEdukasiViewProps {
  media: MediaItem[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingMedia: Partial<MediaItem> | null;
  setEditingMedia: (val: Partial<MediaItem> | null) => void;
  onSave: () => void;
  onDelete: (id: string, title: string) => void;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function AdminEdukasiView({
  media,
  searchTerm,
  setSearchTerm,
  editingMedia,
  setEditingMedia,
  onSave,
  onDelete,
  currentPage,
  totalItems,
  onPageChange,
}: AdminEdukasiViewProps) {
  // Tab Filter in Table: "all" | "article" | "video"
  const [typeFilter, setTypeFilter] = useState<"all" | "article" | "video">("all");

  const filteredMedia = useMemo(() => {
    return media.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === "all" ? true : item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [media, searchTerm, typeFilter]);

  const pageSize = 6;
  const slicedMedia = filteredMedia.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Helper to parse Tiptap JSON content safely
  const parsedTiptapContent = useMemo(() => {
    if (!editingMedia?.content) return undefined;
    try {
      if (editingMedia.content.trim().startsWith("{")) {
        return JSON.parse(editingMedia.content);
      }
    } catch {}
    return {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: editingMedia.content }],
        },
      ],
    };
  }, [editingMedia?.id]); // Only recompute on initial edit load

  // Form Validation
  const isFormValid = () => {
    if (!editingMedia) return false;
    const titleValid = (editingMedia.title || "").trim().length > 0;
    if (editingMedia.type === "video") {
      return titleValid && (editingMedia.mediaUrl || "").trim().length > 0;
    }
    return titleValid;
  };

  const currentType = editingMedia?.type || "article";
  const ytPreview =
    currentType === "video" && editingMedia?.mediaUrl
      ? formatYouTubeEmbedUrl(editingMedia.mediaUrl)
      : null;

  // Tags State & Helpers
  const [newTagInput, setNewTagInput] = useState<string>("");

  const handleAddTag = (rawTag: string) => {
    const cleaned = rawTag.trim().replace(/^#+/, "");
    if (!cleaned || !editingMedia) return;
    const currentTags = editingMedia.tags || [];
    if (!currentTags.some((t) => t.toLowerCase() === cleaned.toLowerCase())) {
      setEditingMedia({
        ...editingMedia,
        tags: [...currentTags, cleaned],
      });
    }
    setNewTagInput("");
  };

  const handleToggleTag = (tag: string) => {
    if (!editingMedia) return;
    const currentTags = editingMedia.tags || [];
    const exists = currentTags.some((t) => t.toLowerCase() === tag.toLowerCase());
    if (exists) {
      setEditingMedia({
        ...editingMedia,
        tags: currentTags.filter((t) => t.toLowerCase() !== tag.toLowerCase()),
      });
    } else {
      setEditingMedia({
        ...editingMedia,
        tags: [...currentTags, tag],
      });
    }
  };

  // YouTube Metadata Auto-Fetch State & Handler
  const [isFetchingYt, setIsFetchingYt] = useState<boolean>(false);
  const [ytFetchStatus, setYtFetchStatus] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const fetchYouTubeDetails = async (inputUrl?: string) => {
    const targetUrl = (inputUrl || editingMedia?.mediaUrl || "").trim();
    if (!targetUrl) return;

    if (!targetUrl.includes("youtube.com") && !targetUrl.includes("youtu.be")) {
      return;
    }

    setIsFetchingYt(true);
    setYtFetchStatus({
      type: "info",
      message: "Sedang mengambil nama channel dan durasi dari YouTube...",
    });

    try {
      const res = await fetch(`/api/youtube-meta?url=${encodeURIComponent(targetUrl)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setEditingMedia({
          ...editingMedia,
          author: data.channel || editingMedia?.author || "Channel YouTube",
          duration: data.duration || editingMedia?.duration || "03:00",
          title: (!editingMedia?.title || editingMedia.title.trim() === "") ? data.title : editingMedia.title,
        });
        setYtFetchStatus({
          type: "success",
          message: `Berhasil terhubung ke "${data.channel}" • Durasi: ${data.duration}`,
        });
      } else {
        setYtFetchStatus({
          type: "error",
          message: data.error || "Gagal mengambil data video. Pastikan link YouTube valid.",
        });
      }
    } catch {
      setYtFetchStatus({
        type: "error",
        message: "Gagal terhubung ke API YouTube metadata.",
      });
    } finally {
      setIsFetchingYt(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* 1. Header with Title & Add Content Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-dark tracking-tight">
              Manajemen Edukasi &amp; Media
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-black">
              Artikel &amp; Video
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Kelola artikel literasi berbasis Tiptap dan video kampanye multimedia dalam satu tempat.
          </p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() =>
              setEditingMedia({
                type: "article",
                category: "edukasi",
                author: "Tim Redaksi SIGMA",
                readTime: "3 Menit",
                date: "Hari ini",
                content: JSON.stringify({
                  type: "doc",
                  content: [{ type: "paragraph" }],
                }),
              })
            }
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-primary hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center space-x-1.5 shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Tulis Artikel</span>
          </button>

          <button
            onClick={() =>
              setEditingMedia({
                type: "video",
                category: "edukasi",
                author: "Tim Media GARUDA",
                duration: "03:00",
                date: "Hari ini",
                content: "",
              })
            }
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center justify-center space-x-1.5 shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Tambah Video</span>
          </button>
        </div>
      </div>

      {/* 2. Media Data Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Table Toolbar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-b border-slate-100">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Cari judul, kategori, atau narasumber..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Filter Type Pills */}
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-400 font-bold hidden sm:inline">Tipe:</span>
            <div className="bg-slate-100 p-0.5 rounded-xl flex items-center border border-slate-200">
              <button
                onClick={() => {
                  setTypeFilter("all");
                  if (currentPage !== 1) onPageChange(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  typeFilter === "all"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Semua ({media.length})
              </button>
              <button
                onClick={() => {
                  setTypeFilter("article");
                  if (currentPage !== 1) onPageChange(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                  typeFilter === "article"
                    ? "bg-white text-emerald-800 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileText className="h-3 w-3 text-emerald-600" />
                <span>Artikel</span>
              </button>
              <button
                onClick={() => {
                  setTypeFilter("video");
                  if (currentPage !== 1) onPageChange(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                  typeFilter === "video"
                    ? "bg-white text-amber-800 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Play className="h-3 w-3 fill-amber-500 text-amber-500" />
                <span>Video</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Konten &amp; Thumbnail</th>
                <th className="py-3 px-4 text-center">Tipe</th>
                <th className="py-3 px-4">Kategori &amp; Penulis</th>
                <th className="py-3 px-4">Waktu / Durasi</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {slicedMedia.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                    <Layers className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                    <p>Tidak ada konten yang sesuai dengan filter.</p>
                  </td>
                </tr>
              ) : (
                slicedMedia.map((item) => {
                  const ytThumb =
                    item.type === "video" ? getYouTubeThumbnail(item.mediaUrl) : null;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                      {/* Title & Thumbnail */}
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 relative">
                            {item.type === "video" ? (
                              ytThumb ? (
                                <img
                                  src={ytThumb}
                                  alt={item.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-slate-900 text-amber-400">
                                  <Play className="h-4 w-4 fill-current" />
                                </div>
                              )
                            ) : item.mediaUrl ? (
                              <img
                                src={item.mediaUrl}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-slate-400">
                                <BookOpen className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              {item.author} • {item.date}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td className="py-3.5 px-4 text-center">
                        {item.type === "video" ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 text-[10px] font-black">
                            <Play className="h-2.5 w-2.5 fill-current" />
                            <span>Video</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[10px] font-black">
                            <FileText className="h-2.5 w-2.5" />
                            <span>Artikel</span>
                          </span>
                        )}
                      </td>

                      {/* Category & Author */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-700 capitalize block">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-slate-400">{item.author}</span>
                      </td>

                      {/* Read time / Duration */}
                      <td className="py-3.5 px-4 text-slate-500 font-medium">
                        {item.type === "video" ? (
                          <span className="text-amber-700 font-bold flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.duration || "Video"}
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {item.readTime || "3 Menit"}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <a
                            href={`/edukasi?post=${item.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Buka di Website"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => setEditingMedia(item)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit Konten"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onDelete(item.id, item.title)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Hapus Konten"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredMedia.length > pageSize && (
          <div className="p-4 bg-slate-50/50 border-t border-slate-100">
            <AdminPagination
              currentPage={currentPage}
              totalItems={filteredMedia.length}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>

      {/* 3. Spacious Overlay Modal for Adding / Editing (Tiptap + Video) */}
      {editingMedia && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200/80 animate-in zoom-in-95 duration-150 flex flex-col overflow-hidden">
            {/* Modal Header & Mode Switcher */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 shrink-0">
              <div className="flex items-center space-x-3">
                <h3 className="font-black text-neutral-dark text-lg sm:text-xl">
                  {editingMedia.id ? "Edit Konten" : "Tambah Konten Baru"}
                </h3>
                {/* Type Switcher Pills (only when creating new content; locked when editing existing) */}
                {editingMedia.id ? (
                  currentType === "article" ? (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-black border border-emerald-200/80 flex items-center space-x-1.5 shadow-2xs">
                      <FileText className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Mode Edit Artikel</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 text-xs font-black border border-amber-200/80 flex items-center space-x-1.5 shadow-2xs">
                      <Play className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span>Mode Edit Video</span>
                    </span>
                  )
                ) : (
                  <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingMedia({
                          ...editingMedia,
                          type: "article",
                        })
                      }
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer ${
                        currentType === "article"
                          ? "bg-white text-emerald-800 shadow-2xs border border-slate-200"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <FileText className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Artikel Teks (Tiptap)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingMedia({
                          ...editingMedia,
                          type: "video",
                        })
                      }
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer ${
                        currentType === "video"
                          ? "bg-white text-amber-800 shadow-2xs border border-slate-200"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <Play className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span>Video Kampanye (YouTube)</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setEditingMedia(null);
                  setYtFetchStatus(null);
                  setNewTagInput("");
                }}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                title="Tutup Modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="space-y-4 overflow-y-auto pr-1 flex-1">
              {/* Row 1: Title Input */}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  Judul {currentType === "article" ? "Artikel" : "Video"} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingMedia.title || ""}
                  onChange={(e) =>
                    setEditingMedia({ ...editingMedia, title: e.target.value })
                  }
                  placeholder={
                    currentType === "article"
                      ? "Contoh: 5 Cara Efektif Menjaga Kesehatan Reproduksi..."
                      : "Contoh: Video Edukasi: Mengenal Hak Anak & Pencegahan Kekerasan..."
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Row 2: Category, Author, & Reading Time / Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="edukasi">Edukasi Remaja</option>
                    <option value="berita">Berita &amp; Rilis</option>
                    <option value="umum">Umum</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>{currentType === "video" ? "Narasumber / Channel" : "Penulis / Narasumber"}</span>
                    {currentType === "video" && (
                      <span className="text-[10px] text-amber-600 font-semibold lowercase">otomatis YT</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={editingMedia.author || ""}
                    onChange={(e) =>
                      setEditingMedia({ ...editingMedia, author: e.target.value })
                    }
                    placeholder={
                      currentType === "video"
                        ? "Otomatis dari channel YouTube..."
                        : "Contoh: dr. Siti / Tim SIGMA"
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>{currentType === "article" ? "Estimasi Baca" : "Durasi Video"}</span>
                    {currentType === "video" && (
                      <span className="text-[10px] text-amber-600 font-semibold lowercase">otomatis YT</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={
                      currentType === "article"
                        ? editingMedia.readTime || "3 Menit"
                        : editingMedia.duration || ""
                    }
                    onChange={(e) =>
                      setEditingMedia(
                        currentType === "article"
                          ? { ...editingMedia, readTime: e.target.value }
                          : { ...editingMedia, duration: e.target.value }
                      )
                    }
                    placeholder={currentType === "article" ? "Contoh: 3 Menit" : "03:00 (otomatis)"}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Row 3: Tags / Topik Terkait (#tag) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Tag &amp; Topik Terkait</span>
                    <span className="text-[10px] text-slate-400 font-semibold lowercase">
                      (ditampilkan sebagai #tag otomatis)
                    </span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                    Tekan Enter atau Koma untuk menambah tag
                  </span>
                </div>

                {/* Current Tags Chips Container */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl border border-slate-200 bg-slate-50/60 min-h-[42px] focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                  {(editingMedia.tags || []).map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs"
                    >
                      <span>#{tag.replace(/^#+/, "")}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const nextTags = (editingMedia.tags || []).filter((_, i) => i !== idx);
                          setEditingMedia({ ...editingMedia, tags: nextTags });
                        }}
                        className="text-slate-400 hover:text-rose-500 ml-1 cursor-pointer transition-colors"
                        title="Hapus tag"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}

                  {/* Input inside container */}
                  <input
                    type="text"
                    placeholder={
                      (editingMedia.tags || []).length === 0
                        ? "Ketik tag lalu tekan Enter (misal: Pernikahan Anak, Advokasi Siswa)..."
                        : "+ Tambah tag..."
                    }
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        handleAddTag(newTagInput);
                      }
                    }}
                    onBlur={() => {
                      if (newTagInput.trim()) {
                        handleAddTag(newTagInput);
                      }
                    }}
                    className="flex-1 min-w-[140px] bg-transparent text-xs font-medium text-slate-800 focus:outline-none px-1 py-0.5"
                  />
                </div>

                {/* Quick Suggested Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[11px] text-slate-400 font-bold">Rekomendasi Cepat:</span>
                  {PRESET_TAGS.map((preset) => {
                    const isSelected = (editingMedia.tags || []).some(
                      (t) => t.toLowerCase() === preset.toLowerCase()
                    );
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleToggleTag(preset)}
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {isSelected ? `✓ #${preset}` : `+#${preset}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ======================================================= */}
              {/* MODE ARTIKEL TEKS: Cover Cloudinary + Tiptap Editor    */}
              {/* ======================================================= */}
              {currentType === "article" && (
                <>
                  {/* Cover Image Upload (Cloudinary) */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center justify-between">
                      <span>Cover Image Artikel (Cloudinary)</span>
                      <span className="text-[10px] text-slate-400 font-semibold normal-case">Opsional (gambar default otomatis tersedia)</span>
                    </label>
                    <DragDropUpload
                      label="Cover Artikel (Unggah Foto)"
                      currentUrl={editingMedia.mediaUrl}
                      onUploadSuccess={(url) =>
                        setEditingMedia({
                          ...editingMedia,
                          mediaUrl: url,
                        })
                      }
                      onRemove={() =>
                        setEditingMedia({
                          ...editingMedia,
                          mediaUrl: "",
                        })
                      }
                    />
                  </div>

                  {/* Tiptap Rich Text Editor */}
                  <div className="space-y-1 pt-2">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-emerald-600" />
                        Isi Konten Artikel (Rich Text Tiptap)
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold lowercase">
                        Mendukung heading, list, gambar &amp; link
                      </span>
                    </label>

                    <TiptapEditor
                      key={editingMedia.id || "new-article-editor"}
                      initialContent={parsedTiptapContent}
                      onChange={(jsonDoc) => {
                        setEditingMedia({
                          ...editingMedia,
                          content: JSON.stringify(jsonDoc),
                        });
                      }}
                      placeholder="Mulai tulis artikel edukasi kesehatan reproduksi di sini..."
                    />
                  </div>
                </>
              )}

              {/* ======================================================= */}
              {/* MODE VIDEO KAMPANYE: YouTube URL + Preview + Sinopsis   */}
              {/* ======================================================= */}
              {currentType === "video" && (
                <>
                  {/* YouTube URL Input with validation and auto-fetch button */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                        URL Video YouTube <span className="text-rose-500">*</span>
                      </label>
                      <button
                        type="button"
                        disabled={isFetchingYt || !editingMedia.mediaUrl}
                        onClick={() => fetchYouTubeDetails(editingMedia.mediaUrl)}
                        className="text-[11px] font-extrabold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 px-2.5 py-1 rounded-lg flex items-center space-x-1 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isFetchingYt ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin text-emerald-600" />
                            <span>Mengambil Info...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3 w-3 text-emerald-600" />
                            <span>Ambil Otomatis Channel &amp; Durasi</span>
                          </>
                        )}
                      </button>
                    </div>

                    <input
                      type="url"
                      required
                      placeholder="Tempel link YouTube (cth: https://www.youtube.com/watch?v=... atau https://youtu.be/...)"
                      value={editingMedia.mediaUrl || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingMedia({
                          ...editingMedia,
                          mediaUrl: val,
                        });
                      }}
                      onPaste={(e) => {
                        const pasted = e.clipboardData.getData("text");
                        if (pasted.includes("youtube.com") || pasted.includes("youtu.be")) {
                          setTimeout(() => fetchYouTubeDetails(pasted), 100);
                        }
                      }}
                      onBlur={() => {
                        if (
                          editingMedia.mediaUrl &&
                          (!editingMedia.author || editingMedia.author === "Tim Media GARUDA" || !editingMedia.duration)
                        ) {
                          fetchYouTubeDetails(editingMedia.mediaUrl);
                        }
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />

                    {/* YouTube Fetch Status Banner */}
                    {ytFetchStatus && (
                      <div
                        className={`text-xs px-3 py-2 rounded-xl font-semibold flex items-center space-x-1.5 transition-all ${
                          ytFetchStatus.type === "success"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80"
                            : ytFetchStatus.type === "info"
                            ? "bg-sky-50 text-sky-800 border border-sky-200/80"
                            : "bg-rose-50 text-rose-700 border border-rose-200/80"
                        }`}
                      >
                        {ytFetchStatus.type === "success" ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        ) : ytFetchStatus.type === "info" ? (
                          <Loader2 className="h-4 w-4 animate-spin text-sky-600 shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-rose-500 shrink-0" />
                        )}
                        <span>{ytFetchStatus.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Live YouTube Preview Frame */}
                  {ytPreview && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner aspect-video max-h-60 mx-auto">
                      <iframe
                        src={ytPreview}
                        className="w-full h-full"
                        allowFullScreen
                        title="Pratinjau Video YouTube"
                      />
                    </div>
                  )}

                  {/* Video Description / Summary */}
                  <div className="space-y-1 pt-1">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                      Sinopsis / Ringkasan Video
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
                      placeholder="Tuliskan deskripsi singkat mengenai isi video kampanye ini..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Modal Bottom Bar */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-400 font-medium">
                {currentType === "article"
                  ? "Format Tiptap tersimpan otomatis."
                  : "Video akan terhubung ke YouTube."}
              </span>

              <div className="flex space-x-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setEditingMedia(null);
                    setYtFetchStatus(null);
                    setNewTagInput("");
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (isFormValid()) onSave();
                  }}
                  disabled={!isFormValid()}
                  className={`px-5 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
                    isFormValid()
                      ? "bg-primary hover:bg-emerald-700 text-white shadow-xs cursor-pointer active:scale-98"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <span>{editingMedia.id ? "Simpan Perubahan" : "Simpan Konten"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
