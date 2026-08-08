"use server";

import { supabase } from "@/lib/supabase";
import { requireAdminSession } from "@/lib/requireAdminSession";
import {
  repropediaModules as initialModules,
  mediaItems as initialMedia,
  ugcItems as initialUgc,
  quizQuestions as initialQuiz,
  statisticsCases as initialStats,
  counselingDirectory as initialCounselors,
  eventItems as initialEvents,
  orgMembers as initialOrgMembers,
} from "@/data/mockData";
import {
  RepropediaItem,
  MediaItem,
  UgcItem,
  QuizQuestion,
  StatRecord,
  Counselor,
  EventItem,
  OrgMember,
  AdminDashboardStats,
  AdminGeneralSettings,
} from "@/types";

// --- REPROPEDIA CRUD ---
export async function fetchModules(page?: number, limit?: number): Promise<RepropediaItem[]> {
  try {
    let query = supabase
      .from("repropedia")
      .select("id, title, slug, category, synopsis, content, pdf_url, read_time, author, date");

    if (page !== undefined && limit !== undefined) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query.order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return initialModules;
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      category: item.category,
      synopsis: item.synopsis,
      content: item.content,
      pdfUrl: item.pdf_url,
      readTime: item.read_time,
      author: item.author,
      date: item.date,
    }));
  } catch {
    return initialModules;
  }
}

export async function saveModule(
  moduleData: Partial<RepropediaItem>,
): Promise<RepropediaItem | null> {
  await requireAdminSession(); // Security session check

  const slug = moduleData.title
    ? moduleData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    : `module-${Date.now()}`;
  const payload = {
    title: moduleData.title,
    slug,
    category: moduleData.category || "pubertas",
    synopsis: moduleData.synopsis || "",
    content: moduleData.content || "",
    pdf_url:
      moduleData.pdfUrl ||
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    read_time: moduleData.readTime || "5 menit",
    author: moduleData.author || "Kader GARUDA Utama",
    date: moduleData.date || "Hari ini",
  };

  if (moduleData.id && !moduleData.id.startsWith("r-gen-")) {
    const { data, error } = await supabase
      .from("repropedia")
      .update(payload)
      .eq("id", moduleData.id)
      .select("id, pdf_url, read_time")
      .single();
    if (error || !data) return null;
    return {
      ...moduleData,
      ...payload,
      id: data.id,
      pdfUrl: data.pdf_url,
      readTime: data.read_time,
    } as RepropediaItem;
  } else {
    const { data, error } = await supabase
      .from("repropedia")
      .insert([payload])
      .select("id, title, slug, category, synopsis, content, pdf_url, read_time, author, date")
      .single();
    if (error || !data) return null;
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      category: data.category,
      synopsis: data.synopsis,
      content: data.content,
      pdfUrl: data.pdf_url,
      readTime: data.read_time,
      author: data.author,
      date: data.date,
    };
  }
}

export async function deleteModule(id: string): Promise<boolean> {
  await requireAdminSession(); // Security session check
  const { error } = await supabase.from("repropedia").delete().eq("id", id);
  return !error;
}

// --- MEDIA CRUD ---
export async function fetchMedia(page?: number, limit?: number): Promise<MediaItem[]> {
  try {
    let query = supabase
      .from("media")
      .select("id, title, slug, type, category, tags, content, media_url, read_time, duration, author, date");

    if (page !== undefined && limit !== undefined) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query.order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return initialMedia;
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      type: item.type,
      category: item.category,
      tags: item.tags || [],
      content: item.content,
      mediaUrl: item.media_url,
      readTime: item.read_time,
      duration: item.duration,
      author: item.author,
      date: item.date,
    }));
  } catch {
    return initialMedia;
  }
}

