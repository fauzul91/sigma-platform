import type { Metadata } from "next";
import React from "react";
import KontakView from "@/components/user/KontakView";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Hubungi tim pengurus Program SIGMA dan Kader GARUDA untuk saran, masukan, kerjasama instansi, atau undangan sosialisasi.",
  alternates: {
    canonical: "https://sigma-repro.org/kontak",
  }
};

export default function KontakPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigma-repro.org/kontak/#webpage",
        "url": "https://sigma-repro.org/kontak",
        "name": "Hubungi Kami | SIGMA",
        "description": "Kader GARUDA terbuka terhadap saran, undangan sosialisasi sekolah, kolaborasi instansi, atau masukan platform."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigma-repro.org/kontak/#breadcrumb",
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
            "name": "Hubungi Kami",
            "item": "https://sigma-repro.org/kontak"
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
      <KontakView />
    </>
  );
}
