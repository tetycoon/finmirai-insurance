import { telHref, whatsappHref } from "@/content/site";
import { ButtonLink, buttonClasses } from "./Button";
import { Icon } from "./Icon";
import { TrackedLink } from "./TrackedLink";

/** Closing conversion band used across pages: primary CTA + Call + WhatsApp. */
export function CtaBand({
  title = "Tell us what you need.",
  text = "Share a few details and a Finmirai advisor will get back to you. Prefer to talk now? Call or WhatsApp us.",
  primaryLabel = "Get Insurance Assistance",
  primaryHref = "/get-insurance-assistance",
  whatsappMessage,
  location = "cta_band",
}: {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  whatsappMessage?: string;
  location?: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-gold-400" aria-hidden />
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
              <p className="mt-3 max-w-xl text-lg text-navy-100">{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
              <ButtonLink href={primaryHref} variant="gold" size="lg" iconRight="arrowRight">
                {primaryLabel}
              </ButtonLink>
              <TrackedLink kind="call" location={location} href={telHref()} className={buttonClasses("outlineLight", "lg")}>
                <Icon name="phone" className="h-5 w-5" /> Call
              </TrackedLink>
              <TrackedLink
                kind="whatsapp"
                location={location}
                href={whatsappHref(whatsappMessage)}
                className={buttonClasses("outlineLight", "lg")}
              >
                <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
