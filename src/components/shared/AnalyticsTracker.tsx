"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-SIGMAANALYTICS";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Record pageview to internal analytics tracking API
    if (typeof window !== "undefined" && !pathname.startsWith("/admin")) {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer || "direct",
          domain: window.location.hostname,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {
        // Silent catch for analytics ping
      });
    }
  }, [pathname]);

  return (
    <>
      {/* Google Analytics 4 Script Integration for ruangsigma.site */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_domain: 'ruangsigma.site',
            });
          `,
        }}
      />
    </>
  );
}
