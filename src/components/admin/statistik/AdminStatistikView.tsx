import React from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { StatRecord } from "@/types";
import AdminPagination from "@/components/admin/shared/AdminPagination";

interface AdminStatistikViewProps {
  stats: StatRecord[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingStat: (Partial<StatRecord> & { index?: number }) | null;
  setEditingStat: (val: (Partial<StatRecord> & { index?: number }) | null) => void;
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
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Cari tahun..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
        </div>

        <button
          onClick={() => setEditingStat({})}
          className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Data Statistik</span>
        </button>
      </div>

      {/* Statistics Cases Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-xs font-semibold text-slate-500">
          <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Tahun</th>
              <th className="py-3.5 px-4">Desa Sukamaju</th>
              <th className="py-3.5 px-4">Desa Harapan</th>
              <th className="py-3.5 px-4">Desa Mekarjaya</th>
              <th className="py-3.5 px-4">Desa Kertajaya</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stats.map((s) => (
              <tr key={s.year} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-neutral-dark">{s.year}</td>
                <td className="py-3.5 px-4">{s["Desa Sukamaju"]} kasus</td>
                <td className="py-3.5 px-4">{s["Desa Harapan"]} kasus</td>
                <td className="py-3.5 px-4">{s["Desa Mekarjaya"]} kasus</td>
                <td className="py-3.5 px-4">{s["Desa Kertajaya"]} kasus</td>
                <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingStat({ ...s })}
                    className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(s.year, `Tahun ${s.year}`)}
                    className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Reusable premium pagination controls */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100">
          <AdminPagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={5}
            onPageChange={onPageChange}
          />
        </div>
      </div>

      {/* Overlay Modal for Stat CRUD */}
      {editingStat && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
              <h3 className="font-extrabold text-neutral-dark text-lg">
                {editingStat.index !== undefined ? "Edit Baris Kasus" : "Tambah Baris Kasus Baru"}
              </h3>
              <button
                onClick={() => setEditingStat(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Tahun Kejadian</label>
                <input
                  type="number"
                  required
                  value={editingStat.year || ""}
                  onChange={(e) => setEditingStat({ ...editingStat, year: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Desa Sukamaju</label>
                  <input
                    type="number"
                    value={editingStat["Desa Sukamaju"] ?? ""}
                    onChange={(e) => setEditingStat({ ...editingStat, "Desa Sukamaju": Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Desa Harapan</label>
                  <input
                    type="number"
                    value={editingStat["Desa Harapan"] ?? ""}
                    onChange={(e) => setEditingStat({ ...editingStat, "Desa Harapan": Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Desa Mekarjaya</label>
                  <input
                    type="number"
                    value={editingStat["Desa Mekarjaya"] ?? ""}
                    onChange={(e) => setEditingStat({ ...editingStat, "Desa Mekarjaya": Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Desa Kertajaya</label>
                  <input
                    type="number"
                    value={editingStat["Desa Kertajaya"] ?? ""}
                    onChange={(e) => setEditingStat({ ...editingStat, "Desa Kertajaya": Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setEditingStat(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md cursor-pointer"
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
