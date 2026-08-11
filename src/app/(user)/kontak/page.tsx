import type { Metadata } from "next";
import React from "react";
import KontakView from "@/components/user/KontakView";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Hubungi tim pengurus Program SIGMA dan Kader GARUDA untuk saran, masukan, kerjasama instansi, atau undangan sosialisasi.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/kontak",
  }
};

export default function KontakPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigmaplatform.vercel.app/kontak/#webpage",
        "url": "https://sigmaplatform.vercel.app/kontak",
        "name": "Hubungi Kami | SIGMA",
        "description": "Kader GARUDA terbuka terhadap saran, undangan sosialisasi sekolah, kolaborasi instansi, atau masukan platform."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigmaplatform.vercel.app/kontak/#breadcrumb",
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
            "name": "Hubungi Kami",
            "item": "https://sigmaplatform.vercel.app/kontak"
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
