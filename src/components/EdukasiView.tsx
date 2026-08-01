"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Play, FileText, ArrowLeft, Calendar, User, Tag, Sparkles, BookOpen } from "lucide-react";
import { mediaItems, MediaItem } from "@/data/mockData";

export default function EdukasiView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const postSlug = searchParams.get("post");
  const urlSearchQuery = searchParams.get("search") || "";

  const [activeTab, setActiveTab] = useState<"semua" | "article" | "video">("semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<MediaItem | null>(null);

  // Sync search query from global navbar redirect
  useEffect(() => {
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, [urlSearchQuery]);

  // Sync open post
  useEffect(() => {
    if (postSlug) {
      const found = mediaItems.find((m) => m.slug === postSlug);
      if (found) setSelectedPost(found);
    } else {
      setSelectedPost(null);
    }
  }, [postSlug]);

  const filteredItems = mediaItems.filter((item) => {
    const matchesTab = activeTab === "semua" || item.type === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const selectPost = (item: MediaItem | null) => {
    if (item) {
      router.push(`/edukasi?post=${item.slug}`);
    } else {
      router.push("/edukasi");
    }
  };

  const getRelatedContent = (currentPost: MediaItem) => {
    return mediaItems
      .filter((item) => item.id !== currentPost.id)
      .map((item) => {
        let score = 0;
        if (item.category === currentPost.category) score += 2;
        const sharedTags = item.tags.filter((t) => currentPost.tags.includes(t));
        score += sharedTags.length * 3;
        return { item, score };
      })
      .filter((scored) => scored.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((scored) => scored.item);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* VIEW 1: DETAILED POST VIEW */}
        {selectedPost ? (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Back trigger */}
            <button
              onClick={() => selectPost(null)}
              className="inline-flex items-center space-x-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
              <span>Kembali ke Galeri Edukasi</span>
            </button>

            {/* Post Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Main Column */}
              <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                
                {/* Meta details */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2.5">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-primary text-[10px] font-extrabold uppercase tracking-wide">
                      {selectedPost.type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-extrabold uppercase tracking-wide">
                      {selectedPost.category}
                    </span>
                  </div>

                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-neutral-dark leading-tight">
                    {selectedPost.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold pt-2">
                    <span className="flex items-center space-x-1">
                      <User className="h-3.5 w-3.5" />
                      <span>{selectedPost.author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{selectedPost.date}</span>
                    </span>
                    {selectedPost.readTime && <span>• {selectedPost.readTime} Baca</span>}
                    {selectedPost.duration && <span>• Durasi {selectedPost.duration}</span>}
                  </div>
                </div>

                {/* Video Embed or Featured Image */}
                {selectedPost.type === "video" ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner">
                    <iframe
                      src={selectedPost.mediaUrl}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={selectedPost.title}
                    />
                  </div>
                ) : (
                  <div className="relative h-64 md:h-[400px] rounded-2xl overflow-hidden shadow-sm">
                    <img
                      src={selectedPost.mediaUrl}
                      alt={`Ilustrasi edukasi: ${selectedPost.title}`}
                      className="w-full h-full object-cover animate-fade-in"
                    />
                  </div>
                )}

                {/* Body Content */}
                <div className="text-slate-600 leading-relaxed text-sm md:text-base font-medium whitespace-pre-line border-t border-slate-100 pt-6">
                  {selectedPost.content}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold"
                    >
                      <Tag className="h-3 w-3 text-slate-400" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Sidebar: Related Content Panel */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-extrabold text-neutral-dark text-base flex items-center space-x-2 border-b border-slate-100 pb-3">
                  <Sparkles className="h-4.5 w-4.5 text-primary" />
                  <span>Rekomendasi Terkait</span>
                </h3>

                <div className="space-y-4">
                  {getRelatedContent(selectedPost).length > 0 ? (
                    getRelatedContent(selectedPost).map((related) => (
                      <div
                        key={related.id}
                        onClick={() => selectPost(related)}
                        className="flex space-x-3 cursor-pointer group"
                      >
                        <div className="relative h-16 w-16 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                          {related.type === "video" ? (
                            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white">
                              <Play className="h-4.5 w-4.5 fill-current text-white" />
                            </div>
                          ) : (
                            <img
                              src={related.mediaUrl}
                              alt={`Cover rekomendasi: ${related.title}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="text-xs font-bold text-neutral-dark leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                            {related.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-semibold mt-1 block">
                            {related.date}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 font-semibold text-center py-6">Tidak ada rekomendasi serupa.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        ) : (
          
          /* VIEW 2: LIST FEED */
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">Galeri Edukasi & Media</h1>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
                Temukan video kampanye edukatif dari Kader GARUDA serta artikel kesehatan reproduksi dari pakar medis di bawah ini.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Type Switcher */}
              <div className="flex bg-slate-100 rounded-xl p-1 w-full md:w-auto">
                <button
                  onClick={() => setActiveTab("semua")}
                  className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "semua"
                      ? "bg-white text-neutral-dark shadow-sm"
                      : "text-slate-500 hover:text-neutral-dark"
                  }`}
                >
                  Semua Media
                </button>
                <button
                  onClick={() => setActiveTab("article")}
                  className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                    activeTab === "article"
                      ? "bg-white text-neutral-dark shadow-sm"
                      : "text-slate-500 hover:text-neutral-dark"
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Artikel</span>
                </button>
                <button
                  onClick={() => setActiveTab("video")}
                  className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                    activeTab === "video"
                      ? "bg-white text-neutral-dark shadow-sm"
                      : "text-slate-500 hover:text-neutral-dark"
                  }`}
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>Video</span>
                </button>
              </div>

              {/* Search Field */}
              <div className="relative w-full md:max-w-xs">
                <input
                  type="text"
                  placeholder="Cari artikel/tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
              </div>

            </div>

            {/* Media list grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => selectPost(item)}
                    className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row cursor-pointer hover:border-emerald-100 group"
                  >
                    
                    {/* Media representation */}
                    <div className="relative w-full sm:w-48 h-48 shrink-0 bg-slate-100">
                      {item.type === "video" ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white p-4">
                          <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <Play className="h-5 w-5 fill-current text-white pl-0.5" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wide">
                            Video {item.duration}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={item.mediaUrl}
                          alt={`Thumbnail artikel: ${item.title}`}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      )}
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-neutral-dark/80 text-white text-[9px] font-extrabold uppercase tracking-widest">
                        {item.type}
                      </span>
                    </div>

                    {/* Content text */}
                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-50 text-primary text-[9px] font-extrabold uppercase tracking-wide mb-2">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-neutral-dark text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                        <span className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{item.author}</span>
                        </span>
                        <span>{item.date}</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3 animate-pulse" />
                <p className="text-sm font-semibold text-slate-400">Tidak ada media/artikel yang sesuai pencarian.</p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
