import Link from "next/link";
import { InsuranceEnquiryForm } from "@/components/forms/Forms";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Pending } from "@/components/ui/Pending";
import { Section } from "@/components/ui/Section";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { fullAddress, mailHref, mapsHref, site, telHref, whatsappHref } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Finmirai – Insurance Broker in Teynampet, Chennai",
  description: `Call, WhatsApp, email or visit Finmirai Insurance Brokers at ${fullAddress}. Send an enquiry and an advisor will contact you.`,
  path: "/contact-us",
});

const routes: { title: string; text: string; href: string; icon: IconName }[] = [
  { title: "Need help with a claim?", text: "Start a claim support request.", href: "/claims-support#claim-form", icon: "headset" },
  { title: "Business insurance?", text: "Request a corporate consultation.", href: "/corporate-insurance#consultation", icon: "briefcase" },
  { title: "Want to become an advisor?", text: "Apply to the advisor programme.", href: "/become-an-advisor#apply", icon: "graduation" },
];

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapsQuery)}&output=embed`;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact Us", path: "/contact-us" }]}
        eyebrow="Contact"
        title="Talk to Finmirai"
        intro={<p>Call, message or write to us — or send an enquiry below and an advisor will get back to you.</p>}
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TrackedLink kind="call" location="contact_cards" href={telHref()} className="group rounded-2xl border border-navy-100 p-6 transition hover:border-navy-300 hover:shadow-card">
            <Icon name="phone" className="h-6 w-6 text-gold-600" />
            <h2 className="mt-4 text-base font-semibold">Call</h2>
            <p className="mt-1 text-lg font-bold text-navy-900">{site.contact.phoneDisplay}</p>
          </TrackedLink>
          <TrackedLink kind="whatsapp" location="contact_cards" href={whatsappHref()} className="group rounded-2xl border border-navy-100 p-6 transition hover:border-navy-300 hover:shadow-card">
            <Icon name="whatsapp" className="h-6 w-6 text-gold-600" />
            <h2 className="mt-4 text-base font-semibold">WhatsApp</h2>
            <p className="mt-1 text-lg font-bold text-navy-900">Chat with us</p>
          </TrackedLink>
          <TrackedLink kind="email" location="contact_cards" href={mailHref("Insurance enquiry")} className="group rounded-2xl border border-navy-100 p-6 transition hover:border-navy-300 hover:shadow-card">
            <Icon name="mail" className="h-6 w-6 text-gold-600" />
            <h2 className="mt-4 text-base font-semibold">Email</h2>
            <p className="mt-1 break-all font-bold text-navy-900">{site.contact.email}</p>
          </TrackedLink>
          <div className="rounded-2xl border border-navy-100 p-6">
            <Icon name="clock" className="h-6 w-6 text-gold-600" />
            <h2 className="mt-4 text-base font-semibold">Office hours</h2>
            <p className="mt-1 text-navy-900">{site.contact.officeHours ?? <Pending label="Office hours" />}</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="enquiry-heading" className="!pt-0">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8 lg:col-span-7">
            <h2 id="enquiry-heading" className="text-2xl font-bold">Send an enquiry</h2>
            <p className="mb-6 mt-1 text-navy-600">We usually need just a few details to get started.</p>
            <InsuranceEnquiryForm />
          </div>
          <div className="space-y-5 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white">
              <iframe
                title="Map showing Finmirai's office location in Teynampet, Chennai"
                src={mapSrc}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex items-start gap-3 p-5">
                <Icon name="mapPin" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                <div>
                  <p className="font-semibold text-navy-900">{site.legalName}</p>
                  <p className="mt-0.5 text-navy-600">{fullAddress}</p>
                  <a href={mapsHref()} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-navy-800 underline decoration-gold-400 underline-offset-2">
                    Get directions
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-white p-5">
              <h3 className="text-lg font-bold">Looking for something specific?</h3>
              <ul className="mt-3 divide-y divide-navy-100">
                {routes.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="group flex items-center gap-3 py-3">
                      <Icon name={r.icon} className="h-5 w-5 text-navy-500" />
                      <span className="flex-1">
                        <span className="block font-semibold text-navy-900">{r.title}</span>
                        <span className="block text-sm text-navy-600">{r.text}</span>
                      </span>
                      <Icon name="arrowRight" className="h-4 w-4 text-navy-400 group-hover:text-navy-900" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
