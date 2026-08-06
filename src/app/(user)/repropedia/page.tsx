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
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <RepropediaView />
      </Suspense>
    </>
  );
}
