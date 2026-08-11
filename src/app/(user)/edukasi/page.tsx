import type { Metadata } from "next";
import React, { Suspense } from "react";
import EdukasiView from "@/components/user/EdukasiView";
import { userService } from "@/services/user/userService";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const postSlug = resolvedSearchParams.post;

  if (typeof postSlug === "string" && postSlug) {
    const items = await userService.getMediaItems();
    const post = items.find((item) => item.slug === postSlug);
    if (post) {
      const cleanExcerpt = post.content.substring(0, 160).replace(/\r?\n|\r/g, " ") + "...";
      const imageUrl = post.mediaUrl && post.mediaUrl.startsWith("http")
        ? post.mediaUrl
        : "https://sigmaplatform.vercel.app/assets/og-image.jpg";

      return {
        title: post.title,
        description: cleanExcerpt,
        alternates: {
          canonical: `https://sigmaplatform.vercel.app/edukasi?post=${postSlug}`,
        },
        openGraph: {
          title: `${post.title} | SIGMA`,
          description: cleanExcerpt,
          url: `https://sigmaplatform.vercel.app/edukasi?post=${postSlug}`,
          type: "article",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: `${post.title} | SIGMA`,
          description: cleanExcerpt,
          images: [imageUrl],
        },
      };
    }
  }

  return {
    title: "Belajar",
    description: "Akses berbagai materi pembelajaran, modul, video edukatif, dan artikel kesehatan reproduksi tepercaya dari Program SIGMA.",
    alternates: {
      canonical: "https://sigmaplatform.vercel.app/edukasi",
    },
  };
}

export default async function EdukasiPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const postSlug = resolvedSearchParams.post;

  let activePost = null;
  if (typeof postSlug === "string" && postSlug) {
    const items = await userService.getMediaItems();
    activePost = items.find((item) => item.slug === postSlug) || null;
  }

  const graphElements: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": "https://sigmaplatform.vercel.app/edukasi/#webpage",
      "url": "https://sigmaplatform.vercel.app/edukasi",
      "name": "Belajar | SIGMA",
      "description": "Temukan video kampanye edukatif dari Kader GARUDA serta artikel kesehatan reproduksi dari pakar medis terpercaya."
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://sigmaplatform.vercel.app/edukasi/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Beranda",
          "item": "https://sigmaplatform.vercel.app/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Belajar",
          "item": "https://sigmaplatform.vercel.app/edukasi"
        }
      ]
    }
  ];

  if (activePost) {
    if (activePost.type === "video") {
      graphElements.push({
        "@type": "VideoObject",
        "@id": `https://sigmaplatform.vercel.app/edukasi?post=${activePost.slug}#video`,
        "name": activePost.title,
        "description": activePost.content.substring(0, 160).replace(/\r?\n|\r/g, " "),
        "thumbnailUrl": "https://sigmaplatform.vercel.app/assets/og-image.jpg",
        "uploadDate": "2026-06-15", // fallback default, or use a valid date
        "author": {
          "@type": "Person",
          "name": activePost.author
        },
        "embedUrl": activePost.mediaUrl
      });
    } else {
      graphElements.push({
        "@type": "Article",
        "@id": `https://sigmaplatform.vercel.app/edukasi?post=${activePost.slug}#article`,
        "headline": activePost.title,
        "description": activePost.content.substring(0, 160).replace(/\r?\n|\r/g, " "),
        "image": activePost.mediaUrl || "https://sigmaplatform.vercel.app/assets/og-image.jpg",
        "datePublished": "2026-07-28", // fallback default or use a valid date
        "author": {
          "@type": "Person",
          "name": activePost.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Program SIGMA",
          "logo": {
            "@type": "ImageObject",
            "url": "https://sigmaplatform.vercel.app/assets/icon-512.jpg"
          }
        }
      });
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graphElements
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={
        <div className="bg-slate-50 min-h-screen py-8 md:py-12 animate-pulse">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="h-9 bg-slate-200 rounded-xl w-48 mx-auto" />
              <div className="h-4 bg-slate-200 rounded-md w-96 mx-auto" />
            </div>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-48 bg-slate-200 rounded-2xl" />
              <div className="h-48 bg-slate-200 rounded-2xl" />
              <div className="h-48 bg-slate-200 rounded-2xl" />
              <div className="h-48 bg-slate-200 rounded-2xl" />
            </div>
          </div>
        </div>
      }>
        <EdukasiView />
      </Suspense>
    </>
  );
}
