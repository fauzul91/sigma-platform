import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "SIGMA | Edukasi Pencegahan Perkawinan Anak",
    template: "%s | SIGMA"
  },
  description: "Platform digital untuk edukasi kesehatan reproduksi remaja, pencegahan pernikahan usia anak, dan rujukan layanan konseling peer-to-peer.",
  metadataBase: new URL("https://sigma-repro.org"),
  alternates: {
    canonical: "./",
  },
  keywords: [
    "SIGMA", "Kesehatan Reproduksi", "Pencegahan Pernikahan Anak", 
    "Hak Anak", "Kesehatan Mental Remaja", "Kekerasan Seksual", 
    "Konseling Remaja", "Kader GARUDA"
  ],
  authors: [{ name: "Kader GARUDA & Tim SIGMA" }],
  icons: {
    icon: [
      { url: "/assets/logo_app.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/logo_app.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [
      { url: "/assets/logo_app.png", sizes: "180x180", type: "image/png" }
    ]
  },
  openGraph: {
    title: "SIGMA | Edukasi Pencegahan Perkawinan Anak",
    description: "Platform digital untuk edukasi kesehatan reproduksi remaja, pencegahan pernikahan usia anak, dan rujukan layanan konseling peer-to-peer.",
    url: "https://sigma-repro.org",
    siteName: "SIGMA",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SIGMA - Edukasi Pencegahan Perkawinan Anak",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SIGMA | Edukasi Pencegahan Perkawinan Anak",
    description: "Platform digital untuk edukasi kesehatan reproduksi remaja, pencegahan pernikahan usia anak, dan rujukan layanan konseling peer-to-peer.",
    images: ["/assets/og-image.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${bricolage.variable} ${hanken.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
