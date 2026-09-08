import type { Metadata } from "next";
import React, { Suspense } from "react";
import RepropediaView from "@/components/user/RepropediaView";

export const metadata: Metadata = {
  title: "Repropedia - Modul Kesehatan Reproduksi Remaja",
  description:
    "Buku panduan resmi literasi kesehatan reproduksi remaja, hak-hak anak, pencegahan perkawinan anak, dan penanganan kekerasan seksual SIGMA Platform.",
  alternates: {
    canonical: "https://sigmaplatform.vercel.app/repropedia",
  },
  openGraph: {
    title: "Repropedia: Modul Kesehatan Reproduksi Remaja | SIGMA",
    description:
      "Buku panduan resmi literasi kesehatan reproduksi remaja, hak-hak anak, dan pencegahan pernikahan dini.",
    url: "https://sigmaplatform.vercel.app/repropedia",
    type: "book",
    images: [
      {
        url: "https://sigmaplatform.vercel.app/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Buku Panduan Repropedia SIGMA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Repropedia: Modul Kesehatan Reproduksi Remaja | SIGMA",
    description:
      "Buku panduan resmi literasi kesehatan reproduksi remaja, hak-hak anak, dan pencegahan pernikahan dini.",
    images: ["https://sigmaplatform.vercel.app/assets/og-image.jpg"],
  },
};

export default function RepropediaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sigmaplatform.vercel.app/repropedia/#webpage",
        url: "https://sigmaplatform.vercel.app/repropedia",
        name: "Repropedia: Modul Kesehatan Reproduksi Remaja | SIGMA",
        description:
          "Buku panduan resmi literasi kesehatan reproduksi remaja, hak-hak anak, dan pencegahan pernikahan dini.",
      },
      {
        "@type": "Book",
        "@id": "https://sigmaplatform.vercel.app/repropedia/#book",
        name: "Buku Panduan Repropedia SIGMA",
        bookFormat: "https://schema.org/EBook",
        numberOfPages: 24,
        inLanguage: "id",
        url: "https://sigmaplatform.vercel.app/assets/buku_repropedia.pdf",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="bg-slate-50 min-h-screen py-12 animate-pulse">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
              <div className="h-36 bg-slate-200 rounded-3xl w-full" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 h-[600px] bg-slate-200 rounded-3xl" />
                <div className="lg:col-span-7 h-[600px] bg-slate-200 rounded-3xl" />
              </div>
            </div>
          </div>
        }
      >
        <RepropediaView />
      </Suspense>
    </>
  );
}
