import credits from "../../../../public/images/CREDITS.json";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Image Credits",
  description: "Photography credits for the Finmirai website.",
  path: "/legal/image-credits",
  noindex: true,
});

export default function ImageCreditsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Legal", path: "/legal" }, { name: "Image Credits", path: "/legal/image-credits" }]} title="Image Credits" />
      <Section>
        <p className="max-w-2xl text-navy-700">
          The photographs listed below are used under the Unsplash License. Other images on this website were supplied by Finmirai. Images are
          illustrative and do not depict Finmirai customers or staff unless stated.
        </p>
        <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {credits.map((c) => (
            <li key={c.file} className="rounded-lg border border-navy-100 px-4 py-3 text-sm">
              <span className="block font-medium text-navy-900">{c.file.replace("/images/", "")}</span>
              <span className="text-navy-600">
                Photo by{" "}
                <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline decoration-gold-400 underline-offset-2">
                  {c.photographer}
                </a>{" "}
                on Unsplash
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
