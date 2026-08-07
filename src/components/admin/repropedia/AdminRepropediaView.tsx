import React from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { RepropediaItem } from "@/types";
import AdminPagination from "@/components/admin/shared/AdminPagination";

interface AdminRepropediaViewProps {
  modules: RepropediaItem[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingModule: Partial<RepropediaItem> | null;
  setEditingModule: (val: Partial<RepropediaItem> | null) => void;
  onSave: () => void;
  onDelete: (id: string, title: string) => void;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function AdminRepropediaView({
  modules,
  searchTerm,
  setSearchTerm,
  editingModule,
  setEditingModule,
  onSave,
  onDelete,
  currentPage,
  totalItems,
  onPageChange,
}: AdminRepropediaViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Cari modul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
        </div>

        <button
          onClick={() => setEditingModule({})}
          className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Modul Repropedia</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-xs font-semibold text-slate-500">
          <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Judul Modul</th>
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4">Penulis</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {modules.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-neutral-dark">{m.title}</td>
                <td className="py-3.5 px-4 capitalize">{m.category.replace("-", " ")}</td>
                <td className="py-3.5 px-4">{m.author}</td>
                <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingModule(m)}
                    className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(m.id, m.title)}
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

      {/* Overlay Modal for Module CRUD */}
      {editingModule && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
              <h3 className="font-extrabold text-neutral-dark text-lg">{editingModule.id ? "Edit Modul Repropedia" : "Buat Modul Baru"}</h3>
              <button
                onClick={() => setEditingModule(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Judul Modul</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Menjaga Organ Intim"
                    value={editingModule.title || ""}
                    onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Kategori</label>
                  <select
                    value={editingModule.category || "pubertas"}
                    onChange={(e) => setEditingModule({ ...editingModule, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white font-bold text-slate-600"
                  >
                    <option value="pubertas">Pubertas</option>
                    <option value="pernikahan-anak">Pernikahan Anak</option>
                    <option value="hak-anak">Hak Anak</option>
                    <option value="kekerasan-seksual">Kekerasan Seksual</option>
                    <option value="kesehatan-mental">Kesehatan Mental</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Ringkasan Sinopsis</label>
                <input
                  type="text"
                  required
                  placeholder="Jelaskan ringkasan isi modul..."
                  value={editingModule.synopsis || ""}
                  onChange={(e) => setEditingModule({ ...editingModule, synopsis: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Konten Materi</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Tuliskan materi edukasi lengkap di sini..."
                  value={editingModule.content || ""}
                  onChange={(e) => setEditingModule({ ...editingModule, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Waktu Baca</label>
                  <input
                    type="text"
                    placeholder="5 menit"
                    value={editingModule.readTime || ""}
                    onChange={(e) => setEditingModule({ ...editingModule, readTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Penulis / Ahli</label>
                  <input
                    type="text"
                    placeholder="dr. Anita Wijaya"
                    value={editingModule.author || ""}
                    onChange={(e) => setEditingModule({ ...editingModule, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setEditingModule(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md shadow-emerald-600/10 transition-all cursor-pointer"
              >
                Simpan Modul
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
