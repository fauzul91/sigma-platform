"use client";

import React from "react";
import {
  BookOpen,
  Play,
  FileText,
  Gamepad2,
  Sparkles,
  Palette,
  Calendar,
  Camera,
  HeartHandshake,
  ShieldCheck,
  HelpCircle,
  Mail,
  MapPin,
  Users,
  Target,
  CheckCircle2,
  Trophy,
  MessageCircle,
} from "lucide-react";

export type PageHeaderType =
  | "repropedia"
  | "edukasi"
  | "kuis"
  | "karya-kader"
  | "kegiatan"
  | "konseling"
  | "faq"
  | "kontak"
  | "tentang";

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
  type: PageHeaderType;
}

export default function PageHeader({
  title,
  description,
  badge = "SIGMA PLATFORM",
  type,
}: PageHeaderProps) {
  // Render tailored minimalist illustration based on menu type
  const renderIllustration = () => {
    switch (type) {
      case "repropedia":
        return (
          <div className="relative w-72 sm:w-80 h-44 sm:h-48 select-none">
            {/* Left Tilted Card */}
            <div className="absolute left-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform -rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Hak Anak</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-3/4 bg-slate-200 rounded-full" />
                <div className="h-2 w-full bg-slate-100 rounded-full" />
                <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-emerald-600">Bab 02</span>
            </div>

            {/* Right Tilted Card */}
            <div className="absolute right-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pencegahan</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-4/5 bg-slate-200 rounded-full" />
                <div className="h-2 w-full bg-slate-100 rounded-full" />
                <div className="h-2 w-2/3 bg-slate-100 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-teal-600">Bab 05</span>
            </div>

            {/* Center Main Card */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-56 sm:w-60 h-40 bg-white rounded-2xl shadow-2xl border border-white/90 p-3.5 flex flex-col justify-between z-10">
              <div className="bg-emerald-600 -mx-3.5 -mt-3.5 px-3.5 py-2 rounded-t-2xl flex items-center justify-between text-white">
                <div className="flex items-center space-x-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-black uppercase tracking-wider">REPROPEDIA</span>
                </div>
                <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">6 Modul</span>
              </div>
              <div className="space-y-2 my-auto">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Kesehatan Reproduksi</span>
                </div>
                <div className="space-y-1 pl-5">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                  <div className="h-1.5 w-5/6 bg-slate-100 rounded-full" />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span>Edisi Panduan Resmi</span>
                <span className="text-emerald-700 font-bold">Terverifikasi</span>
              </div>
            </div>
          </div>
        );

      case "edukasi":
        return (
          <div className="relative w-72 sm:w-80 h-44 sm:h-48 select-none">
            {/* Left Tilted Card */}
            <div className="absolute left-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform -rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <FileText className="h-3 w-3 text-emerald-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Artikel Medis</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-3/4 bg-slate-200 rounded-full" />
                <div className="h-2 w-full bg-slate-100 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-emerald-600">3 Menit Baca</span>
            </div>

            {/* Right Tilted Card */}
            <div className="absolute right-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <Play className="h-3 w-3 text-red-500 fill-current" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Video Reels</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-4/5 bg-slate-200 rounded-full" />
                <div className="h-2 w-full bg-slate-100 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-red-500">Kader GARUDA</span>
            </div>

            {/* Center Main Card */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-56 sm:w-60 h-40 bg-white rounded-2xl shadow-2xl border border-white/90 p-3.5 flex flex-col justify-between z-10">
              <div className="bg-emerald-600 -mx-3.5 -mt-3.5 px-3.5 py-2 rounded-t-2xl flex items-center justify-between text-white">
                <div className="flex items-center space-x-1.5">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span className="text-[11px] font-black uppercase tracking-wider">ARTIKEL &amp; VIDEO</span>
                </div>
                <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">Media</span>
              </div>
              <div className="space-y-2 my-auto">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Edukasi Remaja</span>
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[9px] font-bold">Video 04:15</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                <div className="h-1.5 w-4/5 bg-slate-100 rounded-full" />
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span>Konten Terverifikasi</span>
                <span className="text-emerald-700 font-bold">Interaktif</span>
              </div>
            </div>
          </div>
        );

      case "kuis":
        return (
          <div className="relative w-72 sm:w-80 h-44 sm:h-48 select-none">
            {/* Left Card */}
            <div className="absolute left-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform -rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <Trophy className="h-3 w-3 text-amber-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lencana</span>
              </div>
              <div className="text-center py-1">
                <span className="text-lg font-black text-amber-500">45 XP</span>
                <p className="text-[9px] text-slate-400">Garuda Advocate</p>
              </div>
              <span className="text-[9px] font-bold text-emerald-600">Level 2</span>
            </div>

            {/* Right Card */}
            <div className="absolute right-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Skor Kuis</span>
              </div>
              <div className="text-center py-1">
                <span className="text-lg font-black text-emerald-600">100%</span>
                <p className="text-[9px] text-slate-400">Jawaban Tepat</p>
              </div>
              <span className="text-[9px] font-bold text-emerald-600">Sempurna</span>
            </div>

            {/* Center Main Card */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-56 sm:w-60 h-40 bg-white rounded-2xl shadow-2xl border border-white/90 p-3.5 flex flex-col justify-between z-10">
              <div className="bg-emerald-600 -mx-3.5 -mt-3.5 px-3.5 py-2 rounded-t-2xl flex items-center justify-between text-white">
                <div className="flex items-center space-x-1.5">
                  <Gamepad2 className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-black uppercase tracking-wider">KUIS KESEHATAN</span>
                </div>
                <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded">+XP Seru</span>
              </div>
              <div className="space-y-1.5 my-auto">
                <span className="text-xs font-extrabold text-slate-800 block">Tantangan Harian</span>
                <div className="flex items-center space-x-2 text-[11px] text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>4 Pilihan Bergambar</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span>Klaim Lencana Garuda</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span>3-5 Pertanyaan</span>
                <span className="text-amber-600 font-bold">Mulai Kuis</span>
              </div>
            </div>
          </div>
        );

      case "karya-kader":
        return (
          <div className="relative w-72 sm:w-80 h-44 sm:h-48 select-none">
            {/* Left Card */}
            <div className="absolute left-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform -rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <Palette className="h-3 w-3 text-purple-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Poster Digital</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-3/4 bg-slate-200 rounded-full" />
                <div className="h-2 w-full bg-slate-100 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-purple-600">Kader Siswa</span>
            </div>

            {/* Right Card */}
            <div className="absolute right-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <Sparkles className="h-3 w-3 text-amber-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Infografis</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-4/5 bg-slate-200 rounded-full" />
                <div className="h-2 w-full bg-slate-100 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-amber-600">Visual Menarik</span>
            </div>

            {/* Center Main Card */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-56 sm:w-60 h-40 bg-white rounded-2xl shadow-2xl border border-white/90 p-3.5 flex flex-col justify-between z-10">
              <div className="bg-emerald-600 -mx-3.5 -mt-3.5 px-3.5 py-2 rounded-t-2xl flex items-center justify-between text-white">
                <div className="flex items-center space-x-1.5">
                  <Palette className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-black uppercase tracking-wider">KARYA SISWA</span>
                </div>
                <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">Galeri</span>
              </div>
              <div className="space-y-2 my-auto">
                <span className="text-xs font-extrabold text-slate-800 block">Kreativitas Generasi Muda</span>
                <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                <div className="h-1.5 w-3/4 bg-slate-100 rounded-full" />
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span>SMPN 4 Sumberjambe</span>
                <span className="text-emerald-700 font-bold">Karya Orisinal</span>
              </div>
            </div>
          </div>
        );

      case "kegiatan":
        return (
          <div className="relative w-72 sm:w-80 h-44 sm:h-48 select-none">
            {/* Left Card */}
            <div className="absolute left-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform -rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <Calendar className="h-3 w-3 text-blue-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Jadwal Acara</span>
              </div>
              <div className="text-center py-1">
                <span className="text-sm font-black text-slate-800">Workshop</span>
                <p className="text-[9px] text-slate-400">Kader Sebaya</p>
              </div>
              <span className="text-[9px] font-bold text-blue-600">Terselenggara</span>
            </div>

            {/* Right Card */}
            <div className="absolute right-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <Camera className="h-3 w-3 text-emerald-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dokumentasi</span>
              </div>
              <div className="text-center py-1">
                <span className="text-sm font-black text-slate-800">Sosialisasi</span>
                <p className="text-[9px] text-slate-400">Desa Gunungmalang</p>
              </div>
              <span className="text-[9px] font-bold text-emerald-600">Foto &amp; Catatan</span>
            </div>

            {/* Center Main Card */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-56 sm:w-60 h-40 bg-white rounded-2xl shadow-2xl border border-white/90 p-3.5 flex flex-col justify-between z-10">
              <div className="bg-emerald-600 -mx-3.5 -mt-3.5 px-3.5 py-2 rounded-t-2xl flex items-center justify-between text-white">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-black uppercase tracking-wider">KEGIATAN &amp; EVENT</span>
                </div>
                <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">Aksi Nyata</span>
              </div>
              <div className="space-y-2 my-auto">
                <span className="text-xs font-extrabold text-slate-800 block">Jejak Edukasi di Lapangan</span>
                <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                <div className="h-1.5 w-4/5 bg-slate-100 rounded-full" />
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span>Program Rutin</span>
                <span className="text-emerald-700 font-bold">Kader GARUDA</span>
              </div>
            </div>
          </div>
        );

      case "konseling":
        return (
          <div className="relative w-72 sm:w-80 h-44 sm:h-48 select-none">
            {/* Left Card */}
            <div className="absolute left-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform -rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Kerahasiaan</span>
              </div>
              <div className="text-center py-1">
                <span className="text-xs font-black text-slate-800">100% Aman</span>
                <p className="text-[9px] text-slate-400">Tanpa Menghakimi</p>
              </div>
              <span className="text-[9px] font-bold text-emerald-600">Konselor Sebaya</span>
            </div>

            {/* Right Card */}
            <div className="absolute right-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <HeartHandshake className="h-3 w-3 text-rose-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rujukan Medis</span>
              </div>
              <div className="text-center py-1">
                <span className="text-xs font-black text-slate-800">Guru BK &amp; PKM</span>
                <p className="text-[9px] text-slate-400">Fasilitas Resmi</p>
              </div>
              <span className="text-[9px] font-bold text-rose-500">Didampingi</span>
            </div>

            {/* Center Main Card */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-56 sm:w-60 h-40 bg-white rounded-2xl shadow-2xl border border-white/90 p-3.5 flex flex-col justify-between z-10">
              <div className="bg-emerald-600 -mx-3.5 -mt-3.5 px-3.5 py-2 rounded-t-2xl flex items-center justify-between text-white">
                <div className="flex items-center space-x-1.5">
                  <HeartHandshake className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-black uppercase tracking-wider">RUJUKAN KONSELING</span>
                </div>
                <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">Ruang Aman</span>
              </div>
              <div className="space-y-1.5 my-auto">
                <span className="text-xs font-extrabold text-slate-800 block">Curhat &amp; Bantuan Rahasia</span>
                <div className="p-1.5 bg-slate-50 rounded-lg text-[10px] text-slate-600 font-medium">
                  &ldquo;Kamu tidak sendiri, kami siap mendengarkan.&rdquo;
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span>Gratis &amp; Aman</span>
                <span className="text-emerald-700 font-bold">Hubungi Kami</span>
              </div>
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="relative w-72 sm:w-80 h-44 sm:h-48 select-none">
            {/* Left Card */}
            <div className="absolute left-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform -rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <HelpCircle className="h-3 w-3 text-amber-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pubertas</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-3/4 bg-slate-200 rounded-full" />
                <div className="h-2 w-full bg-slate-100 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-amber-500">Tanya Jawab</span>
            </div>

            {/* Right Card */}
            <div className="absolute right-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Regulasi</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-4/5 bg-slate-200 rounded-full" />
                <div className="h-2 w-full bg-slate-100 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-emerald-500">UU Pernikahan</span>
            </div>

            {/* Center Main Card */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-56 sm:w-60 h-40 bg-white rounded-2xl shadow-2xl border border-white/90 p-3.5 flex flex-col justify-between z-10">
              <div className="bg-emerald-600 -mx-3.5 -mt-3.5 px-3.5 py-2 rounded-t-2xl flex items-center justify-between text-white">
                <div className="flex items-center space-x-1.5">
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-black uppercase tracking-wider">FAQ UMUM</span>
                </div>
                <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">Tanya Jawab</span>
              </div>
              <div className="space-y-2 my-auto">
                <span className="text-xs font-extrabold text-slate-800 block">Jawaban Terpercaya</span>
                <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                <div className="h-1.5 w-5/6 bg-slate-100 rounded-full" />
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span>Pertanyaan Populer</span>
                <span className="text-emerald-700 font-bold">Solusi Cepat</span>
              </div>
            </div>
          </div>
        );

      case "kontak":
        return (
          <div className="relative w-72 sm:w-80 h-44 sm:h-48 select-none">
            {/* Left Card */}
            <div className="absolute left-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform -rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <MessageCircle className="h-3 w-3 text-emerald-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">WhatsApp</span>
              </div>
              <div className="text-center py-1">
                <span className="text-xs font-black text-slate-800">+62 812-3456</span>
                <p className="text-[9px] text-slate-400">Layanan Aktif</p>
              </div>
              <span className="text-[9px] font-bold text-emerald-600">Chat Langsung</span>
            </div>

            {/* Right Card */}
            <div className="absolute right-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <MapPin className="h-3 w-3 text-red-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lokasi</span>
              </div>
              <div className="text-center py-1">
                <span className="text-xs font-black text-slate-800">Gunungmalang</span>
                <p className="text-[9px] text-slate-400">SMPN 4 Sumberjambe</p>
              </div>
              <span className="text-[9px] font-bold text-red-500">Sekretariat</span>
            </div>

            {/* Center Main Card */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-56 sm:w-60 h-40 bg-white rounded-2xl shadow-2xl border border-white/90 p-3.5 flex flex-col justify-between z-10">
              <div className="bg-emerald-600 -mx-3.5 -mt-3.5 px-3.5 py-2 rounded-t-2xl flex items-center justify-between text-white">
                <div className="flex items-center space-x-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-black uppercase tracking-wider">HUBUNGI KAMI</span>
                </div>
                <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">Respon Cepat</span>
              </div>
              <div className="space-y-1.5 my-auto">
                <span className="text-xs font-extrabold text-slate-800 block">Saran, Undangan &amp; Konsultasi</span>
                <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                <div className="h-1.5 w-2/3 bg-slate-100 rounded-full" />
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span>Kader GARUDA</span>
                <span className="text-emerald-700 font-bold">Kirim Pesan</span>
              </div>
            </div>
          </div>
        );

      case "tentang":
        return (
          <div className="relative w-72 sm:w-80 h-44 sm:h-48 select-none">
            {/* Left Card */}
            <div className="absolute left-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform -rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <Target className="h-3 w-3 text-teal-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Visi Program</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-3/4 bg-slate-200 rounded-full" />
                <div className="h-2 w-full bg-slate-100 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-teal-600">Generasi Bebas Nikah Dini</span>
            </div>

            {/* Right Card */}
            <div className="absolute right-2 bottom-2 w-44 h-36 bg-white/90 rounded-2xl shadow-lg transform rotate-8 border border-white/60 p-3 hidden sm:flex flex-col justify-between">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-slate-100">
                <Users className="h-3 w-3 text-emerald-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Kader GARUDA</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-4/5 bg-slate-200 rounded-full" />
                <div className="h-2 w-full bg-slate-100 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-emerald-600">15 Kader Aktif</span>
            </div>

            {/* Center Main Card */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-56 sm:w-60 h-40 bg-white rounded-2xl shadow-2xl border border-white/90 p-3.5 flex flex-col justify-between z-10">
              <div className="bg-emerald-600 -mx-3.5 -mt-3.5 px-3.5 py-2 rounded-t-2xl flex items-center justify-between text-white">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-black uppercase tracking-wider">TENTANG KAMI</span>
                </div>
                <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">Profil</span>
              </div>
              <div className="space-y-2 my-auto">
                <span className="text-xs font-extrabold text-slate-800 block">Sinergi Pemberdayaan Remaja</span>
                <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                <div className="h-1.5 w-3/4 bg-slate-100 rounded-full" />
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span>Promahadesa</span>
                <span className="text-emerald-700 font-bold">Desa Gunungmalang</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-primary text-white relative overflow-hidden -mt-[68px] md:-mt-[76px] pt-[108px] sm:pt-[116px] md:pt-[132px] pb-10 sm:pb-12 md:pb-14 shadow-xs border-b border-emerald-700/40">
      {/* 1. Geometric Interwoven Pattern Overlay (matching reference media_1788795321074.png) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="page-header-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            {/* Interlocking loop track / ribbon pattern */}
            <path
              d="M10 10 L50 10 A10 10 0 0 1 60 20 L60 40 A10 10 0 0 1 50 50 L10 50 A10 10 0 0 1 0 40 L0 20 A10 10 0 0 1 10 10 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            <path
              d="M20 20 L40 20 A5 5 0 0 1 45 25 L45 35 A5 5 0 0 1 40 40 L20 40 A5 5 0 0 1 15 35 L15 25 A5 5 0 0 1 20 20 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <line x1="0" y1="30" x2="60" y2="30" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="30" y1="0" x2="30" y2="60" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#page-header-pattern)" />
      </svg>

      {/* Subtle radial glow accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl" />

      {/* 2. Content Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-2xl space-y-2.5 text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-xs">
            {title}
          </h1>

          <p className="text-emerald-100/90 text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-xl">
            {description}
          </p>
        </div>

        {/* Right Column: Minimalist Tailored Cards Illustration */}
        <div className="hidden md:flex shrink-0 items-center justify-end">
          {renderIllustration()}
        </div>
      </div>
    </section>
  );
}
