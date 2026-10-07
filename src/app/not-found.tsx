import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  const links = [
    { label: "Insurance Solutions", href: "/insurance-solutions" },
    { label: "Corporate Insurance", href: "/corporate-insurance" },
    { label: "Claims Support", href: "/claims-support" },
    { label: "Contact Us", href: "/contact-us" },
  ];
  return (
    <section className="bg-mist py-24">
      <div className="container max-w-2xl text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">We couldn&apos;t find that page</h1>
        <p className="mt-4 text-lg text-navy-600">The link may be out of date. Here are some places to start instead.</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-block rounded-full bg-white px-4 py-2 font-medium text-navy-800 ring-1 ring-navy-200 hover:ring-navy-400">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/" variant="navy" className="mt-10">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
