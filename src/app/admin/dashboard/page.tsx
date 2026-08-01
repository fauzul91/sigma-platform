"use client";

import React, { useState, useEffect } from "react";
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
  FolderLock
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // CMS Tabs
  const [activeTab, setActiveTab] = useState<"overview" | "repropedia" | "media" | "ugc" | "quiz" | "stats" | "counselors" | "settings">("overview");

  // Dynamic session datasets
  const [modules, setModules] = useState<RepropediaItem[]>(initialModules);
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [ugc, setUgc] = useState<UgcItem[]>(initialUgc);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>(initialQuiz);
  const [stats, setStats] = useState<StatRecord[]>(initialStats);
  const [counselors, setCounselors] = useState<Counselor[]>(initialCounselors);

  // Edit states
  const [editingModule, setEditingModule] = useState<Partial<RepropediaItem> | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<Partial<QuizQuestion> | null>(null);
  const [editingCounselor, setEditingCounselor] = useState<Partial<Counselor> | null>(null);

  // Persist to session storage to demonstrate updates across pages
  useEffect(() => {
    // Check local session authentication
    const authStatus = sessionStorage.getItem("adminAuth") === "true";
    if (authStatus) setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      setLoginError("");
    } else {
      setLoginError("Kombinasi Username / Password salah!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
  };

  // CRUD handlers
  const handleSaveModule = () => {
    if (editingModule?.title) {
      if (editingModule.id) {
        setModules(prev => prev.map(m => m.id === editingModule.id ? { ...m, ...editingModule } as RepropediaItem : m));
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
          author: editingModule.author || "Admin SIGMA",
          date: "Hari ini",
        };
        setModules(prev => [newModule, ...prev]);
      }
      setEditingModule(null);
    }
  };

  const handleDeleteModule = (id: string) => {
    setModules(prev => prev.filter(m => m.id !== id));
  };

  // Quiz CRUD
  const handleSaveQuiz = () => {
    if (editingQuiz?.questionText) {
      if (editingQuiz.id) {
        setQuizzes(prev => prev.map(q => q.id === editingQuiz.id ? { ...q, ...editingQuiz } as QuizQuestion : q));
      } else {
        const newQuiz: QuizQuestion = {
          id: `q-gen-${Date.now()}`,
          category: editingQuiz.category || "umum",
          questionText: editingQuiz.questionText,
          options: editingQuiz.options || ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
          correctAnswer: editingQuiz.correctAnswer ?? 0,
          explanation: editingQuiz.explanation || "",
        };
        setQuizzes(prev => [newQuiz, ...prev]);
      }
      setEditingQuiz(null);
    }
  };

  const handleDeleteQuiz = (id: string) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
  };

  // Counselors CRUD
  const handleSaveCounselor = () => {
    if (editingCounselor?.name) {
      if (editingCounselor.id) {
        setCounselors(prev => prev.map(c => c.id === editingCounselor.id ? { ...c, ...editingCounselor } as Counselor : c));
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
      }
      setEditingCounselor(null);
    }
  };

  const handleDeleteCounselor = (id: string) => {
    setCounselors(prev => prev.filter(c => c.id !== id));
  };

  const handleModerationUgc = (id: string, action: "approve" | "reject") => {
    if (action === "reject") {
      setUgc(prev => prev.filter(item => item.id !== id));
    } else {
      // simulate approval
      alert("Karya berhasil disetujui untuk masuk galeri publik!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl text-center">
          
          <div className="space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-dark text-white">
              <FolderLock className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-neutral-dark">CMS Admin SIGMA</h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-normal">
              Masukkan kredensial pengelola untuk mengelola Repropedia, direktori konseling, kuis, dan data statistik.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Username</label>
              <input
                type="text"
                required
                placeholder="Masukkan username (admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Password</label>
              <input
                type="password"
                required
                placeholder="Masukkan password (admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-xs font-bold text-center mt-2">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-neutral-dark text-white font-extrabold text-xs hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
            >
              <Lock className="h-4 w-4" />
              <span>Masuk Sekarang</span>
            </button>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col lg:flex-row">
      
      {/* Sidebar navigation panel */}
      <aside className="w-full lg:w-64 bg-neutral-dark text-slate-300 flex flex-col justify-between shrink-0 p-5 border-r border-slate-800">
        <div className="space-y-8">
          
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
              <Unlock className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base leading-none tracking-tight block">SIGMA CMS</span>
              <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase block">Pengelola Aktif</span>
            </div>
          </div>

          <nav className="flex flex-col space-y-1 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => { setActiveTab("overview"); setEditingModule(null); setEditingQuiz(null); setEditingCounselor(null); }}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "overview" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <BarChart2 className="h-4.5 w-4.5" />
              <span>Analitik Dashboard</span>
            </button>

            <button
              onClick={() => { setActiveTab("repropedia"); setEditingModule(null); }}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "repropedia" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <BookOpen className="h-4.5 w-4.5" />
              <span>Repropedia Hub</span>
            </button>

            <button
              onClick={() => { setActiveTab("media"); }}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "media" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <FileText className="h-4.5 w-4.5" />
              <span>Artikel & Media</span>
            </button>

            <button
              onClick={() => { setActiveTab("ugc"); }}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "ugc" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <Users className="h-4.5 w-4.5" />
              <span>Moderasi Karya</span>
            </button>

            <button
              onClick={() => { setActiveTab("quiz"); setEditingQuiz(null); }}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "quiz" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Quiz Engine</span>
            </button>

            <button
              onClick={() => { setActiveTab("stats"); }}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "stats" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <Database className="h-4.5 w-4.5" />
              <span>Input Data Kasus</span>
            </button>

            <button
              onClick={() => { setActiveTab("counselors"); setEditingCounselor(null); }}
              className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors ${activeTab === "counselors" ? "bg-primary text-white" : "hover:bg-slate-800"}`}
            >
              <Users className="h-4.5 w-4.5" />
              <span>Direktori Konseling</span>
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 px-4 py-3 bg-red-950/40 text-red-400 hover:bg-red-950/60 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 border border-red-900/30"
        >
          <span>Keluar CMS</span>
        </button>
      </aside>

      {/* Main content body */}
      <main className="flex-grow p-6 md:p-8 space-y-6 overflow-y-auto">
        
        {/* TAB 1: OVERVIEW ANALYTICS */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-neutral-dark">Analitik Pengunjung</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-sm">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Total Kunjungan Web</p>
                <h3 className="text-3xl font-extrabold text-neutral-dark mt-1">2,840 Halaman</h3>
                <p className="text-xs text-primary font-semibold mt-1">▲ 14% Bulan ini</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-sm">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Kategori Paling Sering Dibaca</p>
                <h3 className="text-3xl font-extrabold text-neutral-dark mt-1">Pernikahan Anak</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">Modul Repropedia</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-sm">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Tingkat Penyelesaian Kuis</p>
                <h3 className="text-3xl font-extrabold text-neutral-dark mt-1">84% Selesai</h3>
                <p className="text-xs text-amber-600 font-semibold mt-1">Sangat Interaktif</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-neutral-dark">Audit Sistem / Aktivitas Terakhir</h3>
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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-extrabold text-neutral-dark">Pengelolaan Modul Repropedia</h1>
              {!editingModule && (
                <button
                  onClick={() => setEditingModule({})}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Modul Baru</span>
                </button>
              )}
            </div>

            {editingModule ? (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4 max-w-2xl">
                <h2 className="text-base font-bold text-neutral-dark">{editingModule.id ? "Edit Modul" : "Tambah Modul Baru"}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Judul Modul</label>
                    <input
                      type="text"
                      value={editingModule.title || ""}
                      onChange={(e) => setEditingModule(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Kategori</label>
                    <select
                      value={editingModule.category || "pubertas"}
                      onChange={(e) => setEditingModule(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white font-bold text-slate-600"
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
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Sinopsis Pendek</label>
                  <input
                    type="text"
                    value={editingModule.synopsis || ""}
                    onChange={(e) => setEditingModule(prev => ({ ...prev, synopsis: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Konten Materi (Rich Text Simulation)</label>
                  <textarea
                    rows={6}
                    value={editingModule.content || ""}
                    onChange={(e) => setEditingModule(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveModule}
                    className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all"
                  >
                    Simpan Modul
                  </button>
                  <button
                    onClick={() => setEditingModule(null)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 transition-all"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs font-semibold text-slate-500">
                  <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Judul Modul</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Penulis</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {modules.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-neutral-dark">{m.title}</td>
                        <td className="py-3 px-4">{m.category}</td>
                        <td className="py-3 px-4">{m.author}</td>
                        <td className="py-3 px-4 text-right flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingModule(m)}
                            className="p-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteModule(m.id)}
                            className="p-1 rounded bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MEDIA CRUD (MOCK ALERTER) */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-neutral-dark">Pengelolaan Artikel & Video Kampanye</h1>
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
              <FileText className="h-12 w-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-neutral-dark">Modul Artikel & Video Siap Dihubungkan</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Antarmuka visual CRUD artikel & unggah video media terintegrasi dengan simulasi JSON. Modifikasi dapat dilakukan dengan lancar.
              </p>
              <button
                onClick={() => alert("Simulasi Tambah Artikel Berhasil!")}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-hover transition-colors"
              >
                Unggah Artikel / Video Baru
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: UGC MODERATION */}
        {activeTab === "ugc" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-neutral-dark">Moderasi Pengajuan Karya Siswa</h1>
            
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs font-semibold text-slate-500">
                <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Nama Karya</th>
                    <th className="py-3 px-4">Pengirim</th>
                    <th className="py-3 px-4">Asal Sekolah</th>
                    <th className="py-3 px-4 text-right">Tindakan Moderasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ugc.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-neutral-dark">{item.title}</td>
                      <td className="py-3 px-4">{item.creatorName}</td>
                      <td className="py-3 px-4">{item.school}</td>
                      <td className="py-3 px-4 text-right flex justify-end space-x-2">
                        <button
                          onClick={() => handleModerationUgc(item.id, "approve")}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-[10px]"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => handleModerationUgc(item.id, "reject")}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold text-[10px]"
                        >
                          Tolak
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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-extrabold text-neutral-dark">Manajemen Kuis Interaktif</h1>
              {!editingQuiz && (
                <button
                  onClick={() => setEditingQuiz({ options: ["", "", "", ""], correctAnswer: 0 })}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Pertanyaan Baru</span>
                </button>
              )}
            </div>

            {editingQuiz ? (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4 max-w-2xl">
                <h2 className="text-base font-bold text-neutral-dark">{editingQuiz.id ? "Edit Soal" : "Buat Soal Baru"}</h2>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Teks Pertanyaan</label>
                  <textarea
                    rows={2}
                    value={editingQuiz.questionText || ""}
                    onChange={(e) => setEditingQuiz(prev => ({ ...prev, questionText: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Pilihan Jawaban (A s.d D)</label>
                  {editingQuiz.options?.map((opt, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-400">{String.fromCharCode(65 + idx)}</span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updatedOpts = [...(editingQuiz.options || [])];
                          updatedOpts[idx] = e.target.value;
                          setEditingQuiz(prev => ({ ...prev, options: updatedOpts }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Pilihan Benar (Indeks)</label>
                    <select
                      value={editingQuiz.correctAnswer ?? 0}
                      onChange={(e) => setEditingQuiz(prev => ({ ...prev, correctAnswer: parseInt(e.target.value) }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-bold"
                    >
                      <option value={0}>Pilihan A</option>
                      <option value={1}>Pilihan B</option>
                      <option value={2}>Pilihan C</option>
                      <option value={3}>Pilihan D</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Kategori Soal</label>
                    <input
                      type="text"
                      placeholder="pubertas / hak-anak / dll"
                      value={editingQuiz.category || ""}
                      onChange={(e) => setEditingQuiz(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Penjelasan Singkat (Edukasi)</label>
                  <textarea
                    rows={2}
                    value={editingQuiz.explanation || ""}
                    onChange={(e) => setEditingQuiz(prev => ({ ...prev, explanation: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveQuiz}
                    className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all"
                  >
                    Simpan Pertanyaan
                  </button>
                  <button
                    onClick={() => setEditingQuiz(null)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 transition-all"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs font-semibold text-slate-500">
                  <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Pertanyaan</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Kunci Jawaban</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {quizzes.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-neutral-dark truncate max-w-xs">{q.questionText}</td>
                        <td className="py-3 px-4">{q.category}</td>
                        <td className="py-3 px-4">Pilihan {String.fromCharCode(65 + q.correctAnswer)}</td>
                        <td className="py-3 px-4 text-right flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingQuiz(q)}
                            className="p-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuiz(q.id)}
                            className="p-1 rounded bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: STATS DATA ENTRY */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-neutral-dark">Entri Data Statistik Pernikahan Anak</h1>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4 max-w-xl">
              <h3 className="text-sm font-bold text-neutral-dark">Masukkan Data Tahun Berjalan</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Tahun Pengamatan</label>
                  <input
                    type="number"
                    defaultValue={2026}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nama Desa / Kelurahan</label>
                  <input
                    type="text"
                    defaultValue="Desa Sukamaju"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Jumlah Kasus (Jiwa)</label>
                  <input
                    type="number"
                    defaultValue={2}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Sumber Instansi Data</label>
                  <input
                    type="text"
                    defaultValue="KUA Kecamatan Sehat"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <button
                onClick={() => alert("Data kasus statistik berhasil ditambahkan ke simulation pool!")}
                className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                Simpan & Update Grafik Publik
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: COUNSELORS DIRECTORY */}
        {activeTab === "counselors" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-extrabold text-neutral-dark">Manajemen Jaringan Konseling & Rujukan</h1>
              {!editingCounselor && (
                <button
                  onClick={() => setEditingCounselor({})}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Pendamping Baru</span>
                </button>
              )}
            </div>

            {editingCounselor ? (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4 max-w-xl">
                <h3 className="text-sm font-bold text-neutral-dark">Detail Pendamping</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nama Lengkap</label>
                    <input
                      type="text"
                      value={editingCounselor.name || ""}
                      onChange={(e) => setEditingCounselor(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Peran / Afiliasi</label>
                    <select
                      value={editingCounselor.role || "Kader GARUDA"}
                      onChange={(e) => setEditingCounselor(prev => ({ ...prev, role: e.target.value as any }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-bold"
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
                      placeholder="+628..."
                      value={editingCounselor.whatsappNumber || ""}
                      onChange={(e) => setEditingCounselor(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Jam Operasional Kerja</label>
                    <input
                      type="text"
                      value={editingCounselor.operationalHours || ""}
                      onChange={(e) => setEditingCounselor(prev => ({ ...prev, operationalHours: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveCounselor}
                    className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all"
                  >
                    Simpan Pendamping
                  </button>
                  <button
                    onClick={() => setEditingCounselor(null)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 transition-all"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs font-semibold text-slate-500">
                  <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wide border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Nama</th>
                      <th className="py-3 px-4">Peran</th>
                      <th className="py-3 px-4">WhatsApp</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {counselors.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-neutral-dark">{c.name}</td>
                        <td className="py-3 px-4">{c.role}</td>
                        <td className="py-3 px-4">{c.whatsappNumber}</td>
                        <td className="py-3 px-4 text-right flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingCounselor(c)}
                            className="p-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCounselor(c.id)}
                            className="p-1 rounded bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
