import Link from "next/link";
import { ClaimSupportForm } from "@/components/forms/Forms";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { images } from "@/content/images";
import { site, telHref, whatsappHref } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insurance Claims Support & Guidance",
  description:
    "Need help with a health, motor, home, travel or business insurance claim? Finmirai guides you through the process and documents, subject to policy terms and the insurer's process.",
  path: "/claims-support",
  image: images.supportDesk.src,
});

/** Plan §8 recommended page flow. */
const steps: { title: string; text: string; icon: IconName }[] = [
  { title: "Tell us what happened", text: "Use the claim-support form, call or WhatsApp us.", icon: "phone" },
  { title: "Share basic details", text: "Policy number, insurer, date of incident, claim type and your contact details.", icon: "fileText" },
  { title: "Document guidance", text: "We share a checklist of documents based on your claim type.", icon: "layers" },
  { title: "Finmirai support", text: "We guide and coordinate within the broker's role, and help you communicate with the insurer.", icon: "handshake" },
  { title: "Follow up", text: "You receive a service reference number and we follow up with you on progress.", icon: "refresh" },
  { title: "Resolution", text: "Claim assessment and settlement remain subject to the insurer, the policy terms and the applicable process.", icon: "scale" },
];

/** Starting-point checklists — insurers may ask for more depending on the case. */
const checklists: { type: string; icon: IconName; items: string[] }[] = [
  {
    type: "Health",
    icon: "heartPulse",
    items: ["Policy / health card and photo ID", "Claim form", "Discharge summary", "Hospital bills and payment receipts", "Investigation reports and prescriptions", "KYC and bank details for reimbursement"],
  },
  {
    type: "Motor",
    icon: "car",
    items: ["Policy copy and claim form", "Registration certificate (RC)", "Driving licence of the driver", "Photographs of damage", "Repair estimate and invoice", "Police report (FIR) for theft or third-party injury"],
  },
  {
    type: "Home & property",
    icon: "home",
    items: ["Policy copy and claim form", "Photographs of the damage", "Proof of ownership / purchase bills", "Police report for burglary or theft", "Fire brigade report where applicable", "Repair or replacement estimates"],
  },
  {
    type: "Travel",
    icon: "plane",
    items: ["Claim form and passport copy", "Travel tickets and boarding passes", "Medical reports and bills", "Airline report for baggage loss or delay", "Police report for theft abroad"],
  },
];

const faqs = [
  { q: "Does Finmirai settle my claim?", a: "No. The insurer assesses and settles claims under the policy terms. Finmirai helps you understand the process, organise documents, communicate with the insurer and follow up." },
  { q: "Can you help if I didn't buy my policy through Finmirai?", a: "Please contact us and tell us about the situation. We'll let you know honestly whether and how we can help." },
  { q: "When should I inform the insurer?", a: "As soon as reasonably possible. Most policies set time limits for claim intimation, and late intimation can complicate claims. If you're unsure, contact us immediately." },
  { q: "Should I email my medical reports or ID documents?", a: "Please don't send sensitive documents by plain email or social media. We'll tell you exactly what's needed and how to share it securely." },
  { q: "My claim was rejected or partly paid. What can I do?", a: "Ask the insurer for the reason in writing. We can help you understand the decision and the options available, including the insurer's grievance process." },
];

export default function ClaimsSupportPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Claims Support", path: "/claims-support" }]}
        eyebrow="Claims support"
        title="Insurance matters most when something goes wrong."
        intro={
          <p>
            Finmirai can guide you through the information and documentation needed for the claims process, subject to policy terms and the
            insurer&apos;s process.
          </p>
        }
        image={images.supportDesk}
        actions={
          <>
            <ButtonLink href="#claim-form" variant="gold" size="lg" iconRight="arrowRight">
              Get Claims Support
            </ButtonLink>
            <TrackedLink kind="call" location="claims_hero" href={telHref()} className={buttonClasses("outlineLight", "lg")}>
              <Icon name="phone" className="h-5 w-5" /> Call now
            </TrackedLink>
            <TrackedLink kind="whatsapp" location="claims_hero" href={whatsappHref("Hello Finmirai, I need help with an insurance claim.")} className={buttonClasses("outlineLight", "lg")}>
              <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp
            </TrackedLink>
          </>
        }
      />

      <Section labelledBy="steps-heading">
        <SectionHeading id="steps-heading" eyebrow="How it works" title="What to expect when you contact us" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-navy-100 bg-white p-6">
              <span className="font-display text-5xl font-extrabold text-navy-100">{String(i + 1).padStart(2, "0")}</span>
              <Icon name={s.icon} className="absolute right-6 top-6 h-6 w-6 text-gold-500" />
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 leading-relaxed text-navy-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="claim-form" tone="mist" labelledBy="claim-form-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="claim-form-heading"
              eyebrow="Claim support request"
              title="Tell us what happened"
              intro="We'll create a service request and contact you. For emergencies such as hospital admission, also call us directly."
            />
            <div className="mt-6 rounded-xl border border-gold-300 bg-gold-50 p-4 text-sm leading-relaxed text-navy-800">
              <p className="flex items-center gap-2 font-semibold">
                <Icon name="alert" className="h-4 w-4 text-gold-700" /> Inform your insurer too
              </p>
              <p className="mt-1">Your policy may require you to notify the insurer within a set time. Check your policy or call the insurer&apos;s helpline.</p>
            </div>
            <p className="mt-6 text-sm text-navy-600">
              Urgent? Call <TrackedLink kind="call" location="claims_form_aside" href={telHref()} className="font-semibold text-navy-900 underline decoration-gold-400 underline-offset-2">{site.contact.phoneDisplay}</TrackedLink>
            </p>
          </div>
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8 lg:col-span-8">
            <ClaimSupportForm />
          </div>
        </div>
      </Section>

      <Section labelledBy="docs-heading">
        <SectionHeading
          id="docs-heading"
          eyebrow="Document guidance"
          title="Documents insurers commonly ask for"
          intro="A starting point only. The insurer may ask for additional documents depending on your policy and the circumstances."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {checklists.map((c) => (
            <div key={c.type} className="rounded-2xl border border-navy-100 bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{c.type} claims</h3>
              <ul className="mt-3 space-y-2 text-[0.9375rem] text-navy-700">
                {c.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <Icon name="check" className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-600" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm">
          <Link href="/knowledge-centre/documents-needed-for-insurance-claim" className="font-semibold text-navy-800 underline decoration-gold-400 underline-offset-2">
            Read the full claim documents guide →
          </Link>
        </p>
      </Section>

      <Section tone="mist" labelledBy="claims-faq-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading id="claims-faq-heading" eyebrow="FAQs" title="Claims questions" className="lg:col-span-4" />
          <div className="lg:col-span-8">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </Section>
    </>
  );
}
