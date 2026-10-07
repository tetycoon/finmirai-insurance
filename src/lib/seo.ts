import type { Metadata } from "next";
import { absoluteUrl, site } from "@/content/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** Use the title exactly as given (homepage) instead of appending the brand. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  noindex?: boolean;
};

export function buildMetadata({ title, description, path, image, absoluteTitle, type = "website", noindex }: MetaInput): Metadata {
  const ogImage = image ?? "/images/family-four.jpg";
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type,
      url: absoluteUrl(path),
      siteName: site.legalName,
      title,
      description,
      locale: site.locale,
      images: [{ url: absoluteUrl(ogImage), width: 1600, height: 1067 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl(ogImage)] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
