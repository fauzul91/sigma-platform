"use client";

import React from "react";
import {
  Eye,
  Target,
  GraduationCap,
  Users,
  BookOpen,
  HeartHandshake,
  School,
  CheckCircle2,
  Sparkles,
  MapPin,
  ShieldCheck,
  UserCheck,
  Building2,
  Lock,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

export default function TentangView() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* 1. Page Header */}
      <PageHeader
        title="TENTANG KAMI"
        description="Mengenal Program SIGMA — gerakan kolaboratif mahasiswa Promahadesa Universitas Jember bersama SMPN 4 Sumberjambe untuk edukasi kesehatan reproduksi dan pencegahan perkawinan anak di Desa Gunungmalang."
        badge="PROFIL PROGRAM"
        type="tentang"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-8 md:py-12 space-y-12 sm:space-y-14">
        {/* 2. Hero Kemitraan Nyata (Warm & Clean) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 md:p-10 shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-primary tracking-wide uppercase">
              Kemitraan Promahadesa UNEJ × SMPN 4 Sumberjambe
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              Kolaborasi Nyata untuk Remaja Sehat, Berdaya, dan Merdeka Meraih Cita-Cita
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Program <strong>SIGMA (Sinergi Edukasi dan Pencegahan Perkawinan Anak)</strong> lahir dari inisiatif tim <strong>Program Mahasiswa Berdesa (Promahadesa) Universitas Jember</strong> yang berkolaborasi erat dengan <strong>SMP Negeri 4 Sumberjambe</strong>, tenaga kesehatan Puskesmas Sumberjambe, dan Pemerintah Desa Gunungmalang. Melalui pendekatan ramah sebaya dan literasi digital, kami menghadirkan ruang aman bagi remaja untuk belajar kesehatan reproduksi, memperoleh pendampingan konseling tanpa stigma, dan terhindar dari risiko perkawinan usia dini.
          </p>

          {/* Key Collaboration Points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-primary shrink-0">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Inisiator Program</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">Promahadesa Univ. Jember</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-teal-100 text-teal-800 shrink-0">
                <School className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sekolah Mitra</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">SMPN 4 Sumberjambe</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Wilayah Pengabdian</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">Desa Gunungmalang, Jember</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Visi & Misi Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visi */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-11 w-11 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center border border-emerald-100">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">Visi Utama</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Mewujudkan generasi remaja di Desa Gunungmalang yang cerdas literasi kesehatan reproduksi, memiliki ketahanan mental, serta berdaya untuk menyelesaikan pendidikan dan meraih masa depan tanpa bayang-bayang perkawinan usia anak.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs font-bold text-slate-500 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Pendidikan Tuntas 12 Tahun & Bebas Stigma</span>
            </div>
          </div>

          {/* Misi */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="h-11 w-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">Misi Program</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Edukasi Terbuka:</strong> Menyediakan repositori ilmiah (Repropedia) yang mudah diakses dan dipahami remaja.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Konseling Sebaya:</strong> Membina Kader GARUDA sebagai pendengar ramah dan tepercaya tanpa penghakiman.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Rujukan Resmi:</strong> Memfasilitasi koordinasi cepat antara siswa, Guru BK, dan Unit Medis Puskesmas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Advokasi Komunitas:</strong> Meningkatkan kesadaran wali murid dan masyarakat tentang bahaya perkawinan anak.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. Tiga Pilar Solutif SIGMA */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Tiga Pilar Solutif SIGMA
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Pendekatan terpadu dari edukasi, ruang bercerita, hingga penanganan rujukan formal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pilar 1 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-primary flex items-center justify-center border border-emerald-100">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">1. Literasi Repropedia</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Modul digital, infografis, video, dan mini kuis interaktif seputar pubertas, batasan fisik, serta aturan hukum perlindungan anak.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-primary">
                Edukasi Ilmiah & Santai
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">2. Kader Sebaya GARUDA</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Teman sebaya terlatih di SMPN 4 Sumberjambe yang siap mendengar keluhan, menjaga privasi, dan memberikan pertolongan pertama emosional.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-amber-700">
                Ruang Curhat 100% Rahasia
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">3. Rujukan Terintegrasi</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Jalur penanganan resmi dan aman menuju Guru BK sekolah serta tenaga medis Puskesmas Sumberjambe jika memerlukan tindakan lanjutan.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-teal-700">
                Perlindungan Medis & Hak Siswa
              </div>
            </div>
          </div>
        </div>

        {/* 5. Fokus Sasaran Komunitas (Clean White & Slate) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 md:p-10 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 tracking-wide uppercase">
              Ruang Lingkup Sasaran
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Penerima Manfaat Program
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Membangun perlindungan menyeluruh dari tingkat siswa, lingkungan keluarga, hingga sekolah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-100 text-primary flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Siswa Remaja</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Memperoleh pemahaman pubertas yang benar, kesadaran menjaga batas tubuh (consent), serta akses konseling sebaya yang nyaman tanpa rasa malu.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="h-8 w-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                <UserCheck className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Orang Tua & Wali Murid</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Mendapatkan pemahaman pola asuh suportif, kesadaran regulasi batas usia nikah (UU No. 16/2019), serta pencegahan risiko stunting pada anak.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="h-8 w-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <Building2 className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Guru BK & Komunitas Desa</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Penguatan sistem deteksi dini anak rentan putus sekolah, mediasi konseling resmi, dan koordinasi berkelanjutan bersama perangkat desa.
              </p>
            </div>
          </div>
        </div>

        {/* 6. Nilai Utama (4 Core Values) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
            <HeartHandshake className="h-5 w-5 text-primary" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Empati Tanpa Stigma</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-snug">
              Mendengarkan keluhan tanpa prasangka dan tanpa menghakimi.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
            <Lock className="h-5 w-5 text-teal-600" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Privasi Terjaga</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-snug">
              Kerahasiaan identitas dan sesi cerita siswa dijamin penuh.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
            <Users className="h-5 w-5 text-amber-600" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Kolaboratif</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-snug">
              Menyatukan peran mahasiswa, sekolah, faskes, dan desa.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Berbasis Sains</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-snug">
              Materi sesuai standar medis resmi dan hukum perlindungan anak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
