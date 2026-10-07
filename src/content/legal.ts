import type { Block } from "./articles";
import { site } from "./site";

/**
 * DRAFT legal and regulatory pages. Plan §15: "Do not let the developer invent legal claims. Final
 * legal/regulatory copy must be approved by the client/compliance professional."
 * These drafts provide structure and neutral wording only. `pending` blocks render as placeholders.
 */
export type LegalBlock = Block | { type: "pending"; label: string };

export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  body: LegalBlock[];
};

const contactLine = `${site.legalName}, ${site.contact.address.line1}, ${site.contact.address.line2}, ${site.contact.address.city} – ${site.contact.address.postalCode}. Phone: ${site.contact.phoneDisplay}. Email: ${site.contact.email}.`;

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How Finmirai Insurance Brokers collects, uses, shares and protects personal data submitted through this website.",
    body: [
      { type: "p", text: `This Privacy Policy explains how ${site.legalName} ("Finmirai", "we", "us") handles personal data collected through this website.` },
      { type: "h2", text: "Information we collect" },
      { type: "ul", items: [
        "Details you submit in our forms, such as your name, mobile number, email, city, the type of insurance you are interested in and your message.",
        "For claim support requests: policy number, insurer, claim type, incident date and a brief description.",
        "For advisor applications: occupation, experience, areas of interest and preferred contact time.",
        "For corporate enquiries: company name, contact person, industry, employee count, location and requirements.",
        "Basic technical information such as the page you submitted from and your browser type. We store a one-way hash of your IP address for spam prevention, not the address itself.",
      ] },
      { type: "h2", text: "How we use it" },
      { type: "ul", items: [
        "To respond to your enquiry and contact you by your preferred method.",
        "To understand your insurance needs and, where you ask us to, approach insurers for options.",
        "To provide servicing and claims guidance.",
        "To process advisor applications.",
        "To keep a record of your consent and to prevent spam and misuse.",
      ] },
      { type: "h2", text: "Consent" },
      { type: "p", text: "We process the personal data you submit on the basis of the consent you give when you submit a form. You can withdraw consent at any time by contacting us; this does not affect processing already carried out." },
      { type: "h2", text: "Sharing" },
      { type: "p", text: "We share personal data only as needed to provide the service you request — for example, with insurers when arranging cover or supporting a claim — or where required by law. We do not sell personal data." },
      { type: "h2", text: "Sensitive documents" },
      { type: "p", text: "Please do not send medical records, identity documents or financial documents through website forms or plain email. We will tell you how to share them securely when needed." },
      { type: "h2", text: "Retention and security" },
      { type: "pending", label: "Retention period and security measures" },
      { type: "h2", text: "Your rights" },
      { type: "p", text: "Subject to applicable law, including the Digital Personal Data Protection Act, 2023 and rules made under it, you may request access to, correction of, or erasure of your personal data, and you may raise a grievance about how it is handled." },
      { type: "h2", text: "Cookies and analytics" },
      { type: "pending", label: "Cookie and analytics disclosure (if analytics are enabled)" },
      { type: "h2", text: "Contact" },
      { type: "p", text: contactLine },
      { type: "pending", label: "Grievance officer / data protection contact" },
      { type: "pending", label: "Effective date" },
    ],
  },
  {
    slug: "terms-of-use",
    title: "Terms of Use",
    description: "Terms governing the use of the Finmirai Insurance Brokers website.",
    body: [
      { type: "p", text: `By using this website you agree to these terms. The website is operated by ${site.legalName}.` },
      { type: "h2", text: "Information only" },
      { type: "p", text: "Content on this website is for general information about insurance and our services. It is not an offer of insurance, and it is not advice on any particular policy. Cover is subject to the insurer's underwriting and the terms, conditions and exclusions of the policy issued." },
      { type: "h2", text: "No guarantees" },
      { type: "p", text: "We do not guarantee any premium, policy outcome or claim settlement. Claims are assessed and settled by the insurer. Nothing on this website guarantees income for advisors." },
      { type: "h2", text: "Accuracy of information you provide" },
      { type: "p", text: "Please provide accurate and complete information. Incorrect or incomplete information can affect the advice we give and the insurance you obtain." },
      { type: "h2", text: "Intellectual property" },
      { type: "p", text: "The Finmirai name, logo and website content belong to Finmirai or its licensors and may not be reused without permission. Photographs are used under their respective licences." },
      { type: "h2", text: "Third-party links" },
      { type: "p", text: "Links to third-party websites, such as WhatsApp or map services, are provided for convenience. We are not responsible for their content or privacy practices." },
      { type: "h2", text: "Limitation of liability" },
      { type: "pending", label: "Limitation of liability clause" },
      { type: "h2", text: "Governing law and jurisdiction" },
      { type: "pending", label: "Governing law and jurisdiction" },
      { type: "pending", label: "Effective date" },
    ],
  },
  {
    slug: "disclosures",
    title: "Regulatory Disclosures",
    description: "Regulatory and statutory disclosures for Finmirai Insurance Brokers Private Limited.",
    body: [
      { type: "h2", text: "Company and registration details" },
      { type: "p", text: `Name: ${site.legalName}` },
      { type: "pending", label: "Broker registration number, category and validity" },
      { type: "pending", label: "CIN and registered office address" },
      { type: "p", text: `Principal Officer: ${site.leadership.name}` },
      { type: "h2", text: "Nature of our role" },
      { type: "p", text: "Finmirai acts as an insurance broker. Insurance policies are issued and underwritten by insurance companies. Claim admissibility and settlement are decided by the insurer in accordance with the policy terms and conditions." },
      { type: "h2", text: "Standard disclaimers" },
      { type: "ul", items: [
        "Insurance is the subject matter of solicitation.",
        "Please read the sales brochure and policy wording carefully before concluding a sale.",
        "Premium, cover and benefits are subject to the insurer's underwriting and policy terms.",
      ] },
      { type: "h2", text: "Remuneration" },
      { type: "pending", label: "Remuneration disclosure wording" },
      { type: "h2", text: "Insurer relationships" },
      { type: "p", text: "Insurer names and logos are displayed only with the insurer's permission." },
      { type: "pending", label: "List of insurer partners (only if approved for display)" },
    ],
  },
  {
    slug: "grievance-redressal",
    title: "Grievance Redressal",
    description: "How to raise a complaint with Finmirai Insurance Brokers and the escalation options available to policyholders.",
    body: [
      { type: "p", text: "We want to resolve concerns quickly and fairly. If you are unhappy with our service, please tell us." },
      { type: "h2", text: "Step 1 — Contact us" },
      { type: "p", text: contactLine },
      { type: "pending", label: "Grievance officer name, email and phone" },
      { type: "h2", text: "Step 2 — Acknowledgement and resolution" },
      { type: "pending", label: "Acknowledgement and resolution timelines" },
      { type: "h2", text: "Step 3 — Escalation" },
      { type: "p", text: "If a complaint concerns an insurer's decision, you may also use the insurer's own grievance redressal process. Policyholders may additionally have recourse to the regulator's grievance system and to the Insurance Ombudsman, subject to the applicable rules." },
      { type: "pending", label: "Verified escalation links and details (regulator portal, Insurance Ombudsman)" },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
