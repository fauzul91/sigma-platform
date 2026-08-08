import type { Metadata } from "next";
import React from "react";
import StatistikView from "@/components/user/StatistikView";

export const metadata: Metadata = {
  title: "Statistik",
  description: "Pantau grafik penurunan angka pernikahan usia anak dan data kasus perlindungan anak di daerah binaan program SIGMA secara berkala.",
  alternates: {
    canonical: "https://sigma-repro.org/statistik",
  }
};

export default function StatistikPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigma-repro.org/statistik/#webpage",
        "url": "https://sigma-repro.org/statistik",
        "name": "Statistik | SIGMA",
        "description": "Dashboard data kejadian pernikahan dini dan kasus perlindungan anak daerah Jember."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigma-repro.org/statistik/#breadcrumb",
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
            "name": "Statistik",
            "item": "https://sigma-repro.org/statistik"
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
      <StatistikView />
    </>
  );
}