export async function saveMedia(mediaData: Partial<MediaItem>): Promise<MediaItem | null> {
  await requireAdminSession(); // Security session check

  const slug = mediaData.title
    ? mediaData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    : `media-${Date.now()}`;
  const payload = {
    title: mediaData.title,
    slug,
    type: mediaData.type || "article",
    category: mediaData.category || "edukasi",
    tags: mediaData.tags || ["Remaja"],
    content: mediaData.content || "",
    media_url:
      mediaData.mediaUrl ||
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    read_time: mediaData.readTime,
    duration: mediaData.duration,
    author: mediaData.author || "Tim Media GARUDA",
    date: mediaData.date || "Hari ini",
  };

  if (mediaData.id && !mediaData.id.startsWith("m-gen-")) {
    const { data, error } = await supabase
      .from("media")
      .update(payload)
      .eq("id", mediaData.id)
      .select("id, media_url")
      .single();
    if (error || !data) return null;
    return {
      ...mediaData,
      ...payload,
      id: data.id,
      mediaUrl: data.media_url,
    } as MediaItem;
  } else {
    const { data, error } = await supabase
      .from("media")
      .insert([payload])
      .select("id, title, slug, type, category, tags, content, media_url, read_time, duration, author, date")
      .single();
    if (error || !data) return null;
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      type: data.type,
      category: data.category,
      tags: data.tags,
      content: data.content,
      mediaUrl: data.media_url,
      readTime: data.read_time,
      duration: data.duration,
      author: data.author,
      date: data.date,
    };
  }
}

export async function deleteMedia(id: string): Promise<boolean> {
  await requireAdminSession(); // Security session check
  const { error } = await supabase.from("media").delete().eq("id", id);
  return !error;
}

// --- UGC CRUD ---
export async function fetchUgc(page?: number, limit?: number): Promise<UgcItem[]> {
  try {
    let query = supabase
      .from("ugc_submissions")
      .select("id, title, description, media_url, creator_name, school, type, likes");

    if (page !== undefined && limit !== undefined) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query.order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return initialUgc;
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      mediaUrl: item.media_url,
      creatorName: item.creator_name,
      school: item.school,
      type: item.type,
      likes: item.likes || 0,
    }));
  } catch {
    return initialUgc;
  }
}

export async function saveUgc(ugcData: Partial<UgcItem>): Promise<UgcItem | null> {
  await requireAdminSession(); // Security session check

  const payload = {
    title: ugcData.title,
    description: ugcData.description || "",
    media_url:
      ugcData.mediaUrl ||
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    creator_name: ugcData.creatorName || "Siswa",
    school: ugcData.school || "Sekolah Umum",
    type: ugcData.type || "poster",
    likes: ugcData.likes || 0,
  };

  if (ugcData.id && !ugcData.id.startsWith("u-gen-")) {
    const { data, error } = await supabase
      .from("ugc_submissions")
      .update(payload)
      .eq("id", ugcData.id)
      .select("id, media_url, creator_name")
      .single();
    if (error || !data) return null;
    return {
      ...ugcData,
      ...payload,
      id: data.id,
      mediaUrl: data.media_url,
      creatorName: data.creator_name,
    } as UgcItem;
  } else {
    const { data, error } = await supabase
      .from("ugc_submissions")
      .insert([payload])
      .select("id, title, description, media_url, creator_name, school, type, likes")
      .single();
    if (error || !data) return null;
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      mediaUrl: data.media_url,
      creatorName: data.creator_name,
      school: data.school,
      type: data.type,
      likes: data.likes,
    };
  }
}

export async function deleteUgc(id: string): Promise<boolean> {
  await requireAdminSession(); // Security session check
  const { error } = await supabase.from("ugc_submissions").delete().eq("id", id);
  return !error;
}

// --- COUNSELORS CRUD ---
export async function fetchCounselors(page?: number, limit?: number): Promise<Counselor[]> {
  try {
    let query = supabase
      .from("counselors")
      .select("id, name, role, whatsapp_number, operational_hours, location_name, location_map_url");

    if (page !== undefined && limit !== undefined) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query.order("created_at", { ascending: true });
    if (error || !data || data.length === 0) return initialCounselors;
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      whatsappNumber: item.whatsapp_number,
      operationalHours: item.operational_hours,
      locationName: item.location_name,
      locationMapUrl: item.location_map_url,
    }));
  } catch {
    return initialCounselors;
  }
}

