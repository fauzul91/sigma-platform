import type { Metadata } from "next";
import React from "react";
import KegiatanView from "@/components/user/KegiatanView";

export const metadata: Metadata = {
  title: "Kegiatan GARUDA",
  description: "Jelajahi aktivitas sosialisasi, seminar kesehatan, dan pelatihan kader sebaya dalam upaya pencegahan pernikahan usia anak di desa.",
  alternates: {
    canonical: "https://sigma-repro.org/kegiatan",
  }
};

export default function KegiatanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigma-repro.org/kegiatan/#webpage",
        "url": "https://sigma-repro.org/kegiatan",
        "name": "Kegiatan GARUDA | SIGMA",
        "description": "Menelusuri jejak kampanye, seminar sosialisasi, dan pelatihan pendampingan sebaya yang dilaksanakan oleh Kader GARUDA."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigma-repro.org/kegiatan/#breadcrumb",
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
            "name": "Kegiatan",
            "item": "https://sigma-repro.org/kegiatan"
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
      <KegiatanView />
    </>
  );
}
