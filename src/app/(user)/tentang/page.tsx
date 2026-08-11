import type { Metadata } from "next";
import React from "react";
import TentangView from "@/components/user/TentangView";

export const metadata: Metadata = {
  title: "Tentang Program SIGMA",
  description: "Ketahui visi, misi, dan tim pengembang di balik Program SIGMA dalam mewujudkan generasi muda cerdas reproduksi bebas pernikahan anak.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/tentang",
  }
};

export default function TentangPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigmaplatform.vercel.app/tentang/#webpage",
        "url": "https://sigmaplatform.vercel.app/tentang",
        "name": "Tentang Program SIGMA",
        "description": "Pelajari visi misi program SIGMA dan tim pengurus Kader GARUDA."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigmaplatform.vercel.app/tentang/#breadcrumb",
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
            "name": "Tentang",
            "item": "https://sigmaplatform.vercel.app/tentang"
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
