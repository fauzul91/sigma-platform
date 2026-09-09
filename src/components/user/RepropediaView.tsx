"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Download,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Layers,
  ArrowUpRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  LayoutGrid,
  Zap,
  FileText
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

export interface RepropediaSubBab {
  id: number;
  babNumber: string;
  title: string;
  page: number;
  pageRange: string;
  summary: string;
}

export const REPROPEDIA_SUB_BABS: RepropediaSubBab[] = [
  {
    id: 1,
    babNumber: "Bab 01",
    title: "Kesehatan Reproduksi",
    page: 4,
    pageRange: "Hal. 4 - 5",
    summary:
      "Pengenalan dasar kesehatan reproduksi remaja, perubahan fisik & biologis masa pubertas, serta panduan menjaga kebersihan organ reproduksi sejak dini tanpa rasa malu.",
  },
  {
    id: 2,
    babNumber: "Bab 02",
    title: "Hak-hak Anak",
    page: 6,
    pageRange: "Hal. 6",
    summary:
      "Memahami 4 pilar hak fundamental anak (hak hidup, tumbuh kembang, perlindungan khusus, dan partisipasi) serta perlindungan hukum bagi setiap remaja.",
  },
  {
    id: 3,
    babNumber: "Bab 03",
    title: "Risiko & Dampak Perkawinan Anak",
    page: 7,
    pageRange: "Hal. 7 - 9",
    summary:
      "Menelaah risiko komprehensif perkawinan dini terhadap kesiapan fisik, organ reproduksi, kesehatan mental, bahaya stunting, putus sekolah, hingga regulasi batas minimal usia 19 tahun sesuai UU No. 16/2019.",
  },
  {
    id: 4,
    babNumber: "Bab 04",
    title: "Bentuk-bentuk Kekerasan Seksual",
    page: 10,
    pageRange: "Hal. 10 - 13",
    summary:
      "Mengenali ragam bentuk pelecehan dan kekerasan seksual, baik verbal, non-fisik, fisik, hingga kekerasan di ranah digital (KBGO) serta sinyal bahaya (red flags) dalam relasi.",
  },
  {
    id: 5,
    babNumber: "Bab 05",
    title: "Pencegahan Kekerasan Seksual",
    page: 14,
    pageRange: "Hal. 14 - 17",
    summary:
      "Panduan praktis menjaga batasan tubuh (body boundaries & consent), berani menolak perlakuan yang tidak pantas, serta membangun lingkungan pergaulan sebaya yang aman.",
  },
  {
    id: 6,
    babNumber: "Bab 06",
    title: "Apa yang Harus Dilakukan Jika Mengalami Kekerasan Seksual",
    page: 18,
    pageRange: "Hal. 18 - 20",
    summary:
      "Langkah tanggap darurat, penanganan trauma, cara mencari pertolongan yang aman, alur rujukan medis & psikologis, serta kontak layanan bantuan & pendampingan resmi.",
  },
  {
    id: 7,
    babNumber: "Bab 07",
    title: "Bermain Teka-Teki Silang",
    page: 21,
    pageRange: "Hal. 21 - 24",
    summary:
      "Lembar aktivitas edukasi interaktif dan kuis Teka-Teki Silang (TTS) tematik untuk mengevaluasi dan menguji pemahaman materi kesehatan reproduksi secara seru dan menyenangkan.",
  },
];

const PDF_FILE_PATH = "/assets/buku_repropedia.pdf";
const TOTAL_PAGES = 24;

// Helper to resolve which Bab a page belongs to
export function getBabForPage(page: number): RepropediaSubBab {
  if (page <= 5) return REPROPEDIA_SUB_BABS[0];
  if (page === 6) return REPROPEDIA_SUB_BABS[1];
  if (page <= 9) return REPROPEDIA_SUB_BABS[2];
  if (page <= 13) return REPROPEDIA_SUB_BABS[3];
  if (page <= 17) return REPROPEDIA_SUB_BABS[4];
  if (page <= 20) return REPROPEDIA_SUB_BABS[5];
  return REPROPEDIA_SUB_BABS[6];
}

