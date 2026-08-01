import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Program SIGMA",
    short_name: "SIGMA",
    description: "Platform edukasi kesehatan reproduksi remaja & pencegahan perkawinan anak",
    start_url: "/beranda",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    icons: [
      {
        src: "/assets/icon-192.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/assets/icon-512.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
