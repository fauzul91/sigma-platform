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
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-200/50 pb-4">
        <h2 className="text-lg font-extrabold text-neutral-dark">
          Badan Organisasi Kader GARUDA
        </h2>
        <p className="text-xs text-slate-400 font-semibold mt-1">
          Klik ikon edit untuk memperbarui nama pemegang jabatan. Struktur
          jabatan bersifat tetap.
        </p>
      </div>

      {/* Org Members Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sorted.map((m) => {
          const config = ROLE_CONFIG[m.key];
          const Icon = config?.Icon;
          return (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                {Icon && (
                  <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-primary">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                )}
                <div className="min-w-0">
                  <span className="block text-[10px] font-black text-primary uppercase tracking-wider">
                    {config?.label ?? m.role}
                  </span>
                  <p className="text-sm font-extrabold text-neutral-dark truncate">
                    {m.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingMember(m)}
                className="shrink-0 p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-primary transition-colors cursor-pointer border border-slate-100"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5">
              <h3 className="font-extrabold text-neutral-dark text-base">
                Edit Nama Pemegang Jabatan
              </h3>
              <button
                onClick={() => setEditingMember(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Jabatan — read-only display */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Jabatan
                </label>
                <div className="w-full px-3.5 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-xs font-bold text-slate-500 flex items-center gap-2">
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
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Nama Pemegang Jabatan
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setEditingMember(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={onSave}
                disabled={!editingMember.name?.trim()}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md cursor-pointer disabled:opacity-50"
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
