import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { Section } from "@/components/ui/Section";
import { articles, getArticle, type Block } from "@/content/articles";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/structuredData";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return buildMetadata({ title: a.title, description: a.metaDescription, path: `/knowledge-centre/${a.slug}`, image: a.image.src, type: "article" });
}

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "p":
      return <p key={i}>{b.text}</p>;
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
    case "note":
      return (
        <div key={i} className="my-6 flex gap-3 rounded-xl border-l-4 border-gold-400 bg-gold-50 p-4 text-[0.9875rem]">
          <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
          <p className="!mb-0">{b.text}</p>
        </div>
      );
  }
}

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const path = `/knowledge-centre/${article.slug}`;
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-mist">
          <div className="container py-10 sm:py-14">
            <Breadcrumbs items={[{ name: "Knowledge Centre", path: "/knowledge-centre" }, { name: article.title, path }]} />
            <div className="mt-8 max-w-3xl">
              <p className="eyebrow">{article.category}</p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">{article.title}</h1>
              <p className="mt-4 text-lg text-navy-600">{article.excerpt}</p>
              <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-600">
                <div>
                  <dt className="sr-only">Author</dt>
                  <dd>By {article.author}</dd>
                </div>
                <div>
                  <dt className="inline">Reviewed by: </dt>
                  <dd className="inline">{article.reviewedBy ?? <Pending label="Reviewer" />}</dd>
                </div>
                <div>
                  <dt className="sr-only">Published</dt>
                  <dd>
                    <time dateTime={article.published}>{dateFmt.format(new Date(article.published))}</time>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Reading time</dt>
                  <dd>{article.readingMinutes} min read</dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        <div className="container py-12 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
                <Image src={article.image.src} alt={article.image.alt} fill priority sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
              </div>
              <div className="prose-fin">{article.body.map(renderBlock)}</div>
              <p className="mt-10 border-t border-navy-100 pt-6 text-sm text-navy-500">
                This guide is for general information only and is not advice on any specific policy. Policy terms vary by insurer and product —
                always read the policy wording.
              </p>
            </div>
            <aside className="lg:col-span-4">
              <div className="rounded-2xl bg-navy-900 p-6 text-white lg:sticky lg:top-32">
                <p className="eyebrow eyebrow-light">Related service</p>
                <p className="mt-3 font-display text-xl font-bold">{article.relatedService.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-navy-200">Want help applying this to your own situation? Talk to a Finmirai advisor.</p>
                <div className="mt-5 grid gap-2">
                  <ButtonLink href={article.relatedService.href} variant="gold" iconRight="arrowRight">
                    Learn more
                  </ButtonLink>
                  <ButtonLink href="/get-insurance-assistance" variant="outlineLight">
                    Get Insurance Assistance
                  </ButtonLink>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <Section tone="mist" labelledBy="more-heading">
        <h2 id="more-heading" className="text-2xl font-bold">More guides</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>

      <JsonLd
        data={articleSchema({ title: article.title, description: article.metaDescription, path, image: article.image.src, published: article.published, author: article.author })}
      />
    </>
  );
}
