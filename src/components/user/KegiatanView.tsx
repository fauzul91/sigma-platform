"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Layers
} from "lucide-react";
import { userService } from "@/services/user/userService";
import { EventItem } from "@/types";

export default function KegiatanView() {
  const [eventItems, setEventItems] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Modal states
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    userService.getEventItems().then((data) => {
      setEventItems(data);
      setIsLoading(false);
    });
  }, []);

  const openModal = (event: EventItem) => {
    setSelectedEvent(event);
    setCurrentImgIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setCurrentImgIndex(0);
    document.body.style.overflow = '';
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEvent) {
      setCurrentImgIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEvent) {
      setCurrentImgIndex((prev) => 
        (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length
      );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center space-x-2 bg-emerald-100/50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Kader GARUDA SIGMA</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Dokumentasi Kegiatan Kader
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Menelusuri jejak kampanye, seminar sosialisasi, dan pelatihan pendampingan sebaya yang dilaksanakan oleh Kader GARUDA secara berkala.
          </p>
        </div>

        {/* Tab/Divider */}
        <div className="flex justify-center border-t mb-6 pt-6">
          <div className="flex items-center space-x-2 border-t border-slate-900 pt-3 px-2 text-xs font-semibold text-slate-900 tracking-widest uppercase">
            <svg aria-label="" className="w-3 h-3" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
            <span>Postingan Kegiatan</span>
          </div>
        </div>

        {/* IG Feed Grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="aspect-square bg-slate-200 animate-pulse rounded-sm sm:rounded-md" />
            ))
          ) : (
            eventItems.map((event) => (
              <div
                key={event.id}
                onClick={() => openModal(event)}
                className="relative aspect-square bg-slate-100 cursor-pointer group rounded-sm sm:rounded-md overflow-hidden"
              >
                <img
                  src={event.images[0]}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Multiple Images Icon Indicator */}
                {event.images.length > 1 && (
                  <div className="absolute top-2 right-2 text-white drop-shadow-md">
                    <Layers className="h-4 w-4 sm:h-5 sm:w-5 fill-white/80" />
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-6 text-white font-bold text-sm sm:text-base">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Users className="h-4 w-4 sm:h-6 sm:w-6 fill-white" />
                    <span>{event.attendees}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modern Instagram-style Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-8 lg:p-12 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          {/* Close button - Top Right */}
          <button 
            className="absolute top-4 right-4 text-white hover:text-slate-300 transition-colors z-50 p-2"
            onClick={closeModal}
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <div 
            className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-r-md flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Image Carousel */}
            <div className="relative w-full md:w-[55%] lg:w-[60%] bg-black flex items-center justify-center h-[50vh] md:h-auto min-h-[400px]">
              <img 
                src={selectedEvent.images[currentImgIndex]} 
                alt={selectedEvent.title}
                className="w-full h-full object-contain"
              />

              {selectedEvent.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-1.5 sm:p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-1.5 sm:p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5">
                    {selectedEvent.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all ${
                          currentImgIndex === idx ? "bg-blue-500 w-3" : "bg-white/60 w-1.5"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right Side: Details/Comments equivalent */}
            <div className="flex-1 flex flex-col bg-white h-[50vh] md:h-[600px] lg:h-[700px]">
              {/* Header (Author) */}
              <div className="flex items-center space-x-3 p-4 border-b border-slate-100 shrink-0">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center border border-slate-200">
                  <span className="text-sm font-bold text-emerald-600">G</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 leading-none">kegiatan.garuda</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{selectedEvent.location}</p>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-4 overflow-y-auto flex-1 hide-scrollbar">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center border border-slate-200 shrink-0 mt-1">
                    <span className="text-sm font-bold text-emerald-600">G</span>
                  </div>
                  <div className="text-sm text-slate-800 leading-relaxed pt-1.5">
                    <span className="font-semibold text-slate-900 mr-2">kegiatan.garuda</span>
                    <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-extrabold uppercase tracking-wide mr-1 align-middle">
                      <Sparkles className="h-2.5 w-2.5" />
                      <span>Sosialisasi</span>
                    </span>
                    <strong className="block mt-2 mb-1">{selectedEvent.title}</strong>
                    {selectedEvent.description}
                    
                    {/* Hashtags */}
                    <div className="mt-3 text-blue-800 font-medium text-[13px]">
                      #KaderGaruda #EdukasiRemaja #CegahPerkawinanAnak #KesehatanReproduksi
                    </div>

                    <div className="mt-3 text-[11px] text-slate-400 uppercase font-semibold">
                      {selectedEvent.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="p-4 border-t border-slate-100 shrink-0 bg-slate-50/50">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">{selectedEvent.attendees} Peserta</span>
                  </div>
                  <div className="col-span-2 flex items-center space-x-2 text-slate-600 mt-1">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="font-medium truncate" title={selectedEvent.location}>{selectedEvent.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hide scrollbar styling */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