export async function saveCounselor(
  counselorData: Partial<Counselor>,
): Promise<Counselor | null> {
  await requireAdminSession(); // Security session check

  const payload = {
    name: counselorData.name,
    role: counselorData.role || "Kader GARUDA",
    whatsapp_number: counselorData.whatsappNumber || "+62812345678",
    operational_hours: counselorData.operationalHours || "08:00 - 15:00 WIB",
    location_name: counselorData.locationName,
    location_map_url: counselorData.locationMapUrl,
  };

  if (counselorData.id && !counselorData.id.startsWith("c-gen-")) {
    const { data, error } = await supabase
      .from("counselors")
      .update(payload)
      .eq("id", counselorData.id)
      .select("id, whatsapp_number, operational_hours")
      .single();
    if (error || !data) return null;
    return {
      ...counselorData,
      ...payload,
      id: data.id,
      whatsappNumber: data.whatsapp_number,
      operationalHours: data.operational_hours,
    } as Counselor;
  } else {
    const { data, error } = await supabase
      .from("counselors")
      .insert([payload])
      .select("id, name, role, whatsapp_number, operational_hours, location_name, location_map_url")
      .single();
    if (error || !data) return null;
    return {
      id: data.id,
      name: data.name,
      role: data.role,
      whatsappNumber: data.whatsapp_number,
      operationalHours: data.operational_hours,
      locationName: data.location_name,
      locationMapUrl: data.location_map_url,
    };
  }
}

export async function deleteCounselor(id: string): Promise<boolean> {
  await requireAdminSession(); // Security session check
  const { error } = await supabase.from("counselors").delete().eq("id", id);
  return !error;
}

// --- STATS CRUD ---
export async function fetchStats(page?: number, limit?: number): Promise<StatRecord[]> {
  try {
    let query = supabase
      .from("statistics_cases")
      .select("year, sukamaju, harapan, mekarjaya, kertajaya");

    if (page !== undefined && limit !== undefined) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query.order("year", { ascending: true });
    if (error || !data || data.length === 0) return initialStats;
    return data.map((item) => ({
      year: item.year,
      "Desa Sukamaju": item.sukamaju || 0,
      "Desa Harapan": item.harapan || 0,
      "Desa Mekarjaya": item.mekarjaya || 0,
      "Desa Kertajaya": item.kertajaya || 0,
    }));
  } catch {
    return initialStats;
  }
}

export async function saveStat(statData: Partial<StatRecord>): Promise<StatRecord | null> {
  await requireAdminSession(); // Security session check

  const payload = {
    year: Number(statData.year),
    sukamaju: Number(statData["Desa Sukamaju"] || 0),
    harapan: Number(statData["Desa Harapan"] || 0),
    mekarjaya: Number(statData["Desa Mekarjaya"] || 0),
    kertajaya: Number(statData["Desa Kertajaya"] || 0),
  };

  const { data, error } = await supabase
    .from("statistics_cases")
    .upsert([payload], { onConflict: "year" })
    .select("year, sukamaju, harapan, mekarjaya, kertajaya")
    .single();

  if (error || !data) return null;
  return {
    year: data.year,
    "Desa Sukamaju": data.sukamaju,
    "Desa Harapan": data.harapan,
    "Desa Mekarjaya": data.mekarjaya,
    "Desa Kertajaya": data.kertajaya,
  };
}

export async function deleteStat(year: number): Promise<boolean> {
  await requireAdminSession(); // Security session check
  const { error } = await supabase.from("statistics_cases").delete().eq("year", year);
  return !error;
}

// --- QUIZZES CRUD ---
export async function fetchQuizzes(page?: number, limit?: number): Promise<QuizQuestion[]> {
  try {
    let query = supabase
      .from("quizzes")
      .select("id, category, question_text, options, correct_answer, explanation");

    if (page !== undefined && limit !== undefined) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query.order("created_at", { ascending: true });
    if (error || !data || data.length === 0) return initialQuiz;
    return data.map((item) => ({
      id: item.id,
      category: item.category,
      questionText: item.question_text,
      options: item.options || [],
      correctAnswer: item.correct_answer,
      explanation: item.explanation,
    }));
  } catch {
    return initialQuiz;
  }
}

export async function saveQuiz(
  quizData: Partial<QuizQuestion>,
): Promise<QuizQuestion | null> {
  await requireAdminSession(); // Security session check

  const payload = {
    category: quizData.category || "pubertas",
    question_text: quizData.questionText,
    options: quizData.options || ["", "", "", ""],
    correct_answer: quizData.correctAnswer ?? 0,
    explanation: quizData.explanation || "",
  };

  if (quizData.id && !quizData.id.startsWith("q-gen-")) {
    const { data, error } = await supabase
      .from("quizzes")
      .update(payload)
      .eq("id", quizData.id)
      .select("id, question_text, correct_answer")
      .single();
    if (error || !data) return null;
    return {
      ...quizData,
      ...payload,
      id: data.id,
      questionText: data.question_text,
      correctAnswer: data.correct_answer,
    } as QuizQuestion;
  } else {
    const { data, error } = await supabase
      .from("quizzes")
      .insert([payload])
      .select("id, category, question_text, options, correct_answer, explanation")
      .single();
    if (error || !data) return null;
    return {
      id: data.id,
      category: data.category,
      questionText: data.question_text,
      options: data.options,
      correctAnswer: data.correct_answer,
      explanation: data.explanation,
    };
  }
}

