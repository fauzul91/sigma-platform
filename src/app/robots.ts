import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/admin/dashboard",
        "/admin/login",
      ],
    },
    sitemap: "https://sigmaplatform.vercel.app/sitemap.xml",
  };
}
