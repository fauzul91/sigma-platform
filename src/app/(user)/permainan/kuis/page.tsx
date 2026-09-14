import React from "react";
import KuisView from "@/components/user/KuisView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kuis Pemahaman | SIGMA",
  description:
    "Pilih topik kuis yang ingin kamu dalami. Jawab pertanyaan pilihan ganda dengan waktu santai.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/permainan/kuis",
  },
};

export default function PermainanKuisPage() {
  return <KuisView />;
}
