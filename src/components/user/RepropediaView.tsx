"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BookOpen, FileText, Download, Eye, ArrowLeft, Search, Calendar, User } from "lucide-react";
import { userService } from "@/services/user/userService";
import { RepropediaItem } from "@/types";
import { CardSkeleton, DetailSkeleton } from "@/components/shared/Skeletons";
import UserPagination from "@/components/shared/UserPagination";

export default function RepropediaView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const moduleSlug = searchParams.get("module");

  const [modules, setModules] = useState<RepropediaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedModule, setSelectedModule] = useState<RepropediaItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    userService.getRepropediaModules().then((data) => {
      setModules(data);
      setIsLoading(false);
    });
  }, []);

  // Sync url param if user clicked a module link from Home
  useEffect(() => {
    if (moduleSlug && modules.length > 0) {
      const found = modules.find((m) => m.slug === moduleSlug);
      if (found) setSelectedModule(found);
    } else {
      setSelectedModule(null);
    }
  }, [moduleSlug, modules]);

  const categories = [
    { id: "semua", name: "Semua Kategori" },
    { id: "pubertas", name: "Pubertas" },
    { id: "pernikahan-anak", name: "Pernikahan Anak" },
    { id: "hak-anak", name: "Hak Anak" },
    { id: "kekerasan-seksual", name: "Kekerasan Seksual" },
    { id: "kesehatan-mental", name: "Kesehatan Mental" },
  ];

  const filteredModules = modules.filter((module) => {
    const matchesCategory = activeCategory === "semua" || module.category === activeCategory;
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const slicedModules = filteredModules.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const selectModule = (module: RepropediaItem | null) => {
    if (module) {
      router.push(`/repropedia?module=${module.slug}`);
    } else {
      router.push("/repropedia");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* VIEW 1: MODULE DETAIL VIEW */}
        {moduleSlug && isLoading ? (
          <div className="space-y-6">
            <button className="inline-flex items-center space-x-2 text-sm font-bold text-slate-400 cursor-not-allowed">
              <ArrowLeft className="h-4.5 w-4.5" />
              <span>Memuat Konten...</span>
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <DetailSkeleton />
              </div>
              <div className="lg:col-span-4 space-y-6">
                <CardSkeleton />
                <CardSkeleton />
              </div>
            </div>
          </div>
        ) : selectedModule ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Back button */}
            <button
              onClick={() => selectModule(null)}
              className="inline-flex items-center space-x-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
              <span>Kembali ke Repropedia</span>
            </button>

            {/* Layout Grid: Content + PDF Viewer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Content Panel */}
              <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded bg-emerald-50 text-primary text-xs font-extrabold uppercase tracking-wider">
                    {selectedModule.category.replace("-", " ")}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-dark mt-4 leading-tight">
                    {selectedModule.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold mt-4 pt-4 border-t border-slate-100">
                    <span className="flex items-center space-x-1">
                      <User className="h-3.5 w-3.5" />
                      <span>{selectedModule.author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{selectedModule.date}</span>
                    </span>
                    <span>• {selectedModule.readTime} Baca</span>
                  </div>
                </div>

                <div className="text-sm text-slate-600 leading-relaxed space-y-4 font-medium">
                  <p className="font-bold text-neutral-dark text-base border-l-4 border-primary pl-3 bg-emerald-50/30 py-2 rounded-r-lg">
                    {selectedModule.synopsis}
                  </p>
                  <div className="pt-2 whitespace-pre-line">{selectedModule.content}</div>
                </div>
              </div>

              {/* PDF Viewer Panel */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-[500px] lg:h-[600px]">
                <div className="space-y-4 flex-grow flex flex-col">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-neutral-dark text-sm flex items-center space-x-2">
                      <FileText className="h-4.5 w-4.5 text-primary" />
                      <span>E-Dokumen & PDF Resmi</span>
                    </h3>
                    
                    {selectedModule.pdfUrl && (
                      <a
                        href={selectedModule.pdfUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-50 text-primary hover:bg-primary hover:text-white transition-all"
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {/* Inline PDF Native Viewer */}
                  {selectedModule.pdfUrl ? (
                    <div className="relative flex-grow rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 mt-2">
                      <iframe
                        src={`${selectedModule.pdfUrl}#toolbar=0`}
                        className="w-full h-full"
                        title={`PDF Reader: ${selectedModule.title}`}
                      />
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-6 text-slate-400">
                      <FileText className="h-12 w-12 mb-3" />
                      <p className="text-xs font-semibold">PDF Dokumen tidak tersedia untuk materi ini.</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3">
                  <a
                    href={selectedModule.pdfUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3.5 rounded-xl bg-primary text-white font-extrabold text-xs hover:bg-primary-hover active:scale-98 transition-all flex items-center justify-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Buka PDF Layar Penuh</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        ) : (
          
          /* VIEW 2: MODULE DIRECTORY VIEW */
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* Header Title */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">Pusat Literasi Repropedia</h1>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
                Materi edukasi reproduksi terpercaya, terstruktur, dan ramah remaja. Pilih kategori bahasan di bawah untuk mulai membaca.
              </p>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Category buttons */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      activeCategory === cat.id
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Local Search Input */}
              <div className="relative w-full md:max-w-xs">
                <input
                  type="text"
                  placeholder="Cari materi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
              </div>
            </div>

            {/* Modules Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : filteredModules.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {slicedModules.map((module) => (
                    <div
                      key={module.id}
                      onClick={() => selectModule(module)}
                      className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between hover:border-emerald-100 group"
                    >
                      <div>
                        <span className="inline-block px-2.5 py-1 rounded bg-emerald-50 text-primary text-[10px] font-extrabold uppercase tracking-wide mb-4">
                          {module.category.replace("-", " ")}
                        </span>
                        <h3 className="font-bold text-neutral-dark text-lg leading-snug group-hover:text-primary transition-colors">
                          {module.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                          {module.synopsis}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
                        <span>{module.readTime} Baca</span>
                        <span className="text-primary group-hover:underline flex items-center space-x-1">
                          <span>Buka Materi</span>
                          <BookOpen className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <UserPagination
                  currentPage={currentPage}
                  totalItems={filteredModules.length}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                />
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3 animate-pulse" />
                <p className="text-sm font-semibold text-slate-400">Tidak ada materi edukasi yang cocok.</p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
