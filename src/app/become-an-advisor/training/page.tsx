import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Pending } from "@/components/ui/Pending";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/content/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Advisor Training & Support",
  description:
    "How Finmirai trains and supports its advisors: insurance fundamentals, product knowledge, ethical selling, servicing, claims guidance and ongoing development.",
  path: "/become-an-advisor/training",
  image: images.teamMeeting.src,
});

const modules: { title: string; text: string; icon: IconName }[] = [
  { title: "Insurance fundamentals", text: "How insurance works, key terms, and the roles of insurer, broker and advisor.", icon: "book" },
  { title: "Product knowledge", text: "Health, motor, life and other categories — cover, exclusions and what to check.", icon: "layers" },
  { title: "Needs-based advice", text: "Understanding a customer's situation before recommending anything.", icon: "compass" },
  { title: "Ethical selling & compliance", text: "Clear disclosure, suitable recommendations and what you must never promise.", icon: "scale" },
  { title: "Documentation & servicing", text: "Proposal forms, KYC, endorsements and renewals done right.", icon: "fileText" },
  { title: "Claims guidance", text: "Helping customers through intimation, documents and follow-up.", icon: "headset" },
];

const support: { title: string; text: string }[] = [
  { title: "A point of contact", text: "Someone to call when you or your customer has a question." },
  { title: "Back-office help", text: "Support with documentation, policy issuance and endorsements." },
  { title: "Renewal tracking", text: "Help keeping customers covered year after year." },
  { title: "Continuous learning", text: "Updates as products and regulations change." },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Become a Finmirai Advisor", path: "/become-an-advisor" },
          { name: "Training & Support", path: "/become-an-advisor/training" },
        ]}
        eyebrow="Finmirai learning"
        title="Training & Support for Finmirai Advisors"
        intro={<p>Good advisors are made, not hired. Our training focuses on knowledge, ethics and service — the things that keep customers for life.</p>}
        image={images.teamMeeting}
        actions={
          <ButtonLink href="/become-an-advisor#apply" variant="gold" size="lg" iconRight="arrowRight">
            Become a Finmirai Advisor
          </ButtonLink>
        }
      />

      <Section labelledBy="modules-heading">
        <SectionHeading id="modules-heading" eyebrow="What you'll learn" title="Learning areas" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <div key={m.title} className="rounded-2xl border border-navy-100 bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-gold-300">
                <Icon name={m.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{m.title}</h3>
              <p className="mt-1.5 leading-relaxed text-navy-600">{m.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-navy-600">
          Training format, schedule and any mandatory certification steps: <Pending label="Training format & schedule" />
        </p>
      </Section>

      <Section tone="mist" labelledBy="support-heading">
        <SectionHeading id="support-heading" eyebrow="After activation" title="Support doesn't stop after training" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {support.map((s) => (
            <div key={s.title} className="rounded-xl border-l-4 border-gold-400 bg-white p-5">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-navy-600">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Ready to start?"
        text="Apply online and our team will explain the process, eligibility and next steps."
        primaryLabel="Apply Now"
        primaryHref="/become-an-advisor#apply"
        whatsappMessage="Hello Finmirai, I'm interested in becoming an advisor."
        location="training_cta"
      />
    </>
  );
}
