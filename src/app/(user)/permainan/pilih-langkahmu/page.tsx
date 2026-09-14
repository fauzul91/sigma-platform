import type { Metadata } from "next";
import React from "react";
import PilihLangkahmuView from "@/components/user/games/PilihLangkahmu/PilihLangkahmuView";

export const metadata: Metadata = {
  title: "Pilih Langkahmu — Simulasi Keputusan Remaja | SIGMA",
  description:
    "Simulasi visual novel interaktif 5 langkah untuk melatih respon dan pengambilan keputusan seputar pencegahan perkawinan anak, privasi digital, peer pressure, dan relasi sehat.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/permainan/pilih-langkahmu",
  },
  openGraph: {
    title: "Pilih Langkahmu — Simulasi Keputusan Remaja | SIGMA",
    description:
      "Simulasi visual novel interaktif 5 langkah untuk melatih respon dan pengambilan keputusan seputar pencegahan perkawinan anak, privasi digital, peer pressure, dan relasi sehat.",
    url: "https://sigmaplatform.vercel.app/permainan/pilih-langkahmu",
    type: "website",
    images: [
      {
        url: "https://sigmaplatform.vercel.app/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pilih Langkahmu - Simulasi Keputusan SIGMA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pilih Langkahmu — Simulasi Keputusan Remaja | SIGMA",
    description:
      "Simulasi visual novel interaktif 5 langkah untuk melatih respon dan pengambilan keputusan remaja.",
    images: ["https://sigmaplatform.vercel.app/assets/og-image.jpg"],
  },
};

export default function PilihLangkahmuPage() {
  return <PilihLangkahmuView />;
}