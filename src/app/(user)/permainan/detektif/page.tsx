import type { Metadata } from "next";
import React from "react";
import DetectiveGameView from "@/components/user/games/Detective/DetectiveGameView";

export const metadata: Metadata = {
  title: "Detektif Informasi | SIGMA",
  description:
    "Periksa postingan media sosial satu per satu. Kumpulkan petunjuk, lalu putuskan: terpercaya, perlu dicek, atau menyesatkan?",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/permainan/detektif",
  },
};

export default function DetektifPage() {
  return <DetectiveGameView />;
}
