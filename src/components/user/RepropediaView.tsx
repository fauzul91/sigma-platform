"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowUpRight,
  Info,
  Maximize2
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

export default function RepropediaView() {
  const searchParams = useSearchParams();
  const viewerRef = useRef<HTMLDivElement>(null);

  // Initialize active bab based on URL query param or fallback to Bab 1
  const [activeBabId, setActiveBabId] = useState<number>(() => {
    const babParam = searchParams.get("bab");
    if (babParam) {
      const parsed = parseInt(babParam, 10);
      if (parsed >= 1 && parsed <= REPROPEDIA_SUB_BABS.length) {
        return parsed;
      }
    }
    return 1;
  });

  const activeBab =
    REPROPEDIA_SUB_BABS.find((item) => item.id === activeBabId) ||
    REPROPEDIA_SUB_BABS[0];

  // Sync if URL query param changes externally
  useEffect(() => {
    const babParam = searchParams.get("bab");
    if (babParam) {
      const parsed = parseInt(babParam, 10);
      if (parsed >= 1 && parsed <= REPROPEDIA_SUB_BABS.length) {
        setActiveBabId(parsed);
      }
    }
  }, [searchParams]);

  const handleSelectBab = (bab: RepropediaSubBab) => {
    setActiveBabId(bab.id);

    // Update query string smoothly without full page refresh
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("bab", bab.id.toString());
      window.history.replaceState({}, "", url.toString());

      // On mobile / tablet screens, scroll down to the PDF viewer container
      if (window.innerWidth < 1024 && viewerRef.current) {
        viewerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* 1. Page Header */}
      <PageHeader
        title="REPROPEDIA"
        description="Pusat literasi kesehatan reproduksi remaja, materi edukasi terstruktur, dan panduan tumbuh kembang terpercaya."
        badge="MODUL RESMI"
        type="repropedia"
      />

      {/* 2. Document Summary Banner Bar (Matches Wireframe Reference) */}
      <div className="border-b border-slate-200/80 bg-white sticky top-0 z-20 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider mb-0.5">
              <span>E-Book Resmi SIGMA Platform</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              Repropedia: Modul Kesehatan Reproduksi Remaja
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Format: Dokumen PDF • 7 Sub-Bab Utama • {TOTAL_PAGES} Halaman • 3.7 MB
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={PDF_FILE_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
              title="Buka PDF di Tab Baru"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Buka Tab Baru</span>
            </a>
            <a
              href={PDF_FILE_PATH}
              download="Buku_Repropedia_SIGMA.pdf"
              className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2 rounded-xl bg-primary hover:bg-emerald-700 text-white text-xs font-extrabold shadow-xs hover:shadow-sm active:scale-98 transition-all"
              title="Unduh file PDF"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Unduh PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10">
        {/* Mobile Quick Selector (Horizontal Scrollable Tabs for Mobile UX) */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              Pilih Sub-Bab Materi:
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {activeBab.babNumber} • {activeBab.pageRange}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
            {REPROPEDIA_SUB_BABS.map((bab) => {
              const isActive = bab.id === activeBabId;
              return (
                <button
                  key={bab.id}
                  onClick={() => handleSelectBab(bab)}
                  className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border ${isActive
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  <span>{bab.babNumber}</span>
                  <span className="opacity-60">•</span>
                  <span className="max-w-[120px] truncate">{bab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split Layout: Left Panel (Daftar Isi 35%) & Right Panel (PDF Viewer 65%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* ============================================================ */}
          {/* PANEL KIRI: DAFTAR ISI (35% DI DESKTOP / lg:col-span-5)      */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 space-y-4">
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
                      Klik sub-bab untuk membuka halaman di PDF
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
                  const isActive = bab.id === activeBabId;
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
                          className={`${isActive ? "text-emerald-700 font-extrabold" : "text-slate-400 group-hover:text-emerald-600"
                            }`}
                        >
                          Menuju Halaman {bab.page}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold group-hover:underline flex items-center">
                          Lihat Modul <ArrowUpRight className="h-3 w-3 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* PANEL KANAN: PDF VIEWER (65% DI DESKTOP / lg:col-span-7)     */}
          {/* ============================================================ */}
          <div ref={viewerRef} className="lg:col-span-7 lg:sticky lg:top-20 space-y-3">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col">

              {/* PDF Viewer Header Toolbar */}
              <div className="px-4 sm:px-6 py-3 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-black tracking-wide uppercase text-emerald-300">
                    {activeBab.babNumber}
                  </span>
                  <span className="text-slate-400 text-xs">•</span>
                  <span className="text-xs font-bold text-slate-200 truncate max-w-[180px] sm:max-w-xs">
                    {activeBab.title}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                    Hal {activeBab.page} / {TOTAL_PAGES}
                  </span>
                  <a
                    href={`${PDF_FILE_PATH}#page=${activeBab.page}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Buka Layar Penuh"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={PDF_FILE_PATH}
                    download="Buku_Repropedia_SIGMA.pdf"
                    className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                    title="Unduh PDF"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Inline PDF Viewer Frame (Tinggi sticky ~80vh) */}
              <div className="relative w-full h-[540px] sm:h-[640px] lg:h-[78vh] bg-slate-100 flex flex-col justify-between">
                <iframe
                  key={activeBab.page}
                  src={`${PDF_FILE_PATH}#page=${activeBab.page}&toolbar=1&navpanes=0`}
                  title={`Buku Repropedia - ${activeBab.title}`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />

                {/* Mobile Browser Fallback Overlay Hint */}
                <div className="sm:hidden bg-slate-900/90 text-white p-2.5 text-[11px] flex items-center justify-between">
                  <span className="text-slate-300">Kurang nyaman di layar kecil?</span>
                  <a
                    href={`${PDF_FILE_PATH}#page=${activeBab.page}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-400 underline flex items-center gap-1"
                  >
                    Buka PDF Langsung →
                  </a>
                </div>
              </div>

              {/* PDF Viewer Footer Bar */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="font-semibold text-slate-700">
                    Buku Panduan Edukasi Resmi SMPN 4 Sumberjambe
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-[11px] font-bold text-slate-500">
                  <span>Ukuran: ~3.7 MB</span>
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