export function getPageSectionTitle(page: number): string {
  if (page === 1) return "Cover Depan";
  if (page === 2) return "Kata Pengantar";
  if (page === 3) return "Daftar Isi Modul";
  const bab = getBabForPage(page);
  return `${bab.babNumber}: ${bab.title}`;
}

export default function RepropediaView() {
  const searchParams = useSearchParams();
  const viewerRef = useRef<HTMLDivElement>(null);
  const readerStageRef = useRef<HTMLDivElement>(null);

  // View Mode: "interactive" (Fast WebP pages) or "pdf" (native iframe)
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">("interactive");

  // Current page state (1 to 24, default page 4 = Bab 1)
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const p = parseInt(pageParam, 10);
      if (p >= 1 && p <= TOTAL_PAGES) return p;
    }
    const babParam = searchParams.get("bab");
    if (babParam) {
      const b = parseInt(babParam, 10);
      const found = REPROPEDIA_SUB_BABS.find((item) => item.id === b);
      if (found) return found.page;
    }
    return 4; // Start at Bab 1
  });

  const [zoom, setZoom] = useState<number>(1);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Resolve PDF viewer URL: on mobile use Google Docs Viewer for seamless in-page rendering
  const getPdfViewerUrl = useCallback(() => {
    if (typeof window === "undefined") return PDF_FILE_PATH;
    if (!isMobile) {
      return `${PDF_FILE_PATH}#page=${currentPage}&toolbar=1&navpanes=0`;
    }
    const origin = window.location.origin;
    const isLocal = origin.includes("localhost") || origin.includes("127.0.0.1");
    const fullPdfUrl = isLocal
      ? `https://ruangsigma.site${PDF_FILE_PATH}`
      : `${origin}${PDF_FILE_PATH}`;
    return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fullPdfUrl)}`;
  }, [isMobile, currentPage]);

  // Active bab resolved dynamically from current page
  const activeBab = getBabForPage(currentPage);

  // Sync URL params without page reload
  const syncUrl = useCallback((page: number) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("page", page.toString());
      const bab = getBabForPage(page);
      url.searchParams.set("bab", bab.id.toString());
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      const target = Math.max(1, Math.min(TOTAL_PAGES, page));
      if (target !== currentPage) {
        setIsImageLoading(true);
        setCurrentPage(target);
        syncUrl(target);
      }
    },
    [currentPage, syncUrl]
  );

  const goToNextPage = useCallback(() => {
    if (currentPage < TOTAL_PAGES) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, goToPage]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  // Pre-load adjacent pages for instantaneous 0ms page turns
  useEffect(() => {
    if (typeof window === "undefined") return;
    const preload = (p: number) => {
      if (p >= 1 && p <= TOTAL_PAGES) {
        const img = new window.Image();
        img.src = `/assets/repropedia/pages/page_${p}.webp`;
      }
    };
    preload(currentPage - 1);
    preload(currentPage + 1);
    preload(currentPage + 2);
  }, [currentPage]);

  // Keyboard navigation (ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "interactive") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goToPrevPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextPage, goToPrevPage, viewMode]);

  // Touch swipe support for mobile ergonomics
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      goToNextPage();
    } else if (distance < -minSwipeDistance) {
      goToPrevPage();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleSelectBab = (bab: RepropediaSubBab) => {
    goToPage(bab.page);
    // Smooth scroll to reader on mobile
    if (typeof window !== "undefined" && window.innerWidth < 1024 && viewerRef.current) {
      viewerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen?.().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => { });
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const handleZoomIn = () => setZoom((z) => Math.min(2, Math.round((z + 0.25) * 100) / 100));
  const handleZoomOut = () => setZoom((z) => Math.max(0.75, Math.round((z - 0.25) * 100) / 100));
  const handleZoomReset = () => setZoom(1);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* 1. Page Header */}
      <PageHeader
        title="REPROPEDIA"
        description="Pusat literasi kesehatan reproduksi remaja, materi edukasi terstruktur, dan panduan tumbuh kembang terpercaya."
        badge="MODUL RESMI"
        type="repropedia"
      />

      {/* 2. Document Summary Banner Bar */}
      <div className="border-b border-slate-200/80 bg-white sticky top-0 z-20 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 py-2.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
          <div>
            <div className="hidden sm:flex items-center space-x-2 text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider mb-0.5">
              <span>E-Book Resmi SIGMA Platform</span>
            </div>
            <h2 className="text-sm sm:text-lg font-black text-slate-900 leading-snug">
              Repropedia: Modul Kesehatan Reproduksi Remaja
            </h2>
            <p className="hidden sm:block text-xs text-slate-500 font-medium mt-0.5">
              7 Sub-Bab Utama • {TOTAL_PAGES} Halaman • Resolusi Tinggi WebP • PDF Lengkap 3.8 MB
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto">
            {/* Mode Switcher Pills */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200/80">
              <button
                onClick={() => setViewMode("interactive")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${viewMode === "interactive"
                    ? "bg-white text-emerald-800 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                  }`}
                title="Mode E-Book Cepat (WebP)"
              >
                <Zap className="h-3.5 w-3.5 text-emerald-600" />
                <span>E-Book Cepat</span>
              </button>
              <button
                onClick={() => setViewMode("pdf")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${viewMode === "pdf"
                    ? "bg-white text-emerald-800 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                  }`}
                title="Mode Dokumen PDF"
              >
                <FileText className="h-3.5 w-3.5 text-slate-500" />
                <span>Dokumen PDF</span>
              </button>
            </div>

            <a
              href={PDF_FILE_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
              title="Buka PDF di Tab Baru"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Buka Tab Baru</span>
            </a>

            <a
              href={PDF_FILE_PATH}
              download="Buku_Repropedia_SIGMA.pdf"
              className="inline-flex items-center space-x-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-primary hover:bg-emerald-700 text-white text-xs font-extrabold shadow-xs hover:shadow-sm active:scale-98 transition-all"
              title="Unduh file PDF"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Unduh PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 py-3 sm:py-6 lg:py-8">
        {/* Mobile Quick Selector */}
        <div className="lg:hidden mb-3">
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              Daftar Sub-Bab:
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              Geser untuk memilih bab →
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {REPROPEDIA_SUB_BABS.map((bab) => {
              const isActive = bab.id === activeBab.id;
              return (
                <button
                  key={bab.id}
                  onClick={() => handleSelectBab(bab)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border cursor-pointer ${isActive
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  <span className="font-mono text-[11px]">{bab.babNumber}</span>
                  <span className="opacity-60">•</span>
                  <span className="max-w-[140px] truncate">{bab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ============================================================ */}
          {/* PANEL KIRI: DAFTAR ISI (lg:col-span-5) - HIDDEN ON MOBILE   */}
          {/* ============================================================ */}
          <div className="hidden lg:block lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 tracking-tight">
                      Daftar Isi &amp; Sub-Bab
                    </h3>
                    <p className="text-[11px] text-slate-400 font-semibold">
                      Klik sub-bab untuk membuka langsung
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-[10px] font-black">
                  7 Bab
                </span>
              </div>

              {/* Sub-Bab Cards List */}
              <div className="mt-4 space-y-3">
                {REPROPEDIA_SUB_BABS.map((bab) => {
                  const isActive = bab.id === activeBab.id;
                  return (
                    <div
                      key={bab.id}
                      onClick={() => handleSelectBab(bab)}
                      className={`group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${isActive
                          ? "bg-emerald-50/50 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20"
                          : "bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80 hover:shadow-2xs"
                        }`}
                    >
                      {/* Card Header: Bab Number & Page Range */}
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase ${isActive
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-700"
                              }`}
                          >
                            {bab.babNumber}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">
                            {bab.pageRange}
                          </span>
                        </div>

                        {isActive ? (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-black text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Sedang Dibaca</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">
                            <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h4
                        className={`text-sm font-extrabold leading-snug transition-colors ${isActive
                            ? "text-emerald-900 font-black"
                            : "text-slate-800 group-hover:text-emerald-700"
                          }`}
                      >
                        {bab.title}
                      </h4>

                      {/* Brief Summary */}
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-medium">
                        {bab.summary}
                      </p>

                      {/* Bottom action cue */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100/80 flex items-center justify-between text-[11px] font-bold">
                        <span
                          className={`${isActive
                              ? "text-emerald-700 font-extrabold"
                              : "text-slate-400 group-hover:text-emerald-600"
                            }`}
                        >
                          Menuju Halaman {bab.page}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold group-hover:underline flex items-center">
                          Buka Halaman <ArrowUpRight className="h-3 w-3 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* PANEL KANAN: OPTIMIZED READER (lg:col-span-7, full on mobile)*/}
          {/* ============================================================ */}
          <div ref={viewerRef} className="w-full lg:col-span-7 lg:sticky lg:top-20 space-y-3">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col">
              {/* Reader Header Toolbar */}
              <div className="px-3 sm:px-6 py-2 sm:py-3 bg-slate-900 text-white flex items-center justify-between gap-2 border-b border-slate-800">
                <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-[11px] sm:text-xs font-black tracking-wide uppercase text-emerald-300 shrink-0">
                    {currentPage >= 4 ? activeBab.babNumber : "Pengantar"}
                  </span>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-xs font-bold text-slate-200 truncate max-w-[120px] sm:max-w-xs">
                    {getPageSectionTitle(currentPage)}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                  {/* Page Indicator */}
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-200 bg-slate-800 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-slate-700">
                    Hal. {currentPage} / {TOTAL_PAGES}
                  </span>

                  {/* Zoom Controls (Interactive Mode only) */}
                  {viewMode === "interactive" && (
                    <div className="hidden sm:flex items-center space-x-1 bg-slate-800 px-1 py-0.5 rounded-lg border border-slate-700">
                      <button
                        onClick={handleZoomOut}
                        disabled={zoom <= 0.75}
                        className="p-1 rounded text-slate-300 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
                        title="Perkecil (-)"
                      >
                        <ZoomOut className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={handleZoomReset}
                        className="px-1.5 py-0.5 text-[10px] font-bold text-slate-300 hover:text-white cursor-pointer"
                        title="Reset Ukuran"
                      >
                        {Math.round(zoom * 100)}%
                      </button>
                      <button
                        onClick={handleZoomIn}
                        disabled={zoom >= 2}
                        className="p-1 rounded text-slate-300 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
                        title="Perbesar (+)"
                      >
                        <ZoomIn className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Filmstrip / Thumbnail Toggle */}
                  {viewMode === "interactive" && (
                    <button
                      onClick={() => setShowThumbnails((prev) => !prev)}
                      className={`p-1.5 rounded-lg transition-colors border cursor-pointer ${showThumbnails
                          ? "bg-emerald-600 border-emerald-500 text-white"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                        }`}
                      title="Tampilkan Galeri Halaman"
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
                    title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-3.5 w-3.5" />
                    ) : (
                      <Maximize2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Reader Main Stage - Maximized Page Focus */}
              <div
                ref={readerStageRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative w-full h-[68vh] sm:h-[74vh] lg:h-[78vh] min-h-[480px] sm:min-h-[600px] bg-slate-950 overflow-hidden flex items-center justify-center p-1 sm:p-3 select-none"
              >
                {viewMode === "interactive" ? (
                  <>
                    {/* Floating Navigation Chevron - Left (Hidden on small mobile to not cover book text) */}
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage <= 1}
                      className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white items-center justify-center shadow-lg backdrop-blur-xs border border-white/10 disabled:opacity-20 disabled:pointer-events-none transition-all active:scale-95 cursor-pointer"
                      title="Halaman Sebelumnya (Panah Kiri)"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>

                    {/* Page Image Container with Zoom Transform - Maximized on Screen */}
                    <div
                      className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: "center center",
                      }}
                    >
                      <div className="relative shadow-2xl rounded-sm sm:rounded-md overflow-hidden bg-white w-full h-full max-w-full max-h-full aspect-[1191/1685] flex items-center justify-center">
                        <img
                          src={`/assets/repropedia/pages/page_${currentPage}.webp`}
                          alt={`Halaman ${currentPage} - ${getPageSectionTitle(currentPage)}`}
                          className="w-auto h-auto max-w-full max-h-full object-contain block mx-auto"
                          onLoad={() => setIsImageLoading(false)}
                          loading="eager"
                        />
                      </div>
                    </div>

                    {/* Floating Navigation Chevron - Right (Hidden on small mobile) */}
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage >= TOTAL_PAGES}
                      className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white items-center justify-center shadow-lg backdrop-blur-xs border border-white/10 disabled:opacity-20 disabled:pointer-events-none transition-all active:scale-95 cursor-pointer"
                      title="Halaman Selanjutnya (Panah Kanan)"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </>
                ) : (
                  /* Mode PDF Asli (Native Desktop or Google Docs Viewer on Mobile) */
                  <div className="w-full h-full flex flex-col bg-slate-900">
                    {isMobile && (
                      <div className="px-3 py-1.5 bg-slate-800 text-slate-300 text-[10px] flex items-center justify-between border-b border-slate-700">
                        <span className="font-semibold text-emerald-300">Viewer PDF Mobile (Google Docs)</span>
                        <a
                          href={PDF_FILE_PATH}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                        >
                          <span>Buka Asli</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                    <iframe
                      src={getPdfViewerUrl()}
                      title={`Buku Repropedia - ${activeBab.title}`}
                      className="w-full h-full border-0 bg-white flex-1"
                    />
                  </div>
                )}
              </div>

              {/* Interactive Mode Bottom Controls & Page Slider */}
              {viewMode === "interactive" && (
                <div className="px-3 sm:px-4 py-2 sm:py-3 bg-white border-t border-slate-100 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2 sm:gap-3">
                    {/* Previous Button */}
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage <= 1}
                      className="px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Sebelumnya</span>
                    </button>

                    {/* Interactive Page Slider */}
                    <div className="flex-1 flex items-center space-x-2 sm:space-x-3 max-w-md mx-auto">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">1</span>
                      <input
                        type="range"
                        min="1"
                        max={TOTAL_PAGES}
                        value={currentPage}
                        onChange={(e) => goToPage(parseInt(e.target.value, 10))}
                        className="w-full h-1.5 sm:h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        title={`Geser Halaman (Saat ini: ${currentPage})`}
                      />
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">{TOTAL_PAGES}</span>
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage >= TOTAL_PAGES}
                      className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-primary hover:bg-emerald-700 text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center space-x-1 transition-all shadow-xs cursor-pointer"
                    >
                      <span className="hidden sm:inline">Selanjutnya</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Discrete Mobile Swipe Cue underneath slider without blocking book */}
                  <div className="sm:hidden text-center text-[10px] text-slate-400 font-medium pt-0.5">
                    💡 Usap layar buku untuk ganti halaman
                  </div>

                  {/* Collapsible Filmstrip / Thumbnail Grid */}
                  {showThumbnails && (
                    <div className="pt-3 mt-1 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold text-slate-700">
                          Pilih Halaman ({TOTAL_PAGES} Halaman):
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700">
                          Sedang di Halaman {currentPage}
                        </span>
                      </div>
                      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
                        {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((pageNum) => {
                          const isSelected = pageNum === currentPage;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              className={`shrink-0 flex flex-col items-center gap-1 group cursor-pointer transition-all ${isSelected ? "scale-105" : "opacity-75 hover:opacity-100"
                                }`}
                            >
                              <div
                                className={`w-14 h-20 rounded-md border-2 overflow-hidden bg-slate-100 relative shadow-xs ${isSelected
                                    ? "border-emerald-600 ring-2 ring-emerald-500/30"
                                    : "border-slate-200 group-hover:border-slate-300"
                                  }`}
                              >
                                <img
                                  src={`/assets/repropedia/pages/page_${pageNum}.webp`}
                                  alt={`Thumbnail Hal ${pageNum}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <span
                                className={`text-[10px] font-bold ${isSelected ? "text-emerald-700 font-extrabold" : "text-slate-500"
                                  }`}
                              >
                                Hal {pageNum}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Reader Footer Info Bar - Hidden on mobile to keep focus on reading */}
              <div className="hidden md:flex px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="font-semibold text-slate-700">
                    Buku Panduan Edukasi Resmi SMPN 4 Sumberjambe
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-[11px] font-bold text-slate-500">
                  <span className="flex items-center space-x-1 text-emerald-700">
                    <Zap className="h-3 w-3 text-emerald-600" />
                    <span>Mode WebP Cepat (Hemat Kuota)</span>
                  </span>
                  <span>•</span>
                  <span>Bahasa: Indonesia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
