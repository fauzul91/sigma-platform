"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Search,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Users,
} from "lucide-react";
import { EventItem } from "@/types";
import AdminPagination from "@/components/admin/shared/AdminPagination";

interface AdminKegiatanViewProps {
  events: EventItem[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingEvent?: Partial<EventItem> | null;
  setEditingEvent?: React.Dispatch<React.SetStateAction<Partial<EventItem> | null>>;
  onSave?: () => void;
  onDelete: (id: string, title: string) => void;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function AdminKegiatanView({
  events,
  searchTerm,
  setSearchTerm,
  onDelete,
  currentPage,
  totalItems,
  onPageChange,
}: AdminKegiatanViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header with Title and Create Button aligned */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-dark dark:text-slate-100 tracking-tight">
              Manajemen Kegiatan &amp; Event
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/60 text-[11px] font-black">
              Agenda &amp; Galeri
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Kelola jadwal sosialisasi, dokumentasi per minggu, dan unggah foto kegiatan dalam halaman kerja penuh.
          </p>
        </div>

        <Link
          href="/admin/kegiatan/baru"
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-extrabold flex items-center justify-center space-x-1.5 shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Kegiatan Baru</span>
        </Link>
      </div>

      {/* Events Data Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs overflow-hidden">
        {/* Table Toolbar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Cari kegiatan, lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary transition-all"
            />
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
          </div>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
            Total {totalItems} Kegiatan Tercatat
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-neutral-dark dark:text-slate-200 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-200/70 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Nama Kegiatan</th>
                <th className="py-3.5 px-4">Minggu</th>
                <th className="py-3.5 px-4">Tanggal</th>
                <th className="py-3.5 px-4">Lokasi</th>
                <th className="py-3.5 px-4">Peserta &amp; Foto</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 dark:text-slate-500">
                    <p className="font-bold">Tidak ada agenda kegiatan ditemukan.</p>
                    <p className="text-[11px] mt-0.5">
                      Klik "Kegiatan Baru" untuk mencatat agenda sosialisasi dan mengunggah dokumentasi.
                    </p>
                  </td>
                </tr>
              ) : (
                events.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-neutral-dark dark:text-slate-100">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-primary dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 shrink-0">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <span className="truncate max-w-xs">{item.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border dark:border-emerald-800/50 font-black text-[10px]">
                        {item.week === 99 ? "Penutupan" : `Minggu ${item.week || 1}`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">{item.date}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="truncate max-w-[180px]">{item.location}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-slate-700 dark:text-slate-200 font-bold">
                          <Users className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                          <span>{item.attendees} Orang</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block">
                          {(item.images || []).length} Foto Dokumentasi
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Link
                          href={`/admin/kegiatan/edit/${item.id}`}
                          className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Edit Kegiatan & Foto"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => onDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                          title="Hapus Kegiatan"
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

        {/* Reusable pagination controls */}
        {totalItems > 5 && (
          <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
            <AdminPagination
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={5}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
