"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  MapPin,
  Camera,
  Maximize2
} from "lucide-react";

export interface GalleryPhoto {
  id: number;
  src: string;
  title: string;
  location: string;
  category: string;
  tilt: string; // Tailwind rotation class
  desktopPos: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  // Baris Atas
  {
    id: 1,
    src: "/assets/galeri_sigma/DSCF5197-optimized.webp",
    title: "Langkah Awal Sang Kader",
    location: "SMPN 4 Sumberjambe",
    category: "Kader SIGMA",
    tilt: "-rotate-4",
    desktopPos: { left: "4%", top: "4%" }
  },
  {
    id: 2,
    src: "/assets/galeri_sigma/DSCF5391-optimized.webp",
    title: "Belajar Jadi Lebih Seru",
    location: "SMPN 4 Sumberjambe",
    category: "Ruang Edukasi",
    tilt: "rotate-3",
    desktopPos: { left: "23%", top: "2%" }
  },
  {
    id: 3,
    src: "/assets/galeri_sigma/DSCF5441-optimized.webp",
    title: "Ruang untuk Berdiskusi",
    location: "SMPN 4 Sumberjambe",
    category: "Ngobrol Bareng",
    tilt: "-rotate-2",
    desktopPos: { left: "43%", top: "1%" }
  },
  {
    id: 4,
    src: "/assets/galeri_sigma/DSCF5478-optimized.webp",
    title: "Tanda Siap Beraksi",
    location: "SMPN 4 Sumberjambe",
    category: "Kader SIGMA",
    tilt: "rotate-3",
    desktopPos: { right: "23%", top: "2%" }
  },
  {
    id: 5,
    src: "/assets/galeri_sigma/DSCF5490-optimized.webp",
    title: "Belajar, Berkarya, Beraksi",
    location: "SMPN 4 Sumberjambe",
    category: "Pelatihan",
    tilt: "-rotate-3",
    desktopPos: { right: "4%", top: "4%" }
  },

  // Sisi Tengah / Flanks
  {
    id: 6,
    src: "/assets/galeri_sigma/DSCF6079-optimized.webp",
    title: "Kenali, Pahami, Cegah",
    location: "SMPN 4 Sumberjambe",
    category: "Sosialisasi",
    tilt: "rotate-4",
    desktopPos: { left: "2%", top: "42%" }
  },
  {
    id: 7,
    src: "/assets/galeri_sigma/DSCF6091-optimized.webp",
    title: "Berbagi Pengetahuan",
    location: "SMPN 4 Sumberjambe",
    category: "Ruang Belajar",
    tilt: "-rotate-4",
    desktopPos: { right: "2%", top: "42%" }
  },

  // Baris Bawah
  {
    id: 8,
    src: "/assets/galeri_sigma/DSCF6110-optimized.webp",
    title: "Menjadi Bagian dari Perubahan",
    location: "SMPN 4 Sumberjambe",
    category: "Cerita SIGMA",
    tilt: "-rotate-3",
    desktopPos: { left: "4%", bottom: "4%" }
  },
  {
    id: 9,
    src: "/assets/galeri_sigma/IMG_0546-optimized.webp",
    title: "Bersama Membangun SIGMA",
    location: "Kantor Desa Gunungmalang",
    category: "Kolaborasi",
    tilt: "rotate-3",
    desktopPos: { left: "23%", bottom: "2%" }
  },
  {
    id: 10,
    src: "/assets/galeri_sigma/IMG_0948-optimized.webp",
    title: "Kreatif di Balik Layar",
    location: "SMPN 4 Sumberjambe",
    category: "Karya Remaja",
    tilt: "-rotate-2",
    desktopPos: { left: "43%", bottom: "1%" }
  },
  {
    id: 11,
    src: "/assets/galeri_sigma/IMG_2061-optimized.webp",
    title: "Belajar Bersama SIGMA",
    location: "SMPN 4 Sumberjambe",
    category: "Sejiwa SIGMA",
    tilt: "rotate-2",
    desktopPos: { right: "23%", bottom: "2%" }
  },
  {
    id: 12,
    src: "/assets/galeri_sigma/IMG_3299-optimized.webp",
    title: "Melangkah Bersama",
    location: "SMPN 4 Sumberjambe",
    category: "Pelatihan",
    tilt: "-rotate-4",
    desktopPos: { right: "4%", bottom: "4%" }
  },
];

