import { LeaderPortrait } from "@/components/ui/LeaderPortrait";
import { Pending } from "@/components/ui/Pending";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";

/**
 * Principal Officer profile: portrait on the left, biography + highlights on the right.
 * Stacks on phones; two columns from tablet (md) up. All wording comes from site.leadership.
 */
export function LeadershipProfile({ priority = false }: { priority?: boolean }) {
  const { name, title, bio, background, expertise } = site.leadership;
  const reg = site.regulatory;

  return (
    <Section labelledBy="profile-heading">
      <div className="grid gap-10 md:grid-cols-12 md:gap-10 lg:gap-16">
        <div className="md:col-span-5 lg:col-span-4">
          <div className="relative mx-auto max-w-sm md:sticky md:top-32 md:max-w-none">
            {/* Offset hairline frame — a quiet print-style detail behind the photo */}
            <div aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl sm:translate-x-3 sm:translate-y-3 border border-gold-300" />
            <LeaderPortrait className="aspect-[4/5] w-full shadow-card" priority={priority} />
          </div>
        </div>

        <div className="min-w-0 md:col-span-7 lg:col-span-8">
          <p className="eyebrow">Leadership</p>
          <h2 id="profile-heading" className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            {name}
          </h2>
          <p className="mt-1 text-lg font-medium text-gold-700">{title}</p>
          <p className="text-sm text-navy-500">{site.legalName}</p>

          <div className="mt-7 max-w-prose space-y-4 text-[1.0625rem] leading-relaxed text-navy-700">
            {bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-10 grid gap-8 border-t border-navy-100 pt-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <ProfileList heading="Background" items={background} />
            <ProfileList heading="Areas of expertise" items={expertise} />
          </div>

          <dl className="mt-10 grid divide-y divide-gold-200 overflow-hidden rounded-xl border border-gold-200 bg-gold-50 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            <div className="px-5 py-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">Broker Registration No.</dt>
              <dd className="mt-1 font-display text-xl font-bold text-navy-900">
                {reg.brokerRegistrationNumber ?? <Pending label="Registration no." />}
              </dd>
            </div>
            <div className="px-5 py-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">CIN</dt>
              <dd className="mt-1 font-display text-xl font-bold tracking-wide text-navy-900 [overflow-wrap:anywhere]">
                {reg.cin ?? <Pending label="CIN" />}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}

function ProfileList({ heading, items }: { heading: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-navy-500">{heading}</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-navy-800">
            <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-gold-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
