"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShieldAlert, 
  BarChart2, 
  BookOpen, 
  FileText, 
  Users, 
  HelpCircle, 
  Database, 
  Settings, 
  Lock, 
  Unlock,
  CheckCircle,
  Plus,
  Trash2,
  Edit2,
  FolderLock,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  Calendar,
  Phone,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { 
  repropediaModules as initialModules, 
  mediaItems as initialMedia,
  ugcItems as initialUgc,
  quizQuestions as initialQuiz,
  statisticsCases as initialStats,
  counselingDirectory as initialCounselors,
  globalStats,
  RepropediaItem,
  MediaItem,
  UgcItem,
  QuizQuestion,
  StatRecord,
  Counselor
} from "@/data/mockData";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // CMS Tabs
  const [activeTab, setActiveTab] = useState<"overview" | "repropedia" | "media" | "ugc" | "quiz" | "stats" | "counselors" | "settings">("overview");

  // Dynamic session datasets
  const [modules, setModules] = useState<RepropediaItem[]>(initialModules);
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [ugc, setUgc] = useState<UgcItem[]>(initialUgc);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>(initialQuiz);
  const [stats, setStats] = useState<StatRecord[]>(initialStats);
  const [counselors, setCounselors] = useState<Counselor[]>(initialCounselors);

  // Settings mock state
  const [vision, setVision] = useState("Mewujudkan generasi muda yang cerdas kesehatan reproduksi.");
  const [mission, setMission] = useState("Menyediakan edukasi inklusif dan aman.");
  const [ketuaName, setKetuaName] = useState("Rian Hidayat");

  // Search queries per tab
  const [searchTerm, setSearchTerm] = useState("");

  // CRUD modals state
  const [editingModule, setEditingModule] = useState<Partial<RepropediaItem> | null>(null);
  const [editingMedia, setEditingMedia] = useState<Partial<MediaItem> | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<Partial<QuizQuestion> | null>(null);
  const [editingCounselor, setEditingCounselor] = useState<Partial<Counselor> | null>(null);
  const [editingStat, setEditingStat] = useState<Partial<StatRecord> & { index?: number } | null>(null);
  const [editingUgc, setEditingUgc] = useState<Partial<UgcItem> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "module" | "media" | "quiz" | "stat" | "counselor" | "ugc";
    id: string | number;
    title: string;
  } | null>(null);

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "danger" } | null>(null);

  const triggerToast = (message: string, type: "success" | "info" | "danger" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth") === "true";
    if (authStatus) {
      setIsAuthenticated(true);
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    triggerToast("Berhasil keluar dari sesi.", "info");
    router.push("/admin/login");
  };

  // 1. Repropedia CRUD
  const handleSaveModule = () => {
    if (editingModule?.title) {
      if (editingModule.id) {
        setModules(prev => prev.map(m => m.id === editingModule.id ? { ...m, ...editingModule } as RepropediaItem : m));
        triggerToast("Modul berhasil diperbarui!", "success");
      } else {
        const newModule: RepropediaItem = {
          id: `r-gen-${Date.now()}`,
          title: editingModule.title,
          slug: editingModule.title.toLowerCase().replace(/ /g, "-"),
          category: (editingModule.category || "pubertas") as any,
          synopsis: editingModule.synopsis || "",
          content: editingModule.content || "",
          pdfUrl: editingModule.pdfUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          readTime: editingModule.readTime || "5 menit",
          author: editingModule.author || "Kader GARUDA",
          date: "Hari ini",
        };
        setModules(prev => [newModule, ...prev]);
        triggerToast("Modul baru berhasil ditambahkan!", "success");
      }
      setEditingModule(null);
    }
  };

  const executeDelete = () => {
    if (!deleteTarget) return;
    const { type, id } = deleteTarget;
    if (type === "module") {
      setModules(prev => prev.filter(m => m.id !== id));
      triggerToast("Modul berhasil dihapus.", "danger");
    } else if (type === "media") {
      setMedia(prev => prev.filter(m => m.id !== id));
      triggerToast("Media berhasil dihapus.", "danger");
    } else if (type === "quiz") {
      setQuizzes(prev => prev.filter(q => q.id !== id));
      triggerToast("Soal berhasil dihapus.", "danger");
    } else if (type === "stat") {
      setStats(prev => prev.filter((_, idx) => idx !== id));
      triggerToast("Data statistik dihapus.", "danger");
    } else if (type === "counselor") {
      setCounselors(prev => prev.filter(c => c.id !== id));
      triggerToast("Kontak rujukan dihapus.", "danger");
    } else if (type === "ugc") {
      setUgc(prev => prev.filter(u => u.id !== id));
      triggerToast("Karya siswa berhasil dihapus.", "danger");
    }
    setDeleteTarget(null);
  };

  // 2. Media CRUD
  const handleSaveMedia = () => {
    if (editingMedia?.title) {
      if (editingMedia.id) {
        setMedia(prev => prev.map(m => m.id === editingMedia.id ? { ...m, ...editingMedia } as MediaItem : m));
        triggerToast("Media berhasil diperbarui!", "success");
      } else {
        const newMedia: MediaItem = {
          id: `m-gen-${Date.now()}`,
          title: editingMedia.title,
          slug: editingMedia.title.toLowerCase().replace(/ /g, "-"),
          type: (editingMedia.type || "article") as any,
          category: (editingMedia.category || "edukasi") as any,
          tags: editingMedia.tags || ["Remaja"],
          content: editingMedia.content || "",
          mediaUrl: editingMedia.mediaUrl || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
          author: editingMedia.author || "Kader GARUDA",
          date: "Hari ini",
        };
        setMedia(prev => [newMedia, ...prev]);
        triggerToast("Media baru berhasil diunggah!", "success");
      }
      setEditingMedia(null);
    }
  };

  // Media deletion handled by executeDelete

  // 3. Quiz CRUD
  const handleSaveQuiz = () => {
    if (editingQuiz?.questionText) {
      if (editingQuiz.id) {
        setQuizzes(prev => prev.map(q => q.id === editingQuiz.id ? { ...q, ...editingQuiz } as QuizQuestion : q));
        triggerToast("Pertanyaan kuis diperbarui!", "success");
      } else {
        const newQuiz: QuizQuestion = {
          id: `q-gen-${Date.now()}`,
          category: editingQuiz.category || "umum",
          questionText: editingQuiz.questionText,
          options: editingQuiz.options || ["", "", "", ""],
          correctAnswer: editingQuiz.correctAnswer ?? 0,
          explanation: editingQuiz.explanation || "",
        };
        setQuizzes(prev => [newQuiz, ...prev]);
        triggerToast("Pertanyaan kuis ditambahkan!", "success");
      }
      setEditingQuiz(null);
    }
  };

  // Quiz deletion handled by executeDelete

  // 4. Statistics CRUD
  const handleSaveStat = () => {
    if (editingStat?.year) {
      const formatted = {
        year: Number(editingStat.year),
        "Desa Sukamaju": Number(editingStat["Desa Sukamaju"] || 0),
        "Desa Harapan": Number(editingStat["Desa Harapan"] || 0),
        "Desa Mekarjaya": Number(editingStat["Desa Mekarjaya"] || 0),
        "Desa Kertajaya": Number(editingStat["Desa Kertajaya"] || 0),
      };

      if (editingStat.index !== undefined) {
        setStats(prev => prev.map((s, idx) => idx === editingStat.index ? formatted : s));
        triggerToast("Data statistik diperbarui!", "success");
      } else {
        setStats(prev => [formatted, ...prev]);
        triggerToast("Data statistik ditambahkan!", "success");
      }
      setEditingStat(null);
    }
  };

  // Stat deletion handled by executeDelete

  // 5. Counselors CRUD
  const handleSaveCounselor = () => {
    if (editingCounselor?.name) {
      if (editingCounselor.id) {
        setCounselors(prev => prev.map(c => c.id === editingCounselor.id ? { ...c, ...editingCounselor } as Counselor : c));
        triggerToast("Kontak pendamping diperbarui!", "success");
      } else {
        const newCounselor: Counselor = {
          id: `c-gen-${Date.now()}`,
          name: editingCounselor.name,
          role: (editingCounselor.role || "Kader GARUDA") as any,
          whatsappNumber: editingCounselor.whatsappNumber || "+62812345678",
          operationalHours: editingCounselor.operationalHours || "08:00 - 15:00 WIB",
          locationName: editingCounselor.locationName,
          locationMapUrl: editingCounselor.locationMapUrl,
        };
        setCounselors(prev => [newCounselor, ...prev]);
        triggerToast("Pendamping baru ditambahkan!", "success");
      }
      setEditingCounselor(null);
    }
  };

  // Counselor deletion handled by executeDelete

  const handleSaveUgc = () => {
    if (editingUgc?.title && editingUgc?.creatorName) {
      if (editingUgc.id) {
        setUgc(prev => prev.map(item => item.id === editingUgc.id ? { ...item, ...editingUgc } as UgcItem : item));
        triggerToast("Karya berhasil diperbarui!", "success");
      } else {
        const newUgc: UgcItem = {
          id: `u-gen-${Date.now()}`,
          title: editingUgc.title,
          description: editingUgc.description || "",
          mediaUrl: editingUgc.mediaUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
          creatorName: editingUgc.creatorName,
          school: editingUgc.school || "Sekolah Umum",
          type: (editingUgc.type || "poster") as any,
          likes: editingUgc.likes || 0
        };
        setUgc(prev => [newUgc, ...prev]);
        triggerToast("Karya baru ditambahkan!", "success");
      }
      setEditingUgc(null);
    }
  };

  const handleModerationUgc = (id: string, action: "approve" | "reject") => {
    if (action === "reject") {
      setUgc(prev => prev.filter(item => item.id !== id));
      triggerToast("Karya siswa ditolak/dihapus.", "danger");
    } else {
      triggerToast("Karya siswa berhasil disetujui masuk galeri!", "success");
    }
  };

  // Reset search filter on tab switch
  useEffect(() => {
    setSearchTerm("");
  }, [activeTab]);

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col lg:flex-row font-sans">
      
      {/* Toast Alert Popups */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center space-x-2.5 text-xs font-bold border transition-all animate-in slide-in-from-right duration-200 ${
          toast.type === "success" 
            ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
            : toast.type === "danger" 
              ? "bg-rose-50 border-rose-200 text-rose-800" 
              : "bg-blue-50 border-blue-200 text-blue-800"
        }`}>
          {toast.type === "success" && <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />}
          {toast.type === "danger" && <AlertCircle className="h-4.5 w-4.5 text-rose-600" />}
          {toast.type === "info" && <Info className="h-4.5 w-4.5 text-blue-600" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar Panel */}
      <aside className="w-full lg:w-64 bg-neutral-dark text-slate-300 flex flex-col justify-between shrink-0 p-5 border-r border-slate-800 lg:fixed lg:top-0 lg:bottom-0 lg:left-0 z-30">
        <div className="space-y-8">
          
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
              <Unlock className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base leading-none tracking-tight block">SIGMA CMS</span>
              <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase block">Administrator</span>
            </div>
          </div>

          <nav className="flex flex-col space-y-1.5 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "overview" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <BarChart2 className="h-4.5 w-4.5" />
              <span>Analitik Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("repropedia")}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "repropedia" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <BookOpen className="h-4.5 w-4.5" />
              <span>Repropedia Hub</span>
            </button>

            <button
              onClick={() => setActiveTab("media")}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "media" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <FileText className="h-4.5 w-4.5" />
              <span>Artikel & Media</span>
            </button>

            <button
              onClick={() => setActiveTab("ugc")}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "ugc" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <Users className="h-4.5 w-4.5" />
              <span>Moderasi Karya</span>
            </button>

            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "quiz" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Quiz Engine</span>
            </button>

            <button
              onClick={() => setActiveTab("stats")}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "stats" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <Database className="h-4.5 w-4.5" />
              <span>Input Data Kasus</span>
            </button>

            <button
              onClick={() => setActiveTab("counselors")}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "counselors" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <Users className="h-4.5 w-4.5" />
              <span>Direktori Konseling</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "settings" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <Settings className="h-4.5 w-4.5" />
              <span>Pengaturan Umum</span>
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 px-4 py-3 bg-red-950/40 text-red-400 hover:bg-red-950/60 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 border border-red-900/30 transition-all"
        >
          <span>Keluar Sesi</span>
        </button>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex-grow lg:pl-64 min-h-screen flex flex-col">
        
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">CMS Platform</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="text-sm font-extrabold text-neutral-dark capitalize">
              {activeTab === "ugc" ? "Moderasi Karya Siswa" : activeTab === "stats" ? "Data Perkawinan Anak" : activeTab}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/beranda"
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-all text-xs font-semibold"
            >
              <span>Lihat Web Publik</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-500/20">
              AD
            </div>
          </div>
        </header>

        {/* Content Pane */}
        <main className="flex-grow p-6 md:p-8 space-y-6">
          
          {/* TAB 1: ANALYTICS OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h1 className="text-2xl font-extrabold text-neutral-dark">Selamat Datang, Admin</h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Kunjungan Halaman</p>
                  <h3 className="text-3xl font-extrabold text-neutral-dark mt-1">2,840 Halaman</h3>
                  <p className="text-xs text-primary font-semibold mt-1">▲ 14% Bulan ini</p>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Modul Paling Sering Diakses</p>
                  <h3 className="text-3xl font-extrabold text-neutral-dark mt-1">Pernikahan Anak</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">Repropedia Hub</p>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tingkat Penyelesaian Kuis</p>
                  <h3 className="text-3xl font-extrabold text-neutral-dark mt-1">84% Selesai</h3>
                  <p className="text-xs text-amber-600 font-semibold mt-1">Sangat Interaktif</p>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-neutral-dark flex items-center space-x-1.5 border-b border-slate-100 pb-3">
                  <Sparkles className="h-4.5 w-4.5 text-primary" />
                  <span>Audit Aktivitas Terbaru Pengelola</span>
                </h3>
                <ul className="divide-y divide-slate-100 text-xs text-slate-500 space-y-3 font-medium">
                  <li className="pt-2 flex items-center justify-between">
                    <span>Modul "Memahami Pubertas" baru saja disunting oleh dr. Andi Wijaya.</span>
                    <span className="text-[10px] text-slate-400 font-semibold">10 menit yang lalu</span>
                  </li>
                  <li className="pt-2 flex items-center justify-between">
                    <span>Karya poster baru "My Body is My Own" disetujui masuk galeri.</span>
                    <span className="text-[10px] text-slate-400 font-semibold">1 jam yang lalu</span>
                  </li>
                  <li className="pt-2 flex items-center justify-between">
                    <span>Rian Hidayat memperbarui jam operasional Direktori Konseling.</span>
                    <span className="text-[10px] text-slate-400 font-semibold">Kemarin</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: REPROPEDIA CRUD */}
          {activeTab === "repropedia" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
                <div className="relative w-full sm:max-w-xs">
                  <input
                    type="text"
                    placeholder="Cari modul..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                </div>

                <button
                  onClick={() => setEditingModule({})}
                  className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah Modul</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs font-semibold text-slate-500">
                  <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Judul Modul</th>
                      <th className="py-3.5 px-4">Kategori</th>
                      <th className="py-3.5 px-4">Penulis</th>
                      <th className="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {modules
                      .filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-4 font-bold text-neutral-dark">{m.title}</td>
                          <td className="py-3.5 px-4 capitalize">{m.category.replace("-", " ")}</td>
                          <td className="py-3.5 px-4">{m.author}</td>
                          <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingModule(m)}
                              className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget({ type: "module", id: m.id, title: m.title })}
                              className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Overlay Modal for Module CRUD */}
              {editingModule && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                    
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                      <h3 className="font-extrabold text-neutral-dark text-lg">{editingModule.id ? "Edit Modul Repropedia" : "Buat Modul Baru"}</h3>
                      <button
                        onClick={() => setEditingModule(null)}
                        className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Judul Modul</label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Menjaga Organ Intim"
                            value={editingModule.title || ""}
                            onChange={(e) => setEditingModule(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Kategori</label>
                          <select
                            value={editingModule.category || "pubertas"}
                            onChange={(e) => setEditingModule(prev => ({ ...prev, category: e.target.value as any }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white font-bold text-slate-600"
                          >
                            <option value="pubertas">Pubertas</option>
                            <option value="pernikahan-anak">Pernikahan Anak</option>
                            <option value="hak-anak">Hak Anak</option>
                            <option value="kekerasan-seksual">Kekerasan Seksual</option>
                            <option value="kesehatan-mental">Kesehatan Mental</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Ringkasan Sinopsis</label>
                        <input
                          type="text"
                          required
                          placeholder="Jelaskan ringkasan isi modul..."
                          value={editingModule.synopsis || ""}
                          onChange={(e) => setEditingModule(prev => ({ ...prev, synopsis: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Konten Materi (Rich Text Simulation)</label>
                        <textarea
                          rows={6}
                          required
                          placeholder="Tuliskan materi edukasi lengkap di sini..."
                          value={editingModule.content || ""}
                          onChange={(e) => setEditingModule(prev => ({ ...prev, content: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Waktu Baca</label>
                          <input
                            type="text"
                            placeholder="5 menit"
                            value={editingModule.readTime || ""}
                            onChange={(e) => setEditingModule(prev => ({ ...prev, readTime: e.target.value }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Penulis / Ahli</label>
                          <input
                            type="text"
                            placeholder="dr. Anita Wijaya"
                            value={editingModule.author || ""}
                            onChange={(e) => setEditingModule(prev => ({ ...prev, author: e.target.value }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
                      <button
                        onClick={() => setEditingModule(null)}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 transition-all"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveModule}
                        className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md shadow-emerald-600/10 transition-all"
                      >
                        Simpan Modul
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: MEDIA / ARTICLES CRUD */}
          {activeTab === "media" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
                <div className="relative w-full sm:max-w-xs">
                  <input
                    type="text"
                    placeholder="Cari media..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
                  />
                  <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                </div>

                <button
                  onClick={() => setEditingMedia({})}
                  className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>Unggah Media</span>
                </button>
              </div>

              {/* Media Data Table */}
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs font-semibold text-slate-500">
                  <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Judul Artikel / Video</th>
                      <th className="py-3.5 px-4">Tipe</th>
                      <th className="py-3.5 px-4">Kategori</th>
                      <th className="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {media
                      .filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-4 font-bold text-neutral-dark">{item.title}</td>
                          <td className="py-3.5 px-4 capitalize">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.type === "video" ? "bg-amber-50 text-amber-800" : "bg-blue-50 text-blue-800"
                            }`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 capitalize">{item.category}</td>
                          <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingMedia(item)}
                              className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget({ type: "media", id: item.id, title: item.title })}
                              className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Overlay Modal for Media CRUD */}
              {editingMedia && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                    
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                      <h3 className="font-extrabold text-neutral-dark text-lg">
                        {editingMedia.id ? "Edit Artikel/Video" : "Unggah Artikel/Video Baru"}
                      </h3>
                      <button
                        onClick={() => setEditingMedia(null)}
                        className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Judul Media</label>
                        <input
                          type="text"
                          required
                          value={editingMedia.title || ""}
                          onChange={(e) => setEditingMedia(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Tipe Media</label>
                          <select
                            value={editingMedia.type || "article"}
                            onChange={(e) => setEditingMedia(prev => ({ ...prev, type: e.target.value as any }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white font-bold"
                          >
                            <option value="article">Artikel Teks</option>
                            <option value="video">Video Kampanye</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Kategori</label>
                          <select
                            value={editingMedia.category || "edukasi"}
                            onChange={(e) => setEditingMedia(prev => ({ ...prev, category: e.target.value as any }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white font-bold"
                          >
                            <option value="edukasi">Edukasi</option>
                            <option value="umum">Umum</option>
                            <option value="berita">Berita & Rilis</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                          {editingMedia.type === "video" ? "Embed Video URL (YouTube)" : "Featured Image CDN URL"}
                        </label>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={editingMedia.mediaUrl || ""}
                          onChange={(e) => setEditingMedia(prev => ({ ...prev, mediaUrl: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Deskripsi / Konten Teks</label>
                        <textarea
                          rows={4}
                          value={editingMedia.content || ""}
                          onChange={(e) => setEditingMedia(prev => ({ ...prev, content: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
                      <button
                        onClick={() => setEditingMedia(null)}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveMedia}
                        className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md"
                      >
                        Simpan Media
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: UGC MODERATION */}
          {activeTab === "ugc" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
                <div className="relative w-full sm:max-w-xs">
                  <input
                    type="text"
                    placeholder="Cari karya/kreator..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
                  />
                  <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                </div>

                <button
                  onClick={() => setEditingUgc({ type: "poster", likes: 0 })}
                  className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Karya Baru</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs font-semibold text-slate-500">
                  <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Nama Karya</th>
                      <th className="py-3.5 px-4">Kreator</th>
                      <th className="py-3.5 px-4">Sekolah</th>
                      <th className="py-3.5 px-4">Tipe</th>
                      <th className="py-3.5 px-4">Likes</th>
                      <th className="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ugc
                      .filter(u => u.title.toLowerCase().includes(searchTerm.toLowerCase()) || u.creatorName.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-4 font-bold text-neutral-dark">
                            <div className="flex items-center space-x-3">
                              <img src={item.mediaUrl} alt={item.title} className="w-10 h-7 object-cover rounded-md border border-slate-100" />
                              <span>{item.title}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">{item.creatorName}</td>
                          <td className="py-3.5 px-4">{item.school}</td>
                          <td className="py-3.5 px-4 uppercase">{item.type}</td>
                          <td className="py-3.5 px-4">{item.likes}</td>
                          <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingUgc(item)}
                              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-[10px] cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteTarget({ type: "ugc", id: item.id, title: item.title })}
                              className="px-3.5 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl font-bold text-[10px] cursor-pointer"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: QUIZ ENGINE CRUD */}
          {activeTab === "quiz" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
                <div className="relative w-full sm:max-w-xs">
                  <input
                    type="text"
                    placeholder="Cari pertanyaan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
                  />
                  <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                </div>

                <button
                  onClick={() => setEditingQuiz({ options: ["", "", "", ""], correctAnswer: 0 })}
                  className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>Pertanyaan Baru</span>
                </button>
              </div>

              {/* Quiz Questions Data Table */}
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs font-semibold text-slate-500">
                  <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Pertanyaan</th>
                      <th className="py-3.5 px-4">Kategori</th>
                      <th className="py-3.5 px-4">Kunci</th>
                      <th className="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {quizzes
                      .filter(q => q.questionText.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((q) => (
                        <tr key={q.id} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-4 font-bold text-neutral-dark truncate max-w-xs">{q.questionText}</td>
                          <td className="py-3.5 px-4 capitalize">{q.category}</td>
                          <td className="py-3.5 px-4">Opsi {String.fromCharCode(65 + q.correctAnswer)}</td>
                          <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingQuiz(q)}
                              className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget({ type: "quiz", id: q.id, title: q.questionText })}
                              className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Overlay Modal for Quiz Question CRUD */}
              {editingQuiz && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                    
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                      <h3 className="font-extrabold text-neutral-dark text-lg">
                        {editingQuiz.id ? "Edit Pertanyaan Kuis" : "Tambah Pertanyaan Kuis Baru"}
                      </h3>
                      <button
                        onClick={() => setEditingQuiz(null)}
                        className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Teks Pertanyaan</label>
                        <textarea
                          rows={2}
                          required
                          value={editingQuiz.questionText || ""}
                          onChange={(e) => setEditingQuiz(prev => ({ ...prev, questionText: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Opsi Jawaban (A s.d D)</label>
                        {editingQuiz.options?.map((opt, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <span className="text-xs font-extrabold text-slate-400">{String.fromCharCode(65 + idx)}</span>
                            <input
                              type="text"
                              required
                              value={opt}
                              onChange={(e) => {
                                const updated = [...(editingQuiz.options || [])];
                                updated[idx] = e.target.value;
                                setEditingQuiz(prev => ({ ...prev, options: updated }));
                              }}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Jawaban Benar</label>
                          <select
                            value={editingQuiz.correctAnswer ?? 0}
                            onChange={(e) => setEditingQuiz(prev => ({ ...prev, correctAnswer: Number(e.target.value) }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-bold"
                          >
                            <option value={0}>Opsi A</option>
                            <option value={1}>Opsi B</option>
                            <option value={2}>Opsi C</option>
                            <option value={3}>Opsi D</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Kategori Kuis</label>
                          <input
                            type="text"
                            required
                            placeholder="pubertas / pernikahan-anak"
                            value={editingQuiz.category || ""}
                            onChange={(e) => setEditingQuiz(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Penjelasan Edukasi</label>
                        <textarea
                          rows={2}
                          required
                          value={editingQuiz.explanation || ""}
                          onChange={(e) => setEditingQuiz(prev => ({ ...prev, explanation: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
                      <button
                        onClick={() => setEditingQuiz(null)}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveQuiz}
                        className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md"
                      >
                        Simpan Soal
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 6: STATISTICS DATA ENTRY */}
          {activeTab === "stats" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
                <div className="relative w-full sm:max-w-xs">
                  <input
                    type="text"
                    placeholder="Cari tahun..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
                  />
                  <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                </div>

                <button
                  onClick={() => setEditingStat({})}
                  className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah Statistik</span>
                </button>
              </div>

              {/* Statistics Cases Data Table */}
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs font-semibold text-slate-500">
                  <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Tahun</th>
                      <th className="py-3.5 px-4">Desa Sukamaju</th>
                      <th className="py-3.5 px-4">Desa Harapan</th>
                      <th className="py-3.5 px-4">Desa Mekarjaya</th>
                      <th className="py-3.5 px-4">Desa Kertajaya</th>
                      <th className="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats
                      .filter(s => s.year.toString().includes(searchTerm))
                      .map((s, idx) => (
                        <tr key={s.year} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-4 font-bold text-neutral-dark">{s.year}</td>
                          <td className="py-3.5 px-4">{s["Desa Sukamaju"]} kasus</td>
                          <td className="py-3.5 px-4">{s["Desa Harapan"]} kasus</td>
                          <td className="py-3.5 px-4">{s["Desa Mekarjaya"]} kasus</td>
                          <td className="py-3.5 px-4">{s["Desa Kertajaya"]} kasus</td>
                          <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingStat({ ...s, index: idx })}
                              className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget({ type: "stat", id: idx, title: `Tahun ${s.year}` })}
                              className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Overlay Modal for Stat CRUD */}
              {editingStat && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                    
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                      <h3 className="font-extrabold text-neutral-dark text-lg">
                        {editingStat.index !== undefined ? "Edit Baris Kasus" : "Tambah Baris Kasus Baru"}
                      </h3>
                      <button
                        onClick={() => setEditingStat(null)}
                        className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Tahun Kejadian</label>
                        <input
                          type="number"
                          required
                          value={editingStat.year || ""}
                          onChange={(e) => setEditingStat(prev => ({ ...prev, year: Number(e.target.value) }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Desa Sukamaju</label>
                          <input
                            type="number"
                            value={editingStat["Desa Sukamaju"] ?? ""}
                            onChange={(e) => setEditingStat(prev => ({ ...prev, "Desa Sukamaju": Number(e.target.value) }))}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Desa Harapan</label>
                          <input
                            type="number"
                            value={editingStat["Desa Harapan"] ?? ""}
                            onChange={(e) => setEditingStat(prev => ({ ...prev, "Desa Harapan": Number(e.target.value) }))}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Desa Mekarjaya</label>
                          <input
                            type="number"
                            value={editingStat["Desa Mekarjaya"] ?? ""}
                            onChange={(e) => setEditingStat(prev => ({ ...prev, "Desa Mekarjaya": Number(e.target.value) }))}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Desa Kertajaya</label>
                          <input
                            type="number"
                            value={editingStat["Desa Kertajaya"] ?? ""}
                            onChange={(e) => setEditingStat(prev => ({ ...prev, "Desa Kertajaya": Number(e.target.value) }))}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
                      <button
                        onClick={() => setEditingStat(null)}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveStat}
                        className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md"
                      >
                        Simpan Data
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 7: COUNSELORS DIRECTORY */}
          {activeTab === "counselors" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
                <div className="relative w-full sm:max-w-xs">
                  <input
                    type="text"
                    placeholder="Cari pendamping..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
                  />
                  <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                </div>

                <button
                  onClick={() => setEditingCounselor({})}
                  className="w-full sm:w-auto px-4.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>Pendamping Baru</span>
                </button>
              </div>

              {/* Counselors Data Table */}
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs font-semibold text-slate-500">
                  <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Nama</th>
                      <th className="py-3.5 px-4">Peran</th>
                      <th className="py-3.5 px-4">No. WhatsApp</th>
                      <th className="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {counselors
                      .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-4 font-bold text-neutral-dark">{c.name}</td>
                          <td className="py-3.5 px-4">{c.role}</td>
                          <td className="py-3.5 px-4">{c.whatsappNumber}</td>
                          <td className="py-3.5 px-4 text-right flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingCounselor(c)}
                              className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget({ type: "counselor", id: c.id, title: c.name })}
                              className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Overlay Modal for Counselor CRUD */}
              {editingCounselor && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                    
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                      <h3 className="font-extrabold text-neutral-dark text-lg">
                        {editingCounselor.id ? "Edit Kontak Rujukan" : "Tambah Kontak Rujukan Baru"}
                      </h3>
                      <button
                        onClick={() => setEditingCounselor(null)}
                        className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nama Lengkap</label>
                          <input
                            type="text"
                            required
                            value={editingCounselor.name || ""}
                            onChange={(e) => setEditingCounselor(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Kategori Peran</label>
                          <select
                            value={editingCounselor.role || "Kader GARUDA"}
                            onChange={(e) => setEditingCounselor(prev => ({ ...prev, role: e.target.value as any }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white font-bold"
                          >
                            <option value="Kader GARUDA">Kader GARUDA</option>
                            <option value="Guru BK">Guru BK</option>
                            <option value="Puskesmas">Puskesmas</option>
                            <option value="Psikolog">Psikolog</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">No. WhatsApp</label>
                          <input
                            type="text"
                            required
                            placeholder="+62..."
                            value={editingCounselor.whatsappNumber || ""}
                            onChange={(e) => setEditingCounselor(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Jam Operasional Kerja</label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Senin - Sabtu, 08.00 - 15.00"
                            value={editingCounselor.operationalHours || ""}
                            onChange={(e) => setEditingCounselor(prev => ({ ...prev, operationalHours: e.target.value }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nama Instansi / Ruangan (Opsional)</label>
                        <input
                          type="text"
                          placeholder="Ruang BK SMA 1 / Puskesmas KIA"
                          value={editingCounselor.locationName || ""}
                          onChange={(e) => setEditingCounselor(prev => ({ ...prev, locationName: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
                      <button
                        onClick={() => setEditingCounselor(null)}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveCounselor}
                        className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md"
                      >
                        Simpan Pendamping
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 8: GENERAL SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl">
              
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-neutral-dark">Pengaturan Konten Umum</h2>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">Ubah parameter teks statis situs utama dalam sekali klik.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Visi Organisasi</label>
                    <textarea
                      rows={2}
                      value={vision}
                      onChange={(e) => setVision(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Misi Organisasi</label>
                    <textarea
                      rows={3}
                      value={mission}
                      onChange={(e) => setMission(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Nama Ketua Kader GARUDA</label>
                    <input
                      type="text"
                      value={ketuaName}
                      onChange={(e) => setKetuaName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => triggerToast("Pengaturan umum berhasil disimpan!", "success")}
                    className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md shadow-emerald-600/10 transition-all active:scale-98"
                  >
                    Simpan Perubahan Pengaturan
                  </button>
                </div>
              </div>

            </div>
          )}

        </main>

        {/* Overlay Modal for UGC CRUD */}
        {editingUgc && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                <h3 className="font-extrabold text-neutral-dark text-lg">
                  {editingUgc.id ? "Edit Karya Siswa" : "Tambah Karya Siswa Baru"}
                </h3>
                <button
                  onClick={() => setEditingUgc(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-50 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Judul Karya</label>
                    <input
                      type="text"
                      required
                      value={editingUgc.title || ""}
                      onChange={(e) => setEditingUgc(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nama Kreator</label>
                    <input
                      type="text"
                      required
                      value={editingUgc.creatorName || ""}
                      onChange={(e) => setEditingUgc(prev => ({ ...prev, creatorName: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Asal Sekolah</label>
                    <input
                      type="text"
                      required
                      value={editingUgc.school || ""}
                      onChange={(e) => setEditingUgc(prev => ({ ...prev, school: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Jenis Karya</label>
                    <select
                      value={editingUgc.type || "poster"}
                      onChange={(e) => setEditingUgc(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white font-bold"
                    >
                      <option value="poster">Poster Kampanye</option>
                      <option value="infografis">Infografis Data</option>
                      <option value="video">Video Edukasi</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">URL Media Gambar</label>
                    <input
                      type="text"
                      required
                      placeholder="https://..."
                      value={editingUgc.mediaUrl || ""}
                      onChange={(e) => setEditingUgc(prev => ({ ...prev, mediaUrl: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Jumlah Likes</label>
                    <input
                      type="number"
                      required
                      value={editingUgc.likes ?? 0}
                      onChange={(e) => setEditingUgc(prev => ({ ...prev, likes: Number(e.target.value) }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Deskripsi Karya</label>
                  <textarea
                    rows={3}
                    placeholder="Gagasan atau pesan dari karya ini..."
                    value={editingUgc.description || ""}
                    onChange={(e) => setEditingUgc(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  onClick={() => setEditingUgc(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveUgc}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md cursor-pointer"
                >
                  Simpan Karya
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Custom Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <AlertCircle className="h-7 w-7 animate-pulse" />
              </div>
              <div>
                <h3 className="font-extrabold text-neutral-dark text-lg">Hapus Data?</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Apakah Anda yakin ingin menghapus <strong>"{deleteTarget.title}"</strong>? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={executeDelete}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/10 transition-all"
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
