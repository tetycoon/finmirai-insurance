/**
 * Single source of truth for Finmirai business information.
 *
 * Values come from the Finmirai business card as summarised in the Website Project Plan (Oct 2026).
 * Anything set to `null` is NOT yet confirmed by the client and renders as a visible placeholder
 * via <Pending />. Do not replace a `null` with a guess — see LAUNCH_CHECKLIST.md.
 */

export const site = {
  brand: "Finmirai",
  legalName: "Finmirai Insurance Brokers Private Limited",
  positioning: "Insurance and Risk Advisory",
  tagline: "Insurance Solutions. Professional Advice. Lasting Relationships.",
  description:
    "Finmirai Insurance Brokers Private Limited helps individuals, families, businesses and corporates in Chennai and across India understand risk, choose suitable insurance and get support with servicing and claims.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.finmirai.com").replace(/\/$/, ""),
  locale: "en_IN",

  contact: {
    // From business card — verify before launch (Plan §2).
    phoneDisplay: "+91 98411 87087",
    phoneE164: "+919841187087",
    // ASSUMPTION: the card phone also receives WhatsApp. Confirm with client before launch.
    whatsappNumber: "919841187087",
    whatsappDefaultMessage: "Hello Finmirai, I would like some help with insurance.",
    // From business card. Client should confirm whether an official domain email will replace this.
    email: "sujathiaf@gmail.com",
    address: {
      line1: "B4, Ceebros Rangam Apartments",
      line2: "11, Cenotaph Road, Teynampet",
      city: "Chennai",
      region: "Tamil Nadu",
      postalCode: "600018",
      country: "IN",
    },
    mapsQuery: "Ceebros Rangam Apartments, 11 Cenotaph Road, Teynampet, Chennai 600018",
    officeHours: null as string | null,
  },

  leadership: {
    name: "Flt. Lt. Sujatha G",
    title: "Managing Director & Principal Officer",
    // Plan §10: publish detailed biography only after client approval.
    approvedBio: null as string | null,
    photo: null as string | null,
  },

  regulatory: {
    // Plan §2 & §15: all statutory details must come from the client / compliance professional.
    brokerRegistrationNumber: null as string | null,
    registrationCategory: null as string | null,
    registrationValidity: null as string | null,
    cin: null as string | null,
    grievanceOfficer: null as string | null,
    grievanceEmail: null as string | null,
  },

  audiences: ["Individuals", "Families", "Businesses", "Corporates"],

  social: [] as { label: string; href: string }[],
} as const;

export type Site = typeof site;

export const fullAddress = [
  site.contact.address.line1,
  site.contact.address.line2,
  `${site.contact.address.city} – ${site.contact.address.postalCode}`,
].join(", ");

export function telHref(): string {
  return `tel:${site.contact.phoneE164}`;
}

export function whatsappHref(message: string = site.contact.whatsappDefaultMessage): string {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailHref(subject?: string): string {
  return `mailto:${site.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}

export function mapsHref(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapsQuery)}`;
}

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
