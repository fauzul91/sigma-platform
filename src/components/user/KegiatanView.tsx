"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Camera,
  Download,
  ArrowLeft,
} from "lucide-react";
import { userService } from "@/services/user/userService";
import { EventItem } from "@/types";
import PageHeader from "@/components/shared/PageHeader";

interface PhotoMoment {
  id: string;
  photoUrl: string;
  imgIndex: number;
  event: EventItem;
}

const ITEMS_PER_PAGE = 9; // 3x3 grid per page matching reference

export default function KegiatanView() {
  const [eventItems, setEventItems] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Active filter tab: "all" or week number as string ("1", "2", "3", etc.)
  const [activeTab, setActiveTab] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fullscreen Cinema Lightbox state (index in filteredMoments)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    userService.getEventItems().then((data) => {
      setEventItems(data);
      setIsLoading(false);
    });
  }, []);

  // Compute available weeks strictly from real existing events in DB
  const availableWeeks = useMemo(() => {
    const weeksSet = new Set<number>();
    eventItems.forEach((ev) => {
      if (typeof ev.week === "number" && !isNaN(ev.week)) {
        weeksSet.add(ev.week);
      }
    });
    // Sort weeks: normal weeks ascending, and week 99 (Penutupan) at the very end
    return Array.from(weeksSet).sort((a, b) => {
      if (a === 99) return 1;
      if (b === 99) return -1;
      return a - b;
    });
  }, [eventItems]);

  // Flatten event photos into individual photo moments
  const allMoments: PhotoMoment[] = useMemo(() => {
    const list: PhotoMoment[] = [];
    eventItems.forEach((ev) => {
      const photos = (ev.images || []).filter(Boolean);
      if (photos.length === 0) {
        // Fallback placeholder if no photos
        list.push({
          id: `${ev.id}_0`,
          photoUrl:
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
          imgIndex: 0,
          event: ev,
        });
      } else {
        photos.forEach((url, idx) => {
          list.push({
            id: `${ev.id}_${idx}`,
            photoUrl: url,
            imgIndex: idx,
            event: ev,
          });
        });
      }
    });
    return list;
  }, [eventItems]);

  // Filter moments according to activeTab
  const filteredMoments = useMemo(() => {
    if (activeTab === "all") return allMoments;
    const weekNum = parseInt(activeTab, 10);
    return allMoments.filter((m) => (m.event.week ?? 1) === weekNum);
  }, [allMoments, activeTab]);

  // Find representative event highlight for currently selected week
  const currentWeekEvent = useMemo(() => {
    if (activeTab === "all") return null;
    const weekNum = parseInt(activeTab, 10);
    return eventItems.find((ev) => (ev.week ?? 1) === weekNum) || null;
  }, [eventItems, activeTab]);

  // Currently active moment inside the lightbox
  const currentMoment =
    lightboxIndex !== null && filteredMoments[lightboxIndex]
      ? filteredMoments[lightboxIndex]
      : null;

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredMoments.length / ITEMS_PER_PAGE));
  const paginatedMoments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMoments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMoments, currentPage]);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    setCurrentPage(1);
    setLightboxIndex(null);
  };

  const openLightbox = (indexInFiltered: number) => {
    setLightboxIndex(indexInFiltered);
  };

  const closeModal = () => {
    setLightboxIndex(null);
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null && filteredMoments.length > 0) {
      setLightboxIndex((prev) => (prev! + 1) % filteredMoments.length);
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null && filteredMoments.length > 0) {
      setLightboxIndex(
        (prev) => (prev! - 1 + filteredMoments.length) % filteredMoments.length
      );
    }
  };

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredMoments.length]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
    setTouchStartX(null);
  };

  // Direct High-Resolution Image Download
  const handleDownload = async (url: string, index: number, weekNum?: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const weekLabel = weekNum ? `Minggu-${weekNum}` : "Dokumentasi";
      link.download = `SIGMA-2026-${weekLabel}-Foto-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* 1. Page Header */}
      <PageHeader
        title="GALERI KEGIATAN"
        description="Menelusuri jejak kampanye, seminar sosialisasi, dan pelatihan pendampingan sebaya yang dilaksanakan oleh Kader GARUDA secara berkala."
        badge="DOKUMENTASI AKSI"
        type="kegiatan"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12">
        {/* Title Header */}
        <div className="mb-6 sm:mb-8 text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-dark tracking-tight leading-tight">
            Galeri Momen Kegiatan <span className="text-primary">SIGMA 2026</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm font-semibold text-slate-600">
            Tangkap semangat, keceriaan, dan dedikasi aksi Kader GARUDA di lapangan!
          </p>
        </div>

        {/* 2. Outer White Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 md:p-10 shadow-xs space-y-6 sm:space-y-8">

          {/* Top Filter Pills: Clean Emerald & Neutral Style */}
          {isLoading ? (
            <div className="flex items-center gap-2.5 pb-2">
              <div className="h-8 w-28 bg-slate-100 animate-pulse rounded-xl" />
              <div className="h-8 w-24 bg-slate-100 animate-pulse rounded-xl" />
            </div>
          ) : (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
              {/* All tab */}
              <button
                onClick={() => handleTabChange("all")}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer shadow-xs border ${activeTab === "all"
                  ? "bg-primary text-white border-primary shadow-sm ring-2 ring-emerald-500/20"
                  : "bg-slate-100 hover:bg-emerald-50/80 text-slate-700 hover:text-emerald-900 border-slate-200/80 hover:border-emerald-200"
                  }`}
              >
                Semua Momen
              </button>

              {/* Dynamic Week / Category Pills - Strictly from actual database events */}
              {availableWeeks.map((weekNum) => {
                const isActive = activeTab === weekNum.toString();
                const label = weekNum === 99 ? "Penutupan" : `Minggu ke-${weekNum}`;
                return (
                  <button
                    key={weekNum}
                    onClick={() => handleTabChange(weekNum.toString())}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer shadow-xs border ${isActive
                      ? "bg-primary text-white border-primary shadow-sm ring-2 ring-emerald-500/20"
                      : "bg-slate-100 hover:bg-emerald-50/80 text-slate-700 hover:text-emerald-900 border-slate-200/80 hover:border-emerald-200"
                      }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Week Highlight Banner Card (1 info per week as requested) */}
          {currentWeekEvent ? (
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50/40 to-slate-50 rounded-2xl p-5 sm:p-6 border border-emerald-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5 animate-in fade-in duration-200">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                    {currentWeekEvent.week === 99
                      ? "Highlight Agenda Acara Penutupan"
                      : `Highlight Agenda Minggu ke-${currentWeekEvent.week}`}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                    {currentWeekEvent.date}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {currentWeekEvent.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {currentWeekEvent.description}
                </p>
              </div>

              <div className="flex flex-wrap md:flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-emerald-200/60 pt-3 md:pt-0 md:pl-5">
                <div className="px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs flex items-center gap-2 text-xs text-slate-700 font-bold">
                  <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="truncate max-w-[180px]">{currentWeekEvent.location}</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs flex items-center gap-2 text-xs text-slate-700 font-bold">
                  <Users className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{currentWeekEvent.attendees} Peserta Terlibat</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-emerald-100/80 border border-emerald-200/90 shadow-2xs flex items-center gap-2 text-xs text-emerald-950 font-bold">
                  <Camera className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span>{filteredMoments.length} Foto Dokumentasi</span>
                </div>
              </div>
            </div>
          ) : activeTab === "all" ? (
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <div>
                  <p className="font-extrabold text-slate-800 text-sm">
                    Seluruh Galeri Dokumentasi Aksi Kader GARUDA SIGMA 2026
                  </p>
                  <p className="text-slate-500 text-xs">
                    Klik tab filter di atas untuk melihat rangkuman agenda khusus dan arsip foto per minggu.
                  </p>
                </div>
              </div>
              <span className="font-bold px-3 py-1 bg-white rounded-lg border border-slate-200 text-slate-700 shadow-2xs shrink-0">
                Total {allMoments.length} Foto Tersedia
              </span>
            </div>
          ) : null}

          {/* 3. 3x3 Photo Gallery Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {Array.from({ length: 9 }).map((_, idx) => (
                <div
                  key={idx}
                  className="aspect-[4/3] rounded-2xl bg-slate-100 animate-pulse border border-slate-200/60"
                />
              ))}
            </div>
          ) : paginatedMoments.length === 0 ? (
            <div className="text-center py-16 px-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <Camera className="h-10 w-10 text-slate-300 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-700">Belum ada foto dokumentasi</h4>
              <p className="text-xs text-slate-400 mt-1">
                Foto dokumentasi untuk minggu ini akan segera diperbarui.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {paginatedMoments.map((moment, idxOnPage) => {
                const absoluteIndex = (currentPage - 1) * ITEMS_PER_PAGE + idxOnPage;
                return (
                  <div
                    key={moment.id}
                    onClick={() => openLightbox(absoluteIndex)}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    {/* Distinctive Folder Notch Tab in Top-Left */}
                    <div className="absolute top-0 left-4 z-20 px-3.5 py-1 bg-white/95 rounded-b-lg border-x border-b border-slate-200 text-[10px] font-black tracking-wider uppercase text-emerald-800 shadow-2xs backdrop-blur-xs">
                      {moment.event.week === 99
                        ? "Penutupan"
                        : moment.event.week
                        ? `Minggu ${moment.event.week}`
                        : "Momen"}
                    </div>

                    {/* High Quality Photo */}
                    <img
                      src={moment.photoUrl}
                      alt={moment.event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Overlay on Hover with Title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-5 flex flex-col justify-end text-white z-10">
                      <h4 className="font-extrabold text-xs sm:text-sm leading-snug line-clamp-2 drop-shadow-sm">
                        {moment.event.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-[11px] text-emerald-300 font-bold mt-1.5 drop-shadow-sm">
                        <span>{moment.event.date}</span>
                        <span>•</span>
                        <span>{moment.event.attendees} Peserta</span>
                      </div>
                    </div>

                    {/* Emerald Action Button `>` in Bottom-Right Corner */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(absoluteIndex);
                      }}
                      className="absolute bottom-3.5 right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg border border-emerald-400/40 transition-transform group-hover:scale-110 active:scale-95 cursor-pointer"
                      title="Buka Foto Penuh"
                    >
                      <ChevronRight className="h-5 w-5 font-black" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* 4. Bottom-Right Pagination Numbers [ 1 ] [ 2 ] [ 3 ] [ 4 ] */}
          {totalPages > 1 && (
            <div className="pt-4 flex justify-end items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-xl font-extrabold text-xs flex items-center justify-center transition-all cursor-pointer shadow-xs border ${isActive
                      ? "bg-primary text-white border-primary shadow-sm ring-2 ring-emerald-500/20"
                      : "bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border-slate-200 hover:border-emerald-200"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* 5. PHOTO VIEWER MODAL (MATCHING HOMEPAGE SIGMA GALLERY UX) */}
      {currentMoment && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200 select-none overflow-y-auto"
          onClick={closeModal}
        >
          {/* Main Modal Box (Prevent click bubbling) */}
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 text-slate-800 animate-in zoom-in-95 duration-200 my-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar of Modal */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center space-x-2.5">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
                  {currentMoment.event.week === 99
                    ? "Penutupan Program"
                    : currentMoment.event.week
                    ? `Minggu ke-${currentMoment.event.week}`
                    : "Momen Kegiatan"}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Foto {lightboxIndex + 1} dari {filteredMoments.length}
                </span>
              </div>

              {/* Top Actions: Unduh & Close */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleDownload(
                      currentMoment.photoUrl,
                      lightboxIndex,
                      currentMoment.event.week
                    )
                  }
                  className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center gap-1.5 shadow-xs border border-emerald-700/30 active:scale-95 transition-all cursor-pointer"
                  title="Unduh foto resolusi asli"
                >
                  <Download className="h-3.5 w-3.5 stroke-[2.5]" />
                  <span>Unduh</span>
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                  aria-label="Tutup"
                  title="Tutup (ESC)"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Photo Preview Canvas */}
            <div
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[56vh] sm:max-h-[62vh] bg-slate-950 flex items-center justify-center overflow-hidden group"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Prev & Next Floating Buttons on Image */}
              {filteredMoments.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg backdrop-blur-xs transition-all cursor-pointer active:scale-95"
                  title="Foto Sebelumnya (←)"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
                </button>
              )}

              {/* The High-Resolution Photo */}
              <img
                src={currentMoment.photoUrl}
                alt={currentMoment.event.title}
                className="w-full h-full object-contain select-none"
              />

              {filteredMoments.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg backdrop-blur-xs transition-all cursor-pointer active:scale-95"
                  title="Foto Selanjutnya (→)"
                  aria-label="Selanjutnya"
                >
                  <ChevronRight className="h-5 w-5 stroke-[2.5]" />
                </button>
              )}
            </div>

            {/* Bottom Caption & Meta Details */}
            <div className="p-4 sm:p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-t border-slate-100">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight truncate">
                  {currentMoment.event.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1 font-medium">
                  <span className="flex items-center gap-1 text-slate-600">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-[200px] sm:max-w-xs">{currentMoment.event.location}</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{currentMoment.event.date}</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Users className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{currentMoment.event.attendees} Peserta</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
