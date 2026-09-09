import React from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { StatRecord } from "@/types";
import AdminPagination from "@/components/admin/shared/AdminPagination";

interface AdminStatistikViewProps {
  stats: StatRecord[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingStat: (Partial<StatRecord> & { index?: number; _isEdit?: boolean }) | null;
  setEditingStat: (val: (Partial<StatRecord> & { index?: number; _isEdit?: boolean }) | null) => void;
  onSave: () => void;
  onDelete: (year: number, title: string) => void;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function AdminStatistikView({
  stats,
  searchTerm,
  setSearchTerm,
  editingStat,
  setEditingStat,
  onSave,
  onDelete,
  currentPage,
  totalItems,
  onPageChange,
}: AdminStatistikViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-dark dark:text-slate-100 tracking-tight">
              Statistik &amp; Pelaporan Kasus
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/60 text-[11px] font-black">
              {totalItems} Tahun Tercatat
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Tinjauan rekap data kasus perkawinan anak antar desa dampingan per tahun.
          </p>
        </div>

        <button
          onClick={() => setEditingStat({})}
          className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Data Statistik</span>
        </button>
      </div>

      {/* Statistics Cases Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
        {/* Table Toolbar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Cari tahun data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary dark:focus:border-primary transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 self-end sm:self-center">
            Total <span className="text-neutral-dark dark:text-slate-200 font-black">{totalItems}</span> Rekap Tahun
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
            <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-neutral-dark dark:text-slate-300 font-extrabold uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800 text-[10px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Tahun</th>
                <th className="py-3.5 px-4">Desa Sukamaju</th>
                <th className="py-3.5 px-4">Desa Harapan</th>
                <th className="py-3.5 px-4">Desa Mekarjaya</th>
                <th className="py-3.5 px-4">Desa Kertajaya</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {stats.map((s) => (
                <tr key={s.year} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-neutral-dark dark:text-slate-200">{s.year}</td>
                  <td className="py-3.5 px-4">{s["Desa Sukamaju"]} kasus</td>
                  <td className="py-3.5 px-4">{s["Desa Harapan"]} kasus</td>
                  <td className="py-3.5 px-4">{s["Desa Mekarjaya"]} kasus</td>
                  <td className="py-3.5 px-4">{s["Desa Kertajaya"]} kasus</td>
                  <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setEditingStat({ ...s, _isEdit: true })}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700"
                        title="Edit Data"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(s.year, `Tahun ${s.year}`)}
                        className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all cursor-pointer border border-rose-200/60 dark:border-rose-900/50"
                        title="Hapus Data"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Reusable premium pagination controls */}
        <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
          <AdminPagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={5}
            onPageChange={onPageChange}
          />
        </div>
      </div>

      {/* Overlay Modal for Stat CRUD (Scrollable on Tablet & Mobile) */}
      {editingStat && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-md max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-slate-900">
              <div>
                <h3 className="font-extrabold text-neutral-dark dark:text-slate-100 text-base sm:text-lg">
                  {editingStat._isEdit ? "Edit Data Statistik" : "Tambah Data Statistik Baru"}
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 font-medium">
                  Masukkan angka kumulatif kasus perkawinan anak per desa.
                </p>
              </div>
              <button
                onClick={() => setEditingStat(null)}
                className="text-slate-400 hover:text-neutral-dark dark:hover:text-white font-bold p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Tutup Modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 grow touch-pan-y">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Tahun Kejadian <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="2026"
                  value={editingStat.year || ""}
                  onChange={(e) =>
                    editingStat._isEdit
                      ? undefined
                      : setEditingStat({ ...editingStat, year: Number(e.target.value) })
                  }
                  readOnly={Boolean(editingStat._isEdit)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none transition-all ${
                    editingStat._isEdit
                      ? "bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:border-primary dark:focus:border-primary"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Desa Sukamaju (Kasus)
                  </label>
                  <input
                    type="number"
                    value={editingStat["Desa Sukamaju"] ?? ""}
                    onChange={(e) => setEditingStat({ ...editingStat, "Desa Sukamaju": Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Desa Harapan (Kasus)
                  </label>
                  <input
                    type="number"
                    value={editingStat["Desa Harapan"] ?? ""}
                    onChange={(e) => setEditingStat({ ...editingStat, "Desa Harapan": Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Desa Mekarjaya (Kasus)
                  </label>
                  <input
                    type="number"
                    value={editingStat["Desa Mekarjaya"] ?? ""}
                    onChange={(e) => setEditingStat({ ...editingStat, "Desa Mekarjaya": Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Desa Kertajaya (Kasus)
                  </label>
                  <input
                    type="number"
                    value={editingStat["Desa Kertajaya"] ?? ""}
                    onChange={(e) => setEditingStat({ ...editingStat, "Desa Kertajaya": Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Modal Sticky Footer */}
            <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-end space-x-3 shrink-0">
              <button
                onClick={() => setEditingStat(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
              >
                Batal
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-xs active:scale-98 cursor-pointer transition-all"
              >
                Simpan Data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
