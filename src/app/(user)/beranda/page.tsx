import type { Metadata } from "next";
import HomeView from "@/components/user/HomeView";

export const metadata: Metadata = {
  title: {
    absolute: "SIGMA | Platform Edukasi & Pemberdayaan Remaja",
  },
  description: "Platform edukasi kesehatan reproduksi, pencegahan perkawinan anak, dan ruang belajar serta berkarya bagi remaja.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/beranda",
  },
  openGraph: {
    title: "SIGMA | Platform Edukasi & Pemberdayaan Remaja",
    description: "Platform edukasi kesehatan reproduksi, pencegahan perkawinan anak, dan ruang belajar serta berkarya bagi remaja.",
    url: "https://sigmaplatform.vercel.app/beranda",
    type: "website",
    images: [
      {
        url: "https://sigmaplatform.vercel.app/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SIGMA - Platform Edukasi & Pemberdayaan Remaja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIGMA | Platform Edukasi & Pemberdayaan Remaja",
    description: "Platform edukasi kesehatan reproduksi, pencegahan perkawinan anak, dan ruang belajar serta berkarya bagi remaja.",
    images: ["https://sigmaplatform.vercel.app/assets/og-image.jpg"],
  },
};

export default function BerandaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sigmaplatform.vercel.app/#organization",
        "name": "Program SIGMA",
        "url": "https://sigmaplatform.vercel.app",
        "logo": "https://sigmaplatform.vercel.app/assets/logo_app.png",
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
