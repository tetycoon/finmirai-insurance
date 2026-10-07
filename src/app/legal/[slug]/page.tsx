import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Pending } from "@/components/ui/Pending";
import { getLegalDoc, legalDocs, type LegalBlock } from "@/content/legal";
import { legalNav } from "@/content/navigation";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = getLegalDoc((await params).slug);
  if (!doc) return {};
  return buildMetadata({ title: doc.title, description: doc.description, path: `/legal/${doc.slug}` });
}

function render(b: LegalBlock, i: number) {
  switch (b.type) {
    case "pending":
      return (
        <p key={i}>
          <Pending label={b.label} />
        </p>
      );
    case "h2":
      return <h2 key={i}>{b.text}</h2>;
    case "h3":
      return <h3 key={i}>{b.text}</h3>;
    case "ul":
      return (
        <ul key={i}>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i}>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ol>
      );
    default:
      return <p key={i}>{b.text}</p>;
  }
}

export default async function LegalDocPage({ params }: Props) {
  const doc = getLegalDoc((await params).slug);
  if (!doc) notFound();
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Legal", path: "/legal" },
          { name: doc.title, path: `/legal/${doc.slug}` },
        ]}
        title={doc.title}
        intro={<p>{doc.description}</p>}
      />
      <div className="container grid gap-12 py-12 sm:py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="mb-8 flex items-start gap-2 rounded-lg border border-dashed border-gold-500 bg-gold-50 p-4 text-sm text-gold-700">
            <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
            Draft for review — final wording must be approved by Finmirai&apos;s compliance professional before publication.
          </p>
          <div className="prose-fin">{doc.body.map(render)}</div>
        </div>
        <nav aria-label="Legal pages" className="lg:col-span-4">
          <ul className="space-y-1 rounded-2xl border border-navy-100 p-3 lg:sticky lg:top-32">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={l.href === `/legal/${doc.slug}` ? "page" : undefined}
                  className="block rounded-lg px-3 py-2 text-[0.9375rem] text-navy-700 hover:bg-navy-50 aria-[current=page]:bg-navy-900 aria-[current=page]:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
