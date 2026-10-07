import Image from "next/image";
import Link from "next/link";
import { productHref, type Product } from "@/content/products";
import { Icon } from "./Icon";

export function ProductCard({ product, withImage = false }: { product: Product; withImage?: boolean }) {
  return (
    <Link
      href={productHref(product)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white transition hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift"
    >
      {withImage ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800 ring-1 ring-navy-100 transition group-hover:bg-navy-900 group-hover:text-gold-300">
          <Icon name={product.icon} className="h-[22px] w-[22px]" />
        </span>
        <h3 className="mt-4 text-lg font-bold text-navy-900">{product.name}</h3>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-navy-600">{product.cardSummary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800">
          Learn more
          <Icon name="arrowRight" className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
