import type { Metadata } from "next";
import React from "react";
import FaqView from "@/components/user/FaqView";

export const metadata: Metadata = {
  title: "FAQ Umum",
  description: "Pertanyaan yang sering diajukan seputar kesehatan reproduksi remaja, pencegahan perkawinan usia anak, dan layanan konseling Program SIGMA.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/faq",
  },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigmaplatform.vercel.app/faq/#webpage",
        "url": "https://sigmaplatform.vercel.app/faq",
        "name": "FAQ Umum | SIGMA",
        "description": "Tanya jawab kesehatan reproduksi dan pencegahan pernikahan anak di platform SIGMA.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sigmaplatform.vercel.app/faq/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": "https://sigmaplatform.vercel.app/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "FAQ Umum",
            "item": "https://sigmaplatform.vercel.app/faq",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqView />
    </>
  );
}
