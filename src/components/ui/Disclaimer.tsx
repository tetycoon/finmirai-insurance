import Link from "next/link";
import { site } from "@/content/site";
import { Pending } from "./Pending";

/**
 * Regulatory/product disclaimer block. DRAFT wording — final text must be approved by the
 * client's compliance professional (Plan §15: "Do not let the developer invent legal claims").
 */
export function Disclaimer({ specific }: { specific?: string }) {
  const reg = site.regulatory;
  return (
    <aside aria-label="Disclaimer" className="rounded-xl border border-navy-100 bg-mist p-5 text-sm leading-relaxed text-navy-600">
      <p className="font-semibold text-navy-800">Disclaimer</p>
      {specific ? <p className="mt-2">{specific}</p> : null}
      <p className="mt-2">
        Insurance is the subject matter of solicitation. {site.legalName} acts as an insurance broker; insurance is underwritten by the
        respective insurer. Claim admissibility and settlement are decided by the insurer under the policy terms and conditions.
      </p>
      <p className="mt-2">
        Broker registration no.:{" "}
        {reg.brokerRegistrationNumber ?? <Pending label="Registration no." />} · Category:{" "}
        {reg.registrationCategory ?? <Pending label="Category" />} · Valid till:{" "}
        {reg.registrationValidity ?? <Pending label="Validity" />}.{" "}
        <Link href="/legal/disclosures" className="font-medium text-navy-800 underline decoration-gold-400 underline-offset-2">
          Full disclosures
        </Link>
      </p>
    </aside>
  );
}
