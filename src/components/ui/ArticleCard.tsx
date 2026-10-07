import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/content/articles";
import { Icon } from "./Icon";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/knowledge-centre/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white transition duration-300 ease-out hover:-translate-y-1 hover:border-gold-300 hover:shadow-lift"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-navy-100">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-navy-800">{article.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-navy-900 group-hover:text-navy-700">{article.title}</h3>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-navy-600">{article.excerpt}</p>
        <span className="mt-5 flex items-center justify-between text-sm">
          <span className="text-navy-500">{article.readingMinutes} min read</span>
          <span className="inline-flex items-center gap-1 font-semibold text-navy-800">
            Read guide <Icon name="arrowRight" className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
    </Link>
  );
}
