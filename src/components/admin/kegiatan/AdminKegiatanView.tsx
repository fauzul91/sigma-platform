"use client";

import React from "react";
import { Search, Plus, Edit2, Trash2, Calendar } from "lucide-react";
import { EventItem } from "@/types";

interface AdminKegiatanViewProps {
  events: EventItem[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  editingEvent: Partial<EventItem> | null;
  setEditingEvent: (val: Partial<EventItem> | null) => void;
  onSave: () => void;
  onDelete: (id: string, title: string) => void;
}

export default function AdminKegiatanView({
  events,
  searchTerm,
  setSearchTerm,
  editingEvent,
  setEditingEvent,
  onSave,
  onDelete,
}: AdminKegiatanViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Cari kegiatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
          />
          <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
        </div>

        <button
          onClick={() => setEditingEvent({ attendees: 0, images: [""] })}
          className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Kegiatan Baru</span>
        </button>
      </div>

      {/* Events Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-xs font-semibold text-slate-500">
          <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Nama Kegiatan</th>
              <th className="py-3.5 px-4">Tanggal</th>
              <th className="py-3.5 px-4">Lokasi</th>
              <th className="py-3.5 px-4">Peserta</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events
              .filter(
                (e) =>
                  e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  e.location.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-neutral-dark">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-primary">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <span>{item.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">{item.date}</td>
                  <td className="py-3.5 px-4">{item.location}</td>
                  <td className="py-3.5 px-4">{item.attendees} Orang</td>
                  <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingEvent(item)}
                      className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id, item.title)}
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

      {/* Overlay Modal for Event CRUD */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
              <h3 className="font-extrabold text-neutral-dark text-lg">
                {editingEvent.id ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}
              </h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Nama Kegiatan
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.title || ""}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Tanggal Pelaksanaan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="14 Mei 2026"
                    value={editingEvent.date || ""}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, date: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Jumlah Peserta
                  </label>
                  <input
                    type="number"
                    required
                    value={editingEvent.attendees ?? 0}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        attendees: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Lokasi Kegiatan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Aula SMKN 2 Kabupaten Aman"
                  value={editingEvent.location || ""}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Deskripsi Kegiatan
                </label>
                <textarea
                  rows={3}
                  placeholder="Rincian agenda dan hasil dari kegiatan..."
                  value={editingEvent.description || ""}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              {/* Image URLs management */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                  URL Foto Dokumentasi
                </label>
                {(editingEvent.images || []).map((url, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="https://..."
                      value={url}
                      onChange={(e) => {
                        const updated = [...(editingEvent.images || [])];
                        updated[idx] = e.target.value;
                        setEditingEvent({ ...editingEvent, images: updated });
                      }}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                    {(editingEvent.images || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (editingEvent.images || []).filter(
                            (_, i) => i !== idx,
                          );
                          setEditingEvent({ ...editingEvent, images: updated });
                        }}
                        className="p-2 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 text-xs font-bold cursor-pointer shrink-0"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setEditingEvent({
                      ...editingEvent,
                      images: [...(editingEvent.images || []), ""],
                    })
                  }
                  className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 cursor-pointer"
                >
                  + Tambah URL Foto
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setEditingEvent(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md cursor-pointer"
              >
                Simpan Kegiatan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
