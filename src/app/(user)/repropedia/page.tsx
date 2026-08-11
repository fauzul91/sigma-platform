import type { Metadata } from "next";
import React, { Suspense } from "react";
import RepropediaView from "@/components/user/RepropediaView";
import { userService } from "@/services/user/userService";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const moduleSlug = resolvedSearchParams.module;

  if (typeof moduleSlug === "string" && moduleSlug) {
    const modules = await userService.getRepropediaModules();
    const foundModule = modules.find((m) => m.slug === moduleSlug);
    if (foundModule) {
      const cleanExcerpt = foundModule.synopsis || (foundModule.content.substring(0, 160).replace(/\r?\n|\r/g, " ") + "...");
      return {
        title: foundModule.title,
        description: cleanExcerpt,
        alternates: {
          canonical: `https://sigmaplatform.vercel.app/repropedia?module=${moduleSlug}`,
        },
        openGraph: {
          title: `${foundModule.title} | SIGMA`,
          description: cleanExcerpt,
          url: `https://sigmaplatform.vercel.app/repropedia?module=${moduleSlug}`,
          type: "article",
          images: [
            {
              url: "https://sigmaplatform.vercel.app/assets/og-image.jpg",
              width: 1200,
              height: 630,
              alt: foundModule.title,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: `${foundModule.title} | SIGMA`,
          description: cleanExcerpt,
          images: ["https://sigmaplatform.vercel.app/assets/og-image.jpg"],
        },
      };
    }
  }

  return {
    title: "Repropedia",
    description: "Kamus literasi digital kesehatan reproduksi remaja, informasi pubertas, hak anak, serta panduan pencegahan perkawinan dini terpercaya.",
    alternates: {
      canonical: "https://sigmaplatform.vercel.app/repropedia",
    },
  };
}

export default async function RepropediaPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const moduleSlug = resolvedSearchParams.module;

  let activeModule = null;
  if (typeof moduleSlug === "string" && moduleSlug) {
    const modules = await userService.getRepropediaModules();
    activeModule = modules.find((m) => m.slug === moduleSlug) || null;
  }

  const graphElements: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": "https://sigmaplatform.vercel.app/repropedia/#webpage",
      "url": "https://sigmaplatform.vercel.app/repropedia",
      "name": "Repropedia | SIGMA",
      "description": "Kamus literasi digital kesehatan reproduksi remaja, informasi pubertas, hak anak, serta panduan pencegahan perkawinan dini terpercaya."
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://sigmaplatform.vercel.app/repropedia/#breadcrumb",
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
          "name": "Repropedia",
          "item": "https://sigmaplatform.vercel.app/repropedia"
        }
      ]
    }
  ];

  if (activeModule) {
    graphElements.push({
      "@type": "MedicalWebPage",
      "@id": `https://sigmaplatform.vercel.app/repropedia?module=${activeModule.slug}#medicalpage`,
      "headline": activeModule.title,
      "description": activeModule.synopsis || activeModule.content.substring(0, 160),
      "aspect": activeModule.category,
      "datePublished": "2026-05-12", // fallback or use activeModule.date
      "author": {
        "@type": "Person",
        "name": activeModule.author
      }
    });
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
            {/* Categories filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              <div className="h-8 bg-slate-200 rounded-lg w-24" />
              <div className="h-8 bg-slate-200 rounded-lg w-28" />
              <div className="h-8 bg-slate-200 rounded-lg w-24" />
              <div className="h-8 bg-slate-200 rounded-lg w-32" />
            </div>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="h-48 bg-slate-200 rounded-2xl" />
              <div className="h-48 bg-slate-200 rounded-2xl" />
              <div className="h-48 bg-slate-200 rounded-2xl" />
            </div>
          </div>
        </div>
      }>
        <RepropediaView />
      </Suspense>
    </>
  );
}
