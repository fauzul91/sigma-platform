import type { Metadata } from "next";
import React from "react";
import GamesHubView from "@/components/user/games/GamesHubView";

export const metadata: Metadata = {
  title: "Permainan | SIGMA",
  description:
    "Tiga cara belajar interaktif: Mitos atau Fakta, Detektif Informasi, dan Kuis Pemahaman. Asah wawasan dan daya kritis lewat pengalaman yang menyenangkan.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/permainan",
  },
};

export default function PermainanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://sigmaplatform.vercel.app/permainan/#webpage",
    url: "https://sigmaplatform.vercel.app/permainan",
    name: "Permainan | SIGMA",
    description:
      "Ruang belajar interaktif SIGMA dengan tiga cara belajar: Mitos atau Fakta, Detektif Informasi, dan Kuis Pemahaman.",
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
