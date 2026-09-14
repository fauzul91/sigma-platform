import type { Metadata } from "next";
import React from "react";
import MythOrFactGameView from "@/components/user/games/MythOrFact/MythOrFactGameView";

export const metadata: Metadata = {
  title: "Mitos atau Fakta? | SIGMA",
  description:
    "Pernyataan muncul satu per satu. Kamu pilih mitos atau fakta—lalu pelajari penjelasan edukatifnya. 10 kartu, 1-2 menit.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/permainan/mitos-fakta",
  },
};

export default function MitosFaktaPage() {
  return <MythOrFactGameView />;
}
