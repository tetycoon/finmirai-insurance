import Link from "next/link";
import { InsuranceEnquiryForm } from "@/components/forms/Forms";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon, type IconName } from "@/components/ui/Icon";
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

const contactLinkClass = "group flex items-center gap-3 py-3";

/**
 * Same layout as /get-a-quote so the enquiry form is visible without scrolling.
 * Desktop: form on the left, contact details pinned on the right (sticky).
 * Phones: form first, contact details below.
 */
export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapsQuery)}&output=embed`;
  return (
    <>
      <section className="bg-mist pb-16 pt-4 sm:pb-20 sm:pt-5">
        <div className="container">
          <Breadcrumbs items={[{ name: "Contact Us", path: "/contact-us" }]} />

          <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
            {/* ── Left: the enquiry form ── */}
            <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card lg:col-span-7">
              <header className="border-b border-navy-100 bg-navy-900 px-5 py-5 text-white sm:px-8">
                <div className="flex items-start gap-4">
                  <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300 sm:flex">
                    <Icon name="mail" className="h-6 w-6" />
                  </span>
                  <div>
                    <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Talk to Finmirai</h1>
                    <p className="mt-1.5 leading-relaxed text-navy-100">
                      Send an enquiry and an advisor will get back to you — or call, message or write to us. We usually need just a few
                      details to get started.
                    </p>
                  </div>
                </div>
              </header>
              <div className="px-5 py-5 sm:px-8 sm:py-6">
                <InsuranceEnquiryForm />
              </div>
            </div>

            {/* ── Right: pinned contact details (sticky on desktop) ── */}
            <aside aria-label="Contact details" className="space-y-3 lg:sticky lg:top-[8rem] lg:col-span-5">
              <div className="rounded-2xl border border-navy-100 bg-white px-4 py-1 sm:px-5">
                <ul className="divide-y divide-navy-100">
                  <li>
                    <TrackedLink kind="call" location="contact_cards" href={telHref()} className={contactLinkClass}>
                      <Icon name="phone" className="h-5 w-5 shrink-0 text-gold-600" />
                      <span className="flex-1">
                        <span className="block text-sm text-navy-600">Call</span>
                        <span className="block font-bold text-navy-900">{site.contact.phoneDisplay}</span>
                      </span>
                      <Icon name="arrowRight" className="h-4 w-4 text-navy-400 group-hover:text-navy-900" />
                    </TrackedLink>
                  </li>
                  <li>
                    <TrackedLink kind="whatsapp" location="contact_cards" href={whatsappHref()} className={contactLinkClass}>
                      <Icon name="whatsapp" className="h-5 w-5 shrink-0 text-gold-600" />
                      <span className="flex-1">
                        <span className="block text-sm text-navy-600">WhatsApp</span>
                        <span className="block font-bold text-navy-900">Chat with us</span>
                      </span>
                      <Icon name="arrowRight" className="h-4 w-4 text-navy-400 group-hover:text-navy-900" />
                    </TrackedLink>
                  </li>
                  <li>
                    <TrackedLink kind="email" location="contact_cards" href={mailHref("Insurance enquiry")} className={contactLinkClass}>
                      <Icon name="mail" className="h-5 w-5 shrink-0 text-gold-600" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-navy-600">Email</span>
                        <span className="block break-all font-bold text-navy-900">{site.contact.email}</span>
                      </span>
                      <Icon name="arrowRight" className="h-4 w-4 text-navy-400 group-hover:text-navy-900" />
                    </TrackedLink>
                  </li>
                  <li className="flex items-center gap-3 py-3">
                    <Icon name="clock" className="h-5 w-5 shrink-0 text-gold-600" />
                    <span>
                      <span className="block text-sm text-navy-600">Office hours</span>
                      <span className="block font-bold text-navy-900">{site.contact.officeHours ?? <Pending label="Office hours" />}</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-navy-100 bg-white p-4 sm:p-5">
                <p className="font-display font-semibold text-navy-900">Looking for something specific?</p>
                <ul className="mt-2 divide-y divide-navy-100">
                  {routes.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href} className={contactLinkClass}>
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
            </aside>
          </div>
        </div>
      </section>

      <Section labelledBy="visit-heading">
        <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white lg:grid lg:grid-cols-12">
          <iframe
            title="Map showing Finmirai's office location in Teynampet, Chennai"
            src={mapSrc}
            className="h-72 w-full border-0 lg:col-span-7 lg:h-full lg:min-h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex items-start gap-3 p-6 sm:p-8 lg:col-span-5">
            <Icon name="mapPin" className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
            <div>
              <h2 id="visit-heading" className="text-2xl font-bold">Visit our office</h2>
              <p className="mt-3 font-semibold text-navy-900">{site.legalName}</p>
              <p className="mt-0.5 text-navy-600">{fullAddress}</p>
              <a href={mapsHref()} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-navy-800 underline decoration-gold-400 underline-offset-2">
                Get directions
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
