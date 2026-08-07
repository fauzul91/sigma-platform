"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  MessageCircle, 
  Award, 
  ArrowRight, 
  Users, 
  ChevronRight, 
  Play, 
  Sparkles,
  HeartHandshake,
  Activity
} from "lucide-react";
import { userService } from "@/services/user/userService";
import { RepropediaItem, MediaItem } from "@/types";
import { CardSkeleton } from "@/components/shared/Skeletons";

export default function HomeView() {
  const [modulesList, setModulesList] = useState<RepropediaItem[]>([]);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [activeCounselorCount, setActiveCounselorCount] = useState(12);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

  // Simple counter animation trigger
  const [counts, setCounts] = useState({ modules: 0, articles: 0, users: 0 });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [splashTransition, setSplashTransition] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsDataLoading(true);
    Promise.all([
      userService.getRepropediaModules(),
      userService.getMediaItems(),
      userService.getGlobalStats()
    ]).then(([mods, meds, stats]) => {
      setModulesList(mods);
      setMediaList(meds);
      setActiveCounselorCount(stats.activeCounselors);
      setIsDataLoading(false);

      const duration = 1500;
      const steps = 30;
      const stepTime = duration / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        setCounts({
          modules: Math.min(Math.floor((stats.totalModules / steps) * step), stats.totalModules),
          articles: Math.min(Math.floor((stats.totalArticles / steps) * step), stats.totalArticles),
          users: Math.min(Math.floor((stats.totalUsersHelped / steps) * step), stats.totalUsersHelped),
        });

        if (step >= steps) {
          clearInterval(timer);
        }
      }, stepTime);
    });
  }, []);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hasSeenSplash") === "true";
    if (hasSeen) {
      setShowSplash(false);
    } else {
      // Progress ticker interval
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1; // tick 1% at a time
        });
      }, 18); // 18ms * 100 = 1800ms (1.8s)

      // Start sliding up after 2.2 seconds
      const slideTimer = setTimeout(() => {
        setSplashTransition(true);
      }, 2200);
      
      // Unmount splash completely after 2.8 seconds
      const unmountTimer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 2800);
      
      return () => {
        clearInterval(interval);
        clearTimeout(slideTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, []);

  const faqData = [
    {
      question: "Apa itu kesehatan reproduksi remaja dan mengapa itu penting?",
      answer: "Kesehatan reproduksi remaja adalah kondisi sehat secara fisik, mental, dan sosial yang utuh pada semua hal yang berkaitan dengan sistem, fungsi, dan proses reproduksi pada remaja. Hal ini penting agar remaja memiliki informasi yang benar sehingga terhindar dari perilaku berisiko seperti kehamilan tidak diinginkan, infeksi menular seksual (IMS), dan kekerasan seksual."
    },
    {
      question: "Bagaimana cara efektif mencegah pernikahan usia anak?",
      answer: "Pencegahan pernikahan anak dapat dilakukan melalui beberapa cara: (1) Meningkatkan akses pendidikan bagi remaja hingga minimal jenjang SMA/sederajat, (2) Memberikan edukasi kesehatan reproduksi dan seksual yang komprehensif, (3) Memberdayakan ekonomi keluarga, serta (4) Penegakan hukum yang tegas sesuai UU No. 16 Tahun 2019 yang menetapkan batas minimal usia menikah adalah 19 tahun."
    },
    {
      question: "Apa dampak pernikahan anak bagi kesehatan fisik remaja perempuan?",
      answer: "Panggul remaja perempuan di bawah usia 19 tahun umumnya belum berkembang sempurna. Hamil di usia sangat muda meningkatkan risiko komplikasi persalinan macet, preeklampsia, perdarahan hebat, bayi lahir prematur, stunting, hingga kematian ibu dan bayi baru lahir."
    },
    {
      question: "Kemana saya harus melapor jika melihat atau mengalami pemaksaan pernikahan anak?",
      answer: "Anda dapat segera menekan tombol SOS di pojok kanan bawah platform SIGMA untuk menghubungi Kader GARUDA secara rahasia. Selain itu, Anda bisa melapor ke guru Bimbingan Konseling (BK) di sekolah, pihak Puskesmas terdekat, unit perlindungan anak terdekat, atau menghubungi layanan darurat SAPA 129."
    },
    {
      question: "Apakah layanan konseling di Program SIGMA rahasia dan berbayar?",
      answer: "Layanan konseling sebaya melalui Kader GARUDA maupun rujukan ke Guru BK dan Puskesmas bersifat 100% gratis dan rahasia. Identitas serta cerita permasalahan Anda tidak akan disebarluaskan ke pihak luar tanpa izin dari Anda."
    }
  ];

  const getLoadingMessage = (p: number) => {
    if (p < 25) return "Menginisialisasi modul repropedia...";
    if (p < 55) return "Memuat direktori kader GARUDA & Guru BK...";
    if (p < 85) return "Sinkronisasi statistik perkawinan anak...";
    return "Mempersiapkan antarmuka interaktif...";
  };

  return (
    <div className="relative overflow-hidden bg-slate-50 min-h-screen">
      
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="absolute top-1/3 right-10 -z-10 h-[300px] w-[300px] rounded-full bg-amber-100/30 blur-3xl" />

      {/* 1. HERO SECTION */}
      <section className="relative py-16 md:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200/50 px-3.5 py-1.5 rounded-full text-primary text-xs font-bold uppercase tracking-wider shadow-sm animate-pulse">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Bersama Kader GARUDA Indonesia</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-dark leading-tight tracking-tight">
              Tumbuh Sehat, <br />
              <span className="text-primary bg-clip-text">Melangkah Aman</span> <br className="hidden sm:inline" />
              Bersama SIGMA
            </h1>

            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Platform interaktif edukasi kesehatan reproduksi remaja, pencegahan perkawinan anak, dan rujukan konseling aman, rahasia, serta ramah bagi generasi muda.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/repropedia"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-emerald-600/20 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Mulai Belajar (Repropedia)</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                href="/konseling"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-white border border-slate-200 text-neutral-dark font-bold hover:bg-slate-50 shadow-sm transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <HeartHandshake className="h-5 w-5 text-emerald-600" />
                <span>Butuh Konseling?</span>
              </Link>
            </div>
          </div>

          {/* Hero Illustration / Graphical Box */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md h-[340px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl glass-card border border-white p-6 flex flex-col justify-between">
              
              {/* Decorative design within the card */}
              <div className="absolute top-0 right-0 bg-primary/10 h-32 w-32 rounded-bl-full -z-10" />
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                
                <div className="p-4 rounded-2xl bg-white/80 border border-slate-100 shadow-sm">
                  <h3 className="text-sm font-bold text-neutral-dark flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                    <span>Layanan Pengaduan Aktif</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    Jika kamu menemui kasus pemaksaan pernikahan usia anak atau butuh bantuan darurat kekerasan seksual, klik tombol merah SOS di pojok kanan bawah.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 border border-slate-100 shadow-sm">
                  <h3 className="text-sm font-bold text-neutral-dark flex items-center space-x-2">
                    <span>💡 Tips Sehat Hari Ini</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    Penting menjaga kebersihan organ reproduksi selama masa pubertas untuk mencegah infeksi dan menjaga rasa percaya diri.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-emerald-600 rounded-2xl text-white">
                <div className="flex items-center space-x-2.5">
                  <Users className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-emerald-100 uppercase tracking-wider font-bold">Kader Aktif</p>
                    <p className="text-xs font-bold">12 Teman Sebaya Siap Dengar</p>
                  </div>
                </div>
                <Link href="/konseling" className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white">
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Mitra & Partner Kerja Sama Marquee Section */}
      <section className="bg-emerald-600 py-10 overflow-hidden relative border-y border-emerald-700/30">
        {/* Decorative background vectors */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-white font-extrabold text-lg leading-tight">Mitra & Partner Kerja Sama</h3>
            <p className="text-xs text-emerald-100/80 mt-1 font-semibold">SIGMA didukung oleh institusi pendidikan dan kesehatan terkemuka.</p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-800 bg-white/95 px-3 py-1 rounded-full border border-emerald-100 shrink-0">
            Kolaborasi Terpadu
          </span>
        </div>
        
        {/* Infinite Horizontal Marquee */}
        <div className="relative w-full flex items-center overflow-hidden py-3">
          <div className="animate-marquee flex items-center space-x-6 whitespace-nowrap">
            {/* Set 1 */}
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_unej.png" alt="Universitas Jember Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_kemendikbud.png" alt="Kemendikbud Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_kemendikti.png" alt="Kemendikti Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_lppm.jpg" alt="LPPM Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_blu.png" alt="BLU Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>

            {/* Set 2 */}
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_unej.png" alt="Universitas Jember Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_kemendikbud.png" alt="Kemendikbud Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_kemendikti.png" alt="Kemendikti Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_lppm.jpg" alt="LPPM Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_blu.png" alt="BLU Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>

            {/* Set 3 */}
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_unej.png" alt="Universitas Jember Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_kemendikbud.png" alt="Kemendikbud Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_kemendikti.png" alt="Kemendikti Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_lppm.jpg" alt="LPPM Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="inline-flex h-20 md:h-24 px-8 md:px-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer duration-200 shrink-0">
              <img src="/assets/logo_blu.png" alt="BLU Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC STATISTICS DASHBOARD */}
      <section className="bg-white border-y border-slate-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-xl mx-auto mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark">Dampak Kontribusi Program SIGMA</h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">Data riil edukasi dan pendampingan psikososial remaja secara berkala.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Stat Item 1 */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 text-center hover:shadow-md transition-all duration-200">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-neutral-dark">{counts.modules}</p>
              <p className="text-sm text-slate-500 font-semibold mt-1">Modul Repropedia</p>
            </div>

            {/* Stat Item 2 */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 text-center hover:shadow-md transition-all duration-200">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-neutral-dark">{counts.users}+</p>
              <p className="text-sm text-slate-500 font-semibold mt-1">Siswa Terbantu</p>
            </div>

            {/* Stat Item 3 */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 text-center hover:shadow-md transition-all duration-200">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <MessageCircle className="h-6 w-6" />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-neutral-dark">{counts.articles}</p>
              <p className="text-sm text-slate-500 font-semibold mt-1">Artikel Edukatif</p>
            </div>

            {/* Stat Item 4 */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 text-center hover:shadow-md transition-all duration-200">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Award className="h-6 w-6" />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-neutral-dark">{activeCounselorCount}</p>
              <p className="text-sm text-slate-500 font-semibold mt-1">Kader Terlatih</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED LITERACY (REPROPEDIA) PREVIEW */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-neutral-dark">Pusat Literasi Repropedia</h2>
            <p className="text-slate-500 mt-2 font-medium">Pelajari materi penting kesehatan reproduksi remaja & hak anak.</p>
          </div>
          <Link
            href="/repropedia"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-1 text-sm font-bold text-primary hover:text-primary-hover group"
          >
            <span>Buka Semua Modul</span>
            <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isDataLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            modulesList.slice(0, 3).map((module) => (
              <div
                key={module.id}
                className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-primary text-[10px] font-extrabold uppercase tracking-wider mb-4">
                    {module.category.replace("-", " ")}
                  </span>
                  <h3 className="font-bold text-neutral-dark text-lg leading-snug hover:text-primary transition-colors">
                    <Link href={`/repropedia?module=${module.slug}`}>
                      {module.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                    {module.synopsis}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>{module.readTime} Baca</span>
                  <Link
                    href={`/repropedia?module=${module.slug}`}
                    className="text-primary hover:underline flex items-center space-x-1"
                  >
                    <span>Mulai Baca</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. RECENT MEDIA & UPDATES FEED */}
      <section className="py-12 md:py-16 bg-emerald-500/5 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-neutral-dark">Edukasi & Kampanye Terbaru</h2>
              <p className="text-slate-500 mt-2 font-medium">Artikel kesehatan, berita program, dan konten video kampanye.</p>
            </div>
            <Link
              href="/edukasi"
              className="mt-4 sm:mt-0 inline-flex items-center space-x-1 text-sm font-bold text-primary hover:text-primary-hover group"
            >
              <span>Lihat Semua Media</span>
              <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isDataLoading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              mediaList.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row"
                >
                  {/* Media Image/Thumbnail */}
                  <div className="relative w-full md:w-44 h-44 shrink-0 bg-slate-100">
                    {item.type === "video" ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white p-4">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                          <Play className="h-5 w-5 fill-current text-white pl-0.5" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wide">Video {item.duration}</span>
                      </div>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-neutral-dark/80 text-white text-[9px] font-extrabold uppercase tracking-widest">
                      {item.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-bold text-neutral-dark text-base leading-snug line-clamp-2 hover:text-primary transition-colors">
                        <Link href={`/edukasi?post=${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                      <span>{item.author}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FAQ SECTION */}
      <section id="faq" className="py-16 bg-white border-t border-slate-200/50">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-neutral-dark">FAQ Seputar Kesehatan & Pernikahan Anak</h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">Temukan jawaban atas pertanyaan umum seputar kesehatan reproduksi remaja.</p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="border border-slate-100 rounded-2xl bg-slate-50/50 overflow-hidden transition-all duration-200 hover:border-emerald-100"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 text-sm font-bold text-neutral-dark hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className={`text-slate-400 transform transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 pt-1 text-xs text-slate-600 leading-relaxed font-medium bg-white animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. GAMIFICATION / QUIZ INTERACTIVE CARD */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="p-8 md:p-12 rounded-3xl bg-neutral-dark text-white relative overflow-hidden shadow-2xl">
          {/* Decorative accents */}
          <div className="absolute -bottom-10 -left-10 bg-primary/20 h-44 w-44 rounded-full blur-2xl" />
          <div className="absolute -top-10 -right-10 bg-amber-500/10 h-44 w-44 rounded-full blur-2xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-primary text-xs font-bold uppercase tracking-wider">
                Mini Gamifikasi
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold">Uji Pengetahuan Kesehatan Reproduksimu!</h2>
              <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
                Ikuti kuis interaktif berhadiah badge virtual. Pahami pubertas, kenali batasan tubuh, dan ketahui hak-hak perlindungan anak dengan cara seru.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link
                href="/kuis"
                className="px-8 py-4 rounded-xl bg-accent text-neutral-dark font-extrabold text-sm hover:bg-accent-hover transform hover:-translate-y-0.5 transition-all shadow-lg shadow-amber-500/10 whitespace-nowrap"
              >
                Mulai Kuis Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Splash Screen Animation */}
      {showSplash && (
        <div 
          className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center transition-transform duration-[850ms] ease-in-out bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1),rgba(255,255,255,1))] ${
            splashTransition ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          {/* Subtle green grid lines background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          <div className="space-y-12 text-center w-full max-w-lg px-6 relative z-10">
            
            {/* 1. Green Bounding Box wrapper around main title */}
            <div className="relative inline-block px-14 py-8 bg-white/40 backdrop-blur-[1px] select-none mx-auto">
              
              {/* Dynamic SVG Animated Bounding Box Outline */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  className="animate-draw-outline"
                />
              </svg>

              {/* Bounding box Corner Handles (Emerald Anchor squares) */}
              <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-emerald-500 rounded-sm z-20 shadow-sm" />
              <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-emerald-500 rounded-sm z-20 shadow-sm" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-emerald-500 rounded-sm z-20 shadow-sm" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-emerald-500 rounded-sm z-20 shadow-sm" />

              {/* Coordinates Indicator Badge below bottom line */}
              <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
                <div className="w-[2px] h-4 bg-emerald-500" />
                <div className="bg-emerald-500 text-white text-[9px] font-black font-mono px-2.5 py-0.5 rounded shadow-sm whitespace-nowrap tracking-wider">
                  1280 × 198
                </div>
              </div>

              {/* The Bold Logo Heading */}
              <h1 className="text-5xl md:text-6xl font-black tracking-[0.25em] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent leading-none select-none pl-4">
                SIGMA
              </h1>
            </div>

            {/* 2. Loading State Information Section */}
            <div className="space-y-4 pt-6 max-w-sm mx-auto">
              <div className="space-y-1">
                <p className="text-xs font-black tracking-[0.2em] text-slate-700 uppercase">
                  Sistem Informasi Gender & Remaja
                </p>
                <p className="text-[10px] font-semibold text-slate-400">
                  Garda Remaja Untuk Desa Aman (GARUDA)
                </p>
              </div>

              {/* Game-like Loading Bar Container */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-[9px] font-black tracking-widest text-slate-400">
                  <span className="animate-pulse">{getLoadingMessage(progress)}</span>
                  <span className="text-emerald-600 font-mono font-black">{progress}%</span>
                </div>
                
                {/* Outer Line */}
                <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden border border-slate-200/20">
                  {/* Inner Glowing Fill */}
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-75 ease-out shadow-[0_0_8px_#10b981]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
