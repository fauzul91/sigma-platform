"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Play,
  FileText,
  ExternalLink,
  Clock,
  BookOpen,
  Video,
} from "lucide-react";
import { MediaItem } from "@/types";
import AdminPagination from "@/components/admin/shared/AdminPagination";
import { getYouTubeThumbnail } from "@/utils/mediaUtils";

interface AdminEdukasiViewProps {
  media: MediaItem[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingMedia?: Partial<MediaItem> | null;
  setEditingMedia?: (val: Partial<MediaItem> | null) => void;
  onSave?: () => void;
  onDelete: (id: string, title: string) => void;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function AdminEdukasiView({
  media,
  searchTerm,
  setSearchTerm,
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

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* 1. Header with Title & Action Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-dark dark:text-slate-100 tracking-tight">
              Manajemen Edukasi &amp; Media
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/60 text-[11px] font-black">
              Artikel &amp; Video
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Kelola artikel literasi berbasis Tiptap dan video kampanye multimedia dalam formulir halaman penuh.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <Link
            href="/admin/edukasi/baru"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-extrabold flex items-center justify-center space-x-1.5 shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Tulis Edukasi Baru</span>
          </Link>
        </div>
      </div>

      {/* 2. Media Data Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs overflow-hidden">
        {/* Table Toolbar Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Cari judul, kategori, narasumber..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary transition-all"
            />
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
          </div>

          {/* Type Filter Pills & Counter */}
          <div className="flex items-center justify-between sm:justify-end space-x-3 w-full sm:w-auto">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700 text-xs font-bold">
              <button
                onClick={() => setTypeFilter("all")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  typeFilter === "all"
                    ? "bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-2xs font-extrabold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Semua ({media.length})
              </button>
              <button
                onClick={() => setTypeFilter("article")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                  typeFilter === "article"
                    ? "bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-2xs font-extrabold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <FileText className="h-3 w-3" />
                <span>Artikel</span>
              </button>
              <button
                onClick={() => setTypeFilter("video")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                  typeFilter === "video"
                    ? "bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-2xs font-extrabold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Video className="h-3 w-3" />
                <span>Video</span>
              </button>
            </div>

            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0 hidden md:inline">
              Total {totalItems} Data
            </span>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-neutral-dark dark:text-slate-200 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-200/70 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Materi &amp; Info</th>
                <th className="py-3.5 px-4 text-center">Format</th>
                <th className="py-3.5 px-4">Kategori &amp; Penulis</th>
                <th className="py-3.5 px-4">Durasi / Baca</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {slicedMedia.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 dark:text-slate-500">
                    <p className="font-bold">Tidak ada data konten ditemukan.</p>
                    <p className="text-[11px] mt-0.5">
                      Coba kata kunci pencarian lain atau buat konten edukasi baru.
                    </p>
                  </td>
                </tr>
              ) : (
                slicedMedia.map((item) => {
                  const thumbnail =
                    item.type === "video"
                      ? getYouTubeThumbnail(item.mediaUrl) || item.mediaUrl
                      : item.mediaUrl || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800";

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      {/* Media Title & Thumbnail Preview */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center space-x-3.5 max-w-md">
                          <div className="relative w-14 h-10 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                            <img
                              src={thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            {item.type === "video" && (
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <Play className="h-3 w-3 text-white fill-current" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-neutral-dark dark:text-slate-100 text-xs truncate">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                              {item.author} • {item.date}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td className="py-3.5 px-4 text-center">
                        {item.type === "video" ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60 text-[10px] font-black">
                            <Play className="h-2.5 w-2.5 fill-current" />
                            <span>Video</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60 text-[10px] font-black">
                            <FileText className="h-2.5 w-2.5" />
                            <span>Artikel</span>
                          </span>
                        )}
                      </td>

                      {/* Category & Author */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-700 dark:text-slate-200 capitalize block">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">{item.author}</span>
                      </td>

                      {/* Read time / Duration */}
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-medium">
                        {item.type === "video" ? (
                          <span className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.duration || "Video"}
                          </span>
                        ) : (
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {item.readTime || "3 Menit"}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <a
                            href={`/edukasi?post=${item.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
                            title="Buka di Website"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                          <Link
                            href={`/admin/edukasi/edit/${item.id}`}
                            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Edit di Halaman Penuh"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => onDelete(item.id, item.title)}
                            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
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
          <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
            <AdminPagination
              currentPage={currentPage}
              totalItems={filteredMedia.length}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
