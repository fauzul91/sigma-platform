"use client";

import React, { useState, useEffect } from "react";
import { Heart, UserCheck, School, Filter } from "lucide-react";
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
    // load liked IDs from localStorage to prevent spam likes per browser
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
    e.stopPropagation(); // Avoid triggering details modal

    const isLiked = likedSet.has(id);

    if (isLiked) {
      // optimistic decrement
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
        // ignore backend failure
      }

      return;
    }

    // not liked yet -> optimistic increment
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
        // ignore storage errors
      }
      return next;
    });

    try {
      await userService.recordLike(id);
    } catch {
      // ignore backend failure
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
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
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

        {/* Uniform Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {slicedItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedUgc(item)}
                    className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between hover:border-emerald-100 group h-full"
                  >
                    <div>
                      {/* Fixed aspect ratio for uniform image sizes */}
                      <div className="relative rounded-xl overflow-hidden bg-slate-100 mb-4 aspect-[4/3] w-full">
                        <img
                          src={item.mediaUrl}
                          alt={`Poster karya: ${item.title}`}
                          className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-primary/95 text-white text-[9px] font-extrabold uppercase tracking-widest">
                          {item.type}
                        </span>
                      </div>

                      {/* Truncated title */}
                      <h3
                        className="font-bold text-neutral-dark text-base leading-snug group-hover:text-primary transition-colors truncate"
                        title={item.title}
                      >
                        {item.title}
                      </h3>

                      {/* Clamped description text */}
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Creator details and Like trigger */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
                      <div className="space-y-0.5 min-w-0">
                        <span className="flex items-center space-x-1 text-slate-700 font-bold min-w-0">
                          <UserCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="truncate">{item.creatorName}</span>
                        </span>
                        <span className="flex items-center space-x-1 text-[10px] text-slate-400 font-semibold truncate">
                          <School className="h-3 w-3 shrink-0" />
                          <span className="truncate">{item.school}</span>
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleLike(item.id, e)}
                        className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          likedSet.has(item.id)
                            ? "bg-rose-50 text-rose-600"
                            : "text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 ${likedSet.has(item.id) ? "text-rose-600" : "text-slate-400"}`}
                        />
                        <span>{item.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <UserPagination
                currentPage={currentPage}
                totalItems={filteredItems.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        {/* ZOOM MODAL VIEW */}
        {selectedUgc && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              {/* Topbar close */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setSelectedUgc(null)}
                  className="bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center">
                <img
                  src={selectedUgc.mediaUrl}
                  alt={`Detail gambar karya: ${selectedUgc.title}`}
                  className="max-h-[380px] object-contain"
                />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-primary text-[9px] font-extrabold uppercase tracking-wide">
                    {selectedUgc.type}
                  </span>
                  <h2 className="text-xl font-bold text-neutral-dark mt-2">
                    {selectedUgc.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-2 font-semibold leading-relaxed">
                    {selectedUgc.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold">
                  <div className="space-y-0.5">
                    <p className="text-neutral-dark">
                      Kreator: {selectedUgc.creatorName}
                    </p>
                    <p className="text-slate-400 font-semibold">
                      {selectedUgc.school}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleLike(selectedUgc.id, e)}
                    className={`flex items-center space-x-1.5 px-4.5 py-2 rounded-xl transition-colors cursor-pointer ${
                      likedSet.has(selectedUgc.id)
                        ? "bg-rose-50 text-rose-600"
                        : "bg-white text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${likedSet.has(selectedUgc.id) ? "text-rose-600" : "text-slate-400"}`}
                    />
                    <span>Sukai ({selectedUgc.likes})</span>
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
