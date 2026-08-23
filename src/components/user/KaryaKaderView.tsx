"use client";

import React, { useState, useEffect } from "react";
import { Heart, UserCheck, School, Filter, X, Share2, Sparkles } from "lucide-react";
import { userService } from "@/services/user/userService";
import { UgcItem } from "@/types";
import { CardSkeleton } from "@/components/shared/Skeletons";
import UserPagination from "@/components/shared/UserPagination";

export default function KaryaKaderView() {
  const [ugcList, setUgcList] = useState<UgcItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<
    "semua" | "poster" | "infografis" | "video"
  >("semua");
  const [selectedUgc, setSelectedUgc] = useState<UgcItem | null>(null);
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  useEffect(() => {
    setIsLoading(true);
    userService.getUgcItems().then((data) => {
      setUgcList(data);
      setIsLoading(false);
    });
    try {
      const raw = localStorage.getItem("liked_ugc");
      if (raw) {
        const arr = JSON.parse(raw) as string[];
        setLikedSet(new Set(arr));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLike = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const isLiked = likedSet.has(id);

    if (isLiked) {
      setUgcList((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, likes: Math.max(0, item.likes - 1) }
            : item,
        ),
      );

      setSelectedUgc((prev) =>
        prev && prev.id === id
          ? { ...prev, likes: Math.max(0, prev.likes - 1) }
          : prev,
      );

      setLikedSet((prev) => {
        const next = new Set(prev);
        next.delete(id);
        try {
          localStorage.setItem("liked_ugc", JSON.stringify(Array.from(next)));
        } catch {
          // ignore
        }
        return next;
      });

      try {
        await userService.recordUnlike(id);
      } catch {
        // ignore
      }

      return;
    }

    setUgcList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item,
      ),
    );
    setSelectedUgc((prev) =>
      prev && prev.id === id ? { ...prev, likes: prev.likes + 1 } : prev,
    );

    setLikedSet((prev) => {
      const next = new Set(prev);
      next.add(id);
      try {
        localStorage.setItem("liked_ugc", JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });

    try {
      await userService.recordLike(id);
    } catch {
      // ignore
    }
  };

  const filteredItems = ugcList.filter((item) => {
    return activeFilter === "semua" || item.type === activeFilter;
  });

  const slicedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-200/40 pb-6">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">
              Karya Kreatif Kader & Siswa
            </h1>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl font-semibold">
              Galeri apresiasi poster digital, infografis menarik, dan video
              edukasi orisinal buatan teman-teman siswa sekolah menengah.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto scrollbar-none">
          <Filter className="h-4 w-4 text-slate-400 shrink-0 hidden sm:inline" />
          <div className="flex space-x-1.5">
            {(["semua", "poster", "infografis", "video"] as const).map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider whitespace-nowrap cursor-pointer ${
                    activeFilter === type
                      ? "bg-neutral-dark text-white shadow-sm"
                      : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {type}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            slicedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedUgc(item)}
                className="rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col hover:border-emerald-100 group overflow-hidden"
              >
                {/* Image — aspect 4/3, full width */}
                <div className="relative overflow-hidden bg-slate-100 aspect-[4/3] w-full">
                  <img
                    src={item.mediaUrl}
                    alt={`Poster karya: ${item.title}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-primary/95 text-white text-[10px] font-extrabold uppercase tracking-widest shadow">
                    {item.type}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5">
                  <h3
                    className="font-bold text-neutral-dark text-base md:text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2"
                    title={item.title}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1">
                    {item.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <div className="space-y-0.5 min-w-0 mr-3">
                      <span className="flex items-center gap-1.5 text-slate-700 font-bold text-sm min-w-0">
                        <UserCheck className="h-4 w-4 text-primary shrink-0" />
                        <span className="truncate">{item.creatorName}</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400 font-semibold truncate">
                        <School className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{item.school}</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors cursor-pointer shrink-0 ${
                        likedSet.has(item.id)
                          ? "bg-rose-50 text-rose-600"
                          : "text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${likedSet.has(item.id) ? "fill-rose-500 text-rose-600" : "text-slate-400"}`}
                      />
                      <span className="text-xs font-bold">{item.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!isLoading && (
          <UserPagination
            currentPage={currentPage}
            totalItems={filteredItems.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}

        {/* INSTAGRAM-STYLE PREVIEW MODAL */}
        {selectedUgc && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-200 border border-slate-200/80">
              {/* Close Button Top Right Mobile/Desktop */}
              <button
                onClick={() => setSelectedUgc(null)}
                className="absolute top-3 right-3 z-30 bg-slate-900/70 hover:bg-slate-950 text-white p-2 rounded-full transition-all cursor-pointer shadow-md"
                aria-label="Tutup Detail"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Left Side: Media Container (Instagram Style Media Preview) */}
              <div className="lg:w-3/5 bg-slate-950 flex items-center justify-center p-3 relative min-h-[300px] lg:min-h-[480px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedUgc.mediaUrl}
                  alt={`Detail karya: ${selectedUgc.title}`}
                  className="max-h-[75vh] w-auto object-contain rounded-xl"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                  {selectedUgc.type}
                </span>
              </div>

              {/* Right Side: Creator Info & Description Sidebar */}
              <div className="lg:w-2/5 p-6 flex flex-col justify-between overflow-y-auto max-h-[85vh] bg-white space-y-5">
                {/* Header Profile Section */}
                <div className="border-b border-slate-100 pb-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center border border-emerald-200 shrink-0">
                      {selectedUgc.creatorName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-extrabold text-neutral-dark text-sm truncate">
                        {selectedUgc.creatorName}
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold truncate flex items-center gap-1">
                        <School className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span>{selectedUgc.school}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Title & Scrollable Description Content */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                  <h2 className="text-lg font-black text-neutral-dark leading-snug">
                    {selectedUgc.title}
                  </h2>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 font-medium leading-relaxed whitespace-pre-line">
                    {selectedUgc.description}
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
                  <button
                    onClick={(e) => handleLike(selectedUgc.id, e)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-extrabold border ${
                      likedSet.has(selectedUgc.id)
                        ? "bg-rose-50 border-rose-200 text-rose-600"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        likedSet.has(selectedUgc.id)
                          ? "fill-rose-600 text-rose-600"
                          : "text-slate-400"
                      }`}
                    />
                    <span>{selectedUgc.likes} Likes</span>
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: selectedUgc.title,
                          text: selectedUgc.description,
                          url: window.location.href,
                        }).catch(() => {});
                      }
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all cursor-pointer"
                    title="Bagikan"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
