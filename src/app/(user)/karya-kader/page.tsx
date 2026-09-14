import type { Metadata } from "next";
import React from "react";
import KaryaKaderView from "@/components/user/KaryaKaderView";

export const metadata: Metadata = {
  title: "Karya Siswa & Kader GARUDA | SIGMA",
  description: "Galeri karya poster, cerita, dan ekspresi kreasi siswa dalam kampanye anti-pernikahan dini dan kepedulian gender.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/karya-kader",
  },
  openGraph: {
    title: "Karya Siswa & Kader GARUDA | SIGMA",
    description: "Galeri karya poster, cerita, dan ekspresi kreasi siswa dalam kampanye anti-pernikahan dini dan kepedulian gender.",
    url: "https://sigmaplatform.vercel.app/karya-kader",
    type: "website",
    images: [
      {
        url: "https://sigmaplatform.vercel.app/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Karya Siswa & Kader GARUDA SIGMA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karya Siswa & Kader GARUDA | SIGMA",
    description: "Galeri karya poster, cerita, dan ekspresi kreasi siswa dalam kampanye anti-pernikahan dini.",
    images: ["https://sigmaplatform.vercel.app/assets/og-image.jpg"],
  },
};

export default function KaryaKaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigmaplatform.vercel.app/karya-kader/#webpage",
        "url": "https://sigmaplatform.vercel.app/karya-kader",
        "name": "Komunitas GARUDA | SIGMA",
        "description": "Galeri apresiasi poster digital, infografis menarik, dan video edukasi orisinal buatan teman-teman siswa sekolah menengah."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigmaplatform.vercel.app/karya-kader/#breadcrumb",
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
            "name": "Karya Kader",
            "item": "https://sigmaplatform.vercel.app/karya-kader"
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