export async function deleteQuiz(id: string): Promise<boolean> {
  await requireAdminSession(); // Security session check
  const { error } = await supabase.from("quizzes").delete().eq("id", id);
  return !error;
}

// --- EVENTS CRUD ---
export async function fetchEvents(page?: number, limit?: number): Promise<EventItem[]> {
  try {
    let query = supabase
      .from("events")
      .select("id, title, description, date, location, images, attendees");

    if (page !== undefined && limit !== undefined) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query.order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return initialEvents;
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      date: item.date,
      location: item.location,
      images: item.images || [],
      attendees: item.attendees || 0,
    }));
  } catch {
    return initialEvents;
  }
}

export async function saveEvent(eventData: Partial<EventItem>): Promise<EventItem | null> {
  await requireAdminSession(); // Security session check

  const payload = {
    title: eventData.title,
    description: eventData.description || "",
    date: eventData.date || "Hari ini",
    location: eventData.location || "Lokasi Umum",
    images: eventData.images || [],
    attendees: eventData.attendees || 0,
  };

  if (eventData.id && !eventData.id.startsWith("e-gen-")) {
    const { data, error } = await supabase
      .from("events")
      .update(payload)
      .eq("id", eventData.id)
      .select("id")
      .single();
    if (error || !data) return null;
    return { ...eventData, ...payload, id: data.id } as EventItem;
  } else {
    const { data, error } = await supabase
      .from("events")
      .insert([payload])
      .select("id, title, description, date, location, images, attendees")
      .single();
    if (error || !data) return null;
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
      images: data.images,
      attendees: data.attendees,
    };
  }
}

export async function deleteEvent(id: string): Promise<boolean> {
  await requireAdminSession(); // Security session check
  const { error } = await supabase.from("events").delete().eq("id", id);
  return !error;
}

// --- ORG MEMBERS CRUD ---
export async function fetchOrgMembers(page?: number, limit?: number): Promise<OrgMember[]> {
  try {
    let query = supabase
      .from("organization_members")
      .select("id, key, role, name, description, sort_order");

    if (page !== undefined && limit !== undefined) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query.order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return initialOrgMembers;
    return data.map((item) => ({
      id: item.id,
      key: item.key,
      role: item.role,
      name: item.name,
      description: item.description,
      sortOrder: item.sort_order,
    }));
  } catch {
    return initialOrgMembers;
  }
}

export async function saveOrgMember(
  memberData: Partial<OrgMember>,
): Promise<OrgMember | null> {
  await requireAdminSession(); // Security session check

  const payload = {
    key: memberData.key || `member-${Date.now()}`,
    role: memberData.role || "",
    name: memberData.name || "",
    description: memberData.description || "",
    sort_order: memberData.sortOrder ?? 99,
  };

  if (memberData.id && !memberData.id.startsWith("o-gen-")) {
    const { data, error } = await supabase
      .from("organization_members")
      .update(payload)
      .eq("id", memberData.id)
      .select("id, sort_order")
      .single();
    if (error || !data) return null;
    return {
      ...memberData,
      ...payload,
      id: data.id,
      sortOrder: data.sort_order,
    } as OrgMember;
  } else {
    const { data, error } = await supabase
      .from("organization_members")
      .insert([payload])
      .select("id, key, role, name, description, sort_order")
      .single();
    if (error || !data) return null;
    return {
      id: data.id,
      key: data.key,
      role: data.role,
      name: data.name,
      description: data.description,
      sortOrder: data.sort_order,
    };
  }
}

export async function deleteOrgMember(id: string): Promise<boolean> {
  await requireAdminSession(); // Security session check
  const { error } = await supabase.from("organization_members").delete().eq("id", id);
  return !error;
}

