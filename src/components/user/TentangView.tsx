"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Eye,
  Target,
  Shield,
  GraduationCap,
  ClipboardList,
  Wallet,
  BookOpen,
  HeartHandshake,
} from "lucide-react";
import { userService } from "@/services/user/userService";
import { OrgMember } from "@/types";

export default function TentangView() {
  const [selectedRole, setSelectedRole] = useState<OrgMember | null>({
    id: "o3",
    key: "ketua",
    role: "Ketua Kader GARUDA",
    name: "Rian Hidayat",
    description:
      "Mengkoordinasi seluruh divisi, memantau rujukan aktif, serta memimpin forum advokasi pencegahan nikah dini di sekolah.",
    sortOrder: 3,
  });
  const [selectedKey, setSelectedKey] = useState<string>("ketua");

  const [orgMap, setOrgMap] = useState<Record<string, OrgMember>>({
    pelindung: {
      id: "o1",
      key: "pelindung",
      role: "Pelindung",
      name: "Bupati / Kepala Dinas Kesehatan",
      description:
        "Memberikan arahan kebijakan makro, legalitas hukum, dan dukungan finansial bagi keberlanjutan program SIGMA.",
      sortOrder: 1,
    },
    pembina: {
      id: "o2",
      key: "pembina",
      role: "Pembina Teknis",
      name: "Kepala Puskesmas & Kepala BK",
      description:
        "Membimbing substansi medis kesehatan reproduksi serta mengawasi protokol rujukan psikososial & medis siswa.",
      sortOrder: 2,
    },
    ketua: {
      id: "o3",
      key: "ketua",
      role: "Ketua Kader GARUDA",
      name: "Rian Hidayat",
      description:
        "Mengkoordinasi seluruh divisi, memantau rujukan aktif, serta memimpin forum advokasi pencegahan nikah dini di sekolah.",
      sortOrder: 3,
    },
    sekretaris: {
      id: "o4",
      key: "sekretaris",
      role: "Sekretaris",
      name: "Sarah Salsabila",
      description:
        "Mengelola persuratan, pendaftaran kuis/kegiatan, dokumentasi kasus anonim, dan administrasi umum.",
      sortOrder: 4,
    },
    bendahara: {
      id: "o5",
      key: "bendahara",
      role: "Bendahara",
      name: "Ahmad Fauzi",
      description:
        "Menyusun rencana anggaran kegiatan workshop, mengelola dana kas operasional, dan membuat pelaporan keuangan.",
      sortOrder: 5,
    },
    div_edukasi: {
      id: "o6",
      key: "div_edukasi",
      role: "Divisi Edukasi & Literasi",
      name: "Dinda Kirana & Tim",
      description:
        "Menyusun modul Repropedia, menyunting artikel/video edukatif, serta menyelenggarakan mini kuis kesehatan reproduksi.",
      sortOrder: 6,
    },
    div_konseling: {
      id: "o7",
      key: "div_konseling",
      role: "Divisi Pendampingan & Konseling",
      name: "Lia Lestari & Tim",
      description:
        "Menangani kontak awal SOS, memberikan konseling sebaya dasar yang aman & rahasia, serta merujuk ke BK/Puskesmas.",
      sortOrder: 7,
    },
  });

  useEffect(() => {
    userService.getOrgMembers().then((members) => {
      if (members.length > 0) {
        const map: Record<string, OrgMember> = {};
        members.forEach((m) => {
          map[m.key] = m;
        });
        setOrgMap(map);
        if (map.ketua) setSelectedRole(map.ketua);
      }
    });
  }, []);

  const handleSelectNode = (key: string) => {
    setSelectedKey(key);
    if (orgMap[key]) setSelectedRole(orgMap[key]);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">
            Tentang Program SIGMA
          </h1>
          <p className="text-slate-500 mt-3 text-base leading-relaxed font-semibold">
            Menyelami visi, misi, dan struktur pengurus Kader GARUDA dibalik
            gerakan kepedulian remaja sehat reproduksi.
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
              Mewujudkan generasi muda yang cerdas literasi kesehatan
              reproduksi, terlindungi dari segala bentuk kekerasan seksual,
              serta bebas dari pernikahan usia anak demi masa depan Indonesia
              yang gemilang.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-dark">Misi Kami</h2>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside leading-relaxed font-semibold">
              <li>
                Menyediakan platform edukasi digital (Repropedia) yang mudah
                diakses dan faktual secara medis.
              </li>
              <li>
                Membangun jaringan konselor sebaya (Kader GARUDA) yang responsif
                dan terpercaya untuk mendengarkan curhatan siswa.
              </li>
              <li>
                Menyediakan sistem rujukan yang terintegrasi cepat dari Siswa ke
                Kader, BK, Puskesmas, hingga Psikolog profesional.
              </li>
              <li>
                Melakukan kampanye advokasi dan publikasi bukti statistik guna
                menekan angka perkawinan anak di daerah binaan.
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Org Chart Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-neutral-dark">
            Bagan Organisasi Kader GARUDA
          </h2>
          <p className="text-xs text-slate-500 mt-2 font-semibold">
            Klik pada posisi pengurus untuk melihat tugas dan profil lengkap.
          </p>
        </div>

        {/* Organizational Tree View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chart Nodes */}
          <div className="lg:col-span-8 flex flex-col items-center bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
            {/* Level 1: Pelindung & Pembina */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 relative">
              <button
                onClick={() => handleSelectNode("pelindung")}
                className={`px-4 py-2.5 rounded-xl border text-xs font-extrabold tracking-wide uppercase transition-all cursor-pointer flex items-center space-x-1.5 ${
                  selectedKey === "pelindung"
                    ? "bg-neutral-dark text-white border-neutral-dark shadow-md scale-105"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                }`}
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Pelindung</span>
              </button>

              <button
                onClick={() => handleSelectNode("pembina")}
                className={`px-4 py-2.5 rounded-xl border text-xs font-extrabold tracking-wide uppercase transition-all cursor-pointer flex items-center space-x-1.5 ${
                  selectedKey === "pembina"
                    ? "bg-neutral-dark text-white border-neutral-dark shadow-md scale-105"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Pembina Teknis</span>
              </button>
            </div>

            {/* Vertical Line Connector */}
            <div className="w-0.5 h-6 bg-slate-300 -mt-10 mb-4" />

            {/* Level 2: Ketua */}
            <div className="mb-10">
              <button
                onClick={() => handleSelectNode("ketua")}
                className={`px-6 py-3.5 rounded-2xl border text-sm font-extrabold tracking-wide uppercase transition-all flex items-center space-x-2 cursor-pointer ${
                  selectedKey === "ketua"
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
                onClick={() => handleSelectNode("sekretaris")}
                className={`w-full py-3 px-3 rounded-xl border text-xs font-extrabold tracking-wide uppercase transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  selectedKey === "sekretaris"
                    ? "bg-slate-100 text-slate-900 border-primary shadow-sm scale-105"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <ClipboardList className="h-3.5 w-3.5" />
                <span>Sekretaris</span>
              </button>

              <button
                onClick={() => handleSelectNode("bendahara")}
                className={`w-full py-3 px-3 rounded-xl border text-xs font-extrabold tracking-wide uppercase transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  selectedKey === "bendahara"
                    ? "bg-slate-100 text-slate-900 border-primary shadow-sm scale-105"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Wallet className="h-3.5 w-3.5" />
                <span>Bendahara</span>
              </button>
            </div>

            {/* Vertical Line Connector */}
            <div className="w-0.5 h-6 bg-slate-300 -mt-10 mb-4" />

            {/* Level 4: Divisi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
              <button
                onClick={() => handleSelectNode("div_edukasi")}
                className={`py-3 px-4 rounded-xl border text-xs font-extrabold tracking-wide uppercase transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  selectedKey === "div_edukasi"
                    ? "bg-amber-500 text-white border-amber-500 shadow-md scale-105"
                    : "bg-amber-50/50 text-amber-700 border-amber-200 hover:bg-amber-100/50"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Divisi Edukasi & Kuis</span>
              </button>

              <button
                onClick={() => handleSelectNode("div_konseling")}
                className={`py-3 px-4 rounded-xl border text-xs font-extrabold tracking-wide uppercase transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  selectedKey === "div_konseling"
                    ? "bg-amber-500 text-white border-amber-500 shadow-md scale-105"
                    : "bg-amber-50/50 text-amber-700 border-amber-200 hover:bg-amber-100/50"
                }`}
              >
                <HeartHandshake className="h-3.5 w-3.5" />
                <span>Divisi Pendampingan & SOS</span>
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
                  <h3 className="text-xl font-bold text-neutral-dark mt-2">
                    {selectedRole.name}
                  </h3>
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
                <p className="text-xs font-semibold">
                  Silakan klik bagan disamping untuk memunculkan deskripsi
                  pengurus.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
