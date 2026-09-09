"use client";

import React from "react";
import {
  Edit2,
  Shield,
  GraduationCap,
  Users,
  ClipboardList,
  Wallet,
  BookOpen,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { OrgMember } from "@/types";

// Posisi tetap sesuai bagan organisasi — tidak bisa ditambah/dihapus
const ROLE_CONFIG: Record<string, { label: string; Icon: LucideIcon }> = {
  pelindung: { label: "Pelindung", Icon: Shield },
  pembina: { label: "Pembina Teknis", Icon: GraduationCap },
  ketua: { label: "Ketua Kader GARUDA", Icon: Users },
  sekretaris: { label: "Sekretaris", Icon: ClipboardList },
  bendahara: { label: "Bendahara", Icon: Wallet },
  div_edukasi: { label: "Divisi Edukasi & Literasi", Icon: BookOpen },
  div_konseling: {
    label: "Divisi Pendampingan & Konseling",
    Icon: HeartHandshake,
  },
};

interface AdminOrganisasiViewProps {
  members: OrgMember[];
  editingMember: Partial<OrgMember> | null;
  setEditingMember: (val: Partial<OrgMember> | null) => void;
  onSave: () => void;
}

export default function AdminOrganisasiView({
  members,
  editingMember,
  setEditingMember,
  onSave,
}: AdminOrganisasiViewProps) {
  // Urutkan sesuai sort_order
  const sorted = [...members].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-dark dark:text-slate-100 tracking-tight">
              Badan Organisasi
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/60 text-[11px] font-black">
              {sorted.length} Jabatan
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Struktur kepengurusan resmi kader platform SIGMA. Klik ikon pensil untuk memperbarui nama pemegang jabatan.
          </p>
        </div>
      </div>

      {/* Org Members Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((m) => {
          const config = ROLE_CONFIG[m.key];
          const Icon = config ? config.Icon : Shield;
          const label = config ? config.label : m.role;

          return (
            <div
              key={m.key}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-xs transition-all duration-200"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-primary dark:text-emerald-400 border border-emerald-100/80 dark:border-emerald-900/60 rounded-2xl shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider block truncate">
                    {label}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-neutral-dark dark:text-slate-100 block truncate mt-0.5">
                    {m.name || (
                      <span className="text-slate-300 dark:text-slate-600 italic font-normal">Belum diisi</span>
                    )}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setEditingMember(m)}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700 shrink-0 ml-2"
                title="Edit nama"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Edit Modal — hanya nama yang bisa diubah */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-sm max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-slate-900">
              <div>
                <h3 className="font-extrabold text-neutral-dark dark:text-slate-100 text-base">
                  Edit Pemegang Jabatan
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 font-medium">
                  Perbarui nama pemegang posisi organisasi.
                </p>
              </div>
              <button
                onClick={() => setEditingMember(null)}
                className="text-slate-400 hover:text-neutral-dark dark:hover:text-white font-bold p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Tutup Modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 grow touch-pan-y">
              {/* Jabatan — read-only display */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Jabatan Organisasi
                </label>
                <div className="w-full px-3.5 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  {(() => {
                    const cfg = ROLE_CONFIG[editingMember.key ?? ""];
                    if (!cfg) return editingMember.role ?? "-";
                    const Icon = cfg.Icon;
                    return (
                      <>
                        <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{cfg.label}</span>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Nama — satu-satunya field yang bisa diedit */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Nama Lengkap Pemegang Jabatan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Nama lengkap..."
                  value={editingMember.name ?? ""}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-primary dark:focus:border-primary transition-all font-semibold"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-end space-x-3 shrink-0">
              <button
                onClick={() => setEditingMember(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
              >
                Batal
              </button>
              <button
                onClick={onSave}
                disabled={!editingMember.name?.trim()}
                className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-xs active:scale-98 cursor-pointer disabled:opacity-50 transition-all"
              >
                Simpan Nama
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
