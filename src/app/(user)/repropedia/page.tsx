import type { Metadata } from "next";
import React, { Suspense } from "react";
import RepropediaView from "@/components/user/RepropediaView";

export const metadata: Metadata = {
  title: "Repropedia",
  description: "Kamus literasi digital kesehatan reproduksi remaja, informasi pubertas, hak anak, serta panduan pencegahan perkawinan dini terpercaya.",
  alternates: {
    canonical: "https://sigma-repro.org/repropedia",
  }
};

export default function RepropediaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigma-repro.org/repropedia/#webpage",
        "url": "https://sigma-repro.org/repropedia",
        "name": "Repropedia | SIGMA",
        "description": "Kamus literasi digital kesehatan reproduksi remaja, informasi pubertas, hak anak, serta panduan pencegahan perkawinan dini terpercaya."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigma-repro.org/repropedia/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": "https://sigma-repro.org/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Repropedia",
            "item": "https://sigma-repro.org/repropedia"
          }
        ]
      }
    ]
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
