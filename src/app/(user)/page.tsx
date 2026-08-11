import type { Metadata } from "next";
import HomeView from "@/components/user/HomeView";

export const metadata: Metadata = {
  title: {
    absolute: "SIGMA | Platform Edukasi & Pemberdayaan Remaja",
  },
  description: "Platform edukasi kesehatan reproduksi, pencegahan perkawinan anak, dan ruang belajar serta berkarya bagi remaja.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/",
  }
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sigmaplatform.vercel.app/#organization",
        "name": "Program SIGMA",
        "url": "https://sigmaplatform.vercel.app",
        "logo": "https://sigmaplatform.vercel.app/assets/icon-512.jpg",
        "description": "Platform digital untuk edukasi kesehatan reproduksi remaja, pencegahan pernikahan usia anak, dan rujukan layanan konseling peer-to-peer."
      },
      {
        "@type": "WebSite",
        "@id": "https://sigmaplatform.vercel.app/#website",
        "url": "https://sigmaplatform.vercel.app",
        "name": "SIGMA",
        "publisher": { "@id": "https://sigmaplatform.vercel.app/#organization" }
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
