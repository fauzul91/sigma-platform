import { supabase } from "@/lib/supabase";
import { ArticleItem } from "@/types";
import { initialArticles } from "@/data/mockData";

export const articleService = {
  // 1. Get All Published Articles for User Feeds
  async getPublishedArticles(): Promise<ArticleItem[]> {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, subtitle, cover_image, content, status, author, category, read_time, created_at, updated_at")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        return initialArticles.filter((a) => a.status === "published");
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
        category: item.category || "Kesehatan Reproduksi",
        readTime: item.read_time || "3 Menit",
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
    } catch {
      return initialArticles.filter((a) => a.status === "published");
    }
  },

  // 2. Get Single Article by Slug for Reader Page
  async getArticleBySlug(slug: string): Promise<ArticleItem | null> {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, subtitle, cover_image, content, status, author, category, read_time, created_at, updated_at")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error || !data) {
        const mock = initialArticles.find(
          (a) => a.slug === slug && a.status === "published"
        );
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
        category: data.category || "Kesehatan Reproduksi",
        readTime: data.read_time || "3 Menit",
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } catch {
      const mock = initialArticles.find(
        (a) => a.slug === slug && a.status === "published"
      );
      return mock || null;
    }
  },

  // 3. Get Related Articles
  async getRelatedArticles(currentSlug: string, limit = 3): Promise<ArticleItem[]> {
    const all = await this.getPublishedArticles();
    return all.filter((a) => a.slug !== currentSlug).slice(0, limit);
  },
};
