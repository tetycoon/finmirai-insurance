import { AdvisorApplicationForm } from "@/components/forms/Forms";
import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Pending } from "@/components/ui/Pending";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/content/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Become a Finmirai Advisor – Build Your Insurance Career",
  description:
    "Build a professional insurance practice with Finmirai: training, product access, sales and servicing support, and claims guidance for your customers. Apply to become a Finmirai advisor.",
  path: "/become-an-advisor",
  image: images.professionalWoman.src,
});

const pillars: { title: string; text: string; icon: IconName }[] = [
  { title: "Product & insurance knowledge", text: "Structured learning so you can explain cover clearly and correctly.", icon: "graduation" },
  { title: "Access to eligible opportunities", text: "Work across the insurance categories you are eligible and trained for.", icon: "layers" },
  { title: "Business & sales support", text: "Guidance on approaching customers ethically and building a sustainable practice.", icon: "briefcase" },
  { title: "Policy servicing support", text: "Back-office help with documentation, endorsements and renewals.", icon: "refresh" },
  { title: "Claims guidance", text: "Support for your customers when they need to claim — the moment that builds trust.", icon: "headset" },
  { title: "Customer relationship support", text: "Tools and practices to stay in touch with customers over the long term.", icon: "handshake" },
  { title: "Professional development", text: "Ongoing learning as products, regulations and your ambitions grow.", icon: "compass" },
];

/** Plan §9 suggested journey. */
const journey = ["Register", "Verification", "Training / required process", "Activation", "Learn products", "Serve customers", "Ongoing support"];

const fit = [
  "Working professionals looking for a long-term second career",
  "Homemakers and retirees with strong community networks",
  "Sales professionals who want to move into financial services",
  "Existing insurance advisors seeking better support",
];

const faqs = [
  { q: "What is a POSP?", a: "A Point of Sales Person (POSP) is an individual who can sell certain insurance products after meeting the eligibility, training and certification requirements set under the applicable regulations, through an intermediary such as an insurance broker." },
  { q: "How much can I earn?", a: "We don't make income promises. Remuneration depends on the business you place, the products and the applicable regulatory framework. We'll explain how remuneration works transparently during onboarding." },
  { q: "Do I need prior insurance experience?", a: "Not necessarily. Eligibility depends on regulatory criteria; training is part of the process. Prior sales or customer-facing experience helps." },
  { q: "Is there a fee to join?", a: "Please speak to our team for the current onboarding process." },
  { q: "Can I do this part-time?", a: "Many advisors start part-time. What matters is serving customers responsibly, including after the sale." },
];

export default function BecomeAdvisorPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Become a Finmirai Advisor", path: "/become-an-advisor" }]}
        eyebrow="Advisor / POSP programme"
        title="Build Your Insurance Career with Finmirai."
        intro={
          <p>
            For people who want to build a professional, long-term insurance practice — with training, product access and a team that supports
            you and your customers after the sale.
          </p>
        }
        image={images.professionalWoman}
        actions={
          <>
            <ButtonLink href="#apply" variant="gold" size="lg" iconRight="arrowRight">
              Apply to Become an Advisor
            </ButtonLink>
            <ButtonLink href="/become-an-advisor/training" variant="outlineLight" size="lg" icon="graduation">
              Training &amp; support
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="pillars-heading">
        <SectionHeading
          id="pillars-heading"
          eyebrow="Why Finmirai"
          title="Support that goes beyond a commission pitch"
          intro="Customers stay with advisors who help them at renewal and claim time. We build our advisor programme around that."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-navy-100 bg-white p-6">
              <Icon name={p.icon} className="h-7 w-7 text-gold-600" />
              <h3 className="mt-3 font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-navy-600">{p.text}</p>
            </div>
          ))}
          <div className="flex flex-col justify-between rounded-2xl bg-navy-900 p-6 text-white">
            <p className="font-display text-lg font-semibold leading-snug">A professional path — not a get-rich-quick scheme.</p>
            <p className="mt-3 text-sm leading-relaxed text-navy-200">Finmirai does not guarantee income. What you build depends on how well you serve your customers.</p>
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="journey-heading">
        <SectionHeading id="journey-heading" eyebrow="Your journey" title="From application to serving customers" />
        <ol className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {journey.map((step, i) => (
            <li key={step} className="flex flex-1 items-center gap-3 rounded-xl border border-navy-100 bg-white p-4 lg:flex-col lg:items-start">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-gold-300">{i + 1}</span>
              <span className="font-semibold text-navy-900">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-navy-600">
          Eligibility, verification, training and certification follow the applicable regulatory requirements.{" "}
          <Pending label="Detailed eligibility criteria" />
        </p>
      </Section>

      <Section labelledBy="fit-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="fit-heading" eyebrow="Who it's for" title="Is the advisor programme right for you?" />
            <ul className="mt-8 space-y-3">
              {fit.map((f) => (
                <li key={f} className="flex items-start gap-3 text-navy-800">
                  <Icon name="checkCircle" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">FAQs</p>
            <h2 className="mb-6 mt-3 text-2xl font-bold">Questions advisors ask us</h2>
            <FaqList faqs={faqs} />
          </div>
        </div>
      </Section>

      <Section id="apply" tone="mist" labelledBy="apply-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="apply-heading"
              eyebrow="Apply"
              title="Start your application"
              intro="Tell us about yourself. Our team will contact you to explain the process and next steps."
            />
          </div>
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8 lg:col-span-8">
            <AdvisorApplicationForm />
          </div>
        </div>
      </Section>
    </>
  );
}
