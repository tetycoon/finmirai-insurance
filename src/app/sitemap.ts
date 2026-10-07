import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { legalDocs } from "@/content/legal";
import { productHref, products } from "@/content/products";
import { absoluteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: [string, number][] = [
    ["/", 1],
    ["/insurance-solutions", 0.9],
    ["/corporate-insurance", 0.9],
    ["/claims-support", 0.9],
    ["/get-insurance-assistance", 0.8],
    ["/become-an-advisor", 0.8],
    ["/become-an-advisor/training", 0.6],
    ["/about-us", 0.7],
    ["/about-us/leadership", 0.6],
    ["/knowledge-centre", 0.7],
    ["/contact-us", 0.8],
    ["/legal", 0.3],
  ];
  return [
    ...staticPaths.map(([path, priority]) => ({ url: absoluteUrl(path), priority, changeFrequency: "monthly" as const })),
    ...products.map((p) => ({ url: absoluteUrl(productHref(p)), priority: 0.8, changeFrequency: "monthly" as const })),
    ...articles.map((a) => ({ url: absoluteUrl(`/knowledge-centre/${a.slug}`), lastModified: a.published, priority: 0.6 })),
    ...legalDocs.map((d) => ({ url: absoluteUrl(`/legal/${d.slug}`), priority: 0.3 })),
  ];
}
