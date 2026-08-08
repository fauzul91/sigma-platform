import { supabase } from "@/lib/supabase";
import {
  repropediaModules as mockModules,
  mediaItems as mockMedia,
  ugcItems as mockUgc,
  eventItems as mockEvents,
  counselingDirectory as mockCounselors,
  statisticsCases as mockStats,
  quizQuestions as mockQuizzes,
  globalStats as mockGlobalStats,
  orgMembers as mockOrgMembers,
} from "@/data/mockData";
import {
  RepropediaItem,
  MediaItem,
  UgcItem,
  EventItem,
  Counselor,
  StatRecord,
  QuizQuestion,
  OrgMember,
} from "@/types";

export const userService = {
  async getGlobalStats() {
    try {
      // Use head: true to only retrieve counts from response headers, fetching 0 rows of data
      const [modRes, medRes, counRes] = await Promise.all([
        supabase.from("repropedia").select("id", { count: "exact", head: true }),
        supabase.from("media").select("id", { count: "exact", head: true }),
        supabase.from("counselors").select("id", { count: "exact", head: true }),
      ]);

      return {
        totalModules: modRes.count ?? mockGlobalStats.totalModules,
        totalArticles: medRes.count ?? mockGlobalStats.totalArticles,
        totalUsersHelped: mockGlobalStats.totalUsersHelped,
        activeCounselors: counRes.count ?? mockGlobalStats.activeCounselors,
      };
    } catch {
      return mockGlobalStats;
    }
  },

  async getRepropediaModules(): Promise<RepropediaItem[]> {
    try {
      const { data, error } = await supabase
        .from("repropedia")
        .select("id, title, slug, category, synopsis, content, pdf_url, read_time, author, date")
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) return mockModules;

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
      return mockModules;
    }
  },

  async getMediaItems(): Promise<MediaItem[]> {
    try {
      const { data, error } = await supabase
        .from("media")
        .select("id, title, slug, type, category, tags, content, media_url, read_time, duration, author, date")
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) return mockMedia;

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
      return mockMedia;
    }
  },

  async getUgcItems(): Promise<UgcItem[]> {
    try {
      const { data, error } = await supabase
        .from("ugc_submissions")
        .select("id, title, description, media_url, creator_name, school, type, likes")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) return mockUgc;

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
      return mockUgc;
    }
  },

  async getEventItems(): Promise<EventItem[]> {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("id, title, description, date, location, images, attendees")
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) return mockEvents;

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
      return mockEvents;
    }
  },

  async getCounselors(): Promise<Counselor[]> {
    try {
      const { data, error } = await supabase
        .from("counselors")
        .select("id, name, role, whatsapp_number, operational_hours, location_name, location_map_url")
        .order("created_at", { ascending: true });

      if (error || !data || data.length === 0) return mockCounselors;

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
      return mockCounselors;
    }
  },

  async getStatisticsCases(): Promise<StatRecord[]> {
    try {
      const { data, error } = await supabase
        .from("statistics_cases")
        .select("year, sukamaju, harapan, mekarjaya, kertajaya")
        .order("year", { ascending: true });

      if (error || !data || data.length === 0) return mockStats;

      return data.map((item) => ({
        year: item.year,
        "Desa Sukamaju": item.sukamaju || 0,
        "Desa Harapan": item.harapan || 0,
        "Desa Mekarjaya": item.mekarjaya || 0,
        "Desa Kertajaya": item.kertajaya || 0,
      }));
    } catch {
      return mockStats;
    }
  },

  async getQuizQuestions(): Promise<QuizQuestion[]> {
    try {
      const { data, error } = await supabase
        .from("quizzes")
        .select("id, category, question_text, options, correct_answer, explanation")
        .order("created_at", { ascending: true });

      if (error || !data || data.length === 0) return mockQuizzes;

      return data.map((item) => ({
        id: item.id,
        category: item.category,
        questionText: item.question_text,
        options: item.options || [],
        correctAnswer: item.correct_answer,
        explanation: item.explanation,
      }));
    } catch {
      return mockQuizzes;
    }
  },

  async getOrgMembers(): Promise<OrgMember[]> {
    try {
      const { data, error } = await supabase
        .from("organization_members")
        .select("id, key, role, name, description, sort_order")
        .order("sort_order", { ascending: true });

      if (error || !data || data.length === 0) return mockOrgMembers;

      return data.map((item) => ({
        id: item.id,
        key: item.key,
        role: item.role,
        name: item.name,
        description: item.description,
        sortOrder: item.sort_order,
      }));
    } catch {
      return mockOrgMembers;
    }
  },

  async recordLike(ugcId: string) {
    try {
      const { data: current, error: readErr } = await supabase
        .from("ugc_submissions")
        .select("likes")
        .eq("id", ugcId)
        .single();

      if (readErr || !current) return false;

      const newCount = (current.likes || 0) + 1;
      const { error: updateErr } = await supabase
        .from("ugc_submissions")
        .update({ likes: newCount })
        .eq("id", ugcId);

      if (updateErr) return false;
      return true;
    } catch {
      return false;
    }
  },

  async recordUnlike(ugcId: string) {
    try {
      const { data: current, error: readErr } = await supabase
        .from("ugc_submissions")
        .select("likes")
        .eq("id", ugcId)
        .single();

      if (readErr || !current) return false;

      const newCount = Math.max(0, (current.likes || 0) - 1);
      const { error: updateErr } = await supabase
        .from("ugc_submissions")
        .update({ likes: newCount })
        .eq("id", ugcId);

      if (updateErr) return false;
      return true;
    } catch {
      return false;
    }
  },

  async getGeneralSettings() {
    try {
      const { data, error } = await supabase
        .from("general_settings")
        .select("vision, mission, ketua_name")
        .single();

      if (error || !data) {
        return {
          vision:
            "Terwujudnya Generasi Remaja Desa yang Sehat, Berpendidikan, dan Bebas dari Pernikahan Usia Anak.",
          mission:
            "1. Menyediakan platform edukasi digital kesehatan reproduksi yang mudah diakses.\n2. Memberikan layanan konseling sebaya dan rujukan darurat yang aman dan rahasia.\n3. Mengedukasi masyarakat desa tentang bahaya dan perlindungan hukum pernikahan anak.",
          wrapperKetua: "Bintang Prakoso (Ketua Kader GARUDA)",
          ketuaName: "Bintang Prakoso (Ketua Kader GARUDA)",
        };
      }

      return {
        vision: data.vision,
        mission: data.mission,
        ketuaName: data.ketua_name,
      };
    } catch {
      return {
        vision:
          "Terwujudnya Generasi Remaja Desa yang Sehat, Berpendidikan, dan Bebas dari Pernikahan Usia Anak.",
        mission:
          "1. Menyediakan platform edukasi digital kesehatan reproduksi yang mudah diakses.\n2. Memberikan layanan konseling sebaya dan rujukan darurat yang aman dan rahasia.\n3. Mengedukasi masyarakat desa tentang bahaya dan perlindungan hukum pernikahan anak.",
        ketuaName: "Bintang Prakoso (Ketua Kader GARUDA)",
      };
    }
  },
};
