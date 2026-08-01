"use client";

import React, { useState } from "react";
import { Users, Eye, Target, Shield } from "lucide-react";

interface OrgNode {
  role: string;
  name: string;
  description: string;
  photo?: string;
}

export default function TentangView() {
  const [selectedRole, setSelectedRole] = useState<OrgNode | null>({
    role: "Ketua Kader GARUDA",
    name: "Rian Hidayat",
    description: "Rian bertanggung jawab atas seluruh koordinasi program edukasi sebaya, kampanye pencegahan pernikahan anak, dan hubungan eksternal dengan sekolah & puskesmas.",
  });

  const orgData: Record<string, OrgNode> = {
    pelindung: {
      role: "Pelindung",
      name: "Bupati / Kepala Dinas Kesehatan",
      description: "Memberikan arahan kebijakan makro, legalitas hukum, dan dukungan finansial bagi keberlanjutan program SIGMA.",
    },
    pembina: {
      role: "Pembina Teknis",
      name: "Kepala Puskesmas & Kepala BK",
      description: "Membimbing substansi medis kesehatan reproduksi serta mengawasi protokol rujukan psikososial & medis siswa.",
    },
    ketua: {
      role: "Ketua Kader GARUDA",
      name: "Rian Hidayat",
      description: "Mengkoordinasi seluruh divisi, memantau rujukan aktif, serta memimpin forum advokasi pencegahan nikah dini di sekolah.",
    },
    sekretaris: {
      role: "Sekretaris",
      name: "Sarah Salsabila",
      description: "Mengelola persuratan, pendaftaran kuis/kegiatan, dokumentasi kasus anonim, dan administrasi umum.",
    },
    bendahara: {
      role: "Bendahara",
      name: "Ahmad Fauzi",
      description: "Menyusun rencana anggaran kegiatan workshop, mengelola dana kas operasional, dan membuat pelaporan keuangan.",
    },
    divEdukasi: {
      role: "Divisi Edukasi & Literasi",
      name: "Dinda Kirana & Tim",
      description: "Menyusun modul Repropedia, menyunting artikel/video edukatif, serta menyelenggarakan mini kuis kesehatan reproduksi.",
    },
    divKonseling: {
      role: "Divisi Pendampingan & Konseling",
      name: "Lia Lestari & Tim",
      description: "Menangani kontak awal SOS, memberikan konseling sebaya dasar yang aman & rahasia, serta merujuk ke BK/Puskesmas.",
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">Tentang Program SIGMA</h1>
          <p className="text-slate-500 mt-3 text-base leading-relaxed font-semibold">
            Menyelami visi, misi, dan struktur pengurus Kader GARUDA dibalik gerakan kepedulian remaja sehat reproduksi.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center">
              <Eye className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-dark">Visi Kami</h2>
            <p className="text-sm text-slate-600 leading-relaxed font-semibold">
              Mewujudkan generasi muda yang cerdas literasi kesehatan reproduksi, terlindungi dari segala bentuk kekerasan seksual, serta bebas dari pernikahan usia anak demi masa depan Indonesia yang gemilang.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-dark">Misi Kami</h2>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside leading-relaxed font-semibold">
              <li>Menyediakan platform edukasi digital (Repropedia) yang mudah diakses dan faktual secara medis.</li>
              <li>Membangun jaringan konselor sebaya (Kader GARUDA) yang responsif dan terpercaya untuk mendengarkan curhatan siswa.</li>
              <li>Menyediakan sistem rujukan yang terintegrasi cepat dari Siswa ke Kader, BK, Puskesmas, hingga Psikolog profesional.</li>
              <li>Melakukan kampanye advokasi dan publikasi bukti statistik guna menekan angka perkawinan anak di daerah binaan.</li>
            </ul>
          </div>
        </div>

        {/* Interactive Org Chart Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-neutral-dark">Bagan Organisasi Kader GARUDA</h2>
          <p className="text-xs text-slate-500 mt-2 font-semibold">Klik pada posisi pengurus untuk melihat tugas dan profil lengkap.</p>
        </div>

        {/* Organizational Tree View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Chart Nodes */}
          <div className="lg:col-span-8 flex flex-col items-center bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
            
            {/* Level 1: Pelindung & Pembina */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 relative">
              <button
                onClick={() => setSelectedRole(orgData.pelindung)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-extrabold tracking-wide uppercase transition-all cursor-pointer ${
                  selectedRole?.role === "Pelindung"
                    ? "bg-neutral-dark text-white border-neutral-dark shadow-md scale-105"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                }`}
              >
                🛡️ Pelindung
              </button>
              
              <button
                onClick={() => setSelectedRole(orgData.pembina)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-extrabold tracking-wide uppercase transition-all cursor-pointer ${
                  selectedRole?.role === "Pembina Teknis"
                    ? "bg-neutral-dark text-white border-neutral-dark shadow-md scale-105"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                }`}
              >
                👨‍🏫 Pembina Teknis
              </button>
            </div>

            {/* Vertical Line Connector */}
            <div className="w-0.5 h-6 bg-slate-300 -mt-10 mb-4" />

            {/* Level 2: Ketua */}
            <div className="mb-10">
              <button
                onClick={() => setSelectedRole(orgData.ketua)}
                className={`px-6 py-3.5 rounded-2xl border text-sm font-extrabold tracking-wide uppercase transition-all flex items-center space-x-2 cursor-pointer ${
                  selectedRole?.role === "Ketua Kader GARUDA"
                    ? "bg-primary text-white border-primary shadow-lg shadow-emerald-600/10 scale-105"
                    : "bg-white text-primary border-emerald-200 hover:bg-emerald-50/50"
                }`}
              >
                <Users className="h-4.5 w-4.5" />
                <span>Ketua Kader</span>
              </button>
            </div>

            {/* Vertical Line Connector */}
            <div className="w-0.5 h-6 bg-slate-300 -mt-10 mb-4" />

            {/* Level 3: Sekretaris & Bendahara */}
            <div className="grid grid-cols-2 gap-6 md:gap-12 mb-10 w-full max-w-md relative">
              
              <button
                onClick={() => setSelectedRole(orgData.sekretaris)}
                className={`w-full py-3 rounded-xl border text-xs font-extrabold tracking-wide uppercase transition-all cursor-pointer ${
                  selectedRole?.role === "Sekretaris"
                    ? "bg-slate-100 text-slate-900 border-primary shadow-sm scale-105"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                📝 Sekretaris
              </button>

              <button
                onClick={() => setSelectedRole(orgData.bendahara)}
                className={`w-full py-3 rounded-xl border text-xs font-extrabold tracking-wide uppercase transition-all cursor-pointer ${
                  selectedRole?.role === "Bendahara"
                    ? "bg-slate-100 text-slate-900 border-primary shadow-sm scale-105"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                💰 Bendahara
              </button>
            </div>

            {/* Vertical Line Connector */}
            <div className="w-0.5 h-6 bg-slate-300 -mt-10 mb-4" />

            {/* Level 4: Divisi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
              <button
                onClick={() => setSelectedRole(orgData.divEdukasi)}
                className={`py-3 px-4 rounded-xl border text-xs font-extrabold tracking-wide uppercase transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  selectedRole?.role === "Divisi Edukasi & Literasi"
                    ? "bg-amber-500 text-white border-amber-500 shadow-md scale-105"
                    : "bg-amber-50/50 text-amber-700 border-amber-200 hover:bg-amber-100/50"
                }`}
              >
                📚 Divisi Edukasi & Kuis
              </button>

              <button
                onClick={() => setSelectedRole(orgData.divKonseling)}
                className={`py-3 px-4 rounded-xl border text-xs font-extrabold tracking-wide uppercase transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  selectedRole?.role === "Divisi Pendampingan & Konseling"
                    ? "bg-amber-500 text-white border-amber-500 shadow-md scale-105"
                    : "bg-amber-50/50 text-amber-700 border-amber-200 hover:bg-amber-100/50"
                }`}
              >
                🤝 Divisi Pendampingan & SOS
              </button>
            </div>

          </div>

          {/* Node Information Panel */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm min-h-[250px] flex flex-col justify-between">
            {selectedRole ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wide">
                    {selectedRole.role}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-dark mt-2">{selectedRole.name}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  {selectedRole.description}
                </p>
                <div className="bg-slate-50 p-3 rounded-2xl flex items-center space-x-2 text-[11px] text-slate-500 font-bold border border-slate-100">
                  <Shield className="h-4 w-4 text-primary shrink-0" />
                  <span>Kader GARUDA Terverifikasi</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                <Users className="h-8 w-8 mb-2" />
                <p className="text-xs font-semibold">Silakan klik bagan disamping untuk memunculkan deskripsi pengurus.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
