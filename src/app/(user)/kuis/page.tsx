import type { Metadata } from "next";
import React from "react";
import KuisView from "@/components/user/KuisView";

export const metadata: Metadata = {
  title: "Kuis Edukasi",
  description: "Uji pemahamanmu secara menyenangkan melalui kuis interaktif berhadiah badge prestasi belajar dari SIGMA. Tanpa tekanan, fokus pada literasi diri.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/kuis",
  }
};

export default function KuisPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigmaplatform.vercel.app/kuis/#webpage",
        "url": "https://sigmaplatform.vercel.app/kuis",
        "name": "Kuis Edukasi | SIGMA",
        "description": "Uji pemahamanmu secara menyenangkan melalui kuis interaktif berhadiah lencana prestasi belajar."
      },
      {
        "@type": "Quiz",
        "@id": "https://sigmaplatform.vercel.app/kuis/#quiz",
        "name": "Kuis Kesehatan Reproduksi & Pencegahan Perkawinan Anak SIGMA",
        "description": "Tantangan kuis interaktif ramah remaja mencakup kesehatan reproduksi, batasan perkawinan dini, hak anak, dan kesehatan mental.",
        "educationalAlignment": {
          "@type": "AlignmentObject",
          "alignmentType": "educationalLevel",
          "educationalFramework": "Kurikulum Kesehatan Reproduksi Remaja Indonesia",
          "targetName": "Remaja Sekolah Menengah"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigmaplatform.vercel.app/kuis/#breadcrumb",
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
            "name": "Kuis Edukasi",
            "item": "https://sigmaplatform.vercel.app/kuis"
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
      <KuisView />
    </>
  );
}
