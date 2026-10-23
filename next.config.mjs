/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Don't enable experimental.inlineCss: measured on this site it embeds the stylesheet 4× in each HTML
  // page and again in every prefetched route payload, raising mobile Total Blocking Time from ~0.3s to 1–3s.
  images: {
    formats: ["image/avif", "image/webp"],
    // Default is 60s: browsers re-check every photo a minute later and the server re-encodes them.
    // Photos in /public/images rarely change — when replacing one, give the new file a new name.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
