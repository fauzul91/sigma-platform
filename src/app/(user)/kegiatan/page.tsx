import type { Metadata } from "next";
import React from "react";
import KegiatanView from "@/components/user/KegiatanView";

export const metadata: Metadata = {
  title: "Galeri Kegiatan GARUDA | SIGMA",
  description: "Jelajahi aktivitas sosialisasi, seminar kesehatan, dan pelatihan kader sebaya dalam upaya pencegahan pernikahan usia anak di desa.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/kegiatan",
  },
  openGraph: {
    title: "Galeri Kegiatan GARUDA | SIGMA",
    description: "Jelajahi aktivitas sosialisasi, seminar kesehatan, dan pelatihan kader sebaya dalam upaya pencegahan pernikahan usia anak di desa.",
    url: "https://sigmaplatform.vercel.app/kegiatan",
    type: "website",
    images: [
      {
        url: "https://sigmaplatform.vercel.app/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kegiatan GARUDA SIGMA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeri Kegiatan GARUDA | SIGMA",
    description: "Aktivitas sosialisasi, seminar kesehatan, dan pelatihan kader sebaya SIGMA.",
    images: ["https://sigmaplatform.vercel.app/assets/og-image.jpg"],
  },
};

export default function KegiatanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigmaplatform.vercel.app/kegiatan/#webpage",
        "url": "https://sigmaplatform.vercel.app/kegiatan",
        "name": "Kegiatan GARUDA | SIGMA",
        "description": "Menelusuri jejak kampanye, seminar sosialisasi, dan pelatihan pendampingan sebaya yang dilaksanakan oleh Kader GARUDA."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigmaplatform.vercel.app/kegiatan/#breadcrumb",
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
            "name": "Kegiatan",
            "item": "https://sigmaplatform.vercel.app/kegiatan"
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
