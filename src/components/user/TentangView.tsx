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
  School,
  UserCheck,
  Heart,
  CheckCircle2,
  Sparkles,
  Award,
} from "lucide-react";
import { userService } from "@/services/user/userService";
import { OrgMember } from "@/types";
import PageHeader from "@/components/shared/PageHeader";

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
    <div className="bg-slate-50 min-h-screen font-sans">
      <PageHeader
        title="TENTANG KAMI"
        description="Mengenal visi, misi, struktur organisasi Kader GARUDA, dan komitmen SIGMA dalam mendampingi remaja serta mencegah pernikahan usia anak."
        badge="PROFIL PROGRAM"
        type="tentang"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 md:py-16 space-y-16">
        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Eye className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-black text-neutral-dark">Visi Utama</h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Mewujudkan generasi muda yang cerdas literasi kesehatan reproduksi, terlindungi dari segala bentuk kekerasan seksual, serta bebas dari pernikahan usia anak demi masa depan Indonesia yang gemilang.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-black text-neutral-dark">Misi Program</h2>
            <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed font-medium">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Menyediakan platform edukasi digital (Repropedia) yang faktual dan mudah diakses remaja.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Membangun jaringan pendampingan sebaya (Kader GARUDA) yang ramah dan tepercaya.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Memfasilitasi sistem rujukan cepat dari siswa ke bimbingan konseling (BK) dan Puskesmas.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Melakukan edukasi intensif kepada remaja dan wali murid untuk menekan angka perkawinan anak.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION: Sekolah Sasaran Utama & Target Audience */}
        <div className="bg-[#0c2214] text-white p-8 md:p-10 rounded-3xl shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-900/60 pb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                  Fokus Sasaran Program
                </span>
                <span className="text-xs text-emerald-200/80 font-bold">Wilayah Gunungmalang</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
                SMP Negeri 4 Sumberjambe
              </h2>
              <p className="text-xs md:text-sm text-emerald-200/80 font-medium mt-1">
                Sekolah mitra utama pelaksanaan gerakan literasi kesehatan reproduksi & pencegahan perkawinan anak.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 text-emerald-400">
                <School className="h-7 w-7" />
              </div>
            </div>
          </div>

          {/* Target Audience Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Target 1: Siswa Remaja */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition-all">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-white">Siswa-Siswi Remaja</h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed font-medium">
                Mendapatkan pengetahuan pubertas yang sehat, ruang ekspresi karya poster/video, serta akses layanan konseling sebaya yang aman tanpa stigma.
              </p>
            </div>

            {/* Target 2: Wali Murid */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition-all">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-white">Orang Tua & Wali Murid</h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed font-medium">
                Pemahaman pola pengasuhan ramah remaja, wawasan bahaya medis kehamilan usia dini, serta sinergi pengawasan tumbuh kembang anak di rumah.
              </p>
            </div>

            {/* Target 3: Guru & Komunitas */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition-all">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-white">Guru BK & Komunitas</h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed font-medium">
                Penguatan sistem bimbingan konseling sekolah, mitigasi dini risiko putus sekolah, dan penciptaan lingkungan belajar yang ramah anak.
              </p>
            </div>

          </div>
        </div>

        {/* SECTION: Manfaat Utama Program SIGMA */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark">
              Manfaat Utama Program SIGMA
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium">
              Dampak positif keberlanjutan program bagi kesehatan, pendidikan, dan masa depan remaja.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 w-fit">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold text-neutral-dark">Pencegahan Pernikahan Anak</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Edukasi batas usia hukum (UU No. 16/2019) dan bahaya medis guna menekan angka pernikahan dini & putus sekolah.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 w-fit">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold text-neutral-dark">Literasi Kesehatan Faktual</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Modul Repropedia & media edukasi yang disusun berdasarkan standar ilmiah medis dan mudah dipahami remaja.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600 border border-violet-100 w-fit">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold text-neutral-dark">Pendampingan Peer Counseling</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Saluran konseling sebaya anonim bagi siswa untuk berdiskusi masalah kesehatan mental dan pubertas secara aman.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 w-fit">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold text-neutral-dark">Wadah Ekspresi Karya Siswa</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Ruang apresiasi karya poster, infografis, dan video kampanye orisinal hasil kreasi siswa kader di sekolah.
              </p>
            </div>

          </div>
        </div>

        {/* Interactive Org Chart Section */}
        <div className="space-y-8 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark">
              Bagan Organisasi Kader GARUDA
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Klik pada posisi pengurus untuk melihat tugas dan fungsi lengkap.
            </p>
          </div>

          {/* Organizational Tree View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Chart Nodes */}
            <div className="lg:col-span-8 flex flex-col items-center bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
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
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs min-h-[250px] flex flex-col justify-between">
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
                    Silakan klik bagan disamping untuk memunculkan deskripsi pengurus.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
