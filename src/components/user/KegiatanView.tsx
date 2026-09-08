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

  // Compute available weeks from events
  const availableWeeks = useMemo(() => {
    const weeksSet = new Set<number>();
    eventItems.forEach((ev) => {
      if (ev.week !== undefined && ev.week !== null) {
        weeksSet.add(Number(ev.week));
      }
    });
    // Ensure at least weeks 1 to 6 or sorted existing
    if (weeksSet.size === 0) {
      return [1, 2, 3, 4, 5, 6];
    }
    return Array.from(weeksSet).sort((a, b) => a - b);
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
        title="KEGIATAN & EVENT"
        description="Menelusuri jejak kampanye, seminar sosialisasi, dan pelatihan pendampingan sebaya yang dilaksanakan oleh Kader GARUDA secara berkala."
        badge="DOKUMENTASI AKSI"
        type="kegiatan"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12">
        {/* Title Header matching the reference: "Galeri Momen PIONIR Gadjah Mada 2026" */}
        <div className="mb-6 sm:mb-8 text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-500 tracking-tight leading-tight">
            Galeri Momen Kegiatan SIGMA 2026
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm font-semibold text-slate-700">
            Tangkap semangat, keceriaan, dan dedikasi aksi Kader GARUDA di lapangan!
          </p>
        </div>

        {/* 2. Outer White Container (Exact Reference Aesthetic) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 md:p-10 shadow-xs space-y-6 sm:space-y-8">
          
          {/* Top Filter Pills: "Hari ke-1, Hari ke-2" -> "Minggu ke-1, Minggu ke-2" */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
            {/* All tab */}
            <button
              onClick={() => handleTabChange("all")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer shadow-xs border ${
                activeTab === "all"
                  ? "bg-amber-400 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-400/40"
                  : "bg-amber-100/70 hover:bg-amber-200/80 text-amber-950 border-amber-200/80"
              }`}
            >
              Semua Momen
            </button>

            {/* Week Pills */}
            {availableWeeks.map((weekNum) => {
              const isActive = activeTab === weekNum.toString();
              return (
                <button
                  key={weekNum}
                  onClick={() => handleTabChange(weekNum.toString())}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer shadow-xs border ${
                    isActive
                      ? "bg-amber-400 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-400/40"
                      : "bg-amber-100/70 hover:bg-amber-200/80 text-amber-950 border-amber-200/80"
                  }`}
                >
                  Minggu ke-{weekNum}
                </button>
              );
            })}

            {/* Special category tabs */}
            <button
              onClick={() => handleTabChange("action")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer shadow-xs border ${
                activeTab === "action"
                  ? "bg-amber-400 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-400/40"
                  : "bg-amber-100/70 hover:bg-amber-200/80 text-amber-950 border-amber-200/80"
              }`}
            >
              Action Plan
            </button>
            <button
              onClick={() => handleTabChange("closing")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer shadow-xs border ${
                activeTab === "closing"
                  ? "bg-amber-400 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-400/40"
                  : "bg-amber-100/70 hover:bg-amber-200/80 text-amber-950 border-amber-200/80"
              }`}
            >
              Penutupan
            </button>
          </div>

          {/* Week Highlight Banner Card (1 info per week as requested) */}
          {currentWeekEvent ? (
            <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-amber-50/60 rounded-2xl p-5 sm:p-6 border border-emerald-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 animate-in fade-in duration-200">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                    Highlight Agenda Minggu ke-{currentWeekEvent.week}
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
                <div className="px-3 py-1.5 rounded-xl bg-amber-100/70 border border-amber-200/80 shadow-2xs flex items-center gap-2 text-xs text-amber-950 font-black">
                  <Camera className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>{filteredMoments.length} Foto Dokumentasi</span>
                </div>
              </div>
            </div>
          ) : activeTab === "all" ? (
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Sparkles className="h-4 w-4" />
                </div>
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
                    {/* Distinctive Folder Notch Tab in Top-Left (Exact Reference Style) */}
                    <div className="absolute top-0 left-4 z-20 px-3.5 py-1 bg-white/95 rounded-b-lg border-x border-b border-slate-200 text-[10px] font-black tracking-wider uppercase text-slate-700 shadow-2xs backdrop-blur-xs">
                      {moment.event.week ? `Minggu ${moment.event.week}` : "Momen"}
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
                      <div className="flex items-center space-x-2 text-[11px] text-amber-300 font-bold mt-1.5 drop-shadow-sm">
                        <span>{moment.event.date}</span>
                        <span>•</span>
                        <span>{moment.event.attendees} Peserta</span>
                      </div>
                    </div>

                    {/* Signature Purple/Violet Action Button `>` in Bottom-Right Corner (Exact Reference Style) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(absoluteIndex);
                      }}
                      className="absolute bottom-3.5 right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 active:scale-95 cursor-pointer"
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
                    className={`w-9 h-9 rounded-xl font-extrabold text-xs flex items-center justify-center transition-all cursor-pointer shadow-xs border ${
                      isActive
                        ? "bg-amber-400 text-slate-950 border-amber-500 shadow-sm ring-2 ring-amber-400/40"
                        : "bg-amber-200/90 hover:bg-amber-300 text-slate-900 border-amber-300"
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

      {/* 5. FLOATING CARD PHOTO VIEWER (Exact Match to Reference Screenshot) */}
      {currentMoment && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-3 sm:p-6 md:p-8 animate-in fade-in duration-200 select-none"
          onClick={closeModal}
        >
          {/* Main Card Container */}
          <div
            className="bg-[#FFFDF7] w-full max-w-4xl lg:max-w-5xl rounded-3xl border border-amber-200/90 shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Title Left, Actions Right */}
            <div className="flex items-center justify-between pb-3 sm:pb-5">
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                  {currentMoment.event.week
                    ? `Minggu ke-${currentMoment.event.week}`
                    : "Momen Kegiatan"}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5 truncate max-w-xs sm:max-w-md md:max-w-xl">
                  {currentMoment.event.title}
                </p>
              </div>

              {/* Action Buttons: Yellow [Unduh] & Purple [✕] */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    handleDownload(
                      currentMoment.photoUrl,
                      lightboxIndex,
                      currentMoment.event.week
                    )
                  }
                  className="px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-xs border border-amber-500/80 active:scale-95 transition-all cursor-pointer"
                  title="Unduh foto resolusi asli"
                >
                  <Download className="h-4 w-4 stroke-[2.5]" />
                  <span>Unduh</span>
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-xs border border-purple-700/40 active:scale-95 transition-all cursor-pointer"
                  title="Tutup (ESC)"
                >
                  <X className="h-5 w-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Photo Stage Frame with Yellow Side Chevrons */}
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center aspect-[4/3] sm:aspect-[16/10] max-h-[66vh] sm:max-h-[72vh] border border-slate-200/80 shadow-inner group"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Folder Notch Tab in Top-Left */}
              <div className="absolute top-0 left-5 z-20 px-3.5 py-1 bg-[#FFFDF7]/95 rounded-b-lg border-x border-b border-amber-200/80 text-[10px] font-black tracking-wider uppercase text-slate-700 shadow-2xs backdrop-blur-xs hidden sm:block">
                {currentMoment.event.week ? `Minggu ${currentMoment.event.week}` : "Momen"}
              </div>

              {/* Left Yellow Arrow Button */}
              {filteredMoments.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2.5 sm:left-4 z-30 w-8 h-10 sm:w-10 sm:h-12 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-500/80 flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 stroke-[3]" />
                </button>
              )}

              {/* The High-Resolution Photo */}
              <img
                src={currentMoment.photoUrl}
                alt={currentMoment.event.title}
                className="w-full h-full object-contain"
              />

              {/* Right Yellow Arrow Button */}
              {filteredMoments.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2.5 sm:right-4 z-30 w-8 h-10 sm:w-10 sm:h-12 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-500/80 flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  title="Foto Selanjutnya"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 stroke-[3]" />
                </button>
              )}
            </div>

            {/* Bottom Subtle Photo Counter & Meta */}
            <div className="flex items-center justify-between pt-3 px-1 text-[11px] sm:text-xs text-slate-500 font-bold">
              <span className="truncate max-w-[200px] sm:max-w-md">
                {currentMoment.event.date} • {currentMoment.event.location}
              </span>
              <span className="shrink-0 font-extrabold text-amber-600 bg-amber-100/60 px-2.5 py-0.5 rounded-md border border-amber-200">
                Foto {lightboxIndex + 1} dari {filteredMoments.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
