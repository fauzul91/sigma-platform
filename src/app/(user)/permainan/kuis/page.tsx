import React from "react";
import KuisView from "@/components/user/KuisView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kuis Pemahaman Remaja | SIGMA",
  description:
    "Pilih topik kuis kesehatan reproduksi, pubertas, hak anak, dan pencegahan perkawinan anak. Jawab pertanyaan interaktif dan tingkatkan pemahamanmu.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/permainan/kuis",
  },
  openGraph: {
    title: "Kuis Pemahaman Remaja | SIGMA",
    description:
      "Pilih topik kuis kesehatan reproduksi, pubertas, hak anak, dan pencegahan perkawinan anak.",
    url: "https://sigmaplatform.vercel.app/permainan/kuis",
    type: "website",
    images: [
      {
        url: "https://sigmaplatform.vercel.app/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kuis Pemahaman SIGMA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuis Pemahaman Remaja | SIGMA",
    description:
      "Pilih topik kuis kesehatan reproduksi, pubertas, hak anak, dan pencegahan perkawinan anak.",
    images: ["https://sigmaplatform.vercel.app/assets/og-image.jpg"],
  },
};

export default function PermainanKuisPage() {
  return <KuisView />;
}
