import type { Metadata } from "next";
import React from "react";
import GamesHubView from "@/components/user/games/GamesHubView";

export const metadata: Metadata = {
  title: "Permainan Edukasi Interaktif | SIGMA",
  description:
    "Ruang simulasi dan eksplorasi interaktif: Pilih Langkahmu (Visual Novel Keputusan), Mitos atau Fakta, Detektif Informasi Medsos, dan Kuis Pemahaman Remaja.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/permainan",
  },
  openGraph: {
    title: "Permainan Edukasi Interaktif | SIGMA",
    description:
      "Ruang simulasi dan eksplorasi interaktif: Pilih Langkahmu, Mitos atau Fakta, Detektif Informasi, dan Kuis Pemahaman Remaja.",
    url: "https://sigmaplatform.vercel.app/permainan",
    type: "website",
    images: [
      {
        url: "https://sigmaplatform.vercel.app/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Permainan Edukasi SIGMA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Permainan Edukasi Interaktif | SIGMA",
    description:
      "Ruang simulasi dan eksplorasi interaktif: Pilih Langkahmu, Mitos atau Fakta, Detektif Informasi, dan Kuis Pemahaman Remaja.",
    images: ["https://sigmaplatform.vercel.app/assets/og-image.jpg"],
  },
};

export default function PermainanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://sigmaplatform.vercel.app/permainan/#webpage",
    url: "https://sigmaplatform.vercel.app/permainan",
    name: "Permainan Edukasi Interaktif | SIGMA",
    description:
      "Ruang simulasi dan eksplorasi interaktif SIGMA: Pilih Langkahmu, Mitos atau Fakta, Detektif Informasi, dan Kuis Pemahaman.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GamesHubView />
    </>
  );
}
