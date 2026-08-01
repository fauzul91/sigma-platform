import type { Metadata } from "next";
import React, { Suspense } from "react";
import EdukasiView from "@/components/EdukasiView";

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
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <EdukasiView />
      </Suspense>
    </>
  );
}
