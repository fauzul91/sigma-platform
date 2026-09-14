import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SIGMA | Platform Edukasi & Pemberdayaan Remaja",
    short_name: "SIGMA",
    description: "Platform edukasi kesehatan reproduksi remaja, pencegahan perkawinan anak, dan ruang belajar serta konseling sebaya.",
    start_url: "/beranda",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#059669",
    icons: [
      {
        src: "/assets/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
