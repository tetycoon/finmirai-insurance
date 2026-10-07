import { absoluteUrl, site } from "@/content/site";

export function organizationSchema() {
  const a = site.contact.address;
  return {
    "@context": "https://schema.org",
    "@type": ["InsuranceAgency", "LocalBusiness"],
    "@id": absoluteUrl("/#organization"),
    name: site.legalName,
    alternateName: site.brand,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/images/family-four.jpg"),
    description: site.description,
    telephone: site.contact.phoneE164,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${a.line1}, ${a.line2}`,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    areaServed: "IN",
    employee: {
      "@type": "Person",
      name: site.leadership.name,
      jobTitle: site.leadership.title,
    },
    sameAs: site.social.map((s) => s.href),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(input: { name: string; description: string; path: string; audience?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: input.name,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "IN",
    audience: input.audience ? { "@type": "Audience", audienceType: input.audience } : undefined,
  };
}

export function articleSchema(input: { title: string; description: string; path: string; image: string; published: string; author: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: absoluteUrl(input.image),
    datePublished: input.published,
    dateModified: input.published,
    author: { "@type": "Organization", name: input.author },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}
