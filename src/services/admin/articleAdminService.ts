"use server";

import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ArticleItem } from "@/types";
import { requireAdminSession } from "@/lib/requireAdminSession";
import { initialArticles } from "@/data/mockData";
import { generateSlug } from "@/utils/slugUtils";

// 1. Fetch All Articles for Admin Listing
export async function fetchAdminArticles(): Promise<ArticleItem[]> {
  await requireAdminSession();

  const client = supabaseAdmin || supabase;
  try {
    const { data, error } = await client
      .from("articles")
      .select("id, title, slug, subtitle, cover_image, content, status, author, category, read_time, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return initialArticles;
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      subtitle: item.subtitle,
      coverImage: item.cover_image,
      content: item.content,
      status: item.status,
      author: item.author || "Tim Redaksi SIGMA",
      category: item.category || "Edukasi",
      readTime: item.read_time || "3 Menit",
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  } catch {
    return initialArticles;
  }
}

// 2. Fetch Single Article by ID (for edit form)
export async function fetchArticleById(id: string): Promise<ArticleItem | null> {
  await requireAdminSession();

  const client = supabaseAdmin || supabase;
  try {
    const { data, error } = await client
      .from("articles")
      .select("id, title, slug, subtitle, cover_image, content, status, author, category, read_time, created_at, updated_at")
      .eq("id", id)
      .single();

    if (error || !data) {
      // Check in fallback mock data
      const mock = initialArticles.find((a) => a.id === id);
      return mock || null;
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      subtitle: data.subtitle,
      coverImage: data.cover_image,
      content: data.content,
      status: data.status,
      author: data.author || "Tim Redaksi SIGMA",
      category: data.category || "Edukasi",
      readTime: data.read_time || "3 Menit",
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch {
    const mock = initialArticles.find((a) => a.id === id);
    return mock || null;
  }
}

// 3. Save or Update Article
export async function saveArticle(
  articleData: Partial<ArticleItem>
): Promise<ArticleItem | null> {
  await requireAdminSession();

  const client = supabaseAdmin || supabase;

  // Auto-generate slug from title if missing or updated
  const slug = articleData.slug
    ? generateSlug(articleData.slug)
    : articleData.title
    ? generateSlug(articleData.title)
    : `artikel-${Date.now()}`;

  const payload = {
    title: articleData.title || "Tanpa Judul",
    slug,
    subtitle: articleData.subtitle || null,
    cover_image: articleData.coverImage || null,
    content: articleData.content || { type: "doc", content: [] },
    status: articleData.status || "draft",
    author: articleData.author || "Tim Redaksi SIGMA",
    category: articleData.category || "Kesehatan Reproduksi",
    read_time: articleData.readTime || "3 Menit",
  };

  try {
    if (articleData.id && !articleData.id.startsWith("art-")) {
      // UPDATE existing database row
      const { data, error } = await client
        .from("articles")
        .update(payload)
        .eq("id", articleData.id)
        .select()
        .single();

      if (error || !data) {
        console.error("[saveArticle UPDATE error]:", error);
        return null;
      }

      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        coverImage: data.cover_image,
        content: data.content,
        status: data.status,
        author: data.author,
        category: data.category,
        readTime: data.read_time,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } else {
      // INSERT new row
      const { data, error } = await client
        .from("articles")
        .insert([payload])
        .select()
        .single();

      if (error || !data) {
        console.error("[saveArticle INSERT error]:", error);
        return null;
      }

      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        coverImage: data.cover_image,
        content: data.content,
        status: data.status,
        author: data.author,
        category: data.category,
        readTime: data.read_time,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    }
  } catch (err) {
    console.error("[saveArticle Exception]:", err);
    return null;
  }
}

// 4. Delete Article by ID
export async function deleteArticle(id: string): Promise<boolean> {
  await requireAdminSession();
  const client = supabaseAdmin || supabase;

  try {
    const { error } = await client.from("articles").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}
