import type { Metadata } from "next";
import React, { Suspense } from "react";
import EdukasiView from "@/components/user/EdukasiView";

export const metadata: Metadata = {
  title: "Belajar",
  description: "Akses berbagai materi pembelajaran, modul, video edukatif, dan artikel kesehatan reproduksi tepercaya dari Program SIGMA.",
  alternates: {
    canonical: "https://sigma-repro.org/edukasi",
  }
};

export default function EdukasiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigma-repro.org/edukasi/#webpage",
        "url": "https://sigma-repro.org/edukasi",
        "name": "Belajar | SIGMA",
        "description": "Temukan video kampanye edukatif dari Kader GARUDA serta artikel kesehatan reproduksi dari pakar medis terpercaya."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigma-repro.org/edukasi/#breadcrumb",
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
            "name": "Belajar",
            "item": "https://sigma-repro.org/edukasi"
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
