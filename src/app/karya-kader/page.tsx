"use client";

import React, { useState } from "react";
import { Heart, Search, Eye, Filter, UserCheck, School, Upload, CheckCircle } from "lucide-react";
import { ugcItems as initialUgcItems, UgcItem } from "@/data/mockData";

export default function KaryaKaderPage() {
  const [ugcList, setUgcList] = useState<UgcItem[]>(initialUgcItems);
  const [activeFilter, setActiveFilter] = useState<"semua" | "poster" | "infografis" | "video">("semua");
  const [selectedUgc, setSelectedUgc] = useState<UgcItem | null>(null);
  
  // UGC Upload Form Simulation state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCreator, setNewCreator] = useState("");
  const [newSchool, setNewSchool] = useState("");
  const [newType, setNewType] = useState<"poster" | "infografis">("poster");
  const [newDesc, setNewDesc] = useState("");

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering details modal
    setUgcList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const filteredItems = ugcList.filter(item => {
    return activeFilter === "semua" || item.type === activeFilter;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle && newCreator && newSchool) {
      // Build mock item
      const newItem: UgcItem = {
        id: `u-new-${Date.now()}`,
        title: newTitle,
        description: newDesc,
        mediaUrl: newType === "poster" 
          ? "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
          : "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
        creatorName: newCreator,
        school: newSchool,
        type: newType,
        likes: 0,
      };

      // Put at start of list
      setUgcList(prev => [newItem, ...prev]);
      setFormSubmitted(true);
      
      // Reset form
      setTimeout(() => {
        setShowUploadModal(false);
        setFormSubmitted(false);
        setNewTitle("");
        setNewCreator("");
        setNewSchool("");
        setNewDesc("");
      }, 1500);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">Karya Kreatif Kader & Siswa</h1>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl font-medium">
              Galeri apresiasi poster digital, infografis menarik, dan video edukasi orisinal buatan teman-teman siswa sekolah menengah.
            </p>
          </div>
          
          <button
            onClick={() => setShowUploadModal(true)}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-emerald-600/10 flex items-center justify-center space-x-2 transition-all active:scale-98"
          >
            <Upload className="h-4.5 w-4.5" />
            <span>Kirim Karyamu</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto scrollbar-none">
          <Filter className="h-4 w-4 text-slate-400 shrink-0 hidden sm:inline" />
          <div className="flex space-x-1.5">
            {(["semua", "poster", "infografis", "video"] as const).map(type => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider whitespace-nowrap ${
                  activeFilter === type
                    ? "bg-neutral-dark text-white shadow-sm"
                    : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-like responsive Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedUgc(item)}
              className="break-inside-avoid rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between hover:border-emerald-100 group"
            >
              <div>
                {/* Media Image placeholder */}
                <div className="relative rounded-xl overflow-hidden bg-slate-100 mb-4 aspect-video sm:aspect-square lg:aspect-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-primary/95 text-white text-[9px] font-extrabold uppercase tracking-widest">
                    {item.type}
                  </span>
                </div>

                <h3 className="font-bold text-neutral-dark text-base leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
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
                  <span className="flex items-center space-x-1 text-[10px] text-slate-400 font-medium truncate">
                    <School className="h-3 w-3 shrink-0" />
                    <span className="truncate">{item.school}</span>
                  </span>
                </div>

                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Heart className="h-4 w-4 fill-current text-rose-500" />
                  <span>{item.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ZOOM MODAL VIEW */}
        {selectedUgc && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              
              {/* Topbar close */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setSelectedUgc(null)}
                  className="bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedUgc.mediaUrl}
                  alt={selectedUgc.title}
                  className="max-h-[380px] object-contain"
                />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-primary text-[9px] font-extrabold uppercase tracking-wide">
                    {selectedUgc.type}
                  </span>
                  <h2 className="text-xl font-bold text-neutral-dark mt-2">{selectedUgc.title}</h2>
                  <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
                    {selectedUgc.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold">
                  <div className="space-y-0.5">
                    <p className="text-neutral-dark">Kreator: {selectedUgc.creatorName}</p>
                    <p className="text-slate-400 font-medium">{selectedUgc.school}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      handleLike(selectedUgc.id, e);
                      // Update modal like count state instantly
                      setSelectedUgc(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
                    }}
                    className="flex items-center space-x-1.5 px-4.5 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                    <span>Sukai ({selectedUgc.likes})</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* UPLOAD SUBMISSION FORM MODAL */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-neutral-dark text-lg">Kirim Karya Edukasi Kamu</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50"
                >
                  ✕
                </button>
              </div>

              {formSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <CheckCircle className="h-14 w-14 text-primary animate-bounce" />
                  <h4 className="font-extrabold text-neutral-dark text-lg">Karya Berhasil Dikirim!</h4>
                  <p className="text-xs text-slate-500 leading-normal max-w-xs">
                    Terima kasih atas kontribusimu. Karya kamu saat ini sedang ditinjau (pending) oleh admin Kader GARUDA sebelum ditampilkan di galeri publik.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rendi Pangestu"
                      value={newCreator}
                      onChange={(e) => setNewCreator(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Asal Sekolah</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: SMAN 2 Kabupaten Sehat"
                      value={newSchool}
                      onChange={(e) => setNewSchool(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Karya</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Integritas Tubuh"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Jenis Karya</label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as "poster" | "infografis")}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                      >
                        <option value="poster">Poster Kampanye</option>
                        <option value="infografis">Infografis Data</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi Ringkas</label>
                    <textarea
                      placeholder="Jelaskan gagasan atau pesan edukasi di dalam karyamu..."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      rows={3}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Pilih File Media</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                      <p className="text-[10px] font-semibold text-slate-400">Pilih gambar JPG, PNG (Max 5MB)</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary text-white font-extrabold text-xs hover:bg-primary-hover active:scale-98 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Kirim Pengajuan Karya</span>
                  </button>

                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