// Initial fallbacks for backwards compatibility
export async function getInitialModules(): Promise<RepropediaItem[]> {
  return initialModules;
}
export async function getInitialMedia(): Promise<MediaItem[]> {
  return initialMedia;
}
export async function getInitialUgc(): Promise<UgcItem[]> {
  return initialUgc;
}
export async function getInitialQuizzes(): Promise<QuizQuestion[]> {
  return initialQuiz;
}
export async function getInitialStats(): Promise<StatRecord[]> {
  return initialStats;
}
export async function getInitialCounselors(): Promise<Counselor[]> {
  return initialCounselors;
}
export async function getInitialOrgMembers(): Promise<OrgMember[]> {
  return initialOrgMembers;
}
export async function getInitialEvents(): Promise<EventItem[]> {
  return initialEvents;
}
export async function getInitialSettings() {
  return {
    vision:
      "Terwujudnya Generasi Remaja Desa yang Sehat, Berpendidikan, dan Bebas dari Pernikahan Usia Anak.",
    mission:
      "1. Menyediakan platform edukasi digital kesehatan reproduksi yang mudah diakses.\n2. Memberikan layanan konseling sebaya dan rujukan darurat yang aman dan rahasia.",
    ketuaName: "Bintang Prakoso (Ketua Kader GARUDA)",
  };
}

// --- GENERAL SETTINGS ---
export async function fetchSettings(): Promise<AdminGeneralSettings | null> {
  try {
    const { data, error } = await supabase
      .from("general_settings")
      .select("vision, mission, ketua_name")
      .single();
    if (error || !data) return null;
    return {
      vision: data.vision,
      mission: data.mission,
      ketuaName: data.ketua_name,
    };
  } catch {
    return null;
  }
}

export async function saveSettings(settings: AdminGeneralSettings): Promise<boolean> {
  await requireAdminSession(); // Security session check

  const payload = {
    vision: settings.vision,
    mission: settings.mission,
    ketua_name: settings.ketuaName,
    updated_at: new Date().toISOString(),
  };

  // Check if general settings row already exists
  const { data: existing } = await supabase
    .from("general_settings")
    .select("id")
    .single();

  if (existing?.id) {
    const { error } = await supabase
      .from("general_settings")
      .update(payload)
      .eq("id", existing.id);
    return !error;
  } else {
    const { error } = await supabase
      .from("general_settings")
      .insert([payload]);
    return !error;
  }
}

// --- DASHBOARD STATS ---
export async function fetchDashboardStats(): Promise<AdminDashboardStats> {
  const defaultStats: AdminDashboardStats = {
    totalModules: 0,
    totalMedia: 0,
    totalUgc: 0,
    totalEvents: 0,
    totalCounselors: 0,
    totalQuizzes: 0,
    recentItems: [],
  };

  try {
    // Run row counts in parallel with head: true to avoid fetching rows
    const [modRes, medRes, ugcRes, evtRes, couRes, quizRes] = await Promise.all([
      supabase.from("repropedia").select("id", { count: "exact", head: true }),
      supabase.from("media").select("id", { count: "exact", head: true }),
      supabase.from("ugc_submissions").select("id", { count: "exact", head: true }),
      supabase.from("events").select("id", { count: "exact", head: true }),
      supabase.from("counselors").select("id", { count: "exact", head: true }),
      supabase.from("quizzes").select("id", { count: "exact", head: true }),
    ]);

    // Fetch the 3 newest items from core tables for recent activity logs
    const [recentMods, recentMedia, recentUgc] = await Promise.all([
      supabase
        .from("repropedia")
        .select("title, created_at")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("media")
        .select("title, created_at")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("ugc_submissions")
        .select("title, created_at")
        .order("created_at", { ascending: false })
        .limit(3),
    ]);

    // Merge recent activity list and sort chronologically
    const recentItems = [
      ...(recentMods.data || []).map((i) => ({
        label: "Repropedia",
        title: i.title as string,
        createdAt: i.created_at as string,
      })),
      ...(recentMedia.data || []).map((i) => ({
        label: "Edukasi",
        title: i.title as string,
        createdAt: i.created_at as string,
      })),
      ...(recentUgc.data || []).map((i) => ({
        label: "Karya Kader",
        title: i.title as string,
        createdAt: i.created_at as string,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);

    return {
      totalModules: modRes.count ?? 0,
      totalMedia: medRes.count ?? 0,
      totalUgc: ugcRes.count ?? 0,
      totalEvents: evtRes.count ?? 0,
      totalCounselors: couRes.count ?? 0,
      totalQuizzes: quizRes.count ?? 0,
      recentItems,
    };
  } catch {
    return defaultStats;
  }
}
