import type { Metadata } from "next";
import React from "react";
import KonselingView from "@/components/user/KonselingView";

export const metadata: Metadata = {
  title: "Bantuan & Konseling",
  description: "Jaringan rujukan pendampingan psikologis, medis, dan konseling sebaya Kader GARUDA untuk remaja di wilayah Jember.",
  alternates: {
    canonical: "https://sigma-repro.org/konseling",
  }
};

export default function KonselingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigma-repro.org/konseling/#webpage",
        "url": "https://sigma-repro.org/konseling",
        "name": "Layanan Konseling | SIGMA",
        "description": "Layanan bantuan pendampingan konseling sebaya Kader GARUDA, Guru BK, dan bidan Puskesmas."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigma-repro.org/konseling/#breadcrumb",
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
            "name": "Konseling & Bantuan",
            "item": "https://sigma-repro.org/konseling"
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
      <KonselingView />
    </>
  );
}
