import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SosButton from "@/components/SosButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Program SIGMA - Edukasi Kesehatan Reproduksi & Pencegahan Perkawinan Anak",
  description: "Platform digital untuk edukasi kesehatan reproduksi remaja, pencegahan pernikahan usia anak, dan fasilitasi rujukan layanan konseling peer-to-peer di lingkungan sekolah & puskesmas.",
  metadataBase: new URL("https://sigma-repro.org"),
  openGraph: {
    title: "Program SIGMA",
    description: "Edukasi Kesehatan Reproduksi & Pencegahan Perkawinan Anak",
    url: "https://sigma-repro.org",
    siteName: "Program SIGMA",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-grow pt-[68px] md:pt-[76px]">
          {children}
        </main>
        <Footer />
        <SosButton />
      </body>
    </html>
  );
}
