"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { userService } from "@/services/user/userService";
import { EventItem } from "@/types";
import UserPagination from "@/components/shared/UserPagination";

export default function KegiatanView() {
  const [eventItems, setEventItems] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [carouselIndices, setCarouselIndices] = useState<
    Record<string, number>
  >({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 4;

  useEffect(() => {
    setIsLoading(true);
    userService.getEventItems().then((data) => {
      setEventItems(data);
      setIsLoading(false);
    });
  }, []);

  const handleNextImage = (eventId: string, maxImages: number) => {
    setCarouselIndices((prev) => {
      const currentIndex = prev[eventId] || 0;
      const nextIndex = (currentIndex + 1) % maxImages;
      return { ...prev, [eventId]: nextIndex };
    });
  };

  const handlePrevImage = (eventId: string, maxImages: number) => {
    setCarouselIndices((prev) => {
      const currentIndex = prev[eventId] || 0;
      const prevIndex = (currentIndex - 1 + maxImages) % maxImages;
      return { ...prev, [eventId]: prevIndex };
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">
            Dokumentasi Kegiatan Kader
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
            Menelusuri jejak kampanye, seminar sosialisasi, dan pelatihan
            pendampingan sebaya yang dilaksanakan oleh Kader GARUDA secara
            berkala.
          </p>
        </div>

        {/* Events list */}
        <div className="space-y-12">
          {isLoading ? (
            <>
              {/* Event Skeleton 1 */}
              <div className="overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-12 min-h-[250px] animate-pulse">
                <div className="md:col-span-5 bg-slate-200 min-h-[250px]" />
                <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-20" />
                    <div className="h-6 bg-slate-200 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-full" />
                      <div className="h-3 bg-slate-200 rounded w-5/6" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4">
                    <div className="h-3 bg-slate-200 rounded" />
                    <div className="h-3 bg-slate-200 rounded" />
                    <div className="h-3 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
              {/* Event Skeleton 2 */}
              <div className="overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-12 min-h-[250px] animate-pulse">
                <div className="md:col-span-5 bg-slate-200 min-h-[250px]" />
                <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-20" />
                    <div className="h-6 bg-slate-200 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-full" />
                      <div className="h-3 bg-slate-200 rounded w-5/6" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4">
                    <div className="h-3 bg-slate-200 rounded" />
                    <div className="h-3 bg-slate-200 rounded" />
                    <div className="h-3 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-12">
              {eventItems
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((event) => {
                  const currentImgIndex = carouselIndices[event.id] || 0;
                  const imagesCount = event.images.length;

                  return (
                    <div
                      key={event.id}
                      className="overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 md:grid-cols-12 animate-in fade-in"
                    >
                      {/* Visual Carousel Column */}
                      <div className="relative md:col-span-5 bg-slate-950 h-64 md:h-auto min-h-[250px] flex items-center justify-center group">
                        <img
                          src={event.images[currentImgIndex]}
                          alt={`Dokumentasi kegiatan ${event.title}: Foto ke-${currentImgIndex + 1}`}
                          className="w-full h-full object-cover transition-all duration-300"
                        />

                        {imagesCount > 1 && (
                          <>
                            {/* Left arrow */}
                            <button
                              onClick={() => handlePrevImage(event.id, imagesCount)}
                              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              aria-label="Foto Sebelumnya"
                            >
                              <ChevronLeft className="h-5 w-5" />
                            </button>

                            {/* Right arrow */}
                            <button
                              onClick={() => handleNextImage(event.id, imagesCount)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              aria-label="Foto Selanjutnya"
                            >
                              <ChevronRight className="h-5 w-5" />
                            </button>

                            {/* Pagination Indicator */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 bg-black/30 px-2.5 py-1 rounded-full">
                              {event.images.map((_, idx) => (
                                <div
                                  key={idx}
                                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                                    currentImgIndex === idx
                                      ? "bg-white w-3"
                                      : "bg-white/50"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Content description column */}
                      <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-emerald-50 text-primary text-[10px] font-extrabold uppercase tracking-wide">
                            <Sparkles className="h-3 w-3" />
                            <span>Sosialisasi</span>
                          </span>
                          <h2 className="text-xl md:text-2xl font-extrabold text-neutral-dark leading-snug">
                            {event.title}
                          </h2>
                          <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-semibold">
                            {event.description}
                          </p>
                        </div>

                        {/* Meta fields */}
                        <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-slate-500 text-[10px] sm:text-xs font-semibold">
                          <div className="space-y-1">
                            <span className="flex items-center space-x-1.5 text-slate-400">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>Tanggal</span>
                            </span>
                            <p className="text-neutral-dark truncate">{event.date}</p>
                          </div>

                          <div className="space-y-1">
                            <span className="flex items-center space-x-1.5 text-slate-400">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>Lokasi</span>
                            </span>
                            <p
                              className="text-neutral-dark truncate"
                              title={event.location}
                            >
                              {event.location}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <span className="flex items-center space-x-1.5 text-slate-400">
                              <Users className="h-3.5 w-3.5" />
                              <span>Kehadiran</span>
                            </span>
                            <p className="text-neutral-dark truncate">
                              {event.attendees} Remaja
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <UserPagination
                currentPage={currentPage}
                totalItems={eventItems.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
