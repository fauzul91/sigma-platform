import type { Metadata } from "next";
import HomeView from "@/components/HomeView";

export const metadata: Metadata = {
  title: "SIGMA | Edukasi Pencegahan Perkawinan Anak",
  description: "SIGMA adalah platform edukasi digital interaktif mengenai kesehatan reproduksi remaja, pencegahan perkawinan anak, pemenuhan hak anak, kesehatan mental, dan pencegahan kekerasan seksual, terhubung langsung dengan rujukan konseling Kader GARUDA.",
  alternates: {
    canonical: "https://sigma-repro.org/",
  }
};

export default function BerandaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sigma-repro.org/#organization",
        "name": "Program SIGMA",
        "url": "https://sigma-repro.org",
        "logo": "https://sigma-repro.org/assets/icon-512.jpg",
        "description": "Platform digital untuk edukasi kesehatan reproduksi remaja, pencegahan pernikahan usia anak, dan rujukan layanan konseling peer-to-peer."
      },
      {
        "@type": "WebSite",
        "@id": "https://sigma-repro.org/#website",
        "url": "https://sigma-repro.org",
        "name": "SIGMA",
        "publisher": { "@id": "https://sigma-repro.org/#organization" }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeView />
    </>
  );
}