export default function SigmaGallerySection() {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activePhotoIdx === null) return;
      if (e.key === "Escape") {
        setActivePhotoIdx(null);
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIdx((prev) =>
          prev === null || prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setActivePhotoIdx((prev) =>
          prev === null || prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1
        );
      }
    },
    [activePhotoIdx]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const activePhoto = activePhotoIdx !== null ? GALLERY_PHOTOS[activePhotoIdx] : null;

  return (
    <section className="w-full bg-primary text-white relative overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-emerald-700/40">

      {/* 1. GEOMETRIC INTERWOVEN BACKGROUND PATTERN (Identik dengan PageHeader) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-12"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="gallery-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
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
        <rect width="100%" height="100%" fill="url(#gallery-pattern)" />
      </svg>

      {/* Ambient Lighting Gradients */}
      <div className="pointer-events-none absolute -top-36 -left-36 h-[500px] w-[500px] rounded-full bg-emerald-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -right-36 h-[500px] w-[500px] rounded-full bg-teal-300/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-emerald-500/15 blur-3xl" />

      {/* ====================================================================== */}
      {/* DESKTOP LAYOUT (lg: & xl:): CONSTELLATION POLAROID ORBIT               */}
      {/* ====================================================================== */}
      <div className="hidden lg:block relative max-w-7xl mx-auto h-[780px] xl:h-[840px] px-4 select-none">

        {/* CENTERPIECE: Bold Typography + Live Action Anchor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-md xl:max-w-lg text-center px-8 py-8 rounded-3xl bg-emerald-800/80 backdrop-blur-md border border-emerald-400/30 shadow-2xl">
          <h2 className="text-2xl xl:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-xs">
            Merekam Jejak, Merawat Harapan Bersama SIGMA
          </h2>

          <p className="text-xs xl:text-sm text-emerald-100/90 font-medium leading-relaxed mt-2.5 max-w-sm mx-auto">
            Dokumentasi hangat aksi Kader GARUDA, sosialisasi kesehatan reproduksi, dan senyum ceria siswa Indonesia.
          </p>

          <p className="text-[10px] text-emerald-200/70 font-semibold mt-3">
            💡 Arahkan kursor atau klik foto untuk memperbesar
          </p>
        </div>

        {/* 12 ORBIT POLAROID CARDS (Positioned without overlapping) */}
        {GALLERY_PHOTOS.map((photo, idx) => (
          <div
            key={photo.id}
            style={photo.desktopPos}
            onClick={() => setActivePhotoIdx(idx)}
            className={`absolute z-10 w-36 xl:w-44 transition-all duration-300 transform ${photo.tilt} hover:rotate-0 hover:scale-115 hover:z-30 cursor-pointer group`}
          >
            {/* Polaroid Frame */}
            <div className="bg-white p-2 xl:p-2.5 pb-4 xl:pb-5 rounded-2xl shadow-xl border border-white/90 group-hover:shadow-2xl transition-shadow duration-300">
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  unoptimized
                  sizes="(max-width: 1200px) 160px, 190px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/20 transition-colors flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 text-emerald-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-md">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Polaroid Bottom Label */}
              <div className="mt-2 text-center">
                <p className="text-[10px] xl:text-[11px] font-black text-slate-800 tracking-tight truncate leading-tight">
                  {photo.title}
                </p>
                <p className="text-[8px] xl:text-[9px] font-bold text-emerald-700 uppercase tracking-wider mt-0.5">
                  {photo.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ====================================================================== */}
      {/* MOBILE & TABLET LAYOUT (< lg): CENTERPIECE + HORIZONTAL STREAM         */}
      {/* ====================================================================== */}
      <div className="lg:hidden relative z-10 space-y-8 px-4 sm:px-6 max-w-3xl mx-auto">
        {/* Centerpiece Header on Mobile */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-100 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>MOMEN &amp; DOKUMENTASI</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
            Merekam Jejak, Merawat Harapan Bersama SIGMA
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed max-w-md mx-auto">
            Dokumentasi hangat aksi Kader GARUDA, sosialisasi kesehatan reproduksi, dan senyum ceria siswa Indonesia.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/kegiatan"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs shadow-md active:scale-98"
            >
              <span>Semua Dokumentasi</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setActivePhotoIdx(0)}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-white/30 text-white font-bold text-xs active:scale-98 cursor-pointer"
            >
              <Camera className="h-3.5 w-3.5" />
              <span>Buka Galeri (12)</span>
            </button>
          </div>
        </div>

        {/* Horizontal Snap-Scroll Stream */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-emerald-200/90 font-bold px-1">
            <span>Geser untuk melihat momen →</span>
            <span>12 Foto Dokumentasi</span>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x snap-mandatory">
            {GALLERY_PHOTOS.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIdx(idx)}
                className={`snap-center shrink-0 w-44 sm:w-52 transition-transform transform ${photo.tilt} active:scale-95 cursor-pointer`}
              >
                <div className="bg-white p-2.5 pb-4 rounded-2xl shadow-lg border border-white/90">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-black text-slate-800 tracking-tight truncate">
                      {photo.title}
                    </p>
                    <p className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider mt-0.5">
                      {photo.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* LIGHTBOX MODAL FULLSCREEN VIEWER (PREVIEW RESOLUSI PENUH)              */}
      {/* ====================================================================== */}
      {activePhoto && activePhotoIdx !== null && (
        <div
          onClick={() => setActivePhotoIdx(null)}
          className="fixed inset-0 z-150 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Main Modal Box (Prevent click bubbling) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 text-slate-800 animate-in zoom-in-95 duration-200"
          >
            {/* Top Bar of Modal */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Foto {activePhotoIdx + 1} dari {GALLERY_PHOTOS.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActivePhotoIdx(null)}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Photo Preview Canvas */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[65vh] bg-slate-900 flex items-center justify-center overflow-hidden">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                unoptimized
                className="object-contain"
                priority
              />

              {/* Prev & Next Buttons on Image */}
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIdx((prev) =>
                    prev === null || prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1
                  )
                }
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg backdrop-blur-xs transition-all cursor-pointer"
                aria-label="Sebelumnya"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActivePhotoIdx((prev) =>
                    prev === null || prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg backdrop-blur-xs transition-all cursor-pointer"
                aria-label="Selanjutnya"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Bottom Caption & Details */}
            <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  {activePhoto.title}
                </h3>
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1 font-medium">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{activePhoto.location}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  href="/kegiatan"
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center space-x-1.5"
                >
                  <span>Lihat di Halaman Kegiatan</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
