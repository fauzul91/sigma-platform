"use client";

import { getYouTubeThumbnail } from "@/utils/mediaUtils";
import { getArticleExcerpt } from "@/utils/tiptapRenderer";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  MessageCircle,
  Award,
  ArrowRight,
  Users,
  ChevronRight,
  Play,
  HeartHandshake,
  Activity,
  Paperclip,
  CheckCircle2,
  Scale,
  ShieldCheck,
  AlertTriangle,
  Eye,
  LifeBuoy,
  Gamepad2,
} from "lucide-react";
import { userService } from "@/services/user/userService";
import { RepropediaItem, MediaItem } from "@/types";
import { CardSkeleton } from "@/components/shared/Skeletons";
import HeroCardsDeck from "@/components/user/HeroCardsDeck";
import SigmaGallerySection from "@/components/user/SigmaGallerySection";

const PARTNERS = [
  {
    src: "/assets/mitra_partner/logo_jember.webp",
    alt: "Pemerintah Kabupaten Jember",
  },
  {
    src: "/assets/mitra_partner/logo_unej.webp",
    alt: "Universitas Jember",
  },
  {
    src: "/assets/mitra_partner/logo_kemendikbud.webp",
    alt: "Kementerian Pendidikan dan Kebudayaan",
  },
  {
    src: "/assets/mitra_partner/logo_kemendikti.webp",
    alt: "Kementerian Pendidikan Tinggi, Sains, dan Teknologi",
  },
  {
    src: "/assets/mitra_partner/logo_kua.webp",
    alt: "Kantor Urusan Agama",
  },
  {
    src: "/assets/mitra_partner/logo_lppm.webp",
    alt: "LPPM Universitas Jember",
    className: "rounded-md",
  },
  {
    src: "/assets/mitra_partner/logo_blu.webp",
    alt: "Badan Layanan Umum",
  },
];

const QUIZ_PREVIEWS = [
  {
    id: "cat_repro",
    slug: "pubertas",
    title: "Kesehatan Reproduksi",
    description: "Pahami pubertas, perubahan biologis, dan kebersihan diri harian.",
    duration: "3 Menit",
    xp: "45 XP",
    image: "/assets/quiz/reproduksi_pubertas.webp",
  },
  {
    id: "cat_marriage",
    slug: "pernikahan-anak",
    title: "Pencegahan Perkawinan Anak",
    description: "Ketahui batas usia legal 19 tahun dan risiko medis kehamilan dini.",
    duration: "3 Menit",
    xp: "45 XP",
    image: "/assets/quiz/perkawinan_anak.webp",
  },
  {
    id: "cat_bullying",
    slug: "kesehatan-mental",
    title: "Kesehatan Mental",
    description: "Identifikasi kecemasan berlebih, cyberbullying, dan cara mengelola stress.",
    duration: "2 Menit",
    xp: "30 XP",
    image: "/assets/quiz/kesehatan_mental.webp",
  },
  {
    id: "cat_violence",
    slug: "kekerasan-seksual",
    title: "Pencegahan Kekerasan Seksual",
    description: "Kenali batasan tubuh, consent, dan langkah pelaporan darurat.",
    duration: "2 Menit",
    xp: "30 XP",
    image: "/assets/quiz/batasan_diri.webp",
  },
  {
    id: "cat_rights",
    slug: "hak-anak",
    title: "Hak-Hak Dasar Anak",
    description: "Ketahui 4 hak dasar anak berdasarkan Konvensi PBB dan hukum Indonesia.",
    duration: "2 Menit",
    xp: "30 XP",
    image: "/assets/quiz/hak_anak.webp",
  },
];

