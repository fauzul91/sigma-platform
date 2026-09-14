import type { Metadata } from "next";
import React from "react";
import MythOrFactGameView from "@/components/user/games/MythOrFact/MythOrFactGameView";

export const metadata: Metadata = {
  title: "Mitos atau Fakta? | SIGMA",
  description:
    "Tantangan interaktif menguji kepekaan membedakan mitos populer dan fakta medis seputar pubertas dan kesehatan reproduksi. 10 kartu swipe cepat.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/permainan/mitos-fakta",
  },
  openGraph: {
    title: "Mitos atau Fakta? | SIGMA",
    description:
      "Tantangan interaktif membedakan mitos populer dan fakta medis seputar pubertas dan kesehatan reproduksi.",
    url: "https://sigmaplatform.vercel.app/permainan/mitos-fakta",
    type: "website",
    images: [
      {
        url: "https://sigmaplatform.vercel.app/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mitos atau Fakta - SIGMA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitos atau Fakta? | SIGMA",
    description:
      "Tantangan interaktif membedakan mitos populer dan fakta medis seputar pubertas dan kesehatan reproduksi.",
    images: ["https://sigmaplatform.vercel.app/assets/og-image.jpg"],
  },
};

export default function MitosFaktaPage() {
  return <MythOrFactGameView />;
}
