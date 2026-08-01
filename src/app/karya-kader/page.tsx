import type { Metadata } from "next";
import React from "react";
import KaryaKaderView from "@/components/KaryaKaderView";

export const metadata: Metadata = {
  title: "Komunitas GARUDA",
  description: "Galeri karya poster, cerita, dan ekspresi kreasi siswa dalam kampanye anti-pernikahan dini dan kepedulian gender.",
  alternates: {
    canonical: "https://sigma-repro.org/karya-kader",
  }
};

export default function KaryaKaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigma-repro.org/karya-kader/#webpage",
        "url": "https://sigma-repro.org/karya-kader",
        "name": "Komunitas GARUDA | SIGMA",
        "description": "Galeri apresiasi poster digital, infografis menarik, dan video edukasi orisinal buatan teman-teman siswa sekolah menengah."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigma-repro.org/karya-kader/#breadcrumb",
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
            "name": "Karya Kader",
            "item": "https://sigma-repro.org/karya-kader"
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
      <KaryaKaderView />
    </>
  );
}
