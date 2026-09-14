import type { Metadata } from "next";
import React from "react";
import DetectiveGameView from "@/components/user/games/Detective/DetectiveGameView";

export const metadata: Metadata = {
  title: "Detektif Informasi Medsos | SIGMA",
  description:
    "Investigasi forensik postingan media sosial viral seputar kesehatan reproduksi. Kumpulkan bukti, analisa kredibilitas, dan putuskan kesimpulannya.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/permainan/detektif",
  },
  openGraph: {
    title: "Detektif Informasi Medsos | SIGMA",
    description:
      "Investigasi forensik postingan media sosial viral seputar kesehatan reproduksi. Kumpulkan bukti dan putuskan status informasinya.",
    url: "https://sigmaplatform.vercel.app/permainan/detektif",
    type: "website",
    images: [
      {
        url: "https://sigmaplatform.vercel.app/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Detektif Informasi - SIGMA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Detektif Informasi Medsos | SIGMA",
    description:
      "Investigasi forensik postingan media sosial viral seputar kesehatan reproduksi.",
    images: ["https://sigmaplatform.vercel.app/assets/og-image.jpg"],
  },
};

export default function DetektifPage() {
  return <DetectiveGameView />;
}
