import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { motionScript } from "@/lib/motionScript";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { organizationSchema } from "@/lib/structuredData";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap", weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} | Insurance & Risk Advisory, Chennai`,
    template: `%s | ${site.brand} Insurance Brokers`,
  },
  description: site.description,
  applicationName: site.brand,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0A1A30",
  width: "device-width",
  initialScale: 1,
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: browser extensions (e.g. ColorZilla's `cz-shortcut-listen`, Grammarly) add
    // attributes to <html>/<body> before React loads. This only ignores attribute differences on these two
    // elements — mismatches anywhere inside the page are still reported.
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal hidden states only when JS runs (no-JS visitors see everything). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        {/* Scroll-reveal + parallax: runs as soon as the HTML is parsed, without waiting for hydration */}
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <JsonLd data={organizationSchema()} />
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
