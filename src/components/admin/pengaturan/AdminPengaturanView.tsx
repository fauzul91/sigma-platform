"use client";

import React from "react";

interface AdminPengaturanViewProps {
  vision: string;
  setVision: (val: string) => void;
  mission: string;
  setMission: (val: string) => void;
  ketuaName: string;
  setKetuaName: (val: string) => void;
  onSave: () => void;
}

export default function AdminPengaturanView({
  vision,
  setVision,
  mission,
  setMission,
  ketuaName,
  setKetuaName,
  onSave
}: AdminPengaturanViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl">
      
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-neutral-dark">Pengaturan Konten Umum</h2>
          <p className="text-xs text-slate-400 mt-1 font-semibold">Ubah parameter teks statis situs utama dalam sekali klik.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Visi Organisasi</label>
            <textarea
              rows={2}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Misi Organisasi</label>
            <textarea
              rows={3}
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Nama Ketua Kader GARUDA</label>
            <input
              type="text"
              value={ketuaName}
              onChange={(e) => setKetuaName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={onSave}
            className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md shadow-emerald-600/10 transition-all active:scale-98 cursor-pointer"
          >
            Simpan Perubahan Pengaturan
          </button>
        </div>
      </div>

    </div>
  );
}
