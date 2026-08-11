import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sigmaplatform.vercel.app";
  const routes = [
    "",
    "/beranda",
    "/edukasi",
    "/repropedia",
    "/kuis",
    "/konseling",
    "/tentang",
    "/karya-kader",
    "/kegiatan",
    "/statistik",
    "/kontak",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly",
    priority: route === "" || route === "/beranda" ? 1.0 : 0.8,
  }));
}
