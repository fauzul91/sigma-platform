"use client";

import React from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { Counselor } from "@/types";

interface AdminKonselingViewProps {
  counselors: Counselor[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingCounselor: Partial<Counselor> | null;
  setEditingCounselor: (val: Partial<Counselor> | null) => void;
  onSave: () => void;
  onDelete: (id: string, title: string) => void;
}

export default function AdminKonselingView({
  counselors,
  searchTerm,
  setSearchTerm,
  editingCounselor,
  setEditingCounselor,
  onSave,
  onDelete,
}: AdminKonselingViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Cari pendamping..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
          />
          <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
        </div>

        <button
          onClick={() => setEditingCounselor({})}
          className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Anggota / Konselor</span>
        </button>
      </div>

      {/* Counselors Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-xs font-semibold text-slate-500">
          <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Nama</th>
              <th className="py-3.5 px-4">Peran</th>
              <th className="py-3.5 px-4">No. WhatsApp</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {counselors
              .filter((c) =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-neutral-dark">
                    {c.name}
                  </td>
                  <td className="py-3.5 px-4">{c.role}</td>
                  <td className="py-3.5 px-4">{c.whatsappNumber}</td>
                  <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingCounselor(c)}
                      className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(c.id, c.name)}
                      className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Overlay Modal for Counselor CRUD */}
      {editingCounselor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
              <h3 className="font-extrabold text-neutral-dark text-lg">
                {editingCounselor.id
                  ? "Edit Anggota Kader / Konselor"
                  : "Tambah Anggota Kader / Konselor Baru"}
              </h3>
              <button
                onClick={() => setEditingCounselor(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCounselor.name || ""}
                    onChange={(e) =>
                      setEditingCounselor({
                        ...editingCounselor,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Kategori Peran
                  </label>
                  <select
                    value={editingCounselor.role || "Kader GARUDA"}
                    onChange={(e) =>
                      setEditingCounselor({
                        ...editingCounselor,
                        role: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white font-bold"
                  >
                    <option value="Kader GARUDA">Kader GARUDA</option>
                    <option value="Guru BK">Guru BK</option>
                    <option value="Puskesmas">Puskesmas</option>
                    <option value="Psikolog">Psikolog</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    No. WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+62..."
                    value={editingCounselor.whatsappNumber || ""}
                    onChange={(e) =>
                      setEditingCounselor({
                        ...editingCounselor,
                        whatsappNumber: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Jam Operasional Kerja
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              {/* Link Google Maps — hanya muncul jika peran Puskesmas */}
              {editingCounselor.role === "Puskesmas" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                    Link Google Maps Embed
                    <span className="normal-case font-semibold text-slate-300">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    Buka Google Maps → cari lokasi → klik{" "}
                    <strong>Bagikan</strong> → tab{" "}
                    <strong>Sematkan peta</strong> → salin URL dari atribut{" "}
                    <code className="bg-slate-100 px-1 rounded">src</code>.
                  </p>
                  {/* Preview mini jika URL sudah diisi */}
                  {editingCounselor.locationMapUrl && (
                    <div className="rounded-xl overflow-hidden border border-slate-200 h-36">
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

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setEditingCounselor(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md cursor-pointer"
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
