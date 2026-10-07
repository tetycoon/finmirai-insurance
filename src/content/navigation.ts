import { corporateProducts, personalProducts, productHref } from "./products";

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Insurance Solutions",
    href: "/insurance-solutions",
    children: [
      ...personalProducts.map((p) => ({ label: p.name, href: productHref(p), description: p.cardSummary })),
    ],
  },
  {
    label: "Corporate",
    href: "/corporate-insurance",
    children: [
      ...corporateProducts.map((p) => ({ label: p.name, href: productHref(p), description: p.cardSummary })),
    ],
  },
  { label: "Claims Support", href: "/claims-support" },
  {
    label: "Become an Advisor",
    href: "/become-an-advisor",
    children: [
      { label: "Advisor Programme", href: "/become-an-advisor", description: "Build an insurance career with Finmirai." },
      { label: "Training & Support", href: "/become-an-advisor/training", description: "How we help advisors learn and grow." },
    ],
  },
  {
    label: "About",
    href: "/about-us",
    children: [
      { label: "About Finmirai", href: "/about-us", description: "Our approach and values." },
      { label: "Leadership", href: "/about-us/leadership", description: "Our Managing Director & Principal Officer." },
    ],
  },
  {
    label: "Resources",
    href: "/knowledge-centre",
    children: [
      { label: "Knowledge Centre", href: "/knowledge-centre", description: "Plain-language guides to insurance." },
      { label: "Claim Documents Checklist", href: "/knowledge-centre/documents-needed-for-insurance-claim", description: "What insurers commonly ask for, by claim type." },
      { label: "Health Insurance Waiting Periods", href: "/knowledge-centre/health-insurance-waiting-periods-explained", description: "Why some claims aren't paid early in a policy." },
      { label: "Insurance FAQs", href: "/knowledge-centre#faqs", description: "Quick answers to common questions." },
      { label: "Legal & Disclosures", href: "/legal", description: "Privacy, terms and regulatory disclosures." },
      { label: "Grievance Redressal", href: "/legal/grievance-redressal", description: "How to raise a concern with us." },
    ],
  },
  { label: "Contact", href: "/contact-us" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Personal Insurance",
    links: personalProducts.map((p) => ({ label: p.name, href: productHref(p) })),
  },
  {
    title: "Corporate Insurance",
    links: corporateProducts.map((p) => ({ label: p.name, href: productHref(p) })),
  },
  {
    title: "Finmirai",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Leadership", href: "/about-us/leadership" },
      { label: "Claims Support", href: "/claims-support" },
      { label: "Become an Advisor", href: "/become-an-advisor" },
      { label: "Knowledge Centre", href: "/knowledge-centre" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Use", href: "/legal/terms-of-use" },
  { label: "Disclosures", href: "/legal/disclosures" },
  { label: "Grievance Redressal", href: "/legal/grievance-redressal" },
  { label: "Image Credits", href: "/legal/image-credits" },
];
