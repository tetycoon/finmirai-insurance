import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Keep staging out of search engines: set NEXT_PUBLIC_SITE_URL to the production domain only in production.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";
  return {
    rules: isProduction ? [{ userAgent: "*", allow: "/", disallow: ["/api/"] }] : [{ userAgent: "*", disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
