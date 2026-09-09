import React from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { Counselor } from "@/types";
import AdminPagination from "@/components/admin/shared/AdminPagination";

interface AdminKonselingViewProps {
  counselors: Counselor[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingCounselor: Partial<Counselor> | null;
  setEditingCounselor: (val: Partial<Counselor> | null) => void;
  onSave: () => void;
  onDelete: (id: string, title: string) => void;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function AdminKonselingView({
  counselors,
  searchTerm,
  setSearchTerm,
  editingCounselor,
  setEditingCounselor,
  onSave,
  onDelete,
  currentPage,
  totalItems,
  onPageChange,
}: AdminKonselingViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-dark dark:text-slate-100 tracking-tight">
              Manajemen Konselor
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/60 text-[11px] font-black">
              {totalItems} Konselor
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Kelola data konselor sebaya, guru BK, dan tenaga medis Puskesmas pendamping.
          </p>
        </div>

        <button
          onClick={() => setEditingCounselor({ role: "Kader GARUDA" })}
          className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Anggota / Konselor</span>
        </button>
      </div>

      {/* Counselors Data Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
        {/* Table Toolbar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Cari pendamping, peran, instansi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary dark:focus:border-primary transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 self-end sm:self-center">
            Total <span className="text-neutral-dark dark:text-slate-200 font-black">{totalItems}</span> Konselor Terdaftar
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
            <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-neutral-dark dark:text-slate-300 font-extrabold uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800 text-[10px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Nama Konselor</th>
                <th className="py-3.5 px-4">Peran</th>
                <th className="py-3.5 px-4">No. WhatsApp</th>
                <th className="py-3.5 px-4">Lokasi / Instansi</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {counselors.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-neutral-dark dark:text-slate-200">
                    {c.name}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/50 font-black text-[10px]">
                      {c.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-600 dark:text-slate-400">
                    {c.whatsappNumber}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    {c.locationName || "-"}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setEditingCounselor(c)}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700"
                        title="Edit Konselor"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(c.id, c.name)}
                        className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all cursor-pointer border border-rose-200/60 dark:border-rose-900/50"
                        title="Hapus Konselor"
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

      {/* Overlay Modal for Counselor CRUD (Scrollable on Tablet & Mobile) */}
      {editingCounselor && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-xl max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-slate-900">
              <div>
                <h3 className="font-extrabold text-neutral-dark dark:text-slate-100 text-base sm:text-lg">
                  {editingCounselor.id
                    ? "Edit Anggota Kader / Konselor"
                    : "Tambah Anggota Kader / Konselor Baru"}
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 font-medium">
                  Pastikan nomor WhatsApp dan jam operasional aktif.
                </p>
              </div>
              <button
                onClick={() => setEditingCounselor(null)}
                className="text-slate-400 hover:text-neutral-dark dark:hover:text-white font-bold p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Tutup Modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 grow touch-pan-y">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: dr. Sarah Sp.KJ"
                    value={editingCounselor.name || ""}
                    onChange={(e) =>
                      setEditingCounselor({
                        ...editingCounselor,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Kategori Peran <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={editingCounselor.role || "Kader GARUDA"}
                    onChange={(e) =>
                      setEditingCounselor({
                        ...editingCounselor,
                        role: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-primary bg-white dark:bg-slate-800 font-bold text-neutral-dark dark:text-slate-100 transition-all"
                  >
                    <option value="Kader GARUDA" className="dark:bg-slate-800">Kader GARUDA</option>
                    <option value="Guru BK" className="dark:bg-slate-800">Guru BK</option>
                    <option value="Puskesmas" className="dark:bg-slate-800">Puskesmas</option>
                    <option value="Psikolog" className="dark:bg-slate-800">Psikolog</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    No. WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+628123456789"
                    value={editingCounselor.whatsappNumber || ""}
                    onChange={(e) =>
                      setEditingCounselor({
                        ...editingCounselor,
                        whatsappNumber: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Jam Operasional Kerja <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Senin - Sabtu, 08.00 - 15.00"
                    value={editingCounselor.operationalHours || ""}
                    onChange={(e) =>
                      setEditingCounselor({
                        ...editingCounselor,
                        operationalHours: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Nama Instansi / Ruangan (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Ruang BK SMA 1 / Puskesmas KIA"
                  value={editingCounselor.locationName || ""}
                  onChange={(e) =>
                    setEditingCounselor({
                      ...editingCounselor,
                      locationName: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-medium"
                />
              </div>

              {/* Link Google Maps — hanya muncul jika peran Puskesmas */}
              {editingCounselor.role === "Puskesmas" && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                    Link Google Maps Embed
                    <span className="normal-case font-normal text-slate-400 dark:text-slate-500">
                      (Opsional)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    value={editingCounselor.locationMapUrl || ""}
                    onChange={(e) =>
                      setEditingCounselor({
                        ...editingCounselor,
                        locationMapUrl: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-mono"
                  />
                  {/* Preview mini jika URL sudah diisi */}
                  {editingCounselor.locationMapUrl && (
                    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 h-36">
                      <iframe
                        src={editingCounselor.locationMapUrl}
                        width="100%"
                        height="100%"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Sticky Footer */}
            <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-end space-x-3 shrink-0">
              <button
                onClick={() => setEditingCounselor(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
              >
                Batal
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-xs active:scale-98 cursor-pointer transition-all"
              >
                Simpan Anggota / Konselor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