export default function HomeView() {
  const [modulesList, setModulesList] = useState<RepropediaItem[]>([]);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [activeCounselorCount, setActiveCounselorCount] = useState(15);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

  // Simple counter animation trigger
  const [counts, setCounts] = useState({ modules: 0, articles: 0, users: 0 });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
    },
    {
      question: "Bagaimana alur rujukan dari kader sebaya ke Puskesmas?",
      answer: "Dimulai dari konseling sebaya dengan Kader GARUDA, jika membutuhkan penanganan lebih lanjut akan didampingi ke Guru BK sekolah, lalu dirujuk secara aman ke fasilitas kesehatan Puskesmas."
    }
  ];

  return (
    <div className="relative overflow-hidden bg-slate-50 min-h-screen">

      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="absolute top-1/3 right-10 -z-10 h-[300px] w-[300px] rounded-full bg-amber-100/30 blur-3xl" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-16 lg:pt-20 pb-0 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero text content */}
          <div className="lg:col-span-12 flex flex-col items-center text-center space-y-4 md:space-y-4 max-w-4xl mx-auto">
            <div className="hero-fade-up inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200/50 px-3.5 py-1.5 rounded-full text-primary text-xs font-bold uppercase tracking-wider shadow-sm">
              <span>Bersama Kader GARUDA Indonesia</span>
            </div>

            <h1 className="hero-fade-up hero-delay-1 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-neutral-dark tracking-tight leading-[1.15]">
              Tumbuh Sehat, <br className="hidden sm:inline" />
              <span className="text-neutral-dark">
                Melangkah Bersama SIGMA
              </span>
            </h1>

            <p className="hero-fade-up hero-delay-2 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-normal font-medium">
              Platform interaktif dan ruang konseling aman bagi remaja untuk pahami diri serta lindungi masa depan.
            </p>

            {/* CTAs */}
            <div className="hero-fade-up hero-delay-3 pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/konseling"
                className="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-emerald-600/20 transform hover:-translate-y-0.5 active:scale-98 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <HeartHandshake className="h-5 w-5 text-white" />
                <span>Butuh Konseling?</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 5 Interactive Hero Cards Deck (Rising from below hero) */}
        <div className="mt-8 md:mt-10 lg:mt-12 mb-4 sm:mb-6 lg:-mb-14">
          <HeroCardsDeck />
        </div>
      </section>

      {/* Mitra & Partner Kerja Sama Marquee Section - Soft Clean Ribbon */}
      <section className="relative overflow-hidden border-y border-slate-200/80 bg-slate-50/40 py-12">
        {/* Section Header */}
        <div className="relative mx-auto mb-8 flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:px-10">
          <div className="text-center lg:text-center space-y-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight text-neutral-dark tracking-tight">
              Mitra & Partner Kerja Sama
            </h3>
            <p className="text-sm sm:text-base font-medium text-slate-500">
              SIGMA didukung oleh institusi pendidikan dan kesehatan terkemuka.
            </p>
          </div>
        </div>
        <div className="relative w-full overflow-hidden py-4">
          <div className="animate-marquee flex w-max items-center gap-5 sm:gap-6 md:gap-7">
            {[1, 2, 3].map((group) => (
              <div
                key={group}
                className="flex shrink-0 items-center gap-5 sm:gap-6 md:gap-7"
                aria-hidden={group !== 1}
              >
                {PARTNERS.map((partner, index) => (
                  <div
                    key={`${group}-${index}`}
                    className="group flex h-18 sm:h-22 md:h-26 min-w-[120px] sm:min-w-[150px] md:min-w-[180px] shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-6 sm:px-8 py-4 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:shadow-md hover:-translate-y-1"
                  >
                    <img
                      src={partner.src}
                      alt={partner.alt}
                      className={`h-12 sm:h-14 md:h-16 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] object-contain transition-transform duration-200 group-hover:scale-105 ${partner.className || ""}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DAMPAK & MISI KAMI (EMERALD CANVAS + STAGGERED PAPERCLIPPED CARDS) */}
      <section className="py-6 md:py-8 lg:py-10 px-6 sm:px-10 relative lg:px-12 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl md:rounded-[40px] bg-primary p-7 sm:p-10 lg:p-14 shadow-2xl text-white">
          {/* Subtle Ambient Radial Glows inside Canvas */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent)]" />

          {/* Section Header Content */}
          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Tulisan Gede (Main Statement Text) */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white text-center leading-snug tracking-tight">
              Kami mendampingi remaja memahami kesehatan reproduksi dan{" "}
              <span className="text-amber-300 underline decoration-amber-300/40 underline-offset-4">
                mencegah pernikahan dini
              </span>
              , agar mereka tumbuh berdaya dan percaya diri.
            </h2>
          </div>

          {/* Staggered Floating Cards (Persis Layout Referensi Gambar) */}
          <div className="relative z-10 mt-12 sm:mt-16 pb-2 lg:pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-start">
              {/* Card 1: Literasi Digital (Normal Level) */}
              <div className="relative bg-white text-neutral-dark rounded-3xl p-6 shadow-xl border border-white/80 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between min-h-[280px] lg:min-h-[315px] group lg:translate-y-0">
                {/* Metallic Paperclip on top-right */}
                <div className="absolute -top-3.5 right-6 z-20 pointer-events-none transform -rotate-12">
                  <div className="bg-slate-100/95 border border-slate-300/90 rounded-full p-1 shadow-md">
                    <Paperclip className="h-5 w-5 text-slate-600" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-neutral-dark">
                    Ruang Literasi Digital
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
                    Edukasi kesehatan reproduksi yang ilmiah dan memandu remaja memahami diri.
                  </p>
                </div>

                {/* 3D Illustration SVG */}
                <div className="relative w-30 h-30 mx-auto my-3 flex items-center justify-center">
                  <Image
                    src="/assets/misi_impact/literasi.webp"
                    alt="Literasi Digital"
                    fill
                    unoptimized
                    sizes="100px"
                    className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Card 2: Konseling & Ruang Aman (Staggered Down) */}
              <div className="relative bg-white text-neutral-dark rounded-3xl p-6 shadow-xl border border-white/80 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between min-h-[280px] lg:min-h-[315px] group lg:translate-y-8">
                {/* Metallic Paperclip on top-right */}
                <div className="absolute -top-3.5 right-6 z-20 pointer-events-none transform -rotate-12">
                  <div className="bg-slate-100/95 border border-slate-300/90 rounded-full p-1 shadow-md">
                    <Paperclip className="h-5 w-5 text-slate-600" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-neutral-dark">
                    Konseling & Ruang Aman
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
                    Ruang bercerita privat tanpa stigma dengan konselor sebaya & tenaga ahli.
                  </p>
                </div>

                {/* 3D Illustration SVG */}
                <div className="relative w-30 h-30 mx-auto my-3 flex items-center justify-center">
                  <Image
                    src="/assets/misi_impact/konseling.webp"
                    alt="Konseling & Ruang Aman"
                    fill
                    unoptimized
                    sizes="100px"
                    className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Card 3: 15 Kader Aktif (Staggered Slight) */}
              <div className="relative bg-white text-neutral-dark rounded-3xl p-6 shadow-xl border border-white/80 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between min-h-[280px] lg:min-h-[315px] group lg:translate-y-2">
                {/* Metallic Paperclip on top-right */}
                <div className="absolute -top-3.5 right-6 z-20 pointer-events-none transform -rotate-12">
                  <div className="bg-slate-100/95 border border-slate-300/90 rounded-full p-1 shadow-md">
                    <Paperclip className="h-5 w-5 text-slate-600" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-neutral-dark">
                    15 Kader Aktif
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
                    Duta sebaya terpilih di sekolah yang siap mendampingi teman sebayanya.
                  </p>
                </div>

                {/* 3D Illustration SVG */}
                <div className="relative w-30 h-30 mx-auto my-3 flex items-center justify-center">
                  <Image
                    src="/assets/misi_impact/dutakader.webp"
                    alt="15 Kader Aktif"
                    fill
                    unoptimized
                    sizes="100px"
                    className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Card 4: Keterlibatan Interaktif (Staggered Down) */}
              <div className="relative bg-white text-neutral-dark rounded-3xl p-6 shadow-xl border border-white/80 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between min-h-[280px] lg:min-h-[315px] group lg:translate-y-10">
                {/* Metallic Paperclip on top-right */}
                <div className="absolute -top-3.5 right-6 z-20 pointer-events-none transform -rotate-12">
                  <div className="bg-slate-100/95 border border-slate-300/90 rounded-full p-1 shadow-md">
                    <Paperclip className="h-5 w-5 text-slate-600" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-neutral-dark">
                    Keterlibatan Interaktif
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
                    Asah pemahaman lewat Quiz kesehatan dan ruang berekspresi karya remaja.
                  </p>
                </div>

                {/* 3D Illustration SVG */}
                <div className="relative w-30 h-30 mx-auto my-3 flex items-center justify-center">
                  <Image
                    src="/assets/misi_impact/keterlibatan.webp"
                    alt="Keterlibatan Interaktif"
                    fill
                    unoptimized
                    sizes="100px"
                    className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED LITERACY (REPROPEDIA) PREVIEW - BENTO GRID 6 PILAR UTAMA */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header (Prominent typography on mobile, split on desktop) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12 md:mb-16 text-left">
          <div className="max-w-2xl space-y-2.5 sm:space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-[40px] font-black text-neutral-dark tracking-tight leading-[1.15]">
              Baca modul edukasi <br className="hidden sm:inline" />
              <span className="text-primary">Repropedia</span>
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base max-w-xl leading-relaxed">
              Pelajari materi penting kesehatan reproduksi remaja &amp; hak anak secara komprehensif.
            </p>
          </div>
          <div className="shrink-0 flex justify-start md:justify-end pt-1 md:pt-0">
            <Link
              href="/repropedia"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-emerald-700 text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all group"
            >
              <span>Jelajahi Repropedia</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE & TABLET LAYOUT (< lg): HERO BANNER + 2-COL BALANCED GRID */}
        {/* ============================================================ */}
        <div className="block lg:hidden space-y-3.5 sm:space-y-4">

          {/* 1. Top Featured Hero Banner: Bab 01 - Kesehatan Reproduksi */}
          <Link
            href="/repropedia?bab=1"
            className="group relative bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-950 text-white rounded-3xl p-5 sm:p-7 shadow-lg border border-emerald-700/40 hover:border-emerald-500 transition-all duration-300 flex items-center justify-between gap-4 overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-emerald-500/20 blur-2xl" />

            {/* Content Left */}
            <div className="flex-1 min-w-0 z-10">
              <div className="flex items-center space-x-2 mb-1.5 sm:mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                  Modul Utama • Bab 01
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white leading-snug group-hover:text-emerald-300 transition-colors">
                Kesehatan Reproduksi
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-emerald-100/85 font-medium leading-relaxed line-clamp-2">
                Panduan menyeluruh masa pubertas, sistem biologis, dan kebersihan diri tanpa rasa tabu.
              </p>
              <div className="mt-3 flex items-center space-x-1.5 text-xs font-black text-amber-300 group-hover:text-amber-200 transition-colors">
                <span>Baca Modul Lengkap</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 3D Visual Mascot Right */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center z-10">
              <Image
                src="/assets/hero_section/health.webp"
                alt="Kesehatan Reproduksi"
                fill
                unoptimized
                sizes="130px"
                className="object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* 2. Symmetrical 2-Column Grid (Bab 2, 4, 5, 6, & Bab 3 Full Width) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">

            {/* CARD 1: Bab 02 - Kenali Hak-Hak Anak */}
            <Link
              href="/repropedia?bab=2"
              className="group bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Bab 02
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-neutral-dark group-hover:text-emerald-700 transition-colors leading-snug">
                  Kenali Hak-Hak Anak
                </h4>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 sm:line-clamp-3">
                  Pahami hak perlindungan, tumbuh kembang, dan rasa amanmu.
                </p>
              </div>
            </Link>

            {/* CARD 2: Bab 04 - Bentuk Kekerasan Seksual */}
            <Link
              href="/repropedia?bab=4"
              className="group bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Bab 04
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-neutral-dark group-hover:text-emerald-700 transition-colors leading-snug">
                  Bentuk Kekerasan Seksual
                </h4>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 sm:line-clamp-3">
                  Pahami jenis verbal, fisik, hingga kekerasan digital (KBGO).
                </p>
              </div>
            </Link>

            {/* CARD 3: Bab 05 - Pencegahan Kekerasan Seksual */}
            <Link
              href="/repropedia?bab=5"
              className="group bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Bab 05
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-neutral-dark group-hover:text-emerald-700 transition-colors leading-snug">
                  Pencegahan Kekerasan
                </h4>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 sm:line-clamp-3">
                  Kenali batasan tubuh (consent) dan cara menjaga diri.
                </p>
              </div>
            </Link>

            {/* CARD 4: Bab 06 - Mengalami Kekerasan Seksual? */}
            <Link
              href="/repropedia?bab=6"
              className="group bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Bab 06
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-neutral-dark group-hover:text-emerald-700 transition-colors leading-snug">
                  Mengalami Kekerasan?
                </h4>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 sm:line-clamp-3">
                  Panduan aman mencari bantuan, darurat, dan alur konseling.
                </p>
              </div>
            </Link>

            {/* CARD 5 (SPAN 2 COLS): Bab 03 - Risiko & Dampak Perkawinan Anak */}
            <Link
              href="/repropedia?bab=3"
              className="col-span-2 group bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="text-[10px] sm:text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Bab 03
                  </span>
                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>UU No. 16/2019 • Batas 19 Tahun</span>
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-neutral-dark group-hover:text-emerald-700 transition-colors leading-snug">
                  Risiko &amp; Dampak Perkawinan Anak
                </h4>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                  Dampak kesiapan fisik, psikologis, pendidikan, dan masa depan remaja.
                </p>
              </div>
              <div className="shrink-0 flex items-center space-x-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                <span className="hidden sm:inline">Pelajari Bab 03</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>

        </div>

        {/* ============================================================ */}
        {/* DESKTOP LAYOUT (lg:grid): ORIGINAL BENTO GRID 12 KOLOM      */}
        {/* ============================================================ */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">

          {/* ============================================================ */}
          {/* KLUSTER KIRI (5 KOLOM DI DESKTOP): BOX 1, BOX 2, & BOX 3     */}
          {/* ============================================================ */}
          <div className="md:col-span-2 lg:col-span-5 flex flex-col gap-5 lg:gap-6">

            {/* Top Sub-Row: Box 1 (Hak-Hak Anak) + Box 2 (Pencegahan) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 flex-1">

              {/* BOX 1: Hak-Hak Anak (Putih Bersih) -> Bab 2 (Hal 6) */}
              <Link
                href="/repropedia?bab=2"
                className="group relative bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-neutral-dark group-hover:text-emerald-700 transition-colors leading-snug">
                    Kenali Hak-Hak Anak
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    Pahami hak perlindungan, tumbuh kembang, dan rasa amanmu.
                  </p>
                </div>
              </Link>

              {/* BOX 2: Pencegahan Kekerasan Seksual (Hijau Muda Lembut) -> Bab 5 (Hal 14) */}
              <Link
                href="/repropedia?bab=5"
                className="group relative bg-primary rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                    Pencegahan Kekerasan Seksual
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                    Kenali batasan tubuh (consent), tanda bahaya (red flags), dan cara menjaga diri.
                  </p>
                </div>
              </Link>

            </div>

            {/* Bottom Row: Box 3 (Risiko & Dampak Perkawinan Anak - Abu-Abu Lembut) -> Bab 3 (Hal 7) */}
            <Link
              href="/repropedia?bab=3"
              className="group relative bg-slate-100/80 border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between flex-1"
            >
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                  Risiko & Dampak Perkawinan Anak
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-lg">
                  Menilik dampak kesiapan fisik, mental, pendidikan, hingga masa depan remaja.
                </p>
              </div>

              {/* Visual Mini Highlight Badge */}
              <div className="mt-5 pt-3.5 border-t border-slate-200/70 flex items-center">
                <span className="inline-flex items-center space-x-2 text-[11px] font-bold text-slate-700 bg-white border border-slate-200/80 px-3 py-1 rounded-full shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>UU No. 16/2019 • Batas Minimal 19 Tahun</span>
                </span>
              </div>
            </Link>

          </div>

          {/* ============================================================ */}
          {/* KOLOM TENGAH (4 KOLOM DI DESKTOP): BOX 4 (CARD HERO TERTINGGI)*/}
          {/* ============================================================ */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col">
            <Link
              href="/repropedia?bab=1"
              className="group relative bg-emerald-800 text-white rounded-3xl p-7 sm:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
            >
              {/* Header Card Hero */}
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
                  Kesehatan Reproduksi
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                  Panduan menyeluruh mengenal perubahan tubuh masa pubertas, sistem biologis, dan kebersihan diri tanpa rasa malu.
                </p>
              </div>

              {/* 3D Illustration SVG Highlight */}
              <div className="relative w-48 sm:w-56 h-48 sm:h-56 mx-auto my-6 flex items-center justify-center">
                <Image
                  src="/assets/hero_section/health.webp"
                  alt="Kesehatan Reproduksi"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 200px, 240px"
                  className="object-contain filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.3)] group-hover:scale-105 group-hover:-rotate-1 transition-all duration-300"
                />
              </div>

              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-emerald-100/90 font-bold">
                <span>Edukasi Ilmiah & Komprehensif</span>
                <span className="group-hover:translate-x-1 transition-transform">SIGMA Platform →</span>
              </div>
            </Link>
          </div>

          {/* ============================================================ */}
          {/* KLUSTER KANAN (3 KOLOM DI DESKTOP): BOX 5 & BOX 6            */}
          {/* ============================================================ */}
          <div className="md:col-span-1 lg:col-span-3 flex flex-col gap-5 lg:gap-6">

            {/* BOX 5: Bentuk-Bentuk Kekerasan Seksual (Putih Bersih) -> Bab 4 (Hal 10) */}
            <Link
              href="/repropedia?bab=4"
              className="group relative bg-slate-100/80 border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between flex-1"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-neutral-dark group-hover:text-emerald-700 transition-colors leading-snug">
                  Bentuk Kekerasan Seksual
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Pahami jenis verbal, fisik, hingga kekerasan di ranah digital (KBGO).
                </p>
              </div>
            </Link>

            {/* BOX 6: Langkah Tanggap Kekerasan (Hijau Muda Lembut) -> Bab 6 (Hal 18) */}
            <Link
              href="/repropedia?bab=6"
              className="group relative bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between flex-1"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-neutral-dark group-hover:text-emerald-700 transition-colors leading-snug">
                  Mengalami Kekerasan Seksual?
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Panduan aman mencari bantuan, kontak darurat, dan alur rujukan konseling.
                </p>
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* 4. MEDICAL QUIZ SECTION (INTERACTIVE GAMIFIED CHALLENGE - FULL WIDTH STRETCH) */}
      <section className="w-full bg-primary py-16 md:py-20 text-white relative overflow-hidden">
        {/* Subtle Ambient Radial Glows & Texture spanning full width */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-teal-400/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Title, Subtitle, CTA Button, and 3D Voxel Mascot */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full text-center md:text-left items-center md:items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                  Saatnya Uji Pemahamanmu Lewat Kuis Seru!
                </h2>

                <p className="mt-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed font-medium max-w-xl mx-auto md:mx-0">
                  Cari tahu seberapa paham kamu soal kesehatan reproduksi dan batas diri. Bukan ujian sekolah, kok! Cuma kuis santai buat mastiin kamu paham cara menjaga diri dan mengenali hak-hakmu sebagai remaja. Cepat, seru, dan pastinya nambah ilmu.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <Link
                    href="/kuis"
                    className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:shadow-amber-400/30 active:scale-98 transition-all"
                  >
                    <span>Mulai Kuis Sekarang</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* 3D Voxel Graphic Mascot */}
              <div className="mt-8 relative w-44 sm:w-52 h-44 sm:h-52 mx-auto md:mx-0">
                <Image
                  src="/assets/hero_section/quiz.webp"
                  alt="Medical Quiz SIGMA"
                  fill
                  unoptimized
                  className="object-contain filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.35)] hover:scale-105 hover:rotate-1 transition-all duration-500"
                />
              </div>
            </div>

            {/* Right Column: 2x2 Grid of Quiz Categories from Quiz Page */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {QUIZ_PREVIEWS.map((quiz) => (
                  <Link
                    key={quiz.id}
                    href={`/kuis/${quiz.slug}`}
                    className="group relative bg-white rounded-3xl p-5 shadow-lg border border-white/80 hover:shadow-2xl hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start gap-3.5 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50/80 border border-emerald-100 p-1 shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                          <Image
                            src={quiz.image}
                            alt={quiz.title}
                            fill
                            unoptimized
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h4 className="text-base font-extrabold text-neutral-dark group-hover:text-emerald-700 transition-colors leading-snug">
                            {quiz.title}
                          </h4>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                        {quiz.description}
                      </p>
                    </div>

                    {/* Card Footer with Button */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400">
                        {quiz.duration} • {quiz.xp}
                      </span>
                      <span className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-xl bg-amber-400 group-hover:bg-amber-500 text-slate-950 font-extrabold text-xs shadow-xs transition-colors">
                        <span>Mulai</span>
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. RECENT ARTIKEL & EDUKASI FEED */}
      <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          {/* Section Header (Prominent typography on mobile, split on desktop) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12 md:mb-16 text-left">
            <div className="max-w-2xl space-y-2.5 sm:space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-[40px] font-black text-neutral-dark tracking-tight leading-[1.15]">
                Baca artikel terbaru <br className="hidden sm:inline" />
                dari <span className="text-primary">SIGMA</span>
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base max-w-xl leading-relaxed">
                Tips kesehatan reproduksi, panduan remaja, dan update materi edukasi terbaru. Semua ada di sini.
              </p>
            </div>
            <div className="shrink-0 flex justify-start md:justify-end pt-1 md:pt-0">
              <Link
                href="/edukasi"
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-emerald-700 text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all group"
              >
                <span>Jelajahi Artikel Edukasi</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {isDataLoading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              mediaList.slice(0, 3).map((item) => {
                const ytThumb = item.type === "video" ? getYouTubeThumbnail(item.mediaUrl) : null;
                return (
                  <Link
                    key={item.id}
                    href={`/edukasi?post=${item.slug}`}
                    className="group flex flex-col justify-between transition-all duration-300"
                  >
                    <div>
                      {/* Media Image / Thumbnail Container */}
                      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 shadow-xs mb-4">
                        {ytThumb ? (
                          <div className="relative w-full h-full overflow-hidden">
                            <img
                              src={ytThumb}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                              <div className="h-11 w-11 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="h-5 w-5 fill-current text-white pl-0.5" />
                              </div>
                            </div>
                            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                              Video {item.duration || ""}
                            </div>
                          </div>
                        ) : item.type === "video" ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white p-4">
                            <div className="h-11 w-11 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="h-5 w-5 fill-current text-white pl-0.5" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wide">
                              Video {item.duration}
                            </span>
                          </div>
                        ) : (
                          <div className="relative w-full h-full overflow-hidden">
                            <img
                              src={item.mediaUrl}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-md">
                              sigmaplatform.id
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Details */}
                      <div>
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                          {item.category.replace("-", " ")}
                        </span>
                        <h3 className="font-extrabold text-neutral-dark text-base sm:text-lg leading-snug line-clamp-2 mt-1.5 group-hover:text-emerald-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {getArticleExcerpt(item.content, 140)}
                        </p>
                      </div>
                    </div>

                    {/* Meta Footer: Author · Date */}
                    <div className="mt-4 pt-3 flex items-center text-xs text-slate-400 font-medium">
                      <span>{item.author}</span>
                      <span className="mx-1.5 font-bold">·</span>
                      <span>{item.date}</span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
 
      {/* 5.5 INTERACTIVE SIGMA MOMENTS GALLERY (ORBIT / CONSTELLATION STYLE) */}
      <SigmaGallerySection />

      {/* 6. INTERACTIVE FAQ & CONTACT SECTION (MATCHING REFERENCE WITH 3D MASCOTS) */}
      <section id="faq" className="py-16 relative overflow-hidden">
        {/* Subtle Ambient Background Glows */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Stylized Badge: "Tanya Jawab & Kontak" */}
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-dark tracking-tight">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              Temukan jawaban atas pertanyaan seputar kesehatan reproduksi, hak anak, dan pencegahan pernikahan dini.
            </p>
          </div>
          {/* Interactive Layout: Left Questions | Center 3D Mascots | Right Questions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-5 sm:gap-6 relative z-10">
            {/* Kolom Kiri: 3 Gelembung Pertanyaan */}
            <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 order-2 lg:order-1">
              {faqData.slice(0, 3).map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className={`relative p-4 sm:p-4.5 rounded-2xl bg-white/95 backdrop-blur-xs border transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 group ${isOpen
                      ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-emerald-500/10"
                      : "border-emerald-100/80 hover:border-emerald-300"
                      }`}
                  >
                    {/* Speech bubble pointer towards center mascot on desktop */}
                    <div
                      className={`hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-8 transition-colors ${isOpen ? "border-l-emerald-500" : "border-l-emerald-200/80 group-hover:border-l-emerald-300"
                        }`}
                    />

                    <div className="flex items-center justify-between gap-2.5">
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug">
                        {faq.question}
                      </span>
                      <span
                        className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen
                          ? "bg-emerald-600 text-white rotate-90"
                          : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:text-emerald-700"
                          }`}
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    {isOpen && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 font-medium leading-relaxed animate-in fade-in duration-200">
                        <p>{faq.answer}</p>
                        <Link
                          href="/faq"
                          className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-600 hover:text-emerald-700"
                        >
                          <span>Buka di FAQ Lengkap</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Kolom Tengah: Dua Maskot 3D Voxel */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative order-1 lg:order-2 my-2 lg:my-0">
              <div className="relative w-64 sm:w-72 md:w-80 aspect-square">
                <Image
                  src="/assets/hero_section/maskot_faq.webp"
                  alt="Maskot Kader GARUDA SIGMA"
                  fill
                  className="object-contain filter rounded-3xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 order-3">
              {faqData.slice(3, 6).map((faq, idx) => {
                const actualIndex = idx + 3;
                const isOpen = openFaqIndex === actualIndex;
                return (
                  <div
                    key={actualIndex}
                    onClick={() => setOpenFaqIndex(isOpen ? null : actualIndex)}
                    className={`relative p-4 sm:p-4.5 rounded-2xl bg-white/95 backdrop-blur-xs border transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 group ${isOpen
                      ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-emerald-500/10"
                      : "border-emerald-100/80 hover:border-emerald-300"
                      }`}
                  >
                    {/* Speech bubble pointer towards center mascot on desktop */}
                    <div
                      className={`hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-8 transition-colors ${isOpen ? "border-r-emerald-500" : "border-r-emerald-200/80 group-hover:border-r-emerald-300"
                        }`}
                    />

                    <div className="flex items-center justify-between gap-2.5">
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug">
                        {faq.question}
                      </span>
                      <span
                        className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen
                          ? "bg-emerald-600 text-white rotate-90"
                          : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:text-emerald-700"
                          }`}
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    {isOpen && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 font-medium leading-relaxed animate-in fade-in duration-200">
                        <p>{faq.answer}</p>
                        <Link
                          href="/faq"
                          className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-600 hover:text-emerald-700"
                        >
                          <span>Buka di FAQ Lengkap</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Callout Card (Floating Peach/Amber Box matching reference) */}
          <div className="mt-8 sm:mt-12 max-w-xl mx-auto relative z-20">
            <div className="relative rounded-3xl bg-gradient-to-r from-amber-200 via-orange-200 to-amber-200 border-2 border-orange-300/90 p-6 sm:p-7 text-center shadow-xl">
              {/* Corner decorative ribbons */}
              <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-4 border-l-4 border-orange-500 rounded-tl-lg pointer-events-none" />
              <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-4 border-l-4 border-orange-500 rounded-bl-lg pointer-events-none" />
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-4 border-r-4 border-orange-500 rounded-tr-lg pointer-events-none" />
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-4 border-r-4 border-orange-500 rounded-br-lg pointer-events-none" />

              <h3 className="text-sm sm:text-base md:text-lg font-black text-slate-900 leading-snug">
                Cari Tahu Semua Pertanyaanmu atau Hubungi Kami Langsung!
              </h3>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/faq"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-amber-400/30 transition-all active:scale-95"
                >
                  Lihat Semua FAQ
                </Link>
                <Link
                  href="/kontak"
                  className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-orange-500/30 transition-all active:scale-95"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}