"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  saveModule,
  deleteModule,
  saveMedia,
  deleteMedia,
  saveUgc,
  deleteUgc,
  saveCounselor,
  deleteCounselor,
  saveStat,
  deleteStat,
  saveQuiz,
  deleteQuiz,
  saveEvent,
  deleteEvent,
  saveOrgMember,
  deleteOrgMember,
  saveSettings,
} from "@/services/admin/adminService";
import {
  AdminToastState,
  AdminDeleteTarget,
  AdminDashboardStats,
  RepropediaItem,
  MediaItem,
  UgcItem,
  QuizQuestion,
  StatRecord,
  Counselor,
  EventItem,
  OrgMember,
  AdminGeneralSettings,
} from "@/types";

export function useAdminDashboard({
  initialModules = [],
  initialMedia = [],
  initialUgc = [],
  initialQuizzes = [],
  initialStats = [],
  initialCounselors = [],
  initialEvents = [],
  initialOrgMembers = [],
  initialSettings = null,
  initialDashboardStats = null,
}: {
  initialModules?: RepropediaItem[];
  initialMedia?: MediaItem[];
  initialUgc?: UgcItem[];
  initialQuizzes?: QuizQuestion[];
  initialStats?: StatRecord[];
  initialCounselors?: Counselor[];
  initialEvents?: EventItem[];
  initialOrgMembers?: OrgMember[];
  initialSettings?: AdminGeneralSettings | null;
  initialDashboardStats?: AdminDashboardStats | null;
} = {}) {
  const router = useRouter();
  const [isAuthenticated] = useState(true); // Always true since middleware handles auth
  const [isLoading] = useState(false);

  // States initialized with server-fetched datasets
  const [modules, setModules] = useState<RepropediaItem[]>(initialModules);
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [ugc, setUgc] = useState<UgcItem[]>(initialUgc);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>(initialQuizzes);
  const [stats, setStats] = useState<StatRecord[]>(initialStats);
  const [counselors, setCounselors] = useState<Counselor[]>(initialCounselors);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [orgMembers, setOrgMembers] = useState<OrgMember[]>(initialOrgMembers);

  // Settings state initialized with fallback or server settings
  const [vision, setVision] = useState(
    initialSettings?.vision ||
      "Terwujudnya Generasi Remaja Desa yang Sehat, Berpendidikan, dan Bebas dari Pernikahan Usia Anak."
  );
  const [mission, setMission] = useState(
    initialSettings?.mission ||
      "1. Menyediakan platform edukasi digital kesehatan reproduksi yang mudah diakses.\n2. Memberikan layanan konseling sebaya dan rujukan darurat yang aman dan rahasia."
  );
  const [ketuaName, setKetuaName] = useState(
    initialSettings?.ketuaName || "Bintang Prakoso (Ketua Kader GARUDA)"
  );

  // Dashboard stats state
  const [dashboardStats, setDashboardStats] = useState<AdminDashboardStats>(
    initialDashboardStats || {
      totalModules: 0,
      totalMedia: 0,
      totalUgc: 0,
      totalEvents: 0,
      totalCounselors: 0,
      totalQuizzes: 0,
      recentItems: [],
    }
  );

  // Search queries per tab
  const [searchTerm, setSearchTerm] = useState("");

  // CRUD modals state
  const [editingModule, setEditingModule] = useState<Partial<RepropediaItem> | null>(null);
  const [editingMedia, setEditingMedia] = useState<Partial<MediaItem> | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<Partial<QuizQuestion> | null>(null);
  const [editingCounselor, setEditingCounselor] = useState<Partial<Counselor> | null>(null);
  const [editingStat, setEditingStat] = useState<(Partial<StatRecord> & { index?: number }) | null>(null);
  const [editingUgc, setEditingUgc] = useState<Partial<UgcItem> | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<EventItem> | null>(null);
  const [editingMember, setEditingMember] = useState<Partial<OrgMember> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminDeleteTarget | null>(null);

  // Toast notification state
  const [toast, setToast] = useState<AdminToastState | null>(null);

  const triggerToast = (
    message: string,
    type: "success" | "info" | "danger" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = () => {
    triggerToast("Berhasil keluar dari sesi.", "info");
    router.push("/admin/login");
  };

  // 1. Repropedia CRUD
  const handleSaveModule = async () => {
    if (editingModule?.title) {
      const isEdit = Boolean(editingModule.id);
      const saved = await saveModule(editingModule);
      if (saved) {
        setModules((prev) =>
          isEdit ? prev.map((m) => (m.id === saved.id ? saved : m)) : [saved, ...prev]
        );
        triggerToast(
          isEdit
            ? "Modul berhasil diperbarui di Supabase!"
            : "Modul baru berhasil ditambahkan ke Supabase!",
          "success",
        );
      } else {
        triggerToast("Gagal menyimpan modul ke Supabase.", "danger");
      }
      setEditingModule(null);
    }
  };

  // 2. Media CRUD
  const handleSaveMedia = async () => {
    if (editingMedia?.title) {
      const isEdit = Boolean(editingMedia.id);
      const saved = await saveMedia(editingMedia);
      if (saved) {
        setMedia((prev) =>
          isEdit ? prev.map((m) => (m.id === saved.id ? saved : m)) : [saved, ...prev]
        );
        triggerToast(
          isEdit
            ? "Media berhasil diperbarui di Supabase!"
            : "Media baru berhasil ditambahkan ke Supabase!",
          "success",
        );
      } else {
        triggerToast("Gagal menyimpan media ke Supabase.", "danger");
      }
      setEditingMedia(null);
    }
  };

  // 3. Quiz CRUD
  const handleSaveQuiz = async () => {
    if (editingQuiz?.questionText) {
      const isEdit = Boolean(editingQuiz.id);
      const saved = await saveQuiz(editingQuiz);
      if (saved) {
        setQuizzes((prev) =>
          isEdit ? prev.map((q) => (q.id === saved.id ? saved : q)) : [saved, ...prev]
        );
        triggerToast(
          isEdit
            ? "Pertanyaan kuis diperbarui di Supabase!"
            : "Pertanyaan kuis ditambahkan ke Supabase!",
          "success",
        );
      } else {
        triggerToast("Gagal menyimpan kuis ke Supabase.", "danger");
      }
      setEditingQuiz(null);
    }
  };

  // 4. Statistics CRUD
  const handleSaveStat = async () => {
    if (editingStat?.year) {
      const saved = await saveStat(editingStat);
      if (saved) {
        setStats((prev) => {
          const exists = prev.some((s) => s.year === saved.year);
          return exists
            ? prev.map((s) => (s.year === saved.year ? saved : s))
            : [saved, ...prev].sort((a, b) => a.year - b.year);
        });
        triggerToast("Data statistik disimpan ke Supabase!", "success");
      } else {
        triggerToast("Gagal menyimpan statistik ke Supabase.", "danger");
      }
      setEditingStat(null);
    }
  };

  // 5. Counselors CRUD
  const handleSaveCounselor = async () => {
    if (editingCounselor?.name) {
      const isEdit = Boolean(editingCounselor.id);
      const saved = await saveCounselor(editingCounselor);
      if (saved) {
        setCounselors((prev) =>
          isEdit ? prev.map((c) => (c.id === saved.id ? saved : c)) : [...prev, saved]
        );
        triggerToast(
          isEdit
            ? "Kontak pendamping diperbarui di Supabase!"
            : "Pendamping baru ditambahkan ke Supabase!",
          "success",
        );
      } else {
        triggerToast("Gagal menyimpan pendamping ke Supabase.", "danger");
      }
      setEditingCounselor(null);
    }
  };

  // 6. UGC CRUD
  const handleSaveUgc = async () => {
    if (editingUgc?.title && editingUgc?.creatorName) {
      const isEdit = Boolean(editingUgc.id);
      const saved = await saveUgc(editingUgc);
      if (saved) {
        setUgc((prev) =>
          isEdit ? prev.map((u) => (u.id === saved.id ? saved : u)) : [saved, ...prev]
        );
        triggerToast(
          isEdit ? "Karya diperbarui di Supabase!" : "Karya baru ditambahkan ke Supabase!",
          "success",
        );
      } else {
        triggerToast("Gagal menyimpan karya ke Supabase.", "danger");
      }
      setEditingUgc(null);
    }
  };

  // 0. Settings
  const handleSaveSettings = async () => {
    const success = await saveSettings({
      vision,
      mission,
      ketuaName,
    });
    if (success) {
      triggerToast("Pengaturan berhasil disimpan ke Supabase!", "success");
    } else {
      triggerToast("Gagal menyimpan pengaturan ke Supabase.", "danger");
    }
  };

  // 7. Events CRUD
  const handleSaveEvent = async () => {
    if (editingEvent?.title) {
      const isEdit = Boolean(editingEvent.id);
      const saved = await saveEvent(editingEvent);
      if (saved) {
        setEvents((prev) =>
          isEdit ? prev.map((e) => (e.id === saved.id ? saved : e)) : [saved, ...prev]
        );
        triggerToast(
          isEdit ? "Kegiatan diperbarui di Supabase!" : "Kegiatan baru ditambahkan ke Supabase!",
          "success",
        );
      } else {
        triggerToast("Gagal menyimpan kegiatan ke Supabase.", "danger");
      }
      setEditingEvent(null);
    }
  };

  // 8. Org Members CRUD
  const handleSaveMember = async () => {
    if (editingMember?.name && editingMember?.key) {
      const isEdit = Boolean(editingMember.id);
      const saved = await saveOrgMember(editingMember);
      if (saved) {
        setOrgMembers((prev) =>
          isEdit
            ? prev.map((m) => (m.id === saved.id ? saved : m))
            : [...prev, saved].sort((a, b) => a.sortOrder - b.sortOrder)
        );
        triggerToast(
          isEdit
            ? "Anggota organisasi diperbarui di Supabase!"
            : "Anggota baru ditambahkan ke Supabase!",
          "success",
        );
      } else {
        triggerToast("Gagal menyimpan anggota ke Supabase.", "danger");
      }
      setEditingMember(null);
    }
  };

  // Deletion orchestrator
  const executeDelete = async () => {
    if (!deleteTarget) return;
    const { type, id } = deleteTarget;
    let success = false;

    if (type === "module") {
      success = await deleteModule(String(id));
      if (success) setModules((prev) => prev.filter((m) => m.id !== id));
    } else if (type === "media") {
      success = await deleteMedia(String(id));
      if (success) setMedia((prev) => prev.filter((m) => m.id !== id));
    } else if (type === "quiz") {
      success = await deleteQuiz(String(id));
      if (success) setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } else if (type === "stat") {
      const targetStat = stats.find((_, idx) => idx === id || _.year === id);
      if (targetStat) {
        success = await deleteStat(targetStat.year);
        if (success) setStats((prev) => prev.filter((s) => s.year !== targetStat.year));
      }
    } else if (type === "counselor") {
      success = await deleteCounselor(String(id));
      if (success) setCounselors((prev) => prev.filter((c) => c.id !== id));
    } else if (type === "ugc") {
      success = await deleteUgc(String(id));
      if (success) setUgc((prev) => prev.filter((u) => u.id !== id));
    } else if (type === "event") {
      success = await deleteEvent(String(id));
      if (success) setEvents((prev) => prev.filter((e) => e.id !== id));
    } else if (type === "org") {
      success = await deleteOrgMember(String(id));
      if (success) setOrgMembers((prev) => prev.filter((m) => m.id !== id));
    }

    if (success) {
      triggerToast("Data berhasil dihapus dari Supabase.", "danger");
    } else {
      triggerToast("Gagal menghapus data dari Supabase.", "danger");
    }
    setDeleteTarget(null);
  };

  const refreshData = () => {
    router.refresh();
  };

  return {
    isAuthenticated,
    isLoading,
    dashboardStats,
    modules,
    media,
    ugc,
    quizzes,
    stats,
    counselors,
    events,
    orgMembers,
    vision,
    setVision,
    mission,
    setMission,
    ketuaName,
    setKetuaName,
    handleSaveSettings,
    searchTerm,
    setSearchTerm,
    editingModule,
    setEditingModule,
    editingMedia,
    setEditingMedia,
    editingQuiz,
    setEditingQuiz,
    editingCounselor,
    setEditingCounselor,
    editingStat,
    setEditingStat,
    editingUgc,
    setEditingUgc,
    editingEvent,
    setEditingEvent,
    editingMember,
    setEditingMember,
    deleteTarget,
    setDeleteTarget,
    toast,
    triggerToast,
    handleLogout,
    handleSaveModule,
    handleSaveMedia,
    handleSaveQuiz,
    handleSaveStat,
    handleSaveCounselor,
    handleSaveUgc,
    handleSaveEvent,
    handleSaveMember,
    executeDelete,
    refreshData,
  };
}
