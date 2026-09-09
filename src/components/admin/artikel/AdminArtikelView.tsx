"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";
import { ArticleItem } from "@/types";
import AdminPagination from "@/components/admin/shared/AdminPagination";
import AdminDeleteModal from "@/components/admin/shared/AdminDeleteModal";
import AdminToast from "@/components/admin/shared/AdminToast";

interface AdminArtikelViewProps {
  initialArticles: ArticleItem[];
  onDeleteArticle: (id: string) => Promise<boolean>;
}

export default function AdminArtikelView({
  initialArticles,
  onDeleteArticle,
}: AdminArtikelViewProps) {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "danger" } | null>(null);

  const showToast = (message: string, type: "success" | "info" | "danger" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const filteredArticles = articles.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ? true : item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const slicedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      const success = await onDeleteArticle(deleteTarget.id);
      if (success) {
        setArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id));
        showToast("Artikel berhasil dihapus.", "success");
      } else {
        showToast("Gagal menghapus artikel dari database.", "danger");
      }
    } catch {
      showToast("Terjadi kesalahan sistem saat menghapus artikel.", "danger");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <AdminToast toast={toast} />

      {/* Header with Title and Create Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-dark dark:text-slate-100 tracking-tight">
              Manajemen Artikel Literasi
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/60 text-[11px] font-black">
              Tiptap Editor
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Kelola publikasi materi edukasi kesehatan reproduksi dengan editor kaya fitur.
          </p>
        </div>

        <Link
          href="/admin/artikel/tulis"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center space-x-2 shadow-sm hover:shadow-md active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Tulis Artikel Baru</span>
        </Link>
      </div>

      {/* Data Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Table Toolbar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Cari judul, penulis, atau kata kunci..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-bold hidden sm:inline">Status:</span>
            <div className="bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl flex items-center border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "all"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Semua ({articles.length})
              </button>
              <button
                onClick={() => {
                  setStatusFilter("published");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "published"
                    ? "bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-2xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Tayang
              </button>
              <button
                onClick={() => {
                  setStatusFilter("draft");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "draft"
                    ? "bg-white dark:bg-slate-700 text-amber-800 dark:text-amber-300 shadow-2xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Draft
              </button>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-[11px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Artikel &amp; Cover</th>
                <th className="py-3 px-4">Kategori &amp; Penulis</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {slicedArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
                    <FileText className="h-8 w-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                    <p>Tidak ada artikel yang sesuai dengan pencarian.</p>
                  </td>
                </tr>
              ) : (
                slicedArticles.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                    {/* Title & Cover */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-16 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                          {item.coverImage ? (
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                              <BookOpen className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 dark:text-slate-400 truncate mt-0.5">
                            {item.subtitle || `/${item.slug}`}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category & Author */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-700 dark:text-slate-200 block">{item.category}</span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-400">{item.author}</span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      {item.status === "published" ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900/50 text-[10px] font-black">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Tayang</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/50 text-[10px] font-black">
                          <Clock className="h-3 w-3" />
                          <span>Draft</span>
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-medium text-[11px]">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }) : "-"}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {item.status === "published" && (
                          <Link
                            href={`/artikel/${item.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                            title="Lihat Tampilan Publik"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/artikel/edit/${item.id}`}
                          className="p-1.5 rounded-lg text-slate-400 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Edit Artikel"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget({ id: item.id, title: item.title })}
                          className="p-1.5 rounded-lg text-slate-400 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          title="Hapus Artikel"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredArticles.length > pageSize && (
          <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
            <AdminPagination
              currentPage={currentPage}
              totalItems={filteredArticles.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AdminDeleteModal
        deleteTarget={deleteTarget ? { type: "artikel", id: deleteTarget.id, title: deleteTarget.title } : null}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
