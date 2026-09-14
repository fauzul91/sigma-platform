import type { Metadata } from "next";
import React from "react";
import PilihLangkahmuView from "@/components/user/games/PilihLangkahmu/PilihLangkahmuView";

export const metadata: Metadata = {
  title: "Pilih Langkahmu — Simulasi Keputusan Remaja | SIGMA",
  description:
    "Simulasi cerita percakapan interaktif untuk melatih respon dan pengambilan keputusan yang sehat, aman, dan bertanggung jawab.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/permainan/pilih-langkahmu",
  },
};

export default function PilihLangkahmuPage() {
  return <PilihLangkahmuView />;
}