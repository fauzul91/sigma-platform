import type { Metadata } from "next";
import React from "react";
import TentangView from "@/components/user/TentangView";

export const metadata: Metadata = {
  title: "Tentang Program SIGMA",
  description: "Ketahui visi, misi, dan tim pengembang di balik Program SIGMA dalam mewujudkan generasi muda cerdas reproduksi bebas pernikahan anak.",
  alternates: {
    canonical: "https://sigma-repro.org/tentang",
  }
};

export default function TentangPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigma-repro.org/tentang/#webpage",
        "url": "https://sigma-repro.org/tentang",
        "name": "Tentang Program SIGMA",
        "description": "Pelajari visi misi program SIGMA dan tim pengurus Kader GARUDA."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigma-repro.org/tentang/#breadcrumb",
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
            "name": "Tentang",
            "item": "https://sigma-repro.org/tentang"
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
      <TentangView />
    </>
  );
}
